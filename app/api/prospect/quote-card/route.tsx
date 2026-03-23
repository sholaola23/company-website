import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";

export const runtime = "edge";

// ─── Quote data ────────────────────────────────────────────────────────────────

interface QuoteDesign {
  quote: string;
  bg: string;
  textColour: string;
  attrColour: string;
  fontWeight: string;
  accentTop?: string; // optional accent line colour at top
  textAlign?: "left" | "center";
  attrAlign?: "left" | "center" | "right";
  fontSize?: number;
}

const QUOTES: Record<number, QuoteDesign> = {
  1: {
    quote:
      "Clarity will remove panic. You cannot fix what you refuse to look at.",
    bg: "#1B2A4A",
    textColour: "#FFFFFF",
    attrColour: "#94A3B8",
    fontWeight: "700",
    textAlign: "left",
    attrAlign: "left",
  },
  2: {
    quote:
      "Financial pressure makes people feel very uncomfortable and decisions rooted in fear become very expensive.",
    bg: "#1C1C1C",
    textColour: "#FFFFFF",
    attrColour: "#94A3B8",
    fontWeight: "400",
    accentTop: "#D4AF37",
    textAlign: "left",
    attrAlign: "left",
  },
  3: {
    quote:
      "High earners price outcomes. Most people under-earn because they price on their time.",
    bg: "#6B1D2A",
    textColour: "#FFFFFF",
    attrColour: "#F9A8D4",
    fontWeight: "700",
    textAlign: "left",
    attrAlign: "left",
  },
  4: {
    quote: "Wealth isn\u2019t built on vibes. It\u2019s built on structure.",
    bg: "#F5F0EB",
    textColour: "#18181B",
    attrColour: "#71717A",
    fontWeight: "700",
    textAlign: "left",
    attrAlign: "left",
  },
  5: {
    quote: "You cannot shrink your way to wealth.",
    bg: "#000000",
    textColour: "#FFFFFF",
    attrColour: "#A1A1AA",
    fontWeight: "700",
    textAlign: "center",
    attrAlign: "right",
    fontSize: 64,
  },
};

// ─── GET handler ───────────────────────────────────────────────────────────────

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const quoteNum = parseInt(searchParams.get("quote") ?? "0", 10);
  const design = QUOTES[quoteNum];

  if (!design) {
    return new Response("Invalid quote number. Use ?quote=1 through ?quote=5", {
      status: 400,
    });
  }

  const {
    quote,
    bg,
    textColour,
    attrColour,
    fontWeight,
    accentTop,
    textAlign = "left",
    attrAlign = "left",
    fontSize = 48,
  } = design;

  return new ImageResponse(
    (
      <div
        style={{
          width: "1080px",
          height: "1080px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "100px",
          backgroundColor: bg,
          position: "relative",
        }}
      >
        {/* Optional accent line at top */}
        {accentTop && (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "6px",
              backgroundColor: accentTop,
            }}
          />
        )}

        {/* Quote text */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            flex: 1,
            textAlign,
          }}
        >
          <p
            style={{
              fontSize: `${fontSize}px`,
              fontWeight: fontWeight as "400" | "700",
              color: textColour,
              lineHeight: 1.3,
              margin: 0,
              letterSpacing: "-0.02em",
            }}
          >
            &ldquo;{quote}&rdquo;
          </p>
        </div>

        {/* Attribution */}
        <p
          style={{
            fontSize: "24px",
            fontWeight: 400,
            color: attrColour,
            margin: 0,
            marginTop: "40px",
            textAlign: attrAlign,
            width: "100%",
          }}
        >
          — Patricia Bright
        </p>
      </div>
    ),
    {
      width: 1080,
      height: 1080,
    },
  );
}
