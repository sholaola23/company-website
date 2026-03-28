# MCP Tool Routing — Agent Fleet Reference

## Gmail Tools
- **Search/Read messages (Claude native):** `mcp__f6ee3950-bf48-46d7-90cc-d53c8546a0dc__gmail_search_messages` / `gmail_read_message`
- **Create draft (Claude native):** `mcp__f6ee3950-bf48-46d7-90cc-d53c8546a0dc__gmail_create_draft` — CANNOT send
- **Send email (Zapier):** `mcp__8ccf50b7-aff2-4b81-8947-88c792cc6a68__gmail_send_email`
- **Create draft for outreach (Zapier):** `mcp__8ccf50b7-aff2-4b81-8947-88c792cc6a68__gmail_create_draft`

**CRITICAL:** NEVER use the Claude native MCP (`f6ee3950`) for sending — it does not have send capability. Use the Zapier MCP (`8ccf50b7`) for ALL outbound emails and outreach drafts.

**ALWAYS set** `from: hello@oladipupoconsulting.co.uk` and `from_name: Olushola from Oladipupo Consulting` for all prospect-facing emails. Internal emails to olusholaoladipupo1@gmail.com can use the default Gmail address.

## Notion Tools
- All Notion read/write: `mcp__7ce036d0-a091-4c5b-8498-e155ede16e1a__notion-*`

## Browser / Web Tools
- **Public pages (no login required):** `mcp__plugin_chrome-devtools-mcp_chrome-devtools__*`
- **Authenticated sessions (Vercel, Meta Ads, Gmail UI, Beehiiv):** `mcp__Claude_in_Chrome__*`
- **NEVER use WebFetch for HTML/DOM verification** — it returns raw HTML without rendering. Use the browser tools above.
- **For simple JSON APIs and public content:** WebFetch / WebSearch are fine.

## Google Docs / Drive (Zapier)
- Create document: `mcp__8ccf50b7-aff2-4b81-8947-88c792cc6a68__google_docs_create_document_from_text`
