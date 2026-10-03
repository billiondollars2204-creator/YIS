"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { stockLabel, type Product } from "@/data/products";
import { formatINR } from "@/lib/money";
import { useCart, useCartUI, MAX_QTY } from "@/lib/cart";
import { track } from "@/lib/analytics";
import { lineGrams } from "@/lib/customization";
import { DeliveryCheck } from "./DeliveryCheck";
import { CheckIcon, MinusIcon, PlusIcon } from "./icons";
import styles from "./ProductPurchase.module.css";

const fmtGrams = (g: number) => (g >= 1000 ? `${g / 1000} kg` : `${g} g`);

export function ProductPurchase({ product }: { product: Product }) {
  const uid = useId();
  const router = useRouter();
  const add = useCart((s) => s.add);
  const openCart = useCartUI((s) => s.setOpen);
  const firstAvailable = product.variants.find((v) => v.stock !== "out_of_stock") ?? product.variants[0];
  const [variantId, setVariantId] = useState(firstAvailable.id);
  const [qty, setQty] = useState(1);
  const [status, setStatus] = useState("");
  const [added, setAdded] = useState(false);
  const [showBar, setShowBar] = useState(false);
  const actionsRef = useRef<HTMLDivElement>(null);

  const variant = product.variants.find((v) => v.id === variantId) ?? firstAvailable;
  const soldOut = variant.stock === "out_of_stock";
  const grams = lineGrams(variant.grams, qty);

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

  function addToCart(): boolean {
    if (soldOut) return false;
    add(product.slug, variant.id, qty);
    track("add_to_cart", { item_id: product.slug, variant: variant.id, quantity: qty, value: variant.price * qty, currency: "INR" });
    setStatus(`Added ${qty} × ${product.name} (${variant.label}) to your cart.`);
    setAdded(true);
    setTimeout(() => setAdded(false), 2200);
    return true;
  }

  const addLabel = soldOut ? "Sold out" : "Add to cart";

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
        <button type="button" className={`btn btn--lg ${styles.add}`} data-added={added || undefined} disabled={soldOut} onClick={() => addToCart() && openCart(true)}>
          {added ? (
            <>
              <CheckIcon className={styles.addIcon} /> Added
            </>
          ) : (
            <>
              {addLabel}
              {!soldOut && <span className={styles.addPrice}>· {formatINR(variant.price * qty)}</span>}
            </>
          )}
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
