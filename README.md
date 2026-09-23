# Slates site

The public site for Slates, eight color-coded scratchpads for the Mac:
product home, the App Store **Support URL**, the **Privacy Policy URL**,
a features tour, and release notes.

`BLUEPRINT.md` is the design and product authority. Read it before changing
how the site looks or what it says.

Hand-written HTML and CSS. No framework, no build step, no analytics.

## Pages

| URL | File | Role |
|-----|------|------|
| `/` | `index.html` | Home, with the Stage |
| `/features/` | `features/index.html` | Every feature, one chapter per color |
| `/support/` | `support/index.html` | Support URL: contact + FAQ |
| `/privacy/` | `privacy/index.html` | Privacy Policy URL |
| `/history/` | `history/index.html` | Release notes |
| any missing path | `404.html` | Not found |

Never move `/`, `/support`, or `/privacy` without redirects. App builds and
App Store Connect link to them.

## Tree

```
index.html            home
features/index.html
support/index.html
privacy/index.html    zero JavaScript
history/index.html
404.html
css/tokens.css        palette, type, layout, and motion tokens
css/site.css          everything else
js/home.js            home: warms Stage frames, digits 1-8 and Esc, the
                      Dark/Light divider, the app-icon tour
js/features.js        /features: rail tracking, palette wall, mini slate,
                      clickable bullets
js/support.js         /support: Copy address button
fonts/                Outfit (self-hosted, SIL OFL; license in fonts/OFL.txt)
images/               published exports only
images/stage/         the Stage: one laptop photo plus screen-only crops
images/features/      captures and palette stills for /features
video/                click-to-play recordings and their posters
.nojekyll             serve files as-is, no Jekyll
```

`resources/` holds the photography masters. It is gitignored, stays on the
photography machine, and is never published. `images/` gets cropped exports.

## Preview locally

```bash
python3 -m http.server 8000
```

Open <http://localhost:8000/>. Every page except the 404 works this way.

The 404 page resolves links from `/slates_site/`, the GitHub Pages project
path. To preview it exactly as Pages serves it:

```bash
mkdir -p /tmp/pagesroot && ln -sfn "$PWD" /tmp/pagesroot/slates_site
python3 -m http.server 8001 --directory /tmp/pagesroot
```

Then open <http://localhost:8001/slates_site/> (and any bad path under it).

## Deploy

GitHub Pages, **Deploy from a branch**, `main`, folder `/ (root)`. Push to
`main` and the site updates in a minute or two.

Current URL: <https://mdovale.github.io/slates_site/>

## Common edits

Each is a few lines in one file, then commit and push.

### Add or change an FAQ answer

Edit `support/index.html`.

1. Add an `<article class="qa" id="short-id">` with an `<h3>` question and
   `<p>` answers inside the right band (Your data, Everyday use, Getting
   started).
2. Add a matching link to the question list near the top of the page.
3. Update the count in that band's header (`4 questions`).
4. If it belongs on the home page, add it to the Help teasers in
   `index.html`.

Storage answers must keep the exact caveat: **Stored locally by default;
optional iCloud sync.**

### Ship a release

1. In `history/index.html`, copy the newest `<section class="band ...
   release">` block above itself, give it the next slot color
   (`slot-6`, `slot-7`, …, then wrap to `slot-1`), and write the notes.
2. In `index.html`, update the What’s new band: version and one or two
   sentences.

### Change privacy wording

Edit `privacy/index.html` and update the effective date at the top. If app
behavior around data changes, this ships **before** the app update.

### When the Mac App Store listing goes live

Every App Store slot currently reads “Coming soon” and is not a link. Find
them with:

```bash
rg -n "store-soon" --glob '*.html'
```

Replace each `<span class="store store-soon">…</span>` with:

```html
<a class="store" href="https://apps.apple.com/app/idNNNNNNNNNN"><small>View on the</small> <span>Mac App Store</span></a>
```

Then update “coming soon to the Mac App Store” in `history/index.html`.

### Move to a custom domain

1. Add a `CNAME` file with the domain and set it in the repo’s Pages settings.
2. Replace `https://mdovale.github.io/slates_site/` in canonical and Open
   Graph tags (`rg -n "mdovale.github.io" --glob '*.html'`).
3. In `404.html`, change `<base href="/slates_site/">` to `<base href="/">`.

### Every January

Update the copyright year in the footer of each page
(`rg -n "© 20" --glob '*.html'`) and re-check the macOS requirement line.

### Add or change a feature on `/features`

Edit `features/index.html`. Each chapter is a
`<section class="band chapter slot-N" id="...">` with an intro (`h2` and a
`.lead`), one `.showcase`, and a `<ul class="subs">` of sub-features.

- A sub-feature is an `<li>` with an optional `<picture class="win-shot">`
  (a window) or `panel-shot` (a Settings pane), an `<h3>`, and a `<p>`.
- Keyboard shortcuts use the same markup as the rest of the site:
  `<kbd><span aria-hidden="true">⌘J</span><span class="visually-hidden">Command-J</span></kbd>`.
- A new chapter also needs a rail link in `.rail` and, for the no-JS rail
  highlight, a `view-timeline-name` line in the Features section of
  `css/site.css`.
- New captures go in `images/features/` as WebP + JPEG, 1000 px wide,
  converted to sRGB (the masters carry display profiles). Focus-window
  crops from `resources/master-slates-simple-dockless/` are all
  `1380x1420+454+172`.

### Swap the Stage frames

The Stage is one laptop photo plus a screen-only image per state, all from
the aligned MacBook Pro 16" renders in `resources/mockups-mbp16-dockless/`.
Everything outside the screen is identical across renders, so the seams
are invisible. To replace a frame, re-export with the same crops:

```bash
# laptop photo (dark list, all eight slates)
magick dark-listv-full.jpeg -crop 5760x3600+320+560 +repage -resize 2000x base-2000.png
# one screen per state: dark-1 … dark-8, light-list, light-1 … light-8
magick dark-slate3.jpeg -crop 3968x2560+1216+960 +repage -resize 1550x dark-3-1550.png
```

Then `cwebp -q 82 -sharp_yuv` for WebP and a progressive JPEG beside it,
at 1550 and 775 wide (1000 and 2000 for the photo). The screen position
in `css/site.css` (`.screen`) is derived from those two crops; change it
only if the crops change.

### Re-encode a recording

Masters live in `resources/video/`. Crop to the window, drop audio, and
trim before the stop-recording moment:

```bash
ffmpeg -ss 0 -to 24.5 -i screen_recording_code-editing.mov -an \
  -vf "crop=1560:1680:780:150,scale=1040:-2,fps=30,format=yuv420p" \
  -c:v libx264 -preset slow -crf 20 -movflags +faststart video/code-editing.mp4
```

Recordings are click-to-play only (`controls muted playsinline
preload="none"`, a poster, and a text description beside them). Never add
`autoplay` or `loop`.

### Palette wall data

Each palette on `/features` carries its eight slots in `data-palette`
(background, header, accent, chrome, digit, and `l`/`d` for light or dark
ink). The values come from the app's built-in palette definitions. If the
app's palettes change, update those attributes; do not invent a palette.

## Rules of the road

- No analytics, pixels, cookies, third-party fonts, scripts, or embeds. The
  privacy page promises this.
- Zero JavaScript on `/privacy`. Other pages may use up to about 150 lines
  of vanilla JS, loaded with `defer`, never needed to render or read. The
  Stage, the Dark / Light switches, the mode tabs, the language picker,
  and the chapter links all work with JavaScript off.
- No storage APIs. Demos forget everything on reload.
- Motion answers the visitor: nothing autoplays or loops, and
  `prefers-reduced-motion` turns every transition off.
- Colors come from `css/tokens.css`. Do not add a ninth color.
- Photography is real product shots exported from `resources/`, never a raw
  copy of the masters.
