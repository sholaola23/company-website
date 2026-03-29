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
import NewsletterSignup from "@/components/shared/NewsletterSignup";
import JsonLd from "@/components/shared/JsonLd";
import FAQSection from "@/components/shared/FAQSection";
import type { FAQItem } from "@/components/shared/FAQSection";

// ---------------------------------------------------------------------------
// Hero — clean, bright, text-dominant (Fliweel pattern: text left, image right)
// ---------------------------------------------------------------------------
function Hero() {
  return (
    <section className="relative overflow-hidden bg-white">
      {/* Subtle gradient blobs for depth — very low opacity on white */}
      <GradientBlob
        className="w-[700px] h-[700px] bg-blue-600 -top-60 -left-40"
        duration={10}
      />
      <GradientBlob
        className="w-[500px] h-[500px] bg-amber-300 top-20 -right-40"
        duration={12}
        delay={2}
      />

      <div className="relative mx-auto max-w-6xl px-6 pb-28 pt-32 sm:px-8 lg:px-12">
        <div className="flex flex-col items-center gap-12 lg:flex-row lg:items-center lg:gap-16">
          {/* Left: copy */}
          <div className="flex-1 text-center lg:text-left">
            <AnimatedSection delay={0}>
              {/* Eyebrow pill */}
              <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-1.5 text-xs font-semibold tracking-wide text-slate-600 shadow-sm">
                <span
                  className="h-1.5 w-1.5 rounded-full bg-blue-600"
                  aria-hidden="true"
                />
                AI Solutions — delivered in 14 days
              </div>

              <RotatingHeadline />

              <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-600 sm:text-xl lg:mx-0">
                AI automation, professional websites, and custom web apps —
                built and delivered in 7-14 days. Your team checks a dashboard
                for 60 seconds. AI handles the rest. Packages from £500.
              </p>

              {/* Social proof line */}
              <p className="mx-auto mt-4 max-w-2xl text-sm font-medium text-slate-900 lg:mx-0">
                Already helping UK businesses save 8+ hours per week
              </p>

              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start">
                <Link
                  href="/audit"
                  className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-7 py-3.5 text-base font-semibold text-white shadow-[0_1px_6px_-1px_rgba(37,99,235,0.4)] transition-all duration-200 hover:bg-slate-900 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 group"
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
                  className="inline-flex items-center gap-2 rounded-full border-2 border-slate-200 bg-white px-7 py-3.5 text-base font-semibold text-slate-700 shadow-sm transition-all duration-200 hover:border-slate-900 hover:bg-slate-900 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
                >
                  View Services
                </Link>
              </div>
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
  { numeric: 8, suffix: "+", label: "Hours Saved Weekly", sublabel: "per client" },
  { numeric: 180, suffix: "", label: "Orders Automated", sublabel: "weekly at E'Manuel" },
  { numeric: 9, suffix: "", label: "Workflows Deployed", sublabel: "for one bakery" },
  { numeric: 14, suffix: "", label: "Day Delivery", sublabel: "audit to live" },
];

function SocialProofBar() {
  return (
    <div className="border-b border-t border-slate-100 bg-slate-50">
      <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
        <dl className="grid grid-cols-2 divide-x divide-slate-200 md:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center justify-center py-8 px-4 text-center"
            >
              <dt className="text-3xl font-bold text-blue-600 sm:text-4xl">
                <AnimatedCounter target={stat.numeric} suffix={stat.suffix} />
              </dt>
              <dd className="mt-1.5 text-sm text-slate-700 font-medium">{stat.label}</dd>
              {"sublabel" in stat && stat.sublabel && (
                <dd className="mt-0.5 text-xs text-slate-400">{stat.sublabel}</dd>
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
    description:
      "Automate repetitive tasks. Lead capture, email responses, appointment booking, follow-ups — all running on autopilot.",
    result: "8+ hours saved per week",
  },
  {
    icon: Globe,
    title: "Websites & Web Apps",
    description:
      "Professional websites and custom web apps that convert visitors into customers. Dashboards, booking portals, interactive tools — mobile-first, SEO-optimised, delivered in 10-14 days.",
    result: "Full web app delivered in 2 weeks",
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
    <section className="bg-blue-600/[0.03] py-28" aria-labelledby="services-heading">
      <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
        <AnimatedSection>
          <div className="flex flex-col items-center gap-4 text-center">
            <span className="eyebrow">What We Build</span>
            <h2
              id="services-heading"
              className="heading-section text-3xl sm:text-4xl lg:text-[56px]"
            >
              Real Tools. Real Results.
            </h2>
            <p className="max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
              We help small businesses save time, win more customers, and look
              professional — delivered fast and built to last.
            </p>
          </div>
        </AnimatedSection>

        {/* Category cards — bordered with hover inversion (Fliweel pattern) */}
        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {categories.map((cat, index) => {
            const Icon = cat.icon;
            return (
              <AnimatedSection key={cat.title} delay={0.1 * (index + 1)}>
                <div className="group flex h-full flex-col rounded-[30px] border-2 border-slate-900 bg-transparent p-8 transition-all duration-300 hover:bg-slate-900 hover:text-white cursor-pointer">
                  {/* Icon */}
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 group-hover:bg-blue-700/20 transition-colors duration-300">
                    <Icon
                      size={22}
                      className="text-blue-600 group-hover:text-blue-600 transition-colors duration-300"
                      aria-hidden="true"
                    />
                  </div>

                  {/* Title */}
                  <h3 className="mt-5 text-lg font-bold text-slate-900 group-hover:text-white transition-colors duration-300">
                    {cat.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600 group-hover:text-slate-300 transition-colors duration-300">
                    {cat.description}
                  </p>

                  {/* Result badge */}
                  <div className="mt-6">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 group-hover:border-emerald-500/30 group-hover:bg-emerald-500/10 group-hover:text-emerald-600 transition-colors duration-300">
                      {cat.result}
                    </span>
                  </div>

                  {/* Arrow link */}
                  <Link
                    href="/services"
                    className="group/link mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 group-hover:text-blue-600 transition-colors duration-200"
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

        <AnimatedSection delay={0.45}>
          <p className="mt-10 text-center text-sm text-slate-900">
            Packages from £500.{" "}
            <Link
              href="/services"
              className="inline-flex items-center gap-1 font-semibold text-blue-600 transition-colors duration-200 hover:text-blue-700 group"
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
      className="bg-white py-28"
      aria-labelledby="case-studies-heading"
    >
      <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
        <AnimatedSection>
          <div className="flex flex-col items-center gap-4 text-center">
            <span className="eyebrow">Proof It Works</span>
            <h2
              id="case-studies-heading"
              className="heading-section text-3xl sm:text-4xl lg:text-[56px]"
            >
              Real Results for Real Businesses
            </h2>
            <p className="max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg">
              Not case studies written for marketing — actual numbers from live
              clients.
            </p>
          </div>
        </AnimatedSection>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {caseStudies.map((study, index) => (
            <AnimatedSection key={study.slug} delay={0.15 * (index + 1)}>
              <Link
                href={`/case-studies/${study.slug}`}
                className="group flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:border-blue-200 hover:shadow-lg card-hover"
              >
                <div>
                  {/* Industry tag */}
                  <span className="inline-block rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-600">
                    {study.industry}
                  </span>

                  {/* Hero stat */}
                  <div className="mt-6">
                    <p className="text-5xl font-bold tracking-tight text-slate-900 lg:text-6xl">
                      {study.heroStat}
                    </p>
                    <p className="mt-1.5 text-base font-semibold text-blue-600">
                      {study.heroLabel}
                    </p>
                  </div>

                  {/* Business name + location */}
                  <h3 className="mt-5 text-xl font-semibold text-slate-900">
                    {study.name}
                  </h3>
                  <p className="mt-1 text-sm text-slate-900">{study.location}</p>

                  {/* Summary */}
                  <p className="mt-4 text-sm leading-relaxed text-slate-600 line-clamp-2">
                    {study.solution}
                  </p>
                </div>

                <div className="mt-8 inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 transition-colors duration-200 group-hover:text-blue-700">
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

        <AnimatedSection delay={0.4}>
          <p className="mt-10 text-center">
            <Link
              href="/case-studies"
              className="group inline-flex items-center gap-1.5 text-sm font-medium text-slate-900 transition-colors duration-200 hover:text-slate-700"
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
    <section className="bg-slate-50 py-28" aria-labelledby="guarantee-heading">
      <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
        <AnimatedSection>
          <div className="mx-auto max-w-2xl rounded-2xl border-2 border-emerald-200 bg-white p-8 sm:p-10 text-center shadow-sm">
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 border border-emerald-200">
              <ShieldCheck
                size={28}
                className="text-emerald-600"
                aria-hidden="true"
              />
            </div>
            <h2
              id="guarantee-heading"
              className="heading-section text-2xl sm:text-3xl"
            >
              90-Day Results Guarantee
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600">
              If you don&apos;t save at least 5 hours per week within 90 days,
              we&apos;ll refund your setup fee. No questions asked.
            </p>
            <p className="mt-3 text-sm font-semibold text-emerald-600">
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
    title: "Your Dashboard. 60 Seconds a Day.",
    description:
      "You get a real-time dashboard showing exactly what your business is doing. Check it in 60 seconds each morning — we handle everything behind the scenes.",
    icon: TrendingUp,
  },
];

function HowItWorks() {
  return (
    <section
      className="bg-white py-28"
      aria-labelledby="how-it-works-heading"
    >
      <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
        <AnimatedSection>
          <div className="flex flex-col items-center gap-4 text-center">
            <span className="eyebrow">How It Works</span>
            <h2
              id="how-it-works-heading"
              className="heading-section text-3xl sm:text-4xl lg:text-[56px]"
            >
              From conversation to live automation
            </h2>
            <p className="max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg">
              A structured 4-step process that gets you live in under two weeks.
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
                  <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-xl border border-slate-200 bg-white shadow-sm">
                    <Icon
                      size={20}
                      className="text-blue-600"
                      aria-hidden="true"
                    />
                  </div>

                  {/* Step number */}
                  <span className="mt-4 text-xs font-bold tracking-widest text-slate-400">
                    {step.number}
                  </span>

                  <h3 className="mt-2 text-base font-semibold text-slate-900">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
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
    "AI automation, professional websites, custom web apps, and AI training for small businesses. We help SMBs save time and grow with intelligent automation — delivered in 7-14 days.",
  "url": "https://oladipupoconsulting.co.uk",
  "email": "hello@oladipupoconsulting.co.uk",
  "telephone": "+447469347654",
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "GB",
  },
  "priceRange": "£500 - £3,500",
  "areaServed": "Worldwide",
  "serviceType": ["AI Automation", "Website Development", "Web App Development", "AI Training"],
  "founder": {
    "@type": "Person",
    "name": "Olushola Oladipupo",
  },
  "sameAs": [
    "https://linkedin.com/in/olushola-oladipupo/",
    "https://linkedin.com/company/oladipupo-consulting"
  ],
};

const homepageFAQs: FAQItem[] = [
  {
    question: "What is AI automation for small businesses?",
    answer:
      "AI automation uses artificial intelligence to handle repetitive business tasks — things like responding to enquiries, booking appointments, sending follow-ups, and managing orders. Instead of hiring extra staff, you deploy AI systems that run 24/7 and free your team to focus on higher-value work.",
  },
  {
    question: "How much does AI automation cost for a small business in the UK?",
    answer:
      "Our packages start from £500 for a single automation workflow, with monthly retainers from £50. Most small businesses see a return on investment within the first month through time savings alone. We offer a free AI readiness audit so you can see the potential impact before spending anything.",
  },
  {
    question: "Do I need technical skills to use AI automation?",
    answer:
      "Not at all. We handle the entire setup, configuration, and training. Once your system is live, you interact with a simple dashboard — no coding or technical knowledge required. We also provide full documentation and standard operating procedures so your team can manage everything confidently.",
  },
  {
    question: "How long does it take to set up AI automation?",
    answer:
      "Most of our automation systems are delivered within 14 days, from audit to going live. We start with a free audit that maps your business processes and identifies the highest-impact opportunities.",
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

export default function HomePage() {
  return (
    <>
      <JsonLd data={businessJsonLd} />
      <Hero />
      <SocialProofBar />
      <WhatWeBuild />
      <CaseStudiesPreview />
      <ResultsGuarantee />
      <HowItWorks />
      <section className="bg-slate-50 py-28">
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
      <NewsletterSignup />
      <PersonalisedCTA />
    </>
  );
}
