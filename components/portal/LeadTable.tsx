"use client";

import { useState, useMemo, type FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import type { Lead, Campaign, LeadStage } from "@/lib/supabase/types";
import { STAGES, STAGE_CONFIG } from "@/lib/supabase/types";

function SortIndicator({
  field,
  sortField,
  sortDir,
}: {
  field: keyof Lead;
  sortField: keyof Lead;
  sortDir: "asc" | "desc";
}) {
  if (sortField !== field) return null;
  return <span className="ml-1">{sortDir === "asc" ? "\u25B2" : "\u25BC"}</span>;
}

/**
 * Lead table with sorting, filtering by stage/campaign, and search.
 * Client component for interactivity.
 */
export default function LeadTable({
  leads,
  campaigns,
  currentFilters,
  slug,
}: {
  leads: Lead[];
  campaigns: Campaign[];
  currentFilters: { stage?: string; campaign?: string; q?: string };
  slug: string;
  brandColor: string;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [sortField, setSortField] = useState<keyof Lead>("created_at");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const [search, setSearch] = useState(currentFilters.q || "");

  // Apply sorting
  const sortedLeads = useMemo(() => {
    return [...leads].sort((a, b) => {
      const aVal = a[sortField];
      const bVal = b[sortField];
      if (aVal === null || aVal === undefined) return 1;
      if (bVal === null || bVal === undefined) return -1;
      const cmp = String(aVal).localeCompare(String(bVal));
      return sortDir === "asc" ? cmp : -cmp;
    });
  }, [leads, sortField, sortDir]);

  function handleSort(field: keyof Lead) {
    if (sortField === field) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDir("asc");
    }
  }

  function updateFilter(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`/portal/${slug}/leads?${params.toString()}`);
  }

  function handleSearch(e: FormEvent) {
    e.preventDefault();
    updateFilter("q", search);
  }

  return (
    <div className="space-y-4">
      {/* Filters bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Search */}
        <form onSubmit={handleSearch} className="flex-1">
          <div className="relative">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search leads..."
              className="w-full pl-10 pr-4 py-2.5 border border-[var(--color-border-strong)] rounded-lg text-sm text-[var(--color-heading)] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent"
            />
            <svg
              className="absolute left-3 top-3 w-4 h-4 text-[var(--color-muted)]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </form>

        {/* Stage filter */}
        <select
          value={currentFilters.stage || ""}
          onChange={(e) => updateFilter("stage", e.target.value)}
          className="px-4 py-2.5 border border-[var(--color-border-strong)] rounded-lg text-sm text-[var(--color-body)] bg-[var(--color-bg)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
        >
          <option value="">All Stages</option>
          {STAGES.map((s) => (
            <option key={s} value={s}>
              {STAGE_CONFIG[s].label}
            </option>
          ))}
        </select>

        {/* Campaign filter */}
        {campaigns.length > 0 && (
          <select
            value={currentFilters.campaign || ""}
            onChange={(e) => updateFilter("campaign", e.target.value)}
            className="px-4 py-2.5 border border-[var(--color-border-strong)] rounded-lg text-sm text-[var(--color-body)] bg-[var(--color-bg)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
          >
            <option value="">All Campaigns</option>
            {campaigns.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        )}
      </div>

      {/* Table */}
      <div className="bg-[var(--color-bg)] rounded-xl border border-[var(--color-border)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[var(--color-bg-alt)] text-left">
                <th
                  className="px-6 py-3 font-medium text-[var(--color-muted)] cursor-pointer hover:text-[var(--color-body)]"
                  onClick={() => handleSort("company_name")}
                >
                  Company <SortIndicator field="company_name" sortField={sortField} sortDir={sortDir} />
                </th>
                <th
                  className="px-6 py-3 font-medium text-[var(--color-muted)] cursor-pointer hover:text-[var(--color-body)]"
                  onClick={() => handleSort("contact_name")}
                >
                  Contact <SortIndicator field="contact_name" sortField={sortField} sortDir={sortDir} />
                </th>
                <th
                  className="px-6 py-3 font-medium text-[var(--color-muted)] cursor-pointer hover:text-[var(--color-body)]"
                  onClick={() => handleSort("stage")}
                >
                  Stage <SortIndicator field="stage" sortField={sortField} sortDir={sortDir} />
                </th>
                <th
                  className="px-6 py-3 font-medium text-[var(--color-muted)] cursor-pointer hover:text-[var(--color-body)]"
                  onClick={() => handleSort("score")}
                >
                  Score <SortIndicator field="score" sortField={sortField} sortDir={sortDir} />
                </th>
                <th className="px-6 py-3 font-medium text-[var(--color-muted)]">
                  Source
                </th>
                <th
                  className="px-6 py-3 font-medium text-[var(--color-muted)] cursor-pointer hover:text-[var(--color-body)]"
                  onClick={() => handleSort("created_at")}
                >
                  Date <SortIndicator field="created_at" sortField={sortField} sortDir={sortDir} />
                </th>
                <th className="px-6 py-3 font-medium text-[var(--color-muted)]">
                  Location
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border)]">
              {sortedLeads.map((lead) => (
                <tr key={lead.id} className="hover:bg-[var(--color-bg-alt)] transition">
                  <td className="px-6 py-4">
                    <p className="font-medium text-[var(--color-heading)]">
                      {lead.company_name}
                    </p>
                    {lead.contact_email && (
                      <p className="text-xs text-[var(--color-muted)] mt-0.5">
                        {lead.contact_email}
                      </p>
                    )}
                  </td>
                  <td className="px-6 py-4 text-[var(--color-body)]">
                    <p>{lead.contact_name}</p>
                    {lead.contact_phone && (
                      <p className="text-xs text-[var(--color-muted)] mt-0.5">
                        {lead.contact_phone}
                      </p>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                      style={{
                        color: STAGE_CONFIG[lead.stage as LeadStage].color,
                        backgroundColor:
                          STAGE_CONFIG[lead.stage as LeadStage].bgColor,
                      }}
                    >
                      {STAGE_CONFIG[lead.stage as LeadStage].label}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-12 h-1.5 bg-[var(--color-surface)] rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${lead.score}%`,
                            backgroundColor:
                              lead.score >= 70
                                ? "#10B981"
                                : lead.score >= 40
                                  ? "#F59E0B"
                                  : "#EF4444",
                          }}
                        />
                      </div>
                      <span className="text-[var(--color-body)] text-xs">
                        {lead.score}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-[var(--color-muted)] capitalize text-xs">
                    {lead.source}
                  </td>
                  <td className="px-6 py-4 text-[var(--color-muted)] text-xs">
                    {new Date(lead.created_at).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                    })}
                  </td>
                  <td className="px-6 py-4 text-[var(--color-muted)] text-xs">
                    {lead.location || "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {sortedLeads.length === 0 && (
            <div className="text-center py-12">
              <p className="text-[var(--color-muted)]">No leads found</p>
              <p className="text-sm text-[var(--color-muted)] mt-1">
                {currentFilters.q || currentFilters.stage || currentFilters.campaign
                  ? "Try adjusting your filters"
                  : "Leads will appear here as they come in"}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
