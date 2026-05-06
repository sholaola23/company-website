import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import type { WebhookPayload } from "@/lib/supabase/types";

export const maxDuration = 30;

/**
 * POST /api/portal/webhook
 *
 * Receives leads from n8n (or any external source).
 * - Verifies webhook secret via x-webhook-secret header
 * - Upserts lead by source_id (idempotent)
 * - Auto-logs activity via DB trigger
 *
 * Headers:
 *   x-webhook-secret: <PORTAL_WEBHOOK_SECRET>
 *
 * Body: WebhookPayload (see types.ts)
 */
export async function POST(req: NextRequest) {
  // Verify webhook secret
  const secret = req.headers.get("x-webhook-secret");
  if (!secret || secret !== process.env.PORTAL_WEBHOOK_SECRET) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const body: WebhookPayload = await req.json();

    // Validate required fields
    if (!body.organisation_id || !body.company_name || !body.contact_name) {
      return NextResponse.json(
        {
          error: "Missing required fields: organisation_id, company_name, contact_name",
        },
        { status: 400 }
      );
    }

    const supabase = createAdminClient();

    // Verify the organisation exists
    const { data: org, error: orgError } = await supabase
      .from("organisations")
      .select("id")
      .eq("id", body.organisation_id)
      .single();

    if (orgError || !org) {
      return NextResponse.json(
        { error: "Organisation not found" },
        { status: 404 }
      );
    }

    // If campaign_id provided, verify it exists
    if (body.campaign_id) {
      const { data: campaign, error: campaignError } = await supabase
        .from("campaigns")
        .select("id")
        .eq("id", body.campaign_id)
        .eq("organisation_id", body.organisation_id)
        .single();

      if (campaignError || !campaign) {
        return NextResponse.json(
          { error: "Campaign not found or does not belong to this organisation" },
          { status: 404 }
        );
      }
    }

    // Build the lead record
    const leadData = {
      organisation_id: body.organisation_id,
      campaign_id: body.campaign_id || null,
      company_name: body.company_name,
      contact_name: body.contact_name,
      contact_email: body.contact_email || null,
      contact_phone: body.contact_phone || null,
      contact_linkedin: body.contact_linkedin || null,
      source: body.source || "linkedin",
      source_id: body.source_id || null,
      stage: body.stage || "new",
      score: body.score || 0,
      project_details: body.project_details || null,
      location: body.location || null,
      estimated_value: body.estimated_value || 0,
      notes: body.notes || null,
    };

    let result;

    // If source_id provided, upsert (idempotent). Otherwise, insert.
    if (body.source_id) {
      const { data, error } = await supabase
        .from("leads")
        .upsert(leadData, {
          onConflict: "source_id",
          ignoreDuplicates: false,
        })
        .select()
        .single();

      if (error) {
        console.error("[Portal Webhook] Upsert error:", error);
        return NextResponse.json(
          { error: "Failed to upsert lead", details: error.message },
          { status: 500 }
        );
      }
      result = data;
    } else {
      const { data, error } = await supabase
        .from("leads")
        .insert(leadData)
        .select()
        .single();

      if (error) {
        console.error("[Portal Webhook] Insert error:", error);
        return NextResponse.json(
          { error: "Failed to insert lead", details: error.message },
          { status: 500 }
        );
      }
      result = data;
    }

    return NextResponse.json(
      { success: true, lead: result },
      { status: 200 }
    );
  } catch (err) {
    console.error("[Portal Webhook] Unexpected error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
