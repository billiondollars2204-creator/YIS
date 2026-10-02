import type { ArtKind } from "@/data/products";
import styles from "./art.module.css";

/**
 * Hand-drawn placeholder product portraits. Replace with photography later by
 * swapping this component for next/image — the surrounding layout keeps its ratio.
 */
const tones: Record<ArtKind, { blob: string; food: string; food2: string }> = {
  panjiri: { blob: "var(--wash-turmeric)", food: "#E7BE72", food2: "#C98F45" },
  pinni: { blob: "var(--wash-rose)", food: "#B9804F", food2: "#8E5A33" },
  laddu: { blob: "var(--wash-saffron)", food: "#C98B4E", food2: "#9C6332" },
  mix: { blob: "var(--wash-cardamom)", food: "#D9A86C", food2: "#8B5A3A" },
  gift: { blob: "var(--wash-rose)", food: "#E7BE72", food2: "#B4501F" },
};

const blobs = [
  "M40 60C70 20 170 14 205 54C236 90 222 160 176 178C126 196 54 186 30 146C12 115 18 84 40 60Z",
  "M52 44C96 18 178 26 206 70C230 108 210 168 160 184C110 198 44 178 26 132C14 100 22 62 52 44Z",
  "M34 80C44 36 120 12 176 34C222 52 230 120 204 156C176 194 96 198 56 170C28 150 28 104 34 80Z",
];

type Props = { kind: ArtKind; variant?: number; className?: string; title?: string };

export function ProductArt({ kind, variant = 0, className, title }: Props) {
  const t = tones[kind];
  const label = title ?? `Illustration of ${kind}`;
  return (
    <svg viewBox="0 0 240 200" className={`${styles.art} ${className ?? ""}`} role="img" aria-label={label}>
      <path d={blobs[variant % blobs.length]} fill={t.blob} className={styles.blob} />
      <g className={styles.ink}>
        {kind === "panjiri" && <Panjiri food={t.food} food2={t.food2} />}
        {kind === "pinni" && <Pinni food={t.food} food2={t.food2} />}
        {kind === "laddu" && <Laddu food={t.food} food2={t.food2} />}
        {kind === "mix" && <Mix food={t.food} food2={t.food2} />}
        {kind === "gift" && <Gift food={t.food} food2={t.food2} />}
      </g>
    </svg>
  );
}

type F = { food: string; food2: string };

function Panjiri({ food, food2 }: F) {
  return (
    <>
      <path d="M58 112C62 96 78 90 86 92C92 78 108 70 120 72C134 66 150 76 156 88C170 88 182 98 182 112Z" fill={food} />
      {[
        [84, 102], [100, 92], [118, 86], [136, 96], [152, 102], [110, 104], [128, 108], [94, 108], [166, 106], [142, 84],
      ].map(([x, y], i) => (
        <ellipse key={i} cx={x} cy={y} rx={i % 3 === 0 ? 3.4 : 2} ry={i % 3 === 0 ? 2.2 : 1.6} fill={food2} stroke="none" />
      ))}
      <path d="M150 96L194 48" />
      <ellipse cx="199" cy="43" rx="9" ry="5" transform="rotate(-48 199 43)" fill="var(--paper)" />
      <path d="M50 112C50 104 190 104 190 112C190 121 50 121 50 112Z" fill="#F1E4CC" />
      <path d="M52 115C58 150 88 166 120 166C152 166 182 150 188 115" fill="#F1E4CC" />
      <path d="M66 132C80 140 96 142 104 142" className={styles.thin} />
      <path d="M100 166C102 173 138 173 140 166" />
    </>
  );
}

function Pinni({ food, food2 }: F) {
  const piece = (cx: number, cy: number, r = 1) => (
    <g key={`${cx}-${cy}`}>
      <path
        d={`M${cx - 30 * r} ${cy}C${cx - 31 * r} ${cy - 20 * r} ${cx + 31 * r} ${cy - 20 * r} ${cx + 30 * r} ${cy}C${cx + 30 * r} ${cy + 18 * r} ${cx - 30 * r} ${cy + 18 * r} ${cx - 30 * r} ${cy}Z`}
        fill={food}
      />
      <path d={`M${cx - 18 * r} ${cy - 6 * r}C${cx - 8 * r} ${cy - 11 * r} ${cx + 8 * r} ${cy - 11 * r} ${cx + 16 * r} ${cy - 6 * r}`} className={styles.thin} />
      <circle cx={cx + 4 * r} cy={cy + 3 * r} r={3} fill={food2} stroke="none" />
      <circle cx={cx - 10 * r} cy={cy + 5 * r} r={2} fill={food2} stroke="none" />
    </g>
  );
  return (
    <>
      <path d="M28 150C60 118 150 108 214 134C186 170 98 186 28 150Z" fill="#A7B47F" />
      <path d="M34 148C90 140 150 136 206 136" className={styles.thin} />
      <path d="M70 146L84 128M110 142L118 124M150 140L156 124" className={styles.thin} />
      {piece(86, 128)}
      {piece(152, 124, 0.95)}
      {piece(118, 92, 0.92)}
    </>
  );
}

function Laddu({ food, food2 }: F) {
  const ball = (cx: number, cy: number, r: number, k: number) => (
    <g key={k}>
      <path
        d={`M${cx} ${cy - r}C${cx + r * 0.58} ${cy - r} ${cx + r} ${cy - r * 0.52} ${cx + r} ${cy + r * 0.04}C${cx + r * 0.98} ${cy + r * 0.6} ${cx + r * 0.5} ${cy + r} ${cx - r * 0.04} ${cy + r}C${cx - r * 0.6} ${cy + r * 0.98} ${cx - r} ${cy + r * 0.55} ${cx - r} ${cy}C${cx - r * 0.98} ${cy - r * 0.6} ${cx - r * 0.52} ${cy - r * 1.02} ${cx} ${cy - r}Z`}
        fill={food}
      />
      {[[-0.4, -0.3], [0.3, -0.1], [-0.1, 0.4], [0.45, 0.45], [-0.5, 0.2]].map(([dx, dy], i) => (
        <circle key={i} cx={cx + dx * r} cy={cy + dy * r} r={i % 2 ? 1.6 : 2.4} fill={food2} stroke="none" />
      ))}
    </g>
  );
  return (
    <>
      <path d="M36 160C36 146 204 146 204 160C204 174 36 174 36 160Z" fill="#F1E4CC" />
      <path d="M58 160C70 168 170 168 182 160" className={styles.thin} />
      {ball(100, 104, 23, 1)}
      {ball(140, 104, 23, 2)}
      {ball(120, 72, 22, 3)}
      {ball(80, 138, 24, 4)}
      {ball(120, 140, 25, 5)}
      {ball(160, 138, 24, 6)}
    </>
  );
}

function Mix({ food, food2 }: F) {
  return (
    <>
      <path d="M84 52C84 46 156 46 156 52L156 62C156 66 84 66 84 62Z" fill="#B4501F" />
      <path d="M86 66C74 74 72 84 72 96L72 160C72 172 168 172 168 160L168 96C168 84 166 74 154 66" fill="rgba(255,255,255,.45)" />
      {[
        [92, 140, 8, 4, 20], [112, 150, 7, 4, -30], [134, 144, 8, 4, 40], [152, 150, 7, 4, -10], [100, 120, 7, 4, 60],
        [124, 124, 8, 4, -50], [148, 118, 7, 4, 15], [88, 100, 7, 4, -20], [114, 102, 6, 4, 30], [140, 98, 8, 4, -40],
      ].map(([x, y, rx, ry, rot], i) => (
        <ellipse key={i} cx={x} cy={y} rx={rx} ry={ry} transform={`rotate(${rot} ${x} ${y})`} fill={i % 3 ? food : food2} className={styles.thin} />
      ))}
      {[[104, 132], [130, 112], [158, 134], [96, 156], [120, 88]].map(([x, y], i) => (
        <path key={i} d={`M${x - 5} ${y}C${x - 6} ${y - 8} ${x + 6} ${y - 8} ${x + 5} ${y}`} className={styles.thin} fill="#F3E2C2" />
      ))}
      <path d="M82 84C80 104 80 130 82 150" className={styles.highlight} />
      <ellipse cx="196" cy="166" rx="8" ry="4" transform="rotate(20 196 166)" fill={food} className={styles.thin} />
      <ellipse cx="44" cy="164" rx="7" ry="4" transform="rotate(-30 44 164)" fill={food2} className={styles.thin} />
      <path d="M206 154C204 146 216 146 214 154" className={styles.thin} fill="#F3E2C2" />
    </>
  );
}

function Gift({ food2 }: F) {
  return (
    <>
      <path d="M60 90L180 90L176 168L64 168Z" fill="#F1E4CC" />
      <path d="M54 76L186 76L186 92L54 92Z" fill={food2} />
      <path d="M120 76L120 168" />
      <path d="M120 76C104 54 84 58 90 70C94 78 110 78 120 76C130 78 146 78 150 70C156 58 136 54 120 76Z" fill="var(--paper)" />
    </>
  );
}
