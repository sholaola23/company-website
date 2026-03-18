import { NextRequest } from "next/server";
import { list } from "@vercel/blob";

export const dynamic = "force-dynamic";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return new Response("Report not found", { status: 404 });
  }

  try {
    // Find the blob by prefix
    const { blobs } = await list({ prefix: `reports/${slug}`, limit: 1 });

    if (blobs.length === 0) {
      return new Response("Report not found", { status: 404 });
    }

    // Fetch the HTML from the blob URL
    const blobUrl = blobs[0].url;
    const response = await fetch(blobUrl);
    const html = await response.text();

    // Serve it inline as HTML — no download
    return new Response(html, {
      status: 200,
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "public, max-age=86400, s-maxage=86400",
      },
    });
  } catch (err) {
    console.error("[reports] Error serving report:", err);
    return new Response("Report not found", { status: 404 });
  }
}
