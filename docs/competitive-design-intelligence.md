# Competitive design intelligence

Supporting research for [`../README.md`](../README.md) — informs the
*Exploration* and *Design decisions* sections there. This is not a second
thesis: it's the reference-checking that went into deciding how to execute
the one opportunity described in the README, not a reason to redesign
anything beyond it.

Research pass across the esports-analytics space plus one agency reference,
run to answer a single question: **what would make Omnic's page more modern,
tidier, cleaner and more professional — without making it look like anyone
else's site?**

Every recommendation below went through the same filter:

> Reference → Principle → Interpretation → Omnic

Anything that only survived as *Reference → Copy* was rejected, and so was
anything that changed how the page looks without making it better. Both
rejection lists are at the end, because what I chose **not** to take is the
more useful half of this document.

---

## Method and access

Each site was loaded in a real Chromium at 1440×900, screenshotted at three
scroll depths, and probed for computed values — type scale, button metrics,
section padding, border radii, typefaces. Numbers below are measured, not
estimated.

| Site | Status |
|---|---|
| Baunfire | Inspected |
| Leetify | Inspected |
| Scope.gg | Inspected |
| GGPredict | Inspected |
| Blitz | Inspected — resolves to the product app shell, not a marketing page |
| **Mobalytics** | **Not inspected.** Serves a Cloudflare bot-detection interstitial. I did not attempt to work around it, so Mobalytics is deliberately absent from the findings rather than filled in from memory. |
| GOSU.AI | Offline — domain does not resolve |

---

## What the measurements say

| | Baunfire | Leetify | Scope.gg | GGPredict | Blitz |
|---|---|---|---|---|---|
| h1 | 72px / 700 | 64px / 700 | 56px / 500 | 60px / 600 | 36px / 725 |
| h1 leading | 1.25 | 1.20 | **0.955** | 1.20 | 1.20 |
| h1 tracking | −0.01em | 0 | **−0.04em** | −0.016em | 0 |
| Body | **20px / 1.80** | 15.2px / 1.50 | 16px / 1.50 | **12px / 1.50** | 16px / 1.35 |
| Typefaces | Neue Plak + Montserrat | Syne + Poppins | Nekst + Manrope | Bai Jamjuree | Inter |
| Primary CTA height | ~52px | 50px | **60px** | 47px | 36px |
| Button radius | **0** | 3px | 12px | 4px | 8px |
| Radii in use | 0 and 50% only | 2–10px, 32px | 2–24px | 2–6px, 100% | 1–16px, 500px |
| Section padding | **200px** | 96px | 84–140px | — | 16px |

Three things fall straight out of that table.

**Radius is where the agency reference and the product references disagree.**
Baunfire ships zero radius on every rectangle; Leetify 3px. But Baunfire is an
agency portfolio, and its buttons are labels you read, not controls you click.
The product sites round their controls — Blitz 8px, Scope.gg 12px — because a
sign-up button has to look pressable.

I initially took the agency reading and pulled everything to 1/2/4px. On review
that was the wrong call: it made the CTA read as an editorial caption rather
than a control. **The page's editorial character belongs in its typography and
layout; its controls should read as modern product UI.** Final position:
interactive elements at 8px, the surfaces they sit on at 10px, and the same
logic applied to the label — sentence case at 15px/600 rather than uppercase at
13px with 0.1em tracking, which is an agency idiom, not a product one.

**Body copy is where "premium" actually lives.** Baunfire sets body at 20px with
1.8 leading. GGPredict sets it at 12px and reads cheap regardless of how good the
hero is. My build was at 17px / 1.65 — closer to the utility end than the
editorial end I was aiming for.

**Display leading below 1.0 makes a headline read as a shape.** Scope.gg sets
0.955 with −0.04em tracking, and its three-line headline reads as one mass
rather than three lines. My build already runs 0.92 — no change needed.

---

## Principle library

The fourth column is the only one that matters.

| Reference | What works | Underlying principle | How we reinterpret it for Omnic |
|---|---|---|---|
| **Baunfire** | Depth comes from contrast, scale and layering — never from softness or shadow | Restraint in surface treatment; every rounded corner should be a decision | Two-step radius scale (8px controls / 10px surfaces) instead of the four soft steps a default system would give. Applied to Omnic's *surfaces*; its controls stay product-shaped — see the radius note above |
| **Blitz** / **Scope.gg** | Controls are unambiguously pressable: 8–12px radius, sentence case, medium weight, a fast colour step on hover | A CTA is a control, not a caption. It should look like something that responds | Primary button reworked: 48px, 8px radius, sentence case 15px/600, tight tracking, colour step plus a 1px lift on hover, arrow displacing 3px. No colour inversion, no wipe — 180ms, so it reads as the control responding rather than an animation playing |
| **Baunfire** | Body copy at 20px / 1.8 leading with a controlled measure | Generous body type is what separates editorial from utility; whitespace inside the paragraph counts as much as around it | Body raised to 18px / 1.72. Not 20px — Omnic's page carries more product copy than an agency site, and 20px would force awkward wrapping in the capability columns |
| **Baunfire** | The brand's own letterforms at architectural scale, at ~4% contrast, as the ground of a section | Use the brand's geometry as environment instead of importing generic decoration | The closing CTA's radial cyan glow — the last "AI startup" cliché in the page — is replaced by Omnic's own mark at 420px, 6% opacity, sitting behind the headline. Nobody else can run this asset |
| **Baunfire** | Accent-coloured, widely tracked eyebrow above every headline | A consistent, high-contrast entry marker tells the eye where each section begins | A shared `.t-eyebrow` primitive: mono label at 0.24em tracking preceded by a short cyan rule. The **rule** carries the accent, not the text — cyan on Omnic's paper surface is only 2.8:1 and would fail AA at label size |
| **Scope.gg** | Display leading under 1.0; multi-line headline reads as a single block | Tight leading turns a headline into a shape rather than a list of lines | Already implemented (`--lh-display: 0.92`). No change |
| **Scope.gg** / **Leetify** | Key phrases inside body copy carry higher contrast than the connective words | Hierarchy can live *inside* a paragraph — no extra elements required | The hero subline now sets "computer vision and a deep learning network" and "performance insights" at full contrast, weight 500, while the connective words sit back. Omnic's sentence, unedited; a reader now gets what Omnic does in one glance |
| **Leetify** | Product UI bleeds past the section edge and dissolves rather than stopping at a hard border | A cropped artifact should say "this continues", not "this was cut" | The `ask_forge` capture is cropped to its content region; that crop line now dissolves into the plate instead of ending on a hard edge |
| **Leetify** | Very large primary CTA against a near-black ground, one clear action per screen | Figure/ground contrast beats colour saturation for CTA prominence | Already implemented — 56px cyan CTA on abyss, single primary action per section. No change |
| **Blitz** | Dense 36px controls, tight spacing, information-first | Product density belongs *in the product*. A marketing page borrowing app density feels like a dashboard | Confirms the split already in the build: Omnic's dense screenshots sit inside a spacious editorial page rather than setting its rhythm |
| **GGPredict** | — | **Negative reference.** Gradient headline text, glowing accent orbs, perspective grid, centred headline/sub/button stack, 12px body | Everything the brief lists as an "AI startup cliché", in one page. The build already avoids all of it; the CTA glow was the last trace and is now gone |
| **Mobalytics** | Not inspected — see access table | — | — |

---

## Principles adopted, by category

**Typography.** Keep Montserrat — a second display face (Leetify's Syne, Scope's
Nekst) would be a stronger *look* and a weaker *brand*. Take the leading and
size discipline instead: display under 1.0 leading, body at 18px / 1.72, labels
at 0.24em tracking. Hierarchy from scale and weight, never from colour alone.

**Spacing.** Section padding scaled to the viewport, topping out around 200px,
so major ideas are separated by more than a rule. Whitespace groups content into
zones; it is never applied uniformly.

**Layout.** Composition follows the asset, not a template. Seven capabilities,
seven different column arrangements, each sized to its screenshot's real pixel
width.

**Buttons.** One primary per view. 48px tall, 8px radius, sentence case, high
figure/ground contrast, a fast colour step and a 1px lift on hover, a real focus
outline rather than a shadow. Secondary as a hairline ghost, never a second
filled button.

**Navigation.** Minimal set, no invented items, condenses onto a blurred plate
on scroll, CTA always reachable. No auto-hide — Blitz and Leetify both keep the
sign-up permanently visible, and so should Omnic.

**Motion.** Five behaviours, declared in one file, all reduced-motion aware. No
scroll hijacking.

**Images.** Never enlarged past native width. Cropped to their content region
where they carry dead canvas. Frames are white plates with a hairline and a soft
lift — not cards inside cards.

**Video.** Environment, not subject: darkened, biased away from its own title
card, deferred until idle, and skipped entirely under reduced motion.

**Cards.** Used only where the content is genuinely a bounded object (the
screenshot plates). Everything else — the promise triad, the capabilities, the
FAQ answers — sits directly on the surface, separated by rules and space.

**Accessibility.** Higher bar than any site inspected. GGPredict's 12px body and
Scope's low-contrast accent text both fail; Omnic's page holds 4.9:1 minimum.

**Responsive.** Reorder and recompose, never just shrink. Verified 320–1728px.

---

## The "do not copy" check

Ideas that were attractive and were **rejected**:

| Rejected | Why |
|---|---|
| Baunfire's pinned, scroll-hijacked hero | Instantly identifiable, and it breaks keyboard and reduced-motion scrolling |
| Baunfire's rotated "SCROLL" rail at the right edge | Recognisably theirs, and no better than the cue already in the build |
| Leetify's offset-outline "sticker" CTA shadow | A signature, not a principle. Copying it reads as a copy |
| Leetify's live-rendered product tables | Would mean inventing Omnic product functionality the brief forbids |
| Adding a display typeface (Syne / Nekst / Bai Jamjuree) | Fashion over identity. Omnic's typeface is Montserrat |
| Scope.gg's four-identical-cards row | The exact pattern the brief calls out to avoid |
| GGPredict's gradient headline and accent orbs | The cliché the redesign exists to remove |
| Any competitor accent colour | Omnic's palette is the source of truth |

Ideas that were considered and **skipped as not actually better**:

| Skipped | Why |
|---|---|
| Body at Baunfire's full 20px | Forces awkward wrapping in the capability text columns; 18px is the honest ceiling for this content |
| Cyan eyebrow *text* on paper surfaces | 2.8:1 — fails AA. The cyan moved to the rule instead |
| Reducing the nav to a wordmark plus a menu button | Omnic's IA needs those five items; hiding them would be style at the cost of use |
| Bolding three phrases in the hero subline | Tried it — with three emphasised runs the whole paragraph read bold and nothing stood out. Cut to two, weight 500, colour-only |

---

## Design direction

**Omnic should feel** technical, calm and confident. A page that behaves like an
instrument: precise geometry, generous air, one clear action, motion only where
it explains something.

**Omnic should avoid** decoration that carries no information — glows, gradient
type, soft corners applied by default, and any container that exists only
because the content had to go somewhere.

**Spacing philosophy.** Space is hierarchy. Large gaps between ideas, tight
grouping within one. Never uniform.

**Typography philosophy.** One family, seven roles, real weights. Tight where
type is large, open where type is read.

**Buttons.** Square, unmissable, one per decision, honest focus states.

**Motion.** Expensive and rare. Five behaviours, each answering "what does this
help the reader understand?"

**Images.** Sized to their own pixels. Cropped where they carry dead space.
Never a thumbnail of something that needs reading.

**Sections.** Alternate dark and paper so scrolling has rhythm; carry the
transition with a change in density, not a divider.

**What makes this distinctly Omnic** is the part nobody else can run: the mask
mark as architectural ground, the forge loop as environment, the cyan used as a
single precise accent rather than a wash, and Omnic's own words carrying the
page — including the seven capabilities the live site currently keeps collapsed.

---

## What changed in the build

| Change | Reference → principle |
|---|---|
| Media shadow lightened; radius reduced to a two-step scale (8px controls / 10px surfaces) | Baunfire → depth from contrast, not softness |
| Primary button reworked: 56px → 48px, 8px radius, sentence case 15px/600, colour-step hover replacing the wipe-to-white | Blitz, Scope.gg → a CTA is a control, not a caption |
| Body 17px/1.65 → 18px/1.72; label tracking 0.18em → 0.24em | Baunfire → generous body type is where premium lives |
| Shared `.t-eyebrow` with a cyan rule on every section entry | Baunfire, Scope → consistent, accented entry markers |
| Hero subline: two phrases at full contrast, weight 500 | Leetify, Scope → hierarchy inside the paragraph |
| CTA radial glow → Omnic mark at 420px / 6% | Baunfire → brand geometry as environment; removes the last cliché |
| Soft dissolve at the `ask_forge` crop line | Leetify → a crop should read as "continues" |

Everything else in the page was already aligned with what the research found,
and was left alone.
