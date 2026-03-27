import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageTracker from "@/components/shared/PageTracker";
import ChatWidgetLoader from "@/components/shared/ChatWidgetLoader";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import MetaPixel from "@/components/shared/MetaPixel";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Oladipupo Consulting — AI Solutions for Small Businesses",
    template: "%s | Oladipupo Consulting",
  },
  description:
    "We build AI automation systems, professional websites, and deliver AI training for small businesses. From lead capture to content engines — delivered in 7 days.",
  keywords: [
    "AI automation",
    "small business automation",
    "AI training for teams",
    "website development",
    "lead intake system",
    "appointment booking bot",
    "UK AI consultancy",
    "n8n automation",
  ],
  authors: [{ name: "Oladipupo Consulting Ltd" }],
  creator: "Oladipupo Consulting Ltd",
  metadataBase: new URL("https://oladipupoconsulting.co.uk"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://oladipupoconsulting.co.uk",
    siteName: "Oladipupo Consulting",
    title: "Oladipupo Consulting — AI Solutions for Small Businesses",
    description:
      "We build AI automation systems, professional websites, and deliver AI training for small businesses. From lead capture to content engines — delivered in 7 days.",
    images: [
      {
        url: "https://oladipupoconsulting.co.uk/api/og",
        width: 1200,
        height: 630,
        alt: "Oladipupo Consulting — AI Automation for Small Businesses",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Oladipupo Consulting — AI Solutions for Small Businesses",
    description:
      "AI automation, websites, and team training for small businesses. Delivered in 7 days.",
    images: ["https://oladipupoconsulting.co.uk/api/og"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="dark"
      suppressHydrationWarning
    >
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-zinc-950 text-zinc-50 min-h-screen flex flex-col`}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-0 focus:left-0 focus:z-[100] focus:bg-blue-600 focus:text-white focus:px-4 focus:py-2 focus:text-sm"
        >
          Skip to main content
        </a>
        <PageTracker />
        <Header />
        <main className="flex-1 pt-16" id="main-content">
          {children}
        </main>
        <Footer />
        <ChatWidgetLoader />
        <MetaPixel />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
