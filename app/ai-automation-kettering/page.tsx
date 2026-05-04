import type { Metadata } from "next";
import Link from "next/link";
import {
  CheckCircle,
  FileSearch,
  Zap,
  RefreshCw,
  ClipboardCheck,
} from "lucide-react";
import SectionHeading from "@/components/shared/SectionHeading";
import CTAButton from "@/components/shared/CTAButton";
import AnimatedSection from "@/components/shared/AnimatedSection";
import JsonLd from "@/components/shared/JsonLd";

const CITY = "Kettering";
const SLUG = "ai-automation-kettering";
const CANONICAL = `https://workcrew.io/${SLUG}`;

export const metadata: Metadata = {
  title: `AI Automation for Small Businesses in ${CITY}`,
  description: `AI automation services for small businesses in ${CITY} and Northamptonshire. Automate lead capture, order processing, appointment booking, and more. Free AI readiness audit.`,
  keywords: [
    `${CITY} AI automation`,
    `AI automation ${CITY} small business`,
    `${CITY} business automation`,
    "AI Northamptonshire",
    "small business AI Kettering",
    "AI automation agency Kettering",
    "Northamptonshire business automation",
  ],
  alternates: {
    canonical: CANONICAL,
  },
  openGraph: {
    images: [{ url: "https://workcrew.io/api/og", width: 1200, height: 630 }],
    title: `AI Automation for Small Businesses in ${CITY}`,
    description: `AI automation services for small businesses in ${CITY} and Northamptonshire. Automate lead capture, order processing, appointment booking, and more.`,
    url: CANONICAL,
    type: "website",
  },
  twitter: {
    title: `AI Automation for Small Businesses in ${CITY}`,
    description: `AI automation services for small businesses in ${CITY} and Northamptonshire. Automate lead capture, order processing, appointment booking, and more.`,
  },
};

const HOW_IT_WORKS = [
  {
    icon: FileSearch,
    step: "01",
    title: "Free AI Audit",
    description:
      "We analyse your current workflows and identify the biggest time-wasters costing your business money.",
  },
  {
    icon: ClipboardCheck,
    step: "02",
    title: "Clear Proposal",
    description:
      "You receive a specific solution with exact deliverables, timeline, and projected ROI. No vague consulting.",
  },
  {
    icon: Zap,
    step: "03",
    title: "Fast Delivery",
    description:
      "We build and launch your automation quickly so you see results fast — with full documentation and SOPs.",
  },
  {
    icon: RefreshCw,
    step: "04",
    title: "Monthly Optimisation",
    description:
      "We monitor performance, fix issues, and improve the system every month. It gets better over time.",
  },
];

const SERVICES = [
  {
    title: "AI Lead Intake & Appointment Booking",
    description:
      "Kettering's growing service sector — from salons and barbers to trades and cleaning companies — depends on fast lead response. Capture enquiries, qualify them with AI, and book appointments automatically.",
    href: "/services/lead-intake",
  },
  {
    title: "AI Order & Loyalty Automation",
    description:
      "Perfect for Kettering's food businesses and retail shops. Automate order processing, send personalised loyalty rewards based on purchase history, and keep customers coming back.",
    href: "/services/lead-intake",
  },
  {
    title: "WhatsApp Customer Bot",
    description:
      "Give your Kettering customers a direct line to your business via WhatsApp. Answer FAQs, take bookings, and handle common requests without adding to your workload.",
    href: "/services/whatsapp-bot",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "WorkCrew Ltd",
  "description": `AI automation services for small businesses in ${CITY} and Northamptonshire. Lead capture, order processing, appointment booking, and WhatsApp bots.`,
  "url": CANONICAL,
  "telephone": "+447469347654",
  "email": "hello@workcrew.io",
  "areaServed": {
    "@type": "City",
    "name": CITY,
    "containedInPlace": {
      "@type": "AdministrativeArea",
      "name": "Northamptonshire",
      "containedInPlace": {
        "@type": "Country",
        "name": "United Kingdom",
      },
    },
  },
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "GB",
  },
  "sameAs": ["https://workcrew.io"],
};

export default function AIAutomationKetteringPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
      <JsonLd data={jsonLd} />

      {/* Hero */}
      <AnimatedSection>
        <div className="max-w-3xl mx-auto text-center mb-16 sm:mb-20">
          <span className="text-xs font-semibold tracking-widest uppercase text-[var(--color-primary)] mb-4 block">
            AI Automation in {CITY}
          </span>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-[-0.03em] text-[var(--color-heading)] leading-tight tracking-tight mb-6">
            AI Automation for Small Businesses in {CITY}
          </h1>
          <p className="text-lg text-[var(--color-body)] leading-relaxed">
            Kettering&apos;s growing service sector and tight-knit business
            community make it the perfect place for AI automation to have an
            outsized impact. When every lead matters and word-of-mouth drives
            your reputation, you can&apos;t afford slow responses or missed
            follow-ups. We build those systems — tailored to your business and
            ready to deliver results.
          </p>
        </div>
      </AnimatedSection>

      {/* Case study callout */}
      <AnimatedSection delay={0.05}>
        <div className="bg-[var(--color-bg-alt)] border border-[var(--color-primary)]/30 rounded-2xl p-8 sm:p-10 max-w-3xl mx-auto mb-16 sm:mb-20">
          <span className="text-xs font-semibold tracking-widest uppercase text-[var(--color-primary)] mb-3 block">
            Local Case Study
          </span>
          <h2 className="text-xl font-bold text-[var(--color-heading)] mb-3">
            E&apos;Manuel Bakery, Kettering
          </h2>
          <p className="text-sm text-[var(--color-body)] leading-relaxed mb-4">
            We built an loyalty and order automation system for
            E&apos;Manuel Bakery right here in Kettering. The system tracks
            customer purchases via their POS, automatically sends personalised
            loyalty rewards, and handles tier-based promotions — saving hours of
            manual work every week.
          </p>
          <Link
            href="/case-studies"
            className="text-sm text-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] rounded"
          >
            View our case studies
          </Link>
        </div>
      </AnimatedSection>

      {/* Services */}
      <AnimatedSection delay={0.1}>
        <section className="mb-20 sm:mb-24" aria-labelledby="services-heading">
          <div className="mb-12">
            <SectionHeading
              eyebrow={`What we run for ${CITY} Businesses`}
              heading="What we ship"
              align="center"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {SERVICES.map((service) => (
              <div
                key={service.title}
                className="bg-[var(--color-bg-alt)] border border-[var(--color-border)] rounded-xl p-7 flex flex-col gap-4 hover:border-[var(--color-border)] transition-colors duration-200"
              >
                <h3 className="text-base font-semibold text-[var(--color-heading)]">
                  {service.title}
                </h3>
                <p className="text-sm text-[var(--color-body)] leading-relaxed flex-1">
                  {service.description}
                </p>
                <Link
                  href={service.href}
                  className="text-sm text-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] rounded w-fit"
                >
                  Learn more
                </Link>
              </div>
            ))}
          </div>
        </section>
      </AnimatedSection>

      {/* How It Works */}
      <AnimatedSection delay={0.2}>
        <section className="mb-20 sm:mb-24" aria-labelledby="how-heading">
          <div className="mb-12">
            <SectionHeading
              eyebrow="Our process"
              heading="How It Works"
              align="center"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
            {HOW_IT_WORKS.map((step) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.step}
                  className="bg-[var(--color-bg-alt)] border border-[var(--color-border)] rounded-xl p-6 flex flex-col gap-4 hover:border-[var(--color-border)] transition-colors duration-200"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/20">
                      <Icon
                        size={18}
                        className="text-[var(--color-primary)]"
                        aria-hidden="true"
                      />
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
      </AnimatedSection>

      {/* Social proof */}
      <AnimatedSection delay={0.3}>
        <div className="bg-[var(--color-bg-alt)] border border-[var(--color-border)] rounded-2xl p-8 sm:p-10 max-w-3xl mx-auto mb-20 sm:mb-24 text-center">
          <p className="text-sm text-[var(--color-body)] leading-relaxed">
            Already helping businesses in Kettering and across Northamptonshire
            automate their operations. From bakery loyalty systems to lead
            intake automation, most pay for themselves
            within weeks.
          </p>
          <div className="flex items-center justify-center gap-2 mt-4">
            <CheckCircle
              size={16}
              className="text-[var(--color-primary)]"
              aria-hidden="true"
            />
            <span className="text-sm font-medium text-[var(--color-muted)]">
              UK-registered company. Real results. Real references.
            </span>
          </div>
        </div>
      </AnimatedSection>

      {/* CTA */}
      <AnimatedSection delay={0.4}>
        <div className="text-center">
          <div className="inline-flex flex-col items-center gap-4">
            <p className="text-[var(--color-body)] text-base">
              Ready to automate your {CITY} business?
            </p>
            <CTAButton href="/audit" variant="primary" size="lg">
              Get Your Free AI Audit
            </CTAButton>
            <p className="text-xs text-[var(--color-muted)]">
              48-hour turnaround. No obligation. No jargon.
            </p>
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
}
