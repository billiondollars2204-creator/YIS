import type { Metadata } from "next";
import Link from "next/link";
import { categories, productsIn } from "@/data/products";
import { ProductTile } from "@/components/ProductTile";
import { ProductArt } from "@/components/art/ProductArt";
import styles from "./shop.module.css";

export const metadata: Metadata = {
  title: "Shop the pantry",
  description: "Homemade panjiri, pinni, dry-fruit laddus and dry-fruit mixes, made in small batches.",
  alternates: { canonical: "/shop" },
};

export default function ShopPage() {
  return (
    <>
      <header className={`wrap ${styles.intro}`}>
        <p className="eyebrow">The pantry</p>
        <h1>Everything we make, in one place</h1>
        <p className="lede">
          Four kinds of things, each made by hand. Every pack lists exactly what’s inside. Panjiri and laddus can be
          customised from 500 g.
        </p>
      </header>

      <nav className={styles.jump} aria-label="Product categories">
        <ul className="wrap">
          {categories.map((c) => (
            <li key={c.slug}>
              <a href={`#${c.slug}`}>
                {c.name}
                {c.comingSoon && <span className={styles.soon}> · soon</span>}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="wrap">
        {categories.map((c) => {
          const items = productsIn(c.slug);
          return (
            <section key={c.slug} id={c.slug} className={styles.category} aria-labelledby={`${c.slug}-title`}>
              <div className={styles.catHead} data-reveal>
                {c.script && (
                  <span className={styles.script} lang={c.script.lang} aria-hidden="true">
                    {c.script.text}
                  </span>
                )}
                <h2 id={`${c.slug}-title`}>{c.name}</h2>
                <p>{c.blurb}</p>
              </div>
              {c.comingSoon ? (
                <div className={styles.soonBlock} data-reveal>
                  <div className={styles.soonArt} aria-hidden="true">
                    <ProductArt kind="gift" />
                  </div>
                  <p>
                    Gift boxes are on their way. <Link href="/contact" className="link">Tell us</Link> if you’d like one for an
                    occasion — we can usually help.
                  </p>
                </div>
              ) : (
                <div className={styles.grid}>
                  {items.map((p, i) => (
                    <ProductTile key={p.slug} product={p} index={i + c.slug.length} />
                  ))}
                </div>
              )}
            </section>
          );
        })}
      </div>
    </>
  );
}
