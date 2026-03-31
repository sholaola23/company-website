"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Phone,
  CheckCircle2,
  Clock,
  DollarSign,
  CalendarDays,
  MessageSquare,
  ExternalLink,
  Linkedin,
  PhoneCall,
  MicVocal,
  BellRing,
  TrendingUp,
  AlertCircle,
  Star,
  Globe,
  SmilePlus,
} from "lucide-react";
import Link from "next/link";
import PasswordGate from "@/components/prospect/PasswordGate";

// ---------------------------------------------------------------------------
// Auth wrapper
// ---------------------------------------------------------------------------

export default function PearlDentalPage() {
  const [authed, setAuthed] = useState<boolean | null>(null);

  useEffect(() => {
    fetch("/api/auth/prospect/check?slug=pearl-dental")
      .then((r) => setAuthed(r.ok))
      .catch(() => setAuthed(false));
  }, []);

  if (authed === null) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="w-5 h-5 border-2 border-slate-200 border-t-teal-500 rounded-full animate-spin" />
      </div>
    );
  }

  if (!authed) {
    return (
      <PasswordGate
        slug="pearl-dental"
        onAuthenticated={() => setAuthed(true)}
      />
    );
  }

  return <PearlContent />;
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
// ROI Calculator
// ---------------------------------------------------------------------------

function RoiCalculator() {
  const [missedPatientsPerWeek, setMissedPatientsPerWeek] = useState(2);
  const [patientLifetimeValue, setPatientLifetimeValue] = useState(1000);

  const yearlyLost = missedPatientsPerWeek * patientLifetimeValue * 52;
  const monthlyCost = 300;
  const yearlyCost = monthlyCost * 12 + 2000; // include setup
  const netGain = yearlyLost - yearlyCost;
  const roi = Math.round((netGain / yearlyCost) * 100);

  return (
    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 md:p-8">
      <h3 className="text-lg font-semibold text-slate-900 mb-1">
        What are those 3 closed days costing Pearl Dental?
      </h3>
      <p className="text-sm text-slate-400 mb-6">
        Adjust the numbers to match your practice. The math is conservative.
      </p>

      <div className="space-y-6 mb-8">
        {/* Missed patients slider */}
        <div>
          <div className="flex justify-between items-baseline mb-2">
            <label className="text-sm text-slate-600">Potential patients lost per week (Fri-Sun)</label>
            <span className="text-2xl font-bold text-teal-600">{missedPatientsPerWeek}</span>
          </div>
          <input
            type="range"
            min={1}
            max={10}
            value={missedPatientsPerWeek}
            onChange={(e) => setMissedPatientsPerWeek(Number(e.target.value))}
            className="w-full accent-teal-500 cursor-pointer"
            aria-label="Potential patients lost per week"
          />
          <div className="flex justify-between text-xs text-slate-900 mt-1">
            <span>1</span>
            <span>10</span>
          </div>
        </div>

        {/* Patient lifetime value slider */}
        <div>
          <div className="flex justify-between items-baseline mb-2">
            <label className="text-sm text-slate-600">Average patient lifetime value</label>
            <span className="text-2xl font-bold text-teal-600">${patientLifetimeValue.toLocaleString()}</span>
          </div>
          <input
            type="range"
            min={500}
            max={5000}
            step={250}
            value={patientLifetimeValue}
            onChange={(e) => setPatientLifetimeValue(Number(e.target.value))}
            className="w-full accent-teal-500 cursor-pointer"
            aria-label="Average patient lifetime value in dollars"
          />
          <div className="flex justify-between text-xs text-slate-900 mt-1">
            <span>$500</span>
            <span>$5,000</span>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-slate-100/60 rounded-xl p-4 text-center">
          <p className="text-xs text-slate-400 mb-1">Lost per year</p>
          <p className="text-2xl font-bold text-red-400">
            ${yearlyLost.toLocaleString()}
          </p>
        </div>
        <div className="bg-slate-100/60 rounded-xl p-4 text-center">
          <p className="text-xs text-slate-400 mb-1">System cost (yr 1)</p>
          <p className="text-2xl font-bold text-slate-500">
            ${yearlyCost.toLocaleString()}
          </p>
        </div>
        <div className="bg-slate-100/60 rounded-xl p-4 text-center">
          <p className="text-xs text-slate-400 mb-1">Net gain</p>
          <p className={`text-2xl font-bold ${netGain > 0 ? "text-green-400" : "text-slate-600"}`}>
            {netGain > 0 ? `+$${netGain.toLocaleString()}` : "-"}
          </p>
        </div>
      </div>

      {netGain > 0 && (
        <div className="flex items-start gap-3 bg-teal-500/10 border border-teal-500/20 rounded-xl px-4 py-3">
          <TrendingUp className="w-4 h-4 text-teal-600 mt-0.5 flex-shrink-0" />
          <p className="text-sm text-teal-700">
            At these numbers, the system pays for itself and returns{" "}
            <strong>{roi}% ROI in year one.</strong> That is just from
            the patients Pearl is already losing on closed days.
          </p>
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main content
// ---------------------------------------------------------------------------

function PearlContent() {
  return (
    <div className="min-h-screen bg-white text-slate-900">

      {/* ------------------------------------------------------------------ */}
      {/* HERO                                                                  */}
      {/* ------------------------------------------------------------------ */}

      <section className="relative px-5 pt-16 pb-12 md:pt-24 md:pb-16 max-w-2xl mx-auto text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-600 text-xs font-medium mb-6"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
          Built specifically for Pearl Dental Center
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight mb-4"
        >
          Dr. Downie, we built this for Pearl Dental.
          <br />
          <span className="text-teal-600">
            Your patients deserve an answer&nbsp;&mdash; even on Fridays.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-slate-600 text-base md:text-lg leading-relaxed"
        >
          Pearl Dental has 385 reviews and 4.9 stars. Patients love the warmth
          and honesty. But right now, every call from Thursday afternoon to
          Monday morning goes unanswered. That is 3 full days of patients
          calling competitors instead of you.
        </motion.p>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* THE PROBLEM                                                          */}
      {/* ------------------------------------------------------------------ */}

      <Section
        id="problem"
        className="px-5 py-12 md:py-16 max-w-2xl mx-auto"
      >
        <div className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-teal-500 mb-3">
            The problem
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
            72 hours every week with no one answering the phone.
          </h2>
          <p className="text-slate-600 leading-relaxed">
            Pearl Dental is open Monday through Thursday, 7am to 4pm. That means
            from Thursday at 4pm until Monday at 7am&nbsp;&mdash; 87 hours&nbsp;&mdash; your
            phone either goes to voicemail or rings out. Friday, Saturday, and
            Sunday are completely dark.
          </p>
          <p className="text-slate-600 leading-relaxed mt-3">
            When a Tampa resident chips a tooth on Friday night, needs an
            emergency appointment on Saturday, or finally decides to book that
            cleaning on Sunday evening, they call Pearl Dental and hear nothing.
            So they call the next practice on Google. You never know they tried.
          </p>
        </div>

        {/* Pain point cards */}
        <div className="grid gap-3">
          {[
            {
              icon: Clock,
              title: "Closed Friday through Sunday",
              desc: "3 full days per week with zero coverage. In Tampa's competitive dental market, that is 3 days of handing patients to your competitors.",
            },
            {
              icon: Globe,
              title: "Request form only — no instant booking",
              desc: "Patients fill out a form and wait for a callback. In 2026, patients expect to book online in 30 seconds. Every extra step loses people.",
            },
            {
              icon: MessageSquare,
              title: "No chatbot or live chat",
              desc: "A patient browsing your site at 9pm has no way to ask about insurance, pricing, or availability. They leave and may never come back.",
            },
            {
              icon: AlertCircle,
              title: "No social media presence",
              desc: "No Facebook business page. No Instagram. In Tampa, where dental practices compete heavily on social proof, Pearl is invisible on social.",
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
      {/* VOICE AI — DEMO WALKTHROUGH                                          */}
      {/* ------------------------------------------------------------------ */}

      <Section
        id="voice-ai"
        className="px-5 py-12 md:py-16 bg-slate-50/40 border-y border-slate-200/50"
      >
        <div className="max-w-2xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-widest text-teal-500 mb-3">
            Voice AI for Pearl Dental
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
            Here&apos;s what happens when someone calls Pearl at 7pm on a Friday.
          </h2>
          <p className="text-slate-600 mb-8 text-sm">
            This is the exact conversation. Word for word.
          </p>

          {/* Call transcript */}
          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden mb-8">

            {/* Header */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-200 bg-slate-50">
              <div className="w-8 h-8 rounded-full bg-teal-500/15 border border-teal-500/25 flex items-center justify-center flex-shrink-0">
                <Phone className="w-4 h-4 text-teal-600" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900">Incoming call — (813) 803-5767</p>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                  <p className="text-xs text-slate-400">Friday 7:12pm — call answered in 2 rings</p>
                </div>
              </div>
            </div>

            {/* Transcript */}
            <div className="p-4 md:p-6 space-y-4">
              {[
                {
                  speaker: "Pearl Dental Phone System",
                  role: "ai" as const,
                  text: "Thanks for calling Pearl Dental Center. I can help you schedule an appointment or answer any questions. What can I help you with today?",
                },
                {
                  speaker: "Caller",
                  role: "customer" as const,
                  text: "Hi, I chipped my front tooth at dinner and it looks terrible. Are you able to see me soon?",
                },
                {
                  speaker: "Pearl Dental Phone System",
                  role: "ai" as const,
                  text: "I'm sorry to hear that — I know that's stressful, especially a front tooth. Dr. Downie can definitely help with that. Are you in any pain right now?",
                },
                {
                  speaker: "Caller",
                  role: "customer" as const,
                  text: "It's a little sensitive but not too bad. I just want to get it fixed before a work event on Tuesday.",
                },
                {
                  speaker: "Pearl Dental Phone System",
                  role: "ai" as const,
                  text: "Understood. I have an opening Monday morning at 8am — that gives Dr. Downie time to assess and repair it before your event. Would that work for you?",
                },
                {
                  speaker: "Caller",
                  role: "customer" as const,
                  text: "That's perfect. Yes please.",
                },
                {
                  speaker: "Pearl Dental Phone System",
                  role: "ai" as const,
                  text: "Great. Can I get your name and the best number to reach you? I'll send you a text confirmation with all the details.",
                },
                {
                  speaker: "Caller",
                  role: "customer" as const,
                  text: "It's Maria Gonzalez, 813-555-0142.",
                },
                {
                  speaker: "Pearl Dental Phone System",
                  role: "ai" as const,
                  text: "You're all set, Maria. Monday at 8am with Dr. Downie at Pearl Dental Center on West Azeele Street. You'll get a confirmation text in the next minute. Is there anything else I can help with?",
                },
              ].map((line, i) => (
                <div
                  key={i}
                  className={`flex gap-3 ${line.role === "customer" ? "flex-row-reverse" : ""}`}
                >
                  <div
                    className={`w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold ${
                      line.role === "ai"
                        ? "bg-teal-500/15 border border-teal-500/25 text-teal-600"
                        : "bg-slate-200 text-slate-500"
                    }`}
                  >
                    {line.role === "ai" ? "P" : "C"}
                  </div>
                  <div className={`flex flex-col gap-1 max-w-[82%] ${line.role === "customer" ? "items-end" : ""}`}>
                    <span className="text-xs text-slate-900">{line.speaker}</span>
                    <div
                      className={`px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                        line.role === "ai"
                          ? "bg-slate-100 text-slate-900 rounded-tl-sm"
                          : "bg-teal-600 text-white rounded-tr-sm"
                      }`}
                    >
                      {line.text}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer stats */}
            <div className="grid grid-cols-3 border-t border-slate-200">
              {[
                { label: "Call duration", value: "2m 08s" },
                { label: "Appointment booked", value: "Yes" },
                { label: "Cost to Pearl", value: "~$0.40" },
              ].map(({ label, value }) => (
                <div key={label} className="px-4 py-3 text-center border-r border-slate-200 last:border-0">
                  <p className="text-xs text-slate-900 mb-0.5">{label}</p>
                  <p className="text-sm font-semibold text-slate-900">{value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* What Dr. Downie gets */}
          <div className="grid gap-3">
            <p className="text-sm font-semibold text-slate-600 uppercase tracking-wide">
              What Dr. Downie receives immediately after
            </p>
            <div className="flex items-start gap-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
              <MessageSquare className="w-4 h-4 text-teal-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-semibold text-slate-900 mb-0.5">SMS notification</p>
                <p className="text-sm text-slate-600 font-mono bg-white rounded-lg p-3 mt-2 leading-relaxed">
                  New booking — Pearl Dental<br />
                  Patient: Maria Gonzalez, (813) 555-0142<br />
                  Issue: Chipped front tooth, minor sensitivity<br />
                  Urgency: Before Tuesday work event<br />
                  Slot: Mon 8am<br />
                  Patient notified via SMS
                </p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ------------------------------------------------------------------ */}
      {/* ONLINE BOOKING AUTOMATION                                            */}
      {/* ------------------------------------------------------------------ */}

      <Section
        id="booking"
        className="px-5 py-12 md:py-16 max-w-2xl mx-auto"
      >
        <p className="text-xs font-semibold uppercase tracking-widest text-teal-500 mb-3">
          Online booking
        </p>
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
          Replace the request form with instant booking.
        </h2>
        <p className="text-slate-600 leading-relaxed mb-8">
          Right now, patients fill out a form and wait for a callback. That made
          sense 10 years ago. Today, patients expect to pick a time slot and get
          a confirmed appointment in under 30 seconds&nbsp;&mdash; the same way they
          book a restaurant or a haircut. We replace the request form with a
          real-time booking system that connects directly to your calendar.
        </p>

        <div className="grid gap-3">
          {[
            {
              icon: CalendarDays,
              title: "Real-time calendar integration",
              desc: "Patients see actual available slots and book instantly. No back-and-forth, no waiting for callbacks.",
            },
            {
              icon: BellRing,
              title: "Automated reminders",
              desc: "SMS and email reminders 48 hours and 2 hours before the appointment. Reduces no-shows without your staff lifting a finger.",
            },
            {
              icon: PhoneCall,
              title: "Works with the phone system",
              desc: "Whether patients book online or through the AI phone agent, everything lands in the same calendar. No double-bookings.",
            },
          ].map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="flex items-start gap-4 p-4 bg-slate-50 border border-slate-200 rounded-xl"
            >
              <div className="w-9 h-9 rounded-lg bg-teal-500/10 border border-teal-500/20 flex items-center justify-center flex-shrink-0">
                <Icon className="w-4 h-4 text-teal-600" />
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
      {/* REVIEW GROWTH                                                        */}
      {/* ------------------------------------------------------------------ */}

      <Section
        id="reviews"
        className="px-5 py-12 md:py-16 bg-slate-50/40 border-y border-slate-200/50"
      >
        <div className="max-w-2xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-widest text-teal-500 mb-3">
            Review growth
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
            4.9 stars is incredible. Let&apos;s make sure the world sees it.
          </h2>
          <p className="text-slate-600 leading-relaxed mb-8">
            Pearl Dental has roughly 100-200 Google reviews. That is solid, but
            Tampa competitors with 500+ reviews rank higher and look more
            established. Your patients already love the practice&nbsp;&mdash;
            they just need a nudge to leave a review.
          </p>

          <div className="grid gap-3">
            {[
              {
                icon: SmilePlus,
                title: "Automated post-visit requests",
                desc: "After every appointment, patients receive a friendly SMS asking them to share their experience. One tap takes them to your Google review page.",
              },
              {
                icon: Star,
                title: "Smart timing",
                desc: "The request goes out 2 hours after the appointment — when the positive experience is still fresh but they've had time to get home.",
              },
              {
                icon: TrendingUp,
                title: "Realistic goal: double reviews in 90 days",
                desc: "With consistent automated requests, practices typically see 15-25 new reviews per month. Pearl could go from ~150 to 300+ Google reviews in one quarter.",
              },
            ].map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="flex items-start gap-4 p-4 bg-slate-50 border border-slate-200 rounded-xl"
              >
                <div className="w-9 h-9 rounded-lg bg-teal-500/10 border border-teal-500/20 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-4 h-4 text-teal-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900 mb-0.5">{title}</p>
                  <p className="text-sm text-slate-400">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ------------------------------------------------------------------ */}
      {/* PRICING                                                               */}
      {/* ------------------------------------------------------------------ */}

      <Section
        id="pricing"
        className="px-5 py-12 md:py-16 max-w-2xl mx-auto"
      >
        <p className="text-xs font-semibold uppercase tracking-widest text-teal-500 mb-3">
          Pricing
        </p>
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8">
          Simple. No surprises.
        </h2>

        <div className="bg-slate-50 border border-teal-500/30 rounded-2xl overflow-hidden">
          {/* Pricing header */}
          <div className="p-6 md:p-8 border-b border-slate-200">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <div>
                <p className="text-sm text-slate-400 mb-1">One-time setup fee</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-slate-900">$2,000</span>
                </div>
                <p className="text-xs text-slate-900 mt-1">
                  Covers setup, testing, and approval
                </p>
              </div>
              <div className="sm:text-right">
                <p className="text-sm text-slate-400 mb-1">Then monthly</p>
                <div className="flex items-baseline gap-2 sm:justify-end">
                  <span className="text-4xl font-bold text-teal-600">$300</span>
                  <span className="text-slate-400">/mo</span>
                </div>
                <p className="text-xs text-slate-900 mt-1">
                  That is $10 a day
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
                "24/7 AI phone answering",
                "Real-time online booking",
                "Calendar integration",
                "SMS confirmations",
                "Appointment reminders",
                "Post-visit review requests",
                "Monthly reports",
                "Ongoing support & optimization",
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
            <div className="flex items-start gap-3 bg-teal-500/8 border border-teal-500/15 rounded-xl px-4 py-3">
              <DollarSign className="w-4 h-4 text-teal-600 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-slate-600">
                One new patient has a lifetime value of{" "}
                <span className="text-slate-900 font-medium">$1,000+</span>.
                This system costs{" "}
                <span className="text-slate-900 font-medium">$300/month</span>.
                Capturing just one extra patient per month means it pays for
                itself more than 3x over.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* ------------------------------------------------------------------ */}
      {/* ROI CALCULATOR                                                        */}
      {/* ------------------------------------------------------------------ */}

      <Section
        id="roi"
        className="px-5 py-12 md:py-16 bg-slate-50/40 border-y border-slate-200/50"
      >
        <div className="max-w-2xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-widest text-teal-500 mb-3">
            The numbers
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
            3 closed days = how much lost revenue?
          </h2>
          <p className="text-slate-600 mb-8 text-sm">
            Dental practices lose 20-30% of inbound calls to voicemail on average.
            With Pearl closed Fri-Sun, the number is likely higher. Slide the
            numbers to see what that means.
          </p>
          <RoiCalculator />
        </div>
      </Section>

      {/* ------------------------------------------------------------------ */}
      {/* SOCIAL PROOF                                                          */}
      {/* ------------------------------------------------------------------ */}

      <Section
        id="proof"
        className="px-5 py-12 md:py-16 max-w-2xl mx-auto"
      >
        <p className="text-xs font-semibold uppercase tracking-widest text-teal-500 mb-3">
          Real results
        </p>
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8">
          What happens when a small business plugs this in.
        </h2>

        {/* Case study card */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 md:p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-teal-500/15 border border-teal-500/20 flex items-center justify-center">
              <span className="text-sm font-bold text-teal-600">E</span>
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900">E&apos;Manuel Bakery</p>
              <p className="text-xs text-slate-400">Local service business, 6 employees, owner-operated</p>
            </div>
          </div>

          <p className="text-slate-600 text-sm leading-relaxed mb-6">
            Before working with us, E&apos;Manuel&apos;s owner was manually taking every
            order, chasing unpaid invoices, and managing bookings over WhatsApp and phone.
            Every evening was admin. Every missed call was a missed sale.
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

          <blockquote className="border-l-2 border-teal-500 pl-4">
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
          The same logic applies to any service business where patients call to book.
          The phone has to be answered.
        </p>
      </Section>

      {/* ------------------------------------------------------------------ */}
      {/* CTA                                                                   */}
      {/* ------------------------------------------------------------------ */}

      <Section
        id="cta"
        className="px-5 py-16 md:py-20 max-w-2xl mx-auto text-center"
      >
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
          Ready to stop losing weekend patients?
        </h2>
        <p className="text-slate-600 text-base mb-8 max-w-md mx-auto">
          Book a free 15-minute call. I&apos;ll walk you through a live demo
          using Pearl Dental&apos;s actual details&nbsp;&mdash; your number, your
          hours, your typical patient calls. No commitment required.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-10">
          <Link
            href="https://cal.com/sholastechnotes/free-ai-strategy-call"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-teal-500 hover:bg-teal-400 text-slate-900 font-semibold rounded-xl transition-all text-sm w-full sm:w-auto justify-center"
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
      </Section>

      {/* ------------------------------------------------------------------ */}
      {/* FOOTER                                                                */}
      {/* ------------------------------------------------------------------ */}

      <footer className="border-t border-slate-200/50 px-5 py-8">
        <div className="max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600">
          <p>WorkCrew Ltd</p>
          <p className="text-center">
            This page was built specifically for Pearl Dental Center.
          </p>
          <p>Private &amp; confidential</p>
        </div>
      </footer>

    </div>
  );
}
