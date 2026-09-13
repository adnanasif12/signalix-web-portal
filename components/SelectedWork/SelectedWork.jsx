import { useState } from "react";
import styles from "./SelectedWork.module.css";

const ACCENTS = ["var(--cyan)", "var(--coral)", "var(--amber)", "var(--violet)", "var(--lime)"];
const DEFAULT_PROJECT_URL = "https://signalix.agency";

function getMockupVariant(index) {
  return ["teal", "pink", "amber", "indigo", "green"][index % 5];
}

// Free, no-API-key screenshot service — pass any live URL and it returns
// a rendered screenshot of that page. No manual thumbnail upload needed:
// just save a project_url in the admin panel and this generates the
// preview automatically, the same way Vercel shows a live deployment
// thumbnail.
function screenshotUrl(targetUrl) {
  return `https://s.wordpress.com/mshots/v1/${encodeURIComponent(
    targetUrl
  )}?w=800&h=500`;
}

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
    isPlaceholder: true,
  },
  {
    project_name: "Project Name",
    industry: "Industry",
    market: "Market / Country",
    service_provided: "Service Provided",
    result_summary: "Short, honest result (e.g. what changed for the client)",
    isPlaceholder: true,
  },
  {
    project_name: "Project Name",
    industry: "Industry",
    market: "Market / Country",
    service_provided: "Service Provided",
    result_summary: "Short, honest result (e.g. what changed for the client)",
    isPlaceholder: true,
  },
];

// Renders either a live screenshot of the project's URL, or a manually
// set image_url, or — if neither is available/working — the illustrated
// mockup fallback so the grid never shows a broken image.
function ProjectThumb({ project, variant }) {
  const [failed, setFailed] = useState(false);

  const manualImage = project.image_url;
  const canAutoScreenshot = !project.isPlaceholder && project.project_url;

  const src =
    manualImage || (canAutoScreenshot ? screenshotUrl(project.project_url) : null);

  if (src && !failed) {
    return (
      <div className={`${styles.thumb} ${styles[variant]}`}>
        <img
          src={src}
          alt={`${project.project_name} — live preview`}
          className={styles.thumbImage}
          loading="lazy"
          onError={() => setFailed(true)}
        />
      </div>
    );
  }

  return (
    <div className={`${styles.thumb} ${styles[variant]}`}>
      <div className={styles.mockupWindow}>
        <div className={styles.mockupTopbar}>
          <span className={styles.dot} />
          <span className={styles.dot} />
          <span className={styles.dot} />
        </div>
        <div className={styles.mockupBody}>
          <div className={styles.mockupSidebar}>
            <span className={styles.sidebarBlock} />
            <span className={styles.sidebarBlock} />
            <span className={styles.sidebarBlock} />
          </div>
          <div className={styles.mockupContent}>
            <div className={styles.mockupHeader} />
            <div className={styles.mockupCards}>
              <span />
              <span />
              <span />
            </div>
            <div className={styles.mockupChart} />
          </div>
        </div>
      </div>
    </div>
  );
}

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
              style={{
                "--accent": ACCENTS[i % ACCENTS.length],
              }}
            >
              <ProjectThumb project={p} variant={getMockupVariant(i)} />
              <div className={styles.body}>
                <span className={styles.industry}>{p.industry}</span>
                <h3>{p.project_name}</h3>
                <div className={styles.meta}>
                  <span>{p.market}</span>
                  <span>•</span>
                  <span>{p.service_provided}</span>
                </div>
                <p className={styles.result}>{p.result_summary}</p>
                <a
                  href={p.project_url || DEFAULT_PROJECT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.link}
                >
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