import { createClient } from "@/lib/supabase/server";
import type { Lead, ActivityLogEntry, Organisation } from "@/lib/supabase/types";
import KPIBar from "@/components/portal/KPIBar";
import LeadPipeline from "@/components/portal/LeadPipeline";
import ActivityFeed from "@/components/portal/ActivityFeed";

/**
 * Dashboard overview page for a client org.
 * Shows KPI cards, pipeline summary, and recent activity.
 */
export default async function OrgDashboardPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const supabase = await createClient();

  // Get org
  const { data: org } = await supabase
    .from("organisations")
    .select("*")
    .eq("slug", slug)
    .single<Organisation>();

  if (!org) return null;

  // Get all leads for this org
  const { data: leads } = await supabase
    .from("leads")
    .select("*")
    .eq("organisation_id", org.id)
    .order("created_at", { ascending: false })
    .returns<Lead[]>();

  // Get recent activity
  const { data: activities } = await supabase
    .from("activity_log")
    .select("*")
    .eq("organisation_id", org.id)
    .order("created_at", { ascending: false })
    .limit(10)
    .returns<ActivityLogEntry[]>();

  const allLeads = leads || [];
  const allActivities = activities || [];

  // Calculate KPIs
  const now = new Date();
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

  const totalLeads = allLeads.length;
  const qualifiedLeads = allLeads.filter((l) => l.stage === "qualified" || l.stage === "delivered").length;
  const deliveredThisMonth = allLeads.filter(
    (l) => l.stage === "delivered" && new Date(l.created_at) >= monthStart
  ).length;
  const respondedLeads = allLeads.filter(
    (l) => l.stage === "responded" || l.stage === "qualified" || l.stage === "delivered"
  ).length;
  const responseRate = totalLeads > 0 ? Math.round((respondedLeads / totalLeads) * 100) : 0;

  return (
    <div className="space-y-8">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
        <p className="text-slate-500 mt-1">
          Welcome back, {org.contact_name}. Here&apos;s your lead pipeline.
        </p>
      </div>

      {/* KPI Cards */}
      <KPIBar
        totalLeads={totalLeads}
        qualifiedLeads={qualifiedLeads}
        deliveredThisMonth={deliveredThisMonth}
        responseRate={responseRate}
        brandColor={org.brand_color}
      />

      {/* Pipeline + Activity */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2">
          <LeadPipeline leads={allLeads} brandColor={org.brand_color} orgId={org.id} />
        </div>
        <div>
          <ActivityFeed activities={allActivities} />
        </div>
      </div>
    </div>
  );
}
