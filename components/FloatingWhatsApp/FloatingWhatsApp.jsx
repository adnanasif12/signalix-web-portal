import styles from "./FloatingWhatsApp.module.css";

export default function FloatingWhatsApp() {
  return (
    <a
      href="https://wa.me/8801636028679?text=Hi%20Signalix%2C%20I%27d%20like%20to%20discuss%20a%20project"
      target="_blank"
      rel="noopener noreferrer"
      className={styles.fab}
      aria-label="Chat with Signalix on WhatsApp"
    >
      <svg viewBox="0 0 24 24" fill="currentColor" className={styles.icon}>
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.29-1.39a9.9 9.9 0 004.75 1.21h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2zm5.8 14.02c-.24.68-1.4 1.3-1.93 1.38-.49.08-1.11.11-1.79-.11-.41-.13-.94-.3-1.62-.6-2.85-1.23-4.71-4.1-4.85-4.29-.14-.19-1.16-1.54-1.16-2.94s.73-2.09.99-2.37c.26-.28.56-.35.75-.35.19 0 .38 0 .54.01.17.01.4-.07.63.48.24.56.81 1.96.88 2.1.07.14.11.31.02.5-.09.19-.14.31-.28.47-.14.16-.29.36-.42.48-.14.14-.28.28-.12.56.16.28.71 1.17 1.53 1.9 1.05.94 1.94 1.23 2.22 1.37.28.14.44.12.6-.07.16-.19.68-.79.87-1.06.19-.28.37-.23.63-.14.26.09 1.65.78 1.94.93.28.14.47.21.54.33.07.13.07.72-.17 1.4z" />
      </svg>
      <span className={styles.label}>Chat with us</span>
    </a>
  );
}
