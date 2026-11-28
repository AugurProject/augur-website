# Documentation

Documents are grouped by type. The [types](#document-types), organization and writing guide follow the index.

- [Project overview](../README.md): What the site is and where it is served, setup, project layout and where to start in the docs.
- [Contributing](../CONTRIBUTING.md): What a change needs: branches and commits, the pull request title and template, verification, decisions, documentation and merging.
- [Agent guidance](../AGENTS.md): Pointers and the few extra rules for coding agents.
- [Documentation agent guidance](AGENTS.md): Pointer for agents maintaining this directory.

## Guides

- [Deploy](guides/deploy.md): Build, preview and deploy to GitHub Pages and Cloudflare Workers, check a deployment with `check:launch`, cut over to www.augur.net, refresh the REP supply endpoints, and the `augur-forms` Worker behind the forms.
- [Update the FAQ](guides/update-faq.md): Add, change, merge or retire a question, and the quarterly review of time-sensitive answers.
- [Update the design system](guides/update-design-system.md): Upgrade the `@augurproject/design-system` package, or change a shared token or control.
- [Refresh X post snapshots](guides/refresh-x-posts.md): Update blog excerpts in a manual GitHub Actions run or locally.

## Reference

- [Conventions](reference/conventions.md): The content, design and code rules every change follows.
- [Homepage](reference/homepage.md): Homepage structure, build inputs, content sources, interactions and assets.
- [FAQ](reference/faq.md): The FAQ's entries and fields, topics, deep links and aliases, the generated `/faq.md`, structured data and the REP page's shared questions.
- [Contact page](reference/contact.md): The contact page, its fields and result pages, the Worker's `POST /contact` route and the swappable mail sender.
- [Hosting](reference/hosting.md): What the Worker serves: response headers, redirects, the 404 page, canonical and share metadata, the sitemap, GA4 and the static REP supply endpoints.
- [Markdown pages](reference/markdown-pages.md): Where the hand-written `.md` copy of each page and `/llms.txt` live, and keeping them in step with the page.
- [Ported content](reference/ported-content.md): The blog, RSS feed, Augur v2 whitepaper, fork guides, privacy and terms carried over from the old augur.net at their old URLs, how they render and how they differ from the old pages.
- [Design](reference/design.md): Read before changing identity, controls or geometry. Design references, the design-system package and the website's adaptations.

## Explanation

- [FAQ content strategy](explanation/faq-content-strategy.md): Why the FAQ is organised as it is: its audiences, topics, question selection, writing rules, layout and interaction choices.
- [Design ownership](explanation/design-ownership.md): Why the website and the design system are separate owners, and how the site's CSS sits on top of the package.

## Records

- [Decisions](records/decisions.md): Dated log of closed decisions, who made each one and where it was recorded. Append-only.
- [Open decisions](records/open-decisions.md): Questions and owner actions still open: content, analytics and headers, the forms Worker and cutover, and design.
- [Verification](records/verification.md): Dated checks and what is not yet checked.
- [FAQ research](records/faq-research.md): Sources read for the November 2026 FAQ rewrite and the 15 November audit, discrepancies found, competitor FAQs studied and what is unverified.
- [FAQ editorial audit](records/faq-audit.md): The 15 November 2026 audit: what happened to each question, which audience each answer serves, what the research changed and what the owner still has to review.
- [FAQ review](records/faq-review.md): The second review of 15 November 2026, of the 17-question FAQ: coverage by audience, a verdict on each question, a proposed structure, rewrites and UX changes, the recorded decisions they would reverse, and the outcome: which answers the owner approved and what is still open.

## Document types

Each document has one type and lives in that type's folder. Use these terms in documents, commits and conversation.

| Type | Folder | Answers | Contains | Changes when |
|---|---|---|---|---|
| Guide | `guides/` | How do I…? | Numbered steps toward a goal | the procedure changes |
| Reference | `reference/` | What is…? | Current facts, looked up, not read through | the code or config changes |
| Explanation | `explanation/` | Why…? | Reasons, trade-offs, how parts fit together | the reasoning changes |
| Record | `records/` | What's open? What was decided? What was checked? | Open decisions, the decision log and verification results, dated | a decision is made or a check is run |

Guide, reference and explanation follow Diátaxis; "guide" is Diátaxis's "how-to guide". Record is this project's addition for status that goes stale on purpose. Test: if a sentence becomes false or irrelevant once someone acts on it, it belongs in a record. Tutorials are not used.

Do not mix steps, facts, reasons and status in one document. Link to the other type instead.

## Content and organization

Keep each document short, scoped and actionable. Update documentation when the facts or approved decisions it describes change. Preserve unresolved decisions and verification limits. Link to existing guidance rather than repeating it.

Keep this README as a reader-facing index and shared writing guide. Index entries describe what each document covers and when to read it. Update the index when adding, renaming or removing a document.

Link an external source only when it is needed to verify a documented fact, and link the minimum needed. Ask the owner before adding any external link not already in the reference set in [design reference](reference/design.md). This rule is temporary, until the owner approves a standing reference policy.

## Writing style

Write each paragraph of every Markdown file in the repository as a single line. Do not hard-wrap prose; let the editor wrap it. Break lines only between blocks: paragraphs, list items, headings and code fences.

Write guides as instructions. Use numbered steps for ordered tasks, bullets for settings, and exact command, file and Worker names. Keep guides to steps and facts.

Write reference as current facts with file links, organized so a reader can look one up. Keep narrative and history out.

Write explanation as reasons: why the code is this way, the trade-offs and how parts fit together. Link to reference for the facts rather than restating them.

Write records with dates. State what was checked, against which revision, and what was not checked.

Add rationale to guides and reference only when leaving it out would lead a reader to make a mistake. Keep it to one sentence beside the constraint it explains; longer reasoning belongs in explanation.

Write direct, concrete language with focused sentences. Preserve exact technical terms, filenames and commands. Remove filler and repetition. These are lightweight writing principles, not formal ASD-STE100 compliance or imitation of an author's style.
