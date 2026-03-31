import type { Metadata } from "next";
import AnimatedSection from "@/components/shared/AnimatedSection";
import InstantAudit from "@/components/audit/InstantAudit";
import FAQSection from "@/components/shared/FAQSection";
import type { FAQItem } from "@/components/shared/FAQSection";

export const metadata: Metadata = {
  title: "Free AI Readiness Audit",
  description:
    "Get instant AI analysis of your business in 10 seconds. See your AI readiness score, key findings, and quick wins — no email required.",
  alternates: {
    canonical: "https://workcrew.io/audit",
  },
  openGraph: {
    images: [{ url: "https://workcrew.io/api/og", width: 1200, height: 630 }],
    title: "Free AI Readiness Audit | WorkCrew",
    description:
      "Get instant AI analysis of your business in 10 seconds. See your AI readiness score, key findings, and quick wins — no email required.",
    url: "https://workcrew.io/audit",
    type: "website",
  },
  twitter: {
    title: "Free AI Readiness Audit | WorkCrew",
    description:
      "Get instant AI analysis of your business in 10 seconds. See your AI readiness score, key findings, and quick wins — no email required.",
  },
};

const HOW_IT_WORKS = [
  { step: "1", label: "Enter your details" },
  { step: "2", label: "Get instant AI analysis" },
  { step: "3", label: "Unlock the full report" },
] as const;

const auditFAQs: FAQItem[] = [
  {
    question: "What is an AI readiness audit?",
    answer:
      "An AI readiness audit analyses your current business processes and identifies where artificial intelligence can save you time and money. Our instant audit takes just 10 seconds — you enter a few details about your business and receive a personalised report with your AI readiness score, key findings, and quick wins you can act on straight away.",
  },
  {
    question: "Is the AI readiness audit really free?",
    answer:
      "Yes, completely free with no obligation. You do not even need to provide an email address to get your instant results. The full audit is normally valued at £150, but we offer it free because it helps us understand your business and demonstrate what AI automation can do for you.",
  },
  {
    question: "What information do I need to provide for the audit?",
    answer:
      "Just basic details about your business — your industry, the size of your team, and the types of tasks you spend most time on. The whole process takes under a minute. There is no paperwork, no lengthy questionnaire, and no sales call required.",
  },
  {
    question: "What will I learn from the audit results?",
    answer:
      "You will receive an AI readiness score, a breakdown of your biggest time-wasting processes, specific automation opportunities ranked by impact, and estimated time and cost savings. The report gives you a clear picture of where AI can make the biggest difference in your business.",
  },
  {
    question: "What happens after I complete the audit?",
    answer:
      "You can unlock the full detailed report by providing your email. From there, if you would like to explore implementation, we will send you a custom proposal with a fixed price and timeline — typically within 48 hours. There is absolutely no pressure to proceed.",
  },
  {
    question: "Is the audit relevant to my specific industry?",
    answer:
      "Yes. The audit is tailored to your industry and business type. We have helped businesses across hospitality, retail, professional services, trades, health and wellness, and media. The recommendations you receive are specific to the challenges and opportunities in your sector.",
  },
];

export default function AuditPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
      {/* Hero */}
      <AnimatedSection>
        <div className="max-w-2xl mx-auto text-center mb-10 sm:mb-12">
          <span className="text-xs font-semibold tracking-widest uppercase text-blue-600 mb-4 block">
            Free, No Obligation
          </span>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-[-0.03em] text-slate-900 leading-tight tracking-tight mb-5">
            Your Free AI Readiness Audit
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed">
            Get instant AI analysis of your business in 10&nbsp;seconds.
            No email required.
          </p>
          <p className="text-slate-600 text-sm mt-6">
            We helped E&apos;Manuel Bakery save 8 hours per week and built QuantumFM Media a 12-page professional website.{" "}
            <span className="text-blue-600">Let&apos;s find your wins.</span>
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
                  <div className="flex items-center justify-center w-7 h-7 rounded-full bg-blue-600/15 border border-blue-600/30 shrink-0">
                    <span className="text-xs font-bold text-blue-600">{step}</span>
                  </div>
                  <span className="text-sm text-slate-600 font-medium">{label}</span>
                </div>
                {i < HOW_IT_WORKS.length - 1 && (
                  <span
                    className="hidden sm:inline text-slate-600 mx-4 select-none"
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
          <p className="text-center text-xs text-slate-400 mt-4">
            Free for a limited time — normally £150
          </p>
          <p className="text-center text-xs text-slate-400 mt-2">
            Backed by our{" "}
            <span className="text-emerald-600 font-medium">
              90-Day Results Guarantee
            </span>{" "}
            — if you don&apos;t see results, we refund your setup fee.
          </p>
        </div>
      </AnimatedSection>

      {/* FAQ Section */}
      <div className="mt-20">
        <AnimatedSection delay={0.3}>
          <FAQSection
            items={auditFAQs}
            eyebrow="FAQs"
            heading="Questions About the AI Readiness Audit"
          />
        </AnimatedSection>
      </div>
    </div>
  );
}
