import Link from "next/link";
import { site } from "@/lib/site";
import { PaperEdge, Sprig } from "./art/Marks";
import { Newsletter } from "./Newsletter";
import styles from "./SiteFooter.module.css";

const columns = [
  {
    title: "Shop",
    links: [
      { href: "/shop#panjiri", label: "Panjiri" },
      { href: "/shop#pinni", label: "Pinni" },
      { href: "/shop#laddus", label: "Laddus" },
      { href: "/shop#mixes", label: "Dry-fruit mixes" },
    ],
  },
  {
    title: "Help",
    links: [
      { href: "/faq", label: "FAQ" },
      { href: "/shipping-returns", label: "Shipping & returns" },
      { href: "/contact", label: "Contact us" },
      { href: "/support", label: "All help" },
    ],
  },
  {
    title: "Us",
    links: [
      { href: "/our-story", label: "Our story" },
      { href: "/#kitchen", label: "The kitchen" },
      { href: "/#promise", label: "Our promise" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <PaperEdge color="var(--jaggery-deep)" />
      <div className={styles.inner}>
        <div className={`wrap ${styles.grid}`}>
          <div className={styles.brand}>
            <p className={styles.signoff}>
              <Sprig className={styles.sprig} />
              Made by hand, in small batches, in a home kitchen.
            </p>
            <Newsletter />
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
            © {new Date().getFullYear()} {site.name}. {site.city} (placeholder).
          </p>
          <p>FSSAI Lic. No. — placeholder · GSTIN — placeholder</p>
        </div>
      </div>
    </footer>
  );
}
