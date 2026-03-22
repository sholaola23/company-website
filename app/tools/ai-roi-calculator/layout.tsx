import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI ROI Calculator — Estimate Your AI Savings",
  description:
    "Use our free AI ROI calculator to estimate how much time and money your small business could save with AI automation. Get instant results in 60 seconds.",
  alternates: {
    canonical: "https://oladipupoconsulting.co.uk/tools/ai-roi-calculator",
  },
  keywords: [
    "AI ROI calculator",
    "AI automation savings",
    "AI cost savings small business",
    "return on investment AI",
    "AI automation UK",
    "small business AI calculator",
  ],
  openGraph: {
    title: "AI ROI Calculator — Estimate Your AI Savings | Oladipupo Consulting",
    description:
      "Use our free AI ROI calculator to estimate how much time and money your small business could save with AI automation. Get instant results in 60 seconds.",
    url: "https://oladipupoconsulting.co.uk/tools/ai-roi-calculator",
    type: "website",
  },
  twitter: {
    title: "AI ROI Calculator — Estimate Your AI Savings | Oladipupo Consulting",
    description:
      "Free AI ROI calculator for small businesses. Estimate how much time and money you could save with AI automation in 60 seconds.",
  },
};

export default function AIROICalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
