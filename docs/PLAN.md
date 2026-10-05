# Immunitywize storefront: plan (v5)

Status: v5 “Mithai-shop modern” is implemented on `hoplite/beroia-f999a173` (PR #1). All business facts are placeholders (marked **TBC** in the UI) until the owner confirms them.

## 1. Audit (v4 → v5)

| Area | v4 finding | v5 response |
|---|---|---|
| First impression | Calm but generic. Reads as "artisan food", not as an Indian sweet shop. | Toran border, jaali lattice, arch frames and Hindi names give it a recognisable *mithai-shop* identity without clutter. |
| Hero | One large still life with a single path into the shop. | Three arch “windows” lead straight to Panjiri, Pinni and Laddus with from-prices. The CTA is A/B tested. |
| Discovery | Browsing by category only. | Adds Shop by occasion (immunity, postpartum, clarity, wellness, bone), bestseller tabs and gift boxes. |
| Conversion | No repeat-purchase or trust levers. | Subscribe & save, PIN-code check, free-shipping bar, coupon, COD, and FSSAI/legal accordion. |
| Retention | No account. | Demo OTP login, orders, reorder, saved items, subscriptions and order tracking. |
| Mobile | Filters crowded the top of the shop. | Filter bottom sheet, sticky add bar, mobile menu sheet. |

## 2. Thesis

**"Ghar ka swaad, shop-ready."** It should taste and look like it came from a family kitchen and buy like a modern D2C store. Western e-commerce conventions carry the conversion work (clear grid, price per 100 g, one-tap add). Indian festive details carry the brand (colour, motifs, Hindi, arches) and stay decorative, never in the way.

## 3. Sitemap

```
/                       Home
/shop                   Catalogue (?category, ?need, filters, sort, q)
/shop/[slug]            Product (9: 7 products + 2 gift boxes)
/customise              Custom-batch chooser
/customise/[slug]       Builder (4 customisable products)
/cart  /checkout        Purchase (noindex)
/account                Login, orders, saved, subscriptions
/support                Order tracking + help
/faq  /shipping-returns  /contact  /our-story
/sitemap.xml  /robots.txt  404  error
```

## 4. Component inventory

- **Shell:** `SiteHeader`, `MobileMenu`, `SearchDialog`, `CartDrawer`, `FreeShippingBar`, `SiteFooter`, `Newsletter`, `TrustStrip`, `Analytics`, `JsonLd`.
- **Commerce:** `ProductCard`, `ProductMini`, `ProductGallery`, `ProductBuy` (variants, subscribe, quantity), `AddButton`, `SaveButton`, `PincodeCheck`, `CartLines`, `OrderSummary`.
- **Builder:** `builder/Builder`, `Steps`, `IngredientControl`, `RecipeJar`, `IngredientSwatch`.
- **Home:** `home/BestsellerTabs`, `home/HeroActions` (experiment).
- **Media and primitives:** `SmartImage` (manifest lookup and same-size placeholder), `Placeholder`, `ui.tsx` (TBC tag, accordions, chips), `icons.tsx`.
- **Global classes** (`globals.css`): `.btn` variants, `.chip`, form fields, `.sheet` (dialogs), `.arch`, `.toran`, `.jaali`, skeletons, `.section--cream`.

## 5. Design tokens (`src/app/globals.css`)

| Group | Tokens |
|---|---|
| Colour | `--bg #fffcf7`, `--cream #fbf3e4`, `--ink #1b1511`, `--brand #8a1c2b` (sindoor), `--marigold #e8a23a`, `--peacock #0f5a54`, `--veg #1e8a3c` (veg mark), `--danger #b42318` |
| Type | `--font-display` Tiro Devanagari Hindi, `--font-ui` Mukta. Fluid scale `--fs-12` … `--fs-56` |
| Space | `--sp-1` 4px … `--sp-9` fluid 64–96px. `--container 1240px`, fluid `--gutter` |
| Shape | `--r-sm 6`, `--r-md 10`, `--r-lg 16`, `--r-pill`, `--arch` (rounded-top) |
| Depth and motion | `--e-1…3`, `--ease`, `--t-fast 140ms`, `--t-base 220ms`, `--t-slow 480ms` |
| Motifs | `--toran`, `--jaali` (inline SVG) |

Text colours `--ink`, `--ink-2` and `--brand` on `--bg`/`--cream` meet WCAG AA. Marigold is for decoration only. Use `--marigold-ink` for text.

## 6. Content and FSSAI guidance

- **Names:** English name first, Hindi second (e.g. *Ghar ki Panjiri · पंजीरी*). Use Devanagari only as display text, never as the only label.
- **Claims:** describe tradition and ingredients (“families reach for this in winter”). **No health or medical claims** (“boosts immunity”, “cures”) unless they're permitted under the FSSAI (Advertising & Claims) Regulations 2018. Occasion names such as “Immunity” are navigation labels, and their copy stays traditional.
- **Every product page must show:** product name, ingredients in descending order by weight, allergens (nuts, milk/ghee, gluten), nutrition per 100 g, net quantity, veg mark, best-before/shelf life, storage, FSSAI licence number, manufacturer name and address, and the customer-care contact. MRP is inclusive of all taxes.
- **Site-wide:** FSSAI licence and GSTIN in the footer, grievance officer (Consumer Protection (E-Commerce) Rules 2020), and returns/refund and shipping policies. Perishable food is non-returnable except when it arrives damaged or wrong.
- **Custom batches:** label them as made to order, with allergen changes shown per line.

## 7. Accessibility targets

WCAG 2.2 AA: semantic landmarks, a skip link, and visible focus. Every control is a native button, radio or input with a label. Dialogs use native `<dialog>` with focus return. Live regions announce cart and builder totals. Target sizes are at least 24px (44px on mobile primary actions). There's no information carried by colour alone, and decorative motifs are `aria-hidden`. Motion is disabled under `prefers-reduced-motion`.

## 8. Performance targets

On a mid-range Android over 4G: **LCP < 2.5 s** (the middle hero arch is the preloaded LCP image), **CLS < 0.05** (every image slot reserves its ratio), and **INP < 200 ms**. The JS target is under 120 KB gzipped per route on first load. All routes are static. Fonts are self-hosted via `next/font` with `display: swap`. Images go through `next/image` with correct `sizes`. There are no third-party scripts until consent.

## 9. Analytics events (GA4 naming)

`page_view`, `view_item_list`, `view_item`, `select_variant`, `select_purchase_option`, `select_promotion`, `search`, `check_pincode`, `customize_change`, `add_to_cart`, `remove_from_cart`, `view_cart`, `begin_checkout`, `apply_coupon`, `add_shipping_info`, `add_payment_info`, `purchase`, `login`, `track_order`, `contact_submit`, `newsletter_signup`, `experiment_exposure` (`hero-cta`: `shop-bestsellers` vs `shop-all`).

**Primary KPIs:** conversion rate, AOV, subscription attach rate, and custom-batch share of revenue. **Funnel:** `view_item → add_to_cart → begin_checkout → add_shipping_info → add_payment_info → purchase`.

## 10. Migration plan

1. **Content freeze:** the owner confirms prices, recipes, limits, nutrition, allergens, licences and policies (`src/data/*`, `src/lib/pricing.ts`, `src/lib/money.ts`).
2. **Photography:** shoot or generate the 66 slots in `CODEX_IMAGES.md`, then run `pnpm images:manifest`.
3. **Backend:** orders API and payments (Razorpay/Cashfree with webhooks), subscriptions, OTP auth, and courier rates, serviceability and tracking. Replace the on-device stores in `src/lib/stores.ts`.
4. **Domain and SEO:** set `NEXT_PUBLIC_SITE_URL`, and set up 301 redirects from any old store URLs to `/shop/[slug]`. Submit `sitemap.xml` and verify in Search Console.
5. **Analytics:** add a consent banner, then set `NEXT_PUBLIC_GTM_ID` and map the events above to GA4 ecommerce.
6. **Launch QA:** browser QA at 1440px and 390px, a Lighthouse run against the targets above, an axe scan, and a test order end to end. Then set `NEXT_PUBLIC_SHOW_PLACEHOLDER_MARKERS=false`.
