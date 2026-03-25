import type { Metadata } from "next";
import { industryPages } from "@/lib/industry-pages-data";
import IndustryPageLayout from "@/components/services/IndustryPageLayout";

const page = industryPages.find((p) => p.slug === "ai-for-accountants")!;

export const metadata: Metadata = {
  title: page.metaTitle,
  description: page.metaDescription,
  keywords: page.keywords,
  alternates: {
    canonical: `https://oladipupoconsulting.co.uk/services/${page.slug}`,
  },
  openGraph: {
    title: `${page.metaTitle} | Oladipupo Consulting`,
    description: page.metaDescription,
    url: `https://oladipupoconsulting.co.uk/services/${page.slug}`,
    type: "website",
  },
  twitter: {
    title: `${page.metaTitle} | Oladipupo Consulting`,
    description: page.metaDescription,
  },
};

export default function AiForAccountantsPage() {
  return <IndustryPageLayout page={page} />;
}
