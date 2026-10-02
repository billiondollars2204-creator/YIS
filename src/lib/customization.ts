/**
 * Customization rule: a batch can only be customized when the line's total
 * weight (pack size × quantity) is at least MIN_CUSTOM_GRAMS.
 * Kept dependency-free so it can be unit-tested with `node --test`.
 */
export const MIN_CUSTOM_GRAMS = 500;

export type Customization = {
  /** Option ids the customer added (see product.customOptions). */
  add: string[];
  /** Option ids the customer asked to leave out. */
  remove: string[];
  sweetness: "regular" | "lighter";
  note: string;
};

export const EMPTY_CUSTOMIZATION: Customization = {
  add: [],
  remove: [],
  sweetness: "regular",
  note: "",
};

export function lineGrams(packGrams: number, qty: number): number {
  return packGrams * qty;
}

export function canCustomize(packGrams: number, qty: number): boolean {
  return lineGrams(packGrams, qty) >= MIN_CUSTOM_GRAMS;
}

/** Smallest quantity of a pack size that unlocks customization. */
export function minQtyForCustom(packGrams: number): number {
  return Math.max(1, Math.ceil(MIN_CUSTOM_GRAMS / packGrams));
}

export function isCustomized(c: Customization | undefined | null): c is Customization {
  if (!c) return false;
  return c.add.length > 0 || c.remove.length > 0 || c.sweetness !== "regular" || c.note.trim() !== "";
}

/** Stable signature so identical customizations merge into one cart line. */
export function customizationSignature(c: Customization | undefined | null): string {
  if (!isCustomized(c)) return "std";
  return [
    "a:" + [...c.add].sort().join(","),
    "r:" + [...c.remove].sort().join(","),
    "s:" + c.sweetness,
    "n:" + c.note.trim(),
  ].join("|");
}
