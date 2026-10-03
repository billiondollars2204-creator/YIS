"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { benefits } from "@/data/content";
import { ArrowRight } from "../icons";
import styles from "./home-components.module.css";

/**
 * Hero headline with a rotating audience ("for new mothers") kept in sync
 * with the "Shop for" links below it. Hover or focus a link to pick it.
 */
export function HeroIntro() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setI((n) => (n + 1) % benefits.length), 2600);
    return () => clearInterval(t);
  }, [paused]);

  const current = benefits[i];

  return (
    <>
      <h1 className={styles.title}>
        <span className={styles.titleLine}>Homemade panjiri &amp; laddus</span>{" "}
        <span className={styles.titleLine}>
          for{" "}
          <span className={styles.rotator} aria-hidden="true">
            <span key={current.slug} className={styles.word}>
              {current.occasion}.
              <svg viewBox="0 0 200 12" preserveAspectRatio="none" className={styles.underline}>
                <path d="M2 8C30 3 60 10 100 6S170 3 198 7" pathLength={1} />
              </svg>
            </span>
          </span>
          <span className="visually-hidden">every kind of day.</span>
        </span>
      </h1>

      <p className={styles.sub}>
        Hand-roasted in small batches in our family kitchen, with the same pantry ingredients you’d use at home. Never on a factory line.
      </p>

      <div className={styles.ctas}>
        <Link href="/shop" className="btn btn--lg">
          Shop bestsellers <ArrowRight className={styles.ctaArrow} />
        </Link>
        <Link href="/customise" className="btn btn--outline btn--lg">
          Build your own batch
        </Link>
      </div>

      <nav className={styles.needs} aria-label="Shop by need" onMouseLeave={() => setPaused(false)}>
        <span className={styles.needsLabel}>Shop for</span>
        <ul>
          {benefits.map((b, n) => (
            <li key={b.slug}>
              <Link
                href={`/shop?need=${b.slug}`}
                data-active={n === i || undefined}
                onMouseEnter={() => {
                  setPaused(true);
                  setI(n);
                }}
                onFocus={() => {
                  setPaused(true);
                  setI(n);
                }}
                onBlur={() => setPaused(false)}
              >
                {b.occasion}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
