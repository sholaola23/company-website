import type { Metadata } from "next";
import { industryPages } from "@/lib/industry-pages-data";
import IndustryPageLayout from "@/components/services/IndustryPageLayout";

const page = industryPages.find((p) => p.slug === "ai-for-hvac")!;

export const metadata: Metadata = {
  title: page.metaTitle,
  description: page.metaDescription,
  keywords: page.keywords,
  alternates: {
    canonical: `https://workcrew.io/services/${page.slug}`,
  },
  openGraph: {
    images: [{ url: "https://workcrew.io/api/og", width: 1200, height: 630 }],
    title: `${page.metaTitle} | WorkCrew`,
    description: page.metaDescription,
    url: `https://workcrew.io/services/${page.slug}`,
    type: "website",
  },
  twitter: {
    title: `${page.metaTitle} | WorkCrew`,
    description: page.metaDescription,
  },
};

export default function AiForHvacPage() {
  return <IndustryPageLayout page={page} />;
}
