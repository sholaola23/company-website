import Link from "next/link";
import { ArrowLeft, ArrowRight, Clock } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Automation ROI: How Much Can Your Business Actually Save?",
  description:
    "Break down the real ROI of AI automation for UK small businesses. See the maths for plumbers, salons, restaurants, and more — with specific £ figures and payback timelines.",
  keywords: [
    "AI automation ROI",
    "AI cost savings small business",
    "automation ROI calculator",
    "is AI worth it small business",
    "AI automation payback",
  ],
  openGraph: {
    images: [{ url: "https://workcrew.io/api/og", width: 1200, height: 630 }],
    title: "AI Automation ROI: How Much Can Your Business Actually Save?",
    description:
      "The real maths behind AI automation for small businesses. Specific savings, payback periods, and ROI scenarios.",
    type: "article",
    publishedTime: "2026-03-20T00:00:00.000Z",
    authors: ["Olushola Oladipupo"],
  },
  alternates: {
    canonical: "/blog/ai-automation-roi-calculator",
  },
  twitter: {
    title: "AI Automation ROI: How Much Can Your Business Actually Save?",
    description:
      "The real maths behind AI automation for small businesses. Specific savings, payback periods, and ROI scenarios.",
  },
};

const tags = ["AI Automation", "ROI", "Small Business", "Guides"];

export default function BlogPost() {
  return (
    <div className="min-h-screen">
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
            AI Automation ROI: How Much Can Your Business Actually Save?
          </h1>

          <div className="flex items-center gap-4 text-sm text-slate-400 mb-12">
            <span>20 March 2026</span>
            <span className="text-slate-600">|</span>
            <span>By Olushola Oladipupo</span>
            <span className="text-slate-600">|</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              6 min read
            </span>
          </div>

          <div className="prose prose-slate max-w-none">
            <p className="text-slate-500 leading-relaxed mb-4 text-lg">
              &ldquo;Is AI actually worth it for a business my size?&rdquo;
            </p>

            <p className="text-slate-500 leading-relaxed mb-4">
              That&apos;s the question I hear most often. Not from big
              corporations &mdash; they already have budgets for this. It&apos;s
              from small business owners in the UK who are spending
              &pound;500&ndash;3,000 on automation and want to know if
              they&apos;ll see a return.
            </p>

            <p className="text-slate-500 leading-relaxed mb-4">
              The short answer: yes, almost always. But &ldquo;almost
              always&rdquo; isn&apos;t good enough when it&apos;s your money.
              So let&apos;s do the actual maths.
            </p>

            <p className="text-slate-500 leading-relaxed mb-8">
              I&apos;m going to break down the ROI for different types of UK
              small businesses, using real numbers from projects we&apos;ve
              delivered. No hand-waving, no theoretical projections &mdash;
              just the arithmetic.
            </p>

            {/* The Hidden Cost */}
            <h2 className="text-2xl font-bold mt-10 mb-4">
              The Hidden Cost You&apos;re Already Paying
            </h2>

            <p className="text-slate-500 leading-relaxed mb-4">
              Before we talk about what AI saves, let&apos;s talk about what
              manual work costs. Most UK small business owners don&apos;t
              think about it this way, but every hour spent on admin is an hour
              not spent on revenue-generating work.
            </p>

            <p className="text-slate-500 leading-relaxed mb-4">
              The average UK SMB owner or key employee spends{" "}
              <strong className="text-slate-900">15&ndash;20 hours per week</strong>{" "}
              on tasks that could be automated:
            </p>

            <ul className="text-slate-500 leading-relaxed mb-4 list-disc pl-6 space-y-2">
              <li>Responding to enquiries and booking appointments (4&ndash;6 hrs)</li>
              <li>Sending quotes and following up (3&ndash;4 hrs)</li>
              <li>Managing email and messages (2&ndash;3 hrs)</li>
              <li>Invoicing and payment chasing (2&ndash;3 hrs)</li>
              <li>Updating spreadsheets and CRM (2&ndash;3 hrs)</li>
              <li>Social media and marketing admin (2&ndash;3 hrs)</li>
            </ul>

            <p className="text-slate-500 leading-relaxed mb-4">
              At a conservative rate of{" "}
              <strong className="text-slate-900">&pound;15&ndash;25/hour</strong>{" "}
              (whether that&apos;s your time, a VA&apos;s time, or a staff
              member&apos;s time), that&apos;s:
            </p>

            <div className="bg-slate-100/50 border border-slate-200 rounded-lg p-6 mb-8">
              <p className="text-slate-500 leading-relaxed mb-2">
                <strong className="text-slate-900">15 hours/week &times; &pound;15/hour</strong>{" "}
                = &pound;225/week = <strong className="text-slate-900">&pound;975/month</strong>
              </p>
              <p className="text-slate-500 leading-relaxed mb-2">
                <strong className="text-slate-900">20 hours/week &times; &pound;20/hour</strong>{" "}
                = &pound;400/week = <strong className="text-slate-900">&pound;1,733/month</strong>
              </p>
              <p className="text-slate-500 leading-relaxed">
                <strong className="text-slate-900">20 hours/week &times; &pound;25/hour</strong>{" "}
                = &pound;500/week = <strong className="text-slate-900">&pound;2,166/month</strong>
              </p>
            </div>

            <p className="text-slate-500 leading-relaxed mb-8">
              That&apos;s &pound;780&ndash;2,000+ per month in time spent on
              work that a machine could do. And that&apos;s before we count the
              revenue you&apos;re losing from slow responses, missed follow-ups,
              and forgotten invoices.
            </p>

            {/* Real Scenarios */}
            <h2 className="text-2xl font-bold mt-10 mb-4">
              Real ROI Scenarios: The Maths That Matters
            </h2>

            <p className="text-slate-500 leading-relaxed mb-8">
              Here are three real scenarios from businesses we&apos;ve worked
              with. I&apos;ve kept the numbers conservative.
            </p>

            {/* Scenario 1 */}
            <h3 className="text-xl font-semibold mt-8 mb-3 text-slate-900">
              Scenario 1: Plumber &mdash; Quote Follow-Up Automation
            </h3>

            <div className="bg-slate-100/50 border border-slate-200 rounded-lg p-6 mb-4">
              <p className="text-slate-500 leading-relaxed mb-2">
                <strong className="text-slate-900">Setup cost:</strong> &pound;500 (one-time)
              </p>
              <p className="text-slate-500 leading-relaxed mb-2">
                <strong className="text-slate-900">Monthly running cost:</strong> &pound;50 (retainer + platform)
              </p>
              <p className="text-slate-500 leading-relaxed mb-2">
                <strong className="text-slate-900">Quotes sent per month:</strong> 60
              </p>
              <p className="text-slate-500 leading-relaxed mb-2">
                <strong className="text-slate-900">Previous conversion rate:</strong> 30% (18 jobs)
              </p>
              <p className="text-slate-500 leading-relaxed mb-2">
                <strong className="text-slate-900">New conversion rate (with follow-up):</strong> 37% (22 jobs)
              </p>
              <p className="text-slate-500 leading-relaxed mb-2">
                <strong className="text-slate-900">Extra jobs per month:</strong> 4
              </p>
              <p className="text-slate-500 leading-relaxed mb-2">
                <strong className="text-slate-900">Average job value:</strong> &pound;350
              </p>
              <p className="text-slate-500 leading-relaxed mb-4">
                <strong className="text-slate-900">Extra revenue per month:</strong> &pound;1,400
              </p>
              <hr className="border-slate-200 my-3" />
              <p className="text-slate-500 leading-relaxed mb-1">
                <strong className="text-slate-900">Monthly ROI:</strong> &pound;1,400 &minus; &pound;50 = &pound;1,350 net gain
              </p>
              <p className="text-slate-500 leading-relaxed mb-1">
                <strong className="text-slate-900">Payback period:</strong> Setup cost recovered in first 2 weeks
              </p>
              <p className="text-slate-500 leading-relaxed">
                <strong className="text-slate-900">Annual ROI:</strong> &pound;16,200 net gain on a &pound;1,100 investment = 1,373% return
              </p>
            </div>

            <p className="text-slate-500 leading-relaxed mb-8">
              This is the most common automation we deploy. The maths works
              because the system is converting leads you&apos;re already
              generating &mdash; it&apos;s not about getting more leads,
              it&apos;s about not letting the ones you have slip away.
            </p>

            {/* Scenario 2 */}
            <h3 className="text-xl font-semibold mt-8 mb-3 text-slate-900">
              Scenario 2: Salon &mdash; Booking + Reminder System
            </h3>

            <div className="bg-slate-100/50 border border-slate-200 rounded-lg p-6 mb-4">
              <p className="text-slate-500 leading-relaxed mb-2">
                <strong className="text-slate-900">Setup cost:</strong> &pound;500 (one-time)
              </p>
              <p className="text-slate-500 leading-relaxed mb-2">
                <strong className="text-slate-900">Monthly running cost:</strong> &pound;50 (retainer + platform)
              </p>
              <p className="text-slate-500 leading-relaxed mb-2">
                <strong className="text-slate-900">Appointments per month:</strong> 300
              </p>
              <p className="text-slate-500 leading-relaxed mb-2">
                <strong className="text-slate-900">Previous no-show rate:</strong> 12% (36 no-shows)
              </p>
              <p className="text-slate-500 leading-relaxed mb-2">
                <strong className="text-slate-900">New no-show rate (with reminders):</strong> 4% (12 no-shows)
              </p>
              <p className="text-slate-500 leading-relaxed mb-2">
                <strong className="text-slate-900">Recovered appointments:</strong> 24 per month
              </p>
              <p className="text-slate-500 leading-relaxed mb-2">
                <strong className="text-slate-900">Average appointment value:</strong> &pound;35
              </p>
              <p className="text-slate-500 leading-relaxed mb-2">
                <strong className="text-slate-900">Recovered revenue:</strong> &pound;840/month
              </p>
              <p className="text-slate-500 leading-relaxed mb-4">
                <strong className="text-slate-900">Admin time saved:</strong> 8 hours/week on phone bookings = &pound;480/month (at &pound;15/hr)
              </p>
              <hr className="border-slate-200 my-3" />
              <p className="text-slate-500 leading-relaxed mb-1">
                <strong className="text-slate-900">Total monthly benefit:</strong> &pound;840 + &pound;480 = &pound;1,320
              </p>
              <p className="text-slate-500 leading-relaxed mb-1">
                <strong className="text-slate-900">Monthly ROI:</strong> &pound;1,320 &minus; &pound;50 = &pound;1,270 net gain
              </p>
              <p className="text-slate-500 leading-relaxed">
                <strong className="text-slate-900">Payback period:</strong> Under 3 weeks
              </p>
            </div>

            <p className="text-slate-500 leading-relaxed mb-8">
              No-shows are one of the biggest profit killers in appointment-based
              businesses. Automated reminders (sent 24 hours and 2 hours before
              the appointment) consistently cut no-show rates by 60&ndash;70%.
              The maths is simple: fewer empty chairs = more revenue.
            </p>

            {/* Scenario 3 */}
            <h3 className="text-xl font-semibold mt-8 mb-3 text-slate-900">
              Scenario 3: Restaurant &mdash; Review Collection + Reputation Management
            </h3>

            <div className="bg-slate-100/50 border border-slate-200 rounded-lg p-6 mb-4">
              <p className="text-slate-500 leading-relaxed mb-2">
                <strong className="text-slate-900">Setup cost:</strong> &pound;500 (one-time)
              </p>
              <p className="text-slate-500 leading-relaxed mb-2">
                <strong className="text-slate-900">Monthly running cost:</strong> &pound;50 (retainer + platform)
              </p>
              <p className="text-slate-500 leading-relaxed mb-2">
                <strong className="text-slate-900">Previous Google reviews:</strong> 45 (3.8 star average)
              </p>
              <p className="text-slate-500 leading-relaxed mb-2">
                <strong className="text-slate-900">After 3 months:</strong> 120 reviews (4.5 star average)
              </p>
              <p className="text-slate-500 leading-relaxed mb-2">
                <strong className="text-slate-900">Google Maps ranking improvement:</strong> From position 8 to position 2
              </p>
              <p className="text-slate-500 leading-relaxed mb-2">
                <strong className="text-slate-900">Estimated extra covers per week:</strong> 15&ndash;20 (from improved visibility)
              </p>
              <p className="text-slate-500 leading-relaxed mb-4">
                <strong className="text-slate-900">Average spend per cover:</strong> &pound;22
              </p>
              <hr className="border-slate-200 my-3" />
              <p className="text-slate-500 leading-relaxed mb-1">
                <strong className="text-slate-900">Extra weekly revenue:</strong> 15 &times; &pound;22 = &pound;330
              </p>
              <p className="text-slate-500 leading-relaxed mb-1">
                <strong className="text-slate-900">Extra monthly revenue:</strong> &pound;1,430
              </p>
              <p className="text-slate-500 leading-relaxed">
                <strong className="text-slate-900">Monthly ROI:</strong> &pound;1,430 &minus; &pound;50 = &pound;1,380 net gain (after ramp-up period)
              </p>
            </div>

            <p className="text-slate-500 leading-relaxed mb-8">
              Review automation has a slower payback than lead response or
              booking systems &mdash; it takes 2&ndash;3 months for the reviews
              to accumulate and the ranking improvements to kick in. But once
              they do, the effect compounds. More reviews bring more
              visibility, which brings more customers, which generates more
              reviews. It&apos;s a flywheel.
            </p>

            {/* Quick ROI Estimate */}
            <hr className="border-slate-200 my-10" />

            <h2 className="text-2xl font-bold mt-8 mb-4">
              Quick ROI Estimate: Do the Maths for Your Business
            </h2>

            <p className="text-slate-500 leading-relaxed mb-4">
              Here&apos;s a quick way to estimate what automation could save
              your specific business. Grab a pen &mdash; this takes 2 minutes.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-3 text-slate-900">
              Step 1: Calculate Your Admin Cost
            </h3>

            <p className="text-slate-500 leading-relaxed mb-4">
              How many hours per week do you (or your team) spend on repetitive
              admin? Be honest. Include email, scheduling, invoicing, data
              entry, follow-ups, and social media.
            </p>

            <div className="bg-slate-100/50 border border-slate-200 rounded-lg p-6 mb-6">
              <p className="text-slate-500 leading-relaxed">
                <strong className="text-slate-900">Your admin hours/week</strong>{" "}
                &times;{" "}
                <strong className="text-slate-900">&pound;[hourly rate]</strong>{" "}
                &times;{" "}
                <strong className="text-slate-900">4.3 weeks</strong>{" "}
                ={" "}
                <strong className="text-slate-900">Monthly admin cost</strong>
              </p>
            </div>

            <p className="text-slate-500 leading-relaxed mb-4">
              Example: 15 hours &times; &pound;18/hr &times; 4.3 = &pound;1,161/month
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-3 text-slate-900">
              Step 2: Calculate Your Lost Revenue
            </h3>

            <p className="text-slate-500 leading-relaxed mb-4">
              Think about the money you&apos;re leaving on the table:
            </p>

            <ul className="text-slate-500 leading-relaxed mb-4 list-disc pl-6 space-y-2">
              <li>
                <strong className="text-slate-900">Slow lead response:</strong>{" "}
                How many enquiries per week go unanswered for more than an
                hour? Each one is a potential lost customer.
              </li>
              <li>
                <strong className="text-slate-900">No follow-up:</strong>{" "}
                How many quotes or proposals do you send without following up?
                Industry average: 30&ndash;50% of unfollowed quotes would
                convert with a simple nudge.
              </li>
              <li>
                <strong className="text-slate-900">No-shows:</strong>{" "}
                If you&apos;re appointment-based, what&apos;s your no-show
                rate? Automated reminders typically cut it by 60&ndash;70%.
              </li>
              <li>
                <strong className="text-slate-900">Late invoices:</strong>{" "}
                How much is outstanding right now? Automated chasing gets you
                paid 7&ndash;14 days faster on average.
              </li>
            </ul>

            <div className="bg-slate-100/50 border border-slate-200 rounded-lg p-6 mb-6">
              <p className="text-slate-500 leading-relaxed">
                <strong className="text-slate-900">Lost leads/week</strong>{" "}
                &times;{" "}
                <strong className="text-slate-900">average job value</strong>{" "}
                &times;{" "}
                <strong className="text-slate-900">0.3 (recovery rate)</strong>{" "}
                &times;{" "}
                <strong className="text-slate-900">4.3 weeks</strong>{" "}
                ={" "}
                <strong className="text-slate-900">Monthly recovered revenue</strong>
              </p>
            </div>

            <p className="text-slate-500 leading-relaxed mb-4">
              Example: 5 lost leads &times; &pound;200 &times; 0.3 &times; 4.3 = &pound;1,290/month
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-3 text-slate-900">
              Step 3: Compare to the Cost
            </h3>

            <p className="text-slate-500 leading-relaxed mb-4">
              A typical AI automation setup costs:
            </p>

            <ul className="text-slate-500 leading-relaxed mb-4 list-disc pl-6 space-y-2">
              <li>
                <strong className="text-slate-900">&pound;500 setup</strong>{" "}
                for a starter package (1&ndash;2 automations)
              </li>
              <li>
                <strong className="text-slate-900">&pound;50&ndash;150/month</strong>{" "}
                for ongoing optimisation and platform costs
              </li>
            </ul>

            <p className="text-slate-500 leading-relaxed mb-8">
              If your combined admin savings and recovered revenue total more
              than &pound;100&ndash;200/month (and from the scenarios above,
              they almost certainly do), the automation pays for itself within
              the first month. The setup fee is typically recovered in
              2&ndash;4 weeks.
            </p>

            {/* When NOT worth it */}
            <h2 className="text-2xl font-bold mt-10 mb-4">
              When AI Automation Isn&apos;t Worth It
            </h2>

            <p className="text-slate-500 leading-relaxed mb-4">
              I want to be honest about this. AI automation isn&apos;t always
              the right move. Here are situations where I&apos;d tell you to
              hold off:
            </p>

            <ul className="text-slate-500 leading-relaxed mb-4 list-disc pl-6 space-y-2">
              <li>
                <strong className="text-slate-900">You have fewer than 5 leads per week.</strong>{" "}
                Automation shines with volume. If you&apos;re getting 2&ndash;3
                enquiries a week, you can probably handle them manually.
              </li>
              <li>
                <strong className="text-slate-900">Your processes aren&apos;t defined yet.</strong>{" "}
                You can&apos;t automate chaos. If you don&apos;t have a clear
                sales process or booking flow, sort that out first.
              </li>
              <li>
                <strong className="text-slate-900">You&apos;re not willing to invest 30 minutes in setup.</strong>{" "}
                Even done-for-you automation requires some input from you
                &mdash; explaining your business, reviewing draft messages,
                testing the system. If you can&apos;t spare 30 minutes,
                it&apos;s not the right time.
              </li>
            </ul>

            <p className="text-slate-500 leading-relaxed mb-8">
              For everyone else &mdash; and that&apos;s most small businesses
              doing more than &pound;5,000/month in revenue &mdash; the ROI
              is clear.
            </p>

            {/* Bottom Line */}
            <h2 className="text-2xl font-bold mt-10 mb-4">
              The Bottom Line
            </h2>

            <p className="text-slate-500 leading-relaxed mb-4">
              The average UK small business that implements AI automation sees:
            </p>

            <ul className="text-slate-500 leading-relaxed mb-4 list-disc pl-6 space-y-2">
              <li>
                <strong className="text-slate-900">5&ndash;15 hours/week</strong>{" "}
                saved on admin and manual tasks
              </li>
              <li>
                <strong className="text-slate-900">&pound;800&ndash;2,000/month</strong>{" "}
                in recovered revenue or time savings
              </li>
              <li>
                <strong className="text-slate-900">2&ndash;4 week</strong>{" "}
                payback on setup costs
              </li>
              <li>
                <strong className="text-slate-900">10&ndash;25x annual ROI</strong>{" "}
                on total investment
              </li>
            </ul>

            <p className="text-slate-500 leading-relaxed mb-4">
              These aren&apos;t aspirational numbers. They&apos;re what
              we&apos;re seeing across real client projects in 2026. The
              technology is mature, the costs are low, and the results are
              measurable.
            </p>

            <p className="text-slate-500 leading-relaxed mb-8">
              The only risk is waiting &mdash; because every month without
              automation is another month of lost time and lost revenue that
              you&apos;re never getting back.
            </p>
          </div>

          {/* Related Articles */}
          <div className="mt-12 border border-slate-200 rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4 text-slate-900">Related Articles</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/blog/ai-automation-cost" className="text-blue-600 hover:text-blue-600 transition-colors">
                  How Much Does AI Automation Cost for a Small Business?
                </Link>
              </li>
              <li>
                <Link href="/blog/how-can-ai-help-my-business" className="text-blue-600 hover:text-blue-600 transition-colors">
                  How Can AI Help My Business? 10 Real Examples from UK SMBs
                </Link>
              </li>
              <li>
                <Link href="/blog/what-is-ai-readiness-audit" className="text-blue-600 hover:text-blue-600 transition-colors">
                  What Is an AI Readiness Audit? (And Why It&apos;s Free)
                </Link>
              </li>
              <li>
                <Link href="/services/ai-audit" className="text-slate-500 hover:text-slate-900 transition-colors">
                  View our AI Readiness Audit service &rarr;
                </Link>
              </li>
            </ul>
          </div>

          {/* CTA Section */}
          <div className="mt-16 bg-blue-50 border border-blue-200 rounded-xl p-8 text-center">
            <h3 className="text-xl font-semibold mb-2">
              Get Your Personalised ROI Estimate
            </h3>
            <p className="text-slate-600 mb-6 max-w-lg mx-auto">
              Take our free AI Readiness Audit and we&apos;ll calculate the
              specific ROI for your business &mdash; which tasks to automate
              first, how much you&apos;d save, and how quickly it pays back.
            </p>
            <Link
              href="/audit"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Get Your Free AI Readiness Audit
              <ArrowRight className="w-4 h-4" />
            </Link>
            <p className="text-slate-400 text-sm mt-3">
              Takes 2 minutes. No obligation. Includes personalised savings estimate.
            </p>
          </div>
        </div>
      </article>
    </div>
  );
}
