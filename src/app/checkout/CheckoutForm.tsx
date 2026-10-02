"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { resolveLines, useCart, useHydrated } from "@/lib/cart";
import { formatINR, SHIPPING_OPTIONS, shippingCost } from "@/lib/money";
import { validateCheckout, validateField, type CheckoutErrors, type CheckoutValues } from "@/lib/validation";
import { track } from "@/lib/analytics";
import { indianStates } from "@/data/content";
import { OrderSummary } from "@/components/OrderSummary";
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
  payment: "online",
  notes: "",
};

const labels: Record<keyof CheckoutValues, string> = {
  email: "Email",
  phone: "Mobile number",
  fullName: "Full name",
  address1: "House no. & street",
  address2: "Area / landmark (optional)",
  city: "City / town",
  state: "State / UT",
  pincode: "PIN code",
  shipping: "Delivery",
  payment: "Payment",
  notes: "Delivery notes (optional)",
};

export function CheckoutForm() {
  const hydrated = useHydrated();
  const raw = useCart((s) => s.lines);
  const clear = useCart((s) => s.clear);
  const [values, setValues] = useState<CheckoutValues>(initial);
  const [errors, setErrors] = useState<CheckoutErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof CheckoutValues, boolean>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [order, setOrder] = useState<{ id: string; total: number; email: string } | null>(null);
  const summaryRef = useRef<HTMLDivElement>(null);
  const doneRef = useRef<HTMLHeadingElement>(null);

  const lines = hydrated ? resolveLines(raw) : [];
  const subtotal = lines.reduce((n, l) => n + l.lineTotal, 0);
  const shipping = shippingCost(subtotal, values.shipping);
  const errorList = (Object.keys(errors) as (keyof CheckoutValues)[]).filter((k) => errors[k]);

  useEffect(() => {
    if (hydrated && lines.length) track("begin_checkout", { value: subtotal, currency: "INR", items: lines.length });
    // Once per checkout visit.
  }, [hydrated]);

  useEffect(() => {
    if (order) doneRef.current?.focus();
  }, [order]);

  function set<K extends keyof CheckoutValues>(name: K, value: string) {
    setValues((v) => ({ ...v, [name]: value }));
    if (touched[name]) setErrors((e) => ({ ...e, [name]: validateField(name, value) }));
  }

  function blur(name: keyof CheckoutValues) {
    setTouched((t) => ({ ...t, [name]: true }));
    setErrors((e) => ({ ...e, [name]: validateField(name, values[name]) }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const found = validateCheckout(values);
    setErrors(found);
    setTouched(Object.fromEntries(Object.keys(values).map((k) => [k, true])));
    if (Object.keys(found).length) {
      requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }
    setSubmitting(true);
    // TODO(integration): create the order server-side, then hand off to the payment
    // provider (e.g. Razorpay / Cashfree / Stripe India) and confirm via webhook.
    await new Promise((r) => setTimeout(r, 700));
    const id = `IW-${Date.now().toString(36).toUpperCase().slice(-6)}`;
    const total = subtotal + shipping;
    track("purchase", { transaction_id: id, value: total, currency: "INR", shipping, payment: values.payment });
    setOrder({ id, total, email: values.email });
    clear();
    setSubmitting(false);
    window.scrollTo({ top: 0 });
  }

  if (order) {
    return (
      <div className={`wrap ${styles.done}`}>
        <p className="eyebrow">Thank you!</p>
        <h1 ref={doneRef} tabIndex={-1}>
          Your order is in the kitchen
        </h1>
        <p className="lede">
          Order <strong>{order.id}</strong> · {formatINR(order.total)}. A confirmation will be sent to {order.email}.
        </p>
        <p className={styles.placeholderNote}>
          Demo mode: no payment was taken and no order was created. Connect the payment and order APIs before launch.
        </p>
        <Link href="/shop" className="btn">
          Back to the pantry
        </Link>
      </div>
    );
  }

  if (!hydrated) {
    return (
      <div className={`wrap ${styles.page}`}>
        <h1>Checkout</h1>
        <p aria-busy="true">Loading…</p>
      </div>
    );
  }

  if (lines.length === 0) {
    return (
      <div className={`wrap ${styles.page}`}>
        <h1>Checkout</h1>
        <p className="lede">Your cart is empty, so there’s nothing to check out yet.</p>
        <Link href="/shop" className="btn">
          Browse the pantry
        </Link>
      </div>
    );
  }

  const field = (name: keyof CheckoutValues, props: React.InputHTMLAttributes<HTMLInputElement> = {}, hint?: string) => {
    const err = touched[name] ? errors[name] : undefined;
    const describedBy = [hint ? `${name}-hint` : "", err ? `${name}-err` : ""].filter(Boolean).join(" ") || undefined;
    return (
      <div className="field">
        <label htmlFor={name}>{labels[name]}</label>
        {hint && (
          <p id={`${name}-hint`} className="hint">
            {hint}
          </p>
        )}
        <input
          id={name}
          name={name}
          className="input"
          value={values[name]}
          onChange={(e) => set(name, e.target.value)}
          onBlur={() => blur(name)}
          aria-invalid={err ? true : undefined}
          aria-describedby={describedBy}
          {...props}
        />
        {err && (
          <p id={`${name}-err`} className="error">
            {err}
          </p>
        )}
      </div>
    );
  };

  return (
    <div className={`wrap ${styles.page}`}>
      <h1>Checkout</h1>
      <ol className={styles.steps} aria-label="Checkout steps">
        <li data-done>Cart</li>
        <li aria-current="step">Details &amp; payment</li>
        <li>Confirmation</li>
      </ol>

      <div className={styles.layout}>
        <form onSubmit={onSubmit} noValidate className={styles.form} aria-describedby="required-note">
          <p id="required-note" className="hint">
            All fields are required unless marked optional.
          </p>

          <div ref={summaryRef} tabIndex={-1} className={styles.errorSummary} hidden={errorList.length === 0} role="alert">
            {errorList.length > 0 && (
              <>
                <h2>Please check {errorList.length === 1 ? "one thing" : `${errorList.length} things`}</h2>
                <ul>
                  {errorList.map((k) => (
                    <li key={k}>
                      <a href={`#${k === "shipping" || k === "payment" ? `${k}-${values[k] || SHIPPING_OPTIONS[0].id}` : k}`}>
                        {labels[k]}: {errors[k]}
                      </a>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>

          <fieldset className={styles.block}>
            <legend className={styles.legend}>
              <span className={styles.num}>1</span> Contact
            </legend>
            <div className={styles.row2}>
              {field("email", { type: "email", autoComplete: "email", inputMode: "email" })}
              {field("phone", { type: "tel", autoComplete: "tel-national", inputMode: "tel" }, "For delivery updates only.")}
            </div>
          </fieldset>

          <fieldset className={styles.block}>
            <legend className={styles.legend}>
              <span className={styles.num}>2</span> Delivery address
            </legend>
            {field("fullName", { autoComplete: "name" })}
            {field("address1", { autoComplete: "address-line1" })}
            {field("address2", { autoComplete: "address-line2" })}
            <div className={styles.row3}>
              {field("city", { autoComplete: "address-level2" })}
              <div className="field">
                <label htmlFor="state">{labels.state}</label>
                <select
                  id="state"
                  name="state"
                  className="select"
                  autoComplete="address-level1"
                  value={values.state}
                  onChange={(e) => set("state", e.target.value)}
                  onBlur={() => blur("state")}
                  aria-invalid={touched.state && errors.state ? true : undefined}
                  aria-describedby={touched.state && errors.state ? "state-err" : undefined}
                >
                  <option value="">Choose…</option>
                  {indianStates.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
                {touched.state && errors.state && (
                  <p id="state-err" className="error">
                    {errors.state}
                  </p>
                )}
              </div>
              {field("pincode", { autoComplete: "postal-code", inputMode: "numeric", maxLength: 6 })}
            </div>
          </fieldset>

          <fieldset className={styles.block}>
            <legend className={styles.legend}>
              <span className={styles.num}>3</span> Delivery option
            </legend>
            <div className={styles.options}>
              {SHIPPING_OPTIONS.map((o) => (
                <label key={o.id} className={styles.option}>
                  <input
                    type="radio"
                    id={`shipping-${o.id}`}
                    name="shipping"
                    value={o.id}
                    checked={values.shipping === o.id}
                    onChange={() => set("shipping", o.id)}
                  />
                  <span className={styles.optionBody}>
                    <strong>{o.label}</strong>
                    <span>{o.eta} (placeholder)</span>
                  </span>
                  <span className={styles.optionPrice}>{shippingCost(subtotal, o.id) === 0 ? "Free" : formatINR(shippingCost(subtotal, o.id))}</span>
                </label>
              ))}
            </div>
            <p className="hint">Shipping partner and live rates are placeholders — to be connected to the courier API.</p>
            {field("notes", { maxLength: 300 })}
          </fieldset>

          <fieldset className={styles.block}>
            <legend className={styles.legend}>
              <span className={styles.num}>4</span> Payment
            </legend>
            <div className={styles.options}>
              {[
                { id: "online", label: "UPI, cards & netbanking", sub: "You’ll be taken to our payment partner to pay securely (placeholder)." },
                { id: "cod", label: "Cash on delivery", sub: "Availability depends on your PIN code (placeholder)." },
              ].map((p) => (
                <label key={p.id} className={styles.option}>
                  <input type="radio" id={`payment-${p.id}`} name="payment" value={p.id} checked={values.payment === p.id} onChange={() => set("payment", p.id)} />
                  <span className={styles.optionBody}>
                    <strong>{p.label}</strong>
                    <span>{p.sub}</span>
                  </span>
                </label>
              ))}
            </div>
          </fieldset>

          <button type="submit" className="btn btn--block" disabled={submitting} aria-busy={submitting || undefined}>
            {submitting ? "Placing your order…" : `Place order · ${formatINR(subtotal + shipping)}`}
          </button>
          <p className={styles.terms}>
            By placing your order you agree to our <Link href="/shipping-returns" className="link">shipping &amp; returns policy</Link>.
          </p>
        </form>

        <aside className={styles.aside}>
          <OrderSummary lines={lines} subtotal={subtotal} shipping={shipping} compact>
            <Link href="/cart" className="arrow-link">
              <span aria-hidden="true">←</span> Edit cart
            </Link>
          </OrderSummary>
        </aside>
      </div>
    </div>
  );
}
