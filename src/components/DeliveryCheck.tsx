"use client";

import { useId, useState } from "react";
import styles from "./DeliveryCheck.module.css";

/** PIN-code delivery estimate. PLACEHOLDER: replace with the courier serviceability API. */
export function DeliveryCheck() {
  const id = useId();
  const [pin, setPin] = useState("");
  const [result, setResult] = useState<{ ok: boolean; text: string } | null>(null);

  return (
    <form
      className={styles.form}
      onSubmit={(e) => {
        e.preventDefault();
        if (!/^[1-9]\d{5}$/.test(pin)) {
          setResult({ ok: false, text: "Enter a valid 6-digit PIN code." });
          return;
        }
        setResult({ ok: true, text: `Delivers to ${pin} in about 4–7 working days (placeholder estimate).` });
      }}
    >
      <label htmlFor={`${id}-pin`} className={styles.label}>
        Check delivery
      </label>
      <div className={styles.row}>
        <input
          id={`${id}-pin`}
          className="input"
          inputMode="numeric"
          maxLength={6}
          placeholder="PIN code"
          autoComplete="postal-code"
          value={pin}
          onChange={(e) => setPin(e.target.value.replace(/\D/g, ""))}
          aria-describedby={result ? `${id}-res` : undefined}
        />
        <button type="submit" className="btn btn--outline">
          Check
        </button>
      </div>
      <p id={`${id}-res`} className={result?.ok ? styles.ok : styles.err} role="status" aria-live="polite">
        {result?.text}
      </p>
    </form>
  );
}
