import { ingredients, productIngredients } from "@/data/ingredients";
import { IngredientArt } from "./art/IngredientArt";
import styles from "./WhatsInside.module.css";

export function WhatsInside({ slug }: { slug: string }) {
  const kinds = productIngredients(slug);
  return (
    <ul className={styles.list} aria-label="Key ingredients">
      {kinds.map((k) => (
        <li key={k}>
          <span className={styles.art}>
            <IngredientArt id={k} />
          </span>
          <span className={styles.name}>{ingredients[k].name}</span>
          <span className={styles.local}>{ingredients[k].local}</span>
        </li>
      ))}
    </ul>
  );
}
