import { ingredients } from "@/data/ingredients";
import { ingredientImage, resolveImage } from "@/data/images";
import Image from "next/image";
import styles from "./IngredientSwatch.module.css";

/**
 * Ingredient image cropped to its container. Until the photo in
 * CODEX_IMAGES.md exists, shows a material swatch in the ingredient's colour
 * (a placeholder, not an illustration).
 */
export function IngredientSwatch({ id, sizes = "96px", className }: { id: string; sizes?: string; className?: string }) {
  const ing = ingredients[id];
  const src = resolveImage(ingredientImage(id, ing?.name ?? id).src);
  return (
    <span className={`${styles.swatch} ${className ?? ""}`} style={{ "--tone": ing?.tone ?? "#d9c7a8" } as React.CSSProperties} aria-hidden="true">
      {src ? <Image src={src} alt="" fill sizes={sizes} className={styles.img} /> : <span className={styles.material} />}
    </span>
  );
}
