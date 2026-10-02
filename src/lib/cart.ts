"use client";

import { useSyncExternalStore } from "react";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { getProduct, type Product, type Variant } from "@/data/products";
import { customizationSignature, isCustomized, minQtyForCustom, type Customization } from "./customization";

export type CartLine = {
  key: string;
  slug: string;
  variantId: string;
  qty: number;
  customization?: Customization;
};

export type ResolvedLine = CartLine & { product: Product; variant: Variant; lineTotal: number; minQty: number };

type CartState = {
  lines: CartLine[];
  add: (slug: string, variantId: string, qty: number, customization?: Customization) => void;
  setQty: (key: string, qty: number) => void;
  remove: (key: string) => void;
  clear: () => void;
};

export const MAX_QTY = 20;

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      lines: [],
      add: (slug, variantId, qty, customization) =>
        set((s) => {
          const custom = isCustomized(customization) ? customization : undefined;
          const key = `${slug}:${variantId}:${customizationSignature(custom)}`;
          const existing = s.lines.find((l) => l.key === key);
          if (existing) {
            return {
              lines: s.lines.map((l) => (l.key === key ? { ...l, qty: Math.min(MAX_QTY, l.qty + qty) } : l)),
            };
          }
          return { lines: [...s.lines, { key, slug, variantId, qty: Math.min(MAX_QTY, qty), customization: custom }] };
        }),
      setQty: (key, qty) =>
        set((s) => ({ lines: s.lines.map((l) => (l.key === key ? { ...l, qty: Math.max(1, Math.min(MAX_QTY, qty)) } : l)) })),
      remove: (key) => set((s) => ({ lines: s.lines.filter((l) => l.key !== key) })),
      clear: () => set({ lines: [] }),
    }),
    { name: "iw-cart-v1" },
  ),
);

export function resolveLines(lines: CartLine[]): ResolvedLine[] {
  return lines.flatMap((l) => {
    const product = getProduct(l.slug);
    const variant = product?.variants.find((v) => v.id === l.variantId);
    if (!product || !variant) return [];
    // Customized lines must stay at or above the 500 g rule.
    const minQty = l.customization ? minQtyForCustom(variant.grams) : 1;
    return [{ ...l, product, variant, lineTotal: variant.price * l.qty, minQty }];
  });
}

const noop = () => () => {};
/** True only after hydration, so persisted cart data never causes SSR mismatches. */
export function useHydrated(): boolean {
  return useSyncExternalStore(noop, () => true, () => false);
}
