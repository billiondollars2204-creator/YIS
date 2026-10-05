import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { faqs } from "@/data/content";
import { site } from "@/lib/site";
import { Breadcrumbs } from "@/components/ui";
import { BoxIcon, ChatIcon, MailIcon, PhoneIcon, ReturnIcon, SlidersIcon, TruckIcon, WalletIcon } from "@/components/icons";
import { TrackOrder } from "./TrackOrder";
import styles from "../content.module.css";

export const metadata: Metadata = {
  title: "Help centre",
  description: "Track an order, delivery and returns, custom batches, payments and contact.",
  alternates: { canonical: "/support" },
};

const topics = [
  { icon: TruckIcon, title: "Delivery", text: "Where we ship, how long it takes, charges.", href: "/shipping-returns#delivery" },
  { icon: ReturnIcon, title: "Returns & replacements", text: "Damaged or wrong item? What to do.", href: "/shipping-returns#returns" },
  { icon: SlidersIcon, title: "Custom batches", text: "Minimums, lead times, editing a recipe.", href: "/faq#custom" },
  { icon: WalletIcon, title: "Payments & refunds", text: "UPI, cards, COD and refund timelines.", href: "/faq#orders" },
  { icon: BoxIcon, title: "Ingredients & allergens", text: "What’s inside, nuts, storage, shelf life.", href: "/faq#food" },
  { icon: ChatIcon, title: "Contact us", text: "Talk to the family that cooks your order.", href: "/contact" },
];

export default function SupportPage() {
  const top = faqs.flatMap((g) => g.items).slice(0, 4);
  return (
    <div className="container">
      <Breadcrumbs items={[{ href: "/", label: "Home" }, { label: "Help centre" }]} />
      <header className={styles.head}>
        <h1>How can we help?</h1>
        <p className="muted">Most answers are here. If not, a real person replies within one working day (TBC).</p>
      </header>

      <section id="track" className="card card--pad" aria-labelledby="track-title" style={{ marginBottom: "var(--sp-6)", scrollMarginTop: 140 }}>
        <h2 id="track-title" style={{ fontSize: "var(--fs-24)" }}>
          Track an order
        </h2>
        <Suspense>
          <TrackOrder />
        </Suspense>
      </section>

      <ul className={styles.cards3} style={{ listStyle: "none", padding: 0, margin: "0 0 var(--sp-7)" }}>
        {topics.map(({ icon: Icon, ...t }) => (
          <li key={t.title}>
            <Link href={t.href} className={styles.topic}>
              <Icon />
              <strong>{t.title}</strong>
              <span>{t.text}</span>
            </Link>
          </li>
        ))}
      </ul>

      <div className={styles.split}>
        <div>
          <h2 style={{ fontSize: "var(--fs-24)" }}>Popular questions</h2>
          <Link href="/faq" className="more">
            All FAQs
          </Link>
        </div>
        <div>
          {top.map((f) => (
            <details key={f.q} className="acc">
              <summary>{f.q}</summary>
              <div className="acc-body">
                <p>{f.a}</p>
              </div>
            </details>
          ))}
        </div>
      </div>

      <section aria-labelledby="reach" className="section section--cream" style={{ borderRadius: "var(--r-lg)", padding: "var(--sp-6)" }}>
        <h2 id="reach" style={{ fontSize: "var(--fs-24)" }}>
          Still need help?
        </h2>
        <ul className={styles.cards3} style={{ listStyle: "none", padding: 0, margin: 0 }}>
          <li>
            <a className={styles.topic} href={`https://wa.me/${site.whatsapp.replace(/\D/g, "")}`}>
              <ChatIcon />
              <strong>WhatsApp</strong>
              <span>{site.whatsapp} · fastest</span>
            </a>
          </li>
          <li>
            <a className={styles.topic} href={`tel:${site.phone.replace(/\s/g, "")}`}>
              <PhoneIcon />
              <strong>Call</strong>
              <span>{site.phone} · Mon–Sat, 10am–6pm</span>
            </a>
          </li>
          <li>
            <a className={styles.topic} href={`mailto:${site.email}`}>
              <MailIcon />
              <strong>Email</strong>
              <span>{site.email}</span>
            </a>
          </li>
        </ul>
        <p className="small muted" style={{ marginTop: 16 }}>
          Grievance officer (Consumer Protection (E-Commerce) Rules, 2020): name, contact and address to be added. (TBC)
        </p>
      </section>
    </div>
  );
}
