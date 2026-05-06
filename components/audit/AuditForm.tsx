"use client";

import { useState, useId } from "react";
import { cn } from "@/lib/utils";

const INDUSTRIES = [
  "Cleaning",
  "Plumbing",
  "Salon / Barber",
  "Restaurant / Cafe",
  "Gym / Fitness",
  "Trades",
  "Healthcare",
  "Property",
  "Coaching",
  "Retail",
  "Other",
] as const;

interface FormState {
  businessName: string;
  yourName: string;
  email: string;
  phone: string;
  industry: string;
  website: string;
  headache: string;
}

const INITIAL: FormState = {
  businessName: "",
  yourName: "",
  email: "",
  phone: "",
  industry: "",
  website: "",
  headache: "",
};

const inputBase =
  "w-full bg-[var(--color-bg-alt)] border border-[var(--color-border)] rounded-lg px-4 py-3 text-sm text-[var(--color-heading)] placeholder:text-[var(--color-muted)] transition-colors duration-150 focus:outline-none focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)]";

export default function AuditForm() {
  const [form, setForm] = useState<FormState>(INITIAL);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const formId = useId();

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/audit-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message ?? "Something went wrong. Please try again.");
      }

      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMsg(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
    }
  }

  if (status === "success") {
    return (
      <div
        className="flex flex-col items-center gap-4 py-12 text-center"
        role="alert"
        aria-live="polite"
      >
        <div className="w-14 h-14 rounded-full bg-[var(--color-primary)]/20 border border-[var(--color-primary)]/30 flex items-center justify-center">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-[var(--color-primary)]"
            aria-hidden="true"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-[var(--color-heading)]">Audit request confirmed</h3>
        <p className="text-[var(--color-body)] max-w-sm text-sm leading-relaxed">
          Your audit request is confirmed! Check your email — we&apos;ve sent
          you a confirmation. Your personalised AI Readiness Audit will be ready
          within 48 hours.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      aria-labelledby={`${formId}-heading`}
      className="flex flex-col gap-5"
    >
      {/* Row: Business name + Your name */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor={`${formId}-businessName`}
            className="text-sm font-medium text-[var(--color-muted)]"
          >
            Business Name <span className="text-[var(--color-primary)]">*</span>
          </label>
          <input
            id={`${formId}-businessName`}
            name="businessName"
            type="text"
            required
            autoComplete="organization"
            placeholder="Acme Cleaning Co."
            value={form.businessName}
            onChange={handleChange}
            className={inputBase}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor={`${formId}-yourName`}
            className="text-sm font-medium text-[var(--color-muted)]"
          >
            Your Name <span className="text-[var(--color-primary)]">*</span>
          </label>
          <input
            id={`${formId}-yourName`}
            name="yourName"
            type="text"
            required
            autoComplete="name"
            placeholder="Jane Smith"
            value={form.yourName}
            onChange={handleChange}
            className={inputBase}
          />
        </div>
      </div>

      {/* Row: Email + Phone */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor={`${formId}-email`}
            className="text-sm font-medium text-[var(--color-muted)]"
          >
            Email <span className="text-[var(--color-primary)]">*</span>
          </label>
          <input
            id={`${formId}-email`}
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="jane@example.com"
            value={form.email}
            onChange={handleChange}
            className={inputBase}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor={`${formId}-phone`}
            className="text-sm font-medium text-[var(--color-muted)]"
          >
            Phone{" "}
            <span className="text-[var(--color-muted)] font-normal">(optional)</span>
          </label>
          <input
            id={`${formId}-phone`}
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="+44 7700 900000"
            value={form.phone}
            onChange={handleChange}
            className={inputBase}
          />
        </div>
      </div>

      {/* Row: Industry + Website */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor={`${formId}-industry`}
            className="text-sm font-medium text-[var(--color-muted)]"
          >
            Industry <span className="text-[var(--color-primary)]">*</span>
          </label>
          <select
            id={`${formId}-industry`}
            name="industry"
            required
            value={form.industry}
            onChange={handleChange}
            className={cn(inputBase, "cursor-pointer")}
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

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor={`${formId}-website`}
            className="text-sm font-medium text-[var(--color-muted)]"
          >
            Website URL{" "}
            <span className="text-[var(--color-muted)] font-normal">(optional)</span>
          </label>
          <input
            id={`${formId}-website`}
            name="website"
            type="url"
            autoComplete="url"
            placeholder="https://example.com"
            value={form.website}
            onChange={handleChange}
            className={inputBase}
          />
        </div>
      </div>

      {/* Headache textarea */}
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor={`${formId}-headache`}
          className="text-sm font-medium text-[var(--color-muted)]"
        >
          What&apos;s your biggest operational headache?{" "}
          <span className="text-[var(--color-primary)]">*</span>
        </label>
        <textarea
          id={`${formId}-headache`}
          name="headache"
          required
          rows={4}
          placeholder="e.g. We spend 3 hours a day chasing unpaid invoices by hand..."
          value={form.headache}
          onChange={handleChange}
          className={cn(inputBase, "resize-none leading-relaxed")}
        />
      </div>

      {/* Error message */}
      {status === "error" && (
        <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3" role="alert">
          {errorMsg}
        </p>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={status === "loading"}
        className={cn(
          "inline-flex items-center justify-center gap-2 font-medium rounded-lg",
          "bg-[var(--color-primary)] text-[var(--color-bg)] border border-[var(--color-primary)]",
          "hover:bg-[var(--color-primary-hover)] hover:border-[var(--color-primary)]",
          "transition-all duration-200 px-6 py-3.5 text-base",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-white",
          "disabled:opacity-60 disabled:cursor-not-allowed"
        )}
      >
        {status === "loading" ? (
          <>
            <svg
              className="animate-spin h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8H4z"
              />
            </svg>
            Sending...
          </>
        ) : (
          <>
            Request My Free Audit
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </>
        )}
      </button>

      <p className="text-xs text-[var(--color-muted)] text-center">
        No spam. No obligation. Just a clear, actionable report within 48 hours.
      </p>
    </form>
  );
}
