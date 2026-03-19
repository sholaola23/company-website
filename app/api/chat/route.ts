import { NextRequest } from "next/server";
import { CHAT_SYSTEM_PROMPT } from "@/lib/chat-system-prompt";
import { checkChatRateLimit } from "@/lib/rate-limit";
import { ANTHROPIC_API_URL, ANTHROPIC_VERSION } from "@/lib/constants";

export const runtime = "edge";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { messages } = body;

  if (!messages || !Array.isArray(messages) || messages.length === 0) {
    return Response.json({ error: "Messages required" }, { status: 400 });
  }

  // Reject empty/whitespace-only messages
  const lastMessage = messages[messages.length - 1];
  if (!lastMessage?.content?.trim()) {
    return Response.json({ text: "It looks like your message was empty. How can I help you today?" });
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0] || "unknown";
  const { allowed } = checkChatRateLimit(ip);
  if (!allowed) {
    return Response.json(
      {
        error:
          "You've sent quite a few messages! Please try again in a bit, or reach us directly at hello@oladipupoconsulting.co.uk",
      },
      { status: 429 }
    );
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return Response.json({
      text: "I'm having trouble connecting right now. You can reach us directly at hello@oladipupoconsulting.co.uk or call 07469 347654.",
    });
  }

  try {
    // Cap conversation to last 20 messages and ensure it starts with a user message
    // (Anthropic API requires first message role to be "user")
    let cappedMessages = messages.slice(-20);
    while (cappedMessages.length > 0 && cappedMessages[0].role !== "user") {
      cappedMessages = cappedMessages.slice(1);
    }
    if (cappedMessages.length === 0) {
      return Response.json({ text: "How can I help you today?" });
    }

    const response = await fetch(ANTHROPIC_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": ANTHROPIC_VERSION,
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 700,
        stream: true,
        system: CHAT_SYSTEM_PROMPT,
        messages: cappedMessages,
      }),
    });

    if (!response.ok || !response.body) {
      return Response.json({
        text: "I'm having a moment — please try again, or reach us at hello@oladipupoconsulting.co.uk",
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
      text: "I'm having trouble connecting right now. You can reach us directly at hello@oladipupoconsulting.co.uk",
    });
  }
}
