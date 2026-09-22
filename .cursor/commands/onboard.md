# Onboard

## Objective

Bring the agent up to speed at the start of a session. Run this before
substantive work so you understand what slates-site is, that `BLUEPRINT.md`
is the only source of truth, and what is actually in the tree.

This is a **read-and-orient** pass, not an implementation task. Do not change
code unless the user also asked for work in the same message.

---

## Steps

### 1. Establish session context

Run in parallel when possible:

- `git status` and `git branch --show-current` (repo may not be initialized yet)
- `git log -8 --oneline` if git exists
- Skim the newest `docs/handoffs/` files (last 3–5 by date prefix)
- List top-level site files (`index.html`, `support/`, `css/`, `images/`) and
  whether they exist yet

Record: branch, dirty state, whether Pages files exist or the repo is still
blueprint + `resources/` only, and any handoff relevant to today.

### 2. Internalize source-of-truth hierarchy

Use this order — **never invert it**:

1. **`BLUEPRINT.md`**
2. **Shipped HTML/CSS** (must match the blueprint)
3. **`.cursor/rules/`**
4. **`docs/handoffs/`**

The private Slates **app** repo is not in this workspace. Do not invent app
internals (`slots.json`, `FocusCoordinator`, `docs/feats/`) as public copy.

### 3. Learn the product and repo map

**Slates** is a macOS scratchpad: eight color-coded slates, local by default,
optional iCloud, no analytics, macOS 13+. This repo is the **public site**:
storefront + support desk + legal. It does not replace the in-app User Manual.

| Path | Role |
|------|------|
| `/` | Product home |
| `/support` | Canonical **Support URL** (email `mikedovale@pm.me` + FAQ) |
| `/privacy` | Privacy policy |
| `/history` | Full release notes |
| `/404.html` | On-brand 404 |

**Tree (target):** `BLUEPRINT.md`, `README.md`, `css/tokens.css`, `css/site.css`,
directory `index.html` pages, `images/` (published), `resources/` (source
photography — not the live tree).

**v1 stack:** static HTML + CSS, GitHub Pages from `main`, no framework, no
required build, no analytics. Preview: `python3 -m http.server`.

### 4. Absorb non-negotiable constraints

| Constraint | Rule |
|------------|------|
| Blueprint is SoT | `.cursor/rules/blueprint-source-of-truth.mdc` |
| Static stack / JS policy | `.cursor/rules/site-stack.mdc` |
| No trackers | `.cursor/rules/privacy.mdc` |
| Eight-slate design + copy | `.cursor/rules/visual-design.mdc` |
| Source vs published images | `.cursor/rules/resources.mdc` |
| No hacky workarounds | `.cursor/rules/no-hacky-workarounds.mdc` |
| Git trunk | `.cursor/rules/git-workflow.mdc` |
| Do not delete docs/art | `.cursor/rules/no-delete-docs.mdc` |

### 5. Know the operational toolkit

**Cursor commands** (`.cursor/commands/`):

| Command | Use when |
|---------|----------|
| `onboard` | Session start (this command) |
| `blueprint-check` | Gap between `BLUEPRINT.md` and the tree |
| `feature-edit-e2e` | Page or home-section work with analysis-first gate |
| `update-blueprint` | Record a settled product/design decision in the blueprint |
| `code-review` | Review current/staged site changes |
| `create-handoff` | Blocked or needs a written continuation |
| `work-handoff` | Continue from `docs/handoffs/` |
| `commit-all-focused` | User asked to commit multiple logical changes |

### 6. Confirm working assumptions (only if needed)

Ask **one short question** only when scope is still ambiguous after steps 1–5.
Otherwise proceed with stated assumptions.

---

## Output format

```markdown
## Session Onboard

### Repo snapshot
- **Branch / git:** …
- **Working tree:** …
- **What exists:** blueprint-only / pages started / …

### What slates-site is
[2–3 sentences: public storefront + support + legal; not the app]

### Source of truth
- `BLUEPRINT.md` first; shipped HTML must match it
- [Open decisions from §19 that still apply]

### Architecture touchpoints for this task
| Concern | Owner / files |
|---------|----------------|
| … | … |

### Constraints in play
- [Only the rules relevant today]

### Suggested first reads
- [BLUEPRINT sections + files]

### Verification plan
- [Browser, JS-disabled, reduced motion, no analytics in source]

### Assumptions
- [Scope assumptions]
```

Keep the brief under ~60 lines.

---

## Constraints

- Do not modify code, docs, or git state during onboard unless the user
  combined onboard with another task (this command file may already have
  been adapted in the same request).
- Do not treat the private app repo or inherited AppKit rules as authority.
- Do not commit, push, or create branches during onboard.
