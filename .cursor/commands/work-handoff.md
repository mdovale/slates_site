# Work Handoff

## Objective

Pick up and execute work from a handoff in `docs/handoffs/`. Treat that file
as the task brief. Product and design authority remains `BLUEPRINT.md`.

## Invocation

```text
/work-handoff docs/handoffs/20260922_support-page-faq.md
/work-handoff
```

If the path is missing, ask once and list the 3–5 most recent handoffs.

Optional modifiers: `investigate only` · `implement` · `update handoff only`.
Default: **investigate first**, then implement unless the handoff says to stop.

---

## Steps

### 1. Resolve the handoff

Read it end-to-end. Follow links to `BLUEPRINT.md` sections and files.
**The blueprint beats the handoff** if they disagree on product/design;
say so before coding.

### 2. Extract a working brief

Goal, scope in/out, current status, settled decisions, constraints, next
actions, done-when, verify-with. If required sections from
`.cursor/rules/handoff-documents.mdc` are missing, say what is missing.

### 3. Establish session context

`git status`, branch, `git log -8 --oneline`, skim listed files.

### 4. Load applicable guardrails

Read `.cursor/rules/` files for the area (blueprint, stack, privacy, visual
design, resources, no-hacky-workarounds) **before** editing.

### 5. Plan from the handoff

Turn **Recommended next steps** into an ordered plan. Respect stop/ask
gates and out-of-scope. Do not silently close open blueprint §19 decisions.

### 6. Execute

Smallest correct change that meets success criteria. Hand-authored HTML/CSS.
If only workaround paths remain, **stop** and `/create-handoff` (or update
this one).

### 7. Verify

Use the handoff checklist plus, when pages changed:

- Preview (`python3 -m http.server`) and exercise the flow in the browser
- JavaScript disabled still works
- No analytics in page source
- `/support` help path and `/privacy` claims still match the blueprint
- Reduced motion; mobile width if layout changed

### 8. Update the handoff

Refresh current status, what was tried, next steps, files touched,
verification. Do not delete historical sections.

---

## Output format

```markdown
## Handoff work: [title]

**Document:** docs/handoffs/…
**Mode:** investigate / implement / update only
**Branch / tree:** …

### Brief
- **Goal:** …
- **In / out of scope:** …
- **Settled / do not change:** …

### Plan
1. …

### Execution
…

### Verification
- …

### Handoff updates
- **Remaining:** …
- **Next session:** …
```

## Constraints

- Do not commit, push, or branch unless the user asks.
- Do not delete docs under `docs/`.
- Do not add a framework or trackers to finish a visual task.
