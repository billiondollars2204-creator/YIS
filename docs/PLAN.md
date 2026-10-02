# Immunitywize — implementation plan & design system

## 1. Goals, in priority order

1. **Get people to products fast.** Shopping is one tap away from every screen (header, hero buttons, mega menu,
   search). Categories and bestsellers sit directly under the hero.
2. **Clarity.** Visitors should understand within one screen what the products are, why they're different
   (homemade, small batches, real ingredients) and how to buy.
3. **Premium and clean.** Restrained palette, generous whitespace, editorial serif headlines, real photography (see
   `CODEX_IMAGES.md`). The kitchen sketch animation is the one illustrated moment and gives the brand warmth.
4. **Trust.** Honest placeholders, no invented claims, simple cart and checkout with clear totals and validation.

## 2. Stack

| Need                        | Choice                          | Why                                                                     |
| --------------------------- | ------------------------------- | ----------------------------------------------------------------------- |
| SEO + speed for a catalogue | Next.js 16 App Router, SSG      | Every page prerendered; metadata, sitemap and robots built in.          |
| Interactivity               | React 19 client components      | Header, drawer, shop filters, purchase panel, cart and checkout.         |
| Cart state                  | Zustand + `persist`             | Tiny, no providers, survives reloads via localStorage.                  |
| Styling                     | CSS Modules + global tokens     | Bespoke look with zero runtime cost.                                    |
| Overlays                    | Native `<dialog>`               | Focus trapping, Esc to close and an inert background for free.          |
| Images                      | `next/image` + slot manifest    | Responsive AVIF/WebP; placeholders until files exist.                   |

Deferred: commerce backend/CMS, payments, accounts, i18n. The `Product` type is the contract to keep when swapping data sources.

## 3. Information architecture

```
/                 Home
/shop             All products; ?category= ?need= ?q= ?stock=1 ?custom=1 ?sort=
/shop/[slug]      Product detail
/cart             Cart page (a cart drawer is also available everywhere)
/checkout         Contact → address → delivery → payment → confirmation
/account          Sign-in placeholder
/support          Help hub → /faq, /shipping-returns, /contact
/our-story        Brand story
```

### Home page order

1. Announcement bar + header (mega menu, search, account, cart)
2. **Hero, centred and stacked:** eyebrow → headline → one line → [Shop all] [Build a custom batch] → wide image
3. Shop by category (5 image tiles)
4. Bestsellers (4 product cards with quick add)
5. Four promises (one row, text only)
6. **Kitchen story**: the scroll-drawn sketch of a mother cooking, with four steps
7. Shop by need (immunity, wellness, postpartum, bone health, clarity → filtered shop), with a disclaimer
8. Custom batches (500 g rule explained up front)
9. Reviews (placeholders)
10. Our story teaser
11. FAQ (4 questions)
12. Footer with newsletter

## 4. Design system

### Colour

| Token            | Hex       | Use                                   |
| ---------------- | --------- | ------------------------------------- |
| `--paper`        | `#fbf8f3` | Page background                        |
| `--paper-deep`   | `#f3ede4` | Bands, image wells, summaries          |
| `--paper-bright` | `#fffdf9` | Inputs, panels                         |
| `--ink`          | `#1e1915` | Text, outlines, footer background      |
| `--ink-soft`     | `#5f564d` | Secondary text                         |
| `--jaggery`      | `#2e2119` | Primary buttons, announcement bar      |
| `--saffron`      | `#9c4a22` | Eyebrows, accents, cart count          |
| `--cardamom`     | `#3f5a2e` | In stock, success, progress            |
| `--chilli`       | `#a12a1d` | Errors                                 |
| `--line`         | `#e6ded2` | Hairlines                              |
| `--field`        | `#8f8478` | Form control borders (≥3:1)            |

Every text pair meets WCAG AA or better on the paper backgrounds. The `--wash-*` colours are used only inside the kitchen illustration.

### Typography

- **Display:** Cormorant Garamond 500/600, used for headlines at large sizes only.
- **UI/body:** Hanken Grotesk, used for body text, product names, prices, buttons and labels.
- Eyebrows are 12px uppercase with 0.16em tracking, in saffron.
- Fluid scale `--step--2 … --step-5` using `clamp()`.

### Layout

- `--page-max` 84rem and a fluid `--gutter`. Mobile-first: 2-column product grid on phones, 3 on tablets, 4 on desktop.
- Section rhythm comes from `.section` padding (≈48–80px) plus a consistent `SectionHead` (title on the left, "View all" on the right).
- Radius is 2px everywhere. No card shadows; separation comes from hairlines, tonal bands and whitespace.

### Components & states

| Component        | Default                      | Hover / active                    | Focus             | Disabled / error              |
| ---------------- | ---------------------------- | --------------------------------- | ----------------- | ----------------------------- |
| `.btn`           | Espresso fill                | Darker; presses 1px               | 2px ink outline   | Sand fill, muted text         |
| `.btn--outline`  | Ink border                   | Fills with ink                    | same              | same                          |
| Size selector    | Bordered tile, size + price  | Ink border / inset ink ring       | Outline           | Dashed border, "Sold out"     |
| `.choice` chip   | Bordered                     | Ink border / ink fill when chosen | Outline           | Dashed, muted                 |
| `.input`         | White-ivory, `--field` border | Ink border                       | Ink border + ring | Chilli border + message       |
| `.acc` accordion | Hairline rows, plus icon      | Saffron label                    | Outline           | —                             |
| Sheets           | Slide in from the side or top over a dimmed backdrop | —      | Focus moves inside | Esc / backdrop click closes |

### Motion

- Feedback 160–250ms; sheets slide in over 320ms. Product card image zooms 3% on hover and crossfades to the second image.
- Kitchen scene: scroll progress `--p` (0→1) drives `stroke-dashoffset` for each stroke, then watercolour washes fade
  in, the arm stirs and steam rises.
- With `prefers-reduced-motion`, everything renders in its finished state. Without JS, nothing is hidden.

## 5. Commerce rules

- Variants are pack sizes (250 g / 500 g / 1 kg placeholders) with price and stock. Sold-out sizes are disabled, and
  sold-out products sink to the end of listings.
- **Customisation** is allowed only when line weight (pack × qty) ≥ 500 g. Below that the controls are disabled, the
  reason is explained and quick fixes are offered. Customised cart lines can't drop below 500 g.
- Quick add uses the smallest available pack. Adding to cart opens the cart drawer.
- Free standard delivery over ₹999 (placeholder), with a progress bar in the drawer and cart.

## 6. Next steps

1. Generate the images in `CODEX_IMAGES.md`, then replace them with real photography.
2. Commerce backend (e.g. Shopify Storefront API or Medusa) behind the existing `Product` type.
3. Payments plus order webhooks; courier API for rates and PIN-code serviceability.
4. Accounts, reviews provider, consent banner and then analytics.
5. Playwright end-to-end tests for quick add, the customisation gate and checkout.
