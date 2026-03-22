/**
 * Bank Statement Matching Engine
 *
 * Parses HSBC CSV bank statements and matches credit transactions
 * against unpaid orders in Google Sheets using 3-tier logic:
 *
 * Tier 1: Exact amount + surname in description + within 7 days → auto-match (98% confidence)
 * Tier 2: Exact amount + within 7 days → auto-match (85% confidence)
 * Tier 3: Amount within £2 tolerance + within 7 days → flag for review (50% confidence)
 *
 * Ported from n8n WF02 Bank Match Engine to run directly in Next.js.
 */

import { JWT } from "google-auth-library";
import { GoogleSpreadsheet } from "google-spreadsheet";

// ─── Types ───────────────────────────────────────────────────────────────────

export interface BankTransaction {
  amount: number;
  date: Date;
  dateStr: string;
  description: string;
  type: string;
  hash: string;
}

export interface MatchResult {
  action: "auto_match" | "review_needed" | "unmatched" | "no_credits";
  tier: number;
  confidence: number;
  bankAmount: number;
  bankDate: string;
  bankDescription: string;
  orderName: string;
  orderTotal: string;
  orderRow: number;
  submissionId: string;
}

export interface MatchSummary {
  totalCredits: number;
  autoMatched: number;
  needsReview: number;
  unmatched: number;
  totalMatchedAmount: number;
  results: MatchResult[];
}

// ─── Constants ───────────────────────────────────────────────────────────────

const EXCLUSIONS = [
  "ATM",
  "DIRECT DEBIT",
  "STANDING ORDER",
  "INTEREST",
  "CHARGE",
  "FEE",
];
const AMOUNT_TOLERANCE = 2; // £2
const DAY_TOLERANCE = 7; // 7 days

// ─── CSV Parser ──────────────────────────────────────────────────────────────

/**
 * Parse HSBC CSV content into BankTransaction objects.
 * HSBC CSV columns: Date, Type, Description, Paid out, Paid in, Balance
 * We only care about "Paid in" (credits) — these are customer payments.
 */
export function parseHSBCCSV(csvText: string): BankTransaction[] {
  const lines = csvText.trim().split(/\r?\n/);
  if (lines.length < 2) return [];

  // Find header line (might not be first line in HSBC exports)
  let headerIndex = lines.findIndex((line) => {
    const lower = line.toLowerCase();
    return lower.includes("date") && (lower.includes("paid in") || lower.includes("balance"));
  });

  if (headerIndex === -1) headerIndex = 0;

  const headers = lines[headerIndex].split(",").map((h) => h.trim().toLowerCase());

  // Find column indices
  const dateIdx = headers.findIndex((h) => h === "date");
  const typeIdx = headers.findIndex((h) => h === "type");
  const descIdx = headers.findIndex((h) => h.includes("description"));
  const paidInIdx = headers.findIndex((h) => h.includes("paid in"));

  if (dateIdx === -1 || paidInIdx === -1) return [];

  const transactions: BankTransaction[] = [];

  for (let i = headerIndex + 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    // Handle CSV with quoted fields
    const cols = parseCSVLine(line);

    const paidInStr = (cols[paidInIdx] || "0").replace(/[£,]/g, "").trim();
    const paidIn = parseFloat(paidInStr) || 0;
    if (paidIn <= 0) continue;

    const desc = (cols[descIdx] || "").toUpperCase();
    if (EXCLUSIONS.some((ex) => desc.includes(ex))) continue;

    const dateStr = cols[dateIdx] || "";
    // HSBC dates are DD/MM/YYYY format
    const parts = dateStr.split("/");
    const date =
      parts.length === 3
        ? new Date(`${parts[2]}-${parts[1]}-${parts[0]}`)
        : new Date(dateStr);

    const hash = `BANK-${dateStr}-${paidIn}-${desc.substring(0, 30)}`;

    transactions.push({
      amount: paidIn,
      date,
      dateStr,
      description: cols[descIdx] || "",
      type: cols[typeIdx] || "",
      hash,
    });
  }

  return transactions;
}

/** Parse a single CSV line, handling quoted fields */
function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === "," && !inQuotes) {
      result.push(current.trim());
      current = "";
    } else {
      current += char;
    }
  }
  result.push(current.trim());
  return result;
}

// ─── Matching Engine ─────────────────────────────────────────────────────────

interface OrderRow {
  rowIndex: number;
  submissionId: string;
  fullName: string;
  basketTotal: number;
  submittedAt: Date;
  paymentStatus: string;
  paymentMatch: string;
}

/**
 * Match bank transactions against unpaid orders and update Google Sheets.
 * Returns a summary of matches.
 */
export async function matchBankStatement(
  csvText: string,
  sheetsId: string
): Promise<MatchSummary> {
  // 1. Parse CSV
  const credits = parseHSBCCSV(csvText);
  if (credits.length === 0) {
    return {
      totalCredits: 0,
      autoMatched: 0,
      needsReview: 0,
      unmatched: 0,
      totalMatchedAmount: 0,
      results: [],
    };
  }

  // 2. Connect to Google Sheets
  const auth = getAuth();
  if (!auth) {
    throw new Error("Google Sheets not configured");
  }

  const doc = new GoogleSpreadsheet(sheetsId, auth);
  await doc.loadInfo();

  const ordersSheet = doc.sheetsByTitle["Orders"];
  if (!ordersSheet) {
    throw new Error("Orders sheet not found");
  }

  const rows = await ordersSheet.getRows();

  // 3. Find unpaid orders
  const unpaidOrders: OrderRow[] = rows
    .map((row, i) => {
      const ps = (row.get("Payment Status") || "").toLowerCase();
      const pm = row.get("Payment Match") || "";
      if (ps === "paid") return null;
      if (pm === "MATCHED") return null;

      const basketStr = (row.get("Basket Total") || "0")
        .replace("£", "")
        .trim();

      return {
        rowIndex: i + 2, // 1-based + header row
        submissionId: row.get("Submission ID") || "",
        fullName: row.get("Full Name") || "",
        basketTotal: parseFloat(basketStr) || 0,
        submittedAt: new Date(row.get("Submitted at") || ""),
        paymentStatus: ps,
        paymentMatch: pm,
      } as OrderRow;
    })
    .filter((o): o is OrderRow => o !== null);

  // 4. Run matching
  const results: MatchResult[] = [];
  const matchedOrderIds = new Set<string>();

  for (const credit of credits) {
    let bestMatch: OrderRow | null = null;
    let bestTier = 99;
    let bestConfidence = 0;

    for (const order of unpaidOrders) {
      // Skip already matched in this batch
      if (matchedOrderIds.has(order.submissionId)) continue;

      const amountDiff = Math.abs(credit.amount - order.basketTotal);
      const daysDiff = Math.abs(
        (credit.date.getTime() - order.submittedAt.getTime()) /
          (1000 * 60 * 60 * 24)
      );

      // Extract surname
      const nameParts = order.fullName.split(/\s+/);
      const surname =
        nameParts.length > 1
          ? nameParts[nameParts.length - 1].toUpperCase()
          : order.fullName.toUpperCase();
      const descUpper = credit.description.toUpperCase();

      // TIER 1: Exact amount + surname in description + date window
      if (
        amountDiff < 0.01 &&
        descUpper.includes(surname) &&
        surname.length > 2 &&
        daysDiff <= DAY_TOLERANCE
      ) {
        const confidence = 98 - daysDiff;
        if (bestTier > 1 || confidence > bestConfidence) {
          bestMatch = order;
          bestTier = 1;
          bestConfidence = Math.round(confidence);
        }
      }
      // TIER 2: Exact amount + date window
      else if (amountDiff < 0.01 && daysDiff <= DAY_TOLERANCE) {
        const confidence = 85 - daysDiff * 2;
        if (bestTier > 2 || (bestTier === 2 && confidence > bestConfidence)) {
          bestMatch = order;
          bestTier = 2;
          bestConfidence = Math.round(confidence);
        }
      }
      // TIER 3: Amount within tolerance + date window
      else if (amountDiff <= AMOUNT_TOLERANCE && daysDiff <= DAY_TOLERANCE) {
        const confidence = 50 - amountDiff * 10 - daysDiff * 2;
        if (bestTier > 3 || (bestTier === 3 && confidence > bestConfidence)) {
          bestMatch = order;
          bestTier = 3;
          bestConfidence = Math.round(Math.max(confidence, 25));
        }
      }
    }

    const result: MatchResult = {
      action: bestMatch
        ? bestTier <= 2
          ? "auto_match"
          : "review_needed"
        : "unmatched",
      tier: bestMatch ? bestTier : 0,
      confidence: bestConfidence,
      bankAmount: credit.amount,
      bankDate: credit.dateStr,
      bankDescription: credit.description,
      orderName: bestMatch?.fullName || "",
      orderTotal: bestMatch ? `£${bestMatch.basketTotal.toFixed(2)}` : "",
      orderRow: bestMatch?.rowIndex || 0,
      submissionId: bestMatch?.submissionId || "",
    };

    results.push(result);

    // Mark as matched to prevent double-matching
    if (bestMatch) {
      matchedOrderIds.add(bestMatch.submissionId);
    }
  }

  // 5. Update Google Sheets for auto-matched orders (Tier 1 & 2)
  const autoMatches = results.filter((r) => r.action === "auto_match");
  for (const match of autoMatches) {
    const row = rows[match.orderRow - 2]; // Convert back to 0-based
    if (row) {
      row.set("Payment Status", "paid");
      row.set("Payment Amount", match.bankAmount.toString());
      row.set(
        "Payment Reference",
        `BANK-${match.bankDate}-${match.bankDescription.substring(0, 30)}`
      );
      await row.save();
    }
  }

  const summary: MatchSummary = {
    totalCredits: credits.length,
    autoMatched: autoMatches.length,
    needsReview: results.filter((r) => r.action === "review_needed").length,
    unmatched: results.filter((r) => r.action === "unmatched").length,
    totalMatchedAmount: autoMatches.reduce((sum, r) => sum + r.bankAmount, 0),
    results,
  };

  console.log(
    `[bank-match] ${summary.totalCredits} credits → ${summary.autoMatched} auto-matched, ${summary.needsReview} need review, ${summary.unmatched} unmatched`
  );

  return summary;
}

// ─── Auth (reuse same pattern as google-sheets.ts) ───────────────────────────

function getAuth(): JWT | null {
  const creds = process.env.GOOGLE_SERVICE_ACCOUNT;
  if (!creds) return null;
  try {
    const parsed = JSON.parse(creds);
    return new JWT({
      email: parsed.client_email,
      key: parsed.private_key,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });
  } catch {
    return null;
  }
}
