# Implementation plan

The plan optimizes for one validated vertical slice at a time rather than parallel construction of every route.

## M0 — Bootstrap context

This PR.

Deliverables:

- repository authority/boundaries;
- strategy implementation reference;
- design-system pin and sync path;
- Astro/Bun scaffold;
- route placeholders matching the strategy;
- content schemas;
- migration/evidence contracts.

Acceptance:

- future implementer can determine what governs any decision without relying on chat history;
- repository does not pretend placeholder pages are production content.

## M1 — Foundation

Deliverables:

- install/sync pinned Augur theme and required primitives;
- real identity assets copied from verified upstream sources;
- site shell: document metadata, header/nav/resources menu, footer;
- final site frame/gutter composition contract;
- theme behavior;
- baseline accessibility;
- lockfile and deterministic CI;
- preview deployment;
- route/link/404 foundation.

Acceptance:

- design-system conformance is demonstrated in both themes;
- mobile navigation and keyboard path work;
- no duplicated local foundation tokens;
- no final homepage styling yet beyond shell/proof surfaces.

## M2 — Homepage vertical slice

Implement the full strategy narrative in sequence:

1. Orientation
2. Why resolution matters
3. How Augur Lituus approaches it
4. Open work/roadmap/code
5. Use cases/application fit
6. Zoltar/shared foundation + secondary Statoblast row
7. Blog preview
8. FAQ preview
9. Closing action

Use real strategy copy/content and the scientific worked question.

Acceptance should answer the strategy's prototype tests:

- newcomer can explain the purpose;
- can distinguish Augur Lituus, Zoltar, Statoblast, Trading;
- understands shared REP/fork compatibility at the intended level;
- can inspect status/research/code;
- can distinguish completed work from plans;
- can find Contact;
- repeated/redundant previews have been removed.

## M3 — Technical core

Routes:

- `/protocol/`
- `/developers/`
- `/research/`

Shared work:

- resolution-flow visual + text equivalent;
- scientific worked example;
- security-model explanation;
- application-fit assessment;
- source/evidence rendering;
- code/repository entry points;
- current implementation/status review.

Acceptance:

- claims map to exact evidence;
- proposed vs implemented behavior is visibly distinct;
- all deep routes work as direct arrivals.

## M4 — Knowledge, holders, history

Routes/content:

- `/rep/`
- `/learn/`
- `/faq/`
- `/history/`
- `/about/`
- `/blog/`

Acceptance:

- REP version identity is reviewed and source-backed;
- old and new mechanisms are not conflated;
- Learn has canonical evergreen routes;
- Blog preserves historical identity;
- About/contact/operator/funding language is reviewed.

## M5 — Migration and launch

Deliverables:

- full content inventory;
- redirects;
- retired supply endpoint 410s;
- legal page review status;
- metadata/social previews;
- sitemap/robots/canonical URLs;
- performance/image/font audit;
- accessibility/browser pass;
- broken-link/source audit;
- launch/cutover plan.

Launch gate:

- no unsupported readiness/security claims;
- maintainers confirm roadmap/product status;
- no known migration holes for important historical routes;
- production routing verified before DNS/cutover.

## Working rule

If a page exposes a missing reusable primitive:

1. ask whether it is broadly Augur-wide or site-specific;
2. keep site-specific composition here;
3. open/link an upstream DS issue for broadly reusable behavior;
4. continue with a local composition only when doing so does not fork a shared foundation rule.
