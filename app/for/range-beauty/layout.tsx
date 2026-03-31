import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Private — WorkCrew",
  description: "A private page.",
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function RangeBeautyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
