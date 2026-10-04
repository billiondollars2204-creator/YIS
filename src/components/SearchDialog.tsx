"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { categories, fromPrice, products } from "@/data/products";
import { productImages } from "@/data/images";
import { filterProducts } from "@/lib/catalog";
import { formatINR } from "@/lib/money";
import { track } from "@/lib/analytics";
import { useDialog } from "@/lib/useDialog";
import { SmartImage } from "./SmartImage";
import { CloseIcon, SearchIcon } from "./icons";
import styles from "./SearchDialog.module.css";

export function SearchDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const ref = useDialog(open, onClose);
  const router = useRouter();
  const [q, setQ] = useState("");
  const term = q.trim();
  const results = term ? filterProducts(products, { q: term }).slice(0, 6) : [];

  return (
    <dialog ref={ref} className={`sheet sheet--top ${styles.dialog}`} aria-label="Search products">
      <div className={`wrap ${styles.inner}`}>
        <form
          role="search"
          className={styles.form}
          onSubmit={(e) => {
            e.preventDefault();
            if (!term) return;
            track("search", { search_term: term });
            onClose();
            router.push(`/shop?q=${encodeURIComponent(term)}`);
          }}
        >
          <SearchIcon className={styles.icon} />
          <label htmlFor="site-search" className="visually-hidden">
            Search products
          </label>
          <input
            id="site-search"
            type="search"
            autoFocus
            autoComplete="off"
            className={styles.input}
            placeholder="Search panjiri, laddus, mixes…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
          <button type="button" className="icon-btn" onClick={onClose} aria-label="Close search">
            <CloseIcon />
          </button>
        </form>

        <div className={styles.results} aria-live="polite">
          {term ? (
            results.length ? (
              <>
                <ul className={styles.list}>
                  {results.map((p) => (
                    <li key={p.slug}>
                      <Link href={`/shop/${p.slug}`} className={styles.result} onClick={onClose}>
                        <SmartImage image={productImages(p)[0]} sizes="64px" ratio="4 / 5" decorative quiet className={styles.thumb} />
                        <span>
                          <span className={styles.name}>{p.name}</span>
                          <span className={styles.meta}>From {formatINR(fromPrice(p))}</span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link href={`/shop?q=${encodeURIComponent(term)}`} className="arrow-link" onClick={() => {
                  track("search", { search_term: term });
                  onClose();
                }}>
                  See all results for “{term}”
                </Link>
              </>
            ) : (
              <p className={styles.none}>No products match “{term}”. Try “panjiri” or “mix”.</p>
            )
          ) : (
            <div>
              <p className={styles.label}>Browse</p>
              <ul className={styles.popular}>
                {categories
                  .filter((c) => !c.comingSoon)
                  .map((c) => (
                    <li key={c.slug}>
                      <Link href={`/shop?category=${c.slug}`} onClick={onClose}>
                        {c.name}
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </dialog>
  );
}
