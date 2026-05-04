"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Calculator,
  Clock,
  PoundSterling,
  TrendingUp,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import JsonLd from "@/components/shared/JsonLd";
import FAQSection from "@/components/shared/FAQSection";
import type { FAQItem } from "@/components/shared/FAQSection";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const INDUSTRIES = [
  "Restaurant",
  "Salon / Barber",
  "Trades / Home Services",
  "Healthcare / Dental",
  "Estate Agent",
  "Accountant / Bookkeeper",
  "Gym / Fitness",
  "Coaching / Consulting",
  "Other",
] as const;

type Industry = (typeof INDUSTRIES)[number];

const TEAM_SIZES = ["1-5", "6-15", "16-50", "50+"] as const;

const REVENUE_RANGES = [
  "Under £5k",
  "£5k–£15k",
  "£15k–£50k",
  "£50k–£100k",
  "£100k+",
] as const;

/** Estimated average hourly cost of admin time by industry (GBP). */
const HOURLY_RATES: Record<Industry, number> = {
  Restaurant: 12,
  "Salon / Barber": 13,
  "Trades / Home Services": 18,
  "Healthcare / Dental": 22,
  "Estate Agent": 20,
  "Accountant / Bookkeeper": 25,
  "Gym / Fitness": 14,
  "Coaching / Consulting": 30,
  Other: 16,
};

/** Automation efficiency: percentage of admin hours AI can realistically save. */
const EFFICIENCY_MIN = 0.6;
const EFFICIENCY_MAX = 0.7;

/** Investment assumptions. */
const SETUP_FEE = 500;
const MONTHLY_FEE = 50;
const ANNUAL_INVESTMENT = SETUP_FEE + MONTHLY_FEE * 12; // £1,100

// ---------------------------------------------------------------------------
// FAQs
// ---------------------------------------------------------------------------

const faqs: FAQItem[] = [
  {
    question: "How is the AI ROI estimate calculated?",
    answer:
      "We estimate that AI automation can eliminate 60–70% of repetitive admin tasks such as scheduling, follow-ups, data entry, and invoicing. The calculator multiplies the hours saved by an industry-average hourly rate to produce an annual cost saving, then compares that against a typical AI setup and monthly retainer investment to give you a return-on-investment percentage.",
  },
  {
    question: "Are these savings realistic for a small business?",
    answer:
      "Yes. The figures are conservative. Many of our clients see results that exceed these estimates within the first 90 days. For example, one restaurant client saved 50+ minutes every day on order management alone, and an estate agent reduced admin time by 12 hours per week after implementing AI lead qualification.",
  },
  {
    question: "What does the AI investment include?",
    answer:
      "The calculator uses industry-standard AI implementation costs to estimate your return on investment. Actual pricing is tailored to your specific needs — book a free consultation to get an exact quote. Every project includes design, build, deployment, and ongoing support.",
  },
  {
    question: "What happens after I see my ROI estimate?",
    answer:
      "If the numbers look promising, the next step is a free AI Readiness Audit. We analyse your specific business processes and identify exactly where automation will have the biggest impact — with a personalised report you can act on straight away, no obligation.",
  },
];

// ---------------------------------------------------------------------------
// JSON-LD (FAQPage) — rendered client-side via the shared component
// ---------------------------------------------------------------------------

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: { "@type": "Answer", text: f.answer },
  })),
};

// ---------------------------------------------------------------------------
// Result card
// ---------------------------------------------------------------------------

function ResultCard({
  icon,
  label,
  value,
  subtitle,
  delay,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  subtitle?: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-alt)]/70 p-6 text-center"
    >
      <div className="mb-3 flex items-center justify-center text-[var(--color-primary)]">
        {icon}
      </div>
      <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-muted)]">
        {label}
      </p>
      <p className="mt-1 text-3xl font-bold text-[var(--color-heading)]">{value}</p>
      {subtitle && (
        <p className="mt-1 text-sm text-[var(--color-body)]">{subtitle}</p>
      )}
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Page component
// ---------------------------------------------------------------------------

export default function AIROICalculatorPage() {
  // Form state
  const [industry, setIndustry] = useState<Industry | "">("");
  const [teamSize, setTeamSize] = useState<(typeof TEAM_SIZES)[number] | "">("");
  const [adminHours, setAdminHours] = useState(15);
  const [revenue, setRevenue] = useState<string>("");
  const [showResults, setShowResults] = useState(false);

  // Calculations
  const results = useMemo(() => {
    if (!industry || !teamSize) return null;

    const rate = HOURLY_RATES[industry as Industry];
    const avgEfficiency = (EFFICIENCY_MIN + EFFICIENCY_MAX) / 2; // 0.65
    const hoursSavedPerWeek = Math.round(adminHours * avgEfficiency);
    const hoursSavedPerYear = hoursSavedPerWeek * 52;
    const costSavingsPerYear = hoursSavedPerYear * rate;
    const roiPercent = Math.round(
      ((costSavingsPerYear - ANNUAL_INVESTMENT) / ANNUAL_INVESTMENT) * 100,
    );

    return {
      hoursSavedPerWeek,
      hoursSavedPerYear,
      costSavingsPerYear,
      roiPercent,
      rate,
    };
  }, [industry, teamSize, adminHours]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (industry && teamSize) setShowResults(true);
  };

  const handleReset = () => {
    setShowResults(false);
  };

  // Select styling helper
  const selectClasses =
    "w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-alt)] px-4 py-3 text-sm text-[var(--color-heading)] placeholder:text-[var(--color-muted)] focus:border-[var(--color-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)] transition-colors";

  return (
    <>
      <JsonLd data={faqJsonLd} />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="mx-auto max-w-2xl text-center mb-12">
            <span className="text-xs font-semibold tracking-widest uppercase text-[var(--color-primary)] mb-4 block">
              Free Tool
            </span>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-[-0.03em] text-[var(--color-heading)] leading-tight tracking-tight mb-5">
              AI ROI Calculator
            </h1>
            <p className="text-lg text-[var(--color-body)] leading-relaxed">
              Estimate how much time and money your business could save with
              AI&nbsp;automation — in under 60&nbsp;seconds.
            </p>
          </div>
        </motion.div>

        {/* Calculator form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
        >
          <form
            onSubmit={handleSubmit}
            className="mx-auto max-w-xl rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-alt)]/60 p-6 sm:p-8 space-y-6"
          >
            {/* Industry */}
            <div>
              <label
                htmlFor="industry"
                className="mb-2 block text-sm font-medium text-[var(--color-muted)]"
              >
                Industry
              </label>
              <select
                id="industry"
                value={industry}
                onChange={(e) => {
                  setIndustry(e.target.value as Industry);
                  setShowResults(false);
                }}
                className={selectClasses}
                required
              >
                <option value="" disabled>
                  Select your industry
                </option>
                {INDUSTRIES.map((ind) => (
                  <option key={ind} value={ind}>
                    {ind}
                  </option>
                ))}
              </select>
            </div>

            {/* Team size */}
            <div>
              <label className="mb-2 block text-sm font-medium text-[var(--color-muted)]">
                Team size
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {TEAM_SIZES.map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => {
                      setTeamSize(size);
                      setShowResults(false);
                    }}
                    className={`rounded-lg border px-4 py-2.5 text-sm font-medium transition-all duration-200 ${
                      teamSize === size
                        ? "border-[var(--color-primary)] bg-[var(--color-primary)]/15 text-[var(--color-primary)]"
                        : "border-[var(--color-border)] bg-[var(--color-bg-alt)] text-[var(--color-body)] hover:border-slate-400 hover:text-[var(--color-heading)]"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Admin hours slider */}
            <div>
              <label
                htmlFor="admin-hours"
                className="mb-2 block text-sm font-medium text-[var(--color-muted)]"
              >
                Hours per week on admin / manual tasks:{" "}
                <span className="text-[var(--color-primary)] font-bold">{adminHours}h</span>
              </label>
              <input
                id="admin-hours"
                type="range"
                min={5}
                max={40}
                step={1}
                value={adminHours}
                onChange={(e) => {
                  setAdminHours(Number(e.target.value));
                  setShowResults(false);
                }}
                className="w-full accent-blue-500"
              />
              <div className="mt-1 flex justify-between text-xs text-[var(--color-muted)]">
                <span>5h</span>
                <span>40h</span>
              </div>
            </div>

            {/* Monthly revenue (optional) */}
            <div>
              <label
                htmlFor="revenue"
                className="mb-2 block text-sm font-medium text-[var(--color-muted)]"
              >
                Current monthly revenue{" "}
                <span className="text-[var(--color-muted)]">(optional)</span>
              </label>
              <select
                id="revenue"
                value={revenue}
                onChange={(e) => setRevenue(e.target.value)}
                className={selectClasses}
              >
                <option value="">Prefer not to say</option>
                {REVENUE_RANGES.map((range) => (
                  <option key={range} value={range}>
                    {range}
                  </option>
                ))}
              </select>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={!industry || !teamSize}
              className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-[var(--color-primary)] px-6 py-3 text-base font-semibold text-[var(--color-bg)] shadow-lg shadow-blue-500/20 transition-all duration-200 hover:bg-[var(--color-primary-hover)] hover:shadow-blue-500/30 disabled:opacity-40 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-white"
            >
              <Calculator size={18} aria-hidden="true" />
              Calculate My ROI
            </button>
          </form>
        </motion.div>

        {/* Results */}
        <AnimatePresence>
          {showResults && results && (
            <motion.div
              key="results"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="overflow-hidden"
            >
              <div className="mx-auto mt-10 max-w-3xl">
                <h2 className="mb-6 text-center text-2xl font-bold text-[var(--color-heading)]">
                  Your Estimated AI Savings
                </h2>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  <ResultCard
                    icon={<Clock size={24} />}
                    label="Hours Saved / Week"
                    value={`${results.hoursSavedPerWeek}h`}
                    subtitle={`of ${adminHours}h admin time`}
                    delay={0.1}
                  />
                  <ResultCard
                    icon={<Clock size={24} />}
                    label="Hours Saved / Year"
                    value={results.hoursSavedPerYear.toLocaleString("en-GB")}
                    subtitle="hours back for your team"
                    delay={0.2}
                  />
                  <ResultCard
                    icon={<PoundSterling size={24} />}
                    label="Cost Savings / Year"
                    value={`£${results.costSavingsPerYear.toLocaleString("en-GB")}`}
                    subtitle={`at £${results.rate}/hr avg rate`}
                    delay={0.3}
                  />
                  <ResultCard
                    icon={<TrendingUp size={24} />}
                    label="Estimated ROI"
                    value={`${results.roiPercent}%`}
                    subtitle={`on £${ANNUAL_INVESTMENT.toLocaleString("en-GB")} yr-1 investment`}
                    delay={0.4}
                  />
                </div>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="mt-6 text-center text-sm text-[var(--color-muted)]"
                >
                  Based on a £{SETUP_FEE} setup fee + £{MONTHLY_FEE}/month retainer.
                  Actual savings may vary.
                </motion.p>

                {/* Recalculate */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="mt-4 text-center"
                >
                  <button
                    type="button"
                    onClick={handleReset}
                    className="text-sm text-[var(--color-primary)] underline underline-offset-4 hover:text-[var(--color-primary)] transition-colors"
                  >
                    Adjust your inputs
                  </button>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: showResults ? 0.8 : 0.2, ease: "easeOut" }}
          className="mx-auto mt-16 max-w-xl text-center"
        >
          <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-alt)]/60 p-8 sm:p-10">
            <h2 className="text-xl sm:text-2xl font-bold text-[var(--color-heading)] mb-3">
              Ready to see exactly where AI fits your business?
            </h2>
            <p className="text-sm text-[var(--color-body)] mb-6 leading-relaxed">
              Get a personalised AI Readiness Audit — free, no obligation. We
              will analyse your processes and show you the quickest wins.
            </p>
            <Link
              href="/audit"
              className="inline-flex items-center gap-2 rounded-lg bg-[var(--color-primary)] px-6 py-3 text-base font-semibold text-[var(--color-bg)] shadow-lg shadow-blue-500/20 transition-all duration-200 hover:bg-[var(--color-primary-hover)] hover:shadow-blue-500/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-white group"
            >
              Get Your Free AI Readiness Audit
              <ArrowRight
                size={18}
                className="transition-transform duration-200 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Link>
          </div>
        </motion.div>

        {/* FAQ Section */}
        <div className="mt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          >
            <FAQSection
              items={faqs}
              eyebrow="FAQs"
              heading="AI ROI Calculator — Frequently Asked Questions"
            />
          </motion.div>
        </div>
      </div>
    </>
  );
}
