"use client";

import { useEffect, useRef, useState } from "react";
import { recipes, type GlyphKind } from "@/data/ingredients";
import { BowlVisual, type Change } from "../builder/BowlVisual";
import styles from "./home-components.module.css";

const recipe = recipes["classic-panjiri"];
const house = Object.fromEntries(recipe.ingredients.map((i) => [i.id, i.default])) as Record<GlyphKind, number>;

// A short, looping "someone is building a batch" script.
const script: { set?: Partial<Record<GlyphKind, number>>; roast?: "golden" | "deep"; text: string; dir: Change["dir"] }[] = [
  { set: { almond: 3 }, text: "More almonds", dir: "add" },
  { set: { raisin: 0 }, text: "− Raisins", dir: "remove" },
  { set: { pistachio: 3 }, text: "+ Pistachios", dir: "add" },
  { roast: "deep", text: "Deep roast", dir: "swap" },
  { set: { saffron: 2 }, text: "+ Saffron", dir: "add" },
  { set: { ...house }, roast: "golden", text: "House recipe", dir: "swap" },
];

export function BowlDemo() {
  const [levels, setLevels] = useState(house);
  const [roast, setRoast] = useState<"golden" | "deep">("golden");
  const [change, setChange] = useState<Change | null>(null);
  const [visible, setVisible] = useState(false);
  const step = useRef(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!visible || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => {
      const s = script[step.current % script.length];
      step.current += 1;
      if (s.set) setLevels((l) => ({ ...l, ...s.set }));
      if (s.roast) setRoast(s.roast);
      setChange({ n: step.current, text: s.text, dir: s.dir });
    }, 1900);
    return () => clearInterval(t);
  }, [visible]);

  const tint = roast === "deep" ? recipe.baseTint.atta.deep : recipe.baseTint.atta.light;
  return (
    <div ref={ref} className={styles.demo}>
      <BowlVisual levels={levels} tint={tint} sheen={1} fine={false} change={change} uid="demo" label="Animated preview of a panjiri batch being customised" />
    </div>
  );
}
