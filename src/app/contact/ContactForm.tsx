"use client";

import { useRef, useState } from "react";
import { track } from "@/lib/analytics";
import styles from "../content.module.css";

type Errors = Partial<Record<"name" | "email" | "message", string>>;

/** Contact form (placeholder — wire to an email service or CRM via a server action). */
export function ContactForm() {
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const message = String(data.get("message") || "").trim();
    const next: Errors = {};
    if (name.length < 2) next.name = "Please tell us your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) next.email = "Enter an email we can reply to.";
    if (message.length < 10) next.message = "Write a little more so we can help (at least 10 characters).";
    setErrors(next);
    const first = Object.keys(next)[0];
    if (first) {
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    // TODO(integration): send to email/CRM.
    track("contact_submit", { topic: String(data.get("topic")) });
    setSent(true);
  }

  if (sent) {
    return (
      <div className={styles.success} role="status">
        <h2>Thank you — message received.</h2>
        <p>We’ll reply soon. (Demo: the form isn’t connected to an inbox yet.)</p>
      </div>
    );
  }

  const err = (k: keyof Errors) =>
    errors[k] && (
      <p id={`c-${k}-err`} className="error">
        {errors[k]}
      </p>
    );

  return (
    <form ref={formRef} className={styles.contactForm} onSubmit={onSubmit} noValidate>
      <div className="field">
        <label htmlFor="c-name">Your name</label>
        <input id="c-name" name="name" className="input" autoComplete="name" aria-invalid={!!errors.name || undefined} aria-describedby={errors.name ? "c-name-err" : undefined} />
        {err("name")}
      </div>
      <div className="field">
        <label htmlFor="c-email">Email</label>
        <input id="c-email" name="email" type="email" className="input" autoComplete="email" aria-invalid={!!errors.email || undefined} aria-describedby={errors.email ? "c-email-err" : undefined} />
        {err("email")}
      </div>
      <div className="field">
        <label htmlFor="c-topic">What’s it about?</label>
        <select id="c-topic" name="topic" className="select" defaultValue="order">
          <option value="order">An order</option>
          <option value="custom">A custom batch</option>
          <option value="allergy">Allergies & ingredients</option>
          <option value="gifting">Gifting / bulk</option>
          <option value="other">Something else</option>
        </select>
      </div>
      <div className="field">
        <label htmlFor="c-message">Message</label>
        <textarea id="c-message" name="message" className="textarea" rows={5} aria-invalid={!!errors.message || undefined} aria-describedby={errors.message ? "c-message-err" : undefined} />
        {err("message")}
      </div>
      <div>
        <button type="submit" className="btn">
          Send message
        </button>
      </div>
    </form>
  );
}
