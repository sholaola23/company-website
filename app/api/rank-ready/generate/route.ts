import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { ANTHROPIC_API_URL, ANTHROPIC_VERSION, heliconeHeaders } from "@/lib/constants";
import {
  getCategoryAuditPrompt,
  getGBPDescriptionPrompt,
  getReviewStrategyPrompt,
  getPostingCalendarPrompt,
  getServiceDescriptionsPrompt,
} from "@/lib/rankready-prompts";
import type { RankReadyFormData } from "@/lib/rankready-types";

// 5 minutes — Vercel Pro allows up to 300s
export const maxDuration = 300;

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

const FROM_REPORT =
  process.env.RESEND_DOMAIN_VERIFIED === "true"
    ? "WorkCrew <reports@workcrew.io>"
    : "WorkCrew <onboarding@resend.dev>";

const OWNER_EMAIL = "olusholaoladipupo1@gmail.com";

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
      max_tokens: 6000,
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
  let cleaned = raw.trim();
  if (cleaned.startsWith("```")) {
    cleaned = cleaned.replace(/^```(?:json)?\n?/, "").replace(/\n?```$/, "");
  }
  return JSON.parse(cleaned);
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

// ---------------------------------------------------------------------------
// Blob storage
// ---------------------------------------------------------------------------

async function uploadToBlob(
  slug: string,
  data: Record<string, unknown>
): Promise<string | null> {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    console.log("[rank-ready/generate] BLOB_READ_WRITE_TOKEN not set");
    return null;
  }

  try {
    const { put } = await import("@vercel/blob");
    const blob = await put(
      `rankready-reports/${slug}.json`,
      JSON.stringify(data),
      {
        access: "public",
        contentType: "application/json",
        addRandomSuffix: false,
        cacheControlMaxAge: 31536000,
      }
    );
    return blob.url;
  } catch (err) {
    console.error("[rank-ready/generate] blob upload failed:", err);
    return null;
  }
}

// ---------------------------------------------------------------------------
// Email
// ---------------------------------------------------------------------------

async function sendReportEmail(
  email: string,
  businessName: string,
  reportUrl: string
): Promise<void> {
  if (!resend) {
    console.log("[rank-ready/generate] RESEND_API_KEY not set, skipping email");
    return;
  }

  try {
    await resend.emails.send({
      from: FROM_REPORT,
      to: email,
      subject: `Your RankReady Local SEO Report for ${businessName}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: #0f172a; padding: 32px 24px; border-radius: 12px 12px 0 0; text-align: center;">
            <h1 style="color: #ffffff; font-size: 22px; margin: 0 0 8px 0;">Your Local SEO Report is Ready</h1>
            <p style="color: #94a3b8; font-size: 14px; margin: 0;">${businessName}</p>
          </div>
          <div style="background: #ffffff; padding: 32px 24px; border: 1px solid #e2e8f0; border-top: none;">
            <p style="color: #334155; font-size: 15px; line-height: 1.6; margin: 0 0 24px 0;">
              Your complete RankReady Local SEO audit is ready. It includes GBP category recommendations, optimised descriptions, review strategy, posting calendar, and service page copy.
            </p>
            <div style="text-align: center; margin: 32px 0;">
              <a href="${reportUrl}" style="display: inline-block; background: #10b981; color: #ffffff; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-weight: 600; font-size: 15px;">
                View Your Full Report
              </a>
            </div>
            <div style="border-top: 1px solid #e2e8f0; padding-top: 24px; margin-top: 24px;">
              <p style="color: #334155; font-size: 15px; line-height: 1.6; margin: 0 0 8px 0;">
                <strong>Want us to implement this for you?</strong>
              </p>
              <p style="color: #334155; font-size: 15px; line-height: 1.6; margin: 0 0 16px 0;">
                Book a free 30-minute strategy call and we will walk through the report together.
              </p>
              <div style="text-align: center;">
                <a href="https://cal.com/sholastechnotes/free-ai-strategy-call" style="display: inline-block; background: #0f172a; color: #ffffff; text-decoration: none; padding: 12px 28px; border-radius: 8px; font-weight: 600; font-size: 14px;">
                  Book a Strategy Call
                </a>
              </div>
            </div>
          </div>
          <div style="padding: 20px 24px; text-align: center; border-radius: 0 0 12px 12px; background: #f8fafc; border: 1px solid #e2e8f0; border-top: none;">
            <p style="color: #94a3b8; font-size: 12px; margin: 0;">
              WorkCrew Ltd | workcrew.io
            </p>
          </div>
        </div>
      `,
    });
  } catch (err) {
    console.error("[rank-ready/generate] email send failed:", err);
  }
}

async function notifyOwner(
  businessName: string,
  email: string,
  reportUrl: string | null
): Promise<void> {
  if (!resend) return;

  try {
    await resend.emails.send({
      from: FROM_REPORT,
      to: OWNER_EMAIL,
      subject: `[RankReady] Report Generated: ${businessName}`,
      html: `
        <h2>RankReady Report Generated</h2>
        <p><strong>Business:</strong> ${businessName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Report:</strong> ${reportUrl ? `<a href="${reportUrl}">${reportUrl}</a>` : "Blob storage unavailable"}</p>
        <p><strong>Revenue:</strong> £49</p>
        <hr>
        <p><em>Automatically generated and delivered.</em></p>
      `,
    });
  } catch (err) {
    console.error("[rank-ready/generate] owner notification failed:", err);
  }
}

// ---------------------------------------------------------------------------
// POST /api/rank-ready/generate
// ---------------------------------------------------------------------------

export async function POST(req: NextRequest) {
  let body: {
    sessionId?: string;
    email?: string;
    businessName?: string;
    formData?: Partial<RankReadyFormData>;
    paid?: boolean;
  };

  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { message: "Invalid request body." },
      { status: 400 }
    );
  }

  const email = body.email?.trim() || body.formData?.email?.trim();
  const businessName =
    body.businessName?.trim() || body.formData?.businessName?.trim();

  if (!email || !businessName) {
    return NextResponse.json(
      { message: "Email and business name are required." },
      { status: 422 }
    );
  }

  // Build form data with defaults
  const fd = body.formData || {};
  const formData: RankReadyFormData = {
    businessName,
    address: fd.address?.trim?.() || "",
    phone: fd.phone?.trim?.() || "",
    website: fd.website?.trim?.(),
    gbpUrl: fd.gbpUrl?.trim?.(),
    yearsInBusiness: fd.yearsInBusiness || 1,
    primaryService: fd.primaryService?.trim?.() || "General Services",
    secondaryServices: fd.secondaryServices?.filter?.(Boolean) || [],
    serviceAreas: fd.serviceAreas?.filter?.(Boolean) || [],
    targetCustomer: fd.targetCustomer?.trim?.() || "Local customers",
    competitors: fd.competitors?.filter?.((c) => c.name.trim()) || [],
    reviewCount: fd.reviewCount,
    starRating: fd.starRating,
    biggestProblem: fd.biggestProblem?.trim?.(),
    email,
  };

  try {
    console.log(`[rank-ready/generate] Starting full report for ${businessName}...`);

    // Generate all 5 outputs in parallel
    const [catRaw, descRaw, reviewRaw, calendarRaw, serviceRaw] =
      await Promise.all([
        callClaude(
          getCategoryAuditPrompt(formData),
          `Analyse GBP categories for ${businessName}.`
        ),
        callClaude(
          getGBPDescriptionPrompt(formData),
          `Generate 3 GBP description variants for ${businessName}.`
        ),
        callClaude(
          getReviewStrategyPrompt(formData),
          `Create a review strategy for ${businessName}.`
        ),
        callClaude(
          getPostingCalendarPrompt(formData),
          `Create a 4-week posting calendar for ${businessName}.`
        ),
        callClaude(
          getServiceDescriptionsPrompt(formData),
          `Write service page content for ${businessName}.`
        ),
      ]);

    const report = {
      id: `rr-${Date.now()}`,
      createdAt: new Date().toISOString(),
      businessName,
      formData,
      categoryAudit: parseJSON(catRaw),
      gbpDescription: parseJSON(descRaw),
      reviewStrategy: parseJSON(reviewRaw),
      postingCalendar: parseJSON(calendarRaw),
      serviceDescriptions: parseJSON(serviceRaw),
    };

    console.log(`[rank-ready/generate] All 5 sections generated for ${businessName}`);

    // Store in Blob
    const slug = `${slugify(businessName)}-${Date.now()}`;
    const blobUrl = await uploadToBlob(slug, report);

    const reportUrl = blobUrl
      ? `https://workcrew.io/tools/rank-ready/report?id=${slug}`
      : null;

    // Send emails in parallel
    await Promise.all([
      reportUrl
        ? sendReportEmail(email, businessName, reportUrl)
        : Promise.resolve(),
      notifyOwner(businessName, email, reportUrl),
    ]);

    console.log(`[rank-ready/generate] Report delivered for ${businessName}`);

    return NextResponse.json({
      success: true,
      reportId: slug,
      reportUrl,
    });
  } catch (err) {
    console.error("[rank-ready/generate] generation failed:", err);
    return NextResponse.json(
      { message: "Report generation failed. Our team has been notified." },
      { status: 500 }
    );
  }
}
