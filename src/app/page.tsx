import Link from "next/link";
import { categories, getProduct, isSoldOut, products, productsIn } from "@/data/products";
import { benefits, faqs } from "@/data/content";
import { categoryImage, images, occasionImage } from "@/data/images";
import { formulas, getFormula } from "@/data/formulations";
import { ingredients } from "@/data/ingredients";
import { EMPTY_CUSTOMIZATION, MIN_CUSTOM_GRAMS, resolveFormula } from "@/lib/customization";
import { formatINR } from "@/lib/money";
import { formatGrams, formatShare } from "@/lib/units";
import { ProductCard } from "@/components/ProductCard";
import { SmartImage } from "@/components/SmartImage";
import { IngredientSwatch } from "@/components/IngredientSwatch";
import { TrustStrip } from "@/components/TrustStrip";
import { Placeholder } from "@/components/Placeholder";
import { HeroActions } from "@/components/home/HeroActions";
import { BestsellerTabs } from "@/components/home/BestsellerTabs";
import { Toran, VegMark } from "@/components/ui";
import { ArrowRight, GiftIcon } from "@/components/icons";
import styles from "./home.module.css";

const heroCats = ["panjiri", "pinni", "laddus"];

export default function HomePage() {
  const ranked = [...products].sort((a, b) => Number(!!b.featured) - Number(!!a.featured) || Number(isSoldOut(a)) - Number(isSoldOut(b)));
  const tabs = [{ id: "all", label: "All" }, ...categories.map((c) => ({ id: c.slug, label: c.name }))];
  const bundles = productsIn("gift-boxes");
  const showcase = getProduct("classic-panjiri")!;
  const showcaseRows = resolveFormula(getFormula("classic-panjiri")!, EMPTY_CUSTOMIZATION)
    .filter((r) => r.grams > 0)
    .sort((a, b) => b.grams - a.grams);
  const faqItems = faqs.flatMap((g) => g.items).slice(0, 5);

  return (
    <>
      {/* Hero: one promise, two actions, three shoppable windows. */}
      <section className={`${styles.hero} jaali`} aria-labelledby="hero-title">
        <div className={`container ${styles.heroInner}`}>
          <p className="eyebrow">Homemade in small batches</p>
          <h1 id="hero-title" className={styles.heroTitle}>
            Panjiri, pinni &amp; laddus, <span>roasted slowly at home.</span>
          </h1>
          <p className={styles.heroSub}>Real ghee, whole nuts and jaggery, made by hand in our family kitchen. Every jar lists exactly what’s inside, by weight.</p>
          <div className={styles.heroCtas}>
            <HeroActions />
          </div>
          <ul className={styles.windows}>
            {heroCats.map((slug, i) => {
              const c = categories.find((x) => x.slug === slug)!;
              const from = Math.min(...productsIn(slug).flatMap((p) => p.variants.map((v) => v.price)));
              return (
                <li key={slug} className={styles.window} style={{ "--i": i } as React.CSSProperties}>
                  <Link href={`/shop?category=${slug}`}>
                    <SmartImage image={categoryImage(slug, c.name)} sizes="(min-width: 900px) 280px, 60vw" ratio="4 / 5" className="arch" caption={c.hindi} preload={i === 1} />
                    <span className={styles.windowText}>
                      <strong>{c.name}</strong>
                      <span className="num">from {formatINR(from)}</span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
        <Toran />
      </section>

      <section className="container" aria-label="Why shop with us" style={{ paddingBlock: "var(--sp-6)" }}>
        <TrustStrip />
      </section>

      <section className="container section" aria-labelledby="best-title" style={{ paddingTop: "var(--sp-4)" }}>
        <div className="section-title">
          <div>
            <h2 id="best-title">Bestsellers</h2>
            <p>Start with our core range, by category.</p>
          </div>
          <Link href="/shop" className="more">
            Shop all {products.length} <ArrowRight />
          </Link>
        </div>
        <BestsellerTabs tabs={tabs} items={ranked.map((p, i) => ({ product: p, node: <ProductCard product={p} preload={i < 2} /> }))} />
      </section>

      <section className="section section--cream" aria-labelledby="occ-title">
        <div className="container">
          <div className="section-title">
            <div>
              <h2 id="occ-title">Shop by occasion</h2>
              <p>Recipes families have long made for a reason.</p>
            </div>
          </div>
          <ul className={styles.occasions}>
            {benefits.map((b) => (
              <li key={b.slug}>
                <Link href={`/shop?need=${b.slug}`} className={styles.occasion}>
                  <SmartImage image={occasionImage(b.slug, b.occasion)} sizes="(min-width: 900px) 220px, 40vw" ratio="3 / 4" className="arch" caption={b.hindi} decorative quiet />
                  <strong>{b.occasion}</strong>
                  <span>{b.line}</span>
                </Link>
              </li>
            ))}
          </ul>
          <p className={styles.disclaimer}>
            <Placeholder note="regulatory review of benefit copy">Traditional use only — not medical claims. Ask your doctor about diet in pregnancy, after childbirth or illness.</Placeholder>
          </p>
        </div>
      </section>

      <section className="container section" aria-labelledby="custom-title">
        <div className={styles.custom}>
          <div className={styles.customText}>
            <p className="eyebrow">Custom batches</p>
            <h2 id="custom-title">Your family’s recipe, cooked in our kitchen.</h2>
            <p className="muted">
              Start from our house recipe, then set each ingredient by the gram — more almonds, no raisins, khand instead of jaggery. You see the full recipe and price before
              you pay.
            </p>
            <ul className={styles.customList}>
              {Object.keys(formulas).map((slug) => {
                const p = getProduct(slug)!;
                return (
                  <li key={slug}>
                    <Link href={`/customise/${slug}`}>
                      {p.name}
                      <ArrowRight />
                    </Link>
                  </li>
                );
              })}
            </ul>
            <p className="small muted">
              Custom batches start at {MIN_CUSTOM_GRAMS} g and are cooked to order. Standard packs from 250 g are in the shop.
            </p>
          </div>
          <div className={styles.customVisual} aria-hidden="true">
            <SmartImage image={images.customise} sizes="(min-width: 900px) 45vw, 100vw" ratio="4 / 3" decorative quiet />
            <div className={styles.recipeCard}>
              <span className="hindi">घर की पंजीरी</span>
              <strong>House recipe · per 500 g</strong>
              {showcaseRows.slice(0, 5).map((r) => (
                <span key={r.key} className={styles.recipeRow}>
                  <IngredientSwatch id={r.pick} className={styles.dot} sizes="16px" />
                  {ingredients[r.pick].name}
                  <em className="num">{formatGrams(r.grams)}</em>
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className={`section ${styles.gifts}`} aria-labelledby="gift-title">
        <Toran />
        <div className={`container ${styles.giftsInner}`}>
          <div className={styles.giftsIntro}>
            <p className="eyebrow">Gift boxes</p>
            <h2 id="gift-title">For festivals, new babies and winter visits</h2>
            <p className="muted">Our jars, boxed with a handwritten card. Add a gift note at checkout.</p>
            <Link href="/shop?category=gift-boxes" className="btn btn--dark">
              <GiftIcon /> Shop gift boxes
            </Link>
          </div>
          <div className={styles.giftCards}>
            {bundles.map((b) => (
              <ProductCard key={b.slug} product={b} />
            ))}
          </div>
        </div>
      </section>

      <section className="container section" aria-labelledby="inside-title">
        <div className={styles.inside}>
          <div>
            <p className="eyebrow">Nothing to hide</p>
            <h2 id="inside-title">What’s inside a jar of {showcase.name}</h2>
            <p className="muted">
              Every product page lists its full house recipe by weight — no “natural flavours”, no hidden extras.{" "}
              <Placeholder note="kitchen to confirm recipe">Amounts are drafts awaiting kitchen confirmation.</Placeholder>
            </p>
            <VegMark />
            <p style={{ marginTop: 16 }}>
              <Link href={`/shop/${showcase.slug}`} className="more">
                See the product <ArrowRight />
              </Link>
            </p>
          </div>
          <ol className={styles.bars} aria-label={`House recipe for ${showcase.name}, per 500 g`}>
            {showcaseRows.map((r) => (
              <li key={r.key}>
                <span className={styles.barLabel}>
                  <IngredientSwatch id={r.pick} className={styles.dot} sizes="16px" />
                  {ingredients[r.pick].name} <span className="hindi">{ingredients[r.pick].local}</span>
                </span>
                <span className={styles.barTrack}>
                  <span style={{ width: `${Math.max(1.5, r.share * 100 * 1.6)}%`, background: ingredients[r.pick].tone }} />
                </span>
                <span className="num">{formatShare(r.share)}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section section--cream" aria-labelledby="story-title">
        <div className={`container ${styles.story}`}>
          <SmartImage image={images.story} sizes="(min-width: 900px) 40vw, 100vw" ratio="4 / 5" className="arch" />
          <div>
            <p className="eyebrow">Our story</p>
            <h2 id="story-title">It started with someone asking for the recipe</h2>
            <p className="muted">
              It began with friends asking for the recipe — then asking if we could just make them a jar. Today we cook the same recipes, the same way, for homes across
              India.
            </p>
            <p className="small muted">
              <Placeholder note="founder story to be written with the family">Founder story placeholder.</Placeholder>
            </p>
            <Link href="/our-story" className="more">
              Read our story <ArrowRight />
            </Link>
          </div>
        </div>
      </section>

      <section className={`container section ${styles.faq}`} aria-labelledby="faq-title">
        <div>
          <h2 id="faq-title">Questions</h2>
          <p className="muted">Delivery, custom batches, ingredients and payments.</p>
          <Link href="/support" className="more">
            Visit the help centre <ArrowRight />
          </Link>
        </div>
        <div>
          {faqItems.map((f) => (
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
