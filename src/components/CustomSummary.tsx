import type { Product } from "@/data/products";
import type { Customization } from "@/lib/customization";

/** One-line, human summary of a cart line's customisation. */
export function customSummary(product: Product, c: Customization): string {
  const label = (id: string) =>
    [...(product.custom?.addable ?? []), ...(product.custom?.removable ?? [])].find((o) => o.id === id)?.label ?? id;
  const parts = [
    ...c.add.map((id) => `+ ${label(id)}`),
    ...c.remove.map((id) => label(id)),
    c.sweetness === "lighter" ? "Lighter sweetness" : "",
    c.note.trim() ? `Note: “${c.note.trim()}”` : "",
  ].filter(Boolean);
  return parts.join(" · ");
}
