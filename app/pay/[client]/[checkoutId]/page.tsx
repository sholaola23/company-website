"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

interface CheckoutData {
  amount: number;
  currency: string;
  description: string;
  merchant_name: string;
  status: string;
  checkout_reference: string;
}

const CLIENT_BRANDING: Record<string, { name: string; tagline: string; color: string }> = {
  "emanuel-bakery": {
    name: "E'Manuel Foods and Bakery",
    tagline: "Your home for authentic Nigerian cuisine",
    color: "#2d5016",
  },
};

export default function PaymentPage() {
  const params = useParams();
  const client = params.client as string;
  const checkoutId = params.checkoutId as string;

  const [checkout, setCheckout] = useState<CheckoutData | null>(null);
  const [error, setError] = useState("");
  const [paid, setPaid] = useState(false);
  const [loading, setLoading] = useState(true);
  const [cardMounted, setCardMounted] = useState(false);

  const branding = CLIENT_BRANDING[client] || {
    name: client.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
    tagline: "",
    color: "#1e3a5f",
  };

  // Fetch checkout details
  useEffect(() => {
    async function fetchCheckout() {
      try {
        const res = await fetch(`/api/pay/checkout/${checkoutId}`);
        const data = await res.json();
        if (data.error) {
          setError(data.error);
        } else if (data.status === "PAID") {
          setPaid(true);
          setCheckout(data);
        } else {
          setCheckout(data);
        }
      } catch {
        setError("Could not load payment details. Please try again.");
      } finally {
        setLoading(false);
      }
    }
    fetchCheckout();
  }, [checkoutId]);

  // Load SumUp Card Widget
  useEffect(() => {
    if (!checkout || paid || cardMounted) return;

    const script = document.createElement("script");
    script.src = "https://gateway.sumup.com/gateway/ecom/card/v2/sdk.js";
    script.async = true;
    script.onload = () => {
      const SumUpCard = (window as any).SumUpCard;
      if (!SumUpCard) return;

      SumUpCard.mount({
        id: "sumup-card",
        checkoutId: checkoutId,
        onResponse: (type: string, body: any) => {
          if (type === "success") {
            setPaid(true);
          } else if (type === "error") {
            setError("Payment failed. Please try again or use bank transfer.");
          }
        },
      });
      setCardMounted(true);
    };
    document.head.appendChild(script);

    return () => {
      try { document.head.removeChild(script); } catch {}
    };
  }, [checkout, paid, cardMounted, checkoutId]);

  if (loading) {
    return (
      <div style={styles.container}>
        <div style={styles.card}>
          <div style={styles.spinner} />
          <p style={styles.loadingText}>Loading payment...</p>
        </div>
      </div>
    );
  }

  if (error && !checkout) {
    return (
      <div style={styles.container}>
        <div style={styles.card}>
          <div style={styles.errorIcon}>!</div>
          <h2 style={styles.errorTitle}>Payment Error</h2>
          <p style={styles.errorText}>{error}</p>
        </div>
      </div>
    );
  }

  if (paid) {
    return (
      <div style={styles.container}>
        <div style={styles.card}>
          <div style={{ ...styles.successIcon, background: branding.color }}>✓</div>
          <h2 style={styles.successTitle}>Payment Received!</h2>
          <p style={styles.successText}>
            Thank you for your payment of <strong>£{checkout?.amount?.toFixed(2)}</strong> to{" "}
            <strong>{branding.name}</strong>.
          </p>
          <p style={styles.ref}>Ref: {checkout?.checkout_reference}</p>
          <p style={styles.closeText}>You can close this page and return to WhatsApp.</p>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        {/* Header */}
        <div style={{ ...styles.header, background: branding.color }}>
          <h1 style={styles.merchantName}>{branding.name}</h1>
          {branding.tagline && <p style={styles.tagline}>{branding.tagline}</p>}
        </div>

        {/* Amount */}
        <div style={styles.amountSection}>
          <p style={styles.amountLabel}>Amount to pay</p>
          <p style={styles.amount}>
            £{checkout?.amount?.toFixed(2)}
          </p>
          {checkout?.description && (
            <p style={styles.description}>{checkout.description}</p>
          )}
        </div>

        {/* SumUp Card Widget */}
        <div style={styles.widgetSection}>
          <div id="sumup-card" />
        </div>

        {error && <p style={styles.inlineError}>{error}</p>}

        {/* Footer */}
        <div style={styles.footer}>
          <p style={styles.footerText}>
            Secure payment powered by SumUp
          </p>
          <p style={styles.footerText}>
            Payment processed by WorkCrew on behalf of {branding.name}
          </p>
        </div>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#f4f4f7",
    padding: "20px",
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  },
  card: {
    width: "100%",
    maxWidth: "440px",
    background: "#fff",
    borderRadius: "16px",
    overflow: "hidden",
    boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
  },
  header: {
    padding: "28px 24px",
    textAlign: "center" as const,
  },
  merchantName: {
    margin: 0,
    fontSize: "20px",
    fontWeight: 700,
    color: "#fff",
    letterSpacing: "0.5px",
  },
  tagline: {
    margin: "6px 0 0",
    fontSize: "13px",
    color: "rgba(255,255,255,0.8)",
  },
  amountSection: {
    padding: "28px 24px 20px",
    textAlign: "center" as const,
    borderBottom: "1px solid #eee",
  },
  amountLabel: {
    margin: 0,
    fontSize: "13px",
    color: "#666",
    textTransform: "uppercase" as const,
    letterSpacing: "1px",
    fontWeight: 600,
  },
  amount: {
    margin: "8px 0 0",
    fontSize: "42px",
    fontWeight: 800,
    color: "#1a1a1a",
    letterSpacing: "-1px",
  },
  description: {
    margin: "8px 0 0",
    fontSize: "14px",
    color: "#888",
  },
  widgetSection: {
    padding: "24px",
  },
  footer: {
    padding: "16px 24px 20px",
    borderTop: "1px solid #eee",
    textAlign: "center" as const,
  },
  footerText: {
    margin: "4px 0",
    fontSize: "11px",
    color: "#999",
  },
  spinner: {
    width: "40px",
    height: "40px",
    border: "3px solid #eee",
    borderTop: "3px solid #1e3a5f",
    borderRadius: "50%",
    animation: "spin 0.8s linear infinite",
    margin: "40px auto 16px",
  },
  loadingText: {
    textAlign: "center" as const,
    color: "#666",
    fontSize: "15px",
    padding: "0 0 40px",
  },
  errorIcon: {
    width: "48px",
    height: "48px",
    borderRadius: "50%",
    background: "#dc3545",
    color: "#fff",
    fontSize: "28px",
    fontWeight: 700,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "32px auto 16px",
  },
  errorTitle: {
    textAlign: "center" as const,
    margin: "0 0 8px",
    fontSize: "20px",
    color: "#1a1a1a",
  },
  errorText: {
    textAlign: "center" as const,
    color: "#666",
    fontSize: "15px",
    padding: "0 24px 32px",
    margin: 0,
  },
  successIcon: {
    width: "56px",
    height: "56px",
    borderRadius: "50%",
    color: "#fff",
    fontSize: "32px",
    fontWeight: 700,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "32px auto 16px",
  },
  successTitle: {
    textAlign: "center" as const,
    margin: "0 0 8px",
    fontSize: "22px",
    color: "#1a1a1a",
  },
  successText: {
    textAlign: "center" as const,
    color: "#555",
    fontSize: "15px",
    padding: "0 24px",
    margin: 0,
    lineHeight: 1.5,
  },
  ref: {
    textAlign: "center" as const,
    color: "#999",
    fontSize: "12px",
    margin: "12px 0 0",
  },
  closeText: {
    textAlign: "center" as const,
    color: "#888",
    fontSize: "14px",
    padding: "16px 24px 32px",
    margin: 0,
  },
  inlineError: {
    color: "#dc3545",
    fontSize: "14px",
    textAlign: "center" as const,
    padding: "0 24px 16px",
    margin: 0,
  },
};
