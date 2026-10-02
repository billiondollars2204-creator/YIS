"use client";

import Link from "next/link";
import { useEffect, useId, useState } from "react";
import { stockLabel, type Product } from "@/data/products";
import { formatINR } from "@/lib/money";
import { useCart, MAX_QTY } from "@/lib/cart";
import { track } from "@/lib/analytics";
import {
  canCustomize,
  EMPTY_CUSTOMIZATION,
  isCustomized,
  lineGrams,
  MIN_CUSTOM_GRAMS,
  minQtyForCustom,
  type Customization,
} from "@/lib/customization";
import styles from "./ProductPurchase.module.css";

// Options that cannot be chosen together (add ↔ leave out).
const CONFLICTS: Record<string, string> = {
  "extra-nuts": "no-nuts",
  "no-nuts": "extra-nuts",
  "dried-fruit": "no-dried-fruit",
  "no-dried-fruit": "dried-fruit",
};

export function ProductPurchase({ product }: { product: Product }) {
  const uid = useId();
  const add = useCart((s) => s.add);
  const firstAvailable = product.variants.find((v) => v.stock !== "out_of_stock") ?? product.variants[0];
  const [variantId, setVariantId] = useState(firstAvailable.id);
  const [qty, setQty] = useState(1);
  const [customOpen, setCustomOpen] = useState(false);
  const [custom, setCustom] = useState<Customization>(EMPTY_CUSTOMIZATION);
  const [added, setAdded] = useState<string | null>(null);

  const variant = product.variants.find((v) => v.id === variantId) ?? firstAvailable;
  const soldOut = variant.stock === "out_of_stock";
  const grams = lineGrams(variant.grams, qty);
  const unlocked = canCustomize(variant.grams, qty);
  const willCustomize = product.customizable && unlocked && isCustomized(custom);
  const bigger = product.variants.find((v) => v.grams >= MIN_CUSTOM_GRAMS && v.stock !== "out_of_stock");

  useEffect(() => {
    track("view_item", { item_id: product.slug, item_name: product.name, item_category: product.category });
  }, [product.slug, product.name, product.category]);

  useEffect(() => {
    if (!added) return;
    const t = setTimeout(() => setAdded(null), 6000);
    return () => clearTimeout(t);
  }, [added]);

  function chooseVariant(id: string) {
    setVariantId(id);
    track("select_variant", { item_id: product.slug, variant: id });
  }

  function toggle(kind: "add" | "remove", id: string) {
    setCustom((c) => {
      const list = c[kind].includes(id) ? c[kind].filter((x) => x !== id) : [...c[kind], id];
      return { ...c, [kind]: list };
    });
    track("customize_change", { item_id: product.slug, option: id });
  }

  function isBlocked(id: string) {
    const other = CONFLICTS[id];
    return !!other && (custom.add.includes(other) || custom.remove.includes(other));
  }

  function onAdd() {
    if (soldOut) return;
    add(product.slug, variant.id, qty, willCustomize ? custom : undefined);
    track("add_to_cart", {
      item_id: product.slug,
      variant: variant.id,
      quantity: qty,
      value: variant.price * qty,
      currency: "INR",
      customized: willCustomize,
    });
    setAdded(`${qty} × ${product.name} (${variant.label})${willCustomize ? ", customised" : ""}`);
  }

  return (
    <div className={styles.panel}>
      <p className={styles.price} aria-live="polite">
        <span className="visually-hidden">Price: </span>
        {formatINR(variant.price)}
        <span className={styles.per}> / {variant.label}</span>
        <span className={styles.priceNote}>Placeholder price · incl. taxes (TBC)</span>
      </p>

      <fieldset className={styles.group}>
        <legend className="legend">Pack size</legend>
        <div className={styles.chips}>
          {product.variants.map((v) => (
            <label key={v.id} className="choice">
              <input
                type="radio"
                name={`${uid}-variant`}
                value={v.id}
                checked={v.id === variantId}
                onChange={() => chooseVariant(v.id)}
                disabled={v.stock === "out_of_stock"}
                aria-describedby={`${uid}-stock-${v.id}`}
              />
              <span>
                {v.label}
                <small className={styles.chipPrice}>{formatINR(v.price)}</small>
              </span>
              <span id={`${uid}-stock-${v.id}`} className="visually-hidden">
                {stockLabel[v.stock]}
              </span>
            </label>
          ))}
        </div>
        <p className={styles.stock} data-stock={variant.stock}>
          <span className={styles.dot} aria-hidden="true" />
          {stockLabel[variant.stock]}
          <span className={styles.stockNote}> · stock shown is placeholder data</span>
        </p>
      </fieldset>

      <div className={styles.group}>
        <label htmlFor={`${uid}-qty`} className="legend">
          Quantity
        </label>
        <div className={styles.stepper}>
          <button type="button" onClick={() => setQty((q) => Math.max(1, q - 1))} disabled={qty <= 1} aria-label="Decrease quantity">
            −
          </button>
          <input
            id={`${uid}-qty`}
            type="number"
            inputMode="numeric"
            min={1}
            max={MAX_QTY}
            value={qty}
            onChange={(e) => setQty(Math.max(1, Math.min(MAX_QTY, Number(e.target.value) || 1)))}
          />
          <button type="button" onClick={() => setQty((q) => Math.min(MAX_QTY, q + 1))} disabled={qty >= MAX_QTY} aria-label="Increase quantity">
            +
          </button>
          <span className={styles.total}>
            {grams >= 1000 ? `${grams / 1000} kg` : `${grams} g`} in total
          </span>
        </div>
      </div>

      {product.customizable && product.custom && (
        <section className={styles.custom} aria-labelledby={`${uid}-custom-title`}>
          <button
            type="button"
            className={styles.customToggle}
            aria-expanded={customOpen}
            aria-controls={`${uid}-custom-body`}
            onClick={() => setCustomOpen((o) => !o)}
          >
            <span id={`${uid}-custom-title`} className={styles.customTitle}>
              Customise this batch
            </span>
            <span className={styles.customSub}>From {MIN_CUSTOM_GRAMS} g · made to order</span>
            <span className={styles.chev} aria-hidden="true" />
          </button>

          <div id={`${uid}-custom-body`} hidden={!customOpen} className={styles.customBody}>
            <div className={styles.gate} data-unlocked={unlocked || undefined} role="status" aria-live="polite">
              {unlocked ? (
                <p>
                  <strong>Unlocked.</strong> Your {grams >= 1000 ? `${grams / 1000} kg` : `${grams} g`} will be cooked as its own batch.
                </p>
              ) : (
                <>
                  <p>
                    <strong>Custom batches start at {MIN_CUSTOM_GRAMS} g.</strong> You’ve chosen {variant.label} × {qty} = {grams} g. Each custom
                    order is cooked separately, and smaller amounts don’t roast evenly.
                  </p>
                  <div className={styles.gateActions}>
                    {bigger && bigger.id !== variant.id && (
                      <button type="button" className="btn btn--ghost btn--small" onClick={() => chooseVariant(bigger.id)}>
                        Switch to {bigger.label}
                      </button>
                    )}
                    <button
                      type="button"
                      className="btn btn--ghost btn--small"
                      onClick={() => setQty(Math.min(MAX_QTY, minQtyForCustom(variant.grams)))}
                    >
                      Make it {minQtyForCustom(variant.grams)} × {variant.label}
                    </button>
                  </div>
                </>
              )}
            </div>

            <fieldset disabled={!unlocked} className={styles.customFields} aria-describedby={`${uid}-custom-note`}>
              <legend className="visually-hidden">Customisation options</legend>
              <fieldset className={styles.subgroup}>
                <legend className="legend">Add more of</legend>
                <div className={styles.chips}>
                  {product.custom.addable.map((o) => (
                    <label key={o.id} className="choice" title={o.hint}>
                      <input type="checkbox" checked={custom.add.includes(o.id)} disabled={isBlocked(o.id)} onChange={() => toggle("add", o.id)} />
                      <span>+ {o.label}</span>
                    </label>
                  ))}
                </div>
              </fieldset>
              <fieldset className={styles.subgroup}>
                <legend className="legend">Leave out</legend>
                <div className={styles.chips}>
                  {product.custom.removable.map((o) => (
                    <label key={o.id} className="choice" title={o.hint}>
                      <input type="checkbox" checked={custom.remove.includes(o.id)} disabled={isBlocked(o.id)} onChange={() => toggle("remove", o.id)} />
                      <span>− {o.label}</span>
                    </label>
                  ))}
                </div>
              </fieldset>
              <fieldset className={styles.subgroup}>
                <legend className="legend">Sweetness</legend>
                <div className={styles.chips}>
                  {(["regular", "lighter"] as const).map((s) => (
                    <label key={s} className="choice">
                      <input
                        type="radio"
                        name={`${uid}-sweet`}
                        checked={custom.sweetness === s}
                        onChange={() => setCustom((c) => ({ ...c, sweetness: s }))}
                      />
                      <span>{s === "regular" ? "As usual" : "Lighter"}</span>
                    </label>
                  ))}
                </div>
              </fieldset>
              <div className="field">
                <label htmlFor={`${uid}-note`}>Note for the kitchen (optional)</label>
                <textarea
                  id={`${uid}-note`}
                  className="textarea"
                  maxLength={200}
                  rows={2}
                  value={custom.note}
                  onChange={(e) => setCustom((c) => ({ ...c, note: e.target.value }))}
                  placeholder="e.g. It’s for my mother — she likes it less sweet."
                />
              </div>
            </fieldset>
            <p id={`${uid}-custom-note`} className={styles.customNote}>
              Options shown are placeholders until the kitchen confirms the final list. For allergies, please{" "}
              <Link href="/contact" className="link">
                talk to us
              </Link>{" "}
              before ordering.
              {!unlocked && isCustomized(custom) && " Your choices are kept and will apply once you reach 500 g."}
            </p>
          </div>
        </section>
      )}

      <button type="button" className={`btn btn--block ${styles.addBtn}`} onClick={onAdd} disabled={soldOut}>
        {soldOut ? "Sold out" : willCustomize ? "Add custom batch to cart" : "Add to cart"}
        {!soldOut && <span className={styles.addPrice}>{formatINR(variant.price * qty)}</span>}
      </button>

      <div className={styles.addedRegion} role="status" aria-live="polite">
        {added && (
          <p className={styles.added}>
            <span className={styles.tick} aria-hidden="true">
              ✓
            </span>
            Added {added}.{" "}
            <Link href="/cart" className="link">
              View cart
            </Link>
          </p>
        )}
      </div>
    </div>
  );
}
