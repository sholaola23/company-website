/**
 * KPI cards row — 4 key metrics at the top of the dashboard.
 * Server component — no interactivity needed.
 */
export default function KPIBar({
  totalLeads,
  qualifiedLeads,
  deliveredThisMonth,
  responseRate,
  brandColor,
}: {
  totalLeads: number;
  qualifiedLeads: number;
  deliveredThisMonth: number;
  responseRate: number;
  brandColor: string;
}) {
  const cards = [
    {
      label: "Total Leads",
      value: totalLeads,
      subtitle: "All time",
      color: brandColor,
      bgColor: `${brandColor}12`,
    },
    {
      label: "Qualified",
      value: qualifiedLeads,
      subtitle: "Ready to deliver",
      color: "#10B981",
      bgColor: "#ECFDF5",
    },
    {
      label: "Delivered This Month",
      value: deliveredThisMonth,
      subtitle: new Date().toLocaleDateString("en-GB", {
        month: "long",
        year: "numeric",
      }),
      color: "#059669",
      bgColor: "#D1FAE5",
    },
    {
      label: "Response Rate",
      value: `${responseRate}%`,
      subtitle: "Contacted leads that responded",
      color: "#8B5CF6",
      bgColor: "#F5F3FF",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {cards.map((card) => (
        <div
          key={card.label}
          className="bg-white rounded-xl border border-slate-200 p-5 hover:border-slate-300 transition"
        >
          <div className="flex items-center gap-3 mb-3">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: card.bgColor }}
            >
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: card.color }}
              />
            </div>
            <span className="text-sm font-medium text-slate-500">
              {card.label}
            </span>
          </div>
          <p className="text-3xl font-bold text-slate-900">{card.value}</p>
          <p className="text-xs text-slate-400 mt-1">{card.subtitle}</p>
        </div>
      ))}
    </div>
  );
}
