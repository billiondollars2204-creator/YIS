"use client";

import { useId, useState } from "react";
import { track } from "@/lib/analytics";
import styles from "./Newsletter.module.css";

/** Newsletter signup (placeholder — connect to an email provider via a server action/API route). */
export function Newsletter() {
  const id = useId();
  const [state, setState] = useState<"idle" | "error" | "done">("idle");

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const email = String(new FormData(e.currentTarget).get("email") || "").trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
      setState("error");
      return;
    }
    // TODO(integration): POST to newsletter provider.
    track("newsletter_signup", { location: "footer" });
    setState("done");
  }

  if (state === "done") {
    return (
      <p className={styles.done} role="status">
        Thank you — we’ll write when a new batch is ready.
      </p>
    );
  }

  return (
    <form className={styles.form} onSubmit={onSubmit} noValidate>
      <label htmlFor={`${id}-email`} className={styles.label}>
        Letters from the kitchen — new batches, seasonal specials. Once a month at most.
      </label>
      <div className={styles.row}>
        <input
          id={`${id}-email`}
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          className={styles.input}
          aria-invalid={state === "error" || undefined}
          aria-describedby={state === "error" ? `${id}-err` : undefined}
        />
        <button type="submit" className={styles.btn}>
          Sign up
        </button>
      </div>
      {state === "error" && (
        <p id={`${id}-err`} className={styles.err}>
          Please enter a valid email address.
        </p>
      )}
    </form>
  );
}
