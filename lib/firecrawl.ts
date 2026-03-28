/**
 * Firecrawl enrichment for the AI Readiness Audit.
 *
 * Scrapes the prospect's own website and searches for their real review data +
 * competitor context. All calls are fire-and-forget with a hard timeout — if
 * Firecrawl is unconfigured or slow, the audit falls back to the current
 * inference-only behaviour with zero impact.
 */

const FIRECRAWL_BASE = "https://api.firecrawl.dev/v1";
const TIMEOUT_MS = 6000;

// ─── Types ────────────────────────────────────────────────────────────────────

export interface EnrichedAuditContext {
  /** Cleaned markdown from the prospect's own website */
  websiteContent: string;
  /** Web search snippets describing the prospect's reviews / GBP listing */
  prospectReviewData: string;
  /** Web search snippets describing local competitors */
  competitorData: string;
  /** Whether any live data was actually retrieved */
  hasLiveData: boolean;
}

interface FirecrawlScrapeResponse {
  success: boolean;
  data?: {
    markdown?: string;
    metadata?: {
      title?: string;
      description?: string;
    };
  };
}

interface FirecrawlSearchResult {
  url: string;
  title?: string;
  description?: string;
  markdown?: string;
}

interface FirecrawlSearchResponse {
  success: boolean;
  data?: FirecrawlSearchResult[];
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) =>
      setTimeout(() => reject(new Error("Firecrawl timeout")), ms)
    ),
  ]);
}

function truncate(text: string, maxChars: number): string {
  if (text.length <= maxChars) return text;
  return text.slice(0, maxChars) + "…";
}

async function scrapeUrl(
  url: string,
  apiKey: string
): Promise<string> {
  const res = await withTimeout(
    fetch(`${FIRECRAWL_BASE}/scrape`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        url,
        formats: ["markdown"],
        onlyMainContent: true,
        timeout: 5000,
      }),
    }),
    TIMEOUT_MS
  );

  if (!res.ok) return "";
  const json = (await res.json()) as FirecrawlScrapeResponse;
  return truncate(json.data?.markdown ?? "", 2000);
}

async function searchWeb(
  query: string,
  apiKey: string,
  limit = 4
): Promise<string> {
  const res = await withTimeout(
    fetch(`${FIRECRAWL_BASE}/search`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({ query, limit }),
    }),
    TIMEOUT_MS
  );

  if (!res.ok) return "";
  const json = (await res.json()) as FirecrawlSearchResponse;
  if (!json.data?.length) return "";

  return json.data
    .map((r) => `• ${r.title ?? r.url}: ${r.description ?? ""}`)
    .join("\n");
}

// ─── Public API ───────────────────────────────────────────────────────────────

/**
 * Enrich the audit with live web data before handing off to Claude.
 * Returns empty strings on any failure — the audit always completes.
 */
export async function enrichAuditContext(
  businessName: string,
  industry: string,
  websiteUrl?: string
): Promise<EnrichedAuditContext> {
  const apiKey = process.env.FIRECRAWL_API_KEY;

  if (!apiKey) {
    return {
      websiteContent: "",
      prospectReviewData: "",
      competitorData: "",
      hasLiveData: false,
    };
  }

  // Run all Firecrawl calls in parallel — any that fail resolve to ""
  const [websiteContent, prospectReviewData, competitorData] =
    await Promise.all([
      // 1. Scrape prospect's own website (only if URL provided)
      websiteUrl
        ? scrapeUrl(websiteUrl, apiKey).catch(() => "")
        : Promise.resolve(""),

      // 2. Search for prospect's real review data / GBP listing
      searchWeb(
        `"${businessName}" ${industry} reviews rating`,
        apiKey,
        4
      ).catch(() => ""),

      // 3. Search for local competitors in the same space
      searchWeb(
        `best ${industry} businesses UK reviews Google`,
        apiKey,
        4
      ).catch(() => ""),
    ]);

  const hasLiveData =
    websiteContent.length > 0 ||
    prospectReviewData.length > 0 ||
    competitorData.length > 0;

  return { websiteContent, prospectReviewData, competitorData, hasLiveData };
}
