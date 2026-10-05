import Link from "next/link";
import { getProduct, isSoldOut } from "@/data/products";
import { productImages } from "@/data/images";
import { FREE_SHIPPING_THRESHOLD, formatINR } from "@/lib/money";
import { SmartImage } from "../SmartImage";
import { AddButton } from "../AddButton";
import { VegMark } from "../ui";
import styles from "./StartWith.module.css";

/** Sensory one-liners (brief §10.3). Describe taste/texture only — no health promises. */
const picks: { slug: string; line: string }[] = [
  { slug: "atta-pinni", line: "A hand-pressed bite with a nutty, crumbly texture." },
  { slug: "classic-panjiri", line: "Toasted crumble, ready for a spoonful." },
  { slug: "dry-fruit-laddu", line: "A small, sweet round for after lunch." },
  { slug: "everyday-mix", line: "A crunchy handful for the afternoon." },
];

export function FactRow() {
  const facts = [
    `Free delivery over ${formatINR(FREE_SHIPPING_THRESHOLD)}`,
    "Delivered in 4–7 working days",
    "100% vegetarian",
    "Packs from 250 g",
  ];
  return (
    <ul className={styles.facts} aria-label="Shopping at a glance">
      {facts.map((f) => (
        <li key={f}>{f}</li>
      ))}
    </ul>
  );
}

export function StartWith() {
  return (
    <section className={styles.section} aria-labelledby="start-title">
      <div className={styles.head}>
        <h2 id="start-title">Start with these</h2>
        <Link href="/shop" className={styles.all}>
          See all snacks
        </Link>
      </div>
      <ul className={styles.grid}>
        {picks.map(({ slug, line }, i) => {
          const p = getProduct(slug);
          if (!p) return null;
          const v = p.variants.find((x) => x.stock !== "out_of_stock") ?? p.variants[0];
          const href = `/shop/${p.slug}`;
          return (
            <li key={slug} className={styles.card}>
              <Link href={href} className={styles.media} tabIndex={-1} aria-hidden="true">
                <SmartImage image={productImages(p)[0]} sizes="(min-width: 900px) 290px, 46vw" ratio="4 / 5" decorative caption={p.hindi} quiet preload={i < 2} />
              </Link>
              <div className={styles.body}>
                <h3 className={styles.name}>
                  <Link href={href}>{p.name}</Link>
                </h3>
                <p className={styles.line}>{line}</p>
                <p className={styles.meta}>
                  <VegMark label={false} />
                  {isSoldOut(p) ? (
                    <span>Back soon</span>
                  ) : (
                    <span>
                      <strong className="num">{formatINR(v.price)}</strong> · {v.label}
                    </span>
                  )}
                </p>
              </div>
              <AddButton product={p} />
            </li>
          );
        })}
      </ul>
    </section>
  );
}
