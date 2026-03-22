import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { validateClientAuth } from "@/lib/client-auth";
import { getClient } from "@/lib/client-config";

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

/**
 * Trigger n8n workflow to process the uploaded bank statement.
 * WF02 (HSBC CSV Bank Match) can be triggered via webhook.
 */
async function triggerN8nProcessing(blobUrl: string, clientName: string) {
  const n8nApiKey = process.env.N8N_API_KEY;
  if (!n8nApiKey) {
    console.warn("[client-upload] N8N_API_KEY not set — skipping trigger");
    return;
  }

  // Trigger WF02 (Bank Match) via n8n webhook
  // The workflow will download the CSV from the blob URL and process it
  const webhookUrl = process.env.N8N_BANK_MATCH_WEBHOOK;
  if (!webhookUrl) {
    console.warn(
      "[client-upload] N8N_BANK_MATCH_WEBHOOK not set — n8n will pick up via polling"
    );
    return;
  }

  try {
    await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        blobUrl,
        clientName,
        uploadedAt: new Date().toISOString(),
      }),
    });
    console.log("[client-upload] triggered n8n bank match workflow");
  } catch (error) {
    // Non-fatal — n8n polling will pick it up eventually
    console.warn("[client-upload] failed to trigger n8n:", error);
  }
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

  // 8. Upload to Vercel Blob
  const uploadFileName = `bank-statements/${client.slug}/bank-statement-${safeTimestamp()}.csv`;

  try {
    const blob = await put(uploadFileName, textContent, {
      access: "public",
      contentType: "text/csv",
    });

    console.log(
      `[client-upload] ${client.name}: uploaded ${uploadFileName} → ${blob.url}`
    );

    // 9. Trigger n8n to process (non-blocking, best-effort)
    triggerN8nProcessing(blob.url, client.name).catch(() => {
      /* ignore — n8n polling is the fallback */
    });

    return NextResponse.json({
      success: true,
      fileName: uploadFileName,
    });
  } catch (error) {
    const errMsg = error instanceof Error ? error.message : String(error);
    console.error("[client-upload] blob upload error:", errMsg);
    return fail("Upload failed. Please try again.", 500);
  }
}
