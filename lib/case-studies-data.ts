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
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "emanuel-bakery",
    name: "E'Manuel Foods & Bakery",
    industry: "Food & Bakery",
    location: "Kettering, UK",
    tier: "Growth",
    heroStat: "8 hrs",
    heroLabel: "saved per week",
    problem:
      "Running a Nigerian-style bread bakery handling 140-180 weekly orders. Orders came in via WhatsApp messages, payments were manually tracked across SumUp and bank transfers, and production quantities were hand-tallied. The owner spent 8+ hours per week on admin instead of baking.",
    solution:
      "Built 9 automated workflows — online order form (Tally.so), real-time Google Sheets production dashboard (5 tabs), automated payment matching across SumUp and bank transfers, delivery route optimisation with Google Maps, WhatsApp order confirmations.",
    results: [
      { label: "Admin time saved", value: "8 hrs/week" },
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
  },
];
