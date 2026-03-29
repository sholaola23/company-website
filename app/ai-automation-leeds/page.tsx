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

const CITY = "Leeds";
const SLUG = "ai-automation-leeds";
const CANONICAL = `https://oladipupoconsulting.co.uk/${SLUG}`;

export const metadata: Metadata = {
  title: `AI Automation for Small Businesses in ${CITY}`,
  description: `AI automation services for small businesses in ${CITY}. Automate lead capture, appointment booking, customer follow-up, and more. 14-day delivery. Free AI readiness audit.`,
  keywords: [
    `${CITY} AI automation`,
    `AI automation ${CITY} small business`,
    `${CITY} business automation`,
    "AI lead capture Leeds",
    "appointment booking automation Leeds",
    "small business AI Leeds",
    "AI consultancy Leeds",
    "Yorkshire business automation",
  ],
  alternates: {
    canonical: CANONICAL,
  },
  openGraph: {
    title: `AI Automation for Small Businesses in ${CITY}`,
    description: `AI automation services for small businesses in ${CITY}. Automate lead capture, appointment booking, customer follow-up, and more.`,
    url: CANONICAL,
    type: "website",
  },
  twitter: {
    title: `AI Automation for Small Businesses in ${CITY}`,
    description: `AI automation services for small businesses in ${CITY}. Automate lead capture, appointment booking, customer follow-up, and more.`,
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
    title: "14-Day Build",
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
      "Leeds is Yorkshire's economic powerhouse with a fast-growing service sector. Capture every website lead, qualify them with AI, and book appointments automatically — giving you the speed advantage over local competitors.",
    href: "/services/lead-intake",
  },
  {
    title: "AI Email Assistant",
    description:
      "From estate agents in Headingley to fitness studios in the city centre, Leeds businesses deal with high email volumes. AI drafts professional replies in seconds so you can focus on delivering your service.",
    href: "/services/email-assistant",
  },
  {
    title: "SEO Content Automation",
    description:
      "Dominate local search results in Leeds and across West Yorkshire. Publish optimised blog posts and service area pages automatically to attract more organic traffic.",
    href: "/services/seo-content",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Oladipupo Consulting Ltd",
  "description": `AI automation services for small businesses in ${CITY}. Lead capture, appointment booking, email management, and SEO content automation.`,
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

export default function AIAutomationLeedsPage() {
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
            Leeds has emerged as one of the UK&apos;s fastest-growing cities for
            small business, with a thriving service economy spanning health and
            beauty, property, trades, and professional services. But growth
            brings more enquiries, more admin, and more things slipping through
            the cracks. We build AI automation systems that handle the repetitive
            work — delivered in 14 days, starting from £500.
          </p>
        </div>
      </AnimatedSection>

      {/* Why Leeds Businesses Choose AI Automation */}
      <AnimatedSection delay={0.1}>
        <section className="mb-20 sm:mb-24" aria-labelledby="why-leeds-heading">
          <div className="mb-12">
            <SectionHeading
              eyebrow="The Leeds Opportunity"
              heading="Why Leeds Businesses Choose AI Automation"
              align="center"
            />
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            <p className="text-sm text-slate-600 leading-relaxed">
              Leeds has quietly become one of the UK&apos;s most important
              business cities. It&apos;s the largest centre for financial and
              professional services outside London, home to major legal firms,
              banks, and insurance companies. But beyond the corporate skyline,
              Leeds supports a thriving ecosystem of small businesses — from
              independent health and beauty studios in Chapel Allerton to
              trades firms across the wider West Yorkshire region. These
              businesses are the backbone of the local economy, and
              increasingly, they&apos;re turning to AI to stay competitive.
            </p>
            <p className="text-sm text-slate-600 leading-relaxed">
              The Leeds City Region contributes over £70 billion to the
              UK economy annually, yet many small businesses here still rely on
              manual processes that were designed for a slower era. Estate
              agents in Headingley lose leads because they can&apos;t respond
              fast enough between viewings. Dental practices in Roundhay spend
              hours on appointment confirmations that could be automated.
              Trades businesses across Pudsey, Morley, and Horsforth waste
              evenings writing quotes instead of spending time with their
              families. These are the problems AI automation solves — not with
              complex enterprise software, but with focused, practical systems
              that work from day one.
            </p>
            <p className="text-sm text-slate-600 leading-relaxed">
              Leeds businesses value straight talking and fair dealing.
              That&apos;s why our approach — fixed pricing, 14-day delivery,
              no ongoing lock-in — resonates so well with Yorkshire business
              owners. You see exactly what you&apos;re getting, you see it
              working within a week, and you only continue paying if the
              results justify it.
            </p>
          </div>
        </section>
      </AnimatedSection>

      {/* Local Industries We Serve in Leeds */}
      <AnimatedSection delay={0.15}>
        <section className="mb-20 sm:mb-24" aria-labelledby="industries-leeds-heading">
          <div className="mb-12">
            <SectionHeading
              eyebrow={`Serving ${CITY}'s Key Sectors`}
              heading="Local Industries We Serve in Leeds"
              align="center"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {[
              { name: "Legal & Financial Services", description: "Law firms, mortgage brokers, and financial advisers across the city centre automating client onboarding, document workflows, and compliance tracking." },
              { name: "Property & Lettings", description: "Estate agents and letting agencies in Headingley, Meanwood, and Horsforth automating viewing bookings, tenant enquiries, and reference chasing." },
              { name: "Health & Beauty", description: "Salons, barbershops, and aesthetic clinics in Chapel Allerton and the city centre automating appointment scheduling and client retention campaigns." },
              { name: "Construction & Trades", description: "Builders, plumbers, and electricians across West Yorkshire automating quote requests, job scheduling, and invoice follow-up." },
              { name: "Healthcare & Dental", description: "Private dental practices, physiotherapists, and specialist clinics in Roundhay and Oakwood automating patient booking and recall reminders." },
              { name: "Education & Universities", description: "Private tutors, student accommodation providers, and training companies near the University of Leeds automating enquiry management and enrolment." },
              { name: "Hospitality & Events", description: "Independent restaurants, bars, and event venues across the city automating reservations, event enquiries, and supplier coordination." },
              { name: "Digital & Marketing Agencies", description: "Growing creative agencies in the Leeds Digital District automating client reporting, content scheduling, and project intake." },
            ].map((industry) => (
              <div
                key={industry.name}
                className="bg-slate-50 border border-slate-200 rounded-xl p-5 hover:border-slate-200 transition-colors duration-200"
              >
                <h3 className="text-sm font-semibold text-slate-900 mb-2">
                  {industry.name}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {industry.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      </AnimatedSection>

      {/* Services */}
      <AnimatedSection delay={0.2}>
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
      <AnimatedSection delay={0.3}>
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
      <AnimatedSection delay={0.4}>
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 sm:p-10 max-w-3xl mx-auto mb-20 sm:mb-24 text-center">
          <p className="text-sm text-slate-600 leading-relaxed">
            Already helping businesses across Yorkshire and the wider UK
            automate their operations. From lead intake systems to AI content
            engines, we deliver solutions that pay for themselves within weeks.
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
      <AnimatedSection delay={0.5}>
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
