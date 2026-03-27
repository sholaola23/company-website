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

const CITY = "Bristol";
const SLUG = "ai-automation-bristol";
const CANONICAL = `https://oladipupoconsulting.co.uk/${SLUG}`;

export const metadata: Metadata = {
  title: `AI Automation for Small Businesses in ${CITY}`,
  description: `AI automation services for small businesses in ${CITY}. Automate lead capture, appointment booking, email management, and more. 14-day delivery. Free AI readiness audit.`,
  keywords: [
    "Bristol AI automation",
    "AI automation Bristol small business",
    "Bristol business automation",
    "AI consultancy Bristol",
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
      "Capture leads from your website, qualify them automatically, and book appointments into your calendar — without lifting a finger. Perfect for Bristol's harbour-side businesses and Gloucester Road indie shops handling a steady flow of enquiries.",
    href: "/services/lead-intake",
  },
  {
    title: "AI Email Assistant",
    description:
      "Draft professional replies to customer emails in seconds. Your inbox stays under control even during Bristol's busiest trading periods, from Cabot Circus footfall to festival season.",
    href: "/services/email-assistant",
  },
  {
    title: "SEO Content Automation",
    description:
      "Publish locally optimised blog posts and landing pages on autopilot. Rank higher in local search results and attract more Bristol customers across the South West.",
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

export default function AIAutomationBristolPage() {
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
            Bristol&apos;s thriving creative and tech scene is home to over
            15,000 small businesses — from harbour-side cafes and studios to
            Gloucester Road&apos;s legendary indie shops. The businesses pulling
            ahead are the ones responding faster, following up automatically, and
            letting AI handle the admin. We build those systems — delivered in 14
            days, starting from £500.
          </p>
        </div>
      </AnimatedSection>

      {/* Why Bristol Businesses Choose AI Automation */}
      <AnimatedSection delay={0.1}>
        <section className="mb-20 sm:mb-24" aria-labelledby="why-bristol-heading">
          <div className="mb-12">
            <SectionHeading
              eyebrow="The Bristol Edge"
              heading="Why Bristol Businesses Choose AI Automation"
              align="center"
            />
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            <p className="text-sm text-zinc-400 leading-relaxed">
              Bristol consistently ranks as one of the UK&apos;s most
              innovative cities. With a thriving creative sector centred around
              Stokes Croft and Spike Island, a deep-tech cluster in the Temple
              Quarter Enterprise Zone, and one of Europe&apos;s strongest
              aerospace corridors anchored by Airbus and Rolls-Royce in
              Filton, the city punches well above its weight. This culture of
              innovation means Bristol&apos;s small businesses are often early
              adopters — but many still haven&apos;t connected the dots between
              AI and their own day-to-day operations.
            </p>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Bristol&apos;s business landscape is uniquely fragmented. The
              city&apos;s famous independent spirit — Gloucester Road is the
              longest street of independent shops in the UK — means thousands
              of owner-operated businesses compete fiercely for local
              customers. A tattoo studio in Bedminster, a yoga instructor in
              Clifton, and a kitchen fitter in Kingswood all share the same
              fundamental challenge: they&apos;re too busy delivering their
              service to also handle lead follow-up, content marketing, and
              inbox management effectively. AI automation bridges this gap by
              handling time-consuming admin tasks so business owners can focus
              on the craft that built their reputation.
            </p>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Bristol also has a strong sustainability and ethical business
              movement, with many SMBs prioritising long-term customer
              relationships over aggressive sales tactics. Our automation
              approach fits this ethos perfectly — we build systems that
              enhance your customer experience rather than replacing the
              personal touch, ensuring every enquiry gets a prompt,
              professional response even when you&apos;re fully booked.
            </p>
          </div>
        </section>
      </AnimatedSection>

      {/* Local Industries We Serve in Bristol */}
      <AnimatedSection delay={0.15}>
        <section className="mb-20 sm:mb-24" aria-labelledby="industries-bristol-heading">
          <div className="mb-12">
            <SectionHeading
              eyebrow={`Serving ${CITY}'s Key Sectors`}
              heading="Local Industries We Serve in Bristol"
              align="center"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {[
              { name: "Creative & Design", description: "Studios, freelance designers, and production companies around Stokes Croft and Spike Island automating briefs intake, project scheduling, and client approvals." },
              { name: "Aerospace & Advanced Engineering", description: "SME suppliers in the Filton corridor automating compliance documentation, quality reporting, and contract management workflows." },
              { name: "Health & Wellness", description: "Yoga studios, physiotherapists, and alternative health practitioners in Clifton and Montpelier automating session booking and client retention." },
              { name: "Independent Retail", description: "Gloucester Road shops, Wapping Wharf boutiques, and market traders automating customer enquiries, stock alerts, and online order management." },
              { name: "Food & Drink", description: "Independent cafes, restaurants, and craft breweries across the harbour and Southville automating reservations, event bookings, and supplier coordination." },
              { name: "Environmental & Sustainability", description: "Green energy consultants, eco-businesses, and social enterprises automating grant applications, reporting, and stakeholder communications." },
              { name: "Tech & SaaS Startups", description: "Early-stage companies in the Engine Shed and Temple Quarter automating customer onboarding, support ticket triage, and content marketing." },
              { name: "Property & Construction", description: "Developers, architects, and trades firms across North Somerset and South Gloucestershire automating planning enquiries, quote follow-up, and site scheduling." },
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
            Already helping businesses across the South West automate their
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
