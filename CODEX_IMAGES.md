# Image brief for Codex — Immunitywize

This file lists **every image the website needs** (36 in total): what to generate, the exact file to save it to, and exactly where it appears on the site. All paths are already wired into the code. When a file is missing, the site shows a neutral placeholder labelled with the slot name, so you can add images in any order.

## Instructions for Codex

1. For each entry below, generate the image from its **Prompt** using your image generation tool.
2. Generate at the largest supported size closest to the target aspect ratio (for example 1536×1024 landscape, 1024×1536 portrait, 1024×1024 square). Then **centre-crop to the exact aspect ratio** and resize to the **Final size**. Don't upscale more than 1.6×; if the source is smaller than the final size after cropping, keep the cropped resolution.
3. Save as **JPEG, quality 82, sRGB** at the exact **Save to** path. `.webp` and `.avif` with the same name also work. Create folders as needed.
4. Do **not** edit any code. The site resolves images by path automatically.
5. When done, run:
   ```bash
   pnpm images:manifest   # registers the new files (also runs automatically on dev/build)
   pnpm build && pnpm start
   ```
   Then check `/`, `/shop`, a product page such as `/shop/classic-panjiri`, and `/our-story`. No placeholder labels should remain.
6. Commit the images under `public/images/` together with the updated `src/data/image-manifest.json`.

## Global art direction (applies to every image)

- **Look:** Editorial food photography, natural soft daylight from a window on the left, warm neutral palette (ivory, sand, terracotta, brass, muted sage), real Indian home-kitchen materials (grey Kadappa stone, worn wood, hand-loomed cotton, brass and steel utensils), shallow depth of field, gentle shadows, true-to-life colour, slightly warm white balance. Photorealistic, shot on a full-frame camera with a 50–85 mm lens.
- **Avoid:** No text, letters, logos, labels, watermarks or brand names anywhere. No CGI look, no oversaturation, no heavy vignette, no fake steam, no plastic props, no cluttered styling, no stock-photo smiles.
- **People:** hands, backs or soft profiles only. No faces looking at the camera.
- **Consistency:** packshots share one jar, angle, backdrop and light. Categories share one backdrop.
- **Honesty:** these images are placeholders for styling. Replace them with real product photography before launch, and don't treat them as a record of actual recipes or packaging.

## Where each image appears (summary)

| Page / component | Images |
|---|---|
| Home → hero | `home-hero` (≥700 px), `home-hero-mobile` (<700 px) |
| Home → Shop by category | `category-panjiri`, `category-pinni`, `category-laddus`, `category-mixes`, `category-gift-boxes` |
| Home → Bestsellers, Shop grid, related products, search, cart, cart drawer | `<product>-1` (main), `<product>-2` (card hover) |
| Product page gallery (`/shop/<product>`) | `<product>-1`, `<product>-2`, `<product>-3` |
| Home → Shop by need | `home-ingredients` |
| Home → Custom batches section, and the desktop Shop mega menu | `home-customise` |
| Home → Our story teaser | `home-story` |
| Our story page | `story-hero`, `story-roasting`, `story-rolling`, `story-packing` |
| Social share preview | `og` |

Product slugs: `classic-panjiri`, `mothers-panjiri`, `atta-pinni`, `dry-fruit-laddu`, `seasonal-laddu`, `everyday-mix`, `study-table-mix`.

---

## Images

### 1. `home-hero`

| | |
|---|---|
| **Save to** | `public/images/home/hero.jpg` |
| **Final size** | 2400 × 1050 (16:7) |
| **Used on** | Home page → hero, full-width image directly under the headline and the two buttons (desktop and tablet, ≥700 px). `src/app/page.tsx` → `HeroImage`. |
| **Alt text (already in code)** | A brass kadhai of golden panjiri on a stone counter beside dry-fruit laddus and jars of nuts, in soft morning light |

**Prompt:** Wide still life on a grey stone kitchen counter: a heavy brass kadhai of freshly roasted golden panjiri in the centre, a brass plate of dry-fruit laddus to its right, two small glass jars of almonds and cashews to its left, a folded cotton cloth, morning light raking across from the left. Editorial food photography, natural soft daylight from a window on the left, warm neutral palette (ivory, sand, terracotta, brass, muted sage), real Indian home-kitchen materials (grey Kadappa stone, worn wood, hand-loomed cotton, brass and steel utensils), shallow depth of field, gentle shadows, true-to-life colour, slightly warm white balance. Photorealistic, shot on a full-frame camera with a 50–85 mm lens. No text, letters, logos, labels, watermarks or brand names anywhere. No CGI look, no oversaturation, no heavy vignette, no fake steam, no plastic props, no cluttered styling, no stock-photo smiles.

**Composition notes:** Very wide, calm composition. Keep the main subject in the central third; the image is centred under centred text. Leave generous empty counter space at both sides.

### 2. `home-hero-mobile`

| | |
|---|---|
| **Save to** | `public/images/home/hero-mobile.jpg` |
| **Final size** | 1200 × 1200 (1:1) |
| **Used on** | Home page → hero on phones (<700 px). Same scene as #1, square crop. |
| **Alt text (already in code)** | A brass kadhai of golden panjiri on a stone counter beside dry-fruit laddus and jars of nuts, in soft morning light |

**Prompt:** Square version of the same scene: a heavy brass kadhai of golden roasted panjiri on grey stone, a few dry-fruit laddus and a small glass jar of almonds beside it, morning light from the left. Editorial food photography, natural soft daylight from a window on the left, warm neutral palette (ivory, sand, terracotta, brass, muted sage), real Indian home-kitchen materials (grey Kadappa stone, worn wood, hand-loomed cotton, brass and steel utensils), shallow depth of field, gentle shadows, true-to-life colour, slightly warm white balance. Photorealistic, shot on a full-frame camera with a 50–85 mm lens. No text, letters, logos, labels, watermarks or brand names anywhere. No CGI look, no oversaturation, no heavy vignette, no fake steam, no plastic props, no cluttered styling, no stock-photo smiles.

**Composition notes:** Match the styling, light and props of #1 so desktop and mobile feel like the same photo.

### 3. `category-panjiri`

| | |
|---|---|
| **Save to** | `public/images/categories/panjiri.jpg` |
| **Final size** | 1200 × 1500 (4:5) |
| **Used on** | Home page → “Shop by category” tile for **Panjiri** (`src/app/page.tsx`). Clicking it opens `/shop?category=panjiri`. |
| **Alt text (already in code)** | A bowl of golden panjiri with a brass spoon |

**Prompt:** Overhead three-quarter view of a shallow brass bowl of golden-brown roasted wholewheat crumble (panjiri) with a small brass spoon resting in it, on hand-loomed cotton, on a muted sand-coloured linen backdrop. Editorial food photography, natural soft daylight from a window on the left, warm neutral palette (ivory, sand, terracotta, brass, muted sage), real Indian home-kitchen materials (grey Kadappa stone, worn wood, hand-loomed cotton, brass and steel utensils), shallow depth of field, gentle shadows, true-to-life colour, slightly warm white balance. Photorealistic, shot on a full-frame camera with a 50–85 mm lens. No text, letters, logos, labels, watermarks or brand names anywhere. No CGI look, no oversaturation, no heavy vignette, no fake steam, no plastic props, no cluttered styling, no stock-photo smiles.

**Composition notes:** Subject centred, filling about 60% of the frame. Keep backgrounds consistent across all five category images.

### 4. `category-pinni`

| | |
|---|---|
| **Save to** | `public/images/categories/pinni.jpg` |
| **Final size** | 1200 × 1500 (4:5) |
| **Used on** | Home page → “Shop by category” tile for **Pinni** (`src/app/page.tsx`). Clicking it opens `/shop?category=pinni`. |
| **Alt text (already in code)** | Hand-pressed pinni stacked on a ceramic plate |

**Prompt:** Overhead three-quarter view of a small stack of round, hand-pressed golden-brown pinni on a matte off-white ceramic plate, on a muted sand-coloured linen backdrop. Editorial food photography, natural soft daylight from a window on the left, warm neutral palette (ivory, sand, terracotta, brass, muted sage), real Indian home-kitchen materials (grey Kadappa stone, worn wood, hand-loomed cotton, brass and steel utensils), shallow depth of field, gentle shadows, true-to-life colour, slightly warm white balance. Photorealistic, shot on a full-frame camera with a 50–85 mm lens. No text, letters, logos, labels, watermarks or brand names anywhere. No CGI look, no oversaturation, no heavy vignette, no fake steam, no plastic props, no cluttered styling, no stock-photo smiles.

**Composition notes:** Subject centred, filling about 60% of the frame. Keep backgrounds consistent across all five category images.

### 5. `category-laddus`

| | |
|---|---|
| **Save to** | `public/images/categories/laddus.jpg` |
| **Final size** | 1200 × 1500 (4:5) |
| **Used on** | Home page → “Shop by category” tile for **Dry-fruit laddus** (`src/app/page.tsx`). Clicking it opens `/shop?category=laddus`. |
| **Alt text (already in code)** | Dry-fruit laddus arranged on a brass thali |

**Prompt:** Overhead three-quarter view of deep brown dry-fruit laddus arranged in a loose circle on a brass thali, on a muted sand-coloured linen backdrop. Editorial food photography, natural soft daylight from a window on the left, warm neutral palette (ivory, sand, terracotta, brass, muted sage), real Indian home-kitchen materials (grey Kadappa stone, worn wood, hand-loomed cotton, brass and steel utensils), shallow depth of field, gentle shadows, true-to-life colour, slightly warm white balance. Photorealistic, shot on a full-frame camera with a 50–85 mm lens. No text, letters, logos, labels, watermarks or brand names anywhere. No CGI look, no oversaturation, no heavy vignette, no fake steam, no plastic props, no cluttered styling, no stock-photo smiles.

**Composition notes:** Subject centred, filling about 60% of the frame. Keep backgrounds consistent across all five category images.

### 6. `category-mixes`

| | |
|---|---|
| **Save to** | `public/images/categories/mixes.jpg` |
| **Final size** | 1200 × 1500 (4:5) |
| **Used on** | Home page → “Shop by category” tile for **Dry-fruit mixes** (`src/app/page.tsx`). Clicking it opens `/shop?category=mixes`. |
| **Alt text (already in code)** | A glass jar of roasted nuts, seeds and dried fruit |

**Prompt:** Overhead three-quarter view of a glass jar, lid off, filled with roasted nuts, seeds and raisins, a few spilling onto the stone surface, on a muted sand-coloured linen backdrop. Editorial food photography, natural soft daylight from a window on the left, warm neutral palette (ivory, sand, terracotta, brass, muted sage), real Indian home-kitchen materials (grey Kadappa stone, worn wood, hand-loomed cotton, brass and steel utensils), shallow depth of field, gentle shadows, true-to-life colour, slightly warm white balance. Photorealistic, shot on a full-frame camera with a 50–85 mm lens. No text, letters, logos, labels, watermarks or brand names anywhere. No CGI look, no oversaturation, no heavy vignette, no fake steam, no plastic props, no cluttered styling, no stock-photo smiles.

**Composition notes:** Subject centred, filling about 60% of the frame. Keep backgrounds consistent across all five category images.

### 7. `category-gift-boxes`

| | |
|---|---|
| **Save to** | `public/images/categories/gift-boxes.jpg` |
| **Final size** | 1200 × 1500 (4:5) |
| **Used on** | Home page → “Shop by category” tile for **Gift boxes** (`src/app/page.tsx`). Clicking it opens `/shop?category=gift-boxes`. |
| **Alt text (already in code)** | A wrapped gift box of homemade sweets tied with cotton string |

**Prompt:** Overhead three-quarter view of a plain kraft-paper gift box tied with natural cotton string, with a sprig of dried flowers tucked under it, on a muted sand-coloured linen backdrop. Editorial food photography, natural soft daylight from a window on the left, warm neutral palette (ivory, sand, terracotta, brass, muted sage), real Indian home-kitchen materials (grey Kadappa stone, worn wood, hand-loomed cotton, brass and steel utensils), shallow depth of field, gentle shadows, true-to-life colour, slightly warm white balance. Photorealistic, shot on a full-frame camera with a 50–85 mm lens. No text, letters, logos, labels, watermarks or brand names anywhere. No CGI look, no oversaturation, no heavy vignette, no fake steam, no plastic props, no cluttered styling, no stock-photo smiles.

**Composition notes:** Subject centred, filling about 60% of the frame. Keep backgrounds consistent across all five category images.

### 8. `classic-panjiri-1`

| | |
|---|---|
| **Save to** | `public/images/products/classic-panjiri/1.jpg` |
| **Final size** | 1200 × 1500 (4:5) |
| **Used on** | **Main product image** for Ghar ki Panjiri: product cards (home Bestsellers, shop grid, “You may also like”), search results, cart and cart-drawer thumbnails, and image 1 of the product-page gallery (`/shop/classic-panjiri`). |
| **Alt text (already in code)** | Ghar ki Panjiri in a glass jar |

**Prompt:** Clean packshot: a clear cylindrical glass jar with a plain, blank kraft-paper band, filled with golden-brown, coarse roasted wholewheat crumble with visible slivers of nuts, a little of the product spilled beside the jar. Three-quarter front view on a seamless warm sand backdrop (#EFE7DB), soft shadow. Editorial food photography, natural soft daylight from a window on the left, warm neutral palette (ivory, sand, terracotta, brass, muted sage), real Indian home-kitchen materials (grey Kadappa stone, worn wood, hand-loomed cotton, brass and steel utensils), shallow depth of field, gentle shadows, true-to-life colour, slightly warm white balance. Photorealistic, shot on a full-frame camera with a 50–85 mm lens. No text, letters, logos, labels, watermarks or brand names anywhere. No CGI look, no oversaturation, no heavy vignette, no fake steam, no plastic props, no cluttered styling, no stock-photo smiles.

**Composition notes:** Same jar, camera angle, backdrop and light for every product packshot. Keep the top-left quarter calm (badges sit there in the UI). Jar centred, about 65% of the frame height. The jar label must stay blank.

### 9. `classic-panjiri-2`

| | |
|---|---|
| **Save to** | `public/images/products/classic-panjiri/2.jpg` |
| **Final size** | 1200 × 1500 (4:5) |
| **Used on** | Product card **hover image** for Ghar ki Panjiri, and image 2 of the product-page gallery. |
| **Alt text (already in code)** | Close-up of Ghar ki Panjiri |

**Prompt:** Macro close-up of golden-brown, coarse roasted wholewheat crumble with visible slivers of nuts in a small brass or matte ceramic bowl, crisp detail on the texture, background softly out of focus. Editorial food photography, natural soft daylight from a window on the left, warm neutral palette (ivory, sand, terracotta, brass, muted sage), real Indian home-kitchen materials (grey Kadappa stone, worn wood, hand-loomed cotton, brass and steel utensils), shallow depth of field, gentle shadows, true-to-life colour, slightly warm white balance. Photorealistic, shot on a full-frame camera with a 50–85 mm lens. No text, letters, logos, labels, watermarks or brand names anywhere. No CGI look, no oversaturation, no heavy vignette, no fake steam, no plastic props, no cluttered styling, no stock-photo smiles.

**Composition notes:** Fill the frame with texture; this is about appetite appeal.

### 10. `classic-panjiri-3`

| | |
|---|---|
| **Save to** | `public/images/products/classic-panjiri/3.jpg` |
| **Final size** | 1200 × 1500 (4:5) |
| **Used on** | Image 3 of the product-page gallery for Ghar ki Panjiri. |
| **Alt text (already in code)** | Ghar ki Panjiri served at home |

**Prompt:** Served at home: golden-brown, coarse roasted wholewheat crumble with visible slivers of nuts in a small bowl on a wooden table next to a cup of masala chai in a steel tumbler, a hand reaching in from the edge of the frame (no face visible). Editorial food photography, natural soft daylight from a window on the left, warm neutral palette (ivory, sand, terracotta, brass, muted sage), real Indian home-kitchen materials (grey Kadappa stone, worn wood, hand-loomed cotton, brass and steel utensils), shallow depth of field, gentle shadows, true-to-life colour, slightly warm white balance. Photorealistic, shot on a full-frame camera with a 50–85 mm lens. No text, letters, logos, labels, watermarks or brand names anywhere. No CGI look, no oversaturation, no heavy vignette, no fake steam, no plastic props, no cluttered styling, no stock-photo smiles.

**Composition notes:** Lived-in but tidy. Only hands, no faces.

### 11. `mothers-panjiri-1`

| | |
|---|---|
| **Save to** | `public/images/products/mothers-panjiri/1.jpg` |
| **Final size** | 1200 × 1500 (4:5) |
| **Used on** | **Main product image** for Panjiri for New Mothers: product cards (home Bestsellers, shop grid, “You may also like”), search results, cart and cart-drawer thumbnails, and image 1 of the product-page gallery (`/shop/mothers-panjiri`). |
| **Alt text (already in code)** | Panjiri for New Mothers in a glass jar |

**Prompt:** Clean packshot: a clear cylindrical glass jar with a plain, blank kraft-paper band, filled with a richer, darker roasted crumble flecked with chopped nuts and seeds, a little of the product spilled beside the jar. Three-quarter front view on a seamless warm sand backdrop (#EFE7DB), soft shadow. Editorial food photography, natural soft daylight from a window on the left, warm neutral palette (ivory, sand, terracotta, brass, muted sage), real Indian home-kitchen materials (grey Kadappa stone, worn wood, hand-loomed cotton, brass and steel utensils), shallow depth of field, gentle shadows, true-to-life colour, slightly warm white balance. Photorealistic, shot on a full-frame camera with a 50–85 mm lens. No text, letters, logos, labels, watermarks or brand names anywhere. No CGI look, no oversaturation, no heavy vignette, no fake steam, no plastic props, no cluttered styling, no stock-photo smiles.

**Composition notes:** Same jar, camera angle, backdrop and light for every product packshot. Keep the top-left quarter calm (badges sit there in the UI). Jar centred, about 65% of the frame height. The jar label must stay blank.

### 12. `mothers-panjiri-2`

| | |
|---|---|
| **Save to** | `public/images/products/mothers-panjiri/2.jpg` |
| **Final size** | 1200 × 1500 (4:5) |
| **Used on** | Product card **hover image** for Panjiri for New Mothers, and image 2 of the product-page gallery. |
| **Alt text (already in code)** | Close-up of Panjiri for New Mothers |

**Prompt:** Macro close-up of a richer, darker roasted crumble flecked with chopped nuts and seeds in a small brass or matte ceramic bowl, crisp detail on the texture, background softly out of focus. Editorial food photography, natural soft daylight from a window on the left, warm neutral palette (ivory, sand, terracotta, brass, muted sage), real Indian home-kitchen materials (grey Kadappa stone, worn wood, hand-loomed cotton, brass and steel utensils), shallow depth of field, gentle shadows, true-to-life colour, slightly warm white balance. Photorealistic, shot on a full-frame camera with a 50–85 mm lens. No text, letters, logos, labels, watermarks or brand names anywhere. No CGI look, no oversaturation, no heavy vignette, no fake steam, no plastic props, no cluttered styling, no stock-photo smiles.

**Composition notes:** Fill the frame with texture; this is about appetite appeal.

### 13. `mothers-panjiri-3`

| | |
|---|---|
| **Save to** | `public/images/products/mothers-panjiri/3.jpg` |
| **Final size** | 1200 × 1500 (4:5) |
| **Used on** | Image 3 of the product-page gallery for Panjiri for New Mothers. |
| **Alt text (already in code)** | Panjiri for New Mothers served at home |

**Prompt:** Served at home: a richer, darker roasted crumble flecked with chopped nuts and seeds in a small bowl on a wooden table next to a cup of masala chai in a steel tumbler, a hand reaching in from the edge of the frame (no face visible). Editorial food photography, natural soft daylight from a window on the left, warm neutral palette (ivory, sand, terracotta, brass, muted sage), real Indian home-kitchen materials (grey Kadappa stone, worn wood, hand-loomed cotton, brass and steel utensils), shallow depth of field, gentle shadows, true-to-life colour, slightly warm white balance. Photorealistic, shot on a full-frame camera with a 50–85 mm lens. No text, letters, logos, labels, watermarks or brand names anywhere. No CGI look, no oversaturation, no heavy vignette, no fake steam, no plastic props, no cluttered styling, no stock-photo smiles.

**Composition notes:** Lived-in but tidy. Only hands, no faces.

### 14. `atta-pinni-1`

| | |
|---|---|
| **Save to** | `public/images/products/atta-pinni/1.jpg` |
| **Final size** | 1200 × 1500 (4:5) |
| **Used on** | **Main product image** for Atta Pinni: product cards (home Bestsellers, shop grid, “You may also like”), search results, cart and cart-drawer thumbnails, and image 1 of the product-page gallery (`/shop/atta-pinni`). |
| **Alt text (already in code)** | Atta Pinni in a glass jar |

**Prompt:** Clean packshot: a clear cylindrical glass jar with a plain, blank kraft-paper band, filled with dense, round hand-pressed sweets, golden brown, slightly crumbly, with soft finger-press marks, a little of the product spilled beside the jar. Three-quarter front view on a seamless warm sand backdrop (#EFE7DB), soft shadow. Editorial food photography, natural soft daylight from a window on the left, warm neutral palette (ivory, sand, terracotta, brass, muted sage), real Indian home-kitchen materials (grey Kadappa stone, worn wood, hand-loomed cotton, brass and steel utensils), shallow depth of field, gentle shadows, true-to-life colour, slightly warm white balance. Photorealistic, shot on a full-frame camera with a 50–85 mm lens. No text, letters, logos, labels, watermarks or brand names anywhere. No CGI look, no oversaturation, no heavy vignette, no fake steam, no plastic props, no cluttered styling, no stock-photo smiles.

**Composition notes:** Same jar, camera angle, backdrop and light for every product packshot. Keep the top-left quarter calm (badges sit there in the UI). Jar centred, about 65% of the frame height. The jar label must stay blank.

### 15. `atta-pinni-2`

| | |
|---|---|
| **Save to** | `public/images/products/atta-pinni/2.jpg` |
| **Final size** | 1200 × 1500 (4:5) |
| **Used on** | Product card **hover image** for Atta Pinni, and image 2 of the product-page gallery. |
| **Alt text (already in code)** | Close-up of Atta Pinni |

**Prompt:** Macro close-up of dense, round hand-pressed sweets, golden brown, slightly crumbly, with soft finger-press marks in a small brass or matte ceramic bowl, crisp detail on the texture, background softly out of focus. Editorial food photography, natural soft daylight from a window on the left, warm neutral palette (ivory, sand, terracotta, brass, muted sage), real Indian home-kitchen materials (grey Kadappa stone, worn wood, hand-loomed cotton, brass and steel utensils), shallow depth of field, gentle shadows, true-to-life colour, slightly warm white balance. Photorealistic, shot on a full-frame camera with a 50–85 mm lens. No text, letters, logos, labels, watermarks or brand names anywhere. No CGI look, no oversaturation, no heavy vignette, no fake steam, no plastic props, no cluttered styling, no stock-photo smiles.

**Composition notes:** Fill the frame with texture; this is about appetite appeal.

### 16. `atta-pinni-3`

| | |
|---|---|
| **Save to** | `public/images/products/atta-pinni/3.jpg` |
| **Final size** | 1200 × 1500 (4:5) |
| **Used on** | Image 3 of the product-page gallery for Atta Pinni. |
| **Alt text (already in code)** | Atta Pinni served at home |

**Prompt:** Served at home: dense, round hand-pressed sweets, golden brown, slightly crumbly, with soft finger-press marks in a small bowl on a wooden table next to a cup of masala chai in a steel tumbler, a hand reaching in from the edge of the frame (no face visible). Editorial food photography, natural soft daylight from a window on the left, warm neutral palette (ivory, sand, terracotta, brass, muted sage), real Indian home-kitchen materials (grey Kadappa stone, worn wood, hand-loomed cotton, brass and steel utensils), shallow depth of field, gentle shadows, true-to-life colour, slightly warm white balance. Photorealistic, shot on a full-frame camera with a 50–85 mm lens. No text, letters, logos, labels, watermarks or brand names anywhere. No CGI look, no oversaturation, no heavy vignette, no fake steam, no plastic props, no cluttered styling, no stock-photo smiles.

**Composition notes:** Lived-in but tidy. Only hands, no faces.

### 17. `dry-fruit-laddu-1`

| | |
|---|---|
| **Save to** | `public/images/products/dry-fruit-laddu/1.jpg` |
| **Final size** | 1200 × 1500 (4:5) |
| **Used on** | **Main product image** for Dry-Fruit Laddu: product cards (home Bestsellers, shop grid, “You may also like”), search results, cart and cart-drawer thumbnails, and image 1 of the product-page gallery (`/shop/dry-fruit-laddu`). |
| **Alt text (already in code)** | Dry-Fruit Laddu in a glass jar |

**Prompt:** Clean packshot: a clear cylindrical glass jar with a plain, blank kraft-paper band, filled with deep brown, glossy round laddus made of finely chopped dates and nuts, a little of the product spilled beside the jar. Three-quarter front view on a seamless warm sand backdrop (#EFE7DB), soft shadow. Editorial food photography, natural soft daylight from a window on the left, warm neutral palette (ivory, sand, terracotta, brass, muted sage), real Indian home-kitchen materials (grey Kadappa stone, worn wood, hand-loomed cotton, brass and steel utensils), shallow depth of field, gentle shadows, true-to-life colour, slightly warm white balance. Photorealistic, shot on a full-frame camera with a 50–85 mm lens. No text, letters, logos, labels, watermarks or brand names anywhere. No CGI look, no oversaturation, no heavy vignette, no fake steam, no plastic props, no cluttered styling, no stock-photo smiles.

**Composition notes:** Same jar, camera angle, backdrop and light for every product packshot. Keep the top-left quarter calm (badges sit there in the UI). Jar centred, about 65% of the frame height. The jar label must stay blank.

### 18. `dry-fruit-laddu-2`

| | |
|---|---|
| **Save to** | `public/images/products/dry-fruit-laddu/2.jpg` |
| **Final size** | 1200 × 1500 (4:5) |
| **Used on** | Product card **hover image** for Dry-Fruit Laddu, and image 2 of the product-page gallery. |
| **Alt text (already in code)** | Close-up of Dry-Fruit Laddu |

**Prompt:** Macro close-up of deep brown, glossy round laddus made of finely chopped dates and nuts in a small brass or matte ceramic bowl, crisp detail on the texture, background softly out of focus. Editorial food photography, natural soft daylight from a window on the left, warm neutral palette (ivory, sand, terracotta, brass, muted sage), real Indian home-kitchen materials (grey Kadappa stone, worn wood, hand-loomed cotton, brass and steel utensils), shallow depth of field, gentle shadows, true-to-life colour, slightly warm white balance. Photorealistic, shot on a full-frame camera with a 50–85 mm lens. No text, letters, logos, labels, watermarks or brand names anywhere. No CGI look, no oversaturation, no heavy vignette, no fake steam, no plastic props, no cluttered styling, no stock-photo smiles.

**Composition notes:** Fill the frame with texture; this is about appetite appeal.

### 19. `dry-fruit-laddu-3`

| | |
|---|---|
| **Save to** | `public/images/products/dry-fruit-laddu/3.jpg` |
| **Final size** | 1200 × 1500 (4:5) |
| **Used on** | Image 3 of the product-page gallery for Dry-Fruit Laddu. |
| **Alt text (already in code)** | Dry-Fruit Laddu served at home |

**Prompt:** Served at home: deep brown, glossy round laddus made of finely chopped dates and nuts in a small bowl on a wooden table next to a cup of masala chai in a steel tumbler, a hand reaching in from the edge of the frame (no face visible). Editorial food photography, natural soft daylight from a window on the left, warm neutral palette (ivory, sand, terracotta, brass, muted sage), real Indian home-kitchen materials (grey Kadappa stone, worn wood, hand-loomed cotton, brass and steel utensils), shallow depth of field, gentle shadows, true-to-life colour, slightly warm white balance. Photorealistic, shot on a full-frame camera with a 50–85 mm lens. No text, letters, logos, labels, watermarks or brand names anywhere. No CGI look, no oversaturation, no heavy vignette, no fake steam, no plastic props, no cluttered styling, no stock-photo smiles.

**Composition notes:** Lived-in but tidy. Only hands, no faces.

### 20. `seasonal-laddu-1`

| | |
|---|---|
| **Save to** | `public/images/products/seasonal-laddu/1.jpg` |
| **Final size** | 1200 × 1500 (4:5) |
| **Used on** | **Main product image** for Seasonal Laddu: product cards (home Bestsellers, shop grid, “You may also like”), search results, cart and cart-drawer thumbnails, and image 1 of the product-page gallery (`/shop/seasonal-laddu`). |
| **Alt text (already in code)** | Seasonal Laddu in a glass jar |

**Prompt:** Clean packshot: a clear cylindrical glass jar with a plain, blank kraft-paper band, filled with pale golden laddus flecked with desiccated coconut and chopped nuts, a little of the product spilled beside the jar. Three-quarter front view on a seamless warm sand backdrop (#EFE7DB), soft shadow. Editorial food photography, natural soft daylight from a window on the left, warm neutral palette (ivory, sand, terracotta, brass, muted sage), real Indian home-kitchen materials (grey Kadappa stone, worn wood, hand-loomed cotton, brass and steel utensils), shallow depth of field, gentle shadows, true-to-life colour, slightly warm white balance. Photorealistic, shot on a full-frame camera with a 50–85 mm lens. No text, letters, logos, labels, watermarks or brand names anywhere. No CGI look, no oversaturation, no heavy vignette, no fake steam, no plastic props, no cluttered styling, no stock-photo smiles.

**Composition notes:** Same jar, camera angle, backdrop and light for every product packshot. Keep the top-left quarter calm (badges sit there in the UI). Jar centred, about 65% of the frame height. The jar label must stay blank.

### 21. `seasonal-laddu-2`

| | |
|---|---|
| **Save to** | `public/images/products/seasonal-laddu/2.jpg` |
| **Final size** | 1200 × 1500 (4:5) |
| **Used on** | Product card **hover image** for Seasonal Laddu, and image 2 of the product-page gallery. |
| **Alt text (already in code)** | Close-up of Seasonal Laddu |

**Prompt:** Macro close-up of pale golden laddus flecked with desiccated coconut and chopped nuts in a small brass or matte ceramic bowl, crisp detail on the texture, background softly out of focus. Editorial food photography, natural soft daylight from a window on the left, warm neutral palette (ivory, sand, terracotta, brass, muted sage), real Indian home-kitchen materials (grey Kadappa stone, worn wood, hand-loomed cotton, brass and steel utensils), shallow depth of field, gentle shadows, true-to-life colour, slightly warm white balance. Photorealistic, shot on a full-frame camera with a 50–85 mm lens. No text, letters, logos, labels, watermarks or brand names anywhere. No CGI look, no oversaturation, no heavy vignette, no fake steam, no plastic props, no cluttered styling, no stock-photo smiles.

**Composition notes:** Fill the frame with texture; this is about appetite appeal.

### 22. `seasonal-laddu-3`

| | |
|---|---|
| **Save to** | `public/images/products/seasonal-laddu/3.jpg` |
| **Final size** | 1200 × 1500 (4:5) |
| **Used on** | Image 3 of the product-page gallery for Seasonal Laddu. |
| **Alt text (already in code)** | Seasonal Laddu served at home |

**Prompt:** Served at home: pale golden laddus flecked with desiccated coconut and chopped nuts in a small bowl on a wooden table next to a cup of masala chai in a steel tumbler, a hand reaching in from the edge of the frame (no face visible). Editorial food photography, natural soft daylight from a window on the left, warm neutral palette (ivory, sand, terracotta, brass, muted sage), real Indian home-kitchen materials (grey Kadappa stone, worn wood, hand-loomed cotton, brass and steel utensils), shallow depth of field, gentle shadows, true-to-life colour, slightly warm white balance. Photorealistic, shot on a full-frame camera with a 50–85 mm lens. No text, letters, logos, labels, watermarks or brand names anywhere. No CGI look, no oversaturation, no heavy vignette, no fake steam, no plastic props, no cluttered styling, no stock-photo smiles.

**Composition notes:** Lived-in but tidy. Only hands, no faces.

### 23. `everyday-mix-1`

| | |
|---|---|
| **Save to** | `public/images/products/everyday-mix/1.jpg` |
| **Final size** | 1200 × 1500 (4:5) |
| **Used on** | **Main product image** for Everyday Mewa Mix: product cards (home Bestsellers, shop grid, “You may also like”), search results, cart and cart-drawer thumbnails, and image 1 of the product-page gallery (`/shop/everyday-mix`). |
| **Alt text (already in code)** | Everyday Mewa Mix in a glass jar |

**Prompt:** Clean packshot: a clear cylindrical glass jar with a plain, blank kraft-paper band, filled with a mix of lightly roasted almonds, cashews, raisins and pumpkin seeds, a little of the product spilled beside the jar. Three-quarter front view on a seamless warm sand backdrop (#EFE7DB), soft shadow. Editorial food photography, natural soft daylight from a window on the left, warm neutral palette (ivory, sand, terracotta, brass, muted sage), real Indian home-kitchen materials (grey Kadappa stone, worn wood, hand-loomed cotton, brass and steel utensils), shallow depth of field, gentle shadows, true-to-life colour, slightly warm white balance. Photorealistic, shot on a full-frame camera with a 50–85 mm lens. No text, letters, logos, labels, watermarks or brand names anywhere. No CGI look, no oversaturation, no heavy vignette, no fake steam, no plastic props, no cluttered styling, no stock-photo smiles.

**Composition notes:** Same jar, camera angle, backdrop and light for every product packshot. Keep the top-left quarter calm (badges sit there in the UI). Jar centred, about 65% of the frame height. The jar label must stay blank.

### 24. `everyday-mix-2`

| | |
|---|---|
| **Save to** | `public/images/products/everyday-mix/2.jpg` |
| **Final size** | 1200 × 1500 (4:5) |
| **Used on** | Product card **hover image** for Everyday Mewa Mix, and image 2 of the product-page gallery. |
| **Alt text (already in code)** | Close-up of Everyday Mewa Mix |

**Prompt:** Macro close-up of a mix of lightly roasted almonds, cashews, raisins and pumpkin seeds in a small brass or matte ceramic bowl, crisp detail on the texture, background softly out of focus. Editorial food photography, natural soft daylight from a window on the left, warm neutral palette (ivory, sand, terracotta, brass, muted sage), real Indian home-kitchen materials (grey Kadappa stone, worn wood, hand-loomed cotton, brass and steel utensils), shallow depth of field, gentle shadows, true-to-life colour, slightly warm white balance. Photorealistic, shot on a full-frame camera with a 50–85 mm lens. No text, letters, logos, labels, watermarks or brand names anywhere. No CGI look, no oversaturation, no heavy vignette, no fake steam, no plastic props, no cluttered styling, no stock-photo smiles.

**Composition notes:** Fill the frame with texture; this is about appetite appeal.

### 25. `everyday-mix-3`

| | |
|---|---|
| **Save to** | `public/images/products/everyday-mix/3.jpg` |
| **Final size** | 1200 × 1500 (4:5) |
| **Used on** | Image 3 of the product-page gallery for Everyday Mewa Mix. |
| **Alt text (already in code)** | Everyday Mewa Mix served at home |

**Prompt:** Served at home: a mix of lightly roasted almonds, cashews, raisins and pumpkin seeds in a small bowl on a wooden table next to a cup of masala chai in a steel tumbler, a hand reaching in from the edge of the frame (no face visible). Editorial food photography, natural soft daylight from a window on the left, warm neutral palette (ivory, sand, terracotta, brass, muted sage), real Indian home-kitchen materials (grey Kadappa stone, worn wood, hand-loomed cotton, brass and steel utensils), shallow depth of field, gentle shadows, true-to-life colour, slightly warm white balance. Photorealistic, shot on a full-frame camera with a 50–85 mm lens. No text, letters, logos, labels, watermarks or brand names anywhere. No CGI look, no oversaturation, no heavy vignette, no fake steam, no plastic props, no cluttered styling, no stock-photo smiles.

**Composition notes:** Lived-in but tidy. Only hands, no faces.

### 26. `study-table-mix-1`

| | |
|---|---|
| **Save to** | `public/images/products/study-table-mix/1.jpg` |
| **Final size** | 1200 × 1500 (4:5) |
| **Used on** | **Main product image** for Study-Table Mix: product cards (home Bestsellers, shop grid, “You may also like”), search results, cart and cart-drawer thumbnails, and image 1 of the product-page gallery (`/shop/study-table-mix`). |
| **Alt text (already in code)** | Study-Table Mix in a glass jar |

**Prompt:** Clean packshot: a clear cylindrical glass jar with a plain, blank kraft-paper band, filled with a crunchy mix of roasted nuts, seeds and puffed lotus seeds (makhana), a little of the product spilled beside the jar. Three-quarter front view on a seamless warm sand backdrop (#EFE7DB), soft shadow. Editorial food photography, natural soft daylight from a window on the left, warm neutral palette (ivory, sand, terracotta, brass, muted sage), real Indian home-kitchen materials (grey Kadappa stone, worn wood, hand-loomed cotton, brass and steel utensils), shallow depth of field, gentle shadows, true-to-life colour, slightly warm white balance. Photorealistic, shot on a full-frame camera with a 50–85 mm lens. No text, letters, logos, labels, watermarks or brand names anywhere. No CGI look, no oversaturation, no heavy vignette, no fake steam, no plastic props, no cluttered styling, no stock-photo smiles.

**Composition notes:** Same jar, camera angle, backdrop and light for every product packshot. Keep the top-left quarter calm (badges sit there in the UI). Jar centred, about 65% of the frame height. The jar label must stay blank.

### 27. `study-table-mix-2`

| | |
|---|---|
| **Save to** | `public/images/products/study-table-mix/2.jpg` |
| **Final size** | 1200 × 1500 (4:5) |
| **Used on** | Product card **hover image** for Study-Table Mix, and image 2 of the product-page gallery. |
| **Alt text (already in code)** | Close-up of Study-Table Mix |

**Prompt:** Macro close-up of a crunchy mix of roasted nuts, seeds and puffed lotus seeds (makhana) in a small brass or matte ceramic bowl, crisp detail on the texture, background softly out of focus. Editorial food photography, natural soft daylight from a window on the left, warm neutral palette (ivory, sand, terracotta, brass, muted sage), real Indian home-kitchen materials (grey Kadappa stone, worn wood, hand-loomed cotton, brass and steel utensils), shallow depth of field, gentle shadows, true-to-life colour, slightly warm white balance. Photorealistic, shot on a full-frame camera with a 50–85 mm lens. No text, letters, logos, labels, watermarks or brand names anywhere. No CGI look, no oversaturation, no heavy vignette, no fake steam, no plastic props, no cluttered styling, no stock-photo smiles.

**Composition notes:** Fill the frame with texture; this is about appetite appeal.

### 28. `study-table-mix-3`

| | |
|---|---|
| **Save to** | `public/images/products/study-table-mix/3.jpg` |
| **Final size** | 1200 × 1500 (4:5) |
| **Used on** | Image 3 of the product-page gallery for Study-Table Mix. |
| **Alt text (already in code)** | Study-Table Mix served at home |

**Prompt:** Served at home: a crunchy mix of roasted nuts, seeds and puffed lotus seeds (makhana) in a small bowl on a wooden table next to a cup of masala chai in a steel tumbler, a hand reaching in from the edge of the frame (no face visible). Editorial food photography, natural soft daylight from a window on the left, warm neutral palette (ivory, sand, terracotta, brass, muted sage), real Indian home-kitchen materials (grey Kadappa stone, worn wood, hand-loomed cotton, brass and steel utensils), shallow depth of field, gentle shadows, true-to-life colour, slightly warm white balance. Photorealistic, shot on a full-frame camera with a 50–85 mm lens. No text, letters, logos, labels, watermarks or brand names anywhere. No CGI look, no oversaturation, no heavy vignette, no fake steam, no plastic props, no cluttered styling, no stock-photo smiles.

**Composition notes:** Lived-in but tidy. Only hands, no faces.

### 29. `home-ingredients`

| | |
|---|---|
| **Save to** | `public/images/home/ingredients.jpg` |
| **Final size** | 1200 × 1500 (4:5) |
| **Used on** | Home page → “Shop by need” section, tall image on the left of the list of needs. |
| **Alt text (already in code)** | Whole pantry ingredients in small brass and ceramic bowls on a linen cloth |

**Prompt:** Top-down flat lay of whole pantry ingredients in small brass and ceramic bowls on a hand-loomed off-white cotton cloth: wholewheat flour, a bowl of ghee, almonds, cashews, raisins, dates, seeds. Editorial food photography, natural soft daylight from a window on the left, warm neutral palette (ivory, sand, terracotta, brass, muted sage), real Indian home-kitchen materials (grey Kadappa stone, worn wood, hand-loomed cotton, brass and steel utensils), shallow depth of field, gentle shadows, true-to-life colour, slightly warm white balance. Photorealistic, shot on a full-frame camera with a 50–85 mm lens. No text, letters, logos, labels, watermarks or brand names anywhere. No CGI look, no oversaturation, no heavy vignette, no fake steam, no plastic props, no cluttered styling, no stock-photo smiles.

**Composition notes:** Orderly, airy grid of bowls with breathing room between them. Visual only: it does not define real recipes.

### 30. `home-customise`

| | |
|---|---|
| **Save to** | `public/images/home/customise.jpg` |
| **Final size** | 1500 × 1200 (5:4) |
| **Used on** | Home page → “Your family’s recipe, from 500 g” section (right side), **and** the featured card in the desktop “Shop” mega menu (cropped to 16:10). |
| **Alt text (already in code)** | Hands folding chopped nuts into a bowl of freshly roasted panjiri |

**Prompt:** Close-up of a woman’s hands folding chopped almonds and cashews into a large steel bowl of freshly roasted panjiri, small bowls of extra nuts and seeds nearby, on a wooden worktop. Editorial food photography, natural soft daylight from a window on the left, warm neutral palette (ivory, sand, terracotta, brass, muted sage), real Indian home-kitchen materials (grey Kadappa stone, worn wood, hand-loomed cotton, brass and steel utensils), shallow depth of field, gentle shadows, true-to-life colour, slightly warm white balance. Photorealistic, shot on a full-frame camera with a 50–85 mm lens. No text, letters, logos, labels, watermarks or brand names anywhere. No CGI look, no oversaturation, no heavy vignette, no fake steam, no plastic props, no cluttered styling, no stock-photo smiles.

**Composition notes:** Keep the hands and bowl in the centre so the 16:10 menu crop still works. No face.

### 31. `home-story`

| | |
|---|---|
| **Save to** | `public/images/home/story.jpg` |
| **Final size** | 1600 × 1200 (4:3) |
| **Used on** | Home page → “From one family kitchen to yours” story teaser, left image. |
| **Alt text (already in code)** | A woman stirring a heavy kadhai on the stove in a sunlit home kitchen |

**Prompt:** A woman in her fifties in a simple cotton salwar kameez, seen from behind or in soft profile, stirring a heavy kadhai on a gas stove in a sunlit Indian home kitchen with steel utensils on open shelves. Editorial food photography, natural soft daylight from a window on the left, warm neutral palette (ivory, sand, terracotta, brass, muted sage), real Indian home-kitchen materials (grey Kadappa stone, worn wood, hand-loomed cotton, brass and steel utensils), shallow depth of field, gentle shadows, true-to-life colour, slightly warm white balance. Photorealistic, shot on a full-frame camera with a 50–85 mm lens. No text, letters, logos, labels, watermarks or brand names anywhere. No CGI look, no oversaturation, no heavy vignette, no fake steam, no plastic props, no cluttered styling, no stock-photo smiles.

**Composition notes:** Warm and real, not staged. The face, if visible, is in soft profile and not looking at the camera.

### 32. `story-hero`

| | |
|---|---|
| **Save to** | `public/images/story/hero.jpg` |
| **Final size** | 2400 × 1050 (16:7) |
| **Used on** | Our story page (`/our-story`) → wide image under the title. |
| **Alt text (already in code)** | Two generations of a family standing together in their home kitchen |

**Prompt:** Two generations of an Indian family, an older mother and her adult daughter, standing side by side at a kitchen counter, laughing while rolling laddus, photographed from a little distance in natural light. Editorial food photography, natural soft daylight from a window on the left, warm neutral palette (ivory, sand, terracotta, brass, muted sage), real Indian home-kitchen materials (grey Kadappa stone, worn wood, hand-loomed cotton, brass and steel utensils), shallow depth of field, gentle shadows, true-to-life colour, slightly warm white balance. Photorealistic, shot on a full-frame camera with a 50–85 mm lens. No text, letters, logos, labels, watermarks or brand names anywhere. No CGI look, no oversaturation, no heavy vignette, no fake steam, no plastic props, no cluttered styling, no stock-photo smiles.

**Composition notes:** Candid moment, subjects in the central third, relaxed and not posed for the camera.

### 33. `story-roasting`

| | |
|---|---|
| **Save to** | `public/images/story/roasting.jpg` |
| **Final size** | 1200 × 1500 (4:5) |
| **Used on** | Our story page → row of three photos under the timeline. |
| **Alt text (already in code)** | Wholewheat flour being stirred in a kadhai until golden |

**Prompt:** Close-up of a wooden spatula stirring wholewheat flour in a heavy iron kadhai as it turns golden, a faint haze of warmth, flame just visible below. Editorial food photography, natural soft daylight from a window on the left, warm neutral palette (ivory, sand, terracotta, brass, muted sage), real Indian home-kitchen materials (grey Kadappa stone, worn wood, hand-loomed cotton, brass and steel utensils), shallow depth of field, gentle shadows, true-to-life colour, slightly warm white balance. Photorealistic, shot on a full-frame camera with a 50–85 mm lens. No text, letters, logos, labels, watermarks or brand names anywhere. No CGI look, no oversaturation, no heavy vignette, no fake steam, no plastic props, no cluttered styling, no stock-photo smiles.

**Composition notes:** Match the light and palette across all three.

### 34. `story-rolling`

| | |
|---|---|
| **Save to** | `public/images/story/rolling.jpg` |
| **Final size** | 1200 × 1500 (4:5) |
| **Used on** | Our story page → row of three photos under the timeline. |
| **Alt text (already in code)** | Hands rolling dry-fruit laddus one at a time |

**Prompt:** Close-up of two hands rolling a dry-fruit laddu between the palms, a tray of finished laddus beside them. Editorial food photography, natural soft daylight from a window on the left, warm neutral palette (ivory, sand, terracotta, brass, muted sage), real Indian home-kitchen materials (grey Kadappa stone, worn wood, hand-loomed cotton, brass and steel utensils), shallow depth of field, gentle shadows, true-to-life colour, slightly warm white balance. Photorealistic, shot on a full-frame camera with a 50–85 mm lens. No text, letters, logos, labels, watermarks or brand names anywhere. No CGI look, no oversaturation, no heavy vignette, no fake steam, no plastic props, no cluttered styling, no stock-photo smiles.

**Composition notes:** Match the light and palette across all three.

### 35. `story-packing`

| | |
|---|---|
| **Save to** | `public/images/story/packing.jpg` |
| **Final size** | 1200 × 1500 (4:5) |
| **Used on** | Our story page → row of three photos under the timeline. |
| **Alt text (already in code)** | Glass jars of panjiri being filled and sealed on a wooden table |

**Prompt:** Glass jars being filled with panjiri using a steel scoop on a wooden table, some already sealed with plain kraft-paper bands (no text). Editorial food photography, natural soft daylight from a window on the left, warm neutral palette (ivory, sand, terracotta, brass, muted sage), real Indian home-kitchen materials (grey Kadappa stone, worn wood, hand-loomed cotton, brass and steel utensils), shallow depth of field, gentle shadows, true-to-life colour, slightly warm white balance. Photorealistic, shot on a full-frame camera with a 50–85 mm lens. No text, letters, logos, labels, watermarks or brand names anywhere. No CGI look, no oversaturation, no heavy vignette, no fake steam, no plastic props, no cluttered styling, no stock-photo smiles.

**Composition notes:** Match the light and palette across all three.

### 36. `og`

| | |
|---|---|
| **Save to** | `public/images/og.jpg` |
| **Final size** | 1200 × 630 (1.91:1) |
| **Used on** | Social share preview (Open Graph / WhatsApp / Twitter) for the whole site. Picked up automatically by `src/app/layout.tsx`. |
| **Alt text (already in code)** | Not shown on the page; social preview only. |

**Prompt:** Wide still life of a brass thali with panjiri, laddus and pinni on grey stone, generous empty space on the left third. Editorial food photography, natural soft daylight from a window on the left, warm neutral palette (ivory, sand, terracotta, brass, muted sage), real Indian home-kitchen materials (grey Kadappa stone, worn wood, hand-loomed cotton, brass and steel utensils), shallow depth of field, gentle shadows, true-to-life colour, slightly warm white balance. Photorealistic, shot on a full-frame camera with a 50–85 mm lens. No text, letters, logos, labels, watermarks or brand names anywhere. No CGI look, no oversaturation, no heavy vignette, no fake steam, no plastic props, no cluttered styling, no stock-photo smiles.

**Composition notes:** Leave the left third clean; no text in the image.

