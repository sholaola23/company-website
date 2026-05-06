"use client";

import Script from "next/script";

/**
 * GoogleAnalytics — GA4 page view + event tracking.
 *
 * Loaded ONLY by ConsentGate after the visitor accepts non-essential cookies.
 * That keeps the site PECR + UK GDPR compliant.
 *
 * Measurement ID is read from NEXT_PUBLIC_GA_ID at build time. If unset,
 * the component renders nothing and no requests are made — safe for previews
 * and local dev without a property.
 */
export default function GoogleAnalytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  if (!gaId) {
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaId}', {
            anonymize_ip: true,
            cookie_flags: 'SameSite=None;Secure',
          });
        `}
      </Script>
    </>
  );
}
