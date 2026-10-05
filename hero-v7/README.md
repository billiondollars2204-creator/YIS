# Immunitywize — hero v7 (rebuilt from scratch)

Standalone homepage hero (header + hero + fact row). Open `index.html` in a browser — no build step.

**What carried over from the existing site:** brand facts only — the name, the product range
(panjiri, pinni, laddus, mewa mixes), product names and Hindi names (Atta Pinni पिन्नी, Ghar ki Panjiri पंजीरी),
product slugs, and the stated "made by hand, in small batches, from family recipes".
**What didn't:** none of the earlier palette, type, layout, components, logo concepts or imagery (including `hero-demo/`).
Every design decision comes from `Immunitywize_Ecommerce_Design_and_Conversion_Brief_2026-10-05.md`.

| Brief | How it's applied |
|---|---|
| §1, §10.2 composition | Centred vertical stack, not a split screen: eyebrow → one-line/two-line headline → one supporting sentence → **Shop snacks** + quiet **Meet Atta Pinni** → large food photograph |
| §10.2 copy | "A little taste of home." / "Panjiri, pinni and everyday mixes for the snack cupboard, made by hand in small batches." No wellness or health claims |
| §8.1–8.2 hierarchy | Atta Pinni leads; Ghar ki Panjiri stays visible as the second identity product |
| §10.2 functional text in HTML | Shoppable product labels (name, Hindi name, one sensory line) sit on the photo as real links; on mobile they move under the photo so they never cover the food |
| §10.1, §8.5 header | Wordmark, Shop + Our Kitchen, search and cart. No announcement bar (there's no verified message to show yet) and no fake cart count |
| §10.3 fact row | Three brand facts only: made by hand in small batches · family recipes · ingredients and shelf life on every pack |
| §9.2 colour | Warm paper `#FFF9EF`, deep ink `#24372E`, marigold `#F4B83F` CTA with dark text, toasted cream `#F1E1C9` image ground, muted coral `#DA765D` only as a small accent (underlines, label dots) |
| §9.3 type | One warm grotesk family for heading + UI: **Bricolage Grotesque** (free, variable, optical sizes). **Mukta** for Devanagari names. Hero 76 px desktop / 36–44 px mobile, line-height 1.04–1.06, minimal negative tracking |
| §9.4 details | 1280 px max width; 56 / 40 / 20 px padding; 20 px (16 px mobile) media corners; one 1.5 px keyline; offset shadow only on the main action |
| §9.1, §18.1 Indian character | Specific food, steel katori, chai glass, Hindi product names. No arches, jaali or festive borders. A small drawn mark (a pressed round with a piece broken off) instead of decoration |
| §16.3 CTA | One primary action, 54 px tall, full width on mobile, consistent marigold |
| §10.2 mobile | Separate 4:5 portrait crop; headline, sentence and CTA in the first view at 390 × 844 |
| §15.5, §20 performance | WebP + JPEG, 1280w / 1916w desktop and 900w portrait derivatives, declared dimensions, preloaded + `fetchpriority="high"` (desktop WebP ≈ 89 KB, mobile ≈ 83 KB) |
| §17 motion | Static hero. 90–160 ms hover/press feedback only; removed under `prefers-reduced-motion` |
| §20.2 accessibility | Skip link, visible focus rings, labelled icon links, `lang="hi"` on Devanagari, descriptive alt text |

## Before launch

- **Photography:** both images are AI-generated stand-ins and are labelled on the page. They deliberately show no packaging,
  so nothing implies a real pack. Replace with real Atta Pinni pack + texture shots (brief §15.2 H01/H02).
- **Copy:** headline, sentence and product lines are the brief's drafts — confirm against tasting and the final brand voice.
- **Wordmark:** the mark and lowercase wordmark are a placeholder for a custom-drawn wordmark (§9.3).
- **Links** point to `/shop`, `/shop/atta-pinni`, `/shop/classic-panjiri`, `/our-kitchen`, `/search`, `/cart`.
