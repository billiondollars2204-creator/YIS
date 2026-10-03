/**
 * Ingredient library and per-product "house recipes" for the batch builder.
 * PLACEHOLDER: names are common Indian pantry ingredients used as a starting
 * list. The kitchen must confirm which options are offered, default levels,
 * and surcharges before launch. Notes are sensory descriptions only — no
 * health claims belong here.
 */
export type GlyphKind =
  | "almond"
  | "cashew"
  | "pistachio"
  | "walnut"
  | "raisin"
  | "fig"
  | "makhana"
  | "gond"
  | "magaz"
  | "flax"
  | "pumpkin"
  | "coconut"
  | "cardamom"
  | "saunth"
  | "ajwain"
  | "saffron";

export type IngredientGroup = "dryfruit" | "seed" | "spice";

export type Ingredient = {
  id: GlyphKind;
  name: string;
  local: string;
  note: string;
  group: IngredientGroup;
  /** Fill colour used by the illustration and bowl particles. */
  color: string;
  /** PLACEHOLDER ₹ per level above the house recipe, per 500 g. */
  extraPrice: number;
};

export const ingredients: Record<GlyphKind, Ingredient> = {
  almond: { id: "almond", name: "Almonds", local: "Badam", note: "Sliced and lightly toasted", group: "dryfruit", color: "#B97A4B", extraPrice: 30 },
  cashew: { id: "cashew", name: "Cashews", local: "Kaju", note: "Halved, buttery and soft", group: "dryfruit", color: "#EAD3A6", extraPrice: 30 },
  pistachio: { id: "pistachio", name: "Pistachios", local: "Pista", note: "Slivered, bright and nutty", group: "dryfruit", color: "#9BAE62", extraPrice: 60 },
  walnut: { id: "walnut", name: "Walnuts", local: "Akhrot", note: "Broken by hand, slightly bitter", group: "dryfruit", color: "#A26F45", extraPrice: 50 },
  raisin: { id: "raisin", name: "Raisins", local: "Kishmish", note: "Plump golden and dark", group: "dryfruit", color: "#5E2B2F", extraPrice: 15 },
  fig: { id: "fig", name: "Figs", local: "Anjeer", note: "Chopped, chewy, jammy", group: "dryfruit", color: "#86543A", extraPrice: 40 },
  makhana: { id: "makhana", name: "Fox nuts", local: "Makhana", note: "Roasted in ghee, then crushed", group: "seed", color: "#F2EBDD", extraPrice: 25 },
  gond: { id: "gond", name: "Edible gum", local: "Gond", note: "Fried until it puffs and crackles", group: "seed", color: "#E6C27E", extraPrice: 20 },
  magaz: { id: "magaz", name: "Melon seeds", local: "Magaz", note: "Tiny, creamy, lightly roasted", group: "seed", color: "#F3EEE2", extraPrice: 25 },
  flax: { id: "flax", name: "Flax seeds", local: "Alsi", note: "Dry-roasted, ground coarse", group: "seed", color: "#6A4127", extraPrice: 10 },
  pumpkin: { id: "pumpkin", name: "Pumpkin seeds", local: "Kaddu beej", note: "Green, crisp, toasted", group: "seed", color: "#6F8B4B", extraPrice: 20 },
  coconut: { id: "coconut", name: "Coconut", local: "Nariyal", note: "Dry, finely shredded", group: "seed", color: "#FAF5EA", extraPrice: 10 },
  cardamom: { id: "cardamom", name: "Green cardamom", local: "Elaichi", note: "Freshly pounded", group: "spice", color: "#8FA466", extraPrice: 15 },
  saunth: { id: "saunth", name: "Dry ginger", local: "Saunth", note: "Warm, gently peppery", group: "spice", color: "#D6B585", extraPrice: 10 },
  ajwain: { id: "ajwain", name: "Carom seeds", local: "Ajwain", note: "A small pinch, toasted", group: "spice", color: "#8A6A45", extraPrice: 5 },
  saffron: { id: "saffron", name: "Saffron", local: "Kesar", note: "A few strands, bloomed in milk", group: "spice", color: "#C2361C", extraPrice: 80 },
};

export const groupInfo: Record<IngredientGroup, { title: string; blurb: string }> = {
  dryfruit: { title: "Dry fruits", blurb: "Nuts and dried fruit, folded in by hand." },
  seed: { title: "Seeds & traditional extras", blurb: "Crunch and texture from the old recipes." },
  spice: { title: "Spices", blurb: "Small amounts, big difference." },
};

export const LEVELS = ["None", "Less", "Usual", "Extra"] as const;
export type Level = 0 | 1 | 2 | 3;

export type ChoiceOption = { id: string; label: string; note: string };
export type ChoiceGroup = { id: string; title: string; question: string; options: ChoiceOption[]; default: string };

export type Recipe = {
  /** Adjustable ingredients and their house-recipe level. */
  ingredients: { id: GlyphKind; default: Level }[];
  choices: ChoiceGroup[];
  /** Colours of the cooked base for each `base` option (bowl + sketch). */
  baseTint: Record<string, { light: string; deep: string }>;
};

const sweetness: ChoiceGroup = {
  id: "sweetness",
  title: "Sweetness",
  question: "How sweet should it be?",
  options: [
    { id: "light", label: "Light", note: "Just a hint" },
    { id: "balanced", label: "Balanced", note: "Our house level" },
    { id: "classic", label: "Classic", note: "Like the festival batch" },
  ],
  default: "balanced",
};

const texture: ChoiceGroup = {
  id: "texture",
  title: "Texture",
  question: "How should it feel?",
  options: [
    { id: "coarse", label: "Coarse", note: "Crumbly, with bite" },
    { id: "fine", label: "Fine", note: "Soft and even" },
  ],
  default: "coarse",
};

const panjiriChoices: ChoiceGroup[] = [
  {
    id: "base",
    title: "Base",
    question: "What should we roast?",
    options: [
      { id: "atta", label: "Wholewheat atta", note: "The classic, nutty and warm" },
      { id: "atta-suji", label: "Atta + suji", note: "Lighter, with a little grain" },
    ],
    default: "atta",
  },
  {
    id: "roast",
    title: "Roast",
    question: "How long on the flame?",
    options: [
      { id: "golden", label: "Golden", note: "Gentle and sweet-smelling" },
      { id: "deep", label: "Deep", note: "Toastier, almost caramel" },
    ],
    default: "golden",
  },
  {
    id: "ghee",
    title: "Desi ghee",
    question: "How rich?",
    options: [
      { id: "light", label: "Light", note: "Drier crumble" },
      { id: "classic", label: "Classic", note: "Our house amount" },
      { id: "rich", label: "Rich", note: "Clumps when pressed" },
    ],
    default: "classic",
  },
  {
    id: "sweetener",
    title: "Sweetener",
    question: "Sweetened with",
    options: [
      { id: "jaggery", label: "Jaggery", note: "Gur — earthy, caramel notes" },
      { id: "khand", label: "Khand", note: "Unrefined cane sugar" },
      { id: "sugar", label: "Sugar", note: "Clean and familiar" },
    ],
    default: "jaggery",
  },
  sweetness,
  texture,
];

const ladduChoices: ChoiceGroup[] = [
  {
    id: "base",
    title: "Base",
    question: "What holds it together?",
    options: [
      { id: "dates", label: "Dates", note: "Soft, deep and caramel-like" },
      { id: "dates-figs", label: "Dates + figs", note: "Jammy, with tiny seeds" },
    ],
    default: "dates",
  },
  {
    id: "sweetener",
    title: "Sweetener",
    question: "Any added sweetness?",
    options: [
      { id: "fruit", label: "Fruit only", note: "Sweetened by the dates and figs" },
      { id: "jaggery", label: "A little jaggery", note: "Rounder, more fudge-like" },
    ],
    default: "fruit",
  },
  {
    id: "size",
    title: "Laddu size",
    question: "How big should each one be?",
    options: [
      { id: "bite", label: "Bite-size", note: "Two bites, more pieces" },
      { id: "classic", label: "Classic", note: "Fits the palm" },
    ],
    default: "classic",
  },
  texture,
];

const panjiriTint = { atta: { light: "#D9A85E", deep: "#B47A3C" }, "atta-suji": { light: "#E2BB76", deep: "#BF8A4A" } };
const ladduTint = { dates: { light: "#6E3D24", deep: "#5C301C" }, "dates-figs": { light: "#7D4A2D", deep: "#673A22" } };

export const recipes: Record<string, Recipe> = {
  "classic-panjiri": {
    ingredients: [
      { id: "almond", default: 2 },
      { id: "cashew", default: 2 },
      { id: "pistachio", default: 1 },
      { id: "walnut", default: 0 },
      { id: "raisin", default: 2 },
      { id: "makhana", default: 2 },
      { id: "gond", default: 1 },
      { id: "magaz", default: 1 },
      { id: "coconut", default: 0 },
      { id: "cardamom", default: 2 },
      { id: "saffron", default: 0 },
    ],
    choices: panjiriChoices,
    baseTint: panjiriTint,
  },
  "mothers-panjiri": {
    ingredients: [
      { id: "almond", default: 3 },
      { id: "cashew", default: 2 },
      { id: "walnut", default: 1 },
      { id: "raisin", default: 1 },
      { id: "makhana", default: 2 },
      { id: "gond", default: 3 },
      { id: "magaz", default: 2 },
      { id: "coconut", default: 1 },
      { id: "saunth", default: 2 },
      { id: "ajwain", default: 1 },
      { id: "cardamom", default: 1 },
    ],
    choices: panjiriChoices,
    baseTint: panjiriTint,
  },
  "dry-fruit-laddu": {
    ingredients: [
      { id: "almond", default: 2 },
      { id: "cashew", default: 2 },
      { id: "pistachio", default: 2 },
      { id: "walnut", default: 1 },
      { id: "fig", default: 1 },
      { id: "raisin", default: 1 },
      { id: "flax", default: 0 },
      { id: "pumpkin", default: 0 },
      { id: "coconut", default: 1 },
      { id: "cardamom", default: 2 },
      { id: "saffron", default: 0 },
    ],
    choices: ladduChoices,
    baseTint: ladduTint,
  },
  "seasonal-laddu": {
    ingredients: [
      { id: "almond", default: 2 },
      { id: "cashew", default: 1 },
      { id: "coconut", default: 3 },
      { id: "magaz", default: 1 },
      { id: "cardamom", default: 2 },
    ],
    choices: ladduChoices,
    baseTint: ladduTint,
  },
};

/** Ingredients shown on non-customisable product pages and sketches. PLACEHOLDER. */
export const showcase: Record<string, GlyphKind[]> = {
  "atta-pinni": ["almond", "cashew", "magaz", "cardamom"],
  "everyday-mix": ["almond", "cashew", "raisin", "pumpkin"],
  "study-table-mix": ["walnut", "makhana", "pumpkin", "flax"],
};

export function productIngredients(slug: string): GlyphKind[] {
  const r = recipes[slug];
  if (r) return r.ingredients.filter((i) => i.default > 0).map((i) => i.id);
  return showcase[slug] ?? ["almond", "cashew", "raisin"];
}
