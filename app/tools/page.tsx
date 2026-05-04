import type { Metadata } from "next";
import Link from "next/link";
import AnimatedSection from "@/components/shared/AnimatedSection";
import JsonLd from "@/components/shared/JsonLd";

export const metadata: Metadata = {
  title: "Free AI Tools for Small Businesses",
  description:
    "Free tools to audit your AI readiness, local SEO, and calculate your automation ROI. Built by WorkCrew for UK small businesses.",
  alternates: {
    canonical: "https://workcrew.io/tools",
  },
  openGraph: {
    images: [{ url: "https://workcrew.io/api/og", width: 1200, height: 630 }],
    title: "Free AI Tools for Small Businesses | WorkCrew",
    description:
      "Free tools to audit your AI readiness, local SEO, and calculate your automation ROI.",
    url: "https://workcrew.io/tools",
    type: "website",
  },
};

const TOOLS = [
  {
    title: "AI Readiness Audit",
    description:
      "Get your AI readiness score in 10 seconds. Discover where AI can save you time and money — no email required.",
    href: "/audit",
    badge: "Free",
    icon: "🤖",
  },
  {
    title: "RankReady Local SEO Audit",
    description:
      "Fill in one form about your business. Get a complete local SEO action plan with GBP optimisation, review strategy, posting calendar, and service page copy.",
    href: "/tools/rank-ready",
    badge: "Free Preview / £49 Full Report",
    icon: "📍",
  },
  {
    title: "AI ROI Calculator",
    description:
      "Calculate exactly how much time and money AI automation could save your business every month. Instant results, tailored to your industry.",
    href: "/tools/ai-roi-calculator",
    badge: "Free",
    icon: "📊",
  },
] as const;

export default function ToolsPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Free AI Tools for Small Businesses",
          description:
            "Free tools to audit your AI readiness, local SEO, and calculate your automation ROI.",
          url: "https://workcrew.io/tools",
          publisher: {
            "@type": "Organization",
            name: "WorkCrew Ltd",
          },
        }}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
        {/* Hero */}
        <AnimatedSection>
          <div className="max-w-2xl mx-auto text-center mb-14">
            <span className="text-xs font-semibold tracking-widest uppercase text-[var(--color-primary)] mb-4 block">
              Free Tools
            </span>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-[-0.03em] text-[var(--color-heading)] leading-tight tracking-tight mb-5">
              Tools That Help You Grow
            </h1>
            <p className="text-lg text-[var(--color-body)] leading-relaxed">
              Free, instant tools built for small business owners. No signup
              walls, no fluff — just actionable insights you can use today.
            </p>
          </div>
        </AnimatedSection>

        {/* Tool Cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
          {TOOLS.map((tool, i) => (
            <AnimatedSection key={tool.href} delay={i * 0.1}>
              <Link
                href={tool.href}
                className="group flex flex-col h-full rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-alt)]/60 p-6 transition-all hover:border-[var(--color-primary)]/40 hover:bg-[var(--color-bg-alt)]/80"
              >
                <div className="text-3xl mb-4">{tool.icon}</div>
                <h2 className="text-lg font-semibold text-[var(--color-heading)] mb-2 group-hover:text-[var(--color-primary)] transition-colors">
                  {tool.title}
                </h2>
                <p className="text-sm text-[var(--color-body)] leading-relaxed flex-1 mb-4">
                  {tool.description}
                </p>
                <span className="inline-block text-xs font-medium bg-[var(--color-primary)]/10 text-[var(--color-primary)] border border-[var(--color-primary)]/20 rounded-full px-3 py-1 w-fit">
                  {tool.badge}
                </span>
              </Link>
            </AnimatedSection>
          ))}
        </div>

        {/* Bottom CTA */}
        <AnimatedSection delay={0.4}>
          <div className="max-w-2xl mx-auto text-center mt-16">
            <p className="text-[var(--color-body)] text-sm">
              Want help implementing the results?{" "}
              <Link
                href="https://cal.com/workcrew/free-ai-strategy-call"
                className="text-[var(--color-primary)] hover:text-[var(--color-primary)] underline underline-offset-2"
              >
                Book a free strategy call
              </Link>
            </p>
          </div>
        </AnimatedSection>
      </div>
    </>
  );
}
