import Link from "next/link";
import { ArrowLeft, ArrowRight, Clock } from "lucide-react";
import type { Metadata } from "next";
import JsonLd from "@/components/shared/JsonLd";

export const metadata: Metadata = {
  title: "AI Automation for Small Businesses in London",
  description:
    "AI automation services for London small businesses. Save 8+ hours per week with automated lead capture, bookings, and admin. Local agency, 7-day delivery.",
  keywords: [
    "AI automation London",
    "AI for small businesses London",
    "business automation London",
    "AI agency London",
    "automate small business London",
    "AI lead generation London",
  ],
  openGraph: {
    images: [{ url: "https://workcrew.io/api/og", width: 1200, height: 630 }],
    title: "AI Automation for Small Businesses in London",
    description:
      "AI automation services for London small businesses. Save 8+ hours per week. Local agency, 7-day delivery, from £500.",
    type: "article",
    publishedTime: "2026-03-27T00:00:00.000Z",
    authors: ["Olushola Oladipupo"],
  },
  alternates: {
    canonical: "/blog/ai-automation-small-businesses-london",
  },
};

const tags = ["AI Automation", "London", "Local SEO", "Small Business"];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How much does AI automation cost for a London small business?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "AI automation for London small businesses starts from £500 setup with £50/month ongoing for a lead intake system. More comprehensive automations (order management, WhatsApp bots, multi-system integration) range from £1,500-3,500 setup with £150-350/month. We offer a 90-day results guarantee: save 5+ hours per week or get your setup fee back.",
      },
    },
    {
      "@type": "Question",
      name: "Do you work with businesses outside London?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. We work with businesses across the UK. Everything is delivered remotely — we set up, monitor, and optimise your automation systems from our end. Our clients include businesses in London, Manchester, Birmingham, Leeds, Kettering, and more. The setup process is the same regardless of location.",
      },
    },
    {
      "@type": "Question",
      name: "Which London industries benefit most from AI automation?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The London industries that benefit most from AI automation are: service trades (plumbers, electricians, cleaners — responding to leads faster wins more jobs), hospitality (restaurants, cafes, bars — order management and booking), professional services (accountants, solicitors, consultants — email management and client intake), health and wellness (clinics, salons, gyms — appointment booking and follow-up), and property (estate agents — lead qualification and viewing scheduling).",
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
            AI Automation for Small Businesses in London
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
              <strong className="text-[var(--color-heading)]">AI automation</strong> is the use of artificial intelligence to handle repetitive business tasks automatically &mdash; responding to leads, booking appointments, processing orders, managing emails, and chasing payments. For London&apos;s 1 million+ small businesses, it is the difference between keeping up with the competition and falling behind.
            </p>

            <p className="text-[var(--color-muted)] leading-relaxed mb-8">
              London is the most competitive small business market in the UK. According to the London Growth Hub, the average London SMB spends 12&ndash;15 hours per week on admin tasks that could be automated. That is 600&ndash;780 hours per year &mdash; equivalent to 15&ndash;19 full working weeks. AI automation gives those hours back.
            </p>

            {/* Why London businesses */}
            <h2 className="text-2xl font-bold mt-10 mb-4">
              Why London Small Businesses Need AI Automation More Than Anywhere Else
            </h2>

            <p className="text-[var(--color-muted)] leading-relaxed mb-4">
              London has unique pressures that make automation not just helpful, but necessary:
            </p>

            <ul className="text-[var(--color-muted)] space-y-2 mb-4 ml-6 list-disc">
              <li><strong className="text-[var(--color-heading)]">Higher competition:</strong> There are over 1 million registered businesses in London (ONS, 2025). Your competitor is one Google search away. Responding to a lead 10 minutes late means losing them to the business that responded in 60 seconds.</li>
              <li><strong className="text-[var(--color-heading)]">Higher costs:</strong> London wages, rents, and overheads are 30&ndash;50% higher than the UK average. Hiring a part-time admin costs &pound;15,000&ndash;22,000 per year in London. AI automation doing the same work costs &pound;500&ndash;3,500 to set up and &pound;50&ndash;350 per month to run.</li>
              <li><strong className="text-[var(--color-heading)]">Higher customer expectations:</strong> London customers expect fast responses, clean booking, and instant confirmation. They are used to Deliveroo-speed service. If your business takes 4 hours to respond to an enquiry, they have already booked someone else.</li>
              <li><strong className="text-[var(--color-heading)]">Diverse customer base:</strong> London serves customers speaking 300+ languages. AI chatbots and messaging systems can handle multilingual interactions that would be impossible for a small team.</li>
            </ul>

            <p className="text-[var(--color-muted)] leading-relaxed mb-8">
              The businesses that thrive in London are not necessarily the biggest. They are the fastest to respond, the most consistent in follow-up, and the most efficient with their time. AI automation enables all three.
            </p>

            {/* Industries */}
            <h2 className="text-2xl font-bold mt-10 mb-4">
              London Industries That Benefit Most from AI Automation
            </h2>

            <div className="overflow-x-auto mb-8">
              <table className="w-full text-sm border border-[var(--color-border)] rounded-xl overflow-hidden">
                <thead>
                  <tr className="bg-[var(--color-surface)]/60">
                    <th className="text-left px-4 py-3 text-[var(--color-body)] font-semibold">Industry</th>
                    <th className="text-left px-4 py-3 text-[var(--color-body)] font-semibold">Top Automation</th>
                    <th className="text-left px-4 py-3 text-[var(--color-body)] font-semibold">Typical Saving</th>
                  </tr>
                </thead>
                <tbody className="text-[var(--color-muted)]">
                  <tr className="border-t border-[var(--color-border)]">
                    <td className="px-4 py-3 font-medium text-[var(--color-heading)]">Plumbers &amp; Electricians</td>
                    <td className="px-4 py-3">AI lead response + appointment booking</td>
                    <td className="px-4 py-3 text-[var(--color-success)]">8&ndash;12 hrs/week</td>
                  </tr>
                  <tr className="border-t border-[var(--color-border)]">
                    <td className="px-4 py-3 font-medium text-[var(--color-heading)]">Restaurants &amp; Cafes</td>
                    <td className="px-4 py-3">WhatsApp ordering + payment processing</td>
                    <td className="px-4 py-3 text-[var(--color-success)]">6&ndash;10 hrs/week</td>
                  </tr>
                  <tr className="border-t border-[var(--color-border)]">
                    <td className="px-4 py-3 font-medium text-[var(--color-heading)]">Salons &amp; Barbers</td>
                    <td className="px-4 py-3">Online booking + no-show reminders</td>
                    <td className="px-4 py-3 text-[var(--color-success)]">5&ndash;8 hrs/week</td>
                  </tr>
                  <tr className="border-t border-[var(--color-border)]">
                    <td className="px-4 py-3 font-medium text-[var(--color-heading)]">Cleaning Companies</td>
                    <td className="px-4 py-3">Quote automation + route planning</td>
                    <td className="px-4 py-3 text-[var(--color-success)]">6&ndash;10 hrs/week</td>
                  </tr>
                  <tr className="border-t border-[var(--color-border)]">
                    <td className="px-4 py-3 font-medium text-[var(--color-heading)]">Accountants &amp; Solicitors</td>
                    <td className="px-4 py-3">AI email assistant + client intake</td>
                    <td className="px-4 py-3 text-[var(--color-success)]">5&ndash;8 hrs/week</td>
                  </tr>
                  <tr className="border-t border-[var(--color-border)]">
                    <td className="px-4 py-3 font-medium text-[var(--color-heading)]">Estate Agents</td>
                    <td className="px-4 py-3">Lead qualification + viewing scheduling</td>
                    <td className="px-4 py-3 text-[var(--color-success)]">8&ndash;12 hrs/week</td>
                  </tr>
                  <tr className="border-t border-[var(--color-border)]">
                    <td className="px-4 py-3 font-medium text-[var(--color-heading)]">Gyms &amp; Fitness</td>
                    <td className="px-4 py-3">Member onboarding + class booking</td>
                    <td className="px-4 py-3 text-[var(--color-success)]">4&ndash;6 hrs/week</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* What you can automate */}
            <h2 className="text-2xl font-bold mt-10 mb-4">
              What London Businesses Are Automating Right Now
            </h2>

            <h3 className="text-xl font-semibold text-[var(--color-heading)] mt-6 mb-3">
              1. Lead Response in Under 60 Seconds
            </h3>

            <p className="text-[var(--color-muted)] leading-relaxed mb-4">
              When a potential customer fills in a contact form, calls, or sends a WhatsApp message, an AI system responds immediately. It asks qualification questions (budget, location, urgency), checks your calendar availability, and books an appointment &mdash; all without you lifting a finger.
            </p>

            <p className="text-[var(--color-muted)] leading-relaxed mb-8">
              For a London plumber getting 30+ enquiries per week, this alone recovers 3&ndash;5 jobs per month that would have gone to a faster competitor. At &pound;200&ndash;500 per job, that is &pound;600&ndash;2,500 per month in recovered revenue. Our{" "}
              <Link href="/services/lead-intake" className="text-[var(--color-primary)] hover:underline">
                AI lead intake service
              </Link>{" "}
              starts at &pound;500 setup.
            </p>

            <h3 className="text-xl font-semibold text-[var(--color-heading)] mt-6 mb-3">
              2. WhatsApp Customer Bots
            </h3>

            <p className="text-[var(--color-muted)] leading-relaxed mb-8">
              London has one of the highest WhatsApp usage rates in the UK. A{" "}
              <Link href="/services/whatsapp-bot" className="text-[var(--color-primary)] hover:underline">
                WhatsApp customer bot
              </Link>{" "}
              handles orders, answers FAQs, sends payment links, and updates customers on delivery status &mdash; 24 hours a day, 7 days a week. We built this for a Kettering bakery handling 180+ orders per week; the same technology applies to London restaurants, takeaways, and service businesses.
            </p>

            <h3 className="text-xl font-semibold text-[var(--color-heading)] mt-6 mb-3">
              3. AI Email Management
            </h3>

            <p className="text-[var(--color-muted)] leading-relaxed mb-8">
              Professional service firms in London (accountants, solicitors, consultants) spend 2&ndash;3 hours per day on email. An{" "}
              <Link href="/services/email-assistant" className="text-[var(--color-primary)] hover:underline">
                AI email assistant
              </Link>{" "}
              drafts replies in your tone, handles scheduling back-and-forth, and flags anything that needs your personal attention. Everything stays in draft mode &mdash; nothing gets sent without your approval.
            </p>

            <h3 className="text-xl font-semibold text-[var(--color-heading)] mt-6 mb-3">
              4. Google Review Collection
            </h3>

            <p className="text-[var(--color-muted)] leading-relaxed mb-8">
              In a market as competitive as London, Google reviews are currency. According to BrightLocal, 87% of consumers read online reviews for local businesses. Automated review requests sent within 2 hours of completing a job get the best response rates. One business went from 12 to 47 reviews in 3 months using this approach.
            </p>

            {/* Real results */}
            <h2 className="text-2xl font-bold mt-10 mb-4">
              Real Results: What Our Clients Have Achieved
            </h2>

            <div className="overflow-x-auto mb-8">
              <table className="w-full text-sm border border-[var(--color-border)] rounded-xl overflow-hidden">
                <thead>
                  <tr className="bg-[var(--color-surface)]/60">
                    <th className="text-left px-4 py-3 text-[var(--color-body)] font-semibold">Client</th>
                    <th className="text-left px-4 py-3 text-[var(--color-body)] font-semibold">Industry</th>
                    <th className="text-left px-4 py-3 text-[var(--color-body)] font-semibold">Result</th>
                  </tr>
                </thead>
                <tbody className="text-[var(--color-muted)]">
                  <tr className="border-t border-[var(--color-border)]">
                    <td className="px-4 py-3">
                      <Link href="/case-studies/emanuel-bakery" className="text-[var(--color-primary)] hover:underline">
                        E&apos;Manuel Bakery
                      </Link>
                    </td>
                    <td className="px-4 py-3">Food &amp; Bakery</td>
                    <td className="px-4 py-3 text-[var(--color-success)]">50+ min/day saved, 180+ orders automated, &pound;20k+ annual saving</td>
                  </tr>
                  <tr className="border-t border-[var(--color-border)]">
                    <td className="px-4 py-3">
                      <Link href="/case-studies/quantumfm-media" className="text-[var(--color-primary)] hover:underline">
                        QuantumFM Media
                      </Link>
                    </td>
                    <td className="px-4 py-3">Media &amp; Events</td>
                    <td className="px-4 py-3 text-[var(--color-success)]">12-page professional website, full brand identity, delivered in under 2 weeks</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Pricing */}
            <h2 className="text-2xl font-bold mt-10 mb-4">
              How Much Does AI Automation Cost in London?
            </h2>

            <p className="text-[var(--color-muted)] leading-relaxed mb-4">
              Our pricing is transparent and fixed &mdash; no hourly billing, no scope creep:
            </p>

            <div className="overflow-x-auto mb-8">
              <table className="w-full text-sm border border-[var(--color-border)] rounded-xl overflow-hidden">
                <thead>
                  <tr className="bg-[var(--color-surface)]/60">
                    <th className="text-left px-4 py-3 text-[var(--color-body)] font-semibold">Package</th>
                    <th className="text-left px-4 py-3 text-[var(--color-body)] font-semibold">Setup</th>
                    <th className="text-left px-4 py-3 text-[var(--color-body)] font-semibold">Monthly</th>
                    <th className="text-left px-4 py-3 text-[var(--color-body)] font-semibold">Best For</th>
                  </tr>
                </thead>
                <tbody className="text-[var(--color-muted)]">
                  <tr className="border-t border-[var(--color-border)]">
                    <td className="px-4 py-3 font-medium text-[var(--color-heading)]">Starter</td>
                    <td className="px-4 py-3">&pound;500</td>
                    <td className="px-4 py-3">&pound;50/mo</td>
                    <td className="px-4 py-3">Lead intake, email assistant, SEO content</td>
                  </tr>
                  <tr className="border-t border-[var(--color-border)]">
                    <td className="px-4 py-3 font-medium text-[var(--color-heading)]">Growth</td>
                    <td className="px-4 py-3">&pound;1,500</td>
                    <td className="px-4 py-3">&pound;150/mo</td>
                    <td className="px-4 py-3">Order automation, WhatsApp bot, website</td>
                  </tr>
                  <tr className="border-t border-[var(--color-border)]">
                    <td className="px-4 py-3 font-medium text-[var(--color-heading)]">Scale</td>
                    <td className="px-4 py-3">&pound;3,500</td>
                    <td className="px-4 py-3">&pound;350/mo</td>
                    <td className="px-4 py-3">Full business automation, multiple systems</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-[var(--color-muted)] leading-relaxed mb-8">
              Every package includes our <strong className="text-[var(--color-heading)]">90-Day Results Guarantee</strong>: save at least 5 hours per week within 90 days, or we refund your setup fee. View our full{" "}
              <Link href="/services" className="text-[var(--color-primary)] hover:underline">
                services and pricing
              </Link>
              .
            </p>

            {/* Bottom line */}
            <hr className="border-[var(--color-border)] my-10" />

            <h2 className="text-2xl font-bold mt-8 mb-4">
              Get Started: Free AI Audit for London Businesses
            </h2>

            <p className="text-[var(--color-muted)] leading-relaxed mb-4">
              Not sure where to start? Our free AI readiness audit analyses your business and tells you exactly what to automate, the expected time savings, and the what you should see in 30, 60, 90 days. It takes 60 seconds and requires no email.
            </p>

            <p className="text-[var(--color-muted)] leading-relaxed mb-8">
              Whether you are a Shoreditch coffee shop, a Croydon plumber, or a City accountant &mdash; AI automation works the same way. You tell us what takes too long, and we build a system that does it in seconds.
            </p>

            {/* FAQ */}
            <h2 className="text-2xl font-bold mt-10 mb-6">
              Frequently Asked Questions
            </h2>

            <div className="space-y-6 mb-8">
              <div>
                <h3 className="text-lg font-semibold text-[var(--color-heading)] mb-2">
                  How much does AI automation cost for a London small business?
                </h3>
                <p className="text-[var(--color-muted)] leading-relaxed">
                  AI automation for London small businesses starts from &pound;500 setup with &pound;50/month ongoing for a lead intake system. More comprehensive automations (order management, WhatsApp bots, multi-system integration) range from &pound;1,500&ndash;3,500 setup with &pound;150&ndash;350/month. We offer a 90-day results guarantee: save 5+ hours per week or get your setup fee back.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[var(--color-heading)] mb-2">
                  Do you work with businesses outside London?
                </h3>
                <p className="text-[var(--color-muted)] leading-relaxed">
                  Yes. We work with businesses across the UK. Everything is delivered remotely &mdash; we set up, monitor, and optimise your automation systems from our end. Our clients include businesses in London, Manchester, Birmingham, Leeds, Kettering, and more. The setup process is the same regardless of location.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[var(--color-heading)] mb-2">
                  Which London industries benefit most from AI automation?
                </h3>
                <p className="text-[var(--color-muted)] leading-relaxed">
                  The London industries that benefit most are: service trades (plumbers, electricians, cleaners), hospitality (restaurants, cafes, bars), professional services (accountants, solicitors, consultants), health and wellness (clinics, salons, gyms), and property (estate agents). Any business with inbound leads and repetitive admin is a fit.
                </p>
              </div>
            </div>
          </div>

          {/* Related */}
          <div className="mt-12 border border-[var(--color-border)] rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4 text-[var(--color-heading)]">Related Articles</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/blog/ai-saves-plumbers-10-hours" className="text-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors">
                  How AI Saves Plumbers 10+ Hours a Week
                </Link>
              </li>
              <li>
                <Link href="/blog/ai-automation-agency-vs-diy" className="text-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors">
                  AI Automation Agency vs DIY: Which Is Right?
                </Link>
              </li>
              <li>
                <Link href="/blog/5-signs-business-ready-for-ai" className="text-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors">
                  5 Signs Your Business Is Ready for AI Automation
                </Link>
              </li>
              <li>
                <Link href="/london" className="text-[var(--color-muted)] hover:text-[var(--color-heading)] transition-colors">
                  AI Automation Services in London &rarr;
                </Link>
              </li>
            </ul>
          </div>

          {/* CTA */}
          <div className="mt-16 bg-[var(--color-primary-light)] border border-[var(--color-primary-light)] rounded-xl p-8 text-center">
            <h3 className="text-xl font-semibold mb-2">
              London Business? See What AI Could Save You.
            </h3>
            <p className="text-[var(--color-body)] mb-6 max-w-lg mx-auto">
              Take our free AI Readiness Audit &mdash; 60 seconds, no email required. Get your automation score, top opportunities, and what you should see in 30, 60, 90 days instantly.
            </p>
            <Link
              href="/audit"
              className="inline-flex items-center gap-2 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-[var(--color-bg)] px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Get Your Free AI Audit
              <ArrowRight className="w-4 h-4" />
            </Link>
            <p className="text-[var(--color-muted)] text-sm mt-3">
              Trusted by UK businesses. 90-day results guarantee.
            </p>
          </div>
        </div>
      </article>
    </div>
  );
}
