import Link from "next/link";
import { isSoldOut, type Product } from "@/data/products";
import { hasImage, productImages } from "@/data/images";
import { formatINR } from "@/lib/money";
import { per100g } from "@/lib/units";
import { MIN_CUSTOM_GRAMS } from "@/lib/customization";
import { SmartImage } from "./SmartImage";
import { QuickAdd } from "./QuickAdd";
import styles from "./ProductCard.module.css";

const SIZES = "(min-width: 1100px) 22vw, (min-width: 700px) 30vw, 46vw";

export function ProductCard({ product, preload = false }: { product: Product; preload?: boolean }) {
  const [first, second] = productImages(product);
  const soldOut = isSoldOut(product);
  const entry = product.variants.find((v) => v.stock !== "out_of_stock") ?? product.variants[0];
  const low = !soldOut && product.variants.some((v) => v.stock === "low_stock");
  const href = `/shop/${product.slug}`;

  return (
    <article className={styles.card} data-soldout={soldOut || undefined}>
      <div className={styles.media}>
        <Link href={href} className={styles.mediaLink} tabIndex={-1} aria-hidden="true">
          <SmartImage image={first} sizes={SIZES} ratio="4 / 5" preload={preload} decorative />
          {hasImage(second) && <SmartImage image={second} sizes={SIZES} className={styles.alt} decorative />}
        </Link>
        <span className={styles.badges}>
          {soldOut ? <span className="badge badge--muted">Sold out</span> : product.badge && <span className="badge">{product.badge}</span>}
          {product.customizable && <span className="badge badge--custom">Customisable</span>}
        </span>
        <QuickAdd product={product} className={styles.quick} />
      </div>
      <div className={styles.body}>
        <h3 className={styles.name}>
          <Link href={href}>{product.name}</Link>
        </h3>
        <p className={styles.short}>{product.short}</p>
        <p className={styles.price}>
          {soldOut ? (
            <span className={styles.meta}>Back soon</span>
          ) : (
            <>
              <span className="num">{formatINR(entry.price)}</span>
              <span className={styles.meta}>
                {entry.label} · <span className="num">{formatINR(per100g(entry.price, entry.grams))}</span>/100 g
              </span>
            </>
          )}
        </p>
        {low && <p className={styles.low}>Only a few left</p>}
        {product.customizable && !soldOut && (
          <Link href={`/customise/${product.slug}`} className={styles.customLink}>
            Customise from {MIN_CUSTOM_GRAMS} g
          </Link>
        )}
      </div>
    </article>
  );
}
