import { NextRequest, NextResponse } from "next/server";
import { ANTHROPIC_API_URL, ANTHROPIC_VERSION, heliconeHeaders } from "@/lib/constants";

export const runtime = "edge";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface KapsoMessage {
  /** Phone number in E.164 format, e.g. "+447700900000" */
  from: string;
  /** The text body of the incoming WhatsApp message */
  body: string;
  /** Optional Kapso-assigned conversation / thread id */
  conversationId?: string;
  /** Optional display name from WhatsApp profile */
  name?: string;
  /** Timestamp of the incoming message (ISO string) */
  timestamp?: string;
}

interface ConversationEntry {
  role: "user" | "assistant";
  content: string;
}

interface ConversationState {
  history: ConversationEntry[];
  escalated: boolean;
  escalatedAt: string | null;
  escalationTrigger: string | null;
  lastActivity: string;
  customerName: string | null;
}

// ---------------------------------------------------------------------------
// In-memory conversation store
// ---------------------------------------------------------------------------
// NOTE: This works for a single serverless instance. For production at scale,
// replace with a persistent store (Redis, KV, or a database).
// Edge runtime instances may be recycled, so conversations can reset — this is
// acceptable for the MVP phase. Kapso retains the full history on their side.
// ---------------------------------------------------------------------------

const conversations = new Map<string, ConversationState>();

const MAX_HISTORY = 30; // keep the last 30 messages (15 turns)
const ESCALATION_IDLE_HOURS = 24;

function getConversation(id: string): ConversationState {
  if (!conversations.has(id)) {
    conversations.set(id, {
      history: [],
      escalated: false,
      escalatedAt: null,
      escalationTrigger: null,
      lastActivity: new Date().toISOString(),
      customerName: null,
    });
  }
  return conversations.get(id)!;
}

function addMessage(
  state: ConversationState,
  role: "user" | "assistant",
  content: string
) {
  state.history.push({ role, content });
  // Trim to keep memory bounded
  if (state.history.length > MAX_HISTORY) {
    state.history = state.history.slice(-MAX_HISTORY);
  }
  state.lastActivity = new Date().toISOString();
}

// ---------------------------------------------------------------------------
// System prompt (inlined from system-prompt.md)
// ---------------------------------------------------------------------------

const SYSTEM_PROMPT = `You are the WhatsApp ordering assistant for E'Manuel Foods & Bakery, a Nigerian-British bakery based in Kettering, UK, run by Tunmise. You help customers place orders, answer questions about the menu, and explain delivery and payment options.

## Personality
- Warm, friendly, and welcoming. You represent a community-focused bakery.
- Use "we" not "I" — you are part of the E'Manuel team.
- Keep messages short and clear. WhatsApp messages should be concise.
- Use a warm, approachable tone. Light humour is fine but keep it natural.
- You can understand and respond to Nigerian Pidgin English as well as standard English.
- Use emojis sparingly — a bread emoji or smile is fine, don't overdo it.

## Menu (ONLY these products — do NOT invent or suggest any others)
- Agege Bread 800g — £2.00
- Sardine Bread 450g — £2.50
- Meat Pie — £2.50

If a customer asks for any product not on this list, say: "We currently have Agege Bread, Sardine Bread, and Meat Pie on the menu. Would you like to order any of these?"

## What You CAN Do
- Share the menu and prices
- Take orders: collect customer name, items, quantities, delivery address, and postcode
- Calculate order totals
- Explain delivery areas (Kettering, Corby, Wellingborough, Northampton, and surrounding villages)
- Explain delivery schedule (Fridays only, order by Thursday)
- Explain payment methods (SumUp card link or bank transfer — details sent after order confirmation)
- Answer FAQs (no minimum order, free delivery, order cutoff is Thursday)
- Greet returning customers warmly

## What You CANNOT Do
- Process payments or share bank details (Tunmise sends these personally)
- Modify or cancel existing orders
- Handle complaints or refund requests
- Answer questions unrelated to E'Manuel Foods & Bakery
- Make promises about specific delivery times (just "Friday")
- Offer discounts or special pricing

## Order Taking Flow
When taking an order, collect these details in a natural conversation:
1. Items and quantities
2. Customer name
3. Delivery address
4. Postcode
5. Then confirm the full order with a summary and total

Example order summary format:
"Here's your order:
- 2x Agege Bread (800g) — £4.00
- 3x Meat Pie — £7.50

Total: £11.50

Delivery to: [Name], [Address], [Postcode]
Delivering this Friday!

Tunmise will confirm your order and send payment details shortly."

## Escalation Rules
If any of these come up, respond with the escalation message and include the tag [ESCALATE] at the very end of your message (on its own line, the customer won't see this tag):

Escalation triggers:
- Complaints about products or service
- Refund requests
- Requests to change or cancel an existing order
- Bulk orders or catering enquiries (more than 20 of any single item)
- Collection requests (instead of delivery)
- Delivery to an area not in the standard list
- Anything you are unsure about
- The customer explicitly asks to speak to Tunmise or "the owner" or "a person"

Escalation message: "Let me get Tunmise to help you with that. He'll get back to you shortly!"

## Boundaries
- If someone asks about topics unrelated to the bakery, say: "I'm here to help with E'Manuel Foods & Bakery orders and questions! Is there anything I can help you with from our menu?"
- Never share personal information about Tunmise or the business beyond what's in the menu and delivery info.
- If someone is rude, stay polite and professional. If it continues, escalate.

## Language
- Default to English.
- If a customer writes in Pidgin English, respond naturally in a mix that matches their style.
- Example Pidgin response: "We dey here for you! Our Agege Bread na £2 and e fresh well well. How many you wan order?"`;

// ---------------------------------------------------------------------------
// POST handler
// ---------------------------------------------------------------------------

export async function POST(req: NextRequest) {
  // ---- Auth check ----
  const authHeader = req.headers.get("authorization");
  const expectedToken = process.env.WHATSAPP_EMANUEL_WEBHOOK_SECRET;

  if (expectedToken && authHeader !== `Bearer ${expectedToken}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // ---- Parse incoming message ----
  let incoming: KapsoMessage;
  try {
    incoming = (await req.json()) as KapsoMessage;
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON body" },
      { status: 400 }
    );
  }

  const { from, body, conversationId, name } = incoming;

  if (!from || !body?.trim()) {
    return NextResponse.json(
      { error: "Missing 'from' or 'body' in payload" },
      { status: 400 }
    );
  }

  const convoId = conversationId || from;
  const state = getConversation(convoId);

  // Store customer name if provided by Kapso
  if (name && !state.customerName) {
    state.customerName = name;
  }

  // ---- Check escalation state ----
  if (state.escalated) {
    const escalatedAt = state.escalatedAt
      ? new Date(state.escalatedAt).getTime()
      : 0;
    const hoursSince = (Date.now() - escalatedAt) / (1000 * 60 * 60);

    // Auto-resume after idle period
    if (hoursSince >= ESCALATION_IDLE_HOURS) {
      state.escalated = false;
      state.escalatedAt = null;
      state.escalationTrigger = null;
    } else {
      // Still escalated — send one reminder then stay quiet
      const recentAssistant = state.history
        .slice(-4)
        .filter((m) => m.role === "assistant");
      const alreadyReminded = recentAssistant.some((m) =>
        m.content.includes("looking into this")
      );

      if (!alreadyReminded) {
        const reminder =
          "Tunmise is looking into this for you. He'll be in touch soon!";
        addMessage(state, "user", body.trim());
        addMessage(state, "assistant", reminder);
        return NextResponse.json({
          reply: reminder,
          escalated: true,
          conversationId: convoId,
        });
      }

      // Already reminded — stay silent, but still log
      addMessage(state, "user", body.trim());
      return NextResponse.json({
        reply: null,
        escalated: true,
        silent: true,
        conversationId: convoId,
      });
    }
  }

  // ---- Build messages for Claude ----
  addMessage(state, "user", body.trim());

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    console.error("ANTHROPIC_API_KEY not set");
    return NextResponse.json(
      { error: "Server configuration error" },
      { status: 500 }
    );
  }

  const claudeMessages = state.history.map((m) => ({
    role: m.role,
    content: m.content,
  }));

  // ---- Call Claude Haiku ----
  let assistantReply: string;

  try {
    const response = await fetch(ANTHROPIC_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        ...heliconeHeaders(), "anthropic-version": ANTHROPIC_VERSION,
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 300,
        temperature: 0.3,
        system: SYSTEM_PROMPT,
        messages: claudeMessages,
      }),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error("Claude API error:", response.status, errorBody);
      return NextResponse.json(
        { error: "AI service unavailable" },
        { status: 502 }
      );
    }

    const data = (await response.json()) as {
      content: { type: string; text: string }[];
    };
    assistantReply =
      data.content?.[0]?.text || "Sorry, something went wrong. Please try again!";
  } catch (err) {
    console.error("Claude API call failed:", err);
    return NextResponse.json(
      { error: "AI service unavailable" },
      { status: 502 }
    );
  }

  // ---- Check for escalation tag ----
  const hasEscalation = assistantReply.includes("[ESCALATE]");

  // Strip the tag before sending to customer
  const customerReply = assistantReply
    .replace(/\[ESCALATE\]/g, "")
    .trim();

  if (hasEscalation) {
    state.escalated = true;
    state.escalatedAt = new Date().toISOString();
    state.escalationTrigger = body.trim();
  }

  addMessage(state, "assistant", customerReply);

  // ---- Return response ----
  return NextResponse.json({
    reply: customerReply,
    escalated: hasEscalation,
    conversationId: convoId,
    ...(hasEscalation && {
      escalation: {
        trigger: body.trim(),
        customerName: state.customerName || name || null,
        customerPhone: from,
        timestamp: new Date().toISOString(),
      },
    }),
  });
}

// ---------------------------------------------------------------------------
// GET — health check / verify endpoint is live
// ---------------------------------------------------------------------------

export async function GET() {
  return NextResponse.json({
    status: "ok",
    service: "E'Manuel WhatsApp Bot",
    version: "1.0.0",
  });
}
