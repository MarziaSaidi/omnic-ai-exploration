# Omnic.AI — Homepage Redesign Prototype

An unsolicited redesign of [omnic.ai](https://www.omnic.ai/), built as a working
front-end prototype rather than a set of mockups.

**Same brand. Same words. Same assets. A different experience.**

Every colour, image, video, product name and sentence on this page comes from
the live Omnic.AI site. Nothing was rewritten, invented, or replaced with stock.
What changed is layout, hierarchy, rhythm, motion and code.

> This is a speculative concept by an independent designer. It is not affiliated
> with, commissioned by, or endorsed by Omnic.AI. Brand assets remain the
> property of Omnic.AI and the respective game publishers.

---

## Run it

```bash
python3 -m http.server 4321
```

Then open <http://localhost:4321>. No build step, no dependencies to install.
Bootstrap 5.3 loads from a CDN with SRI hashes; everything else is in this repo.

It also opens fine straight from the filesystem (`open index.html`) — the
JavaScript is deliberately written as classic scripts rather than ES modules so
that `file://` works.

---

## What the audit found

I went through the live homepage before touching anything. The content is good.
The presentation is fighting it.

| # | Observation | What it costs |
|---|---|---|
| 1 | All seven product features sit inside a **collapsed "Learn More" accordion** | The strongest proof on the site is invisible by default |
| 2 | The FAQ appears **before** any explanation of the product | Answers arrive before the visitor knows the question |
| 3 | The three value claims are `<h2>`s crammed into a 54px icon list over the hero | The most important message is the smallest element on the page |
| 4 | Everything below the hero lives inside **one `.card.card-body.blur`** | No section rhythm; the page reads as a single grey slab |
| 5 | Feature screenshots render inside `col-xxl-2` with `p-5` padding | ~100px thumbnails of UI that needs to be read |
| 6 | Body copy is `#7B809A` on `#DEE2E6` | ≈2.9:1 — fails WCAG AA |
| 7 | Montserrat loads at **weight 500 only**, but 600/700 are used | Faux-bold rendering throughout |
| 8 | `h1` is a fixed `48px`; `.accordion-button` renders at `36px` | Flat hierarchy — the FAQ toggle outweighs the product story |
| 9 | The five game titles render at 1/12th of the grid, below the CTA | Omnic's clearest "is my game supported?" signal is a row of specks |
| 10 | Hero `<h1>` carries `text-nowrap` | Overflow risk on small screens |
| 11 | Duplicate `href` attributes and stray `</i>` tags in the navbar | Invalid markup |
| 12 | No motion beyond an 8-second muted YouTube loop | Nothing guides attention |

Detail and the full brand extraction: [`docs/audit.md`](docs/audit.md).
Competitive research and the principles taken from it:
[`docs/competitive-design-intelligence.md`](docs/competitive-design-intelligence.md).

---

## What I changed

### Information architecture

The live page orders itself: hero → FAQ → hidden features → footer.
This one follows the decision a visitor actually makes.

```
Arrival        Hero — "Game Smarter with AI" over the Story of the Forge loop
               Titles — the five supported games, with the affiliation notice
                        moved up beside them where it is relevant
Promise        The three claims Omnic already makes, at display scale
Understanding  "What is the Omnic Forge?" — lifted out of the accordion onto a
               full-bleed plate. The answer lights word by word as it is read.
Proof          Seven capabilities, uncollapsed, each composed around its own
               screenshot's real aspect ratio
Confidence     "How easy is it to use the Omnic Forge?" — the last objection,
               placed immediately before the ask
Action         Sign Up Now / Pricing / It's Free
```

Three FAQ answers were promoted out of the accordion into narrative positions.
No copy was cut: the "More FAQs..." link to Omnic's full FAQ is preserved.

### Art direction

Screenshots are never enlarged past their native pixel width — `insights3.webp`
is 553px wide, so its column is sized to 553px instead of stretching it to 890px.
`plays_like.webp` is 1488×256, so it gets a full-bleed band. `ask_forge.webp` is
1370×900 with a lot of empty canvas below the content, so it is cropped to the
region that carries information. The composition follows the assets rather than
forcing seven identical cards.

### Motion

Five behaviours, not thirty. All of them declared in one file
(`assets/css/motion.css`) so the whole system can be audited — and disabled — in
one place.

1. **Load choreography** — headline lines wipe up from a mask, the video plate
   opens, nav and supporting copy fade in on a stagger.
2. **Scroll reveal** — one `IntersectionObserver` drives every entrance. Reveals
   play once, never on reverse scroll.
3. **Word reveal** — the Forge explanation lights word by word as it crosses the
   viewport. The one place motion carries meaning instead of polish.
4. **Capability index** — a sticky bar names the capability in view, counts
   position (`03 / 07`) and fills a hairline progress rule.
5. **Hover** — button fill wipes from the baseline, arrow displaces, links
   under-wipe, screenshots scale inside their mask.

Plus one low-amplitude parallax on the Forge backdrop. Everything is cancelled
under `prefers-reduced-motion`, including the YouTube embed, which is never
requested at all in that mode.

---

## Engineering

```
index.html                  Semantic markup + an inline SVG sprite
assets/css/tokens.css       Design tokens — colour, type scale, 8px space, motion
assets/css/base.css         Element defaults, typography roles, layout, a11y
assets/css/components.css   Buttons, masthead, marquee, media frames, cues
assets/css/sections.css     Per-section composition
assets/css/motion.css       Every animated property on the page
assets/js/core.js           Module registry + one shared scroll/rAF loop
assets/js/{nav,reveal,hero,forge,caps,marquee,parallax}.js
assets/js/main.js           Boots each module inside a try/catch
docs/audit.md               Full audit and brand extraction
docs/competitive-design-intelligence.md   Competitor research → principles
```

**One scroll listener.** Every behaviour subscribes to `Omnic.onScroll()`, which
is throttled by a single `requestAnimationFrame`. No module attaches its own.

**Degrades to HTML.** `main.js` wraps each module so one failure never blanks the
page. With JavaScript off you get the poster frame, all seven capabilities, all
copy, and a working nav.

**Bootstrap is the implementation layer, not the design system.** Used for the
grid, breakpoints, spacing and flex utilities, `collapse` (with its ARIA wiring)
in the mobile drawer, and `visually-hidden`. Its visual language — card shadows,
`.btn` styling, navbar chrome — is fully replaced.

**Performance.** The hero ships a poster frame and injects the YouTube player
during idle time after `load`, so first paint costs one image instead of the
player bundle; the embed is skipped entirely under `prefers-reduced-motion` or
Save-Data. Every image carries intrinsic dimensions (no layout shift) and lazy
loads below the fold. Eight brand icons are an inline SVG sprite instead of a
Font Awesome request. Omnic's two logo SVGs are inlined as symbols whose dark
shell inherits `currentColor`, which is what lets the mark sit on Omnic's own
dark surfaces without disappearing.

### Two bugs worth naming

- **`clip-path` breaks `IntersectionObserver`.** A `clip-path` on an observed
  element reports `intersectionRatio: 0` in Blink, so the observer never fires
  and the element stays hidden forever. The mask reveal animates `mask-position`
  instead — same wipe, ignored by the observer's geometry, still on the
  compositor.
- **A percentage `max-height` on a centred grid child does not resolve.** The
  marquee logos overflowed their band until the images were positioned
  absolutely inside a definitely-sized box and left to `object-fit: contain`.

---

## Accessibility

- Skip link, semantic landmarks, one `h1`, coherent heading order
- Focus ring in Omnic cyan on every interactive element; dropdowns open on focus
  and close on `Escape`
- Body copy at 8.4:1 on paper, secondary at 4.9:1, white at 7.2:1+ on dark
- Every control is at least 44×44px; the footer's eight social links use a fixed
  4×2 grid on phones rather than wrapping 7 + 1
- `alt` text preserved verbatim from the live site; the marquee's duplicated half
  is `aria-hidden` so the five titles are announced once
- Full `prefers-reduced-motion` support, verified end to end

## Verified

Chrome, at 320 / 360 / 390 / 834 / 1440 / 1728px.
No horizontal overflow at any width. No console errors. No failed requests.
~590KB on first load, most of it Omnic's own game key art.
