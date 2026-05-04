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

const CITY = "Liverpool";
const SLUG = "ai-automation-liverpool";
const CANONICAL = `https://workcrew.io/${SLUG}`;

export const metadata: Metadata = {
  title: `AI Automation for Small Businesses in ${CITY}`,
  description: `AI automation services for small businesses in ${CITY}. Automate lead capture, appointment booking, email management, and more. Free AI readiness audit.`,
  keywords: [
    "Liverpool AI automation",
    "AI automation Liverpool small business",
    "Liverpool business automation",
    "AI automation agency Liverpool",
  ],
  alternates: {
    canonical: CANONICAL,
  },
  openGraph: {
    images: [{ url: "https://workcrew.io/api/og", width: 1200, height: 630 }],
    title: `AI Automation for Small Businesses in ${CITY}`,
    description: `AI automation services for small businesses in ${CITY}. Automate lead capture, appointment booking, email management, and more.`,
    url: CANONICAL,
    type: "website",
  },
  twitter: {
    title: `AI Automation for Small Businesses in ${CITY}`,
    description: `AI automation services for small businesses in ${CITY}. Automate lead capture, appointment booking, email management, and more.`,
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
      "Capture leads from your website, qualify them automatically, and book appointments into your calendar — without lifting a finger. Perfect for Liverpool's 20,000+ SMBs, from Bold Street hospitality venues to trades businesses across Merseyside.",
    href: "/services/lead-intake",
  },
  {
    title: "AI Email Assistant",
    description:
      "Draft professional replies to customer emails in seconds. Your inbox stays under control even during Liverpool's busiest periods — matchday weekends, festival season, and the constant flow of enquiries across the city region.",
    href: "/services/email-assistant",
  },
  {
    title: "SEO Content Automation",
    description:
      "Publish locally optimised blog posts and landing pages on autopilot. Rank higher in local search results and attract more Liverpool and Merseyside customers to your business.",
    href: "/services/seo-content",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "WorkCrew Ltd",
  "description": `AI automation services for small businesses in ${CITY}. Lead capture, appointment booking, email management, and content automation.`,
  "url": CANONICAL,
  "telephone": "+447469347654",
  "email": "hello@workcrew.io",
  "areaServed": {
    "@type": "City",
    "name": CITY,
    "containedInPlace": {
      "@type": "Country",
      "name": "United Kingdom",
    },
  },
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "GB",
  },
  "sameAs": ["https://workcrew.io"],
};

export default function AIAutomationLiverpoolPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
      <JsonLd data={jsonLd} />

      {/* Hero */}
      <AnimatedSection>
        <div className="max-w-3xl mx-auto text-center mb-16 sm:mb-20">
          <span className="text-xs font-semibold tracking-widest uppercase text-blue-600 mb-4 block">
            AI Automation in {CITY}
          </span>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-[-0.03em] text-slate-900 leading-tight tracking-tight mb-6">
            AI Automation for Small Businesses in {CITY}
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed">
            Liverpool&apos;s economy is regenerating fast, and over 20,000 small
            businesses are driving it — from Bold Street&apos;s thriving
            hospitality scene to trades businesses right across Merseyside. The
            businesses pulling ahead are the ones responding faster, following up
            automatically, and letting AI handle the admin. We build those
            systems — tailored to your business and ready to deliver results.
          </p>
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
                className="bg-slate-50 border border-slate-200 rounded-xl p-7 flex flex-col gap-4 hover:border-slate-200 transition-colors duration-200"
              >
                <h3 className="text-base font-semibold text-slate-900">
                  {service.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed flex-1">
                  {service.description}
                </p>
                <Link
                  href={service.href}
                  className="text-sm text-blue-600 hover:text-blue-600 transition-colors font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded w-fit"
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
              eyebrow="Our Process"
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
                  className="bg-slate-50 border border-slate-200 rounded-xl p-6 flex flex-col gap-4 hover:border-slate-200 transition-colors duration-200"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-blue-600/10 border border-blue-600/20">
                      <Icon
                        size={18}
                        className="text-blue-600"
                        aria-hidden="true"
                      />
                    </div>
                    <span className="text-2xl font-bold text-slate-600 font-mono">
                      {step.step}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-slate-900 mb-2">
                      {step.title}
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
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
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 sm:p-10 max-w-3xl mx-auto mb-20 sm:mb-24 text-center">
          <p className="text-sm text-slate-600 leading-relaxed">
            Already helping businesses across the North West automate their
            operations. From lead intake systems to AI content engines,
            most pay for themselves within weeks.
          </p>
          <div className="flex items-center justify-center gap-2 mt-4">
            <CheckCircle
              size={16}
              className="text-blue-600"
              aria-hidden="true"
            />
            <span className="text-sm font-medium text-slate-500">
              UK-registered company. Real results. Real references.
            </span>
          </div>
        </div>
      </AnimatedSection>

      {/* CTA */}
      <AnimatedSection delay={0.4}>
        <div className="text-center">
          <div className="inline-flex flex-col items-center gap-4">
            <p className="text-slate-600 text-base">
              Ready to automate your {CITY} business?
            </p>
            <CTAButton href="/audit" variant="primary" size="lg">
              Get Your Free AI Audit
            </CTAButton>
            <p className="text-xs text-slate-400">
              48-hour turnaround. No obligation. No jargon.
            </p>
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
}
