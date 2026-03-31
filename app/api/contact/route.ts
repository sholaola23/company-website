import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

const FROM_NOTIFY =
  process.env.RESEND_DOMAIN_VERIFIED === "true"
    ? "WorkCrew <notifications@workcrew.io>"
    : "WorkCrew <onboarding@resend.dev>";

const FROM_REPLY =
  process.env.RESEND_DOMAIN_VERIFIED === "true"
    ? "WorkCrew <hello@workcrew.io>"
    : "WorkCrew <onboarding@resend.dev>";

interface ContactBody {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

async function generateAutoReply({
  name,
  email,
  message,
}: {
  name: string;
  email: string;
  message: string;
}): Promise<string> {
  const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
  if (!ANTHROPIC_API_KEY) {
    return getFallbackReply(name);
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
        system: `You are the AI assistant for WorkCrew Ltd, a company that builds AI automation systems, professional websites, and delivers AI training for small businesses worldwide.

Your job is to write a warm, professional auto-reply to a website enquiry. The reply should:
- Thank them by name for reaching out
- Acknowledge their specific message/question (show you understood it)
- Briefly mention how WorkCrew might help based on what they said
- Let them know Olushola (the founder) will personally follow up within 24 hours
- Offer to book a free discovery call: https://workcrew.io/audit
- Keep it under 150 words, warm but professional
- Sign off as "The WorkCrew Team"
- Use UK English

DO NOT make specific promises, quote prices, or commit to timelines. Just acknowledge and reassure.`,
        messages: [
          {
            role: "user",
            content: `New contact form submission:\nName: ${name}\nEmail: ${email}\nMessage: ${message}\n\nWrite the auto-reply email.`,
          },
        ],
      }),
    });

    if (!response.ok) {
      return getFallbackReply(name);
    }

    const data = await response.json();
    return data.content?.[0]?.text || getFallbackReply(name);
  } catch {
    return getFallbackReply(name);
  }
}

function getFallbackReply(name: string): string {
  return `Hi ${name},

Thank you for reaching out to WorkCrew. We've received your message and Olushola, our founder, will personally get back to you within 24 hours.

In the meantime, if you'd like to get a head start, you can request a free AI Readiness Audit at https://workcrew.io/audit — it only takes 2 minutes and gives you a clear picture of where AI can help your business.

Best regards,
The WorkCrew Team`;
}

async function notifyOwner({
  name,
  email,
  phone,
  message,
  aiReply,
}: {
  name: string;
  email: string;
  phone?: string;
  message: string;
  aiReply: string;
}) {
  console.log("[contact] New submission from:", name, email);

  if (!process.env.RESEND_API_KEY) {
    console.log("[contact] RESEND_API_KEY not set, skipping email");
    console.log("=== NEW CONTACT FORM SUBMISSION ===");
    console.log(`Name:    ${name}`);
    console.log(`Email:   ${email}`);
    console.log(`Phone:   ${phone || "not provided"}`);
    console.log(`Message: ${message}`);
    console.log("--- AI AUTO-REPLY DRAFTED ---");
    console.log(aiReply);
    console.log("=================================");
    return;
  }

  try {
    // Send notification to Olushola
    await resend?.emails.send({
      from: FROM_NOTIFY,
      to: "olusholaoladipupo1@gmail.com",
      subject: `New Contact: ${name} — ${email}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
        <p><strong>Message:</strong></p>
        <blockquote style="border-left: 3px solid #3b82f6; padding-left: 12px; color: #555;">${message}</blockquote>
        <hr>
        <h3>AI Auto-Reply (drafted for prospect):</h3>
        <pre style="background: #f5f5f5; padding: 16px; border-radius: 8px; white-space: pre-wrap;">${aiReply}</pre>
        <p><em>Reply directly to this email or send the auto-reply above to ${email}</em></p>
      `,
    });
  } catch (err) {
    console.error("[contact] failed to send owner notification:", err);
  }

  try {
    // Send auto-reply to the prospect
    await resend?.emails.send({
      from: FROM_REPLY,
      to: email,
      subject: `Thanks for reaching out, ${name} — WorkCrew`,
      text: aiReply,
    });
  } catch (err) {
    console.error("[contact] failed to send prospect auto-reply:", err);
  }
}

export async function POST(req: NextRequest) {
  let body: Partial<ContactBody>;

  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { success: false, message: "Invalid request body." },
      { status: 400 }
    );
  }

  const { name, email, message } = body;

  if (!name?.trim()) {
    return NextResponse.json(
      { success: false, message: "Name is required." },
      { status: 422 }
    );
  }
  if (!email?.trim() || !isValidEmail(email)) {
    return NextResponse.json(
      { success: false, message: "A valid email address is required." },
      { status: 422 }
    );
  }
  if (!message?.trim()) {
    return NextResponse.json(
      { success: false, message: "Message is required." },
      { status: 422 }
    );
  }

  const cleanName = name.trim();
  const cleanEmail = email.trim();
  const cleanMessage = message.trim();
  const cleanPhone = body.phone?.trim();

  try {
    // 1. Generate AI auto-reply using Claude Haiku
    const aiReply = await generateAutoReply({
      name: cleanName,
      email: cleanEmail,
      message: cleanMessage,
    });

    // 2. Notify Olushola with full context + AI draft
    // (actual prospect email sending added when email service is wired up)
    await notifyOwner({
      name: cleanName,
      email: cleanEmail,
      phone: cleanPhone,
      message: cleanMessage,
      aiReply,
    });

    console.log("[contact] submission processed", {
      name: cleanName,
      email: cleanEmail,
      submittedAt: new Date().toISOString(),
    });
  } catch (error) {
    // Never expose internal errors to the user
    console.error("[contact] processing error:", error);
  }

  return NextResponse.json({ success: true });
}
