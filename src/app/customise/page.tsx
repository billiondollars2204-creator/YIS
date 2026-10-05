import type { Metadata } from "next";
import Link from "next/link";
import { getProduct, isSoldOut, products } from "@/data/products";
import { CUSTOMISABLE_PRODUCTS, formulas } from "@/data/formulations";
import { ingredients } from "@/data/ingredients";
import { productImages } from "@/data/images";
import { EMPTY_CUSTOMIZATION, MIN_CUSTOM_GRAMS, resolveFormula } from "@/lib/customization";
import { formatINR } from "@/lib/money";
import { SmartImage } from "@/components/SmartImage";
import { Steps } from "@/components/builder/Steps";
import { Breadcrumbs } from "@/components/ui";
import { ArrowRight } from "@/components/icons";
import styles from "./customise.module.css";

export const metadata: Metadata = {
  title: "Custom batches — your recipe, our kitchen",
  description: "Customise panjiri, pinni or mewa mix by the gram. See the full recipe and price before you pay. From 500 g.",
  alternates: { canonical: "/customise" },
};

const how = [
  { t: "Pick a product", d: "Start from the recipe we cook every day." },
  { t: "Adjust by the gram", d: "Nuts, seeds, spices, sweetener — within limits that keep the batch sound." },
  { t: "Review and order", d: `See the full recipe and price, then we cook it just for you. From ${MIN_CUSTOM_GRAMS} g.` },
];

export default function CustomiseIndex() {
  const eligible = CUSTOMISABLE_PRODUCTS.map((s) => getProduct(s)!).filter(Boolean);
  const standard = products.filter((p) => !p.customizable && p.kind !== "bundle");
  return (
    <div className="container">
      <Breadcrumbs items={[{ href: "/", label: "Home" }, { label: "Custom batches" }]} />
      <Steps current={0} />
      <header className={styles.head}>
        <h1>Make it your way</h1>
        <p className="lead">Choose a product to see its house recipe and everything you can adjust.</p>
      </header>
      <ol className={styles.how}>
        {how.map((h, i) => (
          <li key={h.t}>
            <span>{i + 1}</span>
            <strong>{h.t}</strong>
            <p>{h.d}</p>
          </li>
        ))}
      </ol>
      <ul className={styles.list}>
        {eligible.map((p) => {
          const f = formulas[p.slug];
          const rows = resolveFormula(f, EMPTY_CUSTOMIZATION).filter((r) => r.grams > 0).sort((a, b) => b.grams - a.grams);
          const v500 = p.variants.find((v) => v.grams === 500);
          const soldOut = isSoldOut(p);
          return (
            <li key={p.slug}>
              <Link href={`/customise/${p.slug}`} className={styles.card} data-soldout={soldOut || undefined}>
                <SmartImage image={productImages(p)[0]} sizes="(min-width: 900px) 20vw, 40vw" ratio="4 / 5" className="arch" caption={p.hindi} decorative quiet />
                <span className={styles.body}>
                  <strong className={styles.name}>{p.name}</strong>
                  <span className="muted small">{f.summary}</span>
                  <span className={styles.bar} aria-hidden="true">
                    {rows.map((r) => (
                      <span key={r.key} style={{ flexGrow: r.grams, background: ingredients[r.pick].tone }} />
                    ))}
                  </span>
                  <span className="small muted">{f.lines.filter((l) => !l.fill).length} ingredients you can adjust</span>
                  <span className={styles.foot}>
                    <span className="num">{soldOut ? "Sold out" : v500 ? `From ${formatINR(v500.price)} · 500 g` : ""}</span>
                    <span className="more">
                      Start <ArrowRight />
                    </span>
                  </span>
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
      <p className="muted small" style={{ marginTop: "var(--sp-6)" }}>
        {standard.map((p) => p.name).join(", ")} are made to our house recipe only.{" "}
        <Link href="/shop" className="link">
          Shop standard packs
        </Link>
      </p>
    </div>
  );
}
