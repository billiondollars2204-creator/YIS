"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { stockLabel, type Product } from "@/data/products";
import { FREE_SHIPPING_THRESHOLD, formatINR, SHIPPING_OPTIONS } from "@/lib/money";
import { useCart, useCartUI, MAX_QTY } from "@/lib/cart";
import { per100g } from "@/lib/units";
import { track } from "@/lib/analytics";
import { CheckIcon, MinusIcon, PlusIcon, ReturnIcon, TruckIcon } from "./icons";
import styles from "./ProductPurchase.module.css";

export function ProductPurchase({ product }: { product: Product }) {
  const uid = useId();
  const router = useRouter();
  const add = useCart((s) => s.add);
  const openCart = useCartUI((s) => s.setOpen);
  const firstAvailable = product.variants.find((v) => v.stock !== "out_of_stock") ?? product.variants[0];
  const [variantId, setVariantId] = useState(firstAvailable.id);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [status, setStatus] = useState("");
  const [showBar, setShowBar] = useState(false);
  const actionsRef = useRef<HTMLDivElement>(null);

  const variant = product.variants.find((v) => v.id === variantId) ?? firstAvailable;
  const soldOut = variant.stock === "out_of_stock";
  const subtotal = variant.price * qty;
  const toFree = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);

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

  useEffect(() => {
    if (!added) return;
    const t = setTimeout(() => setAdded(false), 2200);
    return () => clearTimeout(t);
  }, [added]);

  function choose(id: string) {
    setVariantId(id);
    track("select_variant", { item_id: product.slug, variant: id });
  }

  function addToCart(): boolean {
    if (soldOut) return false;
    add(product.slug, variant.id, qty);
    track("add_to_cart", { item_id: product.slug, variant: variant.id, quantity: qty, value: subtotal, currency: "INR" });
    setStatus(`Added ${qty} × ${product.name}, ${variant.label}, to your cart.`);
    setAdded(true);
    return true;
  }

  const addButton = (extra = "") => (
    <button
      type="button"
      className={`btn btn--lg ${added ? "btn--success" : ""} ${extra}`}
      disabled={soldOut}
      onClick={() => addToCart() && setTimeout(() => openCart(true), 350)}
    >
      {added ? (
        <>
          <CheckIcon /> Added to cart
        </>
      ) : soldOut ? (
        "Sold out"
      ) : (
        <>
          Add to cart <span className={`${styles.btnPrice} num`}>{formatINR(subtotal)}</span>
        </>
      )}
    </button>
  );

  return (
    <div className={styles.panel}>
      <div className={styles.priceRow}>
        <p className={`${styles.price} num`}>
          <span className="visually-hidden">Price: </span>
          {formatINR(variant.price)}
        </p>
        <p className={styles.unit}>
          <span className="num">{formatINR(per100g(variant.price, variant.grams))}</span> per 100 g · taxes included
        </p>
      </div>

      <fieldset className={styles.group}>
        <legend className={styles.legend}>
          Pack size <span>{variant.label}</span>
        </legend>
        <div className={styles.sizes}>
          {product.variants.map((v) => (
            <label key={v.id} className="option">
              <input type="radio" name={`${uid}-size`} value={v.id} checked={v.id === variantId} onChange={() => choose(v.id)} disabled={v.stock === "out_of_stock"} />
              <span className={styles.size}>
                <strong>{v.label}</strong>
                <span className="num">{v.stock === "out_of_stock" ? "Sold out" : formatINR(v.price)}</span>
                {v.stock !== "out_of_stock" && <small className="num">{formatINR(per100g(v.price, v.grams))}/100 g</small>}
              </span>
            </label>
          ))}
        </div>
        <p className={styles.stock} data-stock={variant.stock}>
          <span className={styles.dot} aria-hidden="true" />
          {stockLabel[variant.stock]}
          {variant.stock !== "out_of_stock" && <span className={styles.stockNote}>· Dispatched in 1–2 working days (placeholder)</span>}
        </p>
      </fieldset>

      <div className={styles.actions} ref={actionsRef}>
        <div className="stepper" role="group" aria-label="Quantity">
          <button type="button" onClick={() => setQty((q) => Math.max(1, q - 1))} disabled={qty <= 1} aria-label="Decrease quantity">
            <MinusIcon />
          </button>
          <output aria-live="polite" aria-label="Quantity">
            {qty}
          </output>
          <button type="button" onClick={() => setQty((q) => Math.min(MAX_QTY, q + 1))} disabled={qty >= MAX_QTY} aria-label="Increase quantity">
            <PlusIcon />
          </button>
        </div>
        {addButton(styles.add)}
        {!soldOut && (
          <button type="button" className={`btn btn--secondary btn--lg ${styles.buy}`} onClick={() => addToCart() && router.push("/checkout")}>
            Buy now
          </button>
        )}
      </div>

      {!soldOut && (
        <ul className={styles.assure}>
          <li>
            <TruckIcon />
            <span>
              {toFree > 0 ? (
                <>
                  Order total <span className="num">{formatINR(subtotal)}</span> + delivery from {formatINR(SHIPPING_OPTIONS[0].price)}. Add{" "}
                  <span className="num">{formatINR(toFree)}</span> more for free delivery.
                </>
              ) : (
                <>
                  Order total <span className="num">{formatINR(subtotal)}</span> with free standard delivery.
                </>
              )}
            </span>
          </li>
          <li>
            <ReturnIcon />
            <span>
              Damaged or wrong order? We replace it.{" "}
              <Link href="/shipping-returns" className="link">
                Returns policy
              </Link>
            </span>
          </li>
        </ul>
      )}

      <div className="visually-hidden" role="status" aria-live="polite">
        {status}
      </div>

      <div className={styles.bar} data-show={(showBar && !soldOut) || undefined} aria-hidden={!showBar}>
        <div className={`wrap ${styles.barInner}`}>
          <span className={styles.barName}>
            {product.name} <span>· {variant.label}</span>
          </span>
          <button type="button" className={`btn ${added ? "btn--success" : ""}`} tabIndex={showBar ? 0 : -1} onClick={() => addToCart() && setTimeout(() => openCart(true), 350)}>
            {added ? "Added" : `Add to cart · ${formatINR(subtotal)}`}
          </button>
        </div>
      </div>
    </div>
  );
}
