"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

/**
 * Portal login page — email + password auth via Supabase.
 * After login, redirects to the user's org dashboard via slug.
 */
export default function PortalLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const supabase = createClient();

      const { error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) {
        setError(authError.message);
        setLoading(false);
        return;
      }

      // Get user's profile to find their org slug
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setError("Login failed. Please try again.");
        setLoading(false);
        return;
      }

      const { data: profile } = await supabase
        .from("profiles")
        .select("organisation_id, role")
        .eq("id", user.id)
        .single();

      if (!profile) {
        setError("No account found. Contact your administrator.");
        setLoading(false);
        return;
      }

      // Admin users go to admin panel
      if (profile.role === "admin") {
        router.push("/admin/leads");
        return;
      }

      // Client users go to their org dashboard
      const { data: org } = await supabase
        .from("organisations")
        .select("slug")
        .eq("id", profile.organisation_id)
        .single();

      if (!org) {
        setError("Organisation not found. Contact support.");
        setLoading(false);
        return;
      }

      router.push(`/portal/${org.slug}`);
    } catch {
      setError("An unexpected error occurred.");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[var(--color-bg-alt)] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo / Brand */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-[var(--color-primary)] text-[var(--color-bg)] font-bold text-xl mb-4">
            L4U
          </div>
          <h1 className="text-2xl font-bold text-[var(--color-heading)]">Client Portal</h1>
          <p className="text-[var(--color-muted)] mt-1">
            Sign in to view your leads and reports
          </p>
        </div>

        {/* Login Form */}
        <form
          onSubmit={handleLogin}
          className="bg-[var(--color-bg)] rounded-2xl shadow-sm border border-[var(--color-border)] p-8 space-y-5"
        >
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-[var(--color-body)] mb-1.5"
            >
              Email address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              className="w-full px-4 py-2.5 border border-[var(--color-border-strong)] rounded-lg text-[var(--color-heading)] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition"
              placeholder="you@company.com"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-[var(--color-body)] mb-1.5"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              className="w-full px-4 py-2.5 border border-[var(--color-border-strong)] rounded-lg text-[var(--color-heading)] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-[var(--color-bg)] font-semibold py-2.5 px-4 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <p className="text-center text-sm text-[var(--color-muted)] mt-6">
          Powered by{" "}
          <a
            href="https://workcrew.io"
            className="text-[var(--color-primary)] hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            WorkCrew
          </a>
        </p>
      </div>
    </div>
  );
}
