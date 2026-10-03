"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { getProduct, products } from "@/data/products";
import { groupInfo, ingredients, LEVELS, recipes, type ChoiceGroup, type GlyphKind, type IngredientGroup, type Level } from "@/data/ingredients";
import { ingredientImage } from "@/data/images";
import { canCustomize, isCustomized, MIN_CUSTOM_GRAMS, normalize, packSurcharge, type Customization } from "@/lib/customization";
import { useCart, useCartUI } from "@/lib/cart";
import { formatINR } from "@/lib/money";
import { track } from "@/lib/analytics";
import { IngredientArt } from "../art/IngredientArt";
import { SmartImage } from "../SmartImage";
import { CheckIcon } from "../icons";
import { BowlVisual, type Change } from "./BowlVisual";
import styles from "./builder.module.css";

const SIZES = [
  { id: "250", label: "250 g", grams: 250, pack: 250, qty: 1, hint: "Standard recipe only" },
  { id: "500", label: "500 g", grams: 500, pack: 500, qty: 1, hint: "Smallest custom batch" },
  { id: "1000", label: "1 kg", grams: 1000, pack: 1000, qty: 1, hint: "Most popular for families" },
  { id: "2000", label: "2 kg", grams: 2000, pack: 1000, qty: 2, hint: "Packed as 2 × 1 kg" },
];

const STEP_OF: Record<string, string> = {
  base: "base",
  roast: "base",
  sweetener: "sweet",
  sweetness: "sweet",
  ghee: "finish",
  texture: "finish",
  size: "finish",
};

const NUTS: GlyphKind[] = ["almond", "cashew", "pistachio", "walnut"];
const prices = Object.fromEntries(Object.values(ingredients).map((i) => [i.id, i.extraPrice]));

export function BatchBuilder({ slug }: { slug: string }) {
  const product = getProduct(slug)!;
  const recipe = recipes[slug];
  const defaults = useMemo(
    () => ({
      levels: Object.fromEntries(recipe.ingredients.map((i) => [i.id, i.default])) as Record<GlyphKind, Level>,
      choices: Object.fromEntries(recipe.choices.map((g) => [g.id, g.default])) as Record<string, string>,
    }),
    [recipe],
  );

  const [sizeId, setSizeId] = useState("500");
  const [levels, setLevels] = useState(defaults.levels);
  const [choices, setChoices] = useState(defaults.choices);
  const [note, setNote] = useState("");
  const [change, setChange] = useState<Change | null>(null);
  const [added, setAdded] = useState(false);
  const [activeStep, setActiveStep] = useState("size");
  const counter = useRef(0);
  const add = useCart((s) => s.add);
  const openCart = useCartUI((s) => s.setOpen);

  const size = SIZES.find((s) => s.id === sizeId)!;
  const variant = product.variants.find((v) => v.grams === size.pack);
  const soldOut = !variant || variant.stock === "out_of_stock";
  const unlocked = canCustomize(size.pack, size.qty);
  const custom: Customization = normalize({ levels, choices, note }, recipe);
  const surcharge = unlocked ? packSurcharge(custom, recipe, prices, size.pack) : 0;
  const unit = (variant?.price ?? 0) + surcharge;
  const total = unit * size.qty;
  const tintSet = recipe.baseTint[choices.base] ?? Object.values(recipe.baseTint)[0];
  const tint = choices.roast === "deep" ? tintSet.deep : tintSet.light;
  const sheen = choices.ghee === "light" ? 0 : choices.ghee === "rich" ? 2 : 1;

  const groups = (["dryfruit", "seed", "spice"] as IngredientGroup[])
    .map((g) => ({ g, items: recipe.ingredients.filter((i) => ingredients[i.id].group === g) }))
    .filter((x) => x.items.length);
  const choiceSteps = (step: string) => recipe.choices.filter((c) => STEP_OF[c.id] === step);

  const steps = [
    { id: "size", title: "Batch size" },
    { id: "base", title: "Base" },
    ...groups.map(({ g }) => ({ id: g, title: groupInfo[g].title })),
    { id: "sweet", title: "Sweetness" },
    { id: "finish", title: "Finish" },
    { id: "note", title: "Note" },
  ].filter((s) => !["base", "sweet", "finish"].includes(s.id) || choiceSteps(s.id).length);

  const changes = [
    ...recipe.ingredients
      .filter((i) => custom.levels[i.id] !== undefined)
      .map((i) => {
        const lvl = custom.levels[i.id];
        const extra = Math.max(0, lvl - i.default) * ingredients[i.id].extraPrice * (size.pack / 500);
        return { key: i.id, label: ingredients[i.id].name, value: LEVELS[lvl], dir: lvl > i.default ? "add" : "remove", extra };
      }),
    ...recipe.choices
      .filter((g) => custom.choices[g.id] !== undefined)
      .map((g) => ({ key: g.id, label: g.title, value: g.options.find((o) => o.id === custom.choices[g.id])?.label ?? "", dir: "swap", extra: 0 })),
  ];

  function announce(text: string, dir: Change["dir"]) {
    counter.current += 1;
    setChange({ n: counter.current, text, dir });
    setAdded(false);
  }

  function setLevel(id: GlyphKind, next: Level) {
    const prev = levels[id];
    if (prev === next) return;
    setLevels((l) => ({ ...l, [id]: next }));
    const name = ingredients[id].name;
    const text = next === 0 ? `− ${name}` : next > prev ? (prev === 0 ? `+ ${name}` : `More ${name.toLowerCase()}`) : `Less ${name.toLowerCase()}`;
    announce(text, next > prev ? "add" : "remove");
    track("customize_change", { item_id: slug, option: id, level: next });
  }

  function setChoice(g: ChoiceGroup, optionId: string) {
    if (choices[g.id] === optionId) return;
    setChoices((c) => ({ ...c, [g.id]: optionId }));
    announce(g.options.find((o) => o.id === optionId)?.label ?? "", "swap");
    track("customize_change", { item_id: slug, option: g.id, value: optionId });
  }

  function preset(kind: "house" | "less-sweet" | "nutty" | "nut-free") {
    if (kind === "house") {
      setLevels(defaults.levels);
      setChoices(defaults.choices);
      announce("House recipe", "swap");
      return;
    }
    if (kind === "less-sweet") {
      setChoices((c) => ({ ...c, ...(c.sweetness ? { sweetness: "light" } : {}), ...(slug.includes("laddu") ? { sweetener: "fruit" } : {}) }));
      announce("Less sweet", "remove");
      return;
    }
    setLevels((l) => {
      const next = { ...l };
      for (const n of NUTS) if (n in next) next[n] = kind === "nut-free" ? 0 : (Math.min(3, next[n] + 1) as Level);
      return next;
    });
    announce(kind === "nut-free" ? "No nuts" : "+ Extra nuts", kind === "nut-free" ? "remove" : "add");
  }

  function addToCart() {
    if (!variant || soldOut) return;
    const c = unlocked ? custom : undefined;
    add(slug, variant.id, size.qty, c, unlocked ? surcharge : 0);
    track("add_to_cart", { item_id: slug, variant: variant.id, quantity: size.qty, value: total, currency: "INR", customized: !!c && isCustomized(c), source: "builder" });
    setAdded(true);
    openCart(true);
  }

  // Highlight the step currently in view.
  useEffect(() => {
    const els = steps.map((s) => document.getElementById(`step-${s.id}`)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        const vis = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (vis) setActiveStep(vis.target.id.replace("step-", ""));
      },
      { rootMargin: "-30% 0px -60% 0px" },
    );
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
    // Steps are fixed per product.
  }, [slug]);

  const others = products.filter((p) => recipes[p.slug] && p.slug !== slug);
  const ctaLabel = soldOut ? "Sold out" : added ? "Added to cart" : unlocked ? `Add custom batch · ${formatINR(total)}` : `Add standard 250 g · ${formatINR(total)}`;
  let stepNo = 0;
  const num = () => String(++stepNo).padStart(2, "0");

  return (
    <div className={styles.builder}>
      <div className="wrap">
        <nav aria-label="Breadcrumb" className="crumbs">
          <ol>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/customise">Build your batch</Link>
            </li>
            <li aria-current="page">{product.name}</li>
          </ol>
        </nav>

        <header className={styles.head}>
          <div>
            <p className="eyebrow">Batch builder</p>
            <h1 className={styles.title}>
              Build your <em>{product.name}</em>
            </h1>
            <p className={styles.intro}>Start from our house recipe and adjust it, one ingredient at a time. We cook it as its own batch, just for you.</p>
          </div>
          {others.length > 0 && (
            <nav aria-label="Switch product" className={styles.switcher}>
              <span>Building:</span>
              <Link href={`/customise/${slug}`} aria-current="page">
                {product.name}
              </Link>
              {others.map((p) => (
                <Link key={p.slug} href={`/customise/${p.slug}`}>
                  {p.name}
                </Link>
              ))}
            </nav>
          )}
        </header>

        <div className={styles.layout}>
          <aside className={styles.stage} aria-label="Your batch">
            <BowlVisual
              levels={levels}
              tint={tint}
              sheen={sheen}
              fine={choices.texture === "fine"}
              change={change}
              uid={`bowl-${slug}`}
              label={`Illustrated preview of your ${product.name}`}
              dim={!unlocked}
            />
            <p className={styles.stageNote}>Live preview · illustrative</p>

            <div className={styles.receipt}>
              <div className={styles.receiptHead}>
                <span>Your batch</span>
                <span>
                  {size.label}
                  {size.qty > 1 ? ` (${size.qty} × ${variant?.label})` : ""}
                </span>
              </div>
              {!unlocked ? (
                <p className={styles.receiptEmpty}>Standard recipe — customisation starts at {MIN_CUSTOM_GRAMS} g.</p>
              ) : changes.length === 0 ? (
                <p className={styles.receiptEmpty}>House recipe, exactly as we make it.</p>
              ) : (
                <ul className={styles.changes}>
                  {changes.map((c) => (
                    <li key={c.key} data-dir={c.dir}>
                      <span>{c.label}</span>
                      <span>
                        {c.value}
                        {c.extra > 0 && <em> +{formatINR(c.extra)}</em>}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
              <dl className={styles.totals}>
                <div>
                  <dt>{size.qty > 1 ? `${size.qty} × ${variant?.label}` : "Batch"}</dt>
                  <dd>{formatINR((variant?.price ?? 0) * size.qty)}</dd>
                </div>
                <div>
                  <dt>Extras</dt>
                  <dd>{surcharge ? formatINR(surcharge * size.qty) : "—"}</dd>
                </div>
                <div className={styles.total}>
                  <dt>Total</dt>
                  <dd key={total} className={styles.bump}>
                    {formatINR(total)}
                  </dd>
                </div>
              </dl>
              <button type="button" className={`btn btn--block btn--lg ${styles.cta}`} data-added={added || undefined} onClick={addToCart} disabled={soldOut}>
                {added && <CheckIcon className={styles.ctaIcon} />}
                {ctaLabel}
              </button>
              <ul className={styles.small}>
                <li>Cooked as its own batch · dispatches in 3–4 days (placeholder)</li>
                <li>Removing ingredients never costs extra</li>
                <li>Our kitchen handles nuts every day</li>
              </ul>
            </div>
          </aside>

          <div className={styles.steps}>
            <nav className={styles.stepNav} aria-label="Builder steps">
              <ol>
                {steps.map((s, i) => (
                  <li key={s.id}>
                    <a href={`#step-${s.id}`} aria-current={activeStep === s.id ? "step" : undefined}>
                      <span>{String(i + 1).padStart(2, "0")}</span> {s.title}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>

            <div className={styles.presets} role="group" aria-label="Quick presets">
              <span>Quick start</span>
              <button type="button" onClick={() => preset("house")} disabled={!unlocked}>
                House recipe
              </button>
              {recipe.choices.some((c) => c.id === "sweetness" || c.id === "sweetener") && (
                <button type="button" onClick={() => preset("less-sweet")} disabled={!unlocked}>
                  Less sweet
                </button>
              )}
              <button type="button" onClick={() => preset("nutty")} disabled={!unlocked}>
                Extra nutty
              </button>
              <button type="button" onClick={() => preset("nut-free")} disabled={!unlocked}>
                No nuts
              </button>
            </div>

            <section id="step-size" className={styles.step} aria-labelledby="h-size">
              <StepHead n={num()} id="h-size" title="Choose your batch size" sub="Custom batches start at 500 g — smaller amounts don’t roast evenly." />
              <div className={styles.sizes} role="radiogroup" aria-label="Batch size">
                {SIZES.map((s) => {
                  const v = product.variants.find((x) => x.grams === s.pack);
                  const out = !v || v.stock === "out_of_stock";
                  return (
                    <label key={s.id} className={styles.size} data-locked={!canCustomize(s.pack, s.qty) || undefined}>
                      <input type="radio" name="size" checked={sizeId === s.id} disabled={out} onChange={() => setSizeId(s.id)} />
                      <span>
                        <strong>{s.label}</strong>
                        <em>{out ? "Sold out" : v ? formatINR(v.price * s.qty) : ""}</em>
                        <small>{s.hint}</small>
                      </span>
                    </label>
                  );
                })}
              </div>
              {!unlocked && (
                <div className={styles.gate} role="status">
                  <p>
                    <strong>Customising starts at {MIN_CUSTOM_GRAMS} g.</strong> Each custom order is cooked as its own batch, and less than {MIN_CUSTOM_GRAMS} g
                    doesn’t roast evenly. You can still order a standard 250 g jar, or choose a bigger batch to unlock every option below.
                  </p>
                  <button type="button" className="btn btn--small" onClick={() => setSizeId("500")}>
                    Switch to 500 g
                  </button>
                </div>
              )}
            </section>

            <fieldset disabled={!unlocked || soldOut} className={styles.options}>
              <legend className="visually-hidden">Customisation options</legend>

              {choiceSteps("base").length > 0 && (
                <section id="step-base" className={styles.step} aria-labelledby="h-base">
                  <StepHead n={num()} id="h-base" title="Pick the base" sub="Everything else is built on this." />
                  {choiceSteps("base").map((g) => (
                    <Choice key={g.id} group={g} value={choices[g.id]} onChange={(o) => setChoice(g, o)} />
                  ))}
                </section>
              )}

              {groups.map(({ g, items }) => (
                <section key={g} id={`step-${g}`} className={styles.step} aria-labelledby={`h-${g}`}>
                  <StepHead n={num()} id={`h-${g}`} title={groupInfo[g].title} sub={groupInfo[g].blurb} />
                  <ul className={styles.tiles}>
                    {items.map(({ id, default: def }) => (
                      <IngredientTile key={id} id={id} def={def} level={levels[id]} packGrams={size.pack} onChange={(l) => setLevel(id, l)} />
                    ))}
                  </ul>
                </section>
              ))}

              {choiceSteps("sweet").length > 0 && (
                <section id="step-sweet" className={styles.step} aria-labelledby="h-sweet">
                  <StepHead n={num()} id="h-sweet" title="Set the sweetness" sub="Tell us how your family likes it." />
                  {choiceSteps("sweet").map((g) => (
                    <Choice key={g.id} group={g} value={choices[g.id]} onChange={(o) => setChoice(g, o)} />
                  ))}
                </section>
              )}

              {choiceSteps("finish").length > 0 && (
                <section id="step-finish" className={styles.step} aria-labelledby="h-finish">
                  <StepHead n={num()} id="h-finish" title="Finish it your way" sub="Texture and richness." />
                  {choiceSteps("finish").map((g) => (
                    <Choice key={g.id} group={g} value={choices[g.id]} onChange={(o) => setChoice(g, o)} />
                  ))}
                </section>
              )}

              <section id="step-note" className={styles.step} aria-labelledby="h-note">
                <StepHead n={num()} id="h-note" title="A note for the kitchen" sub="Optional. We read every one." />
                <label htmlFor="builder-note" className="visually-hidden">
                  Note for the kitchen
                </label>
                <textarea
                  id="builder-note"
                  className="textarea"
                  rows={3}
                  maxLength={200}
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="e.g. It’s for my mother after her surgery — please keep it soft and not too sweet."
                />
                <p className="hint">{200 - note.length} characters left. For allergies, please contact us before ordering.</p>
              </section>
            </fieldset>

            <p className={styles.disclaimer}>
              Ingredient options, levels and extra prices are placeholders until our kitchen confirms them. Nothing here is medical advice.
            </p>
          </div>
        </div>
      </div>

      <div className={styles.mobileBar}>
        <div className={styles.mobileBowl} aria-hidden="true">
          <BowlVisual levels={levels} tint={tint} sheen={sheen} fine={choices.texture === "fine"} change={change} uid={`mbowl-${slug}`} label="" />
        </div>
        <div className={styles.mobileInfo}>
          <span className={styles.mobileChange} key={change?.n} data-dir={change?.dir}>
            {change?.text ?? (unlocked ? "House recipe" : "Standard recipe")}
          </span>
          <strong>{formatINR(total)}</strong>
        </div>
        <button type="button" className="btn" onClick={addToCart} disabled={soldOut}>
          {soldOut ? "Sold out" : added ? "Added" : "Add to cart"}
        </button>
      </div>

      <div className="visually-hidden" role="status" aria-live="polite">
        {change ? `${change.text}. Total ${formatINR(total)}.` : ""}
      </div>
    </div>
  );
}

function StepHead({ n, id, title, sub }: { n: string; id: string; title: string; sub: string }) {
  return (
    <div className={styles.stepHead}>
      <span className={styles.stepNum} aria-hidden="true">
        {n}
      </span>
      <div>
        <h2 id={id}>{title}</h2>
        <p>{sub}</p>
      </div>
    </div>
  );
}

function Choice({ group, value, onChange }: { group: ChoiceGroup; value: string; onChange: (id: string) => void }) {
  return (
    <fieldset className={styles.choice}>
      <legend>{group.question}</legend>
      <div className={styles.choiceRow} data-count={group.options.length}>
        {group.options.map((o) => (
          <label key={o.id} className={styles.opt}>
            <input type="radio" name={`choice-${group.id}`} checked={value === o.id} onChange={() => onChange(o.id)} />
            <span>
              <strong>
                {o.label}
                {o.id === group.default && <small> · house</small>}
              </strong>
              <em>{o.note}</em>
              <CheckIcon className={styles.optCheck} />
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

function IngredientTile({ id, def, level, packGrams, onChange }: { id: GlyphKind; def: Level; level: Level; packGrams: number; onChange: (l: Level) => void }) {
  const ing = ingredients[id];
  const extra = Math.max(0, level - def) * ing.extraPrice * (packGrams / 500);
  const state = level === 0 ? "none" : level > def ? "more" : level < def ? "less" : "house";
  return (
    <li className={styles.tile} data-state={state}>
      <div className={styles.tileArt} key={level}>
        <SmartImage image={ingredientImage(id, ing.name)} sizes="160px" ratio="1 / 1" decorative fallback={<IngredientArt id={id} className={styles.tileSvg} />} />
        {state !== "house" && (
          <span className={styles.tileBadge}>{state === "none" ? "Left out" : state === "more" ? (extra ? `+${formatINR(extra)}` : "More") : "Less"}</span>
        )}
      </div>
      <div className={styles.tileBody}>
        <h3>
          {ing.name} <span lang="hi-Latn">{ing.local}</span>
        </h3>
        <p>{ing.note}</p>
      </div>
      <div className={styles.levels} role="radiogroup" aria-label={`${ing.name} amount`}>
        {LEVELS.map((label, l) => (
          <label key={label} data-house={l === def || undefined}>
            <input type="radio" name={`lvl-${id}`} checked={level === l} onChange={() => onChange(l as Level)} />
            <span>{label}</span>
          </label>
        ))}
      </div>
    </li>
  );
}
