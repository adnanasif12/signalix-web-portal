import useReveal from "../../hooks/useReveal";
import styles from "./SelectedWork.module.css";

/**
 * IMPORTANT: Replace these placeholder entries with real, completed
 * projects only. Do not publish invented results, client names, or
 * metrics — see change-map rule #17.
 */
const PROJECTS = [
  {
    project: "Project Name",
    industry: "Industry",
    market: "Market / Country",
    service: "Service Provided",
    result: "Short, honest result (e.g. what changed for the client)",
    accent: "var(--cyan)",
  },
  {
    project: "Project Name",
    industry: "Industry",
    market: "Market / Country",
    service: "Service Provided",
    result: "Short, honest result (e.g. what changed for the client)",
    accent: "var(--coral)",
  },
  {
    project: "Project Name",
    industry: "Industry",
    market: "Market / Country",
    service: "Service Provided",
    result: "Short, honest result (e.g. what changed for the client)",
    accent: "var(--amber)",
  },
];

export default function SelectedWork() {
  const containerRef = useReveal();

  return (
    <section className="section-pad" id="work" ref={containerRef}>
      <div className="container">
        <div className={`${styles.secHead} reveal`} data-reveal>
          <span className={styles.secEyebrow}>Selected Work</span>
          <h2 className={styles.secTitle}>Real projects, real results.</h2>
          <p className={styles.secDesc}>
            A few of the projects we&apos;ve delivered — replace these cards
            with your own case studies as they go live.
          </p>
        </div>

        <div className={styles.grid}>
          {PROJECTS.map((p, i) => (
            <div
              key={i}
              className={`${styles.card} reveal`}
              data-reveal
              style={{ "--accent": p.accent }}
            >
              <div className={styles.thumb} />
              <div className={styles.body}>
                <span className={styles.industry}>{p.industry}</span>
                <h3>{p.project}</h3>
                <div className={styles.meta}>
                  <span>{p.market}</span>
                  <span>•</span>
                  <span>{p.service}</span>
                </div>
                <p className={styles.result}>{p.result}</p>
                <a href="#contact" className={styles.link}>
                  View Project →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
