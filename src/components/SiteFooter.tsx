import Link from "next/link";
import { categories } from "@/data/products";
import { site } from "@/lib/site";
import { Newsletter } from "./Newsletter";
import { Toran } from "./ui";
import styles from "./SiteFooter.module.css";

const cols = [
  {
    title: "Shop",
    links: [{ href: "/shop", label: "Shop all" }, ...categories.map((c) => ({ href: `/shop?category=${c.slug}`, label: c.name })), { href: "/customise", label: "Custom batches" }],
  },
  {
    title: "Help",
    links: [
      { href: "/support", label: "Help centre" },
      { href: "/support#track", label: "Track an order" },
      { href: "/shipping-returns", label: "Shipping & returns" },
      { href: "/faq", label: "FAQ" },
      { href: "/contact", label: "Contact us" },
    ],
  },
  {
    title: "Immunitywize",
    links: [
      { href: "/our-story", label: "Our story" },
      { href: "/account", label: "Account" },
      { href: "/account?tab=saved", label: "Saved items" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <Toran />
      <div className={styles.nl}>
        <div className={`container ${styles.nlInner}`}>
          <div>
            <h2 className={styles.nlTitle}>Hear when a fresh batch is ready</h2>
            <p className={styles.nlText}>New batches, festive boxes and recipes. One email a month, at most.</p>
          </div>
          <Newsletter />
        </div>
      </div>
      <div className={`container ${styles.grid}`}>
        <div className={styles.brand}>
          <p className={styles.logo}>Immunitywize</p>
          <p>Panjiri, pinni, laddus and dry-fruit mixes, made by hand in small batches.</p>
          <ul className={styles.contact}>
            <li>
              <a href={`mailto:${site.email}`}>{site.email}</a>
            </li>
            <li>{site.phone} · Mon–Sat, 10am–6pm</li>
            <li>WhatsApp {site.whatsapp}</li>
          </ul>
        </div>
        {cols.map((c) => (
          <nav key={c.title} aria-label={c.title} className={styles.col}>
            <h2 className={styles.colTitle}>{c.title}</h2>
            <ul>
              {c.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <div className={`container ${styles.legal}`}>
        <p>
          FSSAI Lic. No. <span className={styles.tbc}>to be added</span> · GSTIN <span className={styles.tbc}>to be added</span> · Grievance officer:{" "}
          <span className={styles.tbc}>name and contact to be added</span>
        </p>
        <p>Payments: UPI, cards, net banking, cash on delivery (provider to be connected)</p>
        <p>
          © {new Date().getFullYear()} {site.name}. Made in India.
        </p>
      </div>
    </footer>
  );
}
