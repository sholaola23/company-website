import Link from "next/link";
import { ArrowLeft, ArrowRight, Clock } from "lucide-react";
import type { Metadata } from "next";
import JsonLd from "@/components/shared/JsonLd";

export const metadata: Metadata = {
  title: "Voice AI for Small Business: Never Miss a Call Again",
  description:
    "How Voice AI agents answer your business calls 24/7, qualify leads, and book appointments automatically — while you focus on the job. Real costs and real results.",
  keywords: [
    "voice AI small business",
    "AI phone agent",
    "AI receptionist",
    "automated phone answering business",
    "voice AI UK",
  ],
  openGraph: {
    images: [{ url: "https://workcrew.io/api/og", width: 1200, height: 630 }],
    title: "Voice AI for Small Business: Never Miss a Call Again",
    description:
      "How Voice AI agents answer your business calls 24/7, qualify leads, and book appointments automatically — while you focus on the job. Real costs and real results.",
    type: "article",
    publishedTime: "2026-03-23T00:00:00.000Z",
    authors: ["Olushola Oladipupo"],
  },
  alternates: {
    canonical: "/blog/voice-ai-small-business",
  },
  twitter: {
    title: "Voice AI for Small Business: Never Miss a Call Again",
    description:
      "How Voice AI agents answer your business calls 24/7, qualify leads, and book appointments automatically — while you focus on the job. Real costs and real results.",
  },
};

const tags = ["Voice AI", "AI Automation", "Small Business", "Lead Generation"];

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Voice AI for Small Business: Never Miss a Call Again",
  "description":
    "How Voice AI agents answer your business calls 24/7, qualify leads, and book appointments automatically — while you focus on the job. Real costs and real results.",
  "author": {
    "@type": "Person",
    "name": "Olushola Oladipupo",
  },
  "publisher": {
    "@type": "Organization",
    "name": "WorkCrew Ltd",
    "url": "https://workcrew.io",
  },
  "datePublished": "2026-03-23",
  "dateModified": "2026-03-23",
  "mainEntityOfPage":
    "https://workcrew.io/blog/voice-ai-small-business",
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
            Voice AI for Small Business: Never Miss a Call Again
          </h1>

          <div className="flex items-center gap-4 text-sm text-[var(--color-muted)] mb-12">
            <span>23 March 2026</span>
            <span className="text-[var(--color-body)]">|</span>
            <span>By Olushola Oladipupo</span>
            <span className="text-[var(--color-body)]">|</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              8 min read
            </span>
          </div>

          <div className="prose prose-slate max-w-none">
            {/* Section 1: The Problem */}
            <p className="text-[var(--color-muted)] leading-relaxed mb-4 text-lg">
              Your phone rings while you&apos;re elbow-deep in a boiler repair.
              It rings again while you&apos;re driving between jobs. By the time
              you check, the customer&apos;s already booked someone else.
            </p>

            <p className="text-[var(--color-muted)] leading-relaxed mb-4">
              This isn&apos;t a minor inconvenience. It&apos;s a revenue leak.
              Research shows that 67% of callers hang up if nobody answers
              within 30 seconds. They don&apos;t leave voicemails. They call the
              next business on Google.
            </p>

            <p className="text-[var(--color-muted)] leading-relaxed mb-4">
              For a typical plumbing or electrical business, missed calls add up
              to roughly &pound;50,000 in lost revenue per year. That&apos;s not
              a typo. When your average job is &pound;200&ndash;500 and you miss
              2&ndash;3 calls a day, the maths gets painful fast.
            </p>

            <p className="text-[var(--color-muted)] leading-relaxed mb-8">
              After-hours calls are the worst. A homeowner discovers a leak at
              9pm. They need someone now, not tomorrow morning. If you
              don&apos;t answer, they call someone who does.
            </p>

            {/* Section 2: What Voice AI Actually Is */}
            <h2 className="text-2xl font-bold mt-10 mb-4">
              What Voice AI Actually Is (Not What You Think)
            </h2>

            <p className="text-[var(--color-muted)] leading-relaxed mb-4">
              When most people hear &ldquo;automated phone system,&rdquo; they
              picture the robotic menus from the 1990s. &ldquo;Press 1 for
              sales. Press 2 for support. Press 3 to lose the will to
              live.&rdquo;
            </p>

            <p className="text-[var(--color-muted)] leading-relaxed mb-4">
              Voice AI is nothing like that. It&apos;s an AI agent that has a
              natural, human-sounding conversation with your callers. It
              understands context. It asks follow-up questions. It adapts based
              on what the caller says.
            </p>

            <p className="text-[var(--color-muted)] leading-relaxed mb-8">
              Think of it as a receptionist who never takes a break, never calls
              in sick, and answers every single call in under 2 seconds &mdash;
              at 2pm or 2am. The caller doesn&apos;t press buttons. They just
              talk, and the AI handles the rest.
            </p>

            {/* Section 3: How It Works */}
            <h2 className="text-2xl font-bold mt-10 mb-4">
              How It Works: Step by Step
            </h2>

            <p className="text-[var(--color-muted)] leading-relaxed mb-4">
              Here&apos;s what happens when someone calls your business number
              with Voice AI set up:
            </p>

            <div className="bg-[var(--color-bg-alt)] border border-[var(--color-border)] rounded-xl p-6 mb-8 space-y-4">
              <div className="flex gap-4">
                <span className="text-[var(--color-primary)] font-bold text-lg shrink-0">
                  1.
                </span>
                <p className="text-[var(--color-muted)]">
                  <strong className="text-[var(--color-heading)]">Customer calls.</strong>{" "}
                  They dial your normal business number. Nothing changes on
                  their end.
                </p>
              </div>
              <div className="flex gap-4">
                <span className="text-[var(--color-primary)] font-bold text-lg shrink-0">
                  2.
                </span>
                <p className="text-[var(--color-muted)]">
                  <strong className="text-[var(--color-heading)]">
                    AI answers in under 2 seconds.
                  </strong>{" "}
                  No ringing out. No voicemail. A natural voice picks up
                  immediately.
                </p>
              </div>
              <div className="flex gap-4">
                <span className="text-[var(--color-primary)] font-bold text-lg shrink-0">
                  3.
                </span>
                <p className="text-[var(--color-muted)]">
                  <strong className="text-[var(--color-heading)]">
                    Natural conversation.
                  </strong>{" "}
                  The caller says something like &ldquo;Hi, I&apos;ve got a
                  leaking pipe in my kitchen.&rdquo; The AI responds naturally
                  and asks relevant questions.
                </p>
              </div>
              <div className="flex gap-4">
                <span className="text-[var(--color-primary)] font-bold text-lg shrink-0">
                  4.
                </span>
                <p className="text-[var(--color-muted)]">
                  <strong className="text-[var(--color-heading)]">
                    Lead qualification.
                  </strong>{" "}
                  The AI gathers what it needs: What&apos;s the issue? Where are
                  you located? How urgent is it? Any access requirements?
                </p>
              </div>
              <div className="flex gap-4">
                <span className="text-[var(--color-primary)] font-bold text-lg shrink-0">
                  5.
                </span>
                <p className="text-[var(--color-muted)]">
                  <strong className="text-[var(--color-heading)]">Books the appointment.</strong>{" "}
                  Checks your live calendar and offers available slots. The
                  caller picks a time that works.
                </p>
              </div>
              <div className="flex gap-4">
                <span className="text-[var(--color-primary)] font-bold text-lg shrink-0">
                  6.
                </span>
                <p className="text-[var(--color-muted)]">
                  <strong className="text-[var(--color-heading)]">
                    SMS confirmation sent.
                  </strong>{" "}
                  The customer gets an instant text confirming the appointment
                  &mdash; date, time, and your business details.
                </p>
              </div>
              <div className="flex gap-4">
                <span className="text-[var(--color-primary)] font-bold text-lg shrink-0">
                  7.
                </span>
                <p className="text-[var(--color-muted)]">
                  <strong className="text-[var(--color-heading)]">
                    You get notified.
                  </strong>{" "}
                  A summary lands in your inbox or WhatsApp: caller name,
                  number, issue, urgency, and the booked slot.
                </p>
              </div>
            </div>

            <p className="text-[var(--color-muted)] leading-relaxed mb-8">
              Total call time: 2&ndash;3 minutes. Cost per call: 20&ndash;60p.
              The caller gets a great experience. You get a qualified, booked
              lead &mdash; without lifting your phone.
            </p>

            {/* Section 4: Real Results */}
            <h2 className="text-2xl font-bold mt-10 mb-4">
              Real Results: The Numbers
            </h2>

            <p className="text-[var(--color-muted)] leading-relaxed mb-4">
              Voice AI isn&apos;t theoretical. Businesses using it are seeing
              measurable results:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div className="bg-[var(--color-bg-alt)] border border-[var(--color-border)] rounded-lg p-5 text-center">
                <p className="text-3xl font-bold text-[var(--color-primary)] mb-1">3.6x</p>
                <p className="text-[var(--color-body)] text-sm">
                  more after-hours bookings
                </p>
              </div>
              <div className="bg-[var(--color-bg-alt)] border border-[var(--color-border)] rounded-lg p-5 text-center">
                <p className="text-3xl font-bold text-[var(--color-primary)] mb-1">90%</p>
                <p className="text-[var(--color-body)] text-sm">
                  booking rate on answered calls
                </p>
              </div>
              <div className="bg-[var(--color-bg-alt)] border border-[var(--color-border)] rounded-lg p-5 text-center">
                <p className="text-3xl font-bold text-[var(--color-primary)] mb-1">64%</p>
                <p className="text-[var(--color-body)] text-sm">
                  call-to-appointment conversion
                </p>
              </div>
              <div className="bg-[var(--color-bg-alt)] border border-[var(--color-border)] rounded-lg p-5 text-center">
                <p className="text-3xl font-bold text-[var(--color-primary)] mb-1">
                  &lt;2s
                </p>
                <p className="text-[var(--color-body)] text-sm">average answer time</p>
              </div>
            </div>

            <p className="text-[var(--color-muted)] leading-relaxed mb-8">
              To put that in context: the best human receptionists convert about
              60% of inbound calls to bookings. Voice AI hits 64% &mdash; and
              it works at 2am on a Sunday without overtime pay.
            </p>

            {/* Section 5: What It Costs */}
            <h2 className="text-2xl font-bold mt-10 mb-4">
              What It Costs: Honest Breakdown
            </h2>

            <p className="text-[var(--color-muted)] leading-relaxed mb-4">
              No hidden fees. Here&apos;s what Voice AI actually costs for a
              small business:
            </p>

            <div className="overflow-x-auto mb-6">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[var(--color-border)]">
                    <th className="py-3 pr-4 text-[var(--color-heading)] font-semibold">
                      Item
                    </th>
                    <th className="py-3 text-[var(--color-heading)] font-semibold">Cost</th>
                  </tr>
                </thead>
                <tbody className="text-[var(--color-muted)]">
                  <tr className="border-b border-[var(--color-border)]/50">
                    <td className="py-3 pr-4">Setup (one-time)</td>
                    <td className="py-3">
                      &pound;500 &ndash; &pound;3,500
                    </td>
                  </tr>
                  <tr className="border-b border-[var(--color-border)]/50">
                    <td className="py-3 pr-4">Monthly management</td>
                    <td className="py-3">
                      &pound;150 &ndash; &pound;500
                    </td>
                  </tr>
                  <tr className="border-b border-[var(--color-border)]/50">
                    <td className="py-3 pr-4">Per call</td>
                    <td className="py-3">20p &ndash; 60p</td>
                  </tr>
                  <tr className="border-b border-[var(--color-border)]/50">
                    <td className="py-3 pr-4">
                      Hiring a receptionist (comparison)
                    </td>
                    <td className="py-3">&pound;25,000+/year</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-[var(--color-muted)] leading-relaxed mb-4">
              Setup cost depends on complexity. A straightforward
              &ldquo;answer, qualify, book&rdquo; system is at the lower end.
              If you need multi-location routing, CRM integration, or custom
              qualification logic, it costs more.
            </p>

            <p className="text-[var(--color-muted)] leading-relaxed mb-4">
              The monthly fee covers monitoring, updates, and optimisation
              &mdash; making sure your AI gets better over time, not worse.
            </p>

            <p className="text-[var(--color-muted)] leading-relaxed mb-8">
              Compare that to a full-time receptionist at &pound;25,000+ per
              year (who still doesn&apos;t answer calls at midnight). Or a call
              answering service at &pound;1&ndash;2 per call with no booking
              capability. Voice AI is cheaper and does more.
            </p>

            {/* Section 6: Who It's Best For */}
            <h2 className="text-2xl font-bold mt-10 mb-4">
              Who Voice AI Works Best For
            </h2>

            <p className="text-[var(--color-muted)] leading-relaxed mb-4">
              Voice AI isn&apos;t for every business. It works best when phone
              calls are directly tied to revenue. That means:
            </p>

            <ul className="space-y-3 mb-6">
              <li className="flex gap-3 text-[var(--color-muted)]">
                <span className="text-[var(--color-primary)] font-bold shrink-0">
                  &bull;
                </span>
                <span>
                  <strong className="text-[var(--color-heading)]">Trades</strong> &mdash;
                  plumbers, electricians, roofers, builders. You&apos;re on site
                  all day and can&apos;t answer the phone. Every missed call is
                  a missed job.
                </span>
              </li>
              <li className="flex gap-3 text-[var(--color-muted)]">
                <span className="text-[var(--color-primary)] font-bold shrink-0">
                  &bull;
                </span>
                <span>
                  <strong className="text-[var(--color-heading)]">
                    Healthcare and dental
                  </strong>{" "}
                  &mdash;{" "}
                  <Link
                    href="/blog/ai-for-dentists"
                    className="text-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors"
                  >
                    dental practices
                  </Link>
                  , physiotherapists, clinics. High call volume, appointment-based,
                  and patients expect immediate answers.
                </span>
              </li>
              <li className="flex gap-3 text-[var(--color-muted)]">
                <span className="text-[var(--color-primary)] font-bold shrink-0">
                  &bull;
                </span>
                <span>
                  <strong className="text-[var(--color-heading)]">Salons and spas</strong>{" "}
                  &mdash; stylists can&apos;t pick up the phone mid-haircut.
                  Online booking helps, but many customers still prefer to call.
                </span>
              </li>
              <li className="flex gap-3 text-[var(--color-muted)]">
                <span className="text-[var(--color-primary)] font-bold shrink-0">
                  &bull;
                </span>
                <span>
                  <strong className="text-[var(--color-heading)]">
                    Property and lettings
                  </strong>{" "}
                  &mdash; high-value leads calling about viewings. Speed of
                  response determines who gets the deal.
                </span>
              </li>
              <li className="flex gap-3 text-[var(--color-muted)]">
                <span className="text-[var(--color-primary)] font-bold shrink-0">
                  &bull;
                </span>
                <span>
                  <strong className="text-[var(--color-heading)]">
                    Any service business
                  </strong>{" "}
                  that relies on inbound phone calls for bookings and loses
                  money when calls go unanswered.
                </span>
              </li>
            </ul>

            <p className="text-[var(--color-muted)] leading-relaxed mb-8">
              If your customers mostly book online or through a website form,
              you might get more value from a{" "}
              <Link
                href="/blog/ai-chatbot-small-business"
                className="text-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors"
              >
                website chatbot
              </Link>{" "}
              instead. Different tool for a different problem.
            </p>

            {/* Section 7: Guarantee */}
            <hr className="border-[var(--color-border)] my-10" />

            <h2 className="text-2xl font-bold mt-8 mb-4">
              Our 90-Day Results Guarantee
            </h2>

            <p className="text-[var(--color-muted)] leading-relaxed mb-4">
              We stand behind the systems we build. If your Voice AI setup
              doesn&apos;t save you at least 5 hours per week within 90 days,
              we refund your setup fee. No arguments, no small print.
            </p>

            <p className="text-[var(--color-muted)] leading-relaxed mb-4">
              That&apos;s possible because these systems work. When every call
              gets answered, qualified, and booked automatically, the time
              savings are immediate and obvious.
            </p>

            <p className="text-[var(--color-muted)] leading-relaxed mb-8">
              We&apos;ve already delivered results for businesses like{" "}
              <Link
                href="/case-studies/emanuel-bakery"
                className="text-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors"
              >
                E&apos;Manuel Bakery
              </Link>
              , and Voice AI is our fastest-growing service. The demand is there
              because the problem is universal: missed calls cost money.
            </p>

            {/* Section 8: CTA */}
            <h2 className="text-2xl font-bold mt-10 mb-4">
              Want to Hear What Your AI Receptionist Would Sound Like?
            </h2>

            <p className="text-[var(--color-muted)] leading-relaxed mb-4">
              The best way to understand Voice AI is to experience it. We
              offer a free{" "}
              <Link
                href="/audit"
                className="text-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors"
              >
                AI Readiness Audit
              </Link>{" "}
              that shows you exactly how Voice AI would work for your specific
              business &mdash; including which calls to automate, expected
              conversion rates, and what you should see in 30, 60, 90 days.
            </p>

            <p className="text-[var(--color-muted)] leading-relaxed mb-8">
              No obligation. No hard sell. Just a clear picture of what&apos;s
              possible and what it would cost.
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
                  href="/blog/automate-appointment-booking"
                  className="text-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors"
                >
                  Automate Appointment Booking for Your Business
                </Link>
              </li>
              <li>
                <Link
                  href="/blog/ai-chatbot-small-business"
                  className="text-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors"
                >
                  AI Chatbots for Small Business: Complete Guide
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
              Find Out If Voice AI Is Right for Your Business
            </h3>
            <p className="text-[var(--color-body)] mb-6 max-w-lg mx-auto">
              Take our free AI Readiness Audit. In 2 minutes, you&apos;ll
              know exactly where automation would make the biggest impact
              &mdash; and what it would cost.
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
        </div>
      </article>
    </div>
  );
}
