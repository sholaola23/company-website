import { NextRequest } from "next/server";

export const runtime = "edge";

const SITEMAP_URL = "https://workcrew.io/sitemap.xml";
const SITE_URL = "https://workcrew.io";

export async function GET(req: NextRequest) {
  // Verify the request is from Vercel Cron
  const authHeader = req.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const results: Record<string, string> = {};

  // 1. Ping Google with sitemap
  try {
    const googlePing = await fetch(
      `https://www.google.com/ping?sitemap=${encodeURIComponent(SITEMAP_URL)}`
    );
    results.google = googlePing.ok ? "pinged" : `error: ${googlePing.status}`;
  } catch (e) {
    results.google = `failed: ${e instanceof Error ? e.message : "unknown"}`;
  }

  // 2. Ping Bing with sitemap
  try {
    const bingPing = await fetch(
      `https://www.bing.com/ping?sitemap=${encodeURIComponent(SITEMAP_URL)}`
    );
    results.bing = bingPing.ok ? "pinged" : `error: ${bingPing.status}`;
  } catch (e) {
    results.bing = `failed: ${e instanceof Error ? e.message : "unknown"}`;
  }

  // 3. Check homepage is up
  try {
    const homepageCheck = await fetch(SITE_URL, { method: "HEAD" });
    results.homepage = homepageCheck.ok
      ? `up (${homepageCheck.status})`
      : `down (${homepageCheck.status})`;
  } catch (e) {
    results.homepage = `down: ${e instanceof Error ? e.message : "unknown"}`;
  }

  // 4. Check sitemap is accessible
  try {
    const sitemapCheck = await fetch(SITEMAP_URL, { method: "HEAD" });
    results.sitemap = sitemapCheck.ok
      ? `accessible (${sitemapCheck.status})`
      : `error (${sitemapCheck.status})`;
  } catch (e) {
    results.sitemap = `error: ${e instanceof Error ? e.message : "unknown"}`;
  }

  return Response.json({
    success: true,
    timestamp: new Date().toISOString(),
    results,
  });
}
