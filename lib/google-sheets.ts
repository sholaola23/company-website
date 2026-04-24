import { GoogleSpreadsheet } from "google-spreadsheet";
import { JWT } from "google-auth-library";

// Product columns in the Orders sheet — headers include prices like
// "Agege Bread 800g — £2.00 (quantity)"
const PRODUCT_KEYWORDS = [
  "Agege Bread",
  "Sardine Bread",
  "Meat Pie",
  // Banana bread (Mini/Midi/Maxi Loaf) removed — temporarily unavailable (Mar 2026)
];

// Short display names for the dashboard
const PRODUCT_DISPLAY_NAMES: Record<string, string> = {
  "Agege Bread": "Agege Bread",
  "Sardine Bread": "Sardine Bread",
  "Meat Pie": "Meat Pie",
};

/**
 * Extract price from a product header like "Agege Bread 800g — £2.00 (quantity)"
 */
function extractPriceFromHeader(header: string): number {
  const match = header.match(/£([\d.]+)/);
  return match ? parseFloat(match[1]) : 0;
}

/**
 * Find the matching header for a product keyword from the actual sheet headers
 */
function findProductHeader(
  headers: string[],
  keyword: string
): string | undefined {
  return headers.find((h) =>
    h.toLowerCase().includes(keyword.toLowerCase())
  );
}

export interface PaymentBreakdown {
  totalPaid: number;
  sumupPaid: number;
  sumupCount: number;
  bankTransferPaid: number;
  bankTransferCount: number;
  otherPaid: number;
  otherCount: number;
}

export interface OrderRow {
  fullName: string;
  phone: string;
  items: string;
  deliveryAddress: string;
  postcode: string;
  town: string;
  basketTotal: number;
  paymentStatus: string;
  outstandingBalance: number;
  orderStatus: string;
  refundAmount: number | null;
  refundDate: string | null;
  refundReason: string | null;
  refundMethod: string | null;
  sheetRowIndex: number;
}

export interface OrdersSummary {
  totalOrders: number;
  totalRevenue: number;
  paidCount: number;
  unpaidCount: number;
  unpaidAmount: number;
  unpaidCustomers: { name: string; amount: number; daysAgo: number }[];
  paymentBreakdown: PaymentBreakdown;
  orderRows: OrderRow[];
}

export interface ProductionItem {
  product: string;
  quantity: number;
}

export interface DeliverySummary {
  totalStops: number;
  byTown: { town: string; count: number }[];
}

export interface SheetsData {
  orders: OrdersSummary | null;
  production: ProductionItem[] | null;
  deliveries: DeliverySummary | null;
}

function getServiceAccountAuth(): JWT | null {
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

async function getDoc(sheetsId: string): Promise<GoogleSpreadsheet | null> {
  const auth = getServiceAccountAuth();
  if (!auth) return null;
  const doc = new GoogleSpreadsheet(sheetsId, auth);
  await doc.loadInfo();
  return doc;
}

/**
 * Calculate the week code for a given date in the format used by E'Manuel sheets: "Fri DD Mon"
 * Week code = the Friday that "owns" this date.
 * Mon-Fri → that week's Friday. Sat-Sun → the previous Friday.
 */
function getWeekCodeForDate(date: Date): string {
  const day = date.getDay(); // 0=Sun, 5=Fri
  const daysUntilFriday = (5 - day + 7) % 7;
  const friday = new Date(date);
  friday.setDate(date.getDate() + daysUntilFriday);
  // If it's Saturday or Sunday, use the previous Friday
  if (day === 6) friday.setDate(date.getDate() - 1);
  if (day === 0) friday.setDate(date.getDate() - 2);

  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];
  const dd = friday.getDate();
  const mon = months[friday.getMonth()];
  return `Fri ${dd} ${mon}`;
}

/**
 * Get the current week code in the format used by E'Manuel sheets: "Fri DD Mon"
 * This matches the ARRAYFORMULA in column Y of the Orders tab.
 */
function getCurrentWeekCode(): string {
  return getWeekCodeForDate(new Date());
}

export async function getOrdersSummary(
  sheetsId: string,
  allTime = false
): Promise<OrdersSummary | null> {
  try {
    const doc = await getDoc(sheetsId);
    if (!doc) return null;

    const sheet = doc.sheetsByTitle["Orders"];
    if (!sheet) return null;

    const rows = await sheet.getRows();
    const weekCode = getCurrentWeekCode();

    // Filter orders — current week or all time, preserving absolute row index
    const thisWeek = rows.map((row, idx) => ({ row, idx })).filter(({ row }) => {
      const status = (row.get("Order Status") || "").toLowerCase();
      if (status === "cancelled") return false;
      if (allTime) return true;
      const wc = row.get("Week Code");
      if (wc === weekCode) return true;
      // Fallback: Week Code column may be empty for new submissions if the
      // ARRAYFORMULA in the sheet doesn't extend far enough. Calculate the
      // correct week code from the submission date and only include if it
      // matches the current week — prevents old orders leaking into the
      // wrong week.
      if (!wc) {
        const submittedAt =
          row.get("Submitted at") ||
          row.get("Submitted At") ||
          row.get("Timestamp");
        if (!submittedAt) return false;
        const orderDate = new Date(submittedAt);
        if (isNaN(orderDate.getTime())) return false;
        const calculatedWeekCode = getWeekCodeForDate(orderDate);
        return calculatedWeekCode === weekCode;
      }
      return false;
    });

    // Build a map of product header → price from the column names
    const headers = sheet.headerValues;
    const productPrices: { header: string; price: number }[] = [];
    for (const keyword of PRODUCT_KEYWORDS) {
      const header = findProductHeader(headers, keyword);
      if (header) {
        productPrices.push({ header, price: extractPriceFromHeader(header) });
      }
    }

    let totalRevenue = 0;
    let paidCount = 0;
    let unpaidCount = 0;
    let unpaidAmount = 0;
    const unpaidCustomers: { name: string; amount: number; daysAgo: number }[] =
      [];
    const paymentBreakdown: PaymentBreakdown = {
      totalPaid: 0,
      sumupPaid: 0,
      sumupCount: 0,
      bankTransferPaid: 0,
      bankTransferCount: 0,
      otherPaid: 0,
      otherCount: 0,
    };
    const orderRows: OrderRow[] = [];

    for (const { row, idx: sheetRowIndex } of thisWeek) {
      // Calculate basket total from product quantities × prices (primary)
      // Fall back to pre-calculated "Basket Total" column if products give 0
      let basketTotal = 0;
      for (const { header, price } of productPrices) {
        const qty = parseInt(row.get(header) || "0");
        if (qty > 0) basketTotal += qty * price;
      }
      if (basketTotal === 0) {
        const rawBT = parseFloat((row.get("Basket Total") || "0").replace(/[£$,]/g, ""));
        if (!isNaN(rawBT) && rawBT > 0) basketTotal = rawBT;
      }

      const paymentStatus = (row.get("Payment Status") || "").toLowerCase();
      const name =
        row.get("Full Name") || row.get("Name") || row.get("Customer") || "Unknown";

      // Parse Payment Amount early — strip currency symbols (£2.00 → 2.00)
      const paymentAmountRaw = parseFloat((row.get("Payment Amount") || "").replace(/[£$,]/g, ""));
      const hasPaymentAmount = !isNaN(paymentAmountRaw) && paymentAmountRaw > 0;

      // For paid orders with a Payment Amount, use that for revenue; else use basketTotal
      if (hasPaymentAmount && (paymentStatus === "paid" || paymentStatus === "partial")) {
        totalRevenue += paymentAmountRaw;
      } else {
        totalRevenue += basketTotal;
      }

      // Also backfill basketTotal from Payment Amount if products didn't populate it
      if (basketTotal === 0 && hasPaymentAmount) {
        basketTotal = paymentAmountRaw;
      }

      if (paymentStatus === "paid" || paymentStatus === "partial") {
        if (paymentStatus === "paid") paidCount++;

        // Determine actual amount paid
        const paidAmount = hasPaymentAmount ? paymentAmountRaw : basketTotal;

        // Categorize by payment method using Payment Match (column X)
        // Values: SUMUP-T1-95%, SUMUP-T2-70%, UNPAID, HSBC-..., BANK-..., MATCHED, PARTIAL
        const paymentMatch = (row.get("Payment Match") || "").toUpperCase();

        // Payment Reference starting with a UUID = SumUp checkout payment
        const paymentRef = (row.get("Payment Reference") || "").toLowerCase();
        const isSumupCheckout = paymentRef.match(/^[0-9a-f]{8}-/);

        if (paymentMatch.startsWith("SUMUP") || isSumupCheckout) {
          paymentBreakdown.sumupPaid += paidAmount;
          paymentBreakdown.sumupCount++;
        } else if (paymentMatch.startsWith("HSBC") || paymentMatch.startsWith("BANK")) {
          paymentBreakdown.bankTransferPaid += paidAmount;
          paymentBreakdown.bankTransferCount++;
        } else if (paymentStatus === "paid" && !paymentMatch.includes("UNPAID")) {
          paymentBreakdown.otherPaid += paidAmount;
          paymentBreakdown.otherCount++;
        }
        paymentBreakdown.totalPaid += paidAmount;
      }

      if (paymentStatus !== "paid") {
        unpaidCount++;
        // Use Outstanding Balance column if available, else fall back to basket total
        const outstandingRaw = row.get("Outstanding Balance");
        const parsedOutstanding =
          outstandingRaw != null && outstandingRaw !== ""
            ? parseFloat(outstandingRaw)
            : NaN;
        const outstanding = isNaN(parsedOutstanding)
          ? basketTotal
          : parsedOutstanding;
        unpaidAmount += outstanding;

        // Calculate days since order
        const submittedAt =
          row.get("Submitted at") ||
          row.get("Submitted At") ||
          row.get("Timestamp");
        let daysAgo = 0;
        if (submittedAt) {
          const orderDate = new Date(submittedAt);
          daysAgo = Math.floor(
            (Date.now() - orderDate.getTime()) / (1000 * 60 * 60 * 24)
          );
        }

        unpaidCustomers.push({
          name,
          amount: outstanding,
          daysAgo,
        });
      }

      // Build items string from product quantity columns
      const itemParts: string[] = [];
      for (const { header } of productPrices) {
        const qty = parseInt(row.get(header) || "0");
        if (qty > 0) {
          // Extract the product display name from the header keyword
          const keyword = PRODUCT_KEYWORDS.find((k) =>
            header.toLowerCase().includes(k.toLowerCase())
          );
          const displayName = keyword
            ? PRODUCT_DISPLAY_NAMES[keyword] || keyword
            : header;
          itemParts.push(`${qty}x ${displayName}`);
        }
      }

      const outstandingRawForRow = row.get("Outstanding Balance");
      const parsedOutstandingForRow =
        outstandingRawForRow != null && outstandingRawForRow !== ""
          ? parseFloat(outstandingRawForRow)
          : NaN;

      // Refund columns (gracefully default to null if columns don't exist yet)
      const rawRefundAmount = row.get("Refund Amount");
      const parsedRefundAmount =
        rawRefundAmount != null && rawRefundAmount !== ""
          ? parseFloat(rawRefundAmount)
          : NaN;

      orderRows.push({
        fullName: name,
        phone: row.get("Phone Number (WhatsApp)") || row.get("Phone") || "",
        items: itemParts.length > 0 ? itemParts.join(", ") : "—",
        deliveryAddress:
          row.get("Delivery Address (street and house number)") ||
          row.get("Delivery Address") ||
          row.get("Address") ||
          "",
        postcode: row.get("Postcode") || "",
        town: row.get("Town / Area") || row.get("Town") || "",
        basketTotal,
        paymentStatus: row.get("Payment Status") || "Unknown",
        outstandingBalance: isNaN(parsedOutstandingForRow)
          ? 0
          : parsedOutstandingForRow,
        orderStatus: row.get("Order Status") || "Unknown",
        refundAmount: isNaN(parsedRefundAmount) ? null : parsedRefundAmount,
        refundDate: row.get("Refund Date") || null,
        refundReason: row.get("Refund Reason") || null,
        refundMethod: row.get("Refund Method") || null,
        sheetRowIndex,
      });
    }

    // Sort unpaid by amount descending
    unpaidCustomers.sort((a, b) => b.amount - a.amount);

    // Round all payment breakdown values to 2 decimal places
    const round2 = (n: number) => (isNaN(n) ? 0 : Math.round(n * 100) / 100);

    return {
      totalOrders: thisWeek.length,
      totalRevenue: round2(totalRevenue),
      paidCount,
      unpaidCount,
      unpaidAmount: round2(unpaidAmount),
      unpaidCustomers: unpaidCustomers.map((c) => ({
        ...c,
        amount: round2(c.amount),
      })),
      paymentBreakdown: {
        totalPaid: round2(paymentBreakdown.totalPaid),
        sumupPaid: round2(paymentBreakdown.sumupPaid),
        sumupCount: paymentBreakdown.sumupCount,
        bankTransferPaid: round2(paymentBreakdown.bankTransferPaid),
        bankTransferCount: paymentBreakdown.bankTransferCount,
        otherPaid: round2(paymentBreakdown.otherPaid),
        otherCount: paymentBreakdown.otherCount,
      },
      orderRows: orderRows.map((r) => ({
        ...r,
        basketTotal: round2(r.basketTotal),
        outstandingBalance: round2(r.outstandingBalance),
        refundAmount: r.refundAmount != null ? round2(r.refundAmount) : null,
      })),
    };
  } catch (e) {
    console.error("Failed to fetch orders summary:", e);
    return null;
  }
}

export async function getProductionSummary(
  sheetsId: string,
  allTime = false
): Promise<ProductionItem[] | null> {
  try {
    const doc = await getDoc(sheetsId);
    if (!doc) return null;

    // Try reading from Production Summary tab first (has pre-calculated totals)
    const prodSheet = doc.sheetsByTitle["Production Summary"];
    if (prodSheet) {
      const rows = await prodSheet.getRows();
      // Filter by week code if the column exists and we're not in all-time mode
      const weekCode = getCurrentWeekCode();
      const hasWeekCode = prodSheet.headerValues.some(
        (h) => h.toLowerCase().replace(/\s+/g, "") === "weekcode"
      );
      const filtered = allTime
        ? rows
        : hasWeekCode
          ? rows.filter((row) => row.get("Week Code") === weekCode)
          : rows;

      const items: ProductionItem[] = [];
      for (const row of filtered) {
        const product = row.get("Product") || row.get("Item");
        const qty = parseInt(row.get("Quantity") || row.get("Total") || "0");
        if (product && qty > 0) {
          items.push({
            product: PRODUCT_DISPLAY_NAMES[product] || product,
            quantity: qty,
          });
        }
      }
      if (items.length > 0) return items;
    }

    // Fallback: aggregate from Orders tab directly
    const ordersSheet = doc.sheetsByTitle["Orders"];
    if (!ordersSheet) return null;

    const rows = await ordersSheet.getRows();
    const weekCode = getCurrentWeekCode();

    const headers = ordersSheet.headerValues;
    const totals: Record<string, number> = {};
    for (const keyword of PRODUCT_KEYWORDS) {
      totals[keyword] = 0;
    }

    for (const row of rows) {
      const wc = row.get("Week Code");
      const status = (row.get("Order Status") || "").toLowerCase();
      if (wc !== weekCode || status === "cancelled") continue;

      for (const keyword of PRODUCT_KEYWORDS) {
        const matchingHeader = findProductHeader(headers, keyword);
        if (matchingHeader) {
          const val = parseInt(row.get(matchingHeader) || "0");
          if (val > 0) totals[keyword] += val;
        }
      }
    }

    const items: ProductionItem[] = [];
    for (const [keyword, qty] of Object.entries(totals)) {
      if (qty > 0) {
        items.push({
          product: PRODUCT_DISPLAY_NAMES[keyword] || keyword,
          quantity: qty,
        });
      }
    }

    return items;
  } catch (e) {
    console.error("Failed to fetch production summary:", e);
    return null;
  }
}

export async function getDeliverySummary(
  sheetsId: string,
  allTime = false
): Promise<DeliverySummary | null> {
  try {
    const doc = await getDoc(sheetsId);
    if (!doc) return null;

    // When filtering by week, derive deliveries from the Orders tab (which has
    // Week Code). The Delivery Manifest sheet has no date/week column, so it
    // always shows stale data from the last Friday run.
    if (!allTime) {
      const ordersSheet = doc.sheetsByTitle["Orders"];
      if (ordersSheet) {
        const rows = await ordersSheet.getRows();
        const weekCode = getCurrentWeekCode();
        const townCounts: Record<string, number> = {};
        let stops = 0;

        for (const row of rows) {
          const wc = row.get("Week Code");
          const status = (row.get("Order Status") || "").toLowerCase();
          if (status === "cancelled") continue;

          let isThisWeek = wc === weekCode;
          if (!isThisWeek && !wc) {
            const submittedAt =
              row.get("Submitted at") ||
              row.get("Submitted At") ||
              row.get("Timestamp");
            if (submittedAt) {
              const d = new Date(submittedAt);
              if (!isNaN(d.getTime())) {
                isThisWeek = getWeekCodeForDate(d) === weekCode;
              }
            }
          }
          if (!isThisWeek) continue;

          const town =
            row.get("Town / Area") ||
            row.get("Town") ||
            row.get("Area") ||
            "Unknown";
          if (town && town !== "Unknown") {
            townCounts[town] = (townCounts[town] || 0) + 1;
            stops++;
          }
        }

        const byTown = Object.entries(townCounts)
          .map(([town, count]) => ({ town, count }))
          .sort((a, b) => b.count - a.count);

        return { totalStops: stops, byTown };
      }
    }

    // All-time view: use the Delivery Manifest sheet directly
    const sheet = doc.sheetsByTitle["Delivery Manifest"];
    if (!sheet) return null;

    const rows = await sheet.getRows();
    if (rows.length === 0) return { totalStops: 0, byTown: [] };

    const townCounts: Record<string, number> = {};
    for (const row of rows) {
      const town = row.get("Town") || row.get("Area") || "Unknown";
      townCounts[town] = (townCounts[town] || 0) + 1;
    }

    const byTown = Object.entries(townCounts)
      .map(([town, count]) => ({ town, count }))
      .sort((a, b) => b.count - a.count);

    return {
      totalStops: rows.length,
      byTown,
    };
  } catch (e) {
    console.error("Failed to fetch delivery summary:", e);
    return null;
  }
}


/**
 * Write refund data to a specific row in the Orders sheet.
 * Columns: Refund Amount (AA), Refund Date (AB), Refund Reason (AC), Refund Method (AD)
 */
export async function writeRefund(
  sheetsId: string,
  rowIndex: number,
  refundAmount: number,
  refundReason: string,
  refundMethod: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const doc = await getDoc(sheetsId);
    if (!doc) return { success: false, error: "Could not connect to Google Sheets" };

    const sheet = doc.sheetsByTitle["Orders"];
    if (!sheet) return { success: false, error: "Orders sheet not found" };

    const rows = await sheet.getRows();
    if (rowIndex < 0 || rowIndex >= rows.length) {
      return { success: false, error: "Invalid row index" };
    }

    const row = rows[rowIndex];
    const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

    row.set("Refund Amount", refundAmount.toString());
    row.set("Refund Date", today);
    row.set("Refund Reason", refundReason);
    row.set("Refund Method", refundMethod);
    await row.save();

    return { success: true };
  } catch (e) {
    console.error("Failed to write refund:", e);
    return { success: false, error: "Failed to write refund to sheet" };
  }
}

/**
 * Update payment status on an order row matched by Submission ID.
 * Called by the SumUp webhook when a hosted checkout is paid.
 * Searches both production and test sheets automatically.
 */
export async function updatePaymentStatus(
  sheetsId: string,
  submissionId: string,
  checkoutId: string,
  amount: number
): Promise<{ success: boolean; error?: string }> {
  try {
    const doc = await getDoc(sheetsId);
    if (!doc) return { success: false, error: "Could not connect to Google Sheets" };

    const sheet = doc.sheetsByTitle["Orders"];
    if (!sheet) return { success: false, error: "Orders sheet not found" };

    const rows = await sheet.getRows();
    const row = rows.find((r) => r.get("Submission ID") === submissionId);
    if (!row) return { success: false, error: `Row not found for submission ID: ${submissionId}` };

    row.set("Payment Status", "paid");
    row.set("Payment Reference", checkoutId);
    row.set("Payment Amount", amount.toString());
    await row.save();

    return { success: true };
  } catch (e) {
    console.error("Failed to update payment status:", e);
    return { success: false, error: "Failed to update payment status in sheet" };
  }
}

export async function getAllSheetsData(
  sheetsId: string,
  allTime = false
): Promise<SheetsData> {
  // Fetch all three in parallel for speed
  const [orders, production, deliveries] = await Promise.all([
    getOrdersSummary(sheetsId, allTime),
    getProductionSummary(sheetsId, allTime),
    getDeliverySummary(sheetsId, allTime),
  ]);

  return { orders, production, deliveries };
}
