"use client";

import { useEffect, useState } from "react";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import MetaPixel from "@/components/shared/MetaPixel";
import GoogleAnalytics from "@/components/shared/GoogleAnalytics";

/**
 * ConsentGate renders analytics + marketing trackers ONLY after the visitor
 * has accepted non-essential cookies. Listens for the "workcrew:consent"
 * event emitted by CookieBanner.
 *
 * This keeps the site compliant with PECR + UK GDPR: no non-essential
 * trackers fire before consent.
 */
export default function ConsentGate() {
  const [consented, setConsented] = useState(false);

  useEffect(() => {
    const check = () => {
      try {
        const saved = localStorage.getItem("workcrew_cookie_consent_v1");
        setConsented(saved === "accepted");
      } catch {
        setConsented(false);
      }
    };

    check();

    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      setConsented(detail?.choice === "accepted");
    };

    window.addEventListener("workcrew:consent", handler);
    return () => window.removeEventListener("workcrew:consent", handler);
  }, []);

  if (!consented) return null;

  return (
    <>
      <Analytics />
      <SpeedInsights />
      <MetaPixel />
      <GoogleAnalytics />
    </>
  );
}
