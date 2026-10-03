import { ingredients, type GlyphKind } from "@/data/ingredients";
import { Glyph, seeded } from "./glyphs";
import styles from "./BowlArt.module.css";

export type Piece = { key: string; kind: GlyphKind; x: number; y: number; r: number; s: number; i: number; leaving?: boolean };

const CX = 220;
const CY = 220;
const RADIUS = 146;

function countFor(kind: GlyphKind, level: number): number {
  const g = ingredients[kind].group;
  const table = g === "spice" ? [0, 2, 4, 7] : kind === "magaz" || kind === "flax" ? [0, 6, 11, 18] : [0, 4, 8, 13];
  return table[Math.max(0, Math.min(3, level))];
}

/** Stable piece layout: the same ingredient/index always lands in the same spot. */
export function piecesFor(levels: Partial<Record<GlyphKind, number>>): Piece[] {
  const out: Piece[] = [];
  for (const [kind, level] of Object.entries(levels) as [GlyphKind, number][]) {
    const n = countFor(kind, level);
    for (let i = 0; i < n; i++) {
      const rnd = seeded(`${kind}-${i}`);
      const dist = RADIUS * Math.sqrt(rnd()) * 0.95;
      const ang = rnd() * Math.PI * 2;
      out.push({
        key: `${kind}-${i}`,
        kind,
        x: CX + Math.cos(ang) * dist,
        y: CY + Math.sin(ang) * dist,
        r: Math.round(rnd() * 360),
        s: 1.15 + rnd() * 0.35,
        i,
      });
    }
  }
  return out;
}

type Props = {
  pieces: Piece[];
  tint: string;
  /** 0 (dry) – 2 (rich): controls the ghee sheen. */
  sheen?: number;
  /** Fine texture uses more, smaller crumbs. */
  fine?: boolean;
  animate?: boolean;
  contentsRef?: React.Ref<SVGGElement>;
  label?: string;
  className?: string;
  /** Unique per instance on a page; namespaces gradient ids. */
  uid?: string;
};

const crumbs = (() => {
  const rnd = seeded("crumbs");
  return Array.from({ length: 260 }, () => {
    const d = RADIUS * 1.05 * Math.sqrt(rnd());
    const a = rnd() * Math.PI * 2;
    return { x: CX + Math.cos(a) * d, y: CY + Math.sin(a) * d, r: 0.8 + rnd() * 2.2, light: rnd() > 0.5 };
  });
})();

/** Top-down brass bowl filled with the batch. Pure markup, usable on the server. */
export function BowlArt({ pieces, tint, sheen = 1, fine = false, animate = false, contentsRef, label, className, uid = "bowl" }: Props) {
  const id = (n: string) => `${uid}-${n}`;
  return (
    <svg viewBox="0 0 440 440" className={`${styles.svg} ${className ?? ""}`} role={label ? "img" : undefined} aria-label={label} aria-hidden={label ? undefined : true}>
      <defs>
        <radialGradient id={id("brass")} cx="40%" cy="35%" r="75%">
          <stop offset="0" stopColor="#E6CB8E" />
          <stop offset=".55" stopColor="#C29A58" />
          <stop offset="1" stopColor="#8E6A35" />
        </radialGradient>
        <radialGradient id={id("fill")} cx="45%" cy="40%" r="70%">
          <stop offset="0" className={styles.stop} style={{ stopColor: tint }} />
          <stop offset="1" className={styles.stop} style={{ stopColor: tint, stopOpacity: 0.82 }} />
        </radialGradient>
        <radialGradient id={id("sheen")} cx="38%" cy="32%" r="45%">
          <stop offset="0" stopColor="#fff" stopOpacity=".55" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
        <clipPath id={id("clip")}>
          <circle cx={CX} cy={CY} r={RADIUS + 14} />
        </clipPath>
      </defs>

      <ellipse cx={CX} cy={CY + 14} rx="206" ry="200" fill="#1e1915" opacity=".08" />
      <circle cx={CX} cy={CY} r="204" fill={`url(#${id("brass")})`} stroke="#1e1915" strokeWidth="1.2" />
      <circle cx={CX} cy={CY} r="186" fill="none" stroke="#F3E2B8" strokeOpacity=".7" strokeWidth="3" />
      <circle cx={CX} cy={CY} r={RADIUS + 16} fill="#7E5C2C" stroke="#1e1915" strokeWidth="1" />

      <g ref={contentsRef} className={styles.contents} clipPath={`url(#${id("clip")})`}>
        <circle cx={CX} cy={CY} r={RADIUS + 14} fill={`url(#${id("fill")})`} />
        {crumbs.map((c, i) => (
          <circle
            key={i}
            cx={c.x}
            cy={c.y}
            r={fine ? c.r * 0.55 : c.r}
            fill={c.light ? "#fff" : "#1e1915"}
            opacity={c.light ? 0.16 : 0.12}
            className={styles.crumb}
          />
        ))}
        {pieces.map((p) => (
          <g key={p.key} transform={`translate(${p.x.toFixed(1)} ${p.y.toFixed(1)})`}>
            <g
              className={animate ? (p.leaving ? styles.leave : styles.enter) : undefined}
              style={animate ? ({ "--d": `${(p.i % 8) * 35}ms`, "--r": `${p.r}deg` } as React.CSSProperties) : undefined}
            >
              <g transform={`rotate(${p.r}) scale(${p.s.toFixed(2)})`}>
                <Glyph kind={p.kind} color={ingredients[p.kind].color} line={0.6} />
              </g>
            </g>
          </g>
        ))}
        <circle cx={CX} cy={CY} r={RADIUS + 14} fill={`url(#${id("sheen")})`} className={styles.sheen} style={{ opacity: 0.15 + sheen * 0.3 }} />
      </g>
      <circle cx={CX} cy={CY} r={RADIUS + 14} fill="none" stroke="#1e1915" strokeOpacity=".35" strokeWidth="1" />
    </svg>
  );
}
