import type { Metadata } from "next";
import { CheckCircle, FileSearch, Zap, RefreshCw } from "lucide-react";
import CTAButton from "@/components/shared/CTAButton";
import SectionHeading from "@/components/shared/SectionHeading";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Oladipupo Consulting — UK-based AI solutions agency for small businesses. AI automation, website development, and team training. Founded by Olushola Oladipupo. Registered in England & Wales.",
};

const HOW_WE_WORK = [
  {
    icon: FileSearch,
    step: "01",
    title: "Free Audit",
    description:
      "We start with a free AI readiness audit to understand your business, your processes, and where automation will have the biggest impact.",
  },
  {
    icon: CheckCircle,
    step: "02",
    title: "Clear Proposal",
    description:
      "You receive a specific solution with exact deliverables, timeline, and projected ROI. No vague consulting — a real proposal you can say yes or no to.",
  },
  {
    icon: Zap,
    step: "03",
    title: "7-Day Build",
    description:
      "We build and deploy your automation in a focused sprint. You're informed at every stage, and we hand over full documentation and SOPs.",
  },
  {
    icon: RefreshCw,
    step: "04",
    title: "Monthly Optimisation",
    description:
      "We monitor performance, fix issues, and improve the system every month. Automation isn't a one-time job — it gets better over time.",
  },
];

const STATS = [
  { value: "2", label: "Live clients" },
  { value: "3", label: "Service pillars" },
  { value: "16", label: "AI agents running" },
  { value: "7 days", label: "Average delivery" },
];

const TRUST = [
  "Registered in England & Wales (Companies House)",
  "UK-based — available evenings & weekends",
  "Real client references available on request",
  "Human-in-the-loop on all outbound communications",
  "Full SOP documentation handed over on every project",
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
      {/* Hero */}
      <div className="max-w-3xl mx-auto text-center mb-20 sm:mb-24">
        <span className="text-xs font-semibold tracking-widest uppercase text-blue-500 mb-4 block">
          About Oladipupo Consulting
        </span>
        <h1 className="text-3xl sm:text-5xl font-bold text-zinc-50 leading-tight tracking-tight mb-6">
          AI Solutions, Built for Small Businesses
        </h1>
        <p className="text-lg text-zinc-400 leading-relaxed">
          We saw small businesses drowning in manual work while AI tools were
          only accessible to large enterprises. So we productised it — repeatable
          solutions, delivered fast, at prices SMBs can actually afford.
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
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 sm:p-10 flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-semibold uppercase tracking-widest text-zinc-500">
              Founded by
            </span>
            <h3 className="text-2xl font-bold text-zinc-50">
              Olushola Oladipupo
            </h3>
            <p className="text-sm text-blue-400 font-medium">
              Oladipupo Consulting Ltd — Registered in England &amp; Wales
            </p>
          </div>

          <div className="flex flex-col gap-4 text-sm text-zinc-400 leading-relaxed">
            <p>
              Oladipupo Consulting was founded with one observation: small
              businesses are behind on AI not because they don&apos;t want to
              adopt it, but because every tool, platform, and consultant is aimed
              at people who already know what they&apos;re doing.
            </p>
            <p>
              We change that across three service pillars. <strong className="text-zinc-300">AI Automation</strong> — lead intake,
              appointment booking, inbox management, order processing, and content
              production. <strong className="text-zinc-300">Website Development</strong> — professional, fast-loading sites
              built to convert visitors into customers. <strong className="text-zinc-300">AI Training</strong> — hands-on
              workshops that give your team the skills to work smarter with AI,
              tailored to your industry.
            </p>
            <p>
              We practice what we preach. Our own operations are automated — an
              AI agent fleet handles prospecting, follow-up, and content
              production while we focus on building for clients. Our technical
              co-founder is Claude (AI by Anthropic), which keeps our delivery
              fast and our costs low enough to pass savings on to clients.
            </p>
          </div>
        </div>
      </section>

      {/* How we work */}
      <section className="mb-20 sm:mb-24" aria-labelledby="how-heading">
        <div className="mb-12">
          <SectionHeading
            eyebrow="Our Process"
            heading="How We Work"
            align="center"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
          {HOW_WE_WORK.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.step}
                className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 flex flex-col gap-4 hover:border-zinc-700 transition-colors duration-200"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/20">
                    <Icon size={18} className="text-blue-400" aria-hidden="true" />
                  </div>
                  <span className="text-2xl font-bold text-zinc-700 font-mono">
                    {step.step}
                  </span>
                </div>
                <div>
                  <h3 className="text-base font-semibold text-zinc-50 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-zinc-400 leading-relaxed">
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
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl px-8 py-10 max-w-4xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500 text-center mb-8">
            By the Numbers
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
            {STATS.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-4xl font-bold text-zinc-50 leading-none mb-2">
                  {stat.value}
                </p>
                <p className="text-sm text-zinc-500">{stat.label}</p>
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
          className="text-xl font-semibold text-zinc-50 mb-6 text-center"
        >
          Why You Can Trust Us
        </h2>
        <ul className="flex flex-col gap-3" role="list">
          {TRUST.map((item) => (
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

      {/* CTA */}
      <div className="text-center">
        <div className="inline-flex flex-col items-center gap-4">
          <p className="text-zinc-400 text-base">
            Ready to see what&apos;s possible for your business?
          </p>
          <CTAButton href="/audit" variant="primary" size="lg">
            Get Your Free Audit
          </CTAButton>
          <p className="text-xs text-zinc-500">
            48-hour turnaround. No obligation.
          </p>
        </div>
      </div>
    </div>
  );
}
