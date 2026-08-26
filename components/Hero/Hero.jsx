import { useEffect, useRef } from "react";
import styles from "./Hero.module.css";

function useWave(ref, amp, freq, speed, phaseStart) {
  useEffect(() => {
    let phase = phaseStart;
    let raf;
    const el = ref.current;
    if (!el) return;

    function draw() {
      const pts = [];
      for (let x = 0; x <= 400; x += 8) {
        const y = 65 + Math.sin(x * freq + phase) * amp * Math.sin((x / 400) * Math.PI);
        pts.push(`${x},${y.toFixed(1)}`);
      }
      el.setAttribute("points", pts.join(" "));
      phase += speed;
      raf = requestAnimationFrame(draw);
    }
    draw();
    return () => cancelAnimationFrame(raf);
  }, [ref, amp, freq, speed, phaseStart]);
}

export default function Hero() {
  const wave1Ref = useRef(null);
  const wave2Ref = useRef(null);

  useWave(wave1Ref, 28, 0.045, 0.06, 0);
  useWave(wave2Ref, 18, 0.06, -0.045, 2);

  return (
    <section className={styles.hero} id="top">
      <div className={styles.heroBg}>
        <div className={`${styles.blob} ${styles.blob1}`} />
        <div className={`${styles.blob} ${styles.blob2}`} />
        <div className={`${styles.blob} ${styles.blob3}`} />
        <div className={styles.gridOverlay} />
      </div>

      <div className={`container ${styles.heroInner}`}>
        <div>
          <span className={styles.eyebrow}>● Available for new projects</span>
          <h1 className={styles.h1}>
            We turn your business into a{" "}
            <span className={styles.grad}>digital signal</span> people can&apos;t
            ignore.
          </h1>
          <p className={styles.heroSub}>
            Signalix is a remote full-service IT &amp; digital agency helping
            businesses across Africa and worldwide build, maintain, and grow
            their online presence.
          </p>
          <p className={styles.trustLine}>
            Serving businesses across Africa &amp; beyond — fully remote.
          </p>
          <div className={styles.heroCtas}>
            <a href="#contact" className="btn btn-primary">
              Start a Project →
            </a>
            <a href="#services" className="btn btn-ghost">
              See Our Services
            </a>
          </div>

          <div className={styles.offerBadge}>
            <span className={styles.offerText}>
              Special Starter Package: <strong>5-Page Website from $50</strong>
            </span>
            <a href="#services" className={styles.offerCta}>
              Claim the $50 Offer →
            </a>
          </div>

          <div className={styles.heroTags}>
            <span>Website Development</span>
            <span>Digital Marketing</span>
            <span>Social Media Marketing</span>
            <span>Website Maintenance</span>
            <span>Video Editing</span>
          </div>
        </div>

        <div className={styles.heroVisual}>
          <div className={styles.heroVisualHead}>
            <span className={styles.label}>What we deliver</span>
            <span className={styles.liveDot}>Live</span>
          </div>
          <div className={styles.waveBox}>
            <svg viewBox="0 0 400 130" width="100%" height="100%" preserveAspectRatio="none">
              <polyline
                ref={wave1Ref}
                fill="none"
                stroke="#00E5C7"
                strokeWidth="2"
                opacity="0.9"
              />
              <polyline
                ref={wave2Ref}
                fill="none"
                stroke="#8B7FFF"
                strokeWidth="1.5"
                opacity="0.5"
              />
            </svg>
          </div>

          <div className={styles.serviceMini}>
            <span className={styles.swatch} style={{ background: "var(--cyan)" }} />
            <span className={styles.txt}>
              Business Website Development
              <small>5-page site, starting from $50</small>
            </span>
          </div>
          <div className={styles.serviceMini}>
            <span className={styles.swatch} style={{ background: "var(--violet)" }} />
            <span className={styles.txt}>
              Website Maintenance
              <small>Updates, backups, uptime</small>
            </span>
          </div>
          <div className={styles.serviceMini}>
            <span className={styles.swatch} style={{ background: "var(--coral)" }} />
            <span className={styles.txt}>
              Social Media Marketing
              <small>Content that grows reach</small>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
