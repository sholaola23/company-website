import Link from "next/link";
import { ArrowLeft, ArrowRight, Clock } from "lucide-react";
import type { Metadata } from "next";
import JsonLd from "@/components/shared/JsonLd";

export const metadata: Metadata = {
  title: "5 Signs Your Business Is Ready for AI Automation",
  description:
    "Not sure if AI is right for your business? Here are 5 clear signs you're ready to automate — and what to do about each one. Practical guide for UK SMBs.",
  keywords: [
    "business ready for AI",
    "AI automation signs",
    "when to automate business",
    "AI readiness small business",
    "is my business ready for AI",
    "AI automation UK SMB",
  ],
  openGraph: {
    images: [{ url: "https://workcrew.io/api/og", width: 1200, height: 630 }],
    title: "5 Signs Your Business Is Ready for AI Automation",
    description:
      "Not sure if AI is right for your business? Here are 5 clear signs you're ready — and what to do about each one.",
    type: "article",
    publishedTime: "2026-03-27T00:00:00.000Z",
    authors: ["Olushola Oladipupo"],
  },
  alternates: {
    canonical: "/blog/5-signs-business-ready-for-ai",
  },
};

const tags = ["AI Automation", "Getting Started", "Strategy", "Small Business"];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How do I know if my business is ready for AI automation?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Your business is ready for AI automation if you're spending 5+ hours per week on repetitive admin tasks, losing leads to slow follow-up, doing the same task the same way every time, growing faster than your team can handle, or manually moving data between systems. You don't need to be technical — you just need a repeatable process that a human currently handles manually.",
      },
    },
    {
      "@type": "Question",
      name: "What's the minimum size business that benefits from AI?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Even sole traders benefit from AI automation. If you're a one-person plumbing business getting 10+ enquiries per week, AI lead response alone can save you 2-3 hours and help you book 3-5 more jobs per month. The ROI is proportional — a larger business saves more, but the payback period is similar. Start with the free audit so we can scope the right first build.",
      },
    },
    {
      "@type": "Question",
      name: "What should I automate first?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Start with whatever costs you the most time or money right now. For most service businesses, that's lead response (responding to enquiries within 60 seconds instead of hours). For businesses that take orders, it's order intake and payment tracking. Our free AI audit analyses your specific situation and recommends the highest-ROI starting point.",
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
            5 Signs Your Business Is Ready for AI Automation
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
              <strong className="text-[var(--color-heading)]">AI automation for business</strong> means using artificial intelligence to handle repetitive tasks &mdash; responding to leads, booking appointments, processing orders, chasing payments &mdash; without manual effort. But not every business is ready for it. And rushing into automation before you have the right foundation wastes money.
            </p>

            <p className="text-[var(--color-muted)] leading-relaxed mb-8">
              Here are five clear signs that your business is ready to automate &mdash; and what to do about each one. If three or more apply to you, AI automation will almost certainly save you time and money.
            </p>

            {/* Sign 1 */}
            <h2 className="text-2xl font-bold mt-10 mb-4">
              1. You&apos;re Spending 5+ Hours a Week on Repetitive Admin
            </h2>

            <p className="text-[var(--color-muted)] leading-relaxed mb-4">
              This is the clearest signal. If you or your team spend more than 5 hours per week on tasks that follow the same pattern every time &mdash; copying data, sending confirmation messages, updating spreadsheets, chasing payments &mdash; that work is automatable.
            </p>

            <p className="text-[var(--color-muted)] leading-relaxed mb-4">
              According to McKinsey, 60% of all occupations have at least 30% of their tasks that could be automated. For small business owners who wear multiple hats, the percentage is often higher.
            </p>

            <p className="text-[var(--color-muted)] leading-relaxed mb-4">
              <strong className="text-[var(--color-heading)]">The test:</strong> Write down every task you do in a week that follows the same steps every time. If the list totals 5+ hours, you have a strong automation case.
            </p>

            <p className="text-[var(--color-muted)] leading-relaxed mb-8">
              <strong className="text-[var(--color-heading)]">Real example:</strong>{" "}
              <Link href="/case-studies/emanuel-bakery" className="text-[var(--color-primary)] hover:underline">
                E&apos;Manuel Bakery
              </Link>{" "}
              was spending 8+ hours per week on order collation, payment matching, and production planning. All three tasks followed the same pattern every single week. We automated all of them.
            </p>

            {/* Sign 2 */}
            <h2 className="text-2xl font-bold mt-10 mb-4">
              2. You&apos;re Losing Leads to Slow Follow-Up
            </h2>

            <p className="text-[var(--color-muted)] leading-relaxed mb-4">
              If potential customers contact you and don&apos;t hear back for hours (or at all), you are leaving money on the table. The Harvard Business Review found that businesses responding to leads within 5 minutes are 100 times more likely to make contact than those responding in 30 minutes.
            </p>

            <p className="text-[var(--color-muted)] leading-relaxed mb-4">
              For tradespeople and service businesses, this is especially painful. A customer with a leaking pipe calls three plumbers. The first one to respond gets the job. If you are on another job and can&apos;t answer, you&apos;ve lost that lead.
            </p>

            <p className="text-[var(--color-muted)] leading-relaxed mb-4">
              <strong className="text-[var(--color-heading)]">The test:</strong> How long does it take you to respond to a new enquiry? If the answer is &ldquo;hours&rdquo; or &ldquo;whenever I get a chance,&rdquo; you are losing business.
            </p>

            <p className="text-[var(--color-muted)] leading-relaxed mb-8">
              <strong className="text-[var(--color-heading)]">What AI does:</strong> An{" "}
              <Link href="/services/lead-intake" className="text-[var(--color-primary)] hover:underline">
                AI lead intake system
              </Link>{" "}
              responds to every enquiry in under 60 seconds, asks qualification questions, and books appointments &mdash; all while you are on the job.
            </p>

            {/* Sign 3 */}
            <h2 className="text-2xl font-bold mt-10 mb-4">
              3. You Do the Same Task the Same Way Every Time
            </h2>

            <p className="text-[var(--color-muted)] leading-relaxed mb-4">
              Automation works best when there is a repeatable process. If every customer interaction is unique and requires creative judgment, automation is less useful. But if you find yourself following the same steps &mdash; &ldquo;receive enquiry, ask these 3 questions, check calendar, send booking confirmation&rdquo; &mdash; that process is a perfect automation candidate.
            </p>

            <p className="text-[var(--color-muted)] leading-relaxed mb-4">
              <strong className="text-[var(--color-heading)]">The test:</strong> Could you write a step-by-step instruction sheet for someone to follow? If yes, AI can follow it too.
            </p>

            <p className="text-[var(--color-muted)] leading-relaxed mb-8">
              <strong className="text-[var(--color-heading)]">Common repeatable processes:</strong> appointment booking, order confirmation, payment reminders, review requests, quote follow-ups, weekly reports, data entry, email routing.
            </p>

            {/* Sign 4 */}
            <h2 className="text-2xl font-bold mt-10 mb-4">
              4. You&apos;re Growing Faster Than Your Team Can Handle
            </h2>

            <p className="text-[var(--color-muted)] leading-relaxed mb-4">
              Growth is good &mdash; until the admin grows faster than the revenue. If you find yourself choosing between taking on more customers and keeping up with existing admin, automation is the answer. It lets you scale without hiring.
            </p>

            <p className="text-[var(--color-muted)] leading-relaxed mb-4">
              According to the UK Federation of Small Businesses, 33% of small business owners cite &ldquo;admin burden&rdquo; as their biggest barrier to growth. AI automation removes that barrier by handling the admin that comes with each new customer.
            </p>

            <p className="text-[var(--color-muted)] leading-relaxed mb-4">
              <strong className="text-[var(--color-heading)]">The test:</strong> Are you turning down work or delaying responses because you can&apos;t keep up with the admin? Are you considering hiring a part-time admin person?
            </p>

            <p className="text-[var(--color-muted)] leading-relaxed mb-8">
              <strong className="text-[var(--color-heading)]">The maths:</strong> A part-time admin costs &pound;12,000&ndash;18,000 per year (National Living Wage, 20 hrs/week). AI automation is usually cheaper than hiring because you scope the exact workflow instead of paying for idle hours.
            </p>

            {/* Sign 5 */}
            <h2 className="text-2xl font-bold mt-10 mb-4">
              5. You&apos;re Manually Moving Data Between Systems
            </h2>

            <p className="text-[var(--color-muted)] leading-relaxed mb-4">
              If you are copying data from emails into spreadsheets, from spreadsheets into invoicing software, from invoicing into accounting &mdash; you are doing a computer&apos;s job by hand. Every manual data transfer is a point of failure: typos, missed entries, outdated information.
            </p>

            <p className="text-[var(--color-muted)] leading-relaxed mb-4">
              <strong className="text-[var(--color-heading)]">The test:</strong> Do you use more than two software tools that don&apos;t talk to each other? Are you the bridge between them?
            </p>

            <p className="text-[var(--color-muted)] leading-relaxed mb-8">
              <strong className="text-[var(--color-heading)]">What AI does:</strong> Workflow automation tools (we use{" "}
              <Link href="/blog/n8n-vs-zapier-vs-make" className="text-[var(--color-primary)] hover:underline">
                n8n, Zapier, and Make.com
              </Link>
              ) connect your systems so data flows automatically. Order comes in via form &rarr; appears in your spreadsheet &rarr; generates an invoice &rarr; sends a confirmation to the customer. Zero manual steps.
            </p>

            {/* Scoring */}
            <hr className="border-[var(--color-border)] my-10" />

            <h2 className="text-2xl font-bold mt-8 mb-4">
              Score Yourself: Are You Ready?
            </h2>

            <div className="overflow-x-auto mb-8">
              <table className="w-full text-sm border border-[var(--color-border)] rounded-xl overflow-hidden">
                <thead>
                  <tr className="bg-[var(--color-surface)]/60">
                    <th className="text-left px-4 py-3 text-[var(--color-body)] font-semibold">Signs That Apply</th>
                    <th className="text-left px-4 py-3 text-[var(--color-body)] font-semibold">Your AI Readiness</th>
                    <th className="text-left px-4 py-3 text-[var(--color-body)] font-semibold">Recommended Action</th>
                  </tr>
                </thead>
                <tbody className="text-[var(--color-muted)]">
                  <tr className="border-t border-[var(--color-border)]">
                    <td className="px-4 py-3 font-medium">0&ndash;1</td>
                    <td className="px-4 py-3 text-[var(--color-body)]">Not yet &mdash; focus on growing first</td>
                    <td className="px-4 py-3">Revisit in 3&ndash;6 months</td>
                  </tr>
                  <tr className="border-t border-[var(--color-border)]">
                    <td className="px-4 py-3 font-medium">2&ndash;3</td>
                    <td className="px-4 py-3 text-[var(--color-primary)]">Ready for a starter automation</td>
                    <td className="px-4 py-3">Start with one high-ROI workflow after a free audit</td>
                  </tr>
                  <tr className="border-t border-[var(--color-border)]">
                    <td className="px-4 py-3 font-medium">4&ndash;5</td>
                    <td className="px-4 py-3 text-[var(--color-success)]">Strongly ready &mdash; you&apos;re leaving money on the table</td>
                    <td className="px-4 py-3">Scope a connected automation sprint after discovery</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Bottom line */}
            <h2 className="text-2xl font-bold mt-8 mb-4">
              The Bottom Line
            </h2>

            <p className="text-[var(--color-muted)] leading-relaxed mb-4">
              AI automation is not about being cutting-edge or having the latest technology. It is about reclaiming the hours you spend on tasks that do not require your expertise. A plumber&apos;s expertise is plumbing, not data entry. A bakery owner&apos;s expertise is baking, not payment reconciliation.
            </p>

            <p className="text-[var(--color-muted)] leading-relaxed mb-4">
              If three or more of these signs apply to your business, you are ready. The next step is understanding exactly which tasks to automate and what the return on investment looks like.
            </p>

            <p className="text-[var(--color-muted)] leading-relaxed mb-8">
              Our{" "}
              <Link href="/audit" className="text-[var(--color-primary)] hover:underline">
                free AI readiness audit
              </Link>{" "}
              does exactly that &mdash; in 60 seconds, no email required.
            </p>

            {/* FAQ */}
            <h2 className="text-2xl font-bold mt-10 mb-6">
              Frequently Asked Questions
            </h2>

            <div className="space-y-6 mb-8">
              <div>
                <h3 className="text-lg font-semibold text-[var(--color-heading)] mb-2">
                  How do I know if my business is ready for AI automation?
                </h3>
                <p className="text-[var(--color-muted)] leading-relaxed">
                  Your business is ready for AI automation if you&apos;re spending 5+ hours per week on repetitive admin tasks, losing leads to slow follow-up, doing the same task the same way every time, growing faster than your team can handle, or manually moving data between systems. You don&apos;t need to be technical &mdash; you just need a repeatable process that a human currently handles manually.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[var(--color-heading)] mb-2">
                  What&apos;s the minimum size business that benefits from AI?
                </h3>
                <p className="text-[var(--color-muted)] leading-relaxed">
                  Even sole traders benefit from AI automation. If you&apos;re a one-person plumbing business getting 10+ enquiries per week, AI lead response alone can save you 2&ndash;3 hours and help you book 3&ndash;5 more jobs per month. The ROI is proportional &mdash; a larger business saves more, but the payback period is similar. Start with the free audit so we can scope the right first build.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[var(--color-heading)] mb-2">
                  What should I automate first?
                </h3>
                <p className="text-[var(--color-muted)] leading-relaxed">
                  Start with whatever costs you the most time or money right now. For most service businesses, that&apos;s lead response (responding to enquiries within 60 seconds instead of hours). For businesses that take orders, it&apos;s order intake and payment tracking. Our free AI audit analyses your specific situation and recommends the highest-ROI starting point.
                </p>
              </div>
            </div>
          </div>

          {/* Related Articles */}
          <div className="mt-12 border border-[var(--color-border)] rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4 text-[var(--color-heading)]">Related Articles</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/blog/ai-automation-agency-vs-diy" className="text-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors">
                  AI Automation Agency vs DIY: Which Is Right for Your Business?
                </Link>
              </li>
              <li>
                <Link href="/blog/ai-automation-cost" className="text-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors">
                  How Much Does AI Automation Actually Cost?
                </Link>
              </li>
              <li>
                <Link href="/blog/kettering-bakery-automated-admin" className="text-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors">
                  How a Kettering Bakery Automated 90% of Their Admin
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
              Find Out Your AI Readiness Score in 60 Seconds
            </h3>
            <p className="text-[var(--color-body)] mb-6 max-w-lg mx-auto">
              Our free AI audit analyses your business and tells you exactly what to automate, the expected ROI, and the best starting point. No email required.
            </p>
            <Link
              href="/audit"
              className="inline-flex items-center gap-2 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-[var(--color-bg)] px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Get Your Free AI Readiness Audit
              <ArrowRight className="w-4 h-4" />
            </Link>
            <p className="text-[var(--color-muted)] text-sm mt-3">
              60 seconds. No obligation. Instant results.
            </p>
          </div>
        </div>
      </article>
    </div>
  );
}
