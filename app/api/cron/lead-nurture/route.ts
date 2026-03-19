import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

const FROM =
  process.env.RESEND_DOMAIN_VERIFIED === "true"
    ? "Olushola from Oladipupo Consulting <hello@oladipupoconsulting.co.uk>"
    : "Oladipupo Consulting <onboarding@resend.dev>";

const OWNER_EMAIL = "olusholaoladipupo1@gmail.com";

/**
 * Daily nurture cron job.
 * Checks Notion pipeline for audit leads who:
 * - Completed an audit but haven't booked a call
 * - Are due for a Day 2 or Day 5 follow-up email
 *
 * Sends personalised nurture emails via Resend.
 * Runs daily at 10am UK time.
 */
export async function GET(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  if (
    process.env.CRON_SECRET &&
    authHeader !== `Bearer ${process.env.CRON_SECRET}`
  ) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const notionApiKey = process.env.NOTION_API_KEY;
    const pipelineDbId = process.env.NOTION_PIPELINE_DB;

    if (!notionApiKey || !pipelineDbId) {
      return NextResponse.json({
        status: "skipped",
        reason: "Notion credentials not configured",
      });
    }

    // Query Notion for leads with status "new" that have an email
    // and were created in the last 7 days
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const response = await fetch(
      `https://api.notion.com/v1/databases/${pipelineDbId}/query`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${notionApiKey}`,
          "Notion-Version": "2022-06-28",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          filter: {
            and: [
              {
                property: "Status",
                select: { equals: "new" },
              },
              {
                property: "Created",
                created_time: { after: sevenDaysAgo.toISOString() },
              },
            ],
          },
          sorts: [{ property: "Created", direction: "ascending" }],
        }),
      }
    );

    if (!response.ok) {
      return NextResponse.json({
        status: "error",
        reason: "Notion query failed",
      });
    }

    const data = await response.json();
    const leads = data.results || [];

    let emailsSent = 0;
    const results: { name: string; email: string; day: number }[] = [];

    for (const lead of leads) {
      const props = lead.properties;

      // Extract lead data from Notion properties
      const name =
        props?.["Business Name"]?.title?.[0]?.plain_text ||
        props?.["Name"]?.title?.[0]?.plain_text ||
        "there";
      const email =
        props?.["Email"]?.email ||
        props?.["Contact Email"]?.email ||
        null;
      const source =
        props?.["Source"]?.select?.name || "";

      if (!email) continue;

      // Calculate days since creation
      const createdDate = new Date(lead.created_time);
      const now = new Date();
      const daysSinceCreation = Math.floor(
        (now.getTime() - createdDate.getTime()) / (1000 * 60 * 60 * 24)
      );

      // Check nurture tags to avoid duplicate sends
      const nurtureTag =
        props?.["Nurture"]?.select?.name || "";

      if (!resend) continue;

      // Day 2: Case study email
      if (daysSinceCreation === 2 && nurtureTag !== "day2-sent" && nurtureTag !== "day5-sent") {
        await resend.emails.send({
          from: FROM,
          to: email,
          subject: `How a bakery saved 8 hours a week with AI`,
          html: buildDay2Email(name),
        });

        // Update Notion with nurture tag
        await updateNurtureTag(notionApiKey, lead.id, "day2-sent");
        emailsSent++;
        results.push({ name, email, day: 2 });
      }

      // Day 5: Final nudge with booking link
      if (daysSinceCreation === 5 && nurtureTag === "day2-sent") {
        await resend.emails.send({
          from: FROM,
          to: email,
          subject: `Quick question about ${name}`,
          html: buildDay5Email(name),
        });

        await updateNurtureTag(notionApiKey, lead.id, "day5-sent");
        emailsSent++;
        results.push({ name, email, day: 5 });
      }
    }

    // Notify owner if any nurture emails were sent
    if (emailsSent > 0 && resend) {
      const summary = results
        .map((r) => `- ${r.name} (${r.email}) — Day ${r.day} email`)
        .join("\n");

      await resend.emails.send({
        from: FROM,
        to: OWNER_EMAIL,
        subject: `Nurture: ${emailsSent} follow-up email(s) sent`,
        text: `The lead nurture system sent ${emailsSent} email(s) today:\n\n${summary}\n\nThese are automated follow-ups for leads who completed an audit but haven't booked a call yet.`,
      });
    }

    return NextResponse.json({
      status: "success",
      leadsChecked: leads.length,
      emailsSent,
      details: results,
    });
  } catch (error) {
    console.error("Lead nurture cron error:", error);
    return NextResponse.json(
      { error: "Nurture cron failed" },
      { status: 500 }
    );
  }
}

async function updateNurtureTag(
  apiKey: string,
  pageId: string,
  tag: string
) {
  await fetch(`https://api.notion.com/v1/pages/${pageId}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Notion-Version": "2022-06-28",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      properties: {
        Nurture: { select: { name: tag } },
      },
    }),
  });
}

function buildDay2Email(name: string): string {
  return `
    <div style="font-family: -apple-system, sans-serif; max-width: 600px; margin: 0 auto; color: #1e293b; line-height: 1.6;">
      <p>Hi ${name},</p>

      <p>A couple of days ago you took our AI readiness audit — thanks for that.</p>

      <p>I wanted to share a quick story that might be relevant to your results.</p>

      <p>We worked with a local bakery called E'Manuel. They were spending <strong>8 hours every week</strong> on manual tasks: tracking loyalty customers, sending thank-you messages, managing their calendar.</p>

      <p>We set up an AI system that now handles all of it automatically:</p>
      <ul>
        <li>Every customer gets an instant thank-you after their purchase</li>
        <li>Loyalty tiers update automatically based on spend</li>
        <li>Calendar and appointments sync without manual input</li>
      </ul>

      <p><strong>Result: 8 hours saved per week.</strong> That's over 400 hours a year they got back.</p>

      <p>If your audit showed opportunities for automation, this is the kind of result that's possible — usually within 7 days of starting.</p>

      <p>Happy to chat if you'd like to explore what this could look like for your business.</p>

      <p>
        Olushola<br/>
        <span style="color: #64748b;">Oladipupo Consulting</span>
      </p>

      <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 24px 0;" />
      <p style="font-size: 12px; color: #94a3b8;">
        You're receiving this because you completed an AI readiness audit at oladipupoconsulting.co.uk.
        If you'd prefer not to receive follow-ups, simply reply and let me know.
      </p>
    </div>
  `;
}

function buildDay5Email(name: string): string {
  return `
    <div style="font-family: -apple-system, sans-serif; max-width: 600px; margin: 0 auto; color: #1e293b; line-height: 1.6;">
      <p>Hi ${name},</p>

      <p>Just a quick note — I noticed you completed our AI audit last week but haven't had a chance to chat about the results yet.</p>

      <p>No pressure at all. But if you're curious about what the findings mean in practice, I'm happy to walk through it in a quick 15-minute call.</p>

      <p>I'll show you:</p>
      <ul>
        <li>The 1-2 highest-impact automations for your specific business</li>
        <li>Realistic timeline and cost to implement</li>
        <li>Whether it's worth doing at all (sometimes it isn't, and I'll tell you that honestly)</li>
      </ul>

      <p>
        <a href="https://cal.com/sholastechnotes/free-ai-strategy-call"
           style="background: #3b82f6; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; display: inline-block; font-weight: 500;">
          Book a Free 15-Min Call
        </a>
      </p>

      <p>Either way, I hope the audit was useful.</p>

      <p>
        Olushola<br/>
        <span style="color: #64748b;">Oladipupo Consulting</span>
      </p>

      <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 24px 0;" />
      <p style="font-size: 12px; color: #94a3b8;">
        You're receiving this because you completed an AI readiness audit at oladipupoconsulting.co.uk.
        This is the last automated follow-up — no more emails after this.
      </p>
    </div>
  `;
}
