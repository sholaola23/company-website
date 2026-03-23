import { NextRequest, NextResponse } from "next/server";
import { validateClientAuth } from "@/lib/client-auth";
import { getClient } from "@/lib/client-config";
import { writeRefund } from "@/lib/google-sheets";

export const dynamic = "force-dynamic";

const VALID_REASONS = [
  "Product unavailable",
  "Customer request",
  "Quality issue",
  "Overpayment",
  "Other",
];

const VALID_METHODS = ["SumUp", "Bank Transfer", "Cash"];

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  const isAuthed = await validateClientAuth(slug);
  if (!isAuthed) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const client = getClient(slug);
  if (!client) {
    return NextResponse.json({ error: "Client not found" }, { status: 404 });
  }

  if (!client.sheetsId) {
    return NextResponse.json(
      { error: "Google Sheets not configured for this client" },
      { status: 404 }
    );
  }

  if (!process.env.GOOGLE_SERVICE_ACCOUNT) {
    return NextResponse.json(
      { error: "Google Sheets credentials not configured" },
      { status: 500 }
    );
  }

  let body: {
    rowIndex?: number;
    refundAmount?: number;
    refundReason?: string;
    refundMethod?: string;
  };

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { rowIndex, refundAmount, refundReason, refundMethod } = body;

  // Validate required fields
  if (rowIndex == null || typeof rowIndex !== "number" || rowIndex < 0) {
    return NextResponse.json({ error: "Invalid rowIndex" }, { status: 400 });
  }

  if (refundAmount == null || typeof refundAmount !== "number" || refundAmount <= 0) {
    return NextResponse.json(
      { error: "Refund amount must be a positive number" },
      { status: 400 }
    );
  }

  if (!refundReason || typeof refundReason !== "string") {
    return NextResponse.json({ error: "Refund reason is required" }, { status: 400 });
  }

  // Allow "Other: <custom text>" pattern or exact match
  const isValidReason =
    VALID_REASONS.includes(refundReason) ||
    refundReason.startsWith("Other: ");
  if (!isValidReason) {
    return NextResponse.json({ error: "Invalid refund reason" }, { status: 400 });
  }

  if (!refundMethod || !VALID_METHODS.includes(refundMethod)) {
    return NextResponse.json({ error: "Invalid refund method" }, { status: 400 });
  }

  const result = await writeRefund(
    client.sheetsId,
    rowIndex,
    refundAmount,
    refundReason,
    refundMethod
  );

  if (!result.success) {
    return NextResponse.json(
      { error: result.error || "Failed to process refund" },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}
