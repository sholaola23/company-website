import { MetadataRoute } from "next";
import { services } from "@/lib/services-data";
import { caseStudies } from "@/lib/case-studies-data";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://workcrew.io";

const CITY_SLUGS = [
  "ai-automation-london",
  "ai-automation-manchester",
  "ai-automation-birmingham",
  "ai-automation-leeds",
  "ai-automation-kettering",
  "ai-automation-bristol",
  "ai-automation-edinburgh",
  "ai-automation-liverpool",
  "ai-automation-glasgow",
  "ai-automation-sheffield",
];

// Last significant content update for static pages
const SITE_LAUNCH = new Date("2026-03-01");
const BLOG_LAUNCH = new Date("2026-03-15");
const CITY_PAGES_LAUNCH = new Date("2026-03-10");
const REDESIGN_DATE = new Date("2026-03-29");

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    { url: BASE_URL, lastModified: REDESIGN_DATE, changeFrequency: "weekly" as const, priority: 1 },
    { url: `${BASE_URL}/services`, lastModified: REDESIGN_DATE, changeFrequency: "weekly" as const, priority: 0.9 },
    { url: `${BASE_URL}/audit`, lastModified: REDESIGN_DATE, changeFrequency: "monthly" as const, priority: 0.9 },
    { url: `${BASE_URL}/case-studies`, lastModified: REDESIGN_DATE, changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${BASE_URL}/about`, lastModified: REDESIGN_DATE, changeFrequency: "monthly" as const, priority: 0.6 },
    { url: `${BASE_URL}/blog`, lastModified: new Date(), changeFrequency: "daily" as const, priority: 0.7 },
    { url: `${BASE_URL}/contact`, lastModified: REDESIGN_DATE, changeFrequency: "monthly" as const, priority: 0.5 },
    { url: `${BASE_URL}/tools`, lastModified: SITE_LAUNCH, changeFrequency: "monthly" as const, priority: 0.6 },
    { url: `${BASE_URL}/tools/ai-roi-calculator`, lastModified: SITE_LAUNCH, changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${BASE_URL}/tools/rank-ready`, lastModified: SITE_LAUNCH, changeFrequency: "monthly" as const, priority: 0.6 },
    { url: `${BASE_URL}/privacy`, lastModified: SITE_LAUNCH, changeFrequency: "yearly" as const, priority: 0.3 },
    { url: `${BASE_URL}/terms`, lastModified: SITE_LAUNCH, changeFrequency: "yearly" as const, priority: 0.3 },
  ];

  const servicePages = services.map((s) => ({
    url: `${BASE_URL}/services/${s.slug}`,
    lastModified: REDESIGN_DATE,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const caseStudyPages = caseStudies.map((c) => ({
    url: `${BASE_URL}/case-studies/${c.slug}`,
    lastModified: REDESIGN_DATE,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const cityPages = CITY_SLUGS.map((slug) => ({
    url: `${BASE_URL}/${slug}`,
    lastModified: REDESIGN_DATE,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const BLOG_SLUGS = [
    "how-can-ai-help-my-business",
    "ai-automation-uk-small-business-guide",
    "ai-for-estate-agents",
    "n8n-vs-zapier-vs-make",
    "ai-automation-roi-calculator",
    "ai-chatbot-small-business",
    "ai-for-electricians",
    "ai-for-gyms",
    "ai-for-cleaning-companies",
    "ai-for-accountants",
    "ai-for-dentists",
    "ai-for-plumbers",
    "ai-for-salons",
    "ai-for-restaurants",
    "ai-for-healthcare",
    "ai-for-coaches",
    "ai-automation-cost",
    "whatsapp-automation-business",
    "get-more-google-reviews",
    "what-is-ai-readiness-audit",
    "automate-appointment-booking",
    "5-ways-ai-saves-time",
    "local-business-website-2026",
    "ai-for-solicitors",
    "ai-for-recruitment-agencies",
    "ai-for-mortgage-brokers",
    "ai-for-care-homes",
    // Added 29 March 2026 — previously missing from sitemap
    "voice-ai-small-business",
    "ai-chatbot-church",
    "bakery-saved-15-hours-ai",
    "ai-automation-small-businesses-london",
    "5-signs-business-ready-for-ai",
    "local-seo-audit-checklist",
    "reduce-no-shows-ai-reminders",
    "small-business-ai-adoption",
    "ai-save-cleaning-companies-time",
    "kettering-bakery-automated-admin",
    "cleaning-business-automate-first",
    "ai-automation-agency-vs-diy",
    "ai-saves-plumbers-10-hours",
    "what-it-costs-63-agent-ai-business",
    "ai-for-uk-accountants",
    "before-after-automated-lead-response",
    "ai-accountants-save-20-hours",
    "automate-customer-follow-ups",
  ];

  const blogPages = BLOG_SLUGS.map((slug) => ({
    url: `${BASE_URL}/blog/${slug}`,
    lastModified: BLOG_LAUNCH,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...servicePages, ...caseStudyPages, ...cityPages, ...blogPages];
}
