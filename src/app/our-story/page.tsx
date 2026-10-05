import type { Metadata } from "next";
import Link from "next/link";
import { images } from "@/data/images";
import { SmartImage } from "@/components/SmartImage";
import { Placeholder } from "@/components/Placeholder";
import { Breadcrumbs, Toran } from "@/components/ui";
import styles from "../content.module.css";

export const metadata: Metadata = {
  title: "Our story",
  description: "How a family kitchen started cooking panjiri and pinni for homes across India.",
  alternates: { canonical: "/our-story" },
};

const values = [
  { t: "Nothing to hide", d: "Every product lists its full recipe by weight. If we wouldn’t put it in our own kitchen, it isn’t in yours." },
  { t: "Slow on purpose", d: "Atta is roasted in ghee until it smells right. There’s no shortcut, so we don’t take one." },
  { t: "Made for someone", d: "These recipes were always cooked for a person — a new mother, a child before exams. We still cook that way." },
];

export default function OurStoryPage() {
  return (
    <div className="container">
      <Breadcrumbs items={[{ href: "/", label: "Home" }, { label: "Our story" }]} />
      <section className={styles.storyHero}>
        <div>
          <p className="eyebrow">Our story</p>
          <h1>It started with someone asking for the recipe</h1>
          <p className="lead">
            <Placeholder note="founder story to be written with the family">
              A placeholder for the founders’ own words — who cooks, where the recipes come from and why Immunitywize exists.
            </Placeholder>
          </p>
          <Link href="/shop" className="btn">
            Shop the range
          </Link>
        </div>
        <SmartImage image={images.storyHero} sizes="(min-width: 900px) 35vw, 90vw" ratio="4 / 5" className="arch" />
      </section>
      <Toran />
      <ul className={styles.values}>
        {values.map((v) => (
          <li key={v.t}>
            <h2 style={{ fontSize: "var(--fs-24)" }}>{v.t}</h2>
            <p className="muted" style={{ margin: 0 }}>
              {v.d}
            </p>
          </li>
        ))}
      </ul>
      <div className={styles.gallery}>
        <SmartImage image={images.storyRoasting} sizes="(min-width: 800px) 30vw, 100vw" ratio="4 / 5" />
        <SmartImage image={images.storyRolling} sizes="(min-width: 800px) 30vw, 100vw" ratio="4 / 5" />
        <SmartImage image={images.storyPacking} sizes="(min-width: 800px) 30vw, 100vw" ratio="4 / 5" />
      </div>
    </div>
  );
}
