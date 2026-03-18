"use client";

/**
 * PersonalisedCTA
 *
 * Full-width bottom CTA section with dynamic messaging based on visitor behaviour.
 * Mirrors the visual style of the original BottomCTA section in app/page.tsx.
 *
 * Usage:
 *   import PersonalisedCTA from "@/components/shared/PersonalisedCTA";
 *   <PersonalisedCTA />
 *
 * Variant priority (highest → lowest):
 *   1. Started audit, did not complete
 *   2. Completed audit
 *   3. Return visitor with 15+ visit events
 *   4. Viewed /case-studies
 *   5. Viewed /services
 *   6. Default (new visitor / SSR)
 */

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Clock } from "lucide-react";
import { getVisitorProfile, type VisitorProfile } from "@/lib/visitor-tracking";
import { trackCTAClicked } from "@/lib/analytics";

// ---------------------------------------------------------------------------
// CTA variant definitions
// ---------------------------------------------------------------------------

interface CTAVariant {
  key: string;
  heading: string;
  subtext: string;
  buttonLabel: string;
  buttonHref: string;
}

const DEFAULT_VARIANT: CTAVariant = {
  key: "default",
  heading: "Ready to Save 8+ Hours a Week?",
  subtext:
    "Get your free AI Readiness Audit — no obligation, just a clear picture of where AI can help",
  buttonLabel: "Start Your Free Audit",
  buttonHref: "/audit",
};

function resolveVariant(profile: VisitorProfile): CTAVariant {
  // 1. Started audit, did not complete
  if (profile.hasStartedAudit && !profile.hasCompletedAudit) {
    return {
      key: "audit-incomplete",
      heading: "Your Audit is Waiting",
      subtext: "Pick up where you left off — it only takes 30 seconds",
      buttonLabel: "Complete Your Audit",
      buttonHref: "/audit",
    };
  }

  // 2. Completed audit
  if (profile.hasCompletedAudit) {
    return {
      key: "audit-complete",
      heading: "Ready for the Next Step?",
      subtext:
        "You've seen what AI can do for your business. Let's make it happen.",
      buttonLabel: "View Our Services",
      buttonHref: "/services",
    };
  }

  // 3. Return visitor — 15+ individual page-load events (≈ 3+ unique visits)
  if (profile.visitCount >= 15) {
    return {
      key: "return-visitor",
      heading: "Welcome Back",
      subtext:
        "Let's get your AI audit done today — no obligation, just a conversation",
      buttonLabel: "Get Your Audit Now",
      buttonHref: "/audit",
    };
  }

  // 4. Viewed case studies
  if (profile.pagesVisited.some((p) => p.startsWith("/case-studies"))) {
    return {
      key: "saw-case-studies",
      heading: "Want Results Like These?",
      subtext:
        "Get your free audit and see what AI can do for your business",
      buttonLabel: "Get Your Audit",
      buttonHref: "/audit",
    };
  }

  // 5. Viewed services
  if (profile.pagesVisited.some((p) => p.startsWith("/services"))) {
    return {
      key: "saw-services",
      heading: "Ready to Pick a Package?",
      subtext:
        "Start with a free audit and we'll recommend the right tier",
      buttonLabel: "Get Your Free Audit",
      buttonHref: "/audit",
    };
  }

  // 6. Default
  return DEFAULT_VARIANT;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function PersonalisedCTA() {
  const [variant, setVariant] = useState<CTAVariant>(DEFAULT_VARIANT);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const profile = getVisitorProfile();
    const resolved = resolveVariant(profile);
    // Deferred to avoid synchronous setState inside effect body
    Promise.resolve().then(() => {
      setVariant(resolved);
      setMounted(true);
    });
  }, []);

  return (
    <section
      className="relative overflow-hidden bg-zinc-950 py-28"
      aria-labelledby="cta-heading"
    >
      {/* Background glow — matches original BottomCTA */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
      >
        <div className="h-[400px] w-[700px] rounded-full bg-blue-500/8 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-3xl px-6 text-center sm:px-8">
        {/* Clock icon */}
        <div className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900">
          <Clock size={22} className="text-blue-500" aria-hidden="true" />
        </div>

        {/*
          AnimatePresence swaps content when the variant key changes
          (i.e. after mount when we read localStorage).
          The opacity transition keeps the swap from feeling jarring.
        */}
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={mounted ? variant.key : "default"}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <h2
              id="cta-heading"
              className="text-4xl font-bold tracking-tight text-zinc-50 sm:text-5xl"
            >
              {variant.heading}
            </h2>

            <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-zinc-400">
              {variant.subtext}
            </p>

            <div className="mt-10">
              <Link
                href={variant.buttonHref}
                onClick={() => trackCTAClicked("bottom-cta", variant.key)}
                className="inline-flex items-center gap-2 rounded-lg bg-blue-500 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-blue-500/25 transition-all duration-200 hover:bg-blue-600 hover:shadow-blue-500/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 group"
              >
                {variant.buttonLabel}
                <ArrowRight
                  size={18}
                  className="transition-transform duration-200 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </Link>
              <p className="mt-3 text-xs text-zinc-500">
                Free audit — normally £150, available at no cost for a limited time
              </p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Fallback contact line — always visible */}
        <p className="mt-6 text-sm text-zinc-500">
          or email{" "}
          <a
            href="mailto:olusholaoladipupo1@gmail.com"
            className="text-zinc-400 underline underline-offset-2 transition-colors duration-200 hover:text-zinc-200"
          >
            olusholaoladipupo1@gmail.com
          </a>
        </p>
      </div>
    </section>
  );
}
