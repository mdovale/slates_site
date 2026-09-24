# Share cards must load from slates.works

Date: 2026-09-24
Blueprint: §11.5, §12, §19 item 1

## Current status

Implemented 2026-09-24. Canonical, Open Graph, and `twitter:image` tags
on every public page name `https://slates.works/`. The press sheet, the
404 base path, and the README match. Not deployed: LinkedIn will keep
failing until this is on `main` and the Post Inspector refreshes its
cache.

The cards exist and one of them already unfurls. Before this change, the
addresses inside the tags did not match the domain people paste.

Shipped:

- `images/og.png` (1200×630, about 321 KB) on `/`, `/support`, `/privacy`,
  `/history`, and `/press`. Dark ground, the 1–8 squares, the word Slates,
  the pitch, the app icon, and the line “For Mac · Stored locally by
  default; optional iCloud sync.”
- `images/og-features.png` (1200×630, about 180 KB) on `/features`.
- `CNAME` is `slates.works`. `https://slates.works` and
  `https://slates.works/features/` return 200.

Not done:

- Push to `main`. Until then, the live HTML still names
  `mdovale.github.io`, and LinkedIn still fails.
- Refresh LinkedIn’s Post Inspector and Facebook’s Sharing Debugger
  after the deploy. Those caches keep the old result.

Do not redraw the images. The home card is the one that showed up in
WhatsApp. This handoff does not change `BLUEPRINT.md`.

## Problem, feature, or goal

Pasting `https://slates.works` or `https://slates.works/features` into
LinkedIn’s Add media dialog shows: “We couldn’t generate a preview for
this link.” The same home URL, shared in WhatsApp, sometimes shows the
full card (image, title “Slates”, the pitch plus the iCloud line, and
the domain `slates.works`).

The goal is that any service which unfurls a link — LinkedIn, WhatsApp,
iMessage, Slack — gets that card on the first try, for the home page and
for `/features`, `/support`, `/privacy`, `/history`, and `/press`.

### Repro

1. In LinkedIn, add media to a project or post and paste
   `https://slates.works` or `https://slates.works/features`.
2. LinkedIn reports that it could not generate a preview.

Measured on 2026-09-24, requesting the URL named in `og:image`:

```
curl -sI https://mdovale.github.io/slates_site/images/og.png
# HTTP/2 301
# location: http://slates.works/images/og.png

curl -sI https://slates.works/images/og.png
# HTTP/2 200
# content-type: image/png
```

The features image does the same hop to
`http://slates.works/images/og-features.png`. The HTTP URL itself returns
the PNG. LinkedIn will not follow an image redirect onto HTTP, and when
the image fetch fails it drops the whole card. WhatsApp follows the hop,
which is why that app can show the preview. “Sometimes” there is
WhatsApp’s cache: the first share stays a bare link until a scrape
succeeds, and later shares reuse the stored card.

`https://slates.works/features` (no slash) is a separate 301 to
`https://slates.works/features/`. LinkedIn follows that one. It is not
the failure.

## Context

Pages that name the old host, each with `canonical`, `og:url`, and
`og:image`:

| Page | Image |
|------|--------|
| `index.html` | `images/og.png` |
| `features/index.html` | `images/og-features.png` |
| `support/index.html`, `privacy/index.html`, `history/index.html`, `press/index.html` | `images/og.png` |

`press/slates-about.txt` line 14 is the same old URL, in the sheet writers
copy.

GitHub Pages will keep redirecting `mdovale.github.io` to
`http://slates.works/…`. That redirect is not editable from this repo.
The fix is to stop advertising the `github.io` URL.

`theme-color` is already `#131313` (§11.5). Leave it.

There is no `robots.txt`. Nothing is blocking the crawler.

Relative links in the pages are already correct at the domain root. The
404 is the exception: Pages serves `404.html` at the missing path, so its
`<base href="/slates_site/">` resolves icons and CSS under a path that
does not exist on `slates.works`.

## Scope

In scope:

- Point `canonical`, `og:url`, and `og:image` at `https://slates.works/…`
  on the six pages above. Keep each page’s existing title, description,
  and image file.
- Put `https://slates.works/` in `press/slates-about.txt`.
- Set `404.html` to `<base href="/">` and update the comment above it.
- Update `README.md`: current URL, the custom-domain checklist (so it
  does not tell the next editor to do this again), and the 404 preview
  steps. After the base change, `python3 -m http.server` in the repo root
  is the 404 preview too. Open `http://localhost:8000/` and a bad path
  under it.
- Add `twitter:image` only if it is the same HTTPS URL as `og:image`.
  X falls back to `og:image` either way. Do not add a second picture.

Out of scope:

- A new card design. §11.5 is already met.
- `BLUEPRINT.md`, including §19 item 1. See below.
- Historical handoffs that mention the old URL.
- App Store links, analytics, or anything fetched from a third party.

## Recommended next steps

1. `rg -n "mdovale.github.io" --glob '*.html' --glob '*.txt' --glob '*.md'`
   and update the live pages, the press sheet, and `README.md`. Leave
   `docs/handoffs/` and `BLUEPRINT.md` as they are.
2. Deploy from `main`.
3. Confirm each image URL in the shipped HTML is
   `https://slates.works/images/og.png` or `…/og-features.png`, and that
   `curl -sI` on that URL is `200` with `content-type: image/png` and no
   `location` header.
4. Refresh the caches that already stored a failure or a success:
   [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/) for
   `https://slates.works` and `https://slates.works/features/`. WhatsApp
   uses Facebook’s scraper; the
   [Sharing Debugger](https://developers.facebook.com/tools/debug/) is how
   to drop a stale card. Until that cache turns over, an old WhatsApp
   thread can keep showing the previous result.

## Success criteria

- Pasting `https://slates.works` into LinkedIn produces the home card:
  the eight squares and the app icon, title “Slates”, description
  “Eight color-coded scratchpads for quick capture. Local by default,
  with optional iCloud sync.”
- `https://slates.works/features/` produces the features card already
  named in that page’s `og:image:alt`.
- The same home card appears for a fresh WhatsApp share of
  `https://slates.works`, without depending on a redirect.
- A missing path on `https://slates.works/` still shows the on-brand 404,
  with its icon and stylesheet loading.
- §11.5 unchanged: one `og.png`, dark ground, eight circles, wordmark,
  subtitle. `theme-color` stays `#131313`.
- No new third-party request (§18).

## Open blueprint decisions

§19 item 1 still lists the canonical domain as an open choice
(`slates.app` vs `getslates.app` vs the `github.io` path) and still says
the site is served at `https://mdovale.github.io/slates_site/`. That
sentence is stale: `CNAME` is `slates.works` and that host is what people
share.

Do not edit §19 in this change. Recording `slates.works` as the frozen
canonical domain is the owner’s decision. The tags have to name the host
that is already live, or LinkedIn keeps failing.

## References

- `BLUEPRINT.md` §11.5 Favicon and social, §12 Hosting and URLs, §19 item 1
- `README.md`, “Move to a custom domain”
- `docs/handoffs/20260922_v1-site.md` (why canonical and `og:*` are absolute, and why the 404 has a `<base>`)
- LinkedIn Post Inspector: https://www.linkedin.com/post-inspector/
- Facebook Sharing Debugger (WhatsApp’s cache): https://developers.facebook.com/tools/debug/
