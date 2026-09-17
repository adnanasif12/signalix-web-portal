"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

type Transaction = {
  id: string;
  created_at: string;
  transaction_date: string;
  type: "income" | "expense";
  category: string;
  amount: number;
  description: string | null;
};

type FormState = {
  transaction_date: string;
  type: "income" | "expense";
  category: string;
  amount: string;
  description: string;
};

const EMPTY_FORM: FormState = {
  transaction_date: new Date().toISOString().slice(0, 10),
  type: "income",
  category: "Project payment",
  amount: "",
  description: "",
};

const INCOME_CATEGORIES = ["Project payment", "Other income"];
const EXPENSE_CATEGORIES = [
  "Salary",
  "Service provider",
  "Software / tools",
  "Marketing",
  "Office / operations",
  "Other expense",
];

export default function FinancePage() {
  const supabase = createClient();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    loadTransactions();
  }, []);

  async function loadTransactions() {
    setLoading(true);
    setError("");
    const { data, error: queryError } = await supabase
      .from("finance_transactions")
      .select("*")
      .order("transaction_date", { ascending: false })
      .order("created_at", { ascending: false });

    if (queryError) {
      setError(queryError.message);
    }
    setTransactions((data as Transaction[]) || []);
    setLoading(false);
  }

  async function handleSave(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const amount = Number(form.amount);
    if (!Number.isFinite(amount) || amount <= 0) {
      setError("Enter an amount greater than zero.");
      return;
    }

    setSaving(true);
    setError("");
    const { error: insertError } = await supabase
      .from("finance_transactions")
      .insert({
        transaction_date: form.transaction_date,
        type: form.type,
        category: form.category,
        amount,
        description: form.description.trim() || null,
      });

    if (insertError) {
      setError(insertError.message);
    } else {
      setForm({ ...EMPTY_FORM, transaction_date: form.transaction_date });
      setShowForm(false);
      await loadTransactions();
    }
    setSaving(false);
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this transaction? This action cannot be undone.")) return;
    const { error: deleteError } = await supabase
      .from("finance_transactions")
      .delete()
      .eq("id", id);
    if (deleteError) {
      setError(deleteError.message);
      return;
    }
    setTransactions((current) => current.filter((item) => item.id !== id));
  }

  const income = transactions
    .filter((item) => item.type === "income")
    .reduce((total, item) => total + Number(item.amount), 0);
  const expenses = transactions
    .filter((item) => item.type === "expense")
    .reduce((total, item) => total + Number(item.amount), 0);
  const balance = income - expenses;
  const categories = form.type === "income" ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;

  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-white">Finance</h1>
          <p className="mt-1 text-sm text-slate-400">
            Track project income, salaries, service payments, and business expenses.
          </p>
        </div>
        <button onClick={() => setShowForm((current) => !current)} className="btn-primary">
          {showForm ? "Close form" : "+ Add transaction"}
        </button>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <SummaryCard label="Wallet balance" value={balance} tone="text-teal-400" />
        <SummaryCard label="Total income" value={income} tone="text-emerald-400" />
        <SummaryCard label="Total expenses" value={expenses} tone="text-pink-400" />
      </div>

      {showForm && (
        <form onSubmit={handleSave} className="card mt-5 space-y-4 p-5">
          <h2 className="text-sm font-semibold text-slate-200">Add wallet transaction</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <label className="label-text">Transaction type</label>
              <select
                value={form.type}
                onChange={(event) =>
                  setForm({
                    ...form,
                    type: event.target.value as FormState["type"],
                    category:
                      event.target.value === "income"
                        ? INCOME_CATEGORIES[0]
                        : EXPENSE_CATEGORIES[0],
                  })
                }
                className="input-field"
              >
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>
            </div>
            <div>
              <label className="label-text">Category</label>
              <select
                value={form.category}
                onChange={(event) => setForm({ ...form, category: event.target.value })}
                className="input-field"
              >
                {categories.map((category) => (
                  <option key={category}>{category}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="label-text">Amount (USD)</label>
              <input
                required
                min="0.01"
                step="0.01"
                type="number"
                value={form.amount}
                onChange={(event) => setForm({ ...form, amount: event.target.value })}
                className="input-field"
                placeholder="0.00"
              />
            </div>
            <div>
              <label className="label-text">Date</label>
              <input
                required
                type="date"
                value={form.transaction_date}
                onChange={(event) =>
                  setForm({ ...form, transaction_date: event.target.value })
                }
                className="input-field"
              />
            </div>
          </div>
          <div>
            <label className="label-text">Note</label>
            <input
              type="text"
              value={form.description}
              onChange={(event) => setForm({ ...form, description: event.target.value })}
              className="input-field"
              placeholder="e.g. Website project payment or March salary"
            />
          </div>
          <button type="submit" disabled={saving} className="btn-primary">
            {saving ? "Saving..." : "Save transaction"}
          </button>
        </form>
      )}

      {error && (
        <div className="mt-5 rounded-lg border border-red-500/30 bg-red-950/30 px-4 py-3 text-sm text-red-300">
          {error}
        </div>
      )}

      <div className="card mt-5 overflow-x-auto">
        {loading ? (
          <p className="p-6 text-center text-sm text-slate-500">Loading transactions...</p>
        ) : transactions.length === 0 ? (
          <p className="p-6 text-center text-sm text-slate-500">
            No transactions yet. Add your first project payment or expense.
          </p>
        ) : (
          <table className="w-full min-w-[700px] text-left text-sm">
            <thead className="border-b border-navy-600 text-xs uppercase text-slate-500">
              <tr>
                <th className="px-4 py-3 font-medium">Date</th>
                <th className="px-4 py-3 font-medium">Type</th>
                <th className="px-4 py-3 font-medium">Category</th>
                <th className="px-4 py-3 font-medium">Note</th>
                <th className="px-4 py-3 text-right font-medium">Amount</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-navy-700">
              {transactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td className="whitespace-nowrap px-4 py-3 text-slate-400">
                    {transaction.transaction_date}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={
                        transaction.type === "income"
                          ? "badge bg-emerald-500/10 text-emerald-400"
                          : "badge bg-pink-500/10 text-pink-400"
                      }
                    >
                      {transaction.type}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-200">{transaction.category}</td>
                  <td className="px-4 py-3 text-slate-400">
                    {transaction.description || "-"}
                  </td>
                  <td
                    className={`px-4 py-3 text-right font-medium ${
                      transaction.type === "income" ? "text-emerald-400" : "text-pink-400"
                    }`}
                  >
                    {transaction.type === "income" ? "+" : "-"}${Number(transaction.amount).toFixed(2)}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      type="button"
                      onClick={() => handleDelete(transaction.id)}
                      className="text-xs text-slate-500 hover:text-red-300"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

function SummaryCard({ label, value, tone }: { label: string; value: number; tone: string }) {
  return (
    <div className="card p-5">
      <p className="text-xs uppercase tracking-wide text-slate-500">{label}</p>
      <p className={`mt-2 text-2xl font-semibold ${tone}`}>${value.toFixed(2)}</p>
    </div>
  );
}
