# Documentation

Documents are grouped by type. What each type is for, and how to tell them apart, is in [AGENTS.md](AGENTS.md#document-types).

- [Project overview](../README.md): Project purpose, installation and local preview commands.
- [Repository agent guidance](../AGENTS.md): Repository-wide rules for coding agents.
- [Documentation agent guidance](AGENTS.md): Document types and rules for agents maintaining this directory.

## Guides

- [Deploy](guides/deploy.md): Build, preview and deploy to Cloudflare Workers, check a deployment with `check:launch`, cut over to www.augur.net, refresh the REP supply snapshot, and the `augur-forms` Worker behind the forms.
- [Homepage designs](guides/homepage-design.md): Check every homepage design, switch the live one, make a stakeholder preview or retire a design.
- [Update the design system](guides/update-design-system.md): Upgrade the `@augurproject/design-system` package, or change a shared token or control.

## Reference

- [Homepage](reference/homepage.md): Homepage structure, build inputs, content sources, interactions and assets.
- [Contact page](reference/contact.md): The contact page, its fields and result pages, the Worker's `POST /contact` route and the swappable mail sender.
- [Hosting](reference/hosting.md): What the Worker serves: response headers, redirects, the 404 page, canonical and share metadata, the sitemap, GA4 and the static REP supply endpoints.
- [Markdown pages](reference/markdown-pages.md): Where the hand-written `.md` copy of each page and `/llms.txt` live, and keeping them in step with the page.
- [Design](reference/design.md): Read before changing identity, controls or geometry. Design references, the design-system package and the website's adaptations.

## Explanation

- [Design ownership](explanation/design-ownership.md): Why the website and the design system are separate owners, and how the site's CSS sits on top of the package.

## Records

- [Open decisions](records/open-decisions.md): Unresolved homepage, deployment and design decisions, and pending design assets.
- [Verification](records/verification.md): Dated checks and what is not yet checked.

## Content and organization

Keep each document short, scoped and actionable. Update documentation when the facts or approved decisions it describes change. Preserve unresolved decisions and verification limits. Link to existing guidance rather than repeating it.

Keep this README as a reader-facing index and shared writing guide. Index entries describe what each document covers and when to read it.

## Writing style

Write guides as instructions. Use numbered steps for ordered tasks, bullets for settings, and exact command, file and Worker names. Keep guides to steps and facts.

Write reference as current facts with file links, organized so a reader can look one up. Keep narrative and history out.

Write explanation as reasons: why the code is this way, the trade-offs and how parts fit together. Link to reference for the facts rather than restating them.

Write records with dates. State what was checked, against which revision, and what was not checked.

Add rationale to guides and reference only when leaving it out would lead a reader to make a mistake. Keep it to one sentence beside the constraint it explains; longer reasoning belongs in explanation.

Write direct, concrete language with focused sentences. Preserve exact technical terms, filenames and commands. Remove filler and repetition. These are lightweight writing principles, not formal ASD-STE100 compliance or imitation of an author's style.
