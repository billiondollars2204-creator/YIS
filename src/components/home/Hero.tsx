import Link from "next/link";
import { images, resolveImage } from "@/data/images";
import { HeroCta } from "./HeroCta";
import styles from "./Hero.module.css";

/**
 * v6 home hero (brief §10.2): one centred stack — eyebrow, promise, one
 * supporting line, one primary action and one quiet link — over a large
 * product photo. Desktop uses a landscape frame; mobile swaps to a portrait
 * crop via <picture> so the product stays the subject at every width.
 * No entrance animation; the only motion is the 150 ms button hover.
 */
export function Hero() {
  const wide = resolveImage(images.homeHero.src);
  const tall = resolveImage(images.homeHeroMobile.src) ?? wide;

  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.copy}>
        <p className={styles.eyebrow}>Made in small batches</p>
        <h1 id="hero-title" className={styles.title}>
          A little taste of home.
        </h1>
        <p className={styles.sub}>Panjiri, pinni and everyday mixes for the snack cupboard.</p>
        <div className={styles.actions}>
          <HeroCta />
          <Link href="/shop/atta-pinni" className={styles.quiet}>
            Meet Atta Pinni
          </Link>
        </div>
      </div>

      <div className={styles.media}>
        {wide ? (
          <picture>
            {tall && <source media="(max-width: 699px)" srcSet={tall} />}
            {/* eslint-disable-next-line @next/next/no-img-element -- art-directed <picture>; next/image cannot swap crops */}
            <img src={wide} alt={images.homeHero.alt} className={styles.img} fetchPriority="high" decoding="async" />
          </picture>
        ) : (
          <div className={styles.placeholder} role="img" aria-label={images.homeHero.alt}>
            <span className={styles.plate} aria-hidden="true">
              <span className={styles.pinni} />
              <span className={styles.pinni} />
              <span className={styles.pinni} />
              <span className={styles.bowl} />
            </span>
            <span className={styles.tempLabel}>Temporary image · product photo to come</span>
          </div>
        )}
      </div>
    </section>
  );
}
