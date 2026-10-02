import { FREE_SHIPPING_THRESHOLD, formatINR } from "@/lib/money";
import styles from "./FreeShippingBar.module.css";

export function FreeShippingBar({ subtotal }: { subtotal: number }) {
  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  return (
    <div className={styles.wrap}>
      <p>
        {remaining > 0 ? (
          <>
            You’re <strong>{formatINR(remaining)}</strong> away from free standard delivery.
          </>
        ) : (
          <>You’ve unlocked free standard delivery.</>
        )}
      </p>
      <div
        className={styles.track}
        role="progressbar"
        aria-label="Progress to free delivery"
        aria-valuemin={0}
        aria-valuemax={FREE_SHIPPING_THRESHOLD}
        aria-valuenow={Math.min(subtotal, FREE_SHIPPING_THRESHOLD)}
      >
        <span style={{ width: `${Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100)}%` }} />
      </div>
    </div>
  );
}
