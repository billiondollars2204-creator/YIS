# Immunitywize — storefront

A clean, premium e-commerce site for **Immunitywize**, a homegrown Indian healthy-snacking brand (panjiri, pinni,
dry-fruit laddus and dry-fruit mixes).

> **Everything you see is placeholder content**: prices, stock, ingredients, nutrition, certifications, testimonials, contact
> details and benefit copy. Placeholder claims are visibly marked with a small **TBC** tag (see
> [Placeholder markers](#placeholder-markers)). Search the code for `PLACEHOLDER` and `TODO` before launch.

- **Plan & design system:** [`docs/PLAN.md`](docs/PLAN.md)
- **Images to generate (for Codex):** [`CODEX_IMAGES.md`](CODEX_IMAGES.md) — all 49 image slots, each with a prompt, file path and exact placement.
- **Logo concepts:** [`LOGO_CONCEPTS.md`](LOGO_CONCEPTS.md) — 8 meaningful logo directions with detailed generation prompts.
- **Stack:** Next.js 16 (App Router, static generation) · React 19 · TypeScript · Zustand (cart) · CSS Modules + design
  tokens · native `<dialog>` for drawers · no UI kit, no animation library.

### What's included

- Announcement bar, sticky header with a desktop **mega menu**, **search** overlay, account link and cart count.
- Home page: CTA-led centred hero (rotating "for new mothers / cold mornings…" synced with "Shop for" links) →
  bestseller rail → trust bar → 01 categories → 02 live batch-builder demo → 03 scroll-drawn kitchen story → 04 shop by need →
  05 reviews → 06 story → 07 FAQ. Every section uses the same numbered label / title / one-line / link anatomy.
- **Batch builder** (`/customise`, `/customise/<product>`) for panjiri and laddus. It has 8 steps: size, base, dry fruits,
  seeds & traditional extras, spices, sweetness, finish and note. Each ingredient tile has an image and a None / Less / Usual /
  Extra control. A live animated bowl reacts to every choice: pieces drop in, lift out and the batch stirs, with floating
  "+ Almonds" notes. There are quick presets, a recipe receipt with live pricing, and a mobile buy bar with a mini bowl. The
  500 g rule locks every option below 500 g and explains why.
- **Shop** with category tabs, need filter, in-stock and customisable filters, sorting and search results (all URL-driven, e.g.
  `/shop?category=laddus&sort=price-asc`).
- **Product cards** with badges, hover image and one-tap quick add.
- **Product page**: gallery with thumbnails, size selector with stock, quantity, add to cart / buy it now (with confirmation
  state), a "Customise this" entry card into the builder, PIN-code delivery check (placeholder), "What's inside" ingredient
  strip, at-a-glance specs, detail accordions, reviews placeholder, related products and a sticky add-to-cart bar.
- Until photos exist, products, categories and ingredients render as **drawn stand-ins**: a glass jar showing the actual
  ingredients, a brass bowl, and ingredient specimens. There are no grey boxes.
- **Cart drawer** (opens on add), full cart page with suggestions, checkout with validation, account (placeholder),
  FAQ, shipping & returns, contact, our story, 404.

## Quick start

```bash
pnpm install
cp .env.example .env.local   # optional
pnpm dev                     # http://localhost:3000
```

| Script           | What it does                                          |
| ---------------- | ----------------------------------------------------- |
| `pnpm dev`       | Dev server with hot reload                            |
| `pnpm build`     | Production build (all pages prerendered)              |
| `pnpm start`     | Serve the production build                            |
| `pnpm typecheck` | TypeScript check                                      |
| `pnpm test`      | Unit tests: 500 g rule, recipe diffs and surcharges, checkout validation, catalogue filtering (`node --test`) |
| `pnpm images:manifest` | Re-scan `public/images` (runs automatically before dev, build and typecheck) |

Node ≥ 20.9 is required (Node 22.6+ for `pnpm test`, which uses built-in TypeScript stripping).

## Project structure

```
src/
  app/                    Routes (App Router)
    page.tsx              Home — the brand story
    shop/                 Listing (/shop) and product detail (/shop/[slug])
    cart/  checkout/      Cart and checkout (client components)
    support/ faq/ shipping-returns/ contact/ our-story/
    sitemap.ts robots.ts  SEO
    globals.css           Design tokens + base + primitives (buttons, forms, chips, accordions, sheets)
  components/
    SiteHeader.tsx        Header, mega menu, search + mobile menu triggers
    CartDrawer.tsx        Slide-out cart (native <dialog>)
    ProductCard.tsx       Card with badges, hover image, quick add
    ProductPurchase.tsx   Sizes, quantity, add to cart / buy now, sticky bar
    builder/              BatchBuilder (steps, tiles, receipt) + BowlVisual (animated bowl)
    art/                  Ingredient glyphs, IngredientArt, BowlArt, ProductSketch (drawn stand-ins)
    home/                 HeroIntro (rotating audience) + BowlDemo (self-playing builder)
    SmartImage.tsx        Renders an image slot or a neutral placeholder if the file is missing
    KitchenScene.tsx      Scroll-driven sketch of a mother cooking
  data/
    products.ts           Catalogue (PLACEHOLDER data) — categories, variants, options, badges
    content.ts            Benefits, FAQ, Indian states
    ingredients.ts        Ingredient library + per-product house recipes for the builder (PLACEHOLDER)
    images.ts             Image slot registry (paths, alt text) — mirrors CODEX_IMAGES.md
    image-manifest.json   Generated: which image files exist
  lib/
    customization.ts      The 500 g rule, recipe diffs, signatures, surcharges (pure, unit-tested)
    validation.ts         Checkout validation (pure, unit-tested)
    catalog.ts            Shop filtering/sorting/search (pure, unit-tested)
    cart.ts               Zustand cart store (persisted) + cart drawer state
    analytics.ts          Event hooks (dataLayer + DOM event)
    money.ts site.ts      INR formatting, shipping rules, site config
scripts/image-manifest.mjs  Builds image-manifest.json from public/images
public/images/            Generated/real photography goes here (see CODEX_IMAGES.md)
```

## Customising

### Products

Edit `src/data/products.ts`. Each product has `variants` (pack sizes with price and stock), `ingredients`, `nutrition`,
`preparation`, `storage`, and optional `customizable` + `custom` option lists. Product pages, sitemap and structured data are
generated from this file. When a real backend/CMS arrives, keep the same `Product` shape and swap the data source.

### The batch builder and the 500 g rule

- `MIN_CUSTOM_GRAMS` in `src/lib/customization.ts` (default **500**) applies to the line weight (pack × quantity). In the
  builder the 250 g size stays selectable for a standard jar, but every customisation control is disabled with an explanation
  and a "Switch to 500 g" button. Customised cart lines can't go below the minimum.
- `src/data/ingredients.ts` holds the ingredient library (name, local name, sensory note, colour, extra price per level per
  500 g) and one **house recipe** per customisable product (which ingredients are adjustable, the default level, and choice
  groups such as base, roast, ghee, sweetener, sweetness, texture and laddu size). Change this file to change the builder; no
  UI code needs editing.
- Only differences from the house recipe are stored on the cart line (`normalize`), so identical batches merge. Adding more
  than the house level costs `extraPrice` per level; removing never changes the price.
- **All ingredient options, levels and prices are placeholders** pending kitchen confirmation.

### Design tokens

All colours, type sizes, spacing and easing live at the top of `src/app/globals.css`. See `docs/PLAN.md` for usage rules
and contrast ratios.

### Images

Every image on the site is a named slot (see `src/data/images.ts`) that points to a file under `public/images/`.
**[`CODEX_IMAGES.md`](CODEX_IMAGES.md)** lists all 49 slots with a generation prompt, final size, save path and exactly where
each appears. Hand that file to Codex (or a photographer) and drop the results in place. No code changes are needed.

- Files can be `.jpg`, `.webp`, `.png` or `.avif`; the manifest picks whichever exists.
- Missing files render as a drawn stand-in (jar, bowl or ingredient specimen) or, for story photos, a quiet tonal block.
- Images are served through `next/image` (responsive sizes, AVIF/WebP).
- `public/images/og.jpg` (1200×630) becomes the social share image automatically.

### Placeholder markers

`<Placeholder>` wraps copy that must be verified (claims, policies, certifications). It renders a small dashed **TBC** tag.
Set `NEXT_PUBLIC_SHOW_PLACEHOLDER_MARKERS=false` to hide the tags once copy is confirmed — but replace the text first.

## Integrations (placeholders)

| Area       | Where                                   | What to do                                                                 |
| ---------- | --------------------------------------- | -------------------------------------------------------------------------- |
| Payments   | `app/checkout/CheckoutForm.tsx` `onSubmit` | Create the order server-side (route handler / server action), hand off to a provider (e.g. Razorpay, Cashfree, Stripe India), confirm via webhook. Keep keys server-side only. |
| Shipping   | `lib/money.ts`                          | Replace flat rates with courier API rates and a PIN-code serviceability check. |
| Newsletter | `components/Newsletter.tsx`             | POST to your email provider.                                               |
| Contact    | `app/contact/ContactForm.tsx`           | Send to inbox/CRM via a server action.                                     |
| Reviews    | Home "Kind words" section               | Connect a reviews provider; add `aggregateRating` to Product JSON-LD.      |
| Analytics  | `lib/analytics.ts`, `components/Analytics.tsx` | Set `NEXT_PUBLIC_GTM_ID` to load GTM. Add a consent banner before enabling. |

### Analytics events

`track(event, params)` pushes to `window.dataLayer` and dispatches a `iw:analytics` DOM event. Events fired today:
`page_view`, `view_item`, `view_item_list`, `search`, `select_variant`, `customize_change`, `add_to_cart`, `remove_from_cart`, `view_cart`,
`begin_checkout`, `purchase`, `contact_submit`, `newsletter_signup`. Nothing is sent anywhere unless you configure a provider.

## SEO & accessibility

- Static HTML for every page; per-page `metadata`, canonical URLs, Open Graph defaults, `sitemap.xml`, `robots.txt`
  (cart/checkout disallowed and `noindex`).
- JSON-LD: `Organization` (layout), `Product` + `BreadcrumbList` (product pages), `FAQPage` (FAQ). Add images, SKU/GTIN and
  ratings when available.
- Semantic landmarks, skip link, visible focus rings, labelled controls, native inputs behind custom-styled chips, error
  summary that receives focus on checkout, `aria-live` for cart count and add-to-cart feedback, 44px+ touch targets.
- All motion respects `prefers-reduced-motion`; content is never hidden when JavaScript is unavailable.

## Deployment

The site is fully static-renderable and deploys anywhere Next.js runs:

- **Vercel:** import the repo, framework preset "Next.js", set `NEXT_PUBLIC_SITE_URL`. Done.
- **Node host / Docker:** `pnpm build && pnpm start` (port 3000, override with `-p`).
- **Netlify / Cloudflare:** use their Next.js adapters.

Set `NEXT_PUBLIC_SITE_URL` in production so canonical URLs, sitemap and structured data use the real domain.

## Before launch checklist

- [ ] Replace every `PLACEHOLDER` / `TODO` / TBC item (prices, stock, ingredients, nutrition, policies, contact details).
- [ ] Legal/regulatory review of benefit copy (no medical claims) and FSSAI labelling details.
- [ ] Real photography and Open Graph image (generated images from `CODEX_IMAGES.md` are stand-ins).
- [ ] Payment, shipping, newsletter and contact integrations; order emails.
- [ ] Consent banner before analytics.
- [ ] Set `NEXT_PUBLIC_SHOW_PLACEHOLDER_MARKERS=false`.
