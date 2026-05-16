import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "RankReady Report",
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function RankReadyReportLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
