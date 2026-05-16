// API guard for endpoints that call paid Anthropic APIs.
// Defence-in-depth: kill-switch, origin allowlist, global per-instance cap,
// per-IP rate limit. Applied at the top of every route that proxies to
// Anthropic so a single broken layer cannot bankrupt the org.
//
// Background: 29 Apr 2026 — auto-recharge fired 11× in 33 min ($178 burn) on
// /api/instant-audit because the per-IP limiter used an in-memory `Map` on
// Edge runtime (resets per cold-start, isolated per region/instance), which
// is effectively bypassable. See /legal/SECURITY-INCIDENT-29APR2026.md.

import { NextRequest } from "next/server";
import { checkRateLimit } from "./rate-limit";

const ALLOWED_ORIGINS = [
  "https://workcrew.io",
  "https://www.workcrew.io",
  "https://app.workcrew.io",
  "https://workcrew.co.uk",
  "https://www.workcrew.co.uk",
  "https://oladipupoconsulting.co.uk",
  "https://www.oladipupoconsulting.co.uk",
];

const DEV_ALLOWED_ORIGINS = [
  "http://localhost:3000",
  "http://127.0.0.1:3000",
];

function isVercelPreviewOrigin(candidate: string) {
  if (process.env.VERCEL_ENV !== "preview") return false;

  try {
    const hostname = new URL(candidate).hostname;
    return hostname.endsWith(".vercel.app");
  } catch {
    return false;
  }
}

// Per-instance global cap. Edge runtime spins many instances so this is
// defence in depth, not a primary control. Tuned so a single instance
// hitting the cap throttles to ~$1/min in worst case (Opus 4.6 burst).
const GLOBAL_CAP_PER_MIN = parseInt(
  process.env.AI_GLOBAL_CAP_PER_MIN ?? "20",
  10
);

let globalRequestsThisMinute = 0;
let globalMinuteResetAt = Date.now() + 60_000;

export interface GuardOptions {
  /** Per-IP request budget for the window. */
  perIpLimit?: number;
  /** Per-IP window in ms. Defaults to 1 hour. */
  perIpWindowMs?: number;
  /** Skip the Origin allowlist (e.g. for verified webhook endpoints). */
  skipOriginCheck?: boolean;
  /** Tag for logs. */
  endpoint?: string;
}

export interface GuardResult {
  ok: boolean;
  reason?: "kill-switch" | "origin" | "global-cap" | "per-ip";
  status: number;
  message: string;
  ip: string;
}

const HOUR = 60 * 60_000;

export function requireGuard(
  req: NextRequest,
  opts: GuardOptions = {}
): GuardResult {
  const {
    perIpLimit = 5,
    perIpWindowMs = HOUR,
    skipOriginCheck = false,
    endpoint = "unknown",
  } = opts;

  const ip =
    req.headers.get("cf-connecting-ip") ??
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "unknown";

  // 1. Kill switch — flip to true in Vercel env to instantly disable all AI endpoints.
  if (process.env.AI_ENDPOINTS_DISABLED === "true") {
    return {
      ok: false,
      reason: "kill-switch",
      status: 503,
      message:
        "This feature is temporarily offline for an upgrade. Please email hello@workcrew.io.",
      ip,
    };
  }

  // 2. Origin allowlist — blocks curl/bot abuse from outside our domains.
  // Browser-based abuse is also blocked because browsers send Origin honestly.
  if (!skipOriginCheck && process.env.AI_ALLOW_ANY_ORIGIN !== "true") {
    const origin = req.headers.get("origin");
    const referer = req.headers.get("referer");
    const candidate = origin ?? referer ?? "";
    const allowedOrigins =
      process.env.NODE_ENV === "production"
        ? ALLOWED_ORIGINS
        : [...ALLOWED_ORIGINS, ...DEV_ALLOWED_ORIGINS];
    const isAllowed = allowedOrigins.some((o) =>
      candidate.startsWith(o + "/") || candidate === o
    ) || isVercelPreviewOrigin(candidate);

    if (!isAllowed) {
      console.warn(
        `[api-guard:${endpoint}] blocked origin="${origin}" referer="${referer}" ip="${ip}"`
      );
      return {
        ok: false,
        reason: "origin",
        status: 403,
        message: "Forbidden.",
        ip,
      };
    }
  }

  // 3. Global per-instance circuit breaker — even if origin and IP checks
  // fail (broken Map on cold start), this hard-caps spend per minute.
  const now = Date.now();
  if (now > globalMinuteResetAt) {
    globalRequestsThisMinute = 0;
    globalMinuteResetAt = now + 60_000;
  }
  globalRequestsThisMinute++;
  if (globalRequestsThisMinute > GLOBAL_CAP_PER_MIN) {
    console.warn(
      `[api-guard:${endpoint}] global cap exceeded (${globalRequestsThisMinute}/${GLOBAL_CAP_PER_MIN})`
    );
    return {
      ok: false,
      reason: "global-cap",
      status: 503,
      message: "Service is busy. Please try again in a minute.",
      ip,
    };
  }

  // 4. Per-IP rate limit (in-memory; works for honest browser traffic).
  const result = checkRateLimit(ip, perIpLimit, perIpWindowMs);
  if (!result.allowed) {
    return {
      ok: false,
      reason: "per-ip",
      status: 429,
      message:
        "You've made a lot of requests. Please try again in an hour, or email hello@workcrew.io.",
      ip,
    };
  }

  return { ok: true, status: 200, message: "ok", ip };
}
