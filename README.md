# Omnic.AI — a design exploration

An unsolicited, working prototype built while looking at Omnic.AI's UI/UX
Designer opening — not a portfolio redesign exercise, and not a claim that
Omnic's product or business has a problem. It's one observation about the
public-facing homepage, a hypothesis about what might address it, and a
functioning prototype built to test that hypothesis visually.

> Speculative concept by an independent designer. Not affiliated with,
> commissioned by, or endorsed by Omnic.AI. Brand assets remain the property
> of Omnic.AI and the respective game publishers.

---

## Run it

```bash
python3 -m http.server 4321
```

Open <http://localhost:4321>. No build step. Bootstrap 5.3 loads from a CDN
with SRI hashes; everything else is in this repo. It also opens directly from
the filesystem (`open index.html`) — the JS is classic scripts, not ES
modules, so `file://` works.

---

## Context

Omnic.AI's listing asks for someone who can turn requirements into wireframes
and prototypes, build responsive interfaces in Bootstrap, and stay attentive
to detail. Rather than write a cover letter describing those skills, I looked
at the one artifact that already demonstrates them best — the live homepage —
to see if there was a concrete opportunity to show the work instead of
describing it.

## Observation

From the public-facing homepage (not from any internal knowledge of the
business), I noticed that the seven demonstrations of what the Forge actually
does — AI Coaching Insights, Advanced Analytics, Highlight Creation, AI Chat,
Player Cards, Plays Like, Compare — sit inside a "Learn More" accordion that
renders **collapsed on load** (`aria-expanded="false"` in the DOM). Scrolling
past the hero, a first-time visitor reaches three FAQ questions — the first
one literally titled *"What is the Omnic Forge?"* — before reaching anything
that shows what the Forge produces. The visual proof exists on the page; it's
simply not visible without an extra click that nothing prompts you to make.

Two smaller observations sit alongside it: the three headline value claims
("Let AI Analyze Your Gameplay," etc.) render as `<h2>`s inside a 54px icon
row layered over a playing video, and the seven feature screenshots — once
opened — are compressed into a shared `col-xxl-2` grid, so `ask_forge.webp`
(1370×900 of an actual AI chat exchange) renders at roughly 100px wide.
Full detail, with measurements: [`docs/audit.md`](docs/audit.md).

## Opportunity

The most concrete evidence of what Omnic's technology does — real product
output, not marketing claims — is present on the page but structurally hidden
from a first-time visitor and, once found, too small to read. That felt like
a narrower, more specific opportunity than "the site could look more modern":
**the proof is there; it isn't being shown.**

## Hypothesis

If the seven capabilities were visible by default, each sized to its own
screenshot instead of a shared thumbnail, and sequenced right after the value
promise instead of behind an FAQ, a first-time visitor might form a clearer
picture of what the Forge actually does, faster.

I want to be precise about what this is: a design hypothesis, not a finding.
I don't have access to Omnic's analytics, session recordings, or user
research, so I can't say this would change sign-ups, reduce bounce, or
resolve confusion — I have no evidence for any of that. It's the assumption
the prototype below was built to make visible and testable, not a conclusion.

## Exploration

Two research passes informed the prototype before I touched layout:

- **A DOM-level audit of the live site** — confirmed the accordion's collapsed
  state, measured actual contrast ratios and type sizes, and extracted the
  real brand tokens (colour, gradients, typeface, every asset) so the
  prototype would start from what Omnic already ships rather than a
  reinterpretation of it. [`docs/audit.md`](docs/audit.md)
- **A competitive pass across five comparable products** (Leetify, Scope.gg,
  GGPredict, Blitz, plus one agency reference for editorial composition) —
  run to extract *principles*, not layouts, and to have a documented reason
  to reject anything that would have read as a copy.
  [`docs/competitive-design-intelligence.md`](docs/competitive-design-intelligence.md)

The fix the hypothesis called for was structural, not decorative: stop
compressing seven different screenshots into one shared card size, and stop
gating the product's proof behind a click nobody is prompted to make.

## Prototype

`index.html` + `assets/` is a complete, running implementation of that idea —
not a mockup. Every word, image, video, colour and product name is Omnic's;
nothing was rewritten or replaced with stock content.

```
Arrival        Hero — "Game Smarter with AI" over the Story of the Forge loop
Titles         The five supported games, with the affiliation notice beside
               them where it's actually relevant
Promise        The three existing value claims, given the scale they were
               written for
Understanding  "What is the Omnic Forge?" — the FAQ's own explanation, moved
               ahead of the proof instead of gating it
Proof          All seven capabilities, always visible, each composed around
               its own screenshot's real dimensions — this is the section the
               hypothesis is actually about
Confidence     "How easy is it to use the Omnic Forge?" — the remaining FAQ
               answer, placed as the last question before the ask
Action         Sign Up Now / Pricing / It's Free
```

No FAQ copy was cut — the "More FAQs…" link to Omnic's full FAQ page is
preserved; two of its three answers were relocated into the sections they
actually answer.

## Design decisions

Each of these serves the central opportunity above; none is an independent
"this looked nicer" choice.

- **Hierarchy** — one `h1`, one `h2` per section, a real type scale in place of
  the flat 48px/36px the live page uses, so the FAQ toggle no longer outsizes
  the product story.
- **Composition** — no shared card size for the seven screenshots. Each is
  capped at its own native width and composed against the others: the widest
  capture (`aim_chart.webp`, 1144px) gets the widest column; the 1488×256
  banner (`plays_like.webp`) gets a full-bleed band instead of being squeezed
  into a square.
- **Navigation** — same five items, same destinations. Restyled, not
  restructured: nothing was added, nothing removed.
- **Imagery** — the hero's video loop is treated as environment (zoomed and
  biased so its own title card sits clear of the display type) rather than a
  flat rectangle; a cropped capture fades at its cut line instead of stopping
  on a hard edge.
- **Motion** — five behaviours, not thirty, each declared in one file so the
  whole system can be audited or disabled in one place: load choreography, one
  shared scroll-reveal observer, a word-by-word reveal on the Forge
  explanation, a sticky index across the seven capabilities, and restrained
  hover feedback. All cancel under `prefers-reduced-motion`.
- **Responsive** — verified at 320/390/834/1440/1728px; content reorders
  rather than just shrinking, and the mobile drawer uses Bootstrap's own
  `collapse` for its ARIA wiring.

## Engineering

```
index.html                  Semantic markup + an inline SVG sprite
assets/css/tokens.css       Design tokens — colour, type scale, 8px space
assets/css/base.css         Element defaults, typography roles, layout, a11y
assets/css/components.css   Buttons, masthead, marquee, media frames
assets/css/sections.css     Per-section composition
assets/css/motion.css       Every animated property on the page, in one place
assets/js/core.js           Module registry + one shared scroll/rAF loop
assets/js/{nav,reveal,hero,forge,caps,marquee,parallax}.js
assets/js/main.js           Boots each module inside a try/catch
```

- **Bootstrap is the implementation layer, not the design system** — grid,
  breakpoints, flex/spacing utilities, and `collapse` (for its ARIA wiring) in
  the mobile drawer. Its visual defaults (card shadows, `.btn` styling, navbar
  chrome) are fully replaced by the CSS above.
- **One scroll listener.** Every motion behaviour subscribes to a single
  `requestAnimationFrame`-throttled loop; no module attaches its own.
- **Degrades to plain HTML.** Each module boots inside a `try/catch`, so one
  failure never blanks the page. With JS off: poster frame, all seven
  capabilities, all copy, working nav.
- **Performance.** The hero ships a poster image and injects the YouTube
  player during idle time after `load` — first paint costs one image, not a
  player bundle. The embed is skipped entirely under `prefers-reduced-motion`
  or Save-Data. Every image carries intrinsic dimensions; eight social icons
  are one inline SVG sprite instead of a Font Awesome request.
- **Accessibility.** Skip link, coherent heading order, a real focus ring on
  every interactive element, dropdowns that open on focus and close on
  `Escape`, 44×44px minimum targets, body copy at 8.4:1 contrast (the live
  page measures ≈2.9:1), full `prefers-reduced-motion` support.
- **Two bugs worth naming**, found building this: a `clip-path` on an element
  under `IntersectionObserver` reports `intersectionRatio: 0` in Blink, so the
  observer never fires — the mask reveal animates `mask-position` instead. A
  percentage `max-height` on a centred grid child doesn't resolve — the
  marquee logos needed absolute positioning inside a definitely-sized box.

Verified in Chrome at six widths: no horizontal overflow, no console errors,
no failed requests, ~590KB on first load (most of it Omnic's own key art).

## Reflection

What I'd want to validate before treating any of this as more than a design
hypothesis, if I had access to Omnic's team and data:

- **Does the collapsed accordion actually suppress engagement?** I'd want to
  see the current open-rate on "Learn More" and scroll depth past the FAQ on
  the live page before assuming visitors are missing the capabilities —
  they might already be scrolling past the FAQ and opening it at a healthy
  rate, in which case this entire hypothesis would need to be rethought.
- **Does always-visible proof change comprehension, not just visibility?**
  I'd run a moderated test — "show me what a highlight reel looks like,"
  "how would you compare stats with a friend" — against both versions and
  measure time-to-answer and confidence, not just whether people scrolled
  further.
- **Does the reordered FAQ reduce reliance on "More FAQs…"?** If click-through
  to the full FAQ page drops, that's a signal the relocated answers are
  landing where they're needed; if it doesn't change, the reorder may not be
  the lever I think it is.
- **Whether the sticky capability index helps or distracts.** It's the one
  piece of UI in the prototype invented rather than pulled from the live
  site's own content — the thing I'd want the earliest real feedback on.

## A second area, beside the homepage

The brief above is the primary thesis and the primary artifact. Alongside it
I looked at one more thing, because a design engineer's job isn't only the
page in front of them — it's whether what gets built holds together as the
site grows past one page.

**Observation.** Every "Sign Up Now" and "Pricing" link on omnic.ai sends a
visitor to `forge.omnic.ai` — a separate property. Looking at both, plus
Omnic's other public pages (About, Careers, Community, Partnerships), I
noticed the same building blocks get re-implemented slightly differently each
time: the page-header band that opens four different pages carries four
different hand-set heights, and the "primary action" button renders four
different ways — filled/uppercase on the marketing site, filled/sentence-case
on a cookie banner, a 9999px pill on the pricing toggle, and a bordered
outline on the sign-up screen — inside a single flow. What *does* stay
consistent is the colour: the same cyan and near-black show up on both
properties. The palette travels; the components built on it don't yet.

**Opportunity.** The ingredients for consistency already exist. There's no
shared, documented layer translating them into repeatable components, which
is exactly the condition under which things drift a little further apart
every time a page gets added.

**Hypothesis.** A small, named set of tokens and the handful of controls that
actually repeat could let new pages and screens draw from one source instead
of each hand-tuning its own. Whether that would measurably reduce drift or
speed up how pages ship is something I'd want to confirm by watching how a
page actually gets built today — not something I can claim from outside.

**Artifact.** [`design-system.html`](design-system.html) — the token system
and components from the homepage prototype, extracted into a standalone,
labelled reference, with the measurements above shown alongside the
components they argue for. I did not rebuild About, Careers, Community,
Partnerships, or anything on `forge.omnic.ai`: I don't have access to the
Forge codebase, and redesigning a live signed-in product was outside what
either exploration set out to do.

## Scope

Two small, focused artifacts — a homepage prototype and a design-system
reference built from the same tokens — not a full site redesign. I didn't
modify Omnic's other pages or the Forge app; I looked at them to gather
evidence, and stopped there. Nothing here invents functionality: no
dashboards, no accounts, no fake analytics, no fabricated testimonials or
customers.
