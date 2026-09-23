# Screenshot script

Photography checklist for the Mac App Store and the website. Do not generate images in-repo.

There are two packs. Use the one that matches the shot:

| Shot family | Pack | JSON | Window |
|-------------|------|------|--------|
| **App Store** | Simple | `../generated/marketing-slates-simple.json` | Compact, companion-sized (~380–480 pt wide). Notes are brief so they read as complete. |
| **Website hero** | Desk | `../generated/marketing-slates-desk.json` | Maximized (or comfortably large) vertical list. Notes are elaborate; crop the first screenful if needed. |

Do not load the desk pack for App Store frames, or the simple pack for the maximized site hero.

Shared voice (captions must not drift):

- **Pitch:** Eight color-coded scratchpads for the scraps you keep losing to a tab, a chat, or the clipboard.
- **Subtitle:** Eight color-coded scratchpads
- **Proof points:** Color is the map. Capture, copy, clear. Quiet on purpose.

Overlay titles live with the App Store fields in `app-store.md`.

## Size classes (Mac App Store)

Apple currently accepts 16:10 Mac screenshots. Preferred pixel sizes:

- 1280 × 800
- 1440 × 900
- 2560 × 1600
- 2880 × 1800

Shoot at the largest size you can without scaling UI chrome, then export the set. Do not letterbox. Do not include the menu bar of other apps, the desktop, or the Dock unless a shot is explicitly “in the menu bar.”

A website hero is a different crop: native resolution of a maximized list, using the desk pack. Do not invent a separate product.

## Load the simple pack (App Store)

1. Build if needed: `python3 scripts/build_marketing_slates.py`
2. Photography window only: **File → Restore Backup…** → `docs/marketing/generated/marketing-slates-simple.json`
3. Confirm replace
4. Apply **Settings preload** below
5. Hide the first-run banner if it appears
6. Size the window compact (~380–480 pt wide). These notes are written to look finished at that width.

## Load the desk pack (website)

1. Same build
2. **File → Restore Backup…** → `docs/marketing/generated/marketing-slates-desk.json`
3. Confirm replace
4. Same settings preload
5. Maximize or grow the window until the eight elaborate cards are the subject. Not native Full Screen unless you want that chrome.

## Settings preload (every shot unless noted)

| Control | Value |
|---------|--------|
| Theme | Dark for A, C–G; Light for B, H; never Match System while shooting |
| Palette | Slates Dark with Dark, Slates Light with Light |
| Hex color previews | **On** |
| Word wrap | **Off** except shot H |
| Visible slates | All eight except F (and optional tight crops) |
| List orientation | Vertical except G |
| Activate with | Dock icon except J |
| Footer | On except C, D, E, H if the crop is cleaner without it |
| Default cycle | Task (clean-install default) |
| Syntax theme | Built-in default (do not show a custom theme named after you) |
| Window | AppKit main window, not native Full Screen, not Fill Screen unless noted. Compact for App Store; large for the website hero |

## Do not show

- Real user slates, names, emails, phone numbers, or live secrets
- First-run banner, What’s New sheets, or “Load Example Slates” UI
- Debug menus, `#if DEBUG` flags, performance overlays, or Xcode
- Find bar, appearance inspector, or User Manual
- Unrelated windows, desktop clutter, or other app icons in the Dock crop
- iCloud “not signed in” banners
- Hidden-slate checkboxes in a confusing half-state
- Multi-cursor / extra carets (hard to read at App Store size; skip)
- The wrong pack for the shot (elaborate engineer notes in a compact App Store window, or the maker’s notes as the maximized site hero)

## Shot list (App Store — simple pack)

Names below are the simple-pack pads. Desk-pack counterparts are in parentheses for the website section.

### A. List vertical, dark, all eight

- **Window:** vertical list, all eight slates visible, compact width (~380–480 pt), tall enough that the short cards are not clipped
- **Appearance:** Dark · Slates Dark
- **In frame:** slates 1–8 (Next week → Sunset)
- **On:** hex previews (slate 4 must show swatches), wrap off
- **Action:** none; caret hidden or at rest off-frame
- **Why:** color-first identity, mixed modes in one glance, notes that look finished in a small window
- **Overlay:** Eight colors. That’s the whole map.
- **Proof point:** Color is the map.

### B. List vertical, light, all eight

- Same crop and content as A
- **Appearance:** Light · Slates Light
- **Overlay:** Same desk. Lights up.
- **Why:** light/dark pair for the store

### C. Focus, Next week

- **Window:** focus view, slate 1 (`⌘1`); return later with `⌘\`
- **Appearance:** Dark
- **In frame:** slate 1 only (Rich · Georgia · headings / bold / italic / autolinks). Crop the first screenful (title through Notes); quotes may sit below the fold
- **On:** wrap off or on — whichever keeps the heading and Notes block readable. Do not shrink type to fit
- **Not:** list peeking around the overlay; first-run chrome
- **Overlay:** One slate, full attention.
- **Note:** `⌘L` in the shipping app toggles **list orientation** (vertical/horizontal) and, from focus, returns to the list. Focus itself is `⌘1`–`⌘8` / double-click header, back with `⌘\`. Shoot both postures; do not caption `⌘L` as focus.

### D. Focus, Site tokens

- **Window:** focus, slate 4 (`⌘4`)
- **Appearance:** Dark
- **In frame:** CSS sample; hex tokens at the top (`#1c1415`, `#f6f1ea`, `#2d7a99`) with **hex previews on**. The `:root` block is the subject; `body` / `a` / dark media query may sit at the bottom of the frame
- **On:** syntax highlighting, wrap off so lines stay intact
- **Overlay:** Code, with the colors still on.

### E. Focus, Reading list

- **Window:** focus, slate 2 (`⌘2`)
- **Appearance:** Dark
- **In frame:** Task checklist in Rich; header must show the progress dash (`▓▓░` / `2/9`)
- **On:** default Task cycle (JSON sets `primaryCycleID`)
- **Overlay:** A list that clicks.

### F. List crop, Studio codes

- **Window:** vertical list **or** focus; prefer a tight list crop with slates 3–5 in frame if the hero already showed all eight
- **Appearance:** Dark
- **In frame:** slate 3 (Menlo codes) as the subject; neighboring color cards OK
- **Hide:** slates you do not need (`⌘⌥n`) so the codes stay large
- **Why:** Copy / Copy & Clear use case. Do not overlay a fake “Copied” check unless you actually click Copy and catch the 2-second confirmation.
- **Overlay:** Copy it. Clear it. Done.
- **Proof point:** Capture, copy, clear.

### G. List horizontal

- **Window:** horizontal strip (`⌘L` from vertical list)
- **Appearance:** Dark
- **In frame:** as many cards as the width allows without unreadably thin columns; 4–6 is better than 8 squeezed
- **On:** wrap off; hex previews still on if slate 4 or 8 is in frame
- **Overlay:** A strip when you want one.

### H. Focus, Slate dictionary (wrap)

- **Window:** focus, slate 6 (`⌘6`)
- **Appearance:** Light (pair with D/C so the store is not all-dark)
- **In frame:** Rich Palatino dictionary entry — headword `# slate`, pronunciation, noun senses, and the verb section if it fits. Etymology may sit at the bottom of the frame
- **On:** **word wrap on** (`⌘⌥Z`). Optionally Fit to Content is unnecessary in focus.
- **Overlay:** A word, fully set.

### H2. Focus, Sunset (optional)

- **Window:** focus, slate 8 (`⌘8`)
- **Appearance:** Dark
- **In frame:** Rich Sunset ramp — all eight background hexes in the prose (`#3e9cbf` … `#f26d50`), the fenced CSS `:root`, Task bullets, and the color-theory link. Crop so the ramp line and the fence are both visible
- **On:** hex previews; wrap off or on, whichever keeps the fence intact
- **Why:** one pad that shows palette design, Rich fences, hex, smart bullets, and links together
- **Overlay:** Prose, code, and a checklist.

### I. Settings / palette (optional)

- **Window:** Settings → Appearance, or the slate appearance panel (`⌘J`) over a dim list
- **Appearance:** match the list behind it
- **In frame:** palette grid; no custom palette named after a person
- **Not:** Editor tab syntax-theme internals unless you want a specialist shot
- **Overlay:** Pick a palette. Keep the eight.

### J. Menu bar / collapsed chrome (optional)

- **Window:** **Activate with → Menu Bar Icon**, or collapse the main window with `⌘M` (toolbar only)
- **Appearance:** Dark or Light matching the desktop you allow in frame
- **In frame:** status item plus a compact Slates window; no other menus open
- **Not:** native Full Screen
- **Overlay:** Summon it. Put it away.

## Website hero (desk pack)

Load `marketing-slates-desk.json`. Maximize the window. Vertical list, all eight, wrap off, hex previews on.

- **In frame:** slates 1–8 of the engineer desk (Thursday standup → Friday scraps)
- **Appearance:** Dark · Slates Dark for the primary hero; Light pair optional
- **Why:** the support site should show the product as a full desk, not a compact companion window
- **Do not** reuse App Store compact crops as the site hero

Optional site extras, still from the desk pack: focus on slate 4 (Swift marquee tokens) or slate 6 (full Palatino dictionary). Those pads are long on purpose; crop the first screenful.

## Suggested App Store carousel order

1. A (hero, dark list)
2. C (focus, rich)
3. D (code + hex)
4. E (checklist)
5. F (copy & clear)
6. G (horizontal)
7. B (light list) or H (wrapped dictionary)
8. I or J if you have a tenth slot; otherwise stop at 5–7 strong frames

Website hero: maximized desk-pack list. Feature grid: that hero, F (house codes or door codes), and a privacy caption — not a fake “lock” illustration.

## After the session

Restore the photography Mac’s real slates from its own backup. These packs are allowed to overwrite a window; they are not a user-facing reset.
