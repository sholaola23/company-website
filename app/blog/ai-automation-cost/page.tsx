import Link from "next/link";
import { ArrowLeft, ArrowRight, Clock } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How Much Does AI Automation Cost for a Small Business?",
  description:
    "Honest pricing breakdown for AI automation for small businesses. Compare DIY, freelancer, agency, and specialist costs. See real ROI numbers and find out what you'd actually pay.",
  keywords: [
    "AI automation cost small business",
    "how much does automation cost",
    "AI pricing",
    "AI automation pricing UK",
    "small business automation cost",
    "AI ROI small business",
  ],
  openGraph: {
    title: "How Much Does AI Automation Cost for a Small Business?",
    description:
      "An honest pricing guide for AI automation. Compare options, see real ROI numbers, and find out what small businesses actually pay.",
    type: "article",
    publishedTime: "2026-03-19T00:00:00.000Z",
    authors: ["Olushola Oladipupo"],
  },
  alternates: {
    canonical: "/blog/ai-automation-cost",
  },
  twitter: {
    title: "How Much Does AI Automation Cost for a Small Business?",
    description:
      "An honest pricing guide for AI automation. Compare options, see real ROI numbers, and find out what small businesses actually pay.",
  },
};

const tags = ["AI Automation", "Pricing", "Small Business", "Guides"];

export default function BlogPost() {
  return (
    <div className="min-h-screen">
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
            How Much Does AI Automation Cost for a Small Business?
          </h1>

          <div className="flex items-center gap-4 text-sm text-zinc-500 mb-12">
            <span>19 March 2026</span>
            <span className="text-zinc-700">|</span>
            <span>By Olushola Oladipupo</span>
            <span className="text-zinc-700">|</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              7 min read
            </span>
          </div>

          <div className="prose prose-invert max-w-none">
            <p className="text-zinc-300 leading-relaxed mb-4 text-lg">
              &ldquo;It sounds great, but what does it actually cost?&rdquo;
              That&apos;s the question we hear most from small business
              owners. And honestly, the AI industry has done a terrible job of
              giving straight answers.
            </p>

            <p className="text-zinc-300 leading-relaxed mb-8">
              So here&apos;s an honest, transparent breakdown of what AI
              automation actually costs for small businesses in 2026 &mdash;
              and more importantly, what it&apos;s worth.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4">
              The Four Routes to AI Automation
            </h2>

            <p className="text-zinc-300 leading-relaxed mb-6">
              There are essentially four ways to get AI automation into your
              business. Each has different costs, timelines, and trade-offs.
            </p>

            <div className="overflow-x-auto mb-8">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-zinc-800">
                    <th className="text-left py-3 px-4 text-zinc-400 font-medium">
                      Route
                    </th>
                    <th className="text-left py-3 px-4 text-zinc-400 font-medium">
                      Setup Cost
                    </th>
                    <th className="text-left py-3 px-4 text-zinc-400 font-medium">
                      Monthly
                    </th>
                    <th className="text-left py-3 px-4 text-zinc-400 font-medium">
                      Timeline
                    </th>
                  </tr>
                </thead>
                <tbody className="text-zinc-300">
                  <tr className="border-b border-zinc-800/50">
                    <td className="py-3 px-4 font-medium text-zinc-100">
                      DIY (ChatGPT + Zapier)
                    </td>
                    <td className="py-3 px-4">&pound;0&ndash;50</td>
                    <td className="py-3 px-4">&pound;20&ndash;100</td>
                    <td className="py-3 px-4">Weeks to months</td>
                  </tr>
                  <tr className="border-b border-zinc-800/50">
                    <td className="py-3 px-4 font-medium text-zinc-100">
                      Freelancer
                    </td>
                    <td className="py-3 px-4">&pound;300&ndash;1,500</td>
                    <td className="py-3 px-4">&pound;50&ndash;200</td>
                    <td className="py-3 px-4">2&ndash;4 weeks</td>
                  </tr>
                  <tr className="border-b border-zinc-800/50">
                    <td className="py-3 px-4 font-medium text-zinc-100">
                      Traditional agency
                    </td>
                    <td className="py-3 px-4">&pound;5,000&ndash;25,000+</td>
                    <td className="py-3 px-4">&pound;500&ndash;2,000+</td>
                    <td className="py-3 px-4">4&ndash;12 weeks</td>
                  </tr>
                  <tr className="border-b border-zinc-800/50 bg-blue-500/5">
                    <td className="py-3 px-4 font-medium text-blue-400">
                      AI automation specialist (us)
                    </td>
                    <td className="py-3 px-4 text-zinc-100">
                      From &pound;500
                    </td>
                    <td className="py-3 px-4 text-zinc-100">
                      From &pound;50
                    </td>
                    <td className="py-3 px-4 text-zinc-100">7 days</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 className="text-2xl font-bold mt-10 mb-4">
              Route 1: DIY
            </h2>

            <p className="text-zinc-300 leading-relaxed mb-4">
              You can absolutely build basic automations yourself using tools
              like ChatGPT, Zapier, or Make.com. The upfront cost is
              negligible &mdash; most tools have free tiers.
            </p>

            <p className="text-zinc-300 leading-relaxed mb-4">
              The hidden cost is your time. Most small business owners spend
              20&ndash;40 hours learning the tools, building something basic,
              and then troubleshooting when it breaks. If your time is worth
              &pound;30 an hour, that &ldquo;free&rdquo; automation just cost
              you &pound;600&ndash;1,200.
            </p>

            <p className="text-zinc-300 leading-relaxed mb-8">
              DIY works well for very simple tasks &mdash; like automatically
              saving email attachments to a folder. For anything involving
              customer communication, we&apos;d recommend getting help.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4">
              Route 2: Freelancer
            </h2>

            <p className="text-zinc-300 leading-relaxed mb-4">
              Hiring a freelancer from platforms like Upwork or Fiverr can
              work for one-off automations. Prices range from &pound;300 for
              simple workflows to &pound;1,500 for more complex setups.
            </p>

            <p className="text-zinc-300 leading-relaxed mb-8">
              The risk? Quality varies enormously. Some freelancers build
              robust systems. Others build something that works for a week
              then breaks. And when it breaks at 9pm on a Friday, you&apos;re
              on your own. Ongoing support is rarely included.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4">
              Route 3: Traditional Agency
            </h2>

            <p className="text-zinc-300 leading-relaxed mb-4">
              Digital agencies offer comprehensive automation solutions, but
              they&apos;re priced for medium-to-large businesses. A typical
              project starts at &pound;5,000 and can easily reach
              &pound;25,000 or more.
            </p>

            <p className="text-zinc-300 leading-relaxed mb-8">
              You get excellent quality, but the timelines are long (8&ndash;12
              weeks is common) and the cost is out of reach for most small
              businesses. If you&apos;re a 5-person cleaning company, a
              &pound;15,000 automation project doesn&apos;t make sense.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4">
              Route 4: AI Automation Specialist
            </h2>

            <p className="text-zinc-300 leading-relaxed mb-4">
              This is what we do at Oladipupo Consulting. We specialise in AI
              automation for small businesses, which means our pricing and
              processes are designed specifically for you.
            </p>

            <p className="text-zinc-300 leading-relaxed mb-4">
              Our pricing works in three tiers:
            </p>

            <div className="space-y-4 mb-8">
              <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-5">
                <h3 className="text-lg font-semibold mb-2 text-zinc-100">
                  Starter &mdash; &pound;500 + &pound;50/month
                </h3>
                <p className="text-zinc-400 text-sm">
                  One core automation (e.g. appointment booking, email
                  auto-responses, or review collection). Perfect for
                  businesses just getting started with AI. Delivered in 7
                  days.
                </p>
              </div>

              <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-5">
                <h3 className="text-lg font-semibold mb-2 text-zinc-100">
                  Growth &mdash; &pound;1,500 + &pound;150/month
                </h3>
                <p className="text-zinc-400 text-sm">
                  Multiple connected automations (e.g. lead capture +
                  qualification + booking + follow-up). Includes a KPI
                  dashboard so you can see exactly what&apos;s working.
                  Delivered in 7&ndash;10 days.
                </p>
              </div>

              <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-5">
                <h3 className="text-lg font-semibold mb-2 text-zinc-100">
                  Scale &mdash; &pound;3,500 + &pound;350/month
                </h3>
                <p className="text-zinc-400 text-sm">
                  Full business automation suite with AI agents, custom
                  integrations, and ongoing optimisation. For businesses
                  ready to fully automate their operations.
                </p>
              </div>
            </div>

            <h2 className="text-2xl font-bold mt-10 mb-4">
              But What&apos;s the ROI?
            </h2>

            <p className="text-zinc-300 leading-relaxed mb-4">
              Cost means nothing without context. The real question is: what
              do you get back?
            </p>

            <p className="text-zinc-300 leading-relaxed mb-4">
              Here are real examples from businesses similar to yours:
            </p>

            <ul className="mb-6 space-y-2">
              <li className="text-zinc-300 ml-6 list-disc">
                A <strong className="text-zinc-100">plumber</strong> recovered
                &pound;1,400/month in lost quotes with automated follow-ups
                (&pound;500 setup)
              </li>
              <li className="text-zinc-300 ml-6 list-disc">
                A <strong className="text-zinc-100">salon</strong> reduced
                no-shows by 50%, saving &pound;600/month (&pound;500 setup)
              </li>
              <li className="text-zinc-300 ml-6 list-disc">
                A <strong className="text-zinc-100">cleaning company</strong>{" "}
                automated lead response and booking, adding &pound;2,200/month
                in new revenue (&pound;1,500 setup)
              </li>
              <li className="text-zinc-300 ml-6 list-disc">
                A <strong className="text-zinc-100">restaurant</strong> saved
                &pound;800/month in delivery platform fees by switching to
                WhatsApp ordering (&pound;1,500 setup)
              </li>
            </ul>

            <p className="text-zinc-300 leading-relaxed mb-4">
              In every case, the automation paid for itself within 1&ndash;2
              months. After that, it&apos;s pure profit.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4">
              The Cost of Doing Nothing
            </h2>

            <p className="text-zinc-300 leading-relaxed mb-4">
              Here&apos;s the number people forget to calculate. If you&apos;re
              spending 10 hours a week on tasks that could be automated, and
              your time is worth &pound;25/hour, that&apos;s &pound;250/week.
              That&apos;s &pound;13,000 a year.
            </p>

            <p className="text-zinc-300 leading-relaxed mb-4">
              Add the missed leads, the lost revenue from no-shows, and the
              customers who called your competitor because you didn&apos;t
              respond fast enough &mdash; and the real cost of not automating
              is far higher than the cost of doing it.
            </p>

            <p className="text-zinc-300 leading-relaxed mb-8">
              You don&apos;t need to automate everything at once. Start with
              one thing that costs you the most time or money, prove the ROI,
              and build from there.
            </p>
          </div>

          {/* Related Articles */}
          <div className="mt-12 border border-zinc-800 rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4 text-zinc-100">Related Articles</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/blog/ai-automation-roi-calculator" className="text-blue-400 hover:text-blue-300 transition-colors">
                  AI Automation ROI: How Much Can Your Business Actually Save?
                </Link>
              </li>
              <li>
                <Link href="/blog/5-ways-ai-saves-time" className="text-blue-400 hover:text-blue-300 transition-colors">
                  5 Ways AI Can Save Your Small Business 10+ Hours a Week
                </Link>
              </li>
              <li>
                <Link href="/blog/n8n-vs-zapier-vs-make" className="text-blue-400 hover:text-blue-300 transition-colors">
                  n8n vs Zapier vs Make: Which Automation Tool for Your UK Business?
                </Link>
              </li>
              <li>
                <Link href="/services/custom-build" className="text-zinc-300 hover:text-white transition-colors">
                  View our Custom Automation Build service &rarr;
                </Link>
              </li>
            </ul>
          </div>

          {/* CTA Section */}
          <div className="mt-16 bg-gradient-to-br from-blue-500/10 to-zinc-900 border border-zinc-800 rounded-xl p-8 text-center">
            <h3 className="text-xl font-semibold mb-2">
              Want to Know Exactly What AI Would Cost for Your Business?
            </h3>
            <p className="text-zinc-400 mb-6 max-w-lg mx-auto">
              Take our free AI Readiness Audit. We&apos;ll assess your
              current operations and give you a specific recommendation with
              clear pricing &mdash; no surprises.
            </p>
            <Link
              href="/audit"
              className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Get Your Free AI Readiness Audit
              <ArrowRight className="w-4 h-4" />
            </Link>
            <p className="text-zinc-500 text-sm mt-3">
              Takes 2 minutes. You&apos;ll get exact pricing for your
              situation.
            </p>
          </div>
        </div>
      </article>
    </div>
  );
}
