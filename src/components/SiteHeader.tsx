"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { categories, productsIn } from "@/data/products";
import { benefits } from "@/data/content";
import { images } from "@/data/images";
import { nav, site } from "@/lib/site";
import { useCart, useCartUI, useHydrated } from "@/lib/cart";
import { SmartImage } from "./SmartImage";
import { SearchDialog } from "./SearchDialog";
import { MobileMenu } from "./MobileMenu";
import { ArrowRight, BagIcon, ChevronDown, MenuIcon, SearchIcon, UserIcon } from "./icons";
import styles from "./SiteHeader.module.css";

export function SiteHeader() {
  const pathname = usePathname();
  const [mega, setMega] = useState(false);
  const [menu, setMenu] = useState(false);
  const [search, setSearch] = useState(false);
  const openCart = useCartUI((s) => s.setOpen);
  const hydrated = useHydrated();
  const count = useCart((s) => s.lines.reduce((n, l) => n + l.qty, 0));
  const shown = hydrated ? count : 0;

  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setMega(false);
    setMenu(false);
    setSearch(false);
  }

  useEffect(() => {
    if (!mega) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMega(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mega]);

  const closeMega = () => setMega(false);

  return (
    <header className={styles.header} onMouseLeave={closeMega}>
      <div className={`wrap ${styles.bar}`}>
        <div className={styles.left}>
          <button type="button" className={`icon-btn ${styles.mobileOnly}`} onClick={() => setMenu(true)} aria-label="Open menu">
            <MenuIcon />
          </button>
          <nav aria-label="Main" className={styles.nav}>
            <ul>
              <li>
                <button
                  type="button"
                  className={styles.navLink}
                  aria-expanded={mega}
                  aria-controls="mega-menu"
                  onClick={() => setMega((m) => !m)}
                  onMouseEnter={() => setMega(true)}
                >
                  Shop <ChevronDown className={styles.chev} />
                </button>
              </li>
              {nav.map((n) => (
                <li key={n.href}>
                  <Link href={n.href} className={styles.navLink} onMouseEnter={closeMega} aria-current={pathname === n.href ? "page" : undefined}>
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <Link href="/" className={styles.logo} aria-label={`${site.name}, home`}>
          Immunitywize
        </Link>

        <div className={styles.right}>
          <button type="button" className="icon-btn" onClick={() => setSearch(true)} aria-label="Search">
            <SearchIcon />
          </button>
          <Link href="/account" className={`icon-btn ${styles.desktopOnly}`} aria-label="Account">
            <UserIcon />
          </Link>
          <button type="button" className="icon-btn" onClick={() => openCart(true)} aria-label={`Cart, ${shown} ${shown === 1 ? "item" : "items"}`}>
            <BagIcon />
            {shown > 0 && (
              <span className={styles.count} aria-hidden="true">
                {shown}
              </span>
            )}
          </button>
        </div>
      </div>

      <div id="mega-menu" className={styles.mega} hidden={!mega}>
        <div className={`wrap ${styles.megaGrid}`}>
          <div>
            <p className={styles.megaLabel}>Categories</p>
            <ul className={styles.megaList}>
              <li>
                <Link href="/shop" onClick={closeMega}>
                  Shop all
                </Link>
              </li>
              {categories.map((c) => (
                <li key={c.slug}>
                  <Link href={`/shop?category=${c.slug}`} onClick={closeMega}>
                    {c.name}
                    <span className={styles.megaMeta}>{c.comingSoon ? "Coming soon" : productsIn(c.slug).length}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className={styles.megaLabel}>Shop by need</p>
            <ul className={styles.megaList}>
              {benefits.map((b) => (
                <li key={b.slug}>
                  <Link href={`/shop?need=${b.slug}`} onClick={closeMega}>
                    {b.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <Link href="/shop?custom=1" className={styles.feature} onClick={closeMega}>
            <SmartImage image={images.customise} sizes="360px" ratio="16 / 10" decorative />
            <span className={styles.featureTitle}>Build a custom batch</span>
            <span className={styles.featureText}>
              Panjiri and laddus, adjusted to your taste, from 500 g <ArrowRight />
            </span>
          </Link>
        </div>
      </div>

      <SearchDialog open={search} onClose={() => setSearch(false)} />
      <MobileMenu open={menu} onClose={() => setMenu(false)} />
    </header>
  );
}
