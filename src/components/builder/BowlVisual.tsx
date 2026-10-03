"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { GlyphKind } from "@/data/ingredients";
import { BowlArt, piecesFor, type Piece } from "../art/BowlArt";
import styles from "./builder.module.css";

export type Change = { n: number; text: string; dir: "add" | "remove" | "swap" };

type Props = {
  levels: Partial<Record<GlyphKind, number>>;
  tint: string;
  sheen: number;
  fine: boolean;
  change: Change | null;
  uid: string;
  label: string;
  dim?: boolean;
};

/**
 * Animated bowl: pieces drop in when an ingredient is added or increased,
 * lift out when reduced, and the batch gives a small stir on every change.
 */
export function BowlVisual({ levels, tint, sheen, fine, change, uid, label, dim }: Props) {
  const target = useMemo(() => piecesFor(levels), [levels]);
  const [rendered, setRendered] = useState<Piece[]>(target);
  const [chips, setChips] = useState<Change[]>([]);
  const contents = useRef<SVGGElement>(null);
  const reduce = useRef(false);

  useEffect(() => {
    reduce.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  useEffect(() => {
    setRendered((prev) => {
      const want = new Set(target.map((p) => p.key));
      const had = new Set(prev.map((p) => p.key));
      const kept = prev.filter((p) => want.has(p.key)).map((p) => (p.leaving ? { ...p, leaving: false } : p));
      const leaving = prev.filter((p) => !want.has(p.key)).map((p) => ({ ...p, leaving: true }));
      return [...kept, ...target.filter((p) => !had.has(p.key)), ...leaving];
    });
    const t = setTimeout(() => setRendered((prev) => prev.filter((p) => !p.leaving)), 450);
    return () => clearTimeout(t);
  }, [target]);

  useEffect(() => {
    if (!change) return;
    setChips((c) => [...c.slice(-2), change]);
    const t = setTimeout(() => setChips((c) => c.filter((x) => x.n !== change.n)), 1600);
    if (!reduce.current && contents.current?.animate) {
      contents.current.animate(
        [{ transform: "rotate(0deg)" }, { transform: `rotate(${change.dir === "remove" ? -7 : 7}deg)` }, { transform: "rotate(0deg)" }],
        { duration: 700, easing: "cubic-bezier(.4,0,.2,1)" },
      );
    }
    return () => clearTimeout(t);
  }, [change]);

  return (
    <div className={styles.bowl} data-dim={dim || undefined}>
      <BowlArt pieces={rendered} tint={tint} sheen={sheen} fine={fine} animate contentsRef={contents} uid={uid} label={label} />
      <div className={styles.chips} aria-hidden="true">
        {chips.map((c) => (
          <span key={c.n} className={styles.chip} data-dir={c.dir}>
            {c.text}
          </span>
        ))}
      </div>
    </div>
  );
}
