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
    heroHeadline: "How a Kettering Bakery Automated 180 Orders and Now Saves 50+ Minutes Every Day",
    industry: "Food & Bakery",
    location: "Kettering, UK",
    tier: "Growth",
    heroStat: "50+ min",
    heroLabel: "saved every day — in Tunmise's own words",
    problem:
      "Running a Nigerian-style bread bakery handling 140-180 weekly orders. Orders came in via WhatsApp messages, payments were manually tracked across SumUp and bank transfers, and production quantities were hand-tallied. The owner spent hours each evening on admin instead of baking.",
    problemExpanded:
      "Tunmise runs E'Manuel Foods & Bakery, a Nigerian-style bakery in Kettering that delivers fresh bread across the Midlands. Before working with us, every part of the business ran on manual effort. Customers placed orders via WhatsApp messages — often incomplete, sometimes contradictory. Tunmise would spend hours every evening collating these messages into a spreadsheet, hand-tallying production quantities for each bread type, and manually tracking which customers had paid via SumUp or bank transfer. Payment reconciliation was a particular headache: SumUp generates its own transaction references, so matching a payment to an order meant cross-referencing amounts, customer names, and timing across two separate systems. Delivery routes were planned by memory. The business was growing — 140 to 180 orders per week — but the admin was growing faster. In his own words, Tunmise was saving 50+ minutes every day once the system was in place — time previously spent on tasks that had nothing to do with actually baking bread.",
    solution:
      "Built 9 automated workflows — online order form (Tally.so), real-time Google Sheets production dashboard (5 tabs), automated payment matching across SumUp and bank transfers, delivery route optimisation with Google Maps, WhatsApp order confirmations.",
    solutionExpanded:
      "We replaced the entire manual process with 9 interconnected AI workflows, built and deployed in under two weeks. First, we moved order collection from WhatsApp to a custom Tally.so form — customers fill in their name, address, products, and quantities in under 60 seconds. The form feeds directly into a Google Sheets production dashboard with 5 tabs: orders, payments, production quantities, delivery routes, and weekly summaries. The payment matching engine (our most complex workflow) polls SumUp every 30 minutes and cross-references transactions against orders using a 4-tier matching system: submission ID match, name + amount match, name-only match (for partial payments), and amount-only match with duplicate safeguards. Bank transfer matching works the same way when Tunmise uploads his bank statement CSV. Every order triggers an instant WhatsApp confirmation via Twilio so customers know their order was received. On Fridays, a delivery route optimizer groups orders by town and generates Google Maps navigation links for each stop. A Monday cleanup workflow archives the previous week and resets the dashboard for the new cycle. Tunmise now checks a single dashboard for 60 seconds each morning instead of spending hours on admin each evening.",
    results: [
      { label: "Admin time saved", value: "50+ min/day (client's own words)" },
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
      "Password-protected client dashboard at app.workcrew.io",
    ],
    beforeAfter: [
      { before: "Hours of admin every evening", after: "60 seconds checking a dashboard each morning" },
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
    slug: "ashdown-bd",
    name: "Ashdown Business Developments",
    heroHeadline:
      "How Ashdown Added a Second Lead Channel and Client Portals for 3 Construction Clients",
    industry: "Construction Business Development",
    location: "UK",
    tier: "Scale",
    heroStat: "3 campaigns",
    heroLabel: "live across KA FM, CT Services, and Inpulze",
    problem:
      "Ashdown finds work for construction subcontractors. Before the pilot, lead generation depended heavily on manual LinkedIn prospecting, manual follow-up, and team memory. As the client base grew, Ashdown needed a repeatable outbound system, cleaner reply handling, and a way to show each end client their own qualified opportunities without exposing internal campaign noise.",
    problemExpanded:
      "Ashdown Business Developments helps construction subcontractors find new work. The team was doing the hard part by hand: searching LinkedIn, finding relevant decision-makers, sending messages, watching replies, and keeping clients updated. That worked while the operation was small, but it did not scale cleanly across multiple trades, regions, and client campaigns. The risk was not just time. Without a shared system, replies could be missed, weak responses could create noise, and end clients had no simple place to see the opportunities being generated for them.",
    solution:
      "Built a monitored outbound and reporting system: Apollo-based prospect sourcing, Instantly campaigns for three pilot clients, production reply webhooks, AI-assisted reply classification, WorkCrew review on mismatches, and a client portal where each pilot client sees only their own qualified leads and weekly progress.",
    solutionExpanded:
      "We turned Ashdown's manual business-development process into a safer, repeatable pilot system. Apollo is used to source prospects with practical intent signals. Instantly runs separate campaigns for KA FM, CT Services, and Inpulze, using Jamie, Shaun, and Ciara as the sender pool. Replies flow into production n8n workflows, where Instantly's AI label is stored beside WorkCrew's classification so mismatches can be reviewed instead of blindly routed. Wrong-person replies without a useful route are logged without distracting the team. Qualified opportunities are then logged against the right pilot client and surfaced in the Ashdown client portal. Each end client has their own login, sees only their own qualified leads, and can track weekly progress once reporting begins.",
    results: [
      { label: "Pilot campaigns live", value: "3" },
      { label: "Staged leads at launch", value: "63" },
      { label: "Outreach mailboxes warmed", value: "4" },
      { label: "Pilot client portals", value: "3" },
      { label: "Reply webhooks", value: "Live" },
      { label: "Client data separation", value: "RLS-tested" },
    ],
    deliverables: [
      "Apollo search payloads for the three pilot clients",
      "Instantly campaign structure for KA FM, CT Services, and Inpulze",
      "Launch-week sending limits matched to mailbox warmup",
      "Production webhooks for replies, interested leads, and account errors",
      "Reply monitor that stores Instantly AI labels beside WorkCrew classification",
      "Review path when Instantly and WorkCrew classification disagree",
      "Wrong-person noise filter so no-route replies are logged only",
      "Ashdown admin dashboard for lead logging and qualification",
      "Per-client portal access for KA FM, CT Services, and Inpulze",
      "RLS-backed client data separation checks",
      "Weekly client reporting flow prepared for the first report cycle",
      "Live launch handoff and operating guidance for Jamie and Shaun",
    ],
    beforeAfter: [
      { before: "Manual LinkedIn-led prospecting only", after: "Email outbound channel running alongside LinkedIn" },
      { before: "Replies watched and triaged manually", after: "Reply webhooks and classification route useful responses" },
      { before: "Weak replies could distract the team", after: "OOO and no-route wrong-person replies are logged only" },
      { before: "Client reporting depended on manual updates", after: "Each pilot client has a portal for qualified leads" },
      { before: "Risk of cross-client visibility", after: "RLS-tested access keeps each client scoped to their own data" },
    ],
    timeline:
      "Soft launch prepared for Thursday 14 May 2026, with first weekly client reports scheduled for Friday 22 May 2026 after recipient confirmation.",
    techStack: [
      "Prospect sourcing (Apollo)",
      "Outbound sequencing (Instantly)",
      "Workflow automation (n8n)",
      "Client portal data (Supabase)",
      "Client portal frontend (React)",
      "Weekly report email (Resend)",
      "Monitoring and alerts (ntfy)",
    ],
  },
];
