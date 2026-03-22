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

const CITY = "London";
const SLUG = "ai-automation-london";
const CANONICAL = `https://oladipupoconsulting.co.uk/${SLUG}`;

export const metadata: Metadata = {
  title: `AI Automation for Small Businesses in ${CITY}`,
  description: `AI automation services for small businesses in ${CITY}. Automate lead capture, appointment booking, email management, and more. 7-day delivery. Free AI readiness audit.`,
  keywords: [
    `${CITY} AI automation`,
    `AI automation ${CITY} small business`,
    `${CITY} business automation`,
    "AI lead capture London",
    "appointment booking automation London",
    "small business AI London",
    "AI consultancy London",
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
      "Capture leads from your website, qualify them automatically, and book appointments into your calendar — without lifting a finger. Perfect for London service businesses handling high volumes of enquiries.",
    href: "/services/lead-intake",
  },
  {
    title: "AI Email Assistant",
    description:
      "Draft professional replies to customer emails in seconds. Your inbox stays under control even during peak trading hours across the capital.",
    href: "/services/email-assistant",
  },
  {
    title: "SEO Content Automation",
    description:
      "Publish locally optimised blog posts and landing pages on autopilot. Rank higher in local search results and attract more London customers.",
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

export default function AIAutomationLondonPage() {
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
            London is home to over 500,000 small businesses competing for
            attention in one of the world&apos;s most dynamic markets. From
            salons in Shoreditch to tradespeople in Croydon, the businesses
            winning are the ones responding faster, following up automatically,
            and letting AI handle the admin. We build those systems — delivered
            in 7 days, starting from £500.
          </p>
        </div>
      </AnimatedSection>

      {/* Why London Businesses Choose AI Automation */}
      <AnimatedSection delay={0.1}>
        <section className="mb-20 sm:mb-24" aria-labelledby="why-london-heading">
          <div className="mb-12">
            <SectionHeading
              eyebrow="The London Advantage"
              heading="Why London Businesses Choose AI Automation"
              align="center"
            />
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            <p className="text-sm text-zinc-400 leading-relaxed">
              London&apos;s economy is uniquely demanding. With over 1 million
              registered businesses competing across 32 boroughs, response speed
              is everything. A potential customer in Canary Wharf who fills in a
              contact form at 7pm expects a reply before their commute home ends
              — not the next morning. From financial services firms in the City
              to independent retailers on Columbia Road, the capital rewards
              businesses that communicate faster and more consistently than
              their rivals.
            </p>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Yet many London SMBs are caught in a productivity trap. High rents
              and staffing costs mean teams are stretched thin, handling
              everything from lead follow-up to invoicing manually. The result
              is missed enquiries during peak hours, slow email turnaround, and
              marketing that only happens when there&apos;s a quiet week — which
              in London, rarely comes. AI automation breaks this cycle by
              handling time-sensitive tasks around the clock, so your team can
              focus on the high-value work that actually grows revenue.
            </p>
            <p className="text-sm text-zinc-400 leading-relaxed">
              London&apos;s diversity is also a strength. A Hackney-based design
              studio faces completely different operational bottlenecks compared
              to an estate agency in Richmond or a dental practice in Harley
              Street. That&apos;s why we tailor every automation to the specific
              workflows your business relies on, rather than offering a
              one-size-fits-all template. The goal is simple: give London
              businesses enterprise-level responsiveness on an SMB budget.
            </p>
          </div>
        </section>
      </AnimatedSection>

      {/* Local Industries We Serve in London */}
      <AnimatedSection delay={0.15}>
        <section className="mb-20 sm:mb-24" aria-labelledby="industries-london-heading">
          <div className="mb-12">
            <SectionHeading
              eyebrow={`Serving ${CITY}'s Key Sectors`}
              heading="Local Industries We Serve in London"
              align="center"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {[
              { name: "Financial & Professional Services", description: "Accountants, solicitors, and consultants across the City and Canary Wharf streamlining client onboarding and document workflows." },
              { name: "Property & Estate Agencies", description: "Lettings and sales agents in zones 1-6 automating viewings, tenant enquiries, and compliance paperwork." },
              { name: "Health & Wellness", description: "Private clinics on Harley Street, dental practices, and physiotherapists automating appointment booking and patient follow-up." },
              { name: "Creative & Design Agencies", description: "Shoreditch and Soho studios automating briefs intake, project scheduling, and client communication." },
              { name: "Hospitality & Food Service", description: "Restaurants, catering companies, and event venues across the capital managing reservations and supplier orders." },
              { name: "E-commerce & Retail", description: "Independent retailers and DTC brands automating customer support, returns processing, and inventory alerts." },
              { name: "Construction & Trades", description: "Builders, electricians, and plumbers across Greater London automating quote requests and job scheduling." },
              { name: "Education & Tutoring", description: "Private tutors, language schools, and training providers automating enrolment and session booking." },
            ].map((industry) => (
              <div
                key={industry.name}
                className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 hover:border-zinc-700 transition-colors duration-200"
              >
                <h3 className="text-sm font-semibold text-zinc-50 mb-2">
                  {industry.name}
                </h3>
                <p className="text-xs text-zinc-500 leading-relaxed">
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
      <AnimatedSection delay={0.4}>
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 sm:p-10 max-w-3xl mx-auto mb-20 sm:mb-24 text-center">
          <p className="text-sm text-zinc-400 leading-relaxed">
            Already helping businesses across the South East automate their
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
      <AnimatedSection delay={0.5}>
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
