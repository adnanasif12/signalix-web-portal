"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

type Lead = {
  id: string;
  created_at: string;
  name: string;
  company: string | null;
  country: string | null;
  contact: string;
  service: string;
  budget: string | null;
  message: string | null;
  status: string;
};

const STATUS_OPTIONS = ["new", "contacted", "won", "lost"];

export default function LeadsPage() {
  const supabase = createClient();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    loadLeads();
  }, []);

  async function loadLeads() {
    setLoading(true);
    const { data } = await supabase
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false });
    setLeads(data || []);
    setLoading(false);
  }

  async function updateStatus(id: string, status: string) {
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, status } : l)));
    await supabase.from("leads").update({ status }).eq("id", id);
  }

  async function deleteLead(id: string) {
    if (!confirm("এই lead টা মুছে ফেলতে চাও? এটা ফিরে আনা যাবে না।")) return;
    setLeads((prev) => prev.filter((l) => l.id !== id));
    await supabase.from("leads").delete().eq("id", id);
  }

  const filteredLeads =
    filter === "all" ? leads : leads.filter((l) => l.status === filter);

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-white">Leads</h1>
          <p className="mt-1 text-sm text-slate-400">
            Website-এর Get a Quote form থেকে আসা সব request।
          </p>
        </div>
      </div>

      <div className="mt-5 flex gap-2">
        {["all", ...STATUS_OPTIONS].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`rounded-lg px-3 py-1.5 text-xs font-medium capitalize transition-colors ${
              filter === f
                ? "bg-teal-400/15 text-teal-400"
                : "text-slate-400 hover:bg-navy-800"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="card mt-4 overflow-hidden">
        {loading ? (
          <p className="p-6 text-center text-sm text-slate-500">Loading...</p>
        ) : filteredLeads.length === 0 ? (
          <p className="p-6 text-center text-sm text-slate-500">
            কোনো lead পাওয়া যায়নি।
          </p>
        ) : (
          <div className="divide-y divide-navy-700">
            {filteredLeads.map((lead) => (
              <div key={lead.id}>
                <button
                  onClick={() =>
                    setExpandedId(expandedId === lead.id ? null : lead.id)
                  }
                  className="flex w-full items-center justify-between gap-4 px-4 py-3 text-left hover:bg-navy-800/40"
                >
                  <div className="flex min-w-0 flex-1 items-center gap-4">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-slate-100">
                        {lead.name}{" "}
                        {lead.company && (
                          <span className="text-slate-500">
                            · {lead.company}
                          </span>
                        )}
                      </p>
                      <p className="truncate text-xs text-slate-500">
                        {lead.service} ·{" "}
                        {new Date(lead.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <select
                    value={lead.status}
                    onClick={(e) => e.stopPropagation()}
                    onChange={(e) => updateStatus(lead.id, e.target.value)}
                    className="input-field w-auto py-1 text-xs capitalize"
                  >
                    {STATUS_OPTIONS.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </button>

                {expandedId === lead.id && (
                  <div className="grid grid-cols-2 gap-4 border-t border-navy-700 bg-navy-900/40 px-4 py-4 text-sm md:grid-cols-4">
                    <Field label="Contact" value={lead.contact} />
                    <Field label="Country" value={lead.country || "—"} />
                    <Field label="Budget" value={lead.budget || "—"} />
                    <Field label="Service" value={lead.service} />
                    <div className="col-span-2 md:col-span-4">
                      <p className="label-text">Message</p>
                      <p className="text-slate-300">
                        {lead.message || "কোনো message দেওয়া হয়নি।"}
                      </p>
                    </div>
                    <div className="col-span-2 md:col-span-4 flex justify-end">
                      <button
                        onClick={() => deleteLead(lead.id)}
                        className="btn-danger"
                      >
                        Delete lead
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="label-text">{label}</p>
      <p className="text-slate-300">{value}</p>
    </div>
  );
}
