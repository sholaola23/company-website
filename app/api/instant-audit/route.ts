import { NextRequest } from "next/server";
import { getAuditSystemPrompt } from "@/lib/audit-system-prompt";
import { enrichAuditContext } from "@/lib/firecrawl";
import { requireGuard } from "@/lib/api-guard";
import { ANTHROPIC_API_URL, ANTHROPIC_VERSION, heliconeHeaders } from "@/lib/constants";

export const runtime = "edge";

export async function POST(req: NextRequest) {
  // Guard FIRST — kill-switch + origin + global cap + per-IP. Prevents the
  // 29 Apr 2026 burn pattern where this Sonnet+Opus endpoint was hit
  // overnight and ran up ~$178 in 33 minutes.
  const guard = requireGuard(req, {
    endpoint: "instant-audit",
    perIpLimit: 5,
  });
  if (!guard.ok) {
    return Response.json({ error: guard.message }, { status: guard.status });
  }

  let body: { businessName?: string; industry?: string; websiteUrl?: string };

  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { businessName, industry, websiteUrl } = body;

  if (!businessName?.trim() || !industry?.trim()) {
    return Response.json(
      { error: "Missing required fields: businessName and industry." },
      { status: 400 }
    );
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    // Return structured fallback so the UI can still render results
    return Response.json(getFallbackResult(businessName.trim(), industry.trim()));
  }

  try {
    // Enrich with live Firecrawl data before calling Claude.
    // Runs in parallel-ish with a hard timeout — never blocks the audit.
    const liveData = await enrichAuditContext(
      businessName.trim(),
      industry.trim(),
      websiteUrl?.trim() || undefined
    );

    const systemPrompt = getAuditSystemPrompt(
      businessName.trim(),
      industry.trim(),
      websiteUrl?.trim() || undefined,
      liveData
    );

    const upstream = await fetch(ANTHROPIC_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        ...heliconeHeaders(), "anthropic-version": ANTHROPIC_VERSION,
        "anthropic-beta": "advisor-tool-2026-03-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-5-20250514",
        max_tokens: 1500,
        stream: true,
        system: systemPrompt,
        tools: [
          {
            type: "advisor_20260301",
            name: "advisor",
            model: "claude-opus-4-6",
            max_uses: 1,
          },
        ],
        messages: [
          {
            role: "user",
            content: `Analyse ${businessName.trim()} (${industry.trim()} business)${
              websiteUrl?.trim()
                ? ` with website ${websiteUrl.trim()}`
                : " with no website"
            } and provide the AI Readiness Audit in JSON format.`,
          },
        ],
      }),
    });

    if (!upstream.ok || !upstream.body) {
      console.error("[instant-audit] upstream error:", upstream.status);
      return Response.json(
        getFallbackResult(businessName.trim(), industry.trim())
      );
    }

    // Proxy only the text delta events to the client
    const reader = upstream.body.getReader();
    const decoder = new TextDecoder();
    const encoder = new TextEncoder();

    const stream = new ReadableStream({
      async start(controller) {
        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) {
              controller.enqueue(encoder.encode("data: [DONE]\n\n"));
              controller.close();
              break;
            }

            const chunk = decoder.decode(value, { stream: true });
            const lines = chunk.split("\n");

            for (const line of lines) {
              if (!line.startsWith("data: ")) continue;
              const raw = line.slice(6).trim();
              if (raw === "[DONE]") continue;

              try {
                const parsed = JSON.parse(raw);
                if (
                  parsed.type === "content_block_delta" &&
                  parsed.delta?.text
                ) {
                  controller.enqueue(
                    encoder.encode(
                      `data: ${JSON.stringify({ text: parsed.delta.text })}\n\n`
                    )
                  );
                }
              } catch {
                // Non-JSON Anthropic SSE event — skip
              }
            }
          }
        } catch (err) {
          console.error("[instant-audit] stream read error:", err);
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache, no-transform",
        Connection: "keep-alive",
        "X-Accel-Buffering": "no",
      },
    });
  } catch (err) {
    console.error("[instant-audit] unexpected error:", err);
    return Response.json(getFallbackResult(businessName.trim(), industry.trim()));
  }
}

function getFallbackResult(businessName: string, industry: string) {
  return {
    score: 4,
    scoreLabel: "Room for Improvement",
    summary: `Based on typical ${industry.toLowerCase()} businesses, ${businessName} likely has significant opportunities for AI automation. Most businesses in this sector spend 10+ hours per week on tasks that can be automated, from customer communication to booking management.`,
    findings: [
      {
        title: "Manual Customer Communication",
        description: `Most ${industry.toLowerCase()} businesses handle enquiries manually, leading to slow response times and missed opportunities. First-response speed is often the deciding factor for new customers.`,
        severity: "red",
      },
      {
        title: "No Automated Booking System",
        description:
          "Without automated scheduling, you're likely losing bookings to competitors who offer instant online booking. Customers increasingly expect 24/7 self-service options.",
        severity: "amber",
      },
      {
        title: "Untapped Review Potential",
        description:
          "Automated review collection could significantly boost your Google visibility and local trust. Most happy customers won't leave a review unless prompted at the right moment.",
        severity: "amber",
      },
    ],
    quickWins: [
      {
        title: "Set Up Google Business Profile",
        description:
          "A complete, verified Google Business Profile is free and can immediately increase your visibility to local customers searching for your services.",
      },
      {
        title: "Add Online Booking",
        description:
          "Even a simple booking form or Calendly link can reduce phone tag and capture leads 24/7 — including outside business hours when you're unavailable.",
      },
    ],
    recommendedTier: "starter",
    tierReason: `A single focused automation — like AI-powered lead capture or appointment booking — would deliver the fastest return for a ${industry.toLowerCase()} business at your stage.`,
  };
}
