"use client";

import { useState } from "react";
import { Lock, ArrowRight, Loader2 } from "lucide-react";

interface PasswordGateProps {
  slug: string;
  onAuthenticated: () => void;
}

export default function PasswordGate({ slug, onAuthenticated }: PasswordGateProps) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/prospect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password, slug }),
      });

      if (res.ok) {
        onAuthenticated();
      } else {
        setError("Incorrect access code. Please check and try again.");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="flex items-center justify-center mb-8">
          <div className="w-12 h-12 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center">
            <Lock className="w-5 h-5 text-slate-600" />
          </div>
        </div>

        <h1 className="text-xl font-semibold text-slate-900 text-center mb-2">
          Enter access code
        </h1>
        <p className="text-sm text-slate-400 text-center mb-8">
          This page was built specifically for you.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Access code"
              autoFocus
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600/20 transition-all text-sm"
              aria-label="Access code"
              required
            />
          </div>

          {error && (
            <p className="text-sm text-red-400 text-center" role="alert">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading || !password}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl text-sm font-medium transition-all"
            aria-label="Unlock page"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <>
                Unlock
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <p className="text-xs text-slate-600 text-center mt-8">
          WorkCrew Ltd
        </p>
      </div>
    </div>
  );
}
