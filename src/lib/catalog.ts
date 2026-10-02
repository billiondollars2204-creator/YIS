import type { Product } from "../data/products";

export type SortKey = "featured" | "price-asc" | "price-desc" | "name";

export type Filters = {
  category?: string;
  need?: string;
  q?: string;
  inStock?: boolean;
  custom?: boolean;
  sort?: SortKey;
};

export const sortOptions: { value: SortKey; label: string }[] = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
  { value: "name", label: "Name: A–Z" },
];

const minPrice = (p: Product) => Math.min(...p.variants.map((v) => v.price));
const soldOut = (p: Product) => p.variants.every((v) => v.stock === "out_of_stock");

/** Filter + sort used by the shop page and search. Sold-out items always sink to the end. */
export function filterProducts(list: Product[], f: Filters): Product[] {
  const terms = (f.q ?? "").toLowerCase().split(/\s+/).filter(Boolean);
  const order = new Map(list.map((p, i) => [p.slug, i]));
  const result = list.filter((p) => {
    if (f.category && p.category !== f.category) return false;
    if (f.need && !(p.enjoyedFor as string[]).includes(f.need)) return false;
    if (f.inStock && soldOut(p)) return false;
    if (f.custom && !p.customizable) return false;
    if (terms.length) {
      const hay = [p.name, p.short, p.tagline, p.category].join(" ").toLowerCase();
      if (!terms.every((t) => hay.includes(t))) return false;
    }
    return true;
  });
  const pos = (p: Product) => order.get(p.slug) ?? 0;
  const compare: Record<SortKey, (a: Product, b: Product) => number> = {
    featured: (a, b) => Number(!!b.featured) - Number(!!a.featured) || pos(a) - pos(b),
    "price-asc": (a, b) => minPrice(a) - minPrice(b),
    "price-desc": (a, b) => minPrice(b) - minPrice(a),
    name: (a, b) => a.name.localeCompare(b.name),
  };
  const cmp = compare[f.sort ?? "featured"] ?? compare.featured;
  return result.sort((a, b) => Number(soldOut(a)) - Number(soldOut(b)) || cmp(a, b));
}
