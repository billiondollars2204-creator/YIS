"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav, site } from "@/lib/site";
import { useCart, useHydrated } from "@/lib/cart";
import { Sprig } from "./art/Marks";
import styles from "./SiteHeader.module.css";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const hydrated = useHydrated();
  const count = useCart((s) => s.lines.reduce((n, l) => n + l.qty, 0));
  const shownCount = hydrated ? count : 0;

  // Close the mobile menu on navigation
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className={styles.header} data-open={open || undefined}>
      <div className={`wrap ${styles.bar}`}>
        <Link href="/" className={styles.logo} aria-label={`${site.name} — home`}>
          <Sprig className={styles.sprig} />
          <span>
            Immunity<em>wize</em>
          </span>
        </Link>

        <nav aria-label="Main" className={styles.nav} id="main-nav">
          <ul>
            {nav.map((item) => {
              const current = item.href === pathname || (item.href !== "/" && !item.href.includes("#") && pathname.startsWith(item.href));
              return (
                <li key={item.href}>
                  <Link href={item.href} aria-current={current ? "page" : undefined} className={styles.navLink}>
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className={styles.actions}>
          <Link href="/cart" className={styles.cart} aria-current={pathname === "/cart" ? "page" : undefined}>
            <svg viewBox="0 0 32 32" aria-hidden="true" className={styles.cartIcon}>
              <path d="M6 12C6 11 7 10 8 10L24 10C25 10 26 11 26 12L24.5 25C24.3 26.5 23 27.5 21.5 27.5L10.5 27.5C9 27.5 7.7 26.5 7.5 25Z" />
              <path d="M11.5 13.5L11.5 9C11.5 6.5 13.5 4.5 16 4.5C18.5 4.5 20.5 6.5 20.5 9L20.5 13.5" />
            </svg>
            <span className="visually-hidden">Cart, </span>
            <span className={styles.count} data-empty={shownCount === 0 || undefined} aria-live="polite">
              {shownCount}
              <span className="visually-hidden"> {shownCount === 1 ? "item" : "items"}</span>
            </span>
          </Link>
          <button
            type="button"
            className={styles.menuBtn}
            aria-expanded={open}
            aria-controls="main-nav"
            onClick={() => setOpen((o) => !o)}
          >
            <span className={styles.burger} aria-hidden="true" />
            <span className="visually-hidden">{open ? "Close menu" : "Open menu"}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
