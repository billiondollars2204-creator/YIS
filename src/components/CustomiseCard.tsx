import Link from "next/link";
import { recipes } from "@/data/ingredients";
import { MIN_CUSTOM_GRAMS } from "@/lib/customization";
import { IngredientArt } from "./art/IngredientArt";
import { ArrowRight } from "./icons";
import styles from "./CustomiseCard.module.css";

export function CustomiseCard({ slug, name }: { slug: string; name: string }) {
  const r = recipes[slug];
  if (!r) return null;
  return (
    <Link href={`/customise/${slug}`} className={styles.card}>
      <span className={styles.stack} aria-hidden="true">
        {r.ingredients.slice(0, 5).map((i) => (
          <span key={i.id}>
            <IngredientArt id={i.id} />
          </span>
        ))}
      </span>
      <span className={styles.body}>
        <span className={styles.kicker}>Make it yours</span>
        <span className={styles.title}>Customise this {name.toLowerCase().includes("laddu") ? "laddu" : "panjiri"}</span>
        <span className={styles.text}>
          Adjust {r.ingredients.length} ingredients, sweetness and texture. Cooked as its own batch, from {MIN_CUSTOM_GRAMS} g.
        </span>
      </span>
      <ArrowRight className={styles.arrow} />
    </Link>
  );
}
