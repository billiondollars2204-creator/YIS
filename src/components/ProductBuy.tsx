"use client";

import { useRouter } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { stockLabel, type Product } from "@/data/products";
import { useCart, useCartUI, MAX_QTY } from "@/lib/cart";
import { formatINR } from "@/lib/money";
import { SUBSCRIPTION, subscriptionPrice, type Plan } from "@/lib/pricing";
import { per100g } from "@/lib/units";
import { track } from "@/lib/analytics";
import { SaveButton } from "./SaveButton";
import { PincodeCheck } from "./PincodeCheck";
import { Price } from "./ui";
import { CheckIcon, MinusIcon, PlusIcon, RepeatIcon } from "./icons";
import styles from "./ProductBuy.module.css";

export function ProductBuy({ product }: { product: Product }) {
  const uid = useId();
  const router = useRouter();
  const add = useCart((s) => s.add);
  const openCart = useCartUI((s) => s.setOpen);
  const first = product.variants.find((v) => v.stock !== "out_of_stock") ?? product.variants[0];
  const [variantId, setVariantId] = useState(first.id);
  const [qty, setQty] = useState(1);
  const [mode, setMode] = useState<"once" | "sub">("once");
  const [every, setEvery] = useState(SUBSCRIPTION.defaultInterval);
  const [added, setAdded] = useState(false);
  const [status, setStatus] = useState("");
  const [bar, setBar] = useState(false);
  const actions = useRef<HTMLDivElement>(null);

  const variant = product.variants.find((v) => v.id === variantId) ?? first;
  const soldOut = variant.stock === "out_of_stock";
  const plan: Plan | undefined = product.subscribable && mode === "sub" ? { every } : undefined;
  const unit = plan ? subscriptionPrice(variant.price) : variant.price;
  const total = unit * qty;

  useEffect(() => {
    track("view_item", { item_id: product.slug, item_name: product.name, item_category: product.category, value: first.price, currency: "INR" });
  }, [product.slug, product.name, product.category, first.price]);

  useEffect(() => {
    const el = actions.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setBar(!e.isIntersecting && e.boundingClientRect.top < 0));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!added) return;
    const t = setTimeout(() => setAdded(false), 2000);
    return () => clearTimeout(t);
  }, [added]);

  function doAdd(): boolean {
    if (soldOut) return false;
    add(product.slug, variant.id, qty, undefined, plan);
    track("add_to_cart", { item_id: product.slug, variant: variant.id, quantity: qty, value: total, currency: "INR", subscription: plan?.every });
    setStatus(`Added ${qty} × ${product.name}, ${variant.label}${plan ? `, every ${plan.every} weeks` : ""}.`);
    setAdded(true);
    return true;
  }

  const addLabel = added ? "Added to cart" : soldOut ? "Sold out" : plan ? "Subscribe" : "Add to cart";

  return (
    <div className={styles.buy}>
      <div className={styles.price}>
        <Price price={unit} was={plan ? variant.price : undefined} grams={product.kind === "bundle" ? undefined : variant.grams} size="lg" />
      </div>

      {product.variants.length > 1 && (
        <fieldset className={styles.group}>
          <legend className="label">
            Pack size: <span className="muted">{variant.label}</span>
          </legend>
          <div className={styles.sizes}>
            {product.variants.map((v) => (
              <label key={v.id} className="choice">
                <input
                  type="radio"
                  name={`${uid}-size`}
                  checked={v.id === variantId}
                  disabled={v.stock === "out_of_stock"}
                  onChange={() => {
                    setVariantId(v.id);
                    track("select_variant", { item_id: product.slug, variant: v.id });
                  }}
                />
                <span className={styles.size}>
                  <strong>{v.label}</strong>
                  <span className="num">{v.stock === "out_of_stock" ? "Sold out" : formatINR(v.price)}</span>
                  {v.stock !== "out_of_stock" && <small className="num">{formatINR(per100g(v.price, v.grams))}/100 g</small>}
                </span>
              </label>
            ))}
          </div>
        </fieldset>
      )}

      {product.subscribable && !soldOut && (
        <fieldset className={styles.group}>
          <legend className="label">Purchase option</legend>
          <div className={styles.modes}>
            <label className="choice">
              <input
                type="radio"
                name={`${uid}-mode`}
                checked={mode === "once"}
                onChange={() => {
                  setMode("once");
                  track("select_purchase_option", { item_id: product.slug, option: "one_time" });
                }}
              />
              <span>
                <strong>One-time purchase</strong>
                <span className="num">{formatINR(variant.price)}</span>
              </span>
            </label>
            <label className="choice">
              <input
                type="radio"
                name={`${uid}-mode`}
                checked={mode === "sub"}
                onChange={() => {
                  setMode("sub");
                  track("select_purchase_option", { item_id: product.slug, option: "subscribe" });
                }}
              />
              <span>
                <strong>
                  <RepeatIcon className={styles.ri} /> Subscribe & save {SUBSCRIPTION.discountPct}%
                </strong>
                <span className="num">
                  {formatINR(subscriptionPrice(variant.price))} per delivery · skip or cancel anytime
                </span>
              </span>
            </label>
          </div>
          {mode === "sub" && (
            <div className={styles.every}>
              <label htmlFor={`${uid}-every`} className="label">
                Deliver every
              </label>
              <select id={`${uid}-every`} className="select" value={every} onChange={(e) => setEvery(Number(e.target.value))}>
                {SUBSCRIPTION.intervals.map((w) => (
                  <option key={w} value={w}>
                    {w} weeks
                  </option>
                ))}
              </select>
              <p className="hint">Subscriptions are a preview — billing isn’t connected yet. (TBC)</p>
            </div>
          )}
        </fieldset>
      )}

      <p className={styles.stock} data-stock={variant.stock}>
        <span aria-hidden="true" />
        {stockLabel[variant.stock]}
        {!soldOut && <span className="muted"> · Dispatched in 1–2 working days (TBC)</span>}
      </p>

      <div className={styles.actions} ref={actions}>
        <div className="stepper" role="group" aria-label="Quantity">
          <button type="button" onClick={() => setQty((q) => Math.max(1, q - 1))} disabled={qty <= 1} aria-label="Decrease quantity">
            <MinusIcon />
          </button>
          <output aria-live="polite">{qty}</output>
          <button type="button" onClick={() => setQty((q) => Math.min(MAX_QTY, q + 1))} disabled={qty >= MAX_QTY} aria-label="Increase quantity">
            <PlusIcon />
          </button>
        </div>
        <button type="button" className={`btn btn--lg ${added ? "btn--success" : ""}`} disabled={soldOut} onClick={() => doAdd() && setTimeout(() => openCart(true), 300)}>
          {added && <CheckIcon />}
          {addLabel}
          {!added && !soldOut && <span className={styles.btnPrice}>· {formatINR(total)}</span>}
        </button>
        <SaveButton slug={product.slug} name={product.name} className={`btn btn--lg btn--ghost ${styles.save}`} />
        {!soldOut && (
          <button type="button" className={`btn btn--lg btn--dark ${styles.buyNow}`} onClick={() => doAdd() && router.push("/checkout")}>
            Buy now
          </button>
        )}
      </div>

      <div className={styles.pin}>
        <PincodeCheck />
      </div>

      <div className="visually-hidden" role="status" aria-live="polite">
        {status}
      </div>

      <div className={styles.bar} data-show={(bar && !soldOut) || undefined} aria-hidden={!bar}>
        <div className={`container ${styles.barInner}`}>
          <span className={styles.barName}>
            {product.name} <span className="muted">· {variant.label}</span>
          </span>
          <button type="button" tabIndex={bar ? 0 : -1} className={`btn ${added ? "btn--success" : ""}`} onClick={() => doAdd() && setTimeout(() => openCart(true), 300)}>
            {added ? "Added" : `${plan ? "Subscribe" : "Add to cart"} · ${formatINR(total)}`}
          </button>
        </div>
      </div>
    </div>
  );
}
