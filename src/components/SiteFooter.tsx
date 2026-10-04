import Link from "next/link";
import { site } from "@/lib/site";
import { Newsletter } from "./Newsletter";
import styles from "./SiteFooter.module.css";

const columns = [
  {
    title: "Shop",
    links: [
      { href: "/shop", label: "Shop all" },
      { href: "/shop?category=panjiri", label: "Panjiri" },
      { href: "/shop?category=pinni", label: "Pinni" },
      { href: "/shop?category=laddus", label: "Dry-fruit laddus" },
      { href: "/shop?category=mixes", label: "Dry-fruit mixes" },
      { href: "/customise", label: "Custom batches" },
    ],
  },
  {
    title: "Help",
    links: [
      { href: "/faq", label: "FAQ" },
      { href: "/shipping-returns", label: "Shipping & returns" },
      { href: "/contact", label: "Contact us" },
      { href: "/account", label: "Account" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/our-story", label: "Our story" },
      { href: "/#kitchen", label: "How it’s made" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={`wrap ${styles.newsletter}`}>
        <div>
          <h2 className={styles.nlTitle}>Letters from the kitchen</h2>
          <p className={styles.nlText}>New batches, seasonal specials and the occasional recipe. Once a month at most.</p>
        </div>
        <Newsletter />
      </div>
      <div className={`wrap ${styles.grid}`}>
        <div className={styles.brand}>
          <p className={styles.logo}>Immunitywize</p>
          <p>Homemade Indian snacks, cooked by hand in small batches.</p>
          <p>
            <a href={`mailto:${site.email}`}>{site.email}</a>
            <br />
            {site.phone}
          </p>
        </div>
        {columns.map((c) => (
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
      <div className={`wrap ${styles.base}`}>
        <p>
          © {new Date().getFullYear()} {site.name}. All rights reserved.
        </p>
        <p>FSSAI Lic. No. — placeholder · GSTIN — placeholder</p>
        <p>UPI · Cards · Netbanking · COD (placeholder)</p>
      </div>
    </footer>
  );
}
