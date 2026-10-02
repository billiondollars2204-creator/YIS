"use client";

import type { Product } from "@/data/products";
import { useCart, useCartUI } from "@/lib/cart";
import { track } from "@/lib/analytics";

/** Adds the smallest available pack and opens the cart drawer. */
export function QuickAdd({ product }: { product: Product }) {
  const add = useCart((s) => s.add);
  const openCart = useCartUI((s) => s.setOpen);
  const variant = product.variants.find((v) => v.stock !== "out_of_stock");

  if (!variant) {
    return (
      <button type="button" className="btn btn--outline btn--block btn--small" disabled>
        Sold out
      </button>
    );
  }

  return (
    <button
      type="button"
      className="btn btn--outline btn--block btn--small"
      onClick={() => {
        add(product.slug, variant.id, 1);
        track("add_to_cart", { item_id: product.slug, variant: variant.id, quantity: 1, value: variant.price, currency: "INR", source: "quick_add" });
        openCart(true);
      }}
    >
      Add to cart · {variant.label}
      <span className="visually-hidden">, {product.name}</span>
    </button>
  );
}
