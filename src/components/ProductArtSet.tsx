import type { Product } from "@/data/products";
import { productIngredients, recipes } from "@/data/ingredients";
import { BowlArt, piecesFor } from "./art/BowlArt";
import { IngredientArt } from "./art/IngredientArt";
import { ProductSketch } from "./art/ProductSketch";

/** Drawn stand-ins for the three product photos: jar, bowl, ingredients. */
export function productFallbacks(product: Product): React.ReactNode[] {
  const r = recipes[product.slug];
  const kinds = productIngredients(product.slug);
  const levels = r ? Object.fromEntries(r.ingredients.map((i) => [i.id, i.default])) : Object.fromEntries(kinds.map((k) => [k, 2]));
  const tint = r ? Object.values(r.baseTint)[0].light : "#D9A85E";
  return [
    <ProductSketch key="jar" product={product} />,
    <div key="bowl" style={{ width: "78%" }}>
      <BowlArt pieces={piecesFor(levels)} tint={tint} uid={`g-${product.slug}`} />
    </div>,
    <div key="ing" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "6%", width: "70%" }}>
      {kinds.slice(0, 4).map((k) => (
        <IngredientArt key={k} id={k} />
      ))}
    </div>,
  ];
}
