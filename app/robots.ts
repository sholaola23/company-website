import { MetadataRoute } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://workcrew.io";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
      {
        userAgent: "GPTBot",
        disallow: "/",
      },
      {
        userAgent: "CCBot",
        disallow: "/",
      },
      {
        userAgent: "Google-Extended",
        disallow: "/",
      },
      {
        userAgent: "anthropic-ai",
        disallow: "/",
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
