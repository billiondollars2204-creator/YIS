import type { Metadata } from "next";
import Link from "next/link";
import { FREE_SHIPPING_THRESHOLD, formatINR, SHIPPING_OPTIONS } from "@/lib/money";
import { Placeholder } from "@/components/Placeholder";
import styles from "../content.module.css";

export const metadata: Metadata = {
  title: "Shipping & returns",
  description: "How we pack and deliver your order, and what happens if something isn’t right.",
  alternates: { canonical: "/shipping-returns" },
};

export default function ShippingPage() {
  return (
    <div className="wrap">
      <header className={styles.hero}>
        <p className="eyebrow">The fine print, kindly</p>
        <h1>Shipping &amp; returns</h1>
        <p className="lede">
          <Placeholder note="final policy from the business">
            All policies on this page are placeholders and must be reviewed before launch.
          </Placeholder>
        </p>
      </header>
      <div className={`prose ${styles.body}`}>
        <h2>Delivery</h2>
        <ul>
          {SHIPPING_OPTIONS.map((o) => (
            <li key={o.id}>
              <strong>{o.label}</strong> — {o.eta}, {formatINR(o.price)}.
            </li>
          ))}
          <li>Free standard delivery on orders over {formatINR(FREE_SHIPPING_THRESHOLD)}.</li>
          <li>Custom batches are cooked to order and may take a little longer to dispatch.</li>
        </ul>
        <p>We pack everything in sealed, food-safe containers with padding so it arrives as it left our kitchen.</p>

        <h2>Where we deliver</h2>
        <p>
          <Placeholder note="serviceable PIN codes">Serviceable regions and PIN code checker to be added with the shipping partner.</Placeholder>
        </p>

        <h2>If something isn’t right</h2>
        <p>
          Because our food is perishable, we can’t accept returns of opened products. But if your order arrives damaged,
          incorrect, or not as it should be, tell us within <Placeholder note="confirm window">48 hours</Placeholder> with a photo and
          we’ll make it right with a replacement or refund.
        </p>

        <h2>Cancellations</h2>
        <p>
          Standard orders can be cancelled before they’re packed. Custom batches can’t be cancelled once cooking has started.
        </p>

        <h2>Refunds</h2>
        <p>
          Approved refunds go back to your original payment method within{" "}
          <Placeholder note="confirm with payment provider">5–7 working days</Placeholder>.
        </p>
        <p>
          Questions? <Link href="/contact" className="link">Contact us</Link>.
        </p>
      </div>
    </div>
  );
}
