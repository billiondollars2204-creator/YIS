"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { resolveLines, useCart, useHydrated } from "@/lib/cart";
import { formatINR, SHIPPING_OPTIONS, shippingCost } from "@/lib/money";
import { applyCoupon, COD, stateFromPincode, type CouponResult } from "@/lib/pricing";
import { validateCheckout, validateField, type CheckoutErrors, type CheckoutValues } from "@/lib/validation";
import { batchLabel } from "@/lib/describe";
import { track } from "@/lib/analytics";
import { useOrders, useSession, type Order } from "@/lib/stores";
import { indianStates } from "@/data/content";
import { productImages } from "@/data/images";
import { OrderSummary } from "@/components/OrderSummary";
import { SmartImage } from "@/components/SmartImage";
import { CheckoutTrust } from "@/components/TrustStrip";
import { CheckIcon, LockIcon } from "@/components/icons";
import styles from "./checkout.module.css";

const initial: CheckoutValues = {
  email: "",
  phone: "",
  fullName: "",
  address1: "",
  address2: "",
  city: "",
  state: "",
  pincode: "",
  shipping: "standard",
  payment: "upi",
  notes: "",
};

const labels: Record<keyof CheckoutValues, string> = {
  email: "Email",
  phone: "Mobile number",
  fullName: "Full name",
  address1: "Flat, house no., building, street",
  address2: "Area, landmark (optional)",
  city: "City / town",
  state: "State / UT",
  pincode: "PIN code",
  shipping: "Delivery",
  payment: "Payment",
  notes: "Delivery instructions (optional)",
};

const payments = [
  { id: "upi", label: "UPI", sub: "GPay, PhonePe, Paytm or any UPI app" },
  { id: "card", label: "Credit or debit card", sub: "Visa, Mastercard, RuPay" },
  { id: "netbanking", label: "Net banking", sub: "All major banks" },
  { id: "cod", label: "Cash on delivery", sub: `Orders up to ${formatINR(COD.maxOrder)}` },
];

export function CheckoutForm() {
  const hydrated = useHydrated();
  const raw = useCart((s) => s.lines);
  const giftNote = useCart((s) => s.giftNote);
  const clear = useCart((s) => s.clear);
  const saveOrder = useOrders((s) => s.add);
  const session = useSession((s) => s.phone);
  const [v, setV] = useState<CheckoutValues>(initial);
  const [errors, setErrors] = useState<CheckoutErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof CheckoutValues, boolean>>>({});
  const [couponInput, setCouponInput] = useState("");
  const [coupon, setCoupon] = useState<CouponResult | null>(null);
  const [placing, setPlacing] = useState(false);
  const [order, setOrder] = useState<Order | null>(null);
  const [stateHint, setStateHint] = useState("");
  const summaryRef = useRef<HTMLDivElement>(null);
  const doneRef = useRef<HTMLHeadingElement>(null);

  const lines = hydrated ? resolveLines(raw) : [];
  const subtotal = lines.reduce((n, l) => n + l.lineTotal, 0);
  const savings = lines.reduce((n, l) => n + (l.listPrice - l.unitPrice) * l.qty, 0);
  // Re-check the coupon against the live subtotal so cart changes can't keep a stale discount.
  const live = coupon?.ok ? applyCoupon(coupon.code, subtotal) : null;
  const discount = live?.ok ? live.discount : 0;
  const shipping = shippingCost(subtotal - discount, v.shipping);
  const total = subtotal - discount + shipping;
  const codBlocked = total > COD.maxOrder;
  const errorKeys = (Object.keys(errors) as (keyof CheckoutValues)[]).filter((k) => errors[k]);

  useEffect(() => {
    if (hydrated && lines.length) track("begin_checkout", { value: subtotal, currency: "INR", items: lines.length });
    if (hydrated && session) setV((x) => (x.phone ? x : { ...x, phone: session }));
    // Once, after the persisted cart loads.
  }, [hydrated]);

  useEffect(() => {
    if (order) doneRef.current?.focus();
  }, [order]);

  useEffect(() => {
    if (codBlocked && v.payment === "cod") setV((x) => ({ ...x, payment: "upi" }));
  }, [codBlocked, v.payment]);

  function set<K extends keyof CheckoutValues>(k: K, value: string) {
    setV((x) => {
      const next = { ...x, [k]: value };
      // The PIN code suggests a state; the shopper can still change it.
      if (k === "pincode" && value.length === 6 && !x.state) {
        const st = stateFromPincode(value);
        if (st) {
          next.state = st;
          setStateHint(`State set to ${st} from your PIN code.`);
        }
      }
      return next;
    });
    if (touched[k]) setErrors((e) => ({ ...e, [k]: validateField(k, value) }));
  }

  function blur(k: keyof CheckoutValues) {
    setTouched((t) => ({ ...t, [k]: true }));
    setErrors((e) => ({ ...e, [k]: validateField(k, v[k]) }));
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const found = validateCheckout(v);
    setErrors(found);
    setTouched(Object.fromEntries(Object.keys(v).map((k) => [k, true])));
    if (Object.keys(found).length) {
      requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }
    setPlacing(true);
    track("add_shipping_info", { shipping_tier: v.shipping, value: total, currency: "INR" });
    track("add_payment_info", { payment_type: v.payment, value: total, currency: "INR" });
    // TODO(integration): create the order server-side, hand off to the payment provider
    // (e.g. Razorpay / Cashfree / PayU) and confirm via webhook before showing success.
    await new Promise((r) => setTimeout(r, 800));
    const o: Order = {
      id: `IW${Date.now().toString(36).toUpperCase().slice(-7)}`,
      placedAt: new Date().toISOString(),
      lines: lines.map((l) => ({
        slug: l.slug,
        name: l.product.name,
        detail: l.customization ? `Custom batch · ${batchLabel(l.variant.grams, 1)}` : l.variant.label,
        qty: l.qty,
        total: l.lineTotal,
        subscription: l.plan?.every,
      })),
      subtotal,
      discount,
      shipping,
      total,
      payment: payments.find((p) => p.id === v.payment)?.label ?? v.payment,
      address: { fullName: v.fullName, address1: v.address1, address2: v.address2, city: v.city, state: v.state, pincode: v.pincode, phone: v.phone, email: v.email },
    };
    track("purchase", { transaction_id: o.id, value: total, shipping, discount, currency: "INR", coupon: live?.ok ? live.code : undefined, payment_type: v.payment });
    saveOrder(o);
    clear();
    setOrder(o);
    setPlacing(false);
    window.scrollTo({ top: 0 });
  }

  if (order) {
    return (
      <div className={`container ${styles.done}`}>
        <span className={styles.doneIcon}>
          <CheckIcon />
        </span>
        <h1 ref={doneRef} tabIndex={-1}>
          Thank you, {order.address.fullName.split(" ")[0]}!
        </h1>
        <p className="lead">
          Order <strong>{order.id}</strong> is confirmed · {formatINR(order.total)} · {order.payment}. Details are on their way to {order.address.email}.
        </p>
        <div className="notice notice--info" style={{ textAlign: "left" }}>
          <p>Demo mode: no payment was taken and no real order was created. Connect the payment and order APIs before launch.</p>
        </div>
        <div className={styles.doneGrid}>
          <div className="card card--pad">
            <h2 className={styles.h3}>What happens next</h2>
            <ol className={styles.timeline}>
              <li>We cook and pack your order (1–2 working days; custom batches 3–4).</li>
              <li>You get tracking by SMS and email when it ships.</li>
              <li>Standard delivery takes 4–7 working days. (TBC)</li>
            </ol>
          </div>
          {!session && (
            <div className="card card--pad">
              <h2 className={styles.h3}>Save your details for next time</h2>
              <p className="muted small">Track this order, reorder in one tap and manage subscriptions.</p>
              <Link href="/account" className="btn btn--outline btn--block">
                Create an account
              </Link>
            </div>
          )}
        </div>
        <div className={styles.doneActions}>
          <Link href={`/support?order=${order.id}#track`} className="btn">
            Track this order
          </Link>
          <Link href="/shop" className="btn btn--ghost">
            Continue shopping
          </Link>
        </div>
      </div>
    );
  }

  if (!hydrated) {
    return (
      <div className="container" aria-busy="true" style={{ paddingTop: 40, display: "grid", gap: 12 }}>
        <span className="skeleton" style={{ width: 200, height: 32 }} />
        <span className="skeleton" style={{ height: 220 }} />
      </div>
    );
  }

  if (!lines.length) {
    return (
      <div className={`container ${styles.done}`}>
        <h1>Your cart is empty</h1>
        <p className="lead">Add something before checking out.</p>
        <Link href="/shop" className="btn">
          Shop bestsellers
        </Link>
      </div>
    );
  }

  const field = (k: keyof CheckoutValues, props: React.InputHTMLAttributes<HTMLInputElement> = {}, hint?: string) => {
    const err = touched[k] ? errors[k] : undefined;
    const ids = [hint && `${k}-hint`, err && `${k}-err`].filter(Boolean).join(" ") || undefined;
    return (
      <div className="field">
        <label htmlFor={k}>{labels[k]}</label>
        <input id={k} name={k} className="input" value={v[k]} onChange={(e) => set(k, e.target.value)} onBlur={() => blur(k)} aria-invalid={err ? true : undefined} aria-describedby={ids} {...props} />
        {hint && (
          <p id={`${k}-hint`} className="hint">
            {hint}
          </p>
        )}
        {err && (
          <p id={`${k}-err`} className="error">
            {err}
          </p>
        )}
      </div>
    );
  };

  return (
    <div className="container">
      <header className={styles.head}>
        <h1>Checkout</h1>
        <p className={styles.secure}>
          <LockIcon /> Secure checkout
        </p>
      </header>

      <div className={styles.layout}>
        <form onSubmit={submit} noValidate className={styles.form}>
          <div ref={summaryRef} tabIndex={-1} role="alert" hidden={!errorKeys.length} className={`notice notice--error ${styles.errors}`}>
            {errorKeys.length > 0 && (
              <div>
                <p>
                  <strong>Please check {errorKeys.length === 1 ? "this field" : `these ${errorKeys.length} fields`}:</strong>
                </p>
                <ul>
                  {errorKeys.map((k) => (
                    <li key={k}>
                      <a href={`#${k === "payment" ? `pay-${v.payment}` : k === "shipping" ? `ship-${v.shipping}` : k}`}>{labels[k]}</a> — {errors[k]}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <section className={styles.step} aria-labelledby="s1">
            <h2 id="s1">
              <span>1</span> Contact
            </h2>
            <div className={styles.row2}>
              {field("phone", { type: "tel", autoComplete: "tel-national", inputMode: "tel" }, "For delivery updates by SMS.")}
              {field("email", { type: "email", autoComplete: "email", inputMode: "email" }, "Your order confirmation goes here.")}
            </div>
          </section>

          <section className={styles.step} aria-labelledby="s2">
            <h2 id="s2">
              <span>2</span> Delivery address
            </h2>
            {field("fullName", { autoComplete: "name" })}
            <div className={styles.row2}>
              {field("pincode", { autoComplete: "postal-code", inputMode: "numeric", maxLength: 6 })}
              {field("city", { autoComplete: "address-level2" })}
            </div>
            {field("address1", { autoComplete: "address-line1" })}
            {field("address2", { autoComplete: "address-line2" })}
            <div className="field">
              <label htmlFor="state">{labels.state}</label>
              <select
                id="state"
                className="select"
                autoComplete="address-level1"
                value={v.state}
                onChange={(e) => set("state", e.target.value)}
                onBlur={() => blur("state")}
                aria-invalid={touched.state && errors.state ? true : undefined}
                aria-describedby={[stateHint && "state-hint", touched.state && errors.state && "state-err"].filter(Boolean).join(" ") || undefined}
              >
                <option value="">Choose…</option>
                {indianStates.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
              {stateHint && (
                <p id="state-hint" className="hint" aria-live="polite">
                  {stateHint}
                </p>
              )}
              {touched.state && errors.state && (
                <p id="state-err" className="error">
                  {errors.state}
                </p>
              )}
            </div>
            {field("notes", { maxLength: 300 })}
          </section>

          <section className={styles.step} aria-labelledby="s3">
            <h2 id="s3">
              <span>3</span> Delivery speed
            </h2>
            <fieldset className={styles.options}>
              <legend className="visually-hidden">Delivery option</legend>
              {SHIPPING_OPTIONS.map((o) => {
                const cost = shippingCost(subtotal - discount, o.id);
                return (
                  <label key={o.id} className="choice">
                    <input id={`ship-${o.id}`} type="radio" name="shipping" checked={v.shipping === o.id} onChange={() => set("shipping", o.id)} />
                    <span className={styles.opt}>
                      <strong>{o.label}</strong>
                      <span className="muted small">{o.eta} (TBC)</span>
                      <em className="num">{cost === 0 ? "Free" : formatINR(cost)}</em>
                    </span>
                  </label>
                );
              })}
            </fieldset>
          </section>

          <section className={styles.step} aria-labelledby="s4">
            <h2 id="s4">
              <span>4</span> Payment
            </h2>
            <fieldset className={styles.options}>
              <legend className="visually-hidden">Payment method</legend>
              {payments.map((p) => {
                const disabled = p.id === "cod" && codBlocked;
                return (
                  <label key={p.id} className="choice">
                    <input id={`pay-${p.id}`} type="radio" name="payment" checked={v.payment === p.id} disabled={disabled} onChange={() => set("payment", p.id)} />
                    <span className={styles.opt}>
                      <strong>{p.label}</strong>
                      <span className="muted small">{disabled ? `Not available for orders over ${formatINR(COD.maxOrder)}` : p.sub}</span>
                    </span>
                  </label>
                );
              })}
            </fieldset>
            <p className="hint">You’ll pay securely with our payment partner (to be connected). We never store card details.</p>
          </section>

          <button type="submit" className="btn btn--lg btn--block" disabled={placing} aria-busy={placing || undefined}>
            <LockIcon /> {placing ? "Placing your order…" : `Place order · ${formatINR(total)}`}
          </button>
          <p className="hint" style={{ textAlign: "center", marginTop: -16 }}>
            By placing your order you agree to our{" "}
            <Link href="/terms" className="link">
              terms
            </Link>
            ,{" "}
            <Link href="/privacy" className="link">
              privacy policy
            </Link>{" "}
            and{" "}
            <Link href="/shipping-returns" className="link">
              shipping & returns policy
            </Link>
            .
          </p>
        </form>

        <aside className={styles.aside}>
          <details className={styles.mobileSummary} open>
            <summary>
              <span>Order ({lines.reduce((n, l) => n + l.qty, 0)} items)</span> <strong className="num">{formatINR(total)}</strong>
            </summary>
            <ul className={styles.items}>
              {lines.map((l) => (
                <li key={l.key}>
                  <span className={styles.thumb}>
                    <SmartImage image={productImages(l.product)[0]} sizes="56px" ratio="1 / 1" decorative quiet />
                    <span className={styles.qty}>{l.qty}</span>
                  </span>
                  <span>
                    <strong>{l.product.name}</strong>
                    <span className="muted small">
                      {l.customization ? `Custom batch · ${batchLabel(l.variant.grams, 1)}` : l.variant.label}
                      {l.plan ? ` · every ${l.plan.every} weeks` : ""}
                    </span>
                  </span>
                  <span className="num">{formatINR(l.lineTotal)}</span>
                </li>
              ))}
            </ul>
            {giftNote && <p className="small muted">Gift note: “{giftNote}”</p>}
          </details>

          <form
            className={styles.coupon}
            onSubmit={(e) => {
              e.preventDefault();
              const r = applyCoupon(couponInput, subtotal);
              setCoupon(r);
              track("apply_coupon", { coupon: couponInput.trim().toUpperCase(), ok: r.ok });
            }}
          >
            <label htmlFor="coupon" className="label">
              Coupon code
            </label>
            <div>
              <input id="coupon" className="input" value={couponInput} onChange={(e) => setCouponInput(e.target.value)} autoCapitalize="characters" aria-describedby="coupon-msg" />
              <button type="submit" className="btn btn--outline">
                Apply
              </button>
            </div>
            <p id="coupon-msg" className={coupon && !coupon.ok ? "error" : "hint"} aria-live="polite">
              {coupon ? (coupon.ok ? (live?.ok ? `${coupon.code} applied — ${coupon.label}.` : `${coupon.code} no longer applies to this order.`) : coupon.error) : "Have a code? Try WELCOME10 (demo)."}
            </p>
          </form>

          <OrderSummary lines={lines} subtotal={subtotal + savings} savings={savings} discount={discount} discountLabel={live?.ok ? `Coupon ${live.code}` : undefined} shipping={shipping}>
            <CheckoutTrust />
          </OrderSummary>
        </aside>
      </div>
    </div>
  );
}
