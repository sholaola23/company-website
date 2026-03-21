import { MetadataRoute } from "next";
import { services } from "@/lib/services-data";
import { caseStudies } from "@/lib/case-studies-data";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://oladipupoconsulting.co.uk";

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

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 1 },
    { url: `${BASE_URL}/services`, lastModified: SITE_LAUNCH, changeFrequency: "weekly" as const, priority: 0.9 },
    { url: `${BASE_URL}/audit`, lastModified: SITE_LAUNCH, changeFrequency: "monthly" as const, priority: 0.9 },
    { url: `${BASE_URL}/case-studies`, lastModified: SITE_LAUNCH, changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${BASE_URL}/about`, lastModified: SITE_LAUNCH, changeFrequency: "monthly" as const, priority: 0.6 },
    { url: `${BASE_URL}/blog`, lastModified: new Date(), changeFrequency: "daily" as const, priority: 0.7 },
    { url: `${BASE_URL}/contact`, lastModified: SITE_LAUNCH, changeFrequency: "monthly" as const, priority: 0.5 },
    { url: `${BASE_URL}/tools/ai-roi-calculator`, lastModified: SITE_LAUNCH, changeFrequency: "monthly" as const, priority: 0.8 },
  ];

  const servicePages = services.map((s) => ({
    url: `${BASE_URL}/services/${s.slug}`,
    lastModified: SITE_LAUNCH,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const caseStudyPages = caseStudies.map((c) => ({
    url: `${BASE_URL}/case-studies/${c.slug}`,
    lastModified: SITE_LAUNCH,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const cityPages = CITY_SLUGS.map((slug) => ({
    url: `${BASE_URL}/${slug}`,
    lastModified: CITY_PAGES_LAUNCH,
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
  ];

  const blogPages = BLOG_SLUGS.map((slug) => ({
    url: `${BASE_URL}/blog/${slug}`,
    lastModified: BLOG_LAUNCH,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...servicePages, ...caseStudyPages, ...cityPages, ...blogPages];
}
