# Augur.net website specification

Status: implementation contract derived from the September 2026 internal website strategy.

## 1. Purpose

Augur.net must help people:

- understand what Augur is now;
- understand Augur Lituus and Zoltar's relationship;
- evaluate whether the resolution approach could fit an application;
- inspect open research, code, roadmap work, assumptions, and limitations;
- find current and historical context;
- identify the applicable REP version and holder responsibilities;
- reach a maintained discussion/contact route.

Prediction markets are the lead explanatory use case because they make the need for an external outcome concrete. The site must not collapse Augur's current work back into "a prediction market website."

## 2. Audience contract

### Teams evaluating Augur

Starting question: **Could this approach fit our application, and what can we inspect today?**

Assume smart-contract/application knowledge, not Augur/oracle/REP/dispute knowledge. Define oracle, bond, challenge, finality, and other specialist terms when they first matter.

A successful visit may end with "this requirement is unresolved." Do not manufacture readiness.

### OG Augur members and REP holders

Starting question: **What changed, and which information applies to the version or token I know?**

They need version-aware REP guidance, dated historical context, and verified next steps.

### Researchers

Starting question: **What is the argument, which version does it describe, and what evidence supports it?**

They need exact paper editions/sections, assumptions, code/review evidence, and a clear distinction between design argument and implementation evidence.

### Beginner friendliness

Beginner friendliness applies across audiences. Use plain language, defined terms, worked examples, and a clear Learn entry without flattening technical qualifications.

## 3. Product hierarchy

**Augur is the master brand and augur.net is the public entry point.**

Priority:

1. **Augur Lituus** — website lead; resolution design, evidence, Protocol route, and developer journey.
2. **Zoltar** — foundational forkable primitive. Multiple oracle designs can share REP if they handle forking. Explain source/docs/code.
3. **Augur Statoblast** — prediction-market layer on Zoltar.
4. **Statoblast Trading** — trading interface for Augur Statoblast.
5. **Lituus Foundation** — funding/development-support role; identify operator in About/footer.

Technical boundary:

- Augur Lituus follows a finalizing oracle design.
- Zoltar is a forkable base layer; it does not itself decide truth or select a canonical universe.
- Augur Statoblast adds market resolution/settlement.
- Statoblast Trading provides the trading interface.
- Zoltar, Augur Statoblast, and Statoblast Trading share the Zoltar repository.

Always write **Augur Lituus** in full; do not shorten it to "Lituus."

## 4. Route contract

| Route | Reader question | Boundary |
| --- | --- | --- |
| `/` | What is Augur, and why investigate it? | Introduction and short previews; route onward. |
| `/protocol/` | How does Augur Lituus resolve a question? | Mechanism, assumptions, responsibilities, security. |
| `/developers/` | What can I explore today? | Application fit, status, code, known gaps, Zoltar. |
| `/learn/` | Where do I start? | Evergreen foundations, definitions, worked examples. |
| `/blog/` | What is new or being discussed? | Dated articles, interpretation, project updates. |
| `/research/` | Which source supports this? | Papers, discussions, editions, exact source routes. |
| `/rep/` | What is REP, which version do I hold, and what are my responsibilities? | Token identity, reporting, disputes, forks. |
| `/faq/` | Where is a direct answer? | Short answer + qualification + deeper route. |
| `/about/` | Who is behind the work and how do I reach them? | Roles, funding/operator, Contact. |
| `/history/` | How does earlier information apply? | Dated chronology, versions, original sources. |
| `/terms/` | What terms apply? | Reviewed operator/legal content. |
| `/privacy/` | What data practices apply? | Reviewed operator/privacy content. |

Header target: Augur mark → Home; Protocol, Developers, Resources, Blog, FAQ. Resources contains Learn, REP, Research, History. Primary header action: **How Augur works** → `/protocol/`.

Every core route must make sense when entered directly, without search/login/Home.

## 5. Homepage sequence

Build and test this as one narrative, not a collection of interchangeable marketing blocks.

1. **Orientation** — product category, economic-security proposition, development stage. Draft strategy headline: "The Frontier of Decentralized Truth." Keep **In development** beside the introduction. Primary routes: Protocol and current paper.
2. **Why resolution matters** — explain why an application needs an external answer and what disagreement means.
3. **How Augur Lituus approaches it** — question → report → conditional challenge → final outcome, with responsibilities and exceptions visible.
4. **Open work, roadmap and code** — inspectable research/code, roadmap states Completed / In progress / Next, revision/scope/limitations, public issues/discussions.
5. **Use cases and application fit** — prediction markets; event-dependent payments; custom oracle designs. Distinguish supported paths from possibilities under investigation.
6. **Zoltar: a shared foundation** — proposed heading: "Bring your own oracle. Share the foundation." Give Statoblast/Trading a smaller secondary row.
7. **From the Blog** — one or two useful dated entries with confirmed author and audience/topic label.
8. **Common questions** — small FAQ preview with necessary qualifications and deeper links.
9. **Closing action** — "Explore the protocol. Inspect the open work. Join the conversation." Primary route remains Protocol; include Contact and discussion route.

Do not insert a decorative introduction, live counter, or history block that interrupts this sequence.

## 6. Canonical worked example

Carry one scientific milestone through explanation:

**Question:** Will room-temperature superconductivity at ambient pressure be independently demonstrated?

The strategy defines:

- cutoff: strictly before 2027-09-08 00:00:00 UTC;
- room temperature: at least 293.15 K (20°C);
- ambient pressure: 90–110 kPa absolute during measurement;
- require zero electrical resistance within disclosed uncertainty and evidence of the Meissner effect;
- require original experimental report plus independent replication by a separate institution with no shared authors and independently prepared samples;
- both publish methods, measurements, and uncertainty before cutoff; journal articles or public preprints qualify;
- press release or levitation video alone does not;
- outcome Yes only if all requirements are met; missing replication means No;
- scientific reviewers should validate the draft definition before a market opens.

The walkthrough is explanatory. Do not invent a live market, actual report, dispute history, result, or fixed resolution duration.

## 7. Developers page

Application-fit assessment should let a team answer:

1. Can the question be resolved clearly? Define evidence, cutoff, timezone, outcomes, invalid/ambiguous cases.
2. Can the application wait and bear costs? Compare reporting/dispute timelines, fees, bonds, and application requirements.
3. Can the team use the result safely? Check implementation, assumptions, delayed/disputed/invalid handling.

Illustrative applications:

- prediction market settlement;
- insurance/event-dependent payment;
- DAO/grant release condition;
- custom oracle design through Zoltar.

The strategy describes cross-chain requests with oracle resolution and settlement on Ethereum L1 as proposed architecture; implementation evidence must verify actual chain/messaging support before the site presents it as supported.

## 8. Protocol page

Simplified proposed process:

1. Ask a clear question and define possible outcomes including Invalid; query fee in REP.
2. Anyone may report an answer backed by a REP bond.
3. Allow challenges. A fully funded challenge replaces the answer and starts another challenge period unless it triggers a fork.
4. With no completed challenge in time, latest reported answer becomes final.
5. Rare last-resort fork: holders move REP to the outcome they support; auction/supply restoration precedes final selection under the proposed rules.
6. The application uses the answer under its own rules, including Invalid handling.

Keep exceptional paths brief and link detailed rules.

## 9. Security explanation

Explain reliability through incentives, participation, disagreement resolution, implementation evidence, and application responsibility.

The strategy permits an illustrative relationship:

`M = C - B`

where C is modelled cost to corrupt and B is total attacker benefit. A positive margin only means C > B under the stated model; it is **not** a failure probability or security guarantee. Token market capitalization is not itself an attack-cost estimate.

Numerical examples require a reviewed method, version, attacker model, time horizon, units, observation time/block where relevant, and limitations.

## 10. REP page

REP means Reputation. Lead with participation/reporting/dispute responsibility before token detail.

Distinguish:

- REPv1 — legacy token;
- REPv2 — parent-universe token;
- REPv2_Yes_1 — winning child of the 2026 Moon Fork; Foundation current reference in the strategy;
- REPv2_No_1 — other live child universe.

Version records require chain, contract address, on-chain name, universe, status, review date, and explorer link. A ticker/exchange label is not sufficient identity.

Do not present REP as guaranteed passive income. Do not imply one universal fork/migration path across Augur v2, Augur Lituus, and Zoltar.

## 11. Learn, Blog, FAQ

**Learn:** dedicated evergreen hub; rewrite for the new site; "Start here" path; prerequisites, version context, review dates; one canonical guide per topic.

**Blog:** preserve dated archive, original dates, confirmed authors, audience/topic labels, and next-step routes. Historical instructions need labels/corrections where required. Commentary should link exact source edition and identify interpretation.

**FAQ:** short answer + necessary qualification + one useful deeper link. Reuse reviewed answers rather than creating drift.

## 12. Evidence/editorial contract

Every public claim should be reviewable against evidence supporting its exact scope.

Distinguish proposed design, implementation work, and measured results. Withhold or qualify incomplete claims.

Maintain a source/claim record with:

- claim;
- descriptive source title and one-line purpose;
- exact edition/section/commit;
- product/version;
- scope and limitations;
- reviewer and review date;
- for numerical claims: units, method, observation time/block, exclusions.

Use direct language. Define specialist terms when they first matter. Avoid superlatives and broad security promises.

## 13. Usability/accessibility contract

- fast, responsive, optimized media/fonts/scripts;
- mobile-first;
- obvious next step and familiar navigation;
- consistent controls/states;
- legible typography and manageable line lengths;
- diagrams explain relationships and have text equivalents;
- prototype with real content;
- core content works without animation/hover/preliminary interaction;
- native scrolling;
- respect reduced motion;
- keyboard access and visible focus;
- readable contrast and text zoom;
- assistive-technology support;
- tables/references reflow without page overflow;
- code blocks/selectable addresses have accessible Copy controls where used;
- roadmap status cannot depend on color alone.

## 14. Launch boundary

The rebuild is not complete when pages merely render. Launch readiness requires:

- route/content contract satisfied;
- migration/redirect behavior verified;
- evidence review for technical claims;
- responsive/theme/accessibility review;
- useful 404;
- retired supply APIs return explicit 410 with machine-readable retirement message;
- legal/operator/contact destinations reviewed;
- current implementation/readiness claims confirmed by maintainers.
