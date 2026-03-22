"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Mail } from "lucide-react";

interface NewsletterSignupProps {
  /** Compact mode for footer — hides headline, tighter spacing */
  compact?: boolean;
}

export default function NewsletterSignup({
  compact = false,
}: NewsletterSignupProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;

    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(
          data.message ?? "Something went wrong. Please try again."
        );
      }

      setStatus("success");
      setEmail("");
    } catch (err) {
      setStatus("error");
      setErrorMsg(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      );
    }
  }

  // ── Compact version (footer) ──────────────────────────────────────────
  if (compact) {
    if (status === "success") {
      return (
        <p className="text-sm text-emerald-400" role="alert" aria-live="polite">
          You&apos;re in! Check your inbox.
        </p>
      );
    }

    return (
      <div>
        <h3 className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-3">
          The AI Operator Newsletter
        </h3>
        <form
          onSubmit={handleSubmit}
          className="flex gap-2"
          aria-label="Newsletter signup"
        >
          <label htmlFor="newsletter-email-compact" className="sr-only">Email address</label>
          <input
            id="newsletter-email-compact"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 min-w-0 bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-50 placeholder:text-zinc-500 transition-colors duration-150 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className={cn(
              "shrink-0 rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium text-white",
              "hover:bg-blue-600 transition-colors duration-150",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950",
              "disabled:opacity-60 disabled:cursor-not-allowed"
            )}
          >
            {status === "loading" ? "..." : "Subscribe"}
          </button>
        </form>
        {status === "error" && (
          <p className="mt-2 text-xs text-red-400" role="alert">
            {errorMsg}
          </p>
        )}
      </div>
    );
  }

  // ── Full version (homepage section) ───────────────────────────────────
  if (status === "success") {
    return (
      <section className="bg-zinc-900/40 py-24" aria-label="Newsletter">
        <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-xl text-center">
            <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-blue-500/20 border border-blue-500/30">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-blue-400"
                aria-hidden="true"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-zinc-50">
              You&apos;re subscribed!
            </h3>
            <p
              className="mt-2 text-sm text-zinc-400"
              role="alert"
              aria-live="polite"
            >
              Check your inbox for a welcome email from The AI Operator.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-zinc-900/40 py-24" aria-label="Newsletter">
      <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-xl text-center">
          {/* Icon */}
          <div className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10">
            <Mail size={22} className="text-blue-400" aria-hidden="true" />
          </div>

          {/* Headline */}
          <span className="text-xs font-semibold uppercase tracking-widest text-blue-500">
            Newsletter
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-zinc-50 sm:text-4xl">
            Get The AI Operator
          </h2>
          <p className="mt-4 text-base leading-relaxed text-zinc-400">
            Weekly AI wins for your business. No jargon. No fluff.
          </p>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-3 sm:items-start justify-center"
            aria-label="Newsletter signup"
          >
            <label htmlFor="newsletter-email" className="sr-only">Email address</label>
            <input
              id="newsletter-email"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full sm:w-80 bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-3 text-sm text-zinc-50 placeholder:text-zinc-500 transition-colors duration-150 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className={cn(
                "inline-flex items-center justify-center gap-2 font-medium rounded-lg",
                "bg-blue-500 text-white border border-blue-500",
                "hover:bg-blue-600 hover:border-blue-600",
                "transition-all duration-200 px-6 py-3 text-sm",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950",
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
                  Subscribing...
                </>
              ) : (
                "Subscribe"
              )}
            </button>
          </form>

          {/* Error */}
          {status === "error" && (
            <p
              className="mt-4 text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3 mx-auto max-w-sm"
              role="alert"
            >
              {errorMsg}
            </p>
          )}

          {/* Privacy note */}
          <p className="mt-5 text-xs text-zinc-600">
            No spam. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </section>
  );
}
