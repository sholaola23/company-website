"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  Clock,
  DollarSign,
  CalendarDays,
  MessageSquare,
  ExternalLink,
  Linkedin,
  Star,
  AlertCircle,
  Sparkles,
  BellRing,
  Heart,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";
import PasswordGate from "@/components/prospect/PasswordGate";

// ---------------------------------------------------------------------------
// Auth wrapper
// ---------------------------------------------------------------------------

export default function GorgWellnessPage() {
  const [authed, setAuthed] = useState<boolean | null>(null);

  useEffect(() => {
    fetch("/api/auth/prospect/check?slug=gorg-wellness")
      .then((r) => setAuthed(r.ok))
      .catch(() => setAuthed(false));
  }, []);

  if (authed === null) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="w-5 h-5 border-2 border-slate-200 border-t-purple-400 rounded-full animate-spin" />
      </div>
    );
  }

  if (!authed) {
    return (
      <PasswordGate
        slug="gorg-wellness"
        onAuthenticated={() => setAuthed(true)}
      />
    );
  }

  return <GorgContent />;
}

// ---------------------------------------------------------------------------
// Fade-in section
// ---------------------------------------------------------------------------

function Section({
  children,
  className = "",
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.section>
  );
}

// ---------------------------------------------------------------------------
// Main content
// ---------------------------------------------------------------------------

function GorgContent() {
  return (
    <div className="min-h-screen bg-white text-slate-900">

      {/* ------------------------------------------------------------------ */}
      {/* HERO                                                                */}
      {/* ------------------------------------------------------------------ */}

      <section className="relative px-5 pt-16 pb-12 md:pt-24 md:pb-16 max-w-2xl mx-auto text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-medium mb-6"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
          Built specifically for Gorg! Wellness &amp; Aesthetics
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight mb-4"
        >
          Andrew, we built this for Gorg.
          <br />
          <span className="text-purple-600">
            Your results are incredible. Let&apos;s make sure no one misses them.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-slate-600 text-base md:text-lg leading-relaxed"
        >
          87 reviews at a perfect 5.0 stars. A brand-new space on Bowie Street.
          A team that delivers world-class results. But right now, every inquiry
          that comes in on a Sunday or Monday goes unanswered — and your
          competitors are picking up those clients.
        </motion.p>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* THE PROBLEM                                                        */}
      {/* ------------------------------------------------------------------ */}

      <Section
        id="problem"
        className="px-5 py-12 md:py-16 max-w-2xl mx-auto"
      >
        <div className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-purple-600 mb-3">
            The problem
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
            Two days a week with zero inquiry response.
            <br className="hidden md:block" /> In Austin&apos;s most competitive aesthetics market.
          </h2>
          <p className="text-slate-600 leading-relaxed">
            Gorg is closed Sunday and Monday. That means a potential Botox client
            who discovers you on Instagram Saturday evening has no way to book,
            ask a question, or get a response until Tuesday at 10am. By then,
            they&apos;ve already booked with Aesthetica or Viva Day Spa.
          </p>
          <p className="text-slate-600 leading-relaxed mt-3">
            Meanwhile, your 87 Google reviews — while perfect — are a fraction of
            what your competitors have. And being on Groupon tells us you know you
            need more volume. The issue isn&apos;t your clinical work. It&apos;s
            the infrastructure around it.
          </p>
        </div>

        {/* Pain point cards */}
        <div className="grid gap-3">
          {[
            {
              icon: Clock,
              title: "Closed Sunday + Monday",
              desc: "Two full days where potential clients can't reach you. Every unanswered inquiry is $300–$600 walking to a competitor.",
            },
            {
              icon: Star,
              title: "87 reviews in 3 years",
              desc: "You're averaging 2.4 reviews/month. Competitors have 200–500+. No systematic review collection means you're invisible on Google Maps.",
            },
            {
              icon: AlertCircle,
              title: "On Groupon for volume",
              desc: "Groupon clients come for the discount and rarely return at full price. You need a system that converts and retains at your real rates.",
            },
          ].map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="flex items-start gap-4 p-4 bg-slate-50 border border-slate-200 rounded-xl"
            >
              <div className="w-9 h-9 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center flex-shrink-0">
                <Icon className="w-4 h-4 text-red-400" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900 mb-0.5">{title}</p>
                <p className="text-sm text-slate-400">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ------------------------------------------------------------------ */}
      {/* WHAT WE'D BUILD                                                    */}
      {/* ------------------------------------------------------------------ */}

      <Section
        id="solution"
        className="px-5 py-12 md:py-16 bg-slate-50/40 border-y border-slate-200/50"
      >
        <div className="max-w-2xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-widest text-purple-600 mb-3">
            What we&apos;d build
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
            Three systems. Built and launched for you.
            <br className="hidden md:block" /> Zero extra work for your team.
          </h2>
          <p className="text-slate-600 mb-8 text-sm">
            Everything tailored to Gorg&apos;s treatments, brand voice, and patient experience.
          </p>

          <div className="grid gap-4">
            {/* System 1: AI Booking Assistant */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center flex-shrink-0">
                  <MessageSquare className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">AI Booking Assistant</h3>
                  <p className="text-sm text-purple-300">24/7 — even on Sundays and Mondays</p>
                </div>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed mb-4">
                A conversational AI on your website and phone that knows every Gorg treatment —
                Botox vs. Dysport differences, filler options, weight loss programmes, pricing
                ranges. It answers questions naturally, checks real-time availability, and books
                appointments directly into your calendar.
              </p>
              <div className="bg-white border border-slate-200 rounded-xl p-4">
                <p className="text-xs text-slate-900 mb-3 font-medium">Example conversation — Sunday 8pm</p>
                <div className="space-y-2.5">
                  {[
                    { role: "client", text: "Hi! I'm interested in lip filler. How much does it cost and do you have anything this week?" },
                    { role: "ai", text: "Great question! Lip filler at Gorg starts at $650 per syringe. Most clients love the results with one syringe. Andrew has a slot open Thursday at 2pm and Friday at 11am — would either of those work for you?" },
                    { role: "client", text: "Thursday at 2 would be perfect!" },
                    { role: "ai", text: "Done! I've booked you in with Andrew for Thursday at 2pm. You'll get a confirmation text shortly with pre-appointment instructions. See you then!" },
                  ].map((line, i) => (
                    <div
                      key={i}
                      className={`flex ${line.role === "client" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`px-3 py-2 rounded-2xl text-sm max-w-[85%] ${
                          line.role === "ai"
                            ? "bg-slate-100 text-slate-900 rounded-tl-sm"
                            : "bg-purple-600 text-white rounded-tr-sm"
                        }`}
                      >
                        {line.text}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* System 2: Review Automation */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center flex-shrink-0">
                  <Star className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">Automated Review Collection</h3>
                  <p className="text-sm text-purple-300">From 87 to 200+ reviews in 6 months</p>
                </div>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed mb-4">
                After every treatment, the patient automatically receives a personalised
                text or email asking them to share their experience. Timed perfectly —
                2 hours post-appointment when they&apos;re still feeling great about their results.
                Happy patients leave reviews. You just aren&apos;t asking them yet.
              </p>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-100/60 rounded-xl p-3 text-center">
                  <p className="text-xs text-slate-900 mb-1">Current pace</p>
                  <p className="text-lg font-bold text-slate-600">~2.4/mo</p>
                </div>
                <div className="bg-slate-100/60 rounded-xl p-3 text-center">
                  <p className="text-xs text-slate-900 mb-1">Target pace</p>
                  <p className="text-lg font-bold text-green-400">8–12/mo</p>
                </div>
              </div>
            </div>

            {/* System 3: Follow-up Sequences */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center flex-shrink-0">
                  <BellRing className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">Post-Treatment Follow-Up</h3>
                  <p className="text-sm text-purple-300">Rebooking + aftercare on autopilot</p>
                </div>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed mb-4">
                Botox wears off in 3–4 months. Filler in 6–12 months. Your patients
                know this — but life gets busy and they forget to rebook. We send
                personalised reminders at exactly the right time, plus aftercare
                instructions right after treatment.
              </p>
              <div className="space-y-2">
                {[
                  { time: "Same day", msg: "Aftercare instructions + what to expect" },
                  { time: "Day 14", msg: "Check-in — how are you feeling about your results?" },
                  { time: "Week 10", msg: "Your Botox touch-up is coming up — ready to rebook?" },
                  { time: "Month 5", msg: "It's been 5 months since your filler — want to schedule?" },
                ].map(({ time, msg }) => (
                  <div key={time} className="flex items-start gap-3 px-3 py-2 bg-slate-100/40 rounded-lg">
                    <span className="text-xs font-mono text-purple-300 whitespace-nowrap mt-0.5 min-w-[60px]">{time}</span>
                    <span className="text-sm text-slate-600">{msg}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ------------------------------------------------------------------ */}
      {/* ROI                                                                */}
      {/* ------------------------------------------------------------------ */}

      <Section
        id="roi"
        className="px-5 py-12 md:py-16 max-w-2xl mx-auto"
      >
        <p className="text-xs font-semibold uppercase tracking-widest text-purple-600 mb-3">
          The numbers
        </p>
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
          What this means for Gorg&apos;s bottom line.
        </h2>
        <p className="text-slate-600 mb-8 text-sm">
          Conservative estimates based on your current pricing and treatment volume.
        </p>

        <div className="grid gap-4">
          {/* Revenue recovery */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
            <div className="flex items-start gap-3 mb-4">
              <DollarSign className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
              <h3 className="text-base font-semibold text-slate-900">Missed inquiry recovery</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
              <div className="bg-slate-100/60 rounded-xl p-3 text-center">
                <p className="text-xs text-slate-900 mb-1">Missed inquiries (Sun+Mon)</p>
                <p className="text-lg font-bold text-red-400">2–4/week</p>
              </div>
              <div className="bg-slate-100/60 rounded-xl p-3 text-center">
                <p className="text-xs text-slate-900 mb-1">Avg treatment value</p>
                <p className="text-lg font-bold text-slate-900">$400</p>
              </div>
              <div className="bg-slate-100/60 rounded-xl p-3 text-center">
                <p className="text-xs text-slate-900 mb-1">Recovered per year</p>
                <p className="text-lg font-bold text-green-400">$41K–$83K</p>
              </div>
            </div>
            <p className="text-sm text-slate-400">
              One missed Botox inquiry is $300–$600 lost. One missed filler inquiry
              is $600–$1,200. The AI assistant captures these 24/7, including the two
              days Gorg is currently dark.
            </p>
          </div>

          {/* Review growth */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
            <div className="flex items-start gap-3 mb-4">
              <TrendingUp className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
              <h3 className="text-base font-semibold text-slate-900">Review automation ROI</h3>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">
              Growing from 87 to 200+ Google reviews in 6 months dramatically improves
              your Google Maps ranking in Austin. Higher ranking = more organic discovery =
              less need for Groupon. Each organic patient is worth 3–5x a Groupon patient
              because they come at full price and are more likely to return.
            </p>
          </div>

          {/* Net cost */}
          <div className="flex items-start gap-3 bg-purple-500/8 border border-purple-500/15 rounded-xl px-4 py-3">
            <Sparkles className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-slate-600">
              <strong className="text-slate-900">Total cost: $2,000 setup + $300/month.</strong>{" "}
              That&apos;s $10/day. One single Botox appointment covers an entire month.
              The system pays for itself before the end of the first week.
            </p>
          </div>
        </div>
      </Section>

      {/* ------------------------------------------------------------------ */}
      {/* PRICING                                                            */}
      {/* ------------------------------------------------------------------ */}

      <Section
        id="pricing"
        className="px-5 py-12 md:py-16 bg-slate-50/40 border-y border-slate-200/50"
      >
        <div className="max-w-2xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-widest text-purple-600 mb-3">
            Pricing
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8">
            Simple. No surprises.
          </h2>

          <div className="bg-slate-50 border border-purple-500/30 rounded-2xl overflow-hidden">
            {/* Pricing header */}
            <div className="p-6 md:p-8 border-b border-slate-200">
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                <div>
                  <p className="text-sm text-slate-400 mb-1">One-time setup</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold text-slate-900">$2,000</span>
                  </div>
                  <p className="text-xs text-slate-900 mt-1">
                    Everything built, tested, and live for you
                  </p>
                </div>
                <div className="sm:text-right">
                  <p className="text-sm text-slate-400 mb-1">Then monthly</p>
                  <div className="flex items-baseline gap-2 sm:justify-end">
                    <span className="text-4xl font-bold text-purple-600">$300</span>
                    <span className="text-slate-400">/mo</span>
                  </div>
                  <p className="text-xs text-slate-900 mt-1">
                    That&apos;s $10 a day
                  </p>
                </div>
              </div>
            </div>

            {/* What's covered */}
            <div className="p-6 md:p-8">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-900 mb-4">
                Everything included
              </p>
              <div className="grid sm:grid-cols-2 gap-2">
                {[
                  "AI booking assistant (24/7)",
                  "Treatment Q&A chatbot",
                  "Automated review requests",
                  "Post-treatment aftercare",
                  "Rebooking reminders",
                  "Monthly performance report",
                  "Chatbot training updates",
                  "Ongoing optimisation",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                    <span className="text-sm text-slate-500">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Context callout */}
            <div className="px-6 pb-6 md:px-8 md:pb-8">
              <div className="flex items-start gap-3 bg-purple-500/8 border border-purple-500/15 rounded-xl px-4 py-3">
                <DollarSign className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-slate-600">
                  One Botox appointment covers the monthly cost. One filler appointment covers{" "}
                  <span className="text-slate-900 font-medium">two to four months</span>. This
                  system pays for itself with a single booking.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ------------------------------------------------------------------ */}
      {/* SOCIAL PROOF                                                       */}
      {/* ------------------------------------------------------------------ */}

      <Section
        id="proof"
        className="px-5 py-12 md:py-16 max-w-2xl mx-auto"
      >
        <p className="text-xs font-semibold uppercase tracking-widest text-purple-600 mb-3">
          Real results
        </p>
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8">
          What happens when a small business plugs this in.
        </h2>

        {/* Case study card */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 md:p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-purple-500/15 border border-purple-500/20 flex items-center justify-center">
              <span className="text-sm font-bold text-purple-600">E</span>
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900">E&apos;Manuel Bakery</p>
              <p className="text-xs text-slate-400">Local service business, owner-operated, 6 employees</p>
            </div>
          </div>

          <p className="text-slate-600 text-sm leading-relaxed mb-6">
            Before working with us, E&apos;Manuel&apos;s owner was manually handling every
            order, chasing unpaid invoices, and managing bookings over WhatsApp. Every
            missed call was a missed sale. Sound familiar?
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            {[
              { label: "Response time", before: "2-4 hours", after: "Under 2 mins" },
              { label: "Admin hours saved", before: "8hrs/week", after: "0hrs/week" },
              { label: "Missed enquiries", before: "~30%", after: "~0%" },
            ].map(({ label, before, after }) => (
              <div key={label} className="bg-slate-100/60 rounded-xl p-3">
                <p className="text-xs text-slate-900 mb-2">{label}</p>
                <p className="text-xs text-slate-400 line-through mb-0.5">{before}</p>
                <p className="text-sm font-semibold text-green-400">{after}</p>
              </div>
            ))}
          </div>

          <blockquote className="border-l-2 border-purple-500 pl-4">
            <p className="text-sm text-slate-500 italic leading-relaxed">
              &ldquo;We used to miss orders every single evening. Now the system handles everything
              while we&apos;re in the kitchen. We don&apos;t think about it anymore — it just works.&rdquo;
            </p>
            <footer className="mt-2 text-xs text-slate-900">
              — Tunmise, Owner, E&apos;Manuel Bakery
            </footer>
          </blockquote>
        </div>

        <p className="text-sm text-slate-900 mt-4 text-center">
          The same principle applies: great service businesses shouldn&apos;t lose clients
          because of booking infrastructure.
        </p>
      </Section>

      {/* ------------------------------------------------------------------ */}
      {/* CTA                                                                */}
      {/* ------------------------------------------------------------------ */}

      <Section
        id="cta"
        className="px-5 py-16 md:py-20 bg-slate-50/40 border-y border-slate-200/50"
      >
        <div className="max-w-2xl mx-auto text-center">
          <Heart className="w-8 h-8 text-purple-600 mx-auto mb-4" />
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
            Ready to stop losing clients on your days off?
          </h2>
          <p className="text-slate-600 text-base mb-8 max-w-md mx-auto">
            Book a free 15-minute call. I&apos;ll walk you through a live demo using
            Gorg&apos;s actual treatments, pricing, and booking flow. No commitment required.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-10">
            <Link
              href="https://cal.com/workcrew/free-ai-strategy-call"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-purple-600 hover:bg-purple-500 text-white font-semibold rounded-xl transition-all text-sm w-full sm:w-auto justify-center"
            >
              <CalendarDays className="w-4 h-4" />
              Book a free 15-minute call
              <ExternalLink className="w-3.5 h-3.5 opacity-70" />
            </Link>
            <Link
              href="https://linkedin.com/in/olushola-oladipupo"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-900 font-medium rounded-xl transition-all text-sm w-full sm:w-auto justify-center"
            >
              <Linkedin className="w-4 h-4" />
              Connect on LinkedIn
            </Link>
          </div>

          {/* Contact details */}
          <div className="inline-flex flex-col items-center gap-1.5 text-sm text-slate-900">
            <p>Olushola Oladipupo — WorkCrew Ltd</p>
            <p>+44 7469 347654 &bull; olusholaoladipupo1@gmail.com</p>
          </div>
        </div>
      </Section>

      {/* ------------------------------------------------------------------ */}
      {/* FOOTER                                                             */}
      {/* ------------------------------------------------------------------ */}

      <footer className="border-t border-slate-200/50 px-5 py-8">
        <div className="max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600">
          <p>WorkCrew Ltd</p>
          <p className="text-center">
            This page was built specifically for Gorg! Wellness &amp; Aesthetics.
          </p>
          <p>Private &amp; confidential</p>
        </div>
      </footer>

    </div>
  );
}
