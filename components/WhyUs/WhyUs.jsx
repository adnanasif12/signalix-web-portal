import useReveal from "../../hooks/useReveal";
import styles from "./WhyUs.module.css";

const REASONS = [
  {
    n: "01",
    accent: "var(--cyan)",
    title: "Everything under one roof",
    desc: "Design, development, video, and marketing — no juggling five freelancers.",
  },
  {
    n: "02",
    accent: "var(--violet)",
    title: "Africa-first. Worldwide reach.",
    desc: "We help businesses across Africa and worldwide build a stronger digital presence, remotely.",
  },
  {
    n: "03",
    accent: "var(--amber)",
    title: "Transparent, ongoing support & reporting",
    desc: "You always know what's live, what changed, and what it's doing for you.",
  },
];

export default function WhyUs() {
  const containerRef = useReveal();

  return (
    <section className="section-pad" id="why" ref={containerRef}>
      <div className={`container ${styles.grid}`}>
        <div className="reveal" data-reveal>
          <span className={styles.secEyebrow}>Why Signalix</span>
          <h2 className={styles.secTitle}>One agency for the whole signal chain.</h2>
          <div className={styles.list}>
            {REASONS.map((r) => (
              <div className={styles.item} key={r.n}>
                <span className={styles.num} style={{ color: r.accent }}>
                  {r.n}
                </span>
                <div>
                  <h4>{r.title}</h4>
                  <p>{r.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={`${styles.panel} reveal`} data-reveal>
          <span className={styles.promiseLabel}>Our Promise</span>
          <p className={styles.quote}>
            A website is only the beginning — maintenance, content, and
            marketing are what keep the signal alive. We treat every project
            like it&apos;s ours to grow, not just build and forget.
          </p>
          <div className={styles.who}>— The Signalix team</div>
        </div>
      </div>
    </section>
  );
}
