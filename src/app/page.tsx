import Link from "next/link";
import { getImageProps } from "next/image";
import { categories, products, productsIn } from "@/data/products";
import { benefits, faqs } from "@/data/content";
import { categoryImage, images, resolveImage } from "@/data/images";
import { KitchenScene } from "@/components/KitchenScene";
import { ProductCard } from "@/components/ProductCard";
import { SectionHead } from "@/components/SectionHead";
import { SmartImage } from "@/components/SmartImage";
import { Placeholder } from "@/components/Placeholder";
import { ArrowRight } from "@/components/icons";
import styles from "./home.module.css";

const promises = [
  { title: "Cooked in a home kitchen", body: "Not a factory line — a few kilos at a time, on a slow flame." },
  { title: "Ingredients you can read", body: "Every ingredient listed in full on every product page." },
  { title: "Made in small runs", body: "Packed close to the day it’s cooked, so it reaches you fresh." },
  { title: "Custom batches from 500 g", body: "Adjust ingredients and sweetness to your family’s taste." },
];

const reviews = [
  { quote: "Review placeholder — a short, specific line about the taste of the panjiri.", who: "Customer name", where: "City" },
  { quote: "Review placeholder — ordering the new-mother panjiri for a sister after her delivery.", who: "Customer name", where: "City" },
  { quote: "Review placeholder — the kids finishing a jar of laddus in a week.", who: "Customer name", where: "City" },
];

function HeroImage() {
  const desktop = resolveImage(images.hero.src);
  const mobile = resolveImage(images.heroMobile.src);
  if (!desktop || !mobile) {
    return <SmartImage image={images.hero} sizes="100vw" preload className={styles.heroImage} />;
  }
  // Art-directed: square crop on phones, wide crop from 700px.
  const common = { alt: images.hero.alt, sizes: "100vw", preload: true };
  const { props: { srcSet: wide } } = getImageProps({ ...common, src: desktop, width: 2400, height: 1050 });
  const { props: { srcSet: square, ...rest } } = getImageProps({ ...common, src: mobile, width: 1200, height: 1200 });
  return (
    <div className={styles.heroImage}>
      <picture>
        <source media="(min-width: 700px)" srcSet={wide} />
        <img {...rest} srcSet={square} className={styles.heroPicture} alt={images.hero.alt} />
      </picture>
    </div>
  );
}

export default function HomePage() {
  const bestsellers = products.filter((p) => p.featured).slice(0, 4);
  const homeFaqs = faqs.flatMap((g) => g.items).slice(0, 4);

  return (
    <>
      {/* Hero — centred, stacked */}
      <section className={styles.hero} aria-labelledby="hero-title">
        <div className={`wrap ${styles.heroText}`}>
          <p className="eyebrow">Homemade in small batches</p>
          <h1 id="hero-title" className={styles.heroTitle}>
            Made at home, the slow way.
          </h1>
          <p className={styles.heroSub}>
            Panjiri, pinni, dry-fruit laddus and mixes — roasted by hand in our family kitchen, with ingredients you’d keep in your own.
          </p>
          <div className={styles.heroCtas}>
            <Link href="/shop" className="btn btn--lg">
              Shop all products
            </Link>
            <Link href="/shop?custom=1" className="btn btn--outline btn--lg">
              Build a custom batch
            </Link>
          </div>
        </div>
        <div className={`wrap ${styles.heroMedia}`}>
          <HeroImage />
        </div>
      </section>

      {/* Categories */}
      <section className="wrap section" aria-labelledby="cats-title">
        <SectionHead id="cats-title" title="Shop by category" href="/shop" linkLabel="Shop all" />
        <ul className={styles.cats}>
          {categories.map((c) => {
            const count = productsIn(c.slug).length;
            return (
              <li key={c.slug}>
                <Link href={`/shop?category=${c.slug}`} className={styles.cat}>
                  <SmartImage image={categoryImage(c.slug, c.name)} sizes="(min-width: 1000px) 18vw, 42vw" ratio="4 / 5" decorative />
                  <span className={styles.catName}>{c.name}</span>
                  <span className={styles.catMeta}>{c.comingSoon ? "Coming soon" : `${count} ${count === 1 ? "product" : "products"}`}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      {/* Bestsellers */}
      <section className="wrap" aria-labelledby="best-title">
        <SectionHead id="best-title" title="Bestsellers" href="/shop" />
        <div className={styles.grid}>
          {bestsellers.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>

      {/* Promises */}
      <section className="wrap section" aria-label="Why Immunitywize">
        <ul className={styles.promises}>
          {promises.map((p) => (
            <li key={p.title}>
              <h3>{p.title}</h3>
              <p>{p.body}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* Kitchen story (scroll-drawn) */}
      <div className="band">
        <div className="wrap">
          <KitchenScene />
        </div>
      </div>

      {/* Shop by need */}
      <section className={`wrap section ${styles.need}`} aria-labelledby="need-title">
        <SmartImage image={images.ingredients} sizes="(min-width: 900px) 40vw, 100vw" ratio="4 / 5" className={styles.needImage} />
        <div>
          <p className="eyebrow">Shop by need</p>
          <h2 id="need-title" className={styles.needTitle}>
            Recipes made for a reason
          </h2>
          <p className={styles.needIntro}>Each recipe comes from a tradition of cooking for family — through winters, new babies, exams and long days.</p>
          <ul className={styles.needList}>
            {benefits.map((b) => (
              <li key={b.slug}>
                <Link href={`/shop?need=${b.slug}`}>
                  <span>
                    <span className={styles.needName}>{b.title}</span>
                    <span className={styles.needLine}>{b.line}</span>
                  </span>
                  <ArrowRight className={styles.needArrow} />
                </Link>
              </li>
            ))}
          </ul>
          <p className={styles.disclaimer}>
            <Placeholder note="regulatory review of benefit copy">
              Describes traditional use, not medical claims. Please ask your doctor about diet during pregnancy, postpartum or illness.
            </Placeholder>
          </p>
        </div>
      </section>

      {/* Customise */}
      <section className="band" aria-labelledby="custom-title">
        <div className={`wrap section ${styles.custom}`}>
          <div className={styles.customText}>
            <p className="eyebrow">Made to order</p>
            <h2 id="custom-title">Your family’s recipe, from 500 g</h2>
            <p>Panjiri and laddus can be cooked to your taste. We make each custom order as its own batch.</p>
            <ul className={styles.ticks}>
              <li>Add more of what you love, or leave things out</li>
              <li>Choose a lighter sweetness</li>
              <li>Leave a note for the kitchen</li>
            </ul>
            <div className={styles.customCtas}>
              <Link href="/shop/classic-panjiri" className="btn">
                Customise panjiri
              </Link>
              <Link href="/shop/dry-fruit-laddu" className="btn btn--outline">
                Customise laddus
              </Link>
            </div>
          </div>
          <SmartImage image={images.customise} sizes="(min-width: 900px) 50vw, 100vw" ratio="5 / 4" />
        </div>
      </section>

      {/* Reviews */}
      <section className="wrap section" aria-labelledby="reviews-title">
        <SectionHead id="reviews-title" title="Kind words" eyebrow="From our customers" />
        <ul className={styles.reviews}>
          {reviews.map((r, i) => (
            <li key={i}>
              <blockquote>
                <p>“{r.quote}”</p>
              </blockquote>
              <p className={styles.reviewer}>
                {r.who} <span>· {r.where}</span>
              </p>
            </li>
          ))}
        </ul>
        <p className={styles.reviewNote}>
          <Placeholder note="connect a reviews provider">Verified reviews will appear here.</Placeholder>
        </p>
      </section>

      {/* Story teaser */}
      <section className={`wrap ${styles.story}`} aria-labelledby="story-title">
        <SmartImage image={images.story} sizes="(min-width: 900px) 50vw, 100vw" ratio="4 / 3" />
        <div className={styles.storyText}>
          <p className="eyebrow">Our story</p>
          <h2 id="story-title">From one family kitchen to yours</h2>
          <p>
            It began with friends asking for the recipe, then asking if we could just make them a jar. Today we cook the panjiri, pinni and laddus we grew up
            on — the same way — for homes across India.
          </p>
          <Link href="/our-story" className="arrow-link">
            Read our story <ArrowRight />
          </Link>
        </div>
      </section>

      {/* FAQ */}
      <section className={`wrap section ${styles.faq}`} aria-labelledby="faq-title">
        <div>
          <h2 id="faq-title" className={styles.faqTitle}>
            Questions, answered
          </h2>
          <Link href="/faq" className="arrow-link">
            All FAQs <ArrowRight />
          </Link>
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
