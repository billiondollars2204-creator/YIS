import type { Product } from "@/data/products";
import { ingredients, LEVELS, recipes, type GlyphKind } from "@/data/ingredients";
import type { Customization } from "@/lib/customization";

/** One-line, human summary of a cart line's customisation. */
export function customSummary(product: Product, c: Customization): string {
  const recipe = recipes[product.slug];
  const parts = [
    ...Object.entries(c.levels).map(([id, l]) => `${ingredients[id as GlyphKind]?.name ?? id}: ${LEVELS[l]?.toLowerCase() ?? l}`),
    ...Object.entries(c.choices).map(([g, o]) => {
      const group = recipe?.choices.find((x) => x.id === g);
      return `${group?.title ?? g}: ${group?.options.find((x) => x.id === o)?.label ?? o}`;
    }),
    c.note.trim() ? `Note: “${c.note.trim()}”` : "",
  ].filter(Boolean);
  return parts.length ? parts.join(" · ") : "House recipe";
}
