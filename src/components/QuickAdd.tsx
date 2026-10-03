"use client";

import { useEffect, useState } from "react";
import type { Product } from "@/data/products";
import { useCart, useCartUI } from "@/lib/cart";
import { track } from "@/lib/analytics";
import { CheckIcon } from "./icons";
import styles from "./QuickAdd.module.css";

/** Adds the smallest available pack, confirms in place, and opens the cart drawer. */
export function QuickAdd({ product }: { product: Product }) {
  const add = useCart((s) => s.add);
  const openCart = useCartUI((s) => s.setOpen);
  const [added, setAdded] = useState(false);
  const variant = product.variants.find((v) => v.stock !== "out_of_stock");

  useEffect(() => {
    if (!added) return;
    const t = setTimeout(() => setAdded(false), 2000);
    return () => clearTimeout(t);
  }, [added]);

  if (!variant) {
    return (
      <button type="button" className={`btn btn--outline btn--block btn--small ${styles.btn}`} disabled>
        Sold out
      </button>
    );
  }

  return (
    <button
      type="button"
      className={`btn btn--outline btn--block btn--small ${styles.btn}`}
      data-added={added || undefined}
      onClick={() => {
        add(product.slug, variant.id, 1);
        track("add_to_cart", { item_id: product.slug, variant: variant.id, quantity: 1, value: variant.price, currency: "INR", source: "quick_add" });
        setAdded(true);
        openCart(true);
      }}
    >
      {added ? (
        <>
          <CheckIcon className={styles.icon} /> Added
        </>
      ) : (
        <>Quick add · {variant.label}</>
      )}
      <span className="visually-hidden">, {product.name}</span>
    </button>
  );
}
