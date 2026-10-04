import Link from "next/link";
import { getImageProps } from "next/image";
import { categories, getProduct, products, productsIn } from "@/data/products";
import { faqs } from "@/data/content";
import { categoryImage, images, resolveImage } from "@/data/images";
import { CUSTOMISABLE_PRODUCTS, formulas } from "@/data/formulations";
import { MIN_CUSTOM_GRAMS } from "@/lib/customization";
import { formatINR } from "@/lib/money";
import { KitchenScene } from "@/components/KitchenScene";
import { ProductCard } from "@/components/ProductCard";
import { SmartImage } from "@/components/SmartImage";
import { IngredientSwatch } from "@/components/IngredientSwatch";
import { Placeholder } from "@/components/Placeholder";
import { ArrowRight } from "@/components/icons";
import styles from "./home.module.css";

// Products styled in the hero photograph (see CODEX_IMAGES.md → home-hero).
const inPhoto = ["classic-panjiri", "atta-pinni", "dry-fruit-laddu"];

const promises = [
  { title: "Every ingredient, listed", text: "Each product page shows the full house recipe, weighed per 500 g." },
  { title: "Cooked in small batches", text: "Roasted by hand in our family kitchen, never on a factory line." },
  { title: "Nothing you wouldn’t use at home", text: "Atta, desi ghee, jaggery, nuts and spices.", tbc: "confirm no-preservative claim after review" },
];

function HeroImage() {
  const desktop = resolveImage(images.hero.src);
  const mobile = resolveImage(images.heroMobile.src);
  if (!desktop || !mobile) return <SmartImage image={images.hero} sizes="100vw" preload className={styles.heroImage} />;
  // Art direction: portrait crop on phones, wide crop from 700 px.
  const common = { alt: images.hero.alt, sizes: "(min-width: 1320px) 1280px, 100vw", preload: true };
  const { props: { srcSet: wide } } = getImageProps({ ...common, src: desktop, width: 2400, height: 1100 });
  const { props: { srcSet: tall, ...rest } } = getImageProps({ ...common, src: mobile, width: 1200, height: 1500 });
  return (
    <div className={styles.heroImage}>
      <picture>
        <source media="(min-width: 700px)" srcSet={wide} />
        <img {...rest} srcSet={tall} alt={images.hero.alt} className={styles.heroPicture} />
      </picture>
    </div>
  );
}

export default function HomePage() {
  const bestsellers = products.filter((p) => p.featured).slice(0, 4);
  const shopCats = categories.filter((c) => !c.comingSoon);
  const eligible = CUSTOMISABLE_PRODUCTS.map((s) => getProduct(s)!).filter(Boolean);
  const homeFaqs = faqs.flatMap((g) => g.items).slice(0, 4);

  return (
    <>
      <section className={styles.hero} aria-labelledby="hero-title">
        <div className={`wrap ${styles.heroText}`}>
          <p className="kicker">Small-batch Indian snacks · Made by hand</p>
          <h1 id="hero-title" className={styles.heroTitle}>
            Panjiri, pinni and laddus, slow-roasted at home.
          </h1>
          <p className={styles.heroSub}>Made in small batches by our family, with whole pantry ingredients. Every jar lists exactly what’s inside.</p>
          <div className={styles.heroCtas}>
            <Link href="/shop" className="btn btn--lg">
              Shop all products <ArrowRight />
            </Link>
            <Link href="/customise" className="btn btn--secondary btn--lg">
              Make a custom batch
            </Link>
          </div>
          <nav className={styles.heroCats} aria-label="Shop by category">
            {shopCats.map((c) => (
              <Link key={c.slug} href={`/shop?category=${c.slug}`}>
                {c.name} <span className="num">{productsIn(c.slug).length}</span>
              </Link>
            ))}
          </nav>
        </div>
        <figure className={`wrap ${styles.heroFigure}`}>
          <HeroImage />
          <figcaption className={styles.heroCaption}>
            <span>In the photo</span>
            {inPhoto.map((s) => {
              const p = getProduct(s)!;
              return (
                <Link key={s} href={`/shop/${s}`}>
                  {p.name} <span className="num">· from {formatINR(p.variants[0].price)}</span>
                </Link>
              );
            })}
          </figcaption>
        </figure>
      </section>

      <section className="wrap section" aria-labelledby="best-title">
        <div className="section-head">
          <h2 id="best-title">Bestsellers</h2>
          <Link href="/shop" className="arrow-link">
            Shop all {products.length} products <ArrowRight />
          </Link>
        </div>
        <div className={`${styles.grid} reveal-group`}>
          {bestsellers.map((p, i) => (
            <ProductCard key={p.slug} product={p} preload={i < 2} />
          ))}
        </div>
      </section>

      <section className="wrap" aria-labelledby="cats-title">
        <div className="section-head">
          <h2 id="cats-title">Shop by category</h2>
          <p>Gift boxes are coming soon.</p>
        </div>
        <ul className={`${styles.cats} reveal-group`}>
          {shopCats.map((c) => {
            const count = productsIn(c.slug).length;
            return (
              <li key={c.slug}>
                <Link href={`/shop?category=${c.slug}`} className={styles.cat}>
                  <SmartImage image={categoryImage(c.slug, c.name)} sizes="(min-width: 1000px) 22vw, 45vw" ratio="1 / 1" decorative className={styles.catImg} />
                  <span className={styles.catName}>
                    {c.name}
                    <ArrowRight />
                  </span>
                  <span className={styles.catMeta}>
                    {count} {count === 1 ? "product" : "products"}
                    {productsIn(c.slug).some((p) => p.customizable) && " · customisable"}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      <section className={`${styles.custom} section`} aria-labelledby="custom-title">
        <div className={`wrap ${styles.customGrid}`}>
          <SmartImage image={images.customise} sizes="(min-width: 900px) 50vw, 100vw" ratio="4 / 3" className={`${styles.customImg} reveal`} />
          <div className={styles.customText}>
            <p className="kicker">Custom batches</p>
            <h2 id="custom-title">Set your own ratio of nuts, ghee and sweetness.</h2>
            <p className={styles.customLede}>
              Start from our house recipe, adjust each ingredient by the gram, and review the full recipe and price before it goes in your cart.
            </p>
            <ul className={styles.eligible}>
              {eligible.map((p) => (
                <li key={p.slug}>
                  <Link href={`/customise/${p.slug}`}>
                    <span className={styles.eligibleSwatches} aria-hidden="true">
                      {formulas[p.slug].lines.slice(0, 3).map((l) => (
                        <IngredientSwatch key={l.key} id={l.options[0]} className={styles.miniSwatch} sizes="24px" />
                      ))}
                    </span>
                    <span className={styles.eligibleName}>{p.name}</span>
                    <span className={styles.eligibleMeta}>{formulas[p.slug].lines.filter((l) => !l.fill).length} ingredients to adjust</span>
                    <ArrowRight />
                  </Link>
                </li>
              ))}
            </ul>
            <p className={styles.rule}>
              Custom batches start at {MIN_CUSTOM_GRAMS} g and are cooked to order. Need less? Standard 250 g packs are in the shop.
            </p>
          </div>
        </div>
      </section>

      <div className="band">
        <div className="wrap">
          <KitchenScene />
        </div>
      </div>

      <section className="wrap section" aria-labelledby="promise-title">
        <div className="section-head">
          <h2 id="promise-title">What goes in</h2>
        </div>
        <ul className={`${styles.promises} reveal-group`}>
          {promises.map((p) => (
            <li key={p.title}>
              <h3>{p.title}</h3>
              <p>{p.tbc ? <Placeholder note={p.tbc}>{p.text}</Placeholder> : p.text}</p>
            </li>
          ))}
        </ul>
        <p className={styles.certs}>
          <span>FSSAI licence</span>
          <span>Lab-tested batches</span>
          <span>Customer reviews</span>
          <Placeholder note="add once verified">Details will be published once verified.</Placeholder>
        </p>
      </section>

      <section className={`wrap section ${styles.faq}`} aria-labelledby="faq-title">
        <div>
          <h2 id="faq-title">Questions</h2>
          <p className="muted">Ordering, delivery and custom batches.</p>
          <div className={styles.faqLinks}>
            <Link href="/faq" className="arrow-link">
              All FAQs <ArrowRight />
            </Link>
            <Link href="/contact" className="arrow-link">
              Contact us <ArrowRight />
            </Link>
          </div>
        </div>
        <div>
          {homeFaqs.map((f) => (
            <details key={f.q} className="acc">
              <summary>{f.q}</summary>
              <div className="acc-body">
                <p>{f.a}</p>
              </div>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}
