"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { trackPageVisit } from "@/lib/visitor-tracking";

export default function PageTracker() {
  const pathname = usePathname();

  useEffect(() => {
    trackPageVisit(pathname);
  }, [pathname]);

  return null;
}
