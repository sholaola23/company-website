"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import type { Organisation, Profile } from "@/lib/supabase/types";

/**
 * Portal sidebar shell — provides navigation and branding for client portal.
 * Dark sidebar, light content area, mobile-responsive.
 */
export default function PortalShell({
  org,
  profile,
  slug,
  children,
}: {
  org: Organisation;
  profile: Profile;
  slug: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const navItems = [
    {
      label: "Dashboard",
      href: `/portal/${slug}`,
      icon: DashboardIcon,
      active: pathname === `/portal/${slug}`,
    },
    {
      label: "All Leads",
      href: `/portal/${slug}/leads`,
      icon: LeadsIcon,
      active: pathname === `/portal/${slug}/leads`,
    },
  ];

  async function handleSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/portal/login");
  }

  return (
    <div className="min-h-screen bg-[var(--color-bg-alt)] flex">
      {/* Sidebar — hidden on mobile, visible on lg+ */}
      <aside className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0 bg-[var(--color-dark)] text-[var(--color-bg)]">
        {/* Org branding */}
        <div className="flex items-center gap-3 px-6 py-5 border-b border-[var(--color-dark-border)]">
          {org.logo_url ? (
            <img
              src={org.logo_url}
              alt={org.name}
              className="w-9 h-9 rounded-lg object-cover"
            />
          ) : (
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center font-bold text-sm text-[var(--color-bg)]"
              style={{ backgroundColor: org.brand_color }}
            >
              {org.name.charAt(0)}
            </div>
          )}
          <div className="min-w-0">
            <p className="text-sm font-semibold truncate">{org.name}</p>
            <p className="text-xs text-[var(--color-muted)] truncate">{org.industry}</p>
          </div>
        </div>

        {/* Nav links */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition ${
                item.active
                  ? "bg-[var(--color-dark-surface)] text-[var(--color-bg)]"
                  : "text-[var(--color-muted)] hover:bg-[var(--color-dark-surface)] hover:text-[var(--color-bg)]"
              }`}
            >
              <item.icon active={item.active} brandColor={org.brand_color} />
              {item.label}
            </Link>
          ))}
        </nav>

        {/* User + sign out */}
        <div className="px-4 py-4 border-t border-[var(--color-dark-border)]">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-xs font-medium">
              {profile.full_name.charAt(0)}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium truncate">
                {profile.full_name}
              </p>
              <p className="text-xs text-[var(--color-muted)] truncate">{profile.email}</p>
            </div>
          </div>
          <button
            onClick={handleSignOut}
            className="w-full text-left text-sm text-[var(--color-muted)] hover:text-[var(--color-bg)] px-3 py-2 rounded-lg hover:bg-[var(--color-dark-surface)] transition"
          >
            Sign out
          </button>
        </div>
      </aside>

      {/* Mobile header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-[var(--color-dark)] text-[var(--color-bg)] px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs"
            style={{ backgroundColor: org.brand_color }}
          >
            {org.name.charAt(0)}
          </div>
          <span className="font-semibold text-sm">{org.name}</span>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href={`/portal/${slug}`}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium ${
              pathname === `/portal/${slug}`
                ? "bg-[var(--color-dark-surface)] text-[var(--color-bg)]"
                : "text-[var(--color-muted)]"
            }`}
          >
            Dashboard
          </Link>
          <Link
            href={`/portal/${slug}/leads`}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium ${
              pathname.includes("/leads")
                ? "bg-[var(--color-dark-surface)] text-[var(--color-bg)]"
                : "text-[var(--color-muted)]"
            }`}
          >
            Leads
          </Link>
          <button
            onClick={handleSignOut}
            className="text-xs text-[var(--color-muted)] px-2 py-1.5"
          >
            Sign out
          </button>
        </div>
      </div>

      {/* Main content */}
      <main className="flex-1 lg:pl-64">
        <div className="p-6 lg:p-10 pt-16 lg:pt-10 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}

// Simple SVG icons
function DashboardIcon({ active, brandColor }: { active: boolean; brandColor: string }) {
  return (
    <svg
      className="w-5 h-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke={active ? brandColor : "currentColor"}
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
      />
    </svg>
  );
}

function LeadsIcon({ active, brandColor }: { active: boolean; brandColor: string }) {
  return (
    <svg
      className="w-5 h-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke={active ? brandColor : "currentColor"}
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
      />
    </svg>
  );
}
