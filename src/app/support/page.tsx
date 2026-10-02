import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import styles from "../content.module.css";

export const metadata: Metadata = {
  title: "Help & support",
  description: "Answers about orders, delivery, returns, customisation and our ingredients.",
  alternates: { canonical: "/support" },
};

const topics = [
  { href: "/faq", title: "Frequently asked questions", sub: "Ingredients, freshness, allergies and customising." },
  { href: "/shipping-returns", title: "Shipping & returns", sub: "Delivery times, charges, and what to do if something’s wrong." },
  { href: "/contact", title: "Contact us", sub: "Write to us, or message us on WhatsApp. A real person replies." },
  { href: "/our-story", title: "Our story", sub: "Who cooks your food, and why we started." },
];

export default function SupportPage() {
  return (
    <div className="wrap">
      <header className={styles.hero}>
        <p className="eyebrow">We’re here</p>
        <h1>How can we help?</h1>
        <p className="lede">Most answers are below. If not, write to us — the same family that cooks your order reads every message.</p>
      </header>
      <div className={styles.body}>
        <ul className={styles.hub}>
          {topics.map((t) => (
            <li key={t.href}>
              <Link href={t.href}>
                <span className={styles.hubTitle}>{t.title}</span>
                <span className={styles.hubSub}>{t.sub}</span>
                <span className={styles.hubArrow} aria-hidden="true">
                  →
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <div className={styles.aside} style={{ marginTop: "var(--space-7)" }}>
          <h2>Already ordered?</h2>
          <p>
            Reply to your order confirmation email, or write to <a className="link" href={`mailto:${site.email}`}>{site.email}</a> with your order
            number. (Order tracking page — placeholder for the shipping integration.)
          </p>
        </div>
      </div>
    </div>
  );
}
