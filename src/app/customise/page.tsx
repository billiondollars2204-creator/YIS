import type { Metadata } from "next";
import Link from "next/link";
import { getProduct, isSoldOut, products } from "@/data/products";
import { CUSTOMISABLE_PRODUCTS, formulas } from "@/data/formulations";
import { ingredients } from "@/data/ingredients";
import { productImages } from "@/data/images";
import { MIN_CUSTOM_GRAMS } from "@/lib/customization";
import { formatINR } from "@/lib/money";
import { SmartImage } from "@/components/SmartImage";
import { IngredientSwatch } from "@/components/IngredientSwatch";
import { BuilderSteps } from "@/components/formulate/BuilderSteps";
import { ArrowRight } from "@/components/icons";
import styles from "./customise.module.css";

export const metadata: Metadata = {
  title: "Custom batches",
  description: "Formulate your own panjiri, pinni or dry-fruit mix — adjust every ingredient within kitchen limits. Custom batches from 500 g.",
  alternates: { canonical: "/customise" },
};

const how = [
  { t: "Start from the house recipe", d: "Every batch opens on the recipe we cook every day, with each ingredient weighed out." },
  { t: "Adjust what goes in", d: "More almonds, no raisins, khand instead of jaggery — within limits that keep the batch sound." },
  { t: "Review, then we cook it", d: `Check the full recipe and price. We cook it as its own batch, from ${MIN_CUSTOM_GRAMS} g.` },
];

export default function CustomiseIndex() {
  const eligible = CUSTOMISABLE_PRODUCTS.map((slug) => getProduct(slug)!).filter(Boolean);
  const standard = products.filter((p) => !p.customizable);

  return (
    <div className="wrap">
      <BuilderSteps current={0} />
      <header className={styles.head}>
        <p className="kicker">Custom batches</p>
        <h1>Choose what to make</h1>
        <p className="lede">Pick a product to see its house recipe and everything you can adjust.</p>
      </header>

      <ul className={styles.list}>
        {eligible.map((p) => {
          const f = formulas[p.slug];
          const v500 = p.variants.find((v) => v.grams === 500);
          const soldOut = isSoldOut(p);
          const adjustable = f.lines.filter((l) => !l.fill).length;
          return (
            <li key={p.slug} className={`${styles.item} reveal`}>
              <Link href={`/customise/${p.slug}`} className={styles.card} data-soldout={soldOut || undefined}>
                <SmartImage image={productImages(p)[0]} sizes="(min-width: 900px) 22vw, 40vw" ratio="4 / 5" decorative className={styles.img} />
                <span className={styles.body}>
                  <span className={styles.name}>{p.name}</span>
                  <span className={styles.summary}>{f.summary}</span>
                  <span className={styles.swatches} aria-hidden="true">
                    {f.lines.map((l) => (
                      <IngredientSwatch key={l.key} id={l.options[0]} className={styles.swatch} sizes="32px" />
                    ))}
                  </span>
                  <span className={styles.meta}>
                    {adjustable} adjustable ingredients · base of {ingredients[f.lines.find((l) => l.fill)!.options[0]].name.toLowerCase()}
                  </span>
                  <span className={styles.foot}>
                    <span className="num">{soldOut ? "Sold out" : v500 ? `From ${formatINR(v500.price)} for 500 g` : ""}</span>
                    <span className={styles.go}>
                      Start <ArrowRight />
                    </span>
                  </span>
                </span>
              </Link>
            </li>
          );
        })}
      </ul>

      <section className={styles.how} aria-labelledby="how-title">
        <h2 id="how-title" className="visually-hidden">
          How custom batches work
        </h2>
        <ol>
          {how.map((h, i) => (
            <li key={h.t}>
              <span className="num">0{i + 1}</span>
              <h3>{h.t}</h3>
              <p>{h.d}</p>
            </li>
          ))}
        </ol>
      </section>

      <p className={styles.note}>
        Smaller amounts and {standard.map((p) => p.name).slice(0, 2).join(" and ")} are made to our house recipe only —{" "}
        <Link href="/shop" className="link">
          shop standard packs
        </Link>
        .
      </p>
    </div>
  );
}
