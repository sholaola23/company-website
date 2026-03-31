import { NextRequest, NextResponse } from "next/server";
import { ANTHROPIC_API_URL, ANTHROPIC_VERSION, heliconeHeaders } from "@/lib/constants";
import {
  getGBPDescriptionPrompt,
  getReviewStrategyPrompt,
  getServiceDescriptionsPrompt,
} from "@/lib/rankready-prompts";
import type { RankReadyFormData } from "@/lib/rankready-types";

export const maxDuration = 120;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

async function callClaude(systemPrompt: string, userMessage: string): Promise<string> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) throw new Error("ANTHROPIC_API_KEY not set");

  const res = await fetch(ANTHROPIC_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      ...heliconeHeaders(), "anthropic-version": ANTHROPIC_VERSION,
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 4000,
      system: systemPrompt,
      messages: [{ role: "user", content: userMessage }],
    }),
  });

  if (!res.ok) {
    const errText = await res.text().catch(() => "Unknown error");
    throw new Error(`Claude API error ${res.status}: ${errText}`);
  }

  const data = await res.json();
  return data.content?.[0]?.text || "";
}

function parseJSON<T>(raw: string): T {
  // Strip markdown code fences if present
  let cleaned = raw.trim();
  if (cleaned.startsWith("```")) {
    cleaned = cleaned.replace(/^```(?:json)?\n?/, "").replace(/\n?```$/, "");
  }
  return JSON.parse(cleaned);
}

// ---------------------------------------------------------------------------
// POST /api/rank-ready/preview
// ---------------------------------------------------------------------------

export async function POST(req: NextRequest) {
  let body: Partial<RankReadyFormData & { email: string }>;

  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { message: "Invalid request body." },
      { status: 400 }
    );
  }

  const email = body.email?.trim();
  if (!email) {
    return NextResponse.json(
      { message: "Email is required for the free preview." },
      { status: 422 }
    );
  }

  if (!body.businessName?.trim() || !body.primaryService?.trim()) {
    return NextResponse.json(
      { message: "Business name and primary service are required." },
      { status: 422 }
    );
  }

  // Build a clean FormData object with defaults
  const formData: RankReadyFormData = {
    businessName: body.businessName.trim(),
    address: body.address?.trim() || "",
    phone: body.phone?.trim() || "",
    website: body.website?.trim(),
    gbpUrl: body.gbpUrl?.trim(),
    yearsInBusiness: body.yearsInBusiness || 1,
    primaryService: body.primaryService.trim(),
    secondaryServices: body.secondaryServices?.filter(Boolean) || [],
    serviceAreas: body.serviceAreas?.filter(Boolean) || [],
    targetCustomer: body.targetCustomer?.trim() || "",
    competitors: body.competitors?.filter((c) => c.name.trim()) || [],
    reviewCount: body.reviewCount,
    starRating: body.starRating,
    biggestProblem: body.biggestProblem?.trim(),
    email,
  };

  try {
    // Generate 3 of 5 outputs in parallel
    const [gbpDescRaw, reviewRaw, serviceRaw] = await Promise.all([
      callClaude(
        getGBPDescriptionPrompt(formData),
        `Generate 3 GBP description variants for ${formData.businessName}.`
      ),
      callClaude(
        getReviewStrategyPrompt(formData),
        `Create a review generation strategy for ${formData.businessName}.`
      ),
      callClaude(
        getServiceDescriptionsPrompt(formData),
        `Write service page content for ${formData.businessName}.`
      ),
    ]);

    const gbpDescription = parseJSON(gbpDescRaw);
    const reviewStrategy = parseJSON(reviewRaw);
    const serviceDescriptions = parseJSON(serviceRaw);

    // Tag email in Beehiiv (non-blocking)
    tagBeehiivSubscriber(email).catch((err) =>
      console.error("[rank-ready/preview] Beehiiv tag failed:", err)
    );

    return NextResponse.json({
      type: "preview",
      businessName: formData.businessName,
      gbpDescription,
      reviewStrategy,
      serviceDescriptions,
    });
  } catch (err) {
    console.error("[rank-ready/preview] generation failed:", err);
    return NextResponse.json(
      { message: "Failed to generate preview. Please try again." },
      { status: 500 }
    );
  }
}

// ---------------------------------------------------------------------------
// Beehiiv tagging (best-effort)
// ---------------------------------------------------------------------------

async function tagBeehiivSubscriber(email: string): Promise<void> {
  const apiKey = process.env.BEEHIIV_API_KEY;
  const pubId = "pub_061e9ef1-6558-46c3-9e2b-aea33c9df2ad";
  if (!apiKey) return;

  // Create/update subscriber with tag
  await fetch(`https://api.beehiiv.com/v2/publications/${pubId}/subscriptions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      email,
      utm_source: "rankready-free",
      custom_fields: [],
      send_welcome_email: false,
    }),
  });
}
