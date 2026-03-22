import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

const FROM = "Oladipupo Consulting <hello@oladipupoconsulting.co.uk>";
const OWNER_EMAIL = "olusholaoladipupo1@gmail.com";
const VERIFY_TOKEN = process.env.META_VERIFY_TOKEN || "oladipupo-meta-leads";

interface ParsedLead {
  name: string;
  email: string;
  phone: string;
  formName: string;
  source: string;
  adName: string;
  rawPayload: Record<string, unknown>;
}

/**
 * Parse lead data from Meta's native webhook payload.
 * Meta sends: { entry: [{ changes: [{ value: { leadgen_id, ... } }] }] }
 * The actual field data comes from the Leads API, but Meta Instant Forms
 * can also be configured to forward data via Make.com / Zapier which sends
 * a flat JSON body. We handle both formats.
 */
function parseLead(body: Record<string, unknown>): ParsedLead {
  // Format 1: Flat JSON (from Make.com, Zapier, Google Sheets webhook, or direct POST)
  if (body.name || body.full_name || body.fullName || body.email) {
    return {
      name:
        getString(body.name) ||
        getString(body.full_name) ||
        getString(body.fullName) ||
        "Unknown",
      email: getString(body.email) || "No email",
      phone:
        getString(body.phone) ||
        getString(body.phone_number) ||
        getString(body.phoneNumber) ||
        "Not provided",
      formName:
        getString(body.form_name) ||
        getString(body.formName) ||
        getString(body.form_id) ||
        "Meta Instant Form",
      source: getString(body.source) || "Meta Ads",
      adName:
        getString(body.ad_name) ||
        getString(body.adName) ||
        getString(body.campaign_name) ||
        "Unknown Ad",
      rawPayload: body,
    };
  }

  // Format 2: Native Meta Webhooks API payload
  // { object: "page", entry: [{ id, time, changes: [{ field: "leadgen", value: { ... } }] }] }
  if (body.object === "page" && Array.isArray(body.entry)) {
    const entry = body.entry[0] as Record<string, unknown> | undefined;
    const changes = Array.isArray(entry?.changes)
      ? (entry.changes as Record<string, unknown>[])
      : [];
    const leadgenChange = changes.find(
      (c) => c.field === "leadgen"
    );
    const value = (leadgenChange?.value || {}) as Record<string, unknown>;

    // Native Meta payload includes leadgen_id but NOT the field values directly.
    // Field values must be fetched from the Leads API using the leadgen_id.
    // However, some setups (like CRM integrations) enrich the payload before forwarding.
    const fieldData = (Array.isArray(value.field_data)
      ? value.field_data
      : []) as Array<{ name: string; values: string[] }>;

    const getField = (fieldName: string): string => {
      const field = fieldData.find(
        (f) =>
          f.name?.toLowerCase().includes(fieldName) ||
          f.name === fieldName
      );
      return field?.values?.[0] || "";
    };

    return {
      name:
        getField("full_name") ||
        getField("name") ||
        getString(value.leadgen_id) ||
        "Unknown",
      email: getField("email") || "No email",
      phone: getField("phone") || getField("phone_number") || "Not provided",
      formName:
        getString(value.form_id) ||
        getString(value.form_name) ||
        "Meta Instant Form",
      source: "Meta Ads",
      adName:
        getString(value.ad_name) ||
        getString(value.ad_id) ||
        "Unknown Ad",
      rawPayload: body,
    };
  }

  // Format 3: Unknown format — extract what we can
  return {
    name: getString(body.name) || "Unknown",
    email: getString(body.email) || "No email",
    phone: getString(body.phone) || "Not provided",
    formName: "Meta Instant Form",
    source: "Meta Ads",
    adName: "Unknown Ad",
    rawPayload: body,
  };
}

function getString(val: unknown): string {
  if (typeof val === "string") return val;
  if (typeof val === "number") return String(val);
  return "";
}

/**
 * Meta Webhook Verification (GET)
 *
 * When you configure a webhook in Meta's App Dashboard, Meta sends a GET request
 * with hub.mode, hub.verify_token, and hub.challenge query parameters.
 * We must respond with hub.challenge if the token matches.
 *
 * URL: https://oladipupoconsulting.co.uk/api/leads/meta-webhook
 */
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const mode = searchParams.get("hub.mode");
  const token = searchParams.get("hub.verify_token");
  const challenge = searchParams.get("hub.challenge");

  // Meta webhook verification handshake
  if (mode === "subscribe" && token === VERIFY_TOKEN && challenge) {
    console.log("[meta-webhook] Verification successful");
    return new NextResponse(challenge, {
      status: 200,
      headers: { "Content-Type": "text/plain" },
    });
  }

  // Non-verification GET — return status
  return NextResponse.json({
    status: "active",
    service: "Oladipupo Consulting — Meta Lead Webhook",
    timestamp: new Date().toISOString(),
  });
}

/**
 * Webhook endpoint for Meta Ads lead form submissions (POST).
 *
 * Handles:
 * 1. Native Meta Webhooks API payloads
 * 2. Flat JSON from Make.com / Zapier / Google Sheets
 *
 * Sends instant notification email to Olushola via Resend.
 */
export async function POST(req: NextRequest) {
  try {
    // Auth check — optional, only enforced if CRON_SECRET is set
    const authHeader = req.headers.get("authorization");
    const expectedToken = process.env.CRON_SECRET;

    if (expectedToken && authHeader !== `Bearer ${expectedToken}`) {
      // Skip auth check for Meta's native webhooks (they don't send Bearer tokens)
      const contentType = req.headers.get("content-type") || "";
      if (!contentType.includes("application/json")) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
    }

    const body = (await req.json()) as Record<string, unknown>;

    // Parse lead data from whichever format we received
    const lead = parseLead(body);

    const timestamp = new Date().toLocaleString("en-GB", {
      timeZone: "Europe/London",
    });

    // Send instant notification to Olushola
    if (resend) {
      try {
        await resend.emails.send({
          from: FROM,
          to: OWNER_EMAIL,
          subject: `[NEW LEAD] ${lead.name} — Meta Ads`,
          html: `
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto;">
              <div style="background: #0f172a; color: white; padding: 20px; border-radius: 8px 8px 0 0;">
                <h2 style="margin: 0; color: #3b82f6;">New Lead from Meta Ads</h2>
                <p style="margin: 4px 0 0; color: #94a3b8; font-size: 14px;">${timestamp}</p>
              </div>
              <div style="background: #f8fafc; padding: 20px; border: 1px solid #e2e8f0; border-top: none; border-radius: 0 0 8px 8px;">
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 8px 0; color: #64748b; font-size: 14px; width: 120px;"><strong>Name</strong></td>
                    <td style="padding: 8px 0; font-size: 14px;">${lead.name}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #64748b; font-size: 14px;"><strong>Email</strong></td>
                    <td style="padding: 8px 0; font-size: 14px;"><a href="mailto:${lead.email}" style="color: #3b82f6;">${lead.email}</a></td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #64748b; font-size: 14px;"><strong>Phone</strong></td>
                    <td style="padding: 8px 0; font-size: 14px;">${lead.phone}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #64748b; font-size: 14px;"><strong>Form</strong></td>
                    <td style="padding: 8px 0; font-size: 14px;">${lead.formName}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #64748b; font-size: 14px;"><strong>Ad</strong></td>
                    <td style="padding: 8px 0; font-size: 14px;">${lead.adName}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #64748b; font-size: 14px;"><strong>Source</strong></td>
                    <td style="padding: 8px 0; font-size: 14px;">${lead.source}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #64748b; font-size: 14px;"><strong>Timestamp</strong></td>
                    <td style="padding: 8px 0; font-size: 14px;">${timestamp}</td>
                  </tr>
                </table>
                <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 16px 0;" />
                <p style="font-size: 14px; color: #1e293b; margin: 0;">
                  <strong>Next steps:</strong> Reply within 5 minutes for best conversion.
                  <br/><br/>
                  <a href="mailto:${lead.email}" style="background: #3b82f6; color: white; padding: 10px 20px; border-radius: 6px; text-decoration: none; display: inline-block;">Reply to Lead</a>
                  &nbsp;
                  <a href="https://cal.com/sholastechnotes/free-ai-strategy-call" style="background: #0f172a; color: white; padding: 10px 20px; border-radius: 6px; text-decoration: none; display: inline-block;">Send Booking Link</a>
                </p>
              </div>
            </div>
          `,
        });
        console.log("[meta-webhook] Notification sent for lead:", lead.name);
      } catch (emailError) {
        console.error("[meta-webhook] Failed to send email:", emailError);
      }
    } else {
      console.warn(
        "[meta-webhook] RESEND_API_KEY not set — email not sent. Lead:",
        lead.name,
        lead.email
      );
    }

    return NextResponse.json({
      success: true,
      message: "Lead notification sent",
      lead: { name: lead.name, email: lead.email },
    });
  } catch (error) {
    console.error("[meta-webhook] Error processing webhook:", error);
    return NextResponse.json(
      { error: "Failed to process lead" },
      { status: 500 }
    );
  }
}
