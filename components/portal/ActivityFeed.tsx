import type { ActivityLogEntry } from "@/lib/supabase/types";

/**
 * Recent activity timeline — last 10 events.
 * Server component.
 */
export default function ActivityFeed({
  activities,
}: {
  activities: ActivityLogEntry[];
}) {
  if (activities.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <h3 className="font-semibold text-slate-900 mb-4">Recent Activity</h3>
        <p className="text-sm text-slate-400 text-center py-8">
          No activity yet. Leads will appear here as they progress.
        </p>
      </div>
    );
  }

  const typeIcons: Record<string, { emoji: string; color: string }> = {
    lead_created: { emoji: "+", color: "#3B82F6" },
    stage_change: { emoji: "\u2192", color: "#F59E0B" },
    email_sent: { emoji: "\u2709", color: "#8B5CF6" },
    email_replied: { emoji: "\u2709", color: "#10B981" },
    linkedin_connected: { emoji: "in", color: "#0A66C2" },
    linkedin_messaged: { emoji: "in", color: "#0A66C2" },
    call_scheduled: { emoji: "\u260E", color: "#059669" },
    note_added: { emoji: "\u270E", color: "#64748B" },
    lead_scored: { emoji: "\u2605", color: "#F59E0B" },
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6">
      <h3 className="font-semibold text-slate-900 mb-4">Recent Activity</h3>
      <div className="space-y-4">
        {activities.map((activity, i) => {
          const icon = typeIcons[activity.type] || {
            emoji: "\u2022",
            color: "#94A3B8",
          };
          return (
            <div key={activity.id} className="flex gap-3">
              {/* Timeline line + dot */}
              <div className="flex flex-col items-center">
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
                  style={{ backgroundColor: icon.color }}
                >
                  {icon.emoji}
                </div>
                {i < activities.length - 1 && (
                  <div className="w-px h-full bg-slate-200 mt-1" />
                )}
              </div>

              {/* Content */}
              <div className="pb-4 min-w-0">
                <p className="text-sm text-slate-700">{activity.description}</p>
                <p className="text-xs text-slate-400 mt-0.5">
                  {formatRelativeTime(activity.created_at)}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function formatRelativeTime(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
  });
}
