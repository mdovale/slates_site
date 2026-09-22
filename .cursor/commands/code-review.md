# Code Review

## Objective

Review the selected or staged changes against `BLUEPRINT.md` and the site
rules: static HTML/CSS, eight-slate art direction, privacy, accessibility,
and maintainability.

## Context

slates-site is a **public GitHub Pages site** for Slates (macOS scratchpad).
It is storefront + support desk + legal. Hand-authored HTML and CSS. No
framework, no analytics.

`BLUEPRINT.md` is the source of truth. Shipped pages must match it.

## Steps

1. **Identify scope**: `git diff` (or `git diff --cached` if staged). If no
   diff, review the current file or selection.
2. **Review against these dimensions**:

### Blueprint alignment
- URLs, sections, and claims match §§6–9 and §18
- No unshipped features (Pocket, IAP, App Intents, blog)
- Support email and “how to get help” above the fold on `/support`
- Privacy copy: local-first + opt-in iCloud; no telemetry

### Stack
- Still static HTML + CSS; no new build/framework/CMS
- `css/tokens.css` + `css/site.css`; tokens match §8.2
- Pretty URLs via directory `index.html`
- JS only if allowed (none on legal pages; tiny optional on home)
- `resources/` not used as the live `images/` tree

### Design
- Dark canvas, color bands, numbered circles, real photography
- Not a generic SaaS template
- Copy voice: calm, specific, short (`BLUEPRINT.md` §10)

### Privacy
- No analytics, pixels, third-party iframes, remote font CDNs

### Accessibility
- Contrast, focus rings, real `alt`, reduced motion, numerals 1–8
- `/support` and `/privacy` linear for VoiceOver

### Maintainability
- A human can edit FAQ/privacy/history with a small HTML change
- Stable `/`, `/support`, `/privacy`

3. **Prioritize**: correctness and blueprint violations first, then a11y,
   then optional polish.

4. **Output format**:

```markdown
## Code Review Summary

**Scope:** [what was reviewed]

### ⚠️ Issues & Suggestions
| Location | Issue | Suggestion |
|----------|-------|------------|
| [file] | [concise issue] | [actionable fix] |

### 📋 Blueprint alignment
- [Confirmations or drifts vs BLUEPRINT.md]

### ✅ Strengths
- [1–3 optional]

### 🔧 Optional Improvements
- [Nice-to-haves]
```

Be concise. Prioritize blueprint fidelity, privacy, and accessibility over
style nitpicks.
