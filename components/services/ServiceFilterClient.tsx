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
  starter: "bg-slate-200 text-slate-900",
  growth: "bg-blue-600/20 text-blue-600 border border-blue-600/30",
  scale: "bg-amber-500/20 text-amber-600 border border-amber-500/30",
  premium: "bg-purple-500/20 text-purple-600 border border-purple-500/30",
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
              "px-4 py-2 text-sm font-medium rounded-lg border transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600",
              activeFilter === tab.value
                ? "bg-blue-600 border-blue-600 text-white"
                : "bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-400 hover:text-slate-900"
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
              className="bg-slate-50 rounded-xl border border-slate-200 p-6 flex flex-col gap-4 hover:border-slate-200 transition-colors duration-200"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-slate-100 text-blue-600 shrink-0">
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
                <h3 className="text-base font-semibold text-slate-900 leading-snug">
                  {service.name}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {service.idealFor}
                </p>
              </div>

              <div className="flex items-baseline gap-1.5 mt-auto">
                <span className="text-xl font-bold text-slate-900">
                  {service.setupPrice}
                </span>
                <span className="text-sm text-slate-400">setup</span>
              </div>

              <Link
                href={`/services/${service.slug}`}
                className="text-sm font-medium text-blue-600 hover:text-blue-600 transition-colors duration-150 inline-flex items-center gap-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded"
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
        <p className="text-slate-600 text-center py-16">
          No services in this tier yet.
        </p>
      )}
    </div>
  );
}
