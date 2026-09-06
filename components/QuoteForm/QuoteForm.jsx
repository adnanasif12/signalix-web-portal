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
        console.error("Failed to save lead:", error.message);
      }
    } else {
      hadError = true;
    }

    if (hadError) {
      // Only fall back to opening the visitor's email app if we couldn't
      // save the request anywhere — so it isn't lost. When the save
      // succeeds, we never trigger mailto (avoids the OS "choose an app"
      // popup on every submit).
      setSaveError(true);
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
      window.location.href = `mailto:hello@signalix.agency?subject=${encodeURIComponent(
        subject
      )}&body=${encodeURIComponent(body)}`;
    }

    // Clear the form and show a confirmation card so the visitor gets
    // clear feedback that their request went through, instead of the
    // page just sitting there with the old values still filled in.
    setForm(EMPTY_FORM);
    setSubmitting(false);
    setShowConfirmation(true);
    setTimeout(() => setShowConfirmation(false), 4000);
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
          ? "We couldn't save your request automatically — your email app should open instead so nothing is lost."
          : "Your request goes straight to our team — no email app will open."}
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