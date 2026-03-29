import Link from "next/link";
import { ArrowLeft, ArrowRight, Clock } from "lucide-react";
import type { Metadata } from "next";
import JsonLd from "@/components/shared/JsonLd";

export const metadata: Metadata = {
  title: "1 in 5 Small Businesses Are Good at AI",
  description:
    "98% of small businesses say they use AI daily, but only 14% have embedded it into operations. Find out if you are in the 86% — and how to close the gap.",
  keywords: [
    "small business AI adoption",
    "AI for small business UK",
    "AI ROI small business",
    "embedded AI operations",
    "AI readiness",
  ],
  openGraph: {
    images: [{ url: "https://oladipupoconsulting.co.uk/api/og", width: 1200, height: 630 }],
    title: "1 in 5 Small Businesses Are Good at AI",
    description:
      "98% of small businesses say they use AI daily, but only 14% have embedded it into operations. Find out if you are in the 86% — and how to close the gap.",
    type: "article",
    publishedTime: "2026-03-24T00:00:00.000Z",
    authors: ["Olushola Oladipupo"],
  },
  alternates: {
    canonical: "/blog/small-business-ai-adoption",
  },
  twitter: {
    title: "1 in 5 Small Businesses Are Good at AI",
    description:
      "98% of small businesses say they use AI daily, but only 14% have embedded it into operations. Find out if you are in the 86% — and how to close the gap.",
  },
};

const tags = ["AI Adoption", "Small Business", "AI Strategy", "UK Business"];

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline:
    "Fewer Than 1 in 5 Small Businesses Are Actually Good at AI — Are You One of Them?",
  description:
    "98% of small businesses say they use AI daily, but only 14% have embedded it into operations. Find out if you are in the 86% — and how to close the gap.",
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
    "https://oladipupoconsulting.co.uk/blog/small-business-ai-adoption",
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
            Fewer Than 1 in 5 Small Businesses Are Actually Good at AI &mdash;
            Are You One of Them?
          </h1>

          <div className="flex items-center gap-4 text-sm text-slate-400 mb-12">
            <span>24 March 2026</span>
            <span className="text-slate-600">|</span>
            <span>By Olushola Oladipupo</span>
            <span className="text-slate-600">|</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />4 min read
            </span>
          </div>

          <div className="prose prose-slate max-w-none">
            {/* Hook */}
            <p className="text-slate-500 leading-relaxed mb-4 text-lg">
              98% of small business owners say they use AI daily.
            </p>

            <p className="text-slate-500 leading-relaxed mb-4 text-lg">
              Only 14% have actually embedded it into their operations.
            </p>

            <p className="text-slate-500 leading-relaxed mb-8">
              Those two numbers &mdash; published by Fortune in March 2026
              &mdash; explain most of what goes wrong when business owners tell
              us AI is not working for them.
            </p>

            {/* What Using AI Means */}
            <h2 className="text-2xl font-bold mt-10 mb-4">
              What &ldquo;Using AI&rdquo; Actually Means
            </h2>

            <p className="text-slate-500 leading-relaxed mb-4">
              &ldquo;Using AI&rdquo; in 2026 often means: ChatGPT for the
              occasional email. An AI image tool for social graphics. Maybe a
              chatbot on the website that nobody monitors.
            </p>

            <p className="text-slate-500 leading-relaxed mb-4">
              That is not wrong. But it is not embedded.
            </p>

            <p className="text-slate-500 leading-relaxed mb-4">
              Embedded AI means AI is running parts of your business whether you
              are at your desk or not. Lead enquiries get responded to
              automatically. Appointment reminders go out without you triggering
              them. Documents get chased. Follow-ups get sent. Your calendar
              fills.
            </p>

            <p className="text-slate-500 leading-relaxed mb-8">
              The difference matters. 56% of small businesses using AI see zero
              measurable return on investment. At the same time, 91% believe AI
              is vital for future growth. The gap between belief and outcome
              exists almost entirely because most businesses are experimenting
              with AI, not operating with it.
            </p>

            {/* Why Businesses Stay */}
            <h2 className="text-2xl font-bold mt-10 mb-4">
              Why Most Businesses Stay in Experimentation Mode
            </h2>

            <p className="text-slate-500 leading-relaxed mb-8">
              It is not a lack of motivation. It is that the tools do not come
              pre-configured for your business. ChatGPT does not know your
              booking process, your qualification questions, or your follow-up
              sequence. Using it occasionally is easy. Building a system around
              your specific workflows takes time and technical know-how most
              business owners simply do not have spare. That is the gap we exist
              to close.
            </p>

            {/* Key Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-5 text-center">
                <p className="text-3xl font-bold text-blue-600 mb-1">14%</p>
                <p className="text-slate-600 text-sm">
                  have embedded AI into operations
                </p>
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-5 text-center">
                <p className="text-3xl font-bold text-blue-600 mb-1">56%</p>
                <p className="text-slate-600 text-sm">
                  see zero ROI from AI so far
                </p>
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-5 text-center">
                <p className="text-3xl font-bold text-blue-600 mb-1">91%</p>
                <p className="text-slate-600 text-sm">
                  believe AI is vital for growth
                </p>
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-5 text-center">
                <p className="text-3xl font-bold text-blue-600 mb-1">98%</p>
                <p className="text-slate-600 text-sm">
                  claim to use AI daily
                </p>
              </div>
            </div>

            {/* 3 Questions */}
            <h2 className="text-2xl font-bold mt-10 mb-4">
              3 Questions to Honestly Check Where You Stand
            </h2>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 mb-8 space-y-4">
              <div className="flex gap-4">
                <span className="text-blue-600 font-bold text-lg shrink-0">
                  1.
                </span>
                <p className="text-slate-500">
                  If you went away for a week with no internet, would your
                  business still capture and respond to new leads?
                </p>
              </div>
              <div className="flex gap-4">
                <span className="text-blue-600 font-bold text-lg shrink-0">
                  2.
                </span>
                <p className="text-slate-500">
                  Are client follow-ups sent because a system sends them &mdash;
                  or because you remember to?
                </p>
              </div>
              <div className="flex gap-4">
                <span className="text-blue-600 font-bold text-lg shrink-0">
                  3.
                </span>
                <p className="text-slate-500">
                  Is there AI touching any part of your operation today that you
                  did not personally trigger?
                </p>
              </div>
            </div>

            <p className="text-slate-500 leading-relaxed mb-8">
              If the answer to any of those is &ldquo;no&rdquo; or
              &ldquo;sometimes&rdquo; &mdash; you are in the 86%. That is not a
              criticism. It is a starting point.
            </p>

            {/* Gap is Fixable */}
            <h2 className="text-2xl font-bold mt-10 mb-4">
              The Gap Is Fixable &mdash; Faster Than You Think
            </h2>

            <p className="text-slate-500 leading-relaxed mb-4">
              Moving from &ldquo;using AI occasionally&rdquo; to &ldquo;AI
              running parts of our operation&rdquo; does not require a tech team
              or a large budget. It requires someone to build the right system
              for your specific workflows.
            </p>

            <p className="text-slate-500 leading-relaxed mb-8">
              Start by finding out where your biggest gap is. Our free{" "}
              <Link
                href="/audit"
                className="text-blue-600 hover:text-blue-600 transition-colors"
              >
                AI readiness audit
              </Link>{" "}
              takes 10 seconds and gives you a specific score with tailored
              recommendations for your business.
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
                  href="/blog/what-is-ai-readiness-audit"
                  className="text-blue-600 hover:text-blue-600 transition-colors"
                >
                  What Is an AI Readiness Audit? (And Why It&apos;s Free)
                </Link>
              </li>
              <li>
                <Link
                  href="/blog/how-can-ai-help-my-business"
                  className="text-blue-600 hover:text-blue-600 transition-colors"
                >
                  How Can AI Help My Business? 10 Real Examples
                </Link>
              </li>
              <li>
                <Link
                  href="/blog/ai-automation-roi-calculator"
                  className="text-blue-600 hover:text-blue-600 transition-colors"
                >
                  AI Automation ROI: How Much Can Your Business Save?
                </Link>
              </li>
              <li>
                <Link
                  href="/audit"
                  className="text-slate-500 hover:text-slate-900 transition-colors"
                >
                  Take the free AI Readiness Audit &rarr;
                </Link>
              </li>
            </ul>
          </div>

          {/* CTA Section */}
          <div className="mt-16 bg-blue-50 border border-blue-200 rounded-xl p-8 text-center">
            <h3 className="text-xl font-semibold mb-2">
              Find Out Where Your Business Actually Stands
            </h3>
            <p className="text-slate-600 mb-6 max-w-lg mx-auto">
              Take our free AI Readiness Audit. In 2 minutes, you&apos;ll get a
              specific score and tailored recommendations &mdash; no sales call
              required.
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
              href="/blog/ai-accountants-save-20-hours"
              className="text-slate-600 hover:text-slate-900 transition-colors text-sm flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              AI for UK Accountants
            </Link>
            <Link
              href="/blog/before-after-automated-lead-response"
              className="text-slate-600 hover:text-slate-900 transition-colors text-sm flex items-center gap-2"
            >
              Automated Lead Response
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}
