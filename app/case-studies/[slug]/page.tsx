import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle, MapPin, Tag } from "lucide-react";
import AnimatedSection from "@/components/shared/AnimatedSection";
import CTAButton from "@/components/shared/CTAButton";
import PersonalisedCTA from "@/components/shared/PersonalisedCTA";
import { caseStudies } from "@/lib/case-studies-data";
import BreadcrumbJsonLd from "@/components/shared/BreadcrumbJsonLd";
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
  const pageTitle = `${study.name} — Case Study`;
  const pageDescription = study.problem.slice(0, 155);
  const pageUrl = `https://oladipupoconsulting.co.uk/case-studies/${slug}`;
  return {
    title: pageTitle,
    description: pageDescription,
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: `${pageTitle} | Oladipupo Consulting`,
      description: pageDescription,
      url: pageUrl,
      type: "article",
    },
    twitter: {
      title: `${pageTitle} | Oladipupo Consulting`,
      description: pageDescription,
    },
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

  const relatedStudies = caseStudies.filter((c) => c.slug !== slug);

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
      <BreadcrumbJsonLd items={[{ name: "Case Studies", href: "/case-studies" }, { name: study.name, href: `/case-studies/${slug}` }]} />
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

        <h1 className="text-3xl sm:text-4xl font-bold text-zinc-50 leading-tight mb-2">
          {study.heroHeadline ?? study.name}
        </h1>
        {study.heroHeadline && (
          <p className="text-sm text-zinc-500 mb-6">{study.name}</p>
        )}
        {!study.heroHeadline && <div className="mb-6" />}

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
        <p className="text-base text-zinc-400 leading-relaxed">{study.problemExpanded ?? study.problem}</p>
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
        <p className="text-base text-zinc-400 leading-relaxed">{study.solutionExpanded ?? study.solution}</p>

        {/* Timeline callout */}
        {study.timeline && (
          <div className="mt-4 rounded-lg border border-blue-500/20 bg-blue-500/5 px-4 py-3">
            <p className="text-sm text-blue-400 font-medium">{study.timeline}</p>
          </div>
        )}
      </section>

      {/* Tech Stack */}
      {study.techStack && study.techStack.length > 0 && (
        <>
          <hr className="border-zinc-800 mb-10" />
          <section className="mb-10" aria-labelledby="tech-heading">
            <h2
              id="tech-heading"
              className="text-xl font-semibold text-zinc-50 mb-4"
            >
              Technology Used
            </h2>
            <div className="flex flex-wrap gap-2">
              {study.techStack.map((tech) => (
                <span
                  key={tech}
                  className="text-xs bg-zinc-800 text-zinc-300 px-3 py-1.5 rounded-full border border-zinc-700"
                >
                  {tech}
                </span>
              ))}
            </div>
          </section>
        </>
      )}

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

      {/* Before & After */}
      {study.beforeAfter && study.beforeAfter.length > 0 && (
        <>
          <hr className="border-zinc-800 mb-10" />
          <AnimatedSection>
            <section className="mb-10" aria-labelledby="before-after-heading">
              <h2
                id="before-after-heading"
                className="text-xl font-semibold text-zinc-50 mb-6"
              >
                Before &amp; After
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-0 rounded-xl border border-zinc-800 overflow-hidden">
                {/* Column headers */}
                <div className="bg-zinc-800/60 px-5 py-3 text-xs font-bold uppercase tracking-widest text-zinc-400">
                  Before
                </div>
                <div className="bg-zinc-800/60 px-5 py-3 text-xs font-bold uppercase tracking-widest text-emerald-400">
                  After
                </div>
                {study.beforeAfter.map((row, i) => (
                  <div key={i} className="contents">
                    <div
                      className={cn(
                        "px-5 py-4 text-sm text-zinc-400 leading-relaxed",
                        i < study.beforeAfter!.length - 1 && "border-b border-zinc-800"
                      )}
                    >
                      {row.before}
                    </div>
                    <div
                      className={cn(
                        "px-5 py-4 text-sm text-zinc-200 leading-relaxed font-medium",
                        i < study.beforeAfter!.length - 1 && "border-b border-zinc-800"
                      )}
                    >
                      {row.after}
                    </div>
                  </div>
                ))}
              </div>

              {/* Annual saving callout */}
              {study.annualSaving && (
                <div className="mt-6 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-6 py-4 text-center">
                  <p className="text-base font-semibold text-emerald-400">
                    {study.annualSaving}
                  </p>
                </div>
              )}
            </section>
          </AnimatedSection>
        </>
      )}

      {/* Mid-page CTA — after results/before-after (high-emotion moment) */}
      <AnimatedSection>
        <div className="mb-10 rounded-xl border border-blue-500/20 bg-gradient-to-br from-blue-500/10 to-zinc-900 p-6 text-center">
          <p className="text-base font-semibold text-zinc-50 mb-2">
            Ready to see results like these in your business?
          </p>
          <p className="text-sm text-zinc-400 mb-4">
            It starts with a free 10-second AI audit — no email required.
          </p>
          <CTAButton href="/audit" variant="primary" size="md">
            Get Your Free AI Audit
          </CTAButton>
        </div>
      </AnimatedSection>

      {/* Related case studies */}
      {relatedStudies.length > 0 && (
        <>
          <hr className="border-zinc-800 mb-10" />
          <AnimatedSection>
            <section className="mb-12" aria-labelledby="related-heading">
              <h2
                id="related-heading"
                className="text-xl font-semibold text-zinc-50 mb-6"
              >
                See more results
              </h2>
              <div className="grid gap-4">
                {relatedStudies.map((related) => (
                  <Link
                    key={related.slug}
                    href={`/case-studies/${related.slug}`}
                    className="group flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 transition-all duration-200 hover:border-blue-500/40 hover:bg-zinc-900"
                  >
                    <div>
                      <span className="inline-block rounded-md border border-zinc-700 bg-zinc-800 px-2 py-0.5 text-xs font-medium text-zinc-400 mb-2">
                        {related.industry}
                      </span>
                      <h3 className="text-base font-semibold text-zinc-50">
                        {related.name}
                      </h3>
                      <p className="mt-1 text-sm text-zinc-400">
                        {related.heroStat} {related.heroLabel}
                      </p>
                    </div>
                    <ArrowRight
                      size={18}
                      className="text-zinc-600 transition-all duration-200 group-hover:text-blue-400 group-hover:translate-x-0.5 shrink-0 ml-4"
                      aria-hidden="true"
                    />
                  </Link>
                ))}
              </div>
            </section>
          </AnimatedSection>
        </>
      )}

      {/* Bottom CTA — personalised based on visitor behaviour */}
      <PersonalisedCTA />
    </div>
  );
}
