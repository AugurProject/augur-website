# Maintaining documentation

Before writing or editing documentation, read and follow the shared guidance in [README.md](README.md).

## Document types

Each document has one type and lives in that type's folder. Use these terms in documents, commits and conversation.

| Type | Folder | Answers | Contains | Changes when |
|---|---|---|---|---|
| Guide | `guides/` | How do I…? | Numbered steps toward a goal | the procedure changes |
| Reference | `reference/` | What is…? | Current facts, looked up, not read through | the code or config changes |
| Explanation | `explanation/` | Why…? | Reasons, trade-offs, how parts fit together | the reasoning changes |
| Record | `records/` | What's open? What was checked? | Dated open decisions and verification results | a decision is made or a check is run |

Guide, reference and explanation follow Diátaxis; "guide" is Diátaxis's "how-to guide". Record is this project's addition for status that goes stale on purpose. Test: if a sentence becomes false or irrelevant once someone acts on it, it belongs in a record. When a decision is made, delete its record entry and update the reference it affects. Tutorials are not used.

Do not mix steps, facts, reasons and status in one document. Link to the other type instead.

## Index maintenance

Update the index when adding, renaming or removing documentation.

## Verification

Check affected links, file paths, commands and references against their sources. Report anything you could not verify. Documentation-only changes do not require builds or tests.

## External references (temporary)

Link an external source only when it is needed to verify a documented fact, and link the minimum needed. Ask the owner before adding any external link not already in the reference set in [design reference](reference/design.md). Remove this section once the owner approves a standing reference policy.
