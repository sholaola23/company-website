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

const CITY = "Manchester";
const SLUG = "ai-automation-manchester";
const CANONICAL = `https://workcrew.io/${SLUG}`;

export const metadata: Metadata = {
  title: `AI Automation for Small Businesses in ${CITY}`,
  description: `AI automation services for small businesses in ${CITY}. Automate lead capture, appointment booking, customer follow-up, and more. Free AI readiness audit.`,
  keywords: [
    `${CITY} AI automation`,
    `AI automation ${CITY} small business`,
    `${CITY} business automation`,
    "AI lead capture Manchester",
    "appointment booking automation Manchester",
    "small business AI Manchester",
    "AI consultancy Manchester",
  ],
  alternates: {
    canonical: CANONICAL,
  },
  openGraph: {
    images: [{ url: "https://workcrew.io/api/og", width: 1200, height: 630 }],
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
      "Manchester's thriving independent business scene means competition for every enquiry. Capture leads instantly, qualify them with AI, and book appointments automatically — so you never lose a potential customer to a slow reply.",
    href: "/services/lead-intake",
  },
  {
    title: "WhatsApp Customer Bot",
    description:
      "Manchester customers expect fast, personal communication. Deploy a WhatsApp bot that answers common questions, takes bookings, and routes complex queries to your team — 24/7.",
    href: "/services/whatsapp-bot",
  },
  {
    title: "AI Email Assistant",
    description:
      "Keep your inbox under control while you focus on running your business. AI drafts professional replies to customer emails, supplier requests, and booking confirmations in seconds.",
    href: "/services/email-assistant",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "WorkCrew Ltd",
  "description": `AI automation services for small businesses in ${CITY}. Lead capture, appointment booking, WhatsApp bots, and email management.`,
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

export default function AIAutomationManchesterPage() {
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
            Manchester&apos;s thriving independent business scene is one of the
            most competitive in the North. Whether you run a salon in the
            Northern Quarter, a cleaning company in Salford, or a trades
            business in Stockport, the edge goes to whoever responds fastest
            and follows up consistently. We build AI automation systems that
            handle that for you — tailored to your business and ready to deliver
            results.
          </p>
        </div>
      </AnimatedSection>

      {/* Why Manchester Businesses Choose AI Automation */}
      <AnimatedSection delay={0.1}>
        <section className="mb-20 sm:mb-24" aria-labelledby="why-manchester-heading">
          <div className="mb-12">
            <SectionHeading
              eyebrow="The Manchester Opportunity"
              heading="Why Manchester Businesses Choose AI Automation"
              align="center"
            />
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            <p className="text-sm text-slate-600 leading-relaxed">
              Manchester sits at the heart of the UK&apos;s fastest-growing tech
              corridor outside London. The city&apos;s digital economy has
              expanded by over 80% in the past decade, with MediaCityUK,
              Manchester Science Park, and the Oxford Road innovation district
              attracting billions in investment. But this growth isn&apos;t just
              about big corporates — it&apos;s created a booming ecosystem of
              independent service businesses, freelancers, and micro-agencies
              who need to compete on speed and professionalism without the
              headcount of larger firms.
            </p>
            <p className="text-sm text-slate-600 leading-relaxed">
              The challenge for Manchester SMBs is distinctly local. High street
              businesses in the Northern Quarter compete with online-first
              brands. Trades firms in Salford and Trafford juggle multiple job
              sites while leads pile up unanswered. Service professionals across
              Greater Manchester lose hours each week to manual email replies,
              missed callbacks, and content marketing that never gets done. AI
              automation solves these specific bottlenecks — capturing every
              enquiry instantly, drafting follow-ups automatically, and keeping
              your online presence active even when you&apos;re on site.
            </p>
            <p className="text-sm text-slate-600 leading-relaxed">
              Manchester&apos;s business culture is practical and
              results-oriented. Business owners here don&apos;t want a
              six-month consulting engagement — they want working systems
              delivered fast, at a fair price, that start saving time from week
              one. That mindset is exactly why our fast delivery model
              resonates so strongly with Manchester businesses.
            </p>
          </div>
        </section>
      </AnimatedSection>

      {/* Local Industries We Serve in Manchester */}
      <AnimatedSection delay={0.15}>
        <section className="mb-20 sm:mb-24" aria-labelledby="industries-manchester-heading">
          <div className="mb-12">
            <SectionHeading
              eyebrow={`Serving ${CITY}'s Key Sectors`}
              heading="Local Industries We Serve in Manchester"
              align="center"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {[
              { name: "Digital & Creative Agencies", description: "Marketing agencies and studios around the Northern Quarter and MediaCityUK automating client reporting, briefs intake, and content scheduling." },
              { name: "Health & Beauty", description: "Salons, barbershops, and aesthetic clinics across Deansgate and Didsbury automating appointment booking and customer follow-up." },
              { name: "Construction & Property", description: "Builders, property managers, and developers across Greater Manchester automating quote requests, tenant communications, and compliance tracking." },
              { name: "Professional Services", description: "Accountants, solicitors, and financial advisers in Spinningfields and beyond streamlining client onboarding and document management." },
              { name: "Fitness & Wellness", description: "Gyms, personal trainers, and wellness studios automating membership enquiries, class bookings, and retention campaigns." },
              { name: "Food & Hospitality", description: "Independent restaurants, cafes, and catering businesses across the Curry Mile and beyond managing reservations and supplier coordination." },
              { name: "E-commerce & Retail", description: "Online retailers and independent shops automating customer service, order tracking, and returns processing." },
              { name: "Education & Training", description: "Private tutors, coaching businesses, and training providers across South Manchester automating enrolment and session management." },
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
            Already helping businesses across the North West automate their
            operations. From lead intake systems to WhatsApp bots, we deliver
            solutions that pay for themselves within weeks.
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
