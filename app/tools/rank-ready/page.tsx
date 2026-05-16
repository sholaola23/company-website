"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Star,
  FileText,
  ArrowRight,
  CheckCircle,
  Loader2,
  AlertCircle,
} from "lucide-react";

// ---------------------------------------------------------------------------
// Types (inline to avoid SSR import issues with shared types)
// ---------------------------------------------------------------------------

interface CompetitorEntry {
  name: string;
  url: string;
}

interface FormState {
  // Business Basics
  businessName: string;
  address: string;
  phone: string;
  website: string;
  gbpUrl: string;
  yearsInBusiness: string;
  // Services
  primaryService: string;
  secondaryServices: string[];
  serviceAreas: string[];
  targetCustomer: string;
  // Competitors
  competitors: CompetitorEntry[];
  // Current State
  reviewCount: string;
  starRating: string;
  biggestProblem: string;
  // Contact
  email: string;
}

const INITIAL_STATE: FormState = {
  businessName: "",
  address: "",
  phone: "",
  website: "",
  gbpUrl: "",
  yearsInBusiness: "",
  primaryService: "",
  secondaryServices: ["", "", "", ""],
  serviceAreas: ["", "", "", "", ""],
  targetCustomer: "",
  competitors: [
    { name: "", url: "" },
    { name: "", url: "" },
    { name: "", url: "" },
  ],
  reviewCount: "",
  starRating: "",
  biggestProblem: "",
  email: "",
};

// ---------------------------------------------------------------------------
// Step indicators
// ---------------------------------------------------------------------------

const STEPS = [
  { label: "Business", icon: MapPin },
  { label: "Services", icon: FileText },
  { label: "Competitors", icon: Star },
  { label: "Current State", icon: CheckCircle },
] as const;

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function RankReadyPage() {
  const [form, setForm] = useState<FormState>(INITIAL_STATE);
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState<"preview" | "full" | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [cancelled, setCancelled] = useState(false);

  // Check URL params for cancelled state on mount
  // (handled via useEffect would be cleaner but keeping simple)
  if (typeof window !== "undefined" && !cancelled) {
    const params = new URLSearchParams(window.location.search);
    if (params.get("cancelled") === "true") {
      setCancelled(true);
    }
  }

  // --- Field helpers ---
  const set = useCallback(
    (field: keyof FormState, value: string) =>
      setForm((prev) => ({ ...prev, [field]: value })),
    []
  );

  const setArrayItem = useCallback(
    (field: "secondaryServices" | "serviceAreas", idx: number, value: string) =>
      setForm((prev) => {
        const arr = [...prev[field]];
        arr[idx] = value;
        return { ...prev, [field]: arr };
      }),
    []
  );

  const setCompetitor = useCallback(
    (idx: number, key: keyof CompetitorEntry, value: string) =>
      setForm((prev) => {
        const comps = [...prev.competitors];
        comps[idx] = { ...comps[idx], [key]: value };
        return { ...prev, competitors: comps };
      }),
    []
  );

  // --- Validation ---
  const canProceed = (): boolean => {
    switch (step) {
      case 0:
        return !!(form.businessName.trim() && form.address.trim() && form.phone.trim());
      case 1:
        return !!(form.primaryService.trim() && form.serviceAreas[0]?.trim() && form.targetCustomer.trim());
      case 2:
        return !!form.competitors[0]?.name.trim();
      case 3:
        return true; // All optional on last step
      default:
        return false;
    }
  };

  // --- Build form data payload ---
  const buildPayload = () => ({
    businessName: form.businessName.trim(),
    address: form.address.trim(),
    phone: form.phone.trim(),
    website: form.website.trim() || undefined,
    gbpUrl: form.gbpUrl.trim() || undefined,
    yearsInBusiness: parseInt(form.yearsInBusiness) || 1,
    primaryService: form.primaryService.trim(),
    secondaryServices: form.secondaryServices.filter((s) => s.trim()),
    serviceAreas: form.serviceAreas.filter((s) => s.trim()),
    targetCustomer: form.targetCustomer.trim(),
    competitors: form.competitors
      .filter((c) => c.name.trim())
      .map((c) => ({ name: c.name.trim(), url: c.url.trim() || undefined })),
    reviewCount: parseInt(form.reviewCount) || undefined,
    starRating: parseFloat(form.starRating) || undefined,
    biggestProblem: form.biggestProblem.trim() || undefined,
    email: form.email.trim() || undefined,
  });

  // --- Submit: Free Preview ---
  const handlePreview = async () => {
    if (!form.email.trim()) {
      setError("Please enter your email address for the free preview.");
      return;
    }
    setError(null);
    setSubmitting("preview");

    try {
      const res = await fetch("/api/rank-ready/preview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...buildPayload(), email: form.email.trim() }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({ message: "Something went wrong." }));
        throw new Error(data.message || "Failed to generate preview.");
      }

      const data = await res.json();
      // Redirect to report page with preview data in session storage
      if (typeof window !== "undefined") {
        sessionStorage.setItem("rankready-preview", JSON.stringify(data));
        window.location.href = "/tools/rank-ready/report?type=preview";
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSubmitting(null);
    }
  };

  // --- Submit: Full Report (Stripe) ---
  const handleFullReport = async () => {
    if (!form.email.trim()) {
      setError("Please enter your email address for the full report.");
      return;
    }
    setError(null);
    setSubmitting("full");

    try {
      const res = await fetch("/api/rank-ready/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...buildPayload(), email: form.email.trim() }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({ message: "Something went wrong." }));
        throw new Error(data.message || "Failed to create checkout session.");
      }

      const { url } = await res.json();
      if (url) {
        window.location.href = url;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSubmitting(null);
    }
  };

  // --- Render step content ---
  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-[var(--color-heading)] mb-1">
              Business Basics
            </h3>
            <p className="text-sm text-[var(--color-body)] mb-4">
              Tell us about your business so we can tailor the audit.
            </p>
            <Field
              label="Business Name *"
              value={form.businessName}
              onChange={(v) => set("businessName", v)}
              placeholder="e.g. Smith's Plumbing"
            />
            <Field
              label="Business Address / City *"
              value={form.address}
              onChange={(v) => set("address", v)}
              placeholder="e.g. 12 High Street, Manchester"
            />
            <Field
              label="Phone Number *"
              value={form.phone}
              onChange={(v) => set("phone", v)}
              placeholder="e.g. 0161 123 4567"
              type="tel"
            />
            <Field
              label="Website (optional)"
              value={form.website}
              onChange={(v) => set("website", v)}
              placeholder="e.g. https://smithsplumbing.co.uk"
              type="url"
            />
            <Field
              label="Google Business Profile URL (optional)"
              value={form.gbpUrl}
              onChange={(v) => set("gbpUrl", v)}
              placeholder="e.g. https://g.co/kgs/abc123"
              type="url"
            />
            <Field
              label="Years in Business"
              value={form.yearsInBusiness}
              onChange={(v) => set("yearsInBusiness", v)}
              placeholder="e.g. 5"
              type="number"
            />
          </div>
        );

      case 1:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-[var(--color-heading)] mb-1">
              Your Services
            </h3>
            <p className="text-sm text-[var(--color-body)] mb-4">
              What do you do and where do you serve customers?
            </p>
            <Field
              label="Primary Service *"
              value={form.primaryService}
              onChange={(v) => set("primaryService", v)}
              placeholder="e.g. Emergency Plumbing"
            />
            <div>
              <label className="block text-sm font-medium text-[var(--color-muted)] mb-2">
                Other Services (up to 4)
              </label>
              {form.secondaryServices.map((s, i) => (
                <input
                  key={i}
                  type="text"
                  value={s}
                  onChange={(e) => setArrayItem("secondaryServices", i, e.target.value)}
                  placeholder={`Service ${i + 2}`}
                  className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)]/80 px-4 py-2.5 text-sm text-[var(--color-heading)] placeholder-slate-400 focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] outline-none mb-2"
                />
              ))}
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--color-muted)] mb-2">
                Service Areas (up to 5 cities) *
              </label>
              {form.serviceAreas.map((a, i) => (
                <input
                  key={i}
                  type="text"
                  value={a}
                  onChange={(e) => setArrayItem("serviceAreas", i, e.target.value)}
                  placeholder={i === 0 ? "Primary city *" : `City ${i + 1}`}
                  className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)]/80 px-4 py-2.5 text-sm text-[var(--color-heading)] placeholder-slate-400 focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] outline-none mb-2"
                />
              ))}
            </div>
            <Field
              label="Target Customer *"
              value={form.targetCustomer}
              onChange={(v) => set("targetCustomer", v)}
              placeholder="e.g. Homeowners with boiler issues"
            />
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-[var(--color-heading)] mb-1">
              Your Competitors
            </h3>
            <p className="text-sm text-[var(--color-body)] mb-4">
              Name up to 3 local competitors. We will compare your SEO positioning
              against theirs.
            </p>
            {form.competitors.map((comp, i) => (
              <div key={i} className="space-y-2">
                <label className="block text-sm font-medium text-[var(--color-muted)]">
                  Competitor {i + 1} {i === 0 ? "*" : "(optional)"}
                </label>
                <input
                  type="text"
                  value={comp.name}
                  onChange={(e) => setCompetitor(i, "name", e.target.value)}
                  placeholder="Competitor name"
                  className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)]/80 px-4 py-2.5 text-sm text-[var(--color-heading)] placeholder-slate-400 focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] outline-none"
                />
                <input
                  type="url"
                  value={comp.url}
                  onChange={(e) => setCompetitor(i, "url", e.target.value)}
                  placeholder="Website or GBP URL (optional)"
                  className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)]/80 px-4 py-2.5 text-sm text-[var(--color-heading)] placeholder-slate-400 focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] outline-none"
                />
              </div>
            ))}
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-[var(--color-heading)] mb-1">
              Current State & Contact
            </h3>
            <p className="text-sm text-[var(--color-body)] mb-4">
              Help us understand where you are today. All fields optional except email.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <Field
                label="Google Review Count"
                value={form.reviewCount}
                onChange={(v) => set("reviewCount", v)}
                placeholder="e.g. 47"
                type="number"
              />
              <Field
                label="Star Rating"
                value={form.starRating}
                onChange={(v) => set("starRating", v)}
                placeholder="e.g. 4.6"
                type="number"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--color-muted)] mb-2">
                Biggest SEO Challenge
              </label>
              <textarea
                value={form.biggestProblem}
                onChange={(e) => set("biggestProblem", e.target.value)}
                placeholder="e.g. We don't show up in Google Maps for our area..."
                rows={3}
                className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)]/80 px-4 py-2.5 text-sm text-[var(--color-heading)] placeholder-slate-400 focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] outline-none resize-none"
              />
            </div>
            <Field
              label="Email Address *"
              value={form.email}
              onChange={(v) => set("email", v)}
              placeholder="your@email.com"
              type="email"
            />
          </div>
        );
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
      {/* Hero */}
      <div className="max-w-2xl mx-auto text-center mb-10">
        <span className="text-xs font-semibold tracking-widest uppercase text-[var(--color-success)] mb-4 block">
          RankReady by WorkCrew
        </span>
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-[-0.03em] text-[var(--color-heading)] leading-tight tracking-tight mb-5">
          Get Your Local SEO Action Plan in 10&nbsp;Minutes
        </h1>
        <p className="text-lg text-[var(--color-body)] leading-relaxed">
          Fill in one form. Our AI analyses your business, competitors, and
          Google presence — then gives you a complete action plan.
        </p>
      </div>

      {/* Social Proof */}
      <div className="flex flex-wrap items-center justify-center gap-4 mb-10 text-xs text-[var(--color-muted)]">
        <span className="flex items-center gap-1.5">
          <Star className="h-3.5 w-3.5 text-yellow-500" />
          Based on a methodology with 2.6M+ views
        </span>
        <span className="hidden sm:inline text-[var(--color-body)]">|</span>
        <span>
          Powered by the same AI that helps E&apos;Manuel Bakery save 15+ hours/week
        </span>
      </div>

      {/* Cancelled banner */}
      {cancelled && (
        <div className="max-w-2xl mx-auto mb-6 rounded-lg border border-yellow-500/30 bg-yellow-500/10 px-4 py-3 text-sm text-yellow-700 text-center">
          Payment was cancelled. You can still get the free preview or try again.
        </div>
      )}

      {/* Step indicator */}
      <div className="max-w-2xl mx-auto mb-8">
        <div className="flex items-center justify-between">
          {STEPS.map((s, i) => {
            const Icon = s.icon;
            const active = i === step;
            const done = i < step;
            return (
              <button
                key={s.label}
                onClick={() => i < step && setStep(i)}
                className={`flex flex-col items-center gap-1.5 transition-colors ${
                  active
                    ? "text-[var(--color-primary)]"
                    : done
                      ? "text-[var(--color-success)] cursor-pointer"
                      : "text-[var(--color-heading)]"
                }`}
              >
                <div
                  className={`flex items-center justify-center w-9 h-9 rounded-full border ${
                    active
                      ? "border-[var(--color-primary)] bg-[var(--color-primary)]/15"
                      : done
                        ? "border-emerald-500 bg-emerald-500/15"
                        : "border-[var(--color-border)] bg-[var(--color-surface)]/60"
                  }`}
                >
                  {done ? (
                    <CheckCircle className="h-4 w-4" />
                  ) : (
                    <Icon className="h-4 w-4" />
                  )}
                </div>
                <span className="text-[11px] font-medium">{s.label}</span>
              </button>
            );
          })}
        </div>
        {/* Progress bar */}
        <div className="mt-3 h-1 bg-[var(--color-surface)] rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-[var(--color-primary)] rounded-full"
            initial={false}
            animate={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Form Card */}
      <div className="max-w-2xl mx-auto">
        <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-alt)]/60 p-6 sm:p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              {renderStep()}
            </motion.div>
          </AnimatePresence>

          {/* Error */}
          {error && (
            <div className="mt-4 flex items-center gap-2 text-sm text-red-400">
              <AlertCircle className="h-4 w-4 shrink-0" />
              {error}
            </div>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-[var(--color-border)]">
            <button
              onClick={() => setStep((s) => Math.max(0, s - 1))}
              className={`text-sm font-medium text-[var(--color-body)] hover:text-[var(--color-heading)] transition-colors ${
                step === 0 ? "invisible" : ""
              }`}
            >
              Back
            </button>

            {step < STEPS.length - 1 ? (
              <button
                onClick={() => canProceed() && setStep((s) => s + 1)}
                disabled={!canProceed()}
                className="flex items-center gap-2 rounded-lg bg-[var(--color-primary)] px-6 py-2.5 text-sm font-semibold text-[var(--color-bg)] hover:bg-[var(--color-primary-hover)] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Next
                <ArrowRight className="h-4 w-4" />
              </button>
            ) : (
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handlePreview}
                  disabled={!!submitting}
                  className="flex items-center justify-center gap-2 rounded-lg border border-[var(--color-primary)]/40 bg-[var(--color-primary)]/10 px-5 py-2.5 text-sm font-semibold text-[var(--color-primary)] hover:bg-[var(--color-primary-hover)]/20 transition-colors disabled:opacity-40"
                >
                  {submitting === "preview" ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : null}
                  Get Free Preview
                </button>
                <button
                  onClick={handleFullReport}
                  disabled={!!submitting}
                  className="flex items-center justify-center gap-2 rounded-lg bg-[var(--color-success)] px-5 py-2.5 text-sm font-semibold text-[var(--color-bg)] hover:bg-emerald-500 transition-colors disabled:opacity-40"
                >
                  {submitting === "full" ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : null}
                  Get Full Report
                </button>
              </div>
            )}
          </div>
        </div>

        {/* What you get */}
        <div className="mt-10 grid sm:grid-cols-2 gap-4">
          <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-alt)]/40 p-5">
            <h4 className="text-sm font-semibold text-[var(--color-primary)] mb-2">
              Free Preview (3 outputs)
            </h4>
            <ul className="text-sm text-[var(--color-body)] space-y-1.5">
              <li className="flex items-center gap-2">
                <CheckCircle className="h-3.5 w-3.5 text-[var(--color-primary)]" />
                GBP Description (3 variants)
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-3.5 w-3.5 text-[var(--color-primary)]" />
                Review request templates
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-3.5 w-3.5 text-[var(--color-primary)]" />
                Service page copy
              </li>
            </ul>
          </div>
          <div className="rounded-xl border border-emerald-500/30 bg-[var(--color-success)]/5 p-5">
            <h4 className="text-sm font-semibold text-[var(--color-success)] mb-2">
              Full Report (all 5 outputs)
            </h4>
            <ul className="text-sm text-[var(--color-body)] space-y-1.5">
              <li className="flex items-center gap-2">
                <CheckCircle className="h-3.5 w-3.5 text-[var(--color-success)]" />
                Everything in the free preview
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-3.5 w-3.5 text-[var(--color-success)]" />
                GBP Category Audit vs competitors
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-3.5 w-3.5 text-[var(--color-success)]" />
                4-week GBP posting calendar
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-3.5 w-3.5 text-[var(--color-success)]" />
                Emailed as a branded report
              </li>
            </ul>
          </div>
        </div>

        {/* Trust line */}
        <p className="text-center text-xs text-[var(--color-muted)] mt-6">
          Your data is used only to generate your report. We do not share it with
          anyone.
        </p>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Reusable field component
// ---------------------------------------------------------------------------

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-[var(--color-muted)] mb-2">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)]/80 px-4 py-2.5 text-sm text-[var(--color-heading)] placeholder-slate-400 focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] outline-none"
      />
    </div>
  );
}
