import useReveal from "../../hooks/useReveal";
import QuoteForm from "../QuoteForm/QuoteForm";
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
            Free initial consultation. No obligation.
          </p>
          <div className={styles.ctaBtns}>
            <a href="mailto:hello@signalix.agency" className="btn btn-primary">
              Email Us →
            </a>
            <a
              href="https://wa.me/8801636028679?text=Hi%20Signalix%2C%20I%27m%20interested%20in%20your%20services"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost"
            >
              WhatsApp Us
            </a>
          </div>

          <QuoteForm />
        </div>
      </div>
    </section>
  );
}
