"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

type Project = {
  id: string;
  industry: string;
  project_name: string;
  market: string | null;
  service_provided: string | null;
  result_summary: string | null;
  project_url: string | null;
  image_url: string | null;
  sort_order: number;
  is_published: boolean;
};

const EMPTY: Omit<Project, "id"> = {
  industry: "",
  project_name: "",
  market: "",
  service_provided: "",
  result_summary: "",
  project_url: "",
  image_url: "",
  sort_order: 0,
  is_published: true,
};

export default function PortfolioPage() {
  const supabase = createClient();
  const [items, setItems] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Project | null>(null);
  const [form, setForm] = useState<Omit<Project, "id">>(EMPTY);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    setLoading(true);
    const { data } = await supabase
      .from("portfolio_projects")
      .select("*")
      .order("sort_order", { ascending: true });
    setItems(data || []);
    setLoading(false);
  }

  function openNew() {
    setEditing(null);
    setForm(EMPTY);
    setShowForm(true);
  }

  function openEdit(item: Project) {
    setEditing(item);
    setForm(item);
    setShowForm(true);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    if (editing) {
      await supabase
        .from("portfolio_projects")
        .update(form)
        .eq("id", editing.id);
    } else {
      await supabase.from("portfolio_projects").insert(form);
    }
    setSaving(false);
    setShowForm(false);
    load();
  }

  async function handleDelete(id: string) {
    if (!confirm("এই project টা মুছে ফেলতে চাও?")) return;
    await supabase.from("portfolio_projects").delete().eq("id", id);
    load();
  }

  async function togglePublish(item: Project) {
    setItems((prev) =>
      prev.map((p) =>
        p.id === item.id ? { ...p, is_published: !p.is_published } : p
      )
    );
    await supabase
      .from("portfolio_projects")
      .update({ is_published: !item.is_published })
      .eq("id", item.id);
  }

  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-white">Portfolio</h1>
          <p className="mt-1 text-sm text-slate-400">
            "Selected Work" section-এর project card গুলো এখান থেকে manage করো।
          </p>
        </div>
        <button onClick={openNew} className="btn-primary">
          + Add project
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSave} className="card mt-5 space-y-4 p-5">
          <h2 className="text-sm font-semibold text-slate-200">
            {editing ? "Edit project" : "New project"}
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <TextInput
              label="Industry"
              value={form.industry}
              onChange={(v) => setForm({ ...form, industry: v })}
              required
            />
            <TextInput
              label="Project name"
              value={form.project_name}
              onChange={(v) => setForm({ ...form, project_name: v })}
              required
            />
            <TextInput
              label="Market / Country"
              value={form.market || ""}
              onChange={(v) => setForm({ ...form, market: v })}
            />
            <TextInput
              label="Service provided"
              value={form.service_provided || ""}
              onChange={(v) => setForm({ ...form, service_provided: v })}
            />
            <TextInput
              label="Project URL"
              value={form.project_url || ""}
              onChange={(v) => setForm({ ...form, project_url: v })}
            />
            <TextInput
              label="Image URL"
              value={form.image_url || ""}
              onChange={(v) => setForm({ ...form, image_url: v })}
            />
          </div>
          <div>
            <label className="label-text">Result summary</label>
            <textarea
              value={form.result_summary || ""}
              onChange={(e) =>
                setForm({ ...form, result_summary: e.target.value })
              }
              className="input-field"
              rows={2}
              placeholder="e.g. Online bookings grew 3x in 2 months"
            />
          </div>
          <div className="flex items-center gap-2">
            <button type="submit" disabled={saving} className="btn-primary">
              {saving ? "Saving..." : "Save project"}
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="btn-secondary"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
        {loading ? (
          <p className="text-sm text-slate-500">Loading...</p>
        ) : items.length === 0 ? (
          <p className="text-sm text-slate-500">
            এখনো কোনো project add করা হয়নি।
          </p>
        ) : (
          items.map((item) => (
            <div key={item.id} className="card p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs uppercase tracking-wide text-teal-400">
                    {item.industry}
                  </p>
                  <h3 className="mt-1 font-medium text-white">
                    {item.project_name}
                  </h3>
                  <p className="mt-1 text-xs text-slate-500">
                    {item.market} {item.service_provided && `· ${item.service_provided}`}
                  </p>
                  {item.result_summary && (
                    <p className="mt-2 text-sm text-slate-400">
                      {item.result_summary}
                    </p>
                  )}
                </div>
                <span
                  className={`badge shrink-0 ${
                    item.is_published
                      ? "bg-emerald-500/10 text-emerald-400"
                      : "bg-slate-500/10 text-slate-400"
                  }`}
                >
                  {item.is_published ? "Live" : "Hidden"}
                </span>
              </div>
              <div className="mt-3 flex gap-2">
                <button
                  onClick={() => openEdit(item)}
                  className="btn-secondary flex-1 py-1.5 text-xs"
                >
                  Edit
                </button>
                <button
                  onClick={() => togglePublish(item)}
                  className="btn-secondary flex-1 py-1.5 text-xs"
                >
                  {item.is_published ? "Hide" : "Publish"}
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="btn-danger py-1.5 text-xs"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function TextInput({
  label,
  value,
  onChange,
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
}) {
  return (
    <div>
      <label className="label-text">{label}</label>
      <input
        type="text"
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="input-field"
      />
    </div>
  );
}
