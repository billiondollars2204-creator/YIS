"use client";

import { ingredients } from "@/data/ingredients";
import type { FormulaLine, ResolvedRow } from "@/lib/customization";
import { formatGrams, formatShare } from "@/lib/units";
import { IngredientSwatch } from "../IngredientSwatch";
import styles from "./formulate.module.css";

type Props = {
  rows: ResolvedRow[];
  lines: FormulaLine[];
  /** Key and counter of the last change, used to highlight that dish. */
  last: { key: string; n: number } | null;
  compact?: boolean;
};

const RING_BASE = 0.27;
const RING_ADD = 0.415;
const MAX_D = { fill: 0.42, base: 0.17, add: 0.165 };

/**
 * Top-down "thali" of the batch: one katori per ingredient, sized by its share
 * of the recipe (area ∝ grams). Positions are fixed per formula, so changes
 * read as dishes growing, shrinking, emptying or filling — never reshuffling.
 */
export function MixComposition({ rows, lines, last, compact }: Props) {
  const base = lines.filter((l) => !l.fill && l.role === "base");
  const adds = lines.filter((l) => l.role === "addition");
  const ringMax = (ls: FormulaLine[]) => Math.max(1, ...ls.map((l) => l.max));
  const pos = new Map<string, { x: number; y: number; d: number; max: number }>();

  const place = (ls: FormulaLine[], radius: number, maxD: number, offset: number) => {
    const ref = ringMax(ls);
    ls.forEach((l, i) => {
      const a = -Math.PI / 2 + offset + (i / ls.length) * Math.PI * 2;
      const grams = rows.find((r) => r.key === l.key)?.grams ?? 0;
      const d = grams > 0 ? Math.max(0.05, maxD * Math.sqrt(grams / ref)) : 0;
      pos.set(l.key, { x: 0.5 + Math.cos(a) * radius, y: 0.5 + Math.sin(a) * radius, d, max: maxD });
    });
  };
  place(base, RING_BASE, MAX_D.base, base.length === 1 ? Math.PI : Math.PI / base.length);
  place(adds, RING_ADD, MAX_D.add, Math.PI / Math.max(1, adds.length));
  const fill = rows.find((r) => r.fill)!;
  pos.set(fill.key, { x: 0.5, y: 0.5, d: MAX_D.fill * Math.sqrt(fill.share / 0.75), max: MAX_D.fill });

  const visible = rows.filter((r) => r.grams > 0).sort((a, b) => b.grams - a.grams);
  const lastRow = last ? rows.find((r) => r.key === last.key) : undefined;

  return (
    <figure className={styles.mix} data-compact={compact || undefined}>
      <div className={styles.thali} role="img" aria-label={`Your mix: ${visible.map((r) => `${ingredients[r.pick]?.name} ${formatShare(r.share)}`).join(", ")}`}>
        {rows.map((r) => {
          const p = pos.get(r.key)!;
          const k = p.d / p.max;
          const active = last?.key === r.key;
          return (
            <span
              key={r.key}
              className={styles.dishSlot}
              style={{ left: `${p.x * 100}%`, top: `${p.y * 100}%`, width: `${p.max * 100}%` } as React.CSSProperties}
              data-empty={r.grams === 0 || undefined}
            >
              <span className={styles.dish} style={{ "--k": k } as React.CSSProperties} data-active={active || undefined} key={active ? last!.n : undefined}>
                <IngredientSwatch id={r.pick} className={styles.dishFill} sizes="160px" />
              </span>
            </span>
          );
        })}
      </div>

      <div className={styles.bar} aria-hidden="true">
        {visible.map((r) => (
          <span key={r.key} style={{ flexGrow: r.grams, "--tone": ingredients[r.pick]?.tone } as React.CSSProperties} title={`${ingredients[r.pick]?.name} ${formatShare(r.share)}`} />
        ))}
      </div>
      <figcaption className={styles.caption}>
        {lastRow ? (
          <>
            <strong>{ingredients[lastRow.pick]?.name}</strong> {lastRow.grams > 0 ? `${formatGrams(lastRow.grams)} · ${formatShare(lastRow.share)} of the batch` : "left out"}
          </>
        ) : (
          <>
            {visible
              .slice(0, 3)
              .map((r) => `${ingredients[r.pick]?.local} ${formatShare(r.share)}`)
              .join(" · ")}
          </>
        )}
      </figcaption>
    </figure>
  );
}
