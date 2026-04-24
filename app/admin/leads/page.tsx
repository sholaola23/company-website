import { createClient } from "@/lib/supabase/server";
import type { Lead, Organisation } from "@/lib/supabase/types";
import { STAGE_CONFIG } from "@/lib/supabase/types";

/**
 * Admin page: all leads across all clients, grouped by organisation.
 */
export default async function AdminLeadsPage() {
  const supabase = await createClient();

  // Get all orgs
  const { data: orgs } = await supabase
    .from("organisations")
    .select("*")
    .order("name")
    .returns<Organisation[]>();

  // Get all leads
  const { data: leads } = await supabase
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false })
    .returns<Lead[]>();

  const allOrgs = orgs || [];
  const allLeads = leads || [];

  // Group leads by org
  const leadsByOrg = allOrgs.map((org) => ({
    org,
    leads: allLeads.filter((l) => l.organisation_id === org.id),
  }));

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">All Leads</h1>
        <p className="text-slate-500 mt-1">
          {allLeads.length} leads across {allOrgs.length} clients
        </p>
      </div>

      {leadsByOrg.map(({ org, leads: orgLeads }) => (
        <div
          key={org.id}
          className="bg-white rounded-xl border border-slate-200 overflow-hidden"
        >
          {/* Org header */}
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: org.brand_color }}
              />
              <h2 className="font-semibold text-slate-900">{org.name}</h2>
              <span className="text-sm text-slate-400">
                {org.contact_name}
              </span>
            </div>
            <span className="text-sm font-medium text-slate-500">
              {orgLeads.length} leads
            </span>
          </div>

          {/* Lead rows */}
          {orgLeads.length === 0 ? (
            <div className="px-6 py-8 text-center text-slate-400 text-sm">
              No leads yet
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-50 text-left">
                    <th className="px-6 py-3 font-medium text-slate-500">
                      Company
                    </th>
                    <th className="px-6 py-3 font-medium text-slate-500">
                      Contact
                    </th>
                    <th className="px-6 py-3 font-medium text-slate-500">
                      Stage
                    </th>
                    <th className="px-6 py-3 font-medium text-slate-500">
                      Score
                    </th>
                    <th className="px-6 py-3 font-medium text-slate-500">
                      Source
                    </th>
                    <th className="px-6 py-3 font-medium text-slate-500">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {orgLeads.slice(0, 10).map((lead) => (
                    <tr key={lead.id} className="hover:bg-slate-50">
                      <td className="px-6 py-3 font-medium text-slate-900">
                        {lead.company_name}
                      </td>
                      <td className="px-6 py-3 text-slate-600">
                        {lead.contact_name}
                      </td>
                      <td className="px-6 py-3">
                        <span
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                          style={{
                            color: STAGE_CONFIG[lead.stage].color,
                            backgroundColor: STAGE_CONFIG[lead.stage].bgColor,
                          }}
                        >
                          {STAGE_CONFIG[lead.stage].label}
                        </span>
                      </td>
                      <td className="px-6 py-3 text-slate-600">
                        {lead.score}/100
                      </td>
                      <td className="px-6 py-3 text-slate-500 capitalize">
                        {lead.source}
                      </td>
                      <td className="px-6 py-3 text-slate-400">
                        {new Date(lead.created_at).toLocaleDateString("en-GB")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {orgLeads.length > 10 && (
                <div className="px-6 py-3 text-center text-sm text-slate-400 border-t border-slate-100">
                  +{orgLeads.length - 10} more leads
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
