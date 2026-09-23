# Slates — Public Site BLUEPRINT

Version: 0.1  
Product: Slates (macOS scratchpad; iOS later)  
Repo: public, separate from the private app repository  
Host: GitHub Pages  
Status: planning. This file is the source of truth for the public site until the first pages ship.

The app codebase is authoritative for product behavior. This blueprint is authoritative for the public site: what it is, how it should look, what it must not become, and how it stays easy to keep alive.

---

## 1. One-sentence pitch

A public site that feels like opening Slates: eight color-coded surfaces, honest product photography, and a support URL Apple and users can trust.

---

## 2. Why this exists

Slates needs a **stable HTTPS URL** that:

1. Satisfies Mac App Store **Support URL** (required) and **Privacy Policy URL**.
2. Gives people who have not installed the app a place to understand it, download it, and get help.
3. Carries the same color identity as the product — not a generic SaaS landing page.

In-app Help already covers the product tour (`Help → User Manual`) and a mailto (`Help → Ask Question via Email` → `mikedovale@pm.me`). The site does **not** replace the manual. It is the **storefront + support desk + legal** surface.

---

## 3. On design

The site must look designed, not generated. Art direction:

- **Dark canvas, color as identity.** Black/near-black page, neon accents, full-bleed photography. Not a white marketing template with a hero gradient.
- **The product is the art.** Large device/window photographs, not abstract illustrations or 3D blobs.
- **Short, confident copy.** One sentence can carry a section. Slates’ description is a single paragraph: *collect & edit text*.
- **Feature list that scans.** Short titles, one-sentence explanations, small icons. No “learn more” maze.
- **What’s new as a blurb**, with a separate history page for the long form.
- **Support and legal in the footer**, always reachable. Slates’ knowledge base is a first-class `/support` because this *is* the support URL.
- **Hand-authored HTML and CSS.** Static files and a stylesheet. No framework churn.

What **not** to do:

- Google Analytics / gtag. Slates ships with **zero telemetry**. The site must match.

---

## 4. Audience

Primary:

- App Review, opening the Support URL
- Someone who just bought or downloaded Slates and needs help
- A curious Mac user deciding whether to install

Secondary:

- Press / blogs (later: quotes, press kit)
- Future iPhone users, once Pocket ships

Write for a broad, non-technical reader. Do not assume they know iCloud containers, sandboxes, or “slots.json”.

---

## 5. Success criteria

The site succeeds if:

1. **App Store Connect** can point Support URL and Privacy Policy URL at pages that stay up.
2. A reviewer finds **how to get help** (email) within one screen of `/support` and `/`.
3. A new visitor understands, in under ten seconds: eight colored scratchpads, local by default, optional iCloud, macOS 14+.
4. It looks **worthy of the app**: colorful, calm, distinctive. A designer should want to bookmark it.
5. Updating FAQ, privacy, or “what’s new” is a small Markdown/HTML edit and a push. No rebuild archaeology.
6. There is **no analytics, no tracker, no cookie banner**.

---

## 6. Scope

### 6.1 In scope (v1)

- Public GitHub repo + GitHub Pages
- Home (product + download + identity)
- Support / FAQ (the Support URL)
- Privacy policy (the Privacy URL)
- What’s new (short on home, full on `/history`)
- 404 that still looks like Slates
- Open Graph / Twitter card image
- Favicon and apple-touch-icon from the app icon
- Light, honest footer: support, privacy, email, copyright

### 6.2 Later (do not block v1)

- Custom domain (prefer this as the URL frozen into binaries once owned)
- iOS / iPad download band when Pocket ships
- Press quotes and press kit
- Terms of Use (needed if IAP / paid unlock ships)
- Localized pages
- Blog

### 6.3 Out of scope

- Reproducing the in-app User Manual (that copy lives in `StarterContentCatalog` in the app)
- Docs from the private app repo (`docs/feats/`, handoffs, perf reports)
- Accounts, comments, search backend, CMS
- Analytics, ads, CDNs that inject scripts
- A JavaScript SPA
- A ticket system (email is the support channel)

---

## 7. Information architecture

Keep the URL surface tiny and stable. Shipped app builds will hard-link these.

| Path | Role | App Store / app use |
|------|------|---------------------|
| `/` | Product home. Also a valid Support URL if `/support` is linked above the fold and in the footer. | Marketing URL |
| `/support` | Canonical **Support URL**. Contact + FAQ. | **Support URL** |
| `/privacy` | Privacy policy. | **Privacy Policy URL** |
| `/history` | Full release notes | Linked from home “What’s new” |
| `/404.html` | GitHub Pages 404 | — |

Optional later, same host:

| Path | Role |
|------|------|
| `/terms` | Terms of Use, if IAP ships |
| `/press` | Press kit |

**Do not** use a GitHub Issues URL, a repo README, or `mailto:` alone as the Support URL. Reviewers want a real page.

### 7.1 Home sections (scroll story)

The home page is a vertical walk through eight colored “slates,” then support and legal. Template is tout → description → platform bands (macOS only for now) → features → press → what’s new → download (Mac) and eight colors.

1. **Tout / hero** — App icon or wordmark, eight numbered color slates, one line of pitch, App Store button.
2. **One-sentence description** — *Eight color-coded scratchpads for quick capture.*
3. **Product photograph** — Full-bleed Mac window: list of eight colored slates.
4. **Feature grid** — Eight features, one per slate color (see §9).
5. **What’s new** — Two-sentence blurb + link to `/history`.
6. **Get help** — Same contact + top FAQ teasers as `/support`, so the home page is never a dead end for App Review.
7. **Closing mark** — Icon + “Give Slates a try.” + App Store button again.

Footer on every page: Support · Privacy · Email · © Miguel Dovale.

### 7.2 Support page

Must include, above the fold:

- What Slates is, in one line
- **How to get help:** email `mikedovale@pm.me` (same address as `Help → Ask Question via Email`)
- Link back to the in-app User Manual (“already installed? Help → User Manual”)
- App Store link

Then a short FAQ. Target 8–12 questions, not a knowledge-base CMS.

Suggested v1 FAQ (edit as the product teaches us real questions):

1. Where is my data stored?
2. What does iCloud sync actually do?
3. How do I copy or clear a slate?
4. How do I change a slate’s color?
5. How do I show Slates in the menu bar?
6. How do I get the User Manual without overwriting my slates?
7. Does Slates collect analytics?
8. Which macOS versions are supported?
9. What happens if I hit the text limit?
10. How do I back up or restore?

Answers must follow the app privacy rule: **“Stored locally by default; optional iCloud sync.”** Never “everything stays on your Mac” without the iCloud caveat.

### 7.3 Privacy page

Plain language, short, dated. Cover:

- Who: Miguel Dovale / Slates
- The app does **not** collect analytics, usage, or crash telemetry
- Storage: local Application Support by default; **opt-in** iCloud Documents if the user enables sync
- Email support: if someone writes in, that email is used only to reply
- The **website** collects nothing beyond what GitHub Pages may log at the infrastructure layer (see §14). We do not add our own logs, cookies, or trackers.
- Children’s note (not directed at children under 13)
- How to contact
- Effective date

---

## 8. Visual design

### 8.1 Design thesis

**The site is eight slates.**

Scrolling the home page should feel like scanning the list in the app: each band is a distinct color identity (header, wash, accent, numbered circle). Photography of the real window sits inside those colors. Typography stays light and large. Motion is rare and physical.

If a section could live on a generic startup template, it is not done.

### 8.2 Color tokens (canonical)

Use the **Slates Dark** built-in palette as the site’s default system. These hex values are copied from the app’s `PaletteLibrary` (Slates Dark / Slates Light). Do not invent a ninth marketing palette.

**Accents (the eight identities):**

| Slot | Accent | Chrome (dark UI) | Dark background | Dark header |
|------|--------|------------------|-----------------|-------------|
| 1 | `#ffd600` | `#ffee99` | `#1c1b14` | `#463e18` |
| 2 | `#ff9230` | `#ffd3ad` | `#1c1814` | `#46311e` |
| 3 | `#ff375f` | `#ffafbf` | `#1c1415` | `#461e26` |
| 4 | `#db34f2` | `#f1aef9` | `#1b141c` | `#401e44` |
| 5 | `#0091ff` | `#99d3ff` | `#14181c` | `#183246` |
| 6 | `#00d2e0` | `#99edf3` | `#141c1c` | `#193f42` |
| 7 | `#30d158` | `#adedbd` | `#141c16` | `#1e4026` |
| 8 | `#797979` | `#e7e7e7` | `#131313` | `#2b2b2b` |

**Page chrome:**

- Page ground: `#000000` or `#131313` (slate 8). Near-black, not dark gray-blue.
- Body text on dark bands: `#ffffff` / `#e7e7e7`
- Muted footer text: `#808080`
- Links inherit the **current section accent**, not a single global blue

**Light legal pages:** `/privacy` (and later `/terms`) may use **Slates Light** washes (`#f0ece0`, `#f0e7e0`, …) if long reading on black is fatiguing — but home and `/support` stay dark and colorful. Do not make the marketing site a light-mode corporate page.

CSS custom properties, one file (`css/tokens.css`):

```css
:root {
  --slate-1: #ffd600;
  --slate-2: #ff9230;
  --slate-3: #ff375f;
  --slate-4: #db34f2;
  --slate-5: #0091ff;
  --slate-6: #00d2e0;
  --slate-7: #30d158;
  --slate-8: #797979;
  --bg-1: #1c1b14;
  /* … */
}
```

### 8.3 Numbered circles

The numbered 1–8 circle is as important as color. Use it in:

- Hero (the eight-circle strip, like the in-app focus toolbar)
- Feature grid (each feature sits on its slot’s circle)
- Favicon / OG fallback if the icon is not ready

Circles should match in-app language: filled disc, digit in the slate’s `slateCircleDigit` color (dark on neon for Slates Dark: `#1c1b14` on yellow, etc.).

> September 2026: in the shipping app the markers are rounded squares (corner radius about a quarter of the side), not discs; the focused one is lit with a soft glow and the rest are dimmed. The site matches the app shape. Pages on Slates Light washes keep the dark digits, because the Slates Light digit colors measure under 4:1 on the neon fills.

### 8.4 Typography

Light sans (Myriad Pro via Typekit), large sizes, weight 200–400.

For Slates:

- **No Typekit / Google Fonts** unless self-hosted. Extra third-party requests fight the privacy story and add a cookie/CDN footprint.
- Prefer a **self-hosted** display face with an open license, or system UI:
  - Display / hero: a distinctive grotesque or rounded sans, self-hosted (candidates: *Fraunces*, *Newsreader*, *Outfit*, *Sora* — pick one and commit)
  - Body: `ui-sans-serif, system-ui, "SF Pro Text", "Helvetica Neue", sans-serif`
- Weights: light for headlines, regular for body. Avoid heavy black type on neon.
- Hero pitch ~ clamp(2.4rem, 6vw, 4rem). Section titles ~ 2rem. Body ~ 1.2–1.4rem, line-height ~ 1.35.
- `em` / emphasis can pick up the current slate accent.

### 8.5 Photography (the award is won or lost here)

**Real product shots** in full-bleed bands (Mac-only for now).

v1 shot list (export 2x, WebP + JPEG fallback, longest edge ~ 2560px):

1. **Hero / tout** — App icon large, or a still of the eight-circle strip over a dark wash.
2. **Mac list, dark palette** — All eight slates visible, vertical list, real-looking but non-secret sample text (door codes *as examples*, meeting notes, a JSON snippet). This is the money shot.
3. **Mac focus view** — Single slate, numbered circles in the toolbar.
4. **Menu bar HUD** (optional v1) — Status item + compact focus window.
5. **Light palette variant** of shot 2, for a later band or OG image.

Rules for sample text:

- No private data, no real emails, no customer content
- Prefer the same spirit as the in-app starter catalog (examples, not “Lorem ipsum”)
- Syntax-highlighted code is allowed

Do not use generic mockup sites, AI device frames, or stock “person with laptop.” Crop tight. Let color do the framing.

**Local source library.** The masters live on disk under `resources/` and are **not in git** (`.gitignore`). Keep the tree. Do not commit it, and do not delete it as cleanup. Another clone will not contain it; copy it from the machine that holds the masters. Published pages use cropped exports in `images/` only.

Present locally (September 2026):

| Folder | What is there |
|--------|----------------|
| `resources/master-slates-simple/` | 34 PNGs. Start here for v1. Dark and light full-desktop and fullscreen lists, settings (bullets, editor), syntax language selection, collapsed window, and tighter crops: main, plain, code, smart bullets, and rich notes (dictionary, this week, to-do, with code, word lookup). |
| `resources/master-slates-complex/` | 109 PNGs. Deeper library for later bands: dark and light full-desktop, fullscreen, and window shots; list layouts; menu bar; share sheet; palette; per-slate stills; code crops for eight languages (C++, HTML, JavaScript React, PHP, Ruby, Rust, SCSS, Swift), each also as a small crop; 23 named theme stills, including Slates Dark and Slates Light. |
| `resources/mockups/` | 28 device-frame composites (MacBook Air, MacBook Pro, Studio Display, Pro Display XDR). Reference only. The live site still crops real product shots. A generic mockup is not the hero. |
| `resources/video/` | Three screen recordings: `screen_recording_code-editing.mov`, `screen_recording_smart_bullets.mov`, `screen_recording_workflow.mov`. Do not autoplay them (§8.7). |

Prefer the simple set for v1. The complex set is the deeper library, not a dump onto the home page.

### 8.6 Layout

- Max measure for copy: ~40–44rem, ~800px, stay in that family.
- Full-bleed **color bands** break the measure: the background goes edge-to-edge; type stays in the column.
- Feature grid: two columns on desktop.
- Platform band (Mac): photograph on one side, short copy + App Store on the other. On small screens, stack: photo, then copy.
- Generous vertical padding (64–96px). The site should breathe like the app, not feel packed.

### 8.7 Motion

Calm, physical, optional:

- Hero circles can **idle-breathe** (opacity or a 1px lift), staggered 1–8
- Section accents can **crossfade** as bands enter the viewport
- App Store buttons: a small scale on hover
- `prefers-reduced-motion: reduce` disables all of it
- No scroll-jacking, no page-long pinned stories, no particle systems

An easter egg is allowed if it is tiny. Example: clicking the app icon cycles the page through the eight accents once. Never autoplay on load.

### 8.8 What “design award” is not

- Glassmorphism cards on a purple mesh gradient
- Inter + Lucide icons + “Your workflow, supercharged”
- Auto-playing video behind a cookie wall
- A component library that looks like every other 2026 marketing site

The win is **restraint + color fidelity + photography**. Same as the app.

---

## 9. Product copy (home)

Keep this in lockstep with the app README / App Store listing. When they drift, the **shipping app and this site** should agree; the private `BLUEPRINT.md` in the app repo may be more detailed than we want public.

**Title:** Slates  
**Subtitle:** Eight color-coded scratchpads for quick capture.  
**Short:** A minimal macOS scratchpad with eight colored slates. Local by default, with optional iCloud sync.

**Description (one paragraph):**  
Slates is a simple app. It gives you eight color-coded scratchpads so you can capture text fast and find it by color — door codes, meeting links, snippets to paste a few times. Stored locally by default; optional iCloud sync if you want it.

### 9.1 Feature eight (home grid)

Map one feature to each slot color so the grid *is* the palette:

| Slot | Title | One-liner |
|------|--------|-----------|
| 1 Yellow | Color first | Each slate has its own color — header, card, chrome. Organize by hue, not folders. |
| 2 Orange | Copy & Clear | Copy in one click. Copy & Clear for one-time codes. |
| 3 Pink | Plain, Rich, Code | Write how you need: plain text, rich Markdown, or syntax-highlighted code. |
| 4 Purple | Menu bar or Dock | Live in the Dock, the menu bar, or both. |
| 5 Blue | Optional iCloud | Sync is off until you turn it on. Your slates, your Mac, unless you say otherwise. |
| 6 Cyan | Keyboard native | Navigation, find, indent, multi-cursor — a scratchpad that types like a Mac editor. |
| 7 Green | Backups | Automatic local snapshots, plus Save Backup / Restore when you want a file. |
| 8 Gray | Private by design | No analytics. No third-party sync. Just the notes you typed. |

Do not claim features that are still ideas (IAP, Pocket, App Intents) until they ship.

### 9.2 Requirements line

macOS 14 (Sonoma) or later.  
iPhone / iPad: omit until Pocket is real, or a single muted line: “iPhone companion in the works.”

> Corrected September 2026: the shipping app’s deployment target is macOS 14.0. Earlier drafts said macOS 13 (Ventura).

---

## 10. Voice

- Calm, specific, a little proud. Not cute, not corporate.
- Prefer verbs users do: capture, copy, clear, sync.
- Author credit: **Miguel Dovale**. Copyright © 2026 Miguel Dovale.
- English only for v1 (matches the app).

---

## 11. Technology (easy to maintain)

### 11.1 Stack

**Static HTML + CSS. No JS framework. No build step required for v1.**

| Do | Don’t |
|----|--------|
| Hand-written pages that a human can edit in a weekend | Next.js, React, Tailwind-in-JS, a CMS |
| One `css/tokens.css` + one `css/site.css` | CSS-in-JS, utility soup that hides the design |
| Images in `images/` with boring names | A design-tool export pipeline as a dependency |
| GitHub Pages from `main` | Docker, Netlify plugins, serverless functions |
| Progressive enhancement: the site works with JS disabled | Client-side routing |

A **tiny optional** Eleventy (11ty) layer is allowed later if FAQ/history become tedious as raw HTML. If added:

- Markdown in `content/`
- One or two Nunjucks layouts
- Output still plain HTML
- `npm` scripts: `build`, nothing else

Do not introduce 11ty in v1 unless writing HTML by hand is already painful.

### 11.2 JavaScript policy

Zero JS on legal pages. Home may have a few dozen lines for:

- `prefers-reduced-motion` already handled in CSS
- Optional icon easter egg
- Current year in the footer (or just type the year and update annually)

No analytics, no font-loading observers, no cookie scripts.

### 11.3 Proposed tree

```
slates-site/
├── BLUEPRINT.md          ← this file
├── README.md             ← how to preview locally, how to deploy
├── CNAME                 ← later, custom domain
├── index.html
├── support.html          ← GitHub Pages: also publish as /support/
├── privacy.html
├── history.html
├── 404.html
├── css/
│   ├── tokens.css
│   └── site.css
├── images/
│   ├── app-icon.png
│   ├── hero-circles.png
│   ├── mac-list-dark.jpg
│   ├── mac-focus-dark.jpg
│   ├── og.png            ← 1200×630
│   └── favicon.ico
└── fonts/                ← only if self-hosting a display face
```

GitHub Pages pretty URLs: either `support.html` + `/support` via a `support/index.html` pair, or a simple `support/index.html`. Prefer **directories with `index.html`** so `/support` and `/privacy` never show `.html`.

On the photography machine, `resources/` sits beside this tree and is gitignored (§8.5). `images/` is the only image tree GitHub Pages serves.

### 11.4 Local preview

`python3 -m http.server` in the repo root, or the VS Code / Xcode live preview. Document it in `README.md`. No Docker.

### 11.5 Favicon and social

- `favicon.ico` + `apple-touch-icon.png` from the shipping app icon
- `og.png` 1200×630: dark ground, eight circles, wordmark, subtitle
- Meta description = the short pitch
- `theme-color` = `#131313` or slot 1 `#ffd600` — pick one and keep it

---

## 12. Hosting and URLs

- **Repo:** public (suggested name `slates-site`). The private app repo stays private.
- **GitHub Pages:** deploy from `main`, root (or `/docs` only if the repo later grows code you do not want to publish — v1 should *only* be the site).
- **HTTPS:** automatic.
- **Custom domain (recommended before freezing URLs in the app):** e.g. `slates.app` or `www.slates.app`. Until then, `https://<user>.github.io/slates-site/` is acceptable for TestFlight, but **prefer a custom domain** before Mac App Store submission so binaries do not ship a Pages path you might regret.

Stable URLs to freeze:

```
https://<canonical>/
https://<canonical>/support
https://<canonical>/privacy
```

Never reorganize those three without redirects.

---

## 13. Relationship to the app repo

| Concern | Lives in |
|---------|----------|
| Product behavior, in-app Help, User Manual copy | Private Slates app repo |
| Public marketing, FAQ, privacy, release notes for humans | This site repo |
| App Store Connect Support / Privacy / Marketing URLs | App Store Connect (not in either git repo) |
| URL string in About / Help | App repo, as a constant, **after** the public URL is stable |

Do not submodule this site into the app. Do not generate the site from `docs/feats/`. Those docs are engineering notes, not customer copy.

When the app ships a user-visible change that belongs on `/history` or FAQ, update this repo in the same calendar week — not in the same commit, because they are different repositories.

---

## 14. Privacy of the site itself

The product promise is no analytics. The site must not be the exception.

- No Google Analytics, Plausible, Fathom, pixels, or embeddable “just a font counter”
- No third-party iframes
- Self-host fonts if not using system fonts
- YouTube / tweets: don’t embed; link out
- Acknowledge in `/privacy` that **GitHub Pages** is the host and may process request metadata as part of serving the site; we do not add our own measurement

This is a feature.

---

## 15. Accessibility

Beautiful is not an excuse to fail basic access:

- Contrast: neon on near-black is usually fine for large type; check body text and footer gray
- Focus rings on App Store and mailto links
- Images: real `alt` text (“Slates on a Mac, eight colored slates in a vertical list”), not empty
- Reduced motion: honor it
- Support and privacy pages must be readable by VoiceOver in linear order
- Do not convey meaning by color alone; keep the 1–8 numerals

---

## 16. Maintenance rhythm

| Cadence | Work |
|---------|------|
| Every App Store release | Add a `/history` entry; refresh the home “What’s new” blurb |
| When support mail repeats a question | Add or tighten an FAQ answer |
| When privacy/storage behavior changes | Update `/privacy` **before** the app ships that build |
| Annually | Copyright year, App Store links, macOS version line |
| Rarely | Photography, typography, layout |

A good change is a few dozen lines in one HTML file. If a change needs a design system meeting, the site has gotten too clever.

---

## 17. Implementation plan

1. Create the public GitHub repo. Enable Pages on `main`.
2. Land `tokens.css` + a black page with the eight circles and the pitch. No photography yet. Confirm HTTPS URL.
3. Write `/support` (contact + FAQ) and `/privacy` so App Store Connect can be filled even while home is still a sketch.
4. Shoot the Mac list/focus photographs from a clean account with starter-catalog-like text.
5. Build the home scroll: tout, description, photo band, feature eight, what’s new, help, closing download.
6. 404, OG image, favicon.
7. Manual pass: mobile width, reduced motion, VoiceOver on `/support`, links in Safari and in App Review’s likely tools.
8. Point App Store Connect + the in-app About/Help URL at `/support` and `/privacy`.
9. Custom domain when the name is owned; 301 from the `github.io` host.

---

## 18. Acceptance checklist

- [ ] `/support` states how to get help (email) without scrolling on a laptop
- [ ] `/privacy` is accurate for local-first + opt-in iCloud and says there is no app telemetry
- [ ] Home communicates eight colors + scratchpad in one viewport
- [ ] Color tokens match Slates Dark accents (spot-check all eight)
- [ ] No analytics scripts in any page source
- [ ] Site is usable with JavaScript disabled
- [ ] App Store buttons (or a single “View on the Mac App Store” link) work
- [ ] 404 is on-brand
- [ ] OG preview looks like Slates, not a blank title card
- [ ] Updating FAQ is documented in `README.md` as “edit this file, commit, push”

---

## 19. Open decisions

Record the answer here when chosen; do not block v1 on them.

1. **Canonical domain** — `slates.app` vs `getslates.app` vs `github.io` path until a domain is purchased. *Interim (still open):* v1 is served at `https://mdovale.github.io/slates_site/`; README lists the three edits for moving to a custom domain.
2. **Display typeface** — system-only vs one self-hosted family. **Chosen for v1:** *Outfit*, self-hosted (SIL OFL, Latin subset, variable 100–900) in `fonts/`; body stays on the system UI stack.
3. **Home as Support URL vs `/support`.** Recommendation: freeze **`/support`** as Support URL so home can evolve as a marketing page without surprising App Review.
4. **Whether to show iOS at all** before Pocket ships.
5. **Pricing line.** “Available for Free on the Mac App Store.”

---

## 20. References

- Private app repo: product behavior, palettes in `PaletteLibrary` / Slates Dark JSON, Help email `mikedovale@pm.me`, User Manual
- Apple: App Store Connect requires a working Support URL; privacy policy URL for the listing
- App privacy copy rule: “Stored locally by default; optional iCloud sync.”
