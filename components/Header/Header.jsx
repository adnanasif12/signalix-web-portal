import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./Header.module.css";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>
      <nav className={styles.nav}>
        <a href="#top" className={styles.logo}>
          <Image
            src="/images/image2.png"
            alt=""
            width={28}
            height={28}
            priority
          />
          <Image
            src="/images/image1.png"
            alt="Signalix"
            width={180}
            height={41}
            priority
          />
        </a>
        <ul className={`${styles.navLinks} ${menuOpen ? styles.navLinksOpen : ""}`}>
          <li>
            <a href="#services" onClick={() => setMenuOpen(false)}>Services</a>
          </li>
          <li>
            <a href="#process" onClick={() => setMenuOpen(false)}>Process</a>
          </li>
          <li>
            <a href="#why" onClick={() => setMenuOpen(false)}>Why Us</a>
          </li>
          <li>
            <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
          </li>
        </ul>
        <div className={styles.navCta}>
          <a href="#contact" className="btn btn-primary navQuote" onClick={() => setMenuOpen(false)}>
            Get a Quote
          </a>
          <button
            type="button"
            className={styles.menuToggle}
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>
    </header>
  );
}
