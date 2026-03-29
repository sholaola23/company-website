import Link from "next/link";
import { ArrowLeft, ArrowRight, Clock } from "lucide-react";
import type { Metadata } from "next";
import JsonLd from "@/components/shared/JsonLd";
import RankReadyWaitlist from "./RankReadyWaitlist";

export const metadata: Metadata = {
  title:
    "Local SEO Audit Checklist 2026: 20-Task Framework for Google Maps Rankings",
  description:
    "The complete local SEO audit checklist for small businesses in the UK. 20 practical tasks across Google Business Profile, website, backlinks, and content that actually move rankings.",
  keywords: [
    "local SEO audit checklist",
    "Google Maps ranking checklist",
    "local SEO for small business UK",
    "Google Business Profile optimisation",
    "local SEO checklist 2026",
    "Google Maps SEO",
    "local search ranking",
  ],
  openGraph: {
    title:
      "Local SEO Audit Checklist 2026: 20-Task Framework for Google Maps Rankings",
    description:
      "The complete local SEO audit checklist for small businesses in the UK. 20 practical tasks across Google Business Profile, website, backlinks, and content that actually move rankings.",
    type: "article",
    publishedTime: "2026-03-27T00:00:00.000Z",
    authors: ["Olushola Oladipupo"],
  },
  alternates: {
    canonical: "/blog/local-seo-audit-checklist",
  },
  twitter: {
    title:
      "Local SEO Audit Checklist 2026: 20-Task Framework for Google Maps Rankings",
    description:
      "The complete local SEO audit checklist for small businesses in the UK. 20 practical tasks across Google Business Profile, website, backlinks, and content that actually move rankings.",
  },
};

const tags = [
  "Local SEO",
  "Google Maps",
  "Small Business",
  "Checklist",
];

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline:
    "The Local SEO Checklist: 20 Tasks That Actually Move Rankings for Small Businesses",
  description:
    "The complete local SEO audit checklist for small businesses in the UK. 20 practical tasks across Google Business Profile, website, backlinks, and content that actually move rankings.",
  author: {
    "@type": "Person",
    name: "Olushola Oladipupo",
  },
  publisher: {
    "@type": "Organization",
    name: "Oladipupo Consulting Ltd",
    url: "https://oladipupoconsulting.co.uk",
  },
  datePublished: "2026-03-27",
  dateModified: "2026-03-27",
  mainEntityOfPage:
    "https://oladipupoconsulting.co.uk/blog/local-seo-audit-checklist",
};

function TaskItem({
  number,
  title,
  description,
}: {
  number: number;
  title: string;
  description: string;
}) {
  return (
    <div className="flex gap-4 mb-6">
      <span className="shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-blue-600/20 text-blue-600 text-sm font-bold border border-blue-600/30">
        {number}
      </span>
      <div>
        <p className="text-slate-900 font-semibold mb-1">{title}</p>
        <p className="text-slate-600 text-sm leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

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
            The Local SEO Checklist: 20 Tasks That Actually Move Rankings for
            Small Businesses
          </h1>

          <div className="flex items-center gap-4 text-sm text-slate-400 mb-12">
            <span>27 March 2026</span>
            <span className="text-slate-600">|</span>
            <span>By Olushola Oladipupo</span>
            <span className="text-slate-600">|</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              10 min read
            </span>
          </div>

          <div className="prose prose-slate max-w-none">
            {/* Hook */}
            <p className="text-slate-500 leading-relaxed mb-4 text-lg">
              A 20-task local SEO framework went viral this week &mdash; 2.6
              million views on X. It was built from 14 years of managing local
              SEO for home service businesses. Plumbers, HVAC, cleaning
              companies, lawyers.
            </p>

            <p className="text-slate-500 leading-relaxed mb-4">
              We read the entire thing. Most of it is excellent. But it was
              written for people who already know SEO. If you are a small
              business owner in the UK &mdash; a baker, a plumber, a salon owner
              &mdash; you need the same checklist, written in plain English, with
              the &ldquo;why&rdquo; behind every task.
            </p>

            <p className="text-slate-500 leading-relaxed mb-8">
              So here it is. 20 tasks, organised into four sections. Every task
              is practical, specific, and something you can do (or have someone
              do for you) this month. At the end, we will tell you about the
              tool we are building to automate the entire thing.
            </p>

            {/* Section 1: GBP */}
            <h2 className="text-2xl font-bold mt-12 mb-2">
              Section 1: Google Business Profile (GBP)
            </h2>
            <p className="text-slate-600 text-sm mb-6">
              Your GBP listing is the single most important factor for showing
              up in the Google Maps &ldquo;3-pack&rdquo; &mdash; those three
              businesses that appear at the top when someone searches
              &ldquo;plumber near me&rdquo; or &ldquo;bakery Kettering.&rdquo;
              Get this right first.
            </p>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 mb-8">
              <TaskItem
                number={1}
                title="Audit your GBP categories"
                description="Your primary category determines which searches trigger your listing. If you run an accounting practice and your category is set to 'Business Consultant', you are invisible for 'accountant near me'. Check your primary and secondary categories against what competitors in your area are using. Google allows up to 10 categories — use them."
              />
              <TaskItem
                number={2}
                title="Optimise every GBP attribute"
                description="GBP has dozens of attributes beyond the basics — payment methods accepted, accessibility features, whether you offer free consultations. Every attribute you fill in is another signal to Google. Most of your competitors have left half of these blank. Fill them all."
              />
              <TaskItem
                number={3}
                title="Build a review strategy"
                description="Google Reviews are not vanity metrics — they are ranking signals. Businesses that get 10 reviews a month, each mentioning their service and location, generate 120 pieces of keyword-rich content on their GBP per year. Ask every happy customer. Make it easy: send them a direct link to your review page."
              />
              <TaskItem
                number={4}
                title="Respond to every review with keywords"
                description="When you reply to a review, mention your service and city naturally. 'Thanks for choosing us for your boiler repair in Kettering!' is doing SEO work while being polite. Google reads these responses. Make them count."
              />
              <TaskItem
                number={5}
                title="Post to GBP 2-3 times a week"
                description="GBP posts are free content that Google uses to understand what your business does right now. Post about recent jobs, seasonal offers, team news. Each post should mention a service and an area you serve. Almost nobody does this — which makes it easy to stand out."
              />
              <TaskItem
                number={6}
                title="Write proper service descriptions"
                description="Each service listed on your GBP should have a detailed description. Not 'Plumbing services' — instead, 'Emergency boiler repairs for homes and businesses in Northamptonshire. Same-day callout available.' Be specific. Include locations."
              />
              <TaskItem
                number={7}
                title="Optimise your 750-character GBP description"
                description="This is prime real estate. Your GBP description should include your main services, the areas you serve, trust signals (years in business, accreditations, guarantees), and a clear call to action. Write it like a pitch, not an afterthought."
              />
              <TaskItem
                number={8}
                title="Upload fresh photos regularly"
                description="Businesses with photos get 42% more requests for directions and 35% more click-throughs to their website. Upload photos of your team, your work, your premises. Google rewards fresh, real images — not stock photography."
              />
            </div>

            {/* Section 2: Website */}
            <h2 className="text-2xl font-bold mt-12 mb-2">
              Section 2: Website Optimisation
            </h2>
            <p className="text-slate-600 text-sm mb-6">
              Your website is where Google confirms what your GBP promises.
              These tasks make sure your site ranks for the searches that
              actually bring in customers.
            </p>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 mb-8">
              <TaskItem
                number={9}
                title="Find and fix your page 2 keywords"
                description="If you are ranking on page 2 of Google for a search term, you are one push away from page 1. These are the lowest-hanging fruit in all of SEO. Use Google Search Console to find queries where your average position is 11-20, then improve those pages with better content, internal links, and updated titles."
              />
              <TaskItem
                number={10}
                title="Analyse your competitors' top pages"
                description="Find out which pages drive the most traffic for your local competitors. What topics do they cover that you do not? What service pages do they have that you are missing? Fill the gaps. If a competitor ranks for 'emergency plumber Kettering' and you do not have a page for that, create one."
              />
              <TaskItem
                number={11}
                title="Create city + service landing pages"
                description="Google ranks pages, not websites. If you do not have a page specifically about your service in a specific city, you will not rank for that search. Create individual pages for each combination: 'Boiler Repair Kettering', 'Boiler Repair Corby', 'Boiler Repair Northampton'. Each page should have unique content — not just the city name swapped in."
              />
              <TaskItem
                number={12}
                title="Add LocalBusiness schema markup"
                description="Schema markup is structured data that tells Google exactly what your business is, where it operates, and what it offers. Add JSON-LD LocalBusiness schema to your homepage with your name, address, phone, opening hours, and service area. This improves your chances of appearing in rich results."
              />
              <TaskItem
                number={13}
                title="Fix your technical SEO basics"
                description="Page speed, mobile responsiveness, HTTPS, proper heading structure, meta descriptions on every page. None of this is glamorous. All of it matters. Run your site through Google PageSpeed Insights and fix anything scoring below 80."
              />
            </div>

            {/* Section 3: Backlinks & Citations */}
            <h2 className="text-2xl font-bold mt-12 mb-2">
              Section 3: Backlinks and Citations
            </h2>
            <p className="text-slate-600 text-sm mb-6">
              Backlinks are how Google measures your authority. Citations are
              consistent mentions of your business name, address, and phone
              number across the web. Together, they tell Google you are a real,
              trusted business.
            </p>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 mb-8">
              <TaskItem
                number={14}
                title="Audit your competitors' backlinks"
                description="Find out where your competitors are getting links from. Local directories, industry associations, chamber of commerce, local newspapers. If they have a link from a source that would also be relevant to you, go get it. Most local backlink opportunities are free — they just take time."
              />
              <TaskItem
                number={15}
                title="Clean up your citation consistency"
                description="Your business name, address, and phone number (NAP) must be identical everywhere it appears online — Google, Yell, Thomson Local, Facebook, Apple Maps, Bing Places. Inconsistent NAP confuses Google and weakens your local ranking. Audit every listing and fix discrepancies."
              />
              <TaskItem
                number={16}
                title="Get listed in niche directories"
                description="Beyond the general directories (Yell, Thomson Local, FreeIndex), find directories specific to your industry. Checkatrade for tradespeople, TrustATrader, Bark, MyBuilder. NHS Choices for healthcare. Law Society for solicitors. These niche citations carry more weight."
              />
              <TaskItem
                number={17}
                title="Build local links through content"
                description="Sponsor a local event, write a guest post for a local blog, get featured in a local business roundup. These links from locally-relevant websites are exactly what Google wants to see for local search rankings. One link from your local newspaper is worth more than ten from random directories."
              />
            </div>

            {/* Section 4: Content */}
            <h2 className="text-2xl font-bold mt-12 mb-2">
              Section 4: Content That Ranks Locally
            </h2>
            <p className="text-slate-600 text-sm mb-6">
              Content is what fills the gaps. Every question a customer asks that
              you do not have a page answering is a search result you are giving
              to a competitor.
            </p>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 mb-8">
              <TaskItem
                number={18}
                title="Build your entity in Google's Knowledge Graph"
                description="Google builds a 'knowledge graph' of entities — businesses, people, places. The stronger your entity, the more Google trusts you. Build it with consistent schema markup, a Wikidata entry, LinkedIn company page, Crunchbase profile, and consistent information across every platform."
              />
              <TaskItem
                number={19}
                title="Create FAQ content from real customer questions"
                description="Every question a customer has ever asked you on the phone, on WhatsApp, or in an email is a blog post waiting to be written. 'How much does a boiler service cost in Kettering?' is a search someone is making right now. Answer it on your website and you own that search."
              />
              <TaskItem
                number={20}
                title="Build a content calendar tied to local search"
                description="Consistent content is what keeps your site fresh in Google's eyes. Plan one post a week, each targeting a different service + city combination or a common customer question. After 3 months you will have 12 new pages ranking for searches your competitors are ignoring."
              />
            </div>

            {/* Case study proof */}
            <h2 className="text-2xl font-bold mt-12 mb-4">
              What Happens When You Actually Execute
            </h2>

            <p className="text-slate-500 leading-relaxed mb-4">
              Most people will save this checklist and never execute a single
              task. That is true for every framework ever published.
            </p>

            <p className="text-slate-500 leading-relaxed mb-4">
              We know because we build automation systems for small businesses
              every week. When we worked with{" "}
              <Link
                href="/blog/bakery-saved-15-hours-ai"
                className="text-blue-600 hover:text-blue-600 transition-colors"
              >
                a London wholesale bakery
              </Link>
              , they were spending 15+ hours a week on manual admin &mdash;
              order processing, production planning, delivery routing, payment
              tracking. We automated the entire operation in 7 days.
            </p>

            <p className="text-slate-500 leading-relaxed mb-4">
              The same principle applies here. Local SEO is not complicated. It
              is just time-consuming. The businesses that win are the ones that
              actually do the work &mdash; or the ones that automate it.
            </p>

            <p className="text-slate-500 leading-relaxed mb-8">
              90 days of consistent execution on this checklist and you will
              outrank businesses that have been established for years. That is
              not a guess. That is what the data shows.
            </p>

            {/* The tool */}
            <hr className="border-slate-200 my-10" />

            <h2 className="text-2xl font-bold mt-8 mb-4">
              We Are Automating This Entire Checklist
            </h2>

            <p className="text-slate-500 leading-relaxed mb-4">
              We are building a tool that takes your business details and runs
              this entire 20-task audit automatically. You fill in one form. You
              get back a complete action plan &mdash; your GBP gaps, your
              missing pages, your citation errors, your content opportunities
              &mdash; all specific to your business, your location, your
              competitors.
            </p>

            <p className="text-slate-500 leading-relaxed mb-4">
              No SEO knowledge required. No agency retainer. Just a clear list
              of exactly what to fix and in what order.
            </p>

            <p className="text-slate-500 leading-relaxed mb-8">
              We are calling it <strong className="text-slate-900">RankReady</strong>.
              Sign up below to get early access when it launches.
            </p>

            {/* Waitlist CTA */}
            <RankReadyWaitlist />

            {/* Secondary CTA */}
            <p className="text-slate-500 leading-relaxed mt-8 mb-4">
              In the meantime, if you want someone to run this checklist for
              your business right now, start with our free{" "}
              <Link
                href="/audit"
                className="text-blue-600 hover:text-blue-600 transition-colors"
              >
                AI readiness audit
              </Link>
              . It takes 10 seconds and shows you exactly where automation would
              make the biggest impact on your business.
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
                  href="/blog/get-more-google-reviews"
                  className="text-blue-600 hover:text-blue-600 transition-colors"
                >
                  How to Get More Google Reviews Automatically
                </Link>
              </li>
              <li>
                <Link
                  href="/blog/local-business-website-2026"
                  className="text-blue-600 hover:text-blue-600 transition-colors"
                >
                  Does Your Business Need a Website in 2026?
                </Link>
              </li>
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
                  href="/case-studies/emanuel-bakery"
                  className="text-slate-500 hover:text-slate-900 transition-colors"
                >
                  View the E&apos;Manuel Bakery case study &rarr;
                </Link>
              </li>
            </ul>
          </div>

          {/* CTA Section */}
          <div className="mt-16 bg-blue-50 border border-blue-200 rounded-xl p-8 text-center">
            <h3 className="text-xl font-semibold mb-2">
              Want Us to Run This Checklist for Your Business?
            </h3>
            <p className="text-slate-600 mb-6 max-w-lg mx-auto">
              Take our free AI Readiness Audit. In 10 seconds, you&apos;ll know
              exactly where automation would save you the most time and money.
            </p>
            <Link
              href="/audit"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Get Your Free AI Readiness Audit
              <ArrowRight className="w-4 h-4" />
            </Link>
            <p className="text-slate-400 text-sm mt-3">
              Takes 10 seconds. No obligation. 90-day results guarantee.
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
              href="/blog/what-it-costs-63-agent-ai-business"
              className="text-slate-600 hover:text-slate-900 transition-colors text-sm flex items-center gap-2"
            >
              What It Costs to Run 63 AI Agents
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}
