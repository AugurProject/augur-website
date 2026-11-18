# FAQ editorial audit

The audit of 15 November 2026, done to the owner's brief of that day ("Augur FAQ: comprehensive editorial audit and refinement"). It covers the 23 entries on `feat/new-faq-page` at `4874179`, the 15 questions then live on www.augur.net, the 27 entries that resulted, and the five questions added the same day after a review of the titles alone, and a sixth on REP's tokens, which made 33. What the FAQ is now: [reference](../reference/faq.md). Why: [content strategy](../explanation/faq-content-strategy.md). Sources: [FAQ research](faq-research.md#15-november-2026-audit). Every changed or new answer is draft copy, flagged `needsReview`, until the owner reviews it.

## What was audited

The brief names the categories Getting started, How it works, REP and Building with Augur. Those are the live site's: on 15 November 2026 `https://www.augur.net/faq.md` served the 15-question FAQ from `main`. This branch had already replaced it with 23 entries in General, Product, The Token and Builders, so the audit was done on the branch, and the live questions were checked against the result.

## Each entry

| Entry | Disposition | Reason |
|---|---|---|
| What is Augur? | Keep | Owner-approved wording; defines the protocol and states its history in two sentences. |
| What is a blockchain oracle? | Keep | Owner-approved wording. The one place the FAQ explains a basic term; it earns it by stating why the oracle is the point of failure. |
| Why a decentralized, permissionless, trustless oracle? | Refine | A real need (why the design exists) under a title that was not a question. Retitled "Why build a decentralized, permissionless and trustless oracle?", cut from 209 to about 110 words; the opening no longer repeats the oracle answer, and the arbiter point is left to the applications answer. |
| Is Augur back? | Keep | Owner-approved wording. Its trading and old-market fragments now open the trading question. |
| What are Augur's official channels? | Keep | Owner-approved list. |
| What is Augur Lituus? | Refine | Its first paragraph repeated "What is Augur?" word for word. Now a definition of the resolution layer, and the one place a non-developer learns the status: what is built, that nothing is deployed, and the roadmap year. |
| What applications can Augur Lituus power? | Refine | Three concrete cases instead of four; the catch-all "DeFi, games and cross-chain systems" bullet removed; limits kept. |
| How does Augur Lituus resolve outcomes? | Keep | Owner-approved wording. |
| How does Augur Lituus differ from other oracles such as Chainlink, UMA and Kleros? | Refine | The answer opened with a sentence about oracles in general. It now leads with what distinguishes Augur Lituus. Moved last in Product, after the terms it uses are defined. |
| How does Augur Lituus prevent false outcomes? | Replace | "Prevent" claimed more than an incentive design can. Now "How does Augur Lituus deter false outcomes?"; the attention caveat moved to the guarantee answer, which owns the limits. Placed after "What is a fork?", whose terms it uses. |
| What is a fork? | Refine | It did three jobs: define a fork, recount the Moon Fork and warn about future forks. The Moon Fork became its own question. |
| Does Augur Lituus guarantee correct outcomes? | Refine | Assumptions named. "Turnout matters most" removed: recomputing the whitepaper's formula shows turnout moves the estimate least of the three inputs tested ([research](faq-research.md#15-november-2026-audit)). |
| Can the Lituus Foundation or the developers override an outcome? | Refine | Tightened; facts unchanged. |
| What role does REP play? | Keep | Approved copy. |
| Which REP token is current? | Refine | Absorbs the ticker question. |
| Is AUGUR the same token as REPv2_Yes_1? | Merge | Into "Which REP token is current?", which already said the address identifies the token, and "Where can I buy $REP?", which already names the ticker. Its id opens the first. |
| Where can I buy $REP? | Keep | Added by the owner on 15 November. |
| Why do some wallets and price sites display REP incorrectly? | Refine | Trimmed; the Etherscan notice detail removed. |
| How is REP used in Augur Lituus? | Replace | The answer opened "Holding REP does not generate income", which is not what the question asked. Now "Does holding REP earn rewards?", the question holders ask. |
| What happened to REP held before the Moon Fork? | Keep | The most consequential answer for a holder; unchanged. |
| Can developers build with Augur Lituus today? | Keep | Unchanged. |
| How would an application integrate Augur Lituus? | Refine | The fee controller stated precisely; one sentence added on what an integration must handle (Invalid, delay, a fork). |
| How should bugs and security vulnerabilities be reported? | Keep | Low traffic, but the only next step for a security researcher, and it is honest that no policy exists. |

Added: "How does Augur Lituus differ from Augur v1 and v2?", "Can I trade on Augur today?", "How long does Augur Lituus take to finalize an outcome?", "What happens if a question is ambiguous or cannot be answered?" and "What was the Moon Fork?".

## Five questions added after a review of the titles

After the audit, the owner asked whether a reader would bring a question that no title answers. Reading only the 27 titles as each audience would scan them, five were missing, each answered until then by a sentence inside another answer. The owner asked for all five.

| Question | Who asks it | Where it was buried |
|---|---|---|
| Is Augur Lituus live? | Every audience | "What is Augur Lituus?" and a Builders question. It also says that no audit is published and no application uses it. |
| Who is behind Augur? | Partners, press, the original community | "Is Augur back?", whose title does not signal it. |
| Does Augur Lituus compete with Polymarket and Kalshi? | Newcomers, traders, press | Nowhere as a question: no title mentioned prediction markets, and the comparison named only oracles. |
| What does Augur Lituus mean for REP holders? | REP holders | Nowhere. The Foundation said on 21 July 2026 that it would address it in a future post. |
| How much value can Augur Lituus secure? | Skeptics, integrators | One bullet in the guarantee answer. |

A sixth followed at the owner's request: "Why is there more than one REP token?", in The Token after "Which REP token is current?". It answers a holder who sees REPv1, REPv2, REPv2_Yes_1 and AUGUR on explorers and price sites. To avoid reading as a list of tokens, it says first that one REP is current at a time, gives each earlier token the event that replaced it, explains the current token's name from the Augur v2 contract that builds it, and says that a ticker is a label, not a further token.

"What is Augur Lituus?" gave its status sentences to the new status question and is back to a definition. Not added: whether holders must act now and whether an application's users need REP became sentences in the new answers; the cost of a question and REP's total supply were left where they are.

## The live site's 15 questions

"Is Augur still a prediction market?" is answered by "What is Augur?" and the v1 and v2 question. "Where can I trade on Augur?" returns as "Can I trade on Augur today?". "What if the question cannot be answered?" returns as the ambiguous-question entry. "Who decides whether an outcome is true?" and "What if people disagree about the result?" are "How does Augur Lituus resolve outcomes?" and the finality question. "Why would REP holders choose the honest fork?" is in "What is a fork?" and the guarantee answer. "What can I do with REP?" and "Do I earn anything just for holding REP?" are "Does holding REP earn rewards?". "How do I talk to the team about a project?" is in the channels list. The rest kept their subjects.

## Audience coverage

| Audience | What they need | Answered by | Left to other pages |
|---|---|---|---|
| Original Augur community | Whether Augur is back and who runs it; what changed since v1 and v2; whether the old markets still work; what the fork was | Is Augur back?; Who is behind Augur?; the v1 and v2 question; Can I trade on Augur today?; What was the Moon Fork? | Augur's 2018–2025 history, on `/about/` and the blog |
| Newcomers | What Augur is; the problem it addresses; how outcomes are established; what is distinctive; how it relates to the venues they know | What is Augur?; What is a blockchain oracle?; Why build…?; What is Augur Lituus?; How does Augur Lituus resolve outcomes?; the two comparisons | A worked example, linked from the finality answer |
| REP holders | Which token is current; what happened to unmigrated REP; whether holding earns anything; what Augur Lituus changes for them; what a future fork requires; where to buy and why wallets misreport | Which REP token is current?; What happened to REP held before the Moon Fork?; Does holding REP earn rewards?; What does Augur Lituus mean for REP holders?; What is a fork?; Where can I buy $REP?; the wallet answer | The token's mechanics in full, on `/rep/` |
| Traders | Whether there is anywhere to trade; whether Augur Lituus is a venue; how a market's outcome is settled, how long it takes and what happens to an ambiguous one | Can I trade on Augur today?; the Polymarket and Kalshi question; Is Augur Lituus live?; How does Augur Lituus resolve outcomes?; the finality question; the ambiguous-question entry | The Foundation-funded prediction market, hidden from the site for now |
| Developers and integrators | What it provides and for which questions; trust assumptions; how much value it can carry; cost and latency; whether it can be used now | What is Augur Lituus?; Is Augur Lituus live?; the applications answer; the ambiguous-question entry; the finality question; How much value can Augur Lituus secure?; the two Builders answers; the guarantee answer | Interfaces, in the Lituus-CS repository; there is no integration guide yet |
| Security researchers | Whether an outcome can be wrong; what an attack costs and on which assumptions; how much value the design can secure; who has privileged authority; how to report | The deter, value, guarantee and override answers; What is a fork?; the security-reports answer | The derivations, in the whitepaper |
| Partners and observers | Who develops and funds Augur; the Foundation's power; direction and progress; how to engage | Who is behind Augur?; Is Augur back?; Is Augur Lituus live?; the override answer; the channels list | Quarterly reports, on the blog |

## Research findings

- **Nielsen Norman Group.** "FAQs Still Deliver Great Value" (read in full): questions come from what users ask, in their words; group by topic; link to the full resource instead of copying it; readers judge a FAQ by whether it admits what the product does not do yet. "UX Writing: FAQs from Practitioners" (read in full): lead with the answer; jargon only where the audience uses it. The "Strategic Design for FAQs" report is paywalled: only its landing page was read.
- **GDS, "FAQs: why we don't have them".** Question headings hide the key word, and FAQs duplicate content that belongs elsewhere. Applied as: no entry that only restates another page, and titles that carry their subject ("the Moon Fork", "Invalid", "v1 and v2").
- **Other sources.** Diátaxis (an answer that is hard to write usually mixes two types); Google's developer style guide (one name per thing); NN/g's "Writing Digital Copy for Domain Experts" (experts scan too, and explaining basics tells them the page is not for them); RFC 3552 (state the assumptions security rests on and the residual risk); A List Apart's "No More FAQs" (invented and marketing questions). Applied as: one term per thing ("response window" replaced a second term, "appeal period"), assumptions listed by name in the guarantee answer, and no question that exists to carry a message.
- **DIA.** 29 questions in five categories (General, Use Cases, Product, Token, DAO). Worth borrowing: a definition first with the term expanded, a component list with one line each, a stage-by-stage lifecycle, direct "Yes" answers with a date or figure. Avoided: superlatives ("unmatched", "the only oracle", "the broadest"), figures that disagree between answers, and no statement of a limit or risk anywhere.
- **Chainlink.** About 59 questions in eight filters; `chain.link/faqs` was read verbatim for the first 37. Worth borrowing: definition first, a worked numeric example, "because" and "as a result" linking a constraint to its consequence, problem then mechanism then application. Its developer-responsibilities page names what the oracle does not control and assigns each risk to the integrator; the integration answer's last sentence follows it. Avoided: "industry-standard", "market leader" and its 300-word answers.

## What changed

- **Removed or merged.** One question, the ticker, merged into two that already answered it.
- **Rewritten.** Twelve answers, listed above. Two questions were replaced because the title and the answer disagreed.
- **Added.** Five questions in the audit, and five more after the review of the titles. Of the first five, four restore subjects the owner removed on 11 and 13 November (trading, the comparison with Augur v2, time to finality, Invalid), because the brief names them as needs of traders, the original community and integrators. The fifth splits the Moon Fork out of "What is a fork?".
- **Order.** Product now follows a question's life, then forks, then the trust questions, then the comparison. The Token leads with what REP does and whether holding it earns anything.
- **Length.** 33 answers and about 3,800 words, against 23 and about 3,000. The average answer fell from 130 words to 116; nine are under 100. The longest are the mechanism and trust answers. They cannot shrink further without a page to hand the detail to: seven of the eight Learn guides are placeholders.
- **Links.** Eleven on words in answers, up from five. New: the worked example, the fork preparedness guide, the whitepaper a second time, Discord for old-market shares, the About page's roles and the blog from the status answer.

## For the owner

- **Decisions reversed.** Four removed subjects are back, and forks now have three questions, not two. Each is in [decisions](decisions.md#15-november-2026).
- **The Foundation-funded prediction market.** The trading answer would be more useful if it could say that one is in development. It does not, because that work is hidden from the site.
- **The 2027 roadmap year** in "What is Augur Lituus?" comes from the homepage roadmap, not from a published report.
- **Old-market redemption** rests on the Foundation's statement of 14 November 2025; whether a working interface exists was not checked.
- **"No official trading application has relaunched"** rests on the old augur.net FAQ of 30 August 2026 and the live FAQ.
- **Wallet and price-site status** (CoinGecko, CoinMarketCap) was last read on 11 November and not re-read.
- **Overlap to settle.** "Who is behind Augur?" repeats two facts from the approved "Is Augur back?", and "Is Augur Lituus live?" repeats one sentence of "Can developers build with Augur Lituus today?". Neither pair was merged, because one of each is approved copy.
- **Polymarket and Kalshi** are described from their own documentation, read on 15 November 2026. The title names Augur Lituus because the Foundation also funds a prediction market, so "Augur" alone could not answer No.
- **Product has 13 questions**, the longest section.
- **Not done.** The six owner-approved answers were not edited, though "What is a blockchain oracle?" (143 words) and "How does Augur Lituus resolve outcomes?" (156) are the longest in their sections, and the latter does not say what happens when stakes reach the fork threshold.
