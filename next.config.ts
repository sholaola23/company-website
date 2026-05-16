import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: false,
  outputFileTracingIncludes: {
    "/api/chat": [
      "./AGENTS.md",
      "./agents/_shared/case-studies.md",
      "./agents/_shared/ctas.md",
      "./agents/_shared/voice.md",
      "./content/chat-knowledge/brand-assets/brand-foundation.md",
      "./content/chat-knowledge/brand-assets/voice-one-pager.md",
      "./content/chat-knowledge/knowledge/architectures/whatsapp-ordering-bot-kapso.md",
      "./content/chat-knowledge/knowledge/patterns/n8n-fast-checkout-watcher.md",
      "./docs/directory-listings-guide.md",
      "./lib/case-studies-data.ts",
      "./lib/services-data.ts",
      "./rebrand-v1-docs/01-creative-direction.md",
      "./rebrand-v1-docs/04-voice-audit.md",
      "./rebrand-v1-docs/09-session-insights-quotes.md",
      "./rebrand-v1-docs/10-voice-rewrite-discovery-first.md",
    ],
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
    ];
  },
};

export default nextConfig;
