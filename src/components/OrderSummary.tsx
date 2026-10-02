import { formatINR } from "@/lib/money";
import type { ResolvedLine } from "@/lib/cart";
import styles from "./OrderSummary.module.css";

type Props = {
  lines: ResolvedLine[];
  subtotal: number;
  shipping: number;
  shippingLabel?: string;
  compact?: boolean;
  children?: React.ReactNode;
};

export function OrderSummary({ lines, subtotal, shipping, shippingLabel = "Delivery", compact, children }: Props) {
  const total = subtotal + shipping;
  return (
    <section className={styles.summary} aria-labelledby="summary-title">
      <h2 id="summary-title" className={styles.title}>
        Your order
      </h2>
      {compact && (
        <ul className={styles.lines}>
          {lines.map((l) => (
            <li key={l.key}>
              <span>
                {l.qty} × {l.product.name} <span className={styles.muted}>({l.variant.label}{l.customization ? ", custom" : ""})</span>
              </span>
              <span>{formatINR(l.lineTotal)}</span>
            </li>
          ))}
        </ul>
      )}
      <dl className={styles.totals}>
        <div>
          <dt>Subtotal</dt>
          <dd>{formatINR(subtotal)}</dd>
        </div>
        <div>
          <dt>{shippingLabel}</dt>
          <dd>{shipping === 0 ? "Free" : formatINR(shipping)}</dd>
        </div>
        <div className={styles.total}>
          <dt>Total</dt>
          <dd>{formatINR(total)}</dd>
        </div>
      </dl>
      <p className={styles.muted}>Prices include taxes (placeholder — confirm GST display).</p>
      {children}
    </section>
  );
}
