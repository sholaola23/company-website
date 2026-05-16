import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import type { Metadata } from "next";
import type { Profile } from "@/lib/supabase/types";
import AdminShell from "@/components/portal/AdminShell";

export const metadata: Metadata = {
  title: "Admin Leads",
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
 * Admin layout — checks that the user has admin role.
 * Provides the admin sidebar navigation.
 */
export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/portal/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single<Profile>();

  if (!profile || profile.role !== "admin") {
    redirect("/portal/login");
  }

  return <AdminShell profile={profile}>{children}</AdminShell>;
}
