"use client";

import { useEffect } from "react";

/**
 * Portal layout — hides the main site chrome (header, footer, chat widget)
 * so the portal feels like its own product.
 */
export default function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const style = document.createElement("style");
    style.id = "portal-dashboard-overrides";
    style.textContent = `
      header.fixed, footer, #chat-widget-root,
      [aria-label="Open AI assistant chat"] { display: none !important; }
      #main-content { padding-top: 0 !important; }
    `;
    document.head.appendChild(style);

    return () => {
      document.getElementById("portal-dashboard-overrides")?.remove();
    };
  }, []);

  return <>{children}</>;
}
