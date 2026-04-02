/**
 * Tasty E Kitchen — Payment Success Page
 *
 * Redirect destination after Grafterr Pay checkout completes.
 * URL: https://workcrew.io/pay/tasty-e/success
 *
 * Grafterr redirects here after successful payment.
 * May include order_id or ref as query params — TBC from Grafterr docs.
 */

export default function TastyEPaymentSuccess() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#fdf6f0",
        padding: "20px",
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "420px",
          background: "#fff",
          borderRadius: "20px",
          overflow: "hidden",
          boxShadow: "0 4px 32px rgba(0,0,0,0.10)",
          textAlign: "center",
        }}
      >
        {/* Header */}
        <div
          style={{
            background: "#b5451b",
            padding: "32px 24px",
          }}
        >
          <div
            style={{
              width: "64px",
              height: "64px",
              borderRadius: "50%",
              background: "rgba(255,255,255,0.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 16px",
              fontSize: "32px",
            }}
          >
            ✓
          </div>
          <h1
            style={{
              margin: 0,
              fontSize: "22px",
              fontWeight: 700,
              color: "#fff",
            }}
          >
            Payment Successful!
          </h1>
        </div>

        {/* Body */}
        <div style={{ padding: "32px 28px" }}>
          <p
            style={{
              fontSize: "16px",
              color: "#444",
              lineHeight: 1.6,
              margin: "0 0 20px",
            }}
          >
            Thank you! Your payment to{" "}
            <strong style={{ color: "#b5451b" }}>Tasty E Kitchen</strong> has been received.
          </p>

          <div
            style={{
              background: "#fdf6f0",
              borderRadius: "12px",
              padding: "18px",
              margin: "0 0 24px",
            }}
          >
            <p
              style={{
                margin: 0,
                fontSize: "14px",
                color: "#666",
                lineHeight: 1.6,
              }}
            >
              🍽️ Your order is being prepared<br />
              📱 Return to WhatsApp for updates<br />
              🚗 We&apos;ll notify you when it&apos;s on the way
            </p>
          </div>

          <p
            style={{
              margin: 0,
              fontSize: "13px",
              color: "#999",
            }}
          >
            You can close this page and return to WhatsApp.
          </p>
        </div>

        {/* Footer */}
        <div
          style={{
            borderTop: "1px solid #f0ede9",
            padding: "16px 24px",
          }}
        >
          <p style={{ margin: 0, fontSize: "11px", color: "#bbb" }}>
            Payment powered by Grafterr Pay
          </p>
          <p style={{ margin: "4px 0 0", fontSize: "11px", color: "#bbb" }}>
            Processed by WorkCrew on behalf of Tasty E Kitchen
          </p>
        </div>
      </div>
    </div>
  );
}
