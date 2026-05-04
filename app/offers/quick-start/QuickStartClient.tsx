"use client";

import { useState, useEffect, useId } from "react";
import {
  Clock,
  CheckCircle2,
  Shield,
  Zap,
  BarChart3,
  CalendarCheck,
  ArrowRight,
  Mail,
} from "lucide-react";
import { cn } from "@/lib/utils";

// ---------------------------------------------------------------------------
// Countdown timer — counts down to Sunday 30 March 2026 at 23:59:59 GMT
// ---------------------------------------------------------------------------
const DEADLINE = new Date("2026-03-30T23:59:59Z").getTime();

function useCountdown() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [expired, setExpired] = useState(false);

  useEffect(() => {
    function tick() {
      const diff = DEADLINE - Date.now();
      if (diff <= 0) {
        setExpired(true);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    }
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return { timeLeft, expired };
}

function CountdownBlock({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <span className="text-2xl sm:text-3xl font-bold tabular-nums text-[var(--color-heading)]">
        {String(value).padStart(2, "0")}
      </span>
      <span className="text-[10px] uppercase tracking-widest text-[var(--color-muted)] mt-1">{label}</span>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Included items
// ---------------------------------------------------------------------------
const INCLUDED = [
  {
    icon: BarChart3,
    title: "Full AI Readiness Audit",
    desc: "Personalised report with ROI numbers specific to your business",
  },
  {
    icon: Zap,
    title: "One Automation Build",
    desc: "Lead intake, auto-responder, or booking system — your choice",
  },
  {
    icon: BarChart3,
    title: "Real-Time Dashboard",
    desc: "Monitor performance, leads, and time saved — live",
  },
  {
    icon: CalendarCheck,
    title: "14-Day Delivery",
    desc: "Fully built and running within two weeks of kickoff",
  },
  {
    icon: Shield,
    title: "90-Day Results Guarantee",
    desc: "Full refund of setup fee if you don\u2019t save 5+ hours per week",
  },
];

// ---------------------------------------------------------------------------
// Form
// ---------------------------------------------------------------------------
interface FormState {
  name: string;
  email: string;
  business: string;
  phone: string;
}

const INITIAL: FormState = { name: "", email: "", business: "", phone: "" };

const inputBase =
  "w-full bg-[var(--color-bg-alt)] border border-[var(--color-border)] rounded-lg px-4 py-3 text-sm text-[var(--color-heading)] placeholder:text-[var(--color-muted)] transition-colors duration-150 focus:outline-none focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)]";

function ClaimForm() {
  const [form, setForm] = useState<FormState>(INITIAL);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const formId = useId();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          message: `[QUICK-START OFFER] Business: ${form.business}. Claiming the £297 Quick-Start AI Package.`,
        }),
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
      <div className="text-center py-8">
        <CheckCircle2 size={40} className="text-green-400 mx-auto mb-4" />
        <p className="text-lg font-semibold text-[var(--color-heading)] mb-2">You&apos;re in!</p>
        <p className="text-sm text-[var(--color-body)]">
          We&apos;ll be in touch within a few hours to kick things off. Check your inbox.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div>
        <label htmlFor={`${formId}-name`} className="sr-only">
          Your name
        </label>
        <input
          id={`${formId}-name`}
          name="name"
          type="text"
          required
          placeholder="Your name"
          value={form.name}
          onChange={handleChange}
          className={inputBase}
        />
      </div>
      <div>
        <label htmlFor={`${formId}-email`} className="sr-only">
          Email address
        </label>
        <input
          id={`${formId}-email`}
          name="email"
          type="email"
          required
          placeholder="Email address"
          value={form.email}
          onChange={handleChange}
          className={inputBase}
        />
      </div>
      <div>
        <label htmlFor={`${formId}-business`} className="sr-only">
          Business name
        </label>
        <input
          id={`${formId}-business`}
          name="business"
          type="text"
          required
          placeholder="Business name"
          value={form.business}
          onChange={handleChange}
          className={inputBase}
        />
      </div>
      <div>
        <label htmlFor={`${formId}-phone`} className="sr-only">
          Phone number
        </label>
        <input
          id={`${formId}-phone`}
          name="phone"
          type="tel"
          placeholder="Phone number (optional)"
          value={form.phone}
          onChange={handleChange}
          className={inputBase}
        />
      </div>

      {status === "error" && (
        <p className="text-sm text-red-400" role="alert">
          {errorMsg}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className={cn(
          "w-full inline-flex items-center justify-center gap-2 rounded-lg bg-[var(--color-primary)] px-6 py-3.5 text-base font-semibold text-[var(--color-bg)] shadow-lg shadow-blue-500/20 transition-all duration-200 hover:bg-[var(--color-primary-hover)] hover:shadow-blue-500/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-white group",
          status === "loading" && "opacity-70 cursor-not-allowed"
        )}
      >
        {status === "loading" ? (
          "Submitting..."
        ) : (
          <>
            Claim Your Spot
            <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
          </>
        )}
      </button>
    </form>
  );
}

// ---------------------------------------------------------------------------
// Main page component
// ---------------------------------------------------------------------------
export default function QuickStartClient() {
  const { timeLeft, expired } = useCountdown();

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      {/* ── Hero ───────────────────────────────────────────────────────── */}
      <div className="text-center mb-16">
        {/* Urgency pill */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-xs font-medium tracking-wide text-amber-600">
          <Clock size={12} aria-hidden="true" />
          {expired ? "Offer ended" : "This week only — ends Sunday 30 March"}
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--color-heading)] leading-tight mb-4">
          <span className="line-through text-[var(--color-muted)] text-2xl sm:text-3xl lg:text-4xl mr-3">
            £500
          </span>
          <span className="text-[var(--color-primary)]">£297</span> Quick-Start AI Package
        </h1>

        <p className="text-lg text-[var(--color-body)] max-w-2xl mx-auto leading-relaxed">
          Everything you need to start saving hours every week with AI —
          audit, automation build, and live dashboard. Delivered in 14 days.
        </p>
      </div>

      {/* ── Countdown ──────────────────────────────────────────────────── */}
      {!expired && (
        <div className="mb-16">
          <div className="flex items-center justify-center gap-4 sm:gap-6 bg-[var(--color-bg-alt)] border border-[var(--color-border)] rounded-2xl py-6 px-6 max-w-md mx-auto">
            <CountdownBlock value={timeLeft.days} label="Days" />
            <span className="text-[var(--color-heading)] text-xl font-light" aria-hidden="true">:</span>
            <CountdownBlock value={timeLeft.hours} label="Hours" />
            <span className="text-[var(--color-heading)] text-xl font-light" aria-hidden="true">:</span>
            <CountdownBlock value={timeLeft.minutes} label="Mins" />
            <span className="text-[var(--color-heading)] text-xl font-light" aria-hidden="true">:</span>
            <CountdownBlock value={timeLeft.seconds} label="Secs" />
          </div>
          <p className="text-center text-xs text-[var(--color-muted)] mt-3">
            Offer expires Sunday 30 March 2026 at midnight
          </p>
        </div>
      )}

      {/* ── Spots remaining ────────────────────────────────────────────── */}
      <div className="flex items-center justify-center gap-2 mb-12">
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500" />
        </span>
        <span className="text-sm font-semibold text-red-400">
          3 spots remaining this week
        </span>
      </div>

      {/* ── Two-column: What's included + Form ─────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
        {/* Left: What's included */}
        <div>
          <h2 className="text-lg font-semibold text-[var(--color-heading)] mb-6">
            What&apos;s included
          </h2>
          <div className="flex flex-col gap-4">
            {INCLUDED.map((item) => (
              <div
                key={item.title}
                className="flex items-start gap-4 p-4 bg-[var(--color-bg-alt)] border border-[var(--color-border)] rounded-xl"
              >
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/20 shrink-0">
                  <item.icon size={16} className="text-[var(--color-primary)]" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[var(--color-heading)] mb-0.5">{item.title}</p>
                  <p className="text-sm text-[var(--color-body)] leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Social proof */}
          <div className="mt-8 bg-[var(--color-primary-light)] border border-[var(--color-primary-light)] rounded-xl p-6">
            <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-primary)] mb-3">
              Real results
            </p>
            <p className="text-sm text-[var(--color-muted)] leading-relaxed mb-4">
              E&apos;Manuel Bakery went from fully manual order processing to a complete
              AI-powered system in under a week.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[var(--color-bg-alt)]/60 border border-[var(--color-border)] rounded-lg p-3 text-center">
                <p className="text-xl font-bold text-[var(--color-heading)]">8+</p>
                <p className="text-xs text-[var(--color-muted)] mt-0.5">Hours/week saved</p>
              </div>
              <div className="bg-[var(--color-bg-alt)]/60 border border-[var(--color-border)] rounded-lg p-3 text-center">
                <p className="text-xl font-bold text-[var(--color-heading)]">180</p>
                <p className="text-xs text-[var(--color-muted)] mt-0.5">Orders automated</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Claim form */}
        <div>
          <div className="bg-[var(--color-bg-alt)] border border-[var(--color-border)] rounded-2xl p-7 sm:p-8 sticky top-24">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-[var(--color-heading)]">
                Claim your spot
              </h2>
              <div className="flex items-center gap-1.5 text-xs font-medium text-green-400">
                <Shield size={12} aria-hidden="true" />
                90-day guarantee
              </div>
            </div>

            <div className="mb-6 pb-6 border-b border-[var(--color-border)]">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-[var(--color-heading)]">£297</span>
                <span className="text-sm text-[var(--color-muted)] line-through">£500</span>
                <span className="ml-auto text-xs font-semibold text-green-400 bg-green-500/10 border border-green-500/20 rounded-full px-2.5 py-0.5">
                  Save £203
                </span>
              </div>
              <p className="text-xs text-[var(--color-muted)] mt-2">
                One-time setup fee. No hidden costs. No monthly commitment required.
              </p>
            </div>

            <ClaimForm />

            {/* Or email CTA */}
            <div className="mt-6 pt-6 border-t border-[var(--color-border)] text-center">
              <p className="text-xs text-[var(--color-muted)] mb-2">Prefer email?</p>
              <a
                href="mailto:hello@workcrew.io?subject=Quick-Start%20AI%20Package%20-%20Claim%20My%20Spot&body=Hi%2C%20I%27d%20like%20to%20claim%20a%20spot%20on%20the%20%C2%A3297%20Quick-Start%20AI%20Package.%0A%0AMy%20business%3A%20%0AMy%20name%3A%20"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors"
              >
                <Mail size={14} aria-hidden="true" />
                Reply to claim your spot
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ── How it works ───────────────────────────────────────────────── */}
      <div className="mt-20">
        <h2 className="text-lg font-semibold text-[var(--color-heading)] text-center mb-10">
          How it works
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            {
              step: "1",
              title: "Claim your spot",
              desc: "Fill in the form above. We\u2019ll confirm availability within a few hours.",
            },
            {
              step: "2",
              title: "Quick strategy call",
              desc: "30-minute call to understand your business and pick the right automation.",
            },
            {
              step: "3",
              title: "Live in 14 days",
              desc: "Your AI system is built, tested, and running. You get a live dashboard to track results.",
            },
          ].map((item) => (
            <div
              key={item.step}
              className="bg-[var(--color-bg-alt)] border border-[var(--color-border)] rounded-xl p-6 text-center"
            >
              <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/20 text-sm font-bold text-[var(--color-primary)] mb-4">
                {item.step}
              </div>
              <p className="text-sm font-semibold text-[var(--color-heading)] mb-1">{item.title}</p>
              <p className="text-sm text-[var(--color-body)] leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Final CTA ──────────────────────────────────────────────────── */}
      <div className="mt-20 text-center">
        <div className="bg-[var(--color-primary-light)] border border-[var(--color-primary-light)] rounded-2xl p-8 sm:p-12 max-w-2xl mx-auto">
          <h2 className="text-xl sm:text-2xl font-bold text-[var(--color-heading)] mb-3">
            Don&apos;t let this week slip by
          </h2>
          <p className="text-sm text-[var(--color-body)] mb-6 leading-relaxed">
            3 businesses will start saving 5+ hours a week with AI this Sunday.
            Will yours be one of them?
          </p>
          <a
            href="#claim"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("form")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="inline-flex items-center gap-2 rounded-lg bg-[var(--color-primary)] px-6 py-3 text-base font-semibold text-[var(--color-bg)] shadow-lg shadow-blue-500/20 transition-all duration-200 hover:bg-[var(--color-primary-hover)] hover:shadow-blue-500/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-white group"
          >
            Claim Your Spot Now
            <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
          </a>
        </div>
      </div>
    </div>
  );
}
