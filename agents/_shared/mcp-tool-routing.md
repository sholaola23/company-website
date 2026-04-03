# MCP Tool Routing — Agent Fleet Reference

## IMPORTANT: Local vs Cloud Tool Names

MCP tools have **different names** depending on where the agent runs:

| Environment | How tools load | How to call them |
|---|---|---|
| **Local** (Claude Code desktop) | Deferred — findable via ToolSearch | UUID-prefixed names (see below) |
| **Cloud** (claude.ai/code scheduled tasks) | Deferred — findable via ToolSearch with exact select syntax | `mcp__ServiceName__tool-name` format (see below) |

**Rule for cloud agents:** Use `ToolSearch` with the **exact select syntax** to load cloud connector tools before calling them. Example:
```
ToolSearch  select:mcp__Notion__notion-fetch,mcp__Notion__notion-search,mcp__Notion__notion-update-page
ToolSearch  select:mcp__Zapier__gmail_send_email,mcp__Zapier__gmail_create_draft
```
**NEVER use keyword search** (`ToolSearch notion` or `ToolSearch gmail`) — keyword search will NOT find connector tools and returns "No matching deferred tools found". Always use `select:` with the exact `mcp__ServiceName__tool-name`.

---

## Gmail Tools

### Local (Claude Code desktop)
- **Search/Read messages (Claude native):** `mcp__f6ee3950-bf48-46d7-90cc-d53c8546a0dc__gmail_search_messages` / `gmail_read_message`
- **Create draft (Claude native):** `mcp__f6ee3950-bf48-46d7-90cc-d53c8546a0dc__gmail_create_draft` — CANNOT send
- **Send email (Zapier):** `mcp__8ccf50b7-aff2-4b81-8947-88c792cc6a68__gmail_send_email`
- **Create draft for outreach (Zapier):** `mcp__8ccf50b7-aff2-4b81-8947-88c792cc6a68__gmail_create_draft`

### Cloud (claude.ai/code scheduled tasks)
Load these tools FIRST via ToolSearch before calling them:
```
ToolSearch  select:mcp__Zapier__gmail_send_email,mcp__Zapier__gmail_create_draft,mcp__Zapier__gmail_find_email,mcp__Zapier__gmail_reply_to_email
```
- **Send email:** `mcp__Zapier__gmail_send_email`
- **Create draft:** `mcp__Zapier__gmail_create_draft`
- **Find email:** `mcp__Zapier__gmail_find_email`
- **Reply to email:** `mcp__Zapier__gmail_reply_to_email`

**CRITICAL:** ALL email sending in cloud goes through the **Zapier connector** (`mcp__Zapier__*`), NOT the native Gmail connector. This is because the Zapier connector has send capability; native Gmail connector does not.

**ALWAYS set** `from: hello@workcrew.io` and `from_name: Olushola from WorkCrew` for all prospect-facing emails. Internal emails to olusholaoladipupo1@gmail.com can use the default Gmail address.

---

## Notion Tools

### Local (Claude Code desktop)
- All Notion read/write: `mcp__7ce036d0-a091-4c5b-8498-e155ede16e1a__notion-*`

### Cloud (claude.ai/code scheduled tasks)
Load these tools FIRST via ToolSearch before calling them:
```
ToolSearch  select:mcp__Notion__notion-fetch,mcp__Notion__notion-search,mcp__Notion__notion-create-pages,mcp__Notion__notion-update-page
```
- **Fetch page/database:** `mcp__Notion__notion-fetch`
- **Search workspace:** `mcp__Notion__notion-search`
- **Create pages:** `mcp__Notion__notion-create-pages`
- **Update page:** `mcp__Notion__notion-update-page`
- **Move pages:** `mcp__Notion__notion-move-pages`
- **Duplicate page:** `mcp__Notion__notion-duplicate-page`
- **Create database:** `mcp__Notion__notion-create-database`
- **Update data source:** `mcp__Notion__notion-update-data-source`
- **Get comments:** `mcp__Notion__notion-get-comments`
- **Create comment:** `mcp__Notion__notion-create-comment`
- **Get users:** `mcp__Notion__notion-get-users`
- **Get teams:** `mcp__Notion__notion-get-teams`

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
Load via ToolSearch first: `ToolSearch  select:mcp__Zapier__google_docs_create_document_from_text`
- Create document: `mcp__Zapier__google_docs_create_document_from_text`
