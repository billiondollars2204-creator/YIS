/**
 * Batch customisation model. Pure and dependency-free so it can be unit-tested
 * with `node --test`.
 *
 * Rule: a batch can only be customised when the line's total weight
 * (pack size × quantity) is at least MIN_CUSTOM_GRAMS.
 */
export const MIN_CUSTOM_GRAMS = 500;

/** Only differences from the house recipe are stored. */
export type Customization = {
  levels: Record<string, number>;
  choices: Record<string, string>;
  note: string;
};

export type RecipeShape = {
  ingredients: { id: string; default: number }[];
  choices: { id: string; default: string }[];
};

export const EMPTY_CUSTOMIZATION: Customization = { levels: {}, choices: {}, note: "" };

export function lineGrams(packGrams: number, qty: number): number {
  return packGrams * qty;
}

export function canCustomize(packGrams: number, qty: number): boolean {
  return lineGrams(packGrams, qty) >= MIN_CUSTOM_GRAMS;
}

/** Smallest quantity of a pack size that unlocks customisation. */
export function minQtyForCustom(packGrams: number): number {
  return Math.max(1, Math.ceil(MIN_CUSTOM_GRAMS / packGrams));
}

/** Drops entries equal to the house recipe so equal batches compare equal. */
export function normalize(c: Customization, recipe: RecipeShape): Customization {
  const levels: Record<string, number> = {};
  for (const i of recipe.ingredients) {
    const v = c.levels[i.id];
    if (v !== undefined && v !== i.default) levels[i.id] = v;
  }
  const choices: Record<string, string> = {};
  for (const g of recipe.choices) {
    const v = c.choices[g.id];
    if (v !== undefined && v !== g.default) choices[g.id] = v;
  }
  return { levels, choices, note: c.note.trim() };
}

export function isCustomized(c: Customization | undefined | null): c is Customization {
  if (!c) return false;
  return Object.keys(c.levels).length > 0 || Object.keys(c.choices).length > 0 || c.note.trim() !== "";
}

/** Stable signature so identical customisations merge into one cart line. */
export function customizationSignature(c: Customization | undefined | null): string {
  if (!isCustomized(c)) return "std";
  const pairs = (o: Record<string, unknown>) =>
    Object.keys(o)
      .sort()
      .map((k) => `${k}=${o[k]}`)
      .join(",");
  return `l:${pairs(c.levels)}|c:${pairs(c.choices)}|n:${c.note.trim()}`;
}

/**
 * Surcharge per pack: each level above the house recipe costs the ingredient's
 * extraPrice per 500 g. Removing ingredients never changes the price.
 */
export function packSurcharge(c: Customization, recipe: RecipeShape, prices: Record<string, number>, packGrams: number): number {
  let per500 = 0;
  for (const i of recipe.ingredients) {
    const level = c.levels[i.id] ?? i.default;
    per500 += Math.max(0, level - i.default) * (prices[i.id] ?? 0);
  }
  return Math.round(per500 * (packGrams / 500));
}
