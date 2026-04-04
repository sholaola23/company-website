import { NextRequest } from "next/server";

export const maxDuration = 30;

interface SaveRequest {
  email: string;
  businessName: string;
  industry: string;
  painPoints: string[];
  channels: string[];
  enquiryVolume: string;
  blueprint: {
    headline: string;
    totalHoursSaved: number;
    monthlyRevenuePotential: number;
    recommendedTier: string;
    opportunities: { title: string; solution: string }[];
  };
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as SaveRequest;

    if (!body.email || !body.businessName) {
      return Response.json({ error: "Email and business name required" }, { status: 400 });
    }

    const results = await Promise.allSettled([
      // 1. Add to Notion Sales Pipeline
      createNotionLead(body),
      // 2. Subscribe to Beehiiv newsletter
      subscribeToBeehiiv(body.email),
      // 3. Send blueprint email via Resend
      sendBlueprintEmail(body),
    ]);

    const notionResult = results[0];
    const notionPageId = notionResult.status === "fulfilled" ? notionResult.value : null;

    return Response.json({
      success: true,
      notionPageId,
      errors: results
        .filter((r) => r.status === "rejected")
        .map((r) => (r as PromiseRejectedResult).reason?.message ?? "Unknown error"),
    });
  } catch (err) {
    console.error("[blueprint/save] Error:", err);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}

// ---------------------------------------------------------------------------
// Notion — create lead in Sales Pipeline
// ---------------------------------------------------------------------------

async function createNotionLead(data: SaveRequest): Promise<string | null> {
  const notionKey = process.env.NOTION_API_KEY;
  if (!notionKey) return null;

  // Sales Pipeline database data source ID
  const databaseId = "34cbc272c1904ac887542435270bea79";

  const solutionNames = data.blueprint.opportunities.map((o) => o.solution);
  const painPointsText = data.painPoints.join(", ");
  const channelsText = data.channels.join(", ");

  const leadIntelligence = `[BLUEPRINT ${new Date().toISOString().split("T")[0]}] Generated via AI Blueprint Generator. Pain points: ${painPointsText}. Customer channels: ${channelsText}. Enquiry volume: ${data.enquiryVolume}/month. Blueprint headline: "${data.blueprint.headline}". Top opportunity: ${data.blueprint.opportunities[0]?.title ?? "N/A"}. Estimated ${data.blueprint.totalHoursSaved} hrs/week saveable, £${data.blueprint.monthlyRevenuePotential}/month revenue potential. Recommended tier: ${data.blueprint.recommendedTier}.`;

  const response = await fetch("https://api.notion.com/v1/pages", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${notionKey}`,
      "Content-Type": "application/json",
      "Notion-Version": "2022-06-28",
    },
    body: JSON.stringify({
      parent: { database_id: databaseId },
      properties: {
        "Business Name": { title: [{ text: { content: data.businessName } }] },
        Email: { email: data.email },
        Industry: { select: { name: mapIndustry(data.industry) } },
        Source: { select: { name: "Blueprint Generator" } },
        Status: { select: { name: "new" } },
        "Lead Score": { number: calculateLeadScore(data) },
        "Best Solution": {
          rich_text: [{ text: { content: JSON.stringify(solutionNames) } }],
        },
        "Pain Points": {
          rich_text: [{ text: { content: painPointsText } }],
        },
        "Online Presence Notes": {
          rich_text: [{ text: { content: `Channels: ${channelsText}. Volume: ${data.enquiryVolume}/month.` } }],
        },
        "Needs Email": { select: { name: "__NO__" } },
        "Lead Intelligence": {
          rich_text: [{ text: { content: leadIntelligence } }],
        },
      },
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    console.error("[blueprint/save] Notion error:", err);
    throw new Error("Notion create failed");
  }

  const page = await response.json();
  return page.id;
}

function mapIndustry(industry: string): string {
  const map: Record<string, string> = {
    "Plumbing": "Plumber",
    "Cleaning": "Cleaner",
    "Electrician": "Electrician",
    "Salon / Barber": "Salon",
    "Beauty / Spa": "Beauty/Spa",
    "Gym / Fitness": "Gym",
    "Dentist / Dental": "Dentist",
    "Restaurant / Cafe": "Restaurant",
    "Estate Agent": "Estate Agent",
    "Construction": "Construction",
    "Accounting / Finance": "Accountant",
    "Legal": "Solicitor/Legal",
    "Recruitment": "Recruitment",
    "Coaching": "Coach",
    "Church / Non-Profit": "Church/Non-profit",
    "Education / Tutoring": "Education",
    "Trades": "Handyman",
  };
  return map[industry] ?? "Other";
}

function calculateLeadScore(data: SaveRequest): number {
  let score = 50; // Base score — they completed the blueprint (high intent)

  // Enquiry volume bonus
  const vol = data.enquiryVolume;
  if (vol === "100+") score += 15;
  else if (vol === "50-100") score += 12;
  else if (vol === "30-50") score += 10;
  else if (vol === "10-30") score += 5;

  // Pain point bonus — more pain = hotter lead
  if (data.painPoints.length >= 3) score += 10;
  else if (data.painPoints.length >= 2) score += 5;

  // Responding to enquiries = highest-value pain (speed-to-lead)
  if (data.painPoints.includes("Responding to enquiries")) score += 5;

  // Multi-channel = more sophisticated, higher value
  if (data.channels.length >= 3) score += 5;

  return Math.min(score, 100);
}

// ---------------------------------------------------------------------------
// Beehiiv — subscribe to newsletter
// ---------------------------------------------------------------------------

async function subscribeToBeehiiv(email: string): Promise<void> {
  const apiKey = process.env.BEEHIIV_API_KEY;
  if (!apiKey) return;

  const pubId = "pub_061e9ef1-6558-46c3-9e2b-aea33c9df2ad";

  await fetch(`https://api.beehiiv.com/v2/publications/${pubId}/subscriptions`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      utm_source: "blueprint_generator",
      referring_site: "workcrew.io/blueprint",
    }),
  });
}

// ---------------------------------------------------------------------------
// Resend — email the blueprint summary
// ---------------------------------------------------------------------------

async function sendBlueprintEmail(data: SaveRequest): Promise<void> {
  const resendKey = process.env.RESEND_API_KEY;
  if (!resendKey) return;

  const opps = data.blueprint.opportunities
    .map((o, i) => `${i + 1}. ${o.title} (${o.solution})`)
    .join("\n");

  const html = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, sans-serif; max-width: 600px; margin: 0 auto; padding: 32px 24px;">
      <div style="background: #0f172a; padding: 24px 32px; border-radius: 12px 12px 0 0;">
        <h1 style="color: white; margin: 0; font-size: 22px;">Your AI Blueprint</h1>
        <p style="color: #94a3b8; margin: 8px 0 0; font-size: 14px;">${data.businessName} — ${data.industry}</p>
      </div>
      <div style="border: 1px solid #e2e8f0; border-top: none; padding: 32px; border-radius: 0 0 12px 12px;">
        <h2 style="color: #0f172a; font-size: 20px; margin: 0 0 16px;">${data.blueprint.headline}</h2>

        <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 16px; margin: 16px 0;">
          <p style="margin: 0; color: #166534; font-weight: 600;">
            ${data.blueprint.totalHoursSaved} hours saved per week · £${data.blueprint.monthlyRevenuePotential.toLocaleString()}/month revenue potential · ${data.blueprint.recommendedTier} tier recommended
          </p>
        </div>

        <h3 style="color: #334155; margin: 24px 0 12px;">Your Top 3 Automation Opportunities</h3>
        <pre style="background: #f8fafc; padding: 16px; border-radius: 8px; font-size: 14px; white-space: pre-wrap;">${opps}</pre>

        <div style="margin-top: 32px; text-align: center;">
          <a href="https://cal.com/workcrew/free-ai-strategy-call" style="background: #6366f1; color: white; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-weight: 600; display: inline-block;">
            Book Your Free Strategy Call
          </a>
          <p style="color: #64748b; font-size: 13px; margin-top: 12px;">
            We'll walk through your blueprint and build a custom implementation plan — no obligation.
          </p>
        </div>
      </div>
      <p style="color: #94a3b8; font-size: 12px; text-align: center; margin-top: 24px;">
        WorkCrew Ltd · workcrew.io
      </p>
    </div>
  `;

  const fromAddress =
    process.env.RESEND_DOMAIN_VERIFIED === "true"
      ? "WorkCrew <hello@workcrew.io>"
      : "WorkCrew <onboarding@resend.dev>";

  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: fromAddress,
      to: data.email,
      subject: `Your AI Blueprint — ${data.businessName}`,
      html,
    }),
  });

  // Also notify Olushola
  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: fromAddress,
      to: "olusholaoladipupo1@gmail.com",
      subject: `[Blueprint Lead] ${data.businessName} — ${data.industry}`,
      html: `<p><strong>${data.businessName}</strong> (${data.industry}) just completed the AI Blueprint Generator.</p>
        <p>Email: ${data.email}<br/>Pain points: ${data.painPoints.join(", ")}<br/>Enquiry volume: ${data.enquiryVolume}/month<br/>Recommended tier: ${data.blueprint.recommendedTier}</p>
        <p>Blueprint headline: ${data.blueprint.headline}<br/>Hours saveable: ${data.blueprint.totalHoursSaved}/week<br/>Revenue potential: £${data.blueprint.monthlyRevenuePotential}/month</p>
        <p><strong>This lead is in Notion with source "Blueprint Generator".</strong></p>`,
    }),
  });
}
