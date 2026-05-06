import type { Organisation } from "@/lib/supabase/types";

/**
 * Dynamic client branding component — renders org logo or initial + brand color.
 * Reusable wherever org identity is shown.
 */
export default function ClientBranding({
  org,
  size = "md",
}: {
  org: Organisation;
  size?: "sm" | "md" | "lg";
}) {
  const sizes = {
    sm: { container: "w-8 h-8", text: "text-xs", rounded: "rounded-lg" },
    md: { container: "w-12 h-12", text: "text-lg", rounded: "rounded-xl" },
    lg: { container: "w-16 h-16", text: "text-2xl", rounded: "rounded-2xl" },
  };

  const s = sizes[size];

  if (org.logo_url) {
    return (
      <img
        src={org.logo_url}
        alt={org.name}
        className={`${s.container} ${s.rounded} object-cover`}
      />
    );
  }

  return (
    <div
      className={`${s.container} ${s.rounded} flex items-center justify-center text-[var(--color-bg)] font-bold ${s.text}`}
      style={{ backgroundColor: org.brand_color }}
    >
      {org.name.charAt(0).toUpperCase()}
    </div>
  );
}
