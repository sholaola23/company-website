import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import type { Organisation, Profile } from "@/lib/supabase/types";
import PortalShell from "@/components/portal/PortalShell";

/**
 * Org-scoped portal layout.
 * - Verifies auth session
 * - Loads the org by slug
 * - Verifies user belongs to this org (or is admin)
 * - Renders the sidebar shell with branding
 */
export default async function OrgPortalLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const supabase = await createClient();

  // Check auth
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/portal/login");
  }

  // Get user profile
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single<Profile>();

  if (!profile) {
    redirect("/portal/login");
  }

  // Get the org by slug
  const { data: org } = await supabase
    .from("organisations")
    .select("*")
    .eq("slug", slug)
    .single<Organisation>();

  if (!org) {
    redirect("/portal/login");
  }

  // Non-admin users can only access their own org
  if (profile.role !== "admin" && profile.organisation_id !== org.id) {
    redirect("/portal/login");
  }

  return (
    <PortalShell org={org} profile={profile} slug={slug}>
      {children}
    </PortalShell>
  );
}
