# Immunitywize — design direction & implementation plan (v4)

## 1. What the research says, and what we did with it

These are public findings from Baymard Institute's large-scale e-commerce UX research and Smashing Magazine's configurator guidance. They're cited as principles, not as performance claims for any specific brand. Premium food DTC sites we looked at (e.g. Graza, Burlap & Barrel) informed the tone: one clear CTA, product-led imagery and editorial restraint. We borrowed no identity from them.

| Finding | Source | Decision in this build |
|---|---|---|
| Main navigation should show product categories, highlight the user's current scope, and keep headers clickable | Baymard, *Homepage & Category Navigation UX 2025* | Header links straight to Shop all · Panjiri · Pinni · Laddus · Dry-fruit mixes. The active scope gets a saffron underline on category, product and shop pages, with no hover-only mega menu. |
| Carousels and aggressive homepage promotions get in the way | Baymard (same) | No carousels, no rotating text. One static hero with two CTAs, followed immediately by products. |
| Make clear where visual hit areas lead; give direct access to products in inspirational imagery | Baymard (same) | The hero photo carries a caption linking each product in it. Category tiles carry names and counts. |
| Use buttons for size selection | Baymard, *Product Page UX 2026* | Pack sizes are button tiles with price and unit price, not a dropdown. |
| Show price per unit when sizes vary | Baymard (same) | ₹/100 g on cards, size tiles and the price row. |
| Show a total order-cost estimate near the buy button, and link the return policy | Baymard (same) | An order total + delivery / free-delivery line and a returns link sit under Add to cart. |
| Configurators need a real-time visual, presets/defaults, clear dependencies and constraints, a summary view and a responsive layout | Smashing, *Designing a Perfect Responsive Configurator* | The builder starts from the house recipe (default). It has a live composition and recipe summary, explicit limits with plain-language reasons, a review step, and a sticky summary on desktop with a bottom bar on mobile. |

## 2. Direction: "the kitchen ledger"

Warm paper, espresso ink, one saffron accent, fine rules and tabular numbers. Precision, care and photography do the decorating; there's no illustration anywhere except **one** art-directed moment: the scroll-drawn sketch of a mother cooking, kept as the brand's signature on the home page.

- **Typography:** Cormorant Garamond for page and section titles only; Hanken Grotesk for everything else, including product names and prices, set with tabular figures.
- **Colour:** paper `#faf7f2`, panel `#f3eee6`, ink `#1f1a16`, ink-2 `#5d544b`, espresso `#2b1f17` (actions), saffron `#9a4521` (the only accent: active scope, changed values, custom badges), leaf `#3d5a2c` (success), chilli `#a12a1d` (errors and removals). Text pairs meet WCAG AA.
- **Surfaces:** mostly open layout separated by 1 px rules. Panels (`--paper-2`, `--white`) are used only where grouping helps: summaries, the custom panel, the composition. Radius is 3 px for controls and 6 px for media and panels.
- **Section rhythm:** a plain `section-head` (title left, one link right). No numbered labels or italic-accent formula. Bands alternate sparingly (custom batches, kitchen story).
- **Motion:** 160–300 ms for feedback and 600–900 ms for reveals, all on `cubic-bezier(.2,.7,.2,1)`. Scroll reveals use CSS scroll-driven animations where supported. The hero text rises and the photo unveils once. Builder dishes grow and shrink, totals ease. There is no bounce, particles or floating objects. Everything is disabled under reduced motion.

## 3. Information architecture & flow

```
/                       Hero → Bestsellers → Categories → Custom batches → Kitchen story → What goes in → FAQ
/shop[?category|need|q|stock|custom|sort]
/shop/[slug]            Standard purchase; eligible products also show "Make it your way"
/customise              1 · Choose product (eligible list only)
/customise/[slug]       2 · Formulate
/customise/[slug]?step=review   3 · Review → add to cart (or update the line when ?edit=<cartKey>)
/cart  /checkout        Custom lines show every change, surcharge, note and an Edit mix link
```

## 4. Custom-batch formulation

- **Model** (`src/lib/customization.ts`, pure and tested): lines in g/500 g with role, options, min/max/step. One `fill` line absorbs the remainder so the batch weight is constant, and its minimum caps additions. `setAmount` clamps and reports *which* limit applied (`min`, `max`, `fill`), so the UI can explain it in words.
- **Interface:**
  - Ingredient groups follow the recipe's logic: Base (required) → Nuts → Dried fruit → Seeds & traditional extras → Spices → Note.
  - Each row shows an image, name and local name, a one-line description, prep, allergen, range and price per extra 10 g, a stepper, Add/Remove for additions, swaps for multi-option lines, a "House: … · reset" link and inline limit messages.
- **Visual:**
  - The *mix composition* is a top-down brass thali with one katori per ingredient, filled with that ingredient's photo (or a colour swatch until it exists).
  - Katori area is proportional to grams and positions are fixed, so a change reads as a dish growing, shrinking or emptying. The changed dish gets a brief saffron ring.
  - A proportion bar and caption give the exact grams and share. It is decorative for screen readers, which get an equivalent text label and live announcements.
- **Review:** a full table per 500 g and scaled to the batch, with deltas from house, left-out items, the note, allergens and kitchen-review terms (TBC), plus the summary and confirm button.

## 5. Design-system components

`btn` (primary / secondary / quiet / success, sm / lg) · `icon-btn` · `badge` (default / dark / custom / muted) · `option` tile · `stepper` · `field` / `input` / `select` / `textarea` / `error` · `acc` accordion · `sheet` dialog (left / right / top) · `section-head` · `crumbs` · `kicker` · `arrow-link` · `reveal` / `reveal-group`. All are defined in `src/app/globals.css`, and page modules only lay them out.

## 6. Still to confirm or supply

- Kitchen: ingredient list, house recipes, limits, steps and prices; custom-batch lead time; allergen and cross-contact statement.
- Business: prices, stock, shelf life, policies, delivery promises, FSSAI and certifications, reviews.
- Photography: all 55 slots in `CODEX_IMAGES.md`. None exist yet.
