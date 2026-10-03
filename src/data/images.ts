import manifest from "./image-manifest.json";

/**
 * Image slots. `src` is a path stem under /public without an extension; the
 * manifest (scripts/image-manifest.mjs) maps it to whichever file exists.
 * Missing files render as a neutral placeholder. The generation brief for
 * every slot lives in CODEX_IMAGES.md — keep ids and paths in sync with it.
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
  customise: {
    id: "home-customise",
    src: "/images/home/customise",
    alt: "Hands folding chopped nuts into a bowl of freshly roasted panjiri",
    label: "Mega menu · custom batch",
    tone: "clay",
  },
  story: {
    id: "home-story",
    src: "/images/home/story",
    alt: "A woman stirring a heavy kadhai on the stove in a sunlit home kitchen",
    label: "Home · our story teaser",
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
    alt: "Hands rolling dry-fruit laddus one at a time",
    label: "Our story · rolling",
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
  panjiri: "A bowl of golden panjiri with a brass spoon",
  pinni: "Hand-pressed pinni stacked on a ceramic plate",
  laddus: "Dry-fruit laddus arranged on a brass thali",
  mixes: "A glass jar of roasted nuts, seeds and dried fruit",
  "gift-boxes": "A wrapped gift box of homemade sweets tied with cotton string",
};

export function categoryImage(slug: string, name: string): ImageRef {
  return {
    id: `category-${slug}`,
    src: `/images/categories/${slug}`,
    alt: categoryAlt[slug] ?? name,
    label: `Category · ${name}`,
    tone: categoryTone[slug],
  };
}

/** Three shots per product: 1 packshot, 2 texture close-up, 3 served at home. */
export function productImages(p: { slug: string; name: string; category: string }): ImageRef[] {
  const tone = categoryTone[p.category];
  return [
    { id: `${p.slug}-1`, src: `/images/products/${p.slug}/1`, alt: `${p.name} in a glass jar`, label: `${p.name} · packshot`, tone },
    { id: `${p.slug}-2`, src: `/images/products/${p.slug}/2`, alt: `Close-up of ${p.name}`, label: `${p.name} · close-up`, tone },
    { id: `${p.slug}-3`, src: `/images/products/${p.slug}/3`, alt: `${p.name} served at home`, label: `${p.name} · served`, tone },
  ];
}

/** Cut-out style photo of a single ingredient, used by the batch builder tiles. */
export function ingredientImage(id: string, name: string): ImageRef {
  return { id: `ingredient-${id}`, src: `/images/ingredients/${id}`, alt: name, label: name, tone: "sand" };
}
