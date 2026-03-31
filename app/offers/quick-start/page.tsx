import type { Metadata } from "next";
import QuickStartClient from "./QuickStartClient";

export const metadata: Metadata = {
  title: "£297 Quick-Start AI Package | Limited Offer",
  description:
    "Get a full AI audit + automation build for £297 (normally £500). 14-day delivery, 90-day guarantee. 3 spots only.",
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: "https://workcrew.io/offers/quick-start",
  },
  openGraph: {
    images: [{ url: "https://workcrew.io/api/og", width: 1200, height: 630 }],
    title: "£297 Quick-Start AI Package | Limited Offer | WorkCrew",
    description:
      "Get a full AI audit + automation build for £297 (normally £500). 14-day delivery, 90-day guarantee. 3 spots only.",
    url: "https://workcrew.io/offers/quick-start",
    type: "website",
  },
};

export default function QuickStartOfferPage() {
  return <QuickStartClient />;
}
