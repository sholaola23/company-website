import type { Metadata } from "next";
import {
  BarChart3,
  Map,
  Calculator,
  TrendingUp,
  Package,
} from "lucide-react";
import AuditForm from "@/components/audit/AuditForm";
import AnimatedSection from "@/components/shared/AnimatedSection";

export const metadata: Metadata = {
  title: "Free AI Readiness Audit",
  description:
    "In 48 hours, you'll know exactly where AI can save you time and money. From automation to websites and team training — we identify the right solutions for your business. No obligation.",
};

const AUDIT_ITEMS = [
  {
    icon: BarChart3,
    title: "Business Snapshot",
    description:
      "A full analysis of your digital presence, processes, and where you stand today.",
  },
  {
    icon: Map,
    title: "AI Opportunity Map",
    description:
      "Specific processes in your business that can be automated — named, scoped, and prioritised.",
  },
  {
    icon: Calculator,
    title: "Hours Saved Calculation",
    description:
      "Real numbers, not guesses. We estimate admin hours recovered per week based on your actual workflow.",
  },
  {
    icon: TrendingUp,
    title: "ROI Projection",
    description:
      "Your expected return on investment in year one, calculated from your setup cost and time savings.",
  },
  {
    icon: Package,
    title: "Recommended Solution",
    description:
      "The right package for your business — not a sales pitch, just the solution that fits.",
  },
];

export default function AuditPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
      {/* Hero */}
      <AnimatedSection>
        <div className="max-w-2xl mx-auto text-center mb-16 sm:mb-20">
          <span className="text-xs font-semibold tracking-widest uppercase text-blue-500 mb-4 block">
            Free, No Obligation
          </span>
          <h1 className="text-3xl sm:text-5xl font-bold text-zinc-50 leading-tight tracking-tight mb-6">
            Your Free AI Readiness Audit
          </h1>
          <p className="text-lg text-zinc-400 leading-relaxed">
            In 48 hours, you&apos;ll know exactly where AI can save you time and
            money. No obligation, no sales pitch&nbsp;&mdash; just a clear,
            actionable report delivered to your inbox.
          </p>
        </div>
      </AnimatedSection>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
        {/* Left: what you'll get + preview */}
        <AnimatedSection delay={0.1}>
        <div className="flex flex-col gap-10">
          {/* What you'll get */}
          <section aria-labelledby="audit-contents-heading">
            <h2
              id="audit-contents-heading"
              className="text-xl font-semibold text-zinc-50 mb-7"
            >
              What you&apos;ll get
            </h2>
            <ol className="flex flex-col gap-6" role="list">
              {AUDIT_ITEMS.map((item, i) => {
                const Icon = item.icon;
                return (
                  <li key={item.title} className="flex items-start gap-4">
                    <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-blue-500/10 border border-blue-500/20 shrink-0">
                      <Icon
                        size={16}
                        className="text-blue-400"
                        aria-hidden="true"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-zinc-50 mb-0.5">
                        <span className="text-zinc-600 mr-2 font-mono">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        {item.title}
                      </p>
                      <p className="text-sm text-zinc-400 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ol>
          </section>

          {/* Example preview mockup */}
          <section aria-labelledby="audit-preview-heading">
            <h2
              id="audit-preview-heading"
              className="text-xl font-semibold text-zinc-50 mb-5"
            >
              Here&apos;s what a real audit looks like
            </h2>
            <div
              className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 min-h-48 flex flex-col gap-3"
              role="img"
              aria-label="Preview of an AI readiness audit report"
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                <span className="ml-2 text-xs text-zinc-500">
                  AI Readiness Audit — Sample Report
                </span>
              </div>
              <div className="flex flex-col gap-2">
                <div className="h-3 bg-zinc-700 rounded-full w-3/4" />
                <div className="h-3 bg-zinc-800 rounded-full w-1/2" />
              </div>
              <div className="grid grid-cols-3 gap-3 mt-2">
                {["8 hrs saved", "£12k ROI", "4 automations"].map((stat) => (
                  <div
                    key={stat}
                    className="bg-zinc-800 rounded-lg p-3 text-center"
                  >
                    <p className="text-xs font-semibold text-zinc-50">{stat}</p>
                  </div>
                ))}
              </div>
              <div className="flex flex-col gap-2 mt-2">
                <div className="h-2.5 bg-zinc-800 rounded-full w-full" />
                <div className="h-2.5 bg-zinc-800 rounded-full w-5/6" />
                <div className="h-2.5 bg-zinc-800 rounded-full w-4/6" />
              </div>
              <p className="text-xs text-zinc-600 mt-auto text-center">
                Sample — your report will be tailored to your business
              </p>
            </div>
          </section>
        </div>
        </AnimatedSection>

        {/* Right: Form */}
        <AnimatedSection delay={0.25}>
          <div>
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-7 sm:p-8 sticky top-24">
              <h2 className="text-xl font-semibold text-zinc-50 mb-2">
                Request your audit
              </h2>
              <p className="text-sm text-zinc-400 mb-7">
                Fill in the form below. We&apos;ll review your business and send
                your personalised report within 48 hours.
              </p>
              <AuditForm />
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}
