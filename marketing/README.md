# Marketing assets

Editable source for App Store photography, listing copy, and the Slates website. This is **not** the in-app example catalog, the User Manual, or first-run copy. Those stay instructional.

There are **two lived-in desks**, not one. Load the pack that matches the shot. Do not ship a Help menu item that overwrites real slates with this content.

| Pack | Source | Generated JSON | Use |
|------|--------|----------------|-----|
| **Simple** | `slates-simple/` | `generated/marketing-slates-simple.json` | Mac App Store screenshots. Compact window, Tot-like. Brief notes that read as complete. |
| **Desk** | `slates/` | `generated/marketing-slates-desk.json` | Support website hero: List mode, window maximized. Elaborate notes; photography can frame the first screenful. |

Slot order, modes, fonts, and cycles match across packs so a photographer can switch content without relearning which color is the checklist.

## Shared voice

Keep listing, site, and screenshot captions aligned with these three lines. If you change one, change the others.

- **One-sentence pitch:** Eight color-coded scratchpads for the scraps you keep losing to a tab, a chat, or the clipboard.
- **Subtitle (App Store, 29/30):** Eight color-coded scratchpads
- **Proof points:**
  1. **Color is the map.** Eight slates, each with its own color. Drag a header; the color travels with the pad.
  2. **Capture, copy, clear.** Hold a door code or a paragraph. Copy it. Copy & Clear when it has done its job.
  3. **Quiet on purpose.** Stored on your Mac by default. Optional iCloud if you want the same pads on another Mac. No analytics.

Privacy wording must stay accurate: local by default, optional iCloud sync, no analytics. Never claim everything stays on your Mac without the iCloud caveat.

## Personas

Two desks. Same product. Do not mix names, jobs, or plots across packs.

### Simple pack — a maker’s desk (App Store)

All eight pads belong to one unnamed adult making a small personal site and keeping a reading pile: inspiration, studio codes, a dictionary, a launch board, and a Sunset palette. Not a campus engineer, not a family-weekend sitcom.

Keep the voice warm, specific, and lightly wry. Prefer a complete short note over a cropped novel. Bodies stay compact-window sized, with enough formatting to photograph.

### Desk pack — a Bay Area engineer (website)

All eight pads belong to a staff engineer on a design-systems team at a large, unnamed Bay Area company. Campus buildings, a palette-picker launch, a Point Reyes weekend, Caltrain, and a dictionary entry started after someone asked what the word was doing in the product name.

Keep the voice specific and slightly dry. Name coworkers, buildings, and trains — not a real employer. Do not use live secrets. Prefer a full, intricate pad over a cropped slogan; photography can frame the first screenful. Do not shorten bodies to fit a prescribed card or window height.

## Eight-slate outline

| Slot | Feature | Simple (App Store) | Desk (website) |
|------|---------|--------------------|----------------|
| 1 | Rich · Georgia · heading / **bold** / _italic_ / links | `01-next-week.md` | `01-thursday-standup.md` |
| 2 | Rich · Task checklist + header progress dash | `02-reading-list.md` | `02-weekend-bag.md` |
| 3 | Plain · Menlo · Copy / Copy & Clear | `03-studio-codes.md` | `03-door-codes.md` |
| 4 | Code · Menlo · highlighting + hex swatches | `04-site-tokens.md` (CSS) | `04-marquee-palette.md` (Swift) |
| 5 | Rich · Traffic Light ⚪🟡🟢✅ | `05-site-launch.md` | `05-launch-review.md` |
| 6 | Rich · Palatino · dictionary wrap + link | `06-slate-dictionary.md` | `06-slate-dictionary.md` |
| 7 | Rich · Kanban ◯◐● | `07-this-week.md` | `07-sprint-board.md` |
| 8 | Rich · Sunset palette · fences, hex, smart bullets, links | `08-sunset.md` | `08-friday-scraps.md` |

Features covered in the packs or in `copy/screenshot-script.md` (not every feature needs its own slate):

- Color-coded cards and header-drag reorder — list-view shots
- List vs focus — shot list (`⌘1`–`⌘8` into focus, `⌘\` back; `⌘L` is vertical/horizontal list)
- Rich mode — simple pack slates 1, 2, 5, 6, 7, 8; desk pack slates 1 and 6
- Fenced ``` in Rich — simple pack slate 8 (delimiters visible; interiors monospaced)
- Code + highlighting + hex literals — slate 4
- Smart bullets / checklist + header progress — slate 2 (and slate 8 in the simple pack)
- Cycles — slates 5 and 7 (Traffic Light, Kanban)
- Hex color previews — slate 4; simple pack slate 8 also has hex in Rich prose
- Links — simple pack slates 1, 6, and 8
- Copy / Copy & Clear as a use case — slate 3
- Local-first + optional iCloud — captions, not body text
- Wrap, fit-to-content, menu-bar / compact chrome — shot-list notes
- Dictionary-style rich text — slate 6 (headword, senses, etymology)

## Edit → build → load

1. Edit a body in `slates/0N-<slug>.md` (desk) or `slates-simple/0N-<slug>.md` (simple). The file **is** the slate text. No front matter.
2. Edit per-slate metadata in that pack’s `manifest.yaml` (mode, font, size, cycle, frozen `id` / `updatedAt`).
3. Rebuild:

   ```bash
   python3 scripts/build_marketing_slates.py
   ```

   or `make marketing-slates`. Pass `--pack desk` or `--pack simple` to build one. The script fails if a body is missing, indices are not `0…7`, or text exceeds the 100,000-character cap. Rich-mode fenced ``` blocks are allowed (delimiters stay visible). Pass `--check` (or `make marketing-slates-check`) to fail if either generated file is stale.
4. In a **debug or photography** Slates window, choose **File → Restore Backup…** and open the JSON for that shot:

   - App Store / compact: `docs/marketing/generated/marketing-slates-simple.json`
   - Website / maximized list: `docs/marketing/generated/marketing-slates-desk.json`

   Confirm the replace. That is the same JSON shape as **File → Save Backup…**.
5. Do not hand-edit the generated JSON. Rebuild it.

There is no shipping UI for these packs on purpose. Help → Load Example Slates… is the instructional catalog and must stay that way.

## Settings to set before you shoot

Restore Backup writes slate text and per-slate fields. It does **not** write app settings. Set these by hand (or keep a photography profile):

| Setting | Photography default |
|---------|---------------------|
| **Format → Hex color previews** | On (required for slate 4 swatches, and simple pack slate 8) |
| **View → Theme** | Light or Dark per shot; avoid Match System |
| **Appearance → Palette** | Slates Light with Light theme, Slates Dark with Dark theme (or Slates Dynamic if Theme is already set) |
| **Word wrap** (`⌘⌥Z`) | Off for the eight-slate hero; on for the dictionary focus crop |
| **Visible slates** | All eight for the hero (`⌘⌥1`–`⌘⌥8` if any are hidden) |
| **Activate with** | Dock icon for standard window shots; menu bar only for the compact-chrome shot |
| **First-run banner** | Dismissed |
| **Footer** | On for list hero (numbered glyphs); optional hide for a tighter focus crop |
| **Default cycle** | Task (clean-install default). Slates 2, 5, and 7 set `primaryCycleID` to Task, Traffic Light, and Kanban |
| **Window** | **Simple pack:** compact, Tot-like width (~380–480 pt). **Desk pack:** maximized or comfortably large, not native Full Screen unless noted |

Built-in cycle IDs are stable (`SlateCycleDefaults`). A clean install already has Task, Traffic Light, and Kanban. If a photography Mac has a custom cycle catalog that deleted those entries, restore the built-in catalog in **Settings → Bullets** before shooting slates 2, 5, and 7 — otherwise the glyphs still display as text but will not cycle or contribute to the header progress dash.

Optional per shot, not stored in the JSON:

- **Fit to content** (`⌘⌥R`) to tighten a list card
- **Collapse window** (`⌘M`) for toolbar-only chrome
- Hide individual slates for a 3–5 card crop

## Manifest fields

Required per slate: `index` (0–7), `id` (frozen UUID), `updatedAt` (`YYYY-MM-DDTHH:MM:SSZ`), `textMode`, `slug` or `file`.

Common optional fields: `title` (photography label only; not stored on `Slate`), `language`, `fontStyle`, `textSizePreset`, `lineSpacingPreset`, `fontName`, `richTextFontName`, `monospaceFontName`, `lastTextMode`, `primaryCycleID`, `customEditorHeight`, `customSlateWidth`, `colorIndex`.

`primaryCycleID` accepts `task`, `traffic-light`, `kanban`, `idea`, `priority`, `review`, `progress`, `mood`, or a UUID. Leave it `null` to use the app default.

The YAML loader is a small subset: a `slates:` list of flat mappings, `#` comments, quoted strings. Put the body in markdown, not in a multiline YAML scalar.

Pack IDs must stay unique within a pack. The two packs use different UUID prefixes (`4A4A4A4A-…` desk, `5A5A5A5A-…` simple) so they never collide if a photography window has seen both.

## Copy

| File | What it is |
|------|------------|
| `copy/app-store.md` | Mac App Store Connect paste fields |
| `copy/website.md` | Site sections only; no implementation |
| `copy/screenshot-script.md` | Photography checklist keyed to both packs |

## Out of scope

- Capturing screenshots or generating images
- Shipping a website
- Changing `StarterContentCatalog`, Help → Load Example Slates…, Help → User Manual, or first-run banner copy
- Icon / social stills (idea #24) and a live support URL (idea #26), except placeholders in the copy files
