import type { Metadata } from "next";
import { site } from "@/lib/site";
import { ContactForm } from "./ContactForm";
import styles from "../content.module.css";

export const metadata: Metadata = {
  title: "Contact us",
  description: "Write to the Immunitywize kitchen — orders, custom batches, gifting and wholesale.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <div className="wrap">
      <header className={styles.hero}>
        <p className="eyebrow">Say namaste</p>
        <h1>Write to the kitchen</h1>
        <p className="lede">Orders, allergies, gifting, or just to tell us how the panjiri was. We usually reply within a day (placeholder).</p>
      </header>
      <div className={`${styles.body} ${styles.contact}`}>
        <ContactForm />
        <ul className={styles.channels} aria-label="Other ways to reach us">
          <li>
            <h2>Email</h2>
            <p>
              <a className="link" href={`mailto:${site.email}`}>
                {site.email}
              </a>{" "}
              (placeholder)
            </p>
          </li>
          <li>
            <h2>WhatsApp</h2>
            <p>{site.whatsapp} (placeholder)</p>
          </li>
          <li>
            <h2>Kitchen hours</h2>
            <p>Mon–Sat, 9am–6pm IST (placeholder)</p>
          </li>
          <li>
            <h2>Where we cook</h2>
            <p>{site.city} (placeholder — no walk-ins)</p>
          </li>
        </ul>
      </div>
    </div>
  );
}
