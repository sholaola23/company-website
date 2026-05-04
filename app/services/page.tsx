import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle, ShieldCheck } from "lucide-react";
import SectionHeading from "@/components/shared/SectionHeading";
import CTAButton from "@/components/shared/CTAButton";
import ServiceFilterClient from "@/components/services/ServiceFilterClient";
import AnimatedSection from "@/components/shared/AnimatedSection";
import PersonalisedCTA from "@/components/shared/PersonalisedCTA";
import FAQSection from "@/components/shared/FAQSection";
import type { FAQItem } from "@/components/shared/FAQSection";
import { services } from "@/lib/services-data";
import { cn } from "@/lib/utils";
import JsonLd from "@/components/shared/JsonLd";
import BreadcrumbJsonLd from "@/components/shared/BreadcrumbJsonLd";

export const metadata: Metadata = {
  title: "AI Automation Services",
  description:
    "From single workflows to full automation fleets. We build AI systems tailored to your business.",
  alternates: {
    canonical: "https://workcrew.io/services",
  },
  openGraph: {
    images: [{ url: "https://workcrew.io/api/og", width: 1200, height: 630 }],
    title: "AI Automation Services | WorkCrew",
    description:
      "From single workflows to full automation fleets. We build AI systems tailored to your business.",
    url: "https://workcrew.io/services",
    type: "website",
  },
  twitter: {
    title: "AI Automation Services | WorkCrew",
    description:
      "From single workflows to full automation fleets. We build AI systems tailored to your business.",
  },
};

const TIERS = [
  {
    name: "Starter",
    price: "Get a Quote",
    monthly: "",
    color: "border-[var(--color-border)]",
    badge: "bg-[var(--color-border)] text-[var(--color-heading)]",
    includes: [
      "Single focused automation",
      "Email + docs handover",
      "1 month support",
    ],
    cta: "Get started",
  },
  {
    name: "Growth",
    price: "Get a Quote",
    monthly: "",
    color: "border-[var(--color-primary)]",
    badge: "bg-[var(--color-primary)]/20 text-[var(--color-primary)] border border-[var(--color-primary)]/30",
    includes: [
      "Multi-workflow system",
      "Full SOP documentation",
      "3 months support",
      "Monthly optimisation",
    ],
    cta: "Most popular",
    highlight: true,
  },
  {
    name: "Scale",
    price: "Get a Quote",
    monthly: "",
    color: "border-[var(--color-primary)]",
    badge: "bg-[var(--color-primary)]/20 text-[var(--color-primary)] border border-[var(--color-primary)]/30",
    includes: [
      "Full automation fleet",
      "Dedicated account manager",
      "KPI dashboard",
      "Ongoing optimisation",
      "Priority support",
    ],
    cta: "Get a quote",
  },
];

const servicesJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "AI Automation Services — WorkCrew",
  "description":
    "From single workflows to full automation fleets. We build AI systems tailored to your business.",
  "numberOfItems": services.length,
  "itemListElement": services.map((service, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "item": {
      "@type": "Service",
      "name": service.name,
      "description": service.pain,
      "url": `https://workcrew.io/services/${service.slug}`,
      "provider": {
        "@type": "Organization",
        "name": "WorkCrew Ltd",
      },
      "offers": {
        "@type": "Offer",
        "availability": "https://schema.org/InStock",
        "description": "Contact us for a tailored quote",
      },
    },
  })),
};

const servicesFAQs: FAQItem[] = [
  {
    question: "How long does it take to get started?",
    answer:
      "Timelines depend on the scope and complexity of your project. Single automations are typically faster than multi-workflow systems. We provide a clear timeline in every custom proposal after your free audit.",
  },
  {
    question: "Do I need to be technical to use your services?",
    answer:
      "Not at all. We handle everything — setup, configuration, and training. You just need to tell us what is slowing you down. Once your system is live, you interact with a simple dashboard and we provide full documentation so your team can manage it confidently.",
  },
  {
    question: "What is included in the monthly retainer?",
    answer:
      "Ongoing monitoring, optimisation, support, and minor adjustments. We make sure your automations keep working and improving over time. You also get priority access to our team for any questions or changes you need.",
  },
  {
    question: "Can I cancel the monthly retainer at any time?",
    answer:
      "Yes. There are no long-term contracts. It is a monthly retainer that you can cancel whenever you like. We keep clients by delivering results, not by locking them into agreements.",
  },
  {
    question: "What if AI automation does not work for my business?",
    answer:
      "That is what the free audit is for. We will tell you honestly if AI automation is a good fit before you spend a penny. Every project is also backed by our 90-Day Results Guarantee — if you do not save at least 5 hours per week, we refund your setup fee.",
  },
  {
    question: "I am not sure which service or tier I need. How do I choose?",
    answer:
      "Start with a free AI Readiness Audit. We will analyse your business processes and recommend exactly which service and tier will have the biggest impact. Most small businesses start with the Starter or Growth tier and expand once they see results.",
  },
];

export default function ServicesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
      <JsonLd data={servicesJsonLd} />
      <BreadcrumbJsonLd items={[{ name: "Services", href: "/services" }]} />
      {/* Page heading */}
      <AnimatedSection>
        <div className="mb-16 sm:mb-20">
          <SectionHeading
            as="h1"
            eyebrow="What we run"
            heading="AI automation services"
            description="From a single workflow to a full crew. Built around your business, not a template."
            align="center"
          />
        </div>
      </AnimatedSection>

      {/* Pricing tier cards */}
      <section aria-labelledby="pricing-heading" className="mb-20">
        <h2 id="pricing-heading" className="sr-only">
          Pricing tiers
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {TIERS.map((tier, index) => (
            <AnimatedSection key={tier.name} delay={0.1 * (index + 1)}>
            <div
              className={cn(
                "relative bg-[var(--color-bg-alt)] rounded-xl border-2 p-7 flex flex-col gap-5 transition-all duration-300 hover:scale-[1.02]",
                tier.color,
                tier.highlight && "md:-mt-3 md:mb-[-12px]"
              )}
            >
              {tier.highlight && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="text-xs font-semibold bg-[var(--color-primary)] text-[var(--color-bg)] px-3 py-1 rounded-full">
                    Most Popular
                  </span>
                </div>
              )}

              <div>
                <span
                  className={cn(
                    "text-xs font-semibold px-2.5 py-1 rounded-full capitalize inline-block mb-4",
                    tier.badge
                  )}
                >
                  {tier.name}
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-[var(--color-heading)]">
                    {tier.price}
                  </span>
                  <span className="text-sm text-[var(--color-muted)]">{tier.monthly}</span>
                </div>
              </div>

              <ul className="flex flex-col gap-3" role="list">
                {tier.includes.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <CheckCircle
                      size={15}
                      className="text-[var(--color-primary)] shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <span className="text-sm text-[var(--color-muted)]">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-auto">
                <CTAButton
                  href="/contact"
                  variant={tier.highlight ? "primary" : "secondary"}
                  size="md"
                  className="w-full justify-center"
                >
                  {tier.highlight ? tier.cta : "Get started"}
                </CTAButton>
              </div>
            </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={0.4}>
          <p className="text-center text-sm text-[var(--color-muted)] mt-6">
            Not sure which tier fits?{" "}
            <Link
              href="/contact"
              className="text-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] rounded"
            >
              Get in touch
            </Link>{" "}
            and we&apos;ll recommend the right package.
          </p>
        </AnimatedSection>
      </section>

      {/* Service cards with filter */}
      <AnimatedSection delay={0.1}>
        <section aria-labelledby="services-grid-heading">
          <h2
            id="services-grid-heading"
            className="text-xl font-semibold text-[var(--color-heading)] mb-8"
          >
            All Services
          </h2>
          <ServiceFilterClient services={services} />
        </section>
      </AnimatedSection>

      {/* FAQ */}
      <AnimatedSection delay={0.1}>
        <div className="mt-20">
          <FAQSection
            items={servicesFAQs}
            eyebrow="FAQs"
            heading="Frequently Asked Questions"
          />
        </div>
      </AnimatedSection>

      {/* 90-Day Guarantee */}
      <AnimatedSection delay={0.15}>
        <div className="mt-16 flex items-center gap-4 rounded-xl border border-emerald-500/30 bg-[var(--color-success)]/5 px-6 py-5 max-w-3xl mx-auto">
          <ShieldCheck
            size={24}
            className="text-[var(--color-success)] shrink-0"
            aria-hidden="true"
          />
          <p className="text-sm text-[var(--color-muted)]">
            Every package comes with our{" "}
            <span className="font-semibold text-[var(--color-success)]">
              90-Day Results Guarantee
            </span>
            .{" "}
            <Link
              href="/contact"
              className="text-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors"
            >
              Get in touch
            </Link>{" "}
            to see what&apos;s possible.
          </p>
        </div>
      </AnimatedSection>

      {/* Personalised bottom CTA */}
      <div className="mt-16">
        <PersonalisedCTA />
      </div>
    </div>
  );
}
