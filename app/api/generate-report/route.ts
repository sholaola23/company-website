import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { ANTHROPIC_API_URL, ANTHROPIC_VERSION, heliconeHeaders } from "@/lib/constants";
import { requireGuard } from "@/lib/api-guard";

// Allow up to 300s on Pro plan for full report generation
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

const FROM_NOTIFY =
  process.env.RESEND_DOMAIN_VERIFIED === "true"
    ? "WorkCrew <notifications@workcrew.io>"
    : "WorkCrew <onboarding@resend.dev>";

const OWNER_EMAIL = "olusholaoladipupo1@gmail.com";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface Finding {
  title: string;
  description: string;
  severity: "red" | "amber" | "green";
  automationCategory?: "data-mover" | "triggered-communicator" | "report-builder";
}

interface QuickWin {
  title: string;
  description: string;
}

interface GenerateReportBody {
  businessName: string;
  industry: string;
  website?: string;
  email: string;
  yourName?: string;
  instantAuditResults: {
    score: number;
    scoreLabel: string;
    summary: string;
    findings: Finding[];
    quickWins: QuickWin[];
    recommendedTier: string;
    tierReason: string;
  };
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function getReportPrompt(data: GenerateReportBody): string {
  const { businessName, industry, website, instantAuditResults } = data;
  const { score, scoreLabel, findings, quickWins, recommendedTier, tierReason, summary } = instantAuditResults;

  const CATEGORY_LABELS: Record<string, string> = {
    "data-mover": "Data-Mover",
    "triggered-communicator": "Triggered Communicator",
    "report-builder": "Report Builder",
  };

  const findingsText = findings
    .map((f, i) => {
      const categoryTag = f.automationCategory ? ` [${CATEGORY_LABELS[f.automationCategory] ?? f.automationCategory}]` : "";
      return `${i + 1}. [${f.severity.toUpperCase()}]${categoryTag} ${f.title}: ${f.description}`;
    })
    .join("\n");

  const quickWinsText = quickWins
    .map((w, i) => `${i + 1}. ${w.title}: ${w.description}`)
    .join("\n");

  return `You are an expert AI automation consultant at WorkCrew Ltd, a firm that builds AI automation systems for small businesses worldwide.

Generate a COMPLETE, self-contained HTML document for a professional AI Readiness Audit Report. The HTML must have ALL CSS embedded in a <style> tag — no external stylesheets or scripts.

BUSINESS DETAILS:
- Business Name: ${businessName}
- Industry: ${industry}
- Website: ${website || "No website"}
- AI Readiness Score: ${score}/10 (${scoreLabel})
- Summary: ${summary}
- Recommended Tier: ${recommendedTier}
- Tier Reason: ${tierReason}

INSTANT AUDIT FINDINGS:
${findingsText}

QUICK WINS IDENTIFIED:
${quickWinsText}

THE REPORT MUST CONTAIN THESE 8 SECTIONS:

1. **AI Readiness Score** — Large visual score circle (use CSS for a circular score display with the number ${score} prominently shown), colour-coded (red <=3, amber 4-6, green 7+), with a paragraph explaining what this score means for their business specifically.

2. **The Cost of Inaction** — A hard-hitting section showing what it costs ${businessName} EVERY MONTH by not automating. Calculate specific monthly costs: lost leads from slow response times, hours wasted on manual admin, revenue lost to competitors who respond faster, staff time spent on tasks AI could handle. Use a bold callout box showing the total monthly and annual cost of doing nothing (e.g. "You are losing approximately £X,XXX every month"). Make it emotionally compelling — this is the most persuasive section.

3. **Current State Analysis** — Deep analysis of where ${businessName} currently stands with AI/automation adoption. Reference their industry (${industry}), identify specific manual processes likely causing bottlenecks, estimate time wasted on repetitive tasks, and compare to industry benchmarks. Include a styled table showing "Current Process vs AI-Automated" comparisons.

4. **Competitor Landscape** — Analysis of how competitors in the ${industry} sector are using AI. What percentage of similar businesses have adopted AI tools? What advantages are early adopters gaining? Include specific examples relevant to ${industry} businesses.

5. **Opportunity Map** — For each finding, create an "opportunity card" with:
   - A category badge showing which of the Three Automation types it belongs to: "📦 Data-Mover", "📣 Triggered Communicator", or "📊 Report Builder" (use the automationCategory from the finding; style as a small pill badge above the card title)
   - A RED panel showing the current pain point
   - A GREEN panel showing what it looks like after automation
   - Estimated hours saved per week
   - Revenue impact estimate
   Also include the quick wins as immediately actionable items. Below the opportunity cards, add a short callout box explaining the Three Automations Framework: "Every business has three automation bottlenecks — a Data-Mover, a Triggered Communicator, and a Report Builder. Fix all three and most teams reclaim 8–20 hours every week."

6. **Time Reclaimed Breakdown** — A clear, styled table breaking down EXACTLY how many hours per week/month ${businessName} would reclaim in each automation area (e.g. Lead response: 8 hrs/week, Admin & scheduling: 6 hrs/week, Follow-ups: 4 hrs/week, etc.). Show a total row. Use a visual bar chart style (CSS-only bars) to make the time savings feel tangible. End with a statement like "That's X hours back every month — equivalent to hiring a part-time employee."

7. **ROI Projection** — Start with a bold "Your Numbers" callout that makes the ROI personal: "If ${businessName} gets [X] enquiries per month and each job is worth £[Y], responding in 60 seconds instead of [current response time] could win you [Z] extra jobs — that's £[total] in new revenue before implementation cost." Use realistic numbers for the ${industry} sector. Then show a professional summary table with Monthly and Annual projections for: Hours Reclaimed, Cost Savings (from reduced manual work), Revenue Recovered (from faster response, fewer lost leads), and Total Impact. Use a styled table with clear headers and a bold total row. State that implementation cost is scoped after discovery based on workflow, volume, channels, and handoff rules.

8. **Recommended Solution & Next Steps** — Based on the ${recommendedTier} tier recommendation:
   - What's included in this tier
   - Implementation approach and next steps
   - A clear recommendation for the right approach based on their needs, with a 'Book a Call' CTA to discuss specifics
   - A "Before vs After" narrative: 2 short paragraphs contrasting their business today (manual, slow, overwhelmed) vs 30 days from now (automated, fast, in control)
   - Clear CTA to book a call

DESIGN REQUIREMENTS:
- Dark navy header (#0f172a) with white text, include "AI Readiness Audit Report" title and business name
- Indigo accent colour (#6366f1) for highlights, links, and section headers
- Green (#10b981) for positive elements and "after automation" panels
- Red (#ef4444) for pain points and "current state" panels
- Score displayed in a large circle with colour coding
- Opportunity cards with side-by-side red/green panels
- Styled comparison tables with alternating row colours
- Dark ROI calculation box (#1e293b background)
- Phase grid showing Starter/Growth/Scale tiers with the recommended one highlighted
- Professional footer with WorkCrew branding, website (workcrew.io), and "Book Your Free Strategy Call" CTA
- Fully self-contained — ALL CSS embedded in <style>, no external dependencies
- Print-friendly (add @media print styles so it looks good when saved as PDF via Cmd+P)
- Responsive — looks good on both desktop and mobile
- Use UK English throughout

IMPORTANT:
- Output ONLY the HTML document, starting with <!DOCTYPE html> and ending with </html>
- Do NOT wrap in markdown code fences
- Do NOT include any text before or after the HTML
- The report should feel premium, thorough, and worth paying for — this is a sales tool
- Include real, specific, actionable recommendations — not generic fluff
- All monetary values in GBP (£)
- Include a "Report generated on [today's date]" line in the footer
- The footer CTA should be a "Book a Free Strategy Call" button linking to https://cal.com/workcrew/free-ai-strategy-call`;
}

// ---------------------------------------------------------------------------
// Vercel Blob upload (dynamic import to handle missing token gracefully)
// ---------------------------------------------------------------------------

async function uploadToBlob(
  slug: string,
  html: string
): Promise<string | null> {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    console.log("[generate-report] BLOB_READ_WRITE_TOKEN not set, skipping blob upload");
    return null;
  }

  try {
    const { put } = await import("@vercel/blob");
    const blob = await put(`reports/${slug}.html`, html, {
      access: "public",
      contentType: "text/html; charset=utf-8",
      addRandomSuffix: false,
      cacheControlMaxAge: 31536000,
    });
    return blob.url;
  } catch (err) {
    console.error("[generate-report] blob upload failed:", err);
    return null;
  }
}

// ---------------------------------------------------------------------------
// Email helpers
// ---------------------------------------------------------------------------

async function sendReportToProspect(
  email: string,
  name: string,
  businessName: string,
  reportUrl: string | null,
  reportHtml: string
) {
  if (!resend) {
    console.log("[generate-report] RESEND_API_KEY not set, skipping prospect email");
    return;
  }

  const hasUrl = !!reportUrl;

  try {
    await resend.emails.send({
      from: FROM_REPORT,
      to: email,
      subject: `Your AI Readiness Report for ${businessName} is Ready`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: #0f172a; padding: 32px 24px; border-radius: 12px 12px 0 0; text-align: center;">
            <h1 style="color: #ffffff; font-size: 22px; margin: 0 0 8px 0;">Your AI Readiness Report is Ready</h1>
            <p style="color: #94a3b8; font-size: 14px; margin: 0;">${businessName}</p>
          </div>
          <div style="background: #ffffff; padding: 32px 24px; border: 1px solid #e2e8f0; border-top: none;">
            <p style="color: #334155; font-size: 15px; line-height: 1.6; margin: 0 0 16px 0;">
              Hi ${name},
            </p>
            <p style="color: #334155; font-size: 15px; line-height: 1.6; margin: 0 0 24px 0;">
              Your full 5-section AI Readiness Audit Report for <strong>${businessName}</strong> has been generated. It includes a detailed competitor analysis, opportunity mapping, ROI projections, and a personalised implementation roadmap.
            </p>
            ${
              hasUrl
                ? `<div style="text-align: center; margin: 32px 0;">
                    <a href="${reportUrl}" style="display: inline-block; background: #6366f1; color: #ffffff; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-weight: 600; font-size: 15px;">
                      View Your Full Report
                    </a>
                  </div>
                  <p style="color: #64748b; font-size: 13px; text-align: center; margin: 0 0 24px 0;">
                    You can also save it as a PDF by pressing Cmd+P (Mac) or Ctrl+P (Windows) while viewing.
                  </p>`
                : `<p style="color: #64748b; font-size: 14px; margin: 0 0 24px 0;">
                    Your report is attached below in this email. Scroll down to view it.
                  </p>`
            }
            <div style="border-top: 1px solid #e2e8f0; padding-top: 24px; margin-top: 24px;">
              <p style="color: #334155; font-size: 15px; line-height: 1.6; margin: 0 0 16px 0;">
                <strong>What happens next?</strong>
              </p>
              <p style="color: #334155; font-size: 15px; line-height: 1.6; margin: 0 0 8px 0;">
                If you'd like to discuss the findings and explore how we can implement these improvements, book a free 30-minute strategy call:
              </p>
              <div style="text-align: center; margin: 24px 0;">
                <a href="https://cal.com/workcrew/free-ai-strategy-call" style="display: inline-block; background: #0f172a; color: #ffffff; text-decoration: none; padding: 12px 28px; border-radius: 8px; font-weight: 600; font-size: 14px;">
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
        ${!hasUrl ? `<div style="margin-top: 40px; border-top: 2px solid #6366f1; padding-top: 20px;">${reportHtml}</div>` : ""}
      `,
    });
  } catch (err) {
    console.error("[generate-report] failed to send prospect report email:", err);
  }
}

async function notifyOwner(
  data: GenerateReportBody,
  reportUrl: string | null
) {
  if (!resend) {
    console.log("[generate-report] RESEND_API_KEY not set, skipping owner notification");
    return;
  }

  const { businessName, email, industry, yourName, instantAuditResults } = data;
  const { score, recommendedTier } = instantAuditResults;

  try {
    await resend.emails.send({
      from: FROM_NOTIFY,
      to: OWNER_EMAIL,
      subject: `Report Generated: ${businessName} (${score}/10, ${recommendedTier})`,
      html: `
        <h2>Full Audit Report Generated</h2>
        <p><strong>Business:</strong> ${businessName}</p>
        <p><strong>Contact:</strong> ${yourName || "N/A"} (${email})</p>
        <p><strong>Industry:</strong> ${industry}</p>
        <p><strong>Website:</strong> ${data.website || "None"}</p>
        <p><strong>Score:</strong> ${score}/10</p>
        <p><strong>Recommended Tier:</strong> ${recommendedTier}</p>
        ${reportUrl ? `<p><strong>Report URL:</strong> <a href="${reportUrl}">${reportUrl}</a></p>` : "<p><em>Report sent as inline HTML (no blob token configured)</em></p>"}
        <hr>
        <p><em>This report was automatically generated and delivered to ${email}.</em></p>
      `,
    });
  } catch (err) {
    console.error("[generate-report] failed to send owner notification:", err);
  }
}

// ---------------------------------------------------------------------------
// Main handler
// ---------------------------------------------------------------------------

export async function POST(req: NextRequest) {
  // Guard FIRST — generate-report uses Sonnet 4.5 + Opus 4.6 advisor (most
  // expensive endpoint). Lower per-IP limit than instant-audit because each
  // call is a 300s, multi-thousand-token job.
  const guard = requireGuard(req, {
    endpoint: "generate-report",
    perIpLimit: 3,
  });
  if (!guard.ok) {
    return NextResponse.json(
      { success: false, message: guard.message },
      { status: guard.status }
    );
  }

  let body: Partial<GenerateReportBody>;

  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { success: false, message: "Invalid request body." },
      { status: 400 }
    );
  }

  const { businessName, industry, website, email, yourName, instantAuditResults } = body;

  if (!businessName?.trim() || !industry?.trim() || !email?.trim() || !instantAuditResults) {
    return NextResponse.json(
      { success: false, message: "Missing required fields." },
      { status: 422 }
    );
  }

  const cleanData: GenerateReportBody = {
    businessName: businessName.trim(),
    industry: industry.trim(),
    website: website?.trim(),
    email: email.trim(),
    yourName: yourName?.trim(),
    instantAuditResults,
  };

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    console.error("[generate-report] ANTHROPIC_API_KEY not set");
    return NextResponse.json(
      { success: false, message: "Report generation unavailable." },
      { status: 503 }
    );
  }

  try {
    console.log(`[generate-report] Generating report for ${cleanData.businessName}...`);

    // Call Claude to generate the full HTML report
    const prompt = getReportPrompt(cleanData);

    const response = await fetch(ANTHROPIC_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        ...heliconeHeaders(), "anthropic-version": ANTHROPIC_VERSION,
        "anthropic-beta": "advisor-tool-2026-03-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 16000,
        system: prompt,
        tools: [
          {
            type: "advisor_20260301",
            name: "advisor",
            model: "claude-opus-4-6",
            max_uses: 2,
          },
        ],
        messages: [
          {
            role: "user",
            content: `Generate the full AI Readiness Audit Report HTML document for ${cleanData.businessName} now.`,
          },
        ],
      }),
    });

    if (!response.ok) {
      const errText = await response.text().catch(() => "Unknown error");
      console.error("[generate-report] Claude API error:", response.status, errText);
      return NextResponse.json(
        { success: false, message: "Report generation failed." },
        { status: 502 }
      );
    }

    const result = await response.json();
    let reportHtml = result.content?.[0]?.text || "";

    // Strip markdown code fences if present
    if (reportHtml.startsWith("```")) {
      reportHtml = reportHtml.replace(/^```(?:html)?\n?/, "").replace(/\n?```$/, "");
    }

    if (!reportHtml.includes("<!DOCTYPE html") && !reportHtml.includes("<html")) {
      console.error("[generate-report] Claude did not return valid HTML");
      return NextResponse.json(
        { success: false, message: "Report generation produced invalid output." },
        { status: 502 }
      );
    }

    console.log(`[generate-report] HTML generated (${reportHtml.length} chars)`);

    // Upload to Vercel Blob
    const slug = `${slugify(cleanData.businessName)}-${Date.now()}`;
    const blobUrl = await uploadToBlob(slug, reportHtml);

    // Use our clean proxy URL instead of raw blob URL (renders in browser, no download)
    const reportUrl = blobUrl
      ? `https://workcrew.io/reports/${slug}`
      : null;

    if (reportUrl) {
      console.log(`[generate-report] Report available at: ${reportUrl}`);
    }

    // Send emails
    await Promise.all([
      sendReportToProspect(
        cleanData.email,
        cleanData.yourName || cleanData.businessName,
        cleanData.businessName,
        reportUrl,
        reportHtml
      ),
      notifyOwner(cleanData, reportUrl),
    ]);

    console.log(`[generate-report] Report delivered for ${cleanData.businessName}`);

    return NextResponse.json({
      success: true,
      reportUrl: reportUrl || null,
    });
  } catch (err) {
    console.error("[generate-report] unexpected error:", err);
    return NextResponse.json(
      { success: false, message: "An unexpected error occurred." },
      { status: 500 }
    );
  }
}
