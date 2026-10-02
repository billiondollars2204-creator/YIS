import type { Metadata } from "next";
import Link from "next/link";
import { PhotoSlot } from "@/components/PhotoSlot";
import { Placeholder } from "@/components/Placeholder";
import styles from "../content.module.css";

export const metadata: Metadata = {
  title: "Our story",
  description: "How a family kitchen started cooking panjiri and laddus for homes across India.",
  alternates: { canonical: "/our-story" },
};

// PLACEHOLDER milestones — replace with the real history.
const milestones = [
  { year: "Years ago", title: "A recipe in a notebook", body: "Placeholder: where the recipes come from — a grandmother, a village, a winter tradition." },
  { year: "The first jar", title: "Friends started asking", body: "Placeholder: the moment cooking for family turned into cooking for others." },
  { year: "Today", title: "Immunitywize", body: "Placeholder: the kitchen today, who’s in it, and how many homes you cook for." },
];

export default function OurStoryPage() {
  return (
    <div className="wrap">
      <section className={styles.storyHero}>
        <div>
          <p className="eyebrow">Our story</p>
          <h1>It started with someone asking for the recipe</h1>
          <p className="lede">
            <Placeholder note="founder story to be written with the family">
              This page is a placeholder for the founders’ own words — told plainly, the way you’d tell it at the dinner table.
            </Placeholder>
          </p>
        </div>
        <div className={styles.storyPhoto}>
          <PhotoSlot label="The family, in the kitchen" tilt={3} />
        </div>
      </section>

      <section className="prose" aria-labelledby="why-title">
        <h2 id="why-title">Why we cook this way</h2>
        <p>
          The foods we make — panjiri, pinni, laddus — were never meant for factories. They were made in home kitchens, in
          small amounts, by people who knew exactly who would be eating them. We think that care is something you can taste.
        </p>
        <p>So we still cook the slow way: a heavy kadhai, a low flame, and enough patience to wait until it smells right.</p>
      </section>

      <ol className={styles.timeline} aria-label="Our journey">
        {milestones.map((m) => (
          <li key={m.title} data-reveal>
            <span className={styles.year}>{m.year}</span>
            <h3>{m.title}</h3>
            <p>{m.body}</p>
          </li>
        ))}
      </ol>

      <blockquote className={styles.pull}>
        “Quote placeholder — something the founder’s mother or grandmother always said about cooking.”
        <cite>— Name, relation</cite>
      </blockquote>

      <div className={styles.photos}>
        <PhotoSlot label="Roasting the atta" tilt={-2} ratio="1 / 1" />
        <PhotoSlot label="Hands rolling laddus" tilt={2} ratio="1 / 1" />
        <PhotoSlot label="Packing day" tilt={-1} ratio="1 / 1" />
      </div>

      <section className="prose" aria-labelledby="next-title" style={{ paddingBottom: "var(--space-8)" }}>
        <h2 id="next-title">Come into the kitchen</h2>
        <p>The best way to know us is to taste what we make.</p>
        <Link href="/shop" className="btn">
          Visit the pantry
        </Link>
      </section>
    </div>
  );
}
