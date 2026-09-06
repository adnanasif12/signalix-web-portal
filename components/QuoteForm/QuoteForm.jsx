import { useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import styles from "./QuoteForm.module.css";

const SERVICE_OPTIONS = [
  "Business Website Development",
  "Website Maintenance",
  "Video Editing",
  "Digital Marketing",
  "Social Media Marketing",
  "Full Growth Package",
];

const BUDGET_OPTIONS = [
  "Under $50",
  "$50 – $200",
  "$200 – $500",
  "$500 – $1,000",
  "$1,000+",
  "Not sure yet",
];

const EMPTY_FORM = {
  name: "",
  company: "",
  country: "",
  contact: "",
  service: SERVICE_OPTIONS[0],
  budget: BUDGET_OPTIONS[0],
  description: "",
};

export default function QuoteForm() {
  const [form, setForm] = useState(EMPTY_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [saveError, setSaveError] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setSaveError(false);

    // Save the lead to Supabase so it shows up in the admin panel.
    // If this fails (offline, Supabase not configured yet, etc.) we still
    // fall through to the mailto so the enquiry isn't lost.
    let hadError = false;
    if (supabase) {
      const { error } = await supabase.from("leads").insert({
        name: form.name,
        company: form.company,
        country: form.country,
        contact: form.contact,
        service: form.service,
        budget: form.budget,
        message: form.description,
      });
      if (error) {
        hadError = true;
        setSaveError(true);
        console.error("Failed to save lead:", error.message);
      }
    }

    const subject = `New Quote Request — ${form.name || "Website Visitor"}`;
    const body = [
      `Name: ${form.name}`,
      `Business/Company: ${form.company}`,
      `Country: ${form.country}`,
      `WhatsApp/Email: ${form.contact}`,
      `Service Needed: ${form.service}`,
      `Budget Range: ${form.budget}`,
      "",
      "Project Description:",
      form.description,
    ].join("\n");

    const mailto = `mailto:hello@signalix.agency?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    window.location.href = mailto;

    // Clear the form and show a confirmation card so the visitor gets
    // clear feedback that their request went through, instead of the
    // page just sitting there with the old values still filled in.
    setForm(EMPTY_FORM);
    setSubmitting(false);
    setShowConfirmation(true);
    setTimeout(() => setShowConfirmation(false), 4000);
    // eslint-disable-next-line no-unused-vars -- kept for clarity/future use
    void hadError;
  }

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <div className={styles.field}>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            required
            value={form.name}
            onChange={handleChange}
            placeholder="Your full name"
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="company">Business / Company</label>
          <input
            id="company"
            name="company"
            type="text"
            value={form.company}
            onChange={handleChange}
            placeholder="Company name"
          />
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.field}>
          <label htmlFor="country">Country</label>
          <input
            id="country"
            name="country"
            type="text"
            required
            value={form.country}
            onChange={handleChange}
            placeholder="e.g. Nigeria, Kenya, UK…"
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="contact">WhatsApp / Email</label>
          <input
            id="contact"
            name="contact"
            type="text"
            required
            value={form.contact}
            onChange={handleChange}
            placeholder="Best way to reach you"
          />
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.field}>
          <label htmlFor="service">Service Needed</label>
          <select id="service" name="service" value={form.service} onChange={handleChange}>
            {SERVICE_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.field}>
          <label htmlFor="budget">Budget Range</label>
          <select id="budget" name="budget" value={form.budget} onChange={handleChange}>
            {BUDGET_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className={styles.field}>
        <label htmlFor="description">Project Description</label>
        <textarea
          id="description"
          name="description"
          rows={4}
          value={form.description}
          onChange={handleChange}
          placeholder="Tell us a bit about what you need…"
        />
      </div>

      <button type="submit" className="btn btn-primary" disabled={submitting}>
        {submitting ? "Sending..." : "Get a Quote →"}
      </button>
      <p className={styles.note}>
        {saveError
          ? "We couldn't save your request automatically, but your email app will still open with your details pre-filled."
          : "This also opens your email app with your details pre-filled — nothing is sent automatically."}
      </p>
      </form>

      {showConfirmation && (
        <div className={styles.toast} role="status">
          <span className={styles.toastIcon}>✓</span>
          <div>
            <p className={styles.toastTitle}>Request received!</p>
            <p className={styles.toastText}>
              Thanks — we&apos;ll get back to you within one business day.
            </p>
          </div>
        </div>
      )}
    </>
  );
}
