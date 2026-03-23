import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Private — Oladipupo Consulting",
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

export default function HeritageHvacLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
