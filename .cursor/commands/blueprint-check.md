# Blueprint Check

## Objective

Report gaps between `BLUEPRINT.md` and the current tree. Planning vs
implementation — not a license to invent features.

`BLUEPRINT.md` wins. If HTML exists and drifts, the finding is “page is
wrong,” not “update the blueprint,” unless the user explicitly wants a
spec change.

## Steps

1. Read `BLUEPRINT.md` (especially §§6–9, §11, §17–§19).
2. Inventory the repo: pages, `css/`, `images/`, `resources/`, `CNAME`,
   `README.md`, 404, OG/favicon.
3. Compare to the implementation plan (§17) and acceptance checklist (§18).
4. Note open decisions (§19) that are still unanswered — do not pick them.
5. Note photography: which blueprint shots can be filled from `resources/`
   vs still missing (app icon, OG 1200×630, favicon).

## Output format

```markdown
## Blueprint check

**Tree state:** not started / partial / v1-shaped

### Missing (blocks App Store URLs)
- [ ] `/support`
- [ ] `/privacy`
- …

### Missing (home / identity)
- …

### Present but drifting
| Location | Blueprint | Tree |
|----------|-----------|------|
| … | … | … |

### Resources ready to export
- [shot] ← `resources/…`

### Open decisions (do not close)
- …

### Suggested next increment
- [smallest §17 step that is still undone]
```

Do not implement unless the user also asked for implementation.
