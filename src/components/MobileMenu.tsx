"use client";

import Link from "next/link";
import { categories, productsIn } from "@/data/products";
import { MIN_CUSTOM_GRAMS } from "@/lib/customization";
import { useDialog } from "@/lib/useDialog";
import { ArrowRight, CloseIcon } from "./icons";
import styles from "./MobileMenu.module.css";

const secondary = [
  { href: "/our-story", label: "Our story" },
  { href: "/faq", label: "FAQ" },
  { href: "/shipping-returns", label: "Shipping & returns" },
  { href: "/contact", label: "Contact" },
  { href: "/account", label: "Account" },
];

export function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const ref = useDialog(open, onClose);
  return (
    <dialog ref={ref} className={`sheet sheet--left ${styles.menu}`} aria-label="Menu">
      <div className={styles.inner}>
        <div className={styles.head}>
          <span className={styles.brand}>Immunitywize</span>
          <button type="button" className="icon-btn" onClick={onClose} aria-label="Close menu">
            <CloseIcon />
          </button>
        </div>
        <nav aria-label="Mobile">
          <ul className={styles.primary}>
            <li>
              <Link href="/shop" onClick={onClose}>
                Shop all
                <ArrowRight />
              </Link>
            </li>
            {categories.map((c) => (
              <li key={c.slug}>
                <Link href={`/shop?category=${c.slug}`} onClick={onClose}>
                  <span>
                    {c.name}
                    <small>{c.comingSoon ? "Coming soon" : `${productsIn(c.slug).length} products`}</small>
                  </span>
                  <ArrowRight />
                </Link>
              </li>
            ))}
          </ul>
          <Link href="/customise" className={styles.custom} onClick={onClose}>
            <span className={styles.customTitle}>Make a custom batch</span>
            <span className={styles.customText}>Panjiri, pinni and dry-fruit mix, from {MIN_CUSTOM_GRAMS} g</span>
          </Link>
          <ul className={styles.secondary}>
            {secondary.map((n) => (
              <li key={n.href}>
                <Link href={n.href} onClick={onClose}>
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </dialog>
  );
}
