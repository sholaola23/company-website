"use client";

import { useEffect } from "react";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // Inject CSS to hide site chrome — works even for lazy-loaded elements
    const style = document.createElement("style");
    style.id = "client-dashboard-overrides";
    style.textContent = `
      header.fixed, footer, #chat-widget-root,
      [aria-label="Open AI assistant chat"] { display: none !important; }
      #main-content { padding-top: 0 !important; }
    `;
    document.head.appendChild(style);

    return () => {
      document.getElementById("client-dashboard-overrides")?.remove();
    };
  }, []);

  return <>{children}</>;
}
