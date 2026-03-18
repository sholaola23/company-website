import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

const FROM_NOTIFY =
  process.env.RESEND_DOMAIN_VERIFIED === "true"
    ? "Oladipupo Consulting <notifications@oladipupoconsulting.co.uk>"
    : "Oladipupo Consulting <onboarding@resend.dev>";

const FROM_REPLY =
  process.env.RESEND_DOMAIN_VERIFIED === "true"
    ? "Oladipupo Consulting <hello@oladipupoconsulting.co.uk>"
    : "Oladipupo Consulting <onboarding@resend.dev>";

interface AuditRequestBody {
  businessName: string;
  yourName: string;
  email: string;
  phone?: string;
  industry: string;
  website?: string;
  headache: string;
  /** Optional — included when the request originates from the Instant Audit flow */
  instantAuditResults?: {
    score: number;
    scoreLabel: string;
    summary: string;
    findings?: { title: string; description: string; severity: string }[];
    quickWins?: { title: string; description: string }[];
    recommendedTier: string;
    tierReason: string;
  };
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

async function generateAuditAutoReply({
  yourName,
  businessName,
  industry,
  headache,
}: {
  yourName: string;
  businessName: string;
  industry: string;
  headache: string;
}): Promise<string> {
  const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
  if (!ANTHROPIC_API_KEY) {
    return getFallbackAuditReply(yourName, businessName);
  }

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 500,
        system: `You are the AI assistant for Oladipupo Consulting Ltd, a UK-based company that builds AI automation systems, professional websites, and delivers AI training for small businesses.

Your job is to write a warm, professional acknowledgement email to someone who has just requested a free AI Readiness Audit. The reply should:
- Thank them by first name for requesting the audit
- Acknowledge their specific industry and main pain point (show you understood it)
- Confirm you'll have their personalised AI Readiness Audit ready within 48 hours
- Briefly mention what they'll receive: a 5-section report covering their biggest opportunities for AI automation, time savings, and quick wins specific to their business
- Keep it under 150 words, warm but professional
- Sign off as "The Oladipupo Consulting Team"
- Use UK English

DO NOT make specific promises, quote prices, or commit to exact outcomes. Just acknowledge, reassure, and build anticipation.`,
        messages: [
          {
            role: "user",
            content: `New audit request:\nName: ${yourName}\nBusiness: ${businessName}\nIndustry: ${industry}\nBiggest challenge: ${headache}\n\nWrite the acknowledgement email.`,
          },
        ],
      }),
    });

    if (!response.ok) {
      return getFallbackAuditReply(yourName, businessName);
    }

    const data = await response.json();
    return data.content?.[0]?.text || getFallbackAuditReply(yourName, businessName);
  } catch {
    return getFallbackAuditReply(yourName, businessName);
  }
}

function getFallbackAuditReply(yourName: string, businessName: string): string {
  return `Hi ${yourName},

Thank you for requesting your free AI Readiness Audit for ${businessName}. We've received your submission and we're already getting started.

Your personalised audit will be ready within 48 hours. It will cover 5 key areas: your biggest opportunities for AI automation, estimated time savings, quick wins you can implement immediately, tools we recommend for your industry, and a clear next step.

Keep an eye on your inbox — we'll send it directly to you.

If you have any questions in the meantime, feel free to reply to this email.

Best regards,
The Oladipupo Consulting Team`;
}

async function notifyOwnerAudit({
  businessName,
  yourName,
  email,
  phone,
  industry,
  website,
  headache,
  aiReply,
  instantAuditResults,
}: {
  businessName: string;
  yourName: string;
  email: string;
  phone?: string;
  industry: string;
  website?: string;
  headache: string;
  aiReply: string;
  instantAuditResults?: AuditRequestBody["instantAuditResults"];
}) {
  console.log("[audit-request] New request from:", yourName, email);

  if (!process.env.RESEND_API_KEY) {
    console.log("[audit-request] RESEND_API_KEY not set, skipping email");
    console.log("=== NEW AUDIT REQUEST ===");
    console.log(`Business: ${businessName}`);
    console.log(`Name:     ${yourName}`);
    console.log(`Email:    ${email}`);
    console.log(`Phone:    ${phone || "not provided"}`);
    console.log(`Industry: ${industry}`);
    console.log(`Website:  ${website || "not provided"}`);
    console.log(`Headache: ${headache}`);
    if (instantAuditResults) {
      console.log("--- INSTANT AUDIT PREVIEW ---");
      console.log(`Score:    ${instantAuditResults.score}/10 (${instantAuditResults.scoreLabel})`);
      console.log(`Tier:     ${instantAuditResults.recommendedTier}`);
      console.log(`Summary:  ${instantAuditResults.summary}`);
      console.log(`Reason:   ${instantAuditResults.tierReason}`);
    }
    console.log("--- AI AUTO-REPLY DRAFTED ---");
    console.log(aiReply);
    console.log("=========================");
    return;
  }

  const instantAuditSection = instantAuditResults
    ? `
      <hr>
      <h3>Instant Audit Preview</h3>
      <p><strong>Score:</strong> ${instantAuditResults.score}/10 (${instantAuditResults.scoreLabel})</p>
      <p><strong>Recommended Tier:</strong> ${instantAuditResults.recommendedTier}</p>
      <p><strong>Summary:</strong> ${instantAuditResults.summary}</p>
      <p><strong>Tier Reason:</strong> ${instantAuditResults.tierReason}</p>
    `
    : "";

  try {
    // Send notification to Olushola with all audit details
    await resend?.emails.send({
      from: FROM_NOTIFY,
      to: "olusholaoladipupo1@gmail.com",
      subject: `New Audit Request: ${businessName} — ${yourName}`,
      html: `
        <h2>New AI Audit Request</h2>
        <p><strong>Business:</strong> ${businessName}</p>
        <p><strong>Name:</strong> ${yourName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
        <p><strong>Industry:</strong> ${industry}</p>
        <p><strong>Website:</strong> ${website || "Not provided"}</p>
        <p><strong>Biggest Challenge:</strong></p>
        <blockquote style="border-left: 3px solid #3b82f6; padding-left: 12px; color: #555;">${headache}</blockquote>
        ${instantAuditSection}
        <hr>
        <h3>AI Acknowledgement (drafted for prospect):</h3>
        <pre style="background: #f5f5f5; padding: 16px; border-radius: 8px; white-space: pre-wrap;">${aiReply}</pre>
        <p><em>Reply directly to this email or send the acknowledgement above to ${email}</em></p>
      `,
    });
  } catch (err) {
    console.error("[audit-request] failed to send owner notification:", err);
  }

  try {
    // Send confirmation email to the prospect
    await resend?.emails.send({
      from: FROM_REPLY,
      to: email,
      subject: `Your AI Readiness Audit is on its way, ${yourName} — Oladipupo Consulting`,
      text: aiReply,
    });
  } catch (err) {
    console.error("[audit-request] failed to send prospect confirmation:", err);
  }
}

export async function POST(req: NextRequest) {
  let body: Partial<AuditRequestBody>;

  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { success: false, message: "Invalid request body." },
      { status: 400 }
    );
  }

  // Validate required fields
  const { businessName, yourName, email, industry, headache, instantAuditResults } = body;

  if (!businessName?.trim()) {
    return NextResponse.json(
      { success: false, message: "Business name is required." },
      { status: 422 }
    );
  }
  if (!yourName?.trim()) {
    return NextResponse.json(
      { success: false, message: "Your name is required." },
      { status: 422 }
    );
  }
  if (!email?.trim() || !isValidEmail(email)) {
    return NextResponse.json(
      { success: false, message: "A valid email address is required." },
      { status: 422 }
    );
  }
  if (!industry?.trim()) {
    return NextResponse.json(
      { success: false, message: "Industry is required." },
      { status: 422 }
    );
  }
  if (!headache?.trim()) {
    return NextResponse.json(
      { success: false, message: "Please describe your biggest challenge." },
      { status: 422 }
    );
  }

  const cleanBusinessName = businessName.trim();
  const cleanYourName = yourName.trim();
  const cleanEmail = email.trim();
  const cleanIndustry = industry.trim();
  const cleanHeadache = headache.trim();
  const cleanPhone = body.phone?.trim();
  const cleanWebsite = body.website?.trim();

  try {
    // 1. Generate AI acknowledgement reply using Claude Haiku
    const aiReply = await generateAuditAutoReply({
      yourName: cleanYourName,
      businessName: cleanBusinessName,
      industry: cleanIndustry,
      headache: cleanHeadache,
    });

    // 2. Notify Olushola with full context + AI draft
    // (actual prospect email sending added when email service is wired up)
    await notifyOwnerAudit({
      businessName: cleanBusinessName,
      yourName: cleanYourName,
      email: cleanEmail,
      phone: cleanPhone,
      industry: cleanIndustry,
      website: cleanWebsite,
      headache: cleanHeadache,
      aiReply,
      instantAuditResults,
    });

    console.log("[audit-request] submission processed", {
      businessName: cleanBusinessName,
      yourName: cleanYourName,
      email: cleanEmail,
      submittedAt: new Date().toISOString(),
    });
  } catch (error) {
    // Never expose internal errors to the user
    console.error("[audit-request] processing error:", error);
  }

  // TODO: Create Notion page when NOTION_AUDIT_DB is configured
  // const notionDbId = process.env.NOTION_AUDIT_DB;
  // if (notionDbId) { ... }

  // 3. Fire-and-forget: trigger full report generation if instant audit data is present
  if (instantAuditResults?.findings && cleanEmail) {
    const reportPayload = {
      businessName: cleanBusinessName,
      industry: cleanIndustry,
      website: cleanWebsite || "",
      email: cleanEmail,
      yourName: cleanYourName,
      instantAuditResults,
    };

    // Determine the base URL for the internal API call
    const protocol = req.headers.get("x-forwarded-proto") || "https";
    const host = req.headers.get("host") || "localhost:3000";
    const baseUrl = `${protocol}://${host}`;

    // Fire-and-forget — do not await. The prospect gets their confirmation email
    // immediately; the full report arrives 1-2 minutes later.
    fetch(`${baseUrl}/api/generate-report`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(reportPayload),
    }).catch((err) => {
      console.error("[audit-request] failed to trigger report generation:", err);
    });

    console.log("[audit-request] triggered background report generation for", cleanBusinessName);
  }

  return NextResponse.json({ success: true });
}
