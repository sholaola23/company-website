import { NextResponse } from "next/server";

export const maxDuration = 15;

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ checkoutId: string }> }
) {
  const { checkoutId } = await params;
  const apiKey = process.env.SUMUP_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "Payment system not configured" },
      { status: 500 }
    );
  }

  try {
    const res = await fetch(
      `https://api.sumup.com/v0.1/checkouts/${checkoutId}`,
      {
        headers: { Authorization: `Bearer ${apiKey}` },
        next: { revalidate: 0 },
      }
    );

    if (!res.ok) {
      return NextResponse.json(
        { error: "Payment not found or expired" },
        { status: 404 }
      );
    }

    const data = await res.json();

    return NextResponse.json({
      amount: data.amount,
      currency: data.currency,
      description: data.description,
      merchant_name: data.merchant_name,
      status: data.status,
      checkout_reference: data.checkout_reference,
    });
  } catch {
    return NextResponse.json(
      { error: "Could not verify payment details" },
      { status: 500 }
    );
  }
}
