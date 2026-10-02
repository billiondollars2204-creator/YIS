"use client";

import Link from "next/link";
import { useEffect } from "react";
import { resolveLines, useCart, useHydrated } from "@/lib/cart";
import { shippingCost } from "@/lib/money";
import { track } from "@/lib/analytics";
import { products } from "@/data/products";
import { OrderSummary } from "@/components/OrderSummary";
import { CartLines } from "@/components/CartLines";
import { FreeShippingBar } from "@/components/FreeShippingBar";
import { ProductCard } from "@/components/ProductCard";
import styles from "./cart.module.css";

export function CartView() {
  const hydrated = useHydrated();
  const raw = useCart((s) => s.lines);
  const lines = hydrated ? resolveLines(raw) : [];
  const subtotal = lines.reduce((n, l) => n + l.lineTotal, 0);
  const shipping = shippingCost(subtotal, "standard");
  const inCart = new Set(lines.map((l) => l.slug));
  const suggestions = products.filter((p) => p.featured && !inCart.has(p.slug)).slice(0, 4);

  useEffect(() => {
    if (hydrated) track("view_cart", { value: subtotal, currency: "INR" });
    // Once per visit, not on every quantity change.
  }, [hydrated]);

  return (
    <div className={`wrap ${styles.page}`}>
      <h1 className={styles.title}>Your cart</h1>

      {!hydrated ? (
        <p aria-busy="true">Loading your cart…</p>
      ) : lines.length === 0 ? (
        <div className={styles.empty}>
          <p>Your cart is empty.</p>
          <Link href="/shop" className="btn">
            Shop all products
          </Link>
        </div>
      ) : (
        <div className={styles.layout}>
          <section aria-labelledby="items-title">
            <h2 id="items-title" className="visually-hidden">
              Items
            </h2>
            <div className={styles.ship}>
              <FreeShippingBar subtotal={subtotal} />
            </div>
            <CartLines lines={lines} />
            <Link href="/shop" className={`arrow-link ${styles.back}`}>
              Continue shopping
            </Link>
          </section>
          <aside className={styles.aside}>
            <OrderSummary lines={lines} subtotal={subtotal} shipping={shipping} shippingLabel="Standard delivery (estimate)">
              <Link href="/checkout" className="btn btn--block btn--lg">
                Checkout
              </Link>
              <p className={styles.reassure}>Secure payment via our payment partner (placeholder).</p>
            </OrderSummary>
          </aside>
        </div>
      )}

      {hydrated && suggestions.length > 0 && (
        <section className={styles.suggest} aria-labelledby="suggest-title">
          <h2 id="suggest-title" className={styles.suggestTitle}>
            {lines.length ? "Add something else" : "Bestsellers"}
          </h2>
          <div className={styles.grid}>
            {suggestions.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
