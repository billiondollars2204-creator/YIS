import Link from "next/link";
import { isSoldOut, type Product } from "@/data/products";
import { hasImage, productImages } from "@/data/images";
import { MIN_CUSTOM_GRAMS } from "@/lib/customization";
import { SmartImage } from "./SmartImage";
import { SaveButton } from "./SaveButton";
import { AddButton } from "./AddButton";
import { Price, VegMark } from "./ui";
import styles from "./ProductCard.module.css";

const SIZES = "(min-width: 1100px) 23vw, (min-width: 768px) 31vw, 48vw";

export function ProductCard({ product, preload = false }: { product: Product; preload?: boolean }) {
  const [first, second] = productImages(product);
  const soldOut = isSoldOut(product);
  const entry = product.variants.find((v) => v.stock !== "out_of_stock") ?? product.variants[0];
  const href = `/shop/${product.slug}`;
  const low = !soldOut && product.variants.some((v) => v.stock === "low_stock");

  return (
    <article className={styles.card} data-soldout={soldOut || undefined}>
      <div className={styles.media}>
        <Link href={href} tabIndex={-1} aria-hidden="true" className={styles.mediaLink}>
          <SmartImage image={first} sizes={SIZES} ratio="1 / 1" preload={preload} decorative caption={product.hindi} quiet />
          {hasImage(second) && <SmartImage image={second} sizes={SIZES} className={styles.alt} decorative />}
        </Link>
        <span className={styles.tags}>
          {soldOut ? <span className="tag tag--muted">Sold out</span> : product.badge && <span className="tag tag--brand">{product.badge}</span>}
          {product.customizable && !soldOut && <span className="tag tag--custom">Customisable</span>}
          {product.subscribable && !soldOut && <span className="tag tag--gold">Subscribe & save</span>}
        </span>
        <SaveButton slug={product.slug} name={product.name} className={`icon-btn ${styles.save}`} />
      </div>
      <div className={styles.body}>
        <VegMark label={false} />
        <h3 className={styles.name}>
          <Link href={href}>{product.name}</Link>
        </h3>
        <p className={styles.short}>{product.short}</p>
        <div className={styles.price}>
          {soldOut ? (
            <span className="muted small">Back soon</span>
          ) : (
            <>
              <Price price={entry.price} note={false} />
              <span className="muted small">
                {product.kind === "bundle" ? entry.label : `${entry.label}${product.variants.length > 1 ? ` · ${product.variants.length} sizes` : ""}`}
              </span>
            </>
          )}
        </div>
        {low && <p className={styles.low}>Only a few left</p>}
      </div>
      <div className={styles.actions}>
        <AddButton product={product} />
        {product.customizable && !soldOut && (
          <Link href={`/customise/${product.slug}`} className={styles.custom}>
            Customise from {MIN_CUSTOM_GRAMS} g
          </Link>
        )}
      </div>
    </article>
  );
}
