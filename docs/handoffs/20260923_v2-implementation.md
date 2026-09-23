# v2 implementation: the Stage, appearance demos, `/features`, motion

Date: 2026-09-23  
Implements: `docs/handoffs/20260922_v2-motion-showcase-features.md`  
Blueprint: §6.2, §7, §7.1, §7.4, §8.1, §8.5, §8.7, §11.2, §14, §15, §18

## Current status

Everything in the brief's *Recommended next steps* 2–9 is on `main`, in
small commits from `feat(css): add motion tokens and scroll-driven
patterns` onward. The working tree is clean after the docs commit.
GitHub Pages had not been enabled when this was written.

Implemented:

- **Motion foundation.** Duration and easing tokens (with a `linear()`
  spring), cross-document view transitions (site bar and footer hold
  still), scroll-driven Settle on band headers, Stagger on feature cards,
  Drift on photographs. All behind `@supports (animation-timeline: view())`
  and `prefers-reduced-motion: no-preference`.
- **The Stage (home hero).** A MacBook Pro 16" render over a toolbar of
  `‹` plus glyphs 1–8, a Dark | Light switch, and a status line in the
  app's footer style. Radios and `:has()` drive it; no JS needed.
- **Appearance.** The Stage sweeps between Dark and Light. It follows
  `prefers-color-scheme` until the visitor picks. "Same desk, lights up"
  (home band 4) compares Dark and Light under a divider.
- **`/features`.** Eight chapters with a sticky glyph rail, real captures
  throughout, CSS-only mode tabs, language picker, and list/strip toggle.
  JS adds the palette wall re-theme, a mini slate with Copy and
  Copy & Clear, and clickable Traffic Light and Kanban bullets.
- **Recordings.** Five clips on `/features`, click-to-play, each with a
  text description.
- **In the world.** Home band 5, six lifestyle mockups in a sideways
  scroll-snap strip with inline parallax.
- **Delights.** App-icon tour of the Stage; 404 raises the empty slate;
  Support gets a Copy address button.
- Site nav on every page: **Features · What's new · Support**.
- README has new recipes (feature chapters, Stage frames, recordings,
  palette data). `/privacy` gained one sentence about the demos.

Not done, or deferred:

- Home silent loops: still an open owner decision (BLUEPRINT §19 item 6).
- The "Copied" confirmation capture (reshoot list item 1) does not exist;
  the mini slate and Support button show a text confirmation instead.
- Chapter 8's optional "this page made N requests" counter was skipped: it
  is local measurement, which `.cursor/rules/privacy.mdc` rules out.
- The keycap sheet on chapter 6 is a plain list of shortcuts with their
  effects, not a hover-to-reveal toy. Hover-only content would fail §15.
- Real-device QA (see below) has not been done.

## Design decisions made during implementation

These go beyond the brief or differ from it. The owner should confirm or
reverse them.

1. **The Stage went straight to v2b.** The renders arrived before work
   began, so v2a (windows rising over the laptop) was not built as an
   intermediate. v2b is implemented cheaply: one laptop photo
   (`images/stage/base-*`) plus a screen-only crop per state (17 of them).
   Everything outside the screen is pixel-identical across renders, so
   each screen sits exactly over the photo (composite RMSE 0.6%, JPEG
   noise). Initial transfer is about 300 KB on a 2× desktop; about 800 KB
   after the idle warm-up.
2. **List ↔ focus swaps dip through a dimmed frame** instead of fading
   the old frame out first. The incoming screen arrives at
   `brightness(0.3)`, covers the old one, then brightens; leaving reverses
   that. This avoids two windows ghosting mid-fade using only `opacity` and
   `filter`. Leaving also waits 180 ms, so sweeping across glyphs never
   flashes the list.
3. **Hover previews; click pins.** Hover rules win over the checked radio.
   On hover-capable pointers, clicking the pinned glyph again unpins it
   (JS). On touch, the `‹` button returns to the list, because sticky
   `:hover` would fight an unpin.
4. **No breathing loop on the hero glyphs.** BLUEPRINT §8.7 still allows it,
   but it plays on its own, and the hero now answers the cursor instead.
5. **The appearance switch starts unchecked** in HTML, so CSS can follow
   `prefers-color-scheme`. JS checks the matching radio on load so
   assistive tech hears the same thing the page shows. Without JS, the
   switch shows the followed appearance as selected, but neither radio is
   checked.
6. **"Same desk, lights up" uses the maximized desk-pack pair**
   (`*-listh-maximized`), not `list-h`. It fills the screen, and `list-h`
   shows slate 2's empty checked rows (brief, *Known issues*) at a
   readable size. `/features` chapter 6 still uses `listv-full` ↔ `list-h`
   for the ⌘L toggle, where slate 2 is small.
7. **The 404's missing glyph moved from 4 to 8.** The delivered
   empty-slate capture is slate 8 with glyph 8 blank, so the gag now
   matches real pixels. Glyph 8 is drawn blank, like the app.
8. **Home bands renumbered** so the walk runs 1–8: About, The desk, On your
   Mac, Dark and Light, In the world, (feature grid), What's new, Help, Get
   Slates.
9. **Palette wall: 20 palettes, not 21.** The two palettes named after
   another app are excluded, and so is Monochrome, which the app generates
   at runtime with no fixed hex values. Hex data comes from the app's
   built-in palette JSON (`data-palette` attributes). Picking a palette
   re-themes every `.slot-N` on the page; slots with dark ink get dark
   text.
10. **The collapse clip is Dark only.** The Light twin was dropped, because
    a `<video>` cannot switch posters by color scheme.
11. **Brand icon.** The site bar now loads a 64 px icon (6 KB) instead of
    the 512 px PNG (115 KB) on every page.

## Context

### Files

| Area | Files |
|------|-------|
| Tokens, motion | `css/tokens.css` (motion block), `css/site.css` (Motion section at the end) |
| Stage | `index.html` hero, `css/site.css` "Hero: the Stage", `js/home.js`, `images/stage/` |
| Compare band | `index.html` band 4, `css/site.css` "Same desk, lights up", `images/desk-*` |
| In the world | `index.html` band 5, `css/site.css` "In the world", `images/world-*` |
| Features | `features/index.html`, `css/site.css` "Features: chapters", `js/features.js`, `images/features/`, `images/og-features.png` |
| Recordings | `video/*.mp4` + poster `.jpg` |
| 404 | `404.html`, `css/site.css` "404", `images/empty-slate.*` |
| Support | `js/support.js`, `.copy-mail` in `css/site.css` |

### Stage geometry

The photo is the render cropped to `5760x3600+320+560` (2000 and 1000 wide).
Each screen is cropped to `3968x2560+1216+960` (1550 and 775 wide). CSS
places `.screen` at left 15.5556%, top 11.1111%, width 68.8889%, height
71.1111%; those numbers follow from the two crops. README has the recipe.

`.layer-dark` and `.layer-light` each get an explicit `z-index`. Without
it, the Light layer's `clip-path` made it a z-index-0 stacking context, and
the Dark layer's active frame painted over it mid-sweep.

### JS budget

`home.js` 105 lines, `features.js` 138, `support.js` 32. Zero on
`/privacy`. No storage APIs; no network requests beyond the page's own
assets.

### Media sources

- Stage and compare band: `resources/mockups-mbp16-dockless/`
- `/features` captures: `resources/master-slates-simple-dockless/`
  (window crop `1380x1420+454+172`; Settings panes measured one by one),
  plus `master-slates-complex/` (code stills, share sheet, palette stills)
  and `master-slates-simple/slate_rich_word_lookup_dark.png`
- In the world: six of `resources/mockups/`, renamed `world-*`
- Recordings: `resources/video/`, cropped and trimmed as in README

## Success criteria and QA

Checked in Chrome (Cursor's browser) on 2026-09-23:

- [x] Every home glyph shows its slate. Pinning, the `‹` button, digits
  1–8, and Esc work. The status line and accent follow.
- [x] The Dark / Light switch flips the Stage and every screen with no
  positional jump (aligned crops). Light-mode visitors start in Light, and
  only Light frames are warmed.
- [x] JavaScript off (site scripts blocked): the Stage radios, appearance
  switch, and compare band (side by side) work; the tour button and slider
  are absent, as intended.
- [x] Reduce Motion: every transition and animation computes to `0s` /
  `none`, and view transitions are gated.
- [x] `/features`: every chapter has at least one real capture. The rail
  tracks the chapter, the palette wall re-themes and resets, the mini
  slate counts and copies, bullets cycle, and the dash matches the app's
  algorithm.
- [x] Budgets: home about 300 KB at load (2× desktop), about 800 KB after
  idle. Zero third-party requests. No duplicate IDs; every local asset
  path resolves.
- [ ] Hover itself was not exercised: the browser tool cannot hover. Hover
  selectors mirror the checked ones, so check by hand.
- [ ] Native arrow-key movement between glyphs was not exercised: the tool
  sends untrusted key events. It is standard radio behavior; check by hand.
- [ ] VoiceOver on home (expect "Preview a slate, radio button, 3 of 9,
  Slate 3, Studio codes, Plain") and on `/features` (rail, tabs, bullets).
- [ ] iPhone Safari: tap to pin, swipe the strips, the rail at the top.
- [ ] Safari 18 (no scroll-driven CSS; the JS rail still works) and Safari
  26; Firefox (no view transitions; `@starting-style` fades are instant
  where unsupported).
- [ ] Cross-page view transitions, including to and from the 404
  (`<base href="/slates_site/">`).

## Recommended next steps

1. Owner review of the decisions above, especially 1, 6, and 7.
2. Manual QA from the unchecked list, on real devices.
3. Enable GitHub Pages, then re-run the budget check on a throttled 4G
   profile.
4. Reshoot list, still open: the "Copied" state, and Dark, window-cropped
   loops if the home-loop decision (§19 item 6) is approved.
5. Optional polish: an AVIF tier for the Stage screens; a Light variant of
   the collapse clip with its own poster if a color-scheme-aware poster
   approach is wanted.

## Open blueprint decisions (not closed here)

- §19 item 6, short silent loops on the home page: still open.
- §19 item 1, canonical domain: still open.

## References

- `docs/handoffs/20260922_v2-motion-showcase-features.md` (the brief)
- `BLUEPRINT.md` §6.2, §7.1, §7.4, §8.7, §11.2, §15, §18, §19
- `README.md`: *Swap the Stage frames*, *Add or change a feature*,
  *Re-encode a recording*, *Palette wall data*
- MDN: `:has()`, `@starting-style`, `transition-behavior`,
  `animation-timeline`, `timeline-scope`, `@view-transition`
