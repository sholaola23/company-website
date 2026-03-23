import { ImageResponse } from "@vercel/og";

export const runtime = "edge";

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#09090b",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Blue accent — top-left glow */}
        <div
          style={{
            position: "absolute",
            top: "-120px",
            left: "-120px",
            width: "480px",
            height: "480px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(59,130,246,0.35) 0%, transparent 70%)",
            display: "flex",
          }}
        />

        {/* Blue accent — bottom-right glow */}
        <div
          style={{
            position: "absolute",
            bottom: "-100px",
            right: "-100px",
            width: "400px",
            height: "400px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(59,130,246,0.25) 0%, transparent 70%)",
            display: "flex",
          }}
        />

        {/* Thin blue accent line at the top */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "4px",
            background:
              "linear-gradient(90deg, transparent 0%, #3b82f6 30%, #3b82f6 70%, transparent 100%)",
            display: "flex",
          }}
        />

        {/* Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "24px",
            zIndex: 1,
          }}
        >
          {/* Company name */}
          <div
            style={{
              fontSize: "64px",
              fontWeight: 700,
              color: "#ffffff",
              letterSpacing: "-1px",
              lineHeight: 1.1,
              textAlign: "center",
              display: "flex",
            }}
          >
            Oladipupo Consulting
          </div>

          {/* Divider */}
          <div
            style={{
              width: "80px",
              height: "4px",
              backgroundColor: "#3b82f6",
              borderRadius: "2px",
              display: "flex",
            }}
          />

          {/* Subtitle */}
          <div
            style={{
              fontSize: "28px",
              fontWeight: 400,
              color: "#a1a1aa",
              textAlign: "center",
              display: "flex",
            }}
          >
            AI Automation for Small Businesses
          </div>
        </div>

        {/* Domain at the bottom */}
        <div
          style={{
            position: "absolute",
            bottom: "32px",
            fontSize: "18px",
            fontWeight: 400,
            color: "#52525b",
            display: "flex",
          }}
        >
          oladipupoconsulting.co.uk
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}
