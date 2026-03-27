export type ServiceProof = {
  heading: string; // e.g. "Real Results" or "What This Looks Like"
  stats?: { label: string; value: string }[];
  description: string;
  clientName?: string; // shows "— ClientName" attribution if present
};

export type HowItWorksStep = {
  step: number;
  title: string;
  description: string;
  icon: string; // Lucide icon name
};

export type ServiceFAQ = {
  question: string;
  answer: string;
};

export type ServiceBeforeAfter = {
  metric: string;
  before: string;
  after: string;
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
  metaDescription?: string; // SEO meta description (150-160 chars). Falls back to pain-based template if not set.
  deliverables: string[];
  referenceClient?: string;
  icon: string; // Lucide icon name
  proof?: ServiceProof;
  heroHeadline?: string; // benefit-focused headline override for service detail page
  ctaText?: string; // override default "Get in Touch"
  ctaHref?: string; // override default "/contact"
  ctaSubtext?: string; // override subtitle text
  howItWorks?: HowItWorksStep[];
  beforeAfter?: ServiceBeforeAfter[];
  faq?: ServiceFAQ[];
  roiSnippet?: string; // ROI calculation/savings estimate paragraph
  whatsIncluded?: string[]; // expanded deliverables with benefit descriptions
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
    metaDescription: "Automate orders, payments, production schedules, and deliveries with AI. Save 8+ hours per week. Built for bakeries, caterers, and food businesses. From £1,500.",
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
    metaDescription: "Get a professional, SEO-optimised business website built in under 2 weeks. Custom design, contact forms, and domain email included. From £1,500 setup.",
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
    heroHeadline: "Never Miss Another Lead. AI Books Appointments While You Work.",
    tier: "starter",
    setupPrice: "£500",
    monthlyPrice: "£50/mo",
    deliveryDays: "5-7 days",
    idealFor: "Plumbers, cleaners, salons, gyms",
    pain: "Missing leads, slow response",
    metaDescription: "Automate lead intake and appointment booking with AI. Respond to enquiries in seconds, book jobs automatically, and never miss a lead. Setup from £500 in 5-7 days.",
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
    howItWorks: [
      {
        step: 1,
        title: "Audit Your Current Process",
        description: "We map how leads reach you today — phone, email, website, social — and identify where you're losing them. Most businesses lose 30-40% of leads to slow response times.",
        icon: "Search",
      },
      {
        step: 2,
        title: "Build Your AI Intake System",
        description: "We set up your custom lead capture form, AI qualification logic, and calendar integration. The AI learns what makes a good lead for YOUR business — budget, location, urgency, job type.",
        icon: "Wrench",
      },
      {
        step: 3,
        title: "Launch & Test",
        description: "Your system goes live. Every new lead gets an instant response, qualification questions, and a booking link — all within 60 seconds. We test with real enquiries before you go fully live.",
        icon: "Rocket",
      },
      {
        step: 4,
        title: "Optimise Monthly",
        description: "We review your KPI dashboard weekly: response times, booking rates, no-shows. We tweak the qualification logic, follow-up sequences, and booking flow to continuously improve conversion.",
        icon: "TrendingUp",
      },
    ],
    beforeAfter: [
      { metric: "Response time", before: "4 hours (or never)", after: "Under 60 seconds" },
      { metric: "Leads lost to slow follow-up", before: "35%", after: "Under 2%" },
      { metric: "Admin hours on lead management", before: "15 hours/week", after: "Under 1 hour/week" },
      { metric: "Appointment no-show rate", before: "25-30%", after: "Under 10%" },
      { metric: "After-hours lead capture", before: "Zero — leads go to voicemail", after: "24/7 automatic booking" },
    ],
    faq: [
      {
        question: "How long does it take to set up?",
        answer: "5-7 working days from kickoff to live. We handle everything — form design, AI logic, calendar integration, follow-up sequences, and KPI dashboard. You just answer a few questions about your business and ideal customers.",
      },
      {
        question: "What technology or equipment do I need?",
        answer: "Nothing beyond what you already use. If you have a Google Calendar (or any online calendar) and a phone, you're set. We integrate with your existing tools — no new software to learn.",
      },
      {
        question: "Can I customise the qualification questions?",
        answer: "Absolutely. The AI asks the questions YOUR business needs — budget range, job type, location, urgency, property type — whatever qualifies a good lead for you. We set these up together during the build.",
      },
      {
        question: "What happens if something breaks?",
        answer: "Every workflow has built-in error handling and fallback behaviour. If the AI can't qualify a lead, it routes them straight to you. We monitor your system 24/7 and fix issues proactively — usually before you notice them.",
      },
      {
        question: "How much does it cost?",
        answer: "£500 one-time setup fee plus £50/month for ongoing optimisation, monitoring, and support. No hidden costs. No long-term contracts — month-to-month after the first 90 days.",
      },
      {
        question: "Do you offer a guarantee?",
        answer: "Yes. Our 90-Day Results Guarantee: if you don't save at least 5 hours per week within 90 days, we refund your full setup fee. No questions asked. We've never had to pay out.",
      },
    ],
    roiSnippet: "If you get 50 leads per month and currently lose 30% to slow follow-up, that's 15 lost customers every month. At an average job value of £100, that's £1,500/month walking out the door — £18,000 per year. Our system costs £500 to set up and £50/month to run. The ROI pays for itself in the first week.",
    whatsIncluded: [
      "Custom lead capture form designed for your industry and services",
      "AI qualification logic that scores and routes leads automatically",
      "Google Calendar integration with instant appointment booking",
      "Automated follow-up sequences (SMS, email, or WhatsApp)",
      "Real-time KPI dashboard showing response times, booking rates, and conversion",
      "24/7 lead capture — works nights, weekends, and bank holidays",
      "Human escalation path for complex enquiries",
      "Standard operating procedure (SOP) document for your team",
      "90-day optimisation with weekly performance reviews",
    ],
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
    metaDescription: "AI-powered WhatsApp bot that handles customer orders, bookings, and enquiries 24/7. Perfect for restaurants, salons, and service businesses. Delivered in 7-10 days.",
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
    heroHeadline: "Your Customers Are Already on WhatsApp. Now Your Business Can Be Too.",
    howItWorks: [
      {
        step: 1,
        title: "Map Your Customer Conversations",
        description: "We analyse the messages your business handles most — orders, bookings, FAQs, delivery updates, payment queries — and design conversation flows that handle them automatically.",
        icon: "MessageSquare",
      },
      {
        step: 2,
        title: "Build Your WhatsApp Bot",
        description: "We connect to the official WhatsApp Business API and build your custom bot. It handles orders, answers common questions, sends payment links, and hands off to a human when needed.",
        icon: "Wrench",
      },
      {
        step: 3,
        title: "Test With Real Customers",
        description: "We run a sandbox test with your actual customer scenarios — orders, complaints, questions — and refine the responses until they sound natural and handle edge cases properly.",
        icon: "CheckCircle",
      },
      {
        step: 4,
        title: "Go Live & Optimise",
        description: "Your bot goes live on your business WhatsApp number. We monitor conversations, improve responses based on real usage, and add new capabilities as your business needs evolve.",
        icon: "TrendingUp",
      },
    ],
    faq: [
      {
        question: "Will the bot sound robotic to my customers?",
        answer: "No. We train the bot to match your business tone — friendly, professional, casual, whatever fits your brand. Customers often can't tell they're chatting with AI. And when something needs a human touch, it hands off seamlessly.",
      },
      {
        question: "Can it take orders and payments?",
        answer: "Yes. The bot can walk customers through your menu or service list, confirm their order, send a payment link (SumUp, Stripe, or bank transfer), and confirm when payment is received — all within WhatsApp.",
      },
      {
        question: "What happens if a customer asks something the bot can't handle?",
        answer: "The bot recognises when it's out of its depth and immediately hands the conversation to you or a team member. You get a notification with the full conversation context so you can pick up where the bot left off.",
      },
      {
        question: "Do I need a special WhatsApp account?",
        answer: "You need a WhatsApp Business account, which is free. We handle the API setup and verification. If you already have a business number, we can connect to it without losing your existing chats.",
      },
      {
        question: "How much does it cost per message?",
        answer: "WhatsApp charges a small fee per conversation (around 3-8p depending on type). For most businesses doing 200-500 conversations per month, that's £10-40 in WhatsApp fees on top of our £150/month service fee.",
      },
      {
        question: "Can it handle multiple languages?",
        answer: "Yes. The AI can detect the customer's language and respond accordingly. This is particularly useful for businesses serving diverse communities.",
      },
    ],
    whatsIncluded: [
      "WhatsApp Business API setup and verification",
      "Custom conversation flows for your business (orders, bookings, FAQs)",
      "AI-powered natural language understanding — handles typos, slang, and voice notes",
      "Payment link integration (SumUp, Stripe, or bank transfer)",
      "Automated order confirmations and delivery updates",
      "Human handoff system with full conversation context",
      "Analytics dashboard showing message volumes, response times, and common queries",
      "Monthly optimisation based on real conversation data",
    ],
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
    metaDescription: "AI email assistant that drafts replies, sorts your inbox, and handles follow-ups automatically. Save 5+ hours per week. Built for consultants and tradespeople. From £500.",
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
    heroHeadline: "Stop Drowning in Emails. Let AI Handle the Replies.",
    howItWorks: [
      {
        step: 1,
        title: "Connect Your Inbox",
        description: "We connect to your Gmail or Outlook inbox (read-only at first). We analyse your email patterns — what types of messages you get, how you typically reply, your tone and style.",
        icon: "Mail",
      },
      {
        step: 2,
        title: "Train Your AI Assistant",
        description: "We teach the AI your business context — services, pricing, availability, common questions. It learns to draft replies that sound like you, not like a robot.",
        icon: "Brain",
      },
      {
        step: 3,
        title: "Review & Approve (Draft Mode)",
        description: "The AI drafts replies and saves them for your review. You approve, edit, or reject with one click. Nothing gets sent without your say-so — ever.",
        icon: "ShieldCheck",
      },
      {
        step: 4,
        title: "Get Faster Every Week",
        description: "As you approve drafts, the AI learns your preferences and gets more accurate. Most clients go from reviewing every email to skimming approvals in under 10 minutes a day.",
        icon: "TrendingUp",
      },
    ],
    faq: [
      {
        question: "Will the AI send emails without my approval?",
        answer: "Never. Everything starts in draft mode. The AI writes the reply and saves it as a draft — you review and send with one click. You stay in complete control of what leaves your inbox.",
      },
      {
        question: "How does it learn my tone and writing style?",
        answer: "We analyse your sent emails to understand your communication style — formal, casual, direct, friendly. The AI mirrors your tone so replies sound like you wrote them. Most people can't tell the difference after the first week.",
      },
      {
        question: "What types of emails can it handle?",
        answer: "Enquiries, quote requests, scheduling back-and-forth, follow-ups, thank-you messages, and FAQ-type questions. It flags anything complex, emotional, or high-stakes for your personal attention.",
      },
      {
        question: "Does it work with Gmail and Outlook?",
        answer: "Yes — both Gmail (Google Workspace) and Outlook (Microsoft 365) are fully supported. We integrate using official APIs with your permission. Your data stays secure and private.",
      },
      {
        question: "How long does setup take?",
        answer: "3-5 working days. We connect your inbox, train the AI on your business context, and run test drafts with real emails. You'll be reviewing AI-drafted replies by the end of the first week.",
      },
      {
        question: "What if I get sensitive emails I don't want AI touching?",
        answer: "You set the rules. We can exclude specific senders, subjects, or labels from AI processing. Personal emails, legal correspondence, HR matters — whatever you want kept private stays private.",
      },
    ],
    whatsIncluded: [
      "Gmail or Outlook integration with secure API connection",
      "AI trained on your writing style, tone, and business context",
      "Draft-mode replies — nothing sent without your approval",
      "Smart categorisation: enquiries, quotes, scheduling, follow-ups",
      "Priority flagging for emails that need your personal attention",
      "Follow-up reminders for emails you haven't responded to",
      "Weekly report showing time saved and emails handled",
      "Ongoing AI training as your business and communication style evolve",
    ],
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
    metaDescription: "AI-powered SEO content automation: keyword research, blog posts, and local landing pages published to WordPress automatically. Get found on Google. From £500 setup.",
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
    metaDescription: "Turn one video into 5+ social media posts with AI. Automated captions, multi-platform formatting, and scheduling. Perfect for coaches and restaurants. From £500.",
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
    metaDescription: "Automated lead scraping and enrichment with AI scoring. Get 200+ qualified leads per week with contact details, company data, and fit scores. From £500 setup.",
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
    slug: "voice-ai-agent",
    name: "AI Voice Agent",
    tier: "growth",
    setupPrice: "£500",
    monthlyPrice: "£150/mo",
    deliveryDays: "5-7 days",
    idealFor: "Plumbers, electricians, clinics, salons, any business that relies on inbound calls",
    pain: "Missing calls, losing leads to voicemail, no after-hours coverage — every missed call is lost revenue",
    metaDescription: "AI voice agent that answers calls 24/7, qualifies leads, and books appointments automatically. 90% booking rate, 2-second answer time. From £500 setup + £150/mo.",
    deliverables: [
      "24/7 AI phone answering (natural conversation, not IVR)",
      "Lead qualification (understands caller intent, urgency, location)",
      "Automated appointment booking (syncs with Google Calendar)",
      "SMS/WhatsApp confirmation to customer",
      "Instant owner notification with call summary",
      "Call recording and transcript logging",
      "After-hours and overflow call handling",
      "Custom greeting and business-specific responses",
    ],
    referenceClient: undefined,
    icon: "PhoneCall",
    proof: {
      heading: "What This Looks Like",
      stats: [
        { label: "Booking rate", value: "90%" },
        { label: "Availability", value: "24/7" },
        { label: "Cost per call", value: "20-60p" },
        { label: "Answer time", value: "2 seconds" },
      ],
      description:
        "A plumber gets a call at 9pm about a leaking pipe. The AI answers in 2 seconds, asks the right questions, books a morning appointment, sends the customer an SMS confirmation, and texts you the details. By the time you check your phone, the job is already booked.",
    },
    ctaText: "Get a Free AI Audit",
    ctaHref: "/audit",
    ctaSubtext: "See how many leads you're losing to missed calls — takes 60 seconds.",
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
    metaDescription: "AI voice assistant that picks up calls instantly, answers FAQs, and books appointments into your calendar. Recover up to 40% of missed calls. From £500 setup.",
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
    metaDescription: "Hands-on AI workshop for teams of 5-50. Your team builds real AI tools in one session — email assistants, content generators, and automation workflows. From £500.",
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
    metaDescription: "Free AI readiness audit for your business. Get an instant AI score, top automation opportunities, and projected ROI in 60 seconds. Normally £150 — free for a limited time.",
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
    metaDescription: "Custom AI automation built for your unique business needs. We audit your processes, design a bespoke solution, and deliver in 1-3 weeks. From £500 setup.",
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
