import { NextRequest, NextResponse } from "next/server";

const BEEHIIV_PUB_ID = "pub_061e9ef1-6558-46c3-9e2b-aea33c9df2ad";

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(req: NextRequest) {
  let body: { email?: string; tag?: string };

  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { success: false, message: "Invalid request body." },
      { status: 400 }
    );
  }

  const email = body.email?.trim();
  const tag = body.tag?.trim();

  if (!email || !isValidEmail(email)) {
    return NextResponse.json(
      { success: false, message: "A valid email address is required." },
      { status: 422 }
    );
  }

  const apiKey = process.env.BEEHIIV_API_KEY;
  if (!apiKey) {
    console.error("[newsletter] BEEHIIV_API_KEY not set");
    return NextResponse.json(
      { success: false, message: "Newsletter service is not configured." },
      { status: 500 }
    );
  }

  try {
    const res = await fetch(
      `https://api.beehiiv.com/v2/publications/${BEEHIIV_PUB_ID}/subscriptions`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          email,
          reactivate_existing: true,
          send_welcome_email: true,
          utm_source: "website",
          utm_medium: tag ? "waitlist_form" : "newsletter_form",
          ...(tag ? { custom_fields: [{ name: "source", value: tag }] } : {}),
        }),
      }
    );

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      console.error("[newsletter] Beehiiv API error:", res.status, errorData);
      return NextResponse.json(
        { success: false, message: "Failed to subscribe. Please try again." },
        { status: 502 }
      );
    }

    console.log("[newsletter] subscribed:", email);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[newsletter] error:", error);
    return NextResponse.json(
      { success: false, message: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
