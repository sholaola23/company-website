"use client";

import { useState, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import type { Lead, Campaign, LeadStage } from "@/lib/supabase/types";
import { STAGES, STAGE_CONFIG } from "@/lib/supabase/types";

/**
 * Lead table with sorting, filtering by stage/campaign, and search.
 * Client component for interactivity.
 */
export default function LeadTable({
  leads,
  campaigns,
  currentFilters,
  slug,
  brandColor,
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

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    updateFilter("q", search);
  }

  const SortIndicator = ({ field }: { field: keyof Lead }) => {
    if (sortField !== field) return null;
    return <span className="ml-1">{sortDir === "asc" ? "\u25B2" : "\u25BC"}</span>;
  };

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
              className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <svg
              className="absolute left-3 top-3 w-4 h-4 text-slate-400"
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
          className="px-4 py-2.5 border border-slate-300 rounded-lg text-sm text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            className="px-4 py-2.5 border border-slate-300 rounded-lg text-sm text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
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
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 text-left">
                <th
                  className="px-6 py-3 font-medium text-slate-500 cursor-pointer hover:text-slate-700"
                  onClick={() => handleSort("company_name")}
                >
                  Company <SortIndicator field="company_name" />
                </th>
                <th
                  className="px-6 py-3 font-medium text-slate-500 cursor-pointer hover:text-slate-700"
                  onClick={() => handleSort("contact_name")}
                >
                  Contact <SortIndicator field="contact_name" />
                </th>
                <th
                  className="px-6 py-3 font-medium text-slate-500 cursor-pointer hover:text-slate-700"
                  onClick={() => handleSort("stage")}
                >
                  Stage <SortIndicator field="stage" />
                </th>
                <th
                  className="px-6 py-3 font-medium text-slate-500 cursor-pointer hover:text-slate-700"
                  onClick={() => handleSort("score")}
                >
                  Score <SortIndicator field="score" />
                </th>
                <th className="px-6 py-3 font-medium text-slate-500">
                  Source
                </th>
                <th
                  className="px-6 py-3 font-medium text-slate-500 cursor-pointer hover:text-slate-700"
                  onClick={() => handleSort("created_at")}
                >
                  Date <SortIndicator field="created_at" />
                </th>
                <th className="px-6 py-3 font-medium text-slate-500">
                  Location
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {sortedLeads.map((lead) => (
                <tr key={lead.id} className="hover:bg-slate-50 transition">
                  <td className="px-6 py-4">
                    <p className="font-medium text-slate-900">
                      {lead.company_name}
                    </p>
                    {lead.contact_email && (
                      <p className="text-xs text-slate-400 mt-0.5">
                        {lead.contact_email}
                      </p>
                    )}
                  </td>
                  <td className="px-6 py-4 text-slate-600">
                    <p>{lead.contact_name}</p>
                    {lead.contact_phone && (
                      <p className="text-xs text-slate-400 mt-0.5">
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
                      <div className="w-12 h-1.5 bg-slate-100 rounded-full overflow-hidden">
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
                      <span className="text-slate-600 text-xs">
                        {lead.score}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-500 capitalize text-xs">
                    {lead.source}
                  </td>
                  <td className="px-6 py-4 text-slate-400 text-xs">
                    {new Date(lead.created_at).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                    })}
                  </td>
                  <td className="px-6 py-4 text-slate-500 text-xs">
                    {lead.location || "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {sortedLeads.length === 0 && (
            <div className="text-center py-12">
              <p className="text-slate-500">No leads found</p>
              <p className="text-sm text-slate-400 mt-1">
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
