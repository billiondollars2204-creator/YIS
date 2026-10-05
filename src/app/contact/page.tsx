import type { Metadata } from "next";
import { site } from "@/lib/site";
import { Breadcrumbs } from "@/components/ui";
import { ContactForm } from "./ContactForm";
import styles from "../content.module.css";

export const metadata: Metadata = {
  title: "Contact us",
  description: "Questions about an order, a custom batch, allergies or gifting? Write to the Immunitywize kitchen.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <div className="container">
      <Breadcrumbs items={[{ href: "/", label: "Home" }, { href: "/support", label: "Help" }, { label: "Contact" }]} />
      <header className={styles.head}>
        <h1>Contact us</h1>
        <p className="muted">Orders, allergies, gifting or bulk orders — we usually reply within one working day. (TBC)</p>
      </header>
      <div className={styles.split} style={{ gridTemplateColumns: undefined }}>
        <aside className="card card--pad" style={{ display: "grid", gap: 12, alignContent: "start", fontSize: "var(--fs-14)" }}>
          <div>
            <strong>WhatsApp</strong>
            <p className="muted" style={{ margin: 0 }}>
              {site.whatsapp}
            </p>
          </div>
          <div>
            <strong>Phone</strong>
            <p className="muted" style={{ margin: 0 }}>
              {site.phone} · Mon–Sat, 10am–6pm
            </p>
          </div>
          <div>
            <strong>Email</strong>
            <p className="muted" style={{ margin: 0 }}>
              <a href={`mailto:${site.email}`}>{site.email}</a>
            </p>
          </div>
          <p className="hint">Contact details are placeholders until confirmed.</p>
        </aside>
        <ContactForm />
      </div>
    </div>
  );
}
