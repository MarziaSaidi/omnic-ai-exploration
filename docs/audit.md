# Audit — omnic.ai homepage

Supporting detail for [`../README.md`](../README.md). Captured from the live
site before any design work; everything below is observation about the
public-facing experience, not a claim about Omnic's business.

Findings 1–3 in section 3 are the basis for the project's single thesis: the
seven capabilities are the strongest proof on the page and they render
collapsed by default. Findings 4–15 are secondary — real, but supporting —
and the changes made in response to them serve that same thesis rather than
standing as independent fixes.

---

## 1. Brand extraction

What must survive a redesign, sampled from the running page.

### Colour

| Token | Value | Where it comes from |
|---|---|---|
| Primary cyan | `#3EB4E4` | Logo mark (`.st0`), `.bg-gradient-primary` start |
| Primary deep | `#1D9ED2` | `.bg-gradient-primary` end |
| Dark origin | `#002436` | `.bg-gradient-dark` start |
| Abyss | `#000203` | `.bg-gradient-dark` end, hero `background-color` |
| Ink | `#344767` | Footer headings, `font-weight-bolder` copy |
| Muted | `#7B809A` | `body` colour (Material Dashboard default) |

Gradients as authored: `linear-gradient(195deg, #3EB4E4 0%, #1D9ED2 100%)` and
`linear-gradient(195deg, #002436 0%, #000203 100%)`.

One off-brand colour is in use: the "It's Free" badge renders `rgb(214, 147, 200)`
— a pink from the Material Dashboard palette, sitting directly on top of the cyan
CTA. It is the only pink on the site.

### Type

`Montserrat` from Google Fonts — **weight 500 only**. The page then applies
`font-weight: 600` to the `h1`, `700` to `.btn` and `<strong>`, and `800` via
Bootstrap utilities. Everything above 500 is synthesised by the browser.

Sizes on the live page: `h1` 48px fixed / `-0.8px` tracking; `.accordion-button`
36px; `.btn` 12px uppercase 700. No fluid scale, no `clamp()`.

### Assets (all preserved in the prototype)

- `logos/logo.svg`, `logos/logo_with_bottom_text.svg`
- `story_of_the_forge.webp` — hero poster
- YouTube `wHksSGbuHEs`, looped 0–8s, muted, controls off
- Titles: `overwatch_heroes_text` (451×512), `fortnite_skins_text` (512×512),
  `madden_logo_text` (512×222), `valorant_agents_text` (512×335),
  `rocket_league_logo_text` (512×512)
- Product: `insights3` (553×346), `aim_chart` (1144×636), `highlight` (606×383),
  `ask_forge` (1370×900), `player_card1` (768×768), `plays_like` (1488×256),
  `comparison` (848×1053)

### Terminology

Omnic Forge · Ask Forge · AI Coaching Insights · Advanced Analytics ·
Highlight Creation · AI Chat · Player Cards · Plays Like · Compare

---

## 2. Current information architecture

```
sticky navbar
hero  (16:9 ratio box, YouTube background, 60% dark mask)
      h1 "Game Smarter with AI" + CTA + pink "It's Free" pill
      five game logos at col-xl-1
ONE .card.card-body.blur containing:
      three value claims (h2, inside a 54px icon list)
      FAQ accordion, three questions
      "Learn More" accordion — COLLAPSED — holding all seven features
      affiliation disclaimer, 11px
footer
```

The whole page below the hero is a single card. There is no section rhythm
because there are, structurally, no sections.

---

## 3. Findings

### Structure

1. **The product story is collapsed.** All seven capabilities — the only place
   the site shows what it actually produces — are behind a `Learn More` toggle
   that is closed on load. A visitor who does not click it never sees the
   product.
2. **The FAQ precedes the explanation.** "What is the Omnic Forge?" is answered
   in an accordion that also sits closed, below a set of questions the visitor
   has not yet formed.
3. **One container for everything.** `.card.card-body.blur.shadow-blur` wraps the
   value props, the FAQ and the features, so the page cannot change density,
   surface or scale between ideas.

### Hierarchy

4. **The three claims are the smallest important thing on the page.** "Let AI
   Analyze Your Gameplay" / "Discover Winning Strategies" / "Level Up Your
   Skills" are `<h2>`s inside a 54px icon row on a translucent panel, competing
   with a playing video.
5. **The FAQ toggle is the largest type below the hero** at 36px — larger than
   the lead paragraph, larger than every feature title.
6. **Feature screenshots are unreadable.** `col-6 col-md-4 col-lg-3 col-xxl-2`
   with `p-5` internal padding renders `ask_forge.webp` (1370×900 of chat UI) at
   roughly 100px wide.
7. **The five supported titles are specks.** They sit at `col-xl-1` under the
   CTA — the fastest answer to "does it work with my game?", rendered at the
   smallest scale on the page.

### Accessibility

8. `#7B809A` on `#DEE2E6` ≈ **2.9:1**. Fails WCAG AA for body text.
9. `<h2>` is used both for value claims and for FAQ triggers; heading order does
   not describe the page.
10. Faux-bold everywhere: only Montserrat 500 is loaded.
11. `text-nowrap` on the hero `h1`.

### Markup

12. Duplicate `href` attributes on the About and Community dropdown anchors.
13. Stray `</i>` closing tags inside `.nav-link`s that contain no `<i>`.
14. The full Font Awesome kit is loaded for eight footer social icons.

### Motion

15. There is none, beyond the autoplaying loop. Nothing sequences attention,
    nothing signals that the page continues below the fold.

---

## 4. Decisions taken from this audit

| Finding | Response |
|---|---|
| 1, 3 | Capabilities become the spine of the page, uncollapsed, on their own surface |
| 2 | Three FAQ answers promoted into narrative positions; "More FAQs..." preserved |
| 4 | The three claims become the first paper section, at display scale, numbered |
| 5 | A real type scale: display / h1 / h2 / h3 / lead / body / label |
| 6 | Every figure capped at its asset's native width; layouts follow aspect ratios |
| 7 | The titles get a full band of their own, with the affiliation notice beside them |
| 8 | `#344767` on `#F4F7F9` (8.4:1); secondary `#5A6A80` (4.9:1) |
| 9 | One `h1`, `h2` per section, `h3` per capability |
| 10 | Montserrat 400/500/600/700/800 loaded |
| 11 | Fluid `clamp()` scale; the headline wraps by design at every width |
| 12, 13 | Markup rewritten |
| 14 | Eight icons inlined as an SVG sprite |
| 15 | Five motion behaviours, all reduced-motion aware |

Nothing in the right-hand column changes a word of Omnic's copy.
