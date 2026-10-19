# Temporary port handoff

Status: temporary continuation aid, inspected 20 October 2026. The canonical site
is this repository. The former Web Lab was a disposable design reference;
matching it is not an ongoing requirement. No external prototype checkout is
needed to continue.

## What was brought over and adapted

The migration brought six homepage sections, selected artwork/data, header,
footer and browser motion into the existing C3 Astro/Cloudflare project. See
[index.astro](../src/pages/index.astro) for composition and the
[landing-page guide](landing-page.md) for current behavior and file references.

- Kept npm, the lockfile and Cloudflare adapter; added Tailwind v4 shared styles
  while retaining scoped section/art styles.
- Replaced framework button primitives with native Astro controls in
  [Button.astro](../src/components/primitives/Button.astro).
- Reduced navigation to the single homepage and published resources; Products
  currently lists only Augur Lituus. No product, blog or standalone FAQ routes
  were brought over.
- Combined layout responsibilities in
  [PageLayout.astro](../src/layouts/PageLayout.astro); its current metadata is
  narrower than the earlier prototype's layout.
- Replaced copied icon files with explicit packaged SVG imports in
  [Icon.astro](../src/components/primitives/Icon.astro). Kept the existing DOM
  hooks and license notice.
- Added interaction-triggered mobile panel/question scrolling in
  [tabs.ts](../src/motion/tabs.ts) and
  [FaqItem.astro](../src/components/content/FaqItem.astro).

These describe the migration history and inspected implementation, not approval
of every content choice or proof of production behavior.

## Remaining decisions and review

Use the [landing-page guide](landing-page.md) as the current fact record; update
it when resolving these items rather than maintaining duplicate details here.

- Resolve the Learn More article substitution in
  [home-resources.ts](../src/data/home-resources.ts), including approval and usable
  destinations. Resolve remaining FAQ/walkthrough review flags.
- Confirm whether the current one-product navigation meets the intended scope;
  additional pages require an explicit scope decision, not prototype restoration.
- Review production metadata, indexing and security requirements. The exported
  indexing flag currently does not control the layout.
- Verify mobile reveal behavior, keyboard/focus, no-JavaScript, reduced-motion
  and accessibility states affected by the migration.
- Decide whether to keep the newsletter demonstration or scope a real provider;
  the current form does not subscribe users. Review external destinations and
  production deployment before claiming readiness.

Historical build, desktop and icon-comparison results from 19 October are
recorded in the landing-page guide. They were not rerun for this handoff and do
not establish the unchecked behavior above. No builds or tests were run for this
documentation change.

## Removal condition

Delete this document and its index entry after each item above has a recorded
decision or verification result, or has been explicitly deferred to a named
follow-up with enough context to continue. Keep lasting behavior and constraints
in the landing-page guide or the relevant code; retain useful verification
limits there. Do not keep this handoff as a permanent migration specification.
