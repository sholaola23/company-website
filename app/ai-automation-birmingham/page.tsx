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

const CITY = "Birmingham";
const SLUG = "ai-automation-birmingham";
const CANONICAL = `https://oladipupoconsulting.co.uk/${SLUG}`;

export const metadata: Metadata = {
  title: `AI Automation for Small Businesses in ${CITY}`,
  description: `AI automation services for small businesses in ${CITY}. Automate lead capture, appointment booking, customer communications, and more. 7-day delivery. Free AI readiness audit.`,
  keywords: [
    `${CITY} AI automation`,
    `AI automation ${CITY} small business`,
    `${CITY} business automation`,
    "AI lead capture Birmingham",
    "appointment booking automation Birmingham",
    "small business AI Birmingham",
    "AI consultancy Birmingham",
  ],
  alternates: {
    canonical: CANONICAL,
  },
  openGraph: {
    title: `AI Automation for Small Businesses in ${CITY}`,
    description: `AI automation services for small businesses in ${CITY}. Automate lead capture, appointment booking, customer communications, and more.`,
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
      "Birmingham is the UK's second city with a massive service economy. Capture every lead from your website, qualify them automatically, and book appointments into your calendar — before your competitors even check their inbox.",
    href: "/services/lead-intake",
  },
  {
    title: "SEO Content Automation",
    description:
      "Rank higher in local search results across the West Midlands. Publish locally optimised blog posts and service pages on autopilot to attract more Birmingham customers organically.",
    href: "/services/seo-content",
  },
  {
    title: "WhatsApp Customer Bot",
    description:
      "Birmingham's diverse customer base values fast, accessible communication. Deploy a WhatsApp bot that handles enquiries, bookings, and FAQs around the clock.",
    href: "/services/whatsapp-bot",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Oladipupo Consulting Ltd",
  "description": `AI automation services for small businesses in ${CITY}. Lead capture, appointment booking, SEO content, and WhatsApp bots.`,
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

export default function AIAutomationBirminghamPage() {
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
            As the UK&apos;s second largest city, Birmingham&apos;s service
            economy is booming — from the Jewellery Quarter to Digbeth&apos;s
            creative district. But many small businesses are still running on
            manual processes: chasing leads by hand, missing enquiries, and
            spending hours on admin. We build AI systems that fix that —
            delivered in 7 days, starting from £500.
          </p>
        </div>
      </AnimatedSection>

      {/* Why Birmingham Businesses Choose AI Automation */}
      <AnimatedSection delay={0.1}>
        <section className="mb-20 sm:mb-24" aria-labelledby="why-birmingham-heading">
          <div className="mb-12">
            <SectionHeading
              eyebrow="The Birmingham Advantage"
              heading="Why Birmingham Businesses Choose AI Automation"
              align="center"
            />
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            <p className="text-sm text-zinc-400 leading-relaxed">
              Birmingham is undergoing the most significant economic
              transformation of any UK city outside London. The HS2
              development, the Commonwealth Games legacy, and the ongoing
              regeneration of Digbeth, Eastside, and the Jewellery Quarter have
              brought unprecedented investment into the region. For small
              businesses, this means more opportunities — but also fiercer
              competition and higher expectations from customers who are used to
              seamless digital experiences.
            </p>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Birmingham&apos;s economic DNA is rooted in manufacturing and
              making things, but the modern West Midlands economy is
              increasingly driven by professional services, logistics, health
              tech, and the automotive supply chain. Small businesses here
              often operate as specialist suppliers or service providers to
              larger enterprises, which means operational efficiency
              isn&apos;t optional — it&apos;s a contract requirement.
              Automating lead response, document handling, and client
              communication helps Birmingham SMBs punch above their weight when
              competing for contracts.
            </p>
            <p className="text-sm text-zinc-400 leading-relaxed">
              The West Midlands Combined Authority has invested heavily in
              digital skills and business support, but many small firms still
              lack the technical resource to implement AI solutions themselves.
              That&apos;s the gap we fill: practical, affordable automation
              built for the specific challenges Birmingham businesses face,
              from managing high volumes of trade enquiries to keeping up with
              compliance documentation across multiple sites.
            </p>
          </div>
        </section>
      </AnimatedSection>

      {/* Local Industries We Serve in Birmingham */}
      <AnimatedSection delay={0.15}>
        <section className="mb-20 sm:mb-24" aria-labelledby="industries-birmingham-heading">
          <div className="mb-12">
            <SectionHeading
              eyebrow={`Serving ${CITY}'s Key Sectors`}
              heading="Local Industries We Serve in Birmingham"
              align="center"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {[
              { name: "Manufacturing & Engineering", description: "Precision engineering firms and component manufacturers across the Black Country automating quote management, order tracking, and supplier communication." },
              { name: "Automotive Supply Chain", description: "Parts suppliers and service providers to JLR, BMW, and the wider Midlands automotive cluster automating compliance docs and delivery scheduling." },
              { name: "Professional Services", description: "Law firms, accountancy practices, and consultancies in Colmore Row and Brindleyplace streamlining client intake and case management workflows." },
              { name: "Healthcare & Dental", description: "Private practices, dental surgeries, and specialist clinics across Edgbaston and Solihull automating patient booking and follow-up communications." },
              { name: "Construction & Trades", description: "Builders, roofers, and fit-out contractors working across HS2 and regeneration sites automating quote requests and project scheduling." },
              { name: "Logistics & Distribution", description: "Freight companies and courier services near the NEC and motorway corridors automating dispatch, tracking updates, and customer notifications." },
              { name: "Food & Hospitality", description: "Balti Triangle restaurants, city centre venues, and catering firms automating reservations, event enquiries, and supplier orders." },
              { name: "Jewellery & Specialist Retail", description: "Jewellery Quarter workshops and independent retailers automating customer enquiries, bespoke order tracking, and appointment scheduling." },
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
            Already helping businesses across the Midlands automate their
            operations. From lead intake systems to content engines, we deliver
            solutions that pay for themselves within weeks.
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
