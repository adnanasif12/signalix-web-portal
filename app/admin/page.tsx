import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

export default async function DashboardPage() {
  const supabase = createClient();

  const [leads, newLeads, portfolio, services, testimonials] =
    await Promise.all([
      supabase.from("leads").select("*", { count: "exact", head: true }),
      supabase
        .from("leads")
        .select("*", { count: "exact", head: true })
        .eq("status", "new"),
      supabase
        .from("portfolio_projects")
        .select("*", { count: "exact", head: true }),
      supabase.from("services").select("*", { count: "exact", head: true }),
      supabase
        .from("testimonials")
        .select("*", { count: "exact", head: true }),
    ]);

  const { data: recentLeads } = await supabase
    .from("leads")
    .select("id, name, company, service, status, created_at")
    .order("created_at", { ascending: false })
    .limit(5);

  const stats = [
    { label: "Total leads", value: leads.count ?? 0, href: "/admin/leads" },
    { label: "New leads", value: newLeads.count ?? 0, href: "/admin/leads" },
    {
      label: "Portfolio projects",
      value: portfolio.count ?? 0,
      href: "/admin/portfolio",
    },
    {
      label: "Active services",
      value: services.count ?? 0,
      href: "/admin/services",
    },
    {
      label: "Testimonials",
      value: testimonials.count ?? 0,
      href: "/admin/testimonials",
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-semibold text-white">Dashboard</h1>
      <p className="mt-1 text-sm text-slate-400">
        All Signalix website data in one place.
      </p>

      <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-5">
        {stats.map((s) => (
          <Link
            key={s.label}
            href={s.href}
            className="card p-4 transition-colors hover:border-teal-400/40"
          >
            <p className="text-2xl font-semibold text-white">{s.value}</p>
            <p className="mt-1 text-xs text-slate-400">{s.label}</p>
          </Link>
        ))}
      </div>

      <div className="mt-8">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-slate-200">
            Recent quote requests
          </h2>
          <Link
            href="/admin/leads"
            className="text-xs text-teal-400 hover:underline"
          >
            View all →
          </Link>
        </div>

        <div className="card overflow-x-auto">
          {!recentLeads || recentLeads.length === 0 ? (
            <p className="p-6 text-center text-sm text-slate-500">
              No quote requests yet. New requests will appear here.
            </p>
          ) : (
            <table className="w-full min-w-[560px] text-left text-sm">
              <thead className="border-b border-navy-600 text-xs uppercase text-slate-500">
                <tr>
                  <th className="px-4 py-3 font-medium">Name</th>
                  <th className="px-4 py-3 font-medium">Company</th>
                  <th className="px-4 py-3 font-medium">Service</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-navy-700">
                {recentLeads.map((lead) => (
                  <tr key={lead.id}>
                    <td className="px-4 py-3 text-slate-200">{lead.name}</td>
                    <td className="px-4 py-3 text-slate-400">
                      {lead.company || "—"}
                    </td>
                    <td className="px-4 py-3 text-slate-400">
                      {lead.service}
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge status={lead.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    new: "bg-teal-400/10 text-teal-400",
    contacted: "bg-violet-500/10 text-violet-400",
    won: "bg-emerald-500/10 text-emerald-400",
    lost: "bg-slate-500/10 text-slate-400",
  };
  return (
    <span className={`badge ${styles[status] || styles.new}`}>{status}</span>
  );
}
