import type { Metadata } from "next";
import AnimatedSection from "@/components/shared/AnimatedSection";
import InstantAudit from "@/components/audit/InstantAudit";

export const metadata: Metadata = {
  title: "Free AI Readiness Audit",
  description:
    "Get instant AI analysis of your business in 10 seconds. See your AI readiness score, key findings, and quick wins — no email required.",
};

const HOW_IT_WORKS = [
  { step: "1", label: "Enter your details" },
  { step: "2", label: "Get instant AI analysis" },
  { step: "3", label: "Unlock the full report" },
] as const;

export default function AuditPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
      {/* Hero */}
      <AnimatedSection>
        <div className="max-w-2xl mx-auto text-center mb-10 sm:mb-12">
          <span className="text-xs font-semibold tracking-widest uppercase text-blue-500 mb-4 block">
            Free, No Obligation
          </span>
          <h1 className="text-3xl sm:text-5xl font-bold text-zinc-50 leading-tight tracking-tight mb-5">
            Your Free AI Readiness Audit
          </h1>
          <p className="text-lg text-zinc-400 leading-relaxed">
            Get instant AI analysis of your business in 10&nbsp;seconds.
            No email required.
          </p>
          <p className="text-zinc-400 text-sm mt-6">
            We helped E&apos;Manuel Bakery save 8 hours per week and built QuantumFM Media a 12-page professional website.{" "}
            <span className="text-blue-400">Let&apos;s find your wins.</span>
          </p>
        </div>
      </AnimatedSection>

      {/* How it works */}
      <AnimatedSection delay={0.1}>
        <div className="max-w-2xl mx-auto mb-10">
          <ol
            className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-0"
            aria-label="How the instant audit works"
          >
            {HOW_IT_WORKS.map(({ step, label }, i) => (
              <li key={step} className="flex items-center gap-3 sm:gap-0">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-7 h-7 rounded-full bg-blue-500/15 border border-blue-500/30 shrink-0">
                    <span className="text-xs font-bold text-blue-400">{step}</span>
                  </div>
                  <span className="text-sm text-zinc-400 font-medium">{label}</span>
                </div>
                {i < HOW_IT_WORKS.length - 1 && (
                  <span
                    className="hidden sm:inline text-zinc-700 mx-4 select-none"
                    aria-hidden="true"
                  >
                    →
                  </span>
                )}
              </li>
            ))}
          </ol>
        </div>
      </AnimatedSection>

      {/* Instant Audit component */}
      <AnimatedSection delay={0.2}>
        <div className="max-w-2xl mx-auto">
          <InstantAudit />
          <p className="text-center text-xs text-zinc-500 mt-4">
            Free for a limited time — normally £150
          </p>
        </div>
      </AnimatedSection>
    </div>
  );
}
