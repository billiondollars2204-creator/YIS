import Link from "next/link";
import { categories, products, productsIn } from "@/data/products";
import { benefits, faqs } from "@/data/content";
import { categoryImage, images } from "@/data/images";
import { ingredients, recipes } from "@/data/ingredients";
import { MIN_CUSTOM_GRAMS } from "@/lib/customization";
import { FREE_SHIPPING_THRESHOLD, formatINR } from "@/lib/money";
import { KitchenScene } from "@/components/KitchenScene";
import { ProductCard } from "@/components/ProductCard";
import { SectionHead } from "@/components/SectionHead";
import { SmartImage } from "@/components/SmartImage";
import { Placeholder } from "@/components/Placeholder";
import { HeroIntro } from "@/components/home/HeroIntro";
import { BowlDemo } from "@/components/home/BowlDemo";
import { ProductSketch } from "@/components/art/ProductSketch";
import { IngredientArt } from "@/components/art/IngredientArt";
import { ArrowRight, ShieldIcon, SlidersIcon, TruckIcon, WalletIcon } from "@/components/icons";
import styles from "./home.module.css";

const trust = [
  { icon: TruckIcon, title: `Free delivery over ${formatINR(FREE_SHIPPING_THRESHOLD)}`, text: "Across India (placeholder)" },
  { icon: SlidersIcon, title: `Custom batches from ${MIN_CUSTOM_GRAMS} g`, text: "Your recipe, cooked by ours" },
  { icon: WalletIcon, title: "UPI, cards or COD", text: "Secure checkout (placeholder)" },
  { icon: ShieldIcon, title: "Damaged? We replace it", text: "No questions asked (placeholder)" },
];

const reviews = [
  { quote: "Review placeholder — a short, specific line about how the panjiri tastes like home.", who: "Customer name", where: "City", product: "Ghar ki Panjiri" },
  { quote: "Review placeholder — ordering the new-mother panjiri for a sister after her delivery.", who: "Customer name", where: "City", product: "Panjiri for New Mothers" },
  { quote: "Review placeholder — the kids finishing a jar of laddus in a week.", who: "Customer name", where: "City", product: "Dry-Fruit Laddu" },
];

const builderPoints = [
  { icon: "almond" as const, t: "Every ingredient, your call", d: "More almonds, no raisins, a pinch of saffron — set each one to none, less, usual or extra." },
  { icon: "gond" as const, t: "Base, roast and sweetness", d: "Atta or atta + suji, golden or deep roast, jaggery, khand or sugar." },
  { icon: "cardamom" as const, t: "Cooked as its own batch", d: `Made to order from ${MIN_CUSTOM_GRAMS} g, with a note straight to the kitchen.` },
];

export default function HomePage() {
  const bestsellers = products.filter((p) => p.featured).slice(0, 4);
  const homeFaqs = faqs.flatMap((g) => g.items).slice(0, 5);
  const customisable = Object.keys(recipes).length;

  return (
    <>
      {/* 01 Hero */}
      <section className={styles.hero} aria-label="Welcome">
        <div className={`wrap ${styles.heroInner}`}>
          <svg viewBox="0 0 60 40" className={styles.steam} aria-hidden="true">
            <path d="M14 38C8 30 20 24 14 16S16 6 14 2" pathLength={1} />
            <path d="M30 38C24 30 36 24 30 16S32 6 30 2" pathLength={1} />
            <path d="M46 38C40 30 52 24 46 16S48 6 46 2" pathLength={1} />
          </svg>
          <p className={styles.kicker}>
            <span className={styles.live} aria-hidden="true" />
            This week’s batch is on the stove
          </p>
          <HeroIntro />
        </div>

        <div className={`wrap ${styles.rail}`}>
          <div className={styles.railHead}>
            <h2 className={styles.railTitle}>Bestsellers</h2>
            <Link href="/shop" className="arrow-link">
              Shop all {products.length} products <ArrowRight />
            </Link>
          </div>
          <div className={styles.grid}>
            {bestsellers.map((p, i) => (
              <ProductCard key={p.slug} product={p} preload={i < 2} />
            ))}
          </div>
        </div>

        <div className="wrap">
          <ul className={styles.trust}>
            {trust.map(({ icon: Icon, title, text }) => (
              <li key={title}>
                <Icon className={styles.trustIcon} />
                <span>
                  <strong>{title}</strong>
                  <span>{text}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 02 Categories */}
      <section className="wrap section" aria-labelledby="cats-title">
        <SectionHead
          id="cats-title"
          index="01"
          eyebrow="The pantry"
          title={
            <>
              Four things, <em>made well.</em>
            </>
          }
          description="We keep the range small so every jar gets the time it needs."
          href="/shop"
          linkLabel="Shop all"
        />
        <ul className={`${styles.cats} reveal`}>
          {categories.map((c) => {
            const count = productsIn(c.slug).length;
            const first = productsIn(c.slug)[0];
            return (
              <li key={c.slug}>
                <Link href={`/shop?category=${c.slug}`} className={styles.cat}>
                  <SmartImage
                    image={categoryImage(c.slug, c.name)}
                    sizes="(min-width: 1000px) 18vw, 42vw"
                    ratio="4 / 5"
                    decorative
                    fallback={<ProductSketch product={first ?? { slug: c.slug, name: c.name, category: c.slug, short: "" }} />}
                  />
                  <span className={styles.catRow}>
                    <span className={styles.catName}>{c.name}</span>
                    <ArrowRight className={styles.catArrow} />
                  </span>
                  <span className={styles.catMeta}>{c.comingSoon ? "Coming soon" : `${count} ${count === 1 ? "product" : "products"}`}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      {/* 03 Batch builder */}
      <section className={`band ${styles.builder}`} aria-labelledby="builder-title">
        <div className={`wrap section ${styles.builderGrid}`}>
          <BowlDemo />
          <div className="reveal">
            <p className="section-label">
              <span>02</span>Batch builder
            </p>
            <h2 id="builder-title" className={styles.builderTitle}>
              Your family’s recipe, <em>cooked by ours.</em>
            </h2>
            <ul className={styles.points}>
              {builderPoints.map((p) => (
                <li key={p.t}>
                  <span className={styles.pointArt}>
                    <IngredientArt id={p.icon} />
                  </span>
                  <span>
                    <strong>{p.t}</strong>
                    <span>{p.d}</span>
                  </span>
                </li>
              ))}
            </ul>
            <div className={styles.builderCtas}>
              <Link href="/customise/classic-panjiri" className="btn btn--lg">
                Build a panjiri
              </Link>
              <Link href="/customise/dry-fruit-laddu" className="btn btn--outline btn--lg">
                Build laddus
              </Link>
            </div>
            <p className={styles.builderNote}>
              {customisable} recipes · {Object.keys(ingredients).length} ingredients to play with
            </p>
          </div>
        </div>
      </section>

      {/* 04 Kitchen story */}
      <div className="wrap">
        <KitchenScene index="03" />
      </div>

      {/* 05 Shop by need */}
      <section className="wrap section" aria-labelledby="need-title">
        <SectionHead
          id="need-title"
          index="04"
          eyebrow="Shop by need"
          title={
            <>
              Recipes made <em>for a reason.</em>
            </>
          }
          description="Each one comes from a tradition of cooking for family — through winters, new babies and exam nights."
        />
        <ol className={`${styles.needs} reveal`}>
          {benefits.map((b, i) => {
            const list = products.filter((p) => p.enjoyedFor.includes(b.slug));
            return (
              <li key={b.slug}>
                <Link href={`/shop?need=${b.slug}`} className={styles.need}>
                  <span className={styles.needNum}>{String(i + 1).padStart(2, "0")}</span>
                  <span className={styles.needLabel}>{b.title}</span>
                  <span className={styles.needTitle}>For {b.occasion}</span>
                  <span className={styles.needText}>{b.line}</span>
                  <span className={styles.needLink}>
                    {list.length} {list.length === 1 ? "product" : "products"} <ArrowRight />
                  </span>
                </Link>
              </li>
            );
          })}
        </ol>
        <p className={styles.disclaimer}>
          <Placeholder note="regulatory review of benefit copy">
            These describe traditional use, not medical claims. Please ask your doctor about diet during pregnancy, after childbirth, or illness.
          </Placeholder>
        </p>
      </section>

      {/* 06 Reviews */}
      <section className="band" aria-labelledby="reviews-title">
        <div className="wrap section">
          <SectionHead id="reviews-title" index="05" eyebrow="Reviews" title="Notes from other kitchens" description="Verified reviews will appear here once orders begin." />
          <ul className={`${styles.reviews} reveal`}>
            {reviews.map((r, i) => (
              <li key={i}>
                <p className={styles.stars} aria-label="Rating placeholder">
                  ★★★★★
                </p>
                <blockquote>
                  <p>“{r.quote}”</p>
                </blockquote>
                <p className={styles.reviewer}>
                  <strong>{r.who}</strong>, {r.where}
                  <span>Bought {r.product}</span>
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 07 Story */}
      <section className={`wrap section ${styles.story}`} aria-labelledby="story-title">
        <SmartImage image={images.story} sizes="(min-width: 900px) 50vw, 100vw" ratio="4 / 3" fallback={<StoryFallback />} />
        <div className="reveal">
          <p className="section-label">
            <span>06</span>Our story
          </p>
          <h2 id="story-title" className={styles.storyTitle}>
            From one family kitchen <em>to yours.</em>
          </h2>
          <p className={styles.storyText}>
            It began with friends asking for the recipe — then asking if we could just make them a jar. Today we cook the panjiri, pinni and laddus we
            grew up on, the same way, for homes across India.
          </p>
          <Link href="/our-story" className="arrow-link">
            Read our story <ArrowRight />
          </Link>
        </div>
      </section>

      {/* 08 FAQ */}
      <section className={`wrap section ${styles.faq}`} aria-labelledby="faq-title">
        <div>
          <p className="section-label">
            <span>07</span>Help
          </p>
          <h2 id="faq-title" className={styles.faqTitle}>
            Questions, <em>answered.</em>
          </h2>
          <p className={styles.faqText}>Still unsure? Write to us — the same family that cooks your order reads every message.</p>
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

function StoryFallback() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "4%", width: "70%" }}>
      {(["almond", "cardamom", "saffron", "raisin", "makhana", "pistachio"] as const).map((k) => (
        <IngredientArt key={k} id={k} />
      ))}
    </div>
  );
}
