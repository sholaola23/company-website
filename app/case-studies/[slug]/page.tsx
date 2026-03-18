import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CheckCircle, MapPin, Tag } from "lucide-react";
import CTAButton from "@/components/shared/CTAButton";
import { caseStudies } from "@/lib/case-studies-data";
import { cn } from "@/lib/utils";

// ── Static params ─────────────────────────────────────────────────────────────
export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

// ── Metadata ──────────────────────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = caseStudies.find((c) => c.slug === slug);
  if (!study) return {};
  return {
    title: `${study.name} — Case Study`,
    description: study.problem.slice(0, 155),
  };
}

// ── Tier badge styles ─────────────────────────────────────────────────────────
const TIER_BADGE: Record<string, string> = {
  Starter: "bg-zinc-700 text-zinc-200",
  Growth: "bg-blue-500/20 text-blue-400 border border-blue-500/30",
  Scale: "bg-amber-500/20 text-amber-400 border border-amber-500/30",
  Premium: "bg-purple-500/20 text-purple-400 border border-purple-500/30",
};

// ── Page ──────────────────────────────────────────────────────────────────────
export default async function CaseStudyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = caseStudies.find((c) => c.slug === slug);
  if (!study) notFound();

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
      {/* Back link */}
      <Link
        href="/case-studies"
        className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-zinc-50 transition-colors duration-150 mb-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded group"
      >
        <ArrowLeft
          size={15}
          className="group-hover:-translate-x-0.5 transition-transform"
          aria-hidden="true"
        />
        All Case Studies
      </Link>

      {/* Hero */}
      <header className="mb-12">
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <span
            className={cn(
              "text-xs font-semibold px-2.5 py-1 rounded-full capitalize",
              TIER_BADGE[study.tier] ?? "bg-zinc-700 text-zinc-200"
            )}
          >
            {study.tier}
          </span>
          <span className="flex items-center gap-1.5 text-xs text-zinc-500">
            <Tag size={12} aria-hidden="true" />
            {study.industry}
          </span>
          <span className="flex items-center gap-1.5 text-xs text-zinc-500">
            <MapPin size={12} aria-hidden="true" />
            {study.location}
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold text-zinc-50 leading-tight mb-8">
          {study.name}
        </h1>

        {/* Hero stat */}
        <div className="bg-gradient-to-br from-blue-500/10 to-zinc-900 border border-blue-500/20 rounded-2xl p-8 text-center">
          <p
            className="text-6xl sm:text-7xl font-bold text-zinc-50 leading-none"
            aria-label={`Key result: ${study.heroStat}`}
          >
            {study.heroStat}
          </p>
          <p className="text-base text-zinc-400 mt-3">{study.heroLabel}</p>
        </div>
      </header>

      {/* The Challenge */}
      <section className="mb-10" aria-labelledby="challenge-heading">
        <h2
          id="challenge-heading"
          className="text-xl font-semibold text-zinc-50 mb-4"
        >
          The Challenge
        </h2>
        <p className="text-base text-zinc-400 leading-relaxed">{study.problem}</p>
      </section>

      <hr className="border-zinc-800 mb-10" />

      {/* Our Solution */}
      <section className="mb-10" aria-labelledby="solution-heading">
        <h2
          id="solution-heading"
          className="text-xl font-semibold text-zinc-50 mb-4"
        >
          Our Solution
        </h2>
        <p className="text-base text-zinc-400 leading-relaxed">{study.solution}</p>
      </section>

      <hr className="border-zinc-800 mb-10" />

      {/* The Results */}
      <section className="mb-10" aria-labelledby="results-heading">
        <h2
          id="results-heading"
          className="text-xl font-semibold text-zinc-50 mb-6"
        >
          The Results
        </h2>
        <div
          className="grid grid-cols-2 sm:grid-cols-3 gap-4"
          role="list"
          aria-label="Key metrics"
        >
          {study.results.map((result) => (
            <div
              key={result.label}
              role="listitem"
              className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 flex flex-col gap-1"
            >
              <p className="text-2xl font-bold text-zinc-50 leading-none">
                {result.value}
              </p>
              <p className="text-xs text-zinc-500 leading-snug">{result.label}</p>
            </div>
          ))}
        </div>
      </section>

      <hr className="border-zinc-800 mb-10" />

      {/* What We Delivered */}
      <section className="mb-12" aria-labelledby="deliverables-heading">
        <h2
          id="deliverables-heading"
          className="text-xl font-semibold text-zinc-50 mb-6"
        >
          What We Delivered
        </h2>
        <ul className="flex flex-col gap-3" role="list">
          {study.deliverables.map((item) => (
            <li key={item} className="flex items-start gap-3">
              <CheckCircle
                size={16}
                className="text-blue-400 shrink-0 mt-0.5"
                aria-hidden="true"
              />
              <span className="text-sm text-zinc-300 leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Bottom CTA */}
      <div className="bg-gradient-to-br from-blue-500/10 to-zinc-900 border border-blue-500/20 rounded-xl p-8 text-center">
        <h2 className="text-xl font-semibold text-zinc-50 mb-3">
          Want results like this?
        </h2>
        <p className="text-sm text-zinc-400 mb-6 max-w-sm mx-auto">
          Start with a free AI readiness audit. We&apos;ll show you exactly
          where automation can have the biggest impact on your business.
        </p>
        <CTAButton href="/audit" variant="primary" size="lg">
          Get Your Free Audit
        </CTAButton>
      </div>
    </div>
  );
}
