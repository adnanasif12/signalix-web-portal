import useReveal from "../../hooks/useReveal";
import styles from "./Industries.module.css";

const INDUSTRIES = [
  {
    title: "Real Estate",
    accent: "var(--cyan)",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 10.5L12 3l9 7.5" />
        <path d="M5 9.5V21h14V9.5" />
        <path d="M9 21v-6h6v6" />
      </svg>
    ),
  },
  {
    title: "Healthcare",
    accent: "var(--coral)",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 21s-7-4.35-9.5-8.5C.7 9 2 5.5 5.3 5c2-.3 3.6.7 4.7 2.2C11.1 5.7 12.7 4.7 14.7 5c3.3.5 4.6 4 3.8 7.5C16 16.65 12 21 12 21z" />
      </svg>
    ),
  },
  {
    title: "Hospitality & Tourism",
    accent: "var(--amber)",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 12h20" />
        <path d="M5 12V7a2 2 0 012-2h10a2 2 0 012 2v5" />
        <path d="M3 12v7h18v-7" />
        <path d="M9 19v-3h6v3" />
      </svg>
    ),
  },
  {
    title: "E-commerce & Retail",
    accent: "var(--violet)",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="9" cy="21" r="1" />
        <circle cx="19" cy="21" r="1" />
        <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6" />
      </svg>
    ),
  },
  {
    title: "Education",
    accent: "var(--lime)",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 10L12 5 2 10l10 5 10-5z" />
        <path d="M6 12v5c0 1.5 3 3 6 3s6-1.5 6-3v-5" />
      </svg>
    ),
  },
  {
    title: "Logistics & Professional Services",
    accent: "var(--cyan)",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="7" width="15" height="11" rx="1" />
        <path d="M16 10h4l3 3v4h-7z" />
        <circle cx="5.5" cy="18.5" r="1.5" />
        <circle cx="18.5" cy="18.5" r="1.5" />
      </svg>
    ),
  },
];

export default function Industries() {
  const containerRef = useReveal();

  return (
    <section className="section-pad" id="industries" ref={containerRef}>
      <div className="container">
        <div className={`${styles.secHead} reveal`} data-reveal>
          <span className={styles.secEyebrow}>Who We Work With</span>
          <h2 className={styles.secTitle}>Built for Businesses Across The World</h2>
          <p className={styles.secDesc}>
            Wherever your business operates, our remote team adapts to your
            industry and market.
          </p>
        </div>

        <div className={styles.grid}>
          {INDUSTRIES.map((ind) => (
            <div
              key={ind.title}
              className={`${styles.card} reveal`}
              data-reveal
              style={{ "--accent": ind.accent }}
            >
              <div className={styles.icon}>{ind.icon}</div>
              <h4>{ind.title}</h4>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
