import styles from "./PulseDivider.module.css";

export default function PulseDivider() {
  return (
    <div className={styles.pulseDivider}>
      <svg viewBox="0 0 1200 60" preserveAspectRatio="none">
        <polyline
          className={styles.pulseLine}
          points="0,30 150,30 180,10 210,50 240,30 400,30 430,15 460,45 490,30 700,30 730,8 760,52 790,30 1000,30 1030,15 1060,45 1090,30 1200,30"
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
