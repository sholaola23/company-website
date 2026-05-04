import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { Resend } from "resend";
import type { Organisation, Lead } from "@/lib/supabase/types";

export const maxDuration = 60;

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

/**
 * GET /api/portal/digest
 *
 * Weekly digest email — sends each active org a summary of their leads
 * from the past 7 days.
 *
 * Vercel Cron: 0 9 * * 1 (Monday 9am)
 * Auth: Vercel cron secret via Authorization header
 */
export async function GET(req: Request) {
  // Verify cron secret (Vercel sends this automatically for cron jobs)
  const authHeader = req.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createAdminClient();
  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();

  // Get all active organisations
  const { data: orgs } = await supabase
    .from("organisations")
    .select("*")
    .eq("status", "active")
    .returns<Organisation[]>();

  if (!orgs || orgs.length === 0) {
    return NextResponse.json({ message: "No active organisations" });
  }

  const results: Array<{ org: string; status: string; error?: string }> = [];

  for (const org of orgs) {
    try {
      // Get leads from the past 7 days
      const { data: recentLeads } = await supabase
        .from("leads")
        .select("*")
        .eq("organisation_id", org.id)
        .gte("created_at", sevenDaysAgo)
        .returns<Lead[]>();

      const leads = recentLeads || [];
      const newLeads = leads.filter((l) => l.stage === "new").length;
      const qualifiedLeads = leads.filter(
        (l) => l.stage === "qualified" || l.stage === "delivered"
      ).length;
      const deliveredLeads = leads.filter((l) => l.stage === "delivered").length;

      // Skip orgs with no activity
      if (leads.length === 0) {
        await supabase.from("digest_log").insert({
          organisation_id: org.id,
          email_to: org.contact_email,
          leads_new: 0,
          leads_qualified: 0,
          leads_delivered: 0,
          status: "skipped",
        });

        results.push({ org: org.name, status: "skipped (no activity)" });
        continue;
      }

      // Build HTML email
      const html = buildDigestEmail(org, leads.length, newLeads, qualifiedLeads, deliveredLeads);

      // Send via Resend
      const { error: emailError } = await resend.emails.send({
        from: "Leads4U <hello@workcrew.io>",
        to: [org.contact_email],
        subject: `Weekly Lead Report: ${leads.length} leads this week`,
        html,
      });

      if (emailError) {
        throw new Error(emailError.message);
      }

      // Log the digest
      await supabase.from("digest_log").insert({
        organisation_id: org.id,
        email_to: org.contact_email,
        leads_new: newLeads,
        leads_qualified: qualifiedLeads,
        leads_delivered: deliveredLeads,
        status: "sent",
      });

      results.push({ org: org.name, status: "sent" });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error";
      console.error(`[Digest] Failed for ${org.name}:`, message);

      await supabase.from("digest_log").insert({
        organisation_id: org.id,
        email_to: org.contact_email,
        leads_new: 0,
        leads_qualified: 0,
        leads_delivered: 0,
        status: "failed",
      });

      results.push({ org: org.name, status: "failed", error: message });
    }
  }

  return NextResponse.json({ results });
}

/** Builds a clean HTML digest email */
function buildDigestEmail(
  org: Organisation,
  total: number,
  newLeads: number,
  qualified: number,
  delivered: number
): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0;padding:0;background-color:#f8fafc;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <div style="max-width:600px;margin:0 auto;padding:40px 20px;">
    <!-- Header -->
    <div style="text-align:center;margin-bottom:32px;">
      <div style="display:inline-block;width:48px;height:48px;border-radius:12px;background-color:${org.brand_color};color:white;font-weight:bold;font-size:18px;line-height:48px;text-align:center;">
        ${org.name.charAt(0)}
      </div>
      <h1 style="margin:16px 0 4px;font-size:24px;color:#0f172a;">Weekly Lead Report</h1>
      <p style="margin:0;color:#64748b;font-size:14px;">
        ${new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
      </p>
    </div>

    <!-- Stats Card -->
    <div style="background:white;border-radius:16px;padding:32px;border:1px solid #e2e8f0;margin-bottom:24px;">
      <p style="margin:0 0 20px;color:#475569;font-size:15px;">
        Hi ${org.contact_name},
      </p>
      <p style="margin:0 0 24px;color:#475569;font-size:15px;">
        Here&rsquo;s your lead pipeline summary for the past 7 days:
      </p>

      <!-- KPI Grid -->
      <div style="display:flex;gap:16px;margin-bottom:24px;">
        <div style="flex:1;background:#f8fafc;border-radius:12px;padding:16px;text-align:center;">
          <div style="font-size:28px;font-weight:700;color:#0f172a;">${total}</div>
          <div style="font-size:12px;color:#64748b;margin-top:4px;">Total Leads</div>
        </div>
        <div style="flex:1;background:#eff6ff;border-radius:12px;padding:16px;text-align:center;">
          <div style="font-size:28px;font-weight:700;color:#2563eb;">${newLeads}</div>
          <div style="font-size:12px;color:#64748b;margin-top:4px;">New</div>
        </div>
        <div style="flex:1;background:#fef3c7;border-radius:12px;padding:16px;text-align:center;">
          <div style="font-size:28px;font-weight:700;color:#d97706;">${qualified}</div>
          <div style="font-size:12px;color:#64748b;margin-top:4px;">Qualified</div>
        </div>
        <div style="flex:1;background:#d1fae5;border-radius:12px;padding:16px;text-align:center;">
          <div style="font-size:28px;font-weight:700;color:#059669;">${delivered}</div>
          <div style="font-size:12px;color:#64748b;margin-top:4px;">Delivered</div>
        </div>
      </div>

      <!-- CTA -->
      <div style="text-align:center;">
        <a href="https://workcrew.io/portal/${org.slug}"
           style="display:inline-block;background-color:${org.brand_color};color:white;padding:12px 32px;border-radius:8px;font-size:14px;font-weight:600;text-decoration:none;">
          View Full Dashboard
        </a>
      </div>
    </div>

    <!-- Footer -->
    <div style="text-align:center;color:#94a3b8;font-size:12px;">
      <p>Powered by <a href="https://workcrew.io" style="color:${org.brand_color};text-decoration:none;">WorkCrew</a></p>
    </div>
  </div>
</body>
</html>`;
}
