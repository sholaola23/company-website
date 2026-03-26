import { NextRequest, NextResponse } from "next/server";
import { validateClientAuth } from "@/lib/client-auth";
import { getClient } from "@/lib/client-config";
import { matchBankStatement, type MatchSummary } from "@/lib/bank-match";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

// Known HSBC CSV header keywords
const HSBC_HEADER_KEYWORDS = [
  "date",
  "type",
  "description",
  "paid in",
  "paid out",
  "balance",
];

const MAX_FILE_SIZE = 1 * 1024 * 1024; // 1MB

function fail(message: string, status: number) {
  return NextResponse.json({ success: false, message }, { status });
}

/**
 * Validate CSV content:
 * - Non-empty
 * - At least 2 lines
 * - First line contains commas or known HSBC header keywords
 */
function isValidBankStatementCSV(text: string): boolean {
  const trimmed = text.trim();
  if (!trimmed) return false;

  const lines = trimmed.split(/\r?\n/);
  if (lines.length < 2) return false;

  const firstLine = lines[0].toLowerCase();
  const hasCommas = firstLine.includes(",");
  const hasKnownHeaders = HSBC_HEADER_KEYWORDS.some((keyword) =>
    firstLine.includes(keyword)
  );

  return hasCommas || hasKnownHeaders;
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  // 1. Auth check
  const isAuthed = await validateClientAuth(slug);
  if (!isAuthed) {
    return fail("Unauthorized", 401);
  }

  // 2. Get client config
  const client = getClient(slug);
  if (!client) {
    return fail("Client not found", 404);
  }

  if (!client.sheetsId) {
    return fail("Sheets not configured for this client", 400);
  }

  // 3. Parse form data
  let formData: FormData;
  try {
    formData = await req.formData();
  } catch {
    return fail("Invalid request — expected file upload", 400);
  }

  const file = formData.get("file");
  if (!file || !(file instanceof File)) {
    return fail("No file provided", 400);
  }

  // 4. File extension check
  const fileName = file.name.toLowerCase();
  if (!fileName.endsWith(".csv")) {
    return fail("Only CSV files are accepted", 400);
  }

  // 5. File size check (MIME check removed — macOS sends csv as application/octet-stream)
  if (file.size > MAX_FILE_SIZE) {
    return fail("File too large (max 1MB)", 400);
  }

  // 7. Content validation
  let textContent: string;
  try {
    textContent = await file.text();
  } catch {
    return fail("Could not read file content", 400);
  }

  if (!isValidBankStatementCSV(textContent)) {
    return fail(
      "File does not appear to be a valid bank statement CSV",
      400
    );
  }

  // 8. Check Google Sheets config
  if (!process.env.GOOGLE_SERVICE_ACCOUNT) {
    return fail("Upload service not available", 503);
  }

  // 9. Parse CSV + match against orders + update Sheets
  try {
    const summary: MatchSummary = await matchBankStatement(
      textContent,
      client.sheetsId
    );

    if (summary.totalCredits === 0) {
      return NextResponse.json({
        success: true,
        message: "No payment credits found in this statement",
        summary,
      });
    }

    // Build human-readable message
    const parts: string[] = [];
    if (summary.autoMatched > 0) {
      parts.push(
        `${summary.autoMatched} payment${summary.autoMatched === 1 ? "" : "s"} matched (£${summary.totalMatchedAmount.toFixed(2)})`
      );
    }
    if (summary.needsReview > 0) {
      parts.push(
        `${summary.needsReview} need${summary.needsReview === 1 ? "s" : ""} review`
      );
    }
    if (summary.unmatched > 0) {
      parts.push(`${summary.unmatched} unmatched`);
    }
    if (summary.saveErrors > 0) {
      parts.push(
        `${summary.saveErrors} failed to save — please retry`
      );
    }

    const message = parts.join(", ");

    console.log(`[client-upload] ${client.name}: ${message}`);

    return NextResponse.json({
      success: true,
      message,
      summary,
    });
  } catch (error) {
    const errMsg = error instanceof Error ? error.message : String(error);
    console.error("[client-upload] matching error:", errMsg);
    return fail(`Matching failed: ${errMsg}`, 500);
  }
}
