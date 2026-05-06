import Link from "next/link";
import { ArrowLeft, ArrowRight, Clock } from "lucide-react";
import type { Metadata } from "next";
import JsonLd from "@/components/shared/JsonLd";

export const metadata: Metadata = {
  title: "AI Automation Agency vs DIY: Which Is Right for Your Business?",
  description:
    "Compare hiring an AI automation agency vs building it yourself. Honest cost, time, and outcome breakdown for small business owners in the UK.",
  keywords: [
    "AI automation agency vs DIY",
    "hire AI agency or do it yourself",
    "AI automation for small business",
    "done for you AI automation",
    "build AI automation yourself",
  ],
  openGraph: {
    images: [{ url: "https://workcrew.io/api/og", width: 1200, height: 630 }],
    title: "AI Automation Agency vs DIY: Which Is Right for Your Business?",
    description:
      "Compare hiring an AI automation agency vs building it yourself. Honest cost, time, and outcome breakdown for small business owners.",
    type: "article",
    publishedTime: "2026-03-27T00:00:00.000Z",
    authors: ["Olushola Oladipupo"],
  },
  alternates: {
    canonical: "/blog/ai-automation-agency-vs-diy",
  },
};

const tags = ["AI Automation", "Comparison", "Getting Started", "Strategy"];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Is it cheaper to build AI automation myself or hire an agency?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "DIY is cheaper upfront (£0-50/month for tools) but costs more in time — typically 40-80 hours of learning and building. An agency charges £500-3,500 for setup but delivers in 5-14 days with ongoing support. For most small businesses, the agency route is cheaper when you factor in the value of your time.",
      },
    },
    {
      "@type": "Question",
      name: "What AI tools can I set up myself without technical skills?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Zapier and ChatGPT are the easiest DIY options. You can set up basic email auto-responders, form notifications, and simple chatbots without coding. However, multi-step workflows with payment matching, calendar booking, and CRM integration typically require technical expertise or an agency.",
      },
    },
    {
      "@type": "Question",
      name: "How do I know if my business needs a done-for-you AI agency?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You likely need an agency if: you're losing leads to slow follow-up, you spend 5+ hours per week on repetitive admin, you've tried DIY tools and got stuck, or your automation needs to connect multiple systems (calendar, payments, CRM, WhatsApp). If your needs are simple — like auto-forwarding emails — DIY is fine.",
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
            AI Automation Agency vs DIY: Which Is Right for Your Business?
          </h1>

          <div className="flex items-center gap-4 text-sm text-[var(--color-muted)] mb-12">
            <span>27 March 2026</span>
            <span className="text-[var(--color-body)]">|</span>
            <span>By Olushola Oladipupo</span>
            <span className="text-[var(--color-body)]">|</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              8 min read
            </span>
          </div>

          <div className="prose prose-slate max-w-none">
            <p className="text-[var(--color-muted)] leading-relaxed mb-4 text-lg">
              <strong className="text-[var(--color-heading)]">AI automation</strong> is the use of artificial intelligence to handle repetitive business tasks &mdash; lead follow-up, appointment booking, email replies, payment reconciliation &mdash; without manual effort. For small businesses, the question is not whether to automate, but how: hire an agency or do it yourself?
            </p>

            <p className="text-[var(--color-muted)] leading-relaxed mb-4">
              Both paths have real advantages. This guide breaks down the honest costs, timelines, and outcomes so you can make the right call for your business.
            </p>

            <p className="text-[var(--color-muted)] leading-relaxed mb-8">
              We run an AI automation agency, so we have a bias &mdash; but we also know that DIY is the right choice for some businesses. Here is the truth about both.
            </p>

            {/* Comparison Table */}
            <h2 className="text-2xl font-bold mt-10 mb-6">
              Side-by-Side Comparison
            </h2>

            <div className="overflow-x-auto mb-8">
              <table className="w-full text-sm border border-[var(--color-border)] rounded-xl overflow-hidden">
                <thead>
                  <tr className="bg-[var(--color-surface)]/60">
                    <th className="text-left px-4 py-3 text-[var(--color-body)] font-semibold">Factor</th>
                    <th className="text-left px-4 py-3 text-[var(--color-primary)] font-semibold">Done-for-You Agency</th>
                    <th className="text-left px-4 py-3 text-[var(--color-primary)] font-semibold">DIY (Build It Yourself)</th>
                  </tr>
                </thead>
                <tbody className="text-[var(--color-muted)]">
                  <tr className="border-t border-[var(--color-border)]">
                    <td className="px-4 py-3 font-medium text-[var(--color-heading)]">Upfront Cost</td>
                    <td className="px-4 py-3">&pound;500&ndash;&pound;3,500</td>
                    <td className="px-4 py-3">&pound;0&ndash;&pound;50/month (tool subscriptions)</td>
                  </tr>
                  <tr className="border-t border-[var(--color-border)]">
                    <td className="px-4 py-3 font-medium text-[var(--color-heading)]">Ongoing Cost</td>
                    <td className="px-4 py-3">&pound;50&ndash;&pound;350/month</td>
                    <td className="px-4 py-3">&pound;20&ndash;&pound;100/month (tools only)</td>
                  </tr>
                  <tr className="border-t border-[var(--color-border)]">
                    <td className="px-4 py-3 font-medium text-[var(--color-heading)]">Time to Live</td>
                    <td className="px-4 py-3">5&ndash;14 days</td>
                    <td className="px-4 py-3">4&ndash;12 weeks (including learning)</td>
                  </tr>
                  <tr className="border-t border-[var(--color-border)]">
                    <td className="px-4 py-3 font-medium text-[var(--color-heading)]">Your Time Investment</td>
                    <td className="px-4 py-3">2&ndash;3 hours (briefing + review)</td>
                    <td className="px-4 py-3">40&ndash;80 hours (learning + building)</td>
                  </tr>
                  <tr className="border-t border-[var(--color-border)]">
                    <td className="px-4 py-3 font-medium text-[var(--color-heading)]">Technical Skill Needed</td>
                    <td className="px-4 py-3">None</td>
                    <td className="px-4 py-3">Moderate (API connections, logic flows)</td>
                  </tr>
                  <tr className="border-t border-[var(--color-border)]">
                    <td className="px-4 py-3 font-medium text-[var(--color-heading)]">Ongoing Support</td>
                    <td className="px-4 py-3">Included in retainer</td>
                    <td className="px-4 py-3">Self-serve (YouTube, forums)</td>
                  </tr>
                  <tr className="border-t border-[var(--color-border)]">
                    <td className="px-4 py-3 font-medium text-[var(--color-heading)]">Customisation</td>
                    <td className="px-4 py-3">Fully tailored to your business</td>
                    <td className="px-4 py-3">Limited by your skills and templates</td>
                  </tr>
                  <tr className="border-t border-[var(--color-border)]">
                    <td className="px-4 py-3 font-medium text-[var(--color-heading)]">When Things Break</td>
                    <td className="px-4 py-3">Agency fixes it (often proactively)</td>
                    <td className="px-4 py-3">You fix it (or it stays broken)</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* When DIY is right */}
            <h2 className="text-2xl font-bold mt-10 mb-4">
              When DIY Makes Sense
            </h2>

            <p className="text-[var(--color-muted)] leading-relaxed mb-4">
              DIY automation is a good fit if your needs are simple and you enjoy learning new tools. Specifically:
            </p>

            <ul className="text-[var(--color-muted)] space-y-2 mb-4 ml-6 list-disc">
              <li>You only need basic automations &mdash; email forwarding, form notifications, simple Slack alerts</li>
              <li>You have 10+ hours to dedicate to learning Zapier, Make.com, or n8n</li>
              <li>Your workflows don&apos;t need to connect more than 2&ndash;3 tools</li>
              <li>You&apos;re comfortable troubleshooting when things break at 11pm on a Friday</li>
              <li>Budget is genuinely tight and you can&apos;t afford &pound;500 upfront</li>
            </ul>

            <p className="text-[var(--color-muted)] leading-relaxed mb-8">
              Tools like <strong className="text-[var(--color-heading)]">Zapier</strong> (from &pound;16/month) and <strong className="text-[var(--color-heading)]">Make.com</strong> (from &pound;8/month) have excellent templates for simple workflows. According to Zapier&apos;s own data, their average user automates 5 tasks and saves about 4 hours per month. That&apos;s meaningful &mdash; but it&apos;s a fraction of what a properly designed system can do.
            </p>

            {/* When an agency is right */}
            <h2 className="text-2xl font-bold mt-10 mb-4">
              When an Agency Makes Sense
            </h2>

            <p className="text-[var(--color-muted)] leading-relaxed mb-4">
              An agency is the right choice when the cost of NOT automating exceeds the cost of hiring help. Signs you need a professional:
            </p>

            <ul className="text-[var(--color-muted)] space-y-2 mb-4 ml-6 list-disc">
              <li><strong className="text-[var(--color-heading)]">You&apos;re losing leads</strong> &mdash; potential customers call, email, or message and don&apos;t hear back for hours (or ever). According to a Harvard Business Review study, responding within 5 minutes makes you 100x more likely to connect with a lead than waiting 30 minutes.</li>
              <li><strong className="text-[var(--color-heading)]">You spend 5+ hours/week on admin</strong> &mdash; data entry, email replies, payment chasing, scheduling. That&apos;s 260 hours per year &mdash; equivalent to 6.5 full working weeks.</li>
              <li><strong className="text-[var(--color-heading)]">You tried DIY and got stuck</strong> &mdash; you have half-built Zapier workflows that don&apos;t quite work, or you gave up after 3 hours of YouTube tutorials.</li>
              <li><strong className="text-[var(--color-heading)]">Your automation needs to connect 4+ systems</strong> &mdash; calendar, CRM, payments, WhatsApp, email, forms. Multi-system workflows are where complexity (and breakage) multiply.</li>
              <li><strong className="text-[var(--color-heading)]">You need reliability</strong> &mdash; if a workflow breaks, someone fixes it the same day. Not next weekend when you have time.</li>
            </ul>

            <p className="text-[var(--color-muted)] leading-relaxed mb-8">
              We built 9 automated workflows for{" "}
              <Link href="/case-studies/emanuel-bakery" className="text-[var(--color-primary)] hover:underline">
                E&apos;Manuel Bakery in Kettering
              </Link>{" "}
              that save the owner 50+ minutes every day. That&apos;s over 300 hours per year &mdash; worth approximately &pound;20,000 in admin time. The setup cost was &pound;1,500. The ROI paid for itself in the first month.
            </p>

            {/* The hidden cost of DIY */}
            <h2 className="text-2xl font-bold mt-10 mb-4">
              The Hidden Cost of DIY That Nobody Talks About
            </h2>

            <p className="text-[var(--color-muted)] leading-relaxed mb-4">
              The sticker price of DIY looks attractive &mdash; &pound;20/month for Zapier vs &pound;500 for an agency. But the real cost is your time.
            </p>

            <p className="text-[var(--color-muted)] leading-relaxed mb-4">
              If you value your time at &pound;25/hour (a conservative estimate for a business owner), here is the true cost comparison for a lead intake automation:
            </p>

            <div className="overflow-x-auto mb-8">
              <table className="w-full text-sm border border-[var(--color-border)] rounded-xl overflow-hidden">
                <thead>
                  <tr className="bg-[var(--color-surface)]/60">
                    <th className="text-left px-4 py-3 text-[var(--color-body)] font-semibold">Cost Element</th>
                    <th className="text-left px-4 py-3 text-[var(--color-primary)] font-semibold">Agency</th>
                    <th className="text-left px-4 py-3 text-[var(--color-primary)] font-semibold">DIY</th>
                  </tr>
                </thead>
                <tbody className="text-[var(--color-muted)]">
                  <tr className="border-t border-[var(--color-border)]">
                    <td className="px-4 py-3">Setup fee</td>
                    <td className="px-4 py-3">&pound;500</td>
                    <td className="px-4 py-3">&pound;0</td>
                  </tr>
                  <tr className="border-t border-[var(--color-border)]">
                    <td className="px-4 py-3">Your learning time (40 hrs &times; &pound;25)</td>
                    <td className="px-4 py-3">&pound;0</td>
                    <td className="px-4 py-3">&pound;1,000</td>
                  </tr>
                  <tr className="border-t border-[var(--color-border)]">
                    <td className="px-4 py-3">Tool subscriptions (Year 1)</td>
                    <td className="px-4 py-3">&pound;600 (&pound;50/mo retainer)</td>
                    <td className="px-4 py-3">&pound;240 (&pound;20/mo tools)</td>
                  </tr>
                  <tr className="border-t border-[var(--color-border)]">
                    <td className="px-4 py-3">Maintenance time (10 hrs/yr &times; &pound;25)</td>
                    <td className="px-4 py-3">&pound;0 (included)</td>
                    <td className="px-4 py-3">&pound;250</td>
                  </tr>
                  <tr className="border-t border-[var(--color-border)] bg-[var(--color-surface)]/30">
                    <td className="px-4 py-3 font-bold text-[var(--color-heading)]">Total Year 1</td>
                    <td className="px-4 py-3 font-bold text-[var(--color-primary)]">&pound;1,100</td>
                    <td className="px-4 py-3 font-bold text-[var(--color-primary)]">&pound;1,490</td>
                  </tr>
                  <tr className="border-t border-[var(--color-border)]">
                    <td className="px-4 py-3">Time to live</td>
                    <td className="px-4 py-3 text-[var(--color-success)]">5&ndash;7 days</td>
                    <td className="px-4 py-3 text-red-400">6&ndash;12 weeks</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-[var(--color-muted)] leading-relaxed mb-8">
              DIY only becomes cheaper in Year 2+ when the learning investment is amortised. But during those 6&ndash;12 weeks you spent building, you were still losing leads to slow follow-up. At 15 lost leads per month &times; &pound;100 average job value, that&apos;s &pound;1,500&ndash;&pound;4,500 in lost revenue while you were learning.
            </p>

            {/* Our approach */}
            <h2 className="text-2xl font-bold mt-10 mb-4">
              How We Work: The Middle Ground
            </h2>

            <p className="text-[var(--color-muted)] leading-relaxed mb-4">
              At{" "}
              <Link href="/services" className="text-[var(--color-primary)] hover:underline">
                WorkCrew
              </Link>
              , we offer a productised done-for-you service starting at &pound;500 setup + &pound;50/month. Here is what that means in practice:
            </p>

            <ul className="text-[var(--color-muted)] space-y-2 mb-4 ml-6 list-disc">
              <li><strong className="text-[var(--color-heading)]">We build it</strong> &mdash; you spend 2&ndash;3 hours briefing us, then we handle everything</li>
              <li><strong className="text-[var(--color-heading)]">We maintain it</strong> &mdash; when APIs change, tools update, or workflows break, we fix it</li>
              <li><strong className="text-[var(--color-heading)]">We optimise it</strong> &mdash; monthly reviews of your KPIs with tweaks to improve performance</li>
              <li><strong className="text-[var(--color-heading)]">We guarantee it</strong> &mdash; 90-day results guarantee: save 5+ hours/week or get your setup fee back</li>
            </ul>

            <p className="text-[var(--color-muted)] leading-relaxed mb-8">
              No long-term contracts. Month-to-month after the first 90 days. If it&apos;s not working, you can walk away.
            </p>

            {/* Bottom line */}
            <hr className="border-[var(--color-border)] my-10" />

            <h2 className="text-2xl font-bold mt-8 mb-4">
              The Bottom Line
            </h2>

            <p className="text-[var(--color-muted)] leading-relaxed mb-4">
              <strong className="text-[var(--color-heading)]">Choose DIY</strong> if you have simple needs, enjoy learning tools, and have 40+ hours to invest before seeing results.
            </p>

            <p className="text-[var(--color-muted)] leading-relaxed mb-4">
              <strong className="text-[var(--color-heading)]">Choose an agency</strong> if you need results fast, your automation connects multiple systems, and the cost of lost leads or wasted admin time exceeds &pound;500.
            </p>

            <p className="text-[var(--color-muted)] leading-relaxed mb-8">
              Either way, the worst choice is doing nothing. According to McKinsey, UK businesses that adopt AI automation are 23% more profitable than those that don&apos;t. The gap is only widening.
            </p>

            {/* FAQ */}
            <h2 className="text-2xl font-bold mt-10 mb-6">
              Frequently Asked Questions
            </h2>

            <div className="space-y-6 mb-8">
              <div>
                <h3 className="text-lg font-semibold text-[var(--color-heading)] mb-2">
                  Is it cheaper to build AI automation myself or hire an agency?
                </h3>
                <p className="text-[var(--color-muted)] leading-relaxed">
                  DIY is cheaper upfront (&pound;0&ndash;50/month for tools) but costs more in time &mdash; typically 40&ndash;80 hours of learning and building. An agency charges &pound;500&ndash;3,500 for setup but delivers in 5&ndash;14 days with ongoing support. For most small businesses, the agency route is cheaper when you factor in the value of your time.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[var(--color-heading)] mb-2">
                  What AI tools can I set up myself without technical skills?
                </h3>
                <p className="text-[var(--color-muted)] leading-relaxed">
                  Zapier and ChatGPT are the easiest DIY options. You can set up basic email auto-responders, form notifications, and simple chatbots without coding. However, multi-step workflows with payment matching, calendar booking, and CRM integration typically require technical expertise or an agency.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[var(--color-heading)] mb-2">
                  How do I know if my business needs a done-for-you AI agency?
                </h3>
                <p className="text-[var(--color-muted)] leading-relaxed">
                  You likely need an agency if: you&apos;re losing leads to slow follow-up, you spend 5+ hours per week on repetitive admin, you&apos;ve tried DIY tools and got stuck, or your automation needs to connect multiple systems (calendar, payments, CRM, WhatsApp). If your needs are simple &mdash; like auto-forwarding emails &mdash; DIY is fine.
                </p>
              </div>
            </div>
          </div>

          {/* Related Articles */}
          <div className="mt-12 border border-[var(--color-border)] rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4 text-[var(--color-heading)]">Related Articles</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/blog/ai-automation-cost" className="text-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors">
                  How Much Does AI Automation Actually Cost? A Transparent Breakdown
                </Link>
              </li>
              <li>
                <Link href="/blog/5-signs-business-ready-for-ai" className="text-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors">
                  5 Signs Your Business Is Ready for AI Automation
                </Link>
              </li>
              <li>
                <Link href="/blog/kettering-bakery-automated-admin" className="text-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors">
                  How a Kettering Bakery Automated 90% of Their Admin with AI
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
              Not Sure Which Path Is Right for You?
            </h3>
            <p className="text-[var(--color-body)] mb-6 max-w-lg mx-auto">
              Take our free AI Readiness Audit. In 60 seconds, you&apos;ll know exactly what to automate, the expected ROI, and whether DIY or done-for-you is the better fit.
            </p>
            <Link
              href="/audit"
              className="inline-flex items-center gap-2 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-[var(--color-bg)] px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Get Your Free AI Audit
              <ArrowRight className="w-4 h-4" />
            </Link>
            <p className="text-[var(--color-muted)] text-sm mt-3">
              60 seconds. No email required. No obligation.
            </p>
          </div>
        </div>
      </article>
    </div>
  );
}
