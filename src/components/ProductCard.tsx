import Link from "next/link";
import { fromPrice, isSoldOut, type Product } from "@/data/products";
import { hasImage, productImages } from "@/data/images";
import { formatINR } from "@/lib/money";
import { SmartImage } from "./SmartImage";
import { QuickAdd } from "./QuickAdd";
import styles from "./ProductCard.module.css";

const SIZES = "(min-width: 1100px) 22vw, (min-width: 700px) 30vw, 46vw";

export function ProductCard({ product, preload = false }: { product: Product; preload?: boolean }) {
  const [first, second] = productImages(product);
  const soldOut = isSoldOut(product);
  const low = !soldOut && product.variants.some((v) => v.stock === "low_stock");
  const href = `/shop/${product.slug}`;

  return (
    <article className={styles.card} data-soldout={soldOut || undefined}>
      <Link href={href} className={styles.media} tabIndex={-1} aria-hidden="true">
        <SmartImage image={first} sizes={SIZES} ratio="4 / 5" preload={preload} decorative />
        {hasImage(second) && <SmartImage image={second} sizes={SIZES} className={styles.alt} decorative />}
        <span className={styles.badges}>
          {soldOut ? (
            <span className={styles.badge} data-kind="muted">
              Sold out
            </span>
          ) : (
            product.badge && <span className={styles.badge}>{product.badge}</span>
          )}
          {product.customizable && !soldOut && (
            <span className={styles.badge} data-kind="outline">
              Customisable
            </span>
          )}
        </span>
      </Link>
      <div className={styles.body}>
        <h3 className={styles.name}>
          <Link href={href}>{product.name}</Link>
        </h3>
        <p className={styles.short}>{product.short}</p>
        <p className={styles.price}>
          {soldOut ? (
            <span className={styles.muted}>Back soon</span>
          ) : (
            <>
              <span className={styles.muted}>From </span>
              {formatINR(fromPrice(product))}
            </>
          )}
          {low && <span className={styles.low}>Only a few left</span>}
        </p>
      </div>
      <QuickAdd product={product} />
    </article>
  );
}
