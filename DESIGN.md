---
name: The Blvck Stone
description: One enormous typographic voice over a petrol night; what matters is forward, bright and large, the rest recedes.
colors:
  petrol: "#0e2e30"
  black-base: "#0b0f10"
  ivory: "#f5f8f7"
  ivory-74: "rgb(245 248 247 / 0.74)"
  ivory-50: "rgb(245 248 247 / 0.5)"
  ivory-30: "rgb(245 248 247 / 0.3)"
  amber: "#ffb43d"
  turquoise: "#1bbcb4"
  stone: "#6b7a80"
  coral: "#ff6a4b"
typography:
  display:
    fontFamily: "Unbounded, Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "2.5rem to 6rem by breakpoint, shrunk only so the longest word fits whole"
    fontWeight: 900
    lineHeight: 1
    letterSpacing: "-0.03em"
  title:
    fontFamily: "Unbounded, Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "1.5rem to 3rem"
    fontWeight: 800
    lineHeight: 1.05
    letterSpacing: "-0.02em"
  numeral:
    fontFamily: "Unbounded, Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "3.5rem to 7.5rem"
    fontWeight: 900
    lineHeight: 0.95
    letterSpacing: "-0.04em"
    fontFeature: "tnum"
  body:
    fontFamily: "Archivo, Helvetica Neue, Helvetica, Arial, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.55
  lead:
    fontFamily: "Archivo, Helvetica Neue, Helvetica, Arial, sans-serif"
    fontSize: "1.25rem to 1.5rem"
    fontWeight: 400
    lineHeight: 1.375
rounded:
  none: "0px"
spacing:
  gutter-mobile: "20px"
  gutter: "32px"
  section-mobile: "96px"
  section: "128px"
  close: "176px"
  after-section-title: "56px to 64px"
components:
  button-signal:
    backgroundColor: "{colors.amber}"
    textColor: "{colors.petrol}"
    typography: "{typography.body}"
    rounded: "{rounded.none}"
    padding: "20px 32px"
  button-signal-compact:
    backgroundColor: "{colors.amber}"
    textColor: "{colors.petrol}"
    rounded: "{rounded.none}"
    padding: "14px 24px"
  link-signal:
    textColor: "{colors.amber}"
    typography: "{typography.body}"
  field:
    backgroundColor: "transparent"
    textColor: "{colors.ivory}"
    rounded: "{rounded.none}"
    padding: "12px 0"
  nav-link:
    textColor: "{colors.ivory-74}"
    typography: "{typography.body}"
  nav-link-active:
    textColor: "{colors.ivory}"
---

# Design System: The Blvck Stone

## Overview

**Creative North Star: "Patio de noche"**

A title screen over a night courtyard. The whole site is one petrol ground (deepening to black at the edges) with a single ivory voice set enormous on it. Hierarchy is depth, not decoration: what the visitor must read first sits at the front, full ivory and large; everything else steps back in brightness and in size. Photographs are not pictures on the page but planes behind it, washed in the brand's own petrol and dimmed by how far back they sit. Nothing is enclosed. There are no cards, borders, radii, shadows, kickers or labels; the only drawn shape is one amber button.

The audience is a plant or energy director who arrives referred and wants to confirm technical seriousness before taking a visit. The design answers with scale and restraint: numbers from real models at poster size, commitments as plain baselines, five lines of business as five giant words that come forward when pointed at. The tone is an engineer speaking loudly and briefly.

Confirmed rejections: the "catálogo de nave" version (small cells, 11px condensed small caps) for being small and cramped; a particle dust field over the ground; a hero with a photo beside the text; three equal cards in a row; a stats strip of tiles; tiny uppercase labels; gradient text; glass; shadows; colored borders.

**Key Characteristics:**
- One ground (petrol), one ink (ivory) at four brightness steps, one signal (amber)
- Display type up to 6rem, never smaller than fits its longest word whole
- Depth declared per element (`data-depth="0..3"`) and mapped by one stylesheet
- Photos as full-bleed rear planes, desaturated and washed in petrol
- Nothing enclosed: no borders, radii, shadows or dividers
- One authored motion: a word in the queue comes forward and its photo rises

## Colors

The brand palette of eleven colors is locked; the site spends only five of them and keeps the rest for the logo and errors.

### Primary
- **Petrol** (`{colors.petrol}`): the ground of every page. `body` carries a radial vignette to Black base at the edges (`radial-gradient(120% 90% at 50% 30%, transparent 45%, rgb(11 15 16 / 0.7) 100%)`, fixed). Also the ink on the amber button and the wash over every photograph.
- **Ivory** (`{colors.ivory}`): the one ink. Full strength only at depth 0 (headlines, numerals, button labels, active nav).

### Secondary
- **Amber** (`{colors.amber}`): the signal. The primary action button, the "Ver la línea" link, text selection, the caret, the focus ring and the focused field underline. Nothing else is amber.

### Tertiary
- **Turquoise** (`{colors.turquoise}`) and **Stone** (`{colors.stone}`): the two triangles of the mark only.
- **Coral** (`{colors.coral}`): form error messages only.

### Neutral
- **Ivory 74%** (`{colors.ivory-74}`): depth 1. Paragraphs, inactive nav, footer links, section titles.
- **Ivory 50%** (`{colors.ivory-50}`): depth 2. Metadata, process numerals, calculation bases, field labels' quieter sibling.
- **Ivory 30%** (`{colors.ivory-30}`): depth 3. Only on large type (4.7:1 on petrol); the resting field underline; the scrollbar thumb.
- **Black base** (`{colors.black-base}`): only inside the body vignette.

### Named Rules
**The One Signal Rule.** Amber appears on one action per view and on the browser surfaces that confirm interaction (selection, caret, focus). It is never a heading color, a divider or an icon tint.

**The Four Steps Rule.** Every text color is ivory at 100 / 74 / 50 / 30%. No grays, no teal or mint text, no new tints. Depth 3 is reserved for display sizes.

**The Petrol Wash Rule.** Every photograph is desaturated to 35% and covered with petrol in `mix-blend-mode: color` (85% as a rear plane, 60% as an in-page entry photo). No photo ships in its own colors.

## Typography

**Display Font:** Unbounded (with Archivo, Helvetica Neue, Arial)
**Body Font:** Archivo (with Helvetica Neue, Helvetica, Arial); stand-in for licensed Helvetica Now Display

**Character:** Unbounded Black is wide, heavy and slightly rounded; set at poster size over the dark ground it reads as lettering rather than text. Archivo is a plain grotesk that stays out of its way at 18px.

### Hierarchy
- **Display** (900, 2.5rem → 3.75 → 4.5 → 6rem at 390 / 640 / 768 / 1024px, line-height 1.0, tracking -0.03em): page hooks, the close, commitment lines, the queue words (uppercase, line-height 1.04, up to 7.5rem). Capped at 6rem whenever the line carries accents; 7.5rem only for numerals and single uppercase words.
- **Numeral** (900, 3.5rem → 7.5rem, line-height 0.95, tracking -0.04em, tabular figures): giant figures only; digits carry no accents so they may sit tighter.
- **Title** (800, 1.5rem → 3rem, line-height 1.05, tracking -0.02em): service entries, process steps, team names, blog titles, the wordmark at 1rem.
- **Lead** (400, 1.25rem → 1.5rem, line-height 1.375, ivory 74%): the paragraph under a hook; 42 to 46ch.
- **Body** (400, 1.125rem, line-height 1.55): paragraphs, nav, form, footer; 44 to 56ch, never past 64ch.

### Named Rules
**The Whole Word Rule.** A display line is as large as its breakpoint allows and no larger than lets its longest word sit whole inside the content column (`.fit`: `min(--cap, (container - gutter) / (letters × 0.78em))`). Words never hyphenate and never bleed past the edge; a line wraps instead.

**The Loose Leading Rule.** Display leading is never below 1.0. Spanish accents on ENERGÍA and CONSTRUCCIÓN collided at 0.92; numerals alone may go to 0.95.

**The Own Row Rule.** A giant numeral never shares a row with text. The figure stands alone; its sentence (30ch) and its basis (56ch) sit beneath it.

**The No Label Rule.** No kicker, eyebrow or small-caps label above a heading. The heading carries its own weight; numbering appears only where the sequence is information (process steps, legal clauses).

## Layout

One content column of 80rem (`max-w-7xl`) with 20px gutters on mobile and 32px from 768px. Sections run 96px tall on mobile and 128px from 768px; the closing section 128 / 176px. Inside a section the title is a depth-1 display line at the `md` size followed by 56 to 64px before content.

Text lives in measures, not columns: hooks 13 to 16ch, lead paragraphs 42 to 46ch, body 44 to 56ch. Two-column grids appear only where two things are read together: service entries (photo 5/12, text 7/12 from 768px), process steps (numeral 1/12, title 5/12, text 6/12), the contact page (form 7/12, contacts 5/12 from 1024px) and legal clauses (numeral, heading 5/12 then 4/12, body). Everything stacks below those widths. The hero paragraph and its button stack until 1024px; the "next line" link and its button stack until 1024px. The main header is 80px, sticky, petrol at 80% with blur; from 1024px it shows the wordmark, three entries, the language switch and the compact signal, with 28px gaps growing to 40px at 1280px.

Breakpoints are Tailwind's: 640, 768, 1024, 1280px. Verified widths: 1440, 1024, 768, 390.

## Elevation & Depth

No shadows anywhere. Depth is brightness and spacing, declared per element as `data-depth="0..3"` and translated by one rule set: 0 is full ivory with normal tracking and never moves while read; 1 is 74% with +0.005em; 2 is 50% with +0.015em; 3 is 30% with +0.03em. Changing depth transitions color and letter-spacing over 500ms on `cubic-bezier(0.16, 1, 0.3, 1)`.

Photographs take depth as opacity: 70 / 50 / 35% for depths 1 / 2 / 3, under the petrol wash and a vertical fade to the ground. Rear planes may ride a scroll parallax (`.plane-1/2/3` at 6 / 12 / 20% of scroll, published by `ScrollClock` as `--sy`); only the hero and the close use it. Under `prefers-reduced-motion` there is no parallax and no transition.

### Named Rules
**The Front Plane Rule.** Whatever is being read sits at depth 0 and holds still. Only what is behind it dims, spreads or drifts.

**The Flat Ground Rule.** No shadow, glow or halo on any element except the mark, which carries a soft ivory and turquoise drop-shadow (`.glow`) because it is drawn as a lit outline.

## Shapes

Square everything. No border-radius on any element. No borders except the single 1px bottom line under a form field (ivory 30%, amber on focus). No dividers between sections or list items; separation is space. Photographs are rectangles bleeding to the section edges (rear planes) or sitting flush in their grid cell (entries) with no frame. The mark is two outlined triangles with rounded joins, the one place a curve appears.

## Components

### Buttons
- **Shape:** square corners (0px)
- **Signal:** amber ground, petrol text, Archivo 700 at 1.125rem (1.25rem from 768px), 20px × 32px padding, arrow icon at 24px, `white-space: nowrap` so it never breaks. Compact variant: 14px × 24px, 1rem text, 18px arrow (header, line pages).
- **Hover / Focus:** lifts 2px (`translateY(-2px)`); focus ring 2px amber with 4px offset; disabled at 60% opacity while sending.
- **Text link in amber:** Archivo 700, arrow icon, used once per view for a secondary path ("Ver la línea", "Volver al inicio").

### Inputs / Fields
- **Style:** label above in body size at ivory 74%; value at 1.25rem ivory on a transparent ground with only a 1px bottom line in ivory 30%; no radius, no side or top strokes, no background.
- **Focus:** the bottom line turns amber; caret amber.
- **Error:** message in coral beside the submit button. Consent checkbox uses `accent-color` amber.

### Navigation
- **Header:** 80px, sticky, `petrol/80` with `backdrop-blur-md`; wordmark in the title voice at 1rem beside the mark; entries in Archivo 700 at depth 1, the current one at depth 0; language switch "ES / EN" with the inactive one at depth 2; compact signal button.
- **Mobile:** a list icon toggles a petrol panel with entries in the title voice at 1.875rem, "Contacto" in amber, then the language switch.
- **Footer:** mark and wordmark, tagline, offices, address, then three plain link columns (Empresa, Servicios, Legal) at depth 1. No rules, no boxes.

### Photo planes
`PhotoPlane`: absolute full-bleed `next/image` behind a section (`isolate`), desaturated, petrol-washed, faded to the ground at the bottom, opacity by depth. `.photo-wash` is the in-page variant for service entries at 4:3.

### Depth queue (signature)
`DepthQueue`: the lines of business as a stack of uppercase display words, each at the depth of its distance from the front one. Pointing, focusing or tapping a word brings it to depth 0 and fades its photo in behind the stack over 700ms. Below the stack: the front line's title and sentence (44ch) and the amber link. The word size is computed from the longest word so every word fits whole at every width, capped at 7.5rem.

### Line and Process
`Line`: a display line at a declared depth and size (`xl` / `lg` / `md`), sized by the Whole Word Rule. `Process`: four numbered steps (numeral at depth 2, title in the title voice, text at 44ch) shared by the home page and Nosotros so the promise reads identically.

## Do's and Don'ts

### Do:
- **Do** set every leading line in Unbounded 900 and let it be as large as the breakpoint allows (6rem cap at 1024px and above).
- **Do** declare depth on anything that matters and let the stylesheet dim it; never pick an ad hoc opacity.
- **Do** keep every photo behind or beside text desaturated and petrol-washed; dim it further the further back it sits.
- **Do** keep one amber action per view, square, nowrap, with the arrow.
- **Do** give a giant numeral its own row and put the sentence and basis beneath it.
- **Do** verify at 1440, 1024, 768 and 390 with the overflow and overlap scan before shipping.

### Don't:
- **Don't** draw cards, borders, radii, shadows, dividers or glass.
- **Don't** put a kicker, eyebrow or small-caps label above a heading.
- **Don't** use any text color other than ivory at 100 / 74 / 50 / 30%; never gray, teal or mint text.
- **Don't** set display leading below 1.0 on anything that carries accents.
- **Don't** let a display word hyphenate or run past the container; shrink the line or wrap it.
- **Don't** add scroll-reveal, staggered entrances, particles or textures; the queue is the one animation.
- **Don't** show a photo in its own colors or inside a frame.
