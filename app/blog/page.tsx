import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { fetchPublishedPosts } from "@/lib/notion-cms";
import BreadcrumbJsonLd from "@/components/shared/BreadcrumbJsonLd";

export const revalidate = 60;

export const metadata = {
  title: "Blog",
  description:
    "AI automation insights, case studies, and tips for small businesses.",
  alternates: {
    canonical: "https://oladipupoconsulting.co.uk/blog",
  },
  openGraph: {
    title: "Blog | Oladipupo Consulting",
    description:
      "AI automation insights, case studies, and tips for small businesses.",
    url: "https://oladipupoconsulting.co.uk/blog",
    type: "website",
  },
  twitter: {
    title: "Blog | Oladipupo Consulting",
    description:
      "AI automation insights, case studies, and tips for small businesses.",
  },
};

const staticPosts = [
  {
    id: "static-cleaning-save-time",
    slug: "ai-save-cleaning-companies-time",
    title: "How AI Saves UK Cleaning Companies 10+ Hours a Week",
    excerpt:
      "How AI automation helps UK cleaning companies save 10+ hours a week on quoting, scheduling, follow-ups, and invoice reminders. Practical guide with real examples.",
    publishedAt: "24 March 2026",
    tags: ["AI Automation", "Cleaning Business", "Service Business", "Industry Guide"],
  },
  {
    id: "static-uk-accountants",
    slug: "ai-for-uk-accountants",
    title: "AI for UK Accountants: Automate Client Onboarding and Chase Invoices",
    excerpt:
      "How UK accounting firms use AI to automate client onboarding, document collection, invoice chasing, and deadline reminders. Save 15+ hours a month.",
    publishedAt: "24 March 2026",
    tags: ["AI Automation", "Accountants", "Professional Services", "Industry Guide"],
  },
  {
    id: "static-follow-ups",
    slug: "automate-customer-follow-ups",
    title: "How to Automate Customer Follow-Ups (Without Being Annoying)",
    excerpt:
      "How to automate customer follow-ups across email, SMS, and WhatsApp without annoying people. Timing, personalisation, and when to stop.",
    publishedAt: "24 March 2026",
    tags: ["AI Automation", "Follow-Ups", "Small Business", "Guides"],
  },
  {
    id: "static-church-chatbot",
    slug: "ai-chatbot-church",
    title: "Why Every Church Needs an AI Chatbot in 2026",
    excerpt:
      "How AI chatbots help churches answer visitor questions, share event info, process giving links, and manage volunteer signups — 24/7, without extra staff.",
    publishedAt: "24 March 2026",
    tags: ["AI Automation", "Churches", "Chatbots", "Industry Guide"],
  },
  {
    id: "static-reduce-no-shows",
    slug: "reduce-no-shows-ai-reminders",
    title: "How to Reduce No-Shows by 60% with AI Reminders",
    excerpt:
      "How AI appointment reminders via SMS, WhatsApp, and Voice AI reduce no-shows by up to 60%. Includes rebooking automation and follow-up strategies for UK businesses.",
    publishedAt: "24 March 2026",
    tags: ["AI Automation", "No-Shows", "Appointments", "Industry Guide"],
  },
  {
    id: "static-bakery-case-study",
    slug: "bakery-saved-15-hours-ai",
    title: "How a London Bakery Saved 15+ Hours a Week With AI",
    excerpt:
      "Real case study: a London wholesale bakery automated order processing, production scheduling, delivery routing, and payment tracking — saving 15+ hours a week. Built in 7 days.",
    publishedAt: "24 March 2026",
    tags: ["Case Study", "AI Automation", "Small Business", "Food & Beverage"],
  },
  {
    id: "static-accountants-20-hours",
    slug: "ai-accountants-save-20-hours",
    title: "AI for UK Accountants: Reclaiming 20+ Hours a Month",
    excerpt:
      "5 tasks UK accounting practices can automate right now — client onboarding, document chasing, deadline reminders, appointment booking, and enquiry response.",
    publishedAt: "24 March 2026",
    tags: ["AI Automation", "Accountants", "Professional Services", "UK Business"],
  },
  {
    id: "static-ai-adoption",
    slug: "small-business-ai-adoption",
    title: "Fewer Than 1 in 5 Small Businesses Are Good at AI",
    excerpt:
      "98% of small businesses say they use AI daily. Only 14% have embedded it into operations. Find out if you are in the 86% — and how to close the gap.",
    publishedAt: "24 March 2026",
    tags: ["AI Adoption", "Small Business", "AI Strategy", "UK Business"],
  },
  {
    id: "static-before-after-leads",
    slug: "before-after-automated-lead-response",
    title: "Before and After: Automating Lead Response",
    excerpt:
      "What happens when a service business automates lead response. Response time drops from 12 hours to 30 seconds. Conversion doubles. Admin disappears.",
    publishedAt: "24 March 2026",
    tags: ["AI Automation", "Lead Response", "Service Business", "Before & After"],
  },
  {
    id: "static-cleaning-automate",
    slug: "cleaning-business-automate-first",
    title: "AI for Cleaning Businesses: 3 Tasks to Automate First",
    excerpt:
      "The 3 tasks losing cleaning businesses the most revenue — after-hours lead capture, booking reminders, and quote follow-up — and how AI handles each automatically.",
    publishedAt: "24 March 2026",
    tags: ["AI Automation", "Cleaning Business", "Lead Generation", "Small Business"],
  },
  {
    id: "static-voice-ai",
    slug: "voice-ai-small-business",
    title: "Voice AI for Small Business: Never Miss a Call Again",
    excerpt:
      "How Voice AI agents answer your business calls 24/7, qualify leads, and book appointments automatically — while you focus on the job. Real costs and real results.",
    publishedAt: "23 March 2026",
    tags: ["Voice AI", "AI Automation", "Small Business", "Lead Generation"],
  },
  {
    id: "static-13",
    slug: "how-can-ai-help-my-business",
    title: "How Can AI Help My Business? 10 Real Examples from UK SMBs",
    excerpt:
      "Wondering how AI can help your business? Here are 10 real examples of UK small businesses using AI automation to save time, win more customers, and cut costs.",
    publishedAt: "20 March 2026",
    tags: ["AI Automation", "Small Business", "UK Business", "Guides"],
  },
  {
    id: "static-14",
    slug: "ai-for-estate-agents",
    title: "AI for Estate Agents: Automate Leads & Viewings",
    excerpt:
      "AI for estate agents isn't hype — it's how the best agencies are responding to Rightmove leads in seconds, booking viewings automatically, and closing more sales.",
    publishedAt: "20 March 2026",
    tags: ["AI Automation", "Estate Agents", "Property", "Industry Guide"],
  },
  {
    id: "static-15",
    slug: "n8n-vs-zapier-vs-make",
    title: "n8n vs Zapier vs Make: Best for UK Business?",
    excerpt:
      "Honest comparison of n8n, Zapier, and Make for UK small businesses. Pricing, pros, cons, data privacy, and which one we recommend for different use cases.",
    publishedAt: "20 March 2026",
    tags: ["AI Automation", "Tools", "Comparison", "Guides"],
  },
  {
    id: "static-16",
    slug: "ai-automation-roi-calculator",
    title: "AI Automation ROI: How Much Can Your Business Actually Save?",
    excerpt:
      "Break down the real ROI of AI automation for UK small businesses. See the maths for plumbers, salons, restaurants, and more — with specific £ figures and payback timelines.",
    publishedAt: "20 March 2026",
    tags: ["AI Automation", "ROI", "Small Business", "Guides"],
  },
  {
    id: "static-17",
    slug: "ai-automation-uk-small-business-guide",
    title: "AI Automation for UK Small Businesses (2026)",
    excerpt:
      "Everything UK small businesses need to know about AI automation in 2026. What it is, what it costs, which automations matter most, and how to get started — with links to every industry guide.",
    publishedAt: "20 March 2026",
    tags: ["AI Automation", "Small Business", "UK Business", "Complete Guide"],
  },
  {
    id: "static-18",
    slug: "ai-chatbot-small-business",
    title: "AI Chatbots for Small Business: Complete Guide",
    excerpt:
      "What AI chatbots actually do for small businesses, where to deploy them (website, WhatsApp, Messenger), what they cost, and whether one is right for you.",
    publishedAt: "20 March 2026",
    tags: ["AI Automation", "Chatbots", "WhatsApp", "Customer Service"],
  },
  {
    id: "static-19",
    slug: "ai-for-electricians",
    title: "AI for Electricians & Tradespeople: Save 10+ Hours a Week",
    excerpt:
      "5 practical AI automations for electricians and tradespeople — from instant quote follow-ups to smart postcode scheduling and automated compliance reminders.",
    publishedAt: "20 March 2026",
    tags: ["AI Automation", "Electricians", "Trades", "Industry Guide"],
  },
  {
    id: "static-20",
    slug: "ai-for-gyms",
    title: "AI for Gyms: Automate Bookings & Retention",
    excerpt:
      "How gyms and fitness studios use AI to fill classes, reduce member churn, convert trials to memberships, and collect reviews — all on autopilot.",
    publishedAt: "20 March 2026",
    tags: ["AI Automation", "Gyms", "Fitness", "Industry Guide"],
  },
  {
    id: "static-21",
    slug: "ai-for-cleaning-companies",
    title: "AI for Cleaning Companies: Win More Contracts",
    excerpt:
      "5 automations helping cleaning companies respond faster to enquiries, schedule staff, collect feedback, and renew contracts automatically.",
    publishedAt: "20 March 2026",
    tags: ["AI Automation", "Cleaning", "Service Business", "Industry Guide"],
  },
  {
    id: "static-22",
    slug: "ai-for-accountants",
    title: "AI for Accountants: Automate Onboarding",
    excerpt:
      "How accounting practices use AI to automate client onboarding, deadline reminders, receipt processing, and monthly reporting — saving 10+ hours a week.",
    publishedAt: "20 March 2026",
    tags: ["AI Automation", "Accountants", "Professional Services", "Industry Guide"],
  },
  {
    id: "static-23",
    slug: "ai-for-dentists",
    title: "AI for Dentists & Dental Practices: Reduce No-Shows by 60%",
    excerpt:
      "Multi-channel appointment reminders, cancellation waitlist auto-fill, treatment plan follow-ups, and automated review collection for dental practices.",
    publishedAt: "20 March 2026",
    tags: ["AI Automation", "Dentists", "Healthcare", "Industry Guide"],
  },
  {
    id: "static-3",
    slug: "automate-appointment-booking",
    title: "Automate Appointment Booking for Your Business",
    excerpt:
      "Stop missing calls and double-booking. Learn how AI appointment booking works for small businesses — and how to set it up in days, not weeks.",
    publishedAt: "19 March 2026",
    tags: ["AI Automation", "Appointment Booking", "Small Business", "Guides"],
  },
  {
    id: "static-4",
    slug: "ai-for-plumbers",
    title: "AI for Plumbers: 5 Automations That Win More Jobs",
    excerpt:
      "AI isn't about replacing plumbers — it's about winning more jobs. Here are 5 practical automations for quote follow-ups, emergency handling, reviews, scheduling, and invoicing.",
    publishedAt: "19 March 2026",
    tags: ["AI Automation", "Plumbers", "Trades", "Industry Guide"],
  },
  {
    id: "static-5",
    slug: "ai-for-salons",
    title: "AI for Salons: Fill Empty Chairs Automatically",
    excerpt:
      "Fewer no-shows, more rebookings, and a full diary — without chasing clients. Here's how salon automation handles reminders, reviews, content, and waitlists.",
    publishedAt: "19 March 2026",
    tags: ["AI Automation", "Salons", "Beauty", "Industry Guide"],
  },
  {
    id: "static-6",
    slug: "ai-for-restaurants",
    title: "AI for Restaurants: Automate Orders, Bookings, and Reviews",
    excerpt:
      "From WhatsApp ordering to automated table bookings and review collection — practical AI automations that help restaurants save time and serve more customers.",
    publishedAt: "19 March 2026",
    tags: ["AI Automation", "Restaurants", "Hospitality", "Industry Guide"],
  },
  {
    id: "static-7",
    slug: "ai-automation-cost",
    title: "How Much Does AI Automation Cost for a Small Business?",
    excerpt:
      "An honest pricing breakdown for AI automation. Compare DIY, freelancer, agency, and specialist costs — with real ROI numbers from real businesses.",
    publishedAt: "19 March 2026",
    tags: ["AI Automation", "Pricing", "Small Business", "Guides"],
  },
  {
    id: "static-8",
    slug: "whatsapp-automation-business",
    title: "WhatsApp Automation for Business: The Complete Guide",
    excerpt:
      "The complete guide to WhatsApp automation for small businesses. How WhatsApp bots handle orders, bookings, FAQs, and follow-ups — automatically.",
    publishedAt: "19 March 2026",
    tags: ["WhatsApp", "AI Automation", "Small Business", "Guides"],
  },
  {
    id: "static-9",
    slug: "ai-for-healthcare",
    title: "AI for Healthcare: Automating Patient Bookings and Follow-Ups",
    excerpt:
      "How clinics, dentists, and healthcare practices use AI to automate patient scheduling, reduce no-shows by 60%, and digitise forms — while staying compliant.",
    publishedAt: "19 March 2026",
    tags: ["AI Automation", "Healthcare", "Clinics", "Industry Guide"],
  },
  {
    id: "static-10",
    slug: "get-more-google-reviews",
    title: "How to Get More Google Reviews Automatically",
    excerpt:
      "Automated review collection can 3x your Google reviews without awkward asks. Here's exactly how it works and why it's the best ROI in local marketing.",
    publishedAt: "19 March 2026",
    tags: ["Google Reviews", "Local SEO", "AI Automation", "Small Business"],
  },
  {
    id: "static-11",
    slug: "ai-for-coaches",
    title: "AI for Coaches and Consultants: Automate Your Admin",
    excerpt:
      "Stop spending half your time on admin. Here's how coaches and consultants use AI to automate booking, onboarding, content repurposing, and invoicing.",
    publishedAt: "19 March 2026",
    tags: ["AI Automation", "Coaches", "Consultants", "Industry Guide"],
  },
  {
    id: "static-12",
    slug: "what-is-ai-readiness-audit",
    title: "What Is an AI Readiness Audit? (And Why It's Free)",
    excerpt:
      "Find out what our free AI Readiness Audit includes, how it works, and why there's genuinely no catch. A personalised report showing where AI can save your business time and money.",
    publishedAt: "19 March 2026",
    tags: ["AI Audit", "Small Business", "Getting Started", "Guides"],
  },
  {
    id: "static-1",
    slug: "5-ways-ai-saves-time",
    title: "5 Ways AI Can Save Your Small Business 10+ Hours a Week",
    excerpt:
      "Discover how AI automation helps UK small businesses save 10+ hours every week. From appointment booking to email responses — practical examples for plumbers, salons, cleaners and more.",
    publishedAt: "18 March 2026",
    tags: ["AI Automation", "Small Business", "Productivity", "UK Business"],
  },
  {
    id: "static-2",
    slug: "local-business-website-2026",
    title:
      "Does Your Business Need a Website in 2026?",
    excerpt:
      "46% of UK small businesses still don't have a website. Here's why that's costing you customers, what a good website needs, and what it actually costs in 2026.",
    publishedAt: "18 March 2026",
    tags: ["Websites", "Local Business", "SEO", "UK Business"],
  },
  {
    id: "static-new-1",
    slug: "ai-for-solicitors",
    title: "AI for Solicitors: Automate Intake & Billing",
    excerpt:
      "How UK solicitors and law firms use AI to automate client intake, time recording, case updates, document assembly, and SRA compliance tracking.",
    publishedAt: "21 March 2026",
    tags: ["AI Automation", "Solicitors", "Legal", "Industry Guide"],
  },
  {
    id: "static-new-2",
    slug: "ai-for-recruitment-agencies",
    title: "AI for Recruitment Agencies: Automate Screening",
    excerpt:
      "5 practical AI automations for UK recruitment agencies — from CV screening and candidate outreach to IR35 compliance and placement tracking.",
    publishedAt: "21 March 2026",
    tags: ["AI Automation", "Recruitment", "Staffing", "Industry Guide"],
  },
  {
    id: "static-new-3",
    slug: "ai-for-mortgage-brokers",
    title: "AI for Mortgage Brokers: Qualify Leads Faster",
    excerpt:
      "How UK mortgage brokers use AI to qualify leads faster, chase documents automatically, match lender products, and stay FCA compliant.",
    publishedAt: "21 March 2026",
    tags: ["AI Automation", "Mortgage Brokers", "Financial Services", "Industry Guide"],
  },
  {
    id: "static-new-4",
    slug: "ai-for-care-homes",
    title: "AI for Care Homes: Automate Rotas & Compliance",
    excerpt:
      "5 AI automations for UK care homes and domiciliary care agencies — from staff rota planning and family updates to CQC compliance and training tracking.",
    publishedAt: "21 March 2026",
    tags: ["AI Automation", "Care Homes", "Healthcare", "Industry Guide"],
  },
];

export default async function BlogPage() {
  const notionPosts = await fetchPublishedPosts();

  // Combine Notion posts with static posts, static posts appear after Notion posts
  const allPosts = [
    ...notionPosts.map((post) => ({
      id: post.id,
      slug: post.slug,
      title: post.title,
      excerpt: post.excerpt,
      publishedAt: post.publishedAt,
      tags: post.tags,
    })),
    ...staticPosts,
  ];

  return (
    <div className="min-h-screen">
      <BreadcrumbJsonLd items={[{ name: "Blog", href: "/blog" }]} />
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <p className="text-blue-400 text-sm font-semibold uppercase tracking-wider mb-3">
            Blog
          </p>
          <h1 className="text-4xl font-bold mb-4">
            AI Automation Insights
          </h1>
          <p className="text-zinc-400 max-w-2xl text-lg mb-12">
            Practical tips, case studies, and behind-the-scenes of building AI
            automation for small businesses.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {allPosts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="group bg-zinc-900 border border-zinc-800 rounded-xl p-6 hover:border-zinc-700 transition-colors"
              >
                <div className="flex flex-wrap gap-2 mb-3">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs bg-zinc-800 text-zinc-400 px-2 py-0.5 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h2 className="text-lg font-semibold mb-2 group-hover:text-blue-400 transition-colors">
                  {post.title}
                </h2>
                {post.excerpt && (
                  <p className="text-zinc-400 text-sm mb-3 line-clamp-2">
                    {post.excerpt}
                  </p>
                )}
                <div className="flex items-center justify-between">
                  <span className="text-xs text-zinc-500">
                    {post.publishedAt}
                  </span>
                  <span className="text-sm text-blue-400 flex items-center gap-1 group-hover:gap-2 transition-all">
                    Read
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
