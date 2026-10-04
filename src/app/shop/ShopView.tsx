"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { categories, getCategory, products } from "@/data/products";
import { benefits, benefitTitle } from "@/data/content";
import { filterProducts, sortOptions, type SortKey } from "@/lib/catalog";
import { track } from "@/lib/analytics";
import { ProductCard } from "@/components/ProductCard";
import { CloseIcon } from "@/components/icons";
import styles from "./shop.module.css";

export function ShopViewLive() {
  const sp = useSearchParams();
  return <ShopView query={sp.toString()} />;
}

export function ShopView({ query }: { query: string }) {
  const router = useRouter();
  const sp = new URLSearchParams(query);
  const category = sp.get("category") || undefined;
  const need = sp.get("need") || undefined;
  const q = sp.get("q")?.trim() || undefined;
  const inStock = sp.get("stock") === "1";
  const custom = sp.get("custom") === "1";
  const sortParam = sp.get("sort") as SortKey | null;
  const sort: SortKey = sortOptions.some((o) => o.value === sortParam) ? (sortParam as SortKey) : "featured";
  const cat = category ? getCategory(category) : undefined;
  const list = filterProducts(products, { category, need, q, inStock, custom, sort });
  const [filtersOpen, setFiltersOpen] = useState(false);

  useEffect(() => {
    track("view_item_list", { item_list_id: category ?? "all", need, search_term: q, count: list.length });
  }, [category, need, q, list.length]);

  function hrefWith(patch: Record<string, string | null>) {
    const next = new URLSearchParams(query);
    for (const [k, v] of Object.entries(patch)) {
      if (v) next.set(k, v);
      else next.delete(k);
    }
    const s = next.toString();
    return s ? `/shop?${s}` : "/shop";
  }
  const update = (patch: Record<string, string | null>) => router.replace(hrefWith(patch), { scroll: false });

  const active = [
    q && { key: "q", label: `“${q}”` },
    need && { key: "need", label: benefitTitle[need as keyof typeof benefitTitle] ?? need },
    inStock && { key: "stock", label: "In stock" },
    custom && { key: "custom", label: "Customisable" },
  ].filter(Boolean) as { key: string; label: string }[];

  const title = q ? `Results for “${q}”` : custom && !cat ? "Customisable" : (cat?.name ?? "Shop all");
  const intro = q
    ? `${list.length} ${list.length === 1 ? "product matches" : "products match"} your search.`
    : custom && !cat
      ? "Products you can order as a custom batch — adjust the recipe ingredient by ingredient, from 500 g."
      : (cat?.blurb ?? "Everything from our kitchen. Every product lists exactly what’s inside.");

  return (
    <div className="wrap">
      <nav aria-label="Breadcrumb" className="crumbs">
        <ol>
          <li>
            <Link href="/">Home</Link>
          </li>
          {cat ? (
            <>
              <li>
                <Link href="/shop">Shop</Link>
              </li>
              <li aria-current="page">{cat.name}</li>
            </>
          ) : (
            <li aria-current="page">Shop</li>
          )}
        </ol>
      </nav>

      <header className={styles.head}>
        <h1>{title}</h1>
        <p>{intro}</p>
      </header>

      <nav aria-label="Categories" className={styles.tabs}>
        <ul>
          <li>
            <Link href={hrefWith({ category: null })} aria-current={!category ? "page" : undefined} scroll={false}>
              All
            </Link>
          </li>
          {categories.map((c) => (
            <li key={c.slug}>
              <Link href={hrefWith({ category: c.slug })} aria-current={category === c.slug ? "page" : undefined} scroll={false}>
                {c.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className={styles.toolbar}>
        <p className={styles.count} aria-live="polite">
          {list.length} {list.length === 1 ? "product" : "products"}
        </p>
        <button
          type="button"
          className={`btn btn--outline btn--small ${styles.filterToggle}`}
          aria-expanded={filtersOpen}
          aria-controls="shop-filters"
          onClick={() => setFiltersOpen((o) => !o)}
        >
          Filter &amp; sort{active.length ? ` (${active.length})` : ""}
        </button>
        <div id="shop-filters" className={styles.filters} data-open={filtersOpen || undefined}>
          <div className={styles.control}>
            <label htmlFor="f-need">Need</label>
            <select id="f-need" className="select" value={need ?? ""} onChange={(e) => update({ need: e.target.value || null })}>
              <option value="">All needs</option>
              {benefits.map((b) => (
                <option key={b.slug} value={b.slug}>
                  {b.title}
                </option>
              ))}
            </select>
          </div>
          <label className={styles.check}>
            <input type="checkbox" checked={inStock} onChange={(e) => update({ stock: e.target.checked ? "1" : null })} />
            In stock
          </label>
          <label className={styles.check}>
            <input type="checkbox" checked={custom} onChange={(e) => update({ custom: e.target.checked ? "1" : null })} />
            Customisable
          </label>
          <div className={styles.control}>
            <label htmlFor="f-sort">Sort</label>
            <select id="f-sort" className="select" value={sort} onChange={(e) => update({ sort: e.target.value === "featured" ? null : e.target.value })}>
              {sortOptions.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {active.length > 0 && (
        <div className={styles.active}>
          {active.map((a) => (
            <button key={a.key} type="button" className={styles.pill} onClick={() => update({ [a.key]: null })}>
              {a.label} <CloseIcon />
              <span className="visually-hidden">Remove filter</span>
            </button>
          ))}
          <button type="button" className={styles.clear} onClick={() => update({ q: null, need: null, stock: null, custom: null })}>
            Clear all
          </button>
        </div>
      )}

      {cat?.comingSoon ? (
        <div className={styles.empty}>
          <h2>Gift boxes are coming soon</h2>
          <p>
            Need something for an occasion now? <Link href="/contact" className="link">Write to us</Link> — we can usually help.
          </p>
        </div>
      ) : list.length ? (
        <div className={styles.grid}>
          {list.map((p, i) => (
            <ProductCard key={p.slug} product={p} preload={i < 2} />
          ))}
        </div>
      ) : (
        <div className={styles.empty}>
          <h2>Nothing matches those filters</h2>
          <p>Try removing a filter, or browse everything.</p>
          <Link href="/shop" className="btn">
            Shop all products
          </Link>
        </div>
      )}
    </div>
  );
}
