import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          background: "#0a0f1e",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "80px 100px",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Background accent */}
        <div
          style={{
            position: "absolute",
            top: -100,
            right: -100,
            width: 500,
            height: 500,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(37,99,235,0.25) 0%, transparent 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -80,
            left: 200,
            width: 400,
            height: 400,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(37,99,235,0.12) 0%, transparent 70%)",
          }}
        />

        {/* Logo badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: 48,
          }}
        >
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 12,
              background: "#2563eb",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginRight: 16,
            }}
          >
            <span
              style={{
                color: "white",
                fontSize: 22,
                fontWeight: 700,
                letterSpacing: "-0.5px",
              }}
            >
              WC
            </span>
          </div>
          <span
            style={{
              color: "#94a3b8",
              fontSize: 22,
              fontWeight: 500,
              letterSpacing: "0.5px",
            }}
          >
            workcrew.io
          </span>
        </div>

        {/* Main headline */}
        <div
          style={{
            fontSize: 68,
            fontWeight: 800,
            color: "white",
            lineHeight: 1.1,
            marginBottom: 28,
            letterSpacing: "-1.5px",
            maxWidth: 900,
          }}
        >
          AI Systems That Run
          <br />
          <span style={{ color: "#2563eb" }}>Your Business</span>
        </div>

        {/* Subheadline */}
        <div
          style={{
            fontSize: 26,
            color: "#94a3b8",
            lineHeight: 1.5,
            maxWidth: 780,
            marginBottom: 56,
          }}
        >
          Automation, websites, and AI training for small businesses.
          Built for results — guaranteed.
        </div>

        {/* Pills */}
        <div style={{ display: "flex", gap: 16 }}>
          {["AI Automation", "Professional Websites", "AI Training"].map(
            (label) => (
              <div
                key={label}
                style={{
                  padding: "10px 24px",
                  borderRadius: 100,
                  border: "1.5px solid rgba(37,99,235,0.4)",
                  background: "rgba(37,99,235,0.1)",
                  color: "#93c5fd",
                  fontSize: 18,
                  fontWeight: 500,
                }}
              >
                {label}
              </div>
            )
          )}
        </div>
      </div>
    ),
    { ...size }
  );
}
