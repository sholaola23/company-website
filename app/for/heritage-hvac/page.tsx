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
  FileText,
  TrendingUp,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";
import PasswordGate from "@/components/prospect/PasswordGate";

// ---------------------------------------------------------------------------
// Auth wrapper
// ---------------------------------------------------------------------------

export default function HeritageHvacPage() {
  const [authed, setAuthed] = useState<boolean | null>(null);

  useEffect(() => {
    fetch("/api/auth/prospect/check?slug=heritage-hvac")
      .then((r) => setAuthed(r.ok))
      .catch(() => setAuthed(false));
  }, []);

  if (authed === null) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="w-5 h-5 border-2 border-slate-200 border-t-amber-500 rounded-full animate-spin" />
      </div>
    );
  }

  if (!authed) {
    return (
      <PasswordGate
        slug="heritage-hvac"
        onAuthenticated={() => setAuthed(true)}
      />
    );
  }

  return <HeritageContent />;
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
  const [missedCalls, setMissedCalls] = useState(2);
  const [jobValue, setJobValue] = useState(500);

  const yearlyLost = missedCalls * jobValue * 52;
  const monthlyCost = 200;
  const yearlyCost = monthlyCost * 12 + 1500; // include setup
  const netGain = yearlyLost - yearlyCost;
  const roi = Math.round((netGain / yearlyCost) * 100);

  return (
    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 md:p-8">
      <h3 className="text-lg font-semibold text-slate-900 mb-1">
        What are missed calls costing Heritage?
      </h3>
      <p className="text-sm text-slate-400 mb-6">
        Adjust the numbers to match your business. The math is conservative.
      </p>

      <div className="space-y-6 mb-8">
        {/* Missed calls slider */}
        <div>
          <div className="flex justify-between items-baseline mb-2">
            <label className="text-sm text-slate-600">Missed calls per week</label>
            <span className="text-2xl font-bold text-amber-600">{missedCalls}</span>
          </div>
          <input
            type="range"
            min={1}
            max={20}
            value={missedCalls}
            onChange={(e) => setMissedCalls(Number(e.target.value))}
            className="w-full accent-amber-500 cursor-pointer"
            aria-label="Missed calls per week"
          />
          <div className="flex justify-between text-xs text-slate-900 mt-1">
            <span>1</span>
            <span>20</span>
          </div>
        </div>

        {/* Job value slider */}
        <div>
          <div className="flex justify-between items-baseline mb-2">
            <label className="text-sm text-slate-600">Average job value</label>
            <span className="text-2xl font-bold text-amber-600">${jobValue.toLocaleString()}</span>
          </div>
          <input
            type="range"
            min={200}
            max={3000}
            step={100}
            value={jobValue}
            onChange={(e) => setJobValue(Number(e.target.value))}
            className="w-full accent-amber-500 cursor-pointer"
            aria-label="Average job value in dollars"
          />
          <div className="flex justify-between text-xs text-slate-900 mt-1">
            <span>$200</span>
            <span>$3,000</span>
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
        <div className="flex items-start gap-3 bg-amber-500/10 border border-amber-500/20 rounded-xl px-4 py-3">
          <TrendingUp className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
          <p className="text-sm text-amber-200">
            At these numbers, the phone system pays for itself and returns{" "}
            <strong>{roi}% ROI in year one.</strong> That is just from the calls
            Heritage is already missing — before peak season.
          </p>
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main content
// ---------------------------------------------------------------------------

function HeritageContent() {
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
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-medium mb-6"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
          Built specifically for Heritage Heating &amp; Cooling
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight mb-4"
        >
          Jeff, you built something great.
          <br />
          <span className="text-amber-600">
            Let&apos;s make sure you don&apos;t miss another job.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-slate-600 text-base md:text-lg leading-relaxed"
        >
          Heritage has 376 reviews and 4.9 stars. Customers love the personal
          service. But right now, every call after 7pm and every Sunday rings
          out. That is revenue walking straight to your competitors.
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
          <p className="text-xs font-semibold uppercase tracking-widest text-amber-500 mb-3">
            The problem
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
            You&apos;re personally handling every after-hours call.
            <br className="hidden md:block" /> That worked for 27 years. It won&apos;t scale.
          </h2>
          <p className="text-slate-600 leading-relaxed">
            Your customers love that you pick up. Your reviews prove it — people mention
            texting Jeff directly, Jeff coming out on Saturdays, Jeff responding even though
            it was after hours. That reputation took 27 years to build.
          </p>
          <p className="text-slate-600 leading-relaxed mt-3">
            But here&apos;s the problem: Heritage is closed Sundays. Your competitor
            down the road is not. Every Sunday, the homeowner whose AC stopped working
            calls Heritage, gets voicemail, and calls someone else. You never even know
            the call happened.
          </p>
        </div>

        {/* Pain point cards */}
        <div className="grid gap-3">
          {[
            {
              icon: Clock,
              title: "Closed Sundays",
              desc: "In Tennessee, AC emergencies don't take Sundays off. Every Sunday call goes unanswered.",
            },
            {
              icon: PhoneCall,
              title: "After-hours = voicemail",
              desc: "After 7pm, Heritage's number rings out. One review mentions calling and waiting two hours for a callback. By then, the job was gone.",
            },
            {
              icon: AlertCircle,
              title: "Jeff IS the backup plan",
              desc: "When Jeff goes on holiday, is on a job, or is asleep, there is no system. There is only Jeff.",
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
      {/* HOW IT WORKS — DEMO WALKTHROUGH                                      */}
      {/* ------------------------------------------------------------------ */}

      <Section
        id="how-it-works"
        className="px-5 py-12 md:py-16 bg-slate-50/40 border-y border-slate-200/50"
      >
        <div className="max-w-2xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-widest text-amber-500 mb-3">
            How it works
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
            Here&apos;s what happens when Heritage gets a call at 9pm on a Sunday.
          </h2>
          <p className="text-slate-600 mb-8 text-sm">
            This is the exact conversation. Word for word.
          </p>

          {/* Call transcript */}
          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden mb-8">

            {/* Header */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-200 bg-slate-50">
              <div className="w-8 h-8 rounded-full bg-amber-500/15 border border-amber-500/25 flex items-center justify-center flex-shrink-0">
                <Phone className="w-4 h-4 text-amber-600" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900">Incoming call — (615) 394-6000</p>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                  <p className="text-xs text-slate-400">Sunday 9:14pm — call answered in 2 rings</p>
                </div>
              </div>
            </div>

            {/* Transcript */}
            <div className="p-4 md:p-6 space-y-4">
              {[
                {
                  speaker: "Heritage Phone System",
                  role: "ai" as const,
                  text: "Thanks for calling Heritage Heating and Cooling. I can help you get scheduled or answer any questions. What's going on with your system today?",
                },
                {
                  speaker: "Customer",
                  role: "customer" as const,
                  text: "My AC just stopped working and it's 95 degrees in here. I've got two kids at home.",
                },
                {
                  speaker: "Heritage Phone System",
                  role: "ai" as const,
                  text: "I'm sorry to hear that — that's definitely urgent, especially in this heat. Are you in the Franklin or Brentwood area?",
                },
                {
                  speaker: "Customer",
                  role: "customer" as const,
                  text: "Yeah, Franklin. Off Mack Hatcher.",
                },
                {
                  speaker: "Heritage Phone System",
                  role: "ai" as const,
                  text: "Perfect, that's right in Heritage's service area. Do you know what brand your unit is — Trane, Carrier, Lennox, or something else?",
                },
                {
                  speaker: "Customer",
                  role: "customer" as const,
                  text: "It's an American Standard, I think about 8 years old.",
                },
                {
                  speaker: "Heritage Phone System",
                  role: "ai" as const,
                  text: "Got it. Heritage is an authorised American Standard dealer — you're in good hands. I've got a slot tomorrow morning at 8am. Can I put you down for that and send you a confirmation text?",
                },
                {
                  speaker: "Customer",
                  role: "customer" as const,
                  text: "Yes please, that would be great.",
                },
                {
                  speaker: "Heritage Phone System",
                  role: "ai" as const,
                  text: "Done. You'll get a text in the next two minutes with the appointment details. Heritage will have you sorted out tomorrow morning.",
                },
              ].map((line, i) => (
                <div
                  key={i}
                  className={`flex gap-3 ${line.role === "customer" ? "flex-row-reverse" : ""}`}
                >
                  <div
                    className={`w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold ${
                      line.role === "ai"
                        ? "bg-amber-500/15 border border-amber-500/25 text-amber-600"
                        : "bg-slate-200 text-slate-500"
                    }`}
                  >
                    {line.role === "ai" ? "H" : "C"}
                  </div>
                  <div className={`flex flex-col gap-1 max-w-[82%] ${line.role === "customer" ? "items-end" : ""}`}>
                    <span className="text-xs text-slate-900">{line.speaker}</span>
                    <div
                      className={`px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                        line.role === "ai"
                          ? "bg-slate-100 text-slate-900 rounded-tl-sm"
                          : "bg-amber-600 text-white rounded-tr-sm"
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
                { label: "Call duration", value: "2m 14s" },
                { label: "Job booked", value: "Yes" },
                { label: "Cost to Heritage", value: "~$0.40" },
              ].map(({ label, value }) => (
                <div key={label} className="px-4 py-3 text-center border-r border-slate-200 last:border-0">
                  <p className="text-xs text-slate-900 mb-0.5">{label}</p>
                  <p className="text-sm font-semibold text-slate-900">{value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* What Jeff gets */}
          <div className="grid gap-3">
            <p className="text-sm font-semibold text-slate-600 uppercase tracking-wide">
              What Jeff receives immediately after
            </p>
            <div className="flex items-start gap-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
              <MessageSquare className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-semibold text-slate-900 mb-0.5">SMS to Jeff&apos;s phone</p>
                <p className="text-sm text-slate-600 font-mono bg-white rounded-lg p-3 mt-2 leading-relaxed">
                  New booking — Heritage<br />
                  Customer: Sarah M., Franklin (Mack Hatcher area)<br />
                  Issue: AC not working, American Standard, 8yr old<br />
                  Slot: Mon 8am<br />
                  Customer notified via SMS
                </p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ------------------------------------------------------------------ */}
      {/* ROI CALCULATOR                                                        */}
      {/* ------------------------------------------------------------------ */}

      <Section
        id="roi"
        className="px-5 py-12 md:py-16 max-w-2xl mx-auto"
      >
        <p className="text-xs font-semibold uppercase tracking-widest text-amber-500 mb-3">
          The numbers
        </p>
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
          How much is Heritage leaving on the table?
        </h2>
        <p className="text-slate-600 mb-8 text-sm">
          HVAC companies miss 20-30% of inbound calls on average. Slide the numbers to see
          what that means for Heritage.
        </p>
        <RoiCalculator />
      </Section>

      {/* ------------------------------------------------------------------ */}
      {/* WHAT'S INCLUDED                                                       */}
      {/* ------------------------------------------------------------------ */}

      <Section
        id="included"
        className="px-5 py-12 md:py-16 bg-slate-50/40 border-y border-slate-200/50"
      >
        <div className="max-w-2xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-widest text-amber-500 mb-3">
            What&apos;s included
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8">
            Everything set up and running for you.
            <br className="hidden md:block" /> Zero work required from Jeff.
          </h2>

          <div className="grid gap-3">
            {[
              {
                icon: Phone,
                title: "24/7 phone answering",
                desc: "Your number keeps ringing as normal. When Heritage is closed or busy, the phone system picks up. Customers never hear silence.",
              },
              {
                icon: MicVocal,
                title: "Lead qualification",
                desc: "The system asks the right questions — emergency or routine, location, equipment type. By the time Jeff sees the lead, it's already pre-qualified.",
              },
              {
                icon: CalendarDays,
                title: "Appointment booking",
                desc: "Books directly into Jeff's calendar. No back-and-forth, no double-bookings. The customer gets a slot confirmed on the call.",
              },
              {
                icon: MessageSquare,
                title: "SMS confirmations",
                desc: "Customer gets a text confirmation immediately. Jeff gets a text with lead details and what was booked.",
              },
              {
                icon: BellRing,
                title: "Owner notifications",
                desc: "Every call handled after hours triggers a text to Jeff. Wake up on Monday knowing exactly how many jobs came in overnight.",
              },
              {
                icon: FileText,
                title: "Call recordings",
                desc: "Every call is recorded and stored. Jeff can listen to any call at any time. Full transparency.",
              },
              {
                icon: TrendingUp,
                title: "Monthly report",
                desc: "A simple monthly summary: calls handled, jobs booked, peak call times, estimated revenue recovered. No jargon.",
              },
            ].map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="flex items-start gap-4 p-4 bg-slate-50 border border-slate-200 rounded-xl"
              >
                <div className="w-9 h-9 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-4 h-4 text-amber-600" />
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
        <p className="text-xs font-semibold uppercase tracking-widest text-amber-500 mb-3">
          Pricing
        </p>
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8">
          Simple. No surprises.
        </h2>

        <div className="bg-slate-50 border border-amber-500/30 rounded-2xl overflow-hidden">
          {/* Pricing header */}
          <div className="p-6 md:p-8 border-b border-slate-200">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <div>
                <p className="text-sm text-slate-400 mb-1">One-time setup fee</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-slate-900">$1,500</span>
                </div>
                <p className="text-xs text-slate-900 mt-1">
                  Covers setup, testing, and script approval
                </p>
              </div>
              <div className="sm:text-right">
                <p className="text-sm text-slate-400 mb-1">Then monthly</p>
                <div className="flex items-baseline gap-2 sm:justify-end">
                  <span className="text-4xl font-bold text-amber-600">$200</span>
                  <span className="text-slate-400">/mo</span>
                </div>
                <p className="text-xs text-slate-900 mt-1">
                  That is $6.50 a day
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
                "24/7 phone answering",
                "Lead qualification",
                "Calendar booking",
                "SMS to customers",
                "Texts to Jeff",
                "Call recordings",
                "Monthly reports",
                "Ongoing support",
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
            <div className="flex items-start gap-3 bg-amber-500/8 border border-amber-500/15 rounded-xl px-4 py-3">
              <DollarSign className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-slate-600">
                One missed emergency call in July is worth{" "}
                <span className="text-slate-900 font-medium">$800 minimum</span>.
                This phone system costs{" "}
                <span className="text-slate-900 font-medium">$200/month</span>. It
                pays for itself before the end of the first week of peak season.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* ------------------------------------------------------------------ */}
      {/* SOCIAL PROOF                                                          */}
      {/* ------------------------------------------------------------------ */}

      <Section
        id="proof"
        className="px-5 py-12 md:py-16 bg-slate-50/40 border-y border-slate-200/50"
      >
        <div className="max-w-2xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-widest text-amber-500 mb-3">
            Real results
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8">
            What happens when a small business plugs this in.
          </h2>

          {/* Case study card */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-amber-500/15 border border-amber-500/20 flex items-center justify-center">
                <span className="text-sm font-bold text-amber-600">E</span>
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

            <blockquote className="border-l-2 border-amber-500 pl-4">
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
            The same logic applies to any service business where the phone is how customers
            reach you.
          </p>
        </div>
      </Section>

      {/* ------------------------------------------------------------------ */}
      {/* CTA                                                                   */}
      {/* ------------------------------------------------------------------ */}

      <Section
        id="cta"
        className="px-5 py-16 md:py-20 max-w-2xl mx-auto text-center"
      >
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
          Ready to stop missing calls?
        </h2>
        <p className="text-slate-600 text-base mb-8 max-w-md mx-auto">
          Book a free 15-minute call. I&apos;ll walk Jeff through a live demo using
          Heritage&apos;s details — your number, your area, your typical jobs. No
          commitment required.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-10">
          <Link
            href="https://cal.com/sholastechnotes/free-ai-strategy-call"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-900 font-semibold rounded-xl transition-all text-sm w-full sm:w-auto justify-center"
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
            This page was built specifically for Heritage Heating &amp; Cooling.
          </p>
          <p>Private &amp; confidential</p>
        </div>
      </footer>

    </div>
  );
}
