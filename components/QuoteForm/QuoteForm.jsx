import { useState } from "react";
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

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();

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
  }

  return (
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

      <button type="submit" className="btn btn-primary">
        Get a Quote →
      </button>
      <p className={styles.note}>
        This opens your email app with your details pre-filled — nothing is
        sent automatically.
      </p>
    </form>
  );
}
