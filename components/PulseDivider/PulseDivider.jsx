import styles from "./PulseDivider.module.css";

export default function PulseDivider() {
  return (
    <div className={styles.pulseDivider}>
      <svg viewBox="0 0 1200 60" preserveAspectRatio="none">
        <polyline
          className={styles.pulseLine}
          points="0,30 130,30 180,4 230,56 280,30 380,30 430,6 480,54 530,30 660,30 710,3 760,57 810,30 940,30 990,5 1040,55 1090,30 1200,30"
          stroke="url(#pulseGrad)"
        />
        <defs>
          <linearGradient id="pulseGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#00E5C7" />
            <stop offset="35%" stopColor="#8B7FFF" />
            <stop offset="70%" stopColor="#FF5D7A" />
            <stop offset="100%" stopColor="#FFB84D" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
