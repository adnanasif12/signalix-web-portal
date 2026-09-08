"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

type Service = {
  id: string;
  step_label: string | null;
  title: string;
  description: string | null;
  bullet_points: string[] | null;
  is_starter_offer: boolean;
  sort_order: number;
  is_published: boolean;
};

const EMPTY: Omit<Service, "id"> = {
  step_label: "",
  title: "",
  description: "",
  bullet_points: [],
  is_starter_offer: false,
  sort_order: 0,
  is_published: true,
};

export default function ServicesPage() {
  const supabase = createClient();
  const [items, setItems] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Service | null>(null);
  const [form, setForm] = useState<Omit<Service, "id">>(EMPTY);
  const [bulletsText, setBulletsText] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    setLoading(true);
    const { data } = await supabase
      .from("services")
      .select("*")
      .order("sort_order", { ascending: true });
    setItems(data || []);
    setLoading(false);
  }

  function openNew() {
    setEditing(null);
    setForm(EMPTY);
    setBulletsText("");
    setShowForm(true);
  }

  function openEdit(item: Service) {
    setEditing(item);
    setForm(item);
    setBulletsText((item.bullet_points || []).join("\n"));
    setShowForm(true);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const payload = {
      ...form,
      bullet_points: bulletsText
        .split("\n")
        .map((b) => b.trim())
        .filter(Boolean),
    };
    if (editing) {
      await supabase.from("services").update(payload).eq("id", editing.id);
    } else {
      await supabase.from("services").insert(payload);
    }
    setSaving(false);
    setShowForm(false);
    load();
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this service? This action cannot be undone.")) return;
    await supabase.from("services").delete().eq("id", id);
    load();
  }

  async function togglePublish(item: Service) {
    setItems((prev) =>
      prev.map((s) =>
        s.id === item.id ? { ...s, is_published: !s.is_published } : s
      )
    );
    await supabase
      .from("services")
      .update({ is_published: !item.is_published })
      .eq("id", item.id);
  }

  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-white">Services</h1>
          <p className="mt-1 text-sm text-slate-400">
            Manage the cards in the homepage's "Eight ways we help" section.
          </p>
        </div>
        <button onClick={openNew} className="btn-primary">
          + Add service
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSave} className="card mt-5 space-y-4 p-5">
          <h2 className="text-sm font-semibold text-slate-200">
            {editing ? "Edit service" : "New service"}
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="label-text">Step label</label>
              <input
                type="text"
                value={form.step_label || ""}
                onChange={(e) =>
                  setForm({ ...form, step_label: e.target.value })
                }
                className="input-field"
                placeholder="e.g. 01 / Build"
              />
            </div>
            <div>
              <label className="label-text">Title</label>
              <input
                type="text"
                required
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="input-field"
              />
            </div>
          </div>
          <div>
            <label className="label-text">Description</label>
            <textarea
              value={form.description || ""}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              className="input-field"
              rows={2}
            />
          </div>
          <div>
            <label className="label-text">
              Bullet points (one per line)
            </label>
            <textarea
              value={bulletsText}
              onChange={(e) => setBulletsText(e.target.value)}
              className="input-field"
              rows={3}
              placeholder={"Starting from 5 pages\nMobile-first & responsive design\nSEO-ready structure"}
            />
          </div>
          <label className="flex items-center gap-2 text-sm text-slate-300">
            <input
              type="checkbox"
              checked={form.is_starter_offer}
              onChange={(e) =>
                setForm({ ...form, is_starter_offer: e.target.checked })
              }
              className="rounded border-navy-600 bg-navy-900"
            />
            Is this a "Special Starter Package" offer card?
          </label>
          <div className="flex items-center gap-2">
            <button type="submit" disabled={saving} className="btn-primary">
              {saving ? "Saving..." : "Save service"}
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

      <div className="mt-5 space-y-3">
        {loading ? (
          <p className="text-sm text-slate-500">Loading...</p>
        ) : (
          items.map((item) => (
            <div key={item.id} className="card flex flex-col items-stretch gap-4 p-4 sm:flex-row sm:items-start">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  {item.step_label && (
                    <span className="text-xs text-teal-400">
                      {item.step_label}
                    </span>
                  )}
                  {item.is_starter_offer && (
                    <span className="badge bg-pink-500/10 text-pink-400">
                      Starter offer
                    </span>
                  )}
                  <span
                    className={`badge ${
                      item.is_published
                        ? "bg-emerald-500/10 text-emerald-400"
                        : "bg-slate-500/10 text-slate-400"
                    }`}
                  >
                    {item.is_published ? "Live" : "Hidden"}
                  </span>
                </div>
                <h3 className="mt-1 font-medium text-white">{item.title}</h3>
                <p className="mt-1 text-sm text-slate-400">
                  {item.description}
                </p>
                {item.bullet_points && item.bullet_points.length > 0 && (
                  <ul className="mt-2 space-y-0.5 text-xs text-slate-500">
                    {item.bullet_points.map((b, i) => (
                      <li key={i}>• {b}</li>
                    ))}
                  </ul>
                )}
              </div>
              <div className="flex shrink-0 flex-row gap-2 sm:flex-col">
                <button
                  onClick={() => openEdit(item)}
                  className="btn-secondary py-1.5 text-xs"
                >
                  Edit
                </button>
                <button
                  onClick={() => togglePublish(item)}
                  className="btn-secondary py-1.5 text-xs"
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
