import Link from "next/link";
import { fromPrice, isSoldOut, type Product } from "@/data/products";
import { formatINR } from "@/lib/money";
import { ProductArt } from "./art/ProductArt";
import styles from "./ProductTile.module.css";

/** An editorial, borderless product listing — illustration, name, line, price. */
export function ProductTile({ product, index = 0, headingLevel = 3 }: { product: Product; index?: number; headingLevel?: 2 | 3 }) {
  const H = headingLevel === 2 ? "h2" : "h3";
  const soldOut = isSoldOut(product);
  return (
    <article className={styles.tile} data-reveal style={{ "--delay": (index % 3) * 90 } as React.CSSProperties}>
      <Link href={`/shop/${product.slug}`} className={styles.link}>
        <div className={styles.artWrap}>
          <ProductArt kind={product.art} variant={index} title={`Illustration: ${product.name}`} />
          {product.customizable && <span className={styles.stamp}>Customisable</span>}
        </div>
        <H className={styles.name}>{product.name}</H>
      </Link>
      <p className={styles.tagline}>{product.tagline}</p>
      <p className={styles.meta}>
        {soldOut ? (
          <span className={styles.soldOut}>Sold out — back soon</span>
        ) : (
          <>
            <span className={styles.from}>from</span> <strong>{formatINR(fromPrice(product))}</strong>
            <span className={styles.weight}> · 250 g</span>
          </>
        )}
      </p>
    </article>
  );
}
