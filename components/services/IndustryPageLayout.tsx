import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  ShieldCheck,
  BookOpen,
  TrendingUp,
  AlertTriangle,
  Wrench,
} from "lucide-react";
import CTAButton from "@/components/shared/CTAButton";
import BreadcrumbJsonLd from "@/components/shared/BreadcrumbJsonLd";
import JsonLd from "@/components/shared/JsonLd";
import type { IndustryPage } from "@/lib/industry-pages-data";
import { services } from "@/lib/services-data";

export default function IndustryPageLayout({ page }: { page: IndustryPage }) {
  const relatedServices = services.filter((s) =>
    page.relatedServiceSlugs.includes(s.slug)
  );

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `AI Automation for ${page.industry}`,
    description: page.metaDescription,
    url: `https://workcrew.io/services/${page.slug}`,
    provider: {
      "@type": "Organization",
      name: "WorkCrew Ltd",
      url: "https://workcrew.io",
    },
    areaServed: {
      "@type": "Country",
      name: "United Kingdom",
    },
  };

  return (
    <div className="min-h-screen">
      <JsonLd data={jsonLd} />
      <BreadcrumbJsonLd
        items={[
          { name: "Services", href: "/services" },
          { name: `AI for ${page.industry}`, href: `/services/${page.slug}` },
        ]}
      />

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 transition-colors duration-150 mb-10 group"
          >
            <ArrowLeft
              size={15}
              className="group-hover:-translate-x-0.5 transition-transform"
              aria-hidden="true"
            />
            All Services
          </Link>

          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-blue-600 mb-4">
            AI for {page.industry}
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold tracking-[-0.04em] text-slate-900 leading-tight mb-6">
            {page.heroHeadline}
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed mb-8 max-w-2xl">
            {page.heroSubheadline}
          </p>
          <div className="flex flex-wrap gap-4">
            <CTAButton href="/blueprint" variant="primary" size="lg">
              Get Your Free AI Blueprint
            </CTAButton>
            <CTAButton
              href="https://cal.com/workcrew/free-ai-strategy-call"
              variant="secondary"
              size="lg"
            >
              Book a Strategy Call
            </CTAButton>
          </div>
        </div>
      </section>

      {/* ── The Problem ──────────────────────────────────────────────────── */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-50/50">
        <div className="mx-auto max-w-3xl">
          <div className="flex items-center gap-3 mb-6">
            <AlertTriangle
              size={20}
              className="text-amber-600 shrink-0"
              aria-hidden="true"
            />
            <h2 className="text-2xl font-bold text-slate-900">
              {page.problemHeading}
            </h2>
          </div>
          {page.problemParagraphs.map((p, i) => (
            <p
              key={i}
              className="text-base text-slate-600 leading-relaxed mb-4 last:mb-0"
            >
              {p}
            </p>
          ))}
        </div>
      </section>

      {/* ── What We Build ────────────────────────────────────────────────── */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <div className="flex items-center gap-3 mb-8">
            <Wrench
              size={20}
              className="text-blue-600 shrink-0"
              aria-hidden="true"
            />
            <h2 className="text-2xl font-bold text-slate-900">
              {page.whatWeBuildHeading}
            </h2>
          </div>
          <div className="flex flex-col gap-6">
            {page.whatWeBuildItems.map((item) => (
              <div
                key={item.title}
                className="flex items-start gap-4 bg-slate-50 border border-slate-200 rounded-xl p-5"
              >
                <CheckCircle
                  size={20}
                  className="text-blue-600 shrink-0 mt-0.5"
                  aria-hidden="true"
                />
                <div>
                  <h3 className="text-base font-semibold text-slate-900 mb-1">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ROI ──────────────────────────────────────────────────────────── */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-50/50">
        <div className="mx-auto max-w-3xl">
          <div className="flex items-center gap-3 mb-8">
            <TrendingUp
              size={20}
              className="text-emerald-600 shrink-0"
              aria-hidden="true"
            />
            <h2 className="text-2xl font-bold text-slate-900">
              {page.roiHeading}
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            {page.roiStats.map((stat) => (
              <div
                key={stat.label}
                className="bg-slate-50 border border-slate-200 rounded-lg p-4 text-center"
              >
                <p className="text-xl font-bold text-blue-600">{stat.value}</p>
                <p className="text-xs text-slate-400 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>

          <p className="text-base text-slate-600 leading-relaxed">
            {page.roiDescription}
          </p>
        </div>
      </section>

      {/* ── Proof ────────────────────────────────────────────────────────── */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            {page.proofHeading}
          </h2>
          <p className="text-base text-slate-600 leading-relaxed mb-4">
            {page.proofDescription}
          </p>
          {page.proofSource && (
            <p className="text-xs text-slate-900">— {page.proofSource}</p>
          )}
        </div>
      </section>

      {/* ── 90-Day Guarantee ─────────────────────────────────────────────── */}
      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <div className="flex items-center gap-4 rounded-xl border border-emerald-500/30 bg-emerald-500/5 px-6 py-5">
            <ShieldCheck
              size={24}
              className="text-emerald-600 shrink-0"
              aria-hidden="true"
            />
            <p className="text-sm text-slate-500">{page.guaranteeText}</p>
          </div>
        </div>
      </section>

      {/* ── Related Blog Posts ────────────────────────────────────────────── */}
      {page.blogLinks.length > 0 && (
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <BookOpen
                size={20}
                className="text-slate-600 shrink-0"
                aria-hidden="true"
              />
              <h2 className="text-xl font-semibold text-slate-900">
                Further Reading
              </h2>
            </div>
            <ul className="flex flex-col gap-3" role="list">
              {page.blogLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-600 transition-colors group"
                  >
                    <ArrowRight
                      size={14}
                      className="group-hover:translate-x-0.5 transition-transform shrink-0"
                      aria-hidden="true"
                    />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* ── Related Services ─────────────────────────────────────────────── */}
      {relatedServices.length > 0 && (
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-50/50">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-xl font-semibold text-slate-900 mb-6">
              Related Services
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {relatedServices.map((s) => (
                <Link
                  key={s.slug}
                  href={`/services/${s.slug}`}
                  className="bg-slate-50 border border-slate-200 rounded-xl p-5 hover:border-blue-600/40 transition-colors group"
                >
                  <h3 className="text-sm font-semibold text-slate-900 mb-1 group-hover:text-blue-600 transition-colors">
                    {s.name}
                  </h3>
                  <p className="text-xs text-slate-400">
                    {s.setupPrice} + {s.monthlyPrice}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Bottom CTA ───────────────────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-8 text-center">
            <h2 className="text-2xl font-bold text-slate-900 mb-3">
              Ready to Automate Your {page.industry}?
            </h2>
            <p className="text-sm text-slate-600 mb-6 max-w-md mx-auto">
              Take our free 60-second AI audit and see exactly where automation
              can save you time and money.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <CTAButton href="/blueprint" variant="primary" size="lg">
                Get Your Free AI Blueprint
              </CTAButton>
              <CTAButton
                href="https://cal.com/workcrew/free-ai-strategy-call"
                variant="secondary"
                size="lg"
              >
                Book a Strategy Call
              </CTAButton>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
