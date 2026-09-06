"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

const NAV_ITEMS = [
  { href: "/admin", label: "Dashboard", icon: "▦" },
  { href: "/admin/leads", label: "Leads", icon: "✉" },
  { href: "/admin/portfolio", label: "Portfolio", icon: "▣" },
  { href: "/admin/services", label: "Services", icon: "◈" },
  { href: "/admin/testimonials", label: "Testimonials", icon: "❝" },
];

export default function Sidebar({ email }: { email?: string }) {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <aside className="flex h-screen w-60 flex-col border-r border-navy-700 bg-navy-900/80 px-3 py-5">
      <div className="mb-8 flex items-center gap-2 px-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-signal-gradient text-sm font-bold text-white">
          S
        </div>
        <span className="text-sm font-semibold text-white">Signalix Admin</span>
      </div>

      <nav className="flex-1 space-y-1">
        {NAV_ITEMS.map((item) => {
          const active =
            item.href === "/admin"
              ? pathname === "/admin"
              : pathname?.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                active
                  ? "bg-navy-700 text-white"
                  : "text-slate-400 hover:bg-navy-800 hover:text-slate-200"
              }`}
            >
              <span className="w-4 text-center text-teal-400">{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-navy-700 pt-3">
        {email && (
          <p className="mb-2 truncate px-2 text-xs text-slate-500">{email}</p>
        )}
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-slate-400 transition-colors hover:bg-navy-800 hover:text-red-300"
        >
          <span className="w-4 text-center">⏻</span>
          Log out
        </button>
      </div>
    </aside>
  );
}
