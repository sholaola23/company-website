"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  DollarSign,
  CalendarDays,
  MessageSquare,
  ExternalLink,
  Linkedin,
  Bot,
  PhoneCall,
  Star,
  Clock,
  AlertCircle,
  TrendingUp,
  Mic,
  Send,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";
import PasswordGate from "@/components/prospect/PasswordGate";

// ---------------------------------------------------------------------------
// Auth wrapper
// ---------------------------------------------------------------------------

export default function AspireDentalPage() {
  const [authed, setAuthed] = useState<boolean | null>(null);

  useEffect(() => {
    fetch("/api/auth/prospect/check?slug=aspire-dental")
      .then((r) => setAuthed(r.ok))
      .catch(() => setAuthed(false));
  }, []);

  if (authed === null) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="w-5 h-5 border-2 border-slate-200 border-t-blue-600 rounded-full animate-spin" />
      </div>
    );
  }

  if (!authed) {
    return (
      <PasswordGate
        slug="aspire-dental"
        onAuthenticated={() => setAuthed(true)}
      />
    );
  }

  return <AspireContent />;
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
// ROI Calculator (dental-specific)
// ---------------------------------------------------------------------------

function RoiCalculator() {
  const [missedInquiries, setMissedInquiries] = useState(2);
  const [caseValue, setCaseValue] = useState(8000);

  const yearlyLost = missedInquiries * caseValue * 12;
  const monthlyCost = 300;
  const yearlyCost = monthlyCost * 12 + 2000; // include setup
  const netGain = yearlyLost - yearlyCost;
  const roi = Math.round((netGain / yearlyCost) * 100);

  return (
    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 md:p-8">
      <h3 className="text-lg font-semibold text-slate-900 mb-1">
        What are missed implant inquiries costing Aspire?
      </h3>
      <p className="text-sm text-slate-900 mb-6">
        Adjust the numbers to match your practice. These estimates are conservative.
      </p>

      <div className="space-y-6 mb-8">
        {/* Missed inquiries slider */}
        <div>
          <div className="flex justify-between items-baseline mb-2">
            <label className="text-sm text-slate-600">Missed inquiries per month</label>
            <span className="text-2xl font-bold text-blue-600">{missedInquiries}</span>
          </div>
          <input
            type="range"
            min={1}
            max={10}
            value={missedInquiries}
            onChange={(e) => setMissedInquiries(Number(e.target.value))}
            className="w-full accent-blue-600 cursor-pointer"
            aria-label="Missed inquiries per month"
          />
          <div className="flex justify-between text-xs text-slate-400 mt-1">
            <span>1</span>
            <span>10</span>
          </div>
        </div>

        {/* Case value slider */}
        <div>
          <div className="flex justify-between items-baseline mb-2">
            <label className="text-sm text-slate-600">Average implant case value</label>
            <span className="text-2xl font-bold text-blue-600">${caseValue.toLocaleString()}</span>
          </div>
          <input
            type="range"
            min={3000}
            max={30000}
            step={1000}
            value={caseValue}
            onChange={(e) => setCaseValue(Number(e.target.value))}
            className="w-full accent-blue-600 cursor-pointer"
            aria-label="Average implant case value in dollars"
          />
          <div className="flex justify-between text-xs text-slate-400 mt-1">
            <span>$3,000</span>
            <span>$30,000</span>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl p-4 text-center border border-slate-200">
          <p className="text-xs text-slate-900 mb-1">Lost per year</p>
          <p className="text-2xl font-bold text-red-500">
            ${yearlyLost.toLocaleString()}
          </p>
        </div>
        <div className="bg-white rounded-xl p-4 text-center border border-slate-200">
          <p className="text-xs text-slate-900 mb-1">System cost (yr 1)</p>
          <p className="text-2xl font-bold text-slate-700">
            ${yearlyCost.toLocaleString()}
          </p>
        </div>
        <div className="bg-white rounded-xl p-4 text-center border border-slate-200">
          <p className="text-xs text-slate-900 mb-1">Net gain</p>
          <p className={`text-2xl font-bold ${netGain > 0 ? "text-emerald-600" : "text-slate-400"}`}>
            {netGain > 0 ? `+$${netGain.toLocaleString()}` : "-"}
          </p>
        </div>
      </div>

      {netGain > 0 && (
        <div className="flex items-start gap-3 bg-blue-50 border border-blue-200 rounded-xl px-4 py-3">
          <TrendingUp className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
          <p className="text-sm text-blue-800">
            At these numbers, the system pays for itself and returns{" "}
            <strong>{roi}% ROI in year one.</strong> That&apos;s from inquiries
            Aspire is already missing — before any additional marketing.
          </p>
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Chat demo
// ---------------------------------------------------------------------------

function ChatDemo() {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-100 bg-slate-50">
        <div className="w-8 h-8 rounded-full bg-blue-100 border border-blue-200 flex items-center justify-center flex-shrink-0">
          <Bot className="w-4 h-4 text-blue-600" />
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-900">Aspire Dental Assistant</p>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <p className="text-xs text-slate-900">Online — Tuesday 10:47pm</p>
          </div>
        </div>
      </div>

      {/* Transcript */}
      <div className="p-4 md:p-6 space-y-4">
        {[
          {
            speaker: "Aspire Dental",
            role: "ai" as const,
            text: "Hi! Welcome to Aspire Dental. I can answer questions about our procedures, pricing, insurance, or help you book a consultation. How can I help?",
          },
          {
            speaker: "Patient",
            role: "patient" as const,
            text: "I'm looking into dental implants. How much do they typically cost? And does my insurance cover any of it?",
          },
          {
            speaker: "Aspire Dental",
            role: "ai" as const,
            text: "Great question. Implant costs at Aspire Dental typically range from $3,000 to $6,000 per implant depending on the case. For full-arch restorations, costs vary more. Many dental insurance plans cover a portion — we can verify your specific coverage during a consultation. Would you like to schedule a free consultation with Dr. Hall?",
          },
          {
            speaker: "Patient",
            role: "patient" as const,
            text: "Yeah, that would be good. What's available this week?",
          },
          {
            speaker: "Aspire Dental",
            role: "ai" as const,
            text: "I have openings on Thursday at 10am and Friday at 2pm. Which works better for you? I'll also need your name, phone number, and insurance provider so Dr. Hall's team is prepared.",
          },
          {
            speaker: "Patient",
            role: "patient" as const,
            text: "Thursday 10am works. It's Michael Torres, 512-555-0189, Delta Dental.",
          },
          {
            speaker: "Aspire Dental",
            role: "ai" as const,
            text: "You're all set, Michael. Thursday at 10am with Dr. Hall for an implant consultation. You'll receive a confirmation text shortly with the office address and what to bring. Is there anything else I can help with?",
          },
        ].map((line, i) => (
          <div
            key={i}
            className={`flex gap-3 ${line.role === "patient" ? "flex-row-reverse" : ""}`}
          >
            <div
              className={`w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold ${
                line.role === "ai"
                  ? "bg-blue-100 border border-blue-200 text-blue-600"
                  : "bg-slate-200 text-slate-600"
              }`}
            >
              {line.role === "ai" ? "A" : "P"}
            </div>
            <div className={`flex flex-col gap-1 max-w-[82%] ${line.role === "patient" ? "items-end" : ""}`}>
              <span className="text-xs text-slate-400">{line.speaker}</span>
              <div
                className={`px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                  line.role === "ai"
                    ? "bg-slate-100 text-slate-800 rounded-tl-sm"
                    : "bg-blue-600 text-white rounded-tr-sm"
                }`}
              >
                {line.text}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer stats */}
      <div className="grid grid-cols-3 border-t border-slate-100">
        {[
          { label: "Time", value: "10:47pm" },
          { label: "Consultation booked", value: "Yes" },
          { label: "Estimated case value", value: "$3K-$6K" },
        ].map(({ label, value }) => (
          <div key={label} className="px-4 py-3 text-center border-r border-slate-100 last:border-0">
            <p className="text-xs text-slate-400 mb-0.5">{label}</p>
            <p className="text-sm font-semibold text-slate-800">{value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main content
// ---------------------------------------------------------------------------

function AspireContent() {
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
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-medium mb-6"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
          Built specifically for Aspire Dental
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight mb-4"
        >
          Dr. Hall, we built this for Aspire Dental.
          <br />
          <span className="text-blue-600">
            Stop losing implant patients to slower competitors.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-slate-900 text-base md:text-lg leading-relaxed"
        >
          Your implant quiz is smart. Your reviews are solid. But right now,
          every patient who visits aspiredental.com after hours hits a request
          form and waits. By morning, they&apos;ve booked a consultation with
          someone else.
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
          <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-3">
            The problem
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
            Implant patients research at night.
            <br className="hidden md:block" /> Your website has a request form, not instant booking.
          </h2>
          <p className="text-slate-900 leading-relaxed">
            A patient considering dental implants doesn&apos;t impulse-buy. They spend weeks
            researching — reading reviews, comparing costs, checking insurance coverage. And they
            do most of that research at 9pm, 10pm, 11pm. When they&apos;re ready to take
            the next step, they visit your site.
          </p>
          <p className="text-slate-900 leading-relaxed mt-3">
            Right now, that patient fills out a request form and waits. By morning,
            they&apos;ve contacted 3 other practices. The first one to book a
            consultation wins the case. That case is worth $3,000 to $30,000.
          </p>
        </div>

        {/* Pain point cards */}
        <div className="grid gap-3">
          {[
            {
              icon: Clock,
              title: "After-hours = silence",
              desc: "When a prospective implant patient calls or visits your site at 9pm, there's no one to answer their questions or book them in.",
            },
            {
              icon: MessageSquare,
              title: "No way to engage browsers",
              desc: "Patients have complex questions — cost, insurance, recovery, candidacy. Without a chat option, they leave and search elsewhere.",
            },
            {
              icon: AlertCircle,
              title: "Request form vs. instant booking",
              desc: "Competitors with real-time scheduling book patients while Aspire's form says 'we'll get back to you.' In implant dentistry, speed wins.",
            },
          ].map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="flex items-start gap-4 p-4 bg-slate-50 border border-slate-200 rounded-xl"
            >
              <div className="w-9 h-9 rounded-lg bg-red-50 border border-red-200 flex items-center justify-center flex-shrink-0">
                <Icon className="w-4 h-4 text-red-500" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-800 mb-0.5">{title}</p>
                <p className="text-sm text-slate-900">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ------------------------------------------------------------------ */}
      {/* WHAT WE'D BUILD — CHATBOT DEMO                                     */}
      {/* ------------------------------------------------------------------ */}

      <Section
        id="chatbot"
        className="px-5 py-12 md:py-16 bg-slate-50 border-y border-slate-200"
      >
        <div className="max-w-2xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-3">
            What we&apos;d build
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
            An AI assistant that answers patient questions 24/7 and books consultations instantly.
          </h2>
          <p className="text-slate-900 mb-8 text-sm">
            Here&apos;s what happens when a patient visits aspiredental.com at 10:47pm on a Tuesday.
          </p>

          <ChatDemo />

          {/* What Dr. Hall gets */}
          <div className="mt-6 grid gap-3">
            <p className="text-sm font-semibold text-slate-600 uppercase tracking-wide">
              What Dr. Hall&apos;s team sees the next morning
            </p>
            <div className="flex items-start gap-3 p-4 bg-white border border-slate-200 rounded-xl">
              <Send className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-semibold text-slate-800 mb-0.5">Notification to front desk</p>
                <p className="text-sm text-slate-900 font-mono bg-slate-50 rounded-lg p-3 mt-2 leading-relaxed">
                  New consultation booked — Aspire Dental<br />
                  Patient: Michael Torres, (512) 555-0189<br />
                  Insurance: Delta Dental<br />
                  Interest: Dental implants<br />
                  Appointment: Thursday 10am<br />
                  Patient confirmed via text
                </p>
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
        <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-3">
          The math
        </p>
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
          One missed implant inquiry = $3,000 to $30,000.
          <br className="hidden md:block" /> Our system costs $300/month.
        </h2>
        <p className="text-slate-900 mb-8 text-sm">
          The math does itself. Slide the numbers to see what it means for Aspire.
        </p>
        <RoiCalculator />
      </Section>

      {/* ------------------------------------------------------------------ */}
      {/* VOICE AI                                                           */}
      {/* ------------------------------------------------------------------ */}

      <Section
        id="voice"
        className="px-5 py-12 md:py-16 bg-slate-50 border-y border-slate-200"
      >
        <div className="max-w-2xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-3">
            Voice AI
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
            After-hours calls answered. Emergencies triaged. Appointments booked.
          </h2>
          <p className="text-slate-900 leading-relaxed mb-8">
            When a patient calls (512) 491-5244 outside office hours, they currently
            get voicemail. With Voice AI, they get a natural-sounding phone system
            that can answer questions, identify emergencies, and book appointments
            directly into your calendar.
          </p>

          <div className="grid gap-3">
            {[
              {
                icon: Mic,
                title: "Natural conversation",
                desc: "The system sounds like a well-trained receptionist, not a robot menu. Patients don't know the difference.",
              },
              {
                icon: ShieldCheck,
                title: "Emergency triage",
                desc: "Identifies urgent situations (swelling, trauma, severe pain) and provides appropriate guidance while connecting them to emergency contacts.",
              },
              {
                icon: CalendarDays,
                title: "Direct calendar booking",
                desc: "Books appointments into your scheduling system. Patient gets a text confirmation. Your team sees it first thing in the morning.",
              },
              {
                icon: PhoneCall,
                title: "Call summaries to your team",
                desc: "Every after-hours call generates a summary: who called, what they need, what was booked. No information falls through the cracks.",
              },
            ].map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="flex items-start gap-4 p-4 bg-white border border-slate-200 rounded-xl"
              >
                <div className="w-9 h-9 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-800 mb-0.5">{title}</p>
                  <p className="text-sm text-slate-900">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ------------------------------------------------------------------ */}
      {/* REVIEW AUTOMATION                                                  */}
      {/* ------------------------------------------------------------------ */}

      <Section
        id="reviews"
        className="px-5 py-12 md:py-16 max-w-2xl mx-auto"
      >
        <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-3">
          Review automation
        </p>
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
          Grow your Google reviews on autopilot.
        </h2>
        <p className="text-slate-900 leading-relaxed mb-8">
          For implant practices, Google reviews are the number one trust signal.
          Patients comparing providers check review counts and ratings before
          anything else. With automated post-appointment review requests, Aspire
          can consistently grow its review count without staff lifting a finger.
        </p>

        <div className="grid sm:grid-cols-3 gap-4">
          {[
            {
              icon: Send,
              title: "Automated requests",
              desc: "After every appointment, patients receive a friendly text asking for a review. Timed for when satisfaction is highest.",
            },
            {
              icon: Star,
              title: "Review growth",
              desc: "Practices using automated review requests typically see 2-3x more reviews within 6 months.",
            },
            {
              icon: TrendingUp,
              title: "Better rankings",
              desc: "More reviews = higher Google Maps ranking. For 'dental implants Austin', review count matters.",
            },
          ].map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="p-4 bg-slate-50 border border-slate-200 rounded-xl"
            >
              <div className="w-9 h-9 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center mb-3">
                <Icon className="w-4 h-4 text-blue-600" />
              </div>
              <p className="text-sm font-semibold text-slate-800 mb-1">{title}</p>
              <p className="text-sm text-slate-900">{desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ------------------------------------------------------------------ */}
      {/* PRICING                                                            */}
      {/* ------------------------------------------------------------------ */}

      <Section
        id="pricing"
        className="px-5 py-12 md:py-16 bg-slate-50 border-y border-slate-200"
      >
        <div className="max-w-2xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-3">
            Pricing
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8">
            Simple. Transparent. No surprises.
          </h2>

          <div className="bg-white border border-blue-200 rounded-2xl overflow-hidden shadow-sm">
            {/* Pricing header */}
            <div className="p-6 md:p-8 border-b border-slate-100">
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                <div>
                  <p className="text-sm text-slate-900 mb-1">One-time setup fee</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold text-slate-900">$2,000</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">
                    Covers configuration, training, testing, and launch
                  </p>
                </div>
                <div className="sm:text-right">
                  <p className="text-sm text-slate-900 mb-1">Then monthly</p>
                  <div className="flex items-baseline gap-2 sm:justify-end">
                    <span className="text-4xl font-bold text-blue-600">$300</span>
                    <span className="text-slate-400">/mo</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">
                    That&apos;s $10 a day
                  </p>
                </div>
              </div>
            </div>

            {/* What's covered */}
            <div className="p-6 md:p-8">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400 mb-4">
                Everything included
              </p>
              <div className="grid sm:grid-cols-2 gap-2">
                {[
                  "24/7 AI chatbot",
                  "Instant consultation booking",
                  "Voice AI phone agent",
                  "Emergency triage",
                  "SMS confirmations",
                  "Review automation",
                  "Staff notifications",
                  "Monthly reports",
                  "Ongoing optimisation",
                  "Dedicated support",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                    <span className="text-sm text-slate-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Context callout */}
            <div className="px-6 pb-6 md:px-8 md:pb-8">
              <div className="flex items-start gap-3 bg-blue-50 border border-blue-200 rounded-xl px-4 py-3">
                <DollarSign className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-slate-600">
                  One implant case is worth{" "}
                  <span className="text-slate-900 font-medium">$3,000 to $30,000</span>.
                  This system costs{" "}
                  <span className="text-slate-900 font-medium">$300/month</span> — less
                  than a single crown. If it captures one extra consultation per month,
                  the ROI is 10x or more.
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
        <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-3">
          Real results
        </p>
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8">
          What happens when a small business plugs this in.
        </h2>

        {/* Case study card */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 md:p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center">
              <span className="text-sm font-bold text-blue-600">E</span>
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-800">E&apos;Manuel Bakery</p>
              <p className="text-xs text-slate-900">Local service business, 6 employees, owner-operated</p>
            </div>
          </div>

          <p className="text-slate-900 text-sm leading-relaxed mb-6">
            Before working with us, the owner was manually handling every order,
            chasing unpaid invoices, and managing bookings over WhatsApp and phone.
            Every evening was admin. Every missed call was a missed sale. Sound familiar?
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            {[
              { label: "Response time", before: "2-4 hours", after: "Under 2 mins" },
              { label: "Admin hours saved", before: "8hrs/week", after: "0hrs/week" },
              { label: "Missed enquiries", before: "~30%", after: "~0%" },
            ].map(({ label, before, after }) => (
              <div key={label} className="bg-white rounded-xl p-3 border border-slate-200">
                <p className="text-xs text-slate-400 mb-2">{label}</p>
                <p className="text-xs text-slate-400 line-through mb-0.5">{before}</p>
                <p className="text-sm font-semibold text-emerald-600">{after}</p>
              </div>
            ))}
          </div>

          <blockquote className="border-l-2 border-blue-600 pl-4">
            <p className="text-sm text-slate-600 italic leading-relaxed">
              &ldquo;We used to miss orders every single evening. Now the system handles everything
              while we&apos;re in the kitchen. We don&apos;t think about it anymore — it just works.&rdquo;
            </p>
            <footer className="mt-2 text-xs text-slate-400">
              — Tunmise, Owner, E&apos;Manuel Bakery
            </footer>
          </blockquote>
        </div>

        <p className="text-sm text-slate-400 mt-4 text-center">
          The same logic applies to any service business where the phone is how
          customers reach you — especially when each case is worth thousands.
        </p>
      </Section>

      {/* ------------------------------------------------------------------ */}
      {/* CTA                                                                */}
      {/* ------------------------------------------------------------------ */}

      <Section
        id="cta"
        className="px-5 py-16 md:py-20 bg-slate-50 border-t border-slate-200"
      >
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
            Ready to stop losing implant patients?
          </h2>
          <p className="text-slate-900 text-base mb-8 max-w-md mx-auto">
            Book a free 15-minute call. I&apos;ll walk you through a live demo
            using Aspire&apos;s details — your procedures, your scheduling, your
            patient journey. No commitment required.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-10">
            <Link
              href="https://cal.com/sholastechnotes/free-ai-strategy-call"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all text-sm w-full sm:w-auto justify-center"
            >
              <CalendarDays className="w-4 h-4" />
              Book a free 15-minute call
              <ExternalLink className="w-3.5 h-3.5 opacity-70" />
            </Link>
            <Link
              href="https://linkedin.com/in/olushola-oladipupo"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 font-medium rounded-xl transition-all text-sm w-full sm:w-auto justify-center"
            >
              <Linkedin className="w-4 h-4" />
              Connect on LinkedIn
            </Link>
          </div>

          {/* Contact details */}
          <div className="inline-flex flex-col items-center gap-1.5 text-sm text-slate-400">
            <p>Olushola Oladipupo — WorkCrew Ltd</p>
            <p>+44 7469 347654 &bull; olusholaoladipupo1@gmail.com</p>
          </div>
        </div>
      </Section>

      {/* ------------------------------------------------------------------ */}
      {/* FOOTER                                                             */}
      {/* ------------------------------------------------------------------ */}

      <footer className="border-t border-slate-200 px-5 py-8">
        <div className="max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <p>WorkCrew Ltd</p>
          <p className="text-center">
            This page was built specifically for Aspire Dental.
          </p>
          <p>Private &amp; confidential</p>
        </div>
      </footer>

    </div>
  );
}
