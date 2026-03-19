import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

const FROM =
  process.env.RESEND_DOMAIN_VERIFIED === "true"
    ? "Oladipupo Consulting <notifications@oladipupoconsulting.co.uk>"
    : "Oladipupo Consulting <onboarding@resend.dev>";

const OWNER_EMAIL = "olusholaoladipupo1@gmail.com";

/**
 * Webhook endpoint for Meta Ads lead form submissions.
 * Can be called by Make.com, Zapier, or any service that
 * forwards Google Sheets new-row events.
 *
 * Expects JSON body with lead data.
 * Instantly notifies Olushola via email.
 */
export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get("authorization");
    const expectedToken = process.env.CRON_SECRET;

    if (expectedToken && authHeader !== `Bearer ${expectedToken}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();

    const leadName = body.name || body.full_name || body.fullName || "Unknown";
    const leadEmail = body.email || "No email";
    const leadPhone = body.phone || body.phone_number || "Not provided";
    const source = body.source || "Meta Ads";
    const adName = body.ad_name || body.adName || "Unknown Ad";
    const timestamp = new Date().toLocaleString("en-GB", {
      timeZone: "Europe/London",
    });

    // Send instant notification to Olushola
    if (resend) {
      await resend.emails.send({
        from: FROM,
        to: OWNER_EMAIL,
        subject: `🔥 NEW AD LEAD: ${leadName} — ${source}`,
        html: `
          <div style="font-family: -apple-system, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: #0f172a; color: white; padding: 20px; border-radius: 8px 8px 0 0;">
              <h2 style="margin: 0; color: #3b82f6;">New Lead from ${source}</h2>
              <p style="margin: 4px 0 0; color: #94a3b8; font-size: 14px;">${timestamp}</p>
            </div>
            <div style="background: #f8fafc; padding: 20px; border: 1px solid #e2e8f0; border-top: none; border-radius: 0 0 8px 8px;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; color: #64748b; font-size: 14px; width: 120px;"><strong>Name</strong></td>
                  <td style="padding: 8px 0; font-size: 14px;">${leadName}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #64748b; font-size: 14px;"><strong>Email</strong></td>
                  <td style="padding: 8px 0; font-size: 14px;"><a href="mailto:${leadEmail}">${leadEmail}</a></td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #64748b; font-size: 14px;"><strong>Phone</strong></td>
                  <td style="padding: 8px 0; font-size: 14px;">${leadPhone}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #64748b; font-size: 14px;"><strong>Ad</strong></td>
                  <td style="padding: 8px 0; font-size: 14px;">${adName}</td>
                </tr>
              </table>
              <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 16px 0;" />
              <p style="font-size: 14px; color: #1e293b; margin: 0;">
                <strong>Next steps:</strong> Reply within 5 minutes for best conversion.
                <br/><br/>
                <a href="mailto:${leadEmail}" style="background: #3b82f6; color: white; padding: 10px 20px; border-radius: 6px; text-decoration: none; display: inline-block;">Reply to Lead</a>
                &nbsp;
                <a href="https://cal.com/sholastechnotes/free-ai-strategy-call" style="background: #0f172a; color: white; padding: 10px 20px; border-radius: 6px; text-decoration: none; display: inline-block;">Send Booking Link</a>
              </p>
            </div>
          </div>
        `,
      });
    }

    return NextResponse.json({
      success: true,
      message: "Lead notification sent",
      lead: { name: leadName, email: leadEmail },
    });
  } catch (error) {
    console.error("Meta webhook error:", error);
    return NextResponse.json(
      { error: "Failed to process lead" },
      { status: 500 }
    );
  }
}

// Verification endpoint for Meta webhook setup
export async function GET() {
  return NextResponse.json({
    status: "active",
    service: "Oladipupo Consulting Lead Webhook",
    timestamp: new Date().toISOString(),
  });
}
