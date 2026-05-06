import Link from "next/link";
import { ArrowLeft, ArrowRight, Clock } from "lucide-react";
import type { Metadata } from "next";
import JsonLd from "@/components/shared/JsonLd";

export const metadata: Metadata = {
  title: "How AI Saves Plumbers 10+ Hours a Week",
  description:
    "Practical AI automations for plumbing businesses: auto-book jobs, chase invoices, collect reviews, and stop losing leads. Real examples from UK tradespeople.",
  keywords: [
    "AI for plumbers",
    "plumber automation",
    "save time plumbing business",
    "AI plumber scheduling",
    "plumbing business automation UK",
    "automate plumbing admin",
  ],
  openGraph: {
    images: [{ url: "https://workcrew.io/api/og", width: 1200, height: 630 }],
    title: "How AI Saves Plumbers 10+ Hours a Week",
    description:
      "Practical AI automations for plumbing businesses. Real examples from UK tradespeople saving 10+ hours every week.",
    type: "article",
    publishedTime: "2026-03-27T00:00:00.000Z",
    authors: ["Olushola Oladipupo"],
  },
  alternates: {
    canonical: "/blog/ai-saves-plumbers-10-hours",
  },
};

const tags = ["AI Automation", "Plumbers", "Trades", "Industry Guide"];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How much does AI automation cost for a plumbing business?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Basic AI automation for a plumbing business starts from £500 setup with £50/month ongoing. This covers lead intake, appointment booking, and follow-up sequences. More advanced setups (invoicing, Google reviews, route planning) typically cost £1,500-3,500 to set up. Most plumbers see ROI within the first month through recovered leads and time savings.",
      },
    },
    {
      "@type": "Question",
      name: "Can AI really answer phone calls for my plumbing business?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. AI voice agents can answer calls 24/7, ask qualification questions (location, urgency, job type), book appointments into your calendar, and send the customer a confirmation text — all within 60 seconds. The AI costs 20-60p per call, compared to £1-3 per call for a traditional answering service.",
      },
    },
    {
      "@type": "Question",
      name: "Will AI replace plumbers?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. AI cannot fix a leaking pipe, install a boiler, or diagnose a drainage problem. What it can do is handle the business side — answering enquiries, booking jobs, chasing invoices, collecting reviews, and scheduling routes. AI replaces the admin, not the tradesperson.",
      },
    },
  ],
};

export default function BlogPost() {
  return (
    <div className="min-h-screen">
      <article className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <JsonLd data={faqSchema} />

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
            How AI Saves Plumbers 10+ Hours a Week
          </h1>

          <div className="flex items-center gap-4 text-sm text-[var(--color-muted)] mb-12">
            <span>27 March 2026</span>
            <span className="text-[var(--color-body)]">|</span>
            <span>By Olushola Oladipupo</span>
            <span className="text-[var(--color-body)]">|</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              7 min read
            </span>
          </div>

          <div className="prose prose-slate max-w-none">
            <p className="text-[var(--color-muted)] leading-relaxed mb-4 text-lg">
              You&apos;re under a boiler, hands full of copper pipe, when your phone buzzes. Three missed calls, two WhatsApp messages, and an email asking for a quote. By the time you get to them tonight, two of those leads have already booked someone else.
            </p>

            <p className="text-[var(--color-muted)] leading-relaxed mb-4">
              This is not a time management problem. It&apos;s a systems problem. And AI solves it.
            </p>

            <p className="text-[var(--color-muted)] leading-relaxed mb-8">
              According to the Federation of Master Builders, UK tradespeople spend an average of 12 hours per week on non-trade tasks &mdash; quoting, invoicing, chasing payments, booking, and admin. That&apos;s over 600 hours per year spent not doing the thing that actually makes money.
            </p>

            {/* Where the time goes */}
            <h2 className="text-2xl font-bold mt-10 mb-4">
              Where a Plumber&apos;s 10 Hours of Admin Actually Go
            </h2>

            <p className="text-[var(--color-muted)] leading-relaxed mb-4">
              Before diving into solutions, here is the typical weekly breakdown for a one-person or small plumbing business:
            </p>

            <div className="overflow-x-auto mb-8">
              <table className="w-full text-sm border border-[var(--color-border)] rounded-xl overflow-hidden">
                <thead>
                  <tr className="bg-[var(--color-surface)]/60">
                    <th className="text-left px-4 py-3 text-[var(--color-body)] font-semibold">Task</th>
                    <th className="text-left px-4 py-3 text-[var(--color-body)] font-semibold">Hours/Week</th>
                    <th className="text-left px-4 py-3 text-[var(--color-body)] font-semibold">Can AI Handle It?</th>
                  </tr>
                </thead>
                <tbody className="text-[var(--color-muted)]">
                  <tr className="border-t border-[var(--color-border)]">
                    <td className="px-4 py-3">Answering enquiry calls/messages</td>
                    <td className="px-4 py-3">2&ndash;3 hrs</td>
                    <td className="px-4 py-3 text-[var(--color-success)]">Yes &mdash; AI voice + chat</td>
                  </tr>
                  <tr className="border-t border-[var(--color-border)]">
                    <td className="px-4 py-3">Writing and sending quotes</td>
                    <td className="px-4 py-3">2 hrs</td>
                    <td className="px-4 py-3 text-[var(--color-success)]">Yes &mdash; templated + AI-drafted</td>
                  </tr>
                  <tr className="border-t border-[var(--color-border)]">
                    <td className="px-4 py-3">Follow-up on quotes</td>
                    <td className="px-4 py-3">1&ndash;2 hrs</td>
                    <td className="px-4 py-3 text-[var(--color-success)]">Yes &mdash; automated sequences</td>
                  </tr>
                  <tr className="border-t border-[var(--color-border)]">
                    <td className="px-4 py-3">Invoicing and payment chasing</td>
                    <td className="px-4 py-3">1&ndash;2 hrs</td>
                    <td className="px-4 py-3 text-[var(--color-success)]">Yes &mdash; auto-invoice + reminders</td>
                  </tr>
                  <tr className="border-t border-[var(--color-border)]">
                    <td className="px-4 py-3">Scheduling and calendar management</td>
                    <td className="px-4 py-3">1 hr</td>
                    <td className="px-4 py-3 text-[var(--color-success)]">Yes &mdash; AI booking</td>
                  </tr>
                  <tr className="border-t border-[var(--color-border)]">
                    <td className="px-4 py-3">Asking for Google reviews</td>
                    <td className="px-4 py-3">30 min</td>
                    <td className="px-4 py-3 text-[var(--color-success)]">Yes &mdash; automatic requests</td>
                  </tr>
                  <tr className="border-t border-[var(--color-border)] bg-[var(--color-surface)]/30">
                    <td className="px-4 py-3 font-bold text-[var(--color-heading)]">Total</td>
                    <td className="px-4 py-3 font-bold text-[var(--color-heading)]">8&ndash;11 hrs</td>
                    <td className="px-4 py-3 font-bold text-[var(--color-success)]">All automatable</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Automation 1 */}
            <h2 className="text-2xl font-bold mt-10 mb-4">
              1. AI Lead Response &mdash; Never Miss a Job Again
            </h2>

            <p className="text-[var(--color-muted)] leading-relaxed mb-4">
              The Harvard Business Review found that businesses responding to leads within 5 minutes are <strong className="text-[var(--color-heading)]">100 times more likely</strong> to connect than those responding in 30 minutes. For plumbers, where customers often call 2&ndash;3 businesses at once, speed is everything.
            </p>

            <p className="text-[var(--color-muted)] leading-relaxed mb-4">
              An AI lead intake system responds to every enquiry &mdash; phone, email, WhatsApp, website form &mdash; in under 60 seconds. It asks the right questions (location, job type, urgency), qualifies the lead, and books an appointment into your calendar. All while you&apos;re on the job.
            </p>

            <p className="text-[var(--color-muted)] leading-relaxed mb-8">
              <strong className="text-[var(--color-heading)]">Time saved:</strong> 2&ndash;3 hours/week. <strong className="text-[var(--color-heading)]">Revenue recovered:</strong> 3&ndash;5 extra jobs per month from leads that would have gone cold.
            </p>

            {/* Automation 2 */}
            <h2 className="text-2xl font-bold mt-10 mb-4">
              2. Automated Quote Follow-Up
            </h2>

            <p className="text-[var(--color-muted)] leading-relaxed mb-4">
              You give a quote on Monday. By Friday, you&apos;ve forgotten about it because three emergency callouts came in. The customer assumed you weren&apos;t interested. They booked someone else.
            </p>

            <p className="text-[var(--color-muted)] leading-relaxed mb-4">
              An automated follow-up sequence sends a friendly check-in 2 days after the quote, a second nudge at 5 days, and a final &ldquo;still interested?&rdquo; at 10 days. No effort from you. The messages sound like you wrote them.
            </p>

            <p className="text-[var(--color-muted)] leading-relaxed mb-8">
              <strong className="text-[var(--color-heading)]">Time saved:</strong> 1&ndash;2 hours/week. <strong className="text-[var(--color-heading)]">Conversion improvement:</strong> Automated follow-ups recover an average of 15&ndash;20% of quotes that would otherwise go cold, according to Jobber&apos;s 2025 industry report.
            </p>

            {/* Automation 3 */}
            <h2 className="text-2xl font-bold mt-10 mb-4">
              3. 24/7 AI Phone Answering
            </h2>

            <p className="text-[var(--color-muted)] leading-relaxed mb-4">
              Emergency plumbing calls don&apos;t stop at 5pm. But paying for a call centre costs &pound;1&ndash;3 per call. An AI voice agent costs 20&ndash;60p per call and works every hour of every day.
            </p>

            <p className="text-[var(--color-muted)] leading-relaxed mb-4">
              The AI answers in 2 seconds (faster than any human), asks the customer about the problem, determines urgency, and either books a routine appointment or sends you an emergency alert. The customer gets an SMS confirmation immediately.
            </p>

            <p className="text-[var(--color-muted)] leading-relaxed mb-8">
              <strong className="text-[var(--color-heading)]">Time saved:</strong> 1 hour/week on phone calls. <strong className="text-[var(--color-heading)]">Revenue impact:</strong> Capture after-hours emergency jobs worth &pound;200&ndash;500 each that currently go to voicemail.
            </p>

            {/* Automation 4 */}
            <h2 className="text-2xl font-bold mt-10 mb-4">
              4. Automatic Invoicing and Payment Reminders
            </h2>

            <p className="text-[var(--color-muted)] leading-relaxed mb-4">
              The moment you mark a job as complete, an invoice is generated and sent to the customer with a payment link. Payment reminders go out automatically at 3, 7, and 14 days. You get notified when the money lands.
            </p>

            <p className="text-[var(--color-muted)] leading-relaxed mb-8">
              According to Xero&apos;s UK Small Business Data, automated invoicing gets businesses paid an average of 7&ndash;10 days faster. For a plumber doing &pound;8,000 per month, that&apos;s a significant cash flow improvement.
            </p>

            {/* Automation 5 */}
            <h2 className="text-2xl font-bold mt-10 mb-4">
              5. Google Review Collection on Autopilot
            </h2>

            <p className="text-[var(--color-muted)] leading-relaxed mb-4">
              After every completed job, the customer automatically receives a friendly text with a direct link to leave a Google review. Timing matters &mdash; sending the request within 2 hours of completing the job, while the customer is still grateful, gets the best response rate.
            </p>

            <p className="text-[var(--color-muted)] leading-relaxed mb-8">
              One plumbing company went from 12 Google reviews to 47 in three months using automated review requests. That pushed them from page 2 to the local 3-pack for &ldquo;plumber near me&rdquo; &mdash; the difference between getting found and being invisible. According to BrightLocal, 87% of consumers read online reviews for local businesses.
            </p>

            {/* Automation 6 */}
            <h2 className="text-2xl font-bold mt-10 mb-4">
              6. Smart Route Planning
            </h2>

            <p className="text-[var(--color-muted)] leading-relaxed mb-4">
              AI scheduling groups nearby jobs together, reduces driving time, and leaves buffer for emergencies. Instead of zigzagging across town, your day flows geographically.
            </p>

            <p className="text-[var(--color-muted)] leading-relaxed mb-8">
              Smarter scheduling typically saves 45&ndash;60 minutes of driving per day. Over a week, that&apos;s 4&ndash;5 extra hours &mdash; enough for one or two more paid jobs. We built exactly this for{" "}
              <Link href="/case-studies/emanuel-bakery" className="text-[var(--color-primary)] hover:underline">
                E&apos;Manuel Bakery
              </Link>{" "}
              &mdash; their delivery routes went from memory-based to one-click Google Maps optimisation.
            </p>

            {/* Summary */}
            <hr className="border-[var(--color-border)] my-10" />

            <h2 className="text-2xl font-bold mt-8 mb-4">
              The Bottom Line: 10+ Hours Back Every Week
            </h2>

            <p className="text-[var(--color-muted)] leading-relaxed mb-4">
              Add it up: 2&ndash;3 hours on lead response, 1&ndash;2 on follow-ups, 1 hour on calls, 1&ndash;2 on invoicing, 30 minutes on reviews, 1 hour on scheduling. That&apos;s 7&ndash;10 hours of admin replaced by AI systems that run in the background 24/7.
            </p>

            <p className="text-[var(--color-muted)] leading-relaxed mb-4">
              At &pound;35&ndash;50 per hour (average plumber rate), 10 hours of admin time is worth &pound;350&ndash;500 per week &mdash; or &pound;18,000&ndash;26,000 per year. The cost of automating? From &pound;500 setup + &pound;50/month.
            </p>

            <p className="text-[var(--color-muted)] leading-relaxed mb-8">
              The plumbers who are winning in 2026 aren&apos;t necessarily better at plumbing. They&apos;re better at responding fast, following up consistently, and making it easy for customers to book and pay. AI just makes all of that happen automatically.
            </p>

            {/* FAQ */}
            <h2 className="text-2xl font-bold mt-10 mb-6">
              Frequently Asked Questions
            </h2>

            <div className="space-y-6 mb-8">
              <div>
                <h3 className="text-lg font-semibold text-[var(--color-heading)] mb-2">
                  How much does AI automation cost for a plumbing business?
                </h3>
                <p className="text-[var(--color-muted)] leading-relaxed">
                  Basic AI automation for a plumbing business starts from &pound;500 setup with &pound;50/month ongoing. This covers lead intake, appointment booking, and follow-up sequences. More advanced setups (invoicing, Google reviews, route planning) typically cost &pound;1,500&ndash;3,500 to set up. Most plumbers see ROI within the first month through recovered leads and time savings.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[var(--color-heading)] mb-2">
                  Can AI really answer phone calls for my plumbing business?
                </h3>
                <p className="text-[var(--color-muted)] leading-relaxed">
                  Yes. AI voice agents can answer calls 24/7, ask qualification questions (location, urgency, job type), book appointments into your calendar, and send the customer a confirmation text &mdash; all within 60 seconds. The AI costs 20&ndash;60p per call, compared to &pound;1&ndash;3 per call for a traditional answering service.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[var(--color-heading)] mb-2">
                  Will AI replace plumbers?
                </h3>
                <p className="text-[var(--color-muted)] leading-relaxed">
                  No. AI cannot fix a leaking pipe, install a boiler, or diagnose a drainage problem. What it can do is handle the business side &mdash; answering enquiries, booking jobs, chasing invoices, collecting reviews, and scheduling routes. AI replaces the admin, not the tradesperson.
                </p>
              </div>
            </div>
          </div>

          {/* Related Articles */}
          <div className="mt-12 border border-[var(--color-border)] rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4 text-[var(--color-heading)]">Related Articles</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/blog/ai-for-plumbers" className="text-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors">
                  AI for Plumbers: 5 Automations That Win More Jobs
                </Link>
              </li>
              <li>
                <Link href="/blog/ai-for-electricians" className="text-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors">
                  AI for Electricians &amp; Tradespeople
                </Link>
              </li>
              <li>
                <Link href="/blog/ai-automation-agency-vs-diy" className="text-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors">
                  AI Automation Agency vs DIY: Which Is Right?
                </Link>
              </li>
              <li>
                <Link href="/services/lead-intake" className="text-[var(--color-muted)] hover:text-[var(--color-heading)] transition-colors">
                  View our AI Lead Intake &amp; Appointment Booking service &rarr;
                </Link>
              </li>
            </ul>
          </div>

          {/* CTA */}
          <div className="mt-16 bg-[var(--color-primary-light)] border border-[var(--color-primary-light)] rounded-xl p-8 text-center">
            <h3 className="text-xl font-semibold mb-2">
              Want to See Which Automations Would Save You the Most Time?
            </h3>
            <p className="text-[var(--color-body)] mb-6 max-w-lg mx-auto">
              Take our free AI Readiness Audit. We&apos;ll tell you exactly where automation would make the biggest impact for your plumbing business &mdash; and what it would cost.
            </p>
            <Link
              href="/audit"
              className="inline-flex items-center gap-2 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-[var(--color-bg)] px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Get Your Free AI Readiness Audit
              <ArrowRight className="w-4 h-4" />
            </Link>
            <p className="text-[var(--color-muted)] text-sm mt-3">
              60 seconds. Built for tradespeople. No obligation.
            </p>
          </div>
        </div>
      </article>
    </div>
  );
}
