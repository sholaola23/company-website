"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

export default function RankReadyWaitlist() {
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
        body: JSON.stringify({
          email: email.trim(),
          tag: "source-rankready-waitlist",
        }),
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

  if (status === "success") {
    return (
      <div className="bg-zinc-900 border border-emerald-500/30 rounded-xl p-8 text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/20 border border-emerald-500/30">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-emerald-400"
            aria-hidden="true"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <p className="text-lg font-semibold text-zinc-50 mb-1">
          You&apos;re on the list.
        </p>
        <p
          className="text-sm text-zinc-400"
          role="alert"
          aria-live="polite"
        >
          We&apos;ll email you when RankReady launches. Check your inbox for a
          confirmation.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-8">
      <p className="text-xs font-semibold uppercase tracking-widest text-blue-500 mb-2">
        Coming Soon
      </p>
      <h3 className="text-xl font-bold text-zinc-50 mb-2">
        Get Early Access to RankReady
      </h3>
      <p className="text-zinc-400 text-sm mb-6">
        The automated local SEO audit tool that runs this entire 20-task
        checklist for your business. Enter your email to be first in line.
      </p>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 sm:flex-row sm:gap-3"
        aria-label="RankReady waitlist signup"
      >
        <label htmlFor="rankready-email" className="sr-only">
          Email address
        </label>
        <input
          id="rankready-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 min-w-0 bg-zinc-950 border border-zinc-700 rounded-lg px-4 py-3 text-sm text-zinc-50 placeholder:text-zinc-500 transition-colors duration-150 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className={cn(
            "shrink-0 inline-flex items-center justify-center gap-2 font-medium rounded-lg",
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
              Joining...
            </>
          ) : (
            "Join the Waitlist"
          )}
        </button>
      </form>

      {status === "error" && (
        <p
          className="mt-4 text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3"
          role="alert"
        >
          {errorMsg}
        </p>
      )}

      <p className="mt-4 text-xs text-zinc-600">
        No spam. We&apos;ll only email you about RankReady.
      </p>
    </div>
  );
}
