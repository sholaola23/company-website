import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "RankReady Local SEO Audit",
  description:
    "Get a local SEO audit preview for your Google Business Profile, reviews, posting plan, and service page copy.",
  alternates: {
    canonical: "https://workcrew.io/tools/rank-ready",
  },
  openGraph: {
    title: "RankReady Local SEO Audit | WorkCrew",
    description:
      "Get a local SEO audit preview for your Google Business Profile, reviews, posting plan, and service page copy.",
    url: "https://workcrew.io/tools/rank-ready",
    type: "website",
  },
};

export default function RankReadyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
