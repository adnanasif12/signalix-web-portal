"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

type Testimonial = {
  id: string;
  client_name: string;
  client_company: string | null;
  client_country: string | null;
  quote: string;
  rating: number;
  avatar_url: string | null;
  sort_order: number;
  is_published: boolean;
};

const EMPTY: Omit<Testimonial, "id"> = {
  client_name: "",
  client_company: "",
  client_country: "",
  quote: "",
  rating: 5,
  avatar_url: "",
  sort_order: 0,
  is_published: true,
};

export default function TestimonialsPage() {
  const supabase = createClient();
  const [items, setItems] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Testimonial | null>(null);
  const [form, setForm] = useState<Omit<Testimonial, "id">>(EMPTY);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    setLoading(true);
    const { data } = await supabase
      .from("testimonials")
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

  function openEdit(item: Testimonial) {
    setEditing(item);
    setForm(item);
    setShowForm(true);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    if (editing) {
      await supabase.from("testimonials").update(form).eq("id", editing.id);
    } else {
      await supabase.from("testimonials").insert(form);
    }
    setSaving(false);
    setShowForm(false);
    load();
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this testimonial? This action cannot be undone.")) return;
    await supabase.from("testimonials").delete().eq("id", id);
    load();
  }

  async function togglePublish(item: Testimonial) {
    setItems((prev) =>
      prev.map((t) =>
        t.id === item.id ? { ...t, is_published: !t.is_published } : t
      )
    );
    await supabase
      .from("testimonials")
      .update({ is_published: !item.is_published })
      .eq("id", item.id);
  }

  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-white">Testimonials</h1>
          <p className="mt-1 text-sm text-slate-400">
            Add and edit client reviews here.
          </p>
        </div>
        <button onClick={openNew} className="btn-primary">
          + Add testimonial
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSave} className="card mt-5 space-y-4 p-5">
          <h2 className="text-sm font-semibold text-slate-200">
            {editing ? "Edit testimonial" : "New testimonial"}
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div>
              <label className="label-text">Client name</label>
              <input
                type="text"
                required
                value={form.client_name}
                onChange={(e) =>
                  setForm({ ...form, client_name: e.target.value })
                }
                className="input-field"
              />
            </div>
            <div>
              <label className="label-text">Company</label>
              <input
                type="text"
                value={form.client_company || ""}
                onChange={(e) =>
                  setForm({ ...form, client_company: e.target.value })
                }
                className="input-field"
              />
            </div>
            <div>
              <label className="label-text">Country</label>
              <input
                type="text"
                value={form.client_country || ""}
                onChange={(e) =>
                  setForm({ ...form, client_country: e.target.value })
                }
                className="input-field"
              />
            </div>
          </div>
          <div>
            <label className="label-text">Quote</label>
            <textarea
              required
              value={form.quote}
              onChange={(e) => setForm({ ...form, quote: e.target.value })}
              className="input-field"
              rows={3}
            />
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="label-text">Rating (1–5)</label>
              <input
                type="number"
                min={1}
                max={5}
                value={form.rating}
                onChange={(e) =>
                  setForm({ ...form, rating: Number(e.target.value) })
                }
                className="input-field"
              />
            </div>
            <div>
              <label className="label-text">Avatar URL (optional)</label>
              <input
                type="text"
                value={form.avatar_url || ""}
                onChange={(e) =>
                  setForm({ ...form, avatar_url: e.target.value })
                }
                className="input-field"
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button type="submit" disabled={saving} className="btn-primary">
              {saving ? "Saving..." : "Save testimonial"}
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
            No testimonials have been added yet.
          </p>
        ) : (
          items.map((item) => (
            <div key={item.id} className="card p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-medium text-white">
                    {item.client_name}
                  </p>
                  <p className="text-xs text-slate-500">
                    {item.client_company}{" "}
                    {item.client_country && `· ${item.client_country}`}
                  </p>
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
              <p className="mt-2 text-sm italic text-slate-400">
                "{item.quote}"
              </p>
              <p className="mt-1 text-xs text-yellow-400">
                {"★".repeat(item.rating)}
                {"☆".repeat(5 - item.rating)}
              </p>
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
