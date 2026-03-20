"use client";

/**
 * InstantAudit — multi-step interactive AI audit component.
 *
 * Usage:
 *   import InstantAudit from "@/components/audit/InstantAudit";
 *   <InstantAudit />
 *
 * States: input → generating → results → email-capture → complete
 */

import { useReducer, useEffect, useRef, useId, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import NextLink from "next/link";
import { Zap, Lightbulb, ExternalLink, Lock, BarChart3, Target, TrendingUp, Calendar, Sparkles } from "lucide-react";
import { INDUSTRIES } from "@/lib/constants";
import { markAuditStarted, markAuditCompleted } from "@/lib/visitor-tracking";
import { trackAuditStarted, trackAuditCompleted, trackAuditEmailSubmitted } from "@/lib/analytics";
import { cn } from "@/lib/utils";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type Severity = "red" | "amber" | "green";

interface Finding {
  title: string;
  description: string;
  severity: Severity;
}

interface QuickWin {
  title: string;
  description: string;
}

interface AuditResult {
  score: number;
  scoreLabel: string;
  summary: string;
  findings: Finding[];
  quickWins: QuickWin[];
  recommendedTier: "starter" | "growth" | "scale";
  tierReason: string;
}

type Step = "input" | "generating" | "results" | "email-capture" | "complete";

interface State {
  step: Step;
  businessName: string;
  industry: string;
  websiteUrl: string;
  noWebsite: boolean;
  result: AuditResult | null;
  email: string;
  emailStatus: "idle" | "loading" | "error";
  emailError: string;
  auditError: string;
  /** Notion page ID returned by /api/audit-log — used to attach email later */
  notionPageId: string | null;
}

type Action =
  | { type: "SET_FIELD"; field: keyof Pick<State, "businessName" | "industry" | "websiteUrl" | "email">; value: string }
  | { type: "TOGGLE_NO_WEBSITE" }
  | { type: "START_GENERATING" }
  | { type: "SET_RESULT"; result: AuditResult }
  | { type: "AUDIT_ERROR"; message: string }
  | { type: "EMAIL_LOADING" }
  | { type: "EMAIL_ERROR"; message: string }
  | { type: "COMPLETE" }
  | { type: "RESET" }
  | { type: "SET_NOTION_PAGE_ID"; id: string };

const INITIAL_STATE: State = {
  step: "input",
  businessName: "",
  industry: "",
  websiteUrl: "",
  noWebsite: false,
  result: null,
  email: "",
  emailStatus: "idle",
  emailError: "",
  auditError: "",
  notionPageId: null,
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_FIELD":
      return { ...state, [action.field]: action.value };
    case "TOGGLE_NO_WEBSITE":
      return { ...state, noWebsite: !state.noWebsite, websiteUrl: !state.noWebsite ? "" : state.websiteUrl };
    case "START_GENERATING":
      return { ...state, step: "generating", auditError: "" };
    case "SET_RESULT":
      return { ...state, step: "results", result: action.result };
    case "AUDIT_ERROR":
      return { ...state, step: "input", auditError: action.message };
    case "EMAIL_LOADING":
      return { ...state, emailStatus: "loading", emailError: "" };
    case "EMAIL_ERROR":
      return { ...state, emailStatus: "error", emailError: action.message };
    case "COMPLETE":
      return { ...state, step: "complete", emailStatus: "idle" };
    case "SET_NOTION_PAGE_ID":
      return { ...state, notionPageId: action.id };
    case "RESET":
      return INITIAL_STATE;
    default:
      return state;
  }
}

// ---------------------------------------------------------------------------
// Tier config
// ---------------------------------------------------------------------------

const TIER_CONFIG = {
  starter: { label: "Starter", price: "£500 setup + £50/mo" },
  growth: { label: "Growth", price: "£1,500 setup + £150/mo" },
  scale: { label: "Scale", price: "£3,500 setup + £350/mo" },
} as const;

// ---------------------------------------------------------------------------
// Severity helpers
// ---------------------------------------------------------------------------

const SEVERITY_COLOR: Record<Severity, string> = {
  red: "#ef4444",
  amber: "#f59e0b",
  green: "#10b981",
};

const SEVERITY_DOT: Record<Severity, string> = {
  red: "bg-red-500",
  amber: "bg-amber-500",
  green: "bg-green-500",
};

// ---------------------------------------------------------------------------
// Score circle — animated SVG
// ---------------------------------------------------------------------------

function ScoreCircle({ score }: { score: number }) {
  const radius = 52;
  const circumference = 2 * Math.PI * radius;
  const fraction = Math.max(0, Math.min(score, 10)) / 10;
  const targetOffset = circumference * (1 - fraction);

  const color =
    score <= 3 ? "#ef4444" : score <= 6 ? "#f59e0b" : "#10b981";

  const label =
    score <= 3
      ? "Critical gap"
      : score <= 6
      ? "Room to improve"
      : "Strong foundation";

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative w-36 h-36" role="img" aria-label={`AI readiness score: ${score} out of 10`}>
        <svg
          width="144"
          height="144"
          viewBox="0 0 144 144"
          className="-rotate-90"
          aria-hidden="true"
        >
          {/* Track */}
          <circle
            cx="72"
            cy="72"
            r={radius}
            fill="none"
            stroke="#27272a"
            strokeWidth="10"
          />
          {/* Animated fill */}
          <motion.circle
            cx="72"
            cy="72"
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: targetOffset }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
          />
        </svg>
        {/* Score text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span
            className="text-4xl font-bold text-zinc-50 leading-none"
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {score}
          </motion.span>
          <span className="text-xs text-zinc-500 mt-0.5">/ 10</span>
        </div>
      </div>
      <div className="text-center">
        <p className="text-sm font-semibold" style={{ color }}>{label}</p>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Skeleton shimmer
// ---------------------------------------------------------------------------

function SkeletonCard({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "bg-zinc-800/60 border border-zinc-700/50 rounded-xl p-5 overflow-hidden relative",
        className
      )}
      aria-hidden="true"
    >
      <div className="shimmer-line h-3 rounded-full w-1/2 mb-3 bg-zinc-700" />
      <div className="shimmer-line h-2.5 rounded-full w-full mb-2 bg-zinc-700/70" />
      <div className="shimmer-line h-2.5 rounded-full w-4/5 bg-zinc-700/70" />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Generating step
// ---------------------------------------------------------------------------

const GENERATING_MESSAGES = [
  "Analysing your industry...",
  "Identifying opportunities...",
  "Assessing digital presence...",
  "Calculating your score...",
];

function GeneratingStep() {
  const [msgIndex, setMsgIndex] = useReducerLike(0);

  // Cycle through messages every 2.5s
  useEffect(() => {
    const id = setInterval(() => {
      setMsgIndex((i) => (i + 1) % GENERATING_MESSAGES.length);
    }, 2500);
    return () => clearInterval(id);
  }, [setMsgIndex]);

  return (
    <motion.div
      key="generating"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col gap-7"
    >
      {/* Progress header */}
      <div className="flex flex-col items-center gap-4">
        {/* Pulsing score circle placeholder */}
        <div className="w-36 h-36 rounded-full bg-zinc-800/60 border-4 border-zinc-700/50 flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 shimmer-overlay" aria-hidden="true" />
          <span className="text-zinc-600 text-sm font-medium">—</span>
        </div>

        <AnimatePresence mode="wait">
          <motion.p
            key={msgIndex}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="text-zinc-400 text-sm font-medium"
            aria-live="polite"
            aria-atomic="true"
          >
            {GENERATING_MESSAGES[msgIndex]}
          </motion.p>
        </AnimatePresence>

        {/* Progress bar */}
        <div className="w-full max-w-xs h-1 bg-zinc-800 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-blue-500 rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: "90%" }}
            transition={{ duration: 9, ease: "easeInOut" }}
          />
        </div>
      </div>

      {/* Skeleton cards */}
      <div className="flex flex-col gap-3">
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </div>
    </motion.div>
  );
}

// Minimal useState-like hook for message cycling
function useReducerLike(initial: number): [number, (fn: (i: number) => number) => void] {
  const [val, dispatch] = useReducer((s: number, fn: (i: number) => number) => fn(s), initial);
  return [val, dispatch];
}

// ---------------------------------------------------------------------------
// Input step
// ---------------------------------------------------------------------------

const inputBase =
  "w-full bg-zinc-950 border border-zinc-700 rounded-lg px-4 py-3 text-sm text-zinc-50 placeholder:text-zinc-500 transition-colors duration-150 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 disabled:opacity-40 disabled:cursor-not-allowed";

interface InputStepProps {
  state: State;
  dispatch: React.Dispatch<Action>;
  formId: string;
  onSubmit: () => void;
}

function InputStep({ state, dispatch, formId, onSubmit }: InputStepProps) {
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit();
  }

  return (
    <motion.div
      key="input"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.4 }}
    >
      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5" aria-labelledby={`${formId}-heading`}>
        {/* Business name */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor={`${formId}-bizname`} className="text-sm font-medium text-zinc-300">
            Business Name <span className="text-blue-400" aria-hidden="true">*</span>
          </label>
          <input
            id={`${formId}-bizname`}
            type="text"
            required
            autoComplete="organization"
            placeholder="e.g. Sunrise Cleaning Co."
            value={state.businessName}
            onChange={(e) => dispatch({ type: "SET_FIELD", field: "businessName", value: e.target.value })}
            className={inputBase}
            aria-required="true"
          />
        </div>

        {/* Industry */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor={`${formId}-industry`} className="text-sm font-medium text-zinc-300">
            Industry <span className="text-blue-400" aria-hidden="true">*</span>
          </label>
          <select
            id={`${formId}-industry`}
            required
            value={state.industry}
            onChange={(e) => dispatch({ type: "SET_FIELD", field: "industry", value: e.target.value })}
            className={cn(inputBase, "cursor-pointer")}
            aria-required="true"
          >
            <option value="" disabled>Select your industry</option>
            {INDUSTRIES.map((ind) => (
              <option key={ind} value={ind}>{ind}</option>
            ))}
          </select>
        </div>

        {/* Website URL */}
        <div className="flex flex-col gap-2">
          <label htmlFor={`${formId}-website`} className="text-sm font-medium text-zinc-300">
            Website URL{" "}
            <span className="text-zinc-500 font-normal">(optional)</span>
          </label>
          <input
            id={`${formId}-website`}
            type="url"
            autoComplete="url"
            placeholder="https://example.com"
            value={state.websiteUrl}
            disabled={state.noWebsite}
            onChange={(e) => dispatch({ type: "SET_FIELD", field: "websiteUrl", value: e.target.value })}
            className={inputBase}
          />
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={state.noWebsite}
              onChange={() => dispatch({ type: "TOGGLE_NO_WEBSITE" })}
              className="w-4 h-4 rounded border-zinc-600 bg-zinc-900 accent-blue-500 cursor-pointer"
            />
            <span className="text-sm text-zinc-400">I don&apos;t have a website</span>
          </label>
        </div>

        {/* Error */}
        {state.auditError && (
          <p
            role="alert"
            className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3"
          >
            {state.auditError}
          </p>
        )}

        {/* CTA */}
        <button
          type="submit"
          className={cn(
            "inline-flex items-center justify-center gap-2.5 font-semibold rounded-xl",
            "bg-blue-500 text-white border border-blue-500",
            "hover:bg-blue-600 hover:border-blue-600 active:scale-[0.98]",
            "transition-all duration-200 px-6 py-3.5 text-base mt-1",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-900"
          )}
        >
          <Zap size={18} aria-hidden="true" />
          Run My Free Audit
        </button>

        <p className="text-xs text-zinc-500 text-center">
          Takes about 10 seconds. No email required.
        </p>
      </form>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Results step
// ---------------------------------------------------------------------------

interface ResultsStepProps {
  result: AuditResult;
  formId: string;
  state: State;
  dispatch: React.Dispatch<Action>;
  onEmailSubmit: () => void;
}

function ResultsStep({ result, formId, state, dispatch, onEmailSubmit }: ResultsStepProps) {
  const tier = TIER_CONFIG[result.recommendedTier];

  return (
    <motion.div
      key="results"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col gap-7"
    >
      {/* Score */}
      <div className="flex flex-col items-center gap-1 pt-2">
        <ScoreCircle score={result.score} />
        <p className="text-sm font-semibold text-zinc-300 mt-1">{result.scoreLabel}</p>
      </div>

      {/* Summary */}
      <div className="bg-zinc-800/50 border border-zinc-700/50 rounded-xl p-5">
        <p className="text-sm text-zinc-300 leading-relaxed">{result.summary}</p>
      </div>

      {/* Findings */}
      <section aria-labelledby={`${formId}-findings-heading`}>
        <h3 id={`${formId}-findings-heading`} className="text-xs font-semibold tracking-widest uppercase text-zinc-500 mb-3">
          Key Findings
        </h3>
        <ol className="flex flex-col gap-3" role="list">
          {result.findings.map((finding, i) => (
            <motion.li
              key={finding.title}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.1 + i * 0.1 }}
              className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 flex gap-3 items-start"
            >
              <span
                className={cn("w-2.5 h-2.5 rounded-full shrink-0 mt-1", SEVERITY_DOT[finding.severity])}
                aria-label={`Severity: ${finding.severity}`}
                style={{ background: SEVERITY_COLOR[finding.severity] }}
              />
              <div>
                <p className="text-sm font-semibold text-zinc-100 mb-1">{finding.title}</p>
                <p className="text-sm text-zinc-400 leading-relaxed">{finding.description}</p>
              </div>
            </motion.li>
          ))}
        </ol>
      </section>

      {/* Quick Wins */}
      <section aria-labelledby={`${formId}-quickwins-heading`}>
        <h3 id={`${formId}-quickwins-heading`} className="text-xs font-semibold tracking-widest uppercase text-zinc-500 mb-3">
          Quick Wins
        </h3>
        <ul className="flex flex-col gap-3" role="list">
          {result.quickWins.map((win, i) => (
            <motion.li
              key={win.title}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.4 + i * 0.1 }}
              className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 flex gap-3 items-start"
            >
              <Lightbulb
                size={16}
                className="text-amber-400 shrink-0 mt-0.5"
                aria-hidden="true"
              />
              <div>
                <p className="text-sm font-semibold text-zinc-100 mb-1">{win.title}</p>
                <p className="text-sm text-zinc-400 leading-relaxed">{win.description}</p>
              </div>
            </motion.li>
          ))}
        </ul>
      </section>

      {/* Recommended Tier */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.6 }}
        className="border border-blue-500/40 bg-blue-500/5 rounded-xl p-5"
        role="region"
        aria-label="Recommended service tier"
      >
        <p className="text-xs font-semibold tracking-widest uppercase text-blue-400 mb-2">Recommended</p>
        <div className="flex items-baseline gap-3 flex-wrap mb-2">
          <span className="text-lg font-bold text-zinc-50">{tier.label} Plan</span>
          <span className="text-sm text-zinc-400">{tier.price}</span>
        </div>
        <p className="text-sm text-zinc-400 leading-relaxed mb-3">{result.tierReason}</p>
        <NextLink
          href="/services"
          className="inline-flex items-center gap-1.5 text-sm text-blue-400 hover:text-blue-300 font-medium transition-colors"
        >
          View details
          <ExternalLink size={13} aria-hidden="true" />
        </NextLink>
      </motion.div>

      {/* Email gate — blurred report teaser */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.75 }}
        className="border border-blue-500/30 bg-gradient-to-b from-blue-500/5 to-zinc-900 rounded-xl p-6 relative overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center gap-2 mb-1.5">
          <Sparkles size={16} className="text-blue-400" aria-hidden="true" />
          <h3 className="text-base font-semibold text-zinc-50">
            Unlock Your Full AI Readiness Report
          </h3>
        </div>
        <p className="text-sm text-zinc-400 leading-relaxed mb-5">
          Your personalised report has 5 in-depth sections ready for you:
        </p>

        {/* Blurred report preview cards */}
        <div className="flex flex-col gap-2.5 mb-5">
          {[
            { icon: BarChart3, title: "Deep Industry Analysis", teaser: "How your industry compares to AI adoption benchmarks..." },
            { icon: Target, title: "Competitor Benchmarking", teaser: "What similar businesses are automating and where you..." },
            { icon: TrendingUp, title: "ROI Projections", teaser: "Estimated hours saved per week and cost savings over..." },
            { icon: Calendar, title: "90-Day Action Plan", teaser: "Step-by-step implementation roadmap tailored to your..." },
            { icon: Sparkles, title: "Custom Recommendations", teaser: "Specific AI tools and workflows recommended for..." },
          ].map(({ icon: Icon, title, teaser }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.8 + i * 0.08 }}
              className="flex items-start gap-3 bg-zinc-800/40 border border-zinc-700/30 rounded-lg px-4 py-3 relative overflow-hidden"
            >
              <Icon size={15} className="text-blue-400/70 shrink-0 mt-0.5" aria-hidden="true" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-zinc-200">{title}</p>
                <p className="text-xs text-zinc-500 mt-0.5 select-none" style={{ filter: "blur(4px)" }} aria-hidden="true">
                  {teaser}
                </p>
              </div>
              <Lock size={13} className="text-zinc-600 shrink-0 mt-1" aria-hidden="true" />
            </motion.div>
          ))}
        </div>

        {/* Social proof nudge */}
        <p className="text-xs text-zinc-500 text-center mb-4">
          Takes ~90 seconds to generate. Free, no obligation.
        </p>

        {/* Email form */}
        <form
          onSubmit={(e) => { e.preventDefault(); onEmailSubmit(); }}
          noValidate
          className="flex flex-col sm:flex-row gap-3"
        >
          <input
            type="email"
            required
            aria-label="Email address"
            placeholder="your@email.com"
            value={state.email}
            onChange={(e) => dispatch({ type: "SET_FIELD", field: "email", value: e.target.value })}
            className={cn(inputBase, "flex-1")}
            disabled={state.emailStatus === "loading"}
            autoComplete="email"
          />
          <button
            type="submit"
            disabled={state.emailStatus === "loading"}
            className={cn(
              "inline-flex items-center justify-center gap-2 font-semibold rounded-lg",
              "bg-blue-500 text-white border border-blue-500",
              "hover:bg-blue-600 hover:border-blue-600 active:scale-[0.98]",
              "transition-all duration-200 px-5 py-3 text-sm shrink-0",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-900",
              "disabled:opacity-60 disabled:cursor-not-allowed"
            )}
          >
            {state.emailStatus === "loading" ? (
              <>
                <Spinner />
                Generating...
              </>
            ) : (
              "Send My Full Report"
            )}
          </button>
        </form>

        {state.emailStatus === "error" && (
          <p role="alert" className="text-sm text-red-400 mt-3 bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-2.5">
            {state.emailError}
          </p>
        )}
      </motion.div>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Complete step
// ---------------------------------------------------------------------------

function CompleteStep({ result }: { result: AuditResult }) {
  return (
    <motion.div
      key="complete"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col gap-7"
    >
      {/* Confirmation banner */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
        className="flex flex-col items-center gap-4 py-6 text-center"
        role="alert"
        aria-live="polite"
      >
        <div className="w-16 h-16 rounded-full bg-green-500/15 border border-green-500/30 flex items-center justify-center">
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#10b981"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <div>
          <h3 className="text-xl font-bold text-zinc-50 mb-2">Your full report is being generated!</h3>
          <p className="text-sm text-zinc-400 leading-relaxed max-w-sm mx-auto">
            Your personalised 5-section AI Readiness Report is being created right now. You&apos;ll receive it by email within 2 minutes.
          </p>
        </div>
        <NextLink
          href="/services"
          className="inline-flex items-center gap-1.5 text-sm text-blue-400 hover:text-blue-300 font-medium transition-colors"
        >
          In the meantime, explore our services
          <ExternalLink size={13} aria-hidden="true" />
        </NextLink>
      </motion.div>

      {/* Results still visible */}
      <div className="border-t border-zinc-800 pt-7">
        <p className="text-xs font-semibold tracking-widest uppercase text-zinc-500 mb-4">Your Instant Results</p>
        <div className="flex flex-col items-center gap-2 mb-5">
          <ScoreCircle score={result.score} />
          <p className="text-sm font-semibold text-zinc-300">{result.scoreLabel}</p>
        </div>
        <div className="bg-zinc-800/50 border border-zinc-700/50 rounded-xl p-4">
          <p className="text-sm text-zinc-400 leading-relaxed">{result.summary}</p>
        </div>
      </div>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Small spinner SVG
// ---------------------------------------------------------------------------

function Spinner() {
  return (
    <svg
      className="animate-spin h-4 w-4"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export default function InstantAudit() {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const formId = useId();
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll to top of card when step changes
  useEffect(() => {
    if (state.step !== "input") {
      containerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [state.step]);

  // Fire-and-forget: log audit completion to Notion via /api/audit-log
  const logAuditCompletion = useCallback(
    (result: AuditResult) => {
      const findingsSummary = result.findings
        .map((f) => `[${f.severity.toUpperCase()}] ${f.title}`)
        .join("; ");

      fetch("/api/audit-log", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          businessName: state.businessName.trim(),
          industry: state.industry,
          city: "", // city not collected in current form
          score: result.score,
          findings: findingsSummary,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.notionPageId) {
            dispatch({ type: "SET_NOTION_PAGE_ID", id: data.notionPageId });
          }
        })
        .catch((err) => {
          // Non-blocking — don't disrupt user experience
          console.error("[InstantAudit] audit-log failed:", err);
        });
    },
    [state.businessName, state.industry]
  );

  const runAudit = useCallback(async () => {
    if (!state.businessName.trim() || !state.industry) return;

    dispatch({ type: "START_GENERATING" });
    markAuditStarted();
    trackAuditStarted(state.industry);

    try {
      const response = await fetch("/api/instant-audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          businessName: state.businessName.trim(),
          industry: state.industry,
          websiteUrl: state.noWebsite ? "" : state.websiteUrl.trim(),
        }),
      });

      if (!response.ok) {
        const err = await response.json().catch(() => ({ error: "Request failed." }));
        dispatch({ type: "AUDIT_ERROR", message: err.error ?? "Something went wrong. Please try again." });
        return;
      }

      const contentType = response.headers.get("content-type") ?? "";

      if (contentType.includes("text/event-stream") && response.body) {
        // Streaming path
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let accumulated = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const chunk = decoder.decode(value, { stream: true });
          const lines = chunk.split("\n");

          for (const line of lines) {
            if (!line.startsWith("data: ")) continue;
            const raw = line.slice(6).trim();
            if (raw === "[DONE]") continue;
            try {
              const { text } = JSON.parse(raw) as { text: string };
              accumulated += text;
            } catch {
              // Non-JSON chunk
            }
          }
        }

        // Strip markdown code fences if Claude wraps in them
        let cleaned = accumulated.trim();
        if (cleaned.startsWith("```")) {
          cleaned = cleaned.replace(/^```(?:json)?\n?/, "").replace(/\n?```$/, "");
        }

        const result = JSON.parse(cleaned) as AuditResult;
        localStorage.setItem("oc_instant_audit", JSON.stringify(result));
        trackAuditCompleted(state.industry, result.score);
        if (typeof window.fbq === "function") {
          window.fbq("track", "Lead", { content_name: "AI Audit", content_category: state.industry });
        }
        dispatch({ type: "SET_RESULT", result });
        logAuditCompletion(result);
      } else {
        // Non-streaming fallback
        const result = (await response.json()) as AuditResult;
        localStorage.setItem("oc_instant_audit", JSON.stringify(result));
        trackAuditCompleted(state.industry, result.score);
        if (typeof window.fbq === "function") {
          window.fbq("track", "Lead", { content_name: "AI Audit", content_category: state.industry });
        }
        dispatch({ type: "SET_RESULT", result });
        logAuditCompletion(result);
      }
    } catch (err) {
      console.error("[InstantAudit] error:", err);
      dispatch({
        type: "AUDIT_ERROR",
        message: "Something went wrong. Please try again.",
      });
    }
  }, [state.businessName, state.industry, state.websiteUrl, state.noWebsite, logAuditCompletion]);

  const submitEmail = useCallback(async () => {
    const email = state.email.trim();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      dispatch({ type: "EMAIL_ERROR", message: "Please enter a valid email address." });
      return;
    }

    dispatch({ type: "EMAIL_LOADING" });

    try {
      const res = await fetch("/api/audit-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          businessName: state.businessName.trim(),
          yourName: state.businessName.trim(), // best we have without a name field here
          email,
          industry: state.industry,
          website: state.noWebsite ? "" : state.websiteUrl.trim(),
          headache: "Submitted via Instant Audit — see instantAuditResults for context.",
          instantAuditResults: state.result,
        }),
      });

      const data = await res.json().catch(() => ({ success: false }));

      if (!res.ok || !data.success) {
        dispatch({
          type: "EMAIL_ERROR",
          message: data.message ?? "Could not send your report. Please try again.",
        });
        return;
      }

      // Fire-and-forget: update the Notion audit record with the email
      if (state.notionPageId) {
        fetch("/api/audit-log", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            notionPageId: state.notionPageId,
            email,
          }),
        }).catch((err) => {
          console.error("[InstantAudit] audit-log email update failed:", err);
        });
      }

      markAuditCompleted();
      trackAuditEmailSubmitted(state.industry);
      dispatch({ type: "COMPLETE" });
    } catch {
      dispatch({ type: "EMAIL_ERROR", message: "Network error. Please try again." });
    }
  }, [state.email, state.businessName, state.industry, state.websiteUrl, state.noWebsite, state.result, state.notionPageId]);

  return (
    <>
      {/* Shimmer CSS injected once */}
      <style>{`
        @keyframes shimmer {
          0% { background-position: -400px 0; }
          100% { background-position: 400px 0; }
        }
        .shimmer-line {
          background: linear-gradient(90deg, #3f3f46 25%, #52525b 50%, #3f3f46 75%);
          background-size: 800px 100%;
          animation: shimmer 1.6s infinite linear;
        }
        .shimmer-overlay {
          background: linear-gradient(90deg, transparent 25%, rgba(255,255,255,0.04) 50%, transparent 75%);
          background-size: 800px 100%;
          animation: shimmer 1.6s infinite linear;
        }
      `}</style>

      <div
        ref={containerRef}
        className="bg-zinc-900 border border-zinc-800 rounded-2xl p-7 sm:p-8 scroll-mt-24"
        role="region"
        aria-label="Instant AI Readiness Audit"
      >
        {/* Heading — shown on input step only */}
        {state.step === "input" && (
          <div className="mb-7">
            <h2 id={`${formId}-heading`} className="text-xl font-bold text-zinc-50 mb-1.5">
              Run your instant audit
            </h2>
            <p className="text-sm text-zinc-400">
              Enter your business details below — AI analysis in seconds.
            </p>
          </div>
        )}

        {/* Step transitions */}
        <AnimatePresence mode="wait">
          {state.step === "input" && (
            <InputStep
              key="input"
              state={state}
              dispatch={dispatch}
              formId={formId}
              onSubmit={runAudit}
            />
          )}

          {state.step === "generating" && (
            <GeneratingStep key="generating" />
          )}

          {(state.step === "results" || state.step === "email-capture") && state.result && (
            <ResultsStep
              key="results"
              result={state.result}
              formId={formId}
              state={state}
              dispatch={dispatch}
              onEmailSubmit={submitEmail}
            />
          )}

          {state.step === "complete" && state.result && (
            <CompleteStep key="complete" result={state.result} />
          )}
        </AnimatePresence>

        {/* Reset link — shown after results */}
        {(state.step === "results" || state.step === "complete") && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-6 pt-5 border-t border-zinc-800 text-center"
          >
            <button
              onClick={() => dispatch({ type: "RESET" })}
              className="text-xs text-zinc-500 hover:text-zinc-400 transition-colors underline underline-offset-2"
            >
              Start a new audit
            </button>
          </motion.div>
        )}
      </div>
    </>
  );
}
