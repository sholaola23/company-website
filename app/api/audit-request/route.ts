import { NextRequest, NextResponse } from "next/server";

interface AuditRequestBody {
  businessName: string;
  yourName: string;
  email: string;
  phone?: string;
  industry: string;
  website?: string;
  headache: string;
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
}: {
  businessName: string;
  yourName: string;
  email: string;
  phone?: string;
  industry: string;
  website?: string;
  headache: string;
  aiReply: string;
}) {
  // Logs for now — email notification added when email service (Resend/SendGrid) is configured
  console.log("=== NEW AUDIT REQUEST ===");
  console.log(`Business: ${businessName}`);
  console.log(`Name:     ${yourName}`);
  console.log(`Email:    ${email}`);
  console.log(`Phone:    ${phone || "not provided"}`);
  console.log(`Industry: ${industry}`);
  console.log(`Website:  ${website || "not provided"}`);
  console.log(`Headache: ${headache}`);
  console.log("--- AI AUTO-REPLY DRAFTED ---");
  console.log(aiReply);
  console.log("=========================");
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
  const { businessName, yourName, email, industry, headache } = body;

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

  return NextResponse.json({ success: true });
}
