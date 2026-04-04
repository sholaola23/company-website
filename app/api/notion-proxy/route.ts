import { NextRequest } from "next/server";

/**
 * Notion Proxy — for cloud Claude agents
 *
 * Cloud scheduled task sessions block outbound curl to api.notion.com.
 * This proxy accepts requests from agents, forwards them to Notion, and returns results.
 *
 * Security: requests must include secret via X-Proxy-Secret header OR "secret" field in JSON body.
 * Body auth is needed because cloud WebFetch can't set custom headers.
 *
 * Usage (from agent via WebFetch):
 *   POST /api/notion-proxy
 *   Body: { "secret": "<secret>", "path": "/databases/xxx/query", "method": "POST", "body": { ... } }
 *
 * Usage (from agent via curl — local only):
 *   POST /api/notion-proxy
 *   Headers: X-Proxy-Secret: <secret>, Content-Type: application/json
 *   Body: { "path": "/databases/xxx/query", "method": "POST", "body": { ... } }
 *
 * Supported paths: /databases/{id}/query, /pages, /pages/{id}, /blocks/{id}/children
 */

const NOTION_BASE = "https://api.notion.com/v1";
const NOTION_VERSION = "2022-06-28";

const ALLOWED_PATH_PREFIXES = [
  "/databases/",
  "/pages",
  "/blocks/",
  "/search",
];

function isAllowedPath(path: string): boolean {
  return ALLOWED_PATH_PREFIXES.some((prefix) => path.startsWith(prefix));
}

export async function POST(req: NextRequest) {
  const expectedSecret = process.env.NOTION_PROXY_SECRET;

  if (!expectedSecret) {
    return Response.json(
      { error: "Proxy not configured (missing NOTION_PROXY_SECRET)" },
      { status: 500 }
    );
  }

  // Parse body first (secret may be inside it)
  let requestBody: {
    secret?: string;
    path?: string;
    method?: string;
    body?: unknown;
  };

  try {
    requestBody = await req.json();
  } catch {
    return Response.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  // Auth check — accept secret from header OR body (WebFetch can't set headers)
  const secret = req.headers.get("x-proxy-secret") || requestBody.secret;

  if (!secret || secret !== expectedSecret) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { path, method = "GET", body } = requestBody;

  if (!path) {
    return Response.json({ error: "Missing required field: path" }, { status: 400 });
  }

  // Whitelist check — only allow Notion API paths, nothing internal
  if (!isAllowedPath(path)) {
    return Response.json(
      { error: `Path not allowed: ${path}` },
      { status: 403 }
    );
  }

  const notionKey = process.env.NOTION_API_KEY;
  if (!notionKey) {
    return Response.json(
      { error: "Proxy not configured (missing NOTION_API_KEY)" },
      { status: 500 }
    );
  }

  // Forward to Notion
  const notionUrl = `${NOTION_BASE}${path}`;
  const fetchOptions: RequestInit = {
    method: method.toUpperCase(),
    headers: {
      Authorization: `Bearer ${notionKey}`,
      "Notion-Version": NOTION_VERSION,
      "Content-Type": "application/json",
    },
  };

  if (body && ["POST", "PATCH", "PUT"].includes(method.toUpperCase())) {
    fetchOptions.body = JSON.stringify(body);
  }

  let notionResponse: Response;
  try {
    notionResponse = await fetch(notionUrl, fetchOptions);
  } catch (err) {
    return Response.json(
      { error: `Failed to reach Notion API: ${err}` },
      { status: 502 }
    );
  }

  const responseData = await notionResponse.json();

  return Response.json(responseData, { status: notionResponse.status });
}
