export type ServiceProof = {
  heading: string; // e.g. "Real Results" or "What This Looks Like"
  stats?: { label: string; value: string }[];
  description: string;
  clientName?: string; // shows "— ClientName" attribution if present
};

export type Service = {
  slug: string;
  name: string;
  tier: "starter" | "growth" | "scale" | "premium";
  setupPrice: string;
  monthlyPrice: string;
  deliveryDays: string;
  idealFor: string;
  pain: string;
  deliverables: string[];
  referenceClient?: string;
  icon: string; // Lucide icon name
  proof?: ServiceProof;
  ctaText?: string; // override default "Get in Touch"
  ctaHref?: string; // override default "/contact"
  ctaSubtext?: string; // override subtitle text
};

export const services: Service[] = [
  // --- Proven (live clients) ---
  {
    slug: "order-automation",
    name: "Order-to-Delivery Automation",
    tier: "growth",
    setupPrice: "£1,500",
    monthlyPrice: "£150/mo",
    deliveryDays: "7-10 days",
    idealFor: "Food businesses, bakeries, caterers",
    pain: "Manual order collection, payment chasing",
    deliverables: [
      "Online order form",
      "Production dashboard",
      "Payment matching",
      "Delivery route optimisation",
      "WhatsApp alerts",
      "9 workflows",
    ],
    referenceClient: "E'Manuel Bakery",
    icon: "ShoppingCart",
    proof: {
      heading: "Real Results",
      stats: [
        { label: "Orders automated weekly", value: "180+" },
        { label: "Hours saved per week", value: "8+" },
        { label: "Monthly value of time saved", value: "~£400" },
        { label: "Workflows running 24/7", value: "9" },
      ],
      description:
        "E'Manuel Foods & Bakery in Kettering went from manually collecting orders via WhatsApp and spreadsheets to a fully automated pipeline — order intake, payment matching (SumUp + bank transfer), production schedules, delivery routes, and customer confirmations. All built and live in under two weeks.",
      clientName: "E'Manuel Foods & Bakery",
    },
    ctaText: "Get a Free AI Audit",
    ctaHref: "/audit",
    ctaSubtext: "See exactly how automation would work for your business — takes 60 seconds.",
  },
  {
    slug: "business-website",
    name: "Professional Business Website",
    tier: "growth",
    setupPrice: "£1,500",
    monthlyPrice: "£150/mo",
    deliveryDays: "10-14 days",
    idealFor: "Churches, charities, local businesses",
    pain: "No/outdated website",
    deliverables: [
      "Custom responsive site",
      "Brand identity",
      "8-12 pages",
      "Contact forms",
      "SEO baseline",
      "Domain email",
      "SSL",
    ],
    referenceClient: "QuantumFM Media",
    icon: "Globe",
    proof: {
      heading: "Real Results",
      stats: [
        { label: "Pages delivered", value: "12" },
        { label: "Delivery time", value: "Under 2 weeks" },
        { label: "CMS", value: "WordPress headless" },
      ],
      description:
        "QuantumFM Media needed a professional online presence with an event directory, blog, and full brand identity. We delivered a 12-page custom website with WordPress headless CMS, responsive design, and SEO foundations — all in under two weeks.",
      clientName: "QuantumFM Media",
    },
    ctaText: "See a Demo",
    ctaHref: "/contact",
    ctaSubtext: "We'll walk you through a live site we've built and mock up yours.",
  },

  // --- Ready to deploy ---
  {
    slug: "lead-intake",
    name: "AI Lead Intake & Appointment Booking",
    tier: "starter",
    setupPrice: "£500",
    monthlyPrice: "£50/mo",
    deliveryDays: "5-7 days",
    idealFor: "Plumbers, cleaners, salons, gyms",
    pain: "Missing leads, slow response",
    deliverables: [
      "Lead capture form",
      "AI qualification",
      "Calendar booking",
      "Follow-up sequences",
      "KPI dashboard",
    ],
    referenceClient: undefined,
    icon: "CalendarCheck",
    proof: {
      heading: "Real Results",
      description:
        "We built exactly this for E'Manuel Bakery — automated order intake that replaced manual WhatsApp collection. 180+ orders per week now flow through automatically with zero admin time. The same approach works for appointment-based businesses: a lead comes in, AI qualifies them, books the calendar slot, and sends a confirmation — all in under 60 seconds.",
      stats: [
        { label: "Response time", value: "Under 60 seconds" },
        { label: "Proven with", value: "180+ orders/week" },
      ],
      clientName: "E'Manuel Foods & Bakery",
    },
    ctaText: "Get a Free AI Audit",
    ctaHref: "/audit",
    ctaSubtext: "See exactly where automation would save you time — takes 60 seconds.",
  },
  {
    slug: "whatsapp-bot",
    name: "WhatsApp Customer Bot",
    tier: "growth",
    setupPrice: "£1,500",
    monthlyPrice: "£150/mo",
    deliveryDays: "7-10 days",
    idealFor: "Restaurants, takeaways, salons",
    pain: "Manual WhatsApp replies",
    deliverables: [
      "WhatsApp API bot",
      "Order-taking",
      "FAQ handling",
      "Payment links",
      "Human handoff",
    ],
    referenceClient: undefined,
    icon: "MessageCircle",
    proof: {
      heading: "Real Results",
      description:
        "E'Manuel Bakery's customers get instant WhatsApp confirmations the moment their order is placed — no manual messages, no delays. The bot handles order acknowledgements, delivery updates, and payment reminders automatically. Their customers regularly reply saying they love the fast updates.",
      stats: [
        { label: "Confirmations sent weekly", value: "180+" },
        { label: "Manual messages eliminated", value: "100%" },
        { label: "Response time", value: "Instant" },
      ],
      clientName: "E'Manuel Foods & Bakery",
    },
    ctaText: "Get a Free AI Audit",
    ctaHref: "/audit",
    ctaSubtext: "Find out if a WhatsApp bot is right for your business — 60-second audit.",
  },
  {
    slug: "email-assistant",
    name: "AI Email Assistant",
    tier: "starter",
    setupPrice: "£500",
    monthlyPrice: "£50/mo",
    deliveryDays: "3-5 days",
    idealFor: "Consultants, agencies, tradespeople",
    pain: "Drowning in emails",
    deliverables: [
      "AI-drafted replies",
      "Learns tone",
      "Handles enquiries/quotes/scheduling",
    ],
    referenceClient: undefined,
    icon: "Mail",
    proof: {
      heading: "What This Looks Like",
      description:
        "A plumber gets 30 enquiry emails a day — quotes, scheduling, follow-ups. Our AI email assistant drafts replies in your tone, handles the back-and-forth on scheduling, and flags anything that needs your personal attention. One of our automation clients saved 8+ hours a week on admin alone — email is usually the biggest chunk of that.",
      stats: [
        { label: "Draft replies in", value: "Under 30 seconds" },
        { label: "Admin time recovered", value: "5-8 hrs/week" },
      ],
    },
    ctaText: "Get a Free AI Audit",
    ctaHref: "/audit",
    ctaSubtext: "We'll show you exactly how much email time you can get back.",
  },
  {
    slug: "seo-content",
    name: "SEO Content Automation",
    tier: "starter",
    setupPrice: "£500",
    monthlyPrice: "£50/mo",
    deliveryDays: "5-7 days",
    idealFor: "Local service businesses",
    pain: "Invisible on Google",
    deliverables: [
      "AI keyword research",
      "2-4 posts/month",
      "Local SEO pages",
      "WordPress auto-publish",
      "Monthly report",
    ],
    referenceClient: undefined,
    icon: "Search",
    proof: {
      heading: "Real Results",
      description:
        "We built QuantumFM Media's website with a full blog and SEO foundations from scratch. Their site now ranks for local search terms, drives organic traffic, and the headless WordPress CMS lets them publish new content without touching code. The same content engine powers our own consulting site — 12 blog posts, 5 city landing pages, and 26 pages indexed on Google within weeks.",
      stats: [
        { label: "Pages indexed (our own site)", value: "26" },
        { label: "Blog posts published", value: "12" },
        { label: "City landing pages", value: "5" },
      ],
      clientName: "QuantumFM Media + our own site",
    },
    ctaText: "See Sample Content",
    ctaHref: "/blog",
    ctaSubtext: "Browse real AI-generated blog posts we've published for SEO.",
  },
  {
    slug: "social-media",
    name: "Social Media Content Engine",
    tier: "starter",
    setupPrice: "£500",
    monthlyPrice: "£50/mo",
    deliveryDays: "3-5 days",
    idealFor: "Coaches, personal brands, restaurants",
    pain: "No time for social media",
    deliverables: [
      "Content repurposing",
      "AI captions",
      "Multi-platform formatting",
    ],
    referenceClient: undefined,
    icon: "Share2",
    proof: {
      heading: "What This Looks Like",
      description:
        "A gym owner records one 3-minute video about a new class. Our system turns it into: a vertical Reel with captions, a carousel post with key quotes, a Twitter thread, a blog summary, and a newsletter snippet — all formatted for each platform. You create once, we distribute everywhere. No editing skills needed.",
      stats: [
        { label: "Platforms covered", value: "5+" },
        { label: "Content pieces from 1 video", value: "5-8" },
        { label: "Your time per week", value: "Under 30 min" },
      ],
    },
    ctaText: "See Sample Content",
    ctaHref: "/blog",
    ctaSubtext: "See how we repurpose content across channels.",
  },
  {
    slug: "lead-scraping",
    name: "Lead Scraping & Enrichment",
    tier: "starter",
    setupPrice: "£500",
    monthlyPrice: "£50/mo",
    deliveryDays: "5-7 days",
    idealFor: "B2B services, recruitment, marketing agencies",
    pain: "Manual prospect research",
    deliverables: [
      "Web scraping",
      "Data enrichment",
      "AI lead scoring",
      "Clean CSV output",
    ],
    referenceClient: undefined,
    icon: "Database",
    proof: {
      heading: "What This Looks Like",
      description:
        "A recruitment agency needs 200 qualified leads per week. Our scraper pulls business name, email, phone, website, and social profiles from directories and LinkedIn — then AI scores each lead by fit and enriches with company size, industry, and decision-maker info. You get a clean spreadsheet of ready-to-contact prospects every Monday morning.",
      stats: [
        { label: "Leads per run", value: "200+" },
        { label: "Data points per lead", value: "8-12" },
        { label: "Manual research replaced", value: "10+ hrs/week" },
      ],
    },
    ctaText: "Get a Free AI Audit",
    ctaHref: "/audit",
    ctaSubtext: "We'll assess your pipeline and show where scraping can fill the gaps.",
  },
  {
    slug: "voice-assistant",
    name: "Voice Assistant Agent",
    tier: "starter",
    setupPrice: "£500",
    monthlyPrice: "£50/mo",
    deliveryDays: "5-7 days",
    idealFor: "Solo practitioners, clinics, tutors",
    pain: "Missing calls, no after-hours",
    deliverables: [
      "AI phone/Telegram agent",
      "Calendar booking",
      "FAQ handling",
      "Human escalation",
    ],
    referenceClient: undefined,
    icon: "Phone",
    proof: {
      heading: "What This Looks Like",
      description:
        "A physiotherapy clinic misses 40% of calls during sessions. Our voice agent picks up instantly, answers common questions (pricing, availability, location), books appointments directly into the calendar, and texts the patient a confirmation — all without interrupting the practitioner. After hours, it handles everything the same way.",
      stats: [
        { label: "Response time", value: "Instant" },
        { label: "Missed calls recovered", value: "Up to 40%" },
        { label: "After-hours coverage", value: "24/7" },
      ],
    },
    ctaText: "Get a Free AI Audit",
    ctaHref: "/audit",
    ctaSubtext: "Find out how many leads you're losing to missed calls.",
  },
  {
    slug: "ai-workshop",
    name: "AI Workshop for Teams",
    tier: "premium",
    setupPrice: "£500-5,000",
    monthlyPrice: "per session",
    deliveryDays: "2-4 hours",
    idealFor: "SMB teams of 5-50",
    pain: "Know AI exists but haven't adopted",
    deliverables: [
      "In-person or virtual",
      "Hands-on",
      "Industry-tailored",
    ],
    referenceClient: undefined,
    icon: "GraduationCap",
    proof: {
      heading: "What This Looks Like",
      description:
        "A 15-person estate agency books a half-day workshop. In 3 hours, every team member builds their own AI email assistant, learns to use ChatGPT for property descriptions, and sets up an automated follow-up sequence for viewings. They leave with working tools they use from day one — not slides they forget by Friday.",
      stats: [
        { label: "Format", value: "Half-day, hands-on" },
        { label: "Team size", value: "5-50 people" },
        { label: "Tools built in session", value: "2-3 per person" },
      ],
    },
    ctaText: "Book a Workshop",
    ctaHref: "/contact",
    ctaSubtext: "Tell us your team size and goals — we'll tailor the session.",
  },
  {
    slug: "ai-audit",
    name: "AI Readiness Audit",
    tier: "premium",
    setupPrice: "FREE",
    monthlyPrice: "normally £150",
    deliveryDays: "48 hours",
    idealFor: "Any prospect",
    pain: "Unsure where AI fits — normally £150, currently free for a limited time",
    deliverables: [
      "5-section report",
      "Business snapshot",
      "AI opportunity map",
      "ROI projection",
      "Recommended solution",
    ],
    referenceClient: undefined,
    icon: "FileSearch",
    proof: {
      heading: "Real Results",
      description:
        "Our instant AI audit scores your business in under 60 seconds — no email required. Enter a few details and get an AI readiness score, top automation opportunities, and a projected ROI. Over a dozen businesses have taken it so far. Want the full 5-section deep-dive report? Just add your email and we'll send it within 48 hours.",
      stats: [
        { label: "Time to get your score", value: "60 seconds" },
        { label: "Cost", value: "FREE" },
        { label: "Full report delivery", value: "48 hours" },
      ],
    },
    ctaText: "Take the Free Audit Now",
    ctaHref: "/audit",
    ctaSubtext: "60 seconds. No email required. Instant AI readiness score.",
  },
  {
    slug: "custom-build",
    name: "Custom Automation Build",
    tier: "premium",
    setupPrice: "from £500",
    monthlyPrice: "quoted",
    deliveryDays: "1-3 weeks",
    idealFor: "Businesses with unique problems",
    pain: "Unique workflow problems",
    deliverables: [
      "Audit first",
      "Custom proposal",
      "Bespoke build",
    ],
    referenceClient: undefined,
    icon: "Wrench",
    proof: {
      heading: "Real Results",
      description:
        "E'Manuel Foods & Bakery needed something no off-the-shelf tool could do: a system that takes a WhatsApp order, matches it to a SumUp or bank transfer payment, generates a production schedule, optimises delivery routes by town, and sends the customer a confirmation — all automatically. We built 9 custom workflows that save 8+ hours a week and handle 180+ orders without a single manual step.",
      stats: [
        { label: "Custom workflows built", value: "9" },
        { label: "Hours saved per week", value: "8+" },
        { label: "Orders handled weekly", value: "180+" },
      ],
      clientName: "E'Manuel Foods & Bakery",
    },
    ctaText: "Get a Free AI Audit",
    ctaHref: "/audit",
    ctaSubtext: "Tell us what's broken — we'll show you what we can build.",
  },
];

export const servicesByTier = {
  starter: services.filter((s) => s.tier === "starter"),
  growth: services.filter((s) => s.tier === "growth"),
  scale: services.filter((s) => s.tier === "scale"),
  premium: services.filter((s) => s.tier === "premium"),
};
