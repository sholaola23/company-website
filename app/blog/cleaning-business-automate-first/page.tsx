import Link from "next/link";
import { ArrowLeft, ArrowRight, Clock } from "lucide-react";
import type { Metadata } from "next";
import JsonLd from "@/components/shared/JsonLd";

export const metadata: Metadata = {
  title: "AI for Cleaning Businesses: 3 Tasks to Automate",
  description:
    "The 3 tasks losing cleaning businesses the most revenue — after-hours lead capture, booking reminders, and quote follow-up — and how AI handles each automatically.",
  keywords: [
    "AI for cleaning businesses",
    "cleaning company automation",
    "automate cleaning business",
    "cleaning lead capture AI",
    "reduce no-shows cleaning",
  ],
  openGraph: {
    title: "AI for Cleaning Businesses: 3 Tasks to Automate",
    description:
      "The 3 tasks losing cleaning businesses the most revenue — after-hours lead capture, booking reminders, and quote follow-up — and how AI handles each automatically.",
    type: "article",
    publishedTime: "2026-03-24T00:00:00.000Z",
    authors: ["Olushola Oladipupo"],
  },
  alternates: {
    canonical: "/blog/cleaning-business-automate-first",
  },
  twitter: {
    title: "AI for Cleaning Businesses: 3 Tasks to Automate",
    description:
      "The 3 tasks losing cleaning businesses the most revenue — after-hours lead capture, booking reminders, and quote follow-up — and how AI handles each automatically.",
  },
};

const tags = [
  "AI Automation",
  "Cleaning Business",
  "Lead Generation",
  "Small Business",
];

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline:
    "AI for Cleaning Businesses: The 3 Tasks You Should Automate First",
  description:
    "The 3 tasks losing cleaning businesses the most revenue — after-hours lead capture, booking reminders, and quote follow-up — and how AI handles each automatically.",
  author: {
    "@type": "Person",
    name: "Olushola Oladipupo",
  },
  publisher: {
    "@type": "Organization",
    name: "Oladipupo Consulting Ltd",
    url: "https://oladipupoconsulting.co.uk",
  },
  datePublished: "2026-03-24",
  dateModified: "2026-03-24",
  mainEntityOfPage:
    "https://oladipupoconsulting.co.uk/blog/cleaning-business-automate-first",
};

export default function BlogPost() {
  return (
    <div className="min-h-screen">
      <JsonLd data={articleJsonLd} />
      <article className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-zinc-400 hover:text-white text-sm mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            All Posts
          </Link>

          <div className="flex flex-wrap gap-2 mb-4">
            {tags.map((tag) => (
              <span
                key={tag}
                className="text-xs bg-zinc-800 text-zinc-400 px-2 py-0.5 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>

          <h1 className="text-4xl font-bold mb-4">
            AI for Cleaning Businesses: The 3 Tasks You Should Automate First
          </h1>

          <div className="flex items-center gap-4 text-sm text-zinc-500 mb-12">
            <span>24 March 2026</span>
            <span className="text-zinc-700">|</span>
            <span>By Olushola Oladipupo</span>
            <span className="text-zinc-700">|</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />5 min read
            </span>
          </div>

          <div className="prose prose-invert max-w-none">
            {/* Hook */}
            <p className="text-zinc-300 leading-relaxed mb-4 text-lg">
              Someone needs a cleaner. They search online, find three businesses,
              and send enquiries to all three.
            </p>

            <p className="text-zinc-300 leading-relaxed mb-4">
              The first to reply gets the job.
            </p>

            <p className="text-zinc-300 leading-relaxed mb-4">
              If your reply comes the next morning &mdash; and a competitor
              responded at 10:47pm the night before &mdash; the job was never
              yours to lose. You never had it.
            </p>

            <p className="text-zinc-300 leading-relaxed mb-8">
              This is the reality for cleaning businesses in 2026. Competition is
              no longer just about price or reviews. It is about speed. Here are
              the three tasks cleaning businesses should automate first &mdash;
              and why each one directly protects your revenue.
            </p>

            {/* Task 1 */}
            <h2 className="text-2xl font-bold mt-10 mb-4">
              Task 1: After-Hours Lead Capture
            </h2>

            <p className="text-zinc-300 leading-relaxed mb-4">
              Most cleaning enquiries do not arrive during business hours. They
              arrive when someone looks around their home after a long day and
              decides to act. Evenings. Weekends. Bank holidays.
            </p>

            <p className="text-zinc-300 leading-relaxed mb-4">
              If no one picks up those enquiries until Monday morning, they are
              already gone.
            </p>

            <p className="text-zinc-300 leading-relaxed mb-8">
              An{" "}
              <Link
                href="/blog/ai-chatbot-small-business"
                className="text-blue-400 hover:text-blue-300 transition-colors"
              >
                AI assistant
              </Link>{" "}
              handles this 24 hours a day, 7 days a week. It responds
              immediately, asks qualifying questions &mdash; property size,
              frequency, location &mdash; and either provides a quote or books a
              callback. The customer gets a response at 10pm. You wake up to a
              qualified lead in your inbox.
            </p>

            {/* Task 2 */}
            <h2 className="text-2xl font-bold mt-10 mb-4">
              Task 2: Booking Confirmations and Reminder Sequences
            </h2>

            <p className="text-zinc-300 leading-relaxed mb-4">
              No-shows cost more than most cleaning business owners realise. A
              missed appointment means a wasted journey, a lost fee, and a gap in
              the schedule that is hard to fill last-minute.
            </p>

            <p className="text-zinc-300 leading-relaxed mb-4">
              A simple{" "}
              <Link
                href="/blog/automate-appointment-booking"
                className="text-blue-400 hover:text-blue-300 transition-colors"
              >
                automated sequence
              </Link>{" "}
              eliminates most of this: booking confirmation sent immediately,
              reminder the day before, check-in message the morning of. Customers
              do not forget. No-shows drop. Your team&apos;s time is protected.
            </p>

            <p className="text-zinc-300 leading-relaxed mb-8">
              Once set up, this runs without you. Running it manually costs you
              every week.
            </p>

            {/* Task 3 */}
            <h2 className="text-2xl font-bold mt-10 mb-4">
              Task 3: Quote Follow-Up
            </h2>

            <p className="text-zinc-300 leading-relaxed mb-4">
              Someone requested a quote. You sent it. Two days have passed with
              no reply.
            </p>

            <p className="text-zinc-300 leading-relaxed mb-4">
              Do you follow up? Most business owners either send a manual chaser
              (costs time) or let it go (costs the booking).
            </p>

            <p className="text-zinc-300 leading-relaxed mb-8">
              Automated follow-up removes this decision entirely. The system
              sends a polite nudge at 48 hours. If still no reply, another at 5
              days. You only step in when they respond. Everything before that
              happens automatically. The result: more quotes convert without any
              extra effort from you.
            </p>

            <hr className="border-zinc-800 my-10" />

            {/* Where to Start */}
            <h2 className="text-2xl font-bold mt-8 mb-4">
              Start With What Is Costing You Most Right Now
            </h2>

            <p className="text-zinc-300 leading-relaxed mb-4">
              You do not need to automate all three at once. Start with the task
              losing you the most business this month. For most cleaning
              businesses, that is after-hours leads.
            </p>

            <p className="text-zinc-300 leading-relaxed mb-8">
              Take our free{" "}
              <Link
                href="/audit"
                className="text-blue-400 hover:text-blue-300 transition-colors"
              >
                AI readiness audit
              </Link>{" "}
              to find out exactly where your cleaning business is losing time and
              money &mdash; and what to fix first. It takes 10 seconds.
            </p>
          </div>

          {/* Related Articles */}
          <div className="mt-12 border border-zinc-800 rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4 text-zinc-100">
              Related Articles
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/blog/ai-for-cleaning-companies"
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                >
                  AI for Cleaning Companies: Win More Contracts
                </Link>
              </li>
              <li>
                <Link
                  href="/blog/before-after-automated-lead-response"
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                >
                  Before and After: Automating Lead Response
                </Link>
              </li>
              <li>
                <Link
                  href="/blog/ai-chatbot-small-business"
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                >
                  AI Chatbots for Small Business: Complete Guide
                </Link>
              </li>
              <li>
                <Link
                  href="/services/lead-intake"
                  className="text-zinc-300 hover:text-white transition-colors"
                >
                  View our AI Lead Intake &amp; Appointment Booking service
                  &rarr;
                </Link>
              </li>
            </ul>
          </div>

          {/* CTA Section */}
          <div className="mt-16 bg-gradient-to-br from-blue-500/10 to-zinc-900 border border-zinc-800 rounded-xl p-8 text-center">
            <h3 className="text-xl font-semibold mb-2">
              Find Out What&apos;s Costing Your Cleaning Business Money
            </h3>
            <p className="text-zinc-400 mb-6 max-w-lg mx-auto">
              Take our free AI Readiness Audit. In 2 minutes, you&apos;ll know
              exactly where automation would make the biggest impact &mdash; and
              what it would cost.
            </p>
            <Link
              href="/audit"
              className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Get Your Free AI Readiness Audit
              <ArrowRight className="w-4 h-4" />
            </Link>
            <p className="text-zinc-500 text-sm mt-3">
              Takes 2 minutes. No obligation. 90-day results guarantee.
            </p>
          </div>

          {/* Prev/Next Navigation */}
          <div className="mt-12 flex justify-between items-center border-t border-zinc-800 pt-8">
            <Link
              href="/blog/before-after-automated-lead-response"
              className="text-zinc-400 hover:text-white transition-colors text-sm flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Automated Lead Response
            </Link>
            <Link
              href="/blog/voice-ai-small-business"
              className="text-zinc-400 hover:text-white transition-colors text-sm flex items-center gap-2"
            >
              Voice AI for Small Business
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}
