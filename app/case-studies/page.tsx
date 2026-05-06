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
  alternates: {
    canonical: "https://workcrew.io/case-studies",
  },
  openGraph: {
    images: [{ url: "https://workcrew.io/api/og", width: 1200, height: 630 }],
    title: "Case Studies | WorkCrew",
    description:
      "See how we've helped small businesses save time and grow with AI automation. Real results, real clients.",
    url: "https://workcrew.io/case-studies",
    type: "website",
  },
  twitter: {
    title: "Case Studies | WorkCrew",
    description:
      "See how we've helped small businesses save time and grow with AI automation. Real results, real clients.",
  },
};

const TIER_BADGE: Record<string, string> = {
  Starter: "bg-[var(--color-border)] text-[var(--color-heading)]",
  Growth: "bg-[var(--color-primary)]/20 text-[var(--color-primary)] border border-[var(--color-primary)]/30",
  Scale: "bg-[var(--color-primary)]/20 text-[var(--color-primary)] border border-[var(--color-primary)]/30",
  Premium: "bg-[var(--color-muted)]/20 text-[var(--color-muted)] border border-[var(--color-muted)]/30",
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
            className="bg-[var(--color-bg-alt)] border border-[var(--color-border)] rounded-2xl overflow-hidden hover:border-[var(--color-border)] transition-colors duration-200"
          >
            {/* Hero stat bar */}
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 border-b border-[var(--color-border)] px-7 py-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <p className="text-5xl font-bold text-[var(--color-heading)] leading-none">
                  {study.heroStat}
                </p>
                <p className="text-sm text-[var(--color-body)] mt-1.5">{study.heroLabel}</p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className={cn(
                    "text-xs font-semibold px-2.5 py-1 rounded-full capitalize",
                    TIER_BADGE[study.tier] ?? "bg-[var(--color-border)] text-[var(--color-heading)]"
                  )}
                >
                  {study.tier}
                </span>
              </div>
            </div>

            {/* Card body */}
            <div className="px-7 py-6 flex flex-col gap-5">
              <div>
                <h2 className="text-xl font-semibold text-[var(--color-heading)] mb-2">
                  {study.name}
                </h2>
                <div className="flex flex-wrap items-center gap-4 text-xs text-[var(--color-muted)]">
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

              <p className="text-sm text-[var(--color-body)] leading-relaxed line-clamp-3">
                {study.problem}
              </p>

              <div className="flex items-center justify-between">
                <div className="flex flex-wrap gap-5">
                  {study.results.slice(0, 3).map((r) => (
                    <div key={r.label}>
                      <p className="text-base font-bold text-[var(--color-heading)]">
                        {r.value}
                      </p>
                      <p className="text-xs text-[var(--color-muted)]">{r.label}</p>
                    </div>
                  ))}
                </div>

                <Link
                  href={`/case-studies/${study.slug}`}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] rounded group shrink-0 ml-4"
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
          <p className="text-[var(--color-body)] text-base mb-6">
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
