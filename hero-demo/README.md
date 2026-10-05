# Immunitywize — hero demo

A standalone demo of **only the homepage hero**, built from
`Immunitywize_Ecommerce_Design_and_Conversion_Brief_2026-10-05.md`.
It doesn't use the earlier site's design system. Only the brand facts carry over (name, products, Atta Pinni / panjiri).

Open `index.html` in a browser. There's no build step.

| Brief | Applied |
|---|---|
| §10.2 composition | Centred vertical stack: eyebrow → 2-line max headline → one supporting line → **Shop snacks** + quiet **Meet Atta Pinni** → large food photo |
| §10.2 copy | "A little taste of home." / "Panjiri, pinni and everyday mixes for the snack cupboard." (draft copy from the brief) |
| §10.2 desktop / mobile | Heading max ~820 px; separate portrait crop under 700 px; CTA stays in the first view on mobile |
| §9.2 colour | Paper #FFF9EF, deep ink #24372E, marigold #F4B83F CTA with dark text, toasted cream image ground, coral as a small accent (link underline) |
| §9.3 type | One warm grotesk family for heading + UI (Gabarito, a free stand-in for the Good Sans reference). Hero 72 px desktop / 34–42 px mobile, line-height 1.06–1.08 |
| §9.4 details | 1280 px max width, 56 px / 20 px padding, 20 / 16 px media corners, one keyline weight, offset shadow only on the main action |
| §15.5 images | Desktop + mobile derivatives, WebP + JPEG fallback, declared dimensions, hero priority (mobile WebP ≈160 KB) |
| §17 motion | Static hero. 150 ms button/link hover only; removed under `prefers-reduced-motion` |

**Temporary imagery:** both photos are AI-generated stand-ins and are labelled on the page.
They show no packaging, so they don't imply a real pack. Replace them with the real
Atta Pinni pack + texture shot (§15.2) before launch.
