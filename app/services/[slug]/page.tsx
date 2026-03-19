import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle,
  Clock,
  Users,
  Zap,
  ArrowRight,
} from "lucide-react";
import CTAButton from "@/components/shared/CTAButton";
import { services } from "@/lib/services-data";
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
  return {
    title: service.name,
    description: `${service.pain}. Delivered in ${service.deliveryDays} for ${service.setupPrice}. Ideal for ${service.idealFor}.`,
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
        <h1 className="text-3xl sm:text-4xl font-bold text-zinc-50 leading-tight mb-6">
          {service.name}
        </h1>

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

      {/* Reference client callout */}
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

      {/* Bottom CTA */}
      <div className="bg-gradient-to-br from-blue-500/10 to-zinc-900 border border-blue-500/20 rounded-xl p-8 text-center">
        <h2 className="text-xl font-semibold text-zinc-50 mb-3">
          Interested in {service.name}?
        </h2>
        <p className="text-sm text-zinc-400 mb-6 max-w-sm mx-auto">
          Tell us about your business and what you need — we&apos;ll get back to
          you within a few hours.
        </p>
        <CTAButton href="/contact" variant="primary" size="lg">
          Get in Touch
        </CTAButton>
      </div>
    </div>
  );
}
