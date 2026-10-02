import type { BenefitSlug } from "@/data/products";
import styles from "./art.module.css";

/** Small hand-drawn line icons and decorative marks. Decorative unless titled. */
export function BenefitIcon({ slug, className }: { slug: BenefitSlug; className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={`${styles.icon} ${className ?? ""}`} aria-hidden="true">
      {slug === "immunity" && (
        <>
          <path d="M24 6C31 10 37 10.5 40 10C40.5 26 34 36 24 42C14 36 7.5 26 8 10C11 10.5 17 10 24 6Z" />
          <path d="M24 14C24 22 24 30 23.5 36M24 22C27 20 29 18 31 17M24 28C21 26 19 24 17 23" />
        </>
      )}
      {slug === "wellness" && (
        <>
          <path d="M24 16C29 16 32 19.5 32 24C32 28.5 28.5 32 24 32C19.5 32 16 28.5 16 24C16 19.5 19 16 24 16Z" />
          <path d="M24 5V10M24 38V43M5 24H10M38 24H43M10.5 10.5L14 14M34 34L37.5 37.5M37.5 10.5L34 14M14 34L10.5 37.5" />
        </>
      )}
      {slug === "postpartum" && (
        <>
          <path d="M24 21C24 15 16 14 16 20C16 25 24 29 24 29C24 29 32 25 32 20C32 14 24 15 24 21Z" />
          <path d="M7 25C9 38 39 38 41 25" />
          <path d="M7 25C9 23.5 11 24 12 26M41 25C39 23.5 37 24 36 26" />
        </>
      )}
      {slug === "bone" && (
        <>
          <path d="M17.5 28.5L28.5 17.5M20 33L33 20" />
          <path d="M17.5 28.5C15 26 10 27 10 31C10 33 11.5 34 13 34.5C13.5 36 14.5 38 17 38C21 38 22 33 20 33" />
          <path d="M28.5 17.5C26 15 27 10 31 10C33 10 34 11.5 34.5 13C36 13.5 38 14.5 38 17C38 21 33 22 33 20" />
        </>
      )}
      {slug === "clarity" && (
        <>
          <path d="M24 36C18 30 18 20 24 11C30 20 30 30 24 36Z" />
          <path d="M24 36C16 36 10 31 7 24C14 23.5 20 28 24 36Z" />
          <path d="M24 36C32 36 38 31 41 24C34 23.5 28 28 24 36Z" />
          <path d="M12 41C20 39.5 28 39.5 36 41" />
        </>
      )}
    </svg>
  );
}

export function Sprig({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={`${styles.icon} ${className ?? ""}`} aria-hidden="true">
      <path d="M8 34C14 26 20 18 32 6" />
      <path d="M14 26C10 24 8 20 9 16C13 18 15 22 14 26Z" />
      <path d="M19 20C19 15 21 12 25 11C25 15 23 18 19 20Z" />
      <path d="M20 21C24 22 27 25 28 28C24 28 21 25 20 21Z" />
    </svg>
  );
}

/** Hand-drawn underline; inherits currentColor. */
export function Squiggle({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 14" preserveAspectRatio="none" className={`${styles.squiggle} ${className ?? ""}`} aria-hidden="true">
      <path d="M2 9C22 4 38 12 58 7C80 2 96 11 118 7C140 3 158 10 178 6C186 5 192 6 198 7" pathLength={1} />
    </svg>
  );
}

/** Torn-paper section edge. `flip` places it on the bottom of a section. */
export function PaperEdge({ color = "var(--paper-deep)", flip = false }: { color?: string; flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 1440 40"
      preserveAspectRatio="none"
      className={styles.edge}
      style={{ color, transform: flip ? "scaleY(-1)" : undefined }}
      aria-hidden="true"
    >
      <path
        fill="currentColor"
        d="M0 40V22C40 18 70 26 112 21C160 15 190 25 236 20C290 14 318 24 372 19C420 15 452 22 500 18C548 14 580 24 632 20C690 15 720 26 774 21C820 17 860 24 910 19C962 14 994 23 1046 19C1100 15 1130 25 1182 20C1232 16 1270 23 1316 19C1366 15 1400 22 1440 18V40Z"
      />
    </svg>
  );
}

/** Hand-drawn arrow used beside handwritten annotations. */
export function Arrow({ className, flip = false }: { className?: string; flip?: boolean }) {
  return (
    <svg viewBox="0 0 80 50" className={`${styles.arrow} ${className ?? ""}`} style={{ transform: flip ? "scaleX(-1)" : undefined }} aria-hidden="true">
      <path d="M4 8C20 6 46 12 62 36" />
      <path d="M50 34L63 38L64 24" />
    </svg>
  );
}
