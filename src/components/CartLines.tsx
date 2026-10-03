"use client";

import Link from "next/link";
import { productImages } from "@/data/images";
import { useCart, MAX_QTY, type ResolvedLine } from "@/lib/cart";
import { formatINR } from "@/lib/money";
import { track } from "@/lib/analytics";
import { customSummary } from "./CustomSummary";
import { SmartImage } from "./SmartImage";
import { MinusIcon, PlusIcon } from "./icons";
import styles from "./CartLines.module.css";

export function CartLines({ lines, onNavigate }: { lines: ResolvedLine[]; onNavigate?: () => void }) {
  const setQty = useCart((s) => s.setQty);
  const remove = useCart((s) => s.remove);

  return (
    <ul className={styles.lines}>
      {lines.map((l) => {
        const href = `/shop/${l.product.slug}`;
        return (
          <li key={l.key} className={styles.line}>
            <Link href={href} className={styles.thumb} tabIndex={-1} aria-hidden="true" onClick={onNavigate}>
              <SmartImage image={productImages(l.product)[0]} sizes="96px" ratio="4 / 5" decorative />
            </Link>
            <div className={styles.info}>
              <div className={styles.top}>
                <h3 className={styles.name}>
                  <Link href={href} onClick={onNavigate}>
                    {l.product.name}
                  </Link>
                </h3>
                <p className={styles.total}>{formatINR(l.lineTotal)}</p>
              </div>
              <p className={styles.meta}>
                {l.variant.label} · {formatINR(l.unitPrice)} each
              </p>
              {l.customization && (
                <p className={styles.custom}>
                  <span className={styles.tag}>Custom batch</span> {customSummary(l.product, l.customization)}
                </p>
              )}
              <div className={styles.controls}>
                <div className={styles.qty} role="group" aria-label={`Quantity for ${l.product.name}`}>
                  <button type="button" onClick={() => setQty(l.key, l.qty - 1)} disabled={l.qty <= l.minQty} aria-label={`Decrease quantity of ${l.product.name}`}>
                    <MinusIcon />
                  </button>
                  <output aria-live="polite">{l.qty}</output>
                  <button type="button" onClick={() => setQty(l.key, l.qty + 1)} disabled={l.qty >= MAX_QTY} aria-label={`Increase quantity of ${l.product.name}`}>
                    <PlusIcon />
                  </button>
                </div>
                <button
                  type="button"
                  className={styles.remove}
                  onClick={() => {
                    remove(l.key);
                    track("remove_from_cart", { item_id: l.slug, variant: l.variantId });
                  }}
                >
                  Remove<span className="visually-hidden"> {l.product.name}</span>
                </button>
              </div>
              {l.customization && l.minQty > 1 && l.qty <= l.minQty && (
                <p className={styles.hint}>Custom batches need at least 500 g, so this can’t go lower.</p>
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
}
