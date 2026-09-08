"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const router = useRouter();
  const supabase =
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
      ? createClient()
      : null;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!supabase) {
      setError("Supabase environment variables are not configured on Vercel.");
      setLoading(false);
      return;
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message || "Unable to sign in. Please try again.");
      setLoading(false);
      return;
    }

    if (!data.session) {
      setError("Sign-in did not create a session. Please try again.");
      setLoading(false);
      return;
    }

    router.refresh();
    router.replace("/admin");
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-signal-gradient text-xl font-bold text-white">
            S
          </div>
          <h1 className="text-xl font-semibold text-white">Signalix Admin</h1>
          <p className="mt-1 text-sm text-slate-400">Sign in to manage your site</p>
        </div>

        <form onSubmit={handleLogin} className="card space-y-4 p-6">
          {!supabase && (
            <p className="rounded-lg bg-red-950/40 px-3 py-2 text-sm text-red-300">
              Admin login is not configured yet. Add the Supabase variables in
              Vercel Project Settings, then redeploy.
            </p>
          )}
          <div>
            <label className="label-text">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-field"
              placeholder="you@signalix.agency"
            />
          </div>
          <div>
            <label className="label-text">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <p className="rounded-lg bg-red-950/40 px-3 py-2 text-sm text-red-300">
              {error}
            </p>
          )}

          <button type="submit" disabled={loading} className="btn-primary w-full">
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-slate-500">
          Create the admin account in the Supabase Dashboard. See the README for details.
        </p>
      </div>
    </div>
  );
}
