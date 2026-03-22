import { NextRequest, NextResponse } from "next/server";
import { validateClientAuth } from "@/lib/client-auth";
import { getClient } from "@/lib/client-config";
import {
  uploadFileToDrive,
  GoogleDriveNotConfiguredError,
  GoogleDriveUploadError,
} from "@/lib/google-drive";

// Known HSBC CSV header keywords (first line of a valid statement)
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
 * Generate a safe timestamp string (no colons) for filenames.
 * e.g. "20260322T154500Z"
 */
function safeTimestamp(): string {
  return new Date()
    .toISOString()
    .replace(/[-:]/g, "")
    .replace(/\.\d{3}Z$/, "Z");
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

  // Check for commas (basic CSV structure)
  const hasCommas = firstLine.includes(",");

  // Check for known HSBC header keywords
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

  // 2. Client has driveFolderId
  const client = getClient(slug);
  if (!client?.driveFolderId) {
    return fail("Upload not configured for this client", 400);
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

  // 5. MIME type check
  const allowedMimes = [
    "text/csv",
    "application/vnd.ms-excel",
    "text/plain",
    "application/csv",
  ];
  if (!allowedMimes.includes(file.type)) {
    return fail("Invalid file type", 400);
  }

  // 6. File size check
  if (file.size > MAX_FILE_SIZE) {
    return fail("File too large (max 1MB)", 400);
  }

  // 7. Content validation
  let content: Buffer;
  let textContent: string;
  try {
    const arrayBuffer = await file.arrayBuffer();
    content = Buffer.from(arrayBuffer);
    textContent = content.toString("utf-8");
  } catch {
    return fail("Could not read file content", 400);
  }

  if (!isValidBankStatementCSV(textContent)) {
    return fail(
      "File does not appear to be a valid bank statement CSV",
      400
    );
  }

  // 8. Upload to Google Drive
  const uploadFileName = `bank-statement-${safeTimestamp()}.csv`;

  try {
    await uploadFileToDrive(
      client.driveFolderId,
      uploadFileName,
      content,
      "text/csv"
    );

    console.log(
      `[client-upload] ${client.name}: uploaded ${uploadFileName}`
    );

    return NextResponse.json({
      success: true,
      fileName: uploadFileName,
    });
  } catch (error) {
    if (error instanceof GoogleDriveNotConfiguredError) {
      return fail("Upload service not available", 503);
    }

    if (error instanceof GoogleDriveUploadError) {
      console.error(`[client-upload] Drive error: ${error.message}`);
      return fail("Upload failed. Please try again.", 500);
    }

    // Unexpected errors
    console.error("[client-upload] unexpected error:", error);
    return fail("Upload failed. Please try again.", 500);
  }
}
