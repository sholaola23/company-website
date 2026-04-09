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

/**
 * Shared handler — processes a checkout ID, verifies payment via SumUp API,
 * and writes payment status to the Google Sheet.
 */
async function processCheckout(checkoutId: string): Promise<{ updated: boolean; checkout: { checkout_reference: string; amount: number; status: string } | null }> {
  if (!SUMUP_API_KEY) return { updated: false, checkout: null };

  const checkout = await fetchCheckout(checkoutId);
  if (!checkout) return { updated: false, checkout: null };
  if (checkout.status !== "PAID") return { updated: false, checkout };

  if (!process.env.GOOGLE_SERVICE_ACCOUNT) return { updated: false, checkout };

  for (const sheetId of SHEET_IDS) {
    const result = await updatePaymentStatus(
      sheetId,
      checkout.checkout_reference,
      checkout.id,
      checkout.amount
    );
    if (result.success) {
      console.log(`SumUp: updated ${checkout.checkout_reference} as PAID (£${checkout.amount}) in sheet ${sheetId}`);
      return { updated: true, checkout };
    }
  }
  return { updated: false, checkout };
}

/**
 * GET handler — SumUp redirects the customer's browser here after payment.
 * The checkout_id comes as a query param. We process the payment and redirect
 * to a thank-you page.
 */
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const checkoutId = searchParams.get("checkout_id") || searchParams.get("id") || "";

  if (checkoutId) {
    await processCheckout(checkoutId);
  }

  // Redirect customer to a friendly thank-you page
  return NextResponse.redirect(new URL("/pay/emanuel-bakery/success", req.url));
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

  await processCheckout(checkoutId);
  return NextResponse.json({ received: true });
}
