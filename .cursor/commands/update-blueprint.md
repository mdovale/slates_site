# Update Blueprint

## Objective

Record a settled product, design, or process decision in `BLUEPRINT.md`.
This site has **no** `docs/feats/` tree; the blueprint is the public-site spec.

Use when the user chooses an open item from §19, corrects copy, adds a FAQ
topic that should be specified before HTML, or changes v1 scope.

## Invocation

Name the decision or blueprint section. If missing, ask one question:
which heading or open decision?

## Process

1. Read the relevant `BLUEPRINT.md` sections end-to-end.
2. Change **only** what was decided. Do not silently close other §19 items.
3. If an open decision is resolved, **record the answer in §19** (do not
   delete the question; write the choice).
4. Keep version/status at the top honest (`planning` until first pages ship).
5. Do not import private-app `docs/feats/` or engineering notes as public
   copy (`BLUEPRINT.md` §6.3, §13).

## Output format

```markdown
## Blueprint update

**Sections:** …

### What changed
- [bullet]

### Still open
- [§19 items untouched]
```

Then edit `BLUEPRINT.md` directly.

## Constraints

- Blueprint remains source of truth; do not rewrite it to match a hacky page.
- Do not delete historical blueprint intent; supersede in place if needed.
- English, calm, specific — same voice as the rest of the file.
