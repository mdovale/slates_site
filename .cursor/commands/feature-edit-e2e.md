# Feature Edit End-to-End

## Objective

Edit a specific **page or home section** with a structured design review,
blueprint alignment, and a minimal implementation. **Do not write code until
analysis is done and the user confirms** (or explicitly says to proceed).

## Invocation

The user may name a page or section (`home` tout, `/support` FAQ, `/privacy`,
`/history`, 404, footer). If ambiguous, ask: “Which page or section?”

## Context

Public static site. `BLUEPRINT.md` is source of truth. Dark canvas, eight
slate colors, real photography, short copy, no analytics, no JS framework.

---

## Phase 1: Analysis (before any code)

### Step 1 — Scope

- **Changing:** exact files/sections
- **Not changing:** adjacent pages, photography dump, domain, typeface
  unless asked
- **Boundary:** smallest HTML/CSS surface

### Step 2 — UX review

Flows, affordances, empty/error states, how App Review finds email help,
whether the section still feels like scanning eight slates.

### Step 3 — Blueprint + access checklist

| Area | Check | Status |
|------|-------|--------|
| Blueprint section | Matches the named § in `BLUEPRINT.md` | ☐ |
| Color tokens | Slates Dark accents; no invented palette | ☐ |
| Copy | Voice §10; no unshipped claims | ☐ |
| Privacy | No new third-party requests | ☐ |
| Measure / bands | Copy ~40–44rem; color full-bleed | ☐ |
| Photography | Real shots from `resources/` → `images/` | ☐ |
| Motion | Honors `prefers-reduced-motion` | ☐ |
| Accessibility | Contrast, focus, `alt`, 1–8 numerals | ☐ |
| JS policy | Works disabled; zero JS on legal pages | ☐ |

### Step 4 — Gaps (high / medium / low)

### Step 5 — Recommended fixes (what / where / why)

---

## Phase 2: Implementation plan

Files to touch, ordered steps, risks (token drift, huge PNG uploads, breaking
pretty URLs).

---

## Phase 3: Implementation (after approval)

Minimal edits. Hand-authored HTML/CSS. No new dependencies. Respect
`.cursor/rules/` (blueprint, stack, privacy, visual-design, resources).

---

## Phase 4: Verification

- [ ] Preview locally and exercise the changed flow in the browser
- [ ] JS disabled
- [ ] Related pages that share header/footer/tokens
- [ ] Mobile width if layout changed
- [ ] No analytics in source
- [ ] Blueprint §18 items that this change claims to satisfy

---

## Output (before implementation)

```markdown
## Feature Edit: [Page or section]

### Assumptions & Scope
- **Changing**: …
- **Not changing**: …
- **Boundary**: …

### UX review
…

### Blueprint + access
[Checklist with ☑/☐]

### Gap analysis
**High**: …
**Medium**: …
**Low**: …

### Recommended fixes
1. …

### Implementation plan
**Files**: …
**Steps**: …
**Risks**: …

---
Proceed with implementation? (Yes / No / Modify)
```
