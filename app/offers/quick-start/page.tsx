import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Quick-Start AI Package",
  description:
    "Start with the free WorkCrew AI audit so we can scope the right first automation after discovery.",
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: "https://workcrew.io/offers/quick-start",
  },
  openGraph: {
    images: [{ url: "https://workcrew.io/api/og", width: 1200, height: 630 }],
    title: "Quick-Start AI Package | WorkCrew",
    description:
      "Start with the free WorkCrew AI audit so we can scope the right first automation after discovery.",
    url: "https://workcrew.io/offers/quick-start",
    type: "website",
  },
};

export default function QuickStartOfferPage() {
  redirect("/audit");
}
