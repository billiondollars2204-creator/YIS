"use client";

import { useEffect, useState } from "react";
import type { Product } from "@/data/products";
import { useCart, useCartUI } from "@/lib/cart";
import { formatINR } from "@/lib/money";
import { track } from "@/lib/analytics";
import { CheckIcon, PlusIcon } from "./icons";
import styles from "./QuickAdd.module.css";

/** Adds the smallest available pack, confirms in place, then opens the cart drawer. */
export function QuickAdd({ product, className }: { product: Product; className?: string }) {
  const add = useCart((s) => s.add);
  const openCart = useCartUI((s) => s.setOpen);
  const [added, setAdded] = useState(false);
  const variant = product.variants.find((v) => v.stock !== "out_of_stock");

  useEffect(() => {
    if (!added) return;
    const t = setTimeout(() => setAdded(false), 1800);
    return () => clearTimeout(t);
  }, [added]);

  if (!variant) return null;

  return (
    <button
      type="button"
      className={`${styles.btn} ${className ?? ""}`}
      data-added={added || undefined}
      aria-label={added ? `Added ${product.name} to cart` : `Add ${variant.label} ${product.name} to cart, ${formatINR(variant.price)}`}
      onClick={() => {
        add(product.slug, variant.id, 1);
        track("add_to_cart", { item_id: product.slug, variant: variant.id, quantity: 1, value: variant.price, currency: "INR", source: "quick_add" });
        setAdded(true);
        setTimeout(() => openCart(true), 350);
      }}
    >
      {added ? <CheckIcon /> : <PlusIcon />}
      <span className={styles.label} aria-hidden="true">
        {added ? "Added" : `Add ${variant.label} · ${formatINR(variant.price)}`}
      </span>
    </button>
  );
}
