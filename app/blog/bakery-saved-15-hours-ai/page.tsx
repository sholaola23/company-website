import Link from "next/link";
import { ArrowLeft, ArrowRight, Clock } from "lucide-react";
import type { Metadata } from "next";
import JsonLd from "@/components/shared/JsonLd";

export const metadata: Metadata = {
  title: "London Bakery Saved 15+ Hours/Week With AI",
  description:
    "How a London wholesale bakery automated order processing, production scheduling, and delivery routing with AI — saving 15+ hours a week. Built in 7 days, no tech team.",
  keywords: [
    "AI case study bakery",
    "AI automation small business UK",
    "save time with AI",
    "bakery automation",
    "n8n automation case study",
  ],
  openGraph: {
    images: [{ url: "https://workcrew.io/api/og", width: 1200, height: 630 }],
    title: "London Bakery Saved 15+ Hours/Week With AI",
    description:
      "How a London wholesale bakery automated order processing, production scheduling, and delivery routing with AI — saving 15+ hours a week. Built in 7 days, no tech team.",
    type: "article",
    publishedTime: "2026-03-24T00:00:00.000Z",
    authors: ["Olushola Oladipupo"],
  },
  alternates: {
    canonical: "/blog/bakery-saved-15-hours-ai",
  },
  twitter: {
    title: "London Bakery Saved 15+ Hours/Week With AI",
    description:
      "How a London wholesale bakery automated order processing, production scheduling, and delivery routing with AI — saving 15+ hours a week. Built in 7 days, no tech team.",
  },
};

const tags = ["Case Study", "AI Automation", "Small Business", "Food & Beverage"];

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "How a London Bakery Saved 15+ Hours a Week With AI",
  description:
    "How a London wholesale bakery automated order processing, production scheduling, and delivery routing with AI — saving 15+ hours a week. Built in 7 days, no tech team.",
  author: {
    "@type": "Person",
    name: "Olushola Oladipupo",
  },
  publisher: {
    "@type": "Organization",
    name: "WorkCrew Ltd",
    url: "https://workcrew.io",
  },
  datePublished: "2026-03-24",
  dateModified: "2026-03-24",
  mainEntityOfPage:
    "https://workcrew.io/blog/bakery-saved-15-hours-ai",
};

export default function BlogPost() {
  return (
    <div className="min-h-screen">
      <JsonLd data={articleJsonLd} />
      <article className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 text-sm mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            All Posts
          </Link>

          <div className="flex flex-wrap gap-2 mb-4">
            {tags.map((tag) => (
              <span
                key={tag}
                className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>

          <h1 className="text-4xl font-bold mb-4">
            How a London Bakery Saved 15+ Hours a Week With AI (Built in 7 Days,
            No Tech Team)
          </h1>

          <div className="flex items-center gap-4 text-sm text-slate-400 mb-12">
            <span>24 March 2026</span>
            <span className="text-slate-600">|</span>
            <span>By Olushola Oladipupo</span>
            <span className="text-slate-600">|</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />7 min read
            </span>
          </div>

          <div className="prose prose-slate max-w-none">
            {/* Hook */}
            <p className="text-slate-500 leading-relaxed mb-4 text-lg">
              Every Thursday evening, the owner of a London wholesale bakery sat
              at his kitchen table tallying WhatsApp messages by hand.
            </p>

            <p className="text-slate-500 leading-relaxed mb-4">
              Orders from 30+ restaurants and cafes. Written in different
              formats. Sent at different times of day. No system. Just a business
              owner, a notebook, and an increasingly long evening.
            </p>

            <p className="text-slate-500 leading-relaxed mb-8">
              This was costing him 15+ hours every week. And it was getting worse
              as the business grew.
            </p>

            {/* The Problem */}
            <h2 className="text-2xl font-bold mt-10 mb-4">
              The Problem: Manual Work That Was Eating the Business
            </h2>

            <p className="text-slate-500 leading-relaxed mb-4">
              For a small wholesale bakery, the operation looks simple from the
              outside: take orders, make the food, deliver it. But behind that
              sits a pile of manual work most people never see.
            </p>

            <p className="text-slate-500 leading-relaxed mb-4">
              Every day, the owner was:
            </p>

            <ul className="space-y-3 mb-8">
              <li className="flex gap-3 text-slate-500">
                <span className="text-blue-600 font-bold shrink-0">
                  &bull;
                </span>
                <span>
                  Collecting orders from WhatsApp messages, phone calls, and
                  occasional emails &mdash; each in a different format
                </span>
              </li>
              <li className="flex gap-3 text-slate-500">
                <span className="text-blue-600 font-bold shrink-0">
                  &bull;
                </span>
                <span>
                  Calculating production quantities by hand, working out exactly
                  what to bake and how much
                </span>
              </li>
              <li className="flex gap-3 text-slate-500">
                <span className="text-blue-600 font-bold shrink-0">
                  &bull;
                </span>
                <span>
                  Planning the day&apos;s delivery route manually, stop by stop
                </span>
              </li>
              <li className="flex gap-3 text-slate-500">
                <span className="text-blue-600 font-bold shrink-0">
                  &bull;
                </span>
                <span>
                  Tracking payments in a notebook &mdash; or not tracking them at
                  all
                </span>
              </li>
              <li className="flex gap-3 text-slate-500">
                <span className="text-blue-600 font-bold shrink-0">
                  &bull;
                </span>
                <span>Chasing unpaid invoices from memory</span>
              </li>
            </ul>

            <p className="text-slate-500 leading-relaxed mb-8">
              None of it was complicated. All of it was time-consuming. And as
              the customer base grew, each of these problems grew with it.
            </p>

            {/* What We Built */}
            <h2 className="text-2xl font-bold mt-10 mb-4">What We Built</h2>

            <p className="text-slate-500 leading-relaxed mb-4">
              We built an AI system that connects the bakery&apos;s order
              intake directly to their production, delivery, and payment
              processes. No new software to learn. No code to maintain.
            </p>

            <p className="text-slate-500 leading-relaxed mb-4">
              Here is what the system does, every single day, automatically:
            </p>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 mb-8 space-y-4">
              <div>
                <p className="text-slate-500">
                  <strong className="text-slate-900">
                    Order consolidation.
                  </strong>{" "}
                  Orders arriving via WhatsApp and other channels are captured
                  and organised into a single, clean daily list. No more hunting
                  through message threads.
                </p>
              </div>
              <div>
                <p className="text-slate-500">
                  <strong className="text-slate-900">
                    Production calculations.
                  </strong>{" "}
                  The system calculates exactly what needs to be baked &mdash;
                  quantities, product types, priorities &mdash; so the owner
                  never has to do the maths again.
                </p>
              </div>
              <div>
                <p className="text-slate-500">
                  <strong className="text-slate-900">Delivery planning.</strong>{" "}
                  Orders are sorted and grouped by delivery stop, with a route
                  summary sent automatically to the driver each morning. No more
                  planning the route by hand.
                </p>
              </div>
              <div>
                <p className="text-slate-500">
                  <strong className="text-slate-900">Payment dashboard.</strong> A
                  live view shows who has paid (via card or bank transfer) and who
                  still owes &mdash; surfaced automatically, without anyone
                  building a spreadsheet.
                </p>
              </div>
              <div>
                <p className="text-slate-500">
                  <strong className="text-slate-900">
                    WhatsApp notifications.
                  </strong>{" "}
                  Drivers receive their route automatically. Customers receive
                  order confirmations. All without a single manual message.
                </p>
              </div>
            </div>

            <p className="text-slate-500 leading-relaxed mb-8">
              We built this on tools the bakery already had access to, configured
              around their exact operation. The owner did not need to change how
              he worked. The system adapted to him.
            </p>

            {/* The Results */}
            <h2 className="text-2xl font-bold mt-10 mb-4">The Results</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-5 text-center">
                <p className="text-3xl font-bold text-blue-600 mb-1">15+</p>
                <p className="text-slate-600 text-sm">hours saved per week</p>
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-5 text-center">
                <p className="text-3xl font-bold text-blue-600 mb-1">0</p>
                <p className="text-slate-600 text-sm">missed orders since go-live</p>
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-5 text-center">
                <p className="text-3xl font-bold text-blue-600 mb-1">0</p>
                <p className="text-slate-600 text-sm">
                  manual production calculations
                </p>
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-5 text-center">
                <p className="text-3xl font-bold text-blue-600 mb-1">7 days</p>
                <p className="text-slate-600 text-sm">
                  from kickoff to live system
                </p>
              </div>
            </div>

            <p className="text-slate-500 leading-relaxed mb-4">
              Unpaid customers are now surfaced automatically &mdash; no more
              chasing by memory. Delivery routes are organised by town &mdash;
              the driver gets a clean list, not a scramble.
            </p>

            <p className="text-slate-500 leading-relaxed mb-8">
              We delivered the full system in{" "}
              <strong className="text-slate-900">7 days</strong>.
            </p>

            {/* The 7-Day Sprint */}
            <h2 className="text-2xl font-bold mt-10 mb-4">
              How the 7-Day Sprint Works
            </h2>

            <p className="text-slate-500 leading-relaxed mb-4">
              We start every project by mapping the real process &mdash; not the
              ideal one. That means understanding which WhatsApp messages the
              owner actually reads, how he decides what to bake, what a completed
              delivery route looks like in practice.
            </p>

            <p className="text-slate-500 leading-relaxed mb-4">
              Once the real workflow is clear, we build automation around it. The
              owner does not change his behaviour. The system fits his operation.
            </p>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 mb-8 space-y-4">
              <div className="flex gap-4">
                <span className="text-blue-600 font-bold text-lg shrink-0">
                  Days 1&ndash;2
                </span>
                <p className="text-slate-500">Discovery and process mapping</p>
              </div>
              <div className="flex gap-4">
                <span className="text-blue-600 font-bold text-lg shrink-0">
                  Days 3&ndash;5
                </span>
                <p className="text-slate-500">Build</p>
              </div>
              <div className="flex gap-4">
                <span className="text-blue-600 font-bold text-lg shrink-0">
                  Day 6
                </span>
                <p className="text-slate-500">Testing with live data</p>
              </div>
              <div className="flex gap-4">
                <span className="text-blue-600 font-bold text-lg shrink-0">
                  Day 7
                </span>
                <p className="text-slate-500">Handover, training, and go-live</p>
              </div>
            </div>

            <p className="text-slate-500 leading-relaxed mb-8">
              One week. Full system. Running on day 7.
            </p>

            {/* Who Else */}
            <h2 className="text-2xl font-bold mt-10 mb-4">
              Who Else This Applies To
            </h2>

            <p className="text-slate-500 leading-relaxed mb-4">
              You do not need to run a bakery for this to be relevant. If your
              business involves any of the following, you have hours sitting in
              manual processes that AI can handle:
            </p>

            <ul className="space-y-3 mb-6">
              <li className="flex gap-3 text-slate-500">
                <span className="text-blue-600 font-bold shrink-0">
                  &bull;
                </span>
                <span>Taking orders or bookings manually</span>
              </li>
              <li className="flex gap-3 text-slate-500">
                <span className="text-blue-600 font-bold shrink-0">
                  &bull;
                </span>
                <span>Planning deliveries or schedules by hand</span>
              </li>
              <li className="flex gap-3 text-slate-500">
                <span className="text-blue-600 font-bold shrink-0">
                  &bull;
                </span>
                <span>Chasing payments or following up with customers</span>
              </li>
              <li className="flex gap-3 text-slate-500">
                <span className="text-blue-600 font-bold shrink-0">
                  &bull;
                </span>
                <span>
                  Processing enquiries one by one through WhatsApp, email, or
                  phone
                </span>
              </li>
            </ul>

            <p className="text-slate-500 leading-relaxed mb-8">
              The specifics will look different for your operation. The outcome
              &mdash; 10+ hours a week freed up &mdash; will not.
            </p>

            {/* CTA */}
            <hr className="border-slate-200 my-10" />

            <h2 className="text-2xl font-bold mt-8 mb-4">What to Do Next</h2>

            <p className="text-slate-500 leading-relaxed mb-4">
              If you are spending evenings on admin that a system could handle,
              start here: take our free{" "}
              <Link
                href="/audit"
                className="text-blue-600 hover:text-blue-600 transition-colors"
              >
                AI readiness audit
              </Link>
              . It takes 10 seconds, it is specific to your business, and it
              tells you exactly where you are losing time and money.
            </p>

            <p className="text-slate-500 leading-relaxed mb-8">
              At{" "}
              <Link
                href="/"
                className="text-blue-600 hover:text-blue-600 transition-colors"
              >
                WorkCrew
              </Link>
              , we build these systems for small businesses. Get in touch if you
              want one.
            </p>
          </div>

          {/* Related Articles */}
          <div className="mt-12 border border-slate-200 rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4 text-slate-900">
              Related Articles
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/blog/ai-for-restaurants"
                  className="text-blue-600 hover:text-blue-600 transition-colors"
                >
                  AI for Restaurants: Automate Orders, Bookings, and Reviews
                </Link>
              </li>
              <li>
                <Link
                  href="/blog/before-after-automated-lead-response"
                  className="text-blue-600 hover:text-blue-600 transition-colors"
                >
                  Before and After: Automating Lead Response
                </Link>
              </li>
              <li>
                <Link
                  href="/blog/whatsapp-automation-business"
                  className="text-blue-600 hover:text-blue-600 transition-colors"
                >
                  WhatsApp Automation for Business: The Complete Guide
                </Link>
              </li>
              <li>
                <Link
                  href="/case-studies/emanuel-bakery"
                  className="text-slate-500 hover:text-slate-900 transition-colors"
                >
                  View the E&apos;Manuel Bakery case study &rarr;
                </Link>
              </li>
            </ul>
          </div>

          {/* CTA Section */}
          <div className="mt-16 bg-blue-50 border border-blue-200 rounded-xl p-8 text-center">
            <h3 className="text-xl font-semibold mb-2">
              Want the Same Results for Your Business?
            </h3>
            <p className="text-slate-600 mb-6 max-w-lg mx-auto">
              Take our free AI Readiness Audit. In 2 minutes, you&apos;ll know
              exactly where automation would make the biggest impact &mdash; and
              what it would cost.
            </p>
            <Link
              href="/audit"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Get Your Free AI Readiness Audit
              <ArrowRight className="w-4 h-4" />
            </Link>
            <p className="text-slate-400 text-sm mt-3">
              Takes 2 minutes. No obligation. 90-day results guarantee.
            </p>
          </div>

          {/* Prev/Next Navigation */}
          <div className="mt-12 flex justify-between items-center border-t border-slate-200 pt-8">
            <Link
              href="/blog/voice-ai-small-business"
              className="text-slate-600 hover:text-slate-900 transition-colors text-sm flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Voice AI for Small Business
            </Link>
            <Link
              href="/blog/ai-accountants-save-20-hours"
              className="text-slate-600 hover:text-slate-900 transition-colors text-sm flex items-center gap-2"
            >
              AI for UK Accountants
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}
