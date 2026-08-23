import useReveal from "../../hooks/useReveal";
import styles from "./CTA.module.css";

export default function CTA() {
  const containerRef = useReveal();

  return (
    <section className={styles.ctaSection} id="contact" ref={containerRef}>
      <div className="container">
        <div className={`${styles.ctaCard} reveal`} data-reveal>
          <h2>Ready to put your business on signal?</h2>
          <p>
            Tell us what you need — a website, a campaign, or the full
            package — and we&apos;ll get back to you within one business day.
          </p>
          <div className={styles.ctaBtns}>
            <a href="mailto:hello@signalix.agency" className="btn btn-primary">
              Email Us →
            </a>
            <a href="#" className="btn btn-ghost">
              WhatsApp Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
