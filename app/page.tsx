import Link from "next/link";
import {
  ArrowRight,
  CheckCircle,
  Clock,
  FileSearch,
  GraduationCap,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import { caseStudies } from "@/lib/case-studies-data";
import AnimatedSection from "@/components/shared/AnimatedSection";
import AnimatedCounter from "@/components/shared/AnimatedCounter";
import GradientBlob from "@/components/shared/GradientBlob";
import HeroImage from "@/components/shared/HeroImage";

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

              <h1 className="mx-auto max-w-4xl text-5xl font-bold leading-[1.1] tracking-tight text-zinc-50 sm:text-6xl lg:mx-0 lg:text-7xl">
                AI Solutions That{" "}
                <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                  Grow Your Business
                </span>
              </h1>

              <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-zinc-400 sm:text-xl lg:mx-0">
                From intelligent automation to professional websites and team
                training — we help small businesses work smarter with AI.
                Delivered in 7 days.
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
  { numeric: 2, suffix: "", label: "Live Clients" },
  { numeric: 8, suffix: "+ hrs/wk", label: "Saved Per Client" },
  { numeric: 16, suffix: "", label: "AI Agents Running" },
  { numeric: 33, suffix: "", label: "Leads in Pipeline" },
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
              <dd className="mt-1 text-sm text-zinc-500">{stat.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Services preview — 3 tier cards
// ---------------------------------------------------------------------------
const tiers = [
  {
    name: "Starter",
    from: "£500",
    monthly: "£50/mo",
    description:
      "Perfect for solopreneurs and small teams taking their first AI step.",
    features: [
      "AI Lead Intake & Booking",
      "AI Email Assistant",
      "SEO Content Automation",
      "Social Media Engine",
    ],
    recommended: false,
  },
  {
    name: "Growth",
    from: "£1,500",
    monthly: "£150/mo",
    description: "For established businesses ready to automate core operations.",
    features: [
      "Order-to-Delivery Automation",
      "WhatsApp Customer Bot",
      "Professional Website",
      "Monthly optimisation retainer",
    ],
    recommended: true,
  },
  {
    name: "Scale",
    from: "£3,500",
    monthly: "£350/mo",
    description:
      "Multi-system automation stack for businesses with complex workflows.",
    features: [
      "Custom automation build",
      "Full AI workflow audit",
      "Multi-channel integration",
      "Priority support & SLA",
    ],
    recommended: false,
  },
];

function ServicesPreview() {
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
              What We Build
            </h2>
            <p className="max-w-2xl text-base leading-relaxed text-zinc-400">
              Automation, websites, training, and custom AI solutions — three
              tiers designed to match where your business is today.
            </p>
          </div>
        </AnimatedSection>

        {/* Tier cards */}
        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {tiers.map((tier, index) => (
            <AnimatedSection key={tier.name} delay={0.1 * (index + 1)}>
              <div
                className={`relative flex h-full flex-col rounded-2xl p-8 transition-all duration-300 hover:scale-[1.02] ${
                  tier.recommended
                    ? "border border-blue-500 bg-zinc-900 shadow-lg shadow-blue-500/10 hover:shadow-blue-500/20"
                    : "border border-zinc-800 bg-zinc-900/50 hover:border-zinc-700 hover:bg-zinc-900"
                }`}
              >
                {tier.recommended && (
                  <>
                    {/* Animated gradient glow border overlay */}
                    <div
                      aria-hidden="true"
                      className="animate-gradient-border absolute inset-0 rounded-2xl opacity-20 blur-sm"
                      style={{
                        background:
                          "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 50%, #3b82f6 100%)",
                        backgroundSize: "200% 200%",
                      }}
                    />
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="inline-flex items-center rounded-full bg-blue-500 px-3 py-0.5 text-xs font-semibold text-white">
                        Most Popular
                      </span>
                    </div>
                  </>
                )}

                <div className="relative flex-1">
                  <h3 className="text-sm font-semibold uppercase tracking-widest text-zinc-400">
                    {tier.name}
                  </h3>
                  <div className="mt-3 flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-zinc-50">
                      {tier.from}
                    </span>
                    <span className="text-sm text-zinc-500">setup</span>
                  </div>
                  <p className="mt-0.5 text-sm text-zinc-500">
                    {tier.monthly} retainer
                  </p>

                  <p className="mt-4 text-sm leading-relaxed text-zinc-400">
                    {tier.description}
                  </p>

                  <ul className="mt-6 space-y-3" role="list">
                    {tier.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-2.5 text-sm text-zinc-300"
                      >
                        <CheckCircle
                          size={15}
                          className="mt-0.5 shrink-0 text-blue-500"
                          aria-hidden="true"
                        />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  href="/services"
                  className={`relative mt-8 inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-all duration-200 group ${
                    tier.recommended
                      ? "bg-blue-500 text-white hover:bg-blue-600"
                      : "border border-zinc-700 text-zinc-300 hover:border-zinc-500 hover:bg-zinc-800/60 hover:text-zinc-50"
                  }`}
                >
                  Explore {tier.name} tier
                  <ArrowRight
                    size={14}
                    className="transition-transform duration-200 group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </Link>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* AI Training & Workshops callout */}
        <AnimatedSection delay={0.4}>
          <div className="mt-8 rounded-2xl border border-zinc-700 bg-zinc-900/60 p-7 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between hover:border-zinc-600 transition-colors duration-200">
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-zinc-700 bg-zinc-800">
                <GraduationCap
                  size={20}
                  className="text-blue-400"
                  aria-hidden="true"
                />
              </div>
              <div>
                <h3 className="text-base font-semibold text-zinc-50">
                  AI Training &amp; Workshops
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-zinc-400 max-w-lg">
                  Hands-on AI training tailored to your industry and team — from
                  beginner fundamentals to advanced workflow automation. Run
                  in-person or remote, half-day or full-day.
                </p>
                <p className="mt-2 text-sm font-medium text-blue-400">
                  £500 – £5,000 per session
                </p>
              </div>
            </div>
            <Link
              href="/services/ai-workshop"
              className="inline-flex shrink-0 items-center gap-2 rounded-lg border border-zinc-700 px-4 py-2.5 text-sm font-medium text-zinc-300 transition-all duration-200 hover:border-zinc-500 hover:bg-zinc-800/60 hover:text-zinc-50 group"
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

        {/* All solutions link */}
        <AnimatedSection delay={0.5}>
          <p className="mt-10 text-center">
            <Link
              href="/services"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-400 transition-colors duration-200 hover:text-blue-300 group"
            >
              View all 12 solutions
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
          </div>
        </AnimatedSection>

        {/* Cards */}
        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {caseStudies.map((study, index) => (
            <AnimatedSection key={study.slug} delay={0.15 * (index + 1)}>
              <Link
                href={`/case-studies/${study.slug}`}
                className="group flex flex-col justify-between rounded-2xl border border-zinc-800 bg-zinc-900/60 p-8 transition-all duration-200 hover:border-zinc-700 hover:bg-zinc-900"
              >
                <div>
                  {/* Industry tag */}
                  <span className="inline-block rounded-md border border-zinc-700 bg-zinc-800 px-2.5 py-0.5 text-xs font-medium text-zinc-400">
                    {study.industry}
                  </span>

                  {/* Hero stat */}
                  <div className="mt-6">
                    <p className="text-5xl font-bold tracking-tight text-zinc-50">
                      {study.heroStat}
                    </p>
                    <p className="mt-1 text-base font-medium text-zinc-400">
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

                <div className="mt-8 inline-flex items-center gap-1.5 text-sm font-medium text-blue-400 transition-colors duration-200 group-hover:text-blue-300">
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
// Bottom CTA
// ---------------------------------------------------------------------------
function BottomCTA() {
  return (
    <section
      className="relative overflow-hidden bg-zinc-950 py-28"
      aria-labelledby="cta-heading"
    >
      {/* Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
      >
        <div className="h-[400px] w-[700px] rounded-full bg-blue-500/8 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-3xl px-6 text-center sm:px-8">
        <AnimatedSection>
          {/* Clock icon */}
          <div className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900">
            <Clock size={22} className="text-blue-500" aria-hidden="true" />
          </div>

          <h2
            id="cta-heading"
            className="text-4xl font-bold tracking-tight text-zinc-50 sm:text-5xl"
          >
            Ready to save 8+ hours a week?
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-zinc-400">
            Get your free AI Readiness Audit — no obligation, just a
            conversation.
          </p>

          <div className="mt-10">
            <Link
              href="/audit"
              className="inline-flex items-center gap-2 rounded-lg bg-blue-500 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-blue-500/25 transition-all duration-200 hover:bg-blue-600 hover:shadow-blue-500/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 group"
            >
              Get Your Free Audit
              <ArrowRight
                size={18}
                className="transition-transform duration-200 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Link>
          </div>

          <p className="mt-6 text-sm text-zinc-500">
            or email{" "}
            <a
              href="mailto:olusholaoladipupo1@gmail.com"
              className="text-zinc-400 transition-colors duration-200 hover:text-zinc-200 underline underline-offset-2"
            >
              olusholaoladipupo1@gmail.com
            </a>
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
export default function HomePage() {
  return (
    <>
      {/* Gradient-shift keyframe for the Growth card animated border */}
      <style>{`
        @keyframes gradientShift {
          0%   { background-position: 0%   50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0%   50%; }
        }
        .animate-gradient-border {
          animation: gradientShift 4s ease infinite;
        }
      `}</style>
      <main>
        <Hero />
        <SocialProofBar />
        <ServicesPreview />
        <CaseStudiesPreview />
        <HowItWorks />
        <BottomCTA />
      </main>
    </>
  );
}
