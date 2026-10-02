"use client";

import Link from "next/link";
import { useEffect } from "react";
import { resolveLines, useCart, useHydrated, MAX_QTY } from "@/lib/cart";
import { FREE_SHIPPING_THRESHOLD, formatINR, shippingCost } from "@/lib/money";
import { track } from "@/lib/analytics";
import { ProductArt } from "@/components/art/ProductArt";
import { OrderSummary } from "@/components/OrderSummary";
import { customSummary } from "@/components/CustomSummary";
import styles from "./cart.module.css";

export function CartView() {
  const hydrated = useHydrated();
  const raw = useCart((s) => s.lines);
  const setQty = useCart((s) => s.setQty);
  const remove = useCart((s) => s.remove);
  const lines = hydrated ? resolveLines(raw) : [];
  const subtotal = lines.reduce((n, l) => n + l.lineTotal, 0);
  const shipping = shippingCost(subtotal, "standard");
  const toFree = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);

  useEffect(() => {
    if (hydrated) track("view_cart", { value: subtotal, currency: "INR" });
    // Fire once per cart visit, not on every quantity change.
  }, [hydrated]);

  if (!hydrated) {
    return (
      <div className={`wrap ${styles.page}`}>
        <h1>Your cart</h1>
        <p aria-busy="true">Loading your cart…</p>
      </div>
    );
  }

  if (lines.length === 0) {
    return (
      <div className={`wrap ${styles.empty}`}>
        <div className={styles.emptyArt} aria-hidden="true">
          <ProductArt kind="panjiri" variant={2} />
        </div>
        <h1>Your cart is empty</h1>
        <p className="lede">The kadhai is warm, though. Have a look at what’s cooking this week.</p>
        <Link href="/shop" className="btn">
          Browse the pantry
        </Link>
      </div>
    );
  }

  return (
    <div className={`wrap ${styles.page}`}>
      <h1>Your cart</h1>
      <div className={styles.layout}>
        <section aria-label="Items in your cart">
          <ul className={styles.lines}>
            {lines.map((l) => (
              <li key={l.key} className={styles.line}>
                <div className={styles.lineArt} aria-hidden="true">
                  <ProductArt kind={l.product.art} variant={l.product.slug.length} />
                </div>
                <div className={styles.lineInfo}>
                  <h2 className={styles.lineName}>
                    <Link href={`/shop/${l.product.slug}`}>{l.product.name}</Link>
                  </h2>
                  <p className={styles.lineMeta}>
                    {l.variant.label} · {formatINR(l.variant.price)} each
                  </p>
                  {l.customization && (
                    <p className={styles.custom}>
                      <span className={styles.customTag}>Custom batch</span> {customSummary(l.product, l.customization)}
                    </p>
                  )}
                  <div className={styles.lineControls}>
                    <div className={styles.qty} role="group" aria-label={`Quantity for ${l.product.name}`}>
                      <button
                        type="button"
                        onClick={() => setQty(l.key, l.qty - 1)}
                        disabled={l.qty <= l.minQty}
                        aria-label={`Decrease quantity of ${l.product.name}`}
                      >
                        −
                      </button>
                      <output aria-live="polite">{l.qty}</output>
                      <button
                        type="button"
                        onClick={() => setQty(l.key, l.qty + 1)}
                        disabled={l.qty >= MAX_QTY}
                        aria-label={`Increase quantity of ${l.product.name}`}
                      >
                        +
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
                  {l.customization && l.qty <= l.minQty && l.minQty > 1 && (
                    <p className={styles.hint}>Custom batches need at least 500 g, so this can’t go lower.</p>
                  )}
                </div>
                <p className={styles.lineTotal}>{formatINR(l.lineTotal)}</p>
              </li>
            ))}
          </ul>
          <Link href="/shop" className="arrow-link">
            <span aria-hidden="true">←</span> Keep shopping
          </Link>
        </section>

        <aside className={styles.aside}>
          <OrderSummary lines={lines} subtotal={subtotal} shipping={shipping} shippingLabel="Standard delivery (estimate)">
            <div className={styles.freeShip}>
              <p>
                {toFree > 0 ? (
                  <>
                    Add <strong>{formatINR(toFree)}</strong> more for free standard delivery.
                  </>
                ) : (
                  <>You’ve unlocked free standard delivery.</>
                )}
              </p>
              <div
                className={styles.bar}
                role="progressbar"
                aria-label="Progress to free delivery"
                aria-valuemin={0}
                aria-valuemax={FREE_SHIPPING_THRESHOLD}
                aria-valuenow={Math.min(subtotal, FREE_SHIPPING_THRESHOLD)}
              >
                <span style={{ width: `${Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100)}%` }} />
              </div>
            </div>
            <Link href="/checkout" className="btn btn--block">
              Go to checkout
            </Link>
            <p className={styles.reassure}>Secure payment via our payment partner (placeholder). You can review everything before paying.</p>
          </OrderSummary>
        </aside>
      </div>
    </div>
  );
}
