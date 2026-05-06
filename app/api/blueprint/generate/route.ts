import { NextRequest } from "next/server";
import { ANTHROPIC_API_URL, ANTHROPIC_VERSION, heliconeHeaders } from "@/lib/constants";
import { requireGuard } from "@/lib/api-guard";

export const maxDuration = 60;

interface BlueprintRequest {
  industry: string;
  painPoints: string[];
  channels: string[];
  enquiryVolume: string;
  businessName: string;
}

interface Opportunity {
  title: string;
  impact: "high" | "medium" | "low";
  hoursSavedPerWeek: number;
  description: string;
  solution: string;
}

interface BlueprintResult {
  headline: string;
  opportunities: Opportunity[];
  totalHoursSaved: number;
  monthlyRevenuePotential: number;
  roiMultiple: number;
  beforeAfter: { before: string; after: string };
  recommendedTier: "starter" | "growth" | "scale";
  tierReason: string;
}

function buildPrompt(data: BlueprintRequest): string {
  const { industry, painPoints, channels, enquiryVolume, businessName } = data;

  return `You are a senior AI automation consultant at WorkCrew Ltd. A prospect just completed our AI Blueprint Generator. Based on their answers, produce a personalised AI automation blueprint.

PROSPECT DATA:
- Business Name: ${businessName}
- Industry: ${industry}
- Biggest Time Drains: ${painPoints.join(", ")}
- How Customers Find Them: ${channels.join(", ")}
- Monthly Enquiry Volume: ${enquiryVolume}

YOUR TASK: Generate a JSON blueprint with exactly this structure (no markdown, no code fences, pure JSON):

{
  "headline": "A punchy one-line headline for their blueprint, e.g. '${businessName}: 17 Hours Back Every Week'",
  "opportunities": [
    {
      "title": "Name of the automation (e.g. 'lead intake Agent', 'AI Email Assistant')",
      "impact": "high or medium or low",
      "hoursSavedPerWeek": <number>,
      "description": "2-3 sentences explaining what this does for THEIR specific business. Reference their industry and pain points. Be concrete — 'Your plumbing enquiries get a response in 60 seconds instead of 4 hours' not 'AI responds faster'. Use UK English.",
      "solution": "The WorkCrew solution name: Lead Intake, Email Assistant, WhatsApp Bot, SEO Content, Social Engine, Lead Scraping, Voice Agent, Website, Order-to-Delivery, or Workshop"
    }
  ],
  "totalHoursSaved": <sum of all hoursSavedPerWeek>,
  "monthlyRevenuePotential": <estimated monthly revenue recovery in GBP — calculate based on their enquiry volume, industry average job value, and conversion improvement from faster response>,
  "roiMultiple": <how many times the retainer pays for itself — monthlyRevenuePotential divided by ~200>,
  "beforeAfter": {
    "before": "A vivid 2-sentence description of their Monday morning WITHOUT automation. Make it specific to their industry. E.g. for a plumber: 'Monday starts with 14 missed calls from the weekend sitting in voicemail. You spend the first 2 hours calling people back — half don't answer because they already called someone else.'",
    "after": "A vivid 2-sentence description of their Monday morning WITH automation. E.g. 'Monday starts with a dashboard showing 8 new appointments already booked over the weekend. Every enquiry got an instant response, the urgent ones are flagged, and your calendar is full until Wednesday.'"
  },
  "recommendedTier": "starter or growth or scale",
  "tierReason": "One sentence explaining why this tier fits, referencing their enquiry volume and pain points"
}

RULES:
- Return EXACTLY 3 opportunities, ranked by impact (highest first)
- The top opportunity should ALWAYS address their biggest pain point — DO NOT default to lead/enquiry automation if they didn't select it
- Match the solution to their ACTUAL business model:
  - Restaurants, bakeries, food businesses → think: order management, customer retention, review automation, online menu, social content — NOT lead capture (they don't do "leads")
  - MOT centres, garages, automotive → think: booking reminders, service due notifications, review requests, online booking — NOT "qualifying leads"
  - Retail, e-commerce → think: customer retention, abandoned cart, re-engagement, social content, inventory alerts — NOT traditional lead gen
  - Professional services (accountants, solicitors) → think: document chasing, client intake, email management — these DO benefit from lead intake
  - Trades (plumber, electrician, cleaner) → think: speed-to-lead, booking, follow-up — classic lead automation
  - If they selected "No website or poor online presence" → Website MUST be one of the 3 opportunities
  - If they selected "Managing orders & fulfilment" → Order-to-Delivery or a custom workflow MUST be recommended
- Available solutions: Lead Intake, Email Assistant, WhatsApp Bot, SEO Content, Social Engine, Lead Scraping, Voice Agent, Website, Order-to-Delivery, Workshop, Custom Automation, Booking System, Review Automation, Customer Retention
- hoursSavedPerWeek must be realistic: 3-12 per opportunity, total should be 10-25
- monthlyRevenuePotential should be calculated realistically:
  - For lead-based businesses: enquiry volume * avg job value * conversion improvement (15-30%)
  - For order-based businesses (restaurants, bakeries): avg orders/week * avg order value * retention improvement
  - For recurring businesses (gyms, salons, MOTs): customer lifetime value * churn reduction
  - Industry avg values (GBP): Plumber/Electrician/HVAC: 300, Cleaner: 80, Salon/Barber: 40, Restaurant/Bakery: 25, Accountant/Solicitor: 500, Gym/PT: 50, Dentist: 200, Estate Agent: 2000, Construction: 1500, MOT/Garage: 150, Retail: 30, Other: 150
- roiMultiple should be 5-20x (realistic, not hype)
- beforeAfter must be SPECIFIC to their industry and business model — a restaurant's "before" is about lost orders and no reviews, NOT "missed leads"
- All monetary values in GBP
- Use UK English throughout
- The blueprint should make them think "wow, this is specific to MY business" — if it could apply to any other industry, it's too generic
- Output ONLY valid JSON. No preamble, no explanation, no code fences.`;
}

export async function POST(req: NextRequest) {
  // Guard FIRST — Haiku endpoint, but still public.
  const guard = requireGuard(req, {
    endpoint: "blueprint-generate",
    perIpLimit: 5,
  });
  if (!guard.ok) {
    return Response.json({ error: guard.message }, { status: guard.status });
  }

  try {
    const body = (await req.json()) as BlueprintRequest;

    // Validate required fields
    if (!body.industry || !body.painPoints?.length || !body.businessName) {
      return Response.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return Response.json(
        { error: "API not configured" },
        { status: 500 }
      );
    }

    const response = await fetch(ANTHROPIC_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": ANTHROPIC_VERSION,
        ...heliconeHeaders(),
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 1500,
        messages: [
          { role: "user", content: buildPrompt(body) },
        ],
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      console.error("[blueprint/generate] Anthropic error:", err);
      return Response.json(
        { error: "Failed to generate blueprint" },
        { status: 502 }
      );
    }

    const anthropicData = await response.json();
    const rawText = anthropicData.content?.[0]?.text ?? "";

    // Parse JSON from response (handle potential code fences)
    const jsonStr = rawText.replace(/```json?\n?/g, "").replace(/```/g, "").trim();
    let blueprint: BlueprintResult;

    try {
      blueprint = JSON.parse(jsonStr);
    } catch {
      console.error("[blueprint/generate] JSON parse failed:", rawText);
      return Response.json(
        { error: "Failed to parse blueprint" },
        { status: 502 }
      );
    }

    return Response.json({ blueprint });
  } catch (err) {
    console.error("[blueprint/generate] Error:", err);
    return Response.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
