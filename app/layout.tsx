import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageTracker from "@/components/shared/PageTracker";
import ChatWidgetLoader from "@/components/shared/ChatWidgetLoader";
import ConsentGate from "@/components/shared/ConsentGate";
import CookieBanner from "@/components/shared/CookieBanner";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "WorkCrew — We run the back-of-house. You run the business.",
    template: "%s | WorkCrew",
  },
  description:
    "AI automation for small businesses. Lead intake, content engines, customer ops — scoped after discovery, built fast, and backed by a 90-day results guarantee.",
  keywords: [
    "AI automation",
    "business automation",
    "AI training for teams",
    "lead intake system",
    "appointment booking bot",
    "n8n automation",
    "small business AI",
    "AI operator",
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
    title: "WorkCrew — We run the back-of-house. You run the business.",
    description:
      "AI automation for small businesses. Lead intake, content engines, customer ops — scoped after discovery and backed by a 90-day results guarantee.",
  },
  twitter: {
    card: "summary_large_image",
    title: "WorkCrew — We run the back-of-house. You run the business.",
    description:
      "AI automation for small businesses. Lead intake, content engines, customer ops. Start with a free AI audit.",
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
        className={`${inter.variable} antialiased min-h-screen flex flex-col`}
        style={{ background: "var(--color-bg)", color: "var(--color-body)" }}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-0 focus:left-0 focus:z-[100] focus:px-4 focus:py-2 focus:text-sm"
          style={{ background: "var(--color-primary)", color: "var(--color-bg)" }}
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
        <CookieBanner />
        <ConsentGate />
      </body>
    </html>
  );
}
