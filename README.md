# Slates site

The public site for Slates, eight color-coded scratchpads for the Mac:
product home, the App Store **Support URL**, the **Privacy Policy URL**,
and release notes.

`BLUEPRINT.md` is the design and product authority. Read it before changing
how the site looks or what it says.

Hand-written HTML and CSS. No framework, no build step, no analytics.

## Pages

| URL | File | Role |
|-----|------|------|
| `/` | `index.html` | Home |
| `/support/` | `support/index.html` | Support URL: contact + FAQ |
| `/privacy/` | `privacy/index.html` | Privacy Policy URL |
| `/history/` | `history/index.html` | Release notes |
| any missing path | `404.html` | Not found |

Never move `/`, `/support`, or `/privacy` without redirects. App builds and
App Store Connect link to them.

## Tree

```
index.html            home
support/index.html
privacy/index.html
history/index.html
404.html
css/tokens.css        Slates Dark / Slates Light palette, type, layout tokens
css/site.css          everything else
js/home.js            home only: the app-icon easter egg
fonts/                Outfit (self-hosted, SIL OFL; license in fonts/OFL.txt)
images/               published exports only
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

## Rules of the road

- No analytics, pixels, cookies, third-party fonts, scripts, or embeds. The
  privacy page promises this.
- Zero JavaScript on `/privacy`. The home page works with JavaScript off.
- Colors come from `css/tokens.css`. Do not add a ninth color.
- Photography is real product shots exported from `resources/`, never a raw
  copy of the masters.
