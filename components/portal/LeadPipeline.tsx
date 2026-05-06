"use client";

import { useState, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import type { Lead, LeadStage } from "@/lib/supabase/types";
import { STAGES, STAGE_CONFIG } from "@/lib/supabase/types";

/**
 * Kanban-style pipeline view with drag-and-drop stage changes.
 * Stages: New -> Contacted -> Responded -> Qualified -> Delivered
 */
export default function LeadPipeline({
  leads: initialLeads,
  brandColor,
  orgId,
}: {
  leads: Lead[];
  brandColor: string;
  orgId: string;
}) {
  const [leads, setLeads] = useState(initialLeads);
  const [draggedLeadId, setDraggedLeadId] = useState<string | null>(null);
  const [dropTarget, setDropTarget] = useState<LeadStage | null>(null);
  const [updating, setUpdating] = useState<string | null>(null);

  // Group leads by stage
  const leadsByStage = STAGES.reduce(
    (acc, stage) => {
      acc[stage] = leads.filter((l) => l.stage === stage);
      return acc;
    },
    {} as Record<LeadStage, Lead[]>
  );

  const handleDragStart = useCallback(
    (e: React.DragEvent, leadId: string) => {
      e.dataTransfer.setData("text/plain", leadId);
      setDraggedLeadId(leadId);
    },
    []
  );

  const handleDragOver = useCallback(
    (e: React.DragEvent, stage: LeadStage) => {
      e.preventDefault();
      setDropTarget(stage);
    },
    []
  );

  const handleDragLeave = useCallback(() => {
    setDropTarget(null);
  }, []);

  const handleDrop = useCallback(
    async (e: React.DragEvent, newStage: LeadStage) => {
      e.preventDefault();
      const leadId = e.dataTransfer.getData("text/plain");
      setDraggedLeadId(null);
      setDropTarget(null);

      const lead = leads.find((l) => l.id === leadId);
      if (!lead || lead.stage === newStage) return;

      // Optimistic update
      setLeads((prev) =>
        prev.map((l) => (l.id === leadId ? { ...l, stage: newStage } : l))
      );
      setUpdating(leadId);

      try {
        const supabase = createClient();
        const { error } = await supabase
          .from("leads")
          .update({ stage: newStage })
          .eq("id", leadId)
          .eq("organisation_id", orgId);

        if (error) {
          // Revert on error
          setLeads((prev) =>
            prev.map((l) =>
              l.id === leadId ? { ...l, stage: lead.stage } : l
            )
          );
          console.error("Failed to update stage:", error);
        }
      } catch {
        // Revert
        setLeads((prev) =>
          prev.map((l) =>
            l.id === leadId ? { ...l, stage: lead.stage } : l
          )
        );
      } finally {
        setUpdating(null);
      }
    },
    [leads, orgId]
  );

  return (
    <div className="bg-[var(--color-bg)] rounded-xl border border-[var(--color-border)] p-6">
      <h3 className="font-semibold text-[var(--color-heading)] mb-4">Lead Pipeline</h3>

      {/* Desktop: horizontal columns */}
      <div className="hidden md:grid md:grid-cols-5 gap-3">
        {STAGES.map((stage) => (
          <div
            key={stage}
            className={`rounded-xl p-3 min-h-[200px] transition-colors ${
              dropTarget === stage
                ? "bg-[var(--color-primary-light)] ring-2 ring-blue-300"
                : "bg-[var(--color-bg-alt)]"
            }`}
            onDragOver={(e) => handleDragOver(e, stage)}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, stage)}
          >
            {/* Column header */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: STAGE_CONFIG[stage].color }}
                />
                <span className="text-xs font-semibold text-[var(--color-body)] uppercase tracking-wide">
                  {STAGE_CONFIG[stage].label}
                </span>
              </div>
              <span className="text-xs font-medium text-[var(--color-muted)]">
                {leadsByStage[stage].length}
              </span>
            </div>

            {/* Lead cards */}
            <div className="space-y-2">
              {leadsByStage[stage].map((lead) => (
                <div
                  key={lead.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, lead.id)}
                  className={`bg-[var(--color-bg)] rounded-lg p-3 border border-[var(--color-border)] cursor-grab active:cursor-grabbing hover:border-[var(--color-border-strong)] shadow-sm transition ${
                    draggedLeadId === lead.id ? "opacity-50" : ""
                  } ${updating === lead.id ? "animate-pulse" : ""}`}
                >
                  <p className="text-sm font-medium text-[var(--color-heading)] truncate">
                    {lead.company_name}
                  </p>
                  <p className="text-xs text-[var(--color-muted)] truncate mt-0.5">
                    {lead.contact_name}
                  </p>
                  {lead.score > 0 && (
                    <div className="flex items-center gap-1 mt-2">
                      <div className="flex-1 h-1.5 bg-[var(--color-surface)] rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all"
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
                      <span className="text-xs text-[var(--color-muted)]">
                        {lead.score}
                      </span>
                    </div>
                  )}
                </div>
              ))}
              {leadsByStage[stage].length === 0 && (
                <div className="text-center py-6 text-xs text-[var(--color-dark-text)]">
                  Drop leads here
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Mobile: stacked stages */}
      <div className="md:hidden space-y-4">
        {STAGES.map((stage) => (
          <div key={stage}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: STAGE_CONFIG[stage].color }}
                />
                <span className="text-sm font-semibold text-[var(--color-body)]">
                  {STAGE_CONFIG[stage].label}
                </span>
              </div>
              <span
                className="text-sm font-bold"
                style={{ color: STAGE_CONFIG[stage].color }}
              >
                {leadsByStage[stage].length}
              </span>
            </div>
            {leadsByStage[stage].length > 0 && (
              <div className="space-y-2 pl-4 border-l-2 border-[var(--color-border)]">
                {leadsByStage[stage].slice(0, 3).map((lead) => (
                  <div
                    key={lead.id}
                    className="bg-[var(--color-bg)] rounded-lg p-3 border border-[var(--color-border)] shadow-sm"
                  >
                    <p className="text-sm font-medium text-[var(--color-heading)]">
                      {lead.company_name}
                    </p>
                    <p className="text-xs text-[var(--color-muted)]">{lead.contact_name}</p>
                  </div>
                ))}
                {leadsByStage[stage].length > 3 && (
                  <p className="text-xs text-[var(--color-muted)] pl-3">
                    +{leadsByStage[stage].length - 3} more
                  </p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
