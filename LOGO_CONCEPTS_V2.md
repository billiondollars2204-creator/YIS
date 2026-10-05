# Immunitywize: brand mark concepts v2 (immunity × wisdom)

Eight new logo directions, a full colour system and ready-to-use image prompts. **This is a separate exploration from `LOGO_CONCEPTS.md`** (v1, which was about the kitchen and heritage). Both are kept.

v1 asked *"who makes this?"* v2 asks ***"what does it give you?"***

- **Immunity:** inner strength, protection, a body that holds steady.
- **Wize:** knowing, inherited wisdom, a clear mind, and the grandmother who *knew* what to feed you.

The aim is to say both quietly. No leaf-heart-shield-brain soup.

> Image models are for **exploring** these directions. They can't make the final logo. Generate 20–40 variations per direction and shortlist 2–3. Then have a designer **redraw the winner as clean vector**. Never use generated lettering. Set the wordmark in real type (see §3).

---

## 1. The brief in one line

**A mark that feels like a family secret, not a supplement: calm, exact, warm, and quietly strong.** It should look as at home embossed on a kraft jar lid as it does as a 48 px app icon.

### Ruled out (this is what makes a mark look like AI slop or a pharmacy)

| Cliché | Why it's out |
|---|---|
| Leaf + heart, leaf + hand, leaf anything | Every second wellness brand uses it. Says "generic organic". |
| Shield, cross, plus sign | Pharmacy and insurance. Immunity as medicine, which we're not (and FSSAI won't let us claim it). |
| Brain, lightbulb, owl, graduation cap | Too literal for "wise". Looks like an ed-tech logo. |
| Om, lotus, mandala, Ganesha, intricate rangoli | Religious or overused. Too detailed to survive at 16 px. |
| DNA helix, molecules, swooshes, glowing orbs | Tech/pharma, and the standard AI-generated look. |
| Gradients, gloss, 3D, glow, drop shadows | Slop signals. They also fail on packaging print and one-colour embossing. |

### Must-pass tests (score every shortlisted mark 1–5)

1. **16 px:** still recognisable as a favicon.
2. **One colour:** works in solid sindoor, in black, and as a blind emboss or foil.
3. **Squint test:** one clear silhouette, not a texture.
4. **No explanation needed to like it.** The story is a bonus, not a crutch.
5. **Ownable:** a reverse image search shouldn't turn up 50 lookalikes.
6. **Sits next to Hindi.** It looks right beside "इम्युनिटीवाइज़" as well as the English name.

---

## 2. Colour system: "Haldi, Sindoor & Amla"

Built from Indian pantry ingredients and aligned with the website tokens (`src/app/globals.css`), so the logo drops straight into the site.

| Role | Name | HEX | RGB | Use |
|---|---|---|---|---|
| **Primary** | Sindoor | `#8A1C2B` | 138, 28, 43 | Logo colour, primary buttons, jar band. Means warmth and care. |
| **Ink** | Kajal | `#1B1511` | 27, 21, 17 | Body text, one-colour black logo. Warm black, never pure #000. |
| **Accent** | Haldi | `#E3A72F` | 227, 167, 47 | Highlights, foil and gold substitute, festive details. Means the body and its warmth. |
| **Secondary** | Amla | `#2F5D46` | 47, 93, 70 | Wellness and subscription moments, secondary packaging. Means the mind, calm and clarity. |
| **Ground** | Khadi | `#FBF3E4` | 251, 243, 228 | Backgrounds, labels, cards. |
| **Ground 2** | Badam | `#E9D9BF` | 233, 217, 191 | Kraft-adjacent panels, dividers, emboss stock. |
| **Utility** | Peacock | `#0F5A54` | 15, 90, 84 | Links and info states only (already in the site). |

**Ratios:** 60% Khadi, 25% Kajal and Sindoor, 10% Amla, 5% Haldi. Haldi is a **spice**, so use it in small amounts.

**Approved logo colourways:**
1. Sindoor on Khadi *(primary)*
2. Khadi on Sindoor *(app icon, stickers, gift boxes)*
3. Kajal on Badam / kraft *(packaging, stamps)*
4. Haldi foil on Amla *(premium gift box, festive cards)*
5. Solid white or black *(partners, invoices, fax-grade use)*

**Contrast:** Sindoor and Kajal on Khadi meet AA for text. Haldi on Khadi doesn't, so it's **decorative only**, never text. Khadi on Amla meets AA.

**Print:** sindoor ≈ Pantone 7427 C, haldi ≈ 7409 C, amla ≈ 7735 C (match against physical swatches before printing).

---

## 3. Typography for the wordmark

- **Wordmark:** a warm humanist serif with calligraphic stress. Shortlist: *Fraunces (soft, low "wonk"), Gambetta, Tiro Devanagari Latin*. Set "Immunitywize" in lowercase or title case at about −1% tracking. **Customise one detail only** (see each concept). Usually that's the **i-dot** or the **z**.
- **Hindi lockup:** *Tiro Devanagari Hindi*, the site's display face: **इम्युनिटीवाइज़**. Match its x-height to the Latin, not its cap height.
- **UI and packaging body:** *Mukta* (already on the site).
- **Lockups:** horizontal (mark left), stacked (mark above) and mark-only. Keep clear space equal to the mark's inner counter on all sides.

---

## 4. The eight concepts

Each concept has the idea, the construction and three prompts:

- **A · Mark:** the logo itself on a flat background.
- **B · App icon:** the mark in a rounded square.
- **C · In use:** a packaging or card mockup to judge it in context.

Append the **universal style block** and the **universal negative prompt** (§5) to every prompt.

---

### ① Badam Eye: "Soaked almonds, every morning" ★ recommended

**Idea:** Every Indian child was handed soaked almonds before school: *"for your memory."* It's the most widely understood food-as-wisdom ritual in the country. An almond, drawn as a calm, half-open **eye**, means *seeing clearly, knowing*. One shape carries nourishment (immunity) and awareness (wize).

**Construction:** a single almond outline with a slightly heavier lower lid, like a brush stroke. Inside sits a small solid **round seed-dot** as the pupil, set a little off-centre (a glance, not a stare). There are no lashes and no brows. Two strokes and a dot in total.

**Wordmark detail:** the dot on the *i* becomes a tiny almond.

- **A:** `A minimalist logo mark: a single almond shape drawn as a calm half-open eye, the lower edge a slightly thicker confident brush-like stroke, a small solid round dot inside as the pupil set slightly off-centre, no eyelashes, no eyebrow, two strokes and one dot only, sindoor red #8A1C2B on warm cream #FBF3E4, centred with generous margin`
- **B:** `App icon, rounded square, solid sindoor red #8A1C2B background, the almond-eye mark in warm cream #FBF3E4 centred at 55% of the icon width, perfectly flat, crisp edges`
- **C:** `Product photo of a clear glass jar with a brushed brass lid, the lid embossed with a small almond-eye symbol, a plain kraft paper band around the jar printed with the same symbol in sindoor red, soft window light from the left, warm cream backdrop, editorial packaging photography`

---

### ② Amla: "Six quiet lines"

**Idea:** Amla (Indian gooseberry) is Ayurveda's best-known everyday immunity fruit. It has **six faint natural seams**. Abstracted, it reads as a sphere held together, like a small globe or a protected whole. People who know amla see amla. Everyone else sees a calm, balanced orb, so it never feels on the nose.

**Construction:** a perfect circle containing six curved meridian lines that meet at top and bottom, drawn as thin lines and **slightly rotated** so it feels alive, not like a technical diagram. A tiny stalk nub at the top is the only literal fruit cue. There's no leaf.

**Wordmark detail:** none. Let the round mark do the work. Optionally the *o*-like counter of the *w* echoes one meridian curve.

- **A:** `A minimalist logo mark: a circle with six thin curved meridian lines meeting at the top and bottom like the natural seams of an Indian gooseberry, slightly rotated, a tiny stub stalk at the top, no leaf, even line weight, amla green #2F5D46 on warm cream #FBF3E4, geometric yet hand-tuned, centred`
- **B:** `App icon, rounded square, amla green #2F5D46 background, the six-seam circle mark in haldi gold #E3A72F centred at 60% width, perfectly flat`
- **C:** `A square kraft gift box lid with a single six-seam circle symbol hot-foil stamped in gold at its centre, red cotton string tied around the box, top-down view, soft daylight, minimal styling, editorial photography`

---

### ③ Saptarishi: "Seven sages, seven seeds"

**Idea:** The Saptarishi, the seven sages, is the Indian name for the Big Dipper. Grandparents point it out on summer nights on the roof. Here it's drawn as **seven seeds**: almond, cardamom, melon seed, makhana and others. Wisdom in the sky, made of what's in the jar. It's quietly erudite without being religious.

**Construction:** the seven-point Big Dipper pattern, with each point a slightly different small seed silhouette at the same visual weight. There are **no connecting lines**, so the eye completes the shape. It's a mark for people who look twice.

**Wordmark detail:** the *i*-dot is the eighth "star", a single round makhana.

- **A:** `A minimalist logo mark: seven small solid seed silhouettes (almond, cardamom pod, melon seed, fox nut, raisin, pistachio, cashew) arranged in the exact pattern of the Big Dipper constellation, no connecting lines, all seeds of equal visual weight, kajal brown-black #1B1511 on warm cream #FBF3E4, generous negative space`
- **B:** `App icon, rounded square, deep amla green #2F5D46 background, the seven-seed constellation in warm cream #FBF3E4 with the brightest seed in haldi gold #E3A72F, perfectly flat, balanced in the square`
- **C:** `A thick cream cotton-paper greeting card with the seven-seed constellation letterpress-printed in sindoor red, deep impression visible, lying on aged teak, raking side light showing the emboss, editorial stationery photography`

---

### ④ Nadi: "The vaidya's three fingers"

**Idea:** In Ayurveda, the vaidya reads health through the **pulse (nadi)** at three points with three fingertips. It's the purest Indian picture of *knowledge about the body*. Abstracted, it becomes three dots resting on one calm wave. The rhythm reads as a heartbeat, but soft, nothing like a hospital ECG.

**Construction:** one slow, low-amplitude line (one and a half gentle waves, no spikes) with **three graduated dots** above it like fingertips. The dots sit closest where the wave rises. Use round caps throughout.

**Wordmark detail:** the wave underlines "wize" only, as a quiet emphasis on knowing.

- **A:** `A minimalist logo mark: one slow gentle wave line with rounded ends, low amplitude, no sharp peaks, three small solid dots of slightly different sizes resting just above the wave like fingertips feeling a pulse, sindoor red #8A1C2B on warm cream #FBF3E4, calm, balanced, centred`
- **B:** `App icon, rounded square, warm cream #FBF3E4 background, the three-dot-and-wave mark in sindoor red #8A1C2B centred, perfectly flat`
- **C:** `A subscription welcome card and a small jar sticker on a linen surface, both printed with a three-dot-over-a-soft-wave symbol in sindoor red, warm cream paper, soft daylight, minimal flat-lay editorial photography`

---

### ⑤ Haldi Knot: "Strength that's tied, not built"

**Idea:** Turmeric root grows as a knotted rhizome, and haldi is the most universal Indian remedy-food. Drawn as **one continuous line that loops back into itself**, the root becomes a knot: connection, resilience, body and mind tied together. The single unbroken line also means "nothing added, nothing lost".

**Construction:** a single monoline path forming a compact, slightly asymmetric knot with three lobes, like a rhizome drawn in one breath. Use uniform stroke and round caps. **The start and end overlap** so the line has no visible ends.

**Wordmark detail:** the *z* is drawn with the same monoline stroke and turn radius.

- **A:** `A minimalist logo mark: a single continuous monoline that loops into a compact three-lobed knot shaped like a turmeric root, slightly asymmetric and organic, uniform stroke weight, rounded line caps, no visible line ends, haldi gold #E3A72F outline on deep amla green #2F5D46, centred`
- **B:** `App icon, rounded square, haldi gold #E3A72F background, the single-line knot mark in kajal brown-black #1B1511 centred at 60% width, perfectly flat`
- **C:** `A stack of three amber glass jars with kraft labels, each label printed with a single-line knotted turmeric symbol in dark ink, fresh turmeric roots beside them on grey stone, soft morning light, editorial food packaging photography`

---

### ⑥ Twin Arches: "Shelter and the open door"

**Idea:** It's built on the site's arch motif. One arch is **shelter** (a roof, protection, immunity). A second, inner arch is the **doorway of learning**, like the arched entrance of an old pathshala. Nested, the two arches also quietly form the **w** of *wize*. It's the most system-friendly concept: it becomes frames, windows and image masks across web, app and packaging.

**Construction:** two nested rounded-top arches, the outer thicker and the inner thinner, with the inner one offset slightly upward. A small solid dot sits at the inner arch's base, a person in the doorway or a seed in the shelter. Bases are flat and the arches open at the bottom.

**Wordmark detail:** the *w* is drawn as two joined small arches, matching the mark.

- **A:** `A minimalist logo mark: two nested rounded-top arches like an Indian doorway, the outer arch a thick stroke, the inner arch thinner and offset slightly upward, open at the bottom with flat bases, one small solid dot centred at the base of the inner arch, sindoor red #8A1C2B on warm cream #FBF3E4, architectural, calm, centred`
- **B:** `App icon, rounded square, sindoor red #8A1C2B background, the nested double-arch mark in warm cream #FBF3E4 with the dot in haldi gold #E3A72F, perfectly flat`
- **C:** `A minimal mobile app splash screen and a matching kraft shipping box, both featuring a nested double-arch symbol in sindoor red on cream, photographed together on a teak desk, soft daylight, clean product mockup photography, screen shows no readable text`

---

### ⑦ Shirorekha: "The line that holds every letter"

**Idea:** In Devanagari, the **shirorekha** is the headline stroke that every letter hangs from. It's what holds a word together. Here the logo is wordmark-led: "immunitywize" sits under **one confident hand-pulled bar**, so English is held together by an Indian stroke. Body (immunity) and wisdom (wize) are joined by one line. It's the most premium, most typographic and least "logo-ish" option, the one fashion and luxury food brands would choose.

**Construction:** the wordmark set in a humanist serif, with a reed-pen bar running from the first *i* to the final *e*. The bar is slightly thicker at the start and lifts off at the end. **The bar replaces both i-dots.** The monogram for small sizes is the letter **i** with the bar above: ा-like, elegant and ownable.

**Prompt note:** image models garble words, so **generate only the bar plus monogram**, then set the real wordmark under it in Fraunces or Tiro.

- **A:** `A minimalist monogram: a single lowercase serif letter i whose dot is replaced by a short horizontal reed-pen brush bar above it, the bar thicker on the left and tapering with a lift on the right, like the headline stroke of Devanagari script, kajal brown-black #1B1511 on warm cream #FBF3E4, elegant, calligraphic, lots of negative space`
- **B:** `App icon, rounded square, khadi cream #FBF3E4 background, a sindoor red #8A1C2B serif letter i with a calligraphic horizontal brush bar in place of its dot, centred, perfectly flat`
- **C:** `A premium festive gift box in deep amla green with a single horizontal brush-stroke line and small serif monogram foil-stamped in gold on the lid, a cream ribbon, a sprig of dried marigold, soft studio light, luxury packaging photography, no readable text`

---

### ⑧ Inner Ring: "Strength that grows in layers"

**Idea:** It's a cross-section of a seed or grain: a soft outer shape with an **inner ring** around a protected core. It works like tree rings, where wisdom and strength accumulate slowly, layer by layer, year by year. That's exactly how traditional food works: daily, slowly, over seasons. It's the most abstract and modern of the eight, so it fits best if the brand wants to scale beyond panjiri into a wider wellness range.

**Construction:** a slightly flattened oval, like a wheat grain or seed in section, with **one** offset inner ring and a solid core. The inner ring thickens on one side, the way real growth rings do. Use three shapes only.

**Wordmark detail:** the *i*-dot is a miniature of the mark.

- **A:** `A minimalist logo mark: the cross-section of a seed, a slightly flattened soft oval outline with one inner ring offset to one side and slightly thicker on that side like a growth ring, a small solid core, three shapes only, amla green #2F5D46 on badam beige #E9D9BF, organic geometry, centred`
- **B:** `App icon, rounded square, amla green #2F5D46 background, the seed cross-section mark in warm cream #FBF3E4 with the solid core in haldi gold #E3A72F, perfectly flat`
- **C:** `A row of small paper sachets and a tall jar in matte cream with the seed cross-section symbol printed small and precise in amla green, studio product shot on cream sweep, soft shadow, modern minimal wellness packaging photography, no readable text`

---

## 5. Universal blocks (append to every prompt)

**Universal style block**
```
flat vector logo design, solid fills only, two colours maximum, crisp clean edges, balanced optical weight, designed to be legible at 16 pixels, professional brand identity work in the style of Pentagram or Landor, timeless, restrained, Indian sensibility without ornament, plain flat background, no mockup unless described
```
For prompt **C** (in use), replace that with:
```
photorealistic editorial product photography, natural window light, real materials, true-to-life colour, shallow depth of field
```

**Universal negative prompt**
```
no gradients, no glow, no drop shadow, no bevel, no 3D, no gloss, no metallic sheen on the mark itself, no text, no letters except where requested, no fake words, no watermark, no leaf, no heart, no shield, no cross, no plus sign, no brain, no lightbulb, no owl, no lotus, no om, no mandala, no DNA, no swoosh, no sparkles, no stars except where requested, no cartoon, no mascot, no clip art, no stock-logo look, no busy detail, no thin hairlines that disappear when small
```

**Tool tips**
- **Midjourney:** add `--style raw --v 7 --ar 1:1 --no gradient, text, shadow`, and use `--sref` with your favourite result to keep a series consistent.
- **Ideogram / Recraft:** choose the *Vector / Icon* style. Recraft can export SVG directly, which makes a useful **draft** for the designer.
- **GPT-Image / Imagen / Flux:** say "flat vector logo on a plain background" first, then the description.

---

## 6. How to choose

| Concept | Immunity | Wisdom | Small-size strength | Packaging | Ownability | Best if the brand is… |
|---|---|---|---|---|---|---|
| ① Badam Eye ★ | ●●●○ | ●●●● | ●●●● | ●●●● | ●●●● | Warm, family, mass-premium |
| ② Amla | ●●●● | ●●○○ | ●●●● | ●●●○ | ●●●○ | Ayurveda-leaning, health-first |
| ③ Saptarishi | ●●○○ | ●●●● | ●●○○ | ●●●● | ●●●● | Story-led, gifting-heavy |
| ④ Nadi | ●●●● | ●●●○ | ●●●○ | ●●●○ | ●●●○ | Subscription and wellness |
| ⑤ Haldi Knot | ●●●● | ●●●○ | ●●●○ | ●●●● | ●●●○ | Bold, modern, shelf-visible |
| ⑥ Twin Arches | ●●●○ | ●●●○ | ●●●● | ●●●● | ●●●○ | System-first (matches the website) |
| ⑦ Shirorekha | ●●○○ | ●●●● | ●●●○ | ●●●● | ●●●● | Luxury, gift-box, premium |
| ⑧ Inner Ring | ●●●● | ●●●○ | ●●●● | ●●●○ | ●●○○ | Scaling into a wider range |

**Recommended shortlist:** ① **Badam Eye** (the strongest meaning-to-simplicity ratio), ⑥ **Twin Arches** (already fits the site) and ⑦ **Shirorekha** (if you want premium gifting). Pairing a mark with the Shirorekha wordmark also works: for example, ① as the icon and ⑦ as the wordmark.

## 7. Next steps

1. Generate 20–40 variations of the shortlist with the A prompts, then pick 3 per concept.
2. Test the best 6 with the **must-pass tests** (§1). Print them at 16 px, 48 px and the jar-lid size, and look at them from across the room.
3. Show the top 3 to 10 real customers without explanation. Ask what each one *feels* like, not which they like.
4. A designer redraws the winner as vector and builds lockups (horizontal, stacked, mark-only), clear-space rules and the Hindi lockup.
5. Swap it into `public/favicon.svg`, the site header and the OG image, then update `globals.css` if Amla `#2F5D46` is adopted as a new token.
