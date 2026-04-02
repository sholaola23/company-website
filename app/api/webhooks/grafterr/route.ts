import { NextRequest, NextResponse } from "next/server";

export const maxDuration = 15;

/**
 * Grafterr webhook handler
 *
 * Receives payment and order status events from Grafterr Pay (Stripe-powered).
 * Verifies the event against the Grafterr API, then updates the Tasty E order sheet.
 *
 * ⚠️ STUB — Grafterr webhook payload structure and auth method are placeholders.
 * Update once API docs are confirmed from the Grafterr partnership call.
 *
 * Expected events:
 *   order.paid        — payment completed, update sheet payment status
 *   order.cancelled   — order cancelled, flag in sheet
 *   order.refunded    — refund issued, update sheet
 *
 * Webhook security:
 *   TBC — likely HMAC signature header or API key validation
 *   Set GRAFTERR_WEBHOOK_SECRET in Vercel env vars once confirmed
 */

const GRAFTERR_WEBHOOK_SECRET = process.env.GRAFTERR_WEBHOOK_SECRET || "";
const GRAFTERR_API_KEY = process.env.GRAFTERR_API_KEY || "";

// Tasty E order sheet — to be created
const TASTY_E_SHEET_ID = process.env.TASTY_E_SHEET_ID || "";

async function verifyOrder(orderId: string) {
  if (!GRAFTERR_API_KEY) return null;

  // TODO: Confirm actual Grafterr API base URL and order endpoint from docs
  const res = await fetch(`https://api.grafterr.com/v1/orders/${orderId}`, {
    headers: {
      Authorization: `Bearer ${GRAFTERR_API_KEY}`,
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) return null;
  return res.json() as Promise<{
    id: string;
    order_reference: string;
    status: string;
    total_amount: number;
    currency: string;
    payment_status: string;
  }>;
}

async function updateSheetPaymentStatus(
  sheetId: string,
  orderReference: string,
  orderId: string,
  amount: number,
  status: string
) {
  // Import from shared google-sheets lib once Tasty E sheet is set up
  // For now: placeholder
  console.log(`[Grafterr webhook] Would update sheet ${sheetId}: ref=${orderReference} status=${status} amount=${amount}`);
  return { success: true };
}

export async function POST(req: NextRequest) {
  let payload: {
    event_type?: string;
    event?: string;
    id?: string;
    order_id?: string;
    data?: { id?: string; order_reference?: string; status?: string };
  };

  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  // TODO: Verify webhook signature once Grafterr docs confirm the method
  // Example HMAC check (adjust header name and algorithm once confirmed):
  // const signature = req.headers.get("x-grafterr-signature") || "";
  // const isValid = verifyHmacSignature(rawBody, GRAFTERR_WEBHOOK_SECRET, signature);
  // if (!isValid) return NextResponse.json({ error: "Invalid signature" }, { status: 401 });

  // Support multiple possible payload shapes until docs confirmed
  const eventType = payload.event_type || payload.event || "";
  const orderId = payload.id || payload.order_id || payload.data?.id || "";

  console.log(`[Grafterr webhook] Received event: ${eventType}, order: ${orderId}`);

  // Only process paid events
  const isPaidEvent = ["order.paid", "payment.completed", "checkout.completed"].includes(eventType);
  if (!isPaidEvent) {
    console.log(`[Grafterr webhook] Ignoring event type: ${eventType}`);
    return NextResponse.json({ received: true });
  }

  if (!orderId) {
    return NextResponse.json({ received: true });
  }

  // Verify actual payment status via Grafterr API (never trust webhook alone)
  if (!GRAFTERR_API_KEY) {
    console.error("[Grafterr webhook] GRAFTERR_API_KEY not configured");
    return NextResponse.json({ error: "Grafterr API key not configured" }, { status: 500 });
  }

  const order = await verifyOrder(orderId);
  if (!order) {
    console.error(`[Grafterr webhook] Could not verify order ${orderId}`);
    return NextResponse.json({ error: "Could not verify order" }, { status: 502 });
  }

  const isPaid = ["paid", "completed", "payment_completed"].includes(order.payment_status?.toLowerCase() || order.status?.toLowerCase());
  if (!isPaid) {
    console.log(`[Grafterr webhook] Order ${orderId} status is ${order.status}, skipping`);
    return NextResponse.json({ received: true });
  }

  // Update Tasty E sheet
  if (TASTY_E_SHEET_ID) {
    const result = await updateSheetPaymentStatus(
      TASTY_E_SHEET_ID,
      order.order_reference,
      order.id,
      order.total_amount,
      "paid"
    );

    if (result.success) {
      console.log(`[Grafterr webhook] Updated order ${order.order_reference} as PAID (£${order.total_amount})`);
    } else {
      console.warn(`[Grafterr webhook] No matching order for reference=${order.order_reference}`);
    }
  } else {
    console.warn("[Grafterr webhook] TASTY_E_SHEET_ID not configured — skipping sheet update");
  }

  return NextResponse.json({ received: true });
}
