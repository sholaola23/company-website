"use client";

import { useEffect, useState } from "react";

const CONSENT_KEY = "workcrew_cookie_consent_v1";

type Consent = "accepted" | "rejected" | null;

export default function CookieBanner() {
  const [consent, setConsent] = useState<Consent>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const saved = localStorage.getItem(CONSENT_KEY);
      if (saved === "accepted" || saved === "rejected") {
        setConsent(saved);
      }
    } catch {
      // localStorage unavailable — show banner
    }
  }, []);

  const record = (choice: "accepted" | "rejected") => {
    try {
      localStorage.setItem(CONSENT_KEY, choice);
      localStorage.setItem(`${CONSENT_KEY}_at`, new Date().toISOString());
    } catch {
      // ignore
    }
    setConsent(choice);

    // Emit a custom event so analytics loaders can react
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("workcrew:consent", { detail: { choice } })
      );
    }
  };

  if (!mounted) return null;
  if (consent !== null) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie consent"
      className="fixed bottom-4 left-4 right-4 md:left-6 md:right-auto md:max-w-md z-[90] rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] shadow-lg p-4 md:p-5 text-sm text-[var(--color-body)]"
    >
      <p className="font-semibold text-[var(--color-heading)] mb-2">We use cookies</p>
      <p className="text-[var(--color-body)] mb-4 leading-relaxed">
        We use essential cookies to make this site work. With your consent, we
        also use analytics cookies to understand how visitors use the site and
        improve it. Read our{" "}
        <a href="/privacy" className="text-[var(--color-primary)] hover:underline">
          Privacy Policy
        </a>
        .
      </p>
      {/* EQUAL PROMINENCE — ICO 2025 guidance. Both buttons same style/size/weight. */}
      <div className="flex flex-col sm:flex-row gap-2">
        <button
          type="button"
          onClick={() => record("accepted")}
          className="flex-1 bg-[var(--color-dark)] text-[var(--color-bg)] text-sm font-medium px-4 py-2 rounded-md hover:bg-[var(--color-dark-surface)] transition focus:outline-none focus:ring-2 focus:ring-slate-400"
        >
          Accept all
        </button>
        <button
          type="button"
          onClick={() => record("rejected")}
          className="flex-1 bg-[var(--color-dark)] text-[var(--color-bg)] text-sm font-medium px-4 py-2 rounded-md hover:bg-[var(--color-dark-surface)] transition focus:outline-none focus:ring-2 focus:ring-slate-400"
        >
          Reject non-essential
        </button>
      </div>
    </div>
  );
}

/**
 * Helper to read the current consent state from any client component.
 * Returns "accepted" | "rejected" | null.
 */
export function getStoredConsent(): Consent {
  if (typeof window === "undefined") return null;
  try {
    const saved = localStorage.getItem(CONSENT_KEY);
    if (saved === "accepted" || saved === "rejected") return saved;
  } catch {
    // ignore
  }
  return null;
}
