# MCP Tool Routing — Agent Fleet Reference

## IMPORTANT: Local vs Cloud Tool Names

MCP tools have **different names** depending on where the agent runs:

| Environment | How tools load | How to call them |
|---|---|---|
| **Local** (Claude Code desktop) | Deferred — findable via ToolSearch | UUID-prefixed names (see below) |
| **Cloud** (claude.ai/code scheduled tasks) | Pre-loaded — NOT findable via ToolSearch | Short names, no UUID prefix (see below) |

**Rule for cloud agents:** Do NOT use ToolSearch to find Notion or Gmail tools — ToolSearch only finds deferred (unloaded) tools and will always return "No matching deferred tools found" for these connectors. The tools are already loaded in the session. **Call them directly by their short names** listed in the Cloud section below — just use the tool name as if it were any other tool.

---

## Gmail Tools

### Local (Claude Code desktop)
- **Search/Read messages (Claude native):** `mcp__f6ee3950-bf48-46d7-90cc-d53c8546a0dc__gmail_search_messages` / `gmail_read_message`
- **Create draft (Claude native):** `mcp__f6ee3950-bf48-46d7-90cc-d53c8546a0dc__gmail_create_draft` — CANNOT send
- **Send email (Zapier):** `mcp__8ccf50b7-aff2-4b81-8947-88c792cc6a68__gmail_send_email`
- **Create draft for outreach (Zapier):** `mcp__8ccf50b7-aff2-4b81-8947-88c792cc6a68__gmail_create_draft`

### Cloud (claude.ai/code scheduled tasks)
- **Search/Read messages:** `gmail_search_messages` / `gmail_read_message` / `gmail_read_thread`
- **Send email (Zapier connector):** `gmail_send_email`
- **Create draft (Zapier connector):** `gmail_create_draft`
- **Find email (Zapier connector):** `gmail_find_email`
- **Reply to email (Zapier connector):** `gmail_reply_to_email`

**CRITICAL:** NEVER use the native Gmail read tools for sending — they do not have send capability. Use `gmail_send_email` (Zapier) for ALL outbound emails.

**ALWAYS set** `from: hello@workcrew.io` and `from_name: Olushola from WorkCrew` for all prospect-facing emails. Internal emails to olusholaoladipupo1@gmail.com can use the default Gmail address.

---

## Notion Tools

### Local (Claude Code desktop)
- All Notion read/write: `mcp__7ce036d0-a091-4c5b-8498-e155ede16e1a__notion-*`

### Cloud (claude.ai/code scheduled tasks)
- **Fetch page/database:** `notion-fetch`
- **Search workspace:** `notion-search`
- **Create pages:** `notion-create-pages`
- **Update page:** `notion-update-page`
- **Move pages:** `notion-move-pages`
- **Duplicate page:** `notion-duplicate-page`
- **Create database:** `notion-create-database`
- **Update database:** `notion-update-database`
- **Get comments:** `notion-get-comments`
- **Create comment:** `notion-create-comment`
- **Get users:** `notion-get-users`
- **Get teams:** `notion-get-teams`

---

## Browser / Web Tools
- **Public pages (no login required):** `mcp__plugin_chrome-devtools-mcp_chrome-devtools__*`
- **Authenticated sessions (Vercel, Meta Ads, Gmail UI, Beehiiv):** `mcp__Claude_in_Chrome__*`
- **NEVER use WebFetch for HTML/DOM verification** — it returns raw HTML without rendering. Use the browser tools above.
- **For simple JSON APIs and public content:** WebFetch / WebSearch are fine.

---

## Google Docs / Drive (Zapier)

### Local
- Create document: `mcp__8ccf50b7-aff2-4b81-8947-88c792cc6a68__google_docs_create_document_from_text`

### Cloud
- Create document: `google_docs_create_document_from_text`
