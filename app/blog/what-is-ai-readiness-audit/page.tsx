import Link from "next/link";
import { ArrowLeft, ArrowRight, Clock } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "What Is an AI Readiness Audit? (And Why It's Free)",
  description:
    "Find out what an AI readiness audit is, what you get, how it works, and why we offer it free. A personalised assessment of where AI can save your business time and money.",
  keywords: [
    "AI readiness audit",
    "free AI audit",
    "AI assessment for business",
    "AI readiness assessment",
    "free AI consultation",
    "business automation audit",
  ],
  openGraph: {
    title: "What Is an AI Readiness Audit? (And Why It's Free)",
    description:
      "A personalised assessment of where AI can save your business time and money. Find out what's included and why it's completely free.",
    type: "article",
    publishedTime: "2026-03-19T00:00:00.000Z",
    authors: ["Olushola Oladipupo"],
  },
  alternates: {
    canonical: "/blog/what-is-ai-readiness-audit",
  },
  twitter: {
    title: "What Is an AI Readiness Audit? (And Why It's Free)",
    description:
      "A personalised assessment of where AI can save your business time and money. Find out what's included and why it's completely free.",
  },
};

const tags = ["AI Audit", "Small Business", "Getting Started", "Guides"];

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
            What Is an AI Readiness Audit? (And Why It&apos;s Free)
          </h1>

          <div className="flex items-center gap-4 text-sm text-slate-400 mb-12">
            <span>19 March 2026</span>
            <span className="text-slate-600">|</span>
            <span>By Olushola Oladipupo</span>
            <span className="text-slate-600">|</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              5 min read
            </span>
          </div>

          <div className="prose prose-slate max-w-none">
            <p className="text-slate-500 leading-relaxed mb-4 text-lg">
              You&apos;ve heard that AI can help your business. You&apos;ve
              read the articles, seen the headlines, maybe even played with
              ChatGPT. But you&apos;re stuck at the same question: &ldquo;Where
              do I actually start?&rdquo;
            </p>

            <p className="text-slate-500 leading-relaxed mb-8">
              That&apos;s exactly what our AI Readiness Audit answers. It&apos;s
              a personalised assessment of your business that tells you
              specifically where AI would make the biggest difference &mdash;
              and it&apos;s completely free. Here&apos;s everything you need
              to know.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4">
              What You Get
            </h2>

            <p className="text-slate-500 leading-relaxed mb-4">
              The AI Readiness Audit is a detailed report covering five
              sections, tailored to your specific business:
            </p>

            <div className="space-y-4 mb-8">
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-5">
                <h3 className="text-lg font-semibold mb-2 text-slate-900">
                  1. Current Operations Assessment
                </h3>
                <p className="text-slate-600 text-sm">
                  We look at how your business currently handles key tasks
                  &mdash; lead response, booking, follow-ups, invoicing,
                  content creation. We identify where you&apos;re spending
                  time on things that could be automated.
                </p>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-lg p-5">
                <h3 className="text-lg font-semibold mb-2 text-slate-900">
                  2. Automation Opportunities
                </h3>
                <p className="text-slate-600 text-sm">
                  Based on your operations, we identify the top 3&ndash;5
                  processes that would benefit most from AI automation. We
                  rank them by impact &mdash; which ones would save you the
                  most time and money.
                </p>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-lg p-5">
                <h3 className="text-lg font-semibold mb-2 text-slate-900">
                  3. Time and Cost Savings Estimate
                </h3>
                <p className="text-slate-600 text-sm">
                  We give you specific numbers. &ldquo;Automating your
                  appointment booking would save approximately 4 hours per
                  week and reduce no-shows by 40&ndash;60%, recovering an
                  estimated &pound;800/month.&rdquo; Real numbers, not vague
                  promises.
                </p>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-lg p-5">
                <h3 className="text-lg font-semibold mb-2 text-slate-900">
                  4. Recommended Solution and Pricing
                </h3>
                <p className="text-slate-600 text-sm">
                  We recommend a specific solution with transparent pricing.
                  You&apos;ll know exactly what it costs to set up and what
                  the monthly fee is. No hidden charges, no surprises.
                </p>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-lg p-5">
                <h3 className="text-lg font-semibold mb-2 text-slate-900">
                  5. Implementation Roadmap
                </h3>
                <p className="text-slate-600 text-sm">
                  A clear, step-by-step plan for how we&apos;d implement the
                  automation. What happens on day 1, day 3, day 7. What
                  we need from you (usually very little). When you&apos;d
                  start seeing results.
                </p>
              </div>
            </div>

            <h2 className="text-2xl font-bold mt-10 mb-4">
              How It Works
            </h2>

            <p className="text-slate-500 leading-relaxed mb-4">
              The process is simple and takes about 2 minutes of your time:
            </p>

            <ul className="mb-6 space-y-2">
              <li className="text-slate-500 ml-6 list-disc">
                <strong className="text-slate-900">Step 1:</strong> Fill in a
                short form about your business &mdash; what you do, how many
                customers you have, what tools you currently use
              </li>
              <li className="text-slate-500 ml-6 list-disc">
                <strong className="text-slate-900">Step 2:</strong> We review
                your answers and research your business (we&apos;ll look at
                your website, Google profile, and online presence)
              </li>
              <li className="text-slate-500 ml-6 list-disc">
                <strong className="text-slate-900">Step 3:</strong> We send
                you a personalised audit report within 48 hours
              </li>
              <li className="text-slate-500 ml-6 list-disc">
                <strong className="text-slate-900">Step 4:</strong> Optionally,
                we jump on a 15-minute call to walk you through the findings
              </li>
            </ul>

            <p className="text-slate-500 leading-relaxed mb-8">
              That&apos;s it. No lengthy consultations. No sales meetings
              disguised as audits. You get a genuinely useful document that
              you can act on with or without us.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4">
              Why Is It Free?
            </h2>

            <p className="text-slate-500 leading-relaxed mb-4">
              Fair question. Here&apos;s the honest answer.
            </p>

            <p className="text-slate-500 leading-relaxed mb-4">
              We&apos;re a growing consultancy, and we&apos;re building our
              portfolio. Every audit we do helps us understand another
              industry, another type of business, another set of challenges.
              That makes us better at what we do.
            </p>

            <p className="text-slate-500 leading-relaxed mb-4">
              Some people who get the audit will want to work with us to
              implement the recommendations. That&apos;s great &mdash;
              that&apos;s how we earn our living. But there&apos;s genuinely
              no obligation. If you take the audit, learn something useful,
              and never contact us again, we&apos;re happy with that.
            </p>

            <p className="text-slate-500 leading-relaxed mb-8">
              We&apos;d rather give away genuine value and build trust than
              try to pressure anyone into buying something they don&apos;t
              need. That&apos;s not how we operate.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4">
              Who Is It For?
            </h2>

            <p className="text-slate-500 leading-relaxed mb-4">
              The AI Readiness Audit is designed for small business owners
              who:
            </p>

            <ul className="mb-6 space-y-2">
              <li className="text-slate-500 ml-6 list-disc">
                Know AI could help their business but don&apos;t know where
                to start
              </li>
              <li className="text-slate-500 ml-6 list-disc">
                Are spending too much time on admin and repetitive tasks
              </li>
              <li className="text-slate-500 ml-6 list-disc">
                Want specific, practical recommendations (not generic
                advice)
              </li>
              <li className="text-slate-500 ml-6 list-disc">
                Want to understand costs before committing to anything
              </li>
              <li className="text-slate-500 ml-6 list-disc">
                Run a service business (trades, hospitality, health, beauty,
                coaching, consulting)
              </li>
            </ul>

            <p className="text-slate-500 leading-relaxed mb-8">
              We&apos;ve done audits for plumbers, salons, restaurants,
              dental practices, coaching businesses, cleaning companies, and
              more. Whatever your industry, if you serve customers and have
              repetitive processes, there are automations that will help.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4">
              What Happens After the Audit?
            </h2>

            <p className="text-slate-500 leading-relaxed mb-4">
              You&apos;ll have a clear report with specific recommendations.
              From there, you have three options:
            </p>

            <ul className="mb-6 space-y-2">
              <li className="text-slate-500 ml-6 list-disc">
                <strong className="text-slate-900">Do nothing</strong> &mdash;
                keep the report as a reference. No hard feelings.
              </li>
              <li className="text-slate-500 ml-6 list-disc">
                <strong className="text-slate-900">DIY it</strong> &mdash; use
                our recommendations to set things up yourself or with another
                provider. The report gives you enough detail to brief anyone.
              </li>
              <li className="text-slate-500 ml-6 list-disc">
                <strong className="text-slate-900">Work with us</strong> &mdash;
                we implement the recommendations for you, typically within 7
                days, starting from &pound;500.
              </li>
            </ul>

            <p className="text-slate-500 leading-relaxed mb-8">
              There&apos;s no pressure to choose option three. The audit is
              genuinely useful regardless of what you do with it.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4">
              Common Questions
            </h2>

            <p className="text-slate-500 leading-relaxed mb-2">
              <strong className="text-slate-900">
                &ldquo;Do I need to know anything about AI?&rdquo;
              </strong>
            </p>
            <p className="text-slate-500 leading-relaxed mb-6">
              Not a thing. The audit is written in plain English. If you can
              describe what your business does, that&apos;s all we need.
            </p>

            <p className="text-slate-500 leading-relaxed mb-2">
              <strong className="text-slate-900">
                &ldquo;How long does it take?&rdquo;
              </strong>
            </p>
            <p className="text-slate-500 leading-relaxed mb-6">
              2 minutes to fill in the form. 48 hours to receive your report.
            </p>

            <p className="text-slate-500 leading-relaxed mb-2">
              <strong className="text-slate-900">
                &ldquo;Will I get spammed with sales emails?&rdquo;
              </strong>
            </p>
            <p className="text-slate-500 leading-relaxed mb-6">
              No. You&apos;ll get your audit report and one follow-up email
              asking if you have questions. That&apos;s it. We don&apos;t do
              email sequences or aggressive sales tactics.
            </p>

            <p className="text-slate-500 leading-relaxed mb-2">
              <strong className="text-slate-900">
                &ldquo;Is this actually free, or will there be hidden
                costs?&rdquo;
              </strong>
            </p>
            <p className="text-slate-500 leading-relaxed mb-8">
              Actually free. No credit card. No commitment. No catch.
            </p>
          </div>

          {/* Related Articles */}
          <div className="mt-12 border border-slate-200 rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4 text-slate-900">Related Articles</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/blog/ai-automation-uk-small-business-guide" className="text-blue-600 hover:text-blue-600 transition-colors">
                  AI Automation for UK Small Businesses: The Complete 2026 Guide
                </Link>
              </li>
              <li>
                <Link href="/blog/how-can-ai-help-my-business" className="text-blue-600 hover:text-blue-600 transition-colors">
                  How Can AI Help My Business? 10 Real Examples from UK SMBs
                </Link>
              </li>
              <li>
                <Link href="/blog/ai-automation-cost" className="text-blue-600 hover:text-blue-600 transition-colors">
                  How Much Does AI Automation Cost for a Small Business?
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
              Ready to Find Out What AI Can Do for Your Business?
            </h3>
            <p className="text-slate-600 mb-6 max-w-lg mx-auto">
              Take the AI Readiness Audit now. 2 minutes of your time for a
              personalised report that could save you hours every week.
            </p>
            <Link
              href="/audit"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Start Your Free AI Readiness Audit
              <ArrowRight className="w-4 h-4" />
            </Link>
            <p className="text-slate-400 text-sm mt-3">
              Free. No obligation. Results in 48 hours.
            </p>
          </div>
        </div>
      </article>
    </div>
  );
}
