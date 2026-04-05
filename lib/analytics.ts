/**
 * analytics.ts — Conversion funnel event tracking helpers.
 *
 * All functions wrap Vercel Analytics `track()` calls.
 * They are fire-and-forget — never await them.
 *
 * Usage (client components only):
 *   import { trackAuditStarted } from "@/lib/analytics";
 *   trackAuditStarted("Cleaning Services");
 *
 * Server components receive automatic page-view tracking via <Analytics />
 * in app/layout.tsx — no manual tracking needed there.
 */

import { track } from "@vercel/analytics";

// ── Audit funnel ──────────────────────────────────────────────────────────────

export function trackAuditStarted(industry: string) {
  track("audit_started", { industry });
}

export function trackAuditCompleted(industry: string, score: number) {
  track("audit_completed", { industry, score: String(score) });
}

export function trackAuditEmailSubmitted(industry: string) {
  track("audit_email_submitted", { industry });
}

// ── Contact form ──────────────────────────────────────────────────────────────

export function trackContactFormSubmitted() {
  track("contact_form_submitted");
}

// ── Chat widget ───────────────────────────────────────────────────────────────

export function trackChatOpened() {
  track("chat_opened");
}

export function trackChatMessageSent() {
  track("chat_message_sent");
}

// ── Content engagement ────────────────────────────────────────────────────────

export function trackServiceViewed(slug: string, tier: string) {
  track("service_viewed", { slug, tier });
}

export function trackCaseStudyViewed(slug: string) {
  track("case_study_viewed", { slug });
}

// ── Blueprint funnel ──────────────────────────────────────────────────────────

export function trackBlueprintStarted(industry: string) {
  track("blueprint_started", { industry });
}

export function trackBlueprintGenerated(industry: string, tier: string) {
  track("blueprint_generated", { industry, tier });
}

export function trackBlueprintEmailSubmitted(industry: string) {
  track("blueprint_email_submitted", { industry });
}

// ── CTA clicks ────────────────────────────────────────────────────────────────

export function trackCTAClicked(location: string, variant: string) {
  track("cta_clicked", { location, variant });
}
