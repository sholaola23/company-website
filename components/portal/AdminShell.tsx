"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import type { Profile } from "@/lib/supabase/types";

/**
 * Admin sidebar shell — navigation for the agency owner admin panel.
 */
export default function AdminShell({
  profile,
  children,
}: {
  profile: Profile;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const navItems = [
    {
      label: "All Leads",
      href: "/admin/leads",
      active: pathname === "/admin/leads",
    },
    {
      label: "Clients",
      href: "/admin/leads/clients",
      active: pathname === "/admin/leads/clients",
    },
  ];

  async function handleSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/portal/login");
  }

  return (
    <div className="min-h-screen bg-[var(--color-bg-alt)] flex">
      {/* Sidebar */}
      <aside className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0 bg-[var(--color-dark)] text-[var(--color-bg)]">
        <div className="px-6 py-5 border-b border-[var(--color-dark-border)]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[var(--color-primary)] flex items-center justify-center font-bold text-sm">
              L4U
            </div>
            <div>
              <p className="text-sm font-semibold">Admin Panel</p>
              <p className="text-xs text-[var(--color-muted)]">Leads4U</p>
            </div>
          </div>
        </div>

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
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="px-4 py-4 border-t border-[var(--color-dark-border)]">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-full bg-[var(--color-primary)] flex items-center justify-center text-xs font-medium">
              {profile.full_name.charAt(0)}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium truncate">{profile.full_name}</p>
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
        <span className="font-semibold text-sm">Leads4U Admin</span>
        <div className="flex items-center gap-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium ${
                item.active
                  ? "bg-[var(--color-dark-surface)] text-[var(--color-bg)]"
                  : "text-[var(--color-muted)]"
              }`}
            >
              {item.label}
            </Link>
          ))}
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
