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
} from "lucide-react";
import CTAButton from "@/components/shared/CTAButton";
import { services } from "@/lib/services-data";
import BreadcrumbJsonLd from "@/components/shared/BreadcrumbJsonLd";
import { cn } from "@/lib/utils";

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
  const pageDescription = service.metaDescription || `${service.pain}. Delivered in ${service.deliveryDays} for ${service.setupPrice}. Ideal for ${service.idealFor}.`;
  const pageUrl = `https://oladipupoconsulting.co.uk/services/${slug}`;
  return {
    title: service.name,
    description: pageDescription,
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: `${service.name} | Oladipupo Consulting`,
      description: pageDescription,
      url: pageUrl,
      type: "website",
    },
    twitter: {
      title: `${service.name} | Oladipupo Consulting`,
      description: pageDescription,
    },
  };
}

// ── Tier badge styles ─────────────────────────────────────────────────────────
const TIER_BADGE: Record<string, string> = {
  starter: "bg-zinc-700 text-zinc-200",
  growth: "bg-blue-500/20 text-blue-400 border border-blue-500/30",
  scale: "bg-amber-500/20 text-amber-400 border border-amber-500/30",
  premium: "bg-purple-500/20 text-purple-400 border border-purple-500/30",
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

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
      <BreadcrumbJsonLd items={[{ name: "Services", href: "/services" }, { name: service.name, href: `/services/${slug}` }]} />
      {/* Back link */}
      <Link
        href="/services"
        className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-zinc-50 transition-colors duration-150 mb-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded group"
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
        <h1 className="text-3xl sm:text-4xl font-bold text-zinc-50 leading-tight mb-2">
          {service.heroHeadline ?? service.name}
        </h1>
        {service.heroHeadline && (
          <p className="text-sm text-zinc-500 mb-6">{service.name}</p>
        )}
        {!service.heroHeadline && <div className="mb-4" />}

        {/* Key metrics row */}
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5">
            <Zap size={15} className="text-blue-400" aria-hidden="true" />
            <span className="text-sm font-semibold text-zinc-50">
              {service.setupPrice}
            </span>
            <span className="text-xs text-zinc-500">setup</span>
          </div>
          <div className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5">
            <Zap size={15} className="text-amber-400" aria-hidden="true" />
            <span className="text-sm font-semibold text-zinc-50">
              {service.monthlyPrice}
            </span>
          </div>
          <div className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5">
            <Clock size={15} className="text-zinc-400" aria-hidden="true" />
            <span className="text-sm text-zinc-300">{service.deliveryDays}</span>
          </div>
        </div>
      </header>

      {/* Ideal for */}
      <section className="mb-10" aria-labelledby="ideal-for-heading">
        <div className="flex items-center gap-2 mb-3">
          <Users size={16} className="text-blue-400" aria-hidden="true" />
          <h2
            id="ideal-for-heading"
            className="text-xs font-semibold uppercase tracking-widest text-zinc-500"
          >
            Ideal For
          </h2>
        </div>
        <p className="text-base text-zinc-200 leading-relaxed">
          {service.idealFor}
        </p>
      </section>

      {/* Divider */}
      <hr className="border-zinc-800 mb-10" />

      {/* The Problem */}
      <section className="mb-10" aria-labelledby="problem-heading">
        <h2
          id="problem-heading"
          className="text-xl font-semibold text-zinc-50 mb-4"
        >
          The Problem
        </h2>
        <p className="text-base text-zinc-400 leading-relaxed">{service.pain}</p>
      </section>

      {/* What We Deliver */}
      <section className="mb-12" aria-labelledby="deliverables-heading">
        <h2
          id="deliverables-heading"
          className="text-xl font-semibold text-zinc-50 mb-6"
        >
          What We Deliver
        </h2>
        <ul className="flex flex-col gap-3" role="list">
          {service.deliverables.map((item) => (
            <li key={item} className="flex items-start gap-3">
              <CheckCircle
                size={16}
                className="text-blue-400 shrink-0 mt-0.5"
                aria-hidden="true"
              />
              <span className="text-sm text-zinc-300 leading-relaxed">
                {item}
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* Proof / Real Results section */}
      {service.proof && (
        <section className="mb-12" aria-labelledby="proof-heading">
          <h2
            id="proof-heading"
            className="text-xl font-semibold text-zinc-50 mb-6"
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
                  className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 text-center"
                >
                  <p className="text-lg font-bold text-blue-400">
                    {stat.value}
                  </p>
                  <p className="text-xs text-zinc-500 mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          )}

          <p className="text-sm text-zinc-400 leading-relaxed">
            {service.proof.description}
          </p>

          {service.proof.clientName && (
            <p className="text-xs text-zinc-600 mt-3">
              — {service.proof.clientName}
            </p>
          )}
        </section>
      )}

      {/* Reference client callout (links to case study) */}
      {service.referenceClient && (
        <div className="mb-12 bg-zinc-900 border border-zinc-800 rounded-xl p-5 flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-1">
              Real Client
            </p>
            <p className="text-sm text-zinc-300">
              See how{" "}
              <span className="text-zinc-50 font-medium">
                {service.referenceClient}
              </span>{" "}
              uses this solution.
            </p>
          </div>
          <Link
            href="/case-studies"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded group shrink-0"
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

      {/* 90-Day Results Guarantee */}
      <div className="mb-12 rounded-xl border-2 border-emerald-500/40 bg-zinc-900/60 p-6 sm:p-8 text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/10 border border-emerald-500/30">
          <ShieldCheck
            size={24}
            className="text-emerald-400"
            aria-hidden="true"
          />
        </div>
        <h2 className="text-xl font-bold text-zinc-50 sm:text-2xl">
          90-Day Results Guarantee
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-zinc-400 max-w-md mx-auto">
          If you don&apos;t save at least 5 hours per week within 90 days,
          we&apos;ll refund your setup fee. No questions asked.
        </p>
      </div>

      {/* Bottom CTA */}
      <div className="bg-gradient-to-br from-blue-500/10 to-zinc-900 border border-blue-500/20 rounded-xl p-8 text-center">
        <h2 className="text-xl font-semibold text-zinc-50 mb-3">
          {service.ctaText ? `Ready? ${service.ctaText}` : `Interested in ${service.name}?`}
        </h2>
        <p className="text-sm text-zinc-400 mb-6 max-w-sm mx-auto">
          {service.ctaSubtext ?? "Tell us about your business and what you need \u2014 we\u2019ll get back to you within a few hours."}
        </p>
        <CTAButton href={service.ctaHref ?? "/contact"} variant="primary" size="lg">
          {service.ctaText ?? "Get in Touch"}
        </CTAButton>
      </div>
    </div>
  );
}
