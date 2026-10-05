# Image brief for Codex — Immunitywize (v5)

Every photograph the v5 (“Mithai-shop modern”) store needs: **66 images** (65 in use; `category-mixes` is deferred). Each entry gives the exact path, prompt, size, background, crop guidance, where it appears, variants, alt text, and whether it replaces an earlier brief.

## Asset status — read this first

- **No photographs have been created yet.** Every image slot currently renders a placeholder. Product, category, story and hero slots show a soft studio-backdrop frame at the final size; ingredient slots show a grainy colour swatch in the ingredient's colour. Layout never shifts when a photo is added.
- The only image files in the repo are `public/favicon.svg` and `public/og-placeholder.svg` (temporary).
- The scroll-drawn kitchen illustration on the home page is code (SVG), not an image asset. It needs nothing from this file.

## How to deliver (Codex)

1. Work in order: **C → B → E → D**. The three hero arches (C), the packshots (B) and the occasion arches (E) matter most.
2. Generate at the largest supported size near the target ratio, **centre-crop to the exact ratio, then resize** to the listed size. Don't upscale more than 1.6×.
3. Save as JPEG (quality 82, sRGB) at the exact path. `.webp` or `.avif` with the same name also works. Create folders as needed.
4. **Don't edit code.** Images are found by path. Then run:
   ```bash
   pnpm images:manifest   # also runs automatically before dev/build
   pnpm build && pnpm start
   ```
   Check `/`, `/shop`, `/shop/classic-panjiri`, `/shop/winter-trio`, `/customise`, `/customise/classic-panjiri` (watch the mix composition) and `/our-story`.
   Arch-framed slots (hero, occasions, story, `/customise` chooser) are clipped to a rounded-top arch by CSS: keep the subject inside the lower 80% and away from the top corners.
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
| `home-hero`, `home-hero-mobile` (`public/images/home/hero*.jpg`) | v5 hero uses three arch-framed category photos instead (section C). Don't generate. |
| `public/images/categories/gift-boxes.jpg`, `categories/mixes.jpg` | Not shown anywhere in v5 (gift boxes use their own product photos; the hero shows Panjiri, Pinni and Laddus only). Deferred. |
| v4 product specs at 4:5 | Superseded: product images are now shown **1:1** (cards, gallery, cart). Same paths, regenerate square. |
| v4 category specs at 1:1 | Superseded: categories now appear only as hero arches at **4:5**. |
| v3 ingredient specs (heap on a sand backdrop) | Superseded: ingredient images must now be full-bleed textures (section D). Same paths, so regenerate. |
| Any request for jars, bowls or drawn ingredients as illustrations | The redesign uses photography only; drawings were removed. |

## Where each image appears

| Page / component | Image ids |
|---|---|
| Home → hero (three arch windows) | `category-panjiri`, `category-pinni`, `category-laddus` |
| Product cards (home, shop, related), search, cart, cart drawer, `/customise` chooser | `<product>-1`; `<product>-2` on card hover |
| Product page gallery `/shop/<product>` | `<product>-1`, `-2`, `-3` |
| Home → Shop by occasion (arches) | `occasion-immunity`, `-postpartum`, `-clarity`, `-wellness`, `-bone` |
| Home → Gift boxes | `home-gifting`; gift-box products use `winter-trio-*`, `new-mother-box-*` |
| Home → Our story teaser | `home-story` |
| `/customise` chooser (4:5 arch crop of the square packshot) | `<product>-1` |
| Custom-batch builder rows + mix composition; ingredient swatches site-wide | `ingredient-*` (22) |
| Home → Custom batches | `home-customise` |
| Our story | `story-hero`, `story-roasting`, `story-rolling`, `story-packing` |
| Social previews | `og` |

---

## B. Product photography (27 images, 3 per product)

### 1. `classic-panjiri-1` — Ghar ki Panjiri — packshot

| | |
|---|---|
| **Save to** | `public/images/products/classic-panjiri/1.jpg` |
| **Size · ratio · format** | 1500 × 1500 px · 1:1 · JPEG q82, sRGB |
| **Background** | Seamless warm sand paper sweep (#EFE7DA), no transparency. |
| **Placement** | Main product image: product cards (home Bestsellers, `/shop`, “You may also like”), search results, cart drawer and cart thumbnails, and image 1 of the gallery on `/shop/classic-panjiri`. Customisable products also show this image on the Custom batches chooser (`/customise`). |
| **Variants** | One file serves desktop and mobile (square everywhere; the `/customise` chooser centre-crops image 1 to a 4:5 arch, so keep the jar centred). |
| **Alt text** | Alt: “Ghar ki Panjiri in a glass jar” (in code). |
| **Status** | Replaces the v4 brief (same path; now **1:1**). |

**Prompt:** Studio packshot of a clear cylindrical glass jar with a brushed brass screw lid and a plain blank kraft-paper band, filled with coarse golden-brown roasted wholewheat crumble with visible slivers of almond and cashew and a few raisins; a small spill of the product in front of the jar. Natural window light from the upper left, soft and directional, about 5500K; warm neutral palette of ivory, sand, ghee-gold, terracotta and brass; real Indian home-kitchen surfaces only (honed grey Kadappa stone, aged teak, unbleached hand-loom cotton, brass and matte stoneware); true-to-life colour, gentle contrast, soft shadows that keep detail; crisp focus on the food with a shallow, natural fall-off; photorealistic editorial food photography, as if shot on a full-frame camera with a 90 mm macro or 50 mm lens. No text, letters, numbers, logos, labels or watermarks anywhere (jar bands stay blank). No cartoon, illustration, 3D render, CGI or plastic look. No oversaturation, HDR halos, heavy vignette, fake steam, smoke, floating ingredients, splashes, glitter or bokeh balls. No props that are not Indian home-kitchen objects. No people's faces. No extra fingers or distorted hands.

**Composition, lighting & crop:** Straight-on, camera at jar mid-height, jar centred and ~62% of the frame height, base ~18% from the bottom edge. Soft key light from upper left, white bounce right, soft contact shadow. **Identical jar, angle, backdrop, light and scale across all seven products.** Keep the top-left 25% calm: badges overlay there.

### 2. `classic-panjiri-2` — Ghar ki Panjiri — texture

| | |
|---|---|
| **Save to** | `public/images/products/classic-panjiri/2.jpg` |
| **Size · ratio · format** | 1500 × 1500 px · 1:1 · JPEG q82, sRGB |
| **Background** | Full-bleed photograph. |
| **Placement** | Product-card **hover** image (desktop pointer only) and gallery image 2 on `/shop/classic-panjiri`. |
| **Variants** | Single file. |
| **Alt text** | Alt: “Close-up of Ghar ki Panjiri” (in code). |
| **Status** | Replaces the v3 brief. |

**Prompt:** Top-down macro of coarse golden-brown roasted wholewheat crumble with visible slivers of almond and cashew and a few raisins heaped in a small matte stoneware or brass katori on hand-loom cotton. Natural window light from the upper left, soft and directional, about 5500K; warm neutral palette of ivory, sand, ghee-gold, terracotta and brass; real Indian home-kitchen surfaces only (honed grey Kadappa stone, aged teak, unbleached hand-loom cotton, brass and matte stoneware); true-to-life colour, gentle contrast, soft shadows that keep detail; crisp focus on the food with a shallow, natural fall-off; photorealistic editorial food photography, as if shot on a full-frame camera with a 90 mm macro or 50 mm lens. No text, letters, numbers, logos, labels or watermarks anywhere (jar bands stay blank). No cartoon, illustration, 3D render, CGI or plastic look. No oversaturation, HDR halos, heavy vignette, fake steam, smoke, floating ingredients, splashes, glitter or bokeh balls. No props that are not Indian home-kitchen objects. No people's faces. No extra fingers or distorted hands.

**Composition, lighting & crop:** Overhead, katori fills ~80% of the frame, crisp texture front to back, shadows soft. Colour must match the packshot exactly.

### 3. `classic-panjiri-3` — Ghar ki Panjiri — served

| | |
|---|---|
| **Save to** | `public/images/products/classic-panjiri/3.jpg` |
| **Size · ratio · format** | 1500 × 1500 px · 1:1 · JPEG q82, sRGB |
| **Background** | Full-bleed photograph. |
| **Placement** | Gallery image 3 on `/shop/classic-panjiri`. |
| **Variants** | Single file. |
| **Alt text** | Alt: “Ghar ki Panjiri served with chai” (in code). |
| **Status** | Replaces the v3 brief. |

**Prompt:** Coarse golden-brown roasted wholewheat crumble with visible slivers of almond and cashew and a few raisins served in a small stoneware bowl on an aged teak table beside a steel tumbler of masala chai on a brass saucer; one hand enters from the right edge holding a spoon (no face, no jewellery). Natural window light from the upper left, soft and directional, about 5500K; warm neutral palette of ivory, sand, ghee-gold, terracotta and brass; real Indian home-kitchen surfaces only (honed grey Kadappa stone, aged teak, unbleached hand-loom cotton, brass and matte stoneware); true-to-life colour, gentle contrast, soft shadows that keep detail; crisp focus on the food with a shallow, natural fall-off; photorealistic editorial food photography, as if shot on a full-frame camera with a 90 mm macro or 50 mm lens. No text, letters, numbers, logos, labels or watermarks anywhere (jar bands stay blank). No cartoon, illustration, 3D render, CGI or plastic look. No oversaturation, HDR halos, heavy vignette, fake steam, smoke, floating ingredients, splashes, glitter or bokeh balls. No props that are not Indian home-kitchen objects. No people's faces. No extra fingers or distorted hands.

**Composition, lighting & crop:** 45° angle, bowl on the left third, tumbler right, generous negative space at top. Warm morning light.

### 4. `mothers-panjiri-1` — Panjiri for New Mothers — packshot

| | |
|---|---|
| **Save to** | `public/images/products/mothers-panjiri/1.jpg` |
| **Size · ratio · format** | 1500 × 1500 px · 1:1 · JPEG q82, sRGB |
| **Background** | Seamless warm sand paper sweep (#EFE7DA), no transparency. |
| **Placement** | Main product image: product cards (home Bestsellers, `/shop`, “You may also like”), search results, cart drawer and cart thumbnails, and image 1 of the gallery on `/shop/mothers-panjiri`. Customisable products also show this image on the Custom batches chooser (`/customise`). |
| **Variants** | One file serves desktop and mobile (square everywhere; the `/customise` chooser centre-crops image 1 to a 4:5 arch, so keep the jar centred). |
| **Alt text** | Alt: “Panjiri for New Mothers in a glass jar” (in code). |
| **Status** | Replaces the v4 brief (same path; now **1:1**). |

**Prompt:** Studio packshot of a clear cylindrical glass jar with a brushed brass screw lid and a plain blank kraft-paper band, filled with a richer, darker roasted crumble flecked with chopped almond, walnut, melon seeds and puffed edible gum; a small spill of the product in front of the jar. Natural window light from the upper left, soft and directional, about 5500K; warm neutral palette of ivory, sand, ghee-gold, terracotta and brass; real Indian home-kitchen surfaces only (honed grey Kadappa stone, aged teak, unbleached hand-loom cotton, brass and matte stoneware); true-to-life colour, gentle contrast, soft shadows that keep detail; crisp focus on the food with a shallow, natural fall-off; photorealistic editorial food photography, as if shot on a full-frame camera with a 90 mm macro or 50 mm lens. No text, letters, numbers, logos, labels or watermarks anywhere (jar bands stay blank). No cartoon, illustration, 3D render, CGI or plastic look. No oversaturation, HDR halos, heavy vignette, fake steam, smoke, floating ingredients, splashes, glitter or bokeh balls. No props that are not Indian home-kitchen objects. No people's faces. No extra fingers or distorted hands.

**Composition, lighting & crop:** Straight-on, camera at jar mid-height, jar centred and ~62% of the frame height, base ~18% from the bottom edge. Soft key light from upper left, white bounce right, soft contact shadow. **Identical jar, angle, backdrop, light and scale across all seven products.** Keep the top-left 25% calm: badges overlay there.

### 5. `mothers-panjiri-2` — Panjiri for New Mothers — texture

| | |
|---|---|
| **Save to** | `public/images/products/mothers-panjiri/2.jpg` |
| **Size · ratio · format** | 1500 × 1500 px · 1:1 · JPEG q82, sRGB |
| **Background** | Full-bleed photograph. |
| **Placement** | Product-card **hover** image (desktop pointer only) and gallery image 2 on `/shop/mothers-panjiri`. |
| **Variants** | Single file. |
| **Alt text** | Alt: “Close-up of Panjiri for New Mothers” (in code). |
| **Status** | Replaces the v3 brief. |

**Prompt:** Top-down macro of a richer, darker roasted crumble flecked with chopped almond, walnut, melon seeds and puffed edible gum heaped in a small matte stoneware or brass katori on hand-loom cotton. Natural window light from the upper left, soft and directional, about 5500K; warm neutral palette of ivory, sand, ghee-gold, terracotta and brass; real Indian home-kitchen surfaces only (honed grey Kadappa stone, aged teak, unbleached hand-loom cotton, brass and matte stoneware); true-to-life colour, gentle contrast, soft shadows that keep detail; crisp focus on the food with a shallow, natural fall-off; photorealistic editorial food photography, as if shot on a full-frame camera with a 90 mm macro or 50 mm lens. No text, letters, numbers, logos, labels or watermarks anywhere (jar bands stay blank). No cartoon, illustration, 3D render, CGI or plastic look. No oversaturation, HDR halos, heavy vignette, fake steam, smoke, floating ingredients, splashes, glitter or bokeh balls. No props that are not Indian home-kitchen objects. No people's faces. No extra fingers or distorted hands.

**Composition, lighting & crop:** Overhead, katori fills ~80% of the frame, crisp texture front to back, shadows soft. Colour must match the packshot exactly.

### 6. `mothers-panjiri-3` — Panjiri for New Mothers — served

| | |
|---|---|
| **Save to** | `public/images/products/mothers-panjiri/3.jpg` |
| **Size · ratio · format** | 1500 × 1500 px · 1:1 · JPEG q82, sRGB |
| **Background** | Full-bleed photograph. |
| **Placement** | Gallery image 3 on `/shop/mothers-panjiri`. |
| **Variants** | Single file. |
| **Alt text** | Alt: “Panjiri for New Mothers served with chai” (in code). |
| **Status** | Replaces the v3 brief. |

**Prompt:** A richer, darker roasted crumble flecked with chopped almond, walnut, melon seeds and puffed edible gum served in a small stoneware bowl on an aged teak table beside a steel tumbler of masala chai on a brass saucer; one hand enters from the right edge holding a spoon (no face, no jewellery). Natural window light from the upper left, soft and directional, about 5500K; warm neutral palette of ivory, sand, ghee-gold, terracotta and brass; real Indian home-kitchen surfaces only (honed grey Kadappa stone, aged teak, unbleached hand-loom cotton, brass and matte stoneware); true-to-life colour, gentle contrast, soft shadows that keep detail; crisp focus on the food with a shallow, natural fall-off; photorealistic editorial food photography, as if shot on a full-frame camera with a 90 mm macro or 50 mm lens. No text, letters, numbers, logos, labels or watermarks anywhere (jar bands stay blank). No cartoon, illustration, 3D render, CGI or plastic look. No oversaturation, HDR halos, heavy vignette, fake steam, smoke, floating ingredients, splashes, glitter or bokeh balls. No props that are not Indian home-kitchen objects. No people's faces. No extra fingers or distorted hands.

**Composition, lighting & crop:** 45° angle, bowl on the left third, tumbler right, generous negative space at top. Warm morning light.

### 7. `atta-pinni-1` — Atta Pinni — packshot

| | |
|---|---|
| **Save to** | `public/images/products/atta-pinni/1.jpg` |
| **Size · ratio · format** | 1500 × 1500 px · 1:1 · JPEG q82, sRGB |
| **Background** | Seamless warm sand paper sweep (#EFE7DA), no transparency. |
| **Placement** | Main product image: product cards (home Bestsellers, `/shop`, “You may also like”), search results, cart drawer and cart thumbnails, and image 1 of the gallery on `/shop/atta-pinni`. Customisable products also show this image on the Custom batches chooser (`/customise`). |
| **Variants** | One file serves desktop and mobile (square everywhere; the `/customise` chooser centre-crops image 1 to a 4:5 arch, so keep the jar centred). |
| **Alt text** | Alt: “Atta Pinni in a glass jar” (in code). |
| **Status** | Replaces the v4 brief (same path; now **1:1**). |

**Prompt:** Studio packshot of a clear cylindrical glass jar with a brushed brass screw lid and a plain blank kraft-paper band, filled with dense round hand-pressed pinni, golden brown and slightly crumbly, with soft finger-press marks and almond slivers on top; a small spill of the product in front of the jar. Natural window light from the upper left, soft and directional, about 5500K; warm neutral palette of ivory, sand, ghee-gold, terracotta and brass; real Indian home-kitchen surfaces only (honed grey Kadappa stone, aged teak, unbleached hand-loom cotton, brass and matte stoneware); true-to-life colour, gentle contrast, soft shadows that keep detail; crisp focus on the food with a shallow, natural fall-off; photorealistic editorial food photography, as if shot on a full-frame camera with a 90 mm macro or 50 mm lens. No text, letters, numbers, logos, labels or watermarks anywhere (jar bands stay blank). No cartoon, illustration, 3D render, CGI or plastic look. No oversaturation, HDR halos, heavy vignette, fake steam, smoke, floating ingredients, splashes, glitter or bokeh balls. No props that are not Indian home-kitchen objects. No people's faces. No extra fingers or distorted hands.

**Composition, lighting & crop:** Straight-on, camera at jar mid-height, jar centred and ~62% of the frame height, base ~18% from the bottom edge. Soft key light from upper left, white bounce right, soft contact shadow. **Identical jar, angle, backdrop, light and scale across all seven products.** Keep the top-left 25% calm: badges overlay there.

### 8. `atta-pinni-2` — Atta Pinni — texture

| | |
|---|---|
| **Save to** | `public/images/products/atta-pinni/2.jpg` |
| **Size · ratio · format** | 1500 × 1500 px · 1:1 · JPEG q82, sRGB |
| **Background** | Full-bleed photograph. |
| **Placement** | Product-card **hover** image (desktop pointer only) and gallery image 2 on `/shop/atta-pinni`. |
| **Variants** | Single file. |
| **Alt text** | Alt: “Close-up of Atta Pinni” (in code). |
| **Status** | Replaces the v3 brief. |

**Prompt:** Top-down macro of dense round hand-pressed pinni, golden brown and slightly crumbly, with soft finger-press marks and almond slivers on top heaped in a small matte stoneware or brass katori on hand-loom cotton. Natural window light from the upper left, soft and directional, about 5500K; warm neutral palette of ivory, sand, ghee-gold, terracotta and brass; real Indian home-kitchen surfaces only (honed grey Kadappa stone, aged teak, unbleached hand-loom cotton, brass and matte stoneware); true-to-life colour, gentle contrast, soft shadows that keep detail; crisp focus on the food with a shallow, natural fall-off; photorealistic editorial food photography, as if shot on a full-frame camera with a 90 mm macro or 50 mm lens. No text, letters, numbers, logos, labels or watermarks anywhere (jar bands stay blank). No cartoon, illustration, 3D render, CGI or plastic look. No oversaturation, HDR halos, heavy vignette, fake steam, smoke, floating ingredients, splashes, glitter or bokeh balls. No props that are not Indian home-kitchen objects. No people's faces. No extra fingers or distorted hands.

**Composition, lighting & crop:** Overhead, katori fills ~80% of the frame, crisp texture front to back, shadows soft. Colour must match the packshot exactly.

### 9. `atta-pinni-3` — Atta Pinni — served

| | |
|---|---|
| **Save to** | `public/images/products/atta-pinni/3.jpg` |
| **Size · ratio · format** | 1500 × 1500 px · 1:1 · JPEG q82, sRGB |
| **Background** | Full-bleed photograph. |
| **Placement** | Gallery image 3 on `/shop/atta-pinni`. |
| **Variants** | Single file. |
| **Alt text** | Alt: “Atta Pinni served with chai” (in code). |
| **Status** | Replaces the v3 brief. |

**Prompt:** Dense round hand-pressed pinni, golden brown and slightly crumbly, with soft finger-press marks and almond slivers on top served in a small stoneware bowl on an aged teak table beside a steel tumbler of masala chai on a brass saucer; one hand enters from the right edge holding a spoon (no face, no jewellery). Natural window light from the upper left, soft and directional, about 5500K; warm neutral palette of ivory, sand, ghee-gold, terracotta and brass; real Indian home-kitchen surfaces only (honed grey Kadappa stone, aged teak, unbleached hand-loom cotton, brass and matte stoneware); true-to-life colour, gentle contrast, soft shadows that keep detail; crisp focus on the food with a shallow, natural fall-off; photorealistic editorial food photography, as if shot on a full-frame camera with a 90 mm macro or 50 mm lens. No text, letters, numbers, logos, labels or watermarks anywhere (jar bands stay blank). No cartoon, illustration, 3D render, CGI or plastic look. No oversaturation, HDR halos, heavy vignette, fake steam, smoke, floating ingredients, splashes, glitter or bokeh balls. No props that are not Indian home-kitchen objects. No people's faces. No extra fingers or distorted hands.

**Composition, lighting & crop:** 45° angle, bowl on the left third, tumbler right, generous negative space at top. Warm morning light.

### 10. `dry-fruit-laddu-1` — Dry-Fruit Laddu — packshot

| | |
|---|---|
| **Save to** | `public/images/products/dry-fruit-laddu/1.jpg` |
| **Size · ratio · format** | 1500 × 1500 px · 1:1 · JPEG q82, sRGB |
| **Background** | Seamless warm sand paper sweep (#EFE7DA), no transparency. |
| **Placement** | Main product image: product cards (home Bestsellers, `/shop`, “You may also like”), search results, cart drawer and cart thumbnails, and image 1 of the gallery on `/shop/dry-fruit-laddu`. |
| **Variants** | One file serves desktop and mobile (square everywhere; the `/customise` chooser centre-crops image 1 to a 4:5 arch, so keep the jar centred). |
| **Alt text** | Alt: “Dry-Fruit Laddu in a glass jar” (in code). |
| **Status** | Replaces the v4 brief (same path; now **1:1**). |

**Prompt:** Studio packshot of a clear cylindrical glass jar with a brushed brass screw lid and a plain blank kraft-paper band, filled with deep brown glossy laddus of finely chopped dates studded with pistachio and almond; a small spill of the product in front of the jar. Natural window light from the upper left, soft and directional, about 5500K; warm neutral palette of ivory, sand, ghee-gold, terracotta and brass; real Indian home-kitchen surfaces only (honed grey Kadappa stone, aged teak, unbleached hand-loom cotton, brass and matte stoneware); true-to-life colour, gentle contrast, soft shadows that keep detail; crisp focus on the food with a shallow, natural fall-off; photorealistic editorial food photography, as if shot on a full-frame camera with a 90 mm macro or 50 mm lens. No text, letters, numbers, logos, labels or watermarks anywhere (jar bands stay blank). No cartoon, illustration, 3D render, CGI or plastic look. No oversaturation, HDR halos, heavy vignette, fake steam, smoke, floating ingredients, splashes, glitter or bokeh balls. No props that are not Indian home-kitchen objects. No people's faces. No extra fingers or distorted hands.

**Composition, lighting & crop:** Straight-on, camera at jar mid-height, jar centred and ~62% of the frame height, base ~18% from the bottom edge. Soft key light from upper left, white bounce right, soft contact shadow. **Identical jar, angle, backdrop, light and scale across all seven products.** Keep the top-left 25% calm: badges overlay there.

### 11. `dry-fruit-laddu-2` — Dry-Fruit Laddu — texture

| | |
|---|---|
| **Save to** | `public/images/products/dry-fruit-laddu/2.jpg` |
| **Size · ratio · format** | 1500 × 1500 px · 1:1 · JPEG q82, sRGB |
| **Background** | Full-bleed photograph. |
| **Placement** | Product-card **hover** image (desktop pointer only) and gallery image 2 on `/shop/dry-fruit-laddu`. |
| **Variants** | Single file. |
| **Alt text** | Alt: “Close-up of Dry-Fruit Laddu” (in code). |
| **Status** | Replaces the v3 brief. |

**Prompt:** Top-down macro of deep brown glossy laddus of finely chopped dates studded with pistachio and almond heaped in a small matte stoneware or brass katori on hand-loom cotton. Natural window light from the upper left, soft and directional, about 5500K; warm neutral palette of ivory, sand, ghee-gold, terracotta and brass; real Indian home-kitchen surfaces only (honed grey Kadappa stone, aged teak, unbleached hand-loom cotton, brass and matte stoneware); true-to-life colour, gentle contrast, soft shadows that keep detail; crisp focus on the food with a shallow, natural fall-off; photorealistic editorial food photography, as if shot on a full-frame camera with a 90 mm macro or 50 mm lens. No text, letters, numbers, logos, labels or watermarks anywhere (jar bands stay blank). No cartoon, illustration, 3D render, CGI or plastic look. No oversaturation, HDR halos, heavy vignette, fake steam, smoke, floating ingredients, splashes, glitter or bokeh balls. No props that are not Indian home-kitchen objects. No people's faces. No extra fingers or distorted hands.

**Composition, lighting & crop:** Overhead, katori fills ~80% of the frame, crisp texture front to back, shadows soft. Colour must match the packshot exactly.

### 12. `dry-fruit-laddu-3` — Dry-Fruit Laddu — served

| | |
|---|---|
| **Save to** | `public/images/products/dry-fruit-laddu/3.jpg` |
| **Size · ratio · format** | 1500 × 1500 px · 1:1 · JPEG q82, sRGB |
| **Background** | Full-bleed photograph. |
| **Placement** | Gallery image 3 on `/shop/dry-fruit-laddu`. |
| **Variants** | Single file. |
| **Alt text** | Alt: “Dry-Fruit Laddu served with chai” (in code). |
| **Status** | Replaces the v3 brief. |

**Prompt:** Deep brown glossy laddus of finely chopped dates studded with pistachio and almond served in a small stoneware bowl on an aged teak table beside a steel tumbler of masala chai on a brass saucer; one hand enters from the right edge holding a spoon (no face, no jewellery). Natural window light from the upper left, soft and directional, about 5500K; warm neutral palette of ivory, sand, ghee-gold, terracotta and brass; real Indian home-kitchen surfaces only (honed grey Kadappa stone, aged teak, unbleached hand-loom cotton, brass and matte stoneware); true-to-life colour, gentle contrast, soft shadows that keep detail; crisp focus on the food with a shallow, natural fall-off; photorealistic editorial food photography, as if shot on a full-frame camera with a 90 mm macro or 50 mm lens. No text, letters, numbers, logos, labels or watermarks anywhere (jar bands stay blank). No cartoon, illustration, 3D render, CGI or plastic look. No oversaturation, HDR halos, heavy vignette, fake steam, smoke, floating ingredients, splashes, glitter or bokeh balls. No props that are not Indian home-kitchen objects. No people's faces. No extra fingers or distorted hands.

**Composition, lighting & crop:** 45° angle, bowl on the left third, tumbler right, generous negative space at top. Warm morning light.

### 13. `seasonal-laddu-1` — Seasonal Laddu — packshot

| | |
|---|---|
| **Save to** | `public/images/products/seasonal-laddu/1.jpg` |
| **Size · ratio · format** | 1500 × 1500 px · 1:1 · JPEG q82, sRGB |
| **Background** | Seamless warm sand paper sweep (#EFE7DA), no transparency. |
| **Placement** | Main product image: product cards (home Bestsellers, `/shop`, “You may also like”), search results, cart drawer and cart thumbnails, and image 1 of the gallery on `/shop/seasonal-laddu`. |
| **Variants** | One file serves desktop and mobile (square everywhere; the `/customise` chooser centre-crops image 1 to a 4:5 arch, so keep the jar centred). |
| **Alt text** | Alt: “Seasonal Laddu in a glass jar” (in code). |
| **Status** | Replaces the v4 brief (same path; now **1:1**). |

**Prompt:** Studio packshot of a clear cylindrical glass jar with a brushed brass screw lid and a plain blank kraft-paper band, filled with pale golden laddus coated in fine desiccated coconut, flecked with chopped nuts; a small spill of the product in front of the jar. Natural window light from the upper left, soft and directional, about 5500K; warm neutral palette of ivory, sand, ghee-gold, terracotta and brass; real Indian home-kitchen surfaces only (honed grey Kadappa stone, aged teak, unbleached hand-loom cotton, brass and matte stoneware); true-to-life colour, gentle contrast, soft shadows that keep detail; crisp focus on the food with a shallow, natural fall-off; photorealistic editorial food photography, as if shot on a full-frame camera with a 90 mm macro or 50 mm lens. No text, letters, numbers, logos, labels or watermarks anywhere (jar bands stay blank). No cartoon, illustration, 3D render, CGI or plastic look. No oversaturation, HDR halos, heavy vignette, fake steam, smoke, floating ingredients, splashes, glitter or bokeh balls. No props that are not Indian home-kitchen objects. No people's faces. No extra fingers or distorted hands.

**Composition, lighting & crop:** Straight-on, camera at jar mid-height, jar centred and ~62% of the frame height, base ~18% from the bottom edge. Soft key light from upper left, white bounce right, soft contact shadow. **Identical jar, angle, backdrop, light and scale across all seven products.** Keep the top-left 25% calm: badges overlay there.

### 14. `seasonal-laddu-2` — Seasonal Laddu — texture

| | |
|---|---|
| **Save to** | `public/images/products/seasonal-laddu/2.jpg` |
| **Size · ratio · format** | 1500 × 1500 px · 1:1 · JPEG q82, sRGB |
| **Background** | Full-bleed photograph. |
| **Placement** | Product-card **hover** image (desktop pointer only) and gallery image 2 on `/shop/seasonal-laddu`. |
| **Variants** | Single file. |
| **Alt text** | Alt: “Close-up of Seasonal Laddu” (in code). |
| **Status** | Replaces the v3 brief. |

**Prompt:** Top-down macro of pale golden laddus coated in fine desiccated coconut, flecked with chopped nuts heaped in a small matte stoneware or brass katori on hand-loom cotton. Natural window light from the upper left, soft and directional, about 5500K; warm neutral palette of ivory, sand, ghee-gold, terracotta and brass; real Indian home-kitchen surfaces only (honed grey Kadappa stone, aged teak, unbleached hand-loom cotton, brass and matte stoneware); true-to-life colour, gentle contrast, soft shadows that keep detail; crisp focus on the food with a shallow, natural fall-off; photorealistic editorial food photography, as if shot on a full-frame camera with a 90 mm macro or 50 mm lens. No text, letters, numbers, logos, labels or watermarks anywhere (jar bands stay blank). No cartoon, illustration, 3D render, CGI or plastic look. No oversaturation, HDR halos, heavy vignette, fake steam, smoke, floating ingredients, splashes, glitter or bokeh balls. No props that are not Indian home-kitchen objects. No people's faces. No extra fingers or distorted hands.

**Composition, lighting & crop:** Overhead, katori fills ~80% of the frame, crisp texture front to back, shadows soft. Colour must match the packshot exactly.

### 15. `seasonal-laddu-3` — Seasonal Laddu — served

| | |
|---|---|
| **Save to** | `public/images/products/seasonal-laddu/3.jpg` |
| **Size · ratio · format** | 1500 × 1500 px · 1:1 · JPEG q82, sRGB |
| **Background** | Full-bleed photograph. |
| **Placement** | Gallery image 3 on `/shop/seasonal-laddu`. |
| **Variants** | Single file. |
| **Alt text** | Alt: “Seasonal Laddu served with chai” (in code). |
| **Status** | Replaces the v3 brief. |

**Prompt:** Pale golden laddus coated in fine desiccated coconut, flecked with chopped nuts served in a small stoneware bowl on an aged teak table beside a steel tumbler of masala chai on a brass saucer; one hand enters from the right edge holding a spoon (no face, no jewellery). Natural window light from the upper left, soft and directional, about 5500K; warm neutral palette of ivory, sand, ghee-gold, terracotta and brass; real Indian home-kitchen surfaces only (honed grey Kadappa stone, aged teak, unbleached hand-loom cotton, brass and matte stoneware); true-to-life colour, gentle contrast, soft shadows that keep detail; crisp focus on the food with a shallow, natural fall-off; photorealistic editorial food photography, as if shot on a full-frame camera with a 90 mm macro or 50 mm lens. No text, letters, numbers, logos, labels or watermarks anywhere (jar bands stay blank). No cartoon, illustration, 3D render, CGI or plastic look. No oversaturation, HDR halos, heavy vignette, fake steam, smoke, floating ingredients, splashes, glitter or bokeh balls. No props that are not Indian home-kitchen objects. No people's faces. No extra fingers or distorted hands.

**Composition, lighting & crop:** 45° angle, bowl on the left third, tumbler right, generous negative space at top. Warm morning light.

### 16. `everyday-mix-1` — Everyday Mewa Mix — packshot

| | |
|---|---|
| **Save to** | `public/images/products/everyday-mix/1.jpg` |
| **Size · ratio · format** | 1500 × 1500 px · 1:1 · JPEG q82, sRGB |
| **Background** | Seamless warm sand paper sweep (#EFE7DA), no transparency. |
| **Placement** | Main product image: product cards (home Bestsellers, `/shop`, “You may also like”), search results, cart drawer and cart thumbnails, and image 1 of the gallery on `/shop/everyday-mix`. Customisable products also show this image on the Custom batches chooser (`/customise`). |
| **Variants** | One file serves desktop and mobile (square everywhere; the `/customise` chooser centre-crops image 1 to a 4:5 arch, so keep the jar centred). |
| **Alt text** | Alt: “Everyday Mewa Mix in a glass jar” (in code). |
| **Status** | Replaces the v4 brief (same path; now **1:1**). |

**Prompt:** Studio packshot of a clear cylindrical glass jar with a brushed brass screw lid and a plain blank kraft-paper band, filled with lightly roasted whole almonds and cashews with golden raisins and green pumpkin seeds; a small spill of the product in front of the jar. Natural window light from the upper left, soft and directional, about 5500K; warm neutral palette of ivory, sand, ghee-gold, terracotta and brass; real Indian home-kitchen surfaces only (honed grey Kadappa stone, aged teak, unbleached hand-loom cotton, brass and matte stoneware); true-to-life colour, gentle contrast, soft shadows that keep detail; crisp focus on the food with a shallow, natural fall-off; photorealistic editorial food photography, as if shot on a full-frame camera with a 90 mm macro or 50 mm lens. No text, letters, numbers, logos, labels or watermarks anywhere (jar bands stay blank). No cartoon, illustration, 3D render, CGI or plastic look. No oversaturation, HDR halos, heavy vignette, fake steam, smoke, floating ingredients, splashes, glitter or bokeh balls. No props that are not Indian home-kitchen objects. No people's faces. No extra fingers or distorted hands.

**Composition, lighting & crop:** Straight-on, camera at jar mid-height, jar centred and ~62% of the frame height, base ~18% from the bottom edge. Soft key light from upper left, white bounce right, soft contact shadow. **Identical jar, angle, backdrop, light and scale across all seven products.** Keep the top-left 25% calm: badges overlay there.

### 17. `everyday-mix-2` — Everyday Mewa Mix — texture

| | |
|---|---|
| **Save to** | `public/images/products/everyday-mix/2.jpg` |
| **Size · ratio · format** | 1500 × 1500 px · 1:1 · JPEG q82, sRGB |
| **Background** | Full-bleed photograph. |
| **Placement** | Product-card **hover** image (desktop pointer only) and gallery image 2 on `/shop/everyday-mix`. |
| **Variants** | Single file. |
| **Alt text** | Alt: “Close-up of Everyday Mewa Mix” (in code). |
| **Status** | Replaces the v3 brief. |

**Prompt:** Top-down macro of lightly roasted whole almonds and cashews with golden raisins and green pumpkin seeds heaped in a small matte stoneware or brass katori on hand-loom cotton. Natural window light from the upper left, soft and directional, about 5500K; warm neutral palette of ivory, sand, ghee-gold, terracotta and brass; real Indian home-kitchen surfaces only (honed grey Kadappa stone, aged teak, unbleached hand-loom cotton, brass and matte stoneware); true-to-life colour, gentle contrast, soft shadows that keep detail; crisp focus on the food with a shallow, natural fall-off; photorealistic editorial food photography, as if shot on a full-frame camera with a 90 mm macro or 50 mm lens. No text, letters, numbers, logos, labels or watermarks anywhere (jar bands stay blank). No cartoon, illustration, 3D render, CGI or plastic look. No oversaturation, HDR halos, heavy vignette, fake steam, smoke, floating ingredients, splashes, glitter or bokeh balls. No props that are not Indian home-kitchen objects. No people's faces. No extra fingers or distorted hands.

**Composition, lighting & crop:** Overhead, katori fills ~80% of the frame, crisp texture front to back, shadows soft. Colour must match the packshot exactly.

### 18. `everyday-mix-3` — Everyday Mewa Mix — served

| | |
|---|---|
| **Save to** | `public/images/products/everyday-mix/3.jpg` |
| **Size · ratio · format** | 1500 × 1500 px · 1:1 · JPEG q82, sRGB |
| **Background** | Full-bleed photograph. |
| **Placement** | Gallery image 3 on `/shop/everyday-mix`. |
| **Variants** | Single file. |
| **Alt text** | Alt: “Everyday Mewa Mix served with chai” (in code). |
| **Status** | Replaces the v3 brief. |

**Prompt:** Lightly roasted whole almonds and cashews with golden raisins and green pumpkin seeds served in a small stoneware bowl on an aged teak table beside a steel tumbler of masala chai on a brass saucer; one hand enters from the right edge holding a spoon (no face, no jewellery). Natural window light from the upper left, soft and directional, about 5500K; warm neutral palette of ivory, sand, ghee-gold, terracotta and brass; real Indian home-kitchen surfaces only (honed grey Kadappa stone, aged teak, unbleached hand-loom cotton, brass and matte stoneware); true-to-life colour, gentle contrast, soft shadows that keep detail; crisp focus on the food with a shallow, natural fall-off; photorealistic editorial food photography, as if shot on a full-frame camera with a 90 mm macro or 50 mm lens. No text, letters, numbers, logos, labels or watermarks anywhere (jar bands stay blank). No cartoon, illustration, 3D render, CGI or plastic look. No oversaturation, HDR halos, heavy vignette, fake steam, smoke, floating ingredients, splashes, glitter or bokeh balls. No props that are not Indian home-kitchen objects. No people's faces. No extra fingers or distorted hands.

**Composition, lighting & crop:** 45° angle, bowl on the left third, tumbler right, generous negative space at top. Warm morning light.

### 19. `study-table-mix-1` — Study-Table Mix — packshot

| | |
|---|---|
| **Save to** | `public/images/products/study-table-mix/1.jpg` |
| **Size · ratio · format** | 1500 × 1500 px · 1:1 · JPEG q82, sRGB |
| **Background** | Seamless warm sand paper sweep (#EFE7DA), no transparency. |
| **Placement** | Main product image: product cards (home Bestsellers, `/shop`, “You may also like”), search results, cart drawer and cart thumbnails, and image 1 of the gallery on `/shop/study-table-mix`. |
| **Variants** | One file serves desktop and mobile (square everywhere; the `/customise` chooser centre-crops image 1 to a 4:5 arch, so keep the jar centred). |
| **Alt text** | Alt: “Study-Table Mix in a glass jar” (in code). |
| **Status** | Replaces the v4 brief (same path; now **1:1**). |

**Prompt:** Studio packshot of a clear cylindrical glass jar with a brushed brass screw lid and a plain blank kraft-paper band, filled with roasted walnut halves, fox nuts (makhana), green pumpkin seeds and flax seeds; a small spill of the product in front of the jar. Natural window light from the upper left, soft and directional, about 5500K; warm neutral palette of ivory, sand, ghee-gold, terracotta and brass; real Indian home-kitchen surfaces only (honed grey Kadappa stone, aged teak, unbleached hand-loom cotton, brass and matte stoneware); true-to-life colour, gentle contrast, soft shadows that keep detail; crisp focus on the food with a shallow, natural fall-off; photorealistic editorial food photography, as if shot on a full-frame camera with a 90 mm macro or 50 mm lens. No text, letters, numbers, logos, labels or watermarks anywhere (jar bands stay blank). No cartoon, illustration, 3D render, CGI or plastic look. No oversaturation, HDR halos, heavy vignette, fake steam, smoke, floating ingredients, splashes, glitter or bokeh balls. No props that are not Indian home-kitchen objects. No people's faces. No extra fingers or distorted hands.

**Composition, lighting & crop:** Straight-on, camera at jar mid-height, jar centred and ~62% of the frame height, base ~18% from the bottom edge. Soft key light from upper left, white bounce right, soft contact shadow. **Identical jar, angle, backdrop, light and scale across all seven products.** Keep the top-left 25% calm: badges overlay there.

### 20. `study-table-mix-2` — Study-Table Mix — texture

| | |
|---|---|
| **Save to** | `public/images/products/study-table-mix/2.jpg` |
| **Size · ratio · format** | 1500 × 1500 px · 1:1 · JPEG q82, sRGB |
| **Background** | Full-bleed photograph. |
| **Placement** | Product-card **hover** image (desktop pointer only) and gallery image 2 on `/shop/study-table-mix`. |
| **Variants** | Single file. |
| **Alt text** | Alt: “Close-up of Study-Table Mix” (in code). |
| **Status** | Replaces the v3 brief. |

**Prompt:** Top-down macro of roasted walnut halves, fox nuts (makhana), green pumpkin seeds and flax seeds heaped in a small matte stoneware or brass katori on hand-loom cotton. Natural window light from the upper left, soft and directional, about 5500K; warm neutral palette of ivory, sand, ghee-gold, terracotta and brass; real Indian home-kitchen surfaces only (honed grey Kadappa stone, aged teak, unbleached hand-loom cotton, brass and matte stoneware); true-to-life colour, gentle contrast, soft shadows that keep detail; crisp focus on the food with a shallow, natural fall-off; photorealistic editorial food photography, as if shot on a full-frame camera with a 90 mm macro or 50 mm lens. No text, letters, numbers, logos, labels or watermarks anywhere (jar bands stay blank). No cartoon, illustration, 3D render, CGI or plastic look. No oversaturation, HDR halos, heavy vignette, fake steam, smoke, floating ingredients, splashes, glitter or bokeh balls. No props that are not Indian home-kitchen objects. No people's faces. No extra fingers or distorted hands.

**Composition, lighting & crop:** Overhead, katori fills ~80% of the frame, crisp texture front to back, shadows soft. Colour must match the packshot exactly.

### 21. `study-table-mix-3` — Study-Table Mix — served

| | |
|---|---|
| **Save to** | `public/images/products/study-table-mix/3.jpg` |
| **Size · ratio · format** | 1500 × 1500 px · 1:1 · JPEG q82, sRGB |
| **Background** | Full-bleed photograph. |
| **Placement** | Gallery image 3 on `/shop/study-table-mix`. |
| **Variants** | Single file. |
| **Alt text** | Alt: “Study-Table Mix served with chai” (in code). |
| **Status** | Replaces the v3 brief. |

**Prompt:** Roasted walnut halves, fox nuts (makhana), green pumpkin seeds and flax seeds served in a small stoneware bowl on an aged teak table beside a steel tumbler of masala chai on a brass saucer; one hand enters from the right edge holding a spoon (no face, no jewellery). Natural window light from the upper left, soft and directional, about 5500K; warm neutral palette of ivory, sand, ghee-gold, terracotta and brass; real Indian home-kitchen surfaces only (honed grey Kadappa stone, aged teak, unbleached hand-loom cotton, brass and matte stoneware); true-to-life colour, gentle contrast, soft shadows that keep detail; crisp focus on the food with a shallow, natural fall-off; photorealistic editorial food photography, as if shot on a full-frame camera with a 90 mm macro or 50 mm lens. No text, letters, numbers, logos, labels or watermarks anywhere (jar bands stay blank). No cartoon, illustration, 3D render, CGI or plastic look. No oversaturation, HDR halos, heavy vignette, fake steam, smoke, floating ingredients, splashes, glitter or bokeh balls. No props that are not Indian home-kitchen objects. No people's faces. No extra fingers or distorted hands.

**Composition, lighting & crop:** 45° angle, bowl on the left third, tumbler right, generous negative space at top. Warm morning light.

### 22. `winter-trio-1` — Winter Trio Box — packshot

| | |
|---|---|
| **Save to** | `public/images/products/winter-trio/1.jpg` |
| **Size · ratio · format** | 1500 × 1500 px · 1:1 · JPEG q82, sRGB |
| **Background** | Seamless warm sand paper sweep (#EFE7DA). |
| **Placement** | Gift-box product cards (`/shop?category=gift-boxes`, home Gift boxes) and gallery image 1 on `/shop/winter-trio`. |
| **Variants** | Single square file. |
| **Alt text** | In code: “Winter Trio Box in a glass jar” / “Close-up of Winter Trio Box” / “Winter Trio Box served with chai” (generated per index). |
| **Status** | New in v5. |

**Prompt:** Gift box, a kraft gift box with the lid leaning behind it, holding three clear glass jars with brass lids and blank kraft bands: golden panjiri, round hand-pressed atta pinni, and a roasted nut-and-raisin mix; a loop of red cotton string beside it. Natural window light from the upper left, soft and directional, about 5500K; warm neutral palette of ivory, sand, ghee-gold, terracotta and brass; real Indian home-kitchen surfaces only (honed grey Kadappa stone, aged teak, unbleached hand-loom cotton, brass and matte stoneware); true-to-life colour, gentle contrast, soft shadows that keep detail; crisp focus on the food with a shallow, natural fall-off; photorealistic editorial food photography, as if shot on a full-frame camera with a 90 mm macro or 50 mm lens.
- **Avoid:** No text, letters, numbers, logos, labels or watermarks anywhere (jar bands stay blank). No cartoon, illustration, 3D render, CGI or plastic look. No oversaturation, HDR halos, heavy vignette, fake steam, smoke, floating ingredients, splashes, glitter or bokeh balls. No props that are not Indian home-kitchen objects. No people's faces. No extra fingers or distorted hands.

**Composition, lighting & crop:** Straight-on at box mid-height, box centred and ~70% of frame width, same sand sweep, light and scale as the jar packshots. Keep the top-left 25% calm for badges.

### 23. `winter-trio-2` — Winter Trio Box — contents

| | |
|---|---|
| **Save to** | `public/images/products/winter-trio/2.jpg` |
| **Size · ratio · format** | 1500 × 1500 px · 1:1 · JPEG q82, sRGB |
| **Background** | Full-bleed photograph. |
| **Placement** | Gift-box product cards (`/shop?category=gift-boxes`, home Gift boxes) and gallery image 2 on `/shop/winter-trio`. |
| **Variants** | Single square file. |
| **Alt text** | In code: “Winter Trio Box in a glass jar” / “Close-up of Winter Trio Box” / “Winter Trio Box served with chai” (generated per index). |
| **Status** | New in v5. |

**Prompt:** Gift box, Close-up looking into the open kraft box at the three jar lids and the red cotton string tie, a few almonds and a pinni resting on folded unbleached cotton tissue. Natural window light from the upper left, soft and directional, about 5500K; warm neutral palette of ivory, sand, ghee-gold, terracotta and brass; real Indian home-kitchen surfaces only (honed grey Kadappa stone, aged teak, unbleached hand-loom cotton, brass and matte stoneware); true-to-life colour, gentle contrast, soft shadows that keep detail; crisp focus on the food with a shallow, natural fall-off; photorealistic editorial food photography, as if shot on a full-frame camera with a 90 mm macro or 50 mm lens.
- **Avoid:** No text, letters, numbers, logos, labels or watermarks anywhere (jar bands stay blank). No cartoon, illustration, 3D render, CGI or plastic look. No oversaturation, HDR halos, heavy vignette, fake steam, smoke, floating ingredients, splashes, glitter or bokeh balls. No props that are not Indian home-kitchen objects. No people's faces. No extra fingers or distorted hands.

**Composition, lighting & crop:** 45° above, tight crop on the contents, shallow focus falling off toward the back.

### 24. `winter-trio-3` — Winter Trio Box — served

| | |
|---|---|
| **Save to** | `public/images/products/winter-trio/3.jpg` |
| **Size · ratio · format** | 1500 × 1500 px · 1:1 · JPEG q82, sRGB |
| **Background** | Full-bleed photograph. |
| **Placement** | Gift-box product cards (`/shop?category=gift-boxes`, home Gift boxes) and gallery image 3 on `/shop/winter-trio`. |
| **Variants** | Single square file. |
| **Alt text** | In code: “Winter Trio Box in a glass jar” / “Close-up of Winter Trio Box” / “Winter Trio Box served with chai” (generated per index). |
| **Status** | New in v5. |

**Prompt:** Gift box, The open gift box on a teak table at a winter family visit, a steel tumbler of chai and a shawl edge in frame, hands (no faces) lifting out the pinni jar. Natural window light from the upper left, soft and directional, about 5500K; warm neutral palette of ivory, sand, ghee-gold, terracotta and brass; real Indian home-kitchen surfaces only (honed grey Kadappa stone, aged teak, unbleached hand-loom cotton, brass and matte stoneware); true-to-life colour, gentle contrast, soft shadows that keep detail; crisp focus on the food with a shallow, natural fall-off; photorealistic editorial food photography, as if shot on a full-frame camera with a 90 mm macro or 50 mm lens.
- **Avoid:** No text, letters, numbers, logos, labels or watermarks anywhere (jar bands stay blank). No cartoon, illustration, 3D render, CGI or plastic look. No oversaturation, HDR halos, heavy vignette, fake steam, smoke, floating ingredients, splashes, glitter or bokeh balls. No props that are not Indian home-kitchen objects. No people's faces. No extra fingers or distorted hands.

**Composition, lighting & crop:** Eye-level to 20° above, lifestyle frame, subject centred so the square crop works.

### 25. `new-mother-box-1` — New Mother’s Box — packshot

| | |
|---|---|
| **Save to** | `public/images/products/new-mother-box/1.jpg` |
| **Size · ratio · format** | 1500 × 1500 px · 1:1 · JPEG q82, sRGB |
| **Background** | Seamless warm sand paper sweep (#EFE7DA). |
| **Placement** | Gift-box product cards (`/shop?category=gift-boxes`, home Gift boxes) and gallery image 1 on `/shop/new-mother-box`. |
| **Variants** | Single square file. |
| **Alt text** | In code: “New Mother’s Box in a glass jar” / “Close-up of New Mother’s Box” / “New Mother’s Box served with chai” (generated per index). |
| **Status** | New in v5. |

**Prompt:** Gift box, a kraft gift box, lid leaning behind, holding a large glass jar of panjiri rich with gond and makhana and a jar of dry-fruit laddus, a folded soft cotton muslin and a sprig of dried flowers tucked beside; red cotton string. Natural window light from the upper left, soft and directional, about 5500K; warm neutral palette of ivory, sand, ghee-gold, terracotta and brass; real Indian home-kitchen surfaces only (honed grey Kadappa stone, aged teak, unbleached hand-loom cotton, brass and matte stoneware); true-to-life colour, gentle contrast, soft shadows that keep detail; crisp focus on the food with a shallow, natural fall-off; photorealistic editorial food photography, as if shot on a full-frame camera with a 90 mm macro or 50 mm lens.
- **Avoid:** No text, letters, numbers, logos, labels or watermarks anywhere (jar bands stay blank). No cartoon, illustration, 3D render, CGI or plastic look. No oversaturation, HDR halos, heavy vignette, fake steam, smoke, floating ingredients, splashes, glitter or bokeh balls. No props that are not Indian home-kitchen objects. No people's faces. No extra fingers or distorted hands.

**Composition, lighting & crop:** Straight-on at box mid-height, box centred and ~70% of frame width, same sand sweep, light and scale as the jar packshots. Keep the top-left 25% calm for badges.

### 26. `new-mother-box-2` — New Mother’s Box — contents

| | |
|---|---|
| **Save to** | `public/images/products/new-mother-box/2.jpg` |
| **Size · ratio · format** | 1500 × 1500 px · 1:1 · JPEG q82, sRGB |
| **Background** | Full-bleed photograph. |
| **Placement** | Gift-box product cards (`/shop?category=gift-boxes`, home Gift boxes) and gallery image 2 on `/shop/new-mother-box`. |
| **Variants** | Single square file. |
| **Alt text** | In code: “New Mother’s Box in a glass jar” / “Close-up of New Mother’s Box” / “New Mother’s Box served with chai” (generated per index). |
| **Status** | New in v5. |

**Prompt:** Gift box, Close-up into the box: the panjiri texture with visible gond and makhana, laddus in their jar, the muslin fold. Natural window light from the upper left, soft and directional, about 5500K; warm neutral palette of ivory, sand, ghee-gold, terracotta and brass; real Indian home-kitchen surfaces only (honed grey Kadappa stone, aged teak, unbleached hand-loom cotton, brass and matte stoneware); true-to-life colour, gentle contrast, soft shadows that keep detail; crisp focus on the food with a shallow, natural fall-off; photorealistic editorial food photography, as if shot on a full-frame camera with a 90 mm macro or 50 mm lens.
- **Avoid:** No text, letters, numbers, logos, labels or watermarks anywhere (jar bands stay blank). No cartoon, illustration, 3D render, CGI or plastic look. No oversaturation, HDR halos, heavy vignette, fake steam, smoke, floating ingredients, splashes, glitter or bokeh balls. No props that are not Indian home-kitchen objects. No people's faces. No extra fingers or distorted hands.

**Composition, lighting & crop:** 45° above, tight crop on the contents, shallow focus falling off toward the back.

### 27. `new-mother-box-3` — New Mother’s Box — served

| | |
|---|---|
| **Save to** | `public/images/products/new-mother-box/3.jpg` |
| **Size · ratio · format** | 1500 × 1500 px · 1:1 · JPEG q82, sRGB |
| **Background** | Full-bleed photograph. |
| **Placement** | Gift-box product cards (`/shop?category=gift-boxes`, home Gift boxes) and gallery image 3 on `/shop/new-mother-box`. |
| **Variants** | Single square file. |
| **Alt text** | In code: “New Mother’s Box in a glass jar” / “Close-up of New Mother’s Box” / “New Mother’s Box served with chai” (generated per index). |
| **Status** | New in v5. |

**Prompt:** Gift box, The box on a bed-side wooden stool beside a brass tumbler of warm milk with a spoon of panjiri, soft morning light, a corner of a baby's cotton blanket (no people). Natural window light from the upper left, soft and directional, about 5500K; warm neutral palette of ivory, sand, ghee-gold, terracotta and brass; real Indian home-kitchen surfaces only (honed grey Kadappa stone, aged teak, unbleached hand-loom cotton, brass and matte stoneware); true-to-life colour, gentle contrast, soft shadows that keep detail; crisp focus on the food with a shallow, natural fall-off; photorealistic editorial food photography, as if shot on a full-frame camera with a 90 mm macro or 50 mm lens.
- **Avoid:** No text, letters, numbers, logos, labels or watermarks anywhere (jar bands stay blank). No cartoon, illustration, 3D render, CGI or plastic look. No oversaturation, HDR halos, heavy vignette, fake steam, smoke, floating ingredients, splashes, glitter or bokeh balls. No props that are not Indian home-kitchen objects. No people's faces. No extra fingers or distorted hands.

**Composition, lighting & crop:** Eye-level to 20° above, lifestyle frame, subject centred so the square crop works.

## C. Hero arches — categories (3 used, `category-mixes` deferred)

### 28. `category-panjiri` — Category — Panjiri

| | |
|---|---|
| **Save to** | `public/images/categories/panjiri.jpg` |
| **Size · ratio · format** | 1200 × 1500 px · 4:5 · JPEG q82, sRGB |
| **Background** | Seamless warm sand linen (#EDE4D6). |
| **Placement** | Home hero → one of three arch “windows” (**Panjiri**, links to `/shop?category=panjiri`). The middle arch (Pinni) is the LCP image. |
| **Variants** | Single 4:5 file; CSS clips it to a rounded-top arch. |
| **Alt text** | Decorative in the layout (the tile has a text label); in code as “Golden panjiri in a brass bowl”. |
| **Status** | Replaces the v4 brief (ratio changed from 1:1 to **4:5 arch**). |

**Prompt:** Three-quarter overhead view of golden roasted panjiri heaped in a shallow brass bowl with a small brass spoon, on a muted sand linen backdrop. Natural window light from the upper left, soft and directional, about 5500K; warm neutral palette of ivory, sand, ghee-gold, terracotta and brass; real Indian home-kitchen surfaces only (honed grey Kadappa stone, aged teak, unbleached hand-loom cotton, brass and matte stoneware); true-to-life colour, gentle contrast, soft shadows that keep detail; crisp focus on the food with a shallow, natural fall-off; photorealistic editorial food photography, as if shot on a full-frame camera with a 90 mm macro or 50 mm lens. No text, letters, numbers, logos, labels or watermarks anywhere (jar bands stay blank). No cartoon, illustration, 3D render, CGI or plastic look. No oversaturation, HDR halos, heavy vignette, fake steam, smoke, floating ingredients, splashes, glitter or bokeh balls. No props that are not Indian home-kitchen objects. No people's faces. No extra fingers or distorted hands.

**Composition, lighting & crop:** Subject centred in the lower two-thirds, ~60% of frame width, 30° above the table; keep the top 20% calm backdrop (arch curve). Same backdrop and light across all three arches.

### 29. `category-pinni` — Category — Pinni

| | |
|---|---|
| **Save to** | `public/images/categories/pinni.jpg` |
| **Size · ratio · format** | 1200 × 1500 px · 4:5 · JPEG q82, sRGB |
| **Background** | Seamless warm sand linen (#EDE4D6). |
| **Placement** | Home hero → one of three arch “windows” (**Pinni**, links to `/shop?category=pinni`). The middle arch (Pinni) is the LCP image. |
| **Variants** | Single 4:5 file; CSS clips it to a rounded-top arch. |
| **Alt text** | Decorative in the layout (the tile has a text label); in code as “Hand-pressed pinni on a stoneware plate”. |
| **Status** | Replaces the v4 brief (ratio changed from 1:1 to **4:5 arch**). |

**Prompt:** Three-quarter overhead view of five hand-pressed pinni stacked loosely on a matte off-white stoneware plate, on a muted sand linen backdrop. Natural window light from the upper left, soft and directional, about 5500K; warm neutral palette of ivory, sand, ghee-gold, terracotta and brass; real Indian home-kitchen surfaces only (honed grey Kadappa stone, aged teak, unbleached hand-loom cotton, brass and matte stoneware); true-to-life colour, gentle contrast, soft shadows that keep detail; crisp focus on the food with a shallow, natural fall-off; photorealistic editorial food photography, as if shot on a full-frame camera with a 90 mm macro or 50 mm lens. No text, letters, numbers, logos, labels or watermarks anywhere (jar bands stay blank). No cartoon, illustration, 3D render, CGI or plastic look. No oversaturation, HDR halos, heavy vignette, fake steam, smoke, floating ingredients, splashes, glitter or bokeh balls. No props that are not Indian home-kitchen objects. No people's faces. No extra fingers or distorted hands.

**Composition, lighting & crop:** Subject centred in the lower two-thirds, ~60% of frame width, 30° above the table; keep the top 20% calm backdrop (arch curve). Same backdrop and light across all three arches.

### 30. `category-laddus` — Category — Dry-fruit laddus

| | |
|---|---|
| **Save to** | `public/images/categories/laddus.jpg` |
| **Size · ratio · format** | 1200 × 1500 px · 4:5 · JPEG q82, sRGB |
| **Background** | Seamless warm sand linen (#EDE4D6). |
| **Placement** | Home hero → one of three arch “windows” (**Dry-fruit laddus**, links to `/shop?category=laddus`). The middle arch (Pinni) is the LCP image. |
| **Variants** | Single 4:5 file; CSS clips it to a rounded-top arch. |
| **Alt text** | Decorative in the layout (the tile has a text label); in code as “Dry-fruit laddus on a brass thali”. |
| **Status** | Replaces the v4 brief (ratio changed from 1:1 to **4:5 arch**). |

**Prompt:** Three-quarter overhead view of seven deep-brown dry-fruit laddus arranged in a loose ring on a small brass thali, on a muted sand linen backdrop. Natural window light from the upper left, soft and directional, about 5500K; warm neutral palette of ivory, sand, ghee-gold, terracotta and brass; real Indian home-kitchen surfaces only (honed grey Kadappa stone, aged teak, unbleached hand-loom cotton, brass and matte stoneware); true-to-life colour, gentle contrast, soft shadows that keep detail; crisp focus on the food with a shallow, natural fall-off; photorealistic editorial food photography, as if shot on a full-frame camera with a 90 mm macro or 50 mm lens. No text, letters, numbers, logos, labels or watermarks anywhere (jar bands stay blank). No cartoon, illustration, 3D render, CGI or plastic look. No oversaturation, HDR halos, heavy vignette, fake steam, smoke, floating ingredients, splashes, glitter or bokeh balls. No props that are not Indian home-kitchen objects. No people's faces. No extra fingers or distorted hands.

**Composition, lighting & crop:** Subject centred in the lower two-thirds, ~60% of frame width, 30° above the table; keep the top 20% calm backdrop (arch curve). Same backdrop and light across all three arches.

### 31. `category-mixes` — Category — Dry-fruit mixes

| | |
|---|---|
| **Save to** | `public/images/categories/mixes.jpg` |
| **Size · ratio · format** | 1200 × 1500 px · 4:5 · JPEG q82, sRGB |
| **Background** | Seamless warm sand linen (#EDE4D6). |
| **Placement** | Home hero → one of three arch “windows” (**Dry-fruit mixes**, links to `/shop?category=mixes`). The middle arch (Pinni) is the LCP image. |
| **Variants** | Single 4:5 file; CSS clips it to a rounded-top arch. |
| **Alt text** | Decorative in the layout (the tile has a text label); in code as “Roasted nuts, seeds and raisins in a glass jar”. |
| **Status** | Replaces the v4 brief (ratio changed from 1:1 to **4:5 arch**). |

**Prompt:** Three-quarter overhead view of an open glass jar of roasted almonds, cashews, raisins and pumpkin seeds, a few pieces spilled on the stone, on a muted sand linen backdrop. Natural window light from the upper left, soft and directional, about 5500K; warm neutral palette of ivory, sand, ghee-gold, terracotta and brass; real Indian home-kitchen surfaces only (honed grey Kadappa stone, aged teak, unbleached hand-loom cotton, brass and matte stoneware); true-to-life colour, gentle contrast, soft shadows that keep detail; crisp focus on the food with a shallow, natural fall-off; photorealistic editorial food photography, as if shot on a full-frame camera with a 90 mm macro or 50 mm lens. No text, letters, numbers, logos, labels or watermarks anywhere (jar bands stay blank). No cartoon, illustration, 3D render, CGI or plastic look. No oversaturation, HDR halos, heavy vignette, fake steam, smoke, floating ingredients, splashes, glitter or bokeh balls. No props that are not Indian home-kitchen objects. No people's faces. No extra fingers or distorted hands.

**Composition, lighting & crop:** Subject centred in the lower two-thirds, ~60% of frame width, 30° above the table; keep the top 20% calm backdrop (arch curve). Same backdrop and light across all three arches.

## D. Ingredient textures for the custom-batch builder (22)

These are cropped to **circles** (the dishes in the mix composition, swatches on product pages and the chooser) and **rounded squares** (ingredient rows). So each one must be a **full-bleed, top-down texture: the ingredient fills the entire frame edge to edge with no background, plate rim or props visible**. The builder sizes each dish by the ingredient's share of the recipe, so these photos are what make the mix look real.

### 32. `ingredient-atta` — Ingredient — Wholewheat flour (atta)

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

### 33. `ingredient-suji` — Ingredient — Semolina (suji)

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

### 34. `ingredient-ghee` — Ingredient — Desi ghee

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

### 35. `ingredient-jaggery` — Ingredient — Jaggery (gur)

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

### 36. `ingredient-khand` — Ingredient — Unrefined cane sugar (khand)

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

### 37. `ingredient-sugar` — Ingredient — Sugar (boora)

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

### 38. `ingredient-almond` — Ingredient — Almonds (badam)

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

### 39. `ingredient-cashew` — Ingredient — Cashews (kaju)

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

### 40. `ingredient-pistachio` — Ingredient — Pistachios (pista)

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

### 41. `ingredient-walnut` — Ingredient — Walnuts (akhrot)

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

### 42. `ingredient-raisin` — Ingredient — Raisins (kishmish)

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

### 43. `ingredient-fig` — Ingredient — Figs (anjeer)

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

### 44. `ingredient-makhana` — Ingredient — Fox nuts (makhana)

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

### 45. `ingredient-gond` — Ingredient — Edible gum (gond)

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

### 46. `ingredient-magaz` — Ingredient — Melon seeds (magaz)

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

### 47. `ingredient-pumpkin` — Ingredient — Pumpkin seeds

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

### 48. `ingredient-flax` — Ingredient — Flax seeds (alsi)

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

### 49. `ingredient-coconut` — Ingredient — Dry coconut (nariyal)

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

### 50. `ingredient-cardamom` — Ingredient — Green cardamom (elaichi)

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

### 51. `ingredient-saunth` — Ingredient — Dry ginger (saunth)

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

### 52. `ingredient-ajwain` — Ingredient — Carom seeds (ajwain)

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

### 53. `ingredient-saffron` — Ingredient — Saffron (kesar)

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

### 54. `home-customise` — Custom batches feature

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

### 55. `story-hero` — Our story — hero

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

### 56. `story-roasting` — Our story — roasting

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

### 57. `story-rolling` — Our story — rolling

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

### 58. `story-packing` — Our story — packing

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

### 59. `occasion-immunity` — Occasion — Winter mornings

| | |
|---|---|
| **Save to** | `public/images/occasions/immunity.jpg` |
| **Size · ratio · format** | 1200 × 1600 px · 3:4 · JPEG q82, sRGB |
| **Background** | Full-bleed photograph. |
| **Placement** | Home → “Shop by occasion” arch tile for **Winter mornings** (सर्दी), links to `/shop?need=immunity`. |
| **Variants** | Single file; CSS clips it to an arch. |
| **Alt text** | Decorative (the tile has a text label). |
| **Status** | New in v5. |

**Prompt:** A steel katori of warm panjiri and a brass tumbler of haldi milk on a windowsill with winter light and a folded wool shawl. Natural window light from the upper left, soft and directional, about 5500K; warm neutral palette of ivory, sand, ghee-gold, terracotta and brass; real Indian home-kitchen surfaces only (honed grey Kadappa stone, aged teak, unbleached hand-loom cotton, brass and matte stoneware); true-to-life colour, gentle contrast, soft shadows that keep detail; crisp focus on the food with a shallow, natural fall-off; photorealistic editorial food photography, as if shot on a full-frame camera with a 90 mm macro or 50 mm lens.
- **Avoid:** No text, letters, numbers, logos, labels or watermarks anywhere (jar bands stay blank). No cartoon, illustration, 3D render, CGI or plastic look. No oversaturation, HDR halos, heavy vignette, fake steam, smoke, floating ingredients, splashes, glitter or bokeh balls. No props that are not Indian home-kitchen objects. No people's faces. No extra fingers or distorted hands.

**Composition, lighting & crop:** Subject centred in the lower 70%, top 20% quiet (arch curve). Same light and palette across all five so the row reads as one set.

### 60. `occasion-postpartum` — Occasion — New mothers

| | |
|---|---|
| **Save to** | `public/images/occasions/postpartum.jpg` |
| **Size · ratio · format** | 1200 × 1600 px · 3:4 · JPEG q82, sRGB |
| **Background** | Full-bleed photograph. |
| **Placement** | Home → “Shop by occasion” arch tile for **New mothers** (जच्चा), links to `/shop?need=postpartum`. |
| **Variants** | Single file; CSS clips it to an arch. |
| **Alt text** | Decorative (the tile has a text label). |
| **Status** | New in v5. |

**Prompt:** A brass bowl of gond panjiri beside a cup of ajwain water and a folded soft cotton muslin on a bedside stool. Natural window light from the upper left, soft and directional, about 5500K; warm neutral palette of ivory, sand, ghee-gold, terracotta and brass; real Indian home-kitchen surfaces only (honed grey Kadappa stone, aged teak, unbleached hand-loom cotton, brass and matte stoneware); true-to-life colour, gentle contrast, soft shadows that keep detail; crisp focus on the food with a shallow, natural fall-off; photorealistic editorial food photography, as if shot on a full-frame camera with a 90 mm macro or 50 mm lens.
- **Avoid:** No text, letters, numbers, logos, labels or watermarks anywhere (jar bands stay blank). No cartoon, illustration, 3D render, CGI or plastic look. No oversaturation, HDR halos, heavy vignette, fake steam, smoke, floating ingredients, splashes, glitter or bokeh balls. No props that are not Indian home-kitchen objects. No people's faces. No extra fingers or distorted hands.

**Composition, lighting & crop:** Subject centred in the lower 70%, top 20% quiet (arch curve). Same light and palette across all five so the row reads as one set.

### 61. `occasion-clarity` — Occasion — Exam season

| | |
|---|---|
| **Save to** | `public/images/occasions/clarity.jpg` |
| **Size · ratio · format** | 1200 × 1600 px · 3:4 · JPEG q82, sRGB |
| **Background** | Full-bleed photograph. |
| **Placement** | Home → “Shop by occasion” arch tile for **Exam season** (पढ़ाई), links to `/shop?need=clarity`. |
| **Variants** | Single file; CSS clips it to an arch. |
| **Alt text** | Decorative (the tile has a text label). |
| **Status** | New in v5. |

**Prompt:** A small glass jar of roasted mewa mix open on a wooden study table beside a closed notebook and a pencil, desk lamp glow. Natural window light from the upper left, soft and directional, about 5500K; warm neutral palette of ivory, sand, ghee-gold, terracotta and brass; real Indian home-kitchen surfaces only (honed grey Kadappa stone, aged teak, unbleached hand-loom cotton, brass and matte stoneware); true-to-life colour, gentle contrast, soft shadows that keep detail; crisp focus on the food with a shallow, natural fall-off; photorealistic editorial food photography, as if shot on a full-frame camera with a 90 mm macro or 50 mm lens.
- **Avoid:** No text, letters, numbers, logos, labels or watermarks anywhere (jar bands stay blank). No cartoon, illustration, 3D render, CGI or plastic look. No oversaturation, HDR halos, heavy vignette, fake steam, smoke, floating ingredients, splashes, glitter or bokeh balls. No props that are not Indian home-kitchen objects. No people's faces. No extra fingers or distorted hands.

**Composition, lighting & crop:** Subject centred in the lower 70%, top 20% quiet (arch curve). Same light and palette across all five so the row reads as one set.

### 62. `occasion-wellness` — Occasion — Long workdays

| | |
|---|---|
| **Save to** | `public/images/occasions/wellness.jpg` |
| **Size · ratio · format** | 1200 × 1600 px · 3:4 · JPEG q82, sRGB |
| **Background** | Full-bleed photograph. |
| **Placement** | Home → “Shop by occasion” arch tile for **Long workdays** (रोज़), links to `/shop?need=wellness`. |
| **Variants** | Single file; CSS clips it to an arch. |
| **Alt text** | Decorative (the tile has a text label). |
| **Status** | New in v5. |

**Prompt:** A handful of roasted nuts and seeds in a small stoneware dish beside a steel lunch tiffin on a teak desk. Natural window light from the upper left, soft and directional, about 5500K; warm neutral palette of ivory, sand, ghee-gold, terracotta and brass; real Indian home-kitchen surfaces only (honed grey Kadappa stone, aged teak, unbleached hand-loom cotton, brass and matte stoneware); true-to-life colour, gentle contrast, soft shadows that keep detail; crisp focus on the food with a shallow, natural fall-off; photorealistic editorial food photography, as if shot on a full-frame camera with a 90 mm macro or 50 mm lens.
- **Avoid:** No text, letters, numbers, logos, labels or watermarks anywhere (jar bands stay blank). No cartoon, illustration, 3D render, CGI or plastic look. No oversaturation, HDR halos, heavy vignette, fake steam, smoke, floating ingredients, splashes, glitter or bokeh balls. No props that are not Indian home-kitchen objects. No people's faces. No extra fingers or distorted hands.

**Composition, lighting & crop:** Subject centred in the lower 70%, top 20% quiet (arch curve). Same light and palette across all five so the row reads as one set.

### 63. `occasion-bone` — Occasion — Growing kids

| | |
|---|---|
| **Save to** | `public/images/occasions/bone.jpg` |
| **Size · ratio · format** | 1200 × 1600 px · 3:4 · JPEG q82, sRGB |
| **Background** | Full-bleed photograph. |
| **Placement** | Home → “Shop by occasion” arch tile for **Growing kids** (बच्चे), links to `/shop?need=bone`. |
| **Variants** | Single file; CSS clips it to an arch. |
| **Alt text** | Decorative (the tile has a text label). |
| **Status** | New in v5. |

**Prompt:** Two dry-fruit laddus on a small brass plate beside a steel glass of milk on a kitchen counter, a child's hand (no face) reaching in. Natural window light from the upper left, soft and directional, about 5500K; warm neutral palette of ivory, sand, ghee-gold, terracotta and brass; real Indian home-kitchen surfaces only (honed grey Kadappa stone, aged teak, unbleached hand-loom cotton, brass and matte stoneware); true-to-life colour, gentle contrast, soft shadows that keep detail; crisp focus on the food with a shallow, natural fall-off; photorealistic editorial food photography, as if shot on a full-frame camera with a 90 mm macro or 50 mm lens.
- **Avoid:** No text, letters, numbers, logos, labels or watermarks anywhere (jar bands stay blank). No cartoon, illustration, 3D render, CGI or plastic look. No oversaturation, HDR halos, heavy vignette, fake steam, smoke, floating ingredients, splashes, glitter or bokeh balls. No props that are not Indian home-kitchen objects. No people's faces. No extra fingers or distorted hands.

**Composition, lighting & crop:** Subject centred in the lower 70%, top 20% quiet (arch curve). Same light and palette across all five so the row reads as one set.

### 64. `home-gifting` — Home — Gift boxes

| | |
|---|---|
| **Save to** | `public/images/home/gifting.jpg` |
| **Size · ratio · format** | 1200 × 1500 px · 4:5 · JPEG q82, sRGB |
| **Background** | Full-bleed photograph. |
| **Placement** | Home → “Gift boxes” band beside the copy and the “Shop gift boxes” button. |
| **Variants** | Single file. |
| **Alt text** | “A kraft gift box holding three jars of panjiri, pinni and mewa, tied with red cotton string” (in code). |
| **Status** | New in v5. |

**Prompt:** A kraft gift box holding three glass jars of panjiri, pinni and mewa mix, tied with red cotton string, a marigold or two and a small brass diya (unlit) beside it on aged teak. Natural window light from the upper left, soft and directional, about 5500K; warm neutral palette of ivory, sand, ghee-gold, terracotta and brass; real Indian home-kitchen surfaces only (honed grey Kadappa stone, aged teak, unbleached hand-loom cotton, brass and matte stoneware); true-to-life colour, gentle contrast, soft shadows that keep detail; crisp focus on the food with a shallow, natural fall-off; photorealistic editorial food photography, as if shot on a full-frame camera with a 90 mm macro or 50 mm lens.
- **Avoid:** No text, letters, numbers, logos, labels or watermarks anywhere (jar bands stay blank). No cartoon, illustration, 3D render, CGI or plastic look. No oversaturation, HDR halos, heavy vignette, fake steam, smoke, floating ingredients, splashes, glitter or bokeh balls. No props that are not Indian home-kitchen objects. No people's faces. No extra fingers or distorted hands.

**Composition, lighting & crop:** Three-quarter view, box centred, festive but restrained.

### 65. `home-story` — Home — Our story teaser

| | |
|---|---|
| **Save to** | `public/images/home/story.jpg` |
| **Size · ratio · format** | 1200 × 1500 px · 4:5 · JPEG q82, sRGB |
| **Background** | Full-bleed photograph. |
| **Placement** | Home → “Our story” teaser, arch-framed, links to `/our-story`. |
| **Variants** | Single file; CSS clips it to an arch. |
| **Alt text** | “A woman stirring panjiri in a heavy kadhai in a sunlit home kitchen” (in code). |
| **Status** | Revived in v5 (was obsolete in v4). |

**Prompt:** A woman's hands and forearms (face out of frame) stirring golden panjiri in a heavy iron kadhai on a home stove, sunlit kitchen behind. Natural window light from the upper left, soft and directional, about 5500K; warm neutral palette of ivory, sand, ghee-gold, terracotta and brass; real Indian home-kitchen surfaces only (honed grey Kadappa stone, aged teak, unbleached hand-loom cotton, brass and matte stoneware); true-to-life colour, gentle contrast, soft shadows that keep detail; crisp focus on the food with a shallow, natural fall-off; photorealistic editorial food photography, as if shot on a full-frame camera with a 90 mm macro or 50 mm lens.
- **Avoid:** No text, letters, numbers, logos, labels or watermarks anywhere (jar bands stay blank). No cartoon, illustration, 3D render, CGI or plastic look. No oversaturation, HDR halos, heavy vignette, fake steam, smoke, floating ingredients, splashes, glitter or bokeh balls. No props that are not Indian home-kitchen objects. No people's faces. No extra fingers or distorted hands.

**Composition, lighting & crop:** Kadhai in the lower half, light from the window behind left; top 20% calm for the arch curve.

### 66. `og` — Social share image

| | |
|---|---|
| **Save to** | `public/images/og.jpg` |
| **Size · ratio · format** | 1200 × 630 px · 1.91:1 · JPEG q85, sRGB |
| **Background** | Full-bleed photograph. |
| **Placement** | Not on a page: Open Graph / WhatsApp / X preview for every page. `src/app/layout.tsx` picks it up automatically. |
| **Variants** | Single file. |
| **Alt text** | Not shown on the page. |
| **Status** | Existing slot. |

**Prompt:** Three clear glass jars with brass lids and blank kraft bands (panjiri, pinni, mewa mix) beside a brass bowl of panjiri on honed grey Kadappa stone, the group in the right two-thirds. Natural window light from the upper left, soft and directional, about 5500K; warm neutral palette of ivory, sand, ghee-gold, terracotta and brass; real Indian home-kitchen surfaces only (honed grey Kadappa stone, aged teak, unbleached hand-loom cotton, brass and matte stoneware); true-to-life colour, gentle contrast, soft shadows that keep detail; crisp focus on the food with a shallow, natural fall-off; photorealistic editorial food photography, as if shot on a full-frame camera with a 90 mm macro or 50 mm lens. No text, letters, numbers, logos, labels or watermarks anywhere (jar bands stay blank). No cartoon, illustration, 3D render, CGI or plastic look. No oversaturation, HDR halos, heavy vignette, fake steam, smoke, floating ingredients, splashes, glitter or bokeh balls. No props that are not Indian home-kitchen objects. No people's faces. No extra fingers or distorted hands.

**Composition, lighting & crop:** Leave the left third calm (platforms overlay titles). No text in the image.

