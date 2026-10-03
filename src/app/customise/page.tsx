import type { Metadata } from "next";
import Link from "next/link";
import { getProduct, isSoldOut } from "@/data/products";
import { recipes } from "@/data/ingredients";
import { formatINR } from "@/lib/money";
import { MIN_CUSTOM_GRAMS } from "@/lib/customization";
import { BowlArt, piecesFor } from "@/components/art/BowlArt";
import { ArrowRight } from "@/components/icons";
import styles from "./customise.module.css";

export const metadata: Metadata = {
  title: "Build your own batch",
  description: "Customise panjiri and dry-fruit laddus: choose the dry fruits, seeds, spices and sweetness. Custom batches from 500 g.",
  alternates: { canonical: "/customise" },
};

const how = [
  { t: "Start from the house recipe", d: "Every builder opens on the recipe we cook every day." },
  { t: "Adjust each ingredient", d: "More, less or none — dry fruits, seeds, spices, sweetness and texture." },
  { t: "We cook it just for you", d: `Each custom order is its own batch, from ${MIN_CUSTOM_GRAMS} g.` },
];

export default function CustomiseIndex() {
  const items = Object.entries(recipes).map(([slug, r]) => ({ product: getProduct(slug)!, recipe: r }));
  return (
    <div className="wrap">
      <header className={styles.head}>
        <p className="eyebrow">Batch builder</p>
        <h1>
          Your family’s recipe, <em>cooked by ours.</em>
        </h1>
        <p className={styles.intro}>Pick a product, then make it yours — ingredient by ingredient.</p>
      </header>

      <ol className={styles.how}>
        {how.map((h, i) => (
          <li key={h.t}>
            <span>{String(i + 1).padStart(2, "0")}</span>
            <h2>{h.t}</h2>
            <p>{h.d}</p>
          </li>
        ))}
      </ol>

      <ul className={styles.grid}>
        {items.map(({ product, recipe }) => {
          const levels = Object.fromEntries(recipe.ingredients.map((i) => [i.id, i.default]));
          const v500 = product.variants.find((v) => v.grams === 500);
          const soldOut = isSoldOut(product);
          const tint = Object.values(recipe.baseTint)[0].light;
          return (
            <li key={product.slug}>
              <Link href={`/customise/${product.slug}`} className={styles.card} data-soldout={soldOut || undefined}>
                <div className={styles.bowl}>
                  <BowlArt pieces={piecesFor(levels)} tint={tint} uid={`idx-${product.slug}`} />
                </div>
                <div className={styles.cardBody}>
                  <h2>{product.name}</h2>
                  <p>{product.short}</p>
                  <p className={styles.meta}>
                    {recipe.ingredients.length} adjustable ingredients · {recipe.choices.length} choices
                  </p>
                  <p className={styles.price}>
                    {soldOut ? "Sold out — back soon" : v500 ? `From ${formatINR(v500.price)} for 500 g` : ""}
                  </p>
                  <span className={styles.go}>
                    Start building <ArrowRight />
                  </span>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
