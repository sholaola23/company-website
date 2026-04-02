import Link from "next/link";
import { ArrowLeft, ArrowRight, Clock } from "lucide-react";
import type { Metadata } from "next";
import JsonLd from "@/components/shared/JsonLd";

export const metadata: Metadata = {
  title: "How a Kettering Bakery Automated 90% of Their Admin with AI",
  description:
    "E'Manuel Bakery went from 8+ hours of weekly admin to 60 seconds. Real case study: 9 workflows, 180+ orders automated, £20,000+ annual saving. Here's how.",
  keywords: [
    "bakery automation case study",
    "AI automation case study UK",
    "small business automation example",
    "n8n automation bakery",
    "AI for food business",
    "automate bakery orders",
  ],
  openGraph: {
    images: [{ url: "https://workcrew.io/api/og", width: 1200, height: 630 }],
    title: "How a Kettering Bakery Automated 90% of Their Admin with AI",
    description:
      "E'Manuel Bakery went from 8+ hours of weekly admin to 60 seconds. Real numbers, real workflows, real results.",
    type: "article",
    publishedTime: "2026-03-27T00:00:00.000Z",
    authors: ["Olushola Oladipupo"],
  },
  alternates: {
    canonical: "/blog/kettering-bakery-automated-admin",
  },
};

const tags = ["Case Study", "Food Business", "AI Automation", "Real Results"];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How long did it take to automate the bakery?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The initial system (Phase 1) was built and live in under 2 weeks. This included the order form, production dashboard, WhatsApp confirmations, and delivery route planning. Phase 2 (payment matching engine) was delivered one week later. The bakery was fully automated within 3 weeks of starting.",
      },
    },
    {
      "@type": "Question",
      name: "How much did the bakery automation cost?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The setup cost was £1,500 (Growth tier) with £150/month for ongoing optimisation and support. The system saves Tunmise 50+ minutes every day (in his own words), making the ROI positive from the first month. Estimated annual saving is £20,000+ when accounting for the full value of the owner's time.",
      },
    },
    {
      "@type": "Question",
      name: "Can this kind of automation work for other food businesses?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. The core components — order intake, payment matching, production scheduling, delivery routing, and customer notifications — apply to any food business that takes orders and delivers: caterers, meal prep companies, cake makers, farm box deliveries, and wholesale bakeries. We adapt the same workflow patterns to each business's specific needs.",
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
            How a Kettering Bakery Automated 90% of Their Admin with AI
          </h1>

          <div className="flex items-center gap-4 text-sm text-slate-400 mb-12">
            <span>27 March 2026</span>
            <span className="text-slate-600">|</span>
            <span>By Olushola Oladipupo</span>
            <span className="text-slate-600">|</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              9 min read
            </span>
          </div>

          <div className="prose prose-slate max-w-none">
            {/* Key stats callout */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-center">
                <p className="text-2xl font-bold text-blue-600">50+ min</p>
                <p className="text-xs text-slate-400 mt-1">saved every day</p>
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-center">
                <p className="text-2xl font-bold text-blue-600">180+</p>
                <p className="text-xs text-slate-400 mt-1">orders automated weekly</p>
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-center">
                <p className="text-2xl font-bold text-blue-600">9</p>
                <p className="text-xs text-slate-400 mt-1">workflows running 24/7</p>
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-center">
                <p className="text-2xl font-bold text-blue-600">&pound;20k+</p>
                <p className="text-xs text-slate-400 mt-1">estimated annual saving</p>
              </div>
            </div>

            <p className="text-slate-500 leading-relaxed mb-4 text-lg">
              E&apos;Manuel Foods &amp; Bakery is a Nigerian-style bread bakery in Kettering that delivers fresh bread across the Midlands. When we started working together, the owner &mdash; Tunmise &mdash; was spending his evenings on admin instead of his family. Every order came through WhatsApp. Every payment was manually tracked. Every production quantity was hand-tallied.
            </p>

            <p className="text-slate-500 leading-relaxed mb-8">
              Three weeks later, the entire operation runs on 9 automated workflows. Tunmise checks a dashboard for 60 seconds each morning. That&apos;s it. Here is exactly what we built and how it works.
            </p>

            {/* The Before */}
            <h2 className="text-2xl font-bold mt-10 mb-4">
              The Problem: Hours of Admin Every Evening
            </h2>

            <p className="text-slate-500 leading-relaxed mb-4">
              E&apos;Manuel handles 140&ndash;180 orders every week. Before automation, the workflow looked like this:
            </p>

            <ol className="text-slate-500 space-y-3 mb-4 ml-6 list-decimal">
              <li><strong className="text-slate-900">Order collection (2+ hours):</strong> Customers sent WhatsApp messages saying things like &ldquo;2 agege bread, 1 white bread, deliver to 14 Park Street.&rdquo; Tunmise manually copied each order into a spreadsheet. Messages were often incomplete or contradictory.</li>
              <li><strong className="text-slate-900">Payment tracking (2+ hours):</strong> Customers paid via SumUp (card) or bank transfer. SumUp generates its own transaction reference &mdash; breaking the link between order and payment. Tunmise cross-referenced amounts, names, and timing across two separate systems to figure out who had paid.</li>
              <li><strong className="text-slate-900">Production planning (1 hour):</strong> Hand-tallying how many of each bread type to bake. Get the number wrong and you overbake (waste) or underbake (unhappy customers).</li>
              <li><strong className="text-slate-900">Delivery planning (1 hour):</strong> Routes planned from memory. No optimisation, no grouping by area.</li>
              <li><strong className="text-slate-900">Customer updates (1+ hours):</strong> Manually messaging each customer to confirm their order was received and when to expect delivery.</li>
            </ol>

            <p className="text-slate-500 leading-relaxed mb-8">
              The business was growing &mdash; 140 orders per week when we started, now over 180 &mdash; but the admin was growing faster. Tunmise was spending more time running the business than baking bread.
            </p>

            {/* The Solution */}
            <h2 className="text-2xl font-bold mt-10 mb-4">
              The Solution: 9 Automated Workflows
            </h2>

            <p className="text-slate-500 leading-relaxed mb-4">
              We replaced the entire manual process with 9 interconnected AI workflows, built on n8n (an open-source automation platform) and deployed to the cloud. Here is what each one does:
            </p>

            <div className="space-y-4 mb-8">
              <div className="bg-slate-50/50 border border-slate-200 rounded-xl p-4">
                <h3 className="text-sm font-semibold text-slate-900 mb-1">WF01: Online Order Form</h3>
                <p className="text-sm text-slate-600">Replaced WhatsApp ordering with a Tally.so form. Customers select products, enter quantities and address, and submit in under 60 seconds. No more incomplete messages.</p>
              </div>
              <div className="bg-slate-50/50 border border-slate-200 rounded-xl p-4">
                <h3 className="text-sm font-semibold text-slate-900 mb-1">WF02: Bank Transfer Matching</h3>
                <p className="text-sm text-slate-600">When Tunmise uploads his HSBC bank statement CSV, this workflow automatically matches bank transfers to orders using name and amount cross-referencing.</p>
              </div>
              <div className="bg-slate-50/50 border border-slate-200 rounded-xl p-4">
                <h3 className="text-sm font-semibold text-slate-900 mb-1">WF03 &amp; WF08: SumUp Checkout Links</h3>
                <p className="text-sm text-slate-600">Generates unique SumUp payment links for each order. Customers tap the link, pay by card, and the payment is automatically matched to their order.</p>
              </div>
              <div className="bg-slate-50/50 border border-slate-200 rounded-xl p-4">
                <h3 className="text-sm font-semibold text-slate-900 mb-1">WF04: Production Summary</h3>
                <p className="text-sm text-slate-600">Every morning at 8am, generates a production summary showing exactly how many of each bread type to bake. No guesswork.</p>
              </div>
              <div className="bg-slate-50/50 border border-slate-200 rounded-xl p-4">
                <h3 className="text-sm font-semibold text-slate-900 mb-1">WF05: Delivery Route Optimiser</h3>
                <p className="text-sm text-slate-600">Every Friday at 2pm, groups delivery addresses by town and generates Google Maps navigation links for each stop. One-click route planning.</p>
              </div>
              <div className="bg-slate-50/50 border border-slate-200 rounded-xl p-4">
                <h3 className="text-sm font-semibold text-slate-900 mb-1">WF06: Daily Exception Alerts</h3>
                <p className="text-sm text-slate-600">Sends a morning alert if any payments are unmatched, orders are missing information, or anything needs manual attention. Tunmise only has to look at exceptions, not every order.</p>
              </div>
              <div className="bg-slate-50/50 border border-slate-200 rounded-xl p-4">
                <h3 className="text-sm font-semibold text-slate-900 mb-1">WF07: SumUp Transaction Matching Engine</h3>
                <p className="text-sm text-slate-600">The most complex workflow. Polls SumUp every 30 minutes and matches transactions to orders using a 4-tier system: submission ID, name + amount, name only (partial payments), and amount only with duplicate safeguards.</p>
              </div>
              <div className="bg-slate-50/50 border border-slate-200 rounded-xl p-4">
                <h3 className="text-sm font-semibold text-slate-900 mb-1">WF09: Monday Cleanup</h3>
                <p className="text-sm text-slate-600">Every Monday morning, archives the previous week&apos;s data and resets the dashboard for the new cycle. Clean slate every week.</p>
              </div>
            </div>

            {/* The Dashboard */}
            <h2 className="text-2xl font-bold mt-10 mb-4">
              The Dashboard: 60 Seconds Every Morning
            </h2>

            <p className="text-slate-500 leading-relaxed mb-4">
              On top of the 9 workflows, we built a password-protected client dashboard at a custom URL. Tunmise logs in each morning and sees:
            </p>

            <ul className="text-slate-500 space-y-2 mb-4 ml-6 list-disc">
              <li><strong className="text-slate-900">Order summary:</strong> Total orders, revenue, paid vs unpaid breakdown</li>
              <li><strong className="text-slate-900">Unpaid customers:</strong> Names, amounts, and days since order &mdash; with a one-tap WhatsApp button to message them</li>
              <li><strong className="text-slate-900">Production quantities:</strong> Exactly how much of each product to bake</li>
              <li><strong className="text-slate-900">Delivery stops:</strong> Grouped by town with navigation links</li>
              <li><strong className="text-slate-900">System health:</strong> All 9 workflows showing green/amber/red status</li>
            </ul>

            <p className="text-slate-500 leading-relaxed mb-8">
              The dashboard auto-refreshes every 5 minutes. No spreadsheets to open. No WhatsApp messages to scroll through. Just one screen with everything he needs.
            </p>

            {/* Before & After */}
            <h2 className="text-2xl font-bold mt-10 mb-4">
              Before &amp; After
            </h2>

            <div className="overflow-x-auto mb-8">
              <table className="w-full text-sm border border-slate-200 rounded-xl overflow-hidden">
                <thead>
                  <tr className="bg-slate-100/60">
                    <th className="text-left px-4 py-3 text-slate-600 font-semibold">Area</th>
                    <th className="text-left px-4 py-3 text-red-400 font-semibold">Before</th>
                    <th className="text-left px-4 py-3 text-emerald-600 font-semibold">After</th>
                  </tr>
                </thead>
                <tbody className="text-slate-500">
                  <tr className="border-t border-slate-200">
                    <td className="px-4 py-3 font-medium text-slate-900">Weekly admin time</td>
                    <td className="px-4 py-3">8+ hours</td>
                    <td className="px-4 py-3 text-emerald-600">60 seconds/day</td>
                  </tr>
                  <tr className="border-t border-slate-200">
                    <td className="px-4 py-3 font-medium text-slate-900">Order collection</td>
                    <td className="px-4 py-3">Manual WhatsApp messages</td>
                    <td className="px-4 py-3 text-emerald-600">Online form with instant confirmation</td>
                  </tr>
                  <tr className="border-t border-slate-200">
                    <td className="px-4 py-3 font-medium text-slate-900">Payment matching</td>
                    <td className="px-4 py-3">Manual cross-referencing</td>
                    <td className="px-4 py-3 text-emerald-600">Automated 4-tier matching engine</td>
                  </tr>
                  <tr className="border-t border-slate-200">
                    <td className="px-4 py-3 font-medium text-slate-900">Production planning</td>
                    <td className="px-4 py-3">Hand-tallying from messages</td>
                    <td className="px-4 py-3 text-emerald-600">Real-time auto-generated quantities</td>
                  </tr>
                  <tr className="border-t border-slate-200">
                    <td className="px-4 py-3 font-medium text-slate-900">Delivery routes</td>
                    <td className="px-4 py-3">Planned from memory</td>
                    <td className="px-4 py-3 text-emerald-600">One-click Google Maps routes</td>
                  </tr>
                  <tr className="border-t border-slate-200">
                    <td className="px-4 py-3 font-medium text-slate-900">Customer confirmations</td>
                    <td className="px-4 py-3">Manual WhatsApp messages</td>
                    <td className="px-4 py-3 text-emerald-600">Instant automated via Twilio</td>
                  </tr>
                  <tr className="border-t border-slate-200">
                    <td className="px-4 py-3 font-medium text-slate-900">Sales visibility</td>
                    <td className="px-4 py-3">None &mdash; guesswork</td>
                    <td className="px-4 py-3 text-emerald-600">Real-time dashboard with all financials</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Client feedback */}
            <h2 className="text-2xl font-bold mt-10 mb-4">
              What the Owner Said
            </h2>

            <p className="text-slate-500 leading-relaxed mb-4">
              After the first week of Phase 1 going live, Tunmise shared this feedback:
            </p>

            <blockquote className="border-l-4 border-blue-600 pl-4 py-2 mb-4 bg-slate-50/50 rounded-r-lg">
              <p className="text-slate-900 italic leading-relaxed">
                &ldquo;It has eradicated the need to spend a lot of time before I could collate my orders. Checking product summary gives me the information needed without stress now.&rdquo;
              </p>
            </blockquote>

            <blockquote className="border-l-4 border-blue-600 pl-4 py-2 mb-4 bg-slate-50/50 rounded-r-lg">
              <p className="text-slate-900 italic leading-relaxed">
                &ldquo;It has helped in getting payment in before the delivery. Customers could follow the SumUp link and make payment directly.&rdquo;
              </p>
            </blockquote>

            <blockquote className="border-l-4 border-blue-600 pl-4 py-2 mb-8 bg-slate-50/50 rounded-r-lg">
              <p className="text-slate-900 italic leading-relaxed">
                &ldquo;The customers love the new innovation.&rdquo;
              </p>
            </blockquote>

            {/* What's next */}
            <h2 className="text-2xl font-bold mt-10 mb-4">
              What&apos;s Next: WhatsApp Bot
            </h2>

            <p className="text-slate-500 leading-relaxed mb-8">
              Phase 3 is currently in progress: a full{" "}
              <Link href="/services/whatsapp-bot" className="text-blue-600 hover:underline">
                WhatsApp customer bot
              </Link>{" "}
              that lets customers place orders, check delivery status, and get payment confirmations &mdash; all within WhatsApp. This is the final piece that brings the experience full circle: customers who are already on WhatsApp can order through WhatsApp, but now with structured data flowing through the same automated pipeline.
            </p>

            {/* Summary */}
            <hr className="border-slate-200 my-10" />

            <h2 className="text-2xl font-bold mt-8 mb-4">
              Could This Work for Your Business?
            </h2>

            <p className="text-slate-500 leading-relaxed mb-4">
              The specific workflows are tailored to E&apos;Manuel&apos;s operation, but the patterns apply to any business that takes orders, processes payments, and delivers products or services. If you are spending hours on manual admin that follows a repeatable pattern, it can probably be automated.
            </p>

            <p className="text-slate-500 leading-relaxed mb-8">
              Our{" "}
              <Link href="/audit" className="text-blue-600 hover:underline">
                free AI readiness audit
              </Link>{" "}
              takes 60 seconds and will tell you exactly which parts of your business are automatable and what the expected ROI would be.
            </p>

            {/* FAQ */}
            <h2 className="text-2xl font-bold mt-10 mb-6">
              Frequently Asked Questions
            </h2>

            <div className="space-y-6 mb-8">
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  How long did it take to automate the bakery?
                </h3>
                <p className="text-slate-500 leading-relaxed">
                  The initial system (Phase 1) was built and live in under 2 weeks. This included the order form, production dashboard, WhatsApp confirmations, and delivery route planning. Phase 2 (payment matching engine) was delivered one week later. The bakery was fully automated within 3 weeks of starting.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  How much did the bakery automation cost?
                </h3>
                <p className="text-slate-500 leading-relaxed">
                  The setup cost was &pound;1,500 (Growth tier) with &pound;150/month for ongoing optimisation and support. The system saves Tunmise 50+ minutes every day (in his own words), making the ROI positive from the first month. Estimated annual saving is &pound;20,000+ when accounting for the full value of the owner&apos;s time.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  Can this kind of automation work for other food businesses?
                </h3>
                <p className="text-slate-500 leading-relaxed">
                  Yes. The core components &mdash; order intake, payment matching, production scheduling, delivery routing, and customer notifications &mdash; apply to any food business that takes orders and delivers: caterers, meal prep companies, cake makers, farm box deliveries, and wholesale bakeries. We adapt the same workflow patterns to each business&apos;s specific needs.
                </p>
              </div>
            </div>
          </div>

          {/* Related Articles */}
          <div className="mt-12 border border-slate-200 rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4 text-slate-900">Related Articles</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/case-studies/emanuel-bakery" className="text-blue-600 hover:text-blue-600 transition-colors">
                  Full Case Study: E&apos;Manuel Foods &amp; Bakery
                </Link>
              </li>
              <li>
                <Link href="/blog/ai-automation-agency-vs-diy" className="text-blue-600 hover:text-blue-600 transition-colors">
                  AI Automation Agency vs DIY: Which Is Right?
                </Link>
              </li>
              <li>
                <Link href="/blog/ai-automation-cost" className="text-blue-600 hover:text-blue-600 transition-colors">
                  How Much Does AI Automation Actually Cost?
                </Link>
              </li>
              <li>
                <Link href="/services/order-automation" className="text-slate-500 hover:text-slate-900 transition-colors">
                  View our Order-to-Delivery Automation service &rarr;
                </Link>
              </li>
            </ul>
          </div>

          {/* CTA */}
          <div className="mt-16 bg-blue-50 border border-blue-200 rounded-xl p-8 text-center">
            <h3 className="text-xl font-semibold mb-2">
              Ready to Automate Your Business Like E&apos;Manuel?
            </h3>
            <p className="text-slate-600 mb-6 max-w-lg mx-auto">
              Take our free AI Readiness Audit and see exactly what we could automate for your business &mdash; with projected time and cost savings.
            </p>
            <Link
              href="/audit"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Get Your Free AI Audit
              <ArrowRight className="w-4 h-4" />
            </Link>
            <p className="text-slate-400 text-sm mt-3">
              60 seconds. No email required. See your automation score instantly.
            </p>
          </div>
        </div>
      </article>
    </div>
  );
}
