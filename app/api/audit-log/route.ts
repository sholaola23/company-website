import { NextRequest, NextResponse } from "next/server";
import { Client } from "@notionhq/client";
import { waitUntil } from "@vercel/functions";

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------

// TODO: Replace with actual Notion database ID once created
const AUDIT_COMPLETIONS_DB = process.env.NOTION_AUDIT_COMPLETIONS_DB || "";

function getNotionClient(): Client | null {
  const key = process.env.NOTION_API_KEY;
  if (!key) return null;
  return new Client({ auth: key });
}

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface AuditLogBody {
  businessName: string;
  industry: string;
  city?: string;
  score: number;
  findings: string;
  /** When provided, updates an existing page with email info */
  notionPageId?: string;
  email?: string;
}

// ---------------------------------------------------------------------------
// Notion helpers
// ---------------------------------------------------------------------------

async function createAuditPage(
  notion: Client,
  data: AuditLogBody
): Promise<string | null> {
  try {
    const page = await notion.pages.create({
      parent: { database_id: AUDIT_COMPLETIONS_DB },
      properties: {
        "Business Name": {
          title: [{ text: { content: data.businessName } }],
        },
        Industry: {
          select: { name: data.industry },
        },
        City: {
          rich_text: data.city
            ? [{ text: { content: data.city } }]
            : [],
        },
        Score: {
          number: data.score,
        },
        "Key Findings": {
          rich_text: [
            {
              text: {
                content: data.findings.slice(0, 2000), // Notion rich_text limit
              },
            },
          ],
        },
        "Completed At": {
          date: { start: new Date().toISOString() },
        },
        "Has Email": {
          checkbox: false,
        },
        Status: {
          select: { name: "new" },
        },
        Source: {
          rich_text: [{ text: { content: "website_instant_audit" } }],
        },
      },
    });

    return page.id;
  } catch (err) {
    console.error("[audit-log] failed to create Notion page:", err);
    return null;
  }
}

async function updateAuditPageWithEmail(
  notion: Client,
  pageId: string,
  email: string
): Promise<boolean> {
  try {
    await notion.pages.update({
      page_id: pageId,
      properties: {
        Email: {
          email: email,
        },
        "Has Email": {
          checkbox: true,
        },
        Status: {
          select: { name: "email_found" },
        },
      },
    });
    return true;
  } catch (err) {
    console.error("[audit-log] failed to update Notion page with email:", err);
    return false;
  }
}

// ---------------------------------------------------------------------------
// Handler
// ---------------------------------------------------------------------------

export async function POST(req: NextRequest) {
  let body: Partial<AuditLogBody>;

  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { success: false, message: "Invalid request body." },
      { status: 400 }
    );
  }

  const { businessName, industry, city, score, findings, notionPageId, email } =
    body;

  // --- Path 1: Update existing page with email ---
  if (notionPageId && email) {
    const notion = getNotionClient();
    if (!notion || !AUDIT_COMPLETIONS_DB) {
      console.warn("[audit-log] Notion not configured, skipping email update");
      return NextResponse.json({ success: true });
    }

    waitUntil(
      updateAuditPageWithEmail(notion, notionPageId, email).catch((err) => {
        console.error("[audit-log] background email update failed:", err);
      })
    );

    return NextResponse.json({ success: true });
  }

  // --- Path 2: Create new audit completion page ---
  if (!businessName?.trim() || !industry?.trim() || score == null || !findings?.trim()) {
    return NextResponse.json(
      { success: false, message: "Missing required fields." },
      { status: 422 }
    );
  }

  const notion = getNotionClient();
  if (!notion || !AUDIT_COMPLETIONS_DB) {
    console.warn("[audit-log] Notion not configured, skipping audit log");
    return NextResponse.json({ success: true, notionPageId: null });
  }

  // Fire-and-forget: create the page in the background but return the page ID
  // We need the page ID for later email updates, so we await this one
  try {
    const pageId = await createAuditPage(notion, {
      businessName: businessName.trim(),
      industry: industry.trim(),
      city: city?.trim(),
      score,
      findings: findings.trim(),
    });

    return NextResponse.json({ success: true, notionPageId: pageId });
  } catch (err) {
    console.error("[audit-log] unexpected error:", err);
    // Don't fail the user experience — return success anyway
    return NextResponse.json({ success: true, notionPageId: null });
  }
}
