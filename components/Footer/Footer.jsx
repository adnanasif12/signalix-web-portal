import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.footerTop}>
          <div className={styles.footerBrand}>
            <a href="#top" className={styles.logo}>
              <span className={styles.dot} />
              Signalix
            </a>
            <p>
              A full-service IT &amp; digital agency helping small businesses
              build, maintain, and grow their online presence.
            </p>
            <p className={styles.remoteLine}>
              Remote agency serving Africa &amp; worldwide.
            </p>
          </div>
          <div className={styles.footerCol}>
            <h5>Services</h5>
            <a href="#services">Website Development</a>
            <a href="#services">Website Maintenance</a>
            <a href="#services">Video Editing</a>
          </div>
          <div className={styles.footerCol}>
            <h5>Company</h5>
            <a href="#why">Why Us</a>
            <a href="#process">Process</a>
            <a href="#contact">Contact</a>
          </div>
          <div className={styles.footerCol}>
            <h5>Get in Touch</h5>
            <a href="mailto:hello@signalix.agency">hello@signalix.agency</a>
            <a href="tel:+8801636028679">+880 1636-028679</a>
          </div>
        </div>

        <div className={styles.footerBottom}>
          <span>© 2026 Signalix. All rights reserved.</span>
          <div className={styles.socials}>
            <a href="#" aria-label="Facebook">
              <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8">
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
              </svg>
            </a>
            <a href="#" aria-label="Instagram">
              <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8">
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1" />
              </svg>
            </a>
            <a href="#" aria-label="LinkedIn">
              <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8">
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="4" r="2" />
                <path d="M10 9v12M10 13a4 4 0 018 0v8" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
