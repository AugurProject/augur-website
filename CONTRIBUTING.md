# Contributing

What a change to the Augur website needs, from setup to merge, including a pull request from a fork. Content, design and code rules are in [conventions](docs/reference/conventions.md).

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

GitHub fills the description with the [pull request template](.github/pull_request_template.md). Summary, What changes and Verification are required. Notes, Decisions and Credit are optional: delete the heading when there is nothing to put under it.

- **Summary:** one or two sentences on what the change does and why.
- **What changes:** the changes grouped by area. For copy changes, quote the text before → after.
- **Verification:** what you checked, against which revision, and the result: `npm run build`, `npm run check:launch`, browser checks. Say what you did not check. See [Verification](#verification).
- **Notes:** optional. Anything a reviewer or the next contributor needs: follow-ups, known issues, stacking and retargeting.
- **Decisions:** optional. The decisions the change relies on or adds. See [Decisions](#decisions).
- **Credit:** optional. Whose design, copy or review the change carries, for example "Design and copy: Melo".

## Verification

Report what you checked and what you did not. Run `npm run build` after implementation changes; it confirms the project compiles and nothing more. Responsive, keyboard/focus, no-JavaScript and reduced-motion states are verified only by checking them in a browser. Do not add tests unless requested.

Documentation-only changes do not need a build or tests. Check the links, file paths, commands and references they touch against their sources, and report anything you could not verify.

## Decisions

If the change relies on a decision, link its entry in [docs/records/decisions.md](docs/records/decisions.md) in the Decisions section. When the change makes a decision, in the same pull request:

1. Delete its entry from [open decisions](docs/records/open-decisions.md), if it has one.
2. Append it to the end of `docs/records/decisions.md` with who decided and the source. Never edit a past entry.
3. Update the reference it affects.

## Documentation

Document types, organization and the writing guide, including one line per paragraph for all Markdown in the repository, are in the [documentation index](docs/README.md#document-types).

## Merging

Maintainers merge with a merge commit, not a squash or rebase, and one pull request at a time: after each merge they wait until its deploy is live and `npm run check:launch` passes against production before merging the next. The steps are in [deploy](docs/guides/deploy.md#one-deploy-at-a-time).
