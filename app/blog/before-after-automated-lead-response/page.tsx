import Link from "next/link";
import { ArrowLeft, ArrowRight, Clock } from "lucide-react";
import type { Metadata } from "next";
import JsonLd from "@/components/shared/JsonLd";

export const metadata: Metadata = {
  title: "Before & After: Automated Lead Response",
  description:
    "See the before and after when a service business automates lead response. Response time drops from 12 hours to 30 seconds. Conversion doubles. Admin disappears.",
  keywords: [
    "automated lead response",
    "AI lead management",
    "service business automation",
    "faster lead response",
    "plumber AI automation",
  ],
  openGraph: {
    images: [{ url: "https://workcrew.io/api/og", width: 1200, height: 630 }],
    title: "Before & After: Automated Lead Response",
    description:
      "See the before and after when a service business automates lead response. Response time drops from 12 hours to 30 seconds. Conversion doubles. Admin disappears.",
    type: "article",
    publishedTime: "2026-03-24T00:00:00.000Z",
    authors: ["Olushola Oladipupo"],
  },
  alternates: {
    canonical: "/blog/before-after-automated-lead-response",
  },
  twitter: {
    title: "Before & After: Automated Lead Response",
    description:
      "See the before and after when a service business automates lead response. Response time drops from 12 hours to 30 seconds. Conversion doubles. Admin disappears.",
  },
};

const tags = [
  "AI Automation",
  "Lead Response",
  "Service Business",
  "Before & After",
];

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline:
    "Before and After: What Happens When a Service Business Automates Lead Response",
  description:
    "See the before and after when a service business automates lead response. Response time drops from 12 hours to 30 seconds. Conversion doubles. Admin disappears.",
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
    "https://workcrew.io/blog/before-after-automated-lead-response",
};

export default function BlogPost() {
  return (
    <div className="min-h-screen">
      <JsonLd data={articleJsonLd} />
      <article className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-[var(--color-body)] hover:text-[var(--color-heading)] text-sm mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            All Posts
          </Link>

          <div className="flex flex-wrap gap-2 mb-4">
            {tags.map((tag) => (
              <span
                key={tag}
                className="text-xs bg-[var(--color-surface)] text-[var(--color-body)] px-2 py-0.5 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>

          <h1 className="text-4xl font-bold mb-4">
            Before and After: What Happens When a Service Business Automates
            Lead Response
          </h1>

          <div className="flex items-center gap-4 text-sm text-[var(--color-muted)] mb-12">
            <span>24 March 2026</span>
            <span className="text-[var(--color-body)]">|</span>
            <span>By Olushola Oladipupo</span>
            <span className="text-[var(--color-body)]">|</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />5 min read
            </span>
          </div>

          <div className="prose prose-slate max-w-none">
            {/* Hook */}
            <p className="text-[var(--color-muted)] leading-relaxed mb-4 text-lg">
              A potential customer fills in your contact form at 7pm on a
              Tuesday.
            </p>

            <p className="text-[var(--color-muted)] leading-relaxed mb-4">
              You are making dinner. You will get to it in the morning.
            </p>

            <p className="text-[var(--color-muted)] leading-relaxed mb-4">
              By morning, they have already booked someone else.
            </p>

            <p className="text-[var(--color-muted)] leading-relaxed mb-8">
              This is the single biggest revenue leak for service businesses
              &mdash;{" "}
              <Link
                href="/blog/ai-for-plumbers"
                className="text-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors"
              >
                plumbers
              </Link>
              ,{" "}
              <Link
                href="/blog/ai-for-cleaning-companies"
                className="text-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors"
              >
                cleaners
              </Link>
              , handymen &mdash; and it is almost invisible because you never see
              the enquiries you lost.
            </p>

            {/* Before */}
            <h2 className="text-2xl font-bold mt-10 mb-4">
              Before: The Manual Reality
            </h2>

            <p className="text-[var(--color-muted)] leading-relaxed mb-4">
              Here is what lead management looks like for most service businesses
              right now:
            </p>

            <div className="overflow-x-auto mb-8">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[var(--color-border)]">
                    <th className="py-3 pr-4 text-[var(--color-heading)] font-semibold">
                      Stage
                    </th>
                    <th className="py-3 text-[var(--color-heading)] font-semibold">
                      Manual (Before)
                    </th>
                  </tr>
                </thead>
                <tbody className="text-[var(--color-muted)]">
                  <tr className="border-b border-[var(--color-border)]/50">
                    <td className="py-3 pr-4">Lead arrives at 7pm</td>
                    <td className="py-3">Owner sees it next morning</td>
                  </tr>
                  <tr className="border-b border-[var(--color-border)]/50">
                    <td className="py-3 pr-4">Response time</td>
                    <td className="py-3">8&ndash;12 hours</td>
                  </tr>
                  <tr className="border-b border-[var(--color-border)]/50">
                    <td className="py-3 pr-4">Follow-up</td>
                    <td className="py-3">If the owner remembers</td>
                  </tr>
                  <tr className="border-b border-[var(--color-border)]/50">
                    <td className="py-3 pr-4">Booking</td>
                    <td className="py-3">Manual back-and-forth</td>
                  </tr>
                  <tr className="border-b border-[var(--color-border)]/50">
                    <td className="py-3 pr-4">No-show handling</td>
                    <td className="py-3">Chased individually</td>
                  </tr>
                  <tr className="border-b border-[var(--color-border)]/50">
                    <td className="py-3 pr-4">Weekly admin</td>
                    <td className="py-3">2&ndash;3 hours</td>
                  </tr>
                  <tr className="border-b border-[var(--color-border)]/50">
                    <td className="py-3 pr-4">Conversion rate</td>
                    <td className="py-3">~15&ndash;20%</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-[var(--color-muted)] leading-relaxed mb-8">
              Every gap in that table is a booking that went to a competitor.
            </p>

            {/* After */}
            <h2 className="text-2xl font-bold mt-10 mb-4">
              After: What Happens With AI
            </h2>

            <div className="overflow-x-auto mb-8">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[var(--color-border)]">
                    <th className="py-3 pr-4 text-[var(--color-heading)] font-semibold">
                      Stage
                    </th>
                    <th className="py-3 text-[var(--color-heading)] font-semibold">
                      Automated (After)
                    </th>
                  </tr>
                </thead>
                <tbody className="text-[var(--color-muted)]">
                  <tr className="border-b border-[var(--color-border)]/50">
                    <td className="py-3 pr-4">Lead arrives at 7pm</td>
                    <td className="py-3">
                      AI responds in under 30 seconds
                    </td>
                  </tr>
                  <tr className="border-b border-[var(--color-border)]/50">
                    <td className="py-3 pr-4">Qualifying questions</td>
                    <td className="py-3">Asked automatically</td>
                  </tr>
                  <tr className="border-b border-[var(--color-border)]/50">
                    <td className="py-3 pr-4">Appointment or callback</td>
                    <td className="py-3">
                      Booked into Google Calendar
                    </td>
                  </tr>
                  <tr className="border-b border-[var(--color-border)]/50">
                    <td className="py-3 pr-4">Reminder</td>
                    <td className="py-3">Sent 24 hours before</td>
                  </tr>
                  <tr className="border-b border-[var(--color-border)]/50">
                    <td className="py-3 pr-4">No response in 48 hours</td>
                    <td className="py-3">Automated follow-up</td>
                  </tr>
                  <tr className="border-b border-[var(--color-border)]/50">
                    <td className="py-3 pr-4">Weekly admin</td>
                    <td className="py-3">Near zero</td>
                  </tr>
                  <tr className="border-b border-[var(--color-border)]/50">
                    <td className="py-3 pr-4">Conversion rate</td>
                    <td className="py-3">Typically doubles</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-[var(--color-muted)] leading-relaxed mb-8">
              The job does not go to the best business. It goes to whoever
              responds first. Industry data shows over 80% of service bookings
              go to the first responder &mdash; every time.
            </p>

            {/* The Numbers */}
            <h2 className="text-2xl font-bold mt-10 mb-4">The Numbers</h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              <div className="bg-[var(--color-bg-alt)] border border-[var(--color-border)] rounded-lg p-5 text-center">
                <p className="text-3xl font-bold text-[var(--color-primary)] mb-1">5.6h</p>
                <p className="text-[var(--color-body)] text-sm">
                  saved per week on lead management
                </p>
              </div>
              <div className="bg-[var(--color-bg-alt)] border border-[var(--color-border)] rounded-lg p-5 text-center">
                <p className="text-3xl font-bold text-[var(--color-primary)] mb-1">66%</p>
                <p className="text-[var(--color-body)] text-sm">
                  of SMBs save &pound;500&ndash;2,000/mo
                </p>
              </div>
              <div className="bg-[var(--color-bg-alt)] border border-[var(--color-border)] rounded-lg p-5 text-center">
                <p className="text-3xl font-bold text-[var(--color-primary)] mb-1">80%+</p>
                <p className="text-[var(--color-body)] text-sm">
                  of bookings go to first responder
                </p>
              </div>
            </div>

            {/* In Practice */}
            <h2 className="text-2xl font-bold mt-10 mb-4">
              What This Looks Like in Practice
            </h2>

            <p className="text-[var(--color-muted)] leading-relaxed mb-4">
              A plumber gets a message at 10pm about a boiler repair. Their AI
              assistant responds immediately, asks a few qualifying questions,
              and books a site visit for Thursday morning &mdash; while the
              plumber is asleep.
            </p>

            <p className="text-[var(--color-muted)] leading-relaxed mb-4">
              A cleaning company gets 12 enquiries over a bank holiday weekend.
              Every one gets a response within 30 seconds. By Tuesday morning, 8
              are in the calendar.
            </p>

            <p className="text-[var(--color-muted)] leading-relaxed mb-8">
              No extra staff. No missed calls. No Sunday evening email catch-up.
              The businesses winning on response speed are not bigger or better
              resourced. They just have a system.
            </p>

            <hr className="border-[var(--color-border)] my-10" />

            {/* CTA */}
            <h2 className="text-2xl font-bold mt-8 mb-4">
              Want to See What This Looks Like for Your Business?
            </h2>

            <p className="text-[var(--color-muted)] leading-relaxed mb-8">
              Book a{" "}
              <Link
                href="https://cal.com/workcrew/free-ai-strategy-call"
                className="text-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                free strategy call
              </Link>
              . We will walk through your current lead process and show you
              exactly where AI steps in.
            </p>
          </div>

          {/* Related Articles */}
          <div className="mt-12 border border-[var(--color-border)] rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4 text-[var(--color-heading)]">
              Related Articles
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/blog/ai-for-plumbers"
                  className="text-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors"
                >
                  AI for Plumbers: 5 Automations That Win More Jobs
                </Link>
              </li>
              <li>
                <Link
                  href="/blog/cleaning-business-automate-first"
                  className="text-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors"
                >
                  AI for Cleaning Businesses: 3 Tasks to Automate First
                </Link>
              </li>
              <li>
                <Link
                  href="/blog/voice-ai-small-business"
                  className="text-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors"
                >
                  Voice AI for Small Business: Never Miss a Call Again
                </Link>
              </li>
              <li>
                <Link
                  href="/services/lead-intake"
                  className="text-[var(--color-muted)] hover:text-[var(--color-heading)] transition-colors"
                >
                  View our AI Lead Intake &amp; Appointment Booking service
                  &rarr;
                </Link>
              </li>
            </ul>
          </div>

          {/* CTA Section */}
          <div className="mt-16 bg-[var(--color-primary-light)] border border-[var(--color-primary-light)] rounded-xl p-8 text-center">
            <h3 className="text-xl font-semibold mb-2">
              Stop Losing Leads to Slow Response
            </h3>
            <p className="text-[var(--color-body)] mb-6 max-w-lg mx-auto">
              Take our free AI Readiness Audit. In 2 minutes, you&apos;ll know
              exactly where automation would make the biggest impact &mdash; and
              what it would cost.
            </p>
            <Link
              href="/audit"
              className="inline-flex items-center gap-2 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-[var(--color-bg)] px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Get Your Free AI Readiness Audit
              <ArrowRight className="w-4 h-4" />
            </Link>
            <p className="text-[var(--color-muted)] text-sm mt-3">
              Takes 2 minutes. No obligation. 90-day results guarantee.
            </p>
          </div>

          {/* Prev/Next Navigation */}
          <div className="mt-12 flex justify-between items-center border-t border-[var(--color-border)] pt-8">
            <Link
              href="/blog/small-business-ai-adoption"
              className="text-[var(--color-body)] hover:text-[var(--color-heading)] transition-colors text-sm flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Small Business AI Adoption
            </Link>
            <Link
              href="/blog/cleaning-business-automate-first"
              className="text-[var(--color-body)] hover:text-[var(--color-heading)] transition-colors text-sm flex items-center gap-2"
            >
              AI for Cleaning Businesses
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}
