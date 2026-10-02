"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import styles from "./KitchenScene.module.css";

/**
 * Scroll-driven sketch of a mother cooking at home. Scroll progress is written
 * to a single CSS variable (--p) so the drawing animates without React renders;
 * each stroke reveals between its own start (s) and duration (d).
 */
type Stroke = { d: string; s: number; dur?: number; cls?: string };

const room: Stroke[] = [
  { d: "M20 430C150 428 300 433 580 429", s: 0 },
  { d: "M420 190L420 92C420 52 470 30 495 30C520 30 570 52 570 92L570 190", s: 0.02 },
  { d: "M410 192C450 190 530 194 582 191", s: 0.05 },
  { d: "M495 32L495 190M421 120C470 118 520 122 569 120", s: 0.07, cls: "thin" },
  { d: "M530 63C537 63 542 68 542 75C542 82 537 87 530 87C523 87 518 82 518 75C518 68 523 63 530 63Z", s: 0.09, cls: "thin" },
  { d: "M440 192L436 170L466 170L462 192", s: 0.1 },
  { d: "M451 170C448 156 440 150 435 146M451 170C454 153 462 148 468 144M451 170L451 148", s: 0.12, cls: "thin" },
  { d: "M40 120C90 118 140 122 190 119", s: 0.04 },
  { d: "M55 119L55 92C55 86 77 86 77 92L77 119M53 88C60 84 72 84 79 88", s: 0.08 },
  { d: "M95 119L93 100C93 94 115 94 115 100L113 119", s: 0.1 },
  { d: "M140 119L140 82C140 76 150 70 155 70C160 70 170 76 170 82L170 119", s: 0.12 },
  { d: "M60 121L70 134M170 121L160 134", s: 0.13, cls: "thin" },
  { d: "M320 300C400 298 500 302 590 299", s: 0.06 },
  { d: "M325 302L325 430M585 301L585 430", s: 0.09 },
  { d: "M325 360C420 358 500 362 585 359", s: 0.12, cls: "thin" },
];

const mother: Stroke[] = [
  { d: "M250 122C266 121 279 134 278 151C277 168 265 180 249 179C234 178 222 166 223 150C224 134 236 123 250 122Z", s: 0.2 },
  { d: "M230 128C220 122 208 130 210 141C212 151 224 153 230 146", s: 0.23 },
  { d: "M224 148C228 132 244 122 262 126C270 128 276 134 278 142", s: 0.24, cls: "thin" },
  { d: "M278 150L284 158L278 160", s: 0.26, cls: "thin" },
  { d: "M262 146C265 149 269 149 271 146M266 166C270 168 274 167 276 164", s: 0.27, cls: "thin" },
  { d: "M243 178L241 194M257 178L259 194", s: 0.28 },
  { d: "M241 194C226 198 216 210 214 230L210 290C208 300 206 310 200 330C192 360 186 400 180 430", s: 0.29 },
  { d: "M259 194C272 198 280 210 282 226L284 288C290 320 300 380 312 430", s: 0.3 },
  { d: "M180 430C220 434 270 434 312 430", s: 0.34 },
  { d: "M212 286C236 292 262 292 284 286", s: 0.35, cls: "thin" },
  { d: "M230 300C238 340 240 390 238 430M250 300C256 340 262 390 266 430M270 300C276 340 284 390 290 430", s: 0.36, cls: "thin" },
  { d: "M259 196C240 230 222 270 214 300C210 320 204 340 196 360", s: 0.38 },
  { d: "M244 200C228 236 214 272 206 306", s: 0.4, cls: "thin" },
];

const arm: Stroke[] = [
  { d: "M272 206C284 222 292 240 298 258C312 258 328 252 342 244", s: 0.32 },
  { d: "M280 216C290 232 296 248 300 266C316 266 330 260 345 252", s: 0.34, cls: "thin" },
  { d: "M342 244C350 240 357 244 355 250C353 256 346 257 344 252", s: 0.37 },
  { d: "M326 249C328 254 330 257 332 259M332 246C334 251 336 254 338 256", s: 0.39, cls: "thin" },
  { d: "M352 247L392 266", s: 0.44 },
];

const stove: Stroke[] = [
  { d: "M345 300L350 294L470 294L475 300", s: 0.42 },
  { d: "M352 262C356 284 380 291 410 291C440 291 464 284 468 262", s: 0.46 },
  { d: "M348 262C380 256 440 256 472 262", s: 0.48 },
  { d: "M348 262C340 258 336 266 344 268M472 262C480 258 484 266 476 268", s: 0.5, cls: "thin" },
  { d: "M362 260C370 252 384 254 392 256C402 248 420 250 428 255C440 250 452 254 458 260", s: 0.52, cls: "thin" },
  { d: "M500 298C500 292 570 292 570 298C570 303 500 303 500 298Z", s: 0.54 },
  {
    d: "M520 277C525 277 529 281 529 286C529 291 525 295 520 295C515 295 511 291 511 286C511 281 515 277 520 277ZM540 277C545 277 549 281 549 286C549 291 545 295 540 295C535 295 531 291 531 286C531 281 535 277 540 277ZM530 263C535 263 539 267 539 272C539 277 535 281 530 281C525 281 521 277 521 272C521 267 525 263 530 263Z",
    s: 0.57,
  },
];

const steam: Stroke[] = [
  { d: "M392 242C382 226 402 216 392 200C382 185 400 175 394 160", s: 0.62, dur: 0.14, cls: "thin" },
  { d: "M416 238C406 222 426 210 416 194C406 178 424 168 418 152", s: 0.66, dur: 0.14, cls: "thin" },
  { d: "M440 242C432 228 450 218 442 204", s: 0.7, dur: 0.12, cls: "thin" },
  { d: "M418 138C418 132 410 131 410 137C410 142 418 146 418 146C418 146 426 142 426 137C426 131 418 132 418 138Z", s: 0.8, dur: 0.08 },
];

const steps = [
  {
    title: "Before the house wakes up",
    body: "The kitchen is quiet. The heavy kadhai goes on a low flame, and the jars come down from the shelf.",
  },
  {
    title: "Roasting takes patience",
    body: "Flour is roasted slowly and stirred without stopping, until it turns golden and smells nutty. There is no shortcut for this part.",
  },
  {
    title: "Folded in by hand",
    body: "Nuts and the good things go in, a little at a time. Tasted, adjusted, tasted again — the way it was taught to us.",
  },
  {
    title: "Packed the same day",
    body: "Each batch cools, gets rolled or spooned into jars, and is packed for you while it is still fresh.",
  },
];

function Strokes({ list }: { list: Stroke[] }) {
  return (
    <>
      {list.map((st, i) => (
        <path
          key={i}
          d={st.d}
          pathLength={1}
          className={st.cls ? styles[st.cls] : undefined}
          style={{ "--s": st.s, "--d": st.dur ?? 0.1 } as CSSProperties}
        />
      ))}
    </>
  );
}

export function KitchenScene() {
  const sectionRef = useRef<HTMLElement>(null);
  const artRef = useRef<SVGSVGElement>(null);
  const [step, setStep] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    const art = artRef.current;
    if (!section || !art) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let lastStep = -1;

    const update = () => {
      frame = 0;
      const rect = section.getBoundingClientRect();
      const travel = rect.height - window.innerHeight * 0.6;
      const raw = (window.innerHeight * 0.4 - rect.top) / Math.max(1, travel);
      const p = reduce.matches ? 1 : Math.min(1, Math.max(0, raw));
      art.style.setProperty("--p", p.toFixed(4));
      const next = Math.min(steps.length - 1, Math.max(0, Math.floor(Math.min(1, Math.max(0, raw)) * steps.length * 0.999)));
      if (next !== lastStep) {
        lastStep = next;
        setStep(next);
      }
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    reduce.addEventListener("change", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      reduce.removeEventListener("change", onScroll);
    };
  }, []);

  return (
    <section ref={sectionRef} id="kitchen" className={styles.section} aria-labelledby="kitchen-title">
      <div className={styles.stickyArt}>
        <svg
          ref={artRef}
          viewBox="0 0 600 460"
          className={styles.svg}
          role="img"
          aria-label="A pencil sketch of a mother standing at her stove, stirring a kadhai while steam rises, with jars on a shelf and a tulsi plant on the windowsill."
        >
          <defs>
            <filter id="wash-rough" x="-10%" y="-10%" width="120%" height="120%">
              <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="2" seed="7" />
              <feDisplacementMap in="SourceGraphic" scale="9" />
            </filter>
          </defs>
          <g className={styles.washes} filter="url(#wash-rough)">
            <path d="M424 186L424 94C424 58 470 36 495 36C520 36 566 58 566 94L566 186Z" fill="var(--wash-turmeric)" />
            <circle cx="530" cy="75" r="15" fill="var(--turmeric)" opacity=".7" />
            <path d="M216 210C230 196 270 196 282 222L286 290C296 340 304 390 312 430L180 430C190 380 204 330 212 290Z" fill="var(--wash-saffron)" />
            <path d="M210 141C212 128 224 120 236 124L232 148C222 152 212 150 210 141Z" fill="var(--ink-soft)" opacity=".5" />
            <ellipse cx="410" cy="262" rx="58" ry="10" fill="var(--turmeric)" opacity=".55" />
            <path d="M55 119L55 92C55 86 77 86 77 92L77 119ZM140 119L140 82C140 76 150 70 155 70C160 70 170 76 170 82L170 119Z" fill="var(--wash-cardamom)" />
            <path d="M511 286C511 270 549 262 549 286C549 296 511 296 511 286Z" fill="var(--wash-saffron)" />
            <path d="M30 432C200 440 420 440 590 432L590 446C420 452 200 452 30 446Z" fill="var(--wash-rose)" />
          </g>
          <g className={styles.ink}>
            <Strokes list={room} />
            <Strokes list={stove} />
            <Strokes list={mother} />
            <g className={styles.arm}>
              <Strokes list={arm} />
            </g>
            <g className={styles.steam}>
              <Strokes list={steam} />
            </g>
            <circle cx="273" cy="138" r="2.2" className={styles.bindi} />
          </g>
        </svg>
      </div>

      <div className={styles.copy}>
        <p className="eyebrow">How it’s made</p>
        <h2 id="kitchen-title" className={styles.title}>
          Every jar starts on a slow flame
        </h2>
        <ol className={styles.steps}>
          {steps.map((s, i) => (
            <li key={s.title} className={styles.step} data-active={i === step || undefined}>
              <span className={styles.num} aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
            </li>
          ))}
        </ol>
        <p className={styles.note}>Story beats are placeholders — replace with the family’s own words and photos.</p>
      </div>
    </section>
  );
}
