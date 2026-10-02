import styles from "./PhotoSlot.module.css";

/**
 * A taped-in "photo" placeholder. Replace with next/image when real
 * photography exists; keep the same aspect ratio to avoid layout shift.
 */
export function PhotoSlot({ label, ratio = "4 / 5", tilt = -2 }: { label: string; ratio?: string; tilt?: number }) {
  return (
    <figure className={styles.slot} style={{ aspectRatio: ratio, rotate: `${tilt}deg` }}>
      <span className={styles.tape} aria-hidden="true" />
      <svg viewBox="0 0 100 80" className={styles.sketch} aria-hidden="true">
        <path d="M14 62L36 36L52 52L64 42L86 62" />
        <path d="M70 18C74 18 77 21 77 25C77 29 74 32 70 32C66 32 63 29 63 25C63 21 66 18 70 18Z" />
      </svg>
      <figcaption className={styles.caption}>
        <span className="hand">{label}</span>
        <span className={styles.meta}>Photo placeholder</span>
      </figcaption>
    </figure>
  );
}
