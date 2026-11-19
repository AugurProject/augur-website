# FAQ research

The research behind the November 2026 FAQ rewrite ([reference](../reference/faq.md), [content strategy](../explanation/faq-content-strategy.md)). Read on 11 November 2026 unless a line says otherwise. Each answer in `src/data/faq/` names its own sources in `sources`; this record lists what was read, what conflicted and what is still unverified. Competitor links are listed at the owner's request for this research.

## Augur sources

- **This repository.** The 16 ported blog posts in [src/content/blog](../../src/content/blog/), the fork guides in [src/content/fork-guides](../../src/content/fork-guides/) (including the contract record of the Moon Fork at block 25,677,103), the Learn guides, and the shared data in [rep.ts](../../src/data/rep.ts), [links.ts](../../src/data/links.ts), [products.ts](../../src/data/products.ts), [history.ts](../../src/data/history.ts), [roadmap.ts](../../src/data/roadmap.ts) and [walkthrough.ts](../../src/data/walkthrough.ts).
- **The Augur Lituus whitepaper.** "A Bribery-Resistant Group-Strategyproof Oracle", Ryan Garner and Philip Monastirsky, January 2026, 33 pages, from the [whitepaper repository](https://github.com/AugurProject/whitepaper/tree/master/Lituus/English). The name Augur Lituus appears only in its file name and its Appendix.1 diagram. Section numbers in the FAQ's `sources` are this paper's.
- **The implementation.** [Lituus-CS](https://github.com/AugurProject/Lituus-CS): `main` at `fc7fd07` (23 July 2026) and `dev` at `a999dcc` (11 November 2026, forking merged). Solidity with Foundry; tests run in CI on pull requests; no audit report, no deployment addresses, no releases, no SDK and no LICENSE file (source files carry SPDX headers). The code wraps REP from a separately deployed Zoltar contract, which is hidden from the live site ([decisions](decisions.md#4-november-2026)), so the FAQ does not mention it.

## What the FAQ distinguishes

- **Deployed history.** Augur v1 (2018), Augur v2 (2020) and the Moon Fork, Augur v2's first fork, completed on 3 August 2026.
- **Current token.** REPv2_Yes_1 at `0xCf6A0A7826fa124B7705d6f3c675eAD76f1e540D`; REPv1, pre-fork REPv2 and REPv2_No_1 are legacy. The migration window cannot be reopened.
- **Proposed.** Everything about how Augur Lituus settles answers comes from the whitepaper and is labelled as proposed.
- **Implemented.** The core question, report and resolve flow (July 2026 milestones) and, on `dev`, forking without supply restoration.
- **Deployed for integrators.** Nothing.

## Discrepancies

- **Moon Fork migration totals.** The Moon Fork report (5 August 2026) gave 6,547,546.66 REP migrated (59.52% of 11,000,000), 6,545,760.43 of it to Yes. Those are the child tokens' total supplies. The contract migration counters give 6,398,081.41 to Yes and 1,786.23 to No, 6,399,867.64 in all (about 58.2%); the case study and the Q2 2026 report use these. The 147,679.02 REP difference is other mint and burn activity. The FAQ gives the counters, explains the difference, and gives 6,545,760.43 as REPv2_Yes_1's total supply.
- **Migration deadline.** Posts before the window gave 1 August or "August 3"; the contract deadline was 2026-08-03 01:00:59 UTC. The FAQ uses the contract's.
- **Augur's start.** Posts say Augur launched in 2015, 2016 or 2018. The FAQ follows [history.ts](../../src/data/history.ts): the crowdsale in 2015, mainnet in 2018.
- **Whitepaper and code.** The paper proposes a two-week migration window; `dev` uses 30 days. The paper doubles each challenge; `dev` uses Augur v2's bond formula (`2·total − 3·outcome`), caps each outcome at 1% of REP and rounds the first stake. `dev` also plans a two-thirds majority to win a fork, burns wrapped REP rather than REP, and expires a question three days after creation if no one reports. The paper gives no appeal-period length (its example uses a day; the code uses a day). The paper's §4.5 example uses a 15 REP fee; the code's starting base fee is 10 REP. The FAQ gives the paper's rules and labels them proposed; it listed these differences in "Are these rules final?" until that question was removed (11 November 2026).
- **Whitepaper internal.** The text doubles the previous stake; the Appendix.1 diagram doubles the total bond. The migration window is two weeks in §2.2 and "weeks" in §4.2.2. Appendix cross-references are off by one.
- **Supply restoration.** The paper mints the amount not migrated to the most popular universe (§4.2.3), which includes REP migrated to the others; an early draft of the FAQ said only "what didn't migrate" and was corrected.
- **Tokens in the code.** Lituus-CS deploys "Lituus Reputation Token" (wREP) and "Lituus Query Token" (QT) inside the protocol. The FAQ says there is no token sale or token to buy, rather than calling every Lituus-named token a scam.
- **Launch year.** 2027 comes from the homepage roadmap (`roadmap.ts`), not from a published report; the whitepaper post says releases follow readiness. The FAQ attributed the year to the roadmap until its status question was removed (11 November 2026).

## Competitor and adjacent FAQs

Read through WebFetch summaries, with the raw HTML of eight pages checked for anchors and accordions.

- **UMA.** A 56-question FAQ in [its docs](https://docs.uma.xyz/faqs) runs from basics to tokenomics, with an incentives-and-risks pair per role and a direct comparison with Chainlink. Its [bond and liveness page](https://docs.uma.xyz/developers/setting-custom-bond-and-liveness-parameters) is the most honest integrator page found. Weaknesses: uma.xyz/faq lands on a voter-only FAQ, and two official reward figures disagree.
- **Chainlink.** [FAQs](https://chain.link/faqs) are filterable by category; the [developer responsibilities page](https://docs.chain.link/data-feeds/developer-responsibilities) hands risk to integrators explicitly. Its education pages are promotional and cover only the risks of centralized oracles.
- **Polymarket.** The [resolution page](https://docs.polymarket.com/concepts/resolution) gives a numbered lifecycle with times and an outcomes table; the help centre is thinner, partly stale and never mentions contested resolutions.
- **Kleros.** The [FAQ](https://docs.kleros.io/welcome/faq) names attacks (51%, wealthy appellants, bribery) and answers them; integrators get few numbers.
- **Others.** [Pyth](https://docs.pyth.network/price-feeds/best-practices) and [Tellor](https://docs.tellor.io/tellor/using-tellor-data/integrating-tellor-data.md) give frank integrator rules; [API3](https://docs.api3.org/dapps/integration/security-considerations.html) names its multisig trust assumptions; [Reality.eth](https://realityeth.github.io/docs/html/whitepaper.html) says plainly that it does not establish truth; DIA, RedStone and Chronicle are mostly promotional; [Kalshi](https://help.kalshi.com/en/articles/13823821-market-faqs) has no dispute section; the Gnosis Conditional Tokens docs assume a trusted oracle; [Sky's token migration pages](https://developers.skyeco.com/guides/sky/token-governance-upgrade/overview) split holders from integrators.

Patterns adopted: topics named for readers' intents; one lifecycle with real numbers and a worked example; incentives paired with risks; naming attacks and answering them; an integrator checklist and failure cases; dated status ("As of"); readable per-question anchors; a "still have a question" ending; a Markdown copy. A Start here block, search, Copy link and further-reading buttons under answers were built and then removed (11 November 2026); a few links on words in the text remain. Gaps the FAQ fills that none of these did: what the last resort means for an ordinary holder, worst-case time to finality, what is optional for a token holder, and who, if anyone, can intervene.

## 15 November 2026 audit

Read on 15 November 2026 for the [editorial audit](faq-audit.md). The FAQ-practice and style links below are the ones the owner's brief supplied; other sources are named without links.

- **Augur sources re-read.** The Augur Lituus whitepaper (the PDF at `cb1ff1a` in the whitepaper repository, 27 January 2026, text extracted with `pdftotext`): Abstract, §2–§4.6, §5, §6.0–§6.4, §7.0.1, §8 and Appendix.2 and 7 in full. The Q2 2026 report, the whitepaper announcement, the reboot roadmap, Generalized Augur, the July 2026 retrospective and the first-fork announcement of 14 November 2025, in [src/content/blog](../../src/content/blog/). The Moon Fork case study and the fork path index. The Augur v2 whitepaper's "How Augur works" and "Incentives and security" in [src/content/whitepaper-v2](../../src/content/whitepaper-v2/). The old augur.net FAQ (`augur-reboot-website` at `acece3c`, 30 August 2026). The live `https://www.augur.net/faq.md`, which served the 15-question FAQ from `main`.
- **Lituus-CS.** `main` at `fc7fd07` and `dev` at `a999dcc`, both unchanged since 11 November; no releases, no LICENSE and no SECURITY.md. The code was not re-read.
- **FAQ practice.** Nielsen Norman Group's [FAQs Still Deliver Great Value](https://www.nngroup.com/articles/faqs-deliver-value/) and [UX Writing: FAQs from Practitioners](https://www.nngroup.com/articles/ux-writing-faqs/), both in full; the landing page only of the paywalled [Strategic Design for FAQs](https://www.nngroup.com/reports/strategic-design-faqs/) report; the GDS post [FAQs: why we don't have them](https://gds.blog.gov.uk/2013/07/25/faqs-why-we-dont-have-them/). Through an agent's summaries, not verbatim: Diátaxis, Google's developer style guide and Technical Writing One, A List Apart's "No More FAQs", GOV.UK's content guidance, Digital.gov's plain-language guide, NN/g's "Writing Digital Copy for Domain Experts" and RFC 3552.
- **Style references.** [DIA's FAQ](https://www.diadata.org/faq/) and homepage, in full. [Chainlink's FAQs](https://chain.link/faqs): the first 37 of about 59 questions verbatim, the rest from a summary. Chainlink's docs landing page and developer-responsibilities page, read directly. What was borrowed and avoided is in the [audit record](faq-audit.md#research-findings).

- **Trading venues.** For "Does Augur Lituus compete with Polymarket and Kalshi?": Polymarket's resolution page (`docs.polymarket.com/concepts/resolution`) says its markets resolve through UMA's Optimistic Oracle and that a twice-disputed proposal goes to a vote of UMA token holders. Kalshi's market FAQs (`help.kalshi.com`, article 13823821) say a market settles when its markets team finalizes the result from the source the market's rules name, and describe no appeal. Both read through an agent's summary, not verbatim. Neither page says the venue holds users' collateral, so the FAQ does not say so.

- **How REP tokens are named.** For "Why is there more than one REP token?": in the Augur v2 source at the deployed commit `bd13a797`, `utility/RepSymbol.sol` builds a child universe's symbol from "REPv2", the outcome and the fork index, and `migrateFromLegacyReputationToken` in `reporting/ReputationToken.sol` mints the REPv1 balance one for one. Read directly from the repository.

Findings that changed an answer:

- **Turnout is not the input that matters most.** The guarantee answer said "Turnout matters most". Recomputing the whitepaper's §6.4 formula with its most likely inputs reproduces 134%; at a responsive share of 0.58 (the Moon Fork's migration) it gives about 129%, at a premium of 1.07 about 100%, and at a false market share of 0.15 about 96%. The answer now gives the turnout and premium assumptions and makes no ranking. These figures are this audit's arithmetic, not the paper's, so the FAQ does not print them.
- **The fee controller.** The integration answer said the base fee "drifts by about 10% a month". §4.4.5 describes a hill-climbing controller that moves the fee 10% a month toward the level that maximizes REP burned; the answer now says so.
- **Augur v2 and outside use.** The v2 whitepaper bounds its security by native and "parasitic" open interest and calls the second unknowable, which is the source for "outside use of its oracle was treated as a risk". Augur v2's reporting fees went to REP holders who took part in reporting; Augur Lituus burns the unpaid part of a fee (§4.4.4).
- **Trading.** The old augur.net FAQ said no Augur-native prediction-market application had relaunched and that augur.net is not a trading interface; the live FAQ says Augur Lituus "is not a trading product". The Foundation's post of 14 November 2025 says winning shares in v1 and v2 markets are unaffected by the fork and convertible to DAI or ETH at any time.
- **Seven of the eight Learn guides are placeholders** (`placeholder: true`); only "How Augur answers a question" has content. The FAQ therefore links one Learn guide and the fork path, and carries detail it would otherwise hand off.

## Unresolved

- On 11 November 2026, www.augur.net served this repository's site (server `GitHub.com`, `Last-Modified` 11 November 2026 15:12 GMT), so the Cutover entry in [open decisions](open-decisions.md#deployment), checked 2 November, is out of date. It is left for the owner to close with a decision record.
- Whether a formal security-disclosure process or bug bounty exists; none was found.
- Whether the whitepaper's attack-cost figures have been reviewed independently. The January 2026 quarterly update mentions feedback from academics and reviewers, but no published review was found, so the FAQ calls them the authors' estimates.
- Whether winning shares in old Augur v1 markets can still be redeemed through a working interface; the FAQ relies on the Lituus Foundation's November 2025 statement.
- Whether the wallet and price-site statements still hold: CoinGecko and CoinMarketCap were last read on 11 November 2026.
- Whether any trading interface for Augur v2's contracts still works; the FAQ says only that no official one has relaunched.
- As of 15 November 2026, every answer is draft copy marked `needsReview` except the six with owner-approved wording ([reference](../reference/faq.md#entries)). The sentence that follows describes 11 November.
- Every answer is draft copy marked `needsReview`, except `rep-role`, kept word for word from approved copy. (`augur-today` and `build-today` were approved too; the first was merged into "What is Augur?" and the second extended, so both are now flagged.)
