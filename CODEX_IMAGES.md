# Image brief for Codex — Immunitywize

This file lists **every photo the website needs** (49 in total): what to generate, the exact file to save, and exactly where it appears. All paths are already wired into the code. Until a photo exists, the site shows a drawn stand-in (jar, bowl or ingredient specimen), so the photos can be added in any order.

> Updated for the v3 design. The home hero is now type-led and uses product photos in the bestseller rail, so it has no image slot of its own. The old `home/hero*` and `home/ingredients` slots were removed. The 16 ingredient photos for the batch builder are new.

## Instructions for Codex

1. Work section by section: **A → B → C → D**. Section A has the most impact.
2. For each entry, generate from its **Prompt** at the largest supported size close to the target aspect ratio (e.g. 1024×1536 portrait, 1536×1024 landscape, 1024×1024 square). **Centre-crop to the exact ratio**, then resize to the **Final size**. Don't upscale more than 1.6×; if the source is too small after cropping, keep the cropped resolution.
3. Save as **JPEG, quality 82, sRGB** at the exact **Save to** path. `.webp`, `.png` or `.avif` with the same name also work. Create folders as needed.
4. **Do not edit any code.** The site finds images by path.
5. When done:
   ```bash
   pnpm images:manifest   # registers the files (also runs automatically on dev/build)
   pnpm build && pnpm start
   ```
   Check `/`, `/shop`, `/shop/classic-panjiri`, `/customise/classic-panjiri`, `/our-story` and the header Shop menu. Every drawn stand-in should now be a photo.
6. Commit everything under `public/images/` together with the updated `src/data/image-manifest.json`.

## Global art direction

- **Look:** Editorial food photography, natural soft daylight from a window on the left, warm neutral palette (ivory, sand, terracotta, brass, muted sage), real Indian home-kitchen materials (grey Kadappa stone, worn teak, hand-loomed cotton, brass and steel utensils), shallow depth of field, gentle shadows, true-to-life colour, slightly warm white balance. Photorealistic, as if shot on a full-frame camera with a 50–100 mm lens.
- **Avoid:** No text, letters, logos, labels, watermarks or brand names anywhere. No CGI or 3D-render look, no oversaturation, no heavy vignette, no fake steam or smoke, no plastic props, no cluttered styling, no stock-photo smiles, no hands with extra fingers.
- **People:** hands, backs or soft profiles only. No one looks at the camera.
- **Series consistency:** all product packshots share one jar, lid, angle, backdrop and light. All category images share one backdrop. All 16 ingredient images share one backdrop and angle.
- **Honesty:** these are styling stand-ins. Replace them with real product photography before launch, and don't treat them as a record of actual recipes or packaging.

## Where each image appears

| Page / component | Image ids |
|---|---|
| Home → Bestsellers rail (under the hero), `/shop` grid, related products, search, cart drawer, cart page | `<product>-1`, with `<product>-2` on card hover |
| Product page gallery `/shop/<product>` | `<product>-1`, `<product>-2`, `<product>-3` |
| Home → 01 The pantry (category tiles) | `category-*` |
| Batch builder `/customise/<product>` → ingredient tiles | `ingredient-*` |
| Header → Shop menu → feature card | `home-customise` |
| Home → 06 Our story | `home-story` |
| Our story page | `story-hero`, `story-roasting`, `story-rolling`, `story-packing` |
| Social share preview | `og` |

Product slugs: `classic-panjiri`, `mothers-panjiri`, `atta-pinni`, `dry-fruit-laddu`, `seasonal-laddu`, `everyday-mix`, `study-table-mix`.
Ingredient ids: `almond`, `cashew`, `pistachio`, `walnut`, `raisin`, `fig`, `makhana`, `gond`, `magaz`, `flax`, `pumpkin`, `coconut`, `cardamom`, `saunth`, `ajwain`, `saffron`.

---

## A. Products (most important — do these first)

### 1. `classic-panjiri-1`

| | |
|---|---|
| **Save to** | `public/images/products/classic-panjiri/1.jpg` |
| **Final size** | 1200 × 1500 (4:5) |
| **Used on** | **Main product image** for Ghar ki Panjiri. Appears on product cards (home → Bestsellers rail directly under the hero, `/shop` grid, “You may also like”), search results, the cart drawer and cart page thumbnails, and as image 1 of the product-page gallery (`/shop/classic-panjiri`). Until it exists, the site shows a drawn jar. |
| **Alt text (already in code)** | Ghar ki Panjiri in a glass jar |

**Prompt:** Clean packshot: a clear cylindrical glass jar with a brass screw lid and a plain, blank kraft-paper band around the middle, filled with golden-brown, coarse roasted wholewheat crumble with visible slivers of almond and cashew; a little of the product spilled beside the jar. Straight-on three-quarter view on a seamless warm sand backdrop (#EFE7DA), soft shadow to the right. Editorial food photography, natural soft daylight from a window on the left, warm neutral palette (ivory, sand, terracotta, brass, muted sage), real Indian home-kitchen materials (grey Kadappa stone, worn teak, hand-loomed cotton, brass and steel utensils), shallow depth of field, gentle shadows, true-to-life colour, slightly warm white balance. Photorealistic, as if shot on a full-frame camera with a 50–100 mm lens. No text, letters, logos, labels, watermarks or brand names anywhere. No CGI or 3D-render look, no oversaturation, no heavy vignette, no fake steam or smoke, no plastic props, no cluttered styling, no stock-photo smiles, no hands with extra fingers.

**Composition notes:** Identical jar, lid, camera angle, backdrop and light for every product so the grid looks like a set. Jar centred, about 65% of frame height. Keep the top-left quarter calm (badges sit there). The kraft band must stay blank.

### 2. `classic-panjiri-2`

| | |
|---|---|
| **Save to** | `public/images/products/classic-panjiri/2.jpg` |
| **Final size** | 1200 × 1500 (4:5) |
| **Used on** | Product card **hover image** for Ghar ki Panjiri, and image 2 of the product-page gallery. |
| **Alt text (already in code)** | Close-up of Ghar ki Panjiri |

**Prompt:** Top-down macro of golden-brown, coarse roasted wholewheat crumble with visible slivers of almond and cashew filling a small brass katori, crisp texture, background softly out of focus. Editorial food photography, natural soft daylight from a window on the left, warm neutral palette (ivory, sand, terracotta, brass, muted sage), real Indian home-kitchen materials (grey Kadappa stone, worn teak, hand-loomed cotton, brass and steel utensils), shallow depth of field, gentle shadows, true-to-life colour, slightly warm white balance. Photorealistic, as if shot on a full-frame camera with a 50–100 mm lens. No text, letters, logos, labels, watermarks or brand names anywhere. No CGI or 3D-render look, no oversaturation, no heavy vignette, no fake steam or smoke, no plastic props, no cluttered styling, no stock-photo smiles, no hands with extra fingers.

**Composition notes:** Fill the frame with texture: this image is about appetite.

### 3. `classic-panjiri-3`

| | |
|---|---|
| **Save to** | `public/images/products/classic-panjiri/3.jpg` |
| **Final size** | 1200 × 1500 (4:5) |
| **Used on** | Image 3 of the product-page gallery for Ghar ki Panjiri. |
| **Alt text (already in code)** | Ghar ki Panjiri served at home |

**Prompt:** Served at home: golden-brown, coarse roasted wholewheat crumble with visible slivers of almond and cashew in a small bowl on a teak table beside a steel tumbler of masala chai; a hand reaches in from the frame edge (no face visible). Editorial food photography, natural soft daylight from a window on the left, warm neutral palette (ivory, sand, terracotta, brass, muted sage), real Indian home-kitchen materials (grey Kadappa stone, worn teak, hand-loomed cotton, brass and steel utensils), shallow depth of field, gentle shadows, true-to-life colour, slightly warm white balance. Photorealistic, as if shot on a full-frame camera with a 50–100 mm lens. No text, letters, logos, labels, watermarks or brand names anywhere. No CGI or 3D-render look, no oversaturation, no heavy vignette, no fake steam or smoke, no plastic props, no cluttered styling, no stock-photo smiles, no hands with extra fingers.

**Composition notes:** Lived-in but tidy. Hands only.

### 4. `mothers-panjiri-1`

| | |
|---|---|
| **Save to** | `public/images/products/mothers-panjiri/1.jpg` |
| **Final size** | 1200 × 1500 (4:5) |
| **Used on** | **Main product image** for Panjiri for New Mothers. Appears on product cards (home → Bestsellers rail directly under the hero, `/shop` grid, “You may also like”), search results, the cart drawer and cart page thumbnails, and as image 1 of the product-page gallery (`/shop/mothers-panjiri`). Until it exists, the site shows a drawn jar. |
| **Alt text (already in code)** | Panjiri for New Mothers in a glass jar |

**Prompt:** Clean packshot: a clear cylindrical glass jar with a brass screw lid and a plain, blank kraft-paper band around the middle, filled with a richer, darker roasted crumble flecked with chopped nuts, melon seeds and puffed edible gum; a little of the product spilled beside the jar. Straight-on three-quarter view on a seamless warm sand backdrop (#EFE7DA), soft shadow to the right. Editorial food photography, natural soft daylight from a window on the left, warm neutral palette (ivory, sand, terracotta, brass, muted sage), real Indian home-kitchen materials (grey Kadappa stone, worn teak, hand-loomed cotton, brass and steel utensils), shallow depth of field, gentle shadows, true-to-life colour, slightly warm white balance. Photorealistic, as if shot on a full-frame camera with a 50–100 mm lens. No text, letters, logos, labels, watermarks or brand names anywhere. No CGI or 3D-render look, no oversaturation, no heavy vignette, no fake steam or smoke, no plastic props, no cluttered styling, no stock-photo smiles, no hands with extra fingers.

**Composition notes:** Identical jar, lid, camera angle, backdrop and light for every product so the grid looks like a set. Jar centred, about 65% of frame height. Keep the top-left quarter calm (badges sit there). The kraft band must stay blank.

### 5. `mothers-panjiri-2`

| | |
|---|---|
| **Save to** | `public/images/products/mothers-panjiri/2.jpg` |
| **Final size** | 1200 × 1500 (4:5) |
| **Used on** | Product card **hover image** for Panjiri for New Mothers, and image 2 of the product-page gallery. |
| **Alt text (already in code)** | Close-up of Panjiri for New Mothers |

**Prompt:** Top-down macro of a richer, darker roasted crumble flecked with chopped nuts, melon seeds and puffed edible gum filling a small brass katori, crisp texture, background softly out of focus. Editorial food photography, natural soft daylight from a window on the left, warm neutral palette (ivory, sand, terracotta, brass, muted sage), real Indian home-kitchen materials (grey Kadappa stone, worn teak, hand-loomed cotton, brass and steel utensils), shallow depth of field, gentle shadows, true-to-life colour, slightly warm white balance. Photorealistic, as if shot on a full-frame camera with a 50–100 mm lens. No text, letters, logos, labels, watermarks or brand names anywhere. No CGI or 3D-render look, no oversaturation, no heavy vignette, no fake steam or smoke, no plastic props, no cluttered styling, no stock-photo smiles, no hands with extra fingers.

**Composition notes:** Fill the frame with texture: this image is about appetite.

### 6. `mothers-panjiri-3`

| | |
|---|---|
| **Save to** | `public/images/products/mothers-panjiri/3.jpg` |
| **Final size** | 1200 × 1500 (4:5) |
| **Used on** | Image 3 of the product-page gallery for Panjiri for New Mothers. |
| **Alt text (already in code)** | Panjiri for New Mothers served at home |

**Prompt:** Served at home: a richer, darker roasted crumble flecked with chopped nuts, melon seeds and puffed edible gum in a small bowl on a teak table beside a steel tumbler of masala chai; a hand reaches in from the frame edge (no face visible). Editorial food photography, natural soft daylight from a window on the left, warm neutral palette (ivory, sand, terracotta, brass, muted sage), real Indian home-kitchen materials (grey Kadappa stone, worn teak, hand-loomed cotton, brass and steel utensils), shallow depth of field, gentle shadows, true-to-life colour, slightly warm white balance. Photorealistic, as if shot on a full-frame camera with a 50–100 mm lens. No text, letters, logos, labels, watermarks or brand names anywhere. No CGI or 3D-render look, no oversaturation, no heavy vignette, no fake steam or smoke, no plastic props, no cluttered styling, no stock-photo smiles, no hands with extra fingers.

**Composition notes:** Lived-in but tidy. Hands only.

### 7. `atta-pinni-1`

| | |
|---|---|
| **Save to** | `public/images/products/atta-pinni/1.jpg` |
| **Final size** | 1200 × 1500 (4:5) |
| **Used on** | **Main product image** for Atta Pinni. Appears on product cards (home → Bestsellers rail directly under the hero, `/shop` grid, “You may also like”), search results, the cart drawer and cart page thumbnails, and as image 1 of the product-page gallery (`/shop/atta-pinni`). Until it exists, the site shows a drawn jar. |
| **Alt text (already in code)** | Atta Pinni in a glass jar |

**Prompt:** Clean packshot: a clear cylindrical glass jar with a brass screw lid and a plain, blank kraft-paper band around the middle, filled with dense, round hand-pressed sweets, golden brown and slightly crumbly, with soft finger-press marks; a little of the product spilled beside the jar. Straight-on three-quarter view on a seamless warm sand backdrop (#EFE7DA), soft shadow to the right. Editorial food photography, natural soft daylight from a window on the left, warm neutral palette (ivory, sand, terracotta, brass, muted sage), real Indian home-kitchen materials (grey Kadappa stone, worn teak, hand-loomed cotton, brass and steel utensils), shallow depth of field, gentle shadows, true-to-life colour, slightly warm white balance. Photorealistic, as if shot on a full-frame camera with a 50–100 mm lens. No text, letters, logos, labels, watermarks or brand names anywhere. No CGI or 3D-render look, no oversaturation, no heavy vignette, no fake steam or smoke, no plastic props, no cluttered styling, no stock-photo smiles, no hands with extra fingers.

**Composition notes:** Identical jar, lid, camera angle, backdrop and light for every product so the grid looks like a set. Jar centred, about 65% of frame height. Keep the top-left quarter calm (badges sit there). The kraft band must stay blank.

### 8. `atta-pinni-2`

| | |
|---|---|
| **Save to** | `public/images/products/atta-pinni/2.jpg` |
| **Final size** | 1200 × 1500 (4:5) |
| **Used on** | Product card **hover image** for Atta Pinni, and image 2 of the product-page gallery. |
| **Alt text (already in code)** | Close-up of Atta Pinni |

**Prompt:** Top-down macro of dense, round hand-pressed sweets, golden brown and slightly crumbly, with soft finger-press marks filling a small brass katori, crisp texture, background softly out of focus. Editorial food photography, natural soft daylight from a window on the left, warm neutral palette (ivory, sand, terracotta, brass, muted sage), real Indian home-kitchen materials (grey Kadappa stone, worn teak, hand-loomed cotton, brass and steel utensils), shallow depth of field, gentle shadows, true-to-life colour, slightly warm white balance. Photorealistic, as if shot on a full-frame camera with a 50–100 mm lens. No text, letters, logos, labels, watermarks or brand names anywhere. No CGI or 3D-render look, no oversaturation, no heavy vignette, no fake steam or smoke, no plastic props, no cluttered styling, no stock-photo smiles, no hands with extra fingers.

**Composition notes:** Fill the frame with texture: this image is about appetite.

### 9. `atta-pinni-3`

| | |
|---|---|
| **Save to** | `public/images/products/atta-pinni/3.jpg` |
| **Final size** | 1200 × 1500 (4:5) |
| **Used on** | Image 3 of the product-page gallery for Atta Pinni. |
| **Alt text (already in code)** | Atta Pinni served at home |

**Prompt:** Served at home: dense, round hand-pressed sweets, golden brown and slightly crumbly, with soft finger-press marks in a small bowl on a teak table beside a steel tumbler of masala chai; a hand reaches in from the frame edge (no face visible). Editorial food photography, natural soft daylight from a window on the left, warm neutral palette (ivory, sand, terracotta, brass, muted sage), real Indian home-kitchen materials (grey Kadappa stone, worn teak, hand-loomed cotton, brass and steel utensils), shallow depth of field, gentle shadows, true-to-life colour, slightly warm white balance. Photorealistic, as if shot on a full-frame camera with a 50–100 mm lens. No text, letters, logos, labels, watermarks or brand names anywhere. No CGI or 3D-render look, no oversaturation, no heavy vignette, no fake steam or smoke, no plastic props, no cluttered styling, no stock-photo smiles, no hands with extra fingers.

**Composition notes:** Lived-in but tidy. Hands only.

### 10. `dry-fruit-laddu-1`

| | |
|---|---|
| **Save to** | `public/images/products/dry-fruit-laddu/1.jpg` |
| **Final size** | 1200 × 1500 (4:5) |
| **Used on** | **Main product image** for Dry-Fruit Laddu. Appears on product cards (home → Bestsellers rail directly under the hero, `/shop` grid, “You may also like”), search results, the cart drawer and cart page thumbnails, and as image 1 of the product-page gallery (`/shop/dry-fruit-laddu`). Until it exists, the site shows a drawn jar. |
| **Alt text (already in code)** | Dry-Fruit Laddu in a glass jar |

**Prompt:** Clean packshot: a clear cylindrical glass jar with a brass screw lid and a plain, blank kraft-paper band around the middle, filled with deep brown, glossy round laddus of finely chopped dates studded with pistachio and almond; a little of the product spilled beside the jar. Straight-on three-quarter view on a seamless warm sand backdrop (#EFE7DA), soft shadow to the right. Editorial food photography, natural soft daylight from a window on the left, warm neutral palette (ivory, sand, terracotta, brass, muted sage), real Indian home-kitchen materials (grey Kadappa stone, worn teak, hand-loomed cotton, brass and steel utensils), shallow depth of field, gentle shadows, true-to-life colour, slightly warm white balance. Photorealistic, as if shot on a full-frame camera with a 50–100 mm lens. No text, letters, logos, labels, watermarks or brand names anywhere. No CGI or 3D-render look, no oversaturation, no heavy vignette, no fake steam or smoke, no plastic props, no cluttered styling, no stock-photo smiles, no hands with extra fingers.

**Composition notes:** Identical jar, lid, camera angle, backdrop and light for every product so the grid looks like a set. Jar centred, about 65% of frame height. Keep the top-left quarter calm (badges sit there). The kraft band must stay blank.

### 11. `dry-fruit-laddu-2`

| | |
|---|---|
| **Save to** | `public/images/products/dry-fruit-laddu/2.jpg` |
| **Final size** | 1200 × 1500 (4:5) |
| **Used on** | Product card **hover image** for Dry-Fruit Laddu, and image 2 of the product-page gallery. |
| **Alt text (already in code)** | Close-up of Dry-Fruit Laddu |

**Prompt:** Top-down macro of deep brown, glossy round laddus of finely chopped dates studded with pistachio and almond filling a small brass katori, crisp texture, background softly out of focus. Editorial food photography, natural soft daylight from a window on the left, warm neutral palette (ivory, sand, terracotta, brass, muted sage), real Indian home-kitchen materials (grey Kadappa stone, worn teak, hand-loomed cotton, brass and steel utensils), shallow depth of field, gentle shadows, true-to-life colour, slightly warm white balance. Photorealistic, as if shot on a full-frame camera with a 50–100 mm lens. No text, letters, logos, labels, watermarks or brand names anywhere. No CGI or 3D-render look, no oversaturation, no heavy vignette, no fake steam or smoke, no plastic props, no cluttered styling, no stock-photo smiles, no hands with extra fingers.

**Composition notes:** Fill the frame with texture: this image is about appetite.

### 12. `dry-fruit-laddu-3`

| | |
|---|---|
| **Save to** | `public/images/products/dry-fruit-laddu/3.jpg` |
| **Final size** | 1200 × 1500 (4:5) |
| **Used on** | Image 3 of the product-page gallery for Dry-Fruit Laddu. |
| **Alt text (already in code)** | Dry-Fruit Laddu served at home |

**Prompt:** Served at home: deep brown, glossy round laddus of finely chopped dates studded with pistachio and almond in a small bowl on a teak table beside a steel tumbler of masala chai; a hand reaches in from the frame edge (no face visible). Editorial food photography, natural soft daylight from a window on the left, warm neutral palette (ivory, sand, terracotta, brass, muted sage), real Indian home-kitchen materials (grey Kadappa stone, worn teak, hand-loomed cotton, brass and steel utensils), shallow depth of field, gentle shadows, true-to-life colour, slightly warm white balance. Photorealistic, as if shot on a full-frame camera with a 50–100 mm lens. No text, letters, logos, labels, watermarks or brand names anywhere. No CGI or 3D-render look, no oversaturation, no heavy vignette, no fake steam or smoke, no plastic props, no cluttered styling, no stock-photo smiles, no hands with extra fingers.

**Composition notes:** Lived-in but tidy. Hands only.

### 13. `seasonal-laddu-1`

| | |
|---|---|
| **Save to** | `public/images/products/seasonal-laddu/1.jpg` |
| **Final size** | 1200 × 1500 (4:5) |
| **Used on** | **Main product image** for Seasonal Laddu. Appears on product cards (home → Bestsellers rail directly under the hero, `/shop` grid, “You may also like”), search results, the cart drawer and cart page thumbnails, and as image 1 of the product-page gallery (`/shop/seasonal-laddu`). Until it exists, the site shows a drawn jar. |
| **Alt text (already in code)** | Seasonal Laddu in a glass jar |

**Prompt:** Clean packshot: a clear cylindrical glass jar with a brass screw lid and a plain, blank kraft-paper band around the middle, filled with pale golden laddus coated in desiccated coconut, flecked with chopped nuts; a little of the product spilled beside the jar. Straight-on three-quarter view on a seamless warm sand backdrop (#EFE7DA), soft shadow to the right. Editorial food photography, natural soft daylight from a window on the left, warm neutral palette (ivory, sand, terracotta, brass, muted sage), real Indian home-kitchen materials (grey Kadappa stone, worn teak, hand-loomed cotton, brass and steel utensils), shallow depth of field, gentle shadows, true-to-life colour, slightly warm white balance. Photorealistic, as if shot on a full-frame camera with a 50–100 mm lens. No text, letters, logos, labels, watermarks or brand names anywhere. No CGI or 3D-render look, no oversaturation, no heavy vignette, no fake steam or smoke, no plastic props, no cluttered styling, no stock-photo smiles, no hands with extra fingers.

**Composition notes:** Identical jar, lid, camera angle, backdrop and light for every product so the grid looks like a set. Jar centred, about 65% of frame height. Keep the top-left quarter calm (badges sit there). The kraft band must stay blank.

### 14. `seasonal-laddu-2`

| | |
|---|---|
| **Save to** | `public/images/products/seasonal-laddu/2.jpg` |
| **Final size** | 1200 × 1500 (4:5) |
| **Used on** | Product card **hover image** for Seasonal Laddu, and image 2 of the product-page gallery. |
| **Alt text (already in code)** | Close-up of Seasonal Laddu |

**Prompt:** Top-down macro of pale golden laddus coated in desiccated coconut, flecked with chopped nuts filling a small brass katori, crisp texture, background softly out of focus. Editorial food photography, natural soft daylight from a window on the left, warm neutral palette (ivory, sand, terracotta, brass, muted sage), real Indian home-kitchen materials (grey Kadappa stone, worn teak, hand-loomed cotton, brass and steel utensils), shallow depth of field, gentle shadows, true-to-life colour, slightly warm white balance. Photorealistic, as if shot on a full-frame camera with a 50–100 mm lens. No text, letters, logos, labels, watermarks or brand names anywhere. No CGI or 3D-render look, no oversaturation, no heavy vignette, no fake steam or smoke, no plastic props, no cluttered styling, no stock-photo smiles, no hands with extra fingers.

**Composition notes:** Fill the frame with texture: this image is about appetite.

### 15. `seasonal-laddu-3`

| | |
|---|---|
| **Save to** | `public/images/products/seasonal-laddu/3.jpg` |
| **Final size** | 1200 × 1500 (4:5) |
| **Used on** | Image 3 of the product-page gallery for Seasonal Laddu. |
| **Alt text (already in code)** | Seasonal Laddu served at home |

**Prompt:** Served at home: pale golden laddus coated in desiccated coconut, flecked with chopped nuts in a small bowl on a teak table beside a steel tumbler of masala chai; a hand reaches in from the frame edge (no face visible). Editorial food photography, natural soft daylight from a window on the left, warm neutral palette (ivory, sand, terracotta, brass, muted sage), real Indian home-kitchen materials (grey Kadappa stone, worn teak, hand-loomed cotton, brass and steel utensils), shallow depth of field, gentle shadows, true-to-life colour, slightly warm white balance. Photorealistic, as if shot on a full-frame camera with a 50–100 mm lens. No text, letters, logos, labels, watermarks or brand names anywhere. No CGI or 3D-render look, no oversaturation, no heavy vignette, no fake steam or smoke, no plastic props, no cluttered styling, no stock-photo smiles, no hands with extra fingers.

**Composition notes:** Lived-in but tidy. Hands only.

### 16. `everyday-mix-1`

| | |
|---|---|
| **Save to** | `public/images/products/everyday-mix/1.jpg` |
| **Final size** | 1200 × 1500 (4:5) |
| **Used on** | **Main product image** for Everyday Mewa Mix. Appears on product cards (home → Bestsellers rail directly under the hero, `/shop` grid, “You may also like”), search results, the cart drawer and cart page thumbnails, and as image 1 of the product-page gallery (`/shop/everyday-mix`). Until it exists, the site shows a drawn jar. |
| **Alt text (already in code)** | Everyday Mewa Mix in a glass jar |

**Prompt:** Clean packshot: a clear cylindrical glass jar with a brass screw lid and a plain, blank kraft-paper band around the middle, filled with a mix of lightly roasted almonds, cashews, raisins and pumpkin seeds; a little of the product spilled beside the jar. Straight-on three-quarter view on a seamless warm sand backdrop (#EFE7DA), soft shadow to the right. Editorial food photography, natural soft daylight from a window on the left, warm neutral palette (ivory, sand, terracotta, brass, muted sage), real Indian home-kitchen materials (grey Kadappa stone, worn teak, hand-loomed cotton, brass and steel utensils), shallow depth of field, gentle shadows, true-to-life colour, slightly warm white balance. Photorealistic, as if shot on a full-frame camera with a 50–100 mm lens. No text, letters, logos, labels, watermarks or brand names anywhere. No CGI or 3D-render look, no oversaturation, no heavy vignette, no fake steam or smoke, no plastic props, no cluttered styling, no stock-photo smiles, no hands with extra fingers.

**Composition notes:** Identical jar, lid, camera angle, backdrop and light for every product so the grid looks like a set. Jar centred, about 65% of frame height. Keep the top-left quarter calm (badges sit there). The kraft band must stay blank.

### 17. `everyday-mix-2`

| | |
|---|---|
| **Save to** | `public/images/products/everyday-mix/2.jpg` |
| **Final size** | 1200 × 1500 (4:5) |
| **Used on** | Product card **hover image** for Everyday Mewa Mix, and image 2 of the product-page gallery. |
| **Alt text (already in code)** | Close-up of Everyday Mewa Mix |

**Prompt:** Top-down macro of a mix of lightly roasted almonds, cashews, raisins and pumpkin seeds filling a small brass katori, crisp texture, background softly out of focus. Editorial food photography, natural soft daylight from a window on the left, warm neutral palette (ivory, sand, terracotta, brass, muted sage), real Indian home-kitchen materials (grey Kadappa stone, worn teak, hand-loomed cotton, brass and steel utensils), shallow depth of field, gentle shadows, true-to-life colour, slightly warm white balance. Photorealistic, as if shot on a full-frame camera with a 50–100 mm lens. No text, letters, logos, labels, watermarks or brand names anywhere. No CGI or 3D-render look, no oversaturation, no heavy vignette, no fake steam or smoke, no plastic props, no cluttered styling, no stock-photo smiles, no hands with extra fingers.

**Composition notes:** Fill the frame with texture: this image is about appetite.

### 18. `everyday-mix-3`

| | |
|---|---|
| **Save to** | `public/images/products/everyday-mix/3.jpg` |
| **Final size** | 1200 × 1500 (4:5) |
| **Used on** | Image 3 of the product-page gallery for Everyday Mewa Mix. |
| **Alt text (already in code)** | Everyday Mewa Mix served at home |

**Prompt:** Served at home: a mix of lightly roasted almonds, cashews, raisins and pumpkin seeds in a small bowl on a teak table beside a steel tumbler of masala chai; a hand reaches in from the frame edge (no face visible). Editorial food photography, natural soft daylight from a window on the left, warm neutral palette (ivory, sand, terracotta, brass, muted sage), real Indian home-kitchen materials (grey Kadappa stone, worn teak, hand-loomed cotton, brass and steel utensils), shallow depth of field, gentle shadows, true-to-life colour, slightly warm white balance. Photorealistic, as if shot on a full-frame camera with a 50–100 mm lens. No text, letters, logos, labels, watermarks or brand names anywhere. No CGI or 3D-render look, no oversaturation, no heavy vignette, no fake steam or smoke, no plastic props, no cluttered styling, no stock-photo smiles, no hands with extra fingers.

**Composition notes:** Lived-in but tidy. Hands only.

### 19. `study-table-mix-1`

| | |
|---|---|
| **Save to** | `public/images/products/study-table-mix/1.jpg` |
| **Final size** | 1200 × 1500 (4:5) |
| **Used on** | **Main product image** for Study-Table Mix. Appears on product cards (home → Bestsellers rail directly under the hero, `/shop` grid, “You may also like”), search results, the cart drawer and cart page thumbnails, and as image 1 of the product-page gallery (`/shop/study-table-mix`). Until it exists, the site shows a drawn jar. |
| **Alt text (already in code)** | Study-Table Mix in a glass jar |

**Prompt:** Clean packshot: a clear cylindrical glass jar with a brass screw lid and a plain, blank kraft-paper band around the middle, filled with a crunchy mix of roasted walnuts, fox nuts (makhana), pumpkin seeds and flax seeds; a little of the product spilled beside the jar. Straight-on three-quarter view on a seamless warm sand backdrop (#EFE7DA), soft shadow to the right. Editorial food photography, natural soft daylight from a window on the left, warm neutral palette (ivory, sand, terracotta, brass, muted sage), real Indian home-kitchen materials (grey Kadappa stone, worn teak, hand-loomed cotton, brass and steel utensils), shallow depth of field, gentle shadows, true-to-life colour, slightly warm white balance. Photorealistic, as if shot on a full-frame camera with a 50–100 mm lens. No text, letters, logos, labels, watermarks or brand names anywhere. No CGI or 3D-render look, no oversaturation, no heavy vignette, no fake steam or smoke, no plastic props, no cluttered styling, no stock-photo smiles, no hands with extra fingers.

**Composition notes:** Identical jar, lid, camera angle, backdrop and light for every product so the grid looks like a set. Jar centred, about 65% of frame height. Keep the top-left quarter calm (badges sit there). The kraft band must stay blank.

### 20. `study-table-mix-2`

| | |
|---|---|
| **Save to** | `public/images/products/study-table-mix/2.jpg` |
| **Final size** | 1200 × 1500 (4:5) |
| **Used on** | Product card **hover image** for Study-Table Mix, and image 2 of the product-page gallery. |
| **Alt text (already in code)** | Close-up of Study-Table Mix |

**Prompt:** Top-down macro of a crunchy mix of roasted walnuts, fox nuts (makhana), pumpkin seeds and flax seeds filling a small brass katori, crisp texture, background softly out of focus. Editorial food photography, natural soft daylight from a window on the left, warm neutral palette (ivory, sand, terracotta, brass, muted sage), real Indian home-kitchen materials (grey Kadappa stone, worn teak, hand-loomed cotton, brass and steel utensils), shallow depth of field, gentle shadows, true-to-life colour, slightly warm white balance. Photorealistic, as if shot on a full-frame camera with a 50–100 mm lens. No text, letters, logos, labels, watermarks or brand names anywhere. No CGI or 3D-render look, no oversaturation, no heavy vignette, no fake steam or smoke, no plastic props, no cluttered styling, no stock-photo smiles, no hands with extra fingers.

**Composition notes:** Fill the frame with texture: this image is about appetite.

### 21. `study-table-mix-3`

| | |
|---|---|
| **Save to** | `public/images/products/study-table-mix/3.jpg` |
| **Final size** | 1200 × 1500 (4:5) |
| **Used on** | Image 3 of the product-page gallery for Study-Table Mix. |
| **Alt text (already in code)** | Study-Table Mix served at home |

**Prompt:** Served at home: a crunchy mix of roasted walnuts, fox nuts (makhana), pumpkin seeds and flax seeds in a small bowl on a teak table beside a steel tumbler of masala chai; a hand reaches in from the frame edge (no face visible). Editorial food photography, natural soft daylight from a window on the left, warm neutral palette (ivory, sand, terracotta, brass, muted sage), real Indian home-kitchen materials (grey Kadappa stone, worn teak, hand-loomed cotton, brass and steel utensils), shallow depth of field, gentle shadows, true-to-life colour, slightly warm white balance. Photorealistic, as if shot on a full-frame camera with a 50–100 mm lens. No text, letters, logos, labels, watermarks or brand names anywhere. No CGI or 3D-render look, no oversaturation, no heavy vignette, no fake steam or smoke, no plastic props, no cluttered styling, no stock-photo smiles, no hands with extra fingers.

**Composition notes:** Lived-in but tidy. Hands only.

## B. Categories

### 22. `category-panjiri`

| | |
|---|---|
| **Save to** | `public/images/categories/panjiri.jpg` |
| **Final size** | 1200 × 1500 (4:5) |
| **Used on** | Home → section **01 The pantry** (“Four things, made well.”) — the **Panjiri** tile; also linked from the header Shop menu. Clicking opens `/shop?category=panjiri`. |
| **Alt text (already in code)** | A bowl of golden panjiri with a brass spoon |

**Prompt:** Three-quarter overhead view of a shallow brass bowl of golden-brown roasted wholewheat crumble (panjiri) with a small brass spoon resting in it, on hand-loomed cotton, on a muted sand linen backdrop. Editorial food photography, natural soft daylight from a window on the left, warm neutral palette (ivory, sand, terracotta, brass, muted sage), real Indian home-kitchen materials (grey Kadappa stone, worn teak, hand-loomed cotton, brass and steel utensils), shallow depth of field, gentle shadows, true-to-life colour, slightly warm white balance. Photorealistic, as if shot on a full-frame camera with a 50–100 mm lens. No text, letters, logos, labels, watermarks or brand names anywhere. No CGI or 3D-render look, no oversaturation, no heavy vignette, no fake steam or smoke, no plastic props, no cluttered styling, no stock-photo smiles, no hands with extra fingers.

**Composition notes:** Subject centred, filling ~60% of the frame. Same backdrop and light across all five category images.

### 23. `category-pinni`

| | |
|---|---|
| **Save to** | `public/images/categories/pinni.jpg` |
| **Final size** | 1200 × 1500 (4:5) |
| **Used on** | Home → section **01 The pantry** (“Four things, made well.”) — the **Pinni** tile; also linked from the header Shop menu. Clicking opens `/shop?category=pinni`. |
| **Alt text (already in code)** | Hand-pressed pinni stacked on a ceramic plate |

**Prompt:** Three-quarter overhead view of a small stack of round, hand-pressed golden-brown pinni on a matte off-white ceramic plate, on a muted sand linen backdrop. Editorial food photography, natural soft daylight from a window on the left, warm neutral palette (ivory, sand, terracotta, brass, muted sage), real Indian home-kitchen materials (grey Kadappa stone, worn teak, hand-loomed cotton, brass and steel utensils), shallow depth of field, gentle shadows, true-to-life colour, slightly warm white balance. Photorealistic, as if shot on a full-frame camera with a 50–100 mm lens. No text, letters, logos, labels, watermarks or brand names anywhere. No CGI or 3D-render look, no oversaturation, no heavy vignette, no fake steam or smoke, no plastic props, no cluttered styling, no stock-photo smiles, no hands with extra fingers.

**Composition notes:** Subject centred, filling ~60% of the frame. Same backdrop and light across all five category images.

### 24. `category-laddus`

| | |
|---|---|
| **Save to** | `public/images/categories/laddus.jpg` |
| **Final size** | 1200 × 1500 (4:5) |
| **Used on** | Home → section **01 The pantry** (“Four things, made well.”) — the **Dry-fruit laddus** tile; also linked from the header Shop menu. Clicking opens `/shop?category=laddus`. |
| **Alt text (already in code)** | Dry-fruit laddus arranged on a brass thali |

**Prompt:** Three-quarter overhead view of deep brown dry-fruit laddus arranged in a loose circle on a brass thali, on a muted sand linen backdrop. Editorial food photography, natural soft daylight from a window on the left, warm neutral palette (ivory, sand, terracotta, brass, muted sage), real Indian home-kitchen materials (grey Kadappa stone, worn teak, hand-loomed cotton, brass and steel utensils), shallow depth of field, gentle shadows, true-to-life colour, slightly warm white balance. Photorealistic, as if shot on a full-frame camera with a 50–100 mm lens. No text, letters, logos, labels, watermarks or brand names anywhere. No CGI or 3D-render look, no oversaturation, no heavy vignette, no fake steam or smoke, no plastic props, no cluttered styling, no stock-photo smiles, no hands with extra fingers.

**Composition notes:** Subject centred, filling ~60% of the frame. Same backdrop and light across all five category images.

### 25. `category-mixes`

| | |
|---|---|
| **Save to** | `public/images/categories/mixes.jpg` |
| **Final size** | 1200 × 1500 (4:5) |
| **Used on** | Home → section **01 The pantry** (“Four things, made well.”) — the **Dry-fruit mixes** tile; also linked from the header Shop menu. Clicking opens `/shop?category=mixes`. |
| **Alt text (already in code)** | A glass jar of roasted nuts, seeds and dried fruit |

**Prompt:** Three-quarter overhead view of a glass jar, lid off, filled with roasted nuts, seeds and raisins, a few spilling onto the stone surface, on a muted sand linen backdrop. Editorial food photography, natural soft daylight from a window on the left, warm neutral palette (ivory, sand, terracotta, brass, muted sage), real Indian home-kitchen materials (grey Kadappa stone, worn teak, hand-loomed cotton, brass and steel utensils), shallow depth of field, gentle shadows, true-to-life colour, slightly warm white balance. Photorealistic, as if shot on a full-frame camera with a 50–100 mm lens. No text, letters, logos, labels, watermarks or brand names anywhere. No CGI or 3D-render look, no oversaturation, no heavy vignette, no fake steam or smoke, no plastic props, no cluttered styling, no stock-photo smiles, no hands with extra fingers.

**Composition notes:** Subject centred, filling ~60% of the frame. Same backdrop and light across all five category images.

### 26. `category-gift-boxes`

| | |
|---|---|
| **Save to** | `public/images/categories/gift-boxes.jpg` |
| **Final size** | 1200 × 1500 (4:5) |
| **Used on** | Home → section **01 The pantry** (“Four things, made well.”) — the **Gift boxes** tile; also linked from the header Shop menu. Clicking opens `/shop?category=gift-boxes`. |
| **Alt text (already in code)** | A wrapped gift box of homemade sweets tied with cotton string |

**Prompt:** Three-quarter overhead view of a plain kraft-paper gift box tied with natural cotton string, with a sprig of dried flowers tucked under it, on a muted sand linen backdrop. Editorial food photography, natural soft daylight from a window on the left, warm neutral palette (ivory, sand, terracotta, brass, muted sage), real Indian home-kitchen materials (grey Kadappa stone, worn teak, hand-loomed cotton, brass and steel utensils), shallow depth of field, gentle shadows, true-to-life colour, slightly warm white balance. Photorealistic, as if shot on a full-frame camera with a 50–100 mm lens. No text, letters, logos, labels, watermarks or brand names anywhere. No CGI or 3D-render look, no oversaturation, no heavy vignette, no fake steam or smoke, no plastic props, no cluttered styling, no stock-photo smiles, no hands with extra fingers.

**Composition notes:** Subject centred, filling ~60% of the frame. Same backdrop and light across all five category images.

## C. Ingredients for the batch builder (16, one consistent series)

### 27. `ingredient-almond`

| | |
|---|---|
| **Save to** | `public/images/ingredients/almond.jpg` |
| **Final size** | 800 × 800 (1:1) |
| **Used on** | **Batch builder** (`/customise/<product>`) — the square image on the **Almonds (Badam)** ingredient tile, next to the None / Less / Usual / Extra selector. Until it exists, a drawn specimen of almonds is shown. |
| **Alt text (already in code)** | Almonds |

**Prompt:** Ingredient specimen shot, straight top-down: a small loose heap of whole and sliced almonds, a few skins slightly split, centred on a seamless warm sand paper backdrop (#EFE7DA), soft even daylight with a gentle shadow at the lower right. Editorial food photography, natural soft daylight from a window on the left, warm neutral palette (ivory, sand, terracotta, brass, muted sage), real Indian home-kitchen materials (grey Kadappa stone, worn teak, hand-loomed cotton, brass and steel utensils), shallow depth of field, gentle shadows, true-to-life colour, slightly warm white balance. Photorealistic, as if shot on a full-frame camera with a 50–100 mm lens. No text, letters, logos, labels, watermarks or brand names anywhere. No CGI or 3D-render look, no oversaturation, no heavy vignette, no fake steam or smoke, no plastic props, no cluttered styling, no stock-photo smiles, no hands with extra fingers.

**Composition notes:** This set of 16 must look like one series: same backdrop colour, same top-down angle, same light, each heap about 55% of the frame, nothing else in shot. Tiles are shown small (≈80 px) and greyed out when the ingredient is removed, so keep shapes bold and readable.

### 28. `ingredient-cashew`

| | |
|---|---|
| **Save to** | `public/images/ingredients/cashew.jpg` |
| **Final size** | 800 × 800 (1:1) |
| **Used on** | **Batch builder** (`/customise/<product>`) — the square image on the **Cashews (Kaju)** ingredient tile, next to the None / Less / Usual / Extra selector. Until it exists, a drawn specimen of cashews is shown. |
| **Alt text (already in code)** | Cashews |

**Prompt:** Ingredient specimen shot, straight top-down: a small heap of whole and halved pale cashews, centred on a seamless warm sand paper backdrop (#EFE7DA), soft even daylight with a gentle shadow at the lower right. Editorial food photography, natural soft daylight from a window on the left, warm neutral palette (ivory, sand, terracotta, brass, muted sage), real Indian home-kitchen materials (grey Kadappa stone, worn teak, hand-loomed cotton, brass and steel utensils), shallow depth of field, gentle shadows, true-to-life colour, slightly warm white balance. Photorealistic, as if shot on a full-frame camera with a 50–100 mm lens. No text, letters, logos, labels, watermarks or brand names anywhere. No CGI or 3D-render look, no oversaturation, no heavy vignette, no fake steam or smoke, no plastic props, no cluttered styling, no stock-photo smiles, no hands with extra fingers.

**Composition notes:** This set of 16 must look like one series: same backdrop colour, same top-down angle, same light, each heap about 55% of the frame, nothing else in shot. Tiles are shown small (≈80 px) and greyed out when the ingredient is removed, so keep shapes bold and readable.

### 29. `ingredient-pistachio`

| | |
|---|---|
| **Save to** | `public/images/ingredients/pistachio.jpg` |
| **Final size** | 800 × 800 (1:1) |
| **Used on** | **Batch builder** (`/customise/<product>`) — the square image on the **Pistachios (Pista)** ingredient tile, next to the None / Less / Usual / Extra selector. Until it exists, a drawn specimen of pistachios is shown. |
| **Alt text (already in code)** | Pistachios |

**Prompt:** Ingredient specimen shot, straight top-down: a small heap of slivered and whole shelled pistachios, green with purple-tinged skins, centred on a seamless warm sand paper backdrop (#EFE7DA), soft even daylight with a gentle shadow at the lower right. Editorial food photography, natural soft daylight from a window on the left, warm neutral palette (ivory, sand, terracotta, brass, muted sage), real Indian home-kitchen materials (grey Kadappa stone, worn teak, hand-loomed cotton, brass and steel utensils), shallow depth of field, gentle shadows, true-to-life colour, slightly warm white balance. Photorealistic, as if shot on a full-frame camera with a 50–100 mm lens. No text, letters, logos, labels, watermarks or brand names anywhere. No CGI or 3D-render look, no oversaturation, no heavy vignette, no fake steam or smoke, no plastic props, no cluttered styling, no stock-photo smiles, no hands with extra fingers.

**Composition notes:** This set of 16 must look like one series: same backdrop colour, same top-down angle, same light, each heap about 55% of the frame, nothing else in shot. Tiles are shown small (≈80 px) and greyed out when the ingredient is removed, so keep shapes bold and readable.

### 30. `ingredient-walnut`

| | |
|---|---|
| **Save to** | `public/images/ingredients/walnut.jpg` |
| **Final size** | 800 × 800 (1:1) |
| **Used on** | **Batch builder** (`/customise/<product>`) — the square image on the **Walnuts (Akhrot)** ingredient tile, next to the None / Less / Usual / Extra selector. Until it exists, a drawn specimen of walnuts is shown. |
| **Alt text (already in code)** | Walnuts |

**Prompt:** Ingredient specimen shot, straight top-down: a small heap of walnut halves and broken pieces, centred on a seamless warm sand paper backdrop (#EFE7DA), soft even daylight with a gentle shadow at the lower right. Editorial food photography, natural soft daylight from a window on the left, warm neutral palette (ivory, sand, terracotta, brass, muted sage), real Indian home-kitchen materials (grey Kadappa stone, worn teak, hand-loomed cotton, brass and steel utensils), shallow depth of field, gentle shadows, true-to-life colour, slightly warm white balance. Photorealistic, as if shot on a full-frame camera with a 50–100 mm lens. No text, letters, logos, labels, watermarks or brand names anywhere. No CGI or 3D-render look, no oversaturation, no heavy vignette, no fake steam or smoke, no plastic props, no cluttered styling, no stock-photo smiles, no hands with extra fingers.

**Composition notes:** This set of 16 must look like one series: same backdrop colour, same top-down angle, same light, each heap about 55% of the frame, nothing else in shot. Tiles are shown small (≈80 px) and greyed out when the ingredient is removed, so keep shapes bold and readable.

### 31. `ingredient-raisin`

| | |
|---|---|
| **Save to** | `public/images/ingredients/raisin.jpg` |
| **Final size** | 800 × 800 (1:1) |
| **Used on** | **Batch builder** (`/customise/<product>`) — the square image on the **Raisins (Kishmish)** ingredient tile, next to the None / Less / Usual / Extra selector. Until it exists, a drawn specimen of raisins is shown. |
| **Alt text (already in code)** | Raisins |

**Prompt:** Ingredient specimen shot, straight top-down: a small heap of mixed golden and dark raisins, plump and glossy, centred on a seamless warm sand paper backdrop (#EFE7DA), soft even daylight with a gentle shadow at the lower right. Editorial food photography, natural soft daylight from a window on the left, warm neutral palette (ivory, sand, terracotta, brass, muted sage), real Indian home-kitchen materials (grey Kadappa stone, worn teak, hand-loomed cotton, brass and steel utensils), shallow depth of field, gentle shadows, true-to-life colour, slightly warm white balance. Photorealistic, as if shot on a full-frame camera with a 50–100 mm lens. No text, letters, logos, labels, watermarks or brand names anywhere. No CGI or 3D-render look, no oversaturation, no heavy vignette, no fake steam or smoke, no plastic props, no cluttered styling, no stock-photo smiles, no hands with extra fingers.

**Composition notes:** This set of 16 must look like one series: same backdrop colour, same top-down angle, same light, each heap about 55% of the frame, nothing else in shot. Tiles are shown small (≈80 px) and greyed out when the ingredient is removed, so keep shapes bold and readable.

### 32. `ingredient-fig`

| | |
|---|---|
| **Save to** | `public/images/ingredients/fig.jpg` |
| **Final size** | 800 × 800 (1:1) |
| **Used on** | **Batch builder** (`/customise/<product>`) — the square image on the **Figs (Anjeer)** ingredient tile, next to the None / Less / Usual / Extra selector. Until it exists, a drawn specimen of figs is shown. |
| **Alt text (already in code)** | Figs |

**Prompt:** Ingredient specimen shot, straight top-down: three dried figs, one torn open to show the seeds, with a few chopped pieces, centred on a seamless warm sand paper backdrop (#EFE7DA), soft even daylight with a gentle shadow at the lower right. Editorial food photography, natural soft daylight from a window on the left, warm neutral palette (ivory, sand, terracotta, brass, muted sage), real Indian home-kitchen materials (grey Kadappa stone, worn teak, hand-loomed cotton, brass and steel utensils), shallow depth of field, gentle shadows, true-to-life colour, slightly warm white balance. Photorealistic, as if shot on a full-frame camera with a 50–100 mm lens. No text, letters, logos, labels, watermarks or brand names anywhere. No CGI or 3D-render look, no oversaturation, no heavy vignette, no fake steam or smoke, no plastic props, no cluttered styling, no stock-photo smiles, no hands with extra fingers.

**Composition notes:** This set of 16 must look like one series: same backdrop colour, same top-down angle, same light, each heap about 55% of the frame, nothing else in shot. Tiles are shown small (≈80 px) and greyed out when the ingredient is removed, so keep shapes bold and readable.

### 33. `ingredient-makhana`

| | |
|---|---|
| **Save to** | `public/images/ingredients/makhana.jpg` |
| **Final size** | 800 × 800 (1:1) |
| **Used on** | **Batch builder** (`/customise/<product>`) — the square image on the **Fox nuts (Makhana)** ingredient tile, next to the None / Less / Usual / Extra selector. Until it exists, a drawn specimen of fox nuts is shown. |
| **Alt text (already in code)** | Fox nuts |

**Prompt:** Ingredient specimen shot, straight top-down: a small heap of white roasted fox nuts (makhana) with brown speckles, centred on a seamless warm sand paper backdrop (#EFE7DA), soft even daylight with a gentle shadow at the lower right. Editorial food photography, natural soft daylight from a window on the left, warm neutral palette (ivory, sand, terracotta, brass, muted sage), real Indian home-kitchen materials (grey Kadappa stone, worn teak, hand-loomed cotton, brass and steel utensils), shallow depth of field, gentle shadows, true-to-life colour, slightly warm white balance. Photorealistic, as if shot on a full-frame camera with a 50–100 mm lens. No text, letters, logos, labels, watermarks or brand names anywhere. No CGI or 3D-render look, no oversaturation, no heavy vignette, no fake steam or smoke, no plastic props, no cluttered styling, no stock-photo smiles, no hands with extra fingers.

**Composition notes:** This set of 16 must look like one series: same backdrop colour, same top-down angle, same light, each heap about 55% of the frame, nothing else in shot. Tiles are shown small (≈80 px) and greyed out when the ingredient is removed, so keep shapes bold and readable.

### 34. `ingredient-gond`

| | |
|---|---|
| **Save to** | `public/images/ingredients/gond.jpg` |
| **Final size** | 800 × 800 (1:1) |
| **Used on** | **Batch builder** (`/customise/<product>`) — the square image on the **Edible gum (Gond)** ingredient tile, next to the None / Less / Usual / Extra selector. Until it exists, a drawn specimen of edible gum is shown. |
| **Alt text (already in code)** | Edible gum |

**Prompt:** Ingredient specimen shot, straight top-down: a small heap of translucent amber edible gum (gond) crystals catching the light, centred on a seamless warm sand paper backdrop (#EFE7DA), soft even daylight with a gentle shadow at the lower right. Editorial food photography, natural soft daylight from a window on the left, warm neutral palette (ivory, sand, terracotta, brass, muted sage), real Indian home-kitchen materials (grey Kadappa stone, worn teak, hand-loomed cotton, brass and steel utensils), shallow depth of field, gentle shadows, true-to-life colour, slightly warm white balance. Photorealistic, as if shot on a full-frame camera with a 50–100 mm lens. No text, letters, logos, labels, watermarks or brand names anywhere. No CGI or 3D-render look, no oversaturation, no heavy vignette, no fake steam or smoke, no plastic props, no cluttered styling, no stock-photo smiles, no hands with extra fingers.

**Composition notes:** This set of 16 must look like one series: same backdrop colour, same top-down angle, same light, each heap about 55% of the frame, nothing else in shot. Tiles are shown small (≈80 px) and greyed out when the ingredient is removed, so keep shapes bold and readable.

### 35. `ingredient-magaz`

| | |
|---|---|
| **Save to** | `public/images/ingredients/magaz.jpg` |
| **Final size** | 800 × 800 (1:1) |
| **Used on** | **Batch builder** (`/customise/<product>`) — the square image on the **Melon seeds (Magaz)** ingredient tile, next to the None / Less / Usual / Extra selector. Until it exists, a drawn specimen of melon seeds is shown. |
| **Alt text (already in code)** | Melon seeds |

**Prompt:** Ingredient specimen shot, straight top-down: a small heap of tiny peeled creamy-white melon seeds (magaz), centred on a seamless warm sand paper backdrop (#EFE7DA), soft even daylight with a gentle shadow at the lower right. Editorial food photography, natural soft daylight from a window on the left, warm neutral palette (ivory, sand, terracotta, brass, muted sage), real Indian home-kitchen materials (grey Kadappa stone, worn teak, hand-loomed cotton, brass and steel utensils), shallow depth of field, gentle shadows, true-to-life colour, slightly warm white balance. Photorealistic, as if shot on a full-frame camera with a 50–100 mm lens. No text, letters, logos, labels, watermarks or brand names anywhere. No CGI or 3D-render look, no oversaturation, no heavy vignette, no fake steam or smoke, no plastic props, no cluttered styling, no stock-photo smiles, no hands with extra fingers.

**Composition notes:** This set of 16 must look like one series: same backdrop colour, same top-down angle, same light, each heap about 55% of the frame, nothing else in shot. Tiles are shown small (≈80 px) and greyed out when the ingredient is removed, so keep shapes bold and readable.

### 36. `ingredient-flax`

| | |
|---|---|
| **Save to** | `public/images/ingredients/flax.jpg` |
| **Final size** | 800 × 800 (1:1) |
| **Used on** | **Batch builder** (`/customise/<product>`) — the square image on the **Flax seeds (Alsi)** ingredient tile, next to the None / Less / Usual / Extra selector. Until it exists, a drawn specimen of flax seeds is shown. |
| **Alt text (already in code)** | Flax seeds |

**Prompt:** Ingredient specimen shot, straight top-down: a small heap of glossy brown flax seeds, centred on a seamless warm sand paper backdrop (#EFE7DA), soft even daylight with a gentle shadow at the lower right. Editorial food photography, natural soft daylight from a window on the left, warm neutral palette (ivory, sand, terracotta, brass, muted sage), real Indian home-kitchen materials (grey Kadappa stone, worn teak, hand-loomed cotton, brass and steel utensils), shallow depth of field, gentle shadows, true-to-life colour, slightly warm white balance. Photorealistic, as if shot on a full-frame camera with a 50–100 mm lens. No text, letters, logos, labels, watermarks or brand names anywhere. No CGI or 3D-render look, no oversaturation, no heavy vignette, no fake steam or smoke, no plastic props, no cluttered styling, no stock-photo smiles, no hands with extra fingers.

**Composition notes:** This set of 16 must look like one series: same backdrop colour, same top-down angle, same light, each heap about 55% of the frame, nothing else in shot. Tiles are shown small (≈80 px) and greyed out when the ingredient is removed, so keep shapes bold and readable.

### 37. `ingredient-pumpkin`

| | |
|---|---|
| **Save to** | `public/images/ingredients/pumpkin.jpg` |
| **Final size** | 800 × 800 (1:1) |
| **Used on** | **Batch builder** (`/customise/<product>`) — the square image on the **Pumpkin seeds (Kaddu beej)** ingredient tile, next to the None / Less / Usual / Extra selector. Until it exists, a drawn specimen of pumpkin seeds is shown. |
| **Alt text (already in code)** | Pumpkin seeds |

**Prompt:** Ingredient specimen shot, straight top-down: a small heap of green hulled pumpkin seeds, centred on a seamless warm sand paper backdrop (#EFE7DA), soft even daylight with a gentle shadow at the lower right. Editorial food photography, natural soft daylight from a window on the left, warm neutral palette (ivory, sand, terracotta, brass, muted sage), real Indian home-kitchen materials (grey Kadappa stone, worn teak, hand-loomed cotton, brass and steel utensils), shallow depth of field, gentle shadows, true-to-life colour, slightly warm white balance. Photorealistic, as if shot on a full-frame camera with a 50–100 mm lens. No text, letters, logos, labels, watermarks or brand names anywhere. No CGI or 3D-render look, no oversaturation, no heavy vignette, no fake steam or smoke, no plastic props, no cluttered styling, no stock-photo smiles, no hands with extra fingers.

**Composition notes:** This set of 16 must look like one series: same backdrop colour, same top-down angle, same light, each heap about 55% of the frame, nothing else in shot. Tiles are shown small (≈80 px) and greyed out when the ingredient is removed, so keep shapes bold and readable.

### 38. `ingredient-coconut`

| | |
|---|---|
| **Save to** | `public/images/ingredients/coconut.jpg` |
| **Final size** | 800 × 800 (1:1) |
| **Used on** | **Batch builder** (`/customise/<product>`) — the square image on the **Coconut (Nariyal)** ingredient tile, next to the None / Less / Usual / Extra selector. Until it exists, a drawn specimen of coconut is shown. |
| **Alt text (already in code)** | Coconut |

**Prompt:** Ingredient specimen shot, straight top-down: a small heap of dry, finely shredded white coconut beside a piece of dry coconut shell, centred on a seamless warm sand paper backdrop (#EFE7DA), soft even daylight with a gentle shadow at the lower right. Editorial food photography, natural soft daylight from a window on the left, warm neutral palette (ivory, sand, terracotta, brass, muted sage), real Indian home-kitchen materials (grey Kadappa stone, worn teak, hand-loomed cotton, brass and steel utensils), shallow depth of field, gentle shadows, true-to-life colour, slightly warm white balance. Photorealistic, as if shot on a full-frame camera with a 50–100 mm lens. No text, letters, logos, labels, watermarks or brand names anywhere. No CGI or 3D-render look, no oversaturation, no heavy vignette, no fake steam or smoke, no plastic props, no cluttered styling, no stock-photo smiles, no hands with extra fingers.

**Composition notes:** This set of 16 must look like one series: same backdrop colour, same top-down angle, same light, each heap about 55% of the frame, nothing else in shot. Tiles are shown small (≈80 px) and greyed out when the ingredient is removed, so keep shapes bold and readable.

### 39. `ingredient-cardamom`

| | |
|---|---|
| **Save to** | `public/images/ingredients/cardamom.jpg` |
| **Final size** | 800 × 800 (1:1) |
| **Used on** | **Batch builder** (`/customise/<product>`) — the square image on the **Green cardamom (Elaichi)** ingredient tile, next to the None / Less / Usual / Extra selector. Until it exists, a drawn specimen of green cardamom is shown. |
| **Alt text (already in code)** | Green cardamom |

**Prompt:** Ingredient specimen shot, straight top-down: a small heap of green cardamom pods, one split open showing black seeds, centred on a seamless warm sand paper backdrop (#EFE7DA), soft even daylight with a gentle shadow at the lower right. Editorial food photography, natural soft daylight from a window on the left, warm neutral palette (ivory, sand, terracotta, brass, muted sage), real Indian home-kitchen materials (grey Kadappa stone, worn teak, hand-loomed cotton, brass and steel utensils), shallow depth of field, gentle shadows, true-to-life colour, slightly warm white balance. Photorealistic, as if shot on a full-frame camera with a 50–100 mm lens. No text, letters, logos, labels, watermarks or brand names anywhere. No CGI or 3D-render look, no oversaturation, no heavy vignette, no fake steam or smoke, no plastic props, no cluttered styling, no stock-photo smiles, no hands with extra fingers.

**Composition notes:** This set of 16 must look like one series: same backdrop colour, same top-down angle, same light, each heap about 55% of the frame, nothing else in shot. Tiles are shown small (≈80 px) and greyed out when the ingredient is removed, so keep shapes bold and readable.

### 40. `ingredient-saunth`

| | |
|---|---|
| **Save to** | `public/images/ingredients/saunth.jpg` |
| **Final size** | 800 × 800 (1:1) |
| **Used on** | **Batch builder** (`/customise/<product>`) — the square image on the **Dry ginger (Saunth)** ingredient tile, next to the None / Less / Usual / Extra selector. Until it exists, a drawn specimen of dry ginger is shown. |
| **Alt text (already in code)** | Dry ginger |

**Prompt:** Ingredient specimen shot, straight top-down: two pieces of dried ginger root with a little ginger powder dusted beside them, centred on a seamless warm sand paper backdrop (#EFE7DA), soft even daylight with a gentle shadow at the lower right. Editorial food photography, natural soft daylight from a window on the left, warm neutral palette (ivory, sand, terracotta, brass, muted sage), real Indian home-kitchen materials (grey Kadappa stone, worn teak, hand-loomed cotton, brass and steel utensils), shallow depth of field, gentle shadows, true-to-life colour, slightly warm white balance. Photorealistic, as if shot on a full-frame camera with a 50–100 mm lens. No text, letters, logos, labels, watermarks or brand names anywhere. No CGI or 3D-render look, no oversaturation, no heavy vignette, no fake steam or smoke, no plastic props, no cluttered styling, no stock-photo smiles, no hands with extra fingers.

**Composition notes:** This set of 16 must look like one series: same backdrop colour, same top-down angle, same light, each heap about 55% of the frame, nothing else in shot. Tiles are shown small (≈80 px) and greyed out when the ingredient is removed, so keep shapes bold and readable.

### 41. `ingredient-ajwain`

| | |
|---|---|
| **Save to** | `public/images/ingredients/ajwain.jpg` |
| **Final size** | 800 × 800 (1:1) |
| **Used on** | **Batch builder** (`/customise/<product>`) — the square image on the **Carom seeds (Ajwain)** ingredient tile, next to the None / Less / Usual / Extra selector. Until it exists, a drawn specimen of carom seeds is shown. |
| **Alt text (already in code)** | Carom seeds |

**Prompt:** Ingredient specimen shot, straight top-down: a tiny heap of carom seeds (ajwain) in a small brass spoon, centred on a seamless warm sand paper backdrop (#EFE7DA), soft even daylight with a gentle shadow at the lower right. Editorial food photography, natural soft daylight from a window on the left, warm neutral palette (ivory, sand, terracotta, brass, muted sage), real Indian home-kitchen materials (grey Kadappa stone, worn teak, hand-loomed cotton, brass and steel utensils), shallow depth of field, gentle shadows, true-to-life colour, slightly warm white balance. Photorealistic, as if shot on a full-frame camera with a 50–100 mm lens. No text, letters, logos, labels, watermarks or brand names anywhere. No CGI or 3D-render look, no oversaturation, no heavy vignette, no fake steam or smoke, no plastic props, no cluttered styling, no stock-photo smiles, no hands with extra fingers.

**Composition notes:** This set of 16 must look like one series: same backdrop colour, same top-down angle, same light, each heap about 55% of the frame, nothing else in shot. Tiles are shown small (≈80 px) and greyed out when the ingredient is removed, so keep shapes bold and readable.

### 42. `ingredient-saffron`

| | |
|---|---|
| **Save to** | `public/images/ingredients/saffron.jpg` |
| **Final size** | 800 × 800 (1:1) |
| **Used on** | **Batch builder** (`/customise/<product>`) — the square image on the **Saffron (Kesar)** ingredient tile, next to the None / Less / Usual / Extra selector. Until it exists, a drawn specimen of saffron is shown. |
| **Alt text (already in code)** | Saffron |

**Prompt:** Ingredient specimen shot, straight top-down: a pinch of deep red saffron threads in a tiny brass bowl, centred on a seamless warm sand paper backdrop (#EFE7DA), soft even daylight with a gentle shadow at the lower right. Editorial food photography, natural soft daylight from a window on the left, warm neutral palette (ivory, sand, terracotta, brass, muted sage), real Indian home-kitchen materials (grey Kadappa stone, worn teak, hand-loomed cotton, brass and steel utensils), shallow depth of field, gentle shadows, true-to-life colour, slightly warm white balance. Photorealistic, as if shot on a full-frame camera with a 50–100 mm lens. No text, letters, logos, labels, watermarks or brand names anywhere. No CGI or 3D-render look, no oversaturation, no heavy vignette, no fake steam or smoke, no plastic props, no cluttered styling, no stock-photo smiles, no hands with extra fingers.

**Composition notes:** This set of 16 must look like one series: same backdrop colour, same top-down angle, same light, each heap about 55% of the frame, nothing else in shot. Tiles are shown small (≈80 px) and greyed out when the ingredient is removed, so keep shapes bold and readable.

## D. Menu, story and sharing

### 43. `home-customise`

| | |
|---|---|
| **Save to** | `public/images/home/customise.jpg` |
| **Final size** | 1500 × 1200 (5:4) |
| **Used on** | Desktop header → hover **Shop** → right-hand feature card “Build a custom batch” (cropped to 16:10). Until it exists, a drawn bowl is shown. |
| **Alt text (already in code)** | Hands folding chopped nuts into a bowl of freshly roasted panjiri |

**Prompt:** Close-up of a woman’s hands folding chopped almonds and pistachios into a large steel paraat of freshly roasted panjiri, small brass bowls of extra nuts, seeds and saffron around it, on a teak worktop. Editorial food photography, natural soft daylight from a window on the left, warm neutral palette (ivory, sand, terracotta, brass, muted sage), real Indian home-kitchen materials (grey Kadappa stone, worn teak, hand-loomed cotton, brass and steel utensils), shallow depth of field, gentle shadows, true-to-life colour, slightly warm white balance. Photorealistic, as if shot on a full-frame camera with a 50–100 mm lens. No text, letters, logos, labels, watermarks or brand names anywhere. No CGI or 3D-render look, no oversaturation, no heavy vignette, no fake steam or smoke, no plastic props, no cluttered styling, no stock-photo smiles, no hands with extra fingers.

**Composition notes:** Keep hands and bowl in the central area so the 16:10 crop works. No face.

### 44. `home-story`

| | |
|---|---|
| **Save to** | `public/images/home/story.jpg` |
| **Final size** | 1600 × 1200 (4:3) |
| **Used on** | Home → section **06 Our story** (“From one family kitchen to yours.”), left image. |
| **Alt text (already in code)** | A woman stirring a heavy kadhai on the stove in a sunlit home kitchen |

**Prompt:** A woman in her fifties in a simple cotton salwar kameez, seen from behind or in soft profile, stirring a heavy iron kadhai on a gas stove in a sunlit Indian home kitchen with steel utensils on open shelves. Editorial food photography, natural soft daylight from a window on the left, warm neutral palette (ivory, sand, terracotta, brass, muted sage), real Indian home-kitchen materials (grey Kadappa stone, worn teak, hand-loomed cotton, brass and steel utensils), shallow depth of field, gentle shadows, true-to-life colour, slightly warm white balance. Photorealistic, as if shot on a full-frame camera with a 50–100 mm lens. No text, letters, logos, labels, watermarks or brand names anywhere. No CGI or 3D-render look, no oversaturation, no heavy vignette, no fake steam or smoke, no plastic props, no cluttered styling, no stock-photo smiles, no hands with extra fingers.

**Composition notes:** Warm and real, not staged. Face in soft profile at most, never looking at the camera.

### 45. `story-hero`

| | |
|---|---|
| **Save to** | `public/images/story/hero.jpg` |
| **Final size** | 2400 × 1050 (16:7) |
| **Used on** | Our story page (`/our-story`) → wide image directly under the title. |
| **Alt text (already in code)** | Two generations of a family standing together in their home kitchen |

**Prompt:** Two generations of an Indian family, an older mother and her adult daughter, standing side by side at a kitchen counter, laughing while rolling laddus, photographed from a little distance in natural light. Editorial food photography, natural soft daylight from a window on the left, warm neutral palette (ivory, sand, terracotta, brass, muted sage), real Indian home-kitchen materials (grey Kadappa stone, worn teak, hand-loomed cotton, brass and steel utensils), shallow depth of field, gentle shadows, true-to-life colour, slightly warm white balance. Photorealistic, as if shot on a full-frame camera with a 50–100 mm lens. No text, letters, logos, labels, watermarks or brand names anywhere. No CGI or 3D-render look, no oversaturation, no heavy vignette, no fake steam or smoke, no plastic props, no cluttered styling, no stock-photo smiles, no hands with extra fingers.

**Composition notes:** Candid; subjects in the central third.

### 46. `story-roasting`

| | |
|---|---|
| **Save to** | `public/images/story/roasting.jpg` |
| **Final size** | 1200 × 1500 (4:5) |
| **Used on** | Our story page → row of three photos under the timeline. |
| **Alt text (already in code)** | Wholewheat flour being stirred in a kadhai until golden |

**Prompt:** Close-up of a wooden spatula stirring wholewheat flour in a heavy iron kadhai as it turns golden, flame just visible below. Editorial food photography, natural soft daylight from a window on the left, warm neutral palette (ivory, sand, terracotta, brass, muted sage), real Indian home-kitchen materials (grey Kadappa stone, worn teak, hand-loomed cotton, brass and steel utensils), shallow depth of field, gentle shadows, true-to-life colour, slightly warm white balance. Photorealistic, as if shot on a full-frame camera with a 50–100 mm lens. No text, letters, logos, labels, watermarks or brand names anywhere. No CGI or 3D-render look, no oversaturation, no heavy vignette, no fake steam or smoke, no plastic props, no cluttered styling, no stock-photo smiles, no hands with extra fingers.

**Composition notes:** Match light and palette across all three.

### 47. `story-rolling`

| | |
|---|---|
| **Save to** | `public/images/story/rolling.jpg` |
| **Final size** | 1200 × 1500 (4:5) |
| **Used on** | Our story page → row of three photos under the timeline. |
| **Alt text (already in code)** | Hands rolling dry-fruit laddus one at a time |

**Prompt:** Close-up of two hands rolling a dry-fruit laddu between the palms, a steel tray of finished laddus beside them. Editorial food photography, natural soft daylight from a window on the left, warm neutral palette (ivory, sand, terracotta, brass, muted sage), real Indian home-kitchen materials (grey Kadappa stone, worn teak, hand-loomed cotton, brass and steel utensils), shallow depth of field, gentle shadows, true-to-life colour, slightly warm white balance. Photorealistic, as if shot on a full-frame camera with a 50–100 mm lens. No text, letters, logos, labels, watermarks or brand names anywhere. No CGI or 3D-render look, no oversaturation, no heavy vignette, no fake steam or smoke, no plastic props, no cluttered styling, no stock-photo smiles, no hands with extra fingers.

**Composition notes:** Match light and palette across all three.

### 48. `story-packing`

| | |
|---|---|
| **Save to** | `public/images/story/packing.jpg` |
| **Final size** | 1200 × 1500 (4:5) |
| **Used on** | Our story page → row of three photos under the timeline. |
| **Alt text (already in code)** | Glass jars of panjiri being filled and sealed on a wooden table |

**Prompt:** Glass jars being filled with panjiri using a steel scoop on a teak table, some already sealed with blank kraft-paper bands. Editorial food photography, natural soft daylight from a window on the left, warm neutral palette (ivory, sand, terracotta, brass, muted sage), real Indian home-kitchen materials (grey Kadappa stone, worn teak, hand-loomed cotton, brass and steel utensils), shallow depth of field, gentle shadows, true-to-life colour, slightly warm white balance. Photorealistic, as if shot on a full-frame camera with a 50–100 mm lens. No text, letters, logos, labels, watermarks or brand names anywhere. No CGI or 3D-render look, no oversaturation, no heavy vignette, no fake steam or smoke, no plastic props, no cluttered styling, no stock-photo smiles, no hands with extra fingers.

**Composition notes:** Match light and palette across all three.

### 49. `og`

| | |
|---|---|
| **Save to** | `public/images/og.jpg` |
| **Final size** | 1200 × 630 (1.91:1) |
| **Used on** | Social share preview (WhatsApp, Instagram DMs, X, LinkedIn) for the whole site. Picked up automatically by `src/app/layout.tsx`. |
| **Alt text (already in code)** | Not shown on the page; social preview only. |

**Prompt:** Wide still life of a brass thali with panjiri, dry-fruit laddus and pinni on grey stone, generous empty space on the left third. Editorial food photography, natural soft daylight from a window on the left, warm neutral palette (ivory, sand, terracotta, brass, muted sage), real Indian home-kitchen materials (grey Kadappa stone, worn teak, hand-loomed cotton, brass and steel utensils), shallow depth of field, gentle shadows, true-to-life colour, slightly warm white balance. Photorealistic, as if shot on a full-frame camera with a 50–100 mm lens. No text, letters, logos, labels, watermarks or brand names anywhere. No CGI or 3D-render look, no oversaturation, no heavy vignette, no fake steam or smoke, no plastic props, no cluttered styling, no stock-photo smiles, no hands with extra fingers.

**Composition notes:** Leave the left third clean; no text in the image.

