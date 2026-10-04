"use client";

import { useSyncExternalStore } from "react";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { getProduct, type Product, type Variant } from "@/data/products";
import { getFormula } from "@/data/formulations";
import { ingredientPrices } from "@/data/ingredients";
import { customizationSignature, isCustomized, minQtyForCustom, packSurcharge, type Customization } from "./customization";

export type CartLine = {
  key: string;
  slug: string;
  variantId: string;
  qty: number;
  customization?: Customization;
};

export type ResolvedLine = CartLine & {
  product: Product;
  variant: Variant;
  /** Custom-batch surcharge per pack, recomputed from the formulation. */
  unitExtra: number;
  unitPrice: number;
  lineTotal: number;
  minQty: number;
};

type CartState = {
  lines: CartLine[];
  add: (slug: string, variantId: string, qty: number, customization?: Customization) => void;
  /** Replaces an existing line (used when editing a custom batch). */
  replace: (oldKey: string, slug: string, variantId: string, qty: number, customization?: Customization) => void;
  setQty: (key: string, qty: number) => void;
  remove: (key: string) => void;
  clear: () => void;
};

export const MAX_QTY = 20;

export const useCartUI = create<{ open: boolean; setOpen: (open: boolean) => void }>()((set) => ({
  open: false,
  setOpen: (open) => set({ open }),
}));

const lineKey = (slug: string, variantId: string, c?: Customization) => `${slug}:${variantId}:${customizationSignature(c)}`;

function addTo(lines: CartLine[], slug: string, variantId: string, qty: number, customization?: Customization): CartLine[] {
  const custom = isCustomized(customization) ? customization : undefined;
  const key = lineKey(slug, variantId, custom);
  const existing = lines.find((l) => l.key === key);
  if (existing) return lines.map((l) => (l.key === key ? { ...l, qty: Math.min(MAX_QTY, l.qty + qty) } : l));
  return [...lines, { key, slug, variantId, qty: Math.min(MAX_QTY, qty), customization: custom }];
}

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      lines: [],
      add: (slug, variantId, qty, customization) => set((s) => ({ lines: addTo(s.lines, slug, variantId, qty, customization) })),
      replace: (oldKey, slug, variantId, qty, customization) =>
        set((s) => {
          const index = s.lines.findIndex((l) => l.key === oldKey);
          const rest = s.lines.filter((l) => l.key !== oldKey);
          const next = addTo(rest, slug, variantId, 0, customization);
          const key = lineKey(slug, variantId, isCustomized(customization) ? customization : undefined);
          // Keep the edited line in its original position, with the chosen quantity.
          const updated = next.map((l) => (l.key === key ? { ...l, qty: Math.min(MAX_QTY, l.qty + qty) } : l));
          if (index < 0) return { lines: updated };
          const moved = updated.find((l) => l.key === key)!;
          const without = updated.filter((l) => l.key !== key);
          without.splice(Math.min(index, without.length), 0, moved);
          return { lines: without };
        }),
      setQty: (key, qty) => set((s) => ({ lines: s.lines.map((l) => (l.key === key ? { ...l, qty: Math.max(1, Math.min(MAX_QTY, qty)) } : l)) })),
      remove: (key) => set((s) => ({ lines: s.lines.filter((l) => l.key !== key) })),
      clear: () => set({ lines: [] }),
    }),
    // v3: formulation-based customisation; older carts are discarded.
    { name: "iw-cart-v3" },
  ),
);

export function resolveLines(lines: CartLine[]): ResolvedLine[] {
  return lines.flatMap((l) => {
    const product = getProduct(l.slug);
    const variant = product?.variants.find((v) => v.id === l.variantId);
    if (!product || !variant) return [];
    const formula = l.customization ? getFormula(l.slug) : undefined;
    // A custom line for a product that is no longer customisable is dropped rather than mispriced.
    if (l.customization && !formula) return [];
    const unitExtra = formula && l.customization ? packSurcharge(formula, l.customization, ingredientPrices, variant.grams) : 0;
    const unitPrice = variant.price + unitExtra;
    const minQty = l.customization ? minQtyForCustom(variant.grams) : 1;
    return [{ ...l, product, variant, unitExtra, unitPrice, lineTotal: unitPrice * l.qty, minQty }];
  });
}

const noop = () => () => {};
/** True only after hydration, so persisted cart data never causes SSR mismatches. */
export function useHydrated(): boolean {
  return useSyncExternalStore(noop, () => true, () => false);
}
