import type { Metadata } from "next";
import ChromeHider from "@/components/shared/ChromeHider";

export const metadata: Metadata = {
  title: "Client Portal",
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

/**
 * Portal layout — hides the main site chrome (header, footer, chat widget)
 * so the portal feels like its own product.
 */
export default function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ChromeHider />
      {children}
    </>
  );
}
