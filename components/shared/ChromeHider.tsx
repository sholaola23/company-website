"use client";

import { useEffect } from "react";

type ChromeHiderProps = {
  background?: string;
};

export default function ChromeHider({ background }: ChromeHiderProps) {
  useEffect(() => {
    const style = document.createElement("style");
    style.id = "workcrew-chrome-hider";
    style.textContent = `
      header.fixed, footer, #chat-widget-root,
      [aria-label="Open AI assistant chat"] { display: none !important; }
      #main-content { padding-top: 0 !important; }
      ${background ? `html, body { background: ${background} !important; }` : ""}
    `;
    document.head.appendChild(style);

    return () => {
      document.getElementById("workcrew-chrome-hider")?.remove();
    };
  }, [background]);

  return null;
}
