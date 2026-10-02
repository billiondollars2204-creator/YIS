# Immunitywize — storefront

A warm, hand-made feeling e-commerce site for **Immunitywize**, a homegrown Indian healthy-snacking brand (panjiri, pinni,
dry-fruit laddus and dry-fruit mixes).

> **Everything you see is placeholder content**: prices, stock, ingredients, nutrition, certifications, testimonials, contact
> details and benefit copy. Placeholder claims are visibly marked with a small **TBC** tag (see
> [Placeholder markers](#placeholder-markers)). Search the code for `PLACEHOLDER` and `TODO` before launch.

- **Plan & design system:** [`docs/PLAN.md`](docs/PLAN.md)
- **Stack:** Next.js 16 (App Router, static generation) · React 19 · TypeScript · Zustand (cart) · CSS Modules + design
  tokens · hand-authored SVG illustrations · no UI kit, no animation library.

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
| `pnpm test`      | Unit tests for the customisation rule and checkout validation (`node --test`) |

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
    globals.css           Design tokens + base + primitives (buttons, forms, chips)
  components/
    art/                  Hand-drawn SVG product portraits, icons, paper edges
    KitchenScene.tsx      Scroll-driven sketch of a mother cooking
    ProductPurchase.tsx   Variants, quantity, 500 g customisation gate, add to cart
    ...                   Header, footer, tiles, summaries, placeholders
  data/
    products.ts           Catalogue (PLACEHOLDER data) — categories, variants, options
    content.ts            Benefits, FAQ, Indian states
  lib/
    customization.ts      The 500 g rule (pure, unit-tested)
    validation.ts         Checkout validation (pure, unit-tested)
    cart.ts               Zustand cart store, persisted to localStorage
    analytics.ts          Event hooks (dataLayer + DOM event)
    money.ts site.ts      INR formatting, shipping rules, site config
public/                   favicon, Open Graph placeholder
```

## Customising

### Products

Edit `src/data/products.ts`. Each product has `variants` (pack sizes with price and stock), `ingredients`, `nutrition`,
`preparation`, `storage`, and optional `customizable` + `custom` option lists. Product pages, sitemap and structured data are
generated from this file. When a real backend/CMS arrives, keep the same `Product` shape and swap the data source.

### The customisation rule

`MIN_CUSTOM_GRAMS` in `src/lib/customization.ts` (default **500**). The rule applies to the **line total**: pack size ×
quantity (so 2 × 250 g unlocks customisation; 1 × 250 g does not). Below the minimum the controls are disabled, the reason is
explained in plain words, and one-click fixes are offered ("Switch to 500 g" / "Make it 2 × 250 g"). Customised cart lines
can't be reduced below the minimum. Option lists are placeholders — replace them with kitchen-approved options.

### Design tokens

All colours, type sizes, spacing and easing live at the top of `src/app/globals.css`. See `docs/PLAN.md` for usage rules
and contrast ratios.

### Images

Product portraits are SVG illustrations (`components/art/ProductArt.tsx`) and "taped photo" frames
(`components/PhotoSlot.tsx`). To use photography, replace them with `next/image` at the same aspect ratio to avoid layout
shift. Replace `public/og-placeholder.svg` with a 1200×630 JPG/PNG (most social networks don't render SVG previews).

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
`page_view`, `view_item`, `select_variant`, `customize_change`, `add_to_cart`, `remove_from_cart`, `view_cart`,
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
- [ ] Real photography and Open Graph image.
- [ ] Payment, shipping, newsletter and contact integrations; order emails.
- [ ] Consent banner before analytics.
- [ ] Set `NEXT_PUBLIC_SHOW_PLACEHOLDER_MARKERS=false`.
