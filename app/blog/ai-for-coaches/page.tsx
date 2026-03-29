import Link from "next/link";
import { ArrowLeft, ArrowRight, Clock } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI for Coaches and Consultants: Automate Your Admin",
  description:
    "AI for coaches and consultants automates session booking, client onboarding, content repurposing, and invoicing. A practical guide for solo operators who want their time back.",
  keywords: [
    "AI for coaches",
    "coaching business automation",
    "automate consulting business",
    "AI for consultants",
    "coaching admin automation",
    "consultant scheduling automation",
  ],
  openGraph: {
    images: [{ url: "https://oladipupoconsulting.co.uk/api/og", width: 1200, height: 630 }],
    title: "AI for Coaches and Consultants: Automate Your Admin",
    description:
      "Stop spending half your time on admin. Here's how coaches and consultants use AI to automate booking, onboarding, content, and invoicing.",
    type: "article",
    publishedTime: "2026-03-19T00:00:00.000Z",
    authors: ["Olushola Oladipupo"],
  },
  alternates: {
    canonical: "/blog/ai-for-coaches",
  },
  twitter: {
    title: "AI for Coaches and Consultants: Automate Your Admin",
    description:
      "Stop spending half your time on admin. Here's how coaches and consultants use AI to automate booking, onboarding, content, and invoicing.",
  },
};

const tags = ["AI Automation", "Coaches", "Consultants", "Industry Guide"];

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
            AI for Coaches and Consultants: Automate Your Admin
          </h1>

          <div className="flex items-center gap-4 text-sm text-slate-400 mb-12">
            <span>19 March 2026</span>
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
              You became a coach or consultant to help people. Instead, you
              spend half your time on scheduling, emails, invoices, and
              chasing clients who haven&apos;t booked their next session. The
              admin is eating your business alive.
            </p>

            <p className="text-slate-500 leading-relaxed mb-8">
              As a solo operator, every hour you spend on admin is an hour
              you&apos;re not coaching, not creating content, and not earning.
              AI automation gives you those hours back. Here&apos;s how.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4">
              1. Session Booking on Autopilot
            </h2>

            <p className="text-slate-500 leading-relaxed mb-4">
              The back-and-forth of booking sessions is maddening.
              &ldquo;When are you free?&rdquo; &ldquo;How about
              Thursday?&rdquo; &ldquo;Ah, Thursday doesn&apos;t work
              &mdash; what about next week?&rdquo; Three days later,
              you&apos;re still trying to find a slot.
            </p>

            <p className="text-slate-500 leading-relaxed mb-4">
              An AI booking system shows your real-time availability and lets
              clients book themselves. You set your available hours, session
              types, and buffer time between calls. Clients see what&apos;s
              open, pick a slot, and get an instant confirmation with a
              calendar invite and video call link.
            </p>

            <p className="text-slate-500 leading-relaxed mb-8">
              No emails. No back-and-forth. No double-bookings. Coaches who
              automate scheduling typically save 3&ndash;5 hours per week
              &mdash; that&apos;s an extra coaching session or two you could
              be running.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4">
              2. Client Onboarding Sequences
            </h2>

            <p className="text-slate-500 leading-relaxed mb-4">
              When a new client signs up, there&apos;s a whole process:
              welcome email, intake questionnaire, contract signing, payment
              setup, first session booking. Doing this manually for every
              client takes 1&ndash;2 hours.
            </p>

            <p className="text-slate-500 leading-relaxed mb-4">
              An automated onboarding sequence handles all of it. The moment
              someone pays, they receive:
            </p>

            <ul className="mb-6 space-y-2">
              <li className="text-slate-500 ml-6 list-disc">
                A personalised welcome email with what to expect
              </li>
              <li className="text-slate-500 ml-6 list-disc">
                A link to your intake questionnaire (pre-filled with their
                name and email)
              </li>
              <li className="text-slate-500 ml-6 list-disc">
                A link to book their first session
              </li>
              <li className="text-slate-500 ml-6 list-disc">
                A follow-up if they haven&apos;t completed any step within
                48 hours
              </li>
            </ul>

            <p className="text-slate-500 leading-relaxed mb-8">
              Your new client feels looked after from minute one. You
              don&apos;t have to remember a thing. Everyone starts their
              journey with the same professional, polished experience.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4">
              3. Content Repurposing
            </h2>

            <p className="text-slate-500 leading-relaxed mb-4">
              As a coach or consultant, you&apos;re constantly creating
              content &mdash; or feeling guilty that you&apos;re not. You
              know you should be posting on LinkedIn, Instagram, and your
              email list, but who has the time?
            </p>

            <p className="text-slate-500 leading-relaxed mb-4">
              AI content repurposing takes one piece of content and turns it
              into many. Record a 15-minute coaching tip video. AI
              automatically generates:
            </p>

            <ul className="mb-6 space-y-2">
              <li className="text-slate-500 ml-6 list-disc">
                A blog post from the transcript
              </li>
              <li className="text-slate-500 ml-6 list-disc">
                3&ndash;5 social media posts (LinkedIn, Instagram, Twitter)
              </li>
              <li className="text-slate-500 ml-6 list-disc">
                An email newsletter segment
              </li>
              <li className="text-slate-500 ml-6 list-disc">
                Short-form video clips for Reels and TikTok
              </li>
            </ul>

            <p className="text-slate-500 leading-relaxed mb-8">
              One recording becomes a week&apos;s worth of content across
              every platform. You review and approve. The AI does the heavy
              lifting.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4">
              4. Testimonial Collection
            </h2>

            <p className="text-slate-500 leading-relaxed mb-4">
              Testimonials are gold for coaches and consultants. But asking
              for them feels awkward, and even when clients agree, they
              rarely follow through.
            </p>

            <p className="text-slate-500 leading-relaxed mb-4">
              An automated system sends a testimonial request at the perfect
              moment &mdash; after a milestone session, after a programme
              completion, or after a breakthrough moment. It includes guided
              questions so clients don&apos;t have to start from a blank
              page:
            </p>

            <ul className="mb-6 space-y-2">
              <li className="text-slate-500 ml-6 list-disc">
                &ldquo;What was your biggest challenge before working with
                me?&rdquo;
              </li>
              <li className="text-slate-500 ml-6 list-disc">
                &ldquo;What changed as a result of our work together?&rdquo;
              </li>
              <li className="text-slate-500 ml-6 list-disc">
                &ldquo;Would you recommend me to others? Why?&rdquo;
              </li>
            </ul>

            <p className="text-slate-500 leading-relaxed mb-8">
              The responses flow into a library you can use on your website,
              social media, and sales pages. Some coaches collect more
              testimonials in their first month of automation than they did
              in the entire previous year.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4">
              5. Invoice and Payment Automation
            </h2>

            <p className="text-slate-500 leading-relaxed mb-4">
              Chasing late payments is soul-destroying, especially when
              you&apos;re a solo operator and your client is also your
              &ldquo;relationship.&rdquo; It feels personal in a way it
              shouldn&apos;t.
            </p>

            <p className="text-slate-500 leading-relaxed mb-4">
              Automated invoicing removes the awkwardness entirely. Invoices
              are generated and sent automatically. Payment reminders go out
              on a schedule &mdash; friendly, professional, and consistent.
              Recurring payments for ongoing coaching packages are handled
              without you thinking about it.
            </p>

            <p className="text-slate-500 leading-relaxed mb-8">
              You get paid faster, your cash flow improves, and you never
              have to send an uncomfortable &ldquo;just following up on my
              invoice&rdquo; email again.
            </p>

            <hr className="border-slate-200 my-10" />

            <h2 className="text-2xl font-bold mt-8 mb-4">
              What This Adds Up To
            </h2>

            <p className="text-slate-500 leading-relaxed mb-4">
              For a solo coach or consultant charging &pound;100&ndash;250
              per session:
            </p>

            <ul className="mb-6 space-y-2">
              <li className="text-slate-500 ml-6 list-disc">
                <strong className="text-slate-900">3&ndash;5 hours saved weekly</strong>{" "}
                on scheduling alone
              </li>
              <li className="text-slate-500 ml-6 list-disc">
                <strong className="text-slate-900">1&ndash;2 hours saved</strong>{" "}
                per new client on onboarding
              </li>
              <li className="text-slate-500 ml-6 list-disc">
                <strong className="text-slate-900">4&ndash;6 hours saved weekly</strong>{" "}
                on content creation
              </li>
              <li className="text-slate-500 ml-6 list-disc">
                <strong className="text-slate-900">7&ndash;10 days faster</strong>{" "}
                payment collection
              </li>
            </ul>

            <p className="text-slate-500 leading-relaxed mb-4">
              That&apos;s 8&ndash;13 hours a week. At &pound;150 per
              session, converting even half of that saved time into client
              work means an extra &pound;600&ndash;975 per week in revenue.
            </p>

            <p className="text-slate-500 leading-relaxed mb-8">
              Or you could use those hours for rest, strategy, or building
              your next programme. The point is: you get to choose. Right
              now, admin is choosing for you.
            </p>
          </div>

          {/* Related Articles */}
          <div className="mt-12 border border-slate-200 rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4 text-slate-900">Related Articles</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/blog/ai-for-accountants" className="text-blue-600 hover:text-blue-600 transition-colors">
                  AI for Accountants &amp; Bookkeepers: Automate Client Onboarding &amp; Compliance
                </Link>
              </li>
              <li>
                <Link href="/blog/automate-appointment-booking" className="text-blue-600 hover:text-blue-600 transition-colors">
                  How to Automate Appointment Booking for Your Small Business
                </Link>
              </li>
              <li>
                <Link href="/blog/5-ways-ai-saves-time" className="text-blue-600 hover:text-blue-600 transition-colors">
                  5 Ways AI Can Save Your Small Business 10+ Hours a Week
                </Link>
              </li>
              <li>
                <Link href="/services/lead-intake" className="text-slate-500 hover:text-slate-900 transition-colors">
                  View our AI Lead Intake &amp; Appointment Booking service &rarr;
                </Link>
              </li>
            </ul>
          </div>

          {/* CTA Section */}
          <div className="mt-16 bg-blue-50 border border-blue-200 rounded-xl p-8 text-center">
            <h3 className="text-xl font-semibold mb-2">
              Ready to Get Your Time Back?
            </h3>
            <p className="text-slate-600 mb-6 max-w-lg mx-auto">
              Take our free AI Readiness Audit. We&apos;ll look at how your
              coaching or consulting business runs and show you exactly which
              automations would free up the most hours.
            </p>
            <Link
              href="/audit"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Get Your Free AI Readiness Audit
              <ArrowRight className="w-4 h-4" />
            </Link>
            <p className="text-slate-400 text-sm mt-3">
              Takes 2 minutes. Built for solo operators. No tech jargon.
            </p>
          </div>
        </div>
      </article>
    </div>
  );
}
