"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError("Email অথবা password সঠিক না। আবার চেষ্টা করো।");
      setLoading(false);
      return;
    }

    router.refresh();
    router.push("/admin");
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
          Admin account Supabase Dashboard থেকে তৈরি করা হয় — নিচের README দেখো।
        </p>
      </div>
    </div>
  );
}
