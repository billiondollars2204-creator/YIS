"use client";

import { ingredients } from "@/data/ingredients";
import type { ResolvedRow } from "@/lib/customization";
import { formatShare } from "@/lib/units";
import { IngredientSwatch } from "../IngredientSwatch";
import styles from "./builder.module.css";

/**
 * The batch as an arch-shaped jar of stacked layers. Layer height is the
 * ingredient's share by weight, so the picture is the recipe — no decoration.
 * Heaviest ingredient sits at the bottom; order is fixed so changes read as
 * layers growing or shrinking rather than reshuffling.
 */
export function RecipeJar({ rows, highlight, size = "md" }: { rows: ResolvedRow[]; highlight?: { key: string; n: number } | null; size?: "sm" | "md" }) {
  const order = [...rows].sort((a, b) => b.houseGrams - a.houseGrams || a.key.localeCompare(b.key));
  const visible = order.filter((r) => r.grams > 0);
  return (
    <figure className={styles.jar} data-size={size}>
      <div
        className={styles.jarGlass}
        role="img"
        aria-label={`Recipe by weight: ${visible.map((r) => `${ingredients[r.pick]?.name} ${formatShare(r.share)}`).join(", ")}`}
      >
        <div className={styles.jarFill}>
          {order.map((r) => (
            <span
              key={r.key}
              className={styles.layer}
              style={{ flexGrow: r.grams, flexBasis: 0 }}
              data-empty={r.grams === 0 || undefined}
              data-hit={highlight?.key === r.key || undefined}
              title={`${ingredients[r.pick]?.name} · ${formatShare(r.share)}`}
            >
              <IngredientSwatch key={highlight?.key === r.key ? highlight.n : undefined} id={r.pick} className={styles.layerFill} sizes="320px" />
            </span>
          ))}
        </div>
        <span className={styles.jarShine} aria-hidden="true" />
      </div>
      <span className={styles.jarLid} aria-hidden="true" />
    </figure>
  );
}
