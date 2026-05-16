import { NextRequest } from "next/server";
import { retrieveChatKnowledge } from "@/lib/chat-knowledge";
import { getChatSystemPrompt } from "@/lib/chat-system-prompt";
import { requireGuard } from "@/lib/api-guard";
import { ANTHROPIC_API_URL, ANTHROPIC_VERSION, heliconeHeaders } from "@/lib/constants";

export const runtime = "nodejs";
export const maxDuration = 30;

const CHAT_MODEL =
  process.env.ANTHROPIC_CHAT_MODEL || "claude-sonnet-4-20250514";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

export async function POST(req: NextRequest) {
  // Guard FIRST — chat endpoint is high volume (Haiku) but still public.
  const guard = requireGuard(req, {
    endpoint: "chat",
    perIpLimit: 30,
  });
  if (!guard.ok) {
    return Response.json({ error: guard.message }, { status: guard.status });
  }

  let body: { messages?: unknown; pagePath?: unknown };

  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { messages, pagePath } = body;

  if (!messages || !Array.isArray(messages) || messages.length === 0) {
    return Response.json({ error: "Messages required" }, { status: 400 });
  }

  const validMessages = messages.filter(
    (message): message is ChatMessage =>
      !!message &&
      typeof message === "object" &&
      ((message as ChatMessage).role === "user" ||
        (message as ChatMessage).role === "assistant") &&
      typeof (message as ChatMessage).content === "string"
  );

  if (validMessages.length === 0) {
    return Response.json({ error: "Valid messages required" }, { status: 400 });
  }

  // Reject empty/whitespace-only messages
  const lastMessage = validMessages[validMessages.length - 1];
  if (!lastMessage?.content?.trim()) {
    return Response.json({ text: "It looks like your message was empty. How can I help you today?" });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return Response.json({
      text: "I'm having trouble connecting right now. You can reach us directly at hello@workcrew.io or call +44 7469 347 654.",
    });
  }

  try {
    // Cap conversation to last 20 messages and ensure it starts with a user message
    // (Anthropic API requires first message role to be "user")
    let cappedMessages = validMessages.slice(-20);
    while (cappedMessages.length > 0 && cappedMessages[0].role !== "user") {
      cappedMessages = cappedMessages.slice(1);
    }
    if (cappedMessages.length === 0) {
      return Response.json({ text: "How can I help you today?" });
    }

    const lastUserMessage = [...cappedMessages]
      .reverse()
      .find((message) => message.role === "user");
    const knowledgeQuery = cappedMessages
      .slice(-6)
      .map((message) => `${message.role}: ${message.content}`)
      .join("\n");
    const retrievedKnowledge = retrieveChatKnowledge({
      query: `${lastUserMessage?.content ?? ""}\n${knowledgeQuery}`,
      pagePath: typeof pagePath === "string" ? pagePath : undefined,
    });

    const response = await fetch(ANTHROPIC_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        ...heliconeHeaders(), "anthropic-version": ANTHROPIC_VERSION,
      },
      body: JSON.stringify({
        model: CHAT_MODEL,
        max_tokens: 900,
        stream: true,
        system: getChatSystemPrompt({
          pagePath: typeof pagePath === "string" ? pagePath : undefined,
          knowledgeContext: retrievedKnowledge.context,
        }),
        messages: cappedMessages,
      }),
    });

    if (!response.ok || !response.body) {
      return Response.json({
        text: "I'm having a moment — please try again, or reach us at hello@workcrew.io",
      });
    }

    // Stream the response back to the client
    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    const stream = new ReadableStream({
      async start(controller) {
        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) {
              controller.enqueue(new TextEncoder().encode("data: [DONE]\n\n"));
              controller.close();
              break;
            }
            const chunk = decoder.decode(value, { stream: true });
            const lines = chunk.split("\n");
            for (const line of lines) {
              if (line.startsWith("data: ")) {
                const data = line.slice(6);
                if (data === "[DONE]") continue;
                try {
                  const parsed = JSON.parse(data);
                  if (
                    parsed.type === "content_block_delta" &&
                    parsed.delta?.text
                  ) {
                    controller.enqueue(
                      new TextEncoder().encode(
                        `data: ${JSON.stringify({ text: parsed.delta.text })}\n\n`
                      )
                    );
                  }
                } catch {
                  // Ignore malformed SSE lines
                }
              }
            }
          }
        } catch {
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch {
    return Response.json({
      text: "I'm having trouble connecting right now. You can reach us directly at hello@workcrew.io",
    });
  }
}
