# v2: motion, product showcase, and a Features page

Date: 2026-09-22  
Follows: `docs/handoffs/20260922_v1-site.md`  
Blueprint: §6 (scope), §7 (IA), §8.1 (thesis), §8.5 (photography), §8.7 (motion), §11.2 (JS policy), §15 (accessibility), §18 (acceptance)

## Current status

- v1 is shipped on `main`: home, `/support`, `/privacy`, `/history`, 404, OG card. GitHub Pages was not yet enabled at the time of writing.
- **Implemented 2026-09-23** (steps 2–9). What shipped, decisions made along the way, and remaining QA are in `docs/handoffs/20260923_v2-implementation.md`. The line below is kept as history.
- ~~Nothing in this document is implemented. It is a design brief plus an implementation plan.~~
- **Decisions made (owner, 2026-09-22):** A1, A2, A4, A5, A6 approved. A3: recordings are **click-to-play**, shown on `/features`. Short silent loops on the home page (the owner would love one showing list ↔ focus, or a ⌘L orientation change) are deferred to a later decision. The mockups were exported on a **paid plan**, so they are licensed for the site.
- **More decisions (owner, 2026-09-22):**
  - **Stage: both phases, in order.** Build **v2a** now (slate windows rise over the laptop, using existing assets). Upgrade to **v2b** (the laptop’s screen itself changes). The renders arrived 2026-09-23; see *Stage and showcase assets*.
  - **Light-mode visitors see the demos in Light first.** The Stage and other appearance demos start from `prefers-color-scheme` (Light → Light, Dark or no preference → Dark). The visitor can still flip them. The page ground stays dark either way.
- `BLUEPRINT.md` (v0.2: §6.2, §7, §7.1, §7.4, §8.1, §8.2, §8.5, §8.7, §11.2, §14, §15, §17, §18, §19) and `.cursor/rules/{site-stack,visual-design,no-hacky-workarounds,resources}.mdc` now reflect these decisions. Implementation can start at *Recommended next steps*, step 2.

## Owner intent

In the owner’s words, summarized:

1. The v1 site is beautiful but **too static**. v2 must be a magnificent, award-winning site for its **design and animations**.
2. The hero’s eight glyphs are begging for **hover interaction**: hover slate 1 and it lights up, with a glow like the selected glyph in the app’s toolbar, and something *meaningful* happens, not just a highlight. One half-formed idea: hovering a glyph **cross-fades the background to a different photo or mockup of Slates** running on a device.
3. The site shows only **two** product images. That wastes the photography in `resources/mockups/`, `resources/master-slates-simple/`, `resources/master-slates-complex/`, and the three screen recordings in `resources/video/`. Select a subset for the home page and for a new **Features page** that showcases **every major feature**.
4. Show **Dark and Light side by side**, or let the visitor flip the appearance of a screenshot or mockup with a control.
5. These are starting points. The next session should bring **more and better ideas**. This document is that proposal.

## Problem, feature, or goal

- URLs: `/` (hero and new bands), new `/features/`, light touches on every page (motion system, page transitions).
- Goal: turn the site from a well-set static page into one that **behaves like Slates**. It should move when the visitor moves and show the real product generously, while keeping v1’s identity: the site is eight slates, dark and colorful, fast, private, and readable without JavaScript.

## Design principles for v2

These reconcile the award-level ambition with the blueprint’s restraint. Propose them as the new text of §8.1 / §8.7.

1. **The page behaves like the app.** Every interaction maps to a real Slates gesture, so playing with the site teaches the product:
   - hover or press glyph N → focus slate N (the app’s ⌘N)
   - leave the strip or press Esc → back to all slates (⌘\\)
   - an appearance switch → View → Theme (Dark / Light)
   - arrow keys step through slates the way the toolbar does
2. **Motion answers; it never performs.** Nothing loops or plays on its own. Every animation responds to hover, focus, click, or scroll. That keeps the blueprint’s “never autoplay” spirit and satisfies WCAG 2.2.2 without pause buttons everywhere, while making the site feel alive under the cursor.
3. **Real pixels only.** Every frame shown is a real capture of Slates, either flat or composited into a device photo. No illustrations, no fake UI.
4. **CSS first, JavaScript as polish.** The core interactions (glyph stage, appearance switch, mode tabs) are built from radio inputs, labels, and `:has()`. They work with JavaScript off. Scripts only preload images, add keyboard shortcuts, and power a few optional toys.
5. **Fast on a phone.** Initial home transfer about 900 KB or less; everything else loads lazily or on idle.
6. **Still eight slates.** No generic “Apple-style” scrollytelling, pinned stories, or scroll-jacking. Every new section is a slate band with a numbered glyph.

## Blueprint amendments (decided 2026-09-22; applied in BLUEPRINT v0.2)

A1, A2, A4, A5, A6: approved as proposed. A3: click-to-play, on `/features`; home loops deferred (BLUEPRINT §19 item 6).

| # | Area | Today | Proposed amendment | Needed for |
|---|------|-------|--------------------|-----------|
| A1 | §6, §7 IA | Four pages; no `/features` | Add `/features/` as a stable URL. Nav: **Features · What’s new · Support** | Concept C |
| A2 | §8.5 photography; `.cursor/rules/visual-design.mdc` | Mockups are “reference only”, “a generic mockup is not the hero”, “do not use generic mockup sites” | Allow the owner’s device-frame composites **that show real Slates captures** as (a) the hero stage (MacBook Pro 16" dark-reflective series) and (b) secondary “in the world” photography. Conditions: exported on a **paid** plan (see *Licensing*), screen content untouched, files renamed to boring names, cropped and exported into `images/` | Concepts A, B, F |
| A3 | §8.5 / §8.7 video | “Do not autoplay them” | **Recommended:** keep no-autoplay. Videos are click-to-play, inline, muted, with controls and a slot-colored poster. **Alternative (owner’s call):** allow ≤ 6-second silent loops that play only while in view, never under reduced motion, with a visible pause control | Concept C videos |
| A4 | §8.1 / §8.7 motion | “Motion is rare and physical”; a short list of allowed effects | Replace with the principles above plus the motion system in Concept D. Keep: no scroll-jacking, no pinned stories, no particles, reduced motion disables everything | Concepts A–E |
| A5 | §11.2 JS policy; `site-stack.mdc`; `no-hacky-workarounds.mdc` | Home: “a few dozen lines” | Up to about 150 lines of vanilla JS per page, no dependencies, `defer`, never needed to render or read content. `/privacy` stays at zero JS. No storage APIs (no `localStorage`), so the privacy page’s “no cookies” stays trivially true | Concepts A, C, E |
| A6 | §8.2 palette | “Do not invent a ninth palette” | Clarify: the Features palette wall may show the app’s **built-in** palettes, and may temporarily re-theme the page with them. Still no invented palette | Concept C, chapter 1 |

## Concepts

### A. The Stage (home hero)

The owner’s idea taken to its app-faithful conclusion: **the glyph strip is the toolbar of a real Mac on stage.**

Layout, top to bottom:

1. Wordmark and pitch, as today, slightly tighter.
2. **The stage.** A MacBook Pro 16" on a dark reflective surface, straight-on, showing Slates in a vertical list (Dark). Source: `resources/mockups-mbp16-dockless/dark-listv-full.jpeg` (all eight slates, Dock hidden; light: `light-listv-full.jpeg`), a 6400×4800 photo that suits the black page. See *Stage and showcase assets*.
3. **The glyph strip** directly under the laptop, reading as its toolbar, with an **appearance switch** (segmented *Dark | Light*) at its right end.
4. **A status line** under the strip in the app’s footer style: `Slate 3 · Plain · Studio codes · ⌘3`.
5. App Store button and requirement line.

Behavior:

- **Idle:** the laptop shows the list. Glyph 1 is softly lit, the rest dimmed, as in the app.
- **Hover, focus, or tap glyph N (focus slate N):**
  - The laptop dims slightly (brightness about 0.6, scale 0.985).
  - The **slate N window rises in front of the screen**: opacity 0→1, scale 0.94→1, 12px lift, springy about 420ms. This is literally the app’s focus view.
  - The glyph lights like the app’s selected glyph: full accent, a soft outer glow, a faint top highlight, and a 1px lift.
  - **Screen light spills onto the surface:** a low radial gradient of slot N’s accent on the “floor” under the laptop, plus a faint tint on the page ground. The reflective surface makes this feel physical.
  - The status line and the hero’s accent (pitch emphasis, focus rings) switch to slot N.
- **Moving between glyphs** swaps windows with a quick cross-fade and never drops back to the list in between (about 250ms grace before returning to idle).
- **Click or tap pins** the selection. Esc, clicking the pinned glyph, or a small “all slates” back chevron (the app’s ⌘\\ affordance, shown only while a slate is pinned) returns to the list.
- **Arrow keys** move between slates (native radio behavior). Optional JS: digits **1–8** anywhere on the home page select that slate. Do not bind ⌘1–⌘8; browsers use them to switch tabs.

Glyph-to-asset map. v2a windows are cropped from the dockless focus captures, which all share one window rect. v2b uses the matching renders:

| Glyph | v2a window: crop from `resources/master-slates-simple-dockless/` | v2b render: `resources/mockups-mbp16-dockless/` | Slate | Mode |
|-------|------------------------------------------------------------------|---------------------------------------------------|-------|------|
| 1 | `{dark,light}-slate1.png` | `{dark,light}-slate1.jpeg` | Next Week | Rich · Georgia |
| 2 | `{dark,light}-slate2.png` | `{dark,light}-slate2.jpeg` | To read | Rich · Task checklist |
| 3 | `{dark,light}-slate3.png` | `{dark,light}-slate3.jpeg` | Studio codes | Plain |
| 4 | `{dark,light}-slate4.png` | `{dark,light}-slate4.jpeg` | Site tokens | Code · CSS |
| 5 | `{dark,light}-slate5.png` | `{dark,light}-slate5.jpeg` | Site launch | Rich · Traffic Light |
| 6 | `{dark,light}-slate6.png` | `{dark,light}-slate6.jpeg` | slate (dictionary) | Rich · Palatino |
| 7 | `{dark,light}-slate7.png` | `{dark,light}-slate7.jpeg` | This week | Rich · Kanban |
| 8 | `{dark,light}-slate8.png` | `{dark,light}-slate8.jpeg` | Sunset | Rich · fences and hex |

The older `master-slates-simple/slate_*_{dark,light}.png` crops (1536×1414, default scale) are a fallback only.

Titles and modes match `marketing/slates-simple/*.md` and its `manifest.yaml`.

Implementation sketch (CSS-first):

- A `<fieldset class="stage-picker">` with `<legend class="visually-hidden">Preview a slate</legend>` and nine radios: `all` (checked by default, the list view) plus `s1`–`s8`. The labels are the glyphs; each label’s accessible name is “Slate 3, Studio codes”.
- Hover preview without JS: `.stage:has(.stage-picker label[for=s3]:hover) .win-3 { … }`. Selected state: `.stage:has(#s3:checked) .win-3 { … }`. Hover overrides checked.
- Windows are real `<img>`s with alt text, stacked in the screen area. Non-current windows use `visibility: hidden` (with `transition-behavior: allow-discrete`) so VoiceOver reads only the current one.
- Window position over the screen: percentage insets measured once from the mockup’s screen rectangle (it is axis-aligned because the shot is straight-on). This is layout, not an overlay hack. Document the numbers in CSS custom properties.
- **Preloading:** load the stage photo with `fetchpriority="high"`, then slate 1. A small script warms the other seven (current appearance) on `requestIdleCallback`, and the other appearance on first switch. Without JS, windows load on first hover. That's acceptable.
- Sizes: stage photo 2000w about 180 KB WebP (1000w for phones); each window 1000w, about 40–80 KB WebP.
- Touch: no hover, so tap selects and pins. The strip sits below the device at full width.

Upgrade path, **v2b (approved; build after v2a):** swap in the 18 aligned in-device renders from *Stage and showcase assets* (`listv-full` idle plus `slate1`–`slate8`, Dark and Light). The laptop’s screen itself then changes instead of a window rising in front. The picker, status line, and keyboard handling stay the same. The Rise becomes an in-screen cross-fade, with a subtle scale on the screen area only.

### B. Appearance, everywhere

- **Hero switch** (above). Dark ↔ Light swaps the stage photo (`dark-listv-full.jpeg` ↔ `light-listv-full.jpeg`, which are pixel-aligned) and all slate windows (`*_dark` ↔ `*_light`).
- **The transition is a light sweep, not a fade:** the new appearance is revealed with `clip-path: inset(0 0 0 100%)` → `inset(0)` over about 600ms, left to right, like light entering the room. Reduced motion: instant.
- The page ground stays black (the home page stays dark per the rules), but in Light the spill turns warm white. The screen visibly lights the surface.
- **Initial state follows `prefers-color-scheme`** (approved 2026-09-22) for the demos only. A Light-mode visitor first sees Slates in Light, a quiet “we noticed”. CSS-first: a `@media (prefers-color-scheme: light)` rule applies the Light frames while the switch is untouched. Checking a radio overrides it. Without JS, the default radio is chosen to match via two mirrored markups, or accept Dark as the no-JS default. Pick the simpler one and document it.
- **“Same desk, lights up” band** (home, after the list photo): the dark and light horizontal-strip mockups (`resources/mockups-mbp16-dockless/dark-list-h.jpeg` / `light-list-h.jpeg`, aligned, same wallpapers as the Stage) under a **draggable divider**. It's an `<input type="range">` plus about 5 lines of JS to set `--split`. Without JS, show the two side by side.

### C. `/features/`: eight chapters, one per color

A long, calm page that shows **every major feature**, structured as eight slate chapters. A **sticky glyph rail** (vertical at the left edge on desktop, horizontal under the site bar on phones) tracks the chapter in view and doubles as chapter navigation (anchor links). It is the app’s toolbar again.

Tracking: CSS-only with named `view-timeline`s plus `timeline-scope` on `main` (Safari 26+, Chrome). Optional IntersectionObserver fallback (about 15 lines) for Safari 18. Without either, the rail is plain anchor links.

| Ch. | Color | Chapter | Features covered | Visuals and interactions (sources) |
|-----|-------|---------|------------------|-------------------------------------|
| 1 | Yellow | **Color is the map** | Eight colors; per-slate appearance (⌘J); built-in palettes; reorder by dragging headers; hide slates (⌘⌥1–8) | **Palette wall:** the 21 built-in theme stills (`master-slates-complex/theme_*.png`, 800×1436 tall strips) in a horizontal scroll-snap row. **Click a strip to re-theme this page’s eight bands live** with that palette’s hex values (A6; data from the app’s built-in palette JSON; resets on reload; nothing stored). Appearance panel: `dark_slate_palette.png`. Reorder: excerpt from `screen_recording_workflow.mov` |
| 2 | Orange | **Capture, copy, clear** | Copy; Copy & Clear; share; per-slate text limit | **A live mini slate:** a slate-styled `<textarea>` with working **Copy** and **Copy & Clear** buttons (Clipboard API; a 2-second “Copied” confirmation like the app; nothing saved). Studio codes: `slate_plain_dark.png`. Share: `dark_share.png` |
| 3 | Pink | **Plain, Rich, Code** | Three modes; rich headings, emphasis, links; fenced code in Rich; dictionary-style text; word lookup | **Mode tabs** (radios): Plain / Rich / Code cross-fade `slate_plain` / `slate_main` / `slate_code` (dark, with a Light switch). Dictionary: `slate_rich_dictionary_*`. Look Up: `slate_rich_word_lookup_dark.png` (full desktop; crop) |
| 4 | Purple | **Code, with the colors still on** | 41 syntax languages; language picker; hex color previews; multi-cursor | **Language carousel:** eight code crops (`slate_code_{cpp,html,javascriptreact,php,ruby,rust,scss,swift}.png`) behind a picker styled like the app’s. Picker: `dark_slate_with_code_and_language_picker.png`. The 41 language names as a quiet typographic cloud. Video: `screen_recording_code-editing.mov` (click to play) |
| 5 | Blue | **Smart bullets and cycles** | Task, Traffic Light, Kanban and 5 more built-in cycles; header progress dash; custom cycles in Settings | **A clickable bullet list on the page** that cycles ◯◐● and ⚪🟡🟢✅ exactly like the app, with a live progress dash (about 20 lines JS; without JS, static). Video: `screen_recording_smart_bullets.mov`. Settings: `{dark,light}_fulldesktop_settings_bullets.png` |
| 6 | Cyan | **Your desk, your layout** | Focus (⌘1–8, ⌘\\); vertical list / horizontal strip (⌘L); fit to content (⌘⌥R); collapse (⌘M); word wrap (⌘⌥Z); fonts, sizes, line spacing | **⌘L toggle demo:** vertical ↔ horizontal list cross-fade (`master-slates-simple/{dark,light}_fulldesktop_list_{vertical,horizontal}.png`). **⌘M before/after:** `dark_fulldesktop_list_horizontal_{beforecollapse,aftercollapse}.png`. Editor settings: `dark_fulldesktop_settings_editor.png`. A keycap sheet of shortcuts; hovering a keycap shows its effect |
| 7 | Green | **Menu bar or Dock. Synced or not. Backed up.** | Activate With (Dock / Menu Bar / Both); compact menu bar window; opt-in iCloud; automatic snapshots; Save/Restore Backup | Menu bar: `dark_menubar.png` (crop to the status item and window). Collapsed: `…_dark_fulldesktop_windowcollapsed.jpeg`. **iCloud and backups: no capture exists yet** (see gaps) |
| 8 | Gray | **Private by design** | No analytics; local by default; opt-in iCloud; no account | Typographic chapter. Optional: “This page made N requests, all to this site”, computed locally from the Performance API and never sent anywhere. Links to `/privacy` |

Each chapter: a slate band header, an h2, two or three sentences, one hero visual, and two to four sub-features. Keep copy in the voice of `marketing/copy/*.md` and BLUEPRINT §10.

### D. Motion system

Put tokens in `css/tokens.css` and the patterns in `site.css`.

- **Durations:** `--t-quick: 140ms` (hover), `--t-base: 280ms`, `--t-stage: 420ms` (window rise), `--t-sweep: 600ms` (appearance).
- **Easing:** `--ease-out: cubic-bezier(.2,.8,.2,1)`; `--ease-spring` as a CSS `linear()` curve with a small overshoot (Safari 17.2+), for the rise and glyph press.
- **Patterns:**
  - **Rise:** slate window into focus.
  - **Sweep:** appearance change.
  - **Spill:** accent light on surface and ground.
  - **Press:** glyph `scale(.94)` on `:active`.
  - **Settle:** a band’s header strip slides 24px in from the left as the band enters, and its glyph pops from 0.8. Scroll-driven, `animation-timeline: view()`.
  - **Stagger:** feature cards 1→8, 40ms apart.
  - **Drift:** slight scale 0.96→1 and deepening shadow on large photos as they enter.
- **Page transitions:** `@view-transition { navigation: auto; }` on every page (Safari 18.2+, Chrome 126+; others ignore it). Give the brand, site nav, and glyph strips a shared `view-transition-name` so the chrome stays put and content cross-fades. Turn it off under reduced motion.
- **Guardrails:**
  - Animate only `transform`, `opacity`, `filter`, and `clip-path`. Scroll-driven animations can run on the main thread and jitter on iOS; keep them light.
  - Wrap scroll-driven rules in `@supports (animation-timeline: view())`.
  - `prefers-reduced-motion: reduce` turns every transition into an instant swap and removes scroll-driven animations and view transitions.
  - No scroll-jacking, no `position: sticky` storytelling beyond the Features rail, no autoplaying loops.

### E. Small, meaningful delights

- **Icon easter egg 2.0:** clicking the app icon tours the stage 1→8 (about 450ms per slate), then returns to the list. Skipped under reduced motion.
- **404:** hovering the missing slate 4 raises an empty slate window: “This slate is empty.” Needs an empty-slate capture.
- **Support:** a “Copy address” button next to the email, with the app’s 2-second “Copied” confirmation.
- **Glyph press sound:** no. Silence is part of the brand.

### F. “In the world” (home, lifestyle strip)

A horizontal scroll-snap film strip (native swipe, trackpad, keyboard; no JS) of **five or six** mockups in real settings, each with a one-line caption. Give each frame a gentle inline-axis parallax (scroll-driven, `view(inline)`).

Suggested picks (`resources/mockups/`, drop the vendor prefix when exporting):

- `…macbook-air-mockup-on-green-chair-in-natural-light_focus.jpeg`
- `…macbook-air-mockup-on-wooden-floor_list-vertical.jpeg`
- `…macbook-pro-mockup-on-a-leather-chair_list-vertical.jpeg`
- `…macbook-air-15-mockup-on-a-natural-rock-surface_darkfocus.jpeg`
- `…apple-studio-display-mockup-on-minimalist-surface.jpeg`
- `…macbook-pro-14-mockup-on-a-modern-chair_list.jpeg`

Keep it to one band. The product-first crops stay primary.

## Context

### Asset inventory (surveyed 2026-09-22)

- **Mockups (28):** the MacBook Pro 16" **dark-reflective series** (10 frames, 6400×4800) shares one camera, one light, and one device. Only the screen changes:
  - dark list vertical / horizontal
  - light list vertical / horizontal
  - dark focus; dark focus with a light slate
  - settings bullets; settings editor; syntax language selection; collapsed window

  Any two cross-fade without a jump. This is the backbone for Concepts A and B. The rest are lifestyle scenes (green chair ×3, wooden floor ×2, leather chair ×2, modern chair ×3, rock surfaces ×4, rocky shadows ×2 PNG, Studio Display, Pro Display XDR).
- **Simple pack (34):** eight per-slot focus windows × dark/light (1536×1414), full-desktop lists, settings, syntax picker, collapsed window, word lookup.
- **Complex pack (109):**
  - eight per-slot windows × dark/light (1480×1302, desk pack)
  - eight per-slot full desktops × dark/light (3840×2160)
  - list layouts with collapse before/after pairs
  - menu bar, share sheet, appearance panel, language picker
  - code crops for eight languages
  - 21 usable theme stills: skip the two whose file names reference another app; do not publish them or their names
- **Videos (3):** light-mode, 4K H.264 full-desktop recordings with the Slates window small in the frame.
  - `code-editing`: 26s, 47 MB, focus view, Swift, selections and multi-cursor
  - `smart_bullets`: 18s, 42 MB, horizontal strip, clicking cycle bullets
  - `workflow`: 45s, 118 MB, focus ↔ list ↔ strip

  All need **cropping to the window region and re-encoding** (1080p H.264 plus optional HEVC, no audio track, about 3–8 MB each, poster JPEG). `ffmpeg` is not installed on the photography Mac (`brew install ffmpeg`); AVFoundation export with a crop composition also works. Stay well under GitHub’s 50 MB file warning.

### Licensing

The mockups came from a commercial mockup service. Its license allows website and marketing use **only for exports made on a paid plan**; free or trial exports are personal-use only. **Confirmed 2026-09-22:** the owner has the paid plan, so these 28 are licensed. No attribution is required on paid exports. Rename files on export (boring names, no vendor prefix).

### Constraints that still apply

- Static HTML and CSS, no framework, no build step; GitHub Pages from `main`; relative URLs (the site lives under `/slates_site/`).
- No analytics, cookies, third-party requests, or storage APIs; self-hosted media only (no YouTube or Vimeo embeds).
- `resources/` is never committed; publish only cropped exports in `images/` (and `video/` for encoded clips).
- Colors from `css/tokens.css`; numerals always accompany color.
- Do not name or imitate the design-reference sites in copy, docs, code, or commit messages.

### Performance budget

- Home, initial transfer: ≤ about 900 KB: HTML, CSS, font, stage photo (phone size on phones), slate 1 window.
- Home, after idle preload: ≤ about 2.5 MB.
- `/features`: above the fold ≤ about 700 KB; everything else `loading="lazy"`; videos `preload="none"`.
- LCP element: the stage photo with `fetchpriority="high"` and explicit `width`/`height`.
- Formats: WebP with JPEG fallback (per the rules). AVIF is optional later.

## Stage and showcase assets (delivered 2026-09-23)

All local and gitignored under `resources/`; never link these paths from pages. Export each one into `images/` (WebP + JPEG, boring names, no vendor prefix) or `video/` before use.

### How the new set was shot

- **Captures:** `resources/master-slates-simple-dockless/` (42 PNGs). MacBook Pro 16" at **1496 × 967 looks-like**, so each full-desktop capture is **2992 × 1934**. **Dock hidden.** Simple pack content, except the maximized horizontal strip, which uses the desk pack. Dark frames use system Dark, Slates Dark, and the dark wave wallpaper. Light frames use system Light, Slates Light, and the sand wave wallpaper. Footer status reads “Local only”.
- **Renders:** `resources/mockups-mbp16-dockless/` (42 JPEGs, 6400 × 4800). Same MacBook Pro 16" dark-reflective scene as the original ten, one render per capture, same base names.
- **Alignment (verified):**
  - Across all 42 renders, differences stay inside the laptop screen. The laptop body, bezel, surface, and reflection are pixel-identical, and they also match the original `resources/mockups/…_dark_list-vertical.jpeg`.
  - Every Dark/Light pair shares the same window geometry.
  - Slates 1–8 share one focus-window frame (up and left of center). The list frames (`list-v`, `listv-full`) share one centered, full-height frame.
  - So **list ↔ focus changes window size and position**. Don’t cross-fade those directly, or two windows overlap mid-fade. Fade the old frame out, then the new one in (about 120ms apart). Between slates, and between Dark and Light, a direct cross-fade or sweep is clean.

### Asset map

Paths are relative to `resources/`. “Mockup” is in `mockups-mbp16-dockless/<name>.jpeg`; “Capture” is in `master-slates-simple-dockless/<name>.png`. Each exists as `dark-*` and `light-*` unless noted.

| Use | Name (dark / light) | Shows | Notes |
|-----|---------------------|-------|-------|
| **Stage idle** (home) | `dark-listv-full` / `light-listv-full` | Vertical list, **all eight slates** | Replaces the four-slate `list-v` as the Stage idle frame |
| **Stage, glyph N** (v2b) | `dark-slate1` … `dark-slate8` / `light-slate1` … `light-slate8` | Slate N in focus view | 1 Next Week · 2 To read · 3 Studio codes · 4 Site tokens · 5 Site launch · 6 slate (dictionary) · 7 This week · 8 Sunset |
| **Stage windows** (v2a) | Capture `dark-slateN` / `light-slateN` | Same focus window, flat | **Crop the window out of these captures** (all 16 share one rect; measure it once) instead of using the older `master-slates-simple/slate_*` crops, so v2a and v2b show identical windows |
| “Same desk, lights up” band (home) | `dark-list-h` / `light-list-h` | Horizontal strip, simple pack | Aligned pair for the divider. Slate 5 is hidden in this frame (strip reads 1, 2, 3, 4, 6) |
| Ch. 1 Color is the map | `dark-appearance-palette` / `light-appearance-palette`; `dark-settings-appearance` / `light-settings-appearance` | Slate Appearance palette; Settings → Appearance | Plus the palette wall from `master-slates-complex/theme_*.png` (skip the two with another app’s name) |
| Ch. 2 Capture, copy, clear | `dark-slate3` / `light-slate3` | Studio codes | Share sheet: `master-slates-complex/dark_share.png` (old capture) |
| Ch. 3 Plain, Rich, Code | `dark-slate3` (Plain) · `dark-slate1` (Rich) · `dark-slate4` (Code), each with light | Mode tabs | Tabs cross-fade cleanly (same frame) |
| Ch. 4 Code, colors still on | `dark-language-picker` / `light-language-picker`; `dark-slate4` / `light-slate4` | Syntax language picker; CSS with hex chips | Eight-language carousel from `master-slates-complex/slate_code_*.png` |
| Ch. 5 Smart bullets | `dark-settings-bullets` / `light-settings-bullets`; `dark-slate5`, `dark-slate7`, `dark-slate2` (+ light) | Settings → Bullets; Traffic Light, Kanban, Task | |
| Ch. 6 Your desk, your layout | `dark-listv-full` ↔ `dark-list-h` (⌘L); `dark-collapse` / **`ligth-collapsed`** (⌘M); `dark-listh-maximized` / `light-listh-maximized`; `dark-settings-editor` / `light-settings-editor` | List ↔ strip; toolbar-only window; a full, maximized desk-pack strip; Settings → Editor | ⌘L and ⌘M change window geometry: use fade-out/fade-in, not a cross-fade. Note the source file names: `dark-collapse` and `ligth-collapsed` (sic) |
| Ch. 7 Menu bar, sync, backups | `dark-menubar` / `light-menubar`; `dark-settings-data` / `light-settings-data` | Menu Bar Icon mode (Finder frontmost, Slates window under its lit “3” status item); Settings → Data (iCloud Off, Turn On…, Automatic Backups) | |
| 404 | Capture `dark-empty` / `light-empty` (1380 × 1420, window only) | Empty slate 8, glyph 8 blank | Use the flat window crop for the “empty slate rises in the gap” gag. **Do not use mockup `dark-empty.jpeg`**: the macOS screenshot preview thumbnail is baked into its lower-right corner. `light-empty.jpeg` is clean but not needed |
| Spare | `dark-list-v` / `light-list-v` | Vertical list, slates 1, 4, 7, 8 only | Superseded for the Stage; fine as a compact-desk image |

### Recordings

| File (`resources/video/`) | Length | Size | Shows | Use |
|---------------------------|--------|------|-------|-----|
| `window-toolbar-collapse-dark.mov` | 4.0 s | 10 MB | Full desktop, 2992 × 1934, Dark: the window collapsing to its toolbar | Click-to-play on ch. 6. **Also the first candidate for the deferred home loop** (BLUEPRINT §19 item 6) |
| `window-toolbar-collapse-light.mov` | 4.6 s | 13 MB | Same, Light | Pair for the appearance switch |
| `screen_recording_code-editing.mov` | 26 s | 47 MB | 4K, Light, focus view, Swift, multi-cursor | Ch. 4, click-to-play |
| `screen_recording_smart_bullets.mov` | 18 s | 42 MB | 4K, Light, horizontal strip, clicking bullets | Ch. 5, click-to-play |
| `screen_recording_workflow.mov` | 45 s | 118 MB | 4K, Light, focus ↔ list ↔ strip | Ch. 1 or 6, click-to-play |

All need cropping to the window region and re-encoding to 1080p-or-smaller H.264 with no audio track (`brew install ffmpeg`, or AVFoundation), plus a poster frame. Target a few MB each.

### Known issues to check

- **Slate 2 (“To read”) in list views:** in `dark-listv-full` and `dark-list-h`, the two checked `[x]` items show no text after the checkbox. The same items render struck-through in the focus capture `dark-slate2`. It may be a narrow or clipped card hiding struck-through text, or an app rendering bug; check in the app. Until then, don’t use list frames for close-up crops of slate 2.
- Carets are visible at the end of some slates. That's authentic, and harmless in cross-fades.

## Photography gaps and reshoot list

Delivered 2026-09-23: Stage renders (all eight idle plus 1–8, Dark and Light), Settings → Data, menu bar mode, collapsed window, empty slate, horizontal pairs, settings frames. Still missing:

1. **The “Copied” confirmation** (Copy button’s 2-second state), Dark and Light, for chapter 2.
2. **Dark, window-cropped recordings** of the main demos. The three long recordings are Light-only full desktops. For the deferred home loops, the best candidates are list ↔ focus (⌘3, then ⌘\\) and a ⌘L orientation change, each ≤ 6 s.
3. **Optional:** a clean re-render of `dark-empty` (screenshot thumbnail in frame), only if an in-laptop empty frame is ever needed.

## Recommended next steps (small commits, in order)

1. ~~**Owner decisions:** A1–A6 and the license check; update the blueprint and rules.~~ Done 2026-09-22.
2. **Motion foundation:** tokens, `@view-transition`, app-accurate glyph glow, hover, and press on the existing hero, scroll-driven Settle and Stagger on existing bands. Low risk, immediate lift.
3. **The Stage:** export assets (`images/stage/`), CSS-first picker, idle preloading, status line, arrow keys and digit shortcuts.
4. **Appearance:** hero switch with Sweep; “Same desk, lights up” divider band.
5. **`/features` skeleton:** eight chapters, the rail, nav link, OG card, copy.
6. **Features interactions:** mode tabs, language carousel, palette wall with live re-theme, live mini slate, clickable cycles, ⌘L and ⌘M demos.
7. **Video:** crop, encode, posters, click-to-play.
8. **In the world** strip on home.
9. **QA** (below), then update README (new edit recipes: adding a feature chapter, swapping stage frames) and a v2 handoff.

## Success criteria

- Everything in blueprint §18 still passes.
- Hovering, focusing, or tapping any glyph on home shows that exact slate within 150ms after preload. Keyboard (arrows, Esc, digits) and VoiceOver (“Preview a slate, radio button, 3 of 9, Slate 3, Studio codes”) both work.
- The appearance switch flips the stage and all windows; aligned pairs show no positional jump.
- `/features` covers every feature listed in Concept C, and each chapter shows at least one real capture.
- With JavaScript off, the stage, appearance switch, mode tabs, and Features rail links still work. Only preloading and the toys degrade.
- With Reduce Motion, nothing animates, and no information is lost.
- Budgets above met on a throttled 4G profile. No layout shift from images (explicit dimensions).
- Zero third-party requests, zero storage APIs.
- Works in Safari 18 (no scroll-driven animation; everything static but complete), Safari 26, Chrome, and Firefox (no scroll-driven or view transitions; still complete).

## Accessibility and manual QA

- Hover can never be the only way in: focus, click, tap, and arrows reach every state.
- Hidden stage windows are `visibility: hidden`, not only transparent.
- Keep contrast for status lines and captions over photos (≥ 4.5:1; add a scrim under text if needed).
- Videos: controls visible; a text description next to each (no audio, so no captions needed, but describe what happens).
- Test:
  - VoiceOver on home (stage) and `/features` (rail, tabs)
  - keyboard-only pass
  - iPhone Safari (tap-to-pin, swipe strips)
  - Reduce Motion
  - JavaScript off
  - Safari 18 and 26

## Risks and pitfalls

- **Flicker** when sweeping across glyphs: use the grace delay and never animate back to idle between siblings.
- **Decode jank** on first swap: preload, then `img.decode()` before revealing (JS path); keep window images about 1000w.
- **Weight creep:** 16 windows plus 2 stage photos plus the palette wall adds up fast. Keep the budgets.
- **Scroll-driven jitter on iOS:** transform and opacity only; keep the number of animated elements small.
- **Motion fatigue:** if a page has more than two simultaneous motions, cut one. Restraint is still the brand.
- **Drift toward a template:** if a section could live on any product site, redo it as a slate.
- **404 plus view transitions:** the 404 uses `<base href="/slates_site/">`. Test transitions from and to it.

## Open decisions for the owner

Resolved 2026-09-22: A1–A6 approved (A3 as click-to-play on `/features`); paid-plan license confirmed; palette wall may re-theme `/features`.

Also resolved 2026-09-22: Stage v2a now and v2b after the renders (both, in that order); Light-mode visitors see the demos in Light first.

Still open:

1. Short silent loops on the home page (BLUEPRINT §19 item 6). Best candidates: list ↔ focus, and a ⌘L orientation change. They need new window-cropped captures, ideally in Dark.

## References

- `BLUEPRINT.md` §6, §7, §8.1–§8.7, §10, §11.2, §15, §18, §19
- `docs/handoffs/20260922_v1-site.md`
- `marketing/README.md`, `marketing/copy/*.md`, `marketing/slates-simple/manifest.yaml`
- WebKit, “WebKit Features in Safari 26.0” (scroll-driven animations): <https://webkit.org/blog/17333/webkit-features-in-safari-26-0/>
- WebKit, “A guide to Scroll-driven Animations with just CSS”: <https://webkit.org/blog/17101/a-guide-to-scroll-driven-animations-with-just-css/>
- WebKit, “Two lines of Cross-Document View Transitions code”: <https://webkit.org/blog/16967/two-lines-of-cross-document-view-transitions-code-you-can-use-on-every-website-today/>
- MDN: `:has()`, `@view-transition`, `animation-timeline`, `linear()` easing, `transition-behavior`, `prefers-reduced-motion`
- WCAG 2.2 SC 2.2.2 Pause, Stop, Hide
- Mockup license terms: <https://mockuuups.studio/license/>
