"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ShoppingCart,
  Globe,
  CalendarCheck,
  MessageCircle,
  Mail,
  Search,
  Share2,
  Database,
  Phone,
  PhoneCall,
  GraduationCap,
  FileSearch,
  Wrench,
  LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { Service } from "@/lib/services-data";

const ICON_MAP: Record<string, LucideIcon> = {
  ShoppingCart,
  Globe,
  CalendarCheck,
  MessageCircle,
  Mail,
  Search,
  Share2,
  Database,
  Phone,
  PhoneCall,
  GraduationCap,
  FileSearch,
  Wrench,
};

const TIER_BADGE: Record<string, string> = {
  starter: "bg-[var(--color-border)] text-[var(--color-heading)]",
  growth: "bg-[var(--color-primary)]/20 text-[var(--color-primary)] border border-[var(--color-primary)]/30",
  scale: "bg-[var(--color-primary)]/20 text-[var(--color-primary)] border border-[var(--color-primary)]/30",
  premium: "bg-[var(--color-muted)]/20 text-[var(--color-muted)] border border-[var(--color-muted)]/30",
};

const TABS = [
  { label: "All", value: "all" },
  { label: "Starter", value: "starter" },
  { label: "Growth", value: "growth" },
  { label: "Premium", value: "premium" },
] as const;

type FilterValue = (typeof TABS)[number]["value"];

interface ServiceFilterClientProps {
  services: Service[];
}

export default function ServiceFilterClient({
  services,
}: ServiceFilterClientProps) {
  const [activeFilter, setActiveFilter] = useState<FilterValue>("all");

  const filtered =
    activeFilter === "all"
      ? services
      : services.filter((s) => s.tier === activeFilter);

  return (
    <div>
      {/* Filter tabs */}
      <div
        className="flex items-center gap-2 mb-10 flex-wrap"
        role="tablist"
        aria-label="Filter services by tier"
      >
        {TABS.map((tab) => (
          <button
            key={tab.value}
            role="tab"
            aria-selected={activeFilter === tab.value}
            onClick={() => setActiveFilter(tab.value)}
            className={cn(
              "px-4 py-2 text-sm font-medium rounded-lg border transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]",
              activeFilter === tab.value
                ? "bg-[var(--color-primary)] border-[var(--color-primary)] text-[var(--color-bg)]"
                : "bg-[var(--color-bg-alt)] border-[var(--color-border)] text-[var(--color-body)] hover:border-[var(--color-border-strong)] hover:text-[var(--color-heading)]"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Service cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((service) => {
          const Icon = ICON_MAP[service.icon] ?? Wrench;
          return (
            <article
              key={service.slug}
              className="bg-[var(--color-bg-alt)] rounded-xl border border-[var(--color-border)] p-6 flex flex-col gap-4 hover:border-[var(--color-border)] transition-colors duration-200"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-[var(--color-surface)] text-[var(--color-primary)] shrink-0">
                  <Icon size={20} aria-hidden="true" />
                </div>
                <span
                  className={cn(
                    "text-xs font-semibold px-2.5 py-1 rounded-full capitalize",
                    TIER_BADGE[service.tier]
                  )}
                >
                  {service.tier}
                </span>
              </div>

              <div className="flex flex-col gap-1.5">
                <h3 className="text-base font-semibold text-[var(--color-heading)] leading-snug">
                  {service.name}
                </h3>
                <p className="text-sm text-[var(--color-body)] leading-relaxed">
                  {service.idealFor}
                </p>
              </div>

              <div className="mt-auto rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)]/60 px-3 py-2">
                <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-muted)]">
                  Scoped after audit
                </p>
                <p className="mt-1 text-sm font-medium text-[var(--color-heading)]">
                  Discovery-led proposal
                </p>
              </div>

              <Link
                href={`/services/${service.slug}`}
                className="text-sm font-medium text-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors duration-150 inline-flex items-center gap-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] rounded"
                aria-label={`Learn more about ${service.name}`}
              >
                Learn more
                <span aria-hidden="true">&nbsp;&rarr;</span>
              </Link>
            </article>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <p className="text-[var(--color-body)] text-center py-16">
          No services in this tier yet.
        </p>
      )}
    </div>
  );
}
