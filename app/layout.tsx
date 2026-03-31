import type { Metadata } from "next";
import { DM_Sans, Inter, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageTracker from "@/components/shared/PageTracker";
import ChatWidgetLoader from "@/components/shared/ChatWidgetLoader";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import MetaPixel from "@/components/shared/MetaPixel";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
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
    default: "WorkCrew — AI Solutions for Small Businesses",
    template: "%s | WorkCrew",
  },
  description:
    "We build AI automation systems, professional websites, and deliver AI training for small businesses. From lead capture to content engines — built to last.",
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
  authors: [{ name: "WorkCrew Ltd" }],
  creator: "WorkCrew Ltd",
  metadataBase: new URL("https://workcrew.io"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://workcrew.io",
    siteName: "WorkCrew",
    title: "WorkCrew — AI Solutions for Small Businesses",
    description:
      "We build AI automation systems, professional websites, and deliver AI training for small businesses. From lead capture to content engines — built to last.",
  },
  twitter: {
    card: "summary_large_image",
    title: "WorkCrew — AI Solutions for Small Businesses",
    description:
      "AI automation, websites, and team training for small businesses. Built for results.",
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
      suppressHydrationWarning
    >
      <body
        className={`${dmSans.variable} ${inter.variable} ${geistMono.variable} antialiased bg-white text-slate-700 min-h-screen flex flex-col`}
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
