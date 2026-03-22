import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MapPin, Tag } from "lucide-react";
import SectionHeading from "@/components/shared/SectionHeading";
import CTAButton from "@/components/shared/CTAButton";
import AnimatedSection from "@/components/shared/AnimatedSection";
import { caseStudies } from "@/lib/case-studies-data";
import BreadcrumbJsonLd from "@/components/shared/BreadcrumbJsonLd";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Case Studies",
  description:
    "See how we've helped small businesses save time and grow with AI automation. Real results, real clients.",
};

const TIER_BADGE: Record<string, string> = {
  Starter: "bg-zinc-700 text-zinc-200",
  Growth: "bg-blue-500/20 text-blue-400 border border-blue-500/30",
  Scale: "bg-amber-500/20 text-amber-400 border border-amber-500/30",
  Premium: "bg-purple-500/20 text-purple-400 border border-purple-500/30",
};

export default function CaseStudiesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
      <BreadcrumbJsonLd items={[{ name: "Case Studies", href: "/case-studies" }]} />
      {/* Page heading */}
      <AnimatedSection>
        <div className="mb-16 sm:mb-20">
          <SectionHeading
            as="h1"
            eyebrow="Client Results"
            heading="Real Results for Real Businesses"
            description="See how we've helped businesses save time and grow with AI automation."
            align="center"
          />
        </div>
      </AnimatedSection>

      {/* Case study cards */}
      <div className="flex flex-col gap-8 max-w-4xl mx-auto">
        {caseStudies.map((study, index) => (
          <AnimatedSection key={study.slug} delay={0.15 * (index + 1)}>
          <article
            className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden hover:border-zinc-700 transition-colors duration-200"
          >
            {/* Hero stat bar */}
            <div className="bg-gradient-to-r from-blue-500/10 to-zinc-900 border-b border-zinc-800 px-7 py-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <p className="text-5xl font-bold text-zinc-50 leading-none">
                  {study.heroStat}
                </p>
                <p className="text-sm text-zinc-400 mt-1.5">{study.heroLabel}</p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className={cn(
                    "text-xs font-semibold px-2.5 py-1 rounded-full capitalize",
                    TIER_BADGE[study.tier] ?? "bg-zinc-700 text-zinc-200"
                  )}
                >
                  {study.tier}
                </span>
              </div>
            </div>

            {/* Card body */}
            <div className="px-7 py-6 flex flex-col gap-5">
              <div>
                <h2 className="text-xl font-semibold text-zinc-50 mb-2">
                  {study.name}
                </h2>
                <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-500">
                  <span className="flex items-center gap-1.5">
                    <Tag size={12} aria-hidden="true" />
                    {study.industry}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin size={12} aria-hidden="true" />
                    {study.location}
                  </span>
                </div>
              </div>

              <p className="text-sm text-zinc-400 leading-relaxed line-clamp-3">
                {study.problem}
              </p>

              <div className="flex items-center justify-between">
                <div className="flex flex-wrap gap-5">
                  {study.results.slice(0, 3).map((r) => (
                    <div key={r.label}>
                      <p className="text-base font-bold text-zinc-50">
                        {r.value}
                      </p>
                      <p className="text-xs text-zinc-500">{r.label}</p>
                    </div>
                  ))}
                </div>

                <Link
                  href={`/case-studies/${study.slug}`}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded group shrink-0 ml-4"
                  aria-label={`Read full case study for ${study.name}`}
                >
                  Read full case study
                  <ArrowRight
                    size={14}
                    className="group-hover:translate-x-0.5 transition-transform"
                    aria-hidden="true"
                  />
                </Link>
              </div>
            </div>
          </article>
          </AnimatedSection>
        ))}
      </div>

      {/* Bottom CTA */}
      <AnimatedSection delay={0.2}>
        <div className="mt-20 text-center">
          <p className="text-zinc-400 text-base mb-6">
            Want results like these for your business?
          </p>
          <CTAButton href="/audit" variant="primary" size="lg">
            Get Your Free Audit
          </CTAButton>
        </div>
      </AnimatedSection>
    </div>
  );
}
