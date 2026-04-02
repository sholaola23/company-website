import { NextRequest, NextResponse } from "next/server";
import { updatePaymentStatus } from "@/lib/google-sheets";

export const maxDuration = 15;

// Sheet IDs for E'Manuel — production + test
const SHEET_IDS = [
  "1Ns6S_2Nt7-OxQv2As5iof62_6wYu-qb2jK42MPUa8vw", // production
  "1HCS6jTgUznzXLsJyMZ5aAkoVS1UbboygdnmBvB8O5MA", // test
];

const SUMUP_API_KEY = process.env.SUMUP_API_KEY || "";

/**
 * Fetch checkout details from SumUp API.
 * The webhook payload only contains event_type + id, so we must
 * call the API to get the actual status, amount, and checkout_reference.
 */
async function fetchCheckout(checkoutId: string) {
  const res = await fetch(`https://api.sumup.com/v0.1/checkouts/${checkoutId}`, {
    headers: { Authorization: `Bearer ${SUMUP_API_KEY}` },
  });
  if (!res.ok) return null;
  return res.json() as Promise<{
    id: string;
    checkout_reference: string;
    amount: number;
    currency: string;
    status: string;
  }>;
}

export async function POST(req: NextRequest) {
  let payload: { event_type?: string; id?: string };

  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  // Only process checkout status changes
  if (payload.event_type !== "CHECKOUT_STATUS_CHANGED") {
    return NextResponse.json({ received: true });
  }

  const checkoutId = payload.id;
  if (!checkoutId) {
    return NextResponse.json({ received: true });
  }

  // Verify actual payment status via SumUp API (never trust webhook payload alone)
  if (!SUMUP_API_KEY) {
    console.error("SumUp webhook: SUMUP_API_KEY not configured");
    return NextResponse.json({ error: "SumUp API key not configured" }, { status: 500 });
  }

  const checkout = await fetchCheckout(checkoutId);
  if (!checkout) {
    console.error(`SumUp webhook: could not fetch checkout ${checkoutId}`);
    return NextResponse.json({ error: "Could not verify checkout" }, { status: 502 });
  }

  // Only update sheet for paid checkouts
  if (checkout.status !== "PAID") {
    console.log(`SumUp webhook: checkout ${checkoutId} status is ${checkout.status}, skipping`);
    return NextResponse.json({ received: true });
  }

  if (!process.env.GOOGLE_SERVICE_ACCOUNT) {
    console.error("SumUp webhook: GOOGLE_SERVICE_ACCOUNT not configured");
    return NextResponse.json({ error: "Sheet credentials not configured" }, { status: 500 });
  }

  // Try each sheet — bot orders could land in test or production
  let updated = false;
  for (const sheetId of SHEET_IDS) {
    const result = await updatePaymentStatus(
      sheetId,
      checkout.checkout_reference,
      checkout.id,
      checkout.amount
    );
    if (result.success) {
      console.log(`SumUp webhook: updated ${checkout.checkout_reference} as PAID (£${checkout.amount}) in sheet ${sheetId}`);
      updated = true;
      break;
    }
  }

  if (!updated) {
    console.warn(`SumUp webhook: no matching order for checkout_reference=${checkout.checkout_reference}`);
  }

  return NextResponse.json({ received: true });
}
