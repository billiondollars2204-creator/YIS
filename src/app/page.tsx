import Link from "next/link";
import { products } from "@/data/products";
import { benefits } from "@/data/content";
import { ProductArt } from "@/components/art/ProductArt";
import { Arrow, BenefitIcon, PaperEdge, Squiggle } from "@/components/art/Marks";
import { KitchenScene } from "@/components/KitchenScene";
import { ProductTile } from "@/components/ProductTile";
import { PhotoSlot } from "@/components/PhotoSlot";
import { Placeholder } from "@/components/Placeholder";
import styles from "./home.module.css";

const differences = [
  {
    title: "Cooked in a home kitchen",
    body: "Not a factory line. The same kadhai, the same slow flame, a few kilos at a time.",
  },
  {
    title: "Ingredients you can pronounce",
    body: "Pantry staples you’d recognise from your own kitchen — listed in full on every product.",
  },
  {
    title: "Made to order, not to sit",
    body: "We cook in small runs so what reaches you is fresh, not months old in a warehouse.",
  },
];

const testimonials = [
  { quote: "Customer review placeholder — a short, specific line about taste or the memory it brought back.", who: "Name, City" },
  { quote: "Customer review placeholder — something about ordering for a new mother in the family.", who: "Name, City" },
  { quote: "Customer review placeholder — a line about the kids actually eating it.", who: "Name, City" },
];

export default function HomePage() {
  const featured = products.filter((p) => p.featured).slice(0, 4);

  return (
    <>
      {/* 1 — Hero */}
      <section className={`wrap ${styles.hero}`} aria-labelledby="hero-title">
        <div className={styles.heroCopy}>
          <p className="eyebrow">Ghar ka bana, haath se</p>
          <h1 id="hero-title" className={styles.heroTitle}>
            Slow-roasted at home.{" "}
            <em className={styles.underlined}>
              Shared by the{" "}
              <span className={styles.squiggleWord}>
                spoonful.
                <Squiggle className={styles.heroSquiggle} />
              </span>
            </em>
          </h1>
          <p className="lede">
            Panjiri, pinni, dry-fruit laddus and mewa mixes — cooked by hand in small batches from our family’s recipes, with
            real ingredients and nothing you wouldn’t keep in your own kitchen.
          </p>
          <div className={styles.heroActions}>
            <Link href="/shop" className="btn">
              Shop the pantry
            </Link>
            <Link href="#kitchen" className="arrow-link">
              See how it’s made <span aria-hidden="true">→</span>
            </Link>
          </div>
          <ul className={styles.assurances} aria-label="Our promises">
            <li>Small batches</li>
            <li>
              <Placeholder note="confirm wording after ingredient review">No preservatives</Placeholder>
            </li>
            <li>
              <Placeholder note="confirm serviceable regions">Ships across India</Placeholder>
            </li>
          </ul>
        </div>

        <div className={styles.heroArt} aria-hidden="true">
          <div className={styles.heroMain}>
            <ProductArt kind="laddu" variant={1} />
          </div>
          <div className={styles.heroSideA}>
            <ProductArt kind="panjiri" variant={0} />
          </div>
          <div className={styles.heroSideB}>
            <ProductArt kind="pinni" variant={2} />
          </div>
          <p className={`${styles.note} ${styles.noteA}`}>
            rolled one by one
            <Arrow className={styles.noteArrow} />
          </p>
          <p className={`${styles.note} ${styles.noteB}`}>
            <Arrow className={styles.noteArrowB} flip />
            roasted till golden
          </p>
        </div>
      </section>

      {/* 2 — Who we are */}
      <section className={`wrap section ${styles.who}`} aria-labelledby="who-title">
        <div className={styles.whoPhoto} data-reveal>
          <PhotoSlot label="Mum at the stove, Sunday morning" tilt={-3} />
        </div>
        <div className={styles.whoCopy} data-reveal style={{ "--delay": 120 } as React.CSSProperties}>
          <p className="eyebrow">Who we are</p>
          <h2 id="who-title">A family kitchen that started cooking for more than the family</h2>
          <p className={styles.dropcap}>
            Immunitywize began the way most good food does — someone asking for the recipe, and then asking if we could just
            make them a jar instead. Today we cook the panjiri, pinni and laddus we grew up on, the same way, for homes across
            India.
          </p>
          <p>
            <Placeholder note="replace with the founders’ own story">
              Founder story placeholder: who cooks, where the recipes come from, and why the brand exists.
            </Placeholder>
          </p>
          <Link href="/our-story" className="arrow-link">
            Read our story <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      {/* 3 — What makes us different */}
      <section className="band" aria-labelledby="diff-title">
        <PaperEdge color="var(--paper-deep)" />
        <div className={`wrap section ${styles.diff}`}>
          <div className={styles.diffHead} data-reveal>
            <p className="eyebrow">Why it’s different</p>
            <h2 id="diff-title">What you won’t find on a supermarket shelf</h2>
          </div>
          <ol className={styles.diffList}>
            {differences.map((d, i) => (
              <li key={d.title} data-reveal style={{ "--delay": i * 120 } as React.CSSProperties}>
                <span className={styles.diffNum} aria-hidden="true">
                  {i + 1}
                </span>
                <h3>{d.title}</h3>
                <p>{d.body}</p>
              </li>
            ))}
          </ol>
        </div>
        <PaperEdge color="var(--paper)" />
      </section>

      {/* 4 — Scroll-driven kitchen story */}
      <div className="wrap">
        <KitchenScene />
      </div>

      {/* 5 — Benefits */}
      <section className={`section ${styles.benefits}`} aria-labelledby="benefits-title">
        <div className="wrap">
          <div className={styles.benefitsHead} data-reveal>
            <p className="eyebrow">Made with intention</p>
            <h2 id="benefits-title">Foods our grandmothers made for a reason</h2>
            <p className="lede">
              Each recipe comes from a tradition of cooking for the people you love — through winters, new babies, exams and
              long days.
            </p>
          </div>
          <ul className={styles.benefitList}>
            {benefits.map((b, i) => (
              <li key={b.slug} data-reveal style={{ "--delay": i * 90 } as React.CSSProperties}>
                <span className={styles.benefitIcon}>
                  <BenefitIcon slug={b.slug} />
                </span>
                <h3>{b.title}</h3>
                <p>{b.line}</p>
              </li>
            ))}
          </ul>
          <p className={styles.disclaimer}>
            <Placeholder note="regulatory review of all benefit copy">
              These describe how such foods are traditionally enjoyed. They are not medical claims and not a substitute for
              advice from your doctor.
            </Placeholder>
          </p>
        </div>
      </section>

      {/* 6 — Featured products */}
      <section className="wrap section" aria-labelledby="featured-title">
        <div className={styles.featuredHead}>
          <div data-reveal>
            <p className="eyebrow">From the pantry</p>
            <h2 id="featured-title">Start with a favourite</h2>
          </div>
          <Link href="/shop" className="arrow-link">
            See everything <span aria-hidden="true">→</span>
          </Link>
        </div>
        <div className={styles.featuredGrid}>
          {featured.map((p, i) => (
            <ProductTile key={p.slug} product={p} index={i} />
          ))}
        </div>
      </section>

      {/* 7 — Customise teaser */}
      <section className={`wrap ${styles.customise}`} aria-labelledby="custom-title">
        <div className={styles.customiseInner} data-reveal>
          <div className={styles.customiseArt} aria-hidden="true">
            <ProductArt kind="panjiri" variant={2} />
          </div>
          <div>
            <p className="eyebrow">Make it yours</p>
            <h2 id="custom-title">Less sweet? No nuts? Extra for Nani?</h2>
            <p>
              Panjiri and laddus can be cooked to your taste. Add or leave out ingredients and choose your sweetness — we’ll
              make a batch just for you.
            </p>
            <p className={styles.rule}>
              <strong>Custom batches start at 500 g</strong> — smaller amounts don’t roast evenly, so we keep them to our
              standard recipe.
            </p>
            <Link href="/shop/classic-panjiri" className="btn">
              Customise a panjiri
            </Link>
          </div>
        </div>
      </section>

      {/* 8 — Promise: homemade, real ingredients, quality */}
      <section id="promise" className="band" aria-labelledby="promise-title">
        <PaperEdge color="var(--paper-deep)" />
        <div className={`wrap section ${styles.promise}`}>
          <div className={styles.promiseHead} data-reveal>
            <p className="eyebrow">Our promise</p>
            <h2 id="promise-title">What goes in, and what never does</h2>
            <p>
              Everything is prepared by hand in our home kitchen. We list every ingredient on the pack, and we don’t add
              anything we wouldn’t give our own family.
            </p>
          </div>
          <div className={styles.lists}>
            <div data-reveal>
              <h3 className={styles.listTitle}>Always</h3>
              <ul className={styles.yes}>
                <li>Whole, recognisable pantry ingredients</li>
                <li>Roasted slowly by hand, in small batches</li>
                <li>Full ingredient list on every product</li>
                <li>Packed fresh, close to the day it’s made</li>
              </ul>
            </div>
            <div data-reveal style={{ "--delay": 120 } as React.CSSProperties}>
              <h3 className={styles.listTitle}>Never</h3>
              <ul className={styles.no}>
                <li>
                  <Placeholder note="confirm with ingredient & lab review">Artificial preservatives</Placeholder>
                </li>
                <li>
                  <Placeholder note="confirm with ingredient review">Artificial colours or flavours</Placeholder>
                </li>
                <li>
                  <Placeholder note="confirm with ingredient review">Refined-sugar syrups or fillers</Placeholder>
                </li>
              </ul>
            </div>
          </div>
          <div className={styles.stamps} aria-label="Certifications and quality assurances (placeholders)" role="list">
            {["FSSAI licence", "Lab-tested batches", "Hygiene audit", "Your badge here"].map((s, i) => (
              <div key={s} className={styles.stamp} role="listitem" style={{ rotate: `${[-6, 4, -3, 7][i]}deg` }}>
                <span className={styles.stampTitle}>{s}</span>
                <span className={styles.stampSub}>placeholder</span>
              </div>
            ))}
          </div>
        </div>
        <PaperEdge color="var(--paper)" />
      </section>

      {/* 9 — Social proof */}
      <section className="wrap section" aria-labelledby="love-title">
        <div data-reveal>
          <p className="eyebrow">Notes from your kitchens</p>
          <h2 id="love-title">Kind words, kept on the fridge</h2>
        </div>
        <ul className={styles.notes}>
          {testimonials.map((t, i) => (
            <li key={i} className={styles.noteCard} data-reveal style={{ "--delay": i * 120, rotate: `${[-2, 1.5, -1][i]}deg` } as React.CSSProperties}>
              <blockquote>
                <p>“{t.quote}”</p>
              </blockquote>
              <p className={styles.noteWho}>— {t.who}</p>
            </li>
          ))}
        </ul>
        <p className={styles.proofMeta}>
          <Placeholder note="connect a reviews provider or add verified reviews">
            Ratings and press mentions will appear here.
          </Placeholder>
        </p>
      </section>

      {/* 10 — Closing */}
      <section className={`wrap ${styles.closing}`} aria-labelledby="closing-title">
        <h2 id="closing-title" data-reveal>
          Something warm for the jar on your counter.
        </h2>
        <Link href="/shop" className="btn" data-reveal>
          Browse the pantry
        </Link>
      </section>
    </>
  );
}
