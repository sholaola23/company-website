import Link from "next/link";
import { ArrowLeft, ArrowRight, Clock } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How to Automate Appointment Booking for Your Small Business",
  description:
    "Learn how to automate appointment booking for your small business. Stop missing calls and double-booking. Set up an AI booking system that works 24/7.",
  keywords: [
    "automate appointment booking",
    "online booking system small business",
    "AI booking",
    "automated scheduling small business",
    "appointment booking automation UK",
    "AI appointment system",
  ],
  openGraph: {
    title: "How to Automate Appointment Booking for Your Small Business",
    description:
      "Stop missing calls and double-booking. Learn how AI appointment booking works for small businesses — and how to set it up.",
    type: "article",
    publishedTime: "2026-03-19T00:00:00.000Z",
    authors: ["Olushola Oladipupo"],
  },
  alternates: {
    canonical: "/blog/automate-appointment-booking",
  },
};

const tags = ["AI Automation", "Appointment Booking", "Small Business", "Guides"];

export default function BlogPost() {
  return (
    <main className="min-h-screen">
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
            How to Automate Appointment Booking for Your Small Business
          </h1>

          <div className="flex items-center gap-4 text-sm text-zinc-500 mb-12">
            <span>19 March 2026</span>
            <span className="text-zinc-700">|</span>
            <span>By Olushola Oladipupo</span>
            <span className="text-zinc-700">|</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              6 min read
            </span>
          </div>

          <div className="prose prose-invert max-w-none">
            <p className="text-zinc-300 leading-relaxed mb-4 text-lg">
              Your phone rings while you&apos;re with a customer. You miss it.
              They don&apos;t leave a voicemail. They call the next business on
              Google instead. Sound familiar?
            </p>

            <p className="text-zinc-300 leading-relaxed mb-4">
              For service businesses &mdash; salons, clinics, tradespeople,
              personal trainers, cleaners &mdash; appointment booking is the
              backbone of your revenue. But managing it manually is a nightmare.
            </p>

            <p className="text-zinc-300 leading-relaxed mb-8">
              The good news? Automating your booking system is one of the
              simplest and highest-impact things you can do with AI. And it
              costs far less than you think.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4">
              The Real Cost of Manual Booking
            </h2>

            <p className="text-zinc-300 leading-relaxed mb-4">
              Let&apos;s be honest about what manual booking actually costs you.
              It&apos;s not just time &mdash; it&apos;s money walking out the
              door.
            </p>

            <ul className="mb-6 space-y-2">
              <li className="text-zinc-300 ml-6 list-disc">
                <strong className="text-zinc-100">Missed calls</strong> &mdash;
                62% of phone calls to small businesses go unanswered. Each one
                is a potential customer lost to a competitor.
              </li>
              <li className="text-zinc-300 ml-6 list-disc">
                <strong className="text-zinc-100">Double bookings</strong> &mdash;
                when your diary lives in your head or a paper notebook,
                mistakes happen. Double bookings cost you customers and
                credibility.
              </li>
              <li className="text-zinc-300 ml-6 list-disc">
                <strong className="text-zinc-100">Phone tag</strong> &mdash;
                the back-and-forth of &ldquo;When are you free?&rdquo;
                &ldquo;How about Thursday?&rdquo; &ldquo;Sorry, Thursday
                doesn&apos;t work&rdquo; eats 3&ndash;5 hours every week.
              </li>
              <li className="text-zinc-300 ml-6 list-disc">
                <strong className="text-zinc-100">No-shows</strong> &mdash;
                without automated reminders, no-show rates average 20&ndash;30%.
                That&apos;s nearly a third of your booked slots going to waste.
              </li>
            </ul>

            <p className="text-zinc-300 leading-relaxed mb-8">
              A salon with 30 bookings a week losing 20% to no-shows is losing
              6 appointments. If each is worth &pound;40, that&apos;s
              &pound;240 a week &mdash; over &pound;12,000 a year &mdash;
              vanishing into thin air.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4">
              What Automated Booking Actually Looks Like
            </h2>

            <p className="text-zinc-300 leading-relaxed mb-4">
              Automated booking isn&apos;t complicated. Here&apos;s how it works
              in practice:
            </p>

            <div className="space-y-4 mb-8">
              <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-5">
                <h3 className="text-lg font-semibold mb-2 text-zinc-100">
                  Step 1: Customer Finds You
                </h3>
                <p className="text-zinc-400 text-sm">
                  They visit your website, click a link on your Google Business
                  Profile, or tap a &ldquo;Book Now&rdquo; button on your
                  Instagram. They see your real-time availability instantly.
                </p>
              </div>

              <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-5">
                <h3 className="text-lg font-semibold mb-2 text-zinc-100">
                  Step 2: They Pick a Slot
                </h3>
                <p className="text-zinc-400 text-sm">
                  No phone call needed. They choose the date, time, and service
                  that works for them. The system already knows your
                  availability, so there&apos;s zero risk of double booking.
                </p>
              </div>

              <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-5">
                <h3 className="text-lg font-semibold mb-2 text-zinc-100">
                  Step 3: Instant Confirmation
                </h3>
                <p className="text-zinc-400 text-sm">
                  They get an email or WhatsApp confirmation immediately. No
                  waiting. No wondering if you got their message.
                </p>
              </div>

              <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-5">
                <h3 className="text-lg font-semibold mb-2 text-zinc-100">
                  Step 4: Automated Reminders
                </h3>
                <p className="text-zinc-400 text-sm">
                  The system sends a reminder 24 hours before the appointment.
                  This alone cuts no-shows by 40&ndash;60%. Some systems even
                  let the customer reschedule with one tap if they can&apos;t
                  make it.
                </p>
              </div>

              <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-5">
                <h3 className="text-lg font-semibold mb-2 text-zinc-100">
                  Step 5: Follow-Up After the Visit
                </h3>
                <p className="text-zinc-400 text-sm">
                  After the appointment, the system can automatically ask for a
                  Google review, suggest rebooking, or send a thank-you message.
                  All without you doing a thing.
                </p>
              </div>
            </div>

            <p className="text-zinc-300 leading-relaxed mb-8">
              The entire process happens while you&apos;re doing your actual
              job. At 2am on a Sunday, a customer can book you for Tuesday
              morning. You wake up to a confirmed booking in your calendar.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4">
              Where AI Takes It Further
            </h2>

            <p className="text-zinc-300 leading-relaxed mb-4">
              Basic online booking has been around for years. But AI adds a
              layer of intelligence that basic tools can&apos;t match.
            </p>

            <ul className="mb-6 space-y-2">
              <li className="text-zinc-300 ml-6 list-disc">
                <strong className="text-zinc-100">Smart qualification</strong> &mdash;
                AI can ask the right questions before booking. A plumber&apos;s
                system might ask &ldquo;Is this an emergency?&rdquo; and route
                urgent jobs differently.
              </li>
              <li className="text-zinc-300 ml-6 list-disc">
                <strong className="text-zinc-100">WhatsApp integration</strong> &mdash;
                customers can book through WhatsApp by chatting naturally. The
                AI understands &ldquo;Can I get a haircut Thursday
                afternoon?&rdquo; and handles it.
              </li>
              <li className="text-zinc-300 ml-6 list-disc">
                <strong className="text-zinc-100">Waitlist management</strong> &mdash;
                when you&apos;re fully booked, AI can add people to a waiting
                list and automatically notify them if a slot opens up.
              </li>
              <li className="text-zinc-300 ml-6 list-disc">
                <strong className="text-zinc-100">No-show prediction</strong> &mdash;
                AI can identify patterns in who&apos;s likely to no-show and
                send extra reminders or require deposits for those bookings.
              </li>
            </ul>

            <h2 className="text-2xl font-bold mt-10 mb-4">
              What It Costs
            </h2>

            <p className="text-zinc-300 leading-relaxed mb-4">
              A basic AI booking system for a small business typically costs
              &pound;500 to set up, plus a small monthly fee for maintenance
              and optimisation. Compare that to the &pound;12,000 a year
              you&apos;re losing to no-shows and missed calls.
            </p>

            <p className="text-zinc-300 leading-relaxed mb-4">
              Most of our clients see the system pay for itself within the
              first month. One cleaning company in Essex recovered 8 lost
              bookings in their first two weeks &mdash; that was &pound;640 in
              revenue they would have missed entirely.
            </p>

            <h2 className="text-2xl font-bold mt-10 mb-4">
              Is It Right for Your Business?
            </h2>

            <p className="text-zinc-300 leading-relaxed mb-4">
              Automated booking works best if you meet any of these criteria:
            </p>

            <ul className="mb-6 space-y-2">
              <li className="text-zinc-300 ml-6 list-disc">
                You take more than 10 bookings per week
              </li>
              <li className="text-zinc-300 ml-6 list-disc">
                You miss calls because you&apos;re busy with customers
              </li>
              <li className="text-zinc-300 ml-6 list-disc">
                You&apos;ve had double-booking problems
              </li>
              <li className="text-zinc-300 ml-6 list-disc">
                Your no-show rate is above 15%
              </li>
              <li className="text-zinc-300 ml-6 list-disc">
                You spend more than 30 minutes a day on scheduling
              </li>
            </ul>

            <p className="text-zinc-300 leading-relaxed mb-8">
              If you ticked even one of those boxes, automated booking will
              make a real difference to your bottom line. It&apos;s one of the
              fastest wins in business automation &mdash; and it&apos;s where
              we recommend most businesses start.
            </p>
          </div>

          {/* Related Articles */}
          <div className="mt-12 border border-zinc-800 rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4 text-zinc-100">Related Articles</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/blog/ai-for-salons" className="text-blue-400 hover:text-blue-300 transition-colors">
                  AI for Salons: How to Fill Empty Chairs Without Lifting a Phone
                </Link>
              </li>
              <li>
                <Link href="/blog/5-ways-ai-saves-time" className="text-blue-400 hover:text-blue-300 transition-colors">
                  5 Ways AI Can Save Your Small Business 10+ Hours a Week
                </Link>
              </li>
              <li>
                <Link href="/blog/ai-for-dentists" className="text-blue-400 hover:text-blue-300 transition-colors">
                  AI for Dentists &amp; Dental Practices: Reduce No-Shows by 60%
                </Link>
              </li>
              <li>
                <Link href="/services/lead-intake" className="text-zinc-300 hover:text-white transition-colors">
                  View our AI Lead Intake &amp; Appointment Booking service &rarr;
                </Link>
              </li>
            </ul>
          </div>

          {/* CTA Section */}
          <div className="mt-16 bg-gradient-to-br from-blue-500/10 to-zinc-900 border border-zinc-800 rounded-xl p-8 text-center">
            <h3 className="text-xl font-semibold mb-2">
              Ready to Stop Missing Bookings?
            </h3>
            <p className="text-zinc-400 mb-6 max-w-lg mx-auto">
              Take our free AI Readiness Audit and we&apos;ll show you exactly
              how automated booking would work for your specific business
              &mdash; and how many hours (and pounds) it would save you.
            </p>
            <Link
              href="/audit"
              className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Get Your Free AI Readiness Audit
              <ArrowRight className="w-4 h-4" />
            </Link>
            <p className="text-zinc-500 text-sm mt-3">
              Takes 2 minutes. No obligation. No sales pitch.
            </p>
          </div>
        </div>
      </article>
    </main>
  );
}
