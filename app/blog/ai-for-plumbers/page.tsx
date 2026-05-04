import Link from "next/link";
import { ArrowLeft, ArrowRight, Clock } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI for Plumbers: 5 Automations That Win More Jobs",
  description:
    "AI for plumbers isn't science fiction — it's how smart plumbing businesses are winning more jobs in 2026. Here are 5 practical automations for your plumbing business.",
  keywords: [
    "AI for plumbers",
    "plumbing business automation",
    "automate plumbing business",
    "AI plumber scheduling",
    "plumber marketing automation",
    "plumbing business software",
  ],
  openGraph: {
    images: [{ url: "https://workcrew.io/api/og", width: 1200, height: 630 }],
    title: "AI for Plumbers: 5 Automations That Win More Jobs",
    description:
      "5 practical AI automations that help plumbing businesses win more jobs, get more reviews, and spend less time on admin.",
    type: "article",
    publishedTime: "2026-03-19T00:00:00.000Z",
    authors: ["Olushola Oladipupo"],
  },
  alternates: {
    canonical: "/blog/ai-for-plumbers",
  },
  twitter: {
    title: "AI for Plumbers: 5 Automations That Win More Jobs",
    description:
      "5 practical AI automations that help plumbing businesses win more jobs, get more reviews, and spend less time on admin.",
  },
};

const tags = ["AI Automation", "Plumbers", "Trades", "Industry Guide"];

export default function BlogPost() {
  return (
    <div className="min-h-screen">
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
            AI for Plumbers: 5 Automations That Win More Jobs
          </h1>

          <div className="flex items-center gap-4 text-sm text-[var(--color-muted)] mb-12">
            <span>19 March 2026</span>
            <span className="text-[var(--color-body)]">|</span>
            <span>By Olushola Oladipupo</span>
            <span className="text-[var(--color-body)]">|</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              6 min read
            </span>
          </div>

          <div className="prose prose-slate max-w-none">
            <p className="text-[var(--color-muted)] leading-relaxed mb-4 text-lg">
              You&apos;re under a sink when the phone rings. By the time you
              get to it, the customer&apos;s already called someone else.
              That&apos;s not a scheduling problem &mdash; that&apos;s money
              walking out the door.
            </p>

            <p className="text-[var(--color-muted)] leading-relaxed mb-4">
              AI isn&apos;t about replacing plumbers. No robot is fixing a
              burst pipe anytime soon. But AI can handle the business side
              &mdash; the quoting, the follow-ups, the reviews &mdash; so you
              can focus on the actual plumbing.
            </p>

            <p className="text-[var(--color-muted)] leading-relaxed mb-8">
              Here are five automations that are helping plumbing businesses
              across the UK win more jobs without hiring more staff.
            </p>

            {/* Automation 1 */}
            <h2 className="text-2xl font-bold mt-10 mb-4">
              1. Instant Quote Follow-Up
            </h2>

            <p className="text-[var(--color-muted)] leading-relaxed mb-2">
              <strong className="text-[var(--color-heading)]">Problem:</strong> You give a
              quote, then forget to follow up because you&apos;re busy on
              other jobs.
            </p>

            <p className="text-[var(--color-muted)] leading-relaxed mb-4">
              <strong className="text-[var(--color-heading)]">Solution:</strong> An AI
              system that automatically follows up with every quote you send.
              Two days after the quote, the customer gets a friendly message:
              &ldquo;Hi, just checking if you had any questions about the
              quote?&rdquo; A week later, another nudge. Two weeks later, a
              final &ldquo;still interested?&rdquo; message.
            </p>

            <p className="text-[var(--color-muted)] leading-relaxed mb-8">
              A plumber in Leeds added automated follow-ups and converted 4
              extra jobs in his first month. At an average of &pound;350 per
              job, that&apos;s &pound;1,400 in recovered revenue &mdash; from
              customers who would have gone cold.
            </p>

            {/* Automation 2 */}
            <h2 className="text-2xl font-bold mt-10 mb-4">
              2. 24/7 Emergency Call Handling
            </h2>

            <p className="text-[var(--color-muted)] leading-relaxed mb-2">
              <strong className="text-[var(--color-heading)]">Problem:</strong> Emergency
              calls come in at all hours. You can&apos;t answer the phone at
              2am, but a burst pipe won&apos;t wait until morning.
            </p>

            <p className="text-[var(--color-muted)] leading-relaxed mb-4">
              <strong className="text-[var(--color-heading)]">Solution:</strong> An AI
              assistant that handles calls and WhatsApp messages round the
              clock. It asks the right questions &mdash; &ldquo;Is there
              active flooding?&rdquo; &ldquo;Can you turn off the
              stopcock?&rdquo; &mdash; and triages the urgency. Real
              emergencies get flagged to your phone immediately. Everything
              else gets booked into your next available slot.
            </p>

            <p className="text-[var(--color-muted)] leading-relaxed mb-8">
              This means you never miss an emergency job again. And you
              don&apos;t have to pay for a call centre &mdash; the AI costs a
              fraction of the price and works every single night without
              complaint.
            </p>

            {/* Automation 3 */}
            <h2 className="text-2xl font-bold mt-10 mb-4">
              3. Automated Google Review Collection
            </h2>

            <p className="text-[var(--color-muted)] leading-relaxed mb-2">
              <strong className="text-[var(--color-heading)]">Problem:</strong> You know
              reviews matter, but you always forget to ask. Or it feels
              awkward.
            </p>

            <p className="text-[var(--color-muted)] leading-relaxed mb-4">
              <strong className="text-[var(--color-heading)]">Solution:</strong> After every
              completed job, the system automatically sends the customer a
              friendly text or WhatsApp message with a direct link to leave a
              Google review. No awkward conversations. No forgetting.
            </p>

            <p className="text-[var(--color-muted)] leading-relaxed mb-4">
              The timing matters &mdash; sending the request within 2 hours of
              finishing the job, while the customer is still happy, gets the
              best response rate. Automated systems get this timing right
              every single time.
            </p>

            <p className="text-[var(--color-muted)] leading-relaxed mb-8">
              One plumbing company went from 12 Google reviews to 47 in three
              months using this approach. That pushed them from page 2 to the
              top 3 results for &ldquo;plumber near me&rdquo; in their area.
            </p>

            {/* Automation 4 */}
            <h2 className="text-2xl font-bold mt-10 mb-4">
              4. Smart Job Scheduling
            </h2>

            <p className="text-[var(--color-muted)] leading-relaxed mb-2">
              <strong className="text-[var(--color-heading)]">Problem:</strong> You&apos;re
              driving across town between jobs when you could be grouping
              nearby ones together.
            </p>

            <p className="text-[var(--color-muted)] leading-relaxed mb-4">
              <strong className="text-[var(--color-heading)]">Solution:</strong> AI
              scheduling that considers location, job type, and duration when
              booking your day. It groups nearby jobs together, leaves buffer
              time for emergencies, and stops you from accidentally
              overbooking yourself.
            </p>

            <p className="text-[var(--color-muted)] leading-relaxed mb-8">
              Smarter scheduling typically saves 45&ndash;60 minutes of
              driving per day. Over a week, that&apos;s an extra 4&ndash;5
              hours &mdash; enough for one or two more paid jobs.
            </p>

            {/* Automation 5 */}
            <h2 className="text-2xl font-bold mt-10 mb-4">
              5. Automated Invoicing and Payment Reminders
            </h2>

            <p className="text-[var(--color-muted)] leading-relaxed mb-2">
              <strong className="text-[var(--color-heading)]">Problem:</strong> You finish a
              job, say &ldquo;I&apos;ll send the invoice later,&rdquo; and
              then it sits on your to-do list for a week. Late invoices mean
              late payments.
            </p>

            <p className="text-[var(--color-muted)] leading-relaxed mb-4">
              <strong className="text-[var(--color-heading)]">Solution:</strong> The moment
              you mark a job as complete, an invoice is generated and sent
              automatically. Payment reminders go out on a schedule. You get a
              notification when the money lands.
            </p>

            <p className="text-[var(--color-muted)] leading-relaxed mb-8">
              Plumbers who automate invoicing typically get paid 7&ndash;10
              days faster. For a business doing &pound;5,000&ndash;10,000 a
              month, that&apos;s a massive improvement to cash flow.
            </p>

            {/* Summary */}
            <hr className="border-[var(--color-border)] my-10" />

            <h2 className="text-2xl font-bold mt-8 mb-4">
              The Bottom Line
            </h2>

            <p className="text-[var(--color-muted)] leading-relaxed mb-4">
              None of these automations require you to be technical. You
              don&apos;t need to learn any software. Someone sets it up for
              you, and it runs in the background while you do what you do
              best.
            </p>

            <p className="text-[var(--color-muted)] leading-relaxed mb-4">
              The plumbers who are winning in 2026 aren&apos;t necessarily
              better at plumbing. They&apos;re better at responding fast,
              following up consistently, and making it easy for customers to
              book and pay.
            </p>

            <p className="text-[var(--color-muted)] leading-relaxed mb-8">
              AI just makes all of that happen automatically.
            </p>
          </div>

          {/* Related Articles */}
          <div className="mt-12 border border-[var(--color-border)] rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4 text-[var(--color-heading)]">Related Articles</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/blog/ai-for-electricians" className="text-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors">
                  AI for Electricians &amp; Tradespeople: Save 10+ Hours a Week
                </Link>
              </li>
              <li>
                <Link href="/blog/get-more-google-reviews" className="text-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors">
                  How to Get More Google Reviews Automatically
                </Link>
              </li>
              <li>
                <Link href="/blog/ai-automation-roi-calculator" className="text-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors">
                  AI Automation ROI: How Much Can Your Business Actually Save?
                </Link>
              </li>
              <li>
                <Link href="/services/lead-intake" className="text-[var(--color-muted)] hover:text-[var(--color-heading)] transition-colors">
                  View our AI Lead Intake &amp; Appointment Booking service &rarr;
                </Link>
              </li>
            </ul>
          </div>

          {/* CTA Section */}
          <div className="mt-16 bg-[var(--color-primary-light)] border border-[var(--color-primary-light)] rounded-xl p-8 text-center">
            <h3 className="text-xl font-semibold mb-2">
              Want to Know Which Automations Would Work for Your Plumbing Business?
            </h3>
            <p className="text-[var(--color-body)] mb-6 max-w-lg mx-auto">
              Every plumbing business is different. Take our free AI Readiness
              Audit and we&apos;ll tell you exactly where automation would
              make the biggest impact &mdash; and what it would cost.
            </p>
            <Link
              href="/audit"
              className="inline-flex items-center gap-2 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-[var(--color-bg)] px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Get Your Free AI Readiness Audit
              <ArrowRight className="w-4 h-4" />
            </Link>
            <p className="text-[var(--color-muted)] text-sm mt-3">
              Takes 2 minutes. No obligation. Built for tradespeople.
            </p>
          </div>
        </div>
      </article>
    </div>
  );
}
