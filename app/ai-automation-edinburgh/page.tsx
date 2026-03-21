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

const CITY = "Edinburgh";
const SLUG = "ai-automation-edinburgh";
const CANONICAL = `https://oladipupoconsulting.co.uk/${SLUG}`;

export const metadata: Metadata = {
  title: `AI Automation for Small Businesses in ${CITY}`,
  description: `AI automation services for small businesses in ${CITY}. Automate lead capture, appointment booking, email management, and more. 7-day delivery. Free AI readiness audit.`,
  keywords: [
    "Edinburgh AI automation",
    "AI automation Edinburgh small business",
    "Edinburgh business automation",
    "AI consultancy Edinburgh",
    "Scotland AI automation",
  ],
  alternates: {
    canonical: CANONICAL,
  },
  openGraph: {
    title: `AI Automation for Small Businesses in ${CITY}`,
    description: `AI automation services for small businesses in ${CITY}. Automate lead capture, appointment booking, email management, and more.`,
    url: CANONICAL,
    type: "website",
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
    title: "7-Day Build",
    description:
      "We build and deploy your automation in a focused sprint with full documentation and SOPs.",
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
      "Capture leads from your website, qualify them automatically, and book appointments into your calendar — without lifting a finger. Perfect for Edinburgh's 30,000+ small businesses, from Royal Mile tourism operators to Leith hospitality venues.",
    href: "/services/lead-intake",
  },
  {
    title: "AI Email Assistant",
    description:
      "Draft professional replies to customer emails in seconds. Your inbox stays under control even during Edinburgh's peak seasons — Festival Fringe, Hogmanay, and the year-round flow of tourism and financial services enquiries.",
    href: "/services/email-assistant",
  },
  {
    title: "SEO Content Automation",
    description:
      "Publish locally optimised blog posts and landing pages on autopilot. Rank higher in local search results and attract more Edinburgh customers across Scotland and beyond.",
    href: "/services/seo-content",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Oladipupo Consulting Ltd",
  "description": `AI automation services for small businesses in ${CITY}. Lead capture, appointment booking, email management, and content automation.`,
  "url": CANONICAL,
  "telephone": "+447469347654",
  "email": "hello@oladipupoconsulting.co.uk",
  "areaServed": {
    "@type": "City",
    "name": CITY,
    "containedInPlace": {
      "@type": "Country",
      "name": "United Kingdom",
    },
  },
  "priceRange": "$$",
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "GB",
  },
  "sameAs": ["https://oladipupoconsulting.co.uk"],
};

export default function AIAutomationEdinburghPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
      <JsonLd data={jsonLd} />

      {/* Hero */}
      <AnimatedSection>
        <div className="max-w-3xl mx-auto text-center mb-16 sm:mb-20">
          <span className="text-xs font-semibold tracking-widest uppercase text-blue-500 mb-4 block">
            AI Automation in {CITY}
          </span>
          <h1 className="text-3xl sm:text-5xl font-bold text-zinc-50 leading-tight tracking-tight mb-6">
            AI Automation for Small Businesses in {CITY}
          </h1>
          <p className="text-lg text-zinc-400 leading-relaxed">
            Edinburgh is home to over 30,000 small businesses — from Royal Mile
            tourism operators and Leith&apos;s buzzing hospitality scene to the
            city&apos;s established financial services hub. The businesses
            pulling ahead are the ones responding faster, following up
            automatically, and letting AI handle the admin. We build those
            systems — delivered in 7 days, starting from {"\u00A3"}500.
          </p>
        </div>
      </AnimatedSection>

      {/* Services */}
      <AnimatedSection delay={0.1}>
        <section className="mb-20 sm:mb-24" aria-labelledby="services-heading">
          <div className="mb-12">
            <SectionHeading
              eyebrow={`Top Solutions for ${CITY} Businesses`}
              heading="Services That Drive Results"
              align="center"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {SERVICES.map((service) => (
              <div
                key={service.title}
                className="bg-zinc-900 border border-zinc-800 rounded-xl p-7 flex flex-col gap-4 hover:border-zinc-700 transition-colors duration-200"
              >
                <h3 className="text-base font-semibold text-zinc-50">
                  {service.title}
                </h3>
                <p className="text-sm text-zinc-400 leading-relaxed flex-1">
                  {service.description}
                </p>
                <Link
                  href={service.href}
                  className="text-sm text-blue-400 hover:text-blue-300 transition-colors font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded w-fit"
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
                  className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 flex flex-col gap-4 hover:border-zinc-700 transition-colors duration-200"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/20">
                      <Icon
                        size={18}
                        className="text-blue-400"
                        aria-hidden="true"
                      />
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
      </AnimatedSection>

      {/* Social proof */}
      <AnimatedSection delay={0.3}>
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 sm:p-10 max-w-3xl mx-auto mb-20 sm:mb-24 text-center">
          <p className="text-sm text-zinc-400 leading-relaxed">
            Already helping businesses across Scotland automate their
            operations. From lead intake systems to AI-powered content engines,
            we deliver solutions that pay for themselves within weeks.
          </p>
          <div className="flex items-center justify-center gap-2 mt-4">
            <CheckCircle
              size={16}
              className="text-blue-400"
              aria-hidden="true"
            />
            <span className="text-sm font-medium text-zinc-300">
              UK-registered company. Real results. Real references.
            </span>
          </div>
        </div>
      </AnimatedSection>

      {/* CTA */}
      <AnimatedSection delay={0.4}>
        <div className="text-center">
          <div className="inline-flex flex-col items-center gap-4">
            <p className="text-zinc-400 text-base">
              Ready to automate your {CITY} business?
            </p>
            <CTAButton href="/audit" variant="primary" size="lg">
              Get Your Free AI Audit
            </CTAButton>
            <p className="text-xs text-zinc-500">
              48-hour turnaround. No obligation. No jargon.
            </p>
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
}
