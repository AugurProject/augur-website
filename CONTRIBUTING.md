# Contributing

What a change to the Augur website needs, from setup to an open pull request, including one from a fork. Content, design and code rules are in [conventions](docs/reference/conventions.md).

## Set up

Requirements, install and the dev server are in the [README](README.md#setup).

## Branches and commits

Branch names follow `type/short-description`, for example `fix/hero-one-image` or `docs/readme`.

Commit messages are plain imperative sentences, for example `Keep legacy Learn URLs useful`. Only the pull request title uses Conventional Commits.

## Pull request title

Use Conventional Commits: `type(scope): what changes`. For example:

- `feat(home): add the About scene`
- `fix(forms): keep focus on submit`
- `docs: log decisions`

## Pull request description

Use the [pull request template](.github/pull_request_template.md); GitHub fills it in when a pull request is opened on the site. Each section's comment says what it needs and whether it is optional. [Verification](#verification) and [Decisions](#decisions) below cover those two sections.

## Verification

Report what you checked and what you did not. Run `npm run build` after implementation changes; it confirms the project compiles and nothing more. Responsive, keyboard/focus, no-JavaScript and reduced-motion states are verified only by checking them in a browser. Do not add tests unless requested.

Documentation-only changes do not need a build or tests. Check the links, file paths, commands and references they touch against their sources, and report anything you could not verify.

## Decisions

If the change relies on a decision, link its entry in [docs/records/decisions.md](docs/records/decisions.md) in the Decisions section. When the change makes a decision, in the same pull request:

1. Delete its entry from [open decisions](docs/records/open-decisions.md), if it has one.
2. Append it to the end of `docs/records/decisions.md` with who decided and the source. Never edit a past entry.
3. Update the reference it affects.

## Documentation

Document types, organization and the writing guide for every Markdown file are in the [documentation index](docs/README.md#document-types).
