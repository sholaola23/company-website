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
// POST /api/rank-ready/webhook
// ---------------------------------------------------------------------------

export async function POST(req: NextRequest) {
  const stripe = getStripe();
  if (!stripe) {
    console.error("[rank-ready/webhook] STRIPE_SECRET_KEY not set");
    return NextResponse.json({ received: false }, { status: 503 });
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    console.error("[rank-ready/webhook] STRIPE_WEBHOOK_SECRET not set");
    return NextResponse.json({ received: false }, { status: 503 });
  }

  const signature = req.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json(
      { message: "Missing stripe-signature header." },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  try {
    const rawBody = await req.text();
    event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
  } catch (err) {
    console.error("[rank-ready/webhook] signature verification failed:", err);
    return NextResponse.json(
      { message: "Webhook signature verification failed." },
      { status: 400 }
    );
  }

  // ---------------------------------------------------------------------------
  // Handle checkout.session.completed
  // ---------------------------------------------------------------------------

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    // Only handle RankReady payments
    if (session.metadata?.product !== "rankready") {
      return NextResponse.json({ received: true });
    }

    const sessionId = session.id;
    const email = session.metadata?.email || session.customer_email || "";
    const businessName = session.metadata?.businessName || "";

    console.log(
      `[rank-ready/webhook] Payment completed: ${businessName} (${email}), session=${sessionId}`
    );

    // Retrieve form data from Blob storage
    let formData: Record<string, unknown> | null = null;

    if (process.env.BLOB_READ_WRITE_TOKEN) {
      try {
        const { list } = await import("@vercel/blob");
        const blobs = await list({ prefix: `rankready-pending/${sessionId}.json` });
        if (blobs.blobs.length > 0) {
          const res = await fetch(blobs.blobs[0].url);
          formData = await res.json();
        }
      } catch (blobErr) {
        console.error("[rank-ready/webhook] blob read failed:", blobErr);
      }
    }

    // Trigger report generation asynchronously
    // In production, this would be a queue. For MVP, we fire-and-forget to the generate endpoint.
    const origin = process.env.NEXT_PUBLIC_SITE_URL || "https://workcrew.io";

    try {
      // Non-blocking call to the generate route
      fetch(`${origin}/api/rank-ready/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId,
          email,
          businessName,
          formData,
          paid: true,
        }),
      }).catch((genErr) => {
        console.error("[rank-ready/webhook] generate trigger failed:", genErr);
      });
    } catch (triggerErr) {
      console.error("[rank-ready/webhook] generate trigger error:", triggerErr);
    }
  }

  return NextResponse.json({ received: true });
}
