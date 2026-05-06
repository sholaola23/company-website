import Link from "next/link";
import { ArrowLeft, ArrowRight, Clock } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI for Electricians & Tradespeople: Save 10+ Hours a Week",
  description:
    "Discover how AI automation helps electricians and tradespeople save 10+ hours a week on admin, follow-ups, scheduling, and compliance — so you can focus on earning.",
  keywords: [
    "AI for electricians",
    "AI for tradespeople UK",
    "trades automation",
    "electrician business software",
    "automate trades business",
  ],
  openGraph: {
    images: [{ url: "https://workcrew.io/api/og", width: 1200, height: 630 }],
    title: "AI for Electricians & Tradespeople: Save 10+ Hours a Week",
    description:
      "5 practical AI automations that help electricians save 10+ hours a week on quoting, scheduling, compliance, reviews, and invoicing.",
    type: "article",
    publishedTime: "2026-03-20T00:00:00.000Z",
    authors: ["Olushola Oladipupo"],
  },
  alternates: {
    canonical: "/blog/ai-for-electricians",
  },
  twitter: {
    title: "AI for Electricians & Tradespeople: Save 10+ Hours a Week",
    description:
      "5 practical AI automations that help electricians save 10+ hours a week on quoting, scheduling, compliance, reviews, and invoicing.",
  },
};

const tags = ["AI Automation", "Electricians", "Trades", "Industry Guide"];

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
            AI for Electricians &amp; Tradespeople: Save 10+ Hours a Week
          </h1>

          <div className="flex items-center gap-4 text-sm text-[var(--color-muted)] mb-12">
            <span>20 March 2026</span>
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
              You&apos;ve just finished a rewire. You&apos;re covered in dust,
              it&apos;s 6pm, and you&apos;ve got 14 unread messages &mdash;
              three quote requests, two chasing invoices, one asking about a
              certificate you forgot to send, and eight from your mum. Sound
              familiar?
            </p>

            <p className="text-[var(--color-muted)] leading-relaxed mb-4">
              The problem with running an electrical business isn&apos;t the
              electrical work. It&apos;s everything around it &mdash; the
              quoting, the scheduling, the compliance paperwork, the reviews
              you never ask for, and the invoices you send three weeks late.
            </p>

            <p className="text-[var(--color-muted)] leading-relaxed mb-4">
              That admin eats 10&ndash;15 hours of your week. Hours you could
              spend on paid jobs. Or, frankly, with your feet up. AI
              automation can take most of that off your plate &mdash; not by
              replacing you, but by handling the repetitive stuff you keep
              meaning to get around to.
            </p>

            <p className="text-[var(--color-muted)] leading-relaxed mb-8">
              Here are five automations that are helping electricians and
              tradespeople across the UK win more work and waste less time.
            </p>

            {/* Automation 1 */}
            <h2 className="text-2xl font-bold mt-10 mb-4">
              1. Instant Quote Follow-Up
            </h2>

            <p className="text-[var(--color-muted)] leading-relaxed mb-2">
              <strong className="text-[var(--color-heading)]">Problem:</strong> You send a
              quote and then get busy on the next job. Three days later,
              you&apos;ve forgotten about it. Two weeks later, the customer
              has gone with someone else. Not because your price was wrong
              &mdash; because someone else replied faster.
            </p>

            <p className="text-[var(--color-muted)] leading-relaxed mb-4">
              <strong className="text-[var(--color-heading)]">Solution:</strong> An AI
              system monitors every quote you send. Within 24 hours, it
              sends a friendly follow-up: &ldquo;Hi Sarah, just checking
              you received the quote for the consumer unit upgrade. Happy to
              answer any questions.&rdquo; Three days later, another nudge.
              A week later, a final &ldquo;still interested?&rdquo; message.
              All personalised. All automatic.
            </p>

            <p className="text-[var(--color-muted)] leading-relaxed mb-4">
              <strong className="text-[var(--color-heading)]">Result:</strong> An
              electrician in Birmingham added automated quote follow-ups and
              converted 5 extra jobs in his first month. At an average of
              &pound;400 per job, that&apos;s &pound;2,000 in recovered
              revenue &mdash; from customers who would have otherwise gone
              cold. The system paid for itself in the first week.
            </p>

            <p className="text-[var(--color-muted)] leading-relaxed mb-8">
              The best part? You don&apos;t have to remember anything. The
              system handles it while you&apos;re pulling cables on the next
              job.
            </p>

            {/* Automation 2 */}
            <h2 className="text-2xl font-bold mt-10 mb-4">
              2. Smart Job Scheduling by Postcode
            </h2>

            <p className="text-[var(--color-muted)] leading-relaxed mb-2">
              <strong className="text-[var(--color-heading)]">Problem:</strong> Monday
              morning: you&apos;re in Solihull. Your next job is in Sutton
              Coldfield. Then back to Moseley. You&apos;re spending more
              time in the van than on the tools, and the diesel bill is
              painful.
            </p>

            <p className="text-[var(--color-muted)] leading-relaxed mb-4">
              <strong className="text-[var(--color-heading)]">Solution:</strong> AI-powered
              scheduling that groups jobs by postcode area and factors in
              travel time, job duration, and priority. When a new booking
              comes in, the system suggests the best slot based on where
              you&apos;ll already be that day. It also leaves buffer time
              for emergencies &mdash; because something always comes up.
            </p>

            <p className="text-[var(--color-muted)] leading-relaxed mb-4">
              <strong className="text-[var(--color-heading)]">Result:</strong> Smarter
              route-based scheduling typically saves 45&ndash;90 minutes of
              driving per day. Over a five-day week, that&apos;s 4&ndash;7
              hours back. Enough time for one or two more paid jobs, or
              &pound;300&ndash;800 in extra weekly revenue. Plus you save
              &pound;30&ndash;50 a week on fuel.
            </p>

            <p className="text-[var(--color-muted)] leading-relaxed mb-8">
              One spark in Manchester told me he used to drive 180 miles on a
              bad day. After switching to postcode-grouped scheduling, his
              worst day is now 90 miles. Same number of jobs, half the
              driving.
            </p>

            {/* Automation 3 */}
            <h2 className="text-2xl font-bold mt-10 mb-4">
              3. Automated Certificate &amp; Compliance Reminders
            </h2>

            <p className="text-[var(--color-muted)] leading-relaxed mb-2">
              <strong className="text-[var(--color-heading)]">Problem:</strong> You finish
              an EICR, promise to send the certificate &ldquo;tomorrow,&rdquo;
              and then it sits on your to-do list for two weeks. Worse, your
              own Part P registration or insurance renewal creeps up and you
              nearly miss it. Compliance is non-negotiable &mdash; but it&apos;s
              also boring, and boring things get forgotten.
            </p>

            <p className="text-[var(--color-muted)] leading-relaxed mb-4">
              <strong className="text-[var(--color-heading)]">Solution:</strong> An
              automated system that tracks every certificate, registration,
              and renewal date. It sends you reminders 30 days, 14 days, and
              3 days before anything expires. For customer certificates, it
              automatically emails the document the day after job completion
              &mdash; no manual step needed.
            </p>

            <p className="text-[var(--color-muted)] leading-relaxed mb-4">
              <strong className="text-[var(--color-heading)]">Result:</strong> Zero missed
              compliance deadlines. Zero awkward calls from customers chasing
              certificates. One electrician told me he used to spend 2 hours
              every Friday afternoon doing certificate admin. Now it takes 15
              minutes to review what the system has already sent.
            </p>

            <p className="text-[var(--color-muted)] leading-relaxed mb-8">
              That&apos;s nearly 2 hours a week saved on pure paperwork.
              Over a year, that&apos;s roughly 90 hours &mdash; or over
              &pound;4,000 in billable time if you charge &pound;45 an hour.
            </p>

            {/* Automation 4 */}
            <h2 className="text-2xl font-bold mt-10 mb-4">
              4. Automated Review Collection
            </h2>

            <p className="text-[var(--color-muted)] leading-relaxed mb-2">
              <strong className="text-[var(--color-heading)]">Problem:</strong> You know
              Google reviews are the number one way customers choose a
              tradesperson. But asking for reviews face-to-face feels
              awkward, and you always forget to send a follow-up text. So
              your profile sits at 8 reviews while the competitor down the
              road has 67.
            </p>

            <p className="text-[var(--color-muted)] leading-relaxed mb-4">
              <strong className="text-[var(--color-heading)]">Solution:</strong> Two hours
              after every completed job, the customer automatically receives
              a friendly WhatsApp or text message: &ldquo;Thanks for
              choosing us! If you were happy with the work, a quick Google
              review would really help: [direct link].&rdquo; The timing is
              key &mdash; while the work is fresh and the customer is
              grateful.
            </p>

            <p className="text-[var(--color-muted)] leading-relaxed mb-4">
              <strong className="text-[var(--color-heading)]">Result:</strong> An
              electrical firm in Leeds went from 15 Google reviews to 62 in
              four months. Their average rating stayed at 4.9 stars. That
              moved them into the Google Maps top 3 for &ldquo;electrician
              near me&rdquo; in their area &mdash; which brought in 3&ndash;4
              new enquiries per week without spending a penny on advertising.
            </p>

            <p className="text-[var(--color-muted)] leading-relaxed mb-8">
              At an average job value of &pound;350, those organic leads are
              worth &pound;4,000&ndash;5,000 a month. All because an
              automated text went out two hours after each job.
            </p>

            {/* Automation 5 */}
            <h2 className="text-2xl font-bold mt-10 mb-4">
              5. Invoice &amp; Payment Chasing
            </h2>

            <p className="text-[var(--color-muted)] leading-relaxed mb-2">
              <strong className="text-[var(--color-heading)]">Problem:</strong> You finish
              the job on Tuesday. You tell yourself you&apos;ll invoice
              tonight. It&apos;s now the following Tuesday and you still
              haven&apos;t sent it. When you finally do, the customer takes
              another two weeks to pay. Your cash flow looks like a
              rollercoaster.
            </p>

            <p className="text-[var(--color-muted)] leading-relaxed mb-4">
              <strong className="text-[var(--color-heading)]">Solution:</strong> The
              moment you mark a job as complete, an invoice is generated and
              sent automatically &mdash; with a payment link included. If
              payment isn&apos;t received within 3 days, a friendly reminder
              goes out. Another at 7 days. A firmer one at 14 days. You
              never have to chase a payment manually again.
            </p>

            <p className="text-[var(--color-muted)] leading-relaxed mb-4">
              <strong className="text-[var(--color-heading)]">Result:</strong> Electricians
              who automate invoicing typically get paid 8&ndash;12 days
              faster than those who invoice manually. For a business turning
              over &pound;6,000&ndash;10,000 a month, that improved cash
              flow means you can pay suppliers on time, take on bigger jobs
              without worrying about materials costs, and stop lying awake
              wondering who owes you money.
            </p>

            <p className="text-[var(--color-muted)] leading-relaxed mb-8">
              One spark told me: &ldquo;I used to have &pound;3,000 in
              unpaid invoices at any given time. Now it&apos;s under
              &pound;500.&rdquo; That&apos;s not a small difference when
              you&apos;re running a trade business.
            </p>

            {/* Summary */}
            <hr className="border-[var(--color-border)] my-10" />

            <h2 className="text-2xl font-bold mt-8 mb-4">
              The Bottom Line: 10+ Hours Back Every Week
            </h2>

            <p className="text-[var(--color-muted)] leading-relaxed mb-4">
              Let&apos;s add it up. Automated quote follow-ups save you
              the mental load of chasing leads. Smart scheduling saves
              4&ndash;7 hours of driving. Compliance reminders save 2
              hours of paperwork. Review collection runs silently in the
              background. Invoicing happens the moment the job&apos;s done.
            </p>

            <p className="text-[var(--color-muted)] leading-relaxed mb-4">
              That&apos;s comfortably 10&ndash;15 hours a week you get
              back. Hours you can spend on paid work, quoting bigger jobs,
              or finishing early on a Friday for once.
            </p>

            <p className="text-[var(--color-muted)] leading-relaxed mb-4">
              None of this requires you to be technical. You don&apos;t
              need to learn any software or change how you work. Someone
              sets it up, it runs in the background, and you check a
              dashboard once a week to see the results.
            </p>

            <p className="text-[var(--color-muted)] leading-relaxed mb-4">
              The trades businesses winning in 2026 aren&apos;t necessarily
              the best at their craft. They&apos;re the ones who respond
              fastest, follow up consistently, get paid on time, and have
              60+ Google reviews. AI makes all of that happen without you
              lifting a finger.
            </p>

            <p className="text-[var(--color-muted)] leading-relaxed mb-8">
              The question isn&apos;t whether AI is relevant to your trade.
              It&apos;s how much money you&apos;re leaving on the table by
              not using it yet.
            </p>
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
              Want to Know Which Automations Would Work for Your Trade Business?
            </h3>
            <p className="text-[var(--color-body)] mb-6 max-w-lg mx-auto">
              Every trade business is different. Take our free AI Readiness
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
