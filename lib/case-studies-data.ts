export type CaseStudy = {
  slug: string;
  name: string;
  industry: string;
  location: string;
  tier: string;
  heroStat: string;
  heroLabel: string;
  problem: string;
  solution: string;
  results: { label: string; value: string }[];
  deliverables: string[];
  testimonial?: string;
  beforeAfter?: { before: string; after: string }[];
  annualSaving?: string;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "emanuel-bakery",
    name: "E'Manuel Foods & Bakery",
    industry: "Food & Bakery",
    location: "Kettering, UK",
    tier: "Growth",
    heroStat: "8 hrs",
    heroLabel: "saved per week — equivalent to ~£400/month in admin costs",
    problem:
      "Running a Nigerian-style bread bakery handling 140-180 weekly orders. Orders came in via WhatsApp messages, payments were manually tracked across SumUp and bank transfers, and production quantities were hand-tallied. The owner spent 8+ hours per week on admin instead of baking.",
    solution:
      "Built 9 automated workflows — online order form (Tally.so), real-time Google Sheets production dashboard (5 tabs), automated payment matching across SumUp and bank transfers, delivery route optimisation with Google Maps, WhatsApp order confirmations.",
    results: [
      { label: "Admin time saved", value: "8 hrs/week (~£400/mo)" },
      { label: "Orders processed automatically", value: "140-180/week" },
      { label: "Manual payment reconciliation", value: "Zero" },
      { label: "Production tallies", value: "Automated" },
      { label: "Delivery route generation", value: "One-click" },
    ],
    deliverables: [
      "Online order form",
      "5-tab production dashboard",
      "9 automated workflows",
      "SumUp payment matching",
      "WhatsApp Twilio integration",
      "Google Maps route optimisation",
    ],
    beforeAfter: [
      { before: "8+ hours of admin every week", after: "Fully automated -- zero manual work" },
      { before: "Manual WhatsApp order-taking", after: "Online form with auto-confirmations" },
      { before: "Guessing production quantities", after: "Real-time dashboard with order data" },
      { before: "Manual payment reconciliation", after: "Automated SumUp matching" },
    ],
    annualSaving: "Estimated annual saving: \u00A320,000+ in admin time",
  },
  {
    slug: "quantumfm-media",
    name: "QuantumFM Media",
    industry: "Media & Events",
    location: "UK",
    tier: "Growth",
    heroStat: "12 pages",
    heroLabel: "professional website",
    problem:
      "A multi-denominational church events platform with no online presence. Events were shared word-of-mouth, there was no central directory, and the organisation lacked brand credibility to attract event organisers and attendees.",
    solution:
      "Built a custom Next.js website with WordPress headless CMS, full brand identity (logo, colours, typography), 12-page site with event directory, blog, contact forms, and video/podcast infrastructure. Deployed to Vercel with custom domain.",
    results: [
      { label: "Website", value: "Live at quantumfm.net" },
      { label: "Brand identity", value: "Fully designed" },
      { label: "Event directory", value: "6 categories" },
      { label: "Blog", value: "WordPress-powered" },
      { label: "Contact forms", value: "Spam protected" },
      { label: "Infrastructure", value: "SSL + custom domain" },
    ],
    deliverables: [
      "Next.js 16 + React 19 frontend",
      "WordPress headless CMS",
      "Brand identity package",
      "12 responsive pages",
      "Web3Forms integration",
      "Vercel deployment + DNS",
    ],
    beforeAfter: [
      { before: "No online presence -- invisible on Google", after: "Professional 12-page website live" },
      { before: "Events shared only on WhatsApp", after: "Full events calendar with online discovery" },
      { before: "No brand identity", after: "Complete brand kit -- logo, colours, typography" },
    ],
  },
  {
    slug: "seo-sprint",
    name: "SEO Sprint — Oladipupo Consulting",
    industry: "Professional Services",
    location: "UK (Nationwide)",
    tier: "Scale",
    heroStat: "1.5 hrs",
    heroLabel: "to deliver £2,250–£4,125 worth of SEO work",
    problem:
      "A live Next.js website with 54 pages indexed by Google — but only 2 organic visits per month. Facebook ads were driving all traffic. No structured data beyond basic Open Graph, no internal linking between blog posts, no Google Business Profile, and AI scrapers were freely crawling content. The site was invisible to anyone searching on Google.",
    solution:
      "Executed a focused SEO sprint covering 13 tasks in a single evening using Claude Code. Technical SEO fixes (security headers, image optimisation, sitemap accuracy, AI scraper blocking), structured data (BreadcrumbList and FAQPage JSON-LD across 6 page types), content overhaul (92+ internal links across 23 blog posts, 5 city pages enriched with unique local content, 4 new industry blog posts, an interactive AI ROI Calculator), and off-site SEO setup (Google Search Console, Google Business Profile, directory listings guide).",
    results: [
      { label: "Equivalent manual effort", value: "45–55 hrs" },
      { label: "Files changed", value: "45" },
      { label: "Lines of code added", value: "3,676" },
      { label: "FAQ rich snippets added", value: "18" },
      { label: "Internal links added", value: "92+" },
      { label: "New blog posts", value: "4" },
    ],
    deliverables: [
      "Security headers and AVIF/WebP image optimisation",
      "AI scraper blocking (GPTBot, CCBot, Google-Extended, anthropic-ai)",
      "Sitemap fix with accurate last-modified dates",
      "Author bylines on all blog posts for E-E-A-T",
      "BreadcrumbList JSON-LD across 6 page types",
      "FAQPage JSON-LD with 18 interactive accordion FAQs",
      "Internal linking overhaul — 92+ contextual links across 23 posts",
      "5 city pages enriched with unique local content",
      "4 new industry blog posts (Solicitors, Recruitment, Mortgage Brokers, Care Homes)",
      "Interactive AI ROI Calculator at /tools/ai-roi-calculator",
      "Google Search Console verification and sitemap submission",
      "Google Business Profile setup",
      "Directory listings guide for 13 UK directories",
    ],
    beforeAfter: [
      { before: "2 organic visits per month", after: "Targeting 50–100+ within 3–6 months" },
      { before: "Zero internal links between blog posts", after: "92+ contextual internal links" },
      { before: "No structured data (FAQ, breadcrumbs)", after: "18 FAQ rich snippets + breadcrumbs on 6 page types" },
      { before: "City pages with no unique content", after: "5 cities with local industries and context" },
      { before: "AI scrapers freely crawling content", after: "Blocked — search engines still allowed" },
    ],
    annualSaving: "This work compounds — unlike paid ads, every blog post, schema markup, and internal link keeps generating organic traffic 24/7",
  },
];
