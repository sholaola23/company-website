import Link from "next/link";
import {
  ArrowRight,
  Calendar,
  CheckCircle2,
  FileSearch,
  Globe,
  GraduationCap,
  Star,
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
import FAQSection from "@/components/shared/FAQSection";
import type { FAQItem } from "@/components/shared/FAQSection";

// ---------------------------------------------------------------------------
// Hero — clean, bright, text-dominant (Fliweel pattern: text left, image right)
// ---------------------------------------------------------------------------
function Hero() {
  return (
    <section
      className="relative overflow-hidden"
      style={{ background: "var(--color-bg)" }}
    >
      <div className="relative mx-auto max-w-6xl px-6 pb-28 pt-32 sm:px-8 lg:px-12">
        <div className="flex flex-col items-center gap-12 lg:flex-row lg:items-center lg:gap-16">
          {/* Left: copy */}
          <div className="flex-1 text-center lg:text-left">
            <AnimatedSection delay={0}>
              {/* Eyebrow — flat text, small caps, no pill */}
              <div
                className="mb-8 text-xs font-semibold uppercase"
                style={{
                  color: "var(--color-muted)",
                  letterSpacing: "0.14em",
                }}
              >
                AI Automation · Websites · Training
              </div>

              <RotatingHeadline />

              <p
                className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed sm:text-xl lg:mx-0"
                style={{ color: "var(--color-body)" }}
              >
                We run your inbox, your bookings, and your weekly reports. Set up in 7 days. Results in 90 or your money back.
              </p>

              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start">
                {/* Single primary CTA — Stripe-style rectangle */}
                <Link
                  href="https://cal.com/workcrew/free-ai-strategy-call"
                  className="inline-flex items-center gap-2 rounded-sm px-7 py-3.5 text-base font-semibold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 group"
                  style={{
                    background: "var(--color-primary)",
                    color: "var(--color-bg)",
                    outlineColor: "var(--color-primary)",
                  }}
                >
                  Book a 30-minute call
                  <ArrowRight
                    size={18}
                    className="transition-transform duration-200 group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </Link>
              </div>

              {/* Tertiary text link — consolation door */}
              <p
                className="mt-6 text-sm"
                style={{ color: "var(--color-muted)" }}
              >
                Not ready?{" "}
                <Link
                  href="/blueprint"
                  className="underline underline-offset-2 transition-opacity hover:opacity-70"
                  style={{ color: "var(--color-primary)" }}
                >
                  Get the free AI blueprint
                </Link>
              </p>
            </AnimatedSection>
          </div>

          {/* Right: animated AI flow illustration */}
          <AnimatedSection delay={0.3} className="shrink-0">
            <HeroImage />
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Social proof bar — impact numbers with amber accents
// ---------------------------------------------------------------------------
const stats = [
  { numeric: 50, suffix: "+", label: "Minutes Saved Daily", sublabel: "at E'Manuel Bakery" },
  { numeric: 9, suffix: "", label: "Workflows Deployed", sublabel: "and counting" },
  { numeric: 2, suffix: "", label: "Projects Delivered", sublabel: "and growing" },
  { numeric: 90, suffix: "", label: "Day Guarantee", sublabel: "results or refund" },
];

function SocialProofBar() {
  return (
    <div className="border-b border-t border-[var(--color-border)] bg-[var(--color-bg-alt)]">
      <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
        <dl className="grid grid-cols-2 divide-x divide-[var(--color-border)] md:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center justify-center py-8 px-4 text-center"
            >
              <dt className="text-3xl font-bold text-[var(--color-primary)] sm:text-4xl">
                <AnimatedCounter target={stat.numeric} suffix={stat.suffix} />
              </dt>
              <dd className="mt-1.5 text-sm text-[var(--color-body)] font-medium">{stat.label}</dd>
              {"sublabel" in stat && stat.sublabel && (
                <dd className="mt-0.5 text-xs text-[var(--color-muted)]">{stat.sublabel}</dd>
              )}
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// What We Build — service category cards with hover inversion
// ---------------------------------------------------------------------------
const categories = [
  {
    icon: Zap,
    title: "AI Automation",
    href: "/services/lead-intake",
    description:
      "Lead capture, email replies, appointment booking, follow-ups — running while you sleep. Built on n8n, hosted on Railway, alerts on Telegram.",
    result: "E'Manuel saves 50 minutes a day",
  },
  {
    icon: Globe,
    title: "Websites & Web Apps",
    href: "/services/business-website",
    description:
      "Sites and tools that turn visitors into customers. Dashboards, booking portals, calculators — mobile-first, fast, indexed.",
    result: "Live in 7 days from kickoff",
  },
  {
    icon: GraduationCap,
    title: "AI Training",
    href: "/services/ai-workshop",
    description:
      "Workshops that get your team using AI tools the same week. Tailored to your industry. We bring the prompts that already work.",
    result: "Walked out with one test by Friday",
  },
];

// ---------------------------------------------------------------------------
// Why this matters — the redirect-the-time framing (workshop slide 18)
// ---------------------------------------------------------------------------
function WhyThisMatters() {
  return (
    <section
      className="py-24"
      style={{ background: "var(--color-bg)" }}
      aria-labelledby="why-this-matters-heading"
    >
      <div className="mx-auto max-w-3xl px-6 sm:px-8 lg:px-12">
        <AnimatedSection>
          <span className="eyebrow">Why this matters</span>
          <h2
            id="why-this-matters-heading"
            className="heading-section mt-4 text-2xl sm:text-3xl lg:text-[40px]"
            style={{ color: "var(--color-heading)", letterSpacing: "-0.02em", lineHeight: 1.15 }}
          >
            AI takes the admin off your plate. You take the work that{" "}
            <span style={{ color: "var(--color-primary)" }}>actually makes money</span>.
          </h2>
          <p
            className="mt-6 text-lg leading-relaxed"
            style={{ color: "var(--color-body)" }}
          >
            We run the inbox, the bookings, the chasing, the weekly reports.
            You run the customer calls, the new offers, the partnerships.
          </p>
          <p
            className="mt-4 text-lg leading-relaxed"
            style={{ color: "var(--color-body)" }}
          >
            Same hours in your week.{" "}
            <span style={{ color: "var(--color-heading)", fontWeight: 600 }}>
              Different bank balance at the end of the year.
            </span>
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
}

function WhatWeBuild() {
  return (
    <section
      className="py-28"
      style={{ background: "var(--color-primary-tint)" }}
      aria-labelledby="services-heading"
    >
      <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
        <AnimatedSection>
          <div className="flex flex-col items-center gap-4 text-center">
            <span className="eyebrow">What we run</span>
            <h2
              id="services-heading"
              className="heading-section text-3xl sm:text-4xl lg:text-[56px]"
            >
              What we run for you.
            </h2>
            <p
              className="max-w-2xl text-base leading-relaxed sm:text-lg"
              style={{ color: "var(--color-body)" }}
            >
              Three things, mostly. Each one set up in days, not months — measured in hours saved and leads booked, not features shipped.
            </p>
          </div>
        </AnimatedSection>

        {/* Category cards — bordered with hover inversion (Fliweel pattern) */}
        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {categories.map((cat, index) => {
            const Icon = cat.icon;
            return (
              <AnimatedSection key={cat.title} delay={0.1 * (index + 1)}>
                <div className="group flex h-full flex-col rounded-[30px] border-2 border-[var(--color-dark)] bg-transparent p-8 transition-all duration-300 hover:bg-[var(--color-dark)] hover:text-[var(--color-bg)] cursor-pointer">
                  {/* Icon */}
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--color-primary-light)] group-hover:bg-[var(--color-primary-hover)]/20 transition-colors duration-300">
                    <Icon
                      size={22}
                      className="text-[var(--color-primary)] group-hover:text-[var(--color-primary)] transition-colors duration-300"
                      aria-hidden="true"
                    />
                  </div>

                  {/* Title */}
                  <h3 className="mt-5 text-lg font-bold text-[var(--color-heading)] group-hover:text-[var(--color-bg)] transition-colors duration-300">
                    {cat.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-[var(--color-body)] group-hover:text-[var(--color-dark-text)] transition-colors duration-300">
                    {cat.description}
                  </p>

                  {/* Result badge */}
                  <div className="mt-6">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--color-border)] bg-[var(--color-success-light)] px-3 py-1 text-xs font-semibold text-[var(--color-success)] group-hover:border-emerald-500/30 group-hover:bg-emerald-500/10 group-hover:text-[var(--color-success)] transition-colors duration-300">
                      {cat.result}
                    </span>
                  </div>

                  {/* Arrow link */}
                  <Link
                    href={cat.href}
                    className="group/link mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--color-primary)] group-hover:text-[var(--color-primary)] transition-colors duration-200"
                  >
                    Learn more
                    <ArrowRight
                      size={14}
                      className="transition-transform duration-200 group-hover/link:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </Link>
                </div>
              </AnimatedSection>
            );
          })}
        </div>

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
      className="bg-[var(--color-bg)] py-24"
      aria-labelledby="case-studies-heading"
    >
      <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
        <AnimatedSection>
          <div className="flex flex-col items-center gap-3 text-center mb-12">
            <span className="eyebrow">Proof It Works</span>
            <h2
              id="case-studies-heading"
              className="heading-section text-2xl sm:text-3xl"
            >
              What the numbers say
            </h2>
          </div>
        </AnimatedSection>

        <div className="grid gap-5 md:grid-cols-2">
          {caseStudies.slice(0, 2).map((study, index) => (
            <AnimatedSection key={study.slug} delay={0.1 * (index + 1)}>
              <Link
                href={`/case-studies/${study.slug}`}
                className="group flex h-full flex-col justify-between rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg)] p-6 shadow-sm transition-all duration-300 hover:border-[var(--color-primary-light)] hover:shadow-lg card-hover"
              >
                <div>
                  {/* Industry tag */}
                  <span className="inline-block rounded-full border border-[var(--color-border)] bg-[var(--color-bg-alt)] px-3 py-1 text-xs font-medium text-[var(--color-body)]">
                    {study.industry}
                  </span>

                  {/* Hero stat */}
                  <div className="mt-4">
                    <p className="text-3xl font-bold tracking-tight text-[var(--color-heading)] lg:text-4xl">
                      {study.heroStat}
                    </p>
                    <p className="mt-1 text-sm font-semibold text-[var(--color-primary)]">
                      {study.heroLabel}
                    </p>
                  </div>

                  {/* Business name */}
                  <h3 className="mt-4 text-base font-semibold text-[var(--color-heading)]">
                    {study.name}
                  </h3>
                  <p className="mt-0.5 text-xs text-[var(--color-muted)]">{study.location}</p>
                </div>

                <div className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--color-primary)] transition-colors duration-200 group-hover:text-[var(--color-primary-hover)]">
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
    title: "Free AI Blueprint",
    description:
      "We assess your business and identify the highest-impact automation opportunities — at no cost.",
    icon: FileSearch,
  },
  {
    number: "02",
    title: "Custom Proposal",
    description:
      "You get a clear scope with exact deliverables and projected ROI — no vague quotes, no surprises.",
    icon: Users,
  },
  {
    number: "03",
    title: "Build & Launch",
    description:
      "We build, test, and deploy your solution with full documentation, SOPs, and a training walkthrough.",
    icon: Zap,
  },
  {
    number: "04",
    title: "Your Dashboard. 60 Seconds a Day.",
    description:
      "You get a real-time dashboard showing exactly what your business is doing. Check it in 60 seconds each morning — we handle everything behind the scenes.",
    icon: TrendingUp,
  },
];

function HowItWorks() {
  return (
    <section
      className="bg-[var(--color-bg)] py-28"
      aria-labelledby="how-it-works-heading"
    >
      <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
        <AnimatedSection>
          <div className="flex flex-col items-center gap-4 text-center">
            <span className="eyebrow">How it works</span>
            <h2
              id="how-it-works-heading"
              className="heading-section text-3xl sm:text-4xl lg:text-[56px]"
            >
              From conversation to live automation
            </h2>
            <p className="max-w-xl text-base leading-relaxed text-[var(--color-body)] sm:text-lg">
              A structured 4-step process — from first conversation to a system that runs itself.
            </p>
          </div>
        </AnimatedSection>

        <ol className="mt-16 grid gap-0 md:grid-cols-4" role="list">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isLast = index === steps.length - 1;
            return (
              <AnimatedSection key={step.number} delay={0.1 * (index + 1)}>
                <li className="relative flex flex-col items-center px-4 text-center">
                  {/* Connector line */}
                  {!isLast && (
                    <div
                      aria-hidden="true"
                      className="absolute left-1/2 top-6 hidden h-px w-full translate-x-6 bg-gradient-to-r from-slate-300 to-transparent md:block"
                    />
                  )}

                  {/* Icon badge */}
                  <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] shadow-sm">
                    <Icon
                      size={20}
                      className="text-[var(--color-primary)]"
                      aria-hidden="true"
                    />
                  </div>

                  {/* Step number */}
                  <span className="mt-4 text-xs font-bold tracking-widest text-[var(--color-muted)]">
                    {step.number}
                  </span>

                  <h3 className="mt-2 text-base font-semibold text-[var(--color-heading)]">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--color-body)]">
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
// Strategy Call CTA — dedicated section to drive call bookings
// ---------------------------------------------------------------------------
const callPoints = [
  "We map out where you're losing the most time right now",
  "We show you exactly what AI can (and can't) do for your business",
  "You leave with a prioritised action plan — whether you work with us or not",
];

function StrategyCallCTA() {
  return (
    <section className="bg-[var(--color-dark)] py-28" aria-labelledby="strategy-call-heading">
      <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
        <div className="flex flex-col items-center gap-10 lg:flex-row lg:gap-16">
          {/* Left: copy */}
          <AnimatedSection className="flex-1 text-center lg:text-left">
            <span
              className="inline-flex items-center gap-2 rounded-sm border px-4 py-1.5 text-xs font-semibold tracking-wide mb-6"
              style={{
                borderColor: "var(--color-dark-border)",
                background: "var(--color-dark-surface)",
                color: "var(--color-dark-muted)",
              }}
            >
              <Calendar size={12} aria-hidden="true" />
              Free 30-minute call
            </span>

            <h2
              id="strategy-call-heading"
              className="text-3xl font-semibold tracking-tight sm:text-4xl lg:text-[44px] lg:leading-tight"
              style={{ color: "var(--color-bg)", letterSpacing: "-0.025em" }}
            >
              30 minutes.{" "}
              <span style={{ color: "var(--color-accent)" }}>
                We tell you what's broken
              </span>{" "}
              and what we'd fix first.
            </h2>

            <p
              className="mt-6 max-w-xl text-base leading-relaxed sm:text-lg lg:mx-0 mx-auto"
              style={{ color: "var(--color-dark-text)" }}
            >
              No slides. No sales pitch. Just a focused conversation about your business and where automation makes a real difference.
            </p>

            <ul className="mt-8 flex flex-col gap-3" role="list">
              {callPoints.map((point) => (
                <li key={point} className="flex items-start gap-3 text-sm text-[var(--color-dark-text)]">
                  <CheckCircle2
                    size={18}
                    className="mt-0.5 shrink-0 text-[var(--color-accent)]"
                    aria-hidden="true"
                  />
                  {point}
                </li>
              ))}
            </ul>

            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:items-center">
              <Link
                href="https://cal.com/workcrew/free-ai-strategy-call"
                className="inline-flex items-center gap-2 rounded-full bg-[var(--color-primary)] px-7 py-3.5 text-base font-semibold text-[var(--color-bg)] shadow-[0_1px_6px_-1px_rgba(37,99,235,0.5)] transition-all duration-200 hover:bg-[var(--color-primary-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-dark)] group"
              >
                Book Your Free Strategy Call
                <ArrowRight
                  size={18}
                  className="transition-transform duration-200 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </Link>
              <p className="text-xs text-[var(--color-muted)]">No obligation. No credit card.</p>
            </div>
          </AnimatedSection>

          {/* Right: call details card */}
          <AnimatedSection delay={0.2} className="w-full lg:w-80 shrink-0">
            <div className="rounded-2xl border border-[var(--color-dark-border)] bg-[var(--color-dark-surface)] p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--color-primary)]/20">
                  <Calendar size={20} className="text-[var(--color-accent)]" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[var(--color-bg)]">Free Strategy Call</p>
                  <p className="text-xs text-[var(--color-muted)]">30 minutes · Google Meet</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--color-primary)]/10 text-xs font-bold text-[var(--color-accent)]">1</span>
                  <p className="text-sm text-[var(--color-dark-text)]">Tell us about your biggest manual pain points</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--color-primary)]/10 text-xs font-bold text-[var(--color-accent)]">2</span>
                  <p className="text-sm text-[var(--color-dark-text)]">We show you the 2–3 highest-impact automations for your business</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--color-primary)]/10 text-xs font-bold text-[var(--color-accent)]">3</span>
                  <p className="text-sm text-[var(--color-dark-text)]">Walk away with a clear plan, regardless of next steps</p>
                </div>
              </div>

              <div className="mt-6 rounded-xl border border-[var(--color-dark-border)] bg-[var(--color-dark)]/50 px-4 py-3 text-center">
                <p className="text-xs text-[var(--color-muted)]">Booked by <span className="text-[var(--color-bg)] font-semibold">UK business owners</span> who want clarity before they commit</p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
const businessJsonLd = [
  {
    "@context": "https://schema.org",
    "@type": ["ProfessionalService", "Organization"],
    "@id": "https://workcrew.io/#organization",
    "name": "WorkCrew Ltd",
    "legalName": "WorkCrew Ltd",
    "description":
      "AI automation, professional websites, custom web apps, and AI training for UK small businesses. We build digital systems that save your team 5+ hours per week.",
    "url": "https://workcrew.io",
    "logo": "https://workcrew.io/icon.png",
    "email": "hello@workcrew.io",
    "telephone": "+447469347654",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "GB",
    },
    "areaServed": [
      { "@type": "City", "name": "London" },
      { "@type": "City", "name": "Manchester" },
      { "@type": "City", "name": "Birmingham" },
      { "@type": "City", "name": "Leeds" },
      { "@type": "City", "name": "Liverpool" },
      { "@type": "City", "name": "Bristol" },
      { "@type": "City", "name": "Edinburgh" },
      { "@type": "City", "name": "Glasgow" },
      { "@type": "City", "name": "Sheffield" },
      { "@type": "City", "name": "Kettering" },
      { "@type": "Country", "name": "United Kingdom" },
    ],
    "serviceType": ["AI Automation", "Website Development", "Web App Development", "AI Training", "WhatsApp Bot Development", "SEO Content Automation"],
    "foundingDate": "2025",
    "founder": {
      "@type": "Person",
      "name": "Olushola Oladipupo",
      "url": "https://linkedin.com/in/olushola-oladipupo/",
    },
    "sameAs": [
      "https://linkedin.com/in/olushola-oladipupo/",
      "https://linkedin.com/company/workcrew-ltd",
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5",
      "reviewCount": "1",
      "bestRating": "5",
      "worstRating": "1",
    },
    "review": {
      "@type": "Review",
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5",
        "bestRating": "5",
      },
      "author": {
        "@type": "Person",
        "name": "Tunmise Ajao",
      },
      "reviewBody":
        "They moved us from manual order tracking to a fully automated system — orders come in digitally, responses to customers are instant, and payments match our statements automatically. It's saving us over 50 minutes every day.",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://workcrew.io/#website",
    "url": "https://workcrew.io",
    "name": "WorkCrew",
    "description": "AI automation, websites, and training for UK small businesses.",
    "publisher": { "@id": "https://workcrew.io/#organization" },
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://workcrew.io/blog?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  },
];

const homepageFAQs: FAQItem[] = [
  {
    question: "What is AI automation for businesses?",
    answer:
      "AI automation uses artificial intelligence to handle repetitive business tasks — things like responding to enquiries, booking appointments, sending follow-ups, and managing orders. Instead of hiring extra staff, you deploy AI systems that run 24/7 and free your team to focus on higher-value work.",
  },
  {
    question: "How much does AI automation cost for a business in the UK?",
    answer:
      "Every project is scoped individually based on your needs and complexity. We start with a free AI blueprint to understand your business, then provide a detailed proposal with a fixed price — no hidden costs. Book a free consultation to get a tailored quote.",
  },
  {
    question: "Do I need technical skills to use AI automation?",
    answer:
      "Not at all. We handle the entire setup, configuration, and training. Once your system is live, you interact with a simple dashboard — no coding or technical knowledge required. We also provide full documentation and standard operating procedures so your team can manage everything confidently.",
  },
  {
    question: "How long does it take to set up AI automation?",
    answer:
      "Timelines depend on the scope and complexity of your project. We start with a free AI blueprint that maps your business processes and identifies the highest-impact opportunities. You'll receive a clear timeline in your custom proposal.",
  },
  {
    question: "Is AI automation safe and reliable for my business?",
    answer:
      "Yes. We build in human-in-the-loop safeguards for all sensitive communications, so nothing goes out without your approval until you are comfortable. Every system includes fallback behaviour for errors, logging, and alerting so you always know what is happening.",
  },
  {
    question: "What happens if the automation does not deliver results?",
    answer:
      "Every project is backed by our 90-Day Results Guarantee. If you do not save at least 5 hours per week within 90 days, we refund your setup fee — no questions asked. We are confident in what we deliver because we only take on projects where we know AI will make a measurable difference.",
  },
];

// ---------------------------------------------------------------------------
// Client testimonial — E'Manuel Bakery (Google review)
// ---------------------------------------------------------------------------
function TestimonialSection() {
  return (
    <section className="bg-[var(--color-bg-alt)] py-24" aria-labelledby="testimonial-heading">
      <div className="mx-auto max-w-3xl px-6 sm:px-8 lg:px-12">
        <AnimatedSection>
          <div className="flex flex-col items-center text-center gap-4 mb-12">
            <span className="eyebrow">What Our Clients Say</span>
            <h2
              id="testimonial-heading"
              className="heading-section text-3xl sm:text-4xl"
            >
              From a client
            </h2>
          </div>

          {/* Testimonial card */}
          <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg)] p-10 shadow-sm text-center">
            {/* Stars */}
            <div className="flex justify-center gap-1 mb-6" aria-label="5 out of 5 stars">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={18}
                  className="fill-amber-400 text-[var(--color-primary)]"
                  aria-hidden="true"
                />
              ))}
            </div>

            {/* Quote */}
            <blockquote className="text-lg font-medium leading-relaxed text-[var(--color-heading)] sm:text-xl">
              &ldquo;They moved us from manual order tracking to a fully automated
              system — orders come in digitally, responses to customers are instant,
              and payments match our statements automatically. It&rsquo;s saving us
              over 50 minutes every day. Highly recommended!&rdquo;
            </blockquote>

            {/* Divider */}
            <div className="my-8 h-px w-16 bg-[var(--color-border)] mx-auto" aria-hidden="true" />

            {/* Attribution */}
            <div className="flex flex-col items-center gap-1">
              {/* Avatar initials */}
              <div
                className="h-12 w-12 rounded-full bg-[var(--color-primary)] flex items-center justify-center text-[var(--color-bg)] font-bold text-sm mb-2"
                aria-hidden="true"
              >
                TA
              </div>
              <p className="font-semibold text-[var(--color-heading)]">Tunmise Ajao</p>
              <p className="text-sm text-[var(--color-muted)]">Founder, E&rsquo;Manuel Bakery — Kettering</p>

              {/* Google badge */}
              <div className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-[var(--color-border)] bg-[var(--color-bg-alt)] px-3 py-1 text-xs font-medium text-[var(--color-muted)]">
                <svg width="12" height="12" viewBox="0 0 24 24" aria-hidden="true">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Verified Google Review
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <>
      <JsonLd data={businessJsonLd} />
      <Hero />
      <SocialProofBar />
      <section className="bg-[var(--color-bg-alt)] border-y border-[var(--color-border)] py-6">
        <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12 flex items-center justify-center gap-3 text-sm text-[var(--color-muted)]">
          <span className="text-[10px] font-semibold tracking-widest uppercase text-[var(--color-subtle)]">As featured in</span>
          <span className="text-[var(--color-border-strong)]">|</span>
          <a
            href="https://techtrends.africa/ai-automation-for-african-smbs-lessons/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-[var(--color-heading)] hover:text-[var(--color-primary)] transition-colors"
          >
            TechTrends Africa
          </a>
        </div>
      </section>
      <WhyThisMatters />
      <WhatWeBuild />
      <TestimonialSection />
      <CaseStudiesPreview />
      <HowItWorks />
      <StrategyCallCTA />
      <section className="bg-[var(--color-bg)] py-28">
        <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
          <AnimatedSection>
            <FAQSection
              items={homepageFAQs}
              eyebrow="FAQs"
              heading="Common Questions About AI Automation"
            />
          </AnimatedSection>
        </div>
      </section>
      <PersonalisedCTA />
    </>
  );
}
