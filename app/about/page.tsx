import type { Metadata } from "next";
import { CheckCircle, FileSearch, Zap, RefreshCw } from "lucide-react";
import CTAButton from "@/components/shared/CTAButton";
import SectionHeading from "@/components/shared/SectionHeading";

export const metadata: Metadata = {
  title: "About WorkCrew | UK AI Automation Agency for Small Businesses",
  description:
    "WorkCrew Ltd is a UK AI automation agency helping small businesses save 5+ hours per week. Founded by Olushola Oladipupo. Registered in England & Wales. 90-day results guarantee.",
  alternates: {
    canonical: "https://workcrew.io/about",
  },
  openGraph: {
    images: [{ url: "https://workcrew.io/api/og", width: 1200, height: 630 }],
    title: "About WorkCrew | UK AI Automation Agency for Small Businesses",
    description:
      "WorkCrew Ltd builds AI automation, websites, and custom apps for UK small businesses. Founded by Olushola Oladipupo. 90-day results guarantee. Serving businesses across the UK.",
    url: "https://workcrew.io/about",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About WorkCrew | UK AI Automation Agency for Small Businesses",
    description:
      "WorkCrew Ltd builds AI automation, websites, and custom apps for UK small businesses. 90-day results guarantee.",
  },
};

const HOW_WE_WORK = [
  {
    icon: FileSearch,
    step: "01",
    title: "Discovery call",
    description:
      "We sit down for 30 minutes and find where your week leaks the most time. No charge, no slides, no obligation.",
  },
  {
    icon: CheckCircle,
    step: "02",
    title: "Analysis and proposal",
    description:
      "We write the scope: what we'll build, what it'll cost, what you should see in 30, 60, 90 days. A proposal you can say yes or no to.",
  },
  {
    icon: Zap,
    step: "03",
    title: "Build and launch",
    description:
      "We build it, test it, ship it. Full SOPs and a walkthrough so your team runs it. You see progress weekly.",
  },
  {
    icon: RefreshCw,
    step: "04",
    title: "Run and adjust",
    description:
      "We watch the system, fix what breaks, and tighten what works. Adopt. Test. Keep what works.",
  },
];

const STATS = [
  { value: "2", label: "Live clients" },
  { value: "12", label: "Service offerings" },
  { value: "60+", label: "AI agents running" },
  { value: "90 days", label: "Results guarantee" },
];

const TRUST = [
  "Registered in England & Wales (Companies House)",
  "UK-based — available evenings & weekends",
  "Real client references available on request",
  "Human approval on every outbound message until you say otherwise",
  "Full SOP documentation handed over on every project",
  "Published in TechTrends Africa",
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
      {/* Hero */}
      <div className="max-w-3xl mx-auto text-center mb-20 sm:mb-24">
        <span
          className="text-xs font-semibold tracking-widest uppercase mb-4 block"
          style={{ color: "var(--color-muted)" }}
        >
          About WorkCrew
        </span>
        <h1
          className="text-3xl sm:text-5xl lg:text-6xl font-semibold tracking-[-0.03em] leading-tight mb-6"
          style={{ color: "var(--color-heading)" }}
        >
          We run AI for small businesses.
        </h1>
        <p
          className="text-lg leading-relaxed"
          style={{ color: "var(--color-body)" }}
        >
          Every engagement starts with a discovery call. We figure out what&apos;s
          actually draining your week before we propose anything. Then we build it,
          ship it, and run it on the back end. You stay focused on the work that
          makes money.
        </p>
      </div>

      {/* Story */}
      <section
        className="max-w-3xl mx-auto mb-20 sm:mb-24"
        aria-labelledby="story-heading"
      >
        <h2 id="story-heading" className="sr-only">
          Our story
        </h2>
        <div className="bg-[var(--color-bg-alt)] border border-[var(--color-border)] rounded-2xl p-8 sm:p-10 flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-semibold uppercase tracking-widest text-[var(--color-muted)]">
              Founded by
            </span>
            <h3 className="text-2xl font-bold text-[var(--color-heading)]">
              Olushola Oladipupo
            </h3>
            <p className="text-sm text-[var(--color-primary)] font-medium">
              WorkCrew Ltd — Registered in England &amp; Wales
            </p>
          </div>

          <div className="flex flex-col gap-4 text-sm text-[var(--color-body)] leading-relaxed">
            <p>
              WorkCrew was founded on one observation: every AI tool and
              consultant is built for people who already know what they&apos;re
              doing. We&apos;re built for everyone else — the founder still
              wearing too many hats, the team that wants to use AI but doesn&apos;t
              want to learn it from scratch.
            </p>
            <p>
              We work across three areas. <strong className="text-[var(--color-body)]">AI automation</strong> — examples include lead intake, bookings, inbox, orders, content, knowledge bases, customer support. The actual build comes out of the discovery call. <strong className="text-[var(--color-body)]">Websites and small apps</strong> — fast, indexed, built around how your customers actually behave. <strong className="text-[var(--color-body)]">AI training</strong> — hands-on workshops, tailored to your work, the same week.
            </p>
            <p>
              We practice what we preach. Our own operations are automated — an
              agent fleet handles prospecting, follow-up, and content production
              while we focus on building for clients. The savings from running a
              lean operation get passed straight through to delivery cost.
            </p>
          </div>
        </div>
      </section>

      {/* How we work */}
      <section className="mb-20 sm:mb-24" aria-labelledby="how-heading">
        <div className="mb-12">
          <SectionHeading
            eyebrow="Our process"
            heading="How we work"
            align="center"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
          {HOW_WE_WORK.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.step}
                className="bg-[var(--color-bg-alt)] border border-[var(--color-border)] rounded-xl p-6 flex flex-col gap-4 hover:border-[var(--color-border)] transition-colors duration-200"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/20">
                    <Icon size={18} className="text-[var(--color-primary)]" aria-hidden="true" />
                  </div>
                  <span className="text-2xl font-bold text-[var(--color-body)] font-mono">
                    {step.step}
                  </span>
                </div>
                <div>
                  <h3 className="text-base font-semibold text-[var(--color-heading)] mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-[var(--color-body)] leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Stats */}
      <section className="mb-20 sm:mb-24" aria-labelledby="stats-heading">
        <h2 id="stats-heading" className="sr-only">
          By the numbers
        </h2>
        <div className="bg-[var(--color-bg-alt)] border border-[var(--color-border)] rounded-2xl px-8 py-10 max-w-4xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-muted)] text-center mb-8">
            By the Numbers
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
            {STATS.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-4xl font-bold text-[var(--color-heading)] leading-none mb-2">
                  {stat.value}
                </p>
                <p className="text-sm text-[var(--color-muted)]">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust signals */}
      <section
        className="mb-20 sm:mb-24 max-w-3xl mx-auto"
        aria-labelledby="trust-heading"
      >
        <h2
          id="trust-heading"
          className="text-xl font-semibold text-[var(--color-heading)] mb-6 text-center"
        >
          Why you can trust us
        </h2>
        <ul className="flex flex-col gap-3" role="list">
          {TRUST.map((item) => (
            <li key={item} className="flex items-start gap-3">
              <CheckCircle
                size={16}
                className="text-[var(--color-primary)] shrink-0 mt-0.5"
                aria-hidden="true"
              />
              <span className="text-sm text-[var(--color-muted)] leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* CTA */}
      <div className="text-center">
        <div className="inline-flex flex-col items-center gap-4">
          <p className="text-[var(--color-body)] text-base">
            Ready to find where your week leaks the most time?
          </p>
          <CTAButton href="https://cal.com/workcrew/free-ai-strategy-call" variant="primary" size="lg">
            Book a discovery call
          </CTAButton>
          <p className="text-xs text-[var(--color-muted)]">
            30 minutes. No charge. No obligation.
          </p>
        </div>
      </div>
    </div>
  );
}
