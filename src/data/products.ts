/**
 * PLACEHOLDER CATALOGUE.
 * Prices, stock, ingredients, nutrition and preparation notes are illustrative
 * only. Every field marked TODO must be confirmed by the Immunitywize kitchen
 * before launch. Do not add health claims here without review.
 */
export type StockStatus = "in_stock" | "low_stock" | "out_of_stock";
export type BenefitSlug = "immunity" | "wellness" | "postpartum" | "bone" | "clarity";

export type Category = {
  slug: string;
  name: string;
  /** Native-script name, shown decoratively. */
  script?: { text: string; lang: string };
  blurb: string;
  comingSoon?: boolean;
};

export type Variant = {
  id: string;
  label: string;
  grams: number;
  price: number; // INR, PLACEHOLDER
  stock: StockStatus;
};

export type CustomOption = { id: string; label: string; hint?: string };

export type Product = {
  slug: string;
  name: string;
  category: string;
  /** One-line descriptor shown on product cards. */
  short: string;
  tagline: string;
  /** PLACEHOLDER merchandising badge. */
  badge?: "Bestseller" | "New" | "Limited";
  description: string;
  /** Traditional-use tags; copy shown with a "not medical advice" note. */
  enjoyedFor: BenefitSlug[];
  ingredients: string[];
  nutrition: { label: string; value: string }[];
  preparation: string;
  storage: string;
  variants: Variant[];
  featured?: boolean;
  customizable?: boolean;
  custom?: { addable: CustomOption[]; removable: CustomOption[] };
};

export const categories: Category[] = [
  {
    slug: "panjiri",
    name: "Panjiri",
    script: { text: "ਪੰਜੀਰੀ", lang: "pa" },
    blurb: "Roasted wholewheat crumble, eaten by the spoonful or stirred into warm milk.",
  },
  {
    slug: "pinni",
    name: "Pinni",
    script: { text: "ਪਿੰਨੀ", lang: "pa" },
    blurb: "Dense, hand-pressed winter sweets from Punjabi kitchens.",
  },
  {
    slug: "laddus",
    name: "Dry-fruit laddus",
    script: { text: "लड्डू", lang: "hi" },
    blurb: "Rolled by hand, one at a time. A small round of something good.",
  },
  {
    slug: "mixes",
    name: "Dry-fruit mixes",
    script: { text: "मेवा", lang: "hi" },
    blurb: "Nuts, seeds and dried fruit, roasted lightly and mixed for everyday snacking.",
  },
  {
    slug: "gift-boxes",
    name: "Gift boxes",
    blurb: "Festive and new-baby boxes. Coming soon (placeholder category).",
    comingSoon: true,
  },
];

// PLACEHOLDER pricing ladder used across products.
const ladder = (base: number, stock: [StockStatus, StockStatus, StockStatus] = ["in_stock", "in_stock", "in_stock"]): Variant[] => [
  { id: "250g", label: "250 g", grams: 250, price: base, stock: stock[0] },
  { id: "500g", label: "500 g", grams: 500, price: Math.round(base * 1.85), stock: stock[1] },
  { id: "1kg", label: "1 kg", grams: 1000, price: Math.round(base * 3.4), stock: stock[2] },
];

const nutritionPlaceholder = [
  { label: "Energy", value: "— kcal" },
  { label: "Protein", value: "— g" },
  { label: "Carbohydrate", value: "— g" },
  { label: "of which sugars", value: "— g" },
  { label: "Fat", value: "— g" },
  { label: "Fibre", value: "— g" },
];

// TODO(kitchen): replace with kitchen-approved option lists per product.
const panjiriOptions = {
  addable: [
    { id: "extra-nuts", label: "Extra nuts", hint: "Placeholder option" },
    { id: "seeds", label: "Seed mix", hint: "Placeholder option" },
    { id: "dried-fruit", label: "More dried fruit", hint: "Placeholder option" },
    { id: "spice", label: "Warming spice blend", hint: "Placeholder option" },
  ],
  removable: [
    { id: "no-nuts", label: "Leave out nuts", hint: "For allergies — see note" },
    { id: "no-dried-fruit", label: "Leave out dried fruit" },
  ],
};

const ladduOptions = {
  addable: [
    { id: "extra-nuts", label: "Extra nuts", hint: "Placeholder option" },
    { id: "seeds", label: "Seed mix", hint: "Placeholder option" },
    { id: "coconut", label: "Coconut", hint: "Placeholder option" },
  ],
  removable: [
    { id: "no-nuts", label: "Leave out nuts", hint: "For allergies — see note" },
    { id: "no-dates", label: "Leave out dates", hint: "Placeholder option" },
  ],
};

export const products: Product[] = [
  {
    slug: "classic-panjiri",
    name: "Ghar ki Panjiri",
    category: "panjiri",
    short: "Roasted wholewheat crumble",
    badge: "Bestseller",
    tagline: "The everyday one. Roasted slowly until the kitchen smells right.",
    description:
      "Wholewheat flour roasted low and slow, folded with nuts and a gentle sweetness. Eat a spoonful with your morning chai, or stir into warm milk on cold evenings. (Placeholder description — refine with the family’s own words.)",
    enjoyedFor: ["immunity", "wellness"],
    ingredients: ["Ingredient list to be confirmed (TODO)", "Wholewheat flour (TBC)", "Ghee (TBC)", "Nuts — variety TBC", "Sweetener — type TBC"],
    nutrition: nutritionPlaceholder,
    preparation:
      "Made in small batches on a slow flame in a home kitchen. Batch size, roasting time and process details to be added (TODO).",
    storage: "Store in an airtight jar, away from moisture. Shelf life: TBC.",
    variants: ladder(349),
    featured: true,
    customizable: true,
    custom: panjiriOptions,
  },
  {
    slug: "mothers-panjiri",
    name: "Panjiri for New Mothers",
    category: "panjiri",
    short: "A richer panjiri for new mothers",
    tagline: "Made the way families have long made it for the weeks after a baby arrives.",
    description:
      "A richer panjiri in the tradition of post-delivery foods across North India. Always check with your doctor about diet after childbirth. (Placeholder — all copy and ingredients to be reviewed.)",
    enjoyedFor: ["postpartum", "bone", "wellness"],
    ingredients: ["Ingredient list to be confirmed (TODO)", "Wholewheat flour (TBC)", "Ghee (TBC)", "Traditional additions — TBC"],
    nutrition: nutritionPlaceholder,
    preparation: "Prepared to order in small batches. Process details to be added (TODO).",
    storage: "Store in an airtight jar, away from moisture. Shelf life: TBC.",
    variants: ladder(449, ["in_stock", "in_stock", "low_stock"]),
    featured: true,
    customizable: true,
    custom: panjiriOptions,
  },
  {
    slug: "atta-pinni",
    name: "Atta Pinni",
    category: "pinni",
    short: "Hand-pressed winter sweet",
    badge: "Bestseller",
    tagline: "Pressed in the palm, still warm. Dense, nutty, a little crumbly.",
    description:
      "Roasted flour and ghee pressed into rounds by hand — a winter staple in Punjabi homes. (Placeholder description.)",
    enjoyedFor: ["wellness", "bone"],
    ingredients: ["Ingredient list to be confirmed (TODO)"],
    nutrition: nutritionPlaceholder,
    preparation: "Hand-pressed after roasting. Approximate piece weight and count per pack: TBC.",
    storage: "Keep in a cool, dry place. Shelf life: TBC.",
    variants: ladder(399),
    featured: true,
  },
  {
    slug: "dry-fruit-laddu",
    name: "Dry-Fruit Laddu",
    category: "laddus",
    short: "Fruit and nuts, rolled by hand",
    badge: "Bestseller",
    tagline: "A little round of something sweet, made without shortcuts.",
    description:
      "Dried fruit and nuts bound together and rolled by hand into small rounds — a sweet that doesn’t feel like a compromise. (Placeholder description.)",
    enjoyedFor: ["wellness", "clarity", "immunity"],
    ingredients: ["Ingredient list to be confirmed (TODO)", "Dates (TBC)", "Nuts — variety TBC"],
    nutrition: nutritionPlaceholder,
    preparation: "Rolled by hand in small batches. Pieces per pack: TBC.",
    storage: "Refrigerate after opening in warm weather. Shelf life: TBC.",
    variants: ladder(499),
    featured: true,
    customizable: true,
    custom: ladduOptions,
  },
  {
    slug: "seasonal-laddu",
    name: "Seasonal Laddu",
    category: "laddus",
    short: "Small seasonal runs",
    badge: "Limited",
    tagline: "Whatever the season brings in. Small runs, gone quickly.",
    description: "A rotating laddu made with seasonal ingredients. (Placeholder product — recipe and name TBC.)",
    enjoyedFor: ["wellness"],
    ingredients: ["Changes with the season — TBC"],
    nutrition: nutritionPlaceholder,
    preparation: "Rolled by hand in small batches.",
    storage: "Shelf life: TBC.",
    variants: ladder(479, ["out_of_stock", "out_of_stock", "out_of_stock"]),
    customizable: true,
    custom: ladduOptions,
  },
  {
    slug: "everyday-mix",
    name: "Everyday Mewa Mix",
    category: "mixes",
    short: "Lightly roasted nuts, seeds and fruit",
    tagline: "A handful for the afternoon slump.",
    description:
      "Lightly roasted nuts, seeds and dried fruit, mixed for snacking between meals. (Placeholder description — exact mix TBC.)",
    enjoyedFor: ["clarity", "wellness"],
    ingredients: ["Mix composition to be confirmed (TODO)"],
    nutrition: nutritionPlaceholder,
    preparation: "Dry-roasted in small batches and mixed by hand.",
    storage: "Keep sealed after opening. Shelf life: TBC.",
    variants: ladder(379),
    featured: true,
  },
  {
    slug: "study-table-mix",
    name: "Study-Table Mix",
    category: "mixes",
    short: "A crunchier mix for desk snacking",
    badge: "New",
    tagline: "For exam season, long shifts, and late nights.",
    description: "A crunchier mix built for desk snacking. (Placeholder product — composition TBC.)",
    enjoyedFor: ["clarity"],
    ingredients: ["Mix composition to be confirmed (TODO)"],
    nutrition: nutritionPlaceholder,
    preparation: "Dry-roasted in small batches and mixed by hand.",
    storage: "Keep sealed after opening. Shelf life: TBC.",
    variants: ladder(329, ["low_stock", "in_stock", "in_stock"]),
  },
];

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getCategory(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export function productsIn(category: string): Product[] {
  return products.filter((p) => p.category === category);
}

export function fromPrice(p: Product): number {
  return Math.min(...p.variants.map((v) => v.price));
}

export function isSoldOut(p: Product): boolean {
  return p.variants.every((v) => v.stock === "out_of_stock");
}

export const stockLabel: Record<StockStatus, string> = {
  in_stock: "In stock",
  low_stock: "Only a few left",
  out_of_stock: "Sold out",
};
