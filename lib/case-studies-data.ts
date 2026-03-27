export type CaseStudy = {
  slug: string;
  name: string;
  industry: string;
  location: string;
  tier: string;
  heroStat: string;
  heroLabel: string;
  heroHeadline?: string; // benefit-focused headline override
  problem: string;
  problemExpanded?: string; // longer version for detail page
  solution: string;
  solutionExpanded?: string; // longer version for detail page
  results: { label: string; value: string }[];
  deliverables: string[];
  testimonial?: string;
  beforeAfter?: { before: string; after: string }[];
  annualSaving?: string;
  timeline?: string; // how long the project took
  techStack?: string[]; // tools used (human-readable labels)
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "emanuel-bakery",
    name: "E'Manuel Foods & Bakery",
    heroHeadline: "How a Kettering Bakery Saved 8 Hours a Week and Automated 180 Orders",
    industry: "Food & Bakery",
    location: "Kettering, UK",
    tier: "Growth",
    heroStat: "8 hrs",
    heroLabel: "saved per week — equivalent to ~£400/month in admin costs",
    problem:
      "Running a Nigerian-style bread bakery handling 140-180 weekly orders. Orders came in via WhatsApp messages, payments were manually tracked across SumUp and bank transfers, and production quantities were hand-tallied. The owner spent 8+ hours per week on admin instead of baking.",
    problemExpanded:
      "Tunmise runs E'Manuel Foods & Bakery, a Nigerian-style bakery in Kettering that delivers fresh bread across the Midlands. Before working with us, every part of the business ran on manual effort. Customers placed orders via WhatsApp messages — often incomplete, sometimes contradictory. Tunmise would spend hours every evening collating these messages into a spreadsheet, hand-tallying production quantities for each bread type, and manually tracking which customers had paid via SumUp or bank transfer. Payment reconciliation was a particular headache: SumUp generates its own transaction references, so matching a payment to an order meant cross-referencing amounts, customer names, and timing across two separate systems. Delivery routes were planned by memory. The business was growing — 140 to 180 orders per week — but the admin was growing faster. Tunmise was spending 8+ hours per week on tasks that had nothing to do with actually baking bread.",
    solution:
      "Built 9 automated workflows — online order form (Tally.so), real-time Google Sheets production dashboard (5 tabs), automated payment matching across SumUp and bank transfers, delivery route optimisation with Google Maps, WhatsApp order confirmations.",
    solutionExpanded:
      "We replaced the entire manual process with 9 interconnected AI workflows, built and deployed in under two weeks. First, we moved order collection from WhatsApp to a custom Tally.so form — customers fill in their name, address, products, and quantities in under 60 seconds. The form feeds directly into a Google Sheets production dashboard with 5 tabs: orders, payments, production quantities, delivery routes, and weekly summaries. The payment matching engine (our most complex workflow) polls SumUp every 30 minutes and cross-references transactions against orders using a 4-tier matching system: submission ID match, name + amount match, name-only match (for partial payments), and amount-only match with duplicate safeguards. Bank transfer matching works the same way when Tunmise uploads his bank statement CSV. Every order triggers an instant WhatsApp confirmation via Twilio so customers know their order was received. On Fridays, a delivery route optimizer groups orders by town and generates Google Maps navigation links for each stop. A Monday cleanup workflow archives the previous week and resets the dashboard for the new cycle. Tunmise now checks a single dashboard for 60 seconds each morning instead of spending hours on admin each evening.",
    results: [
      { label: "Admin time saved", value: "8 hrs/week (~£400/mo)" },
      { label: "Orders processed automatically", value: "180+/week" },
      { label: "Manual payment reconciliation", value: "Zero" },
      { label: "Production tallies", value: "Automated" },
      { label: "Delivery route generation", value: "One-click" },
      { label: "Customer order confirmations", value: "Instant (WhatsApp)" },
    ],
    deliverables: [
      "Custom online order form replacing WhatsApp ordering",
      "5-tab Google Sheets production dashboard with real-time data",
      "9 automated n8n workflows running 24/7",
      "SumUp payment matching engine with 4-tier verification",
      "Bank transfer CSV matching via HSBC statement upload",
      "WhatsApp order confirmations via Twilio (instant)",
      "Friday delivery route optimiser with Google Maps links",
      "Monday weekly cleanup and dashboard reset",
      "Daily exception alerts for unmatched payments and errors",
      "Password-protected client dashboard at app.oladipupoconsulting.co.uk",
    ],
    beforeAfter: [
      { before: "8+ hours of admin every week", after: "60 seconds checking a dashboard each morning" },
      { before: "Manual WhatsApp order-taking (incomplete, error-prone)", after: "Structured online form with instant confirmation" },
      { before: "Guessing production quantities from WhatsApp messages", after: "Real-time dashboard auto-tallying every product" },
      { before: "Manual SumUp + bank transfer reconciliation", after: "Automated 4-tier payment matching engine" },
      { before: "Delivery routes planned from memory", after: "One-click Google Maps routes grouped by town" },
      { before: "No visibility into weekly sales or outstanding payments", after: "Full financial dashboard with unpaid customer tracking" },
    ],
    annualSaving: "Estimated annual saving: \u00A320,000+ in admin time — equivalent to hiring a part-time administrator",
    timeline: "Built and deployed in under 2 weeks. Phase 2 (advanced payment matching) delivered 1 week later.",
    techStack: [
      "Online order forms (Tally.so)",
      "Production dashboard (Google Sheets)",
      "Workflow automation (n8n Cloud — 9 workflows)",
      "Payment processing (SumUp + bank transfers)",
      "Customer messaging (WhatsApp via Twilio)",
      "Route planning (Google Maps)",
      "Client dashboard (Next.js on Vercel)",
    ],
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
