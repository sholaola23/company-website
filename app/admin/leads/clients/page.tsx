import { createClient } from "@/lib/supabase/server";
import type { Organisation, Lead } from "@/lib/supabase/types";
import Link from "next/link";

/**
 * Admin page: client list with lead counts, status, and quick actions.
 */
export default async function AdminClientsPage() {
  const supabase = await createClient();

  const { data: orgs } = await supabase
    .from("organisations")
    .select("*")
    .order("name")
    .returns<Organisation[]>();

  const { data: leads } = await supabase
    .from("leads")
    .select("id, organisation_id, stage")
    .returns<Pick<Lead, "id" | "organisation_id" | "stage">[]>();

  const allOrgs = orgs || [];
  const allLeads = leads || [];

  // Build stats per org
  const orgStats = allOrgs.map((org) => {
    const orgLeads = allLeads.filter((l) => l.organisation_id === org.id);
    return {
      org,
      totalLeads: orgLeads.length,
      newLeads: orgLeads.filter((l) => l.stage === "new").length,
      qualifiedLeads: orgLeads.filter(
        (l) => l.stage === "qualified" || l.stage === "delivered"
      ).length,
      deliveredLeads: orgLeads.filter((l) => l.stage === "delivered").length,
    };
  });

  const statusColors: Record<string, string> = {
    active: "bg-green-100 text-green-700",
    paused: "bg-yellow-100 text-yellow-700",
    churned: "bg-red-100 text-red-700",
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Clients</h1>
          <p className="text-slate-500 mt-1">
            {allOrgs.length} client organisations
          </p>
        </div>
      </div>

      <div className="grid gap-4">
        {orgStats.map(({ org, totalLeads, newLeads, qualifiedLeads, deliveredLeads }) => (
          <div
            key={org.id}
            className="bg-white rounded-xl border border-slate-200 p-6 hover:border-slate-300 transition"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                {/* Color dot or logo */}
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg"
                  style={{ backgroundColor: org.brand_color }}
                >
                  {org.name.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="font-semibold text-slate-900">{org.name}</h2>
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        statusColors[org.status] || "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {org.status}
                    </span>
                  </div>
                  <p className="text-sm text-slate-500 mt-0.5">
                    {org.contact_name} &middot; {org.contact_email}
                  </p>
                  <p className="text-sm text-slate-400">
                    {org.industry} &middot; &pound;{org.monthly_fee}/mo
                  </p>
                </div>
              </div>

              <Link
                href={`/portal/${org.slug}`}
                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                View Portal &rarr;
              </Link>
            </div>

            {/* Lead stats bar */}
            <div className="mt-4 grid grid-cols-4 gap-4 pt-4 border-t border-slate-100">
              <div>
                <p className="text-2xl font-bold text-slate-900">
                  {totalLeads}
                </p>
                <p className="text-xs text-slate-500">Total Leads</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-blue-600">{newLeads}</p>
                <p className="text-xs text-slate-500">New</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-amber-600">
                  {qualifiedLeads}
                </p>
                <p className="text-xs text-slate-500">Qualified</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-green-600">
                  {deliveredLeads}
                </p>
                <p className="text-xs text-slate-500">Delivered</p>
              </div>
            </div>
          </div>
        ))}

        {orgStats.length === 0 && (
          <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
            <p className="text-slate-500">No clients yet</p>
            <p className="text-sm text-slate-400 mt-1">
              Add a client organisation in Supabase to get started
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
