"use client";

import Link from "next/link";
import { categories } from "@/data/products";
import { benefits } from "@/data/content";
import { nav } from "@/lib/site";
import { useDialog } from "@/lib/useDialog";
import { CloseIcon } from "./icons";
import styles from "./MobileMenu.module.css";

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
          <p className={styles.label}>Shop</p>
          <ul className={styles.primary}>
            <li>
              <Link href="/shop" onClick={onClose}>
                Shop all
              </Link>
            </li>
            {categories.map((c) => (
              <li key={c.slug}>
                <Link href={`/shop?category=${c.slug}`} onClick={onClose}>
                  {c.name}
                  {c.comingSoon && <span className={styles.soon}>Soon</span>}
                </Link>
              </li>
            ))}
          </ul>
          <p className={styles.label}>Shop by need</p>
          <ul className={styles.secondary}>
            {benefits.map((b) => (
              <li key={b.slug}>
                <Link href={`/shop?need=${b.slug}`} onClick={onClose}>
                  {b.title}
                </Link>
              </li>
            ))}
          </ul>
          <ul className={styles.secondary}>
            {nav.map((n) => (
              <li key={n.href}>
                <Link href={n.href} onClick={onClose}>
                  {n.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/account" onClick={onClose}>
                Account
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </dialog>
  );
}
