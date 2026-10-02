"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { stockLabel, type Product } from "@/data/products";
import { formatINR } from "@/lib/money";
import { useCart, useCartUI, MAX_QTY } from "@/lib/cart";
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
import { DeliveryCheck } from "./DeliveryCheck";
import { MinusIcon, PlusIcon } from "./icons";
import styles from "./ProductPurchase.module.css";

// Options that cannot be chosen together (add ↔ leave out).
const CONFLICTS: Record<string, string> = {
  "extra-nuts": "no-nuts",
  "no-nuts": "extra-nuts",
  "dried-fruit": "no-dried-fruit",
  "no-dried-fruit": "dried-fruit",
};

const fmtGrams = (g: number) => (g >= 1000 ? `${g / 1000} kg` : `${g} g`);

export function ProductPurchase({ product }: { product: Product }) {
  const uid = useId();
  const router = useRouter();
  const add = useCart((s) => s.add);
  const openCart = useCartUI((s) => s.setOpen);
  const firstAvailable = product.variants.find((v) => v.stock !== "out_of_stock") ?? product.variants[0];
  const [variantId, setVariantId] = useState(firstAvailable.id);
  const [qty, setQty] = useState(1);
  const [customOpen, setCustomOpen] = useState(false);
  const [custom, setCustom] = useState<Customization>(EMPTY_CUSTOMIZATION);
  const [status, setStatus] = useState("");
  const [showBar, setShowBar] = useState(false);
  const actionsRef = useRef<HTMLDivElement>(null);

  const variant = product.variants.find((v) => v.id === variantId) ?? firstAvailable;
  const soldOut = variant.stock === "out_of_stock";
  const grams = lineGrams(variant.grams, qty);
  const unlocked = canCustomize(variant.grams, qty);
  const willCustomize = !!product.customizable && unlocked && isCustomized(custom);
  const bigger = product.variants.find((v) => v.grams >= MIN_CUSTOM_GRAMS && v.stock !== "out_of_stock");

  useEffect(() => {
    track("view_item", { item_id: product.slug, item_name: product.name, item_category: product.category });
  }, [product.slug, product.name, product.category]);

  // Sticky buy bar appears once the main buttons scroll out of view.
  useEffect(() => {
    const el = actionsRef.current;
    if (!el || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(([e]) => setShowBar(!e.isIntersecting && e.boundingClientRect.top < 0));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  function chooseVariant(id: string) {
    setVariantId(id);
    track("select_variant", { item_id: product.slug, variant: id });
  }

  function toggle(kind: "add" | "remove", id: string) {
    setCustom((c) => ({ ...c, [kind]: c[kind].includes(id) ? c[kind].filter((x) => x !== id) : [...c[kind], id] }));
    track("customize_change", { item_id: product.slug, option: id });
  }

  const isBlocked = (id: string) => {
    const other = CONFLICTS[id];
    return !!other && (custom.add.includes(other) || custom.remove.includes(other));
  };

  function addToCart(): boolean {
    if (soldOut) return false;
    add(product.slug, variant.id, qty, willCustomize ? custom : undefined);
    track("add_to_cart", { item_id: product.slug, variant: variant.id, quantity: qty, value: variant.price * qty, currency: "INR", customized: willCustomize });
    setStatus(`Added ${qty} × ${product.name} (${variant.label})${willCustomize ? ", customised" : ""} to your cart.`);
    return true;
  }

  const addLabel = soldOut ? "Sold out" : willCustomize ? "Add custom batch" : "Add to cart";

  return (
    <div className={styles.panel}>
      <p className={styles.price}>
        <span className="visually-hidden">Price: </span>
        {formatINR(variant.price)}
        <span className={styles.priceMeta}>{variant.label} · taxes included</span>
      </p>

      <fieldset className={styles.group}>
        <legend className={styles.legend}>
          Size: <span>{variant.label}</span>
        </legend>
        <div className={styles.sizes}>
          {product.variants.map((v) => (
            <label key={v.id} className={styles.size}>
              <input
                type="radio"
                name={`${uid}-variant`}
                value={v.id}
                checked={v.id === variantId}
                onChange={() => chooseVariant(v.id)}
                disabled={v.stock === "out_of_stock"}
              />
              <span>
                <strong>{v.label}</strong>
                <small>{v.stock === "out_of_stock" ? "Sold out" : formatINR(v.price)}</small>
              </span>
            </label>
          ))}
        </div>
        <p className={styles.stock} data-stock={variant.stock}>
          <span className={styles.dot} aria-hidden="true" />
          {stockLabel[variant.stock]}
          {variant.stock !== "out_of_stock" && <span className={styles.stockNote}> · ships in 2–3 days (placeholder)</span>}
        </p>
      </fieldset>

      {product.customizable && product.custom && (
        <section className={styles.custom} aria-labelledby={`${uid}-custom-title`}>
          <button
            type="button"
            className={styles.customToggle}
            aria-expanded={customOpen}
            aria-controls={`${uid}-custom-body`}
            onClick={() => setCustomOpen((o) => !o)}
          >
            <span>
              <span id={`${uid}-custom-title`} className={styles.customTitle}>
                Customise this batch
              </span>
              <span className={styles.customSub}>
                {isCustomized(custom) && unlocked ? "Your changes will be applied" : `Available from ${MIN_CUSTOM_GRAMS} g · made to order`}
              </span>
            </span>
            <span className={styles.plus} aria-hidden="true" />
          </button>

          <div id={`${uid}-custom-body`} hidden={!customOpen} className={styles.customBody}>
            <div className={styles.gate} data-unlocked={unlocked || undefined} role="status" aria-live="polite">
              {unlocked ? (
                <p>Unlocked — your {fmtGrams(grams)} will be cooked as its own batch.</p>
              ) : (
                <>
                  <p>
                    Custom batches start at {MIN_CUSTOM_GRAMS} g. You’ve chosen {variant.label} × {qty} = {grams} g. Each custom order is cooked separately, and
                    smaller amounts don’t roast evenly.
                  </p>
                  <div className={styles.gateActions}>
                    {bigger && bigger.id !== variant.id && (
                      <button type="button" className="btn btn--outline btn--small" onClick={() => chooseVariant(bigger.id)}>
                        Switch to {bigger.label}
                      </button>
                    )}
                    <button type="button" className="btn btn--outline btn--small" onClick={() => setQty(Math.min(MAX_QTY, minQtyForCustom(variant.grams)))}>
                      Make it {minQtyForCustom(variant.grams)} × {variant.label}
                    </button>
                  </div>
                </>
              )}
            </div>

            <fieldset disabled={!unlocked} className={styles.customFields} aria-describedby={`${uid}-custom-note`}>
              <legend className="visually-hidden">Customisation options</legend>
              <fieldset className={styles.subgroup}>
                <legend className={styles.legend}>Add more of</legend>
                <div className={styles.chips}>
                  {product.custom.addable.map((o) => (
                    <label key={o.id} className="choice" title={o.hint}>
                      <input type="checkbox" checked={custom.add.includes(o.id)} disabled={isBlocked(o.id)} onChange={() => toggle("add", o.id)} />
                      <span>{o.label}</span>
                    </label>
                  ))}
                </div>
              </fieldset>
              <fieldset className={styles.subgroup}>
                <legend className={styles.legend}>Leave out</legend>
                <div className={styles.chips}>
                  {product.custom.removable.map((o) => (
                    <label key={o.id} className="choice" title={o.hint}>
                      <input type="checkbox" checked={custom.remove.includes(o.id)} disabled={isBlocked(o.id)} onChange={() => toggle("remove", o.id)} />
                      <span>{o.label}</span>
                    </label>
                  ))}
                </div>
              </fieldset>
              <fieldset className={styles.subgroup}>
                <legend className={styles.legend}>Sweetness</legend>
                <div className={styles.chips}>
                  {(["regular", "lighter"] as const).map((s) => (
                    <label key={s} className="choice">
                      <input type="radio" name={`${uid}-sweet`} checked={custom.sweetness === s} onChange={() => setCustom((c) => ({ ...c, sweetness: s }))} />
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
              {!unlocked && isCustomized(custom) && " Your choices are saved and apply once you reach 500 g."}
            </p>
          </div>
        </section>
      )}

      <div className={styles.actions} ref={actionsRef}>
        <div className={styles.qty}>
          <button type="button" onClick={() => setQty((q) => Math.max(1, q - 1))} disabled={qty <= 1} aria-label="Decrease quantity">
            <MinusIcon />
          </button>
          <label htmlFor={`${uid}-qty`} className="visually-hidden">
            Quantity
          </label>
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
            <PlusIcon />
          </button>
        </div>
        <button type="button" className={`btn btn--lg ${styles.add}`} disabled={soldOut} onClick={() => addToCart() && openCart(true)}>
          {addLabel}
          {!soldOut && <span className={styles.addPrice}>· {formatINR(variant.price * qty)}</span>}
        </button>
        {!soldOut && (
          <button type="button" className={`btn btn--outline btn--lg ${styles.buyNow}`} onClick={() => addToCart() && router.push("/checkout")}>
            Buy it now
          </button>
        )}
      </div>
      <p className={styles.total}>{fmtGrams(grams)} in total</p>

      <div className="visually-hidden" role="status" aria-live="polite">
        {status}
      </div>

      <DeliveryCheck />

      <div className={styles.bar} data-show={(showBar && !soldOut) || undefined} aria-hidden={!showBar}>
        <div className={`wrap ${styles.barInner}`}>
          <span className={styles.barName}>
            {product.name} <span>· {variant.label}</span>
          </span>
          <button type="button" className="btn" tabIndex={showBar ? 0 : -1} onClick={() => addToCart() && openCart(true)}>
            {addLabel} · {formatINR(variant.price * qty)}
          </button>
        </div>
      </div>
    </div>
  );
}
