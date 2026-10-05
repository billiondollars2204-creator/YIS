# Image brief for Codex — Immunitywize (v4)

Every photograph the redesigned store needs: **55 images**. Each entry gives the exact path, prompt, size, background, crop guidance, where it appears, variants, alt text, and whether it replaces an earlier brief.

## Asset status — read this first

- **No photographs have been created yet.** Every image slot currently renders a placeholder. Product, category, story and hero slots show a soft studio-backdrop frame at the final size; ingredient slots show a grainy colour swatch in the ingredient's colour. Layout never shifts when a photo is added.
- The only image files in the repo are `public/favicon.svg` and `public/og-placeholder.svg` (temporary).
- The scroll-drawn kitchen illustration on the home page is code (SVG), not an image asset. It needs nothing from this file.

## How to deliver (Codex)

1. Work in order: **A → B → D → C → E**. The hero, packshots and ingredient textures matter most.
2. Generate at the largest supported size near the target ratio, **centre-crop to the exact ratio, then resize** to the listed size. Don't upscale more than 1.6×.
3. Save as JPEG (quality 82, sRGB) at the exact path. `.webp` or `.avif` with the same name also works. Create folders as needed.
4. **Don't edit code.** Images are found by path. Then run:
   ```bash
   pnpm images:manifest   # also runs automatically before dev/build
   pnpm build && pnpm start
   ```
   Check `/`, `/shop`, `/shop/classic-panjiri`, `/customise`, `/customise/classic-panjiri` (watch the mix composition) and `/our-story`.
5. Commit `public/images/**` together with the updated `src/data/image-manifest.json`.

## Photographic direction (applies to every image)

One shoot, one kitchen, one morning. The brand is a family kitchen with care and precision, so the photographs should feel **calm, warm, exact and real**, closer to a well-lit cookbook than a stock-photo spread.

- **Light:** Natural window light from the upper left, soft and directional, about 5500K; warm neutral palette of ivory, sand, ghee-gold, terracotta and brass; real Indian home-kitchen surfaces only (honed grey Kadappa stone, aged teak, unbleached hand-loom cotton, brass and matte stoneware); true-to-life colour, gentle contrast, soft shadows that keep detail; crisp focus on the food with a shallow, natural fall-off; photorealistic editorial food photography, as if shot on a full-frame camera with a 90 mm macro or 50 mm lens.
- **Avoid:** No text, letters, numbers, logos, labels or watermarks anywhere (jar bands stay blank). No cartoon, illustration, 3D render, CGI or plastic look. No oversaturation, HDR halos, heavy vignette, fake steam, smoke, floating ingredients, splashes, glitter or bokeh balls. No props that are not Indian home-kitchen objects. No people's faces. No extra fingers or distorted hands.
- **Series rules:** packshots share one jar, lid, band, backdrop, angle and scale; ingredient textures share one angle, light and piece scale; category tiles share one backdrop.
- **People:** hands only, or backs and soft profiles on the story page.
- **Honesty:** these are stand-ins for styling. Replace with photography of the real products, kitchen and family before launch, and don't treat them as a record of actual recipes or packaging.

## Obsolete requests from earlier briefs — do not generate

| Old id / path | Why |
|---|---|
| `public/images/home/story.jpg` (`home-story`) | Home story teaser removed; the kitchen illustration links to Our story instead. |
| `public/images/categories/gift-boxes.jpg` | Category is "coming soon" and not shown as a tile. Deferred. |
| v3 ingredient specs (heap on a sand backdrop) | Superseded: ingredient images must now be full-bleed textures (section D). Same paths, so regenerate. |
| v3 category specs at 4:5 | Superseded: category tiles are now **1:1**. |
| Any request for jars, bowls or drawn ingredients as illustrations | The redesign uses photography only; drawings were removed. |

## Where each image appears

| Page / component | Image ids |
|---|---|
| Home → hero | `home-hero` (≥700 px), `home-hero-mobile` (<700 px) |
| Product cards (home, shop, related), search, cart, cart drawer, `/customise` chooser | `<product>-1`; `<product>-2` on card hover |
| Product page gallery `/shop/<product>` | `<product>-1`, `-2`, `-3` |
| Home → Shop by category | `category-panjiri`, `category-pinni`, `category-laddus`, `category-mixes` |
| Custom-batch builder rows + mix composition; ingredient swatches site-wide | `ingredient-*` (22) |
| Home → Custom batches | `home-customise` |
| Our story | `story-hero`, `story-roasting`, `story-rolling`, `story-packing` |
| Social previews | `og` |

---

## A. Home hero (do first)

### 1. `home-hero` — Hero, desktop

| | |
|---|---|
| **Save to** | `public/images/home/hero.jpg` |
| **Size · ratio · format** | 2400 × 1100 px · 24:11 · JPEG q82, sRGB |
| **Background** | Full-bleed photograph, no transparency. |
| **Placement** | Home `/` → hero, the wide photo directly under the headline, CTAs and category chips (`src/app/page.tsx` → `HeroImage`). Shown from 700 px wide. The caption under it links the three products in the photo. |
| **Variants** | Desktop file. The phone version is `home-hero-mobile` (next entry). |
| **Alt text** | Describe what's in the frame: “Jars of Ghar ki Panjiri, Atta Pinni and Dry-Fruit Laddu on a stone kitchen counter in morning light” (already in code — update if the styling changes). |
| **Status** | **New slot** (re-introduced; the v3 design had no hero image). |

**Prompt:** Wide still life on a honed grey Kadappa stone counter: three clear glass jars with brass lids and blank kraft bands, left to right containing golden coarse panjiri, golden-brown hand-pressed pinni, and deep-brown dry-fruit laddus; in front of them a shallow brass bowl of panjiri with a brass spoon, two pinni on a small stoneware plate and three laddus on a folded unbleached cotton cloth; a few loose almonds and cardamom pods. Natural window light from the upper left, soft and directional, about 5500K; warm neutral palette of ivory, sand, ghee-gold, terracotta and brass; real Indian home-kitchen surfaces only (honed grey Kadappa stone, aged teak, unbleached hand-loom cotton, brass and matte stoneware); true-to-life colour, gentle contrast, soft shadows that keep detail; crisp focus on the food with a shallow, natural fall-off; photorealistic editorial food photography, as if shot on a full-frame camera with a 90 mm macro or 50 mm lens. No text, letters, numbers, logos, labels or watermarks anywhere (jar bands stay blank). No cartoon, illustration, 3D render, CGI or plastic look. No oversaturation, HDR halos, heavy vignette, fake steam, smoke, floating ingredients, splashes, glitter or bokeh balls. No props that are not Indian home-kitchen objects. No people's faces. No extra fingers or distorted hands.

**Composition, lighting & crop:** Eye-level to 15° above, centred group occupying the middle 60% of the width so the 4:5 phone crop can be taken from the same scene. Keep 15% clear counter at left and right and a calm, slightly out-of-focus wall above. Light rakes from the left to show crumb texture. No hands.

### 2. `home-hero-mobile` — Hero, mobile

| | |
|---|---|
| **Save to** | `public/images/home/hero-mobile.jpg` |
| **Size · ratio · format** | 1200 × 1500 px · 4:5 · JPEG q82, sRGB |
| **Background** | Full-bleed photograph. |
| **Placement** | Same position as `home-hero`, used below 700 px wide via `<picture>`. |
| **Variants** | Phone crop of the hero scene. |
| **Alt text** | Same as home-hero. |
| **Status** | **New slot.** |

**Prompt:** Same scene, styling and light as home-hero, recomposed vertically: the three jars in a tight row in the upper-middle, the brass bowl of panjiri and plate of pinni in the foreground. Natural window light from the upper left, soft and directional, about 5500K; warm neutral palette of ivory, sand, ghee-gold, terracotta and brass; real Indian home-kitchen surfaces only (honed grey Kadappa stone, aged teak, unbleached hand-loom cotton, brass and matte stoneware); true-to-life colour, gentle contrast, soft shadows that keep detail; crisp focus on the food with a shallow, natural fall-off; photorealistic editorial food photography, as if shot on a full-frame camera with a 90 mm macro or 50 mm lens. No text, letters, numbers, logos, labels or watermarks anywhere (jar bands stay blank). No cartoon, illustration, 3D render, CGI or plastic look. No oversaturation, HDR halos, heavy vignette, fake steam, smoke, floating ingredients, splashes, glitter or bokeh balls. No props that are not Indian home-kitchen objects. No people's faces. No extra fingers or distorted hands.

**Composition, lighting & crop:** Recompose rather than crop the wide image: jars fill ~70% of the width, top of the lids ~20% from the top edge. Must look like the same shoot as the desktop file.

## B. Product photography (21 images, 3 per product)

### 3. `classic-panjiri-1` — Ghar ki Panjiri — packshot

| | |
|---|---|
| **Save to** | `public/images/products/classic-panjiri/1.jpg` |
| **Size · ratio · format** | 1200 × 1500 px · 4:5 · JPEG q82, sRGB |
| **Background** | Seamless warm sand paper sweep (#EFE7DA), no transparency. |
| **Placement** | Main product image: product cards (home Bestsellers, `/shop`, “You may also like”), search results, cart drawer and cart thumbnails, and image 1 of the gallery on `/shop/classic-panjiri`. Customisable products also show this image on the Custom batches chooser (`/customise`). |
| **Variants** | One file serves desktop and mobile (cards crop nothing at 4:5). |
| **Alt text** | Alt: “Ghar ki Panjiri in a glass jar” (in code). |
| **Status** | Replaces the v3 brief (same path; prompt updated). |

**Prompt:** Studio packshot of a clear cylindrical glass jar with a brushed brass screw lid and a plain blank kraft-paper band, filled with coarse golden-brown roasted wholewheat crumble with visible slivers of almond and cashew and a few raisins; a small spill of the product in front of the jar. Natural window light from the upper left, soft and directional, about 5500K; warm neutral palette of ivory, sand, ghee-gold, terracotta and brass; real Indian home-kitchen surfaces only (honed grey Kadappa stone, aged teak, unbleached hand-loom cotton, brass and matte stoneware); true-to-life colour, gentle contrast, soft shadows that keep detail; crisp focus on the food with a shallow, natural fall-off; photorealistic editorial food photography, as if shot on a full-frame camera with a 90 mm macro or 50 mm lens. No text, letters, numbers, logos, labels or watermarks anywhere (jar bands stay blank). No cartoon, illustration, 3D render, CGI or plastic look. No oversaturation, HDR halos, heavy vignette, fake steam, smoke, floating ingredients, splashes, glitter or bokeh balls. No props that are not Indian home-kitchen objects. No people's faces. No extra fingers or distorted hands.

**Composition, lighting & crop:** Straight-on, camera at jar mid-height, jar centred and ~62% of the frame height, base ~18% from the bottom edge. Soft key light from upper left, white bounce right, soft contact shadow. **Identical jar, angle, backdrop, light and scale across all seven products.** Keep the top-left 25% calm: badges overlay there.

### 4. `classic-panjiri-2` — Ghar ki Panjiri — texture

| | |
|---|---|
| **Save to** | `public/images/products/classic-panjiri/2.jpg` |
| **Size · ratio · format** | 1200 × 1500 px · 4:5 · JPEG q82, sRGB |
| **Background** | Full-bleed photograph. |
| **Placement** | Product-card **hover** image (desktop pointer only) and gallery image 2 on `/shop/classic-panjiri`. |
| **Variants** | Single file. |
| **Alt text** | Alt: “Close-up of Ghar ki Panjiri” (in code). |
| **Status** | Replaces the v3 brief. |

**Prompt:** Top-down macro of coarse golden-brown roasted wholewheat crumble with visible slivers of almond and cashew and a few raisins heaped in a small matte stoneware or brass katori on hand-loom cotton. Natural window light from the upper left, soft and directional, about 5500K; warm neutral palette of ivory, sand, ghee-gold, terracotta and brass; real Indian home-kitchen surfaces only (honed grey Kadappa stone, aged teak, unbleached hand-loom cotton, brass and matte stoneware); true-to-life colour, gentle contrast, soft shadows that keep detail; crisp focus on the food with a shallow, natural fall-off; photorealistic editorial food photography, as if shot on a full-frame camera with a 90 mm macro or 50 mm lens. No text, letters, numbers, logos, labels or watermarks anywhere (jar bands stay blank). No cartoon, illustration, 3D render, CGI or plastic look. No oversaturation, HDR halos, heavy vignette, fake steam, smoke, floating ingredients, splashes, glitter or bokeh balls. No props that are not Indian home-kitchen objects. No people's faces. No extra fingers or distorted hands.

**Composition, lighting & crop:** Overhead, katori fills ~80% of the frame, crisp texture front to back, shadows soft. Colour must match the packshot exactly.

### 5. `classic-panjiri-3` — Ghar ki Panjiri — served

| | |
|---|---|
| **Save to** | `public/images/products/classic-panjiri/3.jpg` |
| **Size · ratio · format** | 1200 × 1500 px · 4:5 · JPEG q82, sRGB |
| **Background** | Full-bleed photograph. |
| **Placement** | Gallery image 3 on `/shop/classic-panjiri`. |
| **Variants** | Single file. |
| **Alt text** | Alt: “Ghar ki Panjiri served with chai” (in code). |
| **Status** | Replaces the v3 brief. |

**Prompt:** Coarse golden-brown roasted wholewheat crumble with visible slivers of almond and cashew and a few raisins served in a small stoneware bowl on an aged teak table beside a steel tumbler of masala chai on a brass saucer; one hand enters from the right edge holding a spoon (no face, no jewellery). Natural window light from the upper left, soft and directional, about 5500K; warm neutral palette of ivory, sand, ghee-gold, terracotta and brass; real Indian home-kitchen surfaces only (honed grey Kadappa stone, aged teak, unbleached hand-loom cotton, brass and matte stoneware); true-to-life colour, gentle contrast, soft shadows that keep detail; crisp focus on the food with a shallow, natural fall-off; photorealistic editorial food photography, as if shot on a full-frame camera with a 90 mm macro or 50 mm lens. No text, letters, numbers, logos, labels or watermarks anywhere (jar bands stay blank). No cartoon, illustration, 3D render, CGI or plastic look. No oversaturation, HDR halos, heavy vignette, fake steam, smoke, floating ingredients, splashes, glitter or bokeh balls. No props that are not Indian home-kitchen objects. No people's faces. No extra fingers or distorted hands.

**Composition, lighting & crop:** 45° angle, bowl on the left third, tumbler right, generous negative space at top. Warm morning light.

### 6. `mothers-panjiri-1` — Panjiri for New Mothers — packshot

| | |
|---|---|
| **Save to** | `public/images/products/mothers-panjiri/1.jpg` |
| **Size · ratio · format** | 1200 × 1500 px · 4:5 · JPEG q82, sRGB |
| **Background** | Seamless warm sand paper sweep (#EFE7DA), no transparency. |
| **Placement** | Main product image: product cards (home Bestsellers, `/shop`, “You may also like”), search results, cart drawer and cart thumbnails, and image 1 of the gallery on `/shop/mothers-panjiri`. Customisable products also show this image on the Custom batches chooser (`/customise`). |
| **Variants** | One file serves desktop and mobile (cards crop nothing at 4:5). |
| **Alt text** | Alt: “Panjiri for New Mothers in a glass jar” (in code). |
| **Status** | Replaces the v3 brief (same path; prompt updated). |

**Prompt:** Studio packshot of a clear cylindrical glass jar with a brushed brass screw lid and a plain blank kraft-paper band, filled with a richer, darker roasted crumble flecked with chopped almond, walnut, melon seeds and puffed edible gum; a small spill of the product in front of the jar. Natural window light from the upper left, soft and directional, about 5500K; warm neutral palette of ivory, sand, ghee-gold, terracotta and brass; real Indian home-kitchen surfaces only (honed grey Kadappa stone, aged teak, unbleached hand-loom cotton, brass and matte stoneware); true-to-life colour, gentle contrast, soft shadows that keep detail; crisp focus on the food with a shallow, natural fall-off; photorealistic editorial food photography, as if shot on a full-frame camera with a 90 mm macro or 50 mm lens. No text, letters, numbers, logos, labels or watermarks anywhere (jar bands stay blank). No cartoon, illustration, 3D render, CGI or plastic look. No oversaturation, HDR halos, heavy vignette, fake steam, smoke, floating ingredients, splashes, glitter or bokeh balls. No props that are not Indian home-kitchen objects. No people's faces. No extra fingers or distorted hands.

**Composition, lighting & crop:** Straight-on, camera at jar mid-height, jar centred and ~62% of the frame height, base ~18% from the bottom edge. Soft key light from upper left, white bounce right, soft contact shadow. **Identical jar, angle, backdrop, light and scale across all seven products.** Keep the top-left 25% calm: badges overlay there.

### 7. `mothers-panjiri-2` — Panjiri for New Mothers — texture

| | |
|---|---|
| **Save to** | `public/images/products/mothers-panjiri/2.jpg` |
| **Size · ratio · format** | 1200 × 1500 px · 4:5 · JPEG q82, sRGB |
| **Background** | Full-bleed photograph. |
| **Placement** | Product-card **hover** image (desktop pointer only) and gallery image 2 on `/shop/mothers-panjiri`. |
| **Variants** | Single file. |
| **Alt text** | Alt: “Close-up of Panjiri for New Mothers” (in code). |
| **Status** | Replaces the v3 brief. |

**Prompt:** Top-down macro of a richer, darker roasted crumble flecked with chopped almond, walnut, melon seeds and puffed edible gum heaped in a small matte stoneware or brass katori on hand-loom cotton. Natural window light from the upper left, soft and directional, about 5500K; warm neutral palette of ivory, sand, ghee-gold, terracotta and brass; real Indian home-kitchen surfaces only (honed grey Kadappa stone, aged teak, unbleached hand-loom cotton, brass and matte stoneware); true-to-life colour, gentle contrast, soft shadows that keep detail; crisp focus on the food with a shallow, natural fall-off; photorealistic editorial food photography, as if shot on a full-frame camera with a 90 mm macro or 50 mm lens. No text, letters, numbers, logos, labels or watermarks anywhere (jar bands stay blank). No cartoon, illustration, 3D render, CGI or plastic look. No oversaturation, HDR halos, heavy vignette, fake steam, smoke, floating ingredients, splashes, glitter or bokeh balls. No props that are not Indian home-kitchen objects. No people's faces. No extra fingers or distorted hands.

**Composition, lighting & crop:** Overhead, katori fills ~80% of the frame, crisp texture front to back, shadows soft. Colour must match the packshot exactly.

### 8. `mothers-panjiri-3` — Panjiri for New Mothers — served

| | |
|---|---|
| **Save to** | `public/images/products/mothers-panjiri/3.jpg` |
| **Size · ratio · format** | 1200 × 1500 px · 4:5 · JPEG q82, sRGB |
| **Background** | Full-bleed photograph. |
| **Placement** | Gallery image 3 on `/shop/mothers-panjiri`. |
| **Variants** | Single file. |
| **Alt text** | Alt: “Panjiri for New Mothers served with chai” (in code). |
| **Status** | Replaces the v3 brief. |

**Prompt:** A richer, darker roasted crumble flecked with chopped almond, walnut, melon seeds and puffed edible gum served in a small stoneware bowl on an aged teak table beside a steel tumbler of masala chai on a brass saucer; one hand enters from the right edge holding a spoon (no face, no jewellery). Natural window light from the upper left, soft and directional, about 5500K; warm neutral palette of ivory, sand, ghee-gold, terracotta and brass; real Indian home-kitchen surfaces only (honed grey Kadappa stone, aged teak, unbleached hand-loom cotton, brass and matte stoneware); true-to-life colour, gentle contrast, soft shadows that keep detail; crisp focus on the food with a shallow, natural fall-off; photorealistic editorial food photography, as if shot on a full-frame camera with a 90 mm macro or 50 mm lens. No text, letters, numbers, logos, labels or watermarks anywhere (jar bands stay blank). No cartoon, illustration, 3D render, CGI or plastic look. No oversaturation, HDR halos, heavy vignette, fake steam, smoke, floating ingredients, splashes, glitter or bokeh balls. No props that are not Indian home-kitchen objects. No people's faces. No extra fingers or distorted hands.

**Composition, lighting & crop:** 45° angle, bowl on the left third, tumbler right, generous negative space at top. Warm morning light.

### 9. `atta-pinni-1` — Atta Pinni — packshot

| | |
|---|---|
| **Save to** | `public/images/products/atta-pinni/1.jpg` |
| **Size · ratio · format** | 1200 × 1500 px · 4:5 · JPEG q82, sRGB |
| **Background** | Seamless warm sand paper sweep (#EFE7DA), no transparency. |
| **Placement** | Main product image: product cards (home Bestsellers, `/shop`, “You may also like”), search results, cart drawer and cart thumbnails, and image 1 of the gallery on `/shop/atta-pinni`. Customisable products also show this image on the Custom batches chooser (`/customise`). |
| **Variants** | One file serves desktop and mobile (cards crop nothing at 4:5). |
| **Alt text** | Alt: “Atta Pinni in a glass jar” (in code). |
| **Status** | Replaces the v3 brief (same path; prompt updated). |

**Prompt:** Studio packshot of a clear cylindrical glass jar with a brushed brass screw lid and a plain blank kraft-paper band, filled with dense round hand-pressed pinni, golden brown and slightly crumbly, with soft finger-press marks and almond slivers on top; a small spill of the product in front of the jar. Natural window light from the upper left, soft and directional, about 5500K; warm neutral palette of ivory, sand, ghee-gold, terracotta and brass; real Indian home-kitchen surfaces only (honed grey Kadappa stone, aged teak, unbleached hand-loom cotton, brass and matte stoneware); true-to-life colour, gentle contrast, soft shadows that keep detail; crisp focus on the food with a shallow, natural fall-off; photorealistic editorial food photography, as if shot on a full-frame camera with a 90 mm macro or 50 mm lens. No text, letters, numbers, logos, labels or watermarks anywhere (jar bands stay blank). No cartoon, illustration, 3D render, CGI or plastic look. No oversaturation, HDR halos, heavy vignette, fake steam, smoke, floating ingredients, splashes, glitter or bokeh balls. No props that are not Indian home-kitchen objects. No people's faces. No extra fingers or distorted hands.

**Composition, lighting & crop:** Straight-on, camera at jar mid-height, jar centred and ~62% of the frame height, base ~18% from the bottom edge. Soft key light from upper left, white bounce right, soft contact shadow. **Identical jar, angle, backdrop, light and scale across all seven products.** Keep the top-left 25% calm: badges overlay there.

### 10. `atta-pinni-2` — Atta Pinni — texture

| | |
|---|---|
| **Save to** | `public/images/products/atta-pinni/2.jpg` |
| **Size · ratio · format** | 1200 × 1500 px · 4:5 · JPEG q82, sRGB |
| **Background** | Full-bleed photograph. |
| **Placement** | Product-card **hover** image (desktop pointer only) and gallery image 2 on `/shop/atta-pinni`. |
| **Variants** | Single file. |
| **Alt text** | Alt: “Close-up of Atta Pinni” (in code). |
| **Status** | Replaces the v3 brief. |

**Prompt:** Top-down macro of dense round hand-pressed pinni, golden brown and slightly crumbly, with soft finger-press marks and almond slivers on top heaped in a small matte stoneware or brass katori on hand-loom cotton. Natural window light from the upper left, soft and directional, about 5500K; warm neutral palette of ivory, sand, ghee-gold, terracotta and brass; real Indian home-kitchen surfaces only (honed grey Kadappa stone, aged teak, unbleached hand-loom cotton, brass and matte stoneware); true-to-life colour, gentle contrast, soft shadows that keep detail; crisp focus on the food with a shallow, natural fall-off; photorealistic editorial food photography, as if shot on a full-frame camera with a 90 mm macro or 50 mm lens. No text, letters, numbers, logos, labels or watermarks anywhere (jar bands stay blank). No cartoon, illustration, 3D render, CGI or plastic look. No oversaturation, HDR halos, heavy vignette, fake steam, smoke, floating ingredients, splashes, glitter or bokeh balls. No props that are not Indian home-kitchen objects. No people's faces. No extra fingers or distorted hands.

**Composition, lighting & crop:** Overhead, katori fills ~80% of the frame, crisp texture front to back, shadows soft. Colour must match the packshot exactly.

### 11. `atta-pinni-3` — Atta Pinni — served

| | |
|---|---|
| **Save to** | `public/images/products/atta-pinni/3.jpg` |
| **Size · ratio · format** | 1200 × 1500 px · 4:5 · JPEG q82, sRGB |
| **Background** | Full-bleed photograph. |
| **Placement** | Gallery image 3 on `/shop/atta-pinni`. |
| **Variants** | Single file. |
| **Alt text** | Alt: “Atta Pinni served with chai” (in code). |
| **Status** | Replaces the v3 brief. |

**Prompt:** Dense round hand-pressed pinni, golden brown and slightly crumbly, with soft finger-press marks and almond slivers on top served in a small stoneware bowl on an aged teak table beside a steel tumbler of masala chai on a brass saucer; one hand enters from the right edge holding a spoon (no face, no jewellery). Natural window light from the upper left, soft and directional, about 5500K; warm neutral palette of ivory, sand, ghee-gold, terracotta and brass; real Indian home-kitchen surfaces only (honed grey Kadappa stone, aged teak, unbleached hand-loom cotton, brass and matte stoneware); true-to-life colour, gentle contrast, soft shadows that keep detail; crisp focus on the food with a shallow, natural fall-off; photorealistic editorial food photography, as if shot on a full-frame camera with a 90 mm macro or 50 mm lens. No text, letters, numbers, logos, labels or watermarks anywhere (jar bands stay blank). No cartoon, illustration, 3D render, CGI or plastic look. No oversaturation, HDR halos, heavy vignette, fake steam, smoke, floating ingredients, splashes, glitter or bokeh balls. No props that are not Indian home-kitchen objects. No people's faces. No extra fingers or distorted hands.

**Composition, lighting & crop:** 45° angle, bowl on the left third, tumbler right, generous negative space at top. Warm morning light.

### 12. `dry-fruit-laddu-1` — Dry-Fruit Laddu — packshot

| | |
|---|---|
| **Save to** | `public/images/products/dry-fruit-laddu/1.jpg` |
| **Size · ratio · format** | 1200 × 1500 px · 4:5 · JPEG q82, sRGB |
| **Background** | Seamless warm sand paper sweep (#EFE7DA), no transparency. |
| **Placement** | Main product image: product cards (home Bestsellers, `/shop`, “You may also like”), search results, cart drawer and cart thumbnails, and image 1 of the gallery on `/shop/dry-fruit-laddu`. |
| **Variants** | One file serves desktop and mobile (cards crop nothing at 4:5). |
| **Alt text** | Alt: “Dry-Fruit Laddu in a glass jar” (in code). |
| **Status** | Replaces the v3 brief (same path; prompt updated). |

**Prompt:** Studio packshot of a clear cylindrical glass jar with a brushed brass screw lid and a plain blank kraft-paper band, filled with deep brown glossy laddus of finely chopped dates studded with pistachio and almond; a small spill of the product in front of the jar. Natural window light from the upper left, soft and directional, about 5500K; warm neutral palette of ivory, sand, ghee-gold, terracotta and brass; real Indian home-kitchen surfaces only (honed grey Kadappa stone, aged teak, unbleached hand-loom cotton, brass and matte stoneware); true-to-life colour, gentle contrast, soft shadows that keep detail; crisp focus on the food with a shallow, natural fall-off; photorealistic editorial food photography, as if shot on a full-frame camera with a 90 mm macro or 50 mm lens. No text, letters, numbers, logos, labels or watermarks anywhere (jar bands stay blank). No cartoon, illustration, 3D render, CGI or plastic look. No oversaturation, HDR halos, heavy vignette, fake steam, smoke, floating ingredients, splashes, glitter or bokeh balls. No props that are not Indian home-kitchen objects. No people's faces. No extra fingers or distorted hands.

**Composition, lighting & crop:** Straight-on, camera at jar mid-height, jar centred and ~62% of the frame height, base ~18% from the bottom edge. Soft key light from upper left, white bounce right, soft contact shadow. **Identical jar, angle, backdrop, light and scale across all seven products.** Keep the top-left 25% calm: badges overlay there.

### 13. `dry-fruit-laddu-2` — Dry-Fruit Laddu — texture

| | |
|---|---|
| **Save to** | `public/images/products/dry-fruit-laddu/2.jpg` |
| **Size · ratio · format** | 1200 × 1500 px · 4:5 · JPEG q82, sRGB |
| **Background** | Full-bleed photograph. |
| **Placement** | Product-card **hover** image (desktop pointer only) and gallery image 2 on `/shop/dry-fruit-laddu`. |
| **Variants** | Single file. |
| **Alt text** | Alt: “Close-up of Dry-Fruit Laddu” (in code). |
| **Status** | Replaces the v3 brief. |

**Prompt:** Top-down macro of deep brown glossy laddus of finely chopped dates studded with pistachio and almond heaped in a small matte stoneware or brass katori on hand-loom cotton. Natural window light from the upper left, soft and directional, about 5500K; warm neutral palette of ivory, sand, ghee-gold, terracotta and brass; real Indian home-kitchen surfaces only (honed grey Kadappa stone, aged teak, unbleached hand-loom cotton, brass and matte stoneware); true-to-life colour, gentle contrast, soft shadows that keep detail; crisp focus on the food with a shallow, natural fall-off; photorealistic editorial food photography, as if shot on a full-frame camera with a 90 mm macro or 50 mm lens. No text, letters, numbers, logos, labels or watermarks anywhere (jar bands stay blank). No cartoon, illustration, 3D render, CGI or plastic look. No oversaturation, HDR halos, heavy vignette, fake steam, smoke, floating ingredients, splashes, glitter or bokeh balls. No props that are not Indian home-kitchen objects. No people's faces. No extra fingers or distorted hands.

**Composition, lighting & crop:** Overhead, katori fills ~80% of the frame, crisp texture front to back, shadows soft. Colour must match the packshot exactly.

### 14. `dry-fruit-laddu-3` — Dry-Fruit Laddu — served

| | |
|---|---|
| **Save to** | `public/images/products/dry-fruit-laddu/3.jpg` |
| **Size · ratio · format** | 1200 × 1500 px · 4:5 · JPEG q82, sRGB |
| **Background** | Full-bleed photograph. |
| **Placement** | Gallery image 3 on `/shop/dry-fruit-laddu`. |
| **Variants** | Single file. |
| **Alt text** | Alt: “Dry-Fruit Laddu served with chai” (in code). |
| **Status** | Replaces the v3 brief. |

**Prompt:** Deep brown glossy laddus of finely chopped dates studded with pistachio and almond served in a small stoneware bowl on an aged teak table beside a steel tumbler of masala chai on a brass saucer; one hand enters from the right edge holding a spoon (no face, no jewellery). Natural window light from the upper left, soft and directional, about 5500K; warm neutral palette of ivory, sand, ghee-gold, terracotta and brass; real Indian home-kitchen surfaces only (honed grey Kadappa stone, aged teak, unbleached hand-loom cotton, brass and matte stoneware); true-to-life colour, gentle contrast, soft shadows that keep detail; crisp focus on the food with a shallow, natural fall-off; photorealistic editorial food photography, as if shot on a full-frame camera with a 90 mm macro or 50 mm lens. No text, letters, numbers, logos, labels or watermarks anywhere (jar bands stay blank). No cartoon, illustration, 3D render, CGI or plastic look. No oversaturation, HDR halos, heavy vignette, fake steam, smoke, floating ingredients, splashes, glitter or bokeh balls. No props that are not Indian home-kitchen objects. No people's faces. No extra fingers or distorted hands.

**Composition, lighting & crop:** 45° angle, bowl on the left third, tumbler right, generous negative space at top. Warm morning light.

### 15. `seasonal-laddu-1` — Seasonal Laddu — packshot

| | |
|---|---|
| **Save to** | `public/images/products/seasonal-laddu/1.jpg` |
| **Size · ratio · format** | 1200 × 1500 px · 4:5 · JPEG q82, sRGB |
| **Background** | Seamless warm sand paper sweep (#EFE7DA), no transparency. |
| **Placement** | Main product image: product cards (home Bestsellers, `/shop`, “You may also like”), search results, cart drawer and cart thumbnails, and image 1 of the gallery on `/shop/seasonal-laddu`. |
| **Variants** | One file serves desktop and mobile (cards crop nothing at 4:5). |
| **Alt text** | Alt: “Seasonal Laddu in a glass jar” (in code). |
| **Status** | Replaces the v3 brief (same path; prompt updated). |

**Prompt:** Studio packshot of a clear cylindrical glass jar with a brushed brass screw lid and a plain blank kraft-paper band, filled with pale golden laddus coated in fine desiccated coconut, flecked with chopped nuts; a small spill of the product in front of the jar. Natural window light from the upper left, soft and directional, about 5500K; warm neutral palette of ivory, sand, ghee-gold, terracotta and brass; real Indian home-kitchen surfaces only (honed grey Kadappa stone, aged teak, unbleached hand-loom cotton, brass and matte stoneware); true-to-life colour, gentle contrast, soft shadows that keep detail; crisp focus on the food with a shallow, natural fall-off; photorealistic editorial food photography, as if shot on a full-frame camera with a 90 mm macro or 50 mm lens. No text, letters, numbers, logos, labels or watermarks anywhere (jar bands stay blank). No cartoon, illustration, 3D render, CGI or plastic look. No oversaturation, HDR halos, heavy vignette, fake steam, smoke, floating ingredients, splashes, glitter or bokeh balls. No props that are not Indian home-kitchen objects. No people's faces. No extra fingers or distorted hands.

**Composition, lighting & crop:** Straight-on, camera at jar mid-height, jar centred and ~62% of the frame height, base ~18% from the bottom edge. Soft key light from upper left, white bounce right, soft contact shadow. **Identical jar, angle, backdrop, light and scale across all seven products.** Keep the top-left 25% calm: badges overlay there.

### 16. `seasonal-laddu-2` — Seasonal Laddu — texture

| | |
|---|---|
| **Save to** | `public/images/products/seasonal-laddu/2.jpg` |
| **Size · ratio · format** | 1200 × 1500 px · 4:5 · JPEG q82, sRGB |
| **Background** | Full-bleed photograph. |
| **Placement** | Product-card **hover** image (desktop pointer only) and gallery image 2 on `/shop/seasonal-laddu`. |
| **Variants** | Single file. |
| **Alt text** | Alt: “Close-up of Seasonal Laddu” (in code). |
| **Status** | Replaces the v3 brief. |

**Prompt:** Top-down macro of pale golden laddus coated in fine desiccated coconut, flecked with chopped nuts heaped in a small matte stoneware or brass katori on hand-loom cotton. Natural window light from the upper left, soft and directional, about 5500K; warm neutral palette of ivory, sand, ghee-gold, terracotta and brass; real Indian home-kitchen surfaces only (honed grey Kadappa stone, aged teak, unbleached hand-loom cotton, brass and matte stoneware); true-to-life colour, gentle contrast, soft shadows that keep detail; crisp focus on the food with a shallow, natural fall-off; photorealistic editorial food photography, as if shot on a full-frame camera with a 90 mm macro or 50 mm lens. No text, letters, numbers, logos, labels or watermarks anywhere (jar bands stay blank). No cartoon, illustration, 3D render, CGI or plastic look. No oversaturation, HDR halos, heavy vignette, fake steam, smoke, floating ingredients, splashes, glitter or bokeh balls. No props that are not Indian home-kitchen objects. No people's faces. No extra fingers or distorted hands.

**Composition, lighting & crop:** Overhead, katori fills ~80% of the frame, crisp texture front to back, shadows soft. Colour must match the packshot exactly.

### 17. `seasonal-laddu-3` — Seasonal Laddu — served

| | |
|---|---|
| **Save to** | `public/images/products/seasonal-laddu/3.jpg` |
| **Size · ratio · format** | 1200 × 1500 px · 4:5 · JPEG q82, sRGB |
| **Background** | Full-bleed photograph. |
| **Placement** | Gallery image 3 on `/shop/seasonal-laddu`. |
| **Variants** | Single file. |
| **Alt text** | Alt: “Seasonal Laddu served with chai” (in code). |
| **Status** | Replaces the v3 brief. |

**Prompt:** Pale golden laddus coated in fine desiccated coconut, flecked with chopped nuts served in a small stoneware bowl on an aged teak table beside a steel tumbler of masala chai on a brass saucer; one hand enters from the right edge holding a spoon (no face, no jewellery). Natural window light from the upper left, soft and directional, about 5500K; warm neutral palette of ivory, sand, ghee-gold, terracotta and brass; real Indian home-kitchen surfaces only (honed grey Kadappa stone, aged teak, unbleached hand-loom cotton, brass and matte stoneware); true-to-life colour, gentle contrast, soft shadows that keep detail; crisp focus on the food with a shallow, natural fall-off; photorealistic editorial food photography, as if shot on a full-frame camera with a 90 mm macro or 50 mm lens. No text, letters, numbers, logos, labels or watermarks anywhere (jar bands stay blank). No cartoon, illustration, 3D render, CGI or plastic look. No oversaturation, HDR halos, heavy vignette, fake steam, smoke, floating ingredients, splashes, glitter or bokeh balls. No props that are not Indian home-kitchen objects. No people's faces. No extra fingers or distorted hands.

**Composition, lighting & crop:** 45° angle, bowl on the left third, tumbler right, generous negative space at top. Warm morning light.

### 18. `everyday-mix-1` — Everyday Mewa Mix — packshot

| | |
|---|---|
| **Save to** | `public/images/products/everyday-mix/1.jpg` |
| **Size · ratio · format** | 1200 × 1500 px · 4:5 · JPEG q82, sRGB |
| **Background** | Seamless warm sand paper sweep (#EFE7DA), no transparency. |
| **Placement** | Main product image: product cards (home Bestsellers, `/shop`, “You may also like”), search results, cart drawer and cart thumbnails, and image 1 of the gallery on `/shop/everyday-mix`. Customisable products also show this image on the Custom batches chooser (`/customise`). |
| **Variants** | One file serves desktop and mobile (cards crop nothing at 4:5). |
| **Alt text** | Alt: “Everyday Mewa Mix in a glass jar” (in code). |
| **Status** | Replaces the v3 brief (same path; prompt updated). |

**Prompt:** Studio packshot of a clear cylindrical glass jar with a brushed brass screw lid and a plain blank kraft-paper band, filled with lightly roasted whole almonds and cashews with golden raisins and green pumpkin seeds; a small spill of the product in front of the jar. Natural window light from the upper left, soft and directional, about 5500K; warm neutral palette of ivory, sand, ghee-gold, terracotta and brass; real Indian home-kitchen surfaces only (honed grey Kadappa stone, aged teak, unbleached hand-loom cotton, brass and matte stoneware); true-to-life colour, gentle contrast, soft shadows that keep detail; crisp focus on the food with a shallow, natural fall-off; photorealistic editorial food photography, as if shot on a full-frame camera with a 90 mm macro or 50 mm lens. No text, letters, numbers, logos, labels or watermarks anywhere (jar bands stay blank). No cartoon, illustration, 3D render, CGI or plastic look. No oversaturation, HDR halos, heavy vignette, fake steam, smoke, floating ingredients, splashes, glitter or bokeh balls. No props that are not Indian home-kitchen objects. No people's faces. No extra fingers or distorted hands.

**Composition, lighting & crop:** Straight-on, camera at jar mid-height, jar centred and ~62% of the frame height, base ~18% from the bottom edge. Soft key light from upper left, white bounce right, soft contact shadow. **Identical jar, angle, backdrop, light and scale across all seven products.** Keep the top-left 25% calm: badges overlay there.

### 19. `everyday-mix-2` — Everyday Mewa Mix — texture

| | |
|---|---|
| **Save to** | `public/images/products/everyday-mix/2.jpg` |
| **Size · ratio · format** | 1200 × 1500 px · 4:5 · JPEG q82, sRGB |
| **Background** | Full-bleed photograph. |
| **Placement** | Product-card **hover** image (desktop pointer only) and gallery image 2 on `/shop/everyday-mix`. |
| **Variants** | Single file. |
| **Alt text** | Alt: “Close-up of Everyday Mewa Mix” (in code). |
| **Status** | Replaces the v3 brief. |

**Prompt:** Top-down macro of lightly roasted whole almonds and cashews with golden raisins and green pumpkin seeds heaped in a small matte stoneware or brass katori on hand-loom cotton. Natural window light from the upper left, soft and directional, about 5500K; warm neutral palette of ivory, sand, ghee-gold, terracotta and brass; real Indian home-kitchen surfaces only (honed grey Kadappa stone, aged teak, unbleached hand-loom cotton, brass and matte stoneware); true-to-life colour, gentle contrast, soft shadows that keep detail; crisp focus on the food with a shallow, natural fall-off; photorealistic editorial food photography, as if shot on a full-frame camera with a 90 mm macro or 50 mm lens. No text, letters, numbers, logos, labels or watermarks anywhere (jar bands stay blank). No cartoon, illustration, 3D render, CGI or plastic look. No oversaturation, HDR halos, heavy vignette, fake steam, smoke, floating ingredients, splashes, glitter or bokeh balls. No props that are not Indian home-kitchen objects. No people's faces. No extra fingers or distorted hands.

**Composition, lighting & crop:** Overhead, katori fills ~80% of the frame, crisp texture front to back, shadows soft. Colour must match the packshot exactly.

### 20. `everyday-mix-3` — Everyday Mewa Mix — served

| | |
|---|---|
| **Save to** | `public/images/products/everyday-mix/3.jpg` |
| **Size · ratio · format** | 1200 × 1500 px · 4:5 · JPEG q82, sRGB |
| **Background** | Full-bleed photograph. |
| **Placement** | Gallery image 3 on `/shop/everyday-mix`. |
| **Variants** | Single file. |
| **Alt text** | Alt: “Everyday Mewa Mix served with chai” (in code). |
| **Status** | Replaces the v3 brief. |

**Prompt:** Lightly roasted whole almonds and cashews with golden raisins and green pumpkin seeds served in a small stoneware bowl on an aged teak table beside a steel tumbler of masala chai on a brass saucer; one hand enters from the right edge holding a spoon (no face, no jewellery). Natural window light from the upper left, soft and directional, about 5500K; warm neutral palette of ivory, sand, ghee-gold, terracotta and brass; real Indian home-kitchen surfaces only (honed grey Kadappa stone, aged teak, unbleached hand-loom cotton, brass and matte stoneware); true-to-life colour, gentle contrast, soft shadows that keep detail; crisp focus on the food with a shallow, natural fall-off; photorealistic editorial food photography, as if shot on a full-frame camera with a 90 mm macro or 50 mm lens. No text, letters, numbers, logos, labels or watermarks anywhere (jar bands stay blank). No cartoon, illustration, 3D render, CGI or plastic look. No oversaturation, HDR halos, heavy vignette, fake steam, smoke, floating ingredients, splashes, glitter or bokeh balls. No props that are not Indian home-kitchen objects. No people's faces. No extra fingers or distorted hands.

**Composition, lighting & crop:** 45° angle, bowl on the left third, tumbler right, generous negative space at top. Warm morning light.

### 21. `study-table-mix-1` — Study-Table Mix — packshot

| | |
|---|---|
| **Save to** | `public/images/products/study-table-mix/1.jpg` |
| **Size · ratio · format** | 1200 × 1500 px · 4:5 · JPEG q82, sRGB |
| **Background** | Seamless warm sand paper sweep (#EFE7DA), no transparency. |
| **Placement** | Main product image: product cards (home Bestsellers, `/shop`, “You may also like”), search results, cart drawer and cart thumbnails, and image 1 of the gallery on `/shop/study-table-mix`. |
| **Variants** | One file serves desktop and mobile (cards crop nothing at 4:5). |
| **Alt text** | Alt: “Study-Table Mix in a glass jar” (in code). |
| **Status** | Replaces the v3 brief (same path; prompt updated). |

**Prompt:** Studio packshot of a clear cylindrical glass jar with a brushed brass screw lid and a plain blank kraft-paper band, filled with roasted walnut halves, fox nuts (makhana), green pumpkin seeds and flax seeds; a small spill of the product in front of the jar. Natural window light from the upper left, soft and directional, about 5500K; warm neutral palette of ivory, sand, ghee-gold, terracotta and brass; real Indian home-kitchen surfaces only (honed grey Kadappa stone, aged teak, unbleached hand-loom cotton, brass and matte stoneware); true-to-life colour, gentle contrast, soft shadows that keep detail; crisp focus on the food with a shallow, natural fall-off; photorealistic editorial food photography, as if shot on a full-frame camera with a 90 mm macro or 50 mm lens. No text, letters, numbers, logos, labels or watermarks anywhere (jar bands stay blank). No cartoon, illustration, 3D render, CGI or plastic look. No oversaturation, HDR halos, heavy vignette, fake steam, smoke, floating ingredients, splashes, glitter or bokeh balls. No props that are not Indian home-kitchen objects. No people's faces. No extra fingers or distorted hands.

**Composition, lighting & crop:** Straight-on, camera at jar mid-height, jar centred and ~62% of the frame height, base ~18% from the bottom edge. Soft key light from upper left, white bounce right, soft contact shadow. **Identical jar, angle, backdrop, light and scale across all seven products.** Keep the top-left 25% calm: badges overlay there.

### 22. `study-table-mix-2` — Study-Table Mix — texture

| | |
|---|---|
| **Save to** | `public/images/products/study-table-mix/2.jpg` |
| **Size · ratio · format** | 1200 × 1500 px · 4:5 · JPEG q82, sRGB |
| **Background** | Full-bleed photograph. |
| **Placement** | Product-card **hover** image (desktop pointer only) and gallery image 2 on `/shop/study-table-mix`. |
| **Variants** | Single file. |
| **Alt text** | Alt: “Close-up of Study-Table Mix” (in code). |
| **Status** | Replaces the v3 brief. |

**Prompt:** Top-down macro of roasted walnut halves, fox nuts (makhana), green pumpkin seeds and flax seeds heaped in a small matte stoneware or brass katori on hand-loom cotton. Natural window light from the upper left, soft and directional, about 5500K; warm neutral palette of ivory, sand, ghee-gold, terracotta and brass; real Indian home-kitchen surfaces only (honed grey Kadappa stone, aged teak, unbleached hand-loom cotton, brass and matte stoneware); true-to-life colour, gentle contrast, soft shadows that keep detail; crisp focus on the food with a shallow, natural fall-off; photorealistic editorial food photography, as if shot on a full-frame camera with a 90 mm macro or 50 mm lens. No text, letters, numbers, logos, labels or watermarks anywhere (jar bands stay blank). No cartoon, illustration, 3D render, CGI or plastic look. No oversaturation, HDR halos, heavy vignette, fake steam, smoke, floating ingredients, splashes, glitter or bokeh balls. No props that are not Indian home-kitchen objects. No people's faces. No extra fingers or distorted hands.

**Composition, lighting & crop:** Overhead, katori fills ~80% of the frame, crisp texture front to back, shadows soft. Colour must match the packshot exactly.

### 23. `study-table-mix-3` — Study-Table Mix — served

| | |
|---|---|
| **Save to** | `public/images/products/study-table-mix/3.jpg` |
| **Size · ratio · format** | 1200 × 1500 px · 4:5 · JPEG q82, sRGB |
| **Background** | Full-bleed photograph. |
| **Placement** | Gallery image 3 on `/shop/study-table-mix`. |
| **Variants** | Single file. |
| **Alt text** | Alt: “Study-Table Mix served with chai” (in code). |
| **Status** | Replaces the v3 brief. |

**Prompt:** Roasted walnut halves, fox nuts (makhana), green pumpkin seeds and flax seeds served in a small stoneware bowl on an aged teak table beside a steel tumbler of masala chai on a brass saucer; one hand enters from the right edge holding a spoon (no face, no jewellery). Natural window light from the upper left, soft and directional, about 5500K; warm neutral palette of ivory, sand, ghee-gold, terracotta and brass; real Indian home-kitchen surfaces only (honed grey Kadappa stone, aged teak, unbleached hand-loom cotton, brass and matte stoneware); true-to-life colour, gentle contrast, soft shadows that keep detail; crisp focus on the food with a shallow, natural fall-off; photorealistic editorial food photography, as if shot on a full-frame camera with a 90 mm macro or 50 mm lens. No text, letters, numbers, logos, labels or watermarks anywhere (jar bands stay blank). No cartoon, illustration, 3D render, CGI or plastic look. No oversaturation, HDR halos, heavy vignette, fake steam, smoke, floating ingredients, splashes, glitter or bokeh balls. No props that are not Indian home-kitchen objects. No people's faces. No extra fingers or distorted hands.

**Composition, lighting & crop:** 45° angle, bowl on the left third, tumbler right, generous negative space at top. Warm morning light.

## C. Category tiles (4)

### 24. `category-panjiri` — Category — Panjiri

| | |
|---|---|
| **Save to** | `public/images/categories/panjiri.jpg` |
| **Size · ratio · format** | 1200 × 1200 px · 1:1 · JPEG q82, sRGB |
| **Background** | Seamless warm sand linen (#EDE4D6). |
| **Placement** | Home → “Shop by category” tile for **Panjiri** (links to `/shop?category=panjiri`). |
| **Variants** | Single square file for all widths. |
| **Alt text** | Decorative in the layout (the tile has a text label); in code as “Golden panjiri in a brass bowl”. |
| **Status** | Replaces the v3 brief (ratio changed from 4:5 to **1:1**). |

**Prompt:** Three-quarter overhead view of golden roasted panjiri heaped in a shallow brass bowl with a small brass spoon, on a muted sand linen backdrop. Natural window light from the upper left, soft and directional, about 5500K; warm neutral palette of ivory, sand, ghee-gold, terracotta and brass; real Indian home-kitchen surfaces only (honed grey Kadappa stone, aged teak, unbleached hand-loom cotton, brass and matte stoneware); true-to-life colour, gentle contrast, soft shadows that keep detail; crisp focus on the food with a shallow, natural fall-off; photorealistic editorial food photography, as if shot on a full-frame camera with a 90 mm macro or 50 mm lens. No text, letters, numbers, logos, labels or watermarks anywhere (jar bands stay blank). No cartoon, illustration, 3D render, CGI or plastic look. No oversaturation, HDR halos, heavy vignette, fake steam, smoke, floating ingredients, splashes, glitter or bokeh balls. No props that are not Indian home-kitchen objects. No people's faces. No extra fingers or distorted hands.

**Composition, lighting & crop:** Subject centred, ~60% of the frame, 30° above the table. Same backdrop and light across all four tiles.

### 25. `category-pinni` — Category — Pinni

| | |
|---|---|
| **Save to** | `public/images/categories/pinni.jpg` |
| **Size · ratio · format** | 1200 × 1200 px · 1:1 · JPEG q82, sRGB |
| **Background** | Seamless warm sand linen (#EDE4D6). |
| **Placement** | Home → “Shop by category” tile for **Pinni** (links to `/shop?category=pinni`). |
| **Variants** | Single square file for all widths. |
| **Alt text** | Decorative in the layout (the tile has a text label); in code as “Hand-pressed pinni on a stoneware plate”. |
| **Status** | Replaces the v3 brief (ratio changed from 4:5 to **1:1**). |

**Prompt:** Three-quarter overhead view of five hand-pressed pinni stacked loosely on a matte off-white stoneware plate, on a muted sand linen backdrop. Natural window light from the upper left, soft and directional, about 5500K; warm neutral palette of ivory, sand, ghee-gold, terracotta and brass; real Indian home-kitchen surfaces only (honed grey Kadappa stone, aged teak, unbleached hand-loom cotton, brass and matte stoneware); true-to-life colour, gentle contrast, soft shadows that keep detail; crisp focus on the food with a shallow, natural fall-off; photorealistic editorial food photography, as if shot on a full-frame camera with a 90 mm macro or 50 mm lens. No text, letters, numbers, logos, labels or watermarks anywhere (jar bands stay blank). No cartoon, illustration, 3D render, CGI or plastic look. No oversaturation, HDR halos, heavy vignette, fake steam, smoke, floating ingredients, splashes, glitter or bokeh balls. No props that are not Indian home-kitchen objects. No people's faces. No extra fingers or distorted hands.

**Composition, lighting & crop:** Subject centred, ~60% of the frame, 30° above the table. Same backdrop and light across all four tiles.

### 26. `category-laddus` — Category — Dry-fruit laddus

| | |
|---|---|
| **Save to** | `public/images/categories/laddus.jpg` |
| **Size · ratio · format** | 1200 × 1200 px · 1:1 · JPEG q82, sRGB |
| **Background** | Seamless warm sand linen (#EDE4D6). |
| **Placement** | Home → “Shop by category” tile for **Dry-fruit laddus** (links to `/shop?category=laddus`). |
| **Variants** | Single square file for all widths. |
| **Alt text** | Decorative in the layout (the tile has a text label); in code as “Dry-fruit laddus on a brass thali”. |
| **Status** | Replaces the v3 brief (ratio changed from 4:5 to **1:1**). |

**Prompt:** Three-quarter overhead view of seven deep-brown dry-fruit laddus arranged in a loose ring on a small brass thali, on a muted sand linen backdrop. Natural window light from the upper left, soft and directional, about 5500K; warm neutral palette of ivory, sand, ghee-gold, terracotta and brass; real Indian home-kitchen surfaces only (honed grey Kadappa stone, aged teak, unbleached hand-loom cotton, brass and matte stoneware); true-to-life colour, gentle contrast, soft shadows that keep detail; crisp focus on the food with a shallow, natural fall-off; photorealistic editorial food photography, as if shot on a full-frame camera with a 90 mm macro or 50 mm lens. No text, letters, numbers, logos, labels or watermarks anywhere (jar bands stay blank). No cartoon, illustration, 3D render, CGI or plastic look. No oversaturation, HDR halos, heavy vignette, fake steam, smoke, floating ingredients, splashes, glitter or bokeh balls. No props that are not Indian home-kitchen objects. No people's faces. No extra fingers or distorted hands.

**Composition, lighting & crop:** Subject centred, ~60% of the frame, 30° above the table. Same backdrop and light across all four tiles.

### 27. `category-mixes` — Category — Dry-fruit mixes

| | |
|---|---|
| **Save to** | `public/images/categories/mixes.jpg` |
| **Size · ratio · format** | 1200 × 1200 px · 1:1 · JPEG q82, sRGB |
| **Background** | Seamless warm sand linen (#EDE4D6). |
| **Placement** | Home → “Shop by category” tile for **Dry-fruit mixes** (links to `/shop?category=mixes`). |
| **Variants** | Single square file for all widths. |
| **Alt text** | Decorative in the layout (the tile has a text label); in code as “Roasted nuts, seeds and raisins in a glass jar”. |
| **Status** | Replaces the v3 brief (ratio changed from 4:5 to **1:1**). |

**Prompt:** Three-quarter overhead view of an open glass jar of roasted almonds, cashews, raisins and pumpkin seeds, a few pieces spilled on the stone, on a muted sand linen backdrop. Natural window light from the upper left, soft and directional, about 5500K; warm neutral palette of ivory, sand, ghee-gold, terracotta and brass; real Indian home-kitchen surfaces only (honed grey Kadappa stone, aged teak, unbleached hand-loom cotton, brass and matte stoneware); true-to-life colour, gentle contrast, soft shadows that keep detail; crisp focus on the food with a shallow, natural fall-off; photorealistic editorial food photography, as if shot on a full-frame camera with a 90 mm macro or 50 mm lens. No text, letters, numbers, logos, labels or watermarks anywhere (jar bands stay blank). No cartoon, illustration, 3D render, CGI or plastic look. No oversaturation, HDR halos, heavy vignette, fake steam, smoke, floating ingredients, splashes, glitter or bokeh balls. No props that are not Indian home-kitchen objects. No people's faces. No extra fingers or distorted hands.

**Composition, lighting & crop:** Subject centred, ~60% of the frame, 30° above the table. Same backdrop and light across all four tiles.

## D. Ingredient textures for the custom-batch builder (22)

These are cropped to **circles** (the dishes in the mix composition, swatches on product pages and the chooser) and **rounded squares** (ingredient rows). So each one must be a **full-bleed, top-down texture: the ingredient fills the entire frame edge to edge with no background, plate rim or props visible**. The builder sizes each dish by the ingredient's share of the recipe, so these photos are what make the mix look real.

### 28. `ingredient-atta` — Ingredient — Wholewheat flour (atta)

| | |
|---|---|
| **Save to** | `public/images/ingredients/atta.jpg` |
| **Size · ratio · format** | 800 × 800 px · 1:1 · JPEG q82, sRGB |
| **Background** | **None: the texture fills 100% of the frame.** No transparency needed. |
| **Placement** | `/customise/<product>` → the **Wholewheat flour (atta)** ingredient row (88 px square) and its dish in the mix composition (circle, up to ~150 px); also the ingredient swatches on product pages, the home Custom batches list and `/customise`. Until it exists, a grainy colour swatch is shown. |
| **Variants** | Single file. Shown small, so keep pieces large enough to read at 64 px. |
| **Alt text** | Decorative: the ingredient name is always shown as text next to it. |
| **Status** | Replaces the v3 ingredient brief (which asked for heaps on a backdrop). Ingredient set expanded from 16 to 22. |

**Prompt:** Straight-down macro of a smooth, fine bed of golden-roasted wholewheat flour with faint spoon swirls, densely filling the whole frame like a bowl seen from directly above with the rim cropped out. Natural window light from the upper left, soft and directional, about 5500K; warm neutral palette of ivory, sand, ghee-gold, terracotta and brass; real Indian home-kitchen surfaces only (honed grey Kadappa stone, aged teak, unbleached hand-loom cotton, brass and matte stoneware); true-to-life colour, gentle contrast, soft shadows that keep detail; crisp focus on the food with a shallow, natural fall-off; photorealistic editorial food photography, as if shot on a full-frame camera with a 90 mm macro or 50 mm lens. No text, letters, numbers, logos, labels or watermarks anywhere (jar bands stay blank). No cartoon, illustration, 3D render, CGI or plastic look. No oversaturation, HDR halos, heavy vignette, fake steam, smoke, floating ingredients, splashes, glitter or bokeh balls. No props that are not Indian home-kitchen objects. No people's faces. No extra fingers or distorted hands.

**Composition, lighting & crop:** Exactly overhead (90°), even soft light from the upper left, no hard shadows, sharp across the frame, piece size consistent across the series (an almond ≈ 1/8 of the frame width). The centre 70% must look good when cropped to a circle. **All 22 must match in light, colour temperature and scale.**

### 29. `ingredient-suji` — Ingredient — Semolina (suji)

| | |
|---|---|
| **Save to** | `public/images/ingredients/suji.jpg` |
| **Size · ratio · format** | 800 × 800 px · 1:1 · JPEG q82, sRGB |
| **Background** | **None: the texture fills 100% of the frame.** No transparency needed. |
| **Placement** | `/customise/<product>` → the **Semolina (suji)** ingredient row (88 px square) and its dish in the mix composition (circle, up to ~150 px); also the ingredient swatches on product pages, the home Custom batches list and `/customise`. Until it exists, a grainy colour swatch is shown. |
| **Variants** | Single file. Shown small, so keep pieces large enough to read at 64 px. |
| **Alt text** | Decorative: the ingredient name is always shown as text next to it. |
| **Status** | Replaces the v3 ingredient brief (which asked for heaps on a backdrop). Ingredient set expanded from 16 to 22. |

**Prompt:** Straight-down macro of pale-gold roasted semolina grains, granular texture, densely filling the whole frame like a bowl seen from directly above with the rim cropped out. Natural window light from the upper left, soft and directional, about 5500K; warm neutral palette of ivory, sand, ghee-gold, terracotta and brass; real Indian home-kitchen surfaces only (honed grey Kadappa stone, aged teak, unbleached hand-loom cotton, brass and matte stoneware); true-to-life colour, gentle contrast, soft shadows that keep detail; crisp focus on the food with a shallow, natural fall-off; photorealistic editorial food photography, as if shot on a full-frame camera with a 90 mm macro or 50 mm lens. No text, letters, numbers, logos, labels or watermarks anywhere (jar bands stay blank). No cartoon, illustration, 3D render, CGI or plastic look. No oversaturation, HDR halos, heavy vignette, fake steam, smoke, floating ingredients, splashes, glitter or bokeh balls. No props that are not Indian home-kitchen objects. No people's faces. No extra fingers or distorted hands.

**Composition, lighting & crop:** Exactly overhead (90°), even soft light from the upper left, no hard shadows, sharp across the frame, piece size consistent across the series (an almond ≈ 1/8 of the frame width). The centre 70% must look good when cropped to a circle. **All 22 must match in light, colour temperature and scale.**

### 30. `ingredient-ghee` — Ingredient — Desi ghee

| | |
|---|---|
| **Save to** | `public/images/ingredients/ghee.jpg` |
| **Size · ratio · format** | 800 × 800 px · 1:1 · JPEG q82, sRGB |
| **Background** | **None: the texture fills 100% of the frame.** No transparency needed. |
| **Placement** | `/customise/<product>` → the **Desi ghee** ingredient row (88 px square) and its dish in the mix composition (circle, up to ~150 px); also the ingredient swatches on product pages, the home Custom batches list and `/customise`. Until it exists, a grainy colour swatch is shown. |
| **Variants** | Single file. Shown small, so keep pieces large enough to read at 64 px. |
| **Alt text** | Decorative: the ingredient name is always shown as text next to it. |
| **Status** | Replaces the v3 ingredient brief (which asked for heaps on a backdrop). Ingredient set expanded from 16 to 22. |

**Prompt:** Straight-down macro of the surface of golden, softly granular desi ghee in a brass pot, filling the frame, densely filling the whole frame like a bowl seen from directly above with the rim cropped out. Natural window light from the upper left, soft and directional, about 5500K; warm neutral palette of ivory, sand, ghee-gold, terracotta and brass; real Indian home-kitchen surfaces only (honed grey Kadappa stone, aged teak, unbleached hand-loom cotton, brass and matte stoneware); true-to-life colour, gentle contrast, soft shadows that keep detail; crisp focus on the food with a shallow, natural fall-off; photorealistic editorial food photography, as if shot on a full-frame camera with a 90 mm macro or 50 mm lens. No text, letters, numbers, logos, labels or watermarks anywhere (jar bands stay blank). No cartoon, illustration, 3D render, CGI or plastic look. No oversaturation, HDR halos, heavy vignette, fake steam, smoke, floating ingredients, splashes, glitter or bokeh balls. No props that are not Indian home-kitchen objects. No people's faces. No extra fingers or distorted hands.

**Composition, lighting & crop:** Exactly overhead (90°), even soft light from the upper left, no hard shadows, sharp across the frame, piece size consistent across the series (an almond ≈ 1/8 of the frame width). The centre 70% must look good when cropped to a circle. **All 22 must match in light, colour temperature and scale.**

### 31. `ingredient-jaggery` — Ingredient — Jaggery (gur)

| | |
|---|---|
| **Save to** | `public/images/ingredients/jaggery.jpg` |
| **Size · ratio · format** | 800 × 800 px · 1:1 · JPEG q82, sRGB |
| **Background** | **None: the texture fills 100% of the frame.** No transparency needed. |
| **Placement** | `/customise/<product>` → the **Jaggery (gur)** ingredient row (88 px square) and its dish in the mix composition (circle, up to ~150 px); also the ingredient swatches on product pages, the home Custom batches list and `/customise`. Until it exists, a grainy colour swatch is shown. |
| **Variants** | Single file. Shown small, so keep pieces large enough to read at 64 px. |
| **Alt text** | Decorative: the ingredient name is always shown as text next to it. |
| **Status** | Replaces the v3 ingredient brief (which asked for heaps on a backdrop). Ingredient set expanded from 16 to 22. |

**Prompt:** Straight-down macro of crumbled and powdered dark golden jaggery with a few small chunks, densely filling the whole frame like a bowl seen from directly above with the rim cropped out. Natural window light from the upper left, soft and directional, about 5500K; warm neutral palette of ivory, sand, ghee-gold, terracotta and brass; real Indian home-kitchen surfaces only (honed grey Kadappa stone, aged teak, unbleached hand-loom cotton, brass and matte stoneware); true-to-life colour, gentle contrast, soft shadows that keep detail; crisp focus on the food with a shallow, natural fall-off; photorealistic editorial food photography, as if shot on a full-frame camera with a 90 mm macro or 50 mm lens. No text, letters, numbers, logos, labels or watermarks anywhere (jar bands stay blank). No cartoon, illustration, 3D render, CGI or plastic look. No oversaturation, HDR halos, heavy vignette, fake steam, smoke, floating ingredients, splashes, glitter or bokeh balls. No props that are not Indian home-kitchen objects. No people's faces. No extra fingers or distorted hands.

**Composition, lighting & crop:** Exactly overhead (90°), even soft light from the upper left, no hard shadows, sharp across the frame, piece size consistent across the series (an almond ≈ 1/8 of the frame width). The centre 70% must look good when cropped to a circle. **All 22 must match in light, colour temperature and scale.**

### 32. `ingredient-khand` — Ingredient — Unrefined cane sugar (khand)

| | |
|---|---|
| **Save to** | `public/images/ingredients/khand.jpg` |
| **Size · ratio · format** | 800 × 800 px · 1:1 · JPEG q82, sRGB |
| **Background** | **None: the texture fills 100% of the frame.** No transparency needed. |
| **Placement** | `/customise/<product>` → the **Unrefined cane sugar (khand)** ingredient row (88 px square) and its dish in the mix composition (circle, up to ~150 px); also the ingredient swatches on product pages, the home Custom batches list and `/customise`. Until it exists, a grainy colour swatch is shown. |
| **Variants** | Single file. Shown small, so keep pieces large enough to read at 64 px. |
| **Alt text** | Decorative: the ingredient name is always shown as text next to it. |
| **Status** | Replaces the v3 ingredient brief (which asked for heaps on a backdrop). Ingredient set expanded from 16 to 22. |

**Prompt:** Straight-down macro of light tan, slightly coarse unrefined cane sugar crystals, densely filling the whole frame like a bowl seen from directly above with the rim cropped out. Natural window light from the upper left, soft and directional, about 5500K; warm neutral palette of ivory, sand, ghee-gold, terracotta and brass; real Indian home-kitchen surfaces only (honed grey Kadappa stone, aged teak, unbleached hand-loom cotton, brass and matte stoneware); true-to-life colour, gentle contrast, soft shadows that keep detail; crisp focus on the food with a shallow, natural fall-off; photorealistic editorial food photography, as if shot on a full-frame camera with a 90 mm macro or 50 mm lens. No text, letters, numbers, logos, labels or watermarks anywhere (jar bands stay blank). No cartoon, illustration, 3D render, CGI or plastic look. No oversaturation, HDR halos, heavy vignette, fake steam, smoke, floating ingredients, splashes, glitter or bokeh balls. No props that are not Indian home-kitchen objects. No people's faces. No extra fingers or distorted hands.

**Composition, lighting & crop:** Exactly overhead (90°), even soft light from the upper left, no hard shadows, sharp across the frame, piece size consistent across the series (an almond ≈ 1/8 of the frame width). The centre 70% must look good when cropped to a circle. **All 22 must match in light, colour temperature and scale.**

### 33. `ingredient-sugar` — Ingredient — Sugar (boora)

| | |
|---|---|
| **Save to** | `public/images/ingredients/sugar.jpg` |
| **Size · ratio · format** | 800 × 800 px · 1:1 · JPEG q82, sRGB |
| **Background** | **None: the texture fills 100% of the frame.** No transparency needed. |
| **Placement** | `/customise/<product>` → the **Sugar (boora)** ingredient row (88 px square) and its dish in the mix composition (circle, up to ~150 px); also the ingredient swatches on product pages, the home Custom batches list and `/customise`. Until it exists, a grainy colour swatch is shown. |
| **Variants** | Single file. Shown small, so keep pieces large enough to read at 64 px. |
| **Alt text** | Decorative: the ingredient name is always shown as text next to it. |
| **Status** | Replaces the v3 ingredient brief (which asked for heaps on a backdrop). Ingredient set expanded from 16 to 22. |

**Prompt:** Straight-down macro of fine white ground sugar (boora) with soft drifts, densely filling the whole frame like a bowl seen from directly above with the rim cropped out. Natural window light from the upper left, soft and directional, about 5500K; warm neutral palette of ivory, sand, ghee-gold, terracotta and brass; real Indian home-kitchen surfaces only (honed grey Kadappa stone, aged teak, unbleached hand-loom cotton, brass and matte stoneware); true-to-life colour, gentle contrast, soft shadows that keep detail; crisp focus on the food with a shallow, natural fall-off; photorealistic editorial food photography, as if shot on a full-frame camera with a 90 mm macro or 50 mm lens. No text, letters, numbers, logos, labels or watermarks anywhere (jar bands stay blank). No cartoon, illustration, 3D render, CGI or plastic look. No oversaturation, HDR halos, heavy vignette, fake steam, smoke, floating ingredients, splashes, glitter or bokeh balls. No props that are not Indian home-kitchen objects. No people's faces. No extra fingers or distorted hands.

**Composition, lighting & crop:** Exactly overhead (90°), even soft light from the upper left, no hard shadows, sharp across the frame, piece size consistent across the series (an almond ≈ 1/8 of the frame width). The centre 70% must look good when cropped to a circle. **All 22 must match in light, colour temperature and scale.**

### 34. `ingredient-almond` — Ingredient — Almonds (badam)

| | |
|---|---|
| **Save to** | `public/images/ingredients/almond.jpg` |
| **Size · ratio · format** | 800 × 800 px · 1:1 · JPEG q82, sRGB |
| **Background** | **None: the texture fills 100% of the frame.** No transparency needed. |
| **Placement** | `/customise/<product>` → the **Almonds (badam)** ingredient row (88 px square) and its dish in the mix composition (circle, up to ~150 px); also the ingredient swatches on product pages, the home Custom batches list and `/customise`. Until it exists, a grainy colour swatch is shown. |
| **Variants** | Single file. Shown small, so keep pieces large enough to read at 64 px. |
| **Alt text** | Decorative: the ingredient name is always shown as text next to it. |
| **Status** | Replaces the v3 ingredient brief (which asked for heaps on a backdrop). Ingredient set expanded from 16 to 22. |

**Prompt:** Straight-down macro of sliced and whole almonds, brown skins with pale cut faces, densely filling the whole frame like a bowl seen from directly above with the rim cropped out. Natural window light from the upper left, soft and directional, about 5500K; warm neutral palette of ivory, sand, ghee-gold, terracotta and brass; real Indian home-kitchen surfaces only (honed grey Kadappa stone, aged teak, unbleached hand-loom cotton, brass and matte stoneware); true-to-life colour, gentle contrast, soft shadows that keep detail; crisp focus on the food with a shallow, natural fall-off; photorealistic editorial food photography, as if shot on a full-frame camera with a 90 mm macro or 50 mm lens. No text, letters, numbers, logos, labels or watermarks anywhere (jar bands stay blank). No cartoon, illustration, 3D render, CGI or plastic look. No oversaturation, HDR halos, heavy vignette, fake steam, smoke, floating ingredients, splashes, glitter or bokeh balls. No props that are not Indian home-kitchen objects. No people's faces. No extra fingers or distorted hands.

**Composition, lighting & crop:** Exactly overhead (90°), even soft light from the upper left, no hard shadows, sharp across the frame, piece size consistent across the series (an almond ≈ 1/8 of the frame width). The centre 70% must look good when cropped to a circle. **All 22 must match in light, colour temperature and scale.**

### 35. `ingredient-cashew` — Ingredient — Cashews (kaju)

| | |
|---|---|
| **Save to** | `public/images/ingredients/cashew.jpg` |
| **Size · ratio · format** | 800 × 800 px · 1:1 · JPEG q82, sRGB |
| **Background** | **None: the texture fills 100% of the frame.** No transparency needed. |
| **Placement** | `/customise/<product>` → the **Cashews (kaju)** ingredient row (88 px square) and its dish in the mix composition (circle, up to ~150 px); also the ingredient swatches on product pages, the home Custom batches list and `/customise`. Until it exists, a grainy colour swatch is shown. |
| **Variants** | Single file. Shown small, so keep pieces large enough to read at 64 px. |
| **Alt text** | Decorative: the ingredient name is always shown as text next to it. |
| **Status** | Replaces the v3 ingredient brief (which asked for heaps on a backdrop). Ingredient set expanded from 16 to 22. |

**Prompt:** Straight-down macro of whole and halved pale cashews, a few lightly toasted, densely filling the whole frame like a bowl seen from directly above with the rim cropped out. Natural window light from the upper left, soft and directional, about 5500K; warm neutral palette of ivory, sand, ghee-gold, terracotta and brass; real Indian home-kitchen surfaces only (honed grey Kadappa stone, aged teak, unbleached hand-loom cotton, brass and matte stoneware); true-to-life colour, gentle contrast, soft shadows that keep detail; crisp focus on the food with a shallow, natural fall-off; photorealistic editorial food photography, as if shot on a full-frame camera with a 90 mm macro or 50 mm lens. No text, letters, numbers, logos, labels or watermarks anywhere (jar bands stay blank). No cartoon, illustration, 3D render, CGI or plastic look. No oversaturation, HDR halos, heavy vignette, fake steam, smoke, floating ingredients, splashes, glitter or bokeh balls. No props that are not Indian home-kitchen objects. No people's faces. No extra fingers or distorted hands.

**Composition, lighting & crop:** Exactly overhead (90°), even soft light from the upper left, no hard shadows, sharp across the frame, piece size consistent across the series (an almond ≈ 1/8 of the frame width). The centre 70% must look good when cropped to a circle. **All 22 must match in light, colour temperature and scale.**

### 36. `ingredient-pistachio` — Ingredient — Pistachios (pista)

| | |
|---|---|
| **Save to** | `public/images/ingredients/pistachio.jpg` |
| **Size · ratio · format** | 800 × 800 px · 1:1 · JPEG q82, sRGB |
| **Background** | **None: the texture fills 100% of the frame.** No transparency needed. |
| **Placement** | `/customise/<product>` → the **Pistachios (pista)** ingredient row (88 px square) and its dish in the mix composition (circle, up to ~150 px); also the ingredient swatches on product pages, the home Custom batches list and `/customise`. Until it exists, a grainy colour swatch is shown. |
| **Variants** | Single file. Shown small, so keep pieces large enough to read at 64 px. |
| **Alt text** | Decorative: the ingredient name is always shown as text next to it. |
| **Status** | Replaces the v3 ingredient brief (which asked for heaps on a backdrop). Ingredient set expanded from 16 to 22. |

**Prompt:** Straight-down macro of slivered and whole shelled pistachios, green with purple-tinged skins, densely filling the whole frame like a bowl seen from directly above with the rim cropped out. Natural window light from the upper left, soft and directional, about 5500K; warm neutral palette of ivory, sand, ghee-gold, terracotta and brass; real Indian home-kitchen surfaces only (honed grey Kadappa stone, aged teak, unbleached hand-loom cotton, brass and matte stoneware); true-to-life colour, gentle contrast, soft shadows that keep detail; crisp focus on the food with a shallow, natural fall-off; photorealistic editorial food photography, as if shot on a full-frame camera with a 90 mm macro or 50 mm lens. No text, letters, numbers, logos, labels or watermarks anywhere (jar bands stay blank). No cartoon, illustration, 3D render, CGI or plastic look. No oversaturation, HDR halos, heavy vignette, fake steam, smoke, floating ingredients, splashes, glitter or bokeh balls. No props that are not Indian home-kitchen objects. No people's faces. No extra fingers or distorted hands.

**Composition, lighting & crop:** Exactly overhead (90°), even soft light from the upper left, no hard shadows, sharp across the frame, piece size consistent across the series (an almond ≈ 1/8 of the frame width). The centre 70% must look good when cropped to a circle. **All 22 must match in light, colour temperature and scale.**

### 37. `ingredient-walnut` — Ingredient — Walnuts (akhrot)

| | |
|---|---|
| **Save to** | `public/images/ingredients/walnut.jpg` |
| **Size · ratio · format** | 800 × 800 px · 1:1 · JPEG q82, sRGB |
| **Background** | **None: the texture fills 100% of the frame.** No transparency needed. |
| **Placement** | `/customise/<product>` → the **Walnuts (akhrot)** ingredient row (88 px square) and its dish in the mix composition (circle, up to ~150 px); also the ingredient swatches on product pages, the home Custom batches list and `/customise`. Until it exists, a grainy colour swatch is shown. |
| **Variants** | Single file. Shown small, so keep pieces large enough to read at 64 px. |
| **Alt text** | Decorative: the ingredient name is always shown as text next to it. |
| **Status** | Replaces the v3 ingredient brief (which asked for heaps on a backdrop). Ingredient set expanded from 16 to 22. |

**Prompt:** Straight-down macro of walnut halves and broken pieces, densely filling the whole frame like a bowl seen from directly above with the rim cropped out. Natural window light from the upper left, soft and directional, about 5500K; warm neutral palette of ivory, sand, ghee-gold, terracotta and brass; real Indian home-kitchen surfaces only (honed grey Kadappa stone, aged teak, unbleached hand-loom cotton, brass and matte stoneware); true-to-life colour, gentle contrast, soft shadows that keep detail; crisp focus on the food with a shallow, natural fall-off; photorealistic editorial food photography, as if shot on a full-frame camera with a 90 mm macro or 50 mm lens. No text, letters, numbers, logos, labels or watermarks anywhere (jar bands stay blank). No cartoon, illustration, 3D render, CGI or plastic look. No oversaturation, HDR halos, heavy vignette, fake steam, smoke, floating ingredients, splashes, glitter or bokeh balls. No props that are not Indian home-kitchen objects. No people's faces. No extra fingers or distorted hands.

**Composition, lighting & crop:** Exactly overhead (90°), even soft light from the upper left, no hard shadows, sharp across the frame, piece size consistent across the series (an almond ≈ 1/8 of the frame width). The centre 70% must look good when cropped to a circle. **All 22 must match in light, colour temperature and scale.**

### 38. `ingredient-raisin` — Ingredient — Raisins (kishmish)

| | |
|---|---|
| **Save to** | `public/images/ingredients/raisin.jpg` |
| **Size · ratio · format** | 800 × 800 px · 1:1 · JPEG q82, sRGB |
| **Background** | **None: the texture fills 100% of the frame.** No transparency needed. |
| **Placement** | `/customise/<product>` → the **Raisins (kishmish)** ingredient row (88 px square) and its dish in the mix composition (circle, up to ~150 px); also the ingredient swatches on product pages, the home Custom batches list and `/customise`. Until it exists, a grainy colour swatch is shown. |
| **Variants** | Single file. Shown small, so keep pieces large enough to read at 64 px. |
| **Alt text** | Decorative: the ingredient name is always shown as text next to it. |
| **Status** | Replaces the v3 ingredient brief (which asked for heaps on a backdrop). Ingredient set expanded from 16 to 22. |

**Prompt:** Straight-down macro of plump golden and dark raisins, densely filling the whole frame like a bowl seen from directly above with the rim cropped out. Natural window light from the upper left, soft and directional, about 5500K; warm neutral palette of ivory, sand, ghee-gold, terracotta and brass; real Indian home-kitchen surfaces only (honed grey Kadappa stone, aged teak, unbleached hand-loom cotton, brass and matte stoneware); true-to-life colour, gentle contrast, soft shadows that keep detail; crisp focus on the food with a shallow, natural fall-off; photorealistic editorial food photography, as if shot on a full-frame camera with a 90 mm macro or 50 mm lens. No text, letters, numbers, logos, labels or watermarks anywhere (jar bands stay blank). No cartoon, illustration, 3D render, CGI or plastic look. No oversaturation, HDR halos, heavy vignette, fake steam, smoke, floating ingredients, splashes, glitter or bokeh balls. No props that are not Indian home-kitchen objects. No people's faces. No extra fingers or distorted hands.

**Composition, lighting & crop:** Exactly overhead (90°), even soft light from the upper left, no hard shadows, sharp across the frame, piece size consistent across the series (an almond ≈ 1/8 of the frame width). The centre 70% must look good when cropped to a circle. **All 22 must match in light, colour temperature and scale.**

### 39. `ingredient-fig` — Ingredient — Figs (anjeer)

| | |
|---|---|
| **Save to** | `public/images/ingredients/fig.jpg` |
| **Size · ratio · format** | 800 × 800 px · 1:1 · JPEG q82, sRGB |
| **Background** | **None: the texture fills 100% of the frame.** No transparency needed. |
| **Placement** | `/customise/<product>` → the **Figs (anjeer)** ingredient row (88 px square) and its dish in the mix composition (circle, up to ~150 px); also the ingredient swatches on product pages, the home Custom batches list and `/customise`. Until it exists, a grainy colour swatch is shown. |
| **Variants** | Single file. Shown small, so keep pieces large enough to read at 64 px. |
| **Alt text** | Decorative: the ingredient name is always shown as text next to it. |
| **Status** | Replaces the v3 ingredient brief (which asked for heaps on a backdrop). Ingredient set expanded from 16 to 22. |

**Prompt:** Straight-down macro of chopped dried figs showing their seeds, densely filling the whole frame like a bowl seen from directly above with the rim cropped out. Natural window light from the upper left, soft and directional, about 5500K; warm neutral palette of ivory, sand, ghee-gold, terracotta and brass; real Indian home-kitchen surfaces only (honed grey Kadappa stone, aged teak, unbleached hand-loom cotton, brass and matte stoneware); true-to-life colour, gentle contrast, soft shadows that keep detail; crisp focus on the food with a shallow, natural fall-off; photorealistic editorial food photography, as if shot on a full-frame camera with a 90 mm macro or 50 mm lens. No text, letters, numbers, logos, labels or watermarks anywhere (jar bands stay blank). No cartoon, illustration, 3D render, CGI or plastic look. No oversaturation, HDR halos, heavy vignette, fake steam, smoke, floating ingredients, splashes, glitter or bokeh balls. No props that are not Indian home-kitchen objects. No people's faces. No extra fingers or distorted hands.

**Composition, lighting & crop:** Exactly overhead (90°), even soft light from the upper left, no hard shadows, sharp across the frame, piece size consistent across the series (an almond ≈ 1/8 of the frame width). The centre 70% must look good when cropped to a circle. **All 22 must match in light, colour temperature and scale.**

### 40. `ingredient-makhana` — Ingredient — Fox nuts (makhana)

| | |
|---|---|
| **Save to** | `public/images/ingredients/makhana.jpg` |
| **Size · ratio · format** | 800 × 800 px · 1:1 · JPEG q82, sRGB |
| **Background** | **None: the texture fills 100% of the frame.** No transparency needed. |
| **Placement** | `/customise/<product>` → the **Fox nuts (makhana)** ingredient row (88 px square) and its dish in the mix composition (circle, up to ~150 px); also the ingredient swatches on product pages, the home Custom batches list and `/customise`. Until it exists, a grainy colour swatch is shown. |
| **Variants** | Single file. Shown small, so keep pieces large enough to read at 64 px. |
| **Alt text** | Decorative: the ingredient name is always shown as text next to it. |
| **Status** | Replaces the v3 ingredient brief (which asked for heaps on a backdrop). Ingredient set expanded from 16 to 22. |

**Prompt:** Straight-down macro of white roasted fox nuts with brown speckles, densely filling the whole frame like a bowl seen from directly above with the rim cropped out. Natural window light from the upper left, soft and directional, about 5500K; warm neutral palette of ivory, sand, ghee-gold, terracotta and brass; real Indian home-kitchen surfaces only (honed grey Kadappa stone, aged teak, unbleached hand-loom cotton, brass and matte stoneware); true-to-life colour, gentle contrast, soft shadows that keep detail; crisp focus on the food with a shallow, natural fall-off; photorealistic editorial food photography, as if shot on a full-frame camera with a 90 mm macro or 50 mm lens. No text, letters, numbers, logos, labels or watermarks anywhere (jar bands stay blank). No cartoon, illustration, 3D render, CGI or plastic look. No oversaturation, HDR halos, heavy vignette, fake steam, smoke, floating ingredients, splashes, glitter or bokeh balls. No props that are not Indian home-kitchen objects. No people's faces. No extra fingers or distorted hands.

**Composition, lighting & crop:** Exactly overhead (90°), even soft light from the upper left, no hard shadows, sharp across the frame, piece size consistent across the series (an almond ≈ 1/8 of the frame width). The centre 70% must look good when cropped to a circle. **All 22 must match in light, colour temperature and scale.**

### 41. `ingredient-gond` — Ingredient — Edible gum (gond)

| | |
|---|---|
| **Save to** | `public/images/ingredients/gond.jpg` |
| **Size · ratio · format** | 800 × 800 px · 1:1 · JPEG q82, sRGB |
| **Background** | **None: the texture fills 100% of the frame.** No transparency needed. |
| **Placement** | `/customise/<product>` → the **Edible gum (gond)** ingredient row (88 px square) and its dish in the mix composition (circle, up to ~150 px); also the ingredient swatches on product pages, the home Custom batches list and `/customise`. Until it exists, a grainy colour swatch is shown. |
| **Variants** | Single file. Shown small, so keep pieces large enough to read at 64 px. |
| **Alt text** | Decorative: the ingredient name is always shown as text next to it. |
| **Status** | Replaces the v3 ingredient brief (which asked for heaps on a backdrop). Ingredient set expanded from 16 to 22. |

**Prompt:** Straight-down macro of puffed, fried edible gum crystals, pale amber and airy, densely filling the whole frame like a bowl seen from directly above with the rim cropped out. Natural window light from the upper left, soft and directional, about 5500K; warm neutral palette of ivory, sand, ghee-gold, terracotta and brass; real Indian home-kitchen surfaces only (honed grey Kadappa stone, aged teak, unbleached hand-loom cotton, brass and matte stoneware); true-to-life colour, gentle contrast, soft shadows that keep detail; crisp focus on the food with a shallow, natural fall-off; photorealistic editorial food photography, as if shot on a full-frame camera with a 90 mm macro or 50 mm lens. No text, letters, numbers, logos, labels or watermarks anywhere (jar bands stay blank). No cartoon, illustration, 3D render, CGI or plastic look. No oversaturation, HDR halos, heavy vignette, fake steam, smoke, floating ingredients, splashes, glitter or bokeh balls. No props that are not Indian home-kitchen objects. No people's faces. No extra fingers or distorted hands.

**Composition, lighting & crop:** Exactly overhead (90°), even soft light from the upper left, no hard shadows, sharp across the frame, piece size consistent across the series (an almond ≈ 1/8 of the frame width). The centre 70% must look good when cropped to a circle. **All 22 must match in light, colour temperature and scale.**

### 42. `ingredient-magaz` — Ingredient — Melon seeds (magaz)

| | |
|---|---|
| **Save to** | `public/images/ingredients/magaz.jpg` |
| **Size · ratio · format** | 800 × 800 px · 1:1 · JPEG q82, sRGB |
| **Background** | **None: the texture fills 100% of the frame.** No transparency needed. |
| **Placement** | `/customise/<product>` → the **Melon seeds (magaz)** ingredient row (88 px square) and its dish in the mix composition (circle, up to ~150 px); also the ingredient swatches on product pages, the home Custom batches list and `/customise`. Until it exists, a grainy colour swatch is shown. |
| **Variants** | Single file. Shown small, so keep pieces large enough to read at 64 px. |
| **Alt text** | Decorative: the ingredient name is always shown as text next to it. |
| **Status** | Replaces the v3 ingredient brief (which asked for heaps on a backdrop). Ingredient set expanded from 16 to 22. |

**Prompt:** Straight-down macro of tiny peeled creamy-white melon seeds, densely filling the whole frame like a bowl seen from directly above with the rim cropped out. Natural window light from the upper left, soft and directional, about 5500K; warm neutral palette of ivory, sand, ghee-gold, terracotta and brass; real Indian home-kitchen surfaces only (honed grey Kadappa stone, aged teak, unbleached hand-loom cotton, brass and matte stoneware); true-to-life colour, gentle contrast, soft shadows that keep detail; crisp focus on the food with a shallow, natural fall-off; photorealistic editorial food photography, as if shot on a full-frame camera with a 90 mm macro or 50 mm lens. No text, letters, numbers, logos, labels or watermarks anywhere (jar bands stay blank). No cartoon, illustration, 3D render, CGI or plastic look. No oversaturation, HDR halos, heavy vignette, fake steam, smoke, floating ingredients, splashes, glitter or bokeh balls. No props that are not Indian home-kitchen objects. No people's faces. No extra fingers or distorted hands.

**Composition, lighting & crop:** Exactly overhead (90°), even soft light from the upper left, no hard shadows, sharp across the frame, piece size consistent across the series (an almond ≈ 1/8 of the frame width). The centre 70% must look good when cropped to a circle. **All 22 must match in light, colour temperature and scale.**

### 43. `ingredient-pumpkin` — Ingredient — Pumpkin seeds

| | |
|---|---|
| **Save to** | `public/images/ingredients/pumpkin.jpg` |
| **Size · ratio · format** | 800 × 800 px · 1:1 · JPEG q82, sRGB |
| **Background** | **None: the texture fills 100% of the frame.** No transparency needed. |
| **Placement** | `/customise/<product>` → the **Pumpkin seeds** ingredient row (88 px square) and its dish in the mix composition (circle, up to ~150 px); also the ingredient swatches on product pages, the home Custom batches list and `/customise`. Until it exists, a grainy colour swatch is shown. |
| **Variants** | Single file. Shown small, so keep pieces large enough to read at 64 px. |
| **Alt text** | Decorative: the ingredient name is always shown as text next to it. |
| **Status** | Replaces the v3 ingredient brief (which asked for heaps on a backdrop). Ingredient set expanded from 16 to 22. |

**Prompt:** Straight-down macro of green hulled pumpkin seeds, densely filling the whole frame like a bowl seen from directly above with the rim cropped out. Natural window light from the upper left, soft and directional, about 5500K; warm neutral palette of ivory, sand, ghee-gold, terracotta and brass; real Indian home-kitchen surfaces only (honed grey Kadappa stone, aged teak, unbleached hand-loom cotton, brass and matte stoneware); true-to-life colour, gentle contrast, soft shadows that keep detail; crisp focus on the food with a shallow, natural fall-off; photorealistic editorial food photography, as if shot on a full-frame camera with a 90 mm macro or 50 mm lens. No text, letters, numbers, logos, labels or watermarks anywhere (jar bands stay blank). No cartoon, illustration, 3D render, CGI or plastic look. No oversaturation, HDR halos, heavy vignette, fake steam, smoke, floating ingredients, splashes, glitter or bokeh balls. No props that are not Indian home-kitchen objects. No people's faces. No extra fingers or distorted hands.

**Composition, lighting & crop:** Exactly overhead (90°), even soft light from the upper left, no hard shadows, sharp across the frame, piece size consistent across the series (an almond ≈ 1/8 of the frame width). The centre 70% must look good when cropped to a circle. **All 22 must match in light, colour temperature and scale.**

### 44. `ingredient-flax` — Ingredient — Flax seeds (alsi)

| | |
|---|---|
| **Save to** | `public/images/ingredients/flax.jpg` |
| **Size · ratio · format** | 800 × 800 px · 1:1 · JPEG q82, sRGB |
| **Background** | **None: the texture fills 100% of the frame.** No transparency needed. |
| **Placement** | `/customise/<product>` → the **Flax seeds (alsi)** ingredient row (88 px square) and its dish in the mix composition (circle, up to ~150 px); also the ingredient swatches on product pages, the home Custom batches list and `/customise`. Until it exists, a grainy colour swatch is shown. |
| **Variants** | Single file. Shown small, so keep pieces large enough to read at 64 px. |
| **Alt text** | Decorative: the ingredient name is always shown as text next to it. |
| **Status** | Replaces the v3 ingredient brief (which asked for heaps on a backdrop). Ingredient set expanded from 16 to 22. |

**Prompt:** Straight-down macro of glossy brown flax seeds, densely filling the whole frame like a bowl seen from directly above with the rim cropped out. Natural window light from the upper left, soft and directional, about 5500K; warm neutral palette of ivory, sand, ghee-gold, terracotta and brass; real Indian home-kitchen surfaces only (honed grey Kadappa stone, aged teak, unbleached hand-loom cotton, brass and matte stoneware); true-to-life colour, gentle contrast, soft shadows that keep detail; crisp focus on the food with a shallow, natural fall-off; photorealistic editorial food photography, as if shot on a full-frame camera with a 90 mm macro or 50 mm lens. No text, letters, numbers, logos, labels or watermarks anywhere (jar bands stay blank). No cartoon, illustration, 3D render, CGI or plastic look. No oversaturation, HDR halos, heavy vignette, fake steam, smoke, floating ingredients, splashes, glitter or bokeh balls. No props that are not Indian home-kitchen objects. No people's faces. No extra fingers or distorted hands.

**Composition, lighting & crop:** Exactly overhead (90°), even soft light from the upper left, no hard shadows, sharp across the frame, piece size consistent across the series (an almond ≈ 1/8 of the frame width). The centre 70% must look good when cropped to a circle. **All 22 must match in light, colour temperature and scale.**

### 45. `ingredient-coconut` — Ingredient — Dry coconut (nariyal)

| | |
|---|---|
| **Save to** | `public/images/ingredients/coconut.jpg` |
| **Size · ratio · format** | 800 × 800 px · 1:1 · JPEG q82, sRGB |
| **Background** | **None: the texture fills 100% of the frame.** No transparency needed. |
| **Placement** | `/customise/<product>` → the **Dry coconut (nariyal)** ingredient row (88 px square) and its dish in the mix composition (circle, up to ~150 px); also the ingredient swatches on product pages, the home Custom batches list and `/customise`. Until it exists, a grainy colour swatch is shown. |
| **Variants** | Single file. Shown small, so keep pieces large enough to read at 64 px. |
| **Alt text** | Decorative: the ingredient name is always shown as text next to it. |
| **Status** | Replaces the v3 ingredient brief (which asked for heaps on a backdrop). Ingredient set expanded from 16 to 22. |

**Prompt:** Straight-down macro of finely shredded dry white coconut, densely filling the whole frame like a bowl seen from directly above with the rim cropped out. Natural window light from the upper left, soft and directional, about 5500K; warm neutral palette of ivory, sand, ghee-gold, terracotta and brass; real Indian home-kitchen surfaces only (honed grey Kadappa stone, aged teak, unbleached hand-loom cotton, brass and matte stoneware); true-to-life colour, gentle contrast, soft shadows that keep detail; crisp focus on the food with a shallow, natural fall-off; photorealistic editorial food photography, as if shot on a full-frame camera with a 90 mm macro or 50 mm lens. No text, letters, numbers, logos, labels or watermarks anywhere (jar bands stay blank). No cartoon, illustration, 3D render, CGI or plastic look. No oversaturation, HDR halos, heavy vignette, fake steam, smoke, floating ingredients, splashes, glitter or bokeh balls. No props that are not Indian home-kitchen objects. No people's faces. No extra fingers or distorted hands.

**Composition, lighting & crop:** Exactly overhead (90°), even soft light from the upper left, no hard shadows, sharp across the frame, piece size consistent across the series (an almond ≈ 1/8 of the frame width). The centre 70% must look good when cropped to a circle. **All 22 must match in light, colour temperature and scale.**

### 46. `ingredient-cardamom` — Ingredient — Green cardamom (elaichi)

| | |
|---|---|
| **Save to** | `public/images/ingredients/cardamom.jpg` |
| **Size · ratio · format** | 800 × 800 px · 1:1 · JPEG q82, sRGB |
| **Background** | **None: the texture fills 100% of the frame.** No transparency needed. |
| **Placement** | `/customise/<product>` → the **Green cardamom (elaichi)** ingredient row (88 px square) and its dish in the mix composition (circle, up to ~150 px); also the ingredient swatches on product pages, the home Custom batches list and `/customise`. Until it exists, a grainy colour swatch is shown. |
| **Variants** | Single file. Shown small, so keep pieces large enough to read at 64 px. |
| **Alt text** | Decorative: the ingredient name is always shown as text next to it. |
| **Status** | Replaces the v3 ingredient brief (which asked for heaps on a backdrop). Ingredient set expanded from 16 to 22. |

**Prompt:** Straight-down macro of green cardamom pods, a few split showing black seeds, densely filling the whole frame like a bowl seen from directly above with the rim cropped out. Natural window light from the upper left, soft and directional, about 5500K; warm neutral palette of ivory, sand, ghee-gold, terracotta and brass; real Indian home-kitchen surfaces only (honed grey Kadappa stone, aged teak, unbleached hand-loom cotton, brass and matte stoneware); true-to-life colour, gentle contrast, soft shadows that keep detail; crisp focus on the food with a shallow, natural fall-off; photorealistic editorial food photography, as if shot on a full-frame camera with a 90 mm macro or 50 mm lens. No text, letters, numbers, logos, labels or watermarks anywhere (jar bands stay blank). No cartoon, illustration, 3D render, CGI or plastic look. No oversaturation, HDR halos, heavy vignette, fake steam, smoke, floating ingredients, splashes, glitter or bokeh balls. No props that are not Indian home-kitchen objects. No people's faces. No extra fingers or distorted hands.

**Composition, lighting & crop:** Exactly overhead (90°), even soft light from the upper left, no hard shadows, sharp across the frame, piece size consistent across the series (an almond ≈ 1/8 of the frame width). The centre 70% must look good when cropped to a circle. **All 22 must match in light, colour temperature and scale.**

### 47. `ingredient-saunth` — Ingredient — Dry ginger (saunth)

| | |
|---|---|
| **Save to** | `public/images/ingredients/saunth.jpg` |
| **Size · ratio · format** | 800 × 800 px · 1:1 · JPEG q82, sRGB |
| **Background** | **None: the texture fills 100% of the frame.** No transparency needed. |
| **Placement** | `/customise/<product>` → the **Dry ginger (saunth)** ingredient row (88 px square) and its dish in the mix composition (circle, up to ~150 px); also the ingredient swatches on product pages, the home Custom batches list and `/customise`. Until it exists, a grainy colour swatch is shown. |
| **Variants** | Single file. Shown small, so keep pieces large enough to read at 64 px. |
| **Alt text** | Decorative: the ingredient name is always shown as text next to it. |
| **Status** | Replaces the v3 ingredient brief (which asked for heaps on a backdrop). Ingredient set expanded from 16 to 22. |

**Prompt:** Straight-down macro of fine pale-tan dry ginger powder with two small dried ginger pieces, densely filling the whole frame like a bowl seen from directly above with the rim cropped out. Natural window light from the upper left, soft and directional, about 5500K; warm neutral palette of ivory, sand, ghee-gold, terracotta and brass; real Indian home-kitchen surfaces only (honed grey Kadappa stone, aged teak, unbleached hand-loom cotton, brass and matte stoneware); true-to-life colour, gentle contrast, soft shadows that keep detail; crisp focus on the food with a shallow, natural fall-off; photorealistic editorial food photography, as if shot on a full-frame camera with a 90 mm macro or 50 mm lens. No text, letters, numbers, logos, labels or watermarks anywhere (jar bands stay blank). No cartoon, illustration, 3D render, CGI or plastic look. No oversaturation, HDR halos, heavy vignette, fake steam, smoke, floating ingredients, splashes, glitter or bokeh balls. No props that are not Indian home-kitchen objects. No people's faces. No extra fingers or distorted hands.

**Composition, lighting & crop:** Exactly overhead (90°), even soft light from the upper left, no hard shadows, sharp across the frame, piece size consistent across the series (an almond ≈ 1/8 of the frame width). The centre 70% must look good when cropped to a circle. **All 22 must match in light, colour temperature and scale.**

### 48. `ingredient-ajwain` — Ingredient — Carom seeds (ajwain)

| | |
|---|---|
| **Save to** | `public/images/ingredients/ajwain.jpg` |
| **Size · ratio · format** | 800 × 800 px · 1:1 · JPEG q82, sRGB |
| **Background** | **None: the texture fills 100% of the frame.** No transparency needed. |
| **Placement** | `/customise/<product>` → the **Carom seeds (ajwain)** ingredient row (88 px square) and its dish in the mix composition (circle, up to ~150 px); also the ingredient swatches on product pages, the home Custom batches list and `/customise`. Until it exists, a grainy colour swatch is shown. |
| **Variants** | Single file. Shown small, so keep pieces large enough to read at 64 px. |
| **Alt text** | Decorative: the ingredient name is always shown as text next to it. |
| **Status** | Replaces the v3 ingredient brief (which asked for heaps on a backdrop). Ingredient set expanded from 16 to 22. |

**Prompt:** Straight-down macro of small ridged greenish-brown carom seeds, densely filling the whole frame like a bowl seen from directly above with the rim cropped out. Natural window light from the upper left, soft and directional, about 5500K; warm neutral palette of ivory, sand, ghee-gold, terracotta and brass; real Indian home-kitchen surfaces only (honed grey Kadappa stone, aged teak, unbleached hand-loom cotton, brass and matte stoneware); true-to-life colour, gentle contrast, soft shadows that keep detail; crisp focus on the food with a shallow, natural fall-off; photorealistic editorial food photography, as if shot on a full-frame camera with a 90 mm macro or 50 mm lens. No text, letters, numbers, logos, labels or watermarks anywhere (jar bands stay blank). No cartoon, illustration, 3D render, CGI or plastic look. No oversaturation, HDR halos, heavy vignette, fake steam, smoke, floating ingredients, splashes, glitter or bokeh balls. No props that are not Indian home-kitchen objects. No people's faces. No extra fingers or distorted hands.

**Composition, lighting & crop:** Exactly overhead (90°), even soft light from the upper left, no hard shadows, sharp across the frame, piece size consistent across the series (an almond ≈ 1/8 of the frame width). The centre 70% must look good when cropped to a circle. **All 22 must match in light, colour temperature and scale.**

### 49. `ingredient-saffron` — Ingredient — Saffron (kesar)

| | |
|---|---|
| **Save to** | `public/images/ingredients/saffron.jpg` |
| **Size · ratio · format** | 800 × 800 px · 1:1 · JPEG q82, sRGB |
| **Background** | **None: the texture fills 100% of the frame.** No transparency needed. |
| **Placement** | `/customise/<product>` → the **Saffron (kesar)** ingredient row (88 px square) and its dish in the mix composition (circle, up to ~150 px); also the ingredient swatches on product pages, the home Custom batches list and `/customise`. Until it exists, a grainy colour swatch is shown. |
| **Variants** | Single file. Shown small, so keep pieces large enough to read at 64 px. |
| **Alt text** | Decorative: the ingredient name is always shown as text next to it. |
| **Status** | Replaces the v3 ingredient brief (which asked for heaps on a backdrop). Ingredient set expanded from 16 to 22. |

**Prompt:** Straight-down macro of deep red saffron threads loosely tangled, densely filling the whole frame like a bowl seen from directly above with the rim cropped out. Natural window light from the upper left, soft and directional, about 5500K; warm neutral palette of ivory, sand, ghee-gold, terracotta and brass; real Indian home-kitchen surfaces only (honed grey Kadappa stone, aged teak, unbleached hand-loom cotton, brass and matte stoneware); true-to-life colour, gentle contrast, soft shadows that keep detail; crisp focus on the food with a shallow, natural fall-off; photorealistic editorial food photography, as if shot on a full-frame camera with a 90 mm macro or 50 mm lens. No text, letters, numbers, logos, labels or watermarks anywhere (jar bands stay blank). No cartoon, illustration, 3D render, CGI or plastic look. No oversaturation, HDR halos, heavy vignette, fake steam, smoke, floating ingredients, splashes, glitter or bokeh balls. No props that are not Indian home-kitchen objects. No people's faces. No extra fingers or distorted hands.

**Composition, lighting & crop:** Exactly overhead (90°), even soft light from the upper left, no hard shadows, sharp across the frame, piece size consistent across the series (an almond ≈ 1/8 of the frame width). The centre 70% must look good when cropped to a circle. **All 22 must match in light, colour temperature and scale.**

## E. Supporting images

### 50. `home-customise` — Custom batches feature

| | |
|---|---|
| **Save to** | `public/images/home/customise.jpg` |
| **Size · ratio · format** | 1600 × 1200 px · 4:3 · JPEG q82, sRGB |
| **Background** | Full-bleed photograph. |
| **Placement** | Home → “Custom batches” section, image beside the list of customisable products. |
| **Variants** | Single file (stacks above the text on phones). |
| **Alt text** | “Small brass bowls of almonds, cashews, raisins, makhana and cardamom arranged around a bowl of roasted panjiri” (in code). |
| **Status** | Replaces the v3 brief (new composition). |

**Prompt:** Overhead flat lay on aged teak: a shallow brass paraat of freshly roasted panjiri in the centre, surrounded by small brass katoris of almonds, cashews, pistachio slivers, raisins, makhana, melon seeds, cardamom and a pinch of saffron, a small steel measuring scoop and a brass kitchen scale pan at the edge. Natural window light from the upper left, soft and directional, about 5500K; warm neutral palette of ivory, sand, ghee-gold, terracotta and brass; real Indian home-kitchen surfaces only (honed grey Kadappa stone, aged teak, unbleached hand-loom cotton, brass and matte stoneware); true-to-life colour, gentle contrast, soft shadows that keep detail; crisp focus on the food with a shallow, natural fall-off; photorealistic editorial food photography, as if shot on a full-frame camera with a 90 mm macro or 50 mm lens. No text, letters, numbers, logos, labels or watermarks anywhere (jar bands stay blank). No cartoon, illustration, 3D render, CGI or plastic look. No oversaturation, HDR halos, heavy vignette, fake steam, smoke, floating ingredients, splashes, glitter or bokeh balls. No props that are not Indian home-kitchen objects. No people's faces. No extra fingers or distorted hands.

**Composition, lighting & crop:** Exactly overhead, paraat slightly left of centre, katoris on an even arc, generous spacing, soft directional light. Should read as ‘a recipe being weighed out’, calm and orderly.

### 51. `story-hero` — Our story — hero

| | |
|---|---|
| **Save to** | `public/images/story/hero.jpg` |
| **Size · ratio · format** | 2400 × 1050 px · 16:7 · JPEG q82, sRGB |
| **Background** | Full-bleed photograph. |
| **Placement** | `/our-story` → wide image under the title. |
| **Variants** | Single file; it is cropped to centre on phones, so keep subjects central. |
| **Alt text** | “Two generations of a family standing together in their home kitchen” (in code). Replace with the real family's photo before launch. |
| **Status** | Existing slot, unchanged path. |

**Prompt:** Two generations of an Indian family, an older mother and her adult daughter, seen from behind and in soft profile at a kitchen counter, pressing pinni together, warm daylight from a window. Natural window light from the upper left, soft and directional, about 5500K; warm neutral palette of ivory, sand, ghee-gold, terracotta and brass; real Indian home-kitchen surfaces only (honed grey Kadappa stone, aged teak, unbleached hand-loom cotton, brass and matte stoneware); true-to-life colour, gentle contrast, soft shadows that keep detail; crisp focus on the food with a shallow, natural fall-off; photorealistic editorial food photography, as if shot on a full-frame camera with a 90 mm macro or 50 mm lens. No text, letters, numbers, logos, labels or watermarks anywhere (jar bands stay blank). No cartoon, illustration, 3D render, CGI or plastic look. No oversaturation, HDR halos, heavy vignette, fake steam, smoke, floating ingredients, splashes, glitter or bokeh balls. No props that are not Indian home-kitchen objects. No people's faces. No extra fingers or distorted hands.

**Composition, lighting & crop:** Subjects in the central third, faces turned away or in soft profile only, kitchen softly out of focus.

### 52. `story-roasting` — Our story — roasting

| | |
|---|---|
| **Save to** | `public/images/story/roasting.jpg` |
| **Size · ratio · format** | 1200 × 1500 px · 4:5 · JPEG q82, sRGB |
| **Background** | Full-bleed photograph. |
| **Placement** | `/our-story` → row of three photos under the timeline. |
| **Variants** | Single file. |
| **Alt text** | “Wholewheat flour being stirred in a kadhai until golden” (in code). |
| **Status** | Existing slot; story-rolling now shows **pinni** instead of laddus. |

**Prompt:** Close-up of a wooden spatula stirring wholewheat flour in a heavy iron kadhai as it turns golden in ghee, flame just visible below. Natural window light from the upper left, soft and directional, about 5500K; warm neutral palette of ivory, sand, ghee-gold, terracotta and brass; real Indian home-kitchen surfaces only (honed grey Kadappa stone, aged teak, unbleached hand-loom cotton, brass and matte stoneware); true-to-life colour, gentle contrast, soft shadows that keep detail; crisp focus on the food with a shallow, natural fall-off; photorealistic editorial food photography, as if shot on a full-frame camera with a 90 mm macro or 50 mm lens. No text, letters, numbers, logos, labels or watermarks anywhere (jar bands stay blank). No cartoon, illustration, 3D render, CGI or plastic look. No oversaturation, HDR halos, heavy vignette, fake steam, smoke, floating ingredients, splashes, glitter or bokeh balls. No props that are not Indian home-kitchen objects. No people's faces. No extra fingers or distorted hands.

**Composition, lighting & crop:** Match light and palette across all three; hands only.

### 53. `story-rolling` — Our story — rolling

| | |
|---|---|
| **Save to** | `public/images/story/rolling.jpg` |
| **Size · ratio · format** | 1200 × 1500 px · 4:5 · JPEG q82, sRGB |
| **Background** | Full-bleed photograph. |
| **Placement** | `/our-story` → row of three photos under the timeline. |
| **Variants** | Single file. |
| **Alt text** | “Hands pressing pinni one at a time” (in code). |
| **Status** | Existing slot; story-rolling now shows **pinni** instead of laddus. |

**Prompt:** Close-up of two hands pressing a pinni between the palms, a steel tray of finished pinni beside them. Natural window light from the upper left, soft and directional, about 5500K; warm neutral palette of ivory, sand, ghee-gold, terracotta and brass; real Indian home-kitchen surfaces only (honed grey Kadappa stone, aged teak, unbleached hand-loom cotton, brass and matte stoneware); true-to-life colour, gentle contrast, soft shadows that keep detail; crisp focus on the food with a shallow, natural fall-off; photorealistic editorial food photography, as if shot on a full-frame camera with a 90 mm macro or 50 mm lens. No text, letters, numbers, logos, labels or watermarks anywhere (jar bands stay blank). No cartoon, illustration, 3D render, CGI or plastic look. No oversaturation, HDR halos, heavy vignette, fake steam, smoke, floating ingredients, splashes, glitter or bokeh balls. No props that are not Indian home-kitchen objects. No people's faces. No extra fingers or distorted hands.

**Composition, lighting & crop:** Match light and palette across all three; hands only.

### 54. `story-packing` — Our story — packing

| | |
|---|---|
| **Save to** | `public/images/story/packing.jpg` |
| **Size · ratio · format** | 1200 × 1500 px · 4:5 · JPEG q82, sRGB |
| **Background** | Full-bleed photograph. |
| **Placement** | `/our-story` → row of three photos under the timeline. |
| **Variants** | Single file. |
| **Alt text** | “Glass jars of panjiri being filled and sealed on a wooden table” (in code). |
| **Status** | Existing slot; story-rolling now shows **pinni** instead of laddus. |

**Prompt:** Glass jars with blank kraft bands being filled with panjiri using a steel scoop on a teak table. Natural window light from the upper left, soft and directional, about 5500K; warm neutral palette of ivory, sand, ghee-gold, terracotta and brass; real Indian home-kitchen surfaces only (honed grey Kadappa stone, aged teak, unbleached hand-loom cotton, brass and matte stoneware); true-to-life colour, gentle contrast, soft shadows that keep detail; crisp focus on the food with a shallow, natural fall-off; photorealistic editorial food photography, as if shot on a full-frame camera with a 90 mm macro or 50 mm lens. No text, letters, numbers, logos, labels or watermarks anywhere (jar bands stay blank). No cartoon, illustration, 3D render, CGI or plastic look. No oversaturation, HDR halos, heavy vignette, fake steam, smoke, floating ingredients, splashes, glitter or bokeh balls. No props that are not Indian home-kitchen objects. No people's faces. No extra fingers or distorted hands.

**Composition, lighting & crop:** Match light and palette across all three; hands only.

### 55. `og` — Social share image

| | |
|---|---|
| **Save to** | `public/images/og.jpg` |
| **Size · ratio · format** | 1200 × 630 px · 1.91:1 · JPEG q85, sRGB |
| **Background** | Full-bleed photograph. |
| **Placement** | Not on a page: Open Graph / WhatsApp / X preview for every page. `src/app/layout.tsx` picks it up automatically. |
| **Variants** | Single file. |
| **Alt text** | Not shown on the page. |
| **Status** | Existing slot. |

**Prompt:** The hero scene (three jars, brass bowl of panjiri) reframed wide, with the group in the right two-thirds. Natural window light from the upper left, soft and directional, about 5500K; warm neutral palette of ivory, sand, ghee-gold, terracotta and brass; real Indian home-kitchen surfaces only (honed grey Kadappa stone, aged teak, unbleached hand-loom cotton, brass and matte stoneware); true-to-life colour, gentle contrast, soft shadows that keep detail; crisp focus on the food with a shallow, natural fall-off; photorealistic editorial food photography, as if shot on a full-frame camera with a 90 mm macro or 50 mm lens. No text, letters, numbers, logos, labels or watermarks anywhere (jar bands stay blank). No cartoon, illustration, 3D render, CGI or plastic look. No oversaturation, HDR halos, heavy vignette, fake steam, smoke, floating ingredients, splashes, glitter or bokeh balls. No props that are not Indian home-kitchen objects. No people's faces. No extra fingers or distorted hands.

**Composition, lighting & crop:** Leave the left third calm (platforms overlay titles). No text in the image.

