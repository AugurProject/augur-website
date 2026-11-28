# Contributing

This page covers what a pull request to the Augur website needs, including one opened from a fork. It links to the rules in [AGENTS.md](AGENTS.md) and the [documentation index](docs/README.md) rather than repeating them in full.

## Set up

Requirements, install and the dev server are in the [README](README.md#setup).

## Branches and commits

Branch names follow `type/short-description`, for example `fix/hero-one-image` or `docs/readme`.

Commit messages are plain imperative sentences, for example `Keep legacy Learn URLs useful`. Only the pull request title uses Conventional Commits.

## Pull request title

Use Conventional Commits: `type(scope): what changes`. Examples from the [pull request template](.github/pull_request_template.md):

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

What counts as checked, and what a build does and does not prove, are in [AGENTS.md](AGENTS.md#verification). Documentation-only changes follow [docs/AGENTS.md](docs/AGENTS.md#verification).

## Decisions

If the change relies on a decision, link its entry in [docs/records/decisions.md](docs/records/decisions.md) in the Decisions section. If it needs a new decision, propose it in the pull request and append the entry to the end of that log in the same pull request, saying who decided and where; never edit past entries. Questions still open are in [open decisions](docs/records/open-decisions.md).

## Content, design and code rules

Every change follows [Scope and implementation](AGENTS.md#scope-and-implementation) in AGENTS.md. Documentation changes also follow [Documenting](AGENTS.md#documenting) there and [docs/AGENTS.md](docs/AGENTS.md).

## Merging

Maintainers merge with a merge commit, not a squash or rebase, and one pull request at a time: after each merge they wait until its deploy is live and `npm run check:launch` passes against production before merging the next. The steps are in [deploy](docs/guides/deploy.md#one-deploy-at-a-time).
