import Link from "next/link";
import { ArrowLeft, ArrowRight, Clock } from "lucide-react";
import type { Metadata } from "next";
import JsonLd from "@/components/shared/JsonLd";

export const metadata: Metadata = {
  title: "What It Actually Costs to Run a 63-Agent AI Business",
  description:
    "A transparent breakdown of every tool, API call, and monthly cost behind running 63 AI agents, 2 client dashboards, and 50+ daily automated emails. Real numbers, no fluff.",
  keywords: [
    "AI automation costs",
    "AI agent business costs",
    "AI consulting costs UK",
    "n8n automation costs",
    "Claude API costs",
    "AI business transparency",
    "AI automation agency costs",
  ],
  openGraph: {
    images: [{ url: "https://oladipupoconsulting.co.uk/api/og", width: 1200, height: 630 }],
    title: "What It Actually Costs to Run a 63-Agent AI Business",
    description:
      "A transparent breakdown of every tool, API call, and monthly cost behind running 63 AI agents, 2 client dashboards, and 50+ daily automated emails. Real numbers, no fluff.",
    type: "article",
    publishedTime: "2026-03-25T00:00:00.000Z",
    authors: ["Olushola Oladipupo"],
  },
  alternates: {
    canonical: "/blog/what-it-costs-63-agent-ai-business",
  },
  twitter: {
    title: "What It Actually Costs to Run a 63-Agent AI Business",
    description:
      "A transparent breakdown of every tool, API call, and monthly cost behind running 63 AI agents, 2 client dashboards, and 50+ daily automated emails. Real numbers, no fluff.",
  },
};

const tags = ["Transparency", "AI Automation", "Business Costs", "Behind the Scenes"];

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "What It Actually Costs to Run a 63-Agent AI Business",
  description:
    "A transparent breakdown of every tool, API call, and monthly cost behind running 63 AI agents, 2 client dashboards, and 50+ daily automated emails. Real numbers, no fluff.",
  author: {
    "@type": "Person",
    name: "Olushola Oladipupo",
  },
  publisher: {
    "@type": "Organization",
    name: "Oladipupo Consulting Ltd",
    url: "https://oladipupoconsulting.co.uk",
  },
  datePublished: "2026-03-25",
  dateModified: "2026-03-25",
  mainEntityOfPage:
    "https://oladipupoconsulting.co.uk/blog/what-it-costs-63-agent-ai-business",
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
            What It Actually Costs to Run a 63-Agent AI Business
          </h1>

          <div className="flex items-center gap-4 text-sm text-slate-400 mb-12">
            <span>25 March 2026</span>
            <span className="text-slate-600">|</span>
            <span>By Olushola Oladipupo</span>
            <span className="text-slate-600">|</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />8 min read
            </span>
          </div>

          <div className="prose prose-slate max-w-none">
            {/* Hook */}
            <p className="text-slate-500 leading-relaxed mb-4 text-lg">
              I saw a post from a solo AI consultant this week who shared his
              real monthly costs. Tool subscriptions, API bills, time tracking
              &mdash; the full picture. It got a 70% bookmark rate because
              people are starving for honest numbers in this space.
            </p>

            <p className="text-slate-500 leading-relaxed mb-4">
              His total: roughly &pound;530/month in tools, plus 35 hours of
              non-billable work every month. Content writing, sales calls,
              debugging, admin. When you factor in his time, the real cost is
              well over &pound;2,000/month.
            </p>

            <p className="text-slate-500 leading-relaxed mb-8">
              We run 63 AI agents. Two live client dashboards. A 50-page
              website. Automated outreach, content, QA, and client monitoring.
              Our total monthly cost? About &pound;100&ndash;150.
            </p>

            <p className="text-slate-500 leading-relaxed mb-8">
              Here are the real numbers.
            </p>

            {/* Monthly Costs */}
            <h2 className="text-2xl font-bold mt-10 mb-4">
              The Actual Monthly Bill
            </h2>

            <p className="text-slate-500 leading-relaxed mb-4">
              This is what we pay every month to run the entire business. Not
              projections. Not &ldquo;estimated costs at scale.&rdquo; These are
              the real line items from March 2026.
            </p>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 mb-8">
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-slate-200">
                  <span className="text-slate-500">Vercel Pro (website + dashboards + APIs)</span>
                  <span className="text-slate-900 font-semibold">&pound;16/mo</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-slate-200">
                  <span className="text-slate-500">Claude API (agent fleet + chat widget + reports)</span>
                  <span className="text-slate-900 font-semibold">&pound;50&ndash;100/mo</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-slate-200">
                  <span className="text-slate-500">Zapier (simple client-facing flows)</span>
                  <span className="text-slate-900 font-semibold">&pound;25/mo</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-slate-200">
                  <span className="text-slate-500">n8n Cloud (workflow automation)</span>
                  <span className="text-slate-900 font-semibold">Free tier</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-slate-200">
                  <span className="text-slate-500">Resend (transactional email)</span>
                  <span className="text-slate-900 font-semibold">Free tier</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-slate-200">
                  <span className="text-slate-500">Make.com (mid-complexity workflows)</span>
                  <span className="text-slate-900 font-semibold">Free tier</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-slate-200">
                  <span className="text-slate-500">Beehiiv (newsletter)</span>
                  <span className="text-slate-900 font-semibold">Existing plan</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-slate-200">
                  <span className="text-slate-500">Domains + ScrapeCreators</span>
                  <span className="text-slate-900 font-semibold">~&pound;10/mo</span>
                </div>
                <div className="flex justify-between items-center py-3 mt-2 bg-slate-100/50 rounded-lg px-4">
                  <span className="text-slate-900 font-bold">Total</span>
                  <span className="text-blue-600 font-bold text-lg">&pound;100&ndash;150/mo</span>
                </div>
              </div>
            </div>

            <p className="text-slate-500 leading-relaxed mb-8">
              That is the entire operational cost of an AI automation agency with
              63 agents, two live clients, and a fully automated sales pipeline.
              Not &pound;700/month. Not &pound;2,000. About &pound;125 in an
              average month.
            </p>

            {/* What Those Costs Power */}
            <h2 className="text-2xl font-bold mt-10 mb-4">
              What &pound;150/Month Actually Powers
            </h2>

            <p className="text-slate-500 leading-relaxed mb-4">
              The cost is low. What it runs is not.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-5 text-center">
                <p className="text-3xl font-bold text-blue-600 mb-1">63</p>
                <p className="text-slate-600 text-sm">AI agents running daily</p>
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-5 text-center">
                <p className="text-3xl font-bold text-blue-600 mb-1">2</p>
                <p className="text-slate-600 text-sm">live client dashboards</p>
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-5 text-center">
                <p className="text-3xl font-bold text-blue-600 mb-1">50+</p>
                <p className="text-slate-600 text-sm">emails sent daily on autopilot</p>
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-5 text-center">
                <p className="text-3xl font-bold text-blue-600 mb-1">24/7</p>
                <p className="text-slate-600 text-sm">client workflow monitoring</p>
              </div>
            </div>

            <p className="text-slate-500 leading-relaxed mb-4">
              Here is what runs every day without anyone touching it:
            </p>

            <ul className="space-y-3 mb-8">
              <li className="flex gap-3 text-slate-500">
                <span className="text-blue-600 font-bold shrink-0">&bull;</span>
                <span>
                  <strong className="text-slate-900">Outreach agents</strong> research
                  prospects, draft personalised cold emails, and follow up automatically
                </span>
              </li>
              <li className="flex gap-3 text-slate-500">
                <span className="text-blue-600 font-bold shrink-0">&bull;</span>
                <span>
                  <strong className="text-slate-900">Content agents</strong> write blog
                  posts, social content, and newsletter drafts on a weekly schedule
                </span>
              </li>
              <li className="flex gap-3 text-slate-500">
                <span className="text-blue-600 font-bold shrink-0">&bull;</span>
                <span>
                  <strong className="text-slate-900">QA agents</strong> review every
                  other agent&apos;s output and flag mistakes before they reach
                  clients
                </span>
              </li>
              <li className="flex gap-3 text-slate-500">
                <span className="text-blue-600 font-bold shrink-0">&bull;</span>
                <span>
                  <strong className="text-slate-900">Client monitoring agents</strong>{" "}
                  watch n8n workflows for failures and auto-heal broken steps
                </span>
              </li>
              <li className="flex gap-3 text-slate-500">
                <span className="text-blue-600 font-bold shrink-0">&bull;</span>
                <span>
                  <strong className="text-slate-900">Executive agents</strong> run
                  weekly strategy reviews, pipeline reports, and performance analysis
                </span>
              </li>
              <li className="flex gap-3 text-slate-500">
                <span className="text-blue-600 font-bold shrink-0">&bull;</span>
                <span>
                  <strong className="text-slate-900">A 24/7 AI chat widget</strong>{" "}
                  answers visitor questions on the website, qualifies leads, and
                  directs them to booking
                </span>
              </li>
            </ul>

            {/* Solo Consultant Comparison */}
            <h2 className="text-2xl font-bold mt-10 mb-4">
              The Solo Consultant Comparison
            </h2>

            <p className="text-slate-500 leading-relaxed mb-4">
              The consultant whose post inspired this one is doing good work. He
              is transparent about his costs, which is rare. But the comparison
              is worth making because it shows what automation of your own
              business actually looks like.
            </p>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-3">
                    Solo Consultant Model
                  </h3>
                  <ul className="space-y-2 text-slate-500 text-sm">
                    <li className="flex gap-2">
                      <span className="text-slate-400">&bull;</span>
                      Tool subscriptions: ~&pound;530/month
                    </li>
                    <li className="flex gap-2">
                      <span className="text-slate-400">&bull;</span>
                      35 hours/month non-billable work
                    </li>
                    <li className="flex gap-2">
                      <span className="text-slate-400">&bull;</span>
                      Content written manually (8 hours/month)
                    </li>
                    <li className="flex gap-2">
                      <span className="text-slate-400">&bull;</span>
                      Sales and proposals done by hand (6 hours/month)
                    </li>
                    <li className="flex gap-2">
                      <span className="text-slate-400">&bull;</span>
                      Infrastructure debugging: 8 hours/month
                    </li>
                    <li className="flex gap-2">
                      <span className="text-slate-400">&bull;</span>
                      Real cost at &pound;75/hr: &pound;2,625+ hidden in time
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-3">
                    Our Model (63 Agents)
                  </h3>
                  <ul className="space-y-2 text-slate-500 text-sm">
                    <li className="flex gap-2">
                      <span className="text-blue-600">&bull;</span>
                      Tool subscriptions: ~&pound;150/month
                    </li>
                    <li className="flex gap-2">
                      <span className="text-blue-600">&bull;</span>
                      Non-billable hours handled by agents
                    </li>
                    <li className="flex gap-2">
                      <span className="text-blue-600">&bull;</span>
                      Content written by a 3-agent fleet (Mon/Tue/Wed)
                    </li>
                    <li className="flex gap-2">
                      <span className="text-blue-600">&bull;</span>
                      Outreach automated: research, draft, follow-up
                    </li>
                    <li className="flex gap-2">
                      <span className="text-blue-600">&bull;</span>
                      Self-healing workflows with auto-monitoring
                    </li>
                    <li className="flex gap-2">
                      <span className="text-blue-600">&bull;</span>
                      Real cost: &pound;150/month. That is the actual number.
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <p className="text-slate-500 leading-relaxed mb-8">
              Same revenue potential. Same types of clients. But in one model,
              the founder is the bottleneck. In the other, agents handle the
              repetitive work and the founder focuses on clients and strategy.
            </p>

            {/* Unit Economics */}
            <h2 className="text-2xl font-bold mt-10 mb-4">
              What Clients Pay vs What It Costs Us to Deliver
            </h2>

            <p className="text-slate-500 leading-relaxed mb-4">
              This is the part most agencies will not share. Here is our actual
              unit economics for a Starter-tier client.
            </p>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 mb-6 space-y-4">
              <div>
                <p className="text-slate-500">
                  <strong className="text-slate-900">
                    What the client pays:
                  </strong>{" "}
                  &pound;500 setup + &pound;50/month retainer
                </p>
              </div>
              <div>
                <p className="text-slate-500">
                  <strong className="text-slate-900">
                    What they get:
                  </strong>{" "}
                  AI systems that save 5+ hours a week &mdash; lead capture,
                  qualification logic, calendar booking, follow-up sequences, a
                  KPI dashboard, and a full SOP handover
                </p>
              </div>
              <div>
                <p className="text-slate-500">
                  <strong className="text-slate-900">
                    Our cost to deliver:
                  </strong>{" "}
                  Roughly &pound;4 in API calls + agent time for the monthly
                  retainer work
                </p>
              </div>
              <div>
                <p className="text-slate-500">
                  <strong className="text-slate-900">Gross margin:</strong>{" "}
                  90%+ on the retainer
                </p>
              </div>
            </div>

            <p className="text-slate-500 leading-relaxed mb-4">
              The setup has a higher real cost because it involves human time
              &mdash; discovery calls, process mapping, building the initial
              workflows. But the ongoing retainer is almost entirely automated.
              Monitoring, QA, health checks, and optimisation are all handled by
              agents.
            </p>

            <p className="text-slate-500 leading-relaxed mb-8">
              We also offer Growth (&pound;1,500 + &pound;150/month) and Scale
              (&pound;3,500 + &pound;350/month) tiers for businesses that need
              more complex automation. The margins are similar. The delivery cost
              scales slowly because agents handle the recurring work.
            </p>

            {/* Honest Parts */}
            <h2 className="text-2xl font-bold mt-10 mb-4">
              The Honest Parts
            </h2>

            <p className="text-slate-500 leading-relaxed mb-4">
              These numbers are real, but they do not tell the whole story. Here
              is what the cost table does not capture.
            </p>

            <ul className="space-y-3 mb-8">
              <li className="flex gap-3 text-slate-500">
                <span className="text-blue-600 font-bold shrink-0">&bull;</span>
                <span>
                  <strong className="text-slate-900">
                    Claude API costs spike during heavy builds.
                  </strong>{" "}
                  When we are building a new client system from scratch or
                  generating detailed audit reports, the API bill can jump
                  significantly for that week. The &pound;50&ndash;100 range is a
                  steady-state average, not a ceiling.
                </span>
              </li>
              <li className="flex gap-3 text-slate-500">
                <span className="text-blue-600 font-bold shrink-0">&bull;</span>
                <span>
                  <strong className="text-slate-900">
                    Vercel has usage limits we have hit.
                  </strong>{" "}
                  We are on the Pro plan at &pound;16/month. We have had to be
                  deliberate about batching deployments and managing function
                  timeouts. Every deploy costs against a monthly credit budget.
                </span>
              </li>
              <li className="flex gap-3 text-slate-500">
                <span className="text-blue-600 font-bold shrink-0">&bull;</span>
                <span>
                  <strong className="text-slate-900">
                    Agents still make mistakes.
                  </strong>{" "}
                  Our QA Lead agent runs nightly and catches issues before they
                  reach clients. But it is not perfect. We have had false alarms,
                  missed edge cases, and outputs that needed human correction.
                  The system improves every week, but it is not zero-maintenance.
                </span>
              </li>
              <li className="flex gap-3 text-slate-500">
                <span className="text-blue-600 font-bold shrink-0">&bull;</span>
                <span>
                  <strong className="text-slate-900">
                    It took months to build all 63 agents.
                  </strong>{" "}
                  The &pound;150/month cost today is the result of hundreds of
                  hours of building, testing, breaking, and rebuilding. Each
                  agent has a skill file, evaluation criteria, and scheduled
                  runs. That infrastructure was not cheap to create &mdash; it
                  was cheap in money, expensive in time.
                </span>
              </li>
              <li className="flex gap-3 text-slate-500">
                <span className="text-blue-600 font-bold shrink-0">&bull;</span>
                <span>
                  <strong className="text-slate-900">
                    Free tiers will not last forever.
                  </strong>{" "}
                  We are leaning on n8n Cloud free tier, Resend free tier, and
                  Make.com free tier. As client volume grows, some of these will
                  become paid subscriptions. The costs will go up. But so will
                  the revenue.
                </span>
              </li>
            </ul>

            {/* Why Transparency Matters */}
            <h2 className="text-2xl font-bold mt-10 mb-4">
              Why We Are Sharing This
            </h2>

            <p className="text-slate-500 leading-relaxed mb-4">
              Most AI agencies talk about &ldquo;cutting-edge solutions&rdquo;
              and &ldquo;transformational results.&rdquo; They do not tell you
              what it actually costs them to deliver. That makes it hard for
              small business owners to know if they are overpaying &mdash; or
              underpaying for something that will break.
            </p>

            <p className="text-slate-500 leading-relaxed mb-4">
              We are a small operation. Two people and 63 agents. We keep costs
              low because we automate our own business first, then apply the
              same thinking to clients. If we cannot make it work for ourselves,
              we do not sell it.
            </p>

            <p className="text-slate-500 leading-relaxed mb-8">
              The numbers above are real. We will update this post quarterly as
              costs change. Transparency is not a marketing tactic here &mdash;
              it is how we build trust with the kind of business owners who are
              tired of being sold to.
            </p>

            {/* CTA */}
            <hr className="border-slate-200 my-10" />

            <h2 className="text-2xl font-bold mt-8 mb-4">What to Do Next</h2>

            <p className="text-slate-500 leading-relaxed mb-4">
              If you are running a small business and wondering whether AI
              automation is worth the investment, start with numbers &mdash; not
              promises. Take our free{" "}
              <Link
                href="/audit"
                className="text-blue-600 hover:text-blue-600 transition-colors"
              >
                AI readiness audit
              </Link>
              . It takes 10 seconds and gives you a personalised score based on
              your specific business.
            </p>

            <p className="text-slate-500 leading-relaxed mb-4">
              Or read how we applied this to a real client:{" "}
              <Link
                href="/blog/bakery-saved-15-hours-ai"
                className="text-blue-600 hover:text-blue-600 transition-colors"
              >
                a London bakery that saved 15+ hours a week
              </Link>{" "}
              with the same approach.
            </p>

            <p className="text-slate-500 leading-relaxed mb-8">
              If you want to talk specifics,{" "}
              <Link
                href="https://cal.com/sholastechnotes/free-ai-strategy-call"
                className="text-blue-600 hover:text-blue-600 transition-colors"
              >
                book a free strategy call
              </Link>
              . No pitch. Just an honest look at where automation would save you
              time and what it would actually cost.
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
                  href="/blog/bakery-saved-15-hours-ai"
                  className="text-blue-600 hover:text-blue-600 transition-colors"
                >
                  How a London Bakery Saved 15+ Hours a Week With AI
                </Link>
              </li>
              <li>
                <Link
                  href="/blog/ai-automation-cost"
                  className="text-blue-600 hover:text-blue-600 transition-colors"
                >
                  How Much Does AI Automation Cost for a Small Business?
                </Link>
              </li>
              <li>
                <Link
                  href="/blog/ai-automation-roi-calculator"
                  className="text-blue-600 hover:text-blue-600 transition-colors"
                >
                  AI Automation ROI: How Much Can Your Business Actually Save?
                </Link>
              </li>
              <li>
                <Link
                  href="/blog/n8n-vs-zapier-vs-make"
                  className="text-blue-600 hover:text-blue-600 transition-colors"
                >
                  n8n vs Zapier vs Make: Best for UK Business?
                </Link>
              </li>
            </ul>
          </div>

          {/* CTA Section */}
          <div className="mt-16 bg-blue-50 border border-blue-200 rounded-xl p-8 text-center">
            <h3 className="text-xl font-semibold mb-2">
              Curious What AI Could Save Your Business?
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
              href="/blog/bakery-saved-15-hours-ai"
              className="text-slate-600 hover:text-slate-900 transition-colors text-sm flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              London Bakery Case Study
            </Link>
            <Link
              href="/blog/ai-automation-cost"
              className="text-slate-600 hover:text-slate-900 transition-colors text-sm flex items-center gap-2"
            >
              AI Automation Costs
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}
