import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "AI Automation Cost",
  description:
    "AI automation scope depends on your workflow, tools, channels, volume, and handoff rules. Start with the free WorkCrew AI audit.",
  robots: {
    index: false,
    follow: true,
  },
  alternates: {
    canonical: "/audit",
  },
};

export default function BlogPost() {
  redirect("/audit");
}
