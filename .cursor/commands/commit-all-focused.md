# Commit All (Focused Plan)

Use when the working tree has **multiple** logical changes and you want them
checked in as **several small commits**, not one lump. Inspect, plan a sequence
aligned with `.cursor/rules/git-workflow.mdc`, then `git add` / `git commit`.

## Scope

- **In:** tracked modifications, deletions, renames, and untracked files that
  are not ignored.
- **Out:** do **not** `git push` unless the user explicitly asks.
- **Judgment:** skip `.DS_Store`, editor junk, secrets, and accidental
  full-resolution dumps of `resources/` into the Pages tree unless the user
  asked to track them.

## Phase 1 — Inspect

1. `git status -sb`
2. `git diff --cached`, then `git diff`
3. `git ls-files --others --exclude-standard`

If there is nothing to commit, report that and stop.

## Phase 2 — Plan

Before any `git add`, write a **short commit plan** (order + grouping +
one-line rationale). One logical concern per commit. Typical splits:

- Cursor rules/commands vs site HTML vs CSS tokens vs copy vs images
- Do not mix `BLUEPRINT.md` decision edits with unrelated page CSS
- `resources/` source art vs exported `images/` when both changed

## Phase 3 — Execute

For each planned commit:

1. Stage **only** that commit’s paths.
2. Summarize the **staged** diff; do not invent scope.
3. Write **one** plaintext fenced code block with the full message per
   `.cursor/rules/commit-message.mdc`.
4. Commit with that exact text, e.g. `git commit -F - <<'EOF' ... EOF`.
5. `git status` and continue until the planned set is committed.

After the last commit, `git status` again. Working tree should be clean for
everything you intended to include.

Do **not** run a `verify.sh` (this repo has none). Optionally grep page
source for analytics/gtag before finishing if HTML changed.

## Anti-patterns

- One giant commit of rules + HTML + photography
- Staging all of `resources/` when only two exports belong in `images/`
- Messages that do not match what is staged
