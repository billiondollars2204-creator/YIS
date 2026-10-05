# Handoff for the next agent

## State
- Branch `hoplite/beroia-f999a173`, open PR #1 against `main` (do not merge without owner approval).
- v5 redesign ("Mithai-shop modern": clean Western e-commerce layout plus Indian festive details such as the toran border, jaali lattice, arch frames and Hindi names) is implemented.
- Last verified: `pnpm test` (18 pass), `pnpm typecheck` and `pnpm build` (28 routes) were all clean before this commit.
- Re-verified after the sitemap change: `pnpm test` (18/18), `pnpm typecheck` and `pnpm build` are clean. All 15 key routes return 200, and every internal link found on them resolves.
- Done since then: `CODEX_IMAGES.md` updated to v5 (66 slots), `README.md` updated, `docs/PLAN.md` recreated.
- **Not yet done:** visual and browser QA of v5. No screenshots were reviewed.

## Key files
- Design system: `src/app/globals.css` (tokens, buttons, chips, forms, sheets, motifs, skeletons). Fonts: Tiro Devanagari Hindi + Mukta (`src/app/layout.tsx`).
- Pages:
  - Shopping: `src/app/page.tsx` (home), `shop/` (filters, sort and a mobile filter sheet), `shop/[slug]` (gallery, buy box, Subscribe & save, PIN-code check, FSSAI/legal accordion)
  - Custom batches: `customise/` (builder in `src/components/builder/`)
  - Purchase: `cart/`, `checkout/` (coupon WELCOME10, COD limit, state filled from PIN code)
  - Support and info: `account/` (demo OTP login, orders, reorder, saved, subscriptions), `support/` (order tracking), `faq`, `shipping-returns`, `contact`, `our-story`, `not-found`, `error`
- Logic:
  - `src/lib/customization.ts`: formulation model
  - `src/lib/pricing.ts`: subscriptions, coupons, COD, PIN code → state
  - `src/lib/cart.ts`, `src/lib/stores.ts`: saved items, demo orders and session, stored on the device
  - `src/lib/experiments.ts`: A/B on the hero CTA
  - `src/lib/analytics.ts`: GA4-style events
- Data: `src/data/products.ts` (now includes Hindi names and 2 gift-box bundles), `formulations.ts` (customisable list and house recipes), `ingredients.ts`, `images.ts`.

## Next steps, in order
1. (Still open; needs a browser) Run `pnpm build && pnpm start`, then check `/`, `/shop`, `/shop/classic-panjiri`, `/customise/classic-panjiri`, `/cart`, `/checkout` and `/account` at 1440px and 390px. Fix layout bugs and console errors.
2. ~~**Update `CODEX_IMAGES.md`**~~ (done), which still describes v4. Changes needed:
   - Remove the `home-hero*` slots (the hero now uses 3 arch-framed category images).
   - Add `public/images/occasions/{immunity,postpartum,clarity,wellness,bone}.jpg` at 3:4 with an arch crop, plus `home/gifting.jpg` and `home/story.jpg` (4:5).
   - Add product images for the bundles `winter-trio` and `new-mother-box`.
   - Product and category images are now shown **1:1**.
3. ~~Rewrite `README.md` and `docs/PLAN.md`~~ (done) (deleted in v5; recreate it). Include the audit, thesis, sitemap, component inventory, tokens, content and FSSAI guidance, accessibility and performance targets, analytics events and the migration plan, as requested in the last user brief (`.hoplite/attachments/art_upload_501e49f18fb94dd7839fa64605a6e5e2/pasted-text.txt`).
4. Commit, push to the branch above, and update the PR #1 description with `gh pr edit 1 --body-file`.

## Placeholders still needing the business
Prices, stock, recipes and limits, surcharges, nutrition, allergens, shelf life, FSSAI and GSTIN numbers, grievance officer, policies, the subscription/payment/shipping integrations, and all photography.
