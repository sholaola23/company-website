import Link from "next/link";
import {
  ArrowRight,
  FileSearch,
  Globe,
  GraduationCap,
  ShieldCheck,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import { caseStudies } from "@/lib/case-studies-data";
import AnimatedSection from "@/components/shared/AnimatedSection";
import AnimatedCounter from "@/components/shared/AnimatedCounter";
import GradientBlob from "@/components/shared/GradientBlob";
import HeroImage from "@/components/shared/HeroImage";
import PersonalisedCTA from "@/components/shared/PersonalisedCTA";
import RotatingHeadline from "@/components/home/RotatingHeadline";
import JsonLd from "@/components/shared/JsonLd";

// ---------------------------------------------------------------------------
// Hero
// ---------------------------------------------------------------------------
function Hero() {
  return (
    <section className="relative overflow-hidden bg-zinc-950">
      {/* Floating gradient blobs for depth */}
      <GradientBlob
        className="w-[700px] h-[700px] bg-blue-600 -top-60 -left-40"
        duration={10}
      />
      <GradientBlob
        className="w-[500px] h-[500px] bg-purple-700 top-20 -right-40"
        duration={12}
        delay={2}
      />
      <GradientBlob
        className="w-[400px] h-[400px] bg-blue-400 bottom-0 left-1/2"
        duration={9}
        delay={4}
      />

      {/* Subtle radial glow behind the heading */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
      >
        <div className="h-[600px] w-[900px] rounded-full bg-blue-500/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6 pb-28 pt-32 sm:px-8 lg:px-12">
        {/* Desktop: text left, illustration right. Mobile: stacked, centered */}
        <div className="flex flex-col items-center gap-12 lg:flex-row lg:items-center lg:gap-16">
          {/* Left: copy */}
          <div className="flex-1 text-center lg:text-left">
            <AnimatedSection delay={0}>
              {/* Eyebrow pill */}
              <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/80 px-4 py-1.5 text-xs font-medium tracking-wide text-zinc-400">
                <span
                  className="h-1.5 w-1.5 rounded-full bg-blue-500"
                  aria-hidden="true"
                />
                AI Solutions — delivered in 7 days
              </div>

              <RotatingHeadline />

              <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-zinc-400 sm:text-xl lg:mx-0">
                We build AI systems that save you 8+ hours a week — lead
                capture, email responses, bookings, follow-ups — all on
                autopilot. So you can stop doing admin and start growing.
              </p>

              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start">
                <Link
                  href="/audit"
                  className="inline-flex items-center gap-2 rounded-lg bg-blue-500 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-blue-500/20 transition-all duration-200 hover:bg-blue-600 hover:shadow-blue-500/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 group"
                >
                  Get Your Free AI Audit
                  <ArrowRight
                    size={18}
                    className="transition-transform duration-200 group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </Link>
                <Link
                  href="/services"
                  className="inline-flex items-center gap-2 rounded-lg border border-zinc-700 bg-transparent px-6 py-3 text-base font-semibold text-zinc-300 transition-all duration-200 hover:border-zinc-500 hover:bg-zinc-800/60 hover:text-zinc-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
                >
                  View Services
                </Link>
              </div>
            </AnimatedSection>
          </div>

          {/* Right: animated AI flow illustration (desktop only) */}
          <AnimatedSection delay={0.3} className="shrink-0">
            <HeroImage />
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Social proof bar
// ---------------------------------------------------------------------------
const stats = [
  { numeric: 8, suffix: "+", label: "Hours / ~\u00A3400 Saved", sublabel: "per client weekly" },
  { numeric: 180, suffix: "", label: "Orders Automated Weekly", sublabel: "at E\u2019Manuel Bakery" },
  { numeric: 9, suffix: "", label: "Workflows Deployed", sublabel: "for one bakery" },
  { numeric: 7, suffix: "", label: "Day Delivery", sublabel: "audit to live" },
];

function SocialProofBar() {
  return (
    <div className="border-b border-t border-zinc-800 bg-zinc-900">
      <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
        <dl className="grid grid-cols-2 divide-x divide-zinc-800 md:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center justify-center py-6 px-4 text-center"
            >
              <dt className="text-2xl font-bold text-zinc-50 sm:text-3xl">
                <AnimatedCounter target={stat.numeric} suffix={stat.suffix} />
              </dt>
              <dd className="mt-1 text-sm text-zinc-400 font-medium">{stat.label}</dd>
              {"sublabel" in stat && stat.sublabel && (
                <dd className="mt-0.5 text-xs text-zinc-600">{stat.sublabel}</dd>
              )}
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// What We Build — results-first category cards (replaces tier pricing cards)
// ---------------------------------------------------------------------------
const categories = [
  {
    icon: Zap,
    title: "AI Automation",
    description:
      "Automate repetitive tasks. Lead capture, email responses, appointment booking, follow-ups — all running on autopilot.",
    result: "8+ hours saved per week",
  },
  {
    icon: Globe,
    title: "Website Development",
    description:
      "Professional websites that convert visitors into customers. Mobile-first, SEO-optimised, delivered in 10-14 days.",
    result: "12-page site built in 2 weeks",
  },
  {
    icon: GraduationCap,
    title: "AI Training",
    description:
      "Hands-on workshops that get your team using AI tools confidently. Tailored to your industry and skill level.",
    result: "Teams productive with AI in one session",
  },
];

function WhatWeBuild() {
  return (
    <section className="bg-zinc-950 py-24" aria-labelledby="services-heading">
      <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
        {/* Section heading */}
        <AnimatedSection>
          <div className="flex flex-col items-center gap-4 text-center">
            <span className="text-xs font-semibold uppercase tracking-widest text-blue-500">
              What We Build
            </span>
            <h2
              id="services-heading"
              className="text-3xl font-bold tracking-tight text-zinc-50 sm:text-4xl"
            >
              Real Tools. Real Results.
            </h2>
            <p className="max-w-2xl text-base leading-relaxed text-zinc-400">
              We help small businesses save time, win more customers, and look
              professional — delivered fast and built to last.
            </p>
          </div>
        </AnimatedSection>

        {/* Category cards */}
        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {categories.map((cat, index) => {
            const Icon = cat.icon;
            return (
              <AnimatedSection key={cat.title} delay={0.1 * (index + 1)}>
                <div className="flex h-full flex-col rounded-2xl border border-zinc-800 bg-zinc-900/50 p-8 transition-all duration-300 hover:scale-[1.02] hover:border-zinc-700 hover:bg-zinc-900">
                  {/* Icon */}
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10">
                    <Icon
                      size={22}
                      className="text-blue-400"
                      aria-hidden="true"
                    />
                  </div>

                  {/* Title */}
                  <h3 className="mt-5 text-lg font-bold text-zinc-50">
                    {cat.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-zinc-400">
                    {cat.description}
                  </p>

                  {/* Result badge */}
                  <div className="mt-6">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400">
                      {cat.result}
                    </span>
                  </div>

                  {/* Learn more */}
                  <Link
                    href="/services"
                    className="group mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-blue-400 transition-colors duration-200 hover:text-blue-300"
                  >
                    Learn more
                    <ArrowRight
                      size={14}
                      className="transition-transform duration-200 group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </Link>
                </div>
              </AnimatedSection>
            );
          })}
        </div>

        {/* Pricing signal + all solutions link */}
        <AnimatedSection delay={0.45}>
          <p className="mt-10 text-center text-sm text-zinc-500">
            Packages from £500.{" "}
            <Link
              href="/services"
              className="inline-flex items-center gap-1 font-medium text-blue-400 transition-colors duration-200 hover:text-blue-300 group"
            >
              View all 12 solutions
              <ArrowRight
                size={13}
                className="transition-transform duration-200 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Link>
          </p>
        </AnimatedSection>

      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Case studies preview
// ---------------------------------------------------------------------------
function CaseStudiesPreview() {
  return (
    <section
      className="bg-zinc-900/40 py-24"
      aria-labelledby="case-studies-heading"
    >
      <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
        {/* Section heading */}
        <AnimatedSection>
          <div className="flex flex-col items-center gap-4 text-center">
            <span className="text-xs font-semibold uppercase tracking-widest text-blue-500">
              Proof It Works
            </span>
            <h2
              id="case-studies-heading"
              className="text-3xl font-bold tracking-tight text-zinc-50 sm:text-4xl"
            >
              Real Results for Real Businesses
            </h2>
            <p className="max-w-xl text-base leading-relaxed text-zinc-400">
              Not case studies written for marketing — actual numbers from live
              clients.
            </p>
          </div>
        </AnimatedSection>

        {/* Cards */}
        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {caseStudies.map((study, index) => (
            <AnimatedSection key={study.slug} delay={0.15 * (index + 1)}>
              <Link
                href={`/case-studies/${study.slug}`}
                className="group flex flex-col justify-between rounded-2xl border border-zinc-700 bg-zinc-900 p-8 shadow-lg transition-all duration-200 hover:border-blue-500/40 hover:bg-zinc-900 hover:shadow-blue-500/5"
              >
                <div>
                  {/* Industry tag */}
                  <span className="inline-block rounded-md border border-zinc-700 bg-zinc-800 px-2.5 py-0.5 text-xs font-medium text-zinc-400">
                    {study.industry}
                  </span>

                  {/* Hero stat — larger, more prominent */}
                  <div className="mt-6">
                    <p className="text-6xl font-bold tracking-tight text-zinc-50">
                      {study.heroStat}
                    </p>
                    <p className="mt-1.5 text-base font-semibold text-blue-400">
                      {study.heroLabel}
                    </p>
                  </div>

                  {/* Business name + location */}
                  <h3 className="mt-5 text-xl font-semibold text-zinc-50">
                    {study.name}
                  </h3>
                  <p className="mt-1 text-sm text-zinc-500">{study.location}</p>

                  {/* One-liner summary */}
                  <p className="mt-4 text-sm leading-relaxed text-zinc-400 line-clamp-2">
                    {study.solution}
                  </p>
                </div>

                <div className="mt-8 inline-flex items-center gap-1.5 text-sm font-semibold text-blue-400 transition-colors duration-200 group-hover:text-blue-300">
                  Read case study
                  <ArrowRight
                    size={14}
                    className="transition-transform duration-200 group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </div>
              </Link>
            </AnimatedSection>
          ))}
        </div>

        {/* View all CTA */}
        <AnimatedSection delay={0.4}>
          <p className="mt-10 text-center">
            <Link
              href="/case-studies"
              className="group inline-flex items-center gap-1.5 text-sm font-medium text-zinc-400 transition-colors duration-200 hover:text-zinc-200"
            >
              View all case studies
              <ArrowRight
                size={14}
                className="transition-transform duration-200 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Link>
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// 90-Day Results Guarantee
// ---------------------------------------------------------------------------
function ResultsGuarantee() {
  return (
    <section className="bg-zinc-950 py-24" aria-labelledby="guarantee-heading">
      <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
        <AnimatedSection>
          <div className="mx-auto max-w-2xl rounded-2xl border-2 border-emerald-500/40 bg-zinc-900/60 p-8 sm:p-10 text-center">
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/10 border border-emerald-500/30">
              <ShieldCheck
                size={28}
                className="text-emerald-400"
                aria-hidden="true"
              />
            </div>
            <h2
              id="guarantee-heading"
              className="text-2xl font-bold text-zinc-50 sm:text-3xl"
            >
              90-Day Results Guarantee
            </h2>
            <p className="mt-4 text-base leading-relaxed text-zinc-400">
              If you don&apos;t save at least 5 hours per week within 90 days,
              we&apos;ll refund your setup fee. No questions asked.
            </p>
            <p className="mt-3 text-sm font-medium text-emerald-400">
              Every project we deliver is backed by this guarantee.
            </p>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// How it works — 4 steps
// ---------------------------------------------------------------------------
const steps = [
  {
    number: "01",
    title: "Free AI Audit",
    description:
      "We map your business in 48 hours and identify your highest-impact automation opportunities.",
    icon: FileSearch,
  },
  {
    number: "02",
    title: "Custom Proposal",
    description:
      "You get a clear scope, fixed price, and timeline — no vague quotes, no surprises.",
    icon: Users,
  },
  {
    number: "03",
    title: "7-Day Build",
    description:
      "We build, test, and hand over your automation with full documentation and an SOP.",
    icon: Zap,
  },
  {
    number: "04",
    title: "Monthly Optimisation",
    description:
      "Ongoing monitoring, improvements, and new features — we stay in your corner.",
    icon: TrendingUp,
  },
];

function HowItWorks() {
  return (
    <section
      className="bg-zinc-950 py-24"
      aria-labelledby="how-it-works-heading"
    >
      <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
        {/* Section heading */}
        <AnimatedSection>
          <div className="flex flex-col items-center gap-4 text-center">
            <span className="text-xs font-semibold uppercase tracking-widest text-blue-500">
              How It Works
            </span>
            <h2
              id="how-it-works-heading"
              className="text-3xl font-bold tracking-tight text-zinc-50 sm:text-4xl"
            >
              From conversation to live automation
            </h2>
            <p className="max-w-xl text-base leading-relaxed text-zinc-400">
              A structured 4-step process that gets you live in under two weeks.
            </p>
          </div>
        </AnimatedSection>

        {/* Steps */}
        <ol className="mt-16 grid gap-0 md:grid-cols-4" role="list">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isLast = index === steps.length - 1;
            return (
              <AnimatedSection key={step.number} delay={0.1 * (index + 1)}>
                <li className="relative flex flex-col items-center px-4 text-center">
                  {/* Connector line between steps */}
                  {!isLast && (
                    <div
                      aria-hidden="true"
                      className="absolute left-1/2 top-6 hidden h-px w-full translate-x-6 bg-gradient-to-r from-zinc-700 to-transparent md:block"
                    />
                  )}

                  {/* Icon badge */}
                  <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900">
                    <Icon
                      size={20}
                      className="text-blue-500"
                      aria-hidden="true"
                    />
                  </div>

                  {/* Step number */}
                  <span className="mt-4 text-xs font-bold tracking-widest text-zinc-600">
                    {step.number}
                  </span>

                  <h3 className="mt-2 text-base font-semibold text-zinc-50">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                    {step.description}
                  </p>
                </li>
              </AnimatedSection>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
const businessJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "Oladipupo Consulting Ltd",
  "description":
    "AI automation systems, professional websites, and AI training for small businesses. We help SMBs save time and grow with intelligent automation — delivered in 7 days.",
  "url": "https://oladipupoconsulting.co.uk",
  "email": "hello@oladipupoconsulting.co.uk",
  "telephone": "+447469347654",
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "GB",
  },
  "priceRange": "£500 - £3,500",
  "areaServed": "Worldwide",
  "serviceType": ["AI Automation", "Website Development", "AI Training"],
  "founder": {
    "@type": "Person",
    "name": "Olushola Oladipupo",
  },
  "sameAs": [],
};

export default function HomePage() {
  return (
    <main>
      <JsonLd data={businessJsonLd} />
      <Hero />
      <SocialProofBar />
      <WhatWeBuild />
      <CaseStudiesPreview />
      <ResultsGuarantee />
      <HowItWorks />
      <PersonalisedCTA />
    </main>
  );
}
