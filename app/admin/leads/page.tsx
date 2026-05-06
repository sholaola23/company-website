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
        <h1 className="text-2xl font-bold text-[var(--color-heading)]">All Leads</h1>
        <p className="text-[var(--color-muted)] mt-1">
          {allLeads.length} leads across {allOrgs.length} clients
        </p>
      </div>

      {leadsByOrg.map(({ org, leads: orgLeads }) => (
        <div
          key={org.id}
          className="bg-[var(--color-bg)] rounded-xl border border-[var(--color-border)] overflow-hidden"
        >
          {/* Org header */}
          <div className="px-6 py-4 border-b border-[var(--color-border)] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: org.brand_color }}
              />
              <h2 className="font-semibold text-[var(--color-heading)]">{org.name}</h2>
              <span className="text-sm text-[var(--color-muted)]">
                {org.contact_name}
              </span>
            </div>
            <span className="text-sm font-medium text-[var(--color-muted)]">
              {orgLeads.length} leads
            </span>
          </div>

          {/* Lead rows */}
          {orgLeads.length === 0 ? (
            <div className="px-6 py-8 text-center text-[var(--color-muted)] text-sm">
              No leads yet
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[var(--color-bg-alt)] text-left">
                    <th className="px-6 py-3 font-medium text-[var(--color-muted)]">
                      Company
                    </th>
                    <th className="px-6 py-3 font-medium text-[var(--color-muted)]">
                      Contact
                    </th>
                    <th className="px-6 py-3 font-medium text-[var(--color-muted)]">
                      Stage
                    </th>
                    <th className="px-6 py-3 font-medium text-[var(--color-muted)]">
                      Score
                    </th>
                    <th className="px-6 py-3 font-medium text-[var(--color-muted)]">
                      Source
                    </th>
                    <th className="px-6 py-3 font-medium text-[var(--color-muted)]">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--color-border)]">
                  {orgLeads.slice(0, 10).map((lead) => (
                    <tr key={lead.id} className="hover:bg-[var(--color-bg-alt)]">
                      <td className="px-6 py-3 font-medium text-[var(--color-heading)]">
                        {lead.company_name}
                      </td>
                      <td className="px-6 py-3 text-[var(--color-body)]">
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
                      <td className="px-6 py-3 text-[var(--color-body)]">
                        {lead.score}/100
                      </td>
                      <td className="px-6 py-3 text-[var(--color-muted)] capitalize">
                        {lead.source}
                      </td>
                      <td className="px-6 py-3 text-[var(--color-muted)]">
                        {new Date(lead.created_at).toLocaleDateString("en-GB")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {orgLeads.length > 10 && (
                <div className="px-6 py-3 text-center text-sm text-[var(--color-muted)] border-t border-[var(--color-border)]">
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
