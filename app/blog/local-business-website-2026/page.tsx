import Link from "next/link";
import { ArrowLeft, ArrowRight, Clock } from "lucide-react";
import type { Metadata } from "next";
import JsonLd from "@/components/shared/JsonLd";

export const metadata: Metadata = {
  title: "Does Your Business Need a Website in 2026?",
  description:
    "46% of UK small businesses still don't have a website. Here's why that's costing you customers, what a good business website needs, and what it actually costs in 2026.",
  keywords: [
    "local business website UK",
    "how much does a website cost UK",
    "small business website 2026",
    "do I need a website for my business",
    "website for tradespeople",
    "small business website cost",
    "local SEO UK",
  ],
  openGraph: {
    title: "Does Your Business Need a Website in 2026?",
    description:
      "46% of UK small businesses still don't have a website. Here's why that's costing you customers and what it actually costs to fix.",
    type: "article",
    publishedTime: "2026-03-18T00:00:00.000Z",
    authors: ["Olushola Oladipupo"],
  },
  alternates: {
    canonical: "/blog/local-business-website-2026",
  },
};

const tags = ["Websites", "Local Business", "SEO", "UK Business"];

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline":
    "Does Your Business Need a Website in 2026?",
  "description":
    "46% of UK small businesses still don't have a website. Here's why that's costing you customers, what a good business website needs, and what it actually costs in 2026.",
  "author": {
    "@type": "Person",
    "name": "Olushola Oladipupo",
  },
  "publisher": {
    "@type": "Organization",
    "name": "Oladipupo Consulting Ltd",
    "url": "https://oladipupoconsulting.co.uk",
  },
  "datePublished": "2026-03-18",
  "dateModified": "2026-03-18",
  "mainEntityOfPage":
    "https://oladipupoconsulting.co.uk/blog/local-business-website-2026",
};

export default function BlogPost() {
  return (
    <div className="min-h-screen">
      <JsonLd data={articleJsonLd} />
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
            Why Every Local Business Needs a Website in 2026 (And What It Costs)
          </h1>

          <div className="flex items-center gap-4 text-sm text-zinc-500 mb-12">
            <span>18 March 2026</span>
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
              Nearly half of UK small businesses still don&apos;t have a
              website. If you&apos;re one of them, this post is for you. And
              if you do have one but it was last updated in 2019, this is
              probably for you too.
            </p>

            <p className="text-zinc-300 leading-relaxed mb-8">
              Let&apos;s be honest about what a missing or outdated website is
              costing your business. Then we&apos;ll talk about what a good
              one actually needs and what it costs to get one built properly.
            </p>

            {/* Section 1 */}
            <h2 className="text-2xl font-bold mt-10 mb-4">
              The Numbers Don&apos;t Lie
            </h2>

            <p className="text-zinc-300 leading-relaxed mb-4">
              Here&apos;s what we know about how customers find local
              businesses in 2026:
            </p>

            <ul className="mb-6 space-y-2">
              <li className="text-zinc-300 ml-6 list-disc">
                <strong className="text-zinc-100">97% of people</strong> search
                online for local services before making a decision
              </li>
              <li className="text-zinc-300 ml-6 list-disc">
                <strong className="text-zinc-100">75% of consumers</strong> judge
                a business&apos;s credibility based on their website
              </li>
              <li className="text-zinc-300 ml-6 list-disc">
                <strong className="text-zinc-100">53% of mobile users</strong> abandon
                a site that takes more than 3 seconds to load
              </li>
              <li className="text-zinc-300 ml-6 list-disc">
                Businesses with a website get{" "}
                <strong className="text-zinc-100">2&ndash;3x more enquiries</strong> than
                those relying solely on social media
              </li>
            </ul>

            <p className="text-zinc-300 leading-relaxed mb-8">
              Think about the last time you needed a plumber, a cleaner, or a
              restaurant recommendation. What did you do? You Googled it. And
              if a business didn&apos;t show up, or their website looked like
              it was built in 2012, you moved on to the next one.
            </p>

            <p className="text-zinc-300 leading-relaxed mb-8">
              Your customers are doing exactly the same thing.
            </p>

            {/* Section 2 */}
            <h2 className="text-2xl font-bold mt-10 mb-4">
              &ldquo;But I Get All My Work Through Word of Mouth&rdquo;
            </h2>

            <p className="text-zinc-300 leading-relaxed mb-4">
              We hear this all the time, especially from tradespeople. And
              word of mouth is brilliant &mdash; it&apos;s still the most
              trusted form of marketing.
            </p>

            <p className="text-zinc-300 leading-relaxed mb-4">
              But here&apos;s what happens: someone recommends you to a
              friend. That friend types your name into Google. If nothing
              comes up &mdash; or worse, your competitor does &mdash; you&apos;ve
              just lost a referral that was practically guaranteed.
            </p>

            <p className="text-zinc-300 leading-relaxed mb-8">
              A website doesn&apos;t replace word of mouth. It catches the
              people who were already on their way to you and makes it easy
              for them to actually get in touch.
            </p>

            {/* Section 3 */}
            <h2 className="text-2xl font-bold mt-10 mb-4">
              What a Good Small Business Website Actually Needs
            </h2>

            <p className="text-zinc-300 leading-relaxed mb-4">
              You don&apos;t need 50 pages. You don&apos;t need animations or
              a blog or an online shop (unless you&apos;re selling products).
              You need five things done well:
            </p>

            <div className="space-y-6 mb-8">
              <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-5">
                <h3 className="text-lg font-semibold mb-2 text-zinc-100">
                  1. Mobile-Friendly Design
                </h3>
                <p className="text-zinc-400 text-sm">
                  Over 60% of your visitors will be on their phone. If your
                  site doesn&apos;t work perfectly on mobile, you&apos;re
                  turning away more than half your potential customers.
                </p>
              </div>

              <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-5">
                <h3 className="text-lg font-semibold mb-2 text-zinc-100">
                  2. Fast Loading Speed
                </h3>
                <p className="text-zinc-400 text-sm">
                  Your site needs to load in under 3 seconds. Every extra
                  second of loading time increases your bounce rate by 32%.
                  Google also ranks faster sites higher in search results.
                </p>
              </div>

              <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-5">
                <h3 className="text-lg font-semibold mb-2 text-zinc-100">
                  3. Clear Contact or Booking Option
                </h3>
                <p className="text-zinc-400 text-sm">
                  A phone number, email, or booking form that&apos;s visible
                  on every page. Don&apos;t make people hunt for how to reach
                  you. If you can add online booking, even better &mdash; it
                  converts at 2&ndash;3x the rate of a simple contact form.
                </p>
              </div>

              <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-5">
                <h3 className="text-lg font-semibold mb-2 text-zinc-100">
                  4. Google Business Profile Link
                </h3>
                <p className="text-zinc-400 text-sm">
                  Your Google Business Profile and your website should work
                  together. When both are set up and linked properly, you&apos;re
                  much more likely to appear in the local &ldquo;map
                  pack&rdquo; &mdash; those top 3 results with a map that
                  show up for searches like &ldquo;plumber near me.&rdquo;
                </p>
              </div>

              <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-5">
                <h3 className="text-lg font-semibold mb-2 text-zinc-100">
                  5. Basic SEO
                </h3>
                <p className="text-zinc-400 text-sm">
                  Your website needs to tell Google what you do and where you
                  do it. That means proper page titles, a meta description,
                  and content that mentions your services and location. Without
                  this, you&apos;re invisible in search results. Our{" "}
                  <Link
                    href="/services/seo-content"
                    className="text-blue-400 hover:text-blue-300 underline transition-colors"
                  >
                    SEO Content Automation service
                  </Link>{" "}
                  handles this for you.
                </p>
              </div>
            </div>

            <p className="text-zinc-300 leading-relaxed mb-8">
              That&apos;s it. Five things. Get these right and your website
              will be working harder than 90% of your competitors&apos; sites.
            </p>

            {/* Section 4 */}
            <h2 className="text-2xl font-bold mt-10 mb-4">
              What Does a Small Business Website Cost in 2026?
            </h2>

            <p className="text-zinc-300 leading-relaxed mb-6">
              This is the big question, and the answer depends on what route
              you take. Here&apos;s an honest breakdown:
            </p>

            <div className="overflow-x-auto mb-8">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-zinc-800">
                    <th className="text-left py-3 px-4 text-zinc-400 font-medium">
                      Option
                    </th>
                    <th className="text-left py-3 px-4 text-zinc-400 font-medium">
                      Cost
                    </th>
                    <th className="text-left py-3 px-4 text-zinc-400 font-medium">
                      Timeline
                    </th>
                    <th className="text-left py-3 px-4 text-zinc-400 font-medium">
                      Best For
                    </th>
                  </tr>
                </thead>
                <tbody className="text-zinc-300">
                  <tr className="border-b border-zinc-800/50">
                    <td className="py-3 px-4 font-medium text-zinc-100">
                      DIY (Wix, Squarespace)
                    </td>
                    <td className="py-3 px-4">&pound;0&ndash;100/year</td>
                    <td className="py-3 px-4">1&ndash;4 weeks</td>
                    <td className="py-3 px-4">
                      If you have time and some design sense
                    </td>
                  </tr>
                  <tr className="border-b border-zinc-800/50">
                    <td className="py-3 px-4 font-medium text-zinc-100">
                      Freelancer
                    </td>
                    <td className="py-3 px-4">&pound;500&ndash;2,000</td>
                    <td className="py-3 px-4">2&ndash;6 weeks</td>
                    <td className="py-3 px-4">
                      Simple sites, if you find someone reliable
                    </td>
                  </tr>
                  <tr className="border-b border-zinc-800/50">
                    <td className="py-3 px-4 font-medium text-zinc-100">
                      Traditional agency
                    </td>
                    <td className="py-3 px-4">&pound;3,000&ndash;10,000+</td>
                    <td className="py-3 px-4">4&ndash;12 weeks</td>
                    <td className="py-3 px-4">
                      Larger businesses with complex needs
                    </td>
                  </tr>
                  <tr className="border-b border-zinc-800/50 bg-blue-500/5">
                    <td className="py-3 px-4 font-medium text-blue-400">
                      Us (Oladipupo Consulting)
                    </td>
                    <td className="py-3 px-4 text-zinc-100">
                      From &pound;1,500
                    </td>
                    <td className="py-3 px-4 text-zinc-100">
                      10&ndash;14 days
                    </td>
                    <td className="py-3 px-4 text-zinc-100">
                      Small businesses who want quality, fast
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-zinc-300 leading-relaxed mb-4">
              The DIY route sounds appealing, but be honest with yourself:
              will you actually finish it? Most people start a Wix site,
              spend three weekends on it, and abandon it half done. Your time
              has a cost too.
            </p>

            <p className="text-zinc-300 leading-relaxed mb-8">
              Traditional agencies produce great work, but the timelines and
              prices are designed for bigger businesses. If you&apos;re a
              local service company, you don&apos;t need a 12-week project
              &mdash; you need something professional, done quickly, that
              starts bringing in enquiries.
            </p>

            {/* Case Study */}
            <h2 className="text-2xl font-bold mt-10 mb-4">
              Real Example: QuantumFM Media
            </h2>

            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 mb-8">
              <p className="text-zinc-300 leading-relaxed mb-4">
                We recently built a 12-page professional website for
                QuantumFM Media, a media production company. The project
                included full brand identity design, custom visuals, SEO
                setup, and mobile optimisation.
              </p>

              <p className="text-zinc-300 leading-relaxed mb-4">
                The result? A site that looks like it was built by a London
                agency, delivered in under two weeks, at a fraction of the
                price. They went from having no online presence to a
                professional platform that matches the quality of their work.
              </p>

              <p className="text-zinc-400 text-sm">
                <Link
                  href="/case-studies/quantumfm-media"
                  className="text-blue-400 hover:underline"
                >
                  Read the full QuantumFM Media case study &rarr;
                </Link>
              </p>
            </div>

            {/* What we include */}
            <h2 className="text-2xl font-bold mt-10 mb-4">
              What You Get When We Build Your Website
            </h2>

            <p className="text-zinc-300 leading-relaxed mb-4">
              For &pound;1,500, our{" "}
              <Link
                href="/services/business-website"
                className="text-blue-400 hover:text-blue-300 underline transition-colors"
              >
                Professional Business Website package
              </Link>{" "}
              includes everything a local business needs to start getting found
              online:
            </p>

            <ul className="mb-8 space-y-2">
              <li className="text-zinc-300 ml-6 list-disc">
                Custom design that matches your brand (not a template)
              </li>
              <li className="text-zinc-300 ml-6 list-disc">
                Mobile-responsive &mdash; works perfectly on phones and tablets
              </li>
              <li className="text-zinc-300 ml-6 list-disc">
                Fast loading &mdash; built with modern technology, not bloated
                WordPress themes
              </li>
              <li className="text-zinc-300 ml-6 list-disc">
                SEO setup so Google knows who you are and where you are
              </li>
              <li className="text-zinc-300 ml-6 list-disc">
                Contact form or booking integration
              </li>
              <li className="text-zinc-300 ml-6 list-disc">
                Google Business Profile linking
              </li>
              <li className="text-zinc-300 ml-6 list-disc">
                Brand identity (logo, colours, fonts) if you don&apos;t have
                one yet
              </li>
              <li className="text-zinc-300 ml-6 list-disc">
                Delivered in 10&ndash;14 days, not 10&ndash;14 weeks
              </li>
            </ul>

            {/* Section 5 */}
            <h2 className="text-2xl font-bold mt-10 mb-4">
              The Cost of Doing Nothing
            </h2>

            <p className="text-zinc-300 leading-relaxed mb-4">
              Let&apos;s do some quick maths. Say your average job is worth
              &pound;200. If your missing or outdated website is costing you
              just 2 new customers a month, that&apos;s &pound;400 in lost
              revenue. Over a year, that&apos;s &pound;4,800.
            </p>

            <p className="text-zinc-300 leading-relaxed mb-4">
              A &pound;1,500 website pays for itself in under 4 months. After
              that, it&apos;s pure profit.
            </p>

            <p className="text-zinc-300 leading-relaxed mb-8">
              And unlike a flyer or a Facebook ad, your website works 24 hours
              a day, 7 days a week, 365 days a year. It never calls in sick.
              It never takes a holiday.
            </p>
          </div>

          {/* Related Articles */}
          <div className="mt-12 border border-zinc-800 rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4 text-zinc-100">Related Articles</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/blog/get-more-google-reviews" className="text-blue-400 hover:text-blue-300 transition-colors">
                  How to Get More Google Reviews Automatically
                </Link>
              </li>
              <li>
                <Link href="/blog/how-can-ai-help-my-business" className="text-blue-400 hover:text-blue-300 transition-colors">
                  How Can AI Help My Business? 10 Real Examples from UK SMBs
                </Link>
              </li>
              <li>
                <Link href="/blog/ai-automation-cost" className="text-blue-400 hover:text-blue-300 transition-colors">
                  How Much Does AI Automation Cost for a Small Business?
                </Link>
              </li>
              <li>
                <Link href="/services/business-website" className="text-zinc-300 hover:text-white transition-colors">
                  View our Professional Business Website service &rarr;
                </Link>
              </li>
            </ul>
          </div>

          {/* CTA Section */}
          <div className="mt-16 bg-gradient-to-br from-blue-500/10 to-zinc-900 border border-zinc-800 rounded-xl p-8 text-center">
            <h3 className="text-xl font-semibold mb-2">
              Not Sure If Your Website Is Working for You?
            </h3>
            <p className="text-zinc-400 mb-6 max-w-lg mx-auto">
              Get a free audit &mdash; we&apos;ll look at your current online
              presence and tell you exactly what&apos;s missing, what&apos;s
              working, and what would make the biggest difference.
            </p>
            <Link
              href="/audit"
              className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Get Your Free Audit
              <ArrowRight className="w-4 h-4" />
            </Link>
            <p className="text-zinc-500 text-sm mt-3">
              Takes 2 minutes. No obligation. We&apos;ll tell you honestly
              what you need.
            </p>
          </div>
        </div>
      </article>
    </div>
  );
}
