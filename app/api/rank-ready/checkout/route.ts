import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export const maxDuration = 30;

// ---------------------------------------------------------------------------
// Stripe init
// ---------------------------------------------------------------------------

function getStripe(): Stripe | null {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return null;
  return new Stripe(key, { apiVersion: "2026-03-25.dahlia" });
}

// ---------------------------------------------------------------------------
// In-memory pending orders (replace with KV / DB in production)
// We store form data keyed by Stripe session ID so the webhook can pick it up.
// ---------------------------------------------------------------------------

// NOTE: In a serverless environment this in-memory store will NOT persist
// across invocations. For production, move to Vercel KV or a database.
// For MVP launch this works because the generate route re-reads from Blob.
const pendingOrders = new Map<string, unknown>();

export { pendingOrders };

// ---------------------------------------------------------------------------
// POST /api/rank-ready/checkout
// ---------------------------------------------------------------------------

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;

  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { message: "Invalid request body." },
      { status: 400 }
    );
  }

  const email = typeof body.email === "string" ? body.email.trim() : "";
  const businessName =
    typeof body.businessName === "string" ? body.businessName.trim() : "";

  if (!email || !businessName) {
    return NextResponse.json(
      { message: "Email and business name are required." },
      { status: 422 }
    );
  }

  const stripe = getStripe();
  if (!stripe) {
    console.error("[rank-ready/checkout] STRIPE_SECRET_KEY not set");
    return NextResponse.json(
      { message: "Payment processing is not configured yet. Please try again later." },
      { status: 503 }
    );
  }

  const priceId = process.env.STRIPE_RANKREADY_PRICE_ID;
  if (!priceId) {
    console.error("[rank-ready/checkout] STRIPE_RANKREADY_PRICE_ID not set");
    return NextResponse.json(
      { message: "Payment processing is not configured yet. Please try again later." },
      { status: 503 }
    );
  }

  try {
    const origin = req.headers.get("origin") || "https://workcrew.io";

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      customer_email: email,
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${origin}/tools/rank-ready/report?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/tools/rank-ready?cancelled=true`,
      metadata: {
        product: "rankready",
        businessName,
        email,
      },
    });

    // Store form data for later retrieval by webhook/generate route
    if (session.id) {
      pendingOrders.set(session.id, body);

      // Also store in Vercel Blob so it persists across serverless invocations
      if (process.env.BLOB_READ_WRITE_TOKEN) {
        try {
          const { put } = await import("@vercel/blob");
          await put(
            `rankready-pending/${session.id}.json`,
            JSON.stringify(body),
            {
              access: "public",
              contentType: "application/json",
              addRandomSuffix: false,
            }
          );
        } catch (blobErr) {
          console.error("[rank-ready/checkout] blob store failed:", blobErr);
          // Non-fatal — we still have the in-memory store
        }
      }
    }

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("[rank-ready/checkout] Stripe error:", err);
    return NextResponse.json(
      { message: "Failed to create checkout session." },
      { status: 500 }
    );
  }
}
