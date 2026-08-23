import useReveal from "../../hooks/useReveal";
import styles from "./Process.module.css";

const STEPS = [
  {
    n: "01",
    accent: "var(--cyan)",
    title: "Discover",
    desc: "We learn your business, audience, and goals in a short discovery call.",
  },
  {
    n: "02",
    accent: "var(--violet)",
    title: "Design & Build",
    desc: "We design and develop your site, content, or campaign around your brand.",
  },
  {
    n: "03",
    accent: "var(--coral)",
    title: "Launch",
    desc: "We ship it — tested, optimized, and ready for real traffic.",
  },
  {
    n: "04",
    accent: "var(--amber)",
    title: "Grow",
    desc: "We maintain, market, and report — so growth doesn't stop at launch.",
  },
];

export default function Process() {
  const containerRef = useReveal();

  return (
    <section className={`section-pad ${styles.process}`} id="process" ref={containerRef}>
      <div className="container">
        <div className="reveal" data-reveal style={{ maxWidth: 640, marginBottom: 64 }}>
          <span className={styles.secEyebrow}>How We Work</span>
          <h2 className={styles.secTitle}>From first call to live signal — four steps.</h2>
        </div>

        <div className={styles.row}>
          {STEPS.map((s) => (
            <div
              key={s.n}
              className={`${styles.step} reveal`}
              data-reveal
              style={{ "--accent": s.accent }}
            >
              <div className={styles.stepDot}>{s.n}</div>
              <h4>{s.title}</h4>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
