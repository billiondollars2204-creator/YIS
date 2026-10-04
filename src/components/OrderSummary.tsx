import { formatINR } from "@/lib/money";
import { batchLabel, describeChanges } from "@/lib/describe";
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
                {l.qty} × {l.product.name}
                <span className={styles.lineMeta}>
                  {l.customization
                    ? `Custom batch · ${batchLabel(l.variant.grams, 1)} · ${describeChanges(l.slug, l.customization).length || "no"} changes`
                    : l.variant.label}
                </span>
              </span>
              <span className="num">{formatINR(l.lineTotal)}</span>
            </li>
          ))}
        </ul>
      )}
      <dl className={styles.totals}>
        <div>
          <dt>Subtotal</dt>
          <dd className="num">{formatINR(subtotal)}</dd>
        </div>
        <div>
          <dt>{shippingLabel}</dt>
          <dd>{shipping === 0 ? "Free" : formatINR(shipping)}</dd>
        </div>
        <div className={styles.total}>
          <dt>Total</dt>
          <dd className="num">{formatINR(total)}</dd>
        </div>
      </dl>
      <p className={styles.muted}>Prices include taxes (placeholder — confirm GST display).</p>
      {children}
    </section>
  );
}
