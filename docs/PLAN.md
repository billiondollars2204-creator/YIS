# Immunitywize — implementation plan & design system

## 1. Goals, in priority order

1. **Clarity.** Within one screen a visitor should know what the products are (panjiri, pinni, laddus, mixes), why they're
   different (homemade, small batches, real ingredients) and how to buy (one obvious button).
2. **Warmth with restraint.** Homely, hand-made, textured, but still clean and premium. Craft shows up in details
   (hand-drawn lines, handwritten notes, paper grain, imperfect radii), not in clutter.
3. **Memorability.** One signature moment (the scroll-drawn kitchen) plus a consistent illustrated voice.
4. **Trust.** Honest placeholders, no invented claims, simple cart and checkout with clear totals and validation.

## 2. Stack decision

| Need                          | Choice                          | Why                                                                     |
| ----------------------------- | ------------------------------- | ----------------------------------------------------------------------- |
| SEO + speed for a catalogue   | Next.js 16 App Router, SSG      | Every page prerendered to HTML; metadata API, sitemap and robots built in. |
| Interactivity (cart, PDP)     | React 19 client islands         | Only the purchase panel, cart, checkout and header ship meaningful JS.  |
| Cart state                    | Zustand + `persist`             | ~1 KB, no providers, survives reloads via localStorage.                 |
| Styling                       | CSS Modules + global tokens     | A bespoke look without fighting a utility/UI kit; zero runtime cost.    |
| Motion                        | CSS + one rAF scroll listener   | Scroll progress is written to a CSS variable; no animation library.     |
| Illustration                  | Hand-authored inline SVG        | Distinctive, tiny, themeable, and replaceable with photography later.   |

Deliberately deferred: CMS/commerce backend, payments, i18n, auth/accounts. The `Product` type is the contract to keep when
swapping data sources.

## 3. Information architecture

```
/                 Home — story-led
/shop             All products grouped by category, sticky category jump-nav
/shop/[slug]      Product detail — variants, price, stock, quantity, customise (≥500 g), details
/cart             Lines, quantity, custom summary, free-delivery progress, summary
/checkout         Contact → address → delivery → payment, error summary, confirmation
/support          Help hub → /faq, /shipping-returns, /contact
/our-story        Long-form founder story (placeholder)
```

### Home narrative

1. Hero — promise in one line, one primary CTA, three assurances.
2. Who we are — family kitchen, photo slot.
3. What makes us different — three numbered points, staggered (not cards).
4. **Kitchen scene** — scroll draws a mother cooking, beside four steps of how a batch is made.
5. Benefits — immunity, wellness, postpartum, bone health, mental clarity, framed as *traditional use* with a disclaimer.
6. Featured products.
7. Customise teaser explaining the 500 g rule up front.
8. Promise — "Always / Never" lists and certification stamp placeholders.
9. Social proof — pinned handwritten notes (placeholders).
10. Closing CTA → footer with newsletter.

## 4. Design system

### Colour

| Token             | Hex       | Use                                 | Contrast on `--paper` |
| ----------------- | --------- | ----------------------------------- | --------------------- |
| `--paper`         | `#f8f1e4` | Page background (with grain)        | —                     |
| `--paper-deep`    | `#efe2cb` | Alternate bands                     | —                     |
| `--paper-bright`  | `#fffaf1` | Inputs, receipts, notes             | —                     |
| `--ink`           | `#2a1d15` | Body text, outlines                 | 14.6 : 1              |
| `--ink-soft`      | `#5c4636` | Secondary text                      | 7.8 : 1               |
| `--jaggery`       | `#6b3e1f` | Primary buttons (text 8.7 : 1)      | 8.0 : 1               |
| `--saffron`       | `#a5461b` | Accents, links, focus ring          | 5.4 : 1 (4.7 on deep) |
| `--cardamom`      | `#4f6234` | Success, positive stock             | 6.0 : 1               |
| `--chilli`        | `#9b2c1f` | Errors                              | 6.7 : 1               |
| `--turmeric`      | `#e3a935` | Decoration only — never text        | —                     |
| `--wash-*`        | pastels   | Illustration washes, icon blobs     | —                     |

Input borders (`#8a7564`) are 3.9 : 1 against the page, which meets the 3 : 1 non-text contrast guideline.

### Typography

- **Display:** Fraunces (variable; `SOFT 100`, `WONK 1`) — warm, slightly quirky serif for headings and prices.
- **Body/UI:** Instrument Sans — clean and highly legible at small sizes.
- **Hand:** Caveat — eyebrows, annotations, numerals. Never for paragraphs or essential information.
- Fluid scale `--step--1 … --step-5` using `clamp()`, ≈1.2 on mobile up to 1.333 on desktop. Body 16–18px, line-height 1.6,
  max measure 64ch.

### Spacing & layout

- Scale `--space-1 … --space-9` (4px → ~144px); the two largest steps are fluid.
- `--page-max` 78rem, fluid `--gutter`. Mobile-first; breakpoints are content-driven (≈640/800/900/960/1000px).
- Anti-"dashboard" rules: no bordered card grids; product tiles are borderless illustrations on organic blobs, staggered
  vertically; dashed hand-ruled dividers instead of boxes; torn-paper section edges.

### Components & states

| Component       | Default                                 | Hover / active                              | Focus                     | Disabled / error               |
| --------------- | --------------------------------------- | ------------------------------------------- | ------------------------- | ------------------------------ |
| `.btn`          | Jaggery fill, ink border, offset "print" shadow | Lifts 1px, shadow grows / presses into the page | 3px saffron outline | Flat, muted, no shadow         |
| `.btn--ghost`   | Transparent                             | Turmeric wash + shadow                      | same                      | same                           |
| `.arrow-link`   | Short underline                         | Underline draws to full width, arrow nudges | same                      | —                              |
| `.choice` chip  | Native radio/checkbox under a pill      | Border darkens / scales 0.97                | Outline on chip           | 60% opacity, not-allowed       |
| `.input`        | Bright paper, warm border               | Ink border                                  | Saffron border + halo     | Chilli border, tinted bg, message with icon |
| Error summary   | Hidden                                  | —                                           | Receives focus on submit  | Links jump to each field       |

### Motion

- Easing `--ease-out` (`cubic-bezier(.22,1,.36,1)`); 160ms for feedback, 400–900ms for reveals.
- Scroll reveals: one shared `IntersectionObserver`, 18px rise + fade, staggered via `--delay`.
- Kitchen scene: progress `--p` (0→1) drives `stroke-dashoffset` per stroke (each with its own start/duration), then
  watercolour washes fade in, the stirring arm rocks, steam rises.
- `prefers-reduced-motion`: everything renders in its finished state; no transforms or floating.
- No-JS: an inline script adds `.js` before paint; without it, nothing is hidden.

## 5. Commerce rules

- Variants are pack sizes (250 g / 500 g / 1 kg placeholders), each with price and stock (`in_stock`, `low_stock`,
  `out_of_stock`). Sold-out sizes are disabled; fully sold-out products show "Sold out — back soon".
- **Customisation** only when line weight (pack × qty) ≥ 500 g. Below that the fieldset is `disabled`, the reason is
  explained, and quick fixes are offered. Choices made earlier are kept but not applied until unlocked.
- Conflicting options (e.g. "Extra nuts" vs "Leave out nuts") disable each other.
- Cart merges identical lines (same product, size and customisation signature); max 20 per line.
- Shipping: placeholder flat rates; free standard delivery over ₹999 (placeholder).
- Checkout: client validation for email, Indian mobile, 6-digit PIN, required address fields; demo confirmation only.

## 6. Next steps

1. Replace placeholder content with verified copy, photography and the kitchen's real option lists.
2. Commerce backend (e.g. Shopify Storefront API, Medusa, or a small custom API) behind the existing `Product` type.
3. Payment provider + order webhooks; courier integration with PIN-code serviceability.
4. Consent banner, then analytics; reviews provider.
5. Playwright end-to-end tests for add-to-cart, customisation gate and checkout.
