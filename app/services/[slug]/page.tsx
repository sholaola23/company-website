import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle,
  Clock,
  ShieldCheck,
  Users,
  Zap,
  ArrowRight,
  Search,
  Wrench,
  Rocket,
  TrendingUp,
  MessageSquare,
  Brain,
  Mail,
} from "lucide-react";
import CTAButton from "@/components/shared/CTAButton";
import { services } from "@/lib/services-data";
import type { HowItWorksStep } from "@/lib/services-data";
import BreadcrumbJsonLd from "@/components/shared/BreadcrumbJsonLd";
import JsonLd from "@/components/shared/JsonLd";
import { cn } from "@/lib/utils";

// ── Icon map for howItWorks steps ────────────────────────────────────────────
const STEP_ICONS: Record<string, typeof Search> = {
  Search,
  Wrench,
  Rocket,
  TrendingUp,
  MessageSquare,
  CheckCircle,
  Brain,
  ShieldCheck,
  Mail,
};

function StepIcon({ step }: { step: HowItWorksStep }) {
  const Icon = STEP_ICONS[step.icon] ?? Zap;
  return <Icon size={20} className="text-blue-600" aria-hidden="true" />;
}

// ── Static params ─────────────────────────────────────────────────────────────
export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

// ── Metadata ──────────────────────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) return {};
  const pageDescription = service.metaDescription || `${service.pain}. Tailored solutions for ${service.idealFor}. Book a free consultation.`;
  const pageUrl = `https://workcrew.io/services/${slug}`;
  return {
    title: service.name,
    description: pageDescription,
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: `${service.name} | WorkCrew`,
      description: pageDescription,
      url: pageUrl,
      type: "website",
    },
    twitter: {
      title: `${service.name} | WorkCrew`,
      description: pageDescription,
    },
  };
}

// ── Tier badge styles ─────────────────────────────────────────────────────────
const TIER_BADGE: Record<string, string> = {
  starter: "bg-slate-200 text-slate-900",
  growth: "bg-blue-600/20 text-blue-600 border border-blue-600/30",
  scale: "bg-amber-500/20 text-amber-600 border border-amber-500/30",
  premium: "bg-purple-500/20 text-purple-600 border border-purple-500/30",
};

// ── Page ──────────────────────────────────────────────────────────────────────
export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) notFound();

  // Build FAQPage schema if FAQ exists
  const faqSchema = service.faq && service.faq.length > 0
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: service.faq.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      }
    : null;

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
      <BreadcrumbJsonLd items={[{ name: "Services", href: "/services" }, { name: service.name, href: `/services/${slug}` }]} />
      {faqSchema && <JsonLd data={faqSchema} />}

      {/* Back link */}
      <Link
        href="/services"
        className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 transition-colors duration-150 mb-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded group"
      >
        <ArrowLeft
          size={15}
          className="group-hover:-translate-x-0.5 transition-transform"
          aria-hidden="true"
        />
        All Services
      </Link>

      {/* Header */}
      <header className="mb-12">
        <span
          className={cn(
            "text-xs font-semibold px-2.5 py-1 rounded-full capitalize inline-block mb-4",
            TIER_BADGE[service.tier]
          )}
        >
          {service.tier}
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[-0.03em] text-slate-900 leading-tight mb-2">
          {service.heroHeadline ?? service.name}
        </h1>
        {service.heroHeadline && (
          <p className="text-sm text-slate-400 mb-6">{service.name}</p>
        )}
        {!service.heroHeadline && <div className="mb-4" />}

        {/* Key metrics row */}
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5">
            <Zap size={15} className="text-blue-600" aria-hidden="true" />
            <span className="text-sm font-semibold text-slate-900">
              {service.setupPrice}
            </span>
            <span className="text-xs text-slate-400">setup</span>
          </div>
          <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5">
            <Zap size={15} className="text-amber-600" aria-hidden="true" />
            <span className="text-sm font-semibold text-slate-900">
              {service.monthlyPrice}
            </span>
          </div>
          <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5">
            <Clock size={15} className="text-slate-600" aria-hidden="true" />
            <span className="text-sm text-slate-500">{service.deliveryDays}</span>
          </div>
        </div>
      </header>

      {/* Ideal for */}
      <section className="mb-10" aria-labelledby="ideal-for-heading">
        <div className="flex items-center gap-2 mb-3">
          <Users size={16} className="text-blue-600" aria-hidden="true" />
          <h2
            id="ideal-for-heading"
            className="text-xs font-semibold uppercase tracking-widest text-slate-400"
          >
            Ideal For
          </h2>
        </div>
        <p className="text-base text-slate-900 leading-relaxed">
          {service.idealFor}
        </p>
      </section>

      {/* Divider */}
      <hr className="border-slate-200 mb-10" />

      {/* The Problem */}
      <section className="mb-10" aria-labelledby="problem-heading">
        <h2
          id="problem-heading"
          className="text-xl font-semibold text-slate-900 mb-4"
        >
          The Problem
        </h2>
        <p className="text-base text-slate-600 leading-relaxed">{service.pain}</p>
      </section>

      {/* How It Works (new) */}
      {service.howItWorks && service.howItWorks.length > 0 && (
        <>
          <hr className="border-slate-200 mb-10" />
          <section className="mb-12" aria-labelledby="how-it-works-heading">
            <h2
              id="how-it-works-heading"
              className="text-xl font-semibold text-slate-900 mb-8"
            >
              How It Works
            </h2>
            <div className="grid gap-6">
              {service.howItWorks.map((step) => (
                <div
                  key={step.step}
                  className="flex gap-4 bg-slate-50/50 border border-slate-200 rounded-xl p-5"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-600/10 border border-blue-600/20">
                    <StepIcon step={step} />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-slate-900 mb-1">
                      Step {step.step}: {step.title}
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </>
      )}

      {/* What's Included (expanded deliverables) */}
      {service.whatsIncluded && service.whatsIncluded.length > 0 ? (
        <section className="mb-12" aria-labelledby="included-heading">
          <h2
            id="included-heading"
            className="text-xl font-semibold text-slate-900 mb-6"
          >
            What&apos;s Included
          </h2>
          <ul className="flex flex-col gap-3" role="list">
            {service.whatsIncluded.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <CheckCircle
                  size={16}
                  className="text-blue-600 shrink-0 mt-0.5"
                  aria-hidden="true"
                />
                <span className="text-sm text-slate-500 leading-relaxed">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </section>
      ) : (
        /* Fallback to basic deliverables */
        <section className="mb-12" aria-labelledby="deliverables-heading">
          <h2
            id="deliverables-heading"
            className="text-xl font-semibold text-slate-900 mb-6"
          >
            What We Deliver
          </h2>
          <ul className="flex flex-col gap-3" role="list">
            {service.deliverables.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <CheckCircle
                  size={16}
                  className="text-blue-600 shrink-0 mt-0.5"
                  aria-hidden="true"
                />
                <span className="text-sm text-slate-500 leading-relaxed">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Before & After Comparison (new) */}
      {service.beforeAfter && service.beforeAfter.length > 0 && (
        <>
          <hr className="border-slate-200 mb-10" />
          <section className="mb-12" aria-labelledby="before-after-heading">
            <h2
              id="before-after-heading"
              className="text-xl font-semibold text-slate-900 mb-6"
            >
              Before &amp; After
            </h2>
            <div className="rounded-xl border border-slate-200 overflow-hidden">
              {/* Column headers */}
              <div className="grid grid-cols-3 bg-slate-100/60">
                <div className="px-4 py-3 text-xs font-bold uppercase tracking-widest text-slate-600">
                  Metric
                </div>
                <div className="px-4 py-3 text-xs font-bold uppercase tracking-widest text-red-400">
                  Before
                </div>
                <div className="px-4 py-3 text-xs font-bold uppercase tracking-widest text-emerald-600">
                  After
                </div>
              </div>
              {service.beforeAfter.map((row, i) => (
                <div
                  key={row.metric}
                  className={cn(
                    "grid grid-cols-3",
                    i < service.beforeAfter!.length - 1 && "border-b border-slate-200"
                  )}
                >
                  <div className="px-4 py-3.5 text-sm text-slate-500 font-medium">
                    {row.metric}
                  </div>
                  <div className="px-4 py-3.5 text-sm text-slate-400">
                    {row.before}
                  </div>
                  <div className="px-4 py-3.5 text-sm text-emerald-600 font-medium">
                    {row.after}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </>
      )}

      {/* ROI Snippet (new) */}
      {service.roiSnippet && (
        <section className="mb-12" aria-labelledby="roi-heading">
          <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-6">
            <h2
              id="roi-heading"
              className="text-lg font-semibold text-amber-600 mb-3"
            >
              The Numbers: What This Costs You Today
            </h2>
            <p className="text-sm text-slate-500 leading-relaxed">
              {service.roiSnippet}
            </p>
          </div>
        </section>
      )}

      {/* Proof / Real Results section */}
      {service.proof && (
        <section className="mb-12" aria-labelledby="proof-heading">
          <h2
            id="proof-heading"
            className="text-xl font-semibold text-slate-900 mb-6"
          >
            {service.proof.heading}
          </h2>

          {/* Stats grid */}
          {service.proof.stats && service.proof.stats.length > 0 && (
            <div className={cn(
              "grid gap-3 mb-6",
              service.proof.stats.length <= 3 ? "grid-cols-3" : "grid-cols-2 sm:grid-cols-4"
            )}>
              {service.proof.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="bg-slate-50 border border-slate-200 rounded-lg p-4 text-center"
                >
                  <p className="text-lg font-bold text-blue-600">
                    {stat.value}
                  </p>
                  <p className="text-xs text-slate-400 mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          )}

          <p className="text-sm text-slate-600 leading-relaxed">
            {service.proof.description}
          </p>

          {service.proof.clientName && (
            <p className="text-xs text-slate-900 mt-3">
              — {service.proof.clientName}
            </p>
          )}
        </section>
      )}

      {/* Reference client callout (links to case study) */}
      {service.referenceClient && (
        <div className="mb-12 bg-slate-50 border border-slate-200 rounded-xl p-5 flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-1">
              Real Client
            </p>
            <p className="text-sm text-slate-500">
              See how{" "}
              <span className="text-slate-900 font-medium">
                {service.referenceClient}
              </span>{" "}
              uses this solution.
            </p>
          </div>
          <Link
            href="/case-studies"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:text-blue-600 transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded group shrink-0"
          >
            View case study
            <ArrowRight
              size={14}
              className="group-hover:translate-x-0.5 transition-transform"
              aria-hidden="true"
            />
          </Link>
        </div>
      )}

      {/* FAQ Section (new) */}
      {service.faq && service.faq.length > 0 && (
        <>
          <hr className="border-slate-200 mb-10" />
          <section className="mb-12" aria-labelledby="faq-heading">
            <h2
              id="faq-heading"
              className="text-xl font-semibold text-slate-900 mb-6"
            >
              Frequently Asked Questions
            </h2>
            <div className="flex flex-col gap-4">
              {service.faq.map((item) => (
                <details
                  key={item.question}
                  className="group rounded-xl border border-slate-200 bg-slate-50/50 overflow-hidden"
                >
                  <summary className="flex cursor-pointer items-center justify-between px-5 py-4 text-sm font-medium text-slate-900 hover:text-slate-900 transition-colors [&::-webkit-details-marker]:hidden list-none">
                    {item.question}
                    <ArrowRight
                      size={14}
                      className="text-slate-900 transition-transform group-open:rotate-90 shrink-0 ml-3"
                      aria-hidden="true"
                    />
                  </summary>
                  <div className="px-5 pb-4">
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                </details>
              ))}
            </div>
          </section>
        </>
      )}

      {/* 90-Day Results Guarantee */}
      <div className="mb-12 rounded-xl border-2 border-emerald-500/40 bg-slate-50/60 p-6 sm:p-8 text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/10 border border-emerald-500/30">
          <ShieldCheck
            size={24}
            className="text-emerald-600"
            aria-hidden="true"
          />
        </div>
        <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">
          90-Day Results Guarantee
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-slate-600 max-w-md mx-auto">
          If you don&apos;t save at least 5 hours per week within 90 days,
          we&apos;ll refund your setup fee. No questions asked.
        </p>
      </div>

      {/* Bottom CTA */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-8 text-center">
        <h2 className="text-xl font-semibold text-slate-900 mb-3">
          {service.ctaText ? `Ready? ${service.ctaText}` : `Interested in ${service.name}?`}
        </h2>
        <p className="text-sm text-slate-600 mb-6 max-w-sm mx-auto">
          {service.ctaSubtext ?? "Tell us about your business and what you need \u2014 we\u2019ll get back to you within a few hours."}
        </p>
        <CTAButton href={service.ctaHref ?? "/contact"} variant="primary" size="lg">
          {service.ctaText ?? "Get in Touch"}
        </CTAButton>
      </div>
    </div>
  );
}
