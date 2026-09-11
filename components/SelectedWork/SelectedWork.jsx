import styles from "./SelectedWork.module.css";

const ACCENTS = ["var(--cyan)", "var(--coral)", "var(--amber)", "var(--violet)", "var(--lime)"];

/**
 * Placeholder shown only when no published projects exist yet in the
 * admin panel (Portfolio section). Add real projects there — this
 * fallback disappears automatically once you do.
 */
const PLACEHOLDER_PROJECTS = [
  {
    project_name: "Project Name",
    industry: "Industry",
    market: "Market / Country",
    service_provided: "Service Provided",
    result_summary: "Short, honest result (e.g. what changed for the client)",
  },
  {
    project_name: "Project Name",
    industry: "Industry",
    market: "Market / Country",
    service_provided: "Service Provided",
    result_summary: "Short, honest result (e.g. what changed for the client)",
  },
  {
    project_name: "Project Name",
    industry: "Industry",
    market: "Market / Country",
    service_provided: "Service Provided",
    result_summary: "Short, honest result (e.g. what changed for the client)",
  },
];

export default function SelectedWork({ projects }) {
  const items = projects && projects.length > 0 ? projects : PLACEHOLDER_PROJECTS;

  return (
    <section className="section-pad" id="work">
      <div className="container">
        <div className={styles.secHead} data-aos="fade-left">
          <span className={styles.secEyebrow}>Selected Work</span>
          <h2 className={styles.secTitle}>Real projects, real results.</h2>
          <p className={styles.secDesc}>
            A few of the projects we&apos;ve delivered — replace these cards
            with your own case studies as they go live.
          </p>
        </div>

        <div className={styles.grid}>
          {items.map((p, i) => (
            <div
              key={p.id || i}
              className={styles.card}
              data-aos="fade-left"
              data-aos-delay={i * 100}
              style={{ "--accent": ACCENTS[i % ACCENTS.length] }}
            >
              <div className={styles.thumb} />
              <div className={styles.body}>
                <span className={styles.industry}>{p.industry}</span>
                <h3>{p.project_name}</h3>
                <div className={styles.meta}>
                  <span>{p.market}</span>
                  <span>•</span>
                  <span>{p.service_provided}</span>
                </div>
                <p className={styles.result}>{p.result_summary}</p>
                <a href={p.project_url || "#contact"} className={styles.link}>
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
