"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { getProduct } from "@/data/products";
import { site } from "@/lib/site";
import { useCart, useCartUI, useHydrated } from "@/lib/cart";
import { FREE_SHIPPING_THRESHOLD, formatINR } from "@/lib/money";
import { MIN_CUSTOM_GRAMS } from "@/lib/customization";
import { SearchDialog } from "./SearchDialog";
import { MobileMenu } from "./MobileMenu";
import { BagIcon, MenuIcon, SearchIcon, UserIcon } from "./icons";
import styles from "./SiteHeader.module.css";

export const shopNav = [
  { href: "/shop", label: "Shop all", scope: "all" },
  { href: "/shop?category=panjiri", label: "Panjiri", scope: "panjiri" },
  { href: "/shop?category=pinni", label: "Pinni", scope: "pinni" },
  { href: "/shop?category=laddus", label: "Laddus", scope: "laddus" },
  { href: "/shop?category=mixes", label: "Dry-fruit mixes", scope: "mixes" },
];

/** Which top-level item the current page belongs to (Baymard: highlight the user's scope). */
function useScope(): string | null {
  const pathname = usePathname();
  const params = useSearchParams();
  if (pathname.startsWith("/customise")) return "custom";
  if (pathname === "/shop") return params.get("category") ?? (params.toString() ? null : "all");
  if (pathname.startsWith("/shop/")) return getProduct(pathname.split("/")[2] ?? "")?.category ?? null;
  return null;
}

function NavLinks({ scope }: { scope: string | null }) {
  return (
    <ul className={styles.navList}>
      {shopNav.map((n) => (
        <li key={n.href}>
          <Link href={n.href} className={styles.navLink} aria-current={scope === n.scope ? "page" : undefined}>
            {n.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

function ScopedNav() {
  return <NavLinks scope={useScope()} />;
}

export function SiteHeader() {
  const pathname = usePathname();
  const [menu, setMenu] = useState(false);
  const [search, setSearch] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const openCart = useCartUI((s) => s.setOpen);
  const hydrated = useHydrated();
  const count = useCart((s) => s.lines.reduce((n, l) => n + l.qty, 0));
  const shown = hydrated ? count : 0;

  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setMenu(false);
    setSearch(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div className={styles.utility}>
        <div className={`wrap ${styles.utilityInner}`}>
          <p>Free standard delivery over {formatINR(FREE_SHIPPING_THRESHOLD)}</p>
          <p className={styles.utilitySecond}>
            Custom batches from {MIN_CUSTOM_GRAMS} g ·{" "}
            <Link href="/customise" className={styles.utilityLink}>
              Start one
            </Link>
          </p>
        </div>
      </div>
      <header className={styles.header} data-scrolled={scrolled || undefined}>
        <div className={`wrap ${styles.bar}`}>
          <div className={styles.start}>
            <button type="button" className={`icon-btn ${styles.mobileOnly}`} onClick={() => setMenu(true)} aria-label="Open menu">
              <MenuIcon />
            </button>
            <Link href="/" className={styles.logo} aria-label={`${site.name}, home`}>
              Immunitywize
            </Link>
          </div>

          <nav aria-label="Shop" className={styles.nav}>
            <Suspense fallback={<NavLinks scope={null} />}>
              <ScopedNav />
            </Suspense>
          </nav>

          <div className={styles.end}>
            <Link href="/customise" className={styles.custom} aria-current={pathname.startsWith("/customise") ? "page" : undefined}>
              Custom batch
            </Link>
            <button type="button" className={styles.searchBtn} onClick={() => setSearch(true)}>
              <SearchIcon />
              <span className={styles.searchLabel}>Search</span>
            </button>
            <Link href="/account" className={`icon-btn ${styles.desktopOnly}`} aria-label="Account">
              <UserIcon />
            </Link>
            <button type="button" className="icon-btn" onClick={() => openCart(true)} aria-label={`Cart, ${shown} ${shown === 1 ? "item" : "items"}`}>
              <BagIcon />
              {shown > 0 && (
                <span key={shown} className={styles.count} aria-hidden="true">
                  {shown}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>
      <SearchDialog open={search} onClose={() => setSearch(false)} />
      <MobileMenu open={menu} onClose={() => setMenu(false)} />
    </>
  );
}
