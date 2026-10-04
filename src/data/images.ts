import manifest from "./image-manifest.json";

/**
 * Image slots. `src` is a path stem under /public without an extension; the
 * manifest (scripts/image-manifest.mjs) maps it to whichever file exists.
 * Missing files render as a neutral placeholder of the same size. Generation
 * briefs for every slot live in CODEX_IMAGES.md — keep ids and paths in sync.
 */
export type Tone = "sand" | "clay" | "sage";
export type ImageRef = { id: string; src: string; alt: string; label: string; tone?: Tone };

const files = manifest as Record<string, string>;

export function resolveImage(stem: string): string | undefined {
  return files[stem];
}

export function hasImage(ref?: ImageRef): boolean {
  return !!ref && !!files[ref.src];
}

export const images = {
  hero: {
    id: "home-hero",
    src: "/images/home/hero",
    alt: "Jars of Ghar ki Panjiri, Atta Pinni and Dry-Fruit Laddu on a stone kitchen counter in morning light",
    label: "Home hero · desktop 2400×1100",
  },
  heroMobile: {
    id: "home-hero-mobile",
    src: "/images/home/hero-mobile",
    alt: "Jars of Ghar ki Panjiri, Atta Pinni and Dry-Fruit Laddu on a stone kitchen counter in morning light",
    label: "Home hero · mobile 1200×1500",
  },
  customise: {
    id: "home-customise",
    src: "/images/home/customise",
    alt: "Small brass bowls of almonds, cashews, raisins, makhana and cardamom arranged around a bowl of roasted panjiri",
    label: "Custom batches · 1600×1200",
    tone: "clay",
  },
  storyHero: {
    id: "story-hero",
    src: "/images/story/hero",
    alt: "Two generations of a family standing together in their home kitchen",
    label: "Our story · hero",
  },
  storyRoasting: {
    id: "story-roasting",
    src: "/images/story/roasting",
    alt: "Wholewheat flour being stirred in a kadhai until golden",
    label: "Our story · roasting",
    tone: "clay",
  },
  storyRolling: {
    id: "story-rolling",
    src: "/images/story/rolling",
    alt: "Hands pressing pinni one at a time",
    label: "Our story · pressing",
  },
  storyPacking: {
    id: "story-packing",
    src: "/images/story/packing",
    alt: "Glass jars of panjiri being filled and sealed on a wooden table",
    label: "Our story · packing",
    tone: "sage",
  },
} satisfies Record<string, ImageRef>;

const categoryTone: Record<string, Tone> = { panjiri: "sand", pinni: "clay", laddus: "clay", mixes: "sage", "gift-boxes": "sand" };

const categoryAlt: Record<string, string> = {
  panjiri: "A brass bowl of golden panjiri with a spoon",
  pinni: "Hand-pressed pinni stacked on a ceramic plate",
  laddus: "Dry-fruit laddus arranged on a brass thali",
  mixes: "A glass jar of roasted nuts, seeds and raisins",
  "gift-boxes": "A kraft gift box of homemade sweets tied with cotton string",
};

export function categoryImage(slug: string, name: string): ImageRef {
  return { id: `category-${slug}`, src: `/images/categories/${slug}`, alt: categoryAlt[slug] ?? name, label: `Category · ${name}`, tone: categoryTone[slug] };
}

/** Three shots per product: 1 packshot, 2 texture close-up, 3 served at home. */
export function productImages(p: { slug: string; name: string; category: string }): ImageRef[] {
  const tone = categoryTone[p.category];
  return [
    { id: `${p.slug}-1`, src: `/images/products/${p.slug}/1`, alt: `${p.name} in a glass jar`, label: `${p.name} · packshot`, tone },
    { id: `${p.slug}-2`, src: `/images/products/${p.slug}/2`, alt: `Close-up of ${p.name}`, label: `${p.name} · close-up`, tone },
    { id: `${p.slug}-3`, src: `/images/products/${p.slug}/3`, alt: `${p.name} served with chai`, label: `${p.name} · served`, tone },
  ];
}

/** Top-down texture photo of one ingredient, used by the custom-batch builder. */
export function ingredientImage(id: string, name: string): ImageRef {
  return { id: `ingredient-${id}`, src: `/images/ingredients/${id}`, alt: name, label: name, tone: "sand" };
}
