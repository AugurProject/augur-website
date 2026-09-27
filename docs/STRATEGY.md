# Website strategy implementation reference

Source: **Augur.net Strategy & Creative Direction — Internal, September 2026**.

This file is a repository-friendly implementation reference. It preserves the source document's intent and terminology; it is not permission to invent details that the strategy leaves for maintainer/reviewer confirmation.

## What the website must do

Help people understand Augur, follow progress, inspect open work, evaluate an application, find current/historical context, and review research.

Editorial priorities:

- introduce Augur Lituus and Zoltar's foundational contribution;
- give Augur Statoblast and Statoblast Trading smaller secondary entries;
- serve evaluating teams, OG Augur members, REP holders, and researchers;
- maintain `/rep/` as the guide to REP purpose, versions, and holder responsibilities;
- keep/rewrite `/learn/`;
- preserve `/blog/` as a dated archive;
- emphasize permissionless, trustless, decentralized tenets with their assumptions;
- show open-source code, public research, roadmap, use cases, source starting points, and contact;
- use prediction markets as the lead explanation, not the full definition of Augur.

## Audiences

### Teams evaluating Augur

Need application fit, operating questions, and inspectable design/implementation sources. "Unresolved" is a valid conclusion.

### OG Augur members and REP holders

Need version-aware context, REP/token guidance, fork/reporting responsibilities, and a verified next step.

### Researchers

Need the current argument, exact version/edition, assumptions, supporting evidence, and a distinction between design and implementation evidence.

## Product relationships

- **Augur** — master brand/public identity.
- **Augur Lituus** — website lead: Protocol/current paper/developer journey.
- **Zoltar** — foundational forkable primitive; oracle designs may share REP if they handle forking.
- **Augur Statoblast** — prediction markets on Zoltar.
- **Statoblast Trading** — trading interface for Statoblast.
- **Lituus Foundation** — funding/development-support role.

Augur Lituus is a finalizing oracle design. Zoltar is a forkable base layer and does not itself choose truth/canonical universe. Statoblast adds market resolution/settlement; Statoblast Trading adds the trading interface.

## Navigation and route questions

Header: Augur mark → Home; Protocol; Developers; Resources; Blog; FAQ.

Resources: Learn; REP; Research; History.

Primary header action: **How Augur works** → Protocol.

Each route answers one question; see `SPEC.md` for the route table.

## Homepage brief

The strategy asks the prototype to test this exact narrative order:

1. Orientation.
2. Why resolution matters.
3. How Augur Lituus approaches it.
4. Open work, roadmap and code.
5. Use cases and application fit.
6. Zoltar: a shared foundation.
7. From the Blog.
8. Common questions.
9. Closing action.

Important constraints:

- keep "In development" beside the introduction;
- state that work is open source and research happens in public;
- explain permissionless participation with fees/bonds/token requirements and remaining trust assumptions;
- use one scientific milestone from problem through mechanism;
- roadmap states are Completed / In progress / Next and need evidence;
- absence of logos/testimonials/adoption numbers means credibility should come from inspectable work;
- use cases are illustrative unless implementation evidence establishes support;
- Statoblast/Trading receive less weight than Augur Lituus/Zoltar;
- avoid a homepage history block, live counter, or decorative intro that interrupts the sequence.

## Developers / application fit

The central framing is: **Your application needs to know what happened before it can act.**

Possible examples in the strategy:

- prediction markets;
- insurance/payments;
- DAOs/grants;
- custom oracle designs through Zoltar.

The application defines the question and acts on the answer. Augur Lituus resolves; application settlement/business logic remains separate.

Fit assessment:

1. resolvability/criteria;
2. timing and cost;
3. safe use of the result.

Cross-chain messaging/Ethereum L1 statements must be verified against current implementation before being presented as supported.

## Proposed resolution process

1. clear question + outcomes including Invalid + query fee;
2. report with REP bond;
3. challenge window; fully funded challenge replaces answer and restarts challenge period unless fork;
4. no completed challenge → latest report final;
5. rare fork as last resort;
6. application consumes recorded answer under its own rules.

The strategy also states that no report within three days means Invalid and describes migration/auction behavior in a fork. Before publication, verify these rule details against the exact applicable design/version.

## Worked scientific example

Question: **Will room-temperature superconductivity at ambient pressure be independently demonstrated?**

The complete criteria are encoded in `SPEC.md`. Keep scientific evidence distinct from the recorded protocol outcome. Do not invent a live report/dispute/result.

## Security-model direction

Explain:

- incentives;
- participation and challenge roles;
- low participation/disagreement consequences;
- last-resort resolution/fork assumptions;
- implementation/review scope;
- application responsibilities.

The strategy's illustrative relation `M = C - B` is conditional and conceptual. It is not a probability or guarantee.

## REP direction

Lead with REP's participation role, not asset marketing.

Maintain version identity with chain, contract, on-chain name, universe, status, review date, explorer links, and applicable responsibilities.

Keep Augur v2's completed fork, Augur Lituus proposed rules, and Zoltar branch-continuation model distinct.

## Learn / Blog / FAQ

- Learn = evergreen canonical guidance; rewrite.
- Blog = dated archive/commentary/updates; preserve.
- FAQ = uncertainty resolution, then deeper route.

Blog pathways proposed: builders; research/design; project updates.

## Editorial/evidence review

Every public explanation should have evidence supporting its exact scope.

Required distinctions:

- design proposal;
- implementation/open work;
- security/research finding;
- supported integration/review;
- numerical claim.

Source records should include edition/section/commit, product/version, scope, limitations, reviewer/date, and numerical method/timing when relevant.

## Usability

The strategy requires:

- performance on modest mobile connections/devices;
- mobile-first layouts and usable touch targets;
- obvious next action;
- consistent visual/interaction language;
- readable hierarchy and line length;
- explanatory diagrams with text equivalents;
- real content in prototypes;
- core content without animation/hover/pre-interaction;
- native scrolling;
- reduced-motion support;
- keyboard/focus/contrast/text zoom/assistive-tech support;
- tables and references that reflow;
- accessible code/address Copy controls;
- status not conveyed by color alone.

## Migration

See `docs/MIGRATION.md` for the source document's route-by-route decisions and retired APIs.
