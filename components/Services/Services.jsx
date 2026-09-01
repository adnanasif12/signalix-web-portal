import useReveal from "../../hooks/useReveal";
import styles from "./Services.module.css";

const SERVICES = [
  {
    num: "01 / Build",
    accent: "var(--cyan)",
    title: "Business Website Development",
    desc: "Professional, mobile-first websites designed around your business goals and built to convert visitors into enquiries.",
    items: ["Starting from 5 pages", "Mobile-first & responsive design", "SEO-ready structure"],
    offer: true,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="14" rx="2" />
        <path d="M3 9h18" />
        <circle cx="6.5" cy="6.5" r=".5" fill="var(--cyan)" />
        <circle cx="9" cy="6.5" r=".5" fill="var(--cyan)" />
      </svg>
    ),
  },
  {
    num: "02 / Build",
    accent: "var(--violet)",
    title: "Build your Software",
    desc: "Custom software solutions built to automate workflows, improve operations, and turn your ideas into reliable digital products.",
    items: ["Custom web & mobile apps", "Business process automation", "Scalable software architecture"],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 18V8a2 2 0 012-2h8a2 2 0 012 2v10" />
        <path d="M8 18H4a2 2 0 01-2-2V8a2 2 0 012-2h4" />
        <path d="M10 12h8M10 16h8" />
      </svg>
    ),
  },
  {
    num: "03 / Secure",
    accent: "var(--coral)",
    title: "Cyber Security",
    desc: "Protect your digital assets with proactive security reviews, monitoring, and safeguards that reduce exposure and build trust.",
    items: ["Threat monitoring", "Vulnerability checks", "Security hardening & guidance"],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3l7 3v6c0 4.2-2.7 8.1-7 10-4.3-1.9-7-5.8-7-10V6l7-3z" />
        <path d="M9.5 12l1.5 1.5L14.5 9" />
      </svg>
    ),
  },
  {
    num: "04 / Support",
    accent: "var(--cyan)",
    title: "Website Maintenance",
    desc: "Ongoing care so your site stays fast, secure, and up to date — without you lifting a finger.",
    items: ["Security & backup monitoring", "Content & plugin updates", "Speed & uptime checks"],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v4M12 18v4M4.9 4.9l2.8 2.8M16.3 16.3l2.8 2.8M2 12h4M18 12h4M4.9 19.1l2.8-2.8M16.3 7.7l2.8-2.8" />
      </svg>
    ),
  },
  {
    num: "05 / Create",
    accent: "var(--amber)",
    title: "Video Editing",
    desc: "Scroll-stopping edits for reels, ads, and YouTube — cut, color graded, and captioned for every platform.",
    items: ["Reels & short-form cuts", "Color grading & sound design", "Subtitles & motion titles"],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M23 7l-7 5 7 5V7z" />
        <rect x="1" y="5" width="15" height="14" rx="2" />
      </svg>
    ),
  },
  {
    num: "06 / Grow",
    accent: "var(--lime)",
    title: "Digital Marketing",
    desc: "Search and paid campaigns built around real numbers — so every ad spend is tracked and measured.",
    items: ["SEO & Google Ads", "Meta & TikTok ad campaigns", "Monthly performance reports"],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 3v18h18" />
        <path d="M7 15l4-4 3 3 5-6" />
      </svg>
    ),
  },
  {
    num: "07 / Engage",
    accent: "var(--violet)",
    title: "Social Media Marketing",
    desc: "Consistent, on-brand content calendars that build community and keep your audience coming back.",
    items: ["Content calendar & posting", "Community management", "Growth & engagement strategy"],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 8a5 5 0 10-10 0" />
        <path d="M4 21v-1a8 8 0 0116 0v1" />
        <circle cx="12" cy="8" r="4" />
      </svg>
    ),
  },
  {
    num: "+ / Bundle",
    accent: "var(--cyan)",
    title: "Full Growth Package",
    desc: "All eight services combined into one monthly plan — built, maintained, and marketed under one roof. A single remote team for your website, content, marketing, software, security, and ongoing support.",
    items: ["Single point of contact", "Unified brand strategy", "Custom pricing on request"],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2l3.5 7L23 10l-5.5 5.5L19 23l-7-4-7 4 1.5-7.5L1 10l7.5-1z" />
      </svg>
    ),
  },
];

export default function Services() {
  const containerRef = useReveal();

  return (
    <section className="section-pad" id="services" ref={containerRef}>
      <div className="container">
        <div className={`${styles.secHead} reveal`} data-reveal>
          <span className={styles.secEyebrow} style={{ color: "var(--cyan)" }}>
            Our Services
          </span>
          <h2 className={styles.secTitle}>Eight ways we help your business run louder online.</h2>
          <p className={styles.secDesc}>
            Pick one service or bundle them all — every deliverable is built to work together, from the first pixel to the last post.
          </p>
        </div>

        <div className={styles.grid}>
          {SERVICES.map((s) => (
            <div
              key={s.title}
              className={`${styles.card} reveal`}
              data-reveal
              style={{ "--accent": s.accent }}
            >
              <span className={styles.num}>{s.num}</span>
              <div className={styles.icon}>{s.icon}</div>
              {s.offer && (
                <div className={styles.offerTag}>
                  Special Starter Package: Build your website with $50
                </div>
              )}
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
              <ul className={styles.list}>
                {s.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
