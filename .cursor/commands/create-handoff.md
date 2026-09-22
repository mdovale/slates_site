# Create Handoff Document

## Objective

Write a single handoff into `docs/handoffs/` for another agent or session.
Date-coded, lowercase slug.

## Output location and naming

- **Path:** `docs/handoffs/`
- **Format:** `YYYYMMDD_<topic-slug>.md`
- **Duplicates the same day:** `YYYYMMDDb_`, `YYYYMMDDc_`, …

## Steps

1. **Filename:** today’s date (`YYYYMMDD`) and a lowercase slug. Check
   `docs/handoffs/` for collisions; add a letter suffix if needed.
2. **Gather context** from the conversation:
   - Problem or page goal; repro steps if a bug
   - What was tried
   - Files, tokens, photography, Pages/URL constraints
   - Success criteria (blueprint section + §18 checklist items)
   - References (`BLUEPRINT.md` headings, MDN, Pages docs)
3. **Write** using `.cursor/rules/handoff-documents.mdc` (required sections;
   extended sections when they add signal).
4. **Output** the file. Do not treat the handoff as a license to change
   `BLUEPRINT.md` unless the user asked for that separately.

## Output

- One file at `docs/handoffs/YYYYMMDD_<topic-slug>.md`
- Confirm the path used
