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
    roiMultiple: number;
    recommendedTier: string;
    tierReason: string;
    beforeAfter: { before: string; after: string };
    opportunities: { title: string; solution: string; impact: string; hoursSavedPerWeek: number; description: string }[];
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
          multi_select: solutionNames.map((name: string) => ({ name })),
        },
        "Pain Points": {
          rich_text: [{ text: { content: painPointsText } }],
        },
        "Online Presence Notes": {
          rich_text: [{ text: { content: `Channels: ${channelsText}. Volume: ${data.enquiryVolume}/month.` } }],
        },
        "Needs Email": { checkbox: false },
        "Lead Intelligence": {
          rich_text: [{ text: { content: leadIntelligence } }],
        },
      },
    }),
  });

  if (!response.ok) {
    const errBody = await response.text();
    console.error("[blueprint/save] Notion error:", response.status, errBody.slice(0, 500));
    throw new Error(`Notion create failed: ${response.status} ${errBody.slice(0, 200)}`);
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

  const fromAddress = "WorkCrew <hello@workcrew.io>";

  // Generate full HTML blueprint report (same pattern as audit reports)
  const reportHtml = buildBlueprintReportHtml(data);

  // Upload to Vercel Blob for persistent link
  let reportUrl: string | null = null;
  if (process.env.BLOB_READ_WRITE_TOKEN) {
    try {
      const { put } = await import("@vercel/blob");
      const slug = data.businessName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
      const blob = await put(`blueprints/${slug}-${Date.now()}.html`, reportHtml, {
        access: "public",
        contentType: "text/html; charset=utf-8",
        addRandomSuffix: false,
        cacheControlMaxAge: 31536000,
      });
      reportUrl = blob.url;
    } catch (err) {
      console.error("[blueprint/save] Blob upload failed:", err);
    }
  }

  const viewLink = reportUrl
    ? `<a href="${reportUrl}" style="background: #6366f1; color: white; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-weight: 600; display: inline-block;">View & Download Your Blueprint</a>`
    : `<a href="https://workcrew.io/blueprint" style="background: #6366f1; color: white; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-weight: 600; display: inline-block;">Generate Another Blueprint</a>`;

  const opps = data.blueprint.opportunities
    .map((o, i) => `<tr><td style="padding:8px 12px;border-bottom:1px solid #e2e8f0;font-weight:600;">${i + 1}. ${o.title}</td><td style="padding:8px 12px;border-bottom:1px solid #e2e8f0;">${o.solution}</td><td style="padding:8px 12px;border-bottom:1px solid #e2e8f0;text-align:right;color:#6366f1;font-weight:600;">${o.hoursSavedPerWeek} hrs/week</td></tr>`)
    .join("");

  const emailHtml = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: #0f172a; padding: 32px; border-radius: 12px 12px 0 0;">
        <p style="color: #818cf8; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; margin: 0 0 8px;">AI Blueprint</p>
        <h1 style="color: white; margin: 0; font-size: 24px; line-height: 1.3;">${data.blueprint.headline}</h1>
        <p style="color: #94a3b8; margin: 8px 0 0; font-size: 14px;">${data.businessName} · ${data.industry}</p>
      </div>

      <div style="background: white; border: 1px solid #e2e8f0; border-top: none; padding: 0;">
        <table width="100%" cellpadding="0" cellspacing="0" style="border-bottom: 1px solid #e2e8f0;">
          <tr>
            <td width="33%" style="text-align:center; padding:20px 8px;">
              <p style="font-size:28px; font-weight:700; color:#6366f1; margin:0;">${data.blueprint.totalHoursSaved}</p>
              <p style="font-size:11px; color:#94a3b8; margin:4px 0 0;">hrs/week saved</p>
            </td>
            <td width="33%" style="text-align:center; padding:20px 8px; border-left:1px solid #e2e8f0; border-right:1px solid #e2e8f0;">
              <p style="font-size:28px; font-weight:700; color:#10b981; margin:0;">&pound;${data.blueprint.monthlyRevenuePotential.toLocaleString()}</p>
              <p style="font-size:11px; color:#94a3b8; margin:4px 0 0;">/month potential</p>
            </td>
            <td width="33%" style="text-align:center; padding:20px 8px;">
              <p style="font-size:28px; font-weight:700; color:#f59e0b; margin:0;">${data.blueprint.roiMultiple}x</p>
              <p style="font-size:11px; color:#94a3b8; margin:4px 0 0;">ROI</p>
            </td>
          </tr>
        </table>

        <div style="padding: 24px 32px;">
          <h2 style="color:#0f172a; font-size:16px; margin:0 0 12px;">Your Top 3 Automation Opportunities</h2>
          <table width="100%" cellpadding="0" cellspacing="0" style="font-size:14px; color:#334155;">
            <tr style="background:#f8fafc;"><th style="padding:8px 12px;text-align:left;font-size:12px;color:#64748b;">Opportunity</th><th style="padding:8px 12px;text-align:left;font-size:12px;color:#64748b;">Solution</th><th style="padding:8px 12px;text-align:right;font-size:12px;color:#64748b;">Time Saved</th></tr>
            ${opps}
          </table>
        </div>

        <div style="padding: 0 32px 24px;">
          <p style="font-size:12px; color:#64748b; margin:0;">Recommended tier: <strong>${data.blueprint.recommendedTier}</strong> — ${data.blueprint.tierReason}</p>
        </div>

        <div style="padding: 24px 32px; background: #f8fafc; text-align: center; border-radius: 0 0 12px 12px;">
          ${viewLink}
          <p style="color: #64748b; font-size: 13px; margin: 16px 0 0;">
            ${reportUrl ? "Open your full blueprint — you can print it as a PDF from there." : ""}
          </p>
          <div style="margin-top: 16px; padding-top: 16px; border-top: 1px solid #e2e8f0;">
            <a href="https://cal.com/workcrew/free-ai-strategy-call" style="color: #6366f1; font-size: 14px; font-weight: 600; text-decoration: none;">
              Book a Free Strategy Call &rarr;
            </a>
            <p style="color: #94a3b8; font-size: 12px; margin: 4px 0 0;">30 minutes. No obligation. We'll walk through your blueprint together.</p>
          </div>
        </div>
      </div>

      <p style="color: #94a3b8; font-size: 11px; text-align: center; margin: 16px 0 0;">
        WorkCrew Ltd &middot; workcrew.io &middot; <a href="https://workcrew.io" style="color:#94a3b8;">Unsubscribe</a>
      </p>
    </div>
  `;

  // Send to prospect
  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${resendKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: fromAddress,
      to: data.email,
      subject: `Your AI Blueprint — ${data.businessName}`,
      html: emailHtml,
    }),
  });

  // Notify Olushola
  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${resendKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: fromAddress,
      to: "olusholaoladipupo1@gmail.com",
      subject: `[Blueprint Lead] ${data.businessName} — ${data.industry}`,
      html: `<p><strong>${data.businessName}</strong> (${data.industry}) just completed the AI Blueprint Generator.</p>
        <p>Email: ${data.email}<br/>Pain points: ${data.painPoints.join(", ")}<br/>Enquiry volume: ${data.enquiryVolume}/month<br/>Recommended tier: ${data.blueprint.recommendedTier}</p>
        <p>Blueprint: ${data.blueprint.headline}<br/>Hours saveable: ${data.blueprint.totalHoursSaved}/week<br/>Revenue potential: &pound;${data.blueprint.monthlyRevenuePotential}/month</p>
        ${reportUrl ? `<p><a href="${reportUrl}">View hosted blueprint</a></p>` : ""}
        <p><strong>Lead in Notion with source "Blueprint Generator".</strong></p>`,
    }),
  });
}

// ---------------------------------------------------------------------------
// HTML Report (hosted on Blob — prospect can print to PDF)
// ---------------------------------------------------------------------------

function buildBlueprintReportHtml(data: SaveRequest): string {
  const b = data.blueprint;
  const opps = b.opportunities.map((o, i) => `
    <div style="border:1px solid #e2e8f0;border-radius:12px;padding:20px;margin-bottom:16px;">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
        <span style="font-size:12px;font-weight:700;padding:3px 10px;border-radius:99px;${o.impact === 'high' ? 'background:#fee2e2;color:#b91c1c;' : o.impact === 'medium' ? 'background:#fef3c7;color:#92400e;' : 'background:#f1f5f9;color:#475569;'}">${o.impact.toUpperCase()} IMPACT</span>
        <span style="font-size:14px;font-weight:700;color:#6366f1;">${o.hoursSavedPerWeek} hrs/week</span>
      </div>
      <h3 style="margin:0 0 4px;font-size:18px;color:#0f172a;">${i + 1}. ${o.title}</h3>
      <p style="font-size:12px;color:#94a3b8;margin:0 0 8px;">Solution: ${o.solution}</p>
      <p style="font-size:14px;color:#475569;margin:0;line-height:1.5;">${o.description}</p>
    </div>
  `).join("");

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>AI Blueprint — ${data.businessName}</title>
  <style>
    * { margin:0; padding:0; box-sizing:border-box; }
    body { font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif; background:#f8fafc; color:#0f172a; }
    .container { max-width:700px; margin:0 auto; padding:40px 24px; }
    .header { background:#0f172a; border-radius:16px 16px 0 0; padding:40px; }
    .header .tag { color:#818cf8; font-size:11px; letter-spacing:2px; text-transform:uppercase; margin-bottom:12px; }
    .header h1 { color:white; font-size:28px; line-height:1.3; }
    .header .sub { color:#94a3b8; font-size:14px; margin-top:8px; }
    .stats { display:grid; grid-template-columns:1fr 1fr 1fr; border:1px solid #e2e8f0; border-top:none; }
    .stat { text-align:center; padding:24px 16px; border-right:1px solid #e2e8f0; }
    .stat:last-child { border-right:none; }
    .stat .num { font-size:32px; font-weight:700; }
    .stat .label { font-size:12px; color:#94a3b8; margin-top:4px; }
    .section { border:1px solid #e2e8f0; border-top:none; padding:32px 40px; background:white; }
    .section h2 { font-size:20px; margin-bottom:20px; }
    .before-after { display:grid; grid-template-columns:1fr 1fr; gap:16px; }
    .ba-card { padding:20px; border-radius:12px; }
    .ba-before { background:#fef2f2; border:1px solid #fecaca; }
    .ba-after { background:#f0fdf4; border:1px solid #bbf7d0; }
    .ba-card .tag { font-size:11px; font-weight:700; text-transform:uppercase; margin-bottom:8px; }
    .ba-before .tag { color:#b91c1c; }
    .ba-after .tag { color:#166534; }
    .ba-card p { font-size:14px; line-height:1.6; }
    .ba-before p { color:#7f1d1d; }
    .ba-after p { color:#14532d; }
    .cta-section { border:1px solid #e2e8f0; border-top:none; border-radius:0 0 16px 16px; padding:32px 40px; background:#f8fafc; text-align:center; }
    .cta-btn { display:inline-block; background:#6366f1; color:white; padding:14px 32px; border-radius:8px; text-decoration:none; font-weight:600; font-size:15px; }
    .footer { text-align:center; margin-top:24px; color:#94a3b8; font-size:12px; }
    @media print {
      body { background:white; }
      .container { padding:0; max-width:100%; }
      .no-print { display:none !important; }
    }
    @media (max-width:600px) {
      .before-after { grid-template-columns:1fr; }
      .stats { grid-template-columns:1fr; }
      .stat { border-right:none; border-bottom:1px solid #e2e8f0; }
      .stat:last-child { border-bottom:none; }
      .section { padding:24px 20px; }
      .header { padding:24px 20px; }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="tag">AI Blueprint</div>
      <h1>${b.headline}</h1>
      <div class="sub">${data.businessName} &middot; ${data.industry}</div>
    </div>

    <div class="stats">
      <div class="stat"><div class="num" style="color:#6366f1;">${b.totalHoursSaved}</div><div class="label">hours/week saved</div></div>
      <div class="stat"><div class="num" style="color:#10b981;">&pound;${b.monthlyRevenuePotential.toLocaleString()}</div><div class="label">/month potential</div></div>
      <div class="stat"><div class="num" style="color:#f59e0b;">${b.roiMultiple}x</div><div class="label">return on investment</div></div>
    </div>

    <div class="section">
      <h2>Your Top 3 Automation Opportunities</h2>
      ${opps}
    </div>

    <div class="section">
      <h2>Your Monday Morning: Before &amp; After</h2>
      <div class="before-after">
        <div class="ba-card ba-before"><div class="tag">Before</div><p>${b.beforeAfter.before}</p></div>
        <div class="ba-card ba-after"><div class="tag">After</div><p>${b.beforeAfter.after}</p></div>
      </div>
    </div>

    <div class="section">
      <p style="font-size:14px;color:#64748b;">Recommended tier: <strong style="color:#0f172a;">${b.recommendedTier}</strong> &mdash; ${b.tierReason}</p>
    </div>

    <div class="cta-section">
      <p style="font-size:14px;color:#64748b;margin-bottom:4px;">To save as PDF, press <strong>Ctrl+P</strong> (or <strong>Cmd+P</strong> on Mac) and select "Save as PDF".</p>
      <br/>
      <a href="https://cal.com/workcrew/free-ai-strategy-call" class="cta-btn">Book Your Free Strategy Call</a>
      <p style="color:#94a3b8;font-size:13px;margin-top:12px;">30 minutes. No obligation. We'll walk through your blueprint together.</p>
    </div>

    <div class="footer">
      <p>WorkCrew Ltd &middot; workcrew.io &middot; Generated ${new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</p>
    </div>
  </div>
</body>
</html>`;
}
