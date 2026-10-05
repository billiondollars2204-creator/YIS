# Immunitywize — storefront

A premium, product-first e-commerce site for **Immunitywize**, a homegrown Indian healthy-snacking brand. Panjiri and pinni are the core products, alongside dry-fruit laddus and mixes. It includes a detailed **custom-batch formulation** experience.

> **Placeholder content:** prices, stock, ingredient lists, house-recipe amounts and limits, surcharges, nutrition, certifications, reviews, policies, contact details and benefit copy. Unverified items carry a dashed **TBC** tag on the page. **No photographs exist yet** — see [`CODEX_IMAGES.md`](CODEX_IMAGES.md).

- **Design direction & plan:** [`docs/PLAN.md`](docs/PLAN.md)
- **Image brief (66 slots):** [`CODEX_IMAGES.md`](CODEX_IMAGES.md)
- **Logo concepts:** [`LOGO_CONCEPTS.md`](LOGO_CONCEPTS.md)
- **Stack:** Next.js 16 (App Router, static generation) · React 19 · TypeScript · Zustand (cart) · CSS Modules + design tokens · native `<dialog>` · `next/image`. No UI kit, no animation library.

## Quick start

```bash
pnpm install
cp .env.example .env.local   # optional
pnpm dev                     # http://localhost:3000
```

| Script | What it does |
|---|---|
| `pnpm dev` | Dev server (regenerates the image manifest first) |
| `pnpm build` / `pnpm start` | Production build (all pages prerendered) / serve it |
| `pnpm typecheck` | TypeScript check |
| `pnpm test` | Unit tests: formulation model, house-recipe validity, checkout validation, catalogue filters (`node --test`) |
| `pnpm images:manifest` | Re-scan `public/images` after adding photos |

Node ≥ 20.9 (≥ 22.6 for `pnpm test`, which uses built-in TypeScript stripping).

## What's in the store

- **Header:** utility strip; sticky bar with logo, direct category links (current scope highlighted), a *Custom batch* entry, search, account and cart. On mobile, a menu sheet.
- **Design (v5, “Mithai-shop modern”):** a clean Western e-commerce layout with Indian festive details: toran border, jaali lattice, arch-framed photos and Hindi product names. Type is Tiro Devanagari Hindi (display) and Mukta (UI).
- **Home:** hero with three arch “windows” (Panjiri, Pinni, Laddus, each with a from-price) and an A/B-tested CTA → Bestsellers (category tabs) → Shop by occasion → Custom batches → Gift boxes → What goes in → Our story → FAQ.
- **Shop:** category tabs, need / in-stock / customisable filters (bottom sheet on mobile), sorting and search, all URL-driven. Includes two gift-box bundles.
- **Product cards:** hover image, quick add with confirmation, price per 100 g, a *Customisable* badge and builder link only on eligible products.
- **Product page:** gallery, one-time or **Subscribe & save** (10%, every 2/4/6 weeks), PIN-code delivery check, FSSAI / legal accordion, pack-size buttons with unit price, stock, quantity, add to cart / buy now, order-total and returns note, a *Make it your way* panel (eligible products only), facts, recipe table with ingredient swatches, accordions, related products, sticky add bar.
- **Custom batches** (`/customise` → `/customise/<product>` → review): see below.
- **Cart drawer and cart:** custom lines list every change, surcharge and note, with an **Edit mix** link. Checkout with validation, coupon `WELCOME10`, a COD limit, the state filled from the PIN code, and a demo confirmation.
- **Account** (demo OTP login, orders, reorder, saved items, subscriptions), **Support** (order tracking), FAQ, shipping & returns, contact, our story, 404 and error pages. Demo data is stored on the device (`src/lib/stores.ts`).

## Custom batches

**Eligibility.** `CUSTOMISABLE_PRODUCTS` in `src/data/formulations.ts` lists the products that can be customised: currently `classic-panjiri`, `mothers-panjiri`, `atta-pinni`, `everyday-mix`. Badges, filters, product-page panels, builder routes and sitemap entries all follow this list. Every other product is a standard purchase.

**House recipes.** `formulas` in the same file define each recipe in grams per 500 g of finished batch. Each line has:

- `role`: `"base"` (required, can't be removed) or `"addition"` (can go to zero)
- `options`: ingredient ids; the first is the house choice, and more than one makes it swappable (e.g. jaggery / khand / sugar)
- `grams`, `min`, `max`, `step`
- `fill`: exactly one line per recipe, which absorbs the remaining weight (atta for panjiri and pinni, almonds for the mix). This keeps every 500 g at 500 g, and its `min` caps how much can be added elsewhere.

**Ingredients.** `src/data/ingredients.ts` lists every ingredient with its name, local name, description, prep, category, allergen and price per 100 g, which drives the surcharges.

**Pricing.** Extra grams above the house amount are charged at ingredient cost, and pricier swaps at the difference. The total is rounded up to ₹5 per 500 g. Reducing or removing ingredients never lowers the price.

**Rules.** Custom batches start at **500 g** (500 g, 1 kg or 2 kg in the builder). Standard 250 g packs are bought from the product page. Customised cart lines can't drop below 500 g.

**Consistency.** The cart stores only the differences from the house recipe. The surcharge is recomputed from the formula wherever it's shown (builder, review, drawer, cart, checkout), so prices can't drift. **Edit mix** reopens the builder prefilled and replaces the line in place.

> **All recipes, limits, steps and prices are drafts for kitchen confirmation**, marked TBC in the UI. `pnpm test` checks every formula: the fill line meets its minimum at the house recipe, totals equal 500 g, ingredient ids exist, and house amounts sit within their limits.

## Images

Every photo is a named slot (`src/data/images.ts`) that points to a path under `public/images/`. `CODEX_IMAGES.md` specifies all 66 (prompt, size, background, crop, placement, alt, status). Drop files at those paths and run `pnpm images:manifest`; no code changes are needed. Missing photos render as same-size placeholders, and ingredients render as colour swatches.

## Integrations (placeholders)

| Area       | Where                                   | What to do                                                                 |
| ---------- | --------------------------------------- | -------------------------------------------------------------------------- |
| Payments   | `app/checkout/CheckoutForm.tsx` `onSubmit` | Create the order server-side (route handler / server action), hand off to a provider (e.g. Razorpay, Cashfree, Stripe India), confirm via webhook. Keep keys server-side only. |
| Shipping   | `lib/money.ts`, `lib/pricing.ts`        | Replace flat rates with courier API rates and a real PIN-code serviceability check (the PIN → state map is a stub). |
| Subscriptions | `lib/pricing.ts`, `app/account/`     | Connect a recurring-billing provider (e.g. Razorpay Subscriptions). Plans are stored on the device today. |
| Login & orders | `lib/stores.ts`, `app/account/`, `app/support/` | Replace the demo OTP and on-device orders with real auth, an orders API and courier tracking. |
| Newsletter | `components/Newsletter.tsx`             | POST to your email provider.                                               |
| Contact    | `app/contact/ContactForm.tsx`           | Send to inbox/CRM via a server action.                                     |
| Reviews    | Product page "Reviews" section          | Connect a reviews provider; add `aggregateRating` to Product JSON-LD.      |
| Analytics  | `lib/analytics.ts`, `components/Analytics.tsx` | Set `NEXT_PUBLIC_GTM_ID` to load GTM. Add a consent banner before enabling. |

### Analytics events

`track(event, params)` pushes to `window.dataLayer` and dispatches a `iw:analytics` DOM event. Events fired today:
`page_view`, `view_item`, `view_item_list`, `search`, `select_variant`, `select_purchase_option`, `select_promotion`, `customize_change`, `add_to_cart`, `remove_from_cart`, `view_cart`,
`begin_checkout`, `apply_coupon`, `add_shipping_info`, `add_payment_info`, `purchase`, `check_pincode`, `login`, `track_order`, `contact_submit`, `newsletter_signup`, `experiment_exposure`. The `hero-cta` A/B test lives in `src/lib/experiments.ts`. Nothing is sent anywhere unless you configure a provider.

## Accessibility, motion & SEO

- Semantic landmarks, skip link, visible focus, native radios and buttons for every control (including the builder), and labelled steppers. Polite live regions announce add-to-cart and every builder change with the new total.
- Motion is CSS: scroll-driven reveals (`animation-timeline: view()`, progressive enhancement), hover and focus states, an eased total, and dishes in the mix composition that grow, shrink and empty. Everything is disabled under `prefers-reduced-motion`. Nothing hides content without JS or hijacks scroll.
- Static HTML for every route; metadata, canonicals, sitemap and robots (cart and checkout are noindex); Organization, Product, BreadcrumbList and FAQPage JSON-LD.

## Deployment

The site deploys anywhere Next.js runs: Vercel (preset "Next.js"), a Node host (`pnpm build && pnpm start`), or Netlify/Cloudflare adapters. Set `NEXT_PUBLIC_SITE_URL` in production.

## Before launch

- [ ] Kitchen confirms ingredients, house recipes, limits, steps and per-100 g prices in `src/data/formulations.ts` and `src/data/ingredients.ts`.
- [ ] Replace placeholder prices, stock, nutrition, allergens, shelf life, policies and contact details.
- [ ] Add FSSAI licence and GSTIN numbers, the grievance officer, and confirm coupon, COD and subscription rules.
- [ ] Legal review of benefit copy and FSSAI labelling.
- [ ] Generate or shoot the photos in `CODEX_IMAGES.md`, then replace them with real photography.
- [ ] Connect payments, shipping, newsletter, contact form and reviews; add a consent banner before analytics.
- [ ] Set `NEXT_PUBLIC_SHOW_PLACEHOLDER_MARKERS=false`.
