import { createClient } from "@/lib/supabase/server";
import type { Lead, Organisation, Campaign } from "@/lib/supabase/types";
import LeadTable from "@/components/portal/LeadTable";

/**
 * Full lead list page with filtering, search, and sorting.
 */
export default async function LeadsPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ stage?: string; campaign?: string; q?: string }>;
}) {
  const { slug } = await params;
  const filters = await searchParams;
  const supabase = await createClient();

  // Get org
  const { data: org } = await supabase
    .from("organisations")
    .select("*")
    .eq("slug", slug)
    .single<Organisation>();

  if (!org) return null;

  // Get campaigns for filter dropdown
  const { data: campaigns } = await supabase
    .from("campaigns")
    .select("*")
    .eq("organisation_id", org.id)
    .order("name")
    .returns<Campaign[]>();

  // Build lead query with filters
  let query = supabase
    .from("leads")
    .select("*")
    .eq("organisation_id", org.id)
    .order("created_at", { ascending: false });

  if (filters.stage) {
    query = query.eq("stage", filters.stage);
  }
  if (filters.campaign) {
    query = query.eq("campaign_id", filters.campaign);
  }
  if (filters.q) {
    query = query.or(
      `company_name.ilike.%${filters.q}%,contact_name.ilike.%${filters.q}%,contact_email.ilike.%${filters.q}%`
    );
  }

  const { data: leads } = await query.returns<Lead[]>();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[var(--color-heading)]">All Leads</h1>
        <p className="text-[var(--color-muted)] mt-1">
          {leads?.length || 0} leads across all campaigns
        </p>
      </div>

      <LeadTable
        leads={leads || []}
        campaigns={campaigns || []}
        currentFilters={filters}
        slug={slug}
        brandColor={org.brand_color}
      />
    </div>
  );
}
