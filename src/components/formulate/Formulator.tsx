"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { getProduct } from "@/data/products";
import { customNoun, getFormula } from "@/data/formulations";
import { categoryLabel, ingredientPrices, ingredients, type Allergen, type IngredientCategory } from "@/data/ingredients";
import {
  EMPTY_CUSTOMIZATION,
  FORMULA_BASIS,
  fillLine,
  isCustomized,
  maxFor,
  MIN_CUSTOM_GRAMS,
  resolveFormula,
  setAmount,
  setPick,
  surchargePer500,
  type Customization,
} from "@/lib/customization";
import { useCart, useCartUI, useHydrated } from "@/lib/cart";
import { formatINR } from "@/lib/money";
import { formatGrams, formatShare } from "@/lib/units";
import { describeChanges } from "@/lib/describe";
import { track } from "@/lib/analytics";
import { useTween } from "@/lib/useTween";
import { Placeholder } from "../Placeholder";
import { ArrowLeft, ArrowRight, CheckIcon } from "../icons";
import { BuilderSteps } from "./BuilderSteps";
import { IngredientRow } from "./IngredientRow";
import { MixComposition } from "./MixComposition";
import styles from "./formulate.module.css";

type Batch = { id: string; pack: number; qty: number; label: string };

const ADD_ORDER: IngredientCategory[] = ["nuts", "dried-fruit", "seeds", "spices"];

export function Formulator({ slug }: { slug: string }) {
  const product = getProduct(slug)!;
  const formula = getFormula(slug)!;
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const stage = params.get("step") === "review" ? "review" : "formulate";
  const editKey = params.get("edit");
  const hydrated = useHydrated();
  const cartLines = useCart((s) => s.lines);
  const add = useCart((s) => s.add);
  const replace = useCart((s) => s.replace);
  const openCart = useCartUI((s) => s.setOpen);

  const baseBatches = useMemo(() => {
    const out: Batch[] = [];
    const v500 = product.variants.find((v) => v.grams === 500);
    const v1k = product.variants.find((v) => v.grams === 1000);
    if (v500) out.push({ id: "500", pack: 500, qty: 1, label: "500 g" });
    if (v1k) out.push({ id: "1000", pack: 1000, qty: 1, label: "1 kg" }, { id: "2000", pack: 1000, qty: 2, label: "2 kg" });
    return out;
  }, [product]);

  const [custom, setCustom] = useState<Customization>(EMPTY_CUSTOMIZATION);
  const [batches, setBatches] = useState<Batch[]>(baseBatches);
  const [batchId, setBatchId] = useState(baseBatches[0]?.id ?? "500");
  const [last, setLast] = useState<{ key: string; n: number } | null>(null);
  const [messages, setMessages] = useState<Record<string, string>>({});
  const [announce, setAnnounce] = useState("");
  const [editing, setEditing] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const counter = useRef(0);
  const loadedEdit = useRef(false);

  // Prefill from the cart when editing an existing custom line.
  useEffect(() => {
    if (!hydrated || loadedEdit.current || !editKey) return;
    loadedEdit.current = true;
    const line = cartLines.find((l) => l.key === editKey && l.slug === slug);
    if (!line) return;
    const v = product.variants.find((x) => x.id === line.variantId);
    if (!v) return;
    setCustom(line.customization ?? EMPTY_CUSTOMIZATION);
    const match = baseBatches.find((b) => b.pack === v.grams && b.qty === line.qty);
    if (match) setBatchId(match.id);
    else {
      const extra = { id: "edit", pack: v.grams, qty: line.qty, label: formatGrams(v.grams * line.qty) };
      setBatches([...baseBatches, extra]);
      setBatchId("edit");
    }
    setEditing(line.key);
  }, [hydrated, editKey, cartLines, slug, product, baseBatches]);

  const rows = resolveFormula(formula, custom);
  const fill = fillLine(formula);
  const fillName = ingredients[rows.find((r) => r.fill)!.pick].name.toLowerCase();
  const batch = batches.find((b) => b.id === batchId) ?? batches[0];
  const variant = product.variants.find((v) => v.grams === batch.pack)!;
  const batchGrams = batch.pack * batch.qty;
  const scale = batchGrams / FORMULA_BASIS;
  const extraPer500 = surchargePer500(formula, custom, ingredientPrices);
  const extraPerPack = Math.round(extraPer500 * (batch.pack / FORMULA_BASIS));
  const baseTotal = variant.price * batch.qty;
  const extraTotal = extraPerPack * batch.qty;
  const total = baseTotal + extraTotal;
  const shownTotal = useTween(total);
  const changes = describeChanges(slug, custom);
  const soldOut = variant.stock === "out_of_stock";
  const allergens = [...new Set(rows.filter((r) => r.grams > 0).map((r) => ingredients[r.pick]?.allergen).filter(Boolean))] as Allergen[];

  function note(key: string, text: string | null) {
    setMessages((m) => {
      const next = { ...m };
      if (text) next[key] = text;
      else delete next[key];
      return next;
    });
  }

  function changeAmount(key: string, grams: number) {
    const before = rows.find((r) => r.key === key)!;
    const res = setAmount(formula, custom, key, grams);
    const name = ingredients[before.pick].name;
    const line = formula.lines.find((l) => l.key === key)!;
    if (res.limited === "max") note(key, `${name} can go up to ${formatGrams(line.max)} per 500 g.`);
    else if (res.limited === "min") note(key, `${name} is part of the base, so it can’t go below ${formatGrams(line.min)}.`);
    else if (res.limited === "fill") note(key, "No room for more: the batch needs at least {fillMin} of {fill} to hold together. Reduce something else first.");
    else note(key, null);
    if (res.applied === before.grams) return;
    setCustom(res.custom);
    counter.current += 1;
    setLast({ key, n: counter.current });
    setAnnounce(`${name} ${res.applied === 0 ? "removed" : `set to ${formatGrams(res.applied)} per 500 g`}.`);
    track("customize_change", { item_id: slug, ingredient: key, grams: res.applied });
  }

  function changePick(key: string, id: string) {
    setCustom(setPick(formula, custom, key, id));
    counter.current += 1;
    setLast({ key, n: counter.current });
    setAnnounce(`${ingredients[id].name} selected.`);
    track("customize_change", { item_id: slug, ingredient: key, pick: id });
  }

  function resetAll() {
    setCustom({ ...EMPTY_CUSTOMIZATION, note: custom.note });
    setMessages({});
    setLast(null);
    setAnnounce("Reset to the house recipe.");
  }

  const go = (step: "review" | null) => {
    const sp = new URLSearchParams(params.toString());
    if (step) sp.set("step", step);
    else sp.delete("step");
    router.push(`${pathname}${sp.toString() ? `?${sp}` : ""}`, { scroll: true });
  };

  function confirm() {
    if (soldOut) return;
    const c = isCustomized(custom) ? custom : undefined;
    if (editing) replace(editing, slug, variant.id, batch.qty, c);
    else add(slug, variant.id, batch.qty, c);
    track("add_to_cart", { item_id: slug, variant: variant.id, quantity: batch.qty, value: total, currency: "INR", customized: !!c, source: "builder" });
    setDone(true);
    setEditing(null);
    setTimeout(() => openCart(true), 400);
  }

  const baseLines = formula.lines.filter((l) => l.role === "base");
  const addGroups = ADD_ORDER.map((cat) => ({ cat, lines: formula.lines.filter((l) => l.role === "addition" && ingredients[l.options[0]].category === cat) })).filter((g) => g.lines.length);
  const renderRow = (key: string) => {
    const l = formula.lines.find((x) => x.key === key)!;
    const r = rows.find((x) => x.key === key)!;
    return (
      <IngredientRow
        key={key}
        line={l}
        row={r}
        max={maxFor(formula, custom, key)}
        fillName={fillName}
        fillMin={fill.min}
        message={messages[key]}
        onAmount={(g) => changeAmount(key, g)}
        onPick={(id) => changePick(key, id)}
      />
    );
  };

  const summary = (
    <div className={styles.summary}>
      <div className={styles.summaryHead}>
        <span>Your batch</span>
        <span className="num">{batch.qty > 1 ? `${batch.label} · ${batch.qty} × ${variant.label}` : batch.label}</span>
      </div>
      <ul className={styles.recipe} aria-label="Recipe for your batch">
        {rows
          .filter((r) => r.grams > 0)
          .map((r) => (
            <li key={r.key} data-changed={r.grams !== r.houseGrams || r.pick !== r.housePick || undefined}>
              <span>{ingredients[r.pick].name}</span>
              <span className="num">{formatGrams(r.grams * scale)}</span>
            </li>
          ))}
      </ul>
      <dl className={styles.price}>
        <div>
          <dt>{batch.qty > 1 ? `${batch.qty} × ${variant.label}` : `${variant.label} batch`}</dt>
          <dd className="num">{formatINR(baseTotal)}</dd>
        </div>
        <div>
          <dt>Extra ingredients</dt>
          <dd className="num">{extraTotal ? `+${formatINR(extraTotal)}` : "—"}</dd>
        </div>
        <div className={styles.total}>
          <dt>Total</dt>
          <dd className="num">{formatINR(shownTotal)}</dd>
        </div>
      </dl>
    </div>
  );

  if (done) {
    return (
      <div className={`wrap ${styles.page}`}>
        <BuilderSteps current={2} slug={slug} />
        <div className={styles.done} role="status">
          <span className={styles.doneIcon}>
            <CheckIcon />
          </span>
          <h1 className={styles.doneTitle}>Your {customNoun[product.category]} is in the cart</h1>
          <p className="lede">
            {batch.label} {isCustomized(custom) ? `custom batch with ${changes.length} change${changes.length === 1 ? "" : "s"}` : "batch to our house recipe"} ·{" "}
            {formatINR(total)}. You can edit the mix from your cart until you check out.
          </p>
          <div className={styles.doneActions}>
            <Link href="/checkout" className="btn btn--lg">
              Checkout
            </Link>
            <Link href="/cart" className="btn btn--secondary btn--lg">
              View cart
            </Link>
            <Link href="/customise" className="arrow-link">
              Make another batch <ArrowRight />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (stage === "review") {
    return (
      <div className={`wrap ${styles.page}`}>
        <BuilderSteps current={2} slug={slug} />
        <header className={styles.reviewHead}>
          <p className="kicker">Review your batch</p>
          <h1 className={styles.title}>
            {product.name}, {batch.label}
          </h1>
          <p className="lede">Check every ingredient before it goes into the cart. Amounts are scaled to your batch size.</p>
        </header>
        <div className={styles.reviewGrid}>
          <div>
            <table className={styles.reviewTable}>
              <caption className="visually-hidden">Full recipe for your batch</caption>
              <thead>
                <tr>
                  <th scope="col">Ingredient</th>
                  <th scope="col">Per 500 g</th>
                  <th scope="col">Your {batch.label}</th>
                  <th scope="col">Share</th>
                </tr>
              </thead>
              <tbody>
                {rows
                  .filter((r) => r.grams > 0)
                  .map((r) => {
                    const delta = r.grams - r.houseGrams;
                    return (
                      <tr key={r.key} data-changed={delta !== 0 || r.pick !== r.housePick || undefined}>
                        <th scope="row">
                          {ingredients[r.pick].name}
                          <small>{r.role === "base" ? "Base" : categoryLabel[ingredients[r.pick].category]}</small>
                        </th>
                        <td className="num">
                          {formatGrams(r.grams)}
                          {delta !== 0 && !r.fill && <em>{delta > 0 ? ` +${formatGrams(delta)}` : ` −${formatGrams(-delta)}`}</em>}
                        </td>
                        <td className="num">{formatGrams(r.grams * scale)}</td>
                        <td className="num">{formatShare(r.share)}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
            {rows.some((r) => r.grams === 0 && r.houseGrams > 0) && (
              <p className={styles.leftOut}>
                Left out: {rows.filter((r) => r.grams === 0 && r.houseGrams > 0).map((r) => ingredients[r.pick].name).join(", ")}
              </p>
            )}
            {custom.note && <p className={styles.leftOut}>Note for the kitchen: “{custom.note}”</p>}
            <ul className={styles.terms}>
              <li>
                <Placeholder note="kitchen confirmation process">Our kitchen reviews every custom recipe before cooking and will contact you if anything needs changing.</Placeholder>
              </li>
              <li>
                Contains: {allergens.length ? allergens.join(", ") : "none of the listed allergens"}. Our kitchen handles nuts, gluten and milk every day.
              </li>
              <li>
                <Placeholder note="custom batch lead time and return policy">Custom batches are cooked to order and dispatched in 3–4 working days. They can’t be returned unless damaged or incorrect.</Placeholder>
              </li>
            </ul>
          </div>
          <aside className={styles.reviewAside}>
            <MixComposition rows={rows} lines={formula.lines} last={null} compact />
            {summary}
            <button type="button" className="btn btn--block btn--lg" onClick={confirm} disabled={soldOut}>
              {soldOut ? "Sold out" : editing ? `Update cart · ${formatINR(total)}` : `Confirm and add to cart · ${formatINR(total)}`}
            </button>
            <button type="button" className={`btn btn--quiet btn--block ${styles.back}`} onClick={() => go(null)}>
              <ArrowLeft /> Edit mix
            </button>
          </aside>
        </div>
      </div>
    );
  }

  return (
    <div className={`wrap ${styles.page}`}>
      <nav aria-label="Breadcrumb" className="crumbs">
        <ol>
          <li>
            <Link href="/shop">Shop</Link>
          </li>
          <li>
            <Link href={`/shop/${slug}`}>{product.name}</Link>
          </li>
          <li aria-current="page">Custom batch</li>
        </ol>
      </nav>
      <BuilderSteps current={1} slug={slug} />

      <header className={styles.head}>
        <div>
          <p className="kicker">{editing ? "Editing your custom batch" : "Custom batch"}</p>
          <h1 className={styles.title}>{product.name}</h1>
          <p className={styles.intro}>
            Our house recipe is loaded below. Adjust any ingredient within its limits; the amount of {fillName} adjusts automatically so every 500 g stays 500 g.
          </p>
        </div>
        <fieldset className={styles.batch}>
          <legend>Batch size</legend>
          <div className={styles.batchOptions}>
            {batches.map((b) => {
              const v = product.variants.find((x) => x.grams === b.pack);
              const out = !v || v.stock === "out_of_stock";
              return (
                <label key={b.id} className="option">
                  <input type="radio" name="batch" checked={batchId === b.id} disabled={out} onChange={() => setBatchId(b.id)} />
                  <span>
                    <strong className="num">{b.label}</strong>
                    <small className="num">{out ? "Sold out" : formatINR((v?.price ?? 0) * b.qty)}</small>
                  </span>
                </label>
              );
            })}
          </div>
          <p className="hint">
            Minimum {MIN_CUSTOM_GRAMS} g.{" "}
            <Link href={`/shop/${slug}`} className="link">
              Want a 250 g jar? Buy the standard recipe.
            </Link>
          </p>
        </fieldset>
      </header>

      <div className={styles.layout}>
        <aside className={styles.stage} aria-label="Your batch">
          <MixComposition rows={rows} lines={formula.lines} last={last} />
          {summary}
          <button type="button" className={`btn btn--block btn--lg ${styles.reviewBtn}`} onClick={() => go("review")} disabled={soldOut}>
            Review batch <ArrowRight />
          </button>
          <button type="button" className={styles.resetAll} onClick={resetAll} disabled={!isCustomized({ ...custom, note: "" })}>
            Reset to house recipe
          </button>
        </aside>

        <div className={styles.panel}>
          <p className={styles.perNote}>All amounts are per 500 g of finished batch. We scale them to your {batch.label}.</p>

          <section className={styles.group} aria-labelledby="g-base">
            <div className={styles.groupHead}>
              <h2 id="g-base">Base</h2>
              <p>Required. Adjust within limits, but these can’t be removed.</p>
            </div>
            <ul className={styles.rows}>{baseLines.map((l) => renderRow(l.key))}</ul>
          </section>

          {addGroups.map((g) => (
            <section key={g.cat} className={styles.group} aria-labelledby={`g-${g.cat}`}>
              <div className={styles.groupHead}>
                <h2 id={`g-${g.cat}`}>{categoryLabel[g.cat]}</h2>
                <p>Optional. Add, adjust or remove.</p>
              </div>
              <ul className={styles.rows}>{g.lines.map((l) => renderRow(l.key))}</ul>
            </section>
          ))}

          <section className={styles.group} aria-labelledby="g-note">
            <div className={styles.groupHead}>
              <h2 id="g-note">Note for the kitchen</h2>
              <p>Optional. Allergies or special requests — we read every note.</p>
            </div>
            <label htmlFor="kitchen-note" className="visually-hidden">
              Note for the kitchen
            </label>
            <textarea
              id="kitchen-note"
              className="textarea"
              rows={3}
              maxLength={200}
              value={custom.note}
              onChange={(e) => setCustom({ ...custom, note: e.target.value })}
              placeholder="e.g. Please keep it soft — it’s for my grandmother."
            />
            <p className="hint">{200 - custom.note.length} characters left</p>
          </section>

          <p className={styles.disclaimer}>
            <Placeholder note="kitchen to confirm ingredients, limits and prices">
              House recipe amounts, ingredient limits and extra-ingredient prices are drafts awaiting kitchen confirmation.
            </Placeholder>
          </p>
        </div>
      </div>

      <div className={styles.mobileBar}>
        <div className={styles.mobileInfo}>
          <span className={styles.miniBar} aria-hidden="true">
            {rows
              .filter((r) => r.grams > 0)
              .map((r) => (
                <span key={r.key} style={{ flexGrow: r.grams, background: ingredients[r.pick].tone }} />
              ))}
          </span>
          <span>
            {batch.label} · <strong className="num">{formatINR(shownTotal)}</strong>
          </span>
        </div>
        <button type="button" className="btn" onClick={() => go("review")} disabled={soldOut}>
          Review <ArrowRight />
        </button>
      </div>

      <div className="visually-hidden" role="status" aria-live="polite">
        {announce ? `${announce} Total ${formatINR(total)}.` : ""}
      </div>
    </div>
  );
}
