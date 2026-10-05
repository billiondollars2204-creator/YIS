"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { useOrders } from "@/lib/stores";
import { useHydrated } from "@/lib/cart";
import { formatINR } from "@/lib/money";
import { track } from "@/lib/analytics";
import styles from "../content.module.css";

/** Order lookup. DEMO: searches orders placed on this device; connect to the order API before launch. */
export function TrackOrder() {
  const params = useSearchParams();
  const hydrated = useHydrated();
  const orders = useOrders((s) => s.orders);
  const [id, setId] = useState(params.get("order") ?? "");
  const [phone, setPhone] = useState("");
  const [query, setQuery] = useState<string | null>(params.get("order"));
  const [error, setError] = useState("");
  const found = hydrated && query ? orders.find((o) => o.id.toLowerCase() === query.toLowerCase()) : undefined;

  return (
    <div style={{ display: "grid", gap: 16 }}>
      <form
        noValidate
        style={{ display: "grid", gap: 12, gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", alignItems: "end" }}
        onSubmit={(e) => {
          e.preventDefault();
          if (!id.trim()) return setError("Enter your order number. It starts with IW.");
          setError("");
          setQuery(id.trim());
          track("track_order", { found: orders.some((o) => o.id.toLowerCase() === id.trim().toLowerCase()) });
        }}
      >
        <div className="field">
          <label htmlFor="t-id">Order number</label>
          <input id="t-id" className="input" value={id} onChange={(e) => setId(e.target.value)} placeholder="e.g. IW1A2B3C4" aria-describedby="t-err" />
        </div>
        <div className="field">
          <label htmlFor="t-phone">Mobile number (optional)</label>
          <input id="t-phone" className="input" type="tel" inputMode="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
        </div>
        <button type="submit" className="btn">
          Track order
        </button>
      </form>
      <p id="t-err" className="error" role="alert">
        {error}
      </p>
      <div aria-live="polite">
        {query &&
          hydrated &&
          (found ? (
            <div className={styles.order}>
              <div className={styles.orderHead}>
                <strong>Order {found.id}</strong>
                <span className="num">{formatINR(found.total)}</span>
              </div>
              <ol className={styles.progress} aria-label="Order status">
                <li data-done>Confirmed</li>
                <li>Packed</li>
                <li>Shipped</li>
                <li>Delivered</li>
              </ol>
              <p className="small muted" style={{ margin: 0 }}>
                Delivering to {found.address.city}, {found.address.state} {found.address.pincode}. Live courier tracking will appear here once our shipping partner is connected.
              </p>
            </div>
          ) : (
            <div className="notice notice--error">
              <p>
                We couldn’t find order “{query}”. Check the number in your confirmation email or SMS, or contact us and we’ll look it up.
              </p>
            </div>
          ))}
      </div>
    </div>
  );
}
