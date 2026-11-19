# FAQ review

The second review of 15 November 2026, done to the owner's brief of that day for an editorial, content-strategy and UX review with proposals only. It covers the 17 entries in the working tree of `feat/new-faq-page` (`4874179` plus uncommitted changes), read in `src/data/faq/` and on the dev server. Nothing on the FAQ was changed. The earlier audit of the same day is in the [audit record](faq-audit.md), and the decisions made after it are in [decisions](decisions.md#15-november-2026). Every "Proposed" text below is a draft for discussion, not approved copy.

## Outcome

On 15 November 2026 the owner asked to see the proposed answers, was shown the 17 new or changed texts, and approved them; they were applied the same day ([decisions](decisions.md#15-november-2026)). The FAQ now has the 21 questions in three sections proposed below. The rest of this record is the review as written, before that. What was applied differs from it in four places:

- "Is Augur back?" and "Who is behind Augur?" were not re-sorted. Moving ChainSafe and Dark Florist under "Who is behind Augur?" would have undone the placement the owner chose for Dark Florist, so the proposal was withdrawn; "Is Augur back?" gained one sentence on the Moon Fork instead.
- "What does Augur Lituus's security depend on?" was approved as "What secures Augur Lituus?", with a shorter answer.
- "What is $REP's role in Augur?" kept the owner's approved text with one sentence corrected, not the rewrite proposed below.
- The proposed last sentence of "Why is there more than one REP token?", "The REP page lists each token's contract address", was wrong: the REP page gives the current token's address only. The sentence was corrected after approval, and the owner approved the correction the same day.

The page changes under [UX](#ux), items 1, 5 and 6, and action-plan items 13 and 17 were not put to the owner and are [open](open-decisions.md). Old fragments (item 2) and links (item 3) were applied with the answers.

## Summary

- The page is well built and consistently voiced, and after the cuts of 15 November it is too narrow. It serves newcomers and partners. It leaves REP holders, traders, developers and skeptics without their first question.
- The questions with the best evidence of being asked are the ones that were removed. Production answers six subjects today that this branch would drop: trading, how an outcome is decided, disputes, unanswerable questions, wallet display and unmigrated REP.
- Five answers describe the proposed Augur Lituus design in the present tense, as if it were deployed.
- One answer is inaccurate against the whitepaper: "What is $REP's role in Augur?" says fees reward stakers and omits that most of each fee is burned, which is the paper's stated source of REP's value.
- Four of the 17 entries are two duplicate pairs, and one section holds a single question.
- The proposal is 21 questions in three sections, about 1,500 words: two merges, six short additions, nine refinements, and one rule for mechanism (a clause, then a link).
- Several proposals reverse decisions recorded on 11, 13 and 15 November. They are listed under [Decisions this would reverse](#decisions-this-would-reverse) so the owner can accept or decline each.

## Overall assessment

### What works

- **Direct answers.** Every closed question opens with Yes, No, Not yet or Not passively, and "What is Augur?" comes first for a reader who arrives from a search. Both are NN/g guidelines (35 and 15 in the report).
- **Four answers match the references' best.** "What is a blockchain oracle?", "How does Augur Lituus differ from Augur v1 and v2?", "Does Augur Lituus compete with Polymarket and Kalshi?" and "Does holding $REP earn rewards?" each state a distinction or a mechanism and stop. They should stay as they are, apart from one clause in the last.
- **The engineering.** Native disclosures that work without JavaScript, a link per question, old fragments that still resolve, print, a generated `/faq.md`, and sources and a review date on every entry. This meets the NN/g accessibility and SEO guidelines that most FAQs fail (65, 70, 71, 83).
- **No search.** Correct for a page this size; see [UX](#ux).
- **Voice.** Third person, no contractions, and none of the superlatives DIA and Chainlink use, with the two exceptions below.

### What is weak

1. **Question selection follows what the project wants to say, not what readers ask.** NN/g's first content rule is to use real questions in the users' vocabulary, and GOV.UK's test is that a need has evidence and was not written to justify existing content. The evidence available here points at the removed questions. About 4.6 million REP, 42% of the original supply, did not migrate in the Moon Fork (Q2 2026 report), and the report addresses those holders directly. The old augur.net FAQ's anchors survive as aliases: "I didn't migrate in time", "the new token doesn't appear in my wallet", "someone offered to migrate or recover my REP". All of them now open "Why is there more than one REP token?", which does not say whether anything can be done. On 15 November 2026 `https://www.augur.net/faq.md` listed 15 questions, including "Where can I trade on Augur?", "Who decides whether an outcome is true?", "What if people disagree about the result?", "What if the question cannot be answered?" and "I didn't move my REP in the Moon Fork. Can I still?". Merging this branch would remove those answers from the live site.
2. **Planned behaviour in the present tense.** "Anyone can ask a question for a fee in $REP", "Every question submitted to Augur Lituus pays a fee in $REP", "A holder stakes $REP on the outcome of a question", "Augur Lituus supplies the result" and "no one has the authority to change an outcome" all describe a protocol with no deployment. Only "Is Augur Lituus live?" says otherwise. The content strategy's own rule is that each answer stands alone, and the page emits each answer separately as FAQPage structured data and in `/faq.md`, so a search engine or an assistant will quote these sentences without the status answer beside them. The most material case is "Does holding $REP earn rewards?": a buyer can read it as a way to earn today.
3. **Assertion where the reader needs a reason.** "Trustless, permissionless and censorship-resistant" and "trustless, decentralized and permissionless" are the stacked adjectives that weaken DIA's FAQ. "Designed to make lying cost more than ever before" is a slogan whose only basis is the whitepaper authors' estimate against Augur v2. Chainlink's strongest answers earn confidence the other way, with a number or a mechanism: its staking FAQ gives amounts, caps and cooldown periods, and its oracle-network answer walks through one aggregation with a node count.
4. **Duplication.** "Is Augur Lituus live?" and "Can developers build with Augur Lituus today?" give the same three facts and the same two links. "Is Augur back?" and "Who is behind Augur?" share the Foundation, its origin, the treasury and the year. "Does $REP have a MiCA white paper?" is 13 words that belong to the buying answer. NN/g guideline 22 asks for pruning so that no duplication happens.
5. **No handoff.** The decision of 15 November was that mechanism belongs on the product page. The product page carries four sentences on Augur Lituus and none of the seven parked answers, and seven of the eight Learn guides are placeholders. The FAQ's five inline links outside the channels list go to two destinations, the blog three times and GitHub twice. No answer links the REP page, the Moon Fork case study or the one finished Learn guide, and the word "whitepaper" does not appear on the page. NN/g guidelines 46 and 47 ask for hypertext answers that use the content that already exists.

### One rule for mechanism

The brief asks for mechanisms in place of promotional claims. The owner's instruction of 15 November was no mechanism in FAQ answers. Both hold under one rule: **a clause of mechanism, then a link.** An answer gives the reason its claim is true in one sentence and links the page that carries the walkthrough. It does not narrate rounds, thresholds or universes. "No admin key, governance vote, multisig or veto" is already such a clause. "Trustless, decentralized and permissionless" is not.

For limits, the same economy: one answer states what the design's security depends on, attributed to the whitepaper, and no other answer carries caveats. NN/g's report lists what a reader judges an FAQ by, and two items are whether it reads as factual or as marketing and whether it acknowledges the limitations everyone knows about. Neither DIA nor Chainlink states a limit anywhere, which is where this FAQ can be better than both.

## Audience coverage

| Audience | What they come to find out | Answered now | Missing |
|---|---|---|---|
| Newcomers | What Augur is; what an oracle is; how an outcome gets resolved; whether it can be used | The first two, well; status of Augur Lituus | How resolution works beyond one sentence; whether there is anything to trade |
| Original community | Whether it is back and who runs it; what changed since v1 and v2; whether trading and old markets still work; what happened to their REP | Back, who, and the v1 and v2 difference | Trading and old markets; unmigrated REP |
| REP holders | Which token is current and how to verify it; whether unmigrated REP can still be converted; what REP does and earns; whether holding ever requires action; where to buy | Role and earning; the lineage names the current token; two exchanges | That migration is closed, the highest-stakes fact for a holder; the fork obligation; the ticker and address a buyer needs; that nothing has been announced for launch |
| Traders | Whether they can trade; whether Augur Lituus is a venue; how a market that uses it would resolve and be disputed | That it is not a venue | Trading status; resolution and disputes |
| Developers | Whether they can build; the question format and interface; where the design and code are; what it secures | Status and the code link, twice | Question format and interface; a link to the whitepaper; audit status |
| Researchers and skeptics | What secures an outcome; what an attack costs and on which assumptions; who can intervene; what has been tested | Who can intervene, as an assertion | Everything else. No answer says what the security depends on |
| Partners | Who funds and builds; progress and timing; how to engage | All three, spread over four answers | Nothing essential |

Two audiences are served, two are half served, and three are not. The gaps are not evenly weighted: a holder who believes old REP can still be converted, or who buys the wrong token, loses money, so those two come first.

## Each question

| Question | Verdict | Reason |
|---|---|---|
| What is Augur? | Refine | The definition is strong. The second paragraph repeats "What is Augur Lituus?" and ends on the slogan and the adjective stack. Replace both with the specific claim. |
| What is a blockchain oracle? | Keep | The best explanatory answer on the page, and the only one that teaches a concept. At 144 words it fills a phone screen (812px at 375px wide), so a trim of the third paragraph is optional polish. |
| Is Augur back? | Refine | Carries who builds Augur Lituus, which the next question's title promises. Make this one the dated status: restarted March 2025, design published January 2026, in implementation, where to follow. |
| Who is behind Augur? | Refine | Currently the Foundation only, while ChainSafe and Dark Florist are named one question earlier. Move the builders here so each title delivers what it says. |
| How does Augur Lituus differ from Augur v1 and v2? | Keep | Clean and complete. Moves to the Augur Lituus section. |
| Does Augur Lituus compete with Polymarket and Kalshi? | Keep | Direct, specific and not promotional. Moves to the Augur Lituus section. |
| What are Augur's official channels? | Keep | Add one line that Augur and the Foundation do not send direct messages first; the list's job is to say what is official. |
| What is Augur Lituus? | Refine | Tense, and it should be the router to how the design works: add "under its design" and a link to the whitepaper. |
| Is Augur Lituus live? | Keep, absorb | Absorbs "Can developers build with Augur Lituus today?". Add that nothing is deployed on mainnet or a testnet and that testing and audits come before launch, which is what a developer or partner is checking. |
| What applications can Augur Lituus power? | Refine | Worded from the project's side. "What can Augur Lituus be used for?" is the reader's wording. State the capability precisely: multiple-choice questions about verifiable outcomes. Tense. |
| Can the Lituus Foundation or the developers override an outcome? | Refine | The right question with the right first word. Replace the adjective sentence with what does set an outcome, and say that the Foundation takes part only as a REP holder. |
| What is $REP's role in Augur? | Refine | Inaccurate against the whitepaper; see [Accuracy](#accuracy). Also tense, and two value statements that read as promotion. |
| Does holding $REP earn rewards? | Keep | The page's best Token answer. One clause: that this describes the Augur Lituus design and is not available today. |
| Why is there more than one REP token? | Refine | Add that the Moon Fork's migration is closed, link the Moon Fork and the REP page, and bring "will use it and no other" back to what has been published. |
| Where can I buy $REP? | Refine, absorb | Names exchanges without the identifier a buyer needs. Kraken's ticker is AUGUR, not REP, and earlier REP contracts still exist. Absorbs the MiCA question. |
| Does $REP have a MiCA white paper? | Merge | Into the buying answer. The reader's question is whether REP is available in Europe; the white paper is the project's term for the obstacle. |
| Can developers build with Augur Lituus today? | Merge | Into "Is Augur Lituus live?". The same answer twice. |

There is no outright removal. The page was cut hard on 15 November and has no filler left; its waste is the two duplicates.

### Add

| Question | Serves | Why it earns a place |
|---|---|---|
| Can I trade on Augur today? | Original community, traders, newcomers | The first question of anyone who knew Augur as a prediction market. Production answers it today. Removed on 13 and 15 November. |
| How does Augur Lituus resolve an outcome? | Newcomers, traders, developers, skeptics | The one "how it works" title, needed by four audiences. About 75 words and a link, not the parked 156-word walkthrough. |
| What does Augur Lituus's security depend on? | Skeptics, developers, partners doing diligence | The only answer for the skeptic audience. Merges the parked deterrence, value-secured and guarantee answers into about 85 words with the whitepaper link. |
| I hold REPv1 or REPv2. Can I still migrate? | Legacy holders | Holders of about 4.6 million unmigrated REP, and the target of recovery scams. Production answers it today. The title carries the words they search for. |
| Do $REP holders need to take any action? | Current holders | Today, at launch and in a fork, in one answer. The Q2 2026 report says the Moon Fork showed that REP is not a passive asset; the FAQ says only that taking part is optional. |
| How will applications integrate Augur Lituus? | Developers | The developer section's one real question once the duplicate is merged. About 55 words, marked as design, not interface documentation. |

### Considered and not added

- **Time to finality and Invalid outcomes.** Real integrator needs, but the whitepaper fixes neither the appeal period nor the fork timings, so the honest answer is "not set". Revisit at testnet. Invalid gets one clause in the integration answer.
- **A comparison with other oracles.** The owner removed it twice. The security answer gives the paper's own figure against Augur v2, which is the only comparison the project can source itself.
- **What was the Moon Fork?** Defined in a clause at first use and linked to the case study. A third fork entry is not needed.
- **Wallet and price-site display.** Operational, changing weekly, and already on the REP page.
- **Reporting a vulnerability.** No channel exists to point to. Publishing one is a project task; the question follows it.

## Proposed structure

Three sections named for the three subjects the page's own lead promises ("Short answers about Augur, REP and Augur Lituus"). "General" tells a reader nothing, "Product" is DIA's label for a catalogue this project does not have, and "Builders" holds one question. A section needs at least three questions; developer questions sit in Augur Lituus until there are that many.

**Augur**

1. What is Augur?
2. What is a blockchain oracle?
3. Is Augur back?
4. Who is behind Augur?
5. Can I trade on Augur today? (new)
6. What are Augur's official channels?

**Augur Lituus**

1. What is Augur Lituus?
2. Is Augur Lituus live? (absorbs the Builders question)
3. How does Augur Lituus resolve an outcome? (new)
4. What does Augur Lituus's security depend on? (new)
5. Can the Lituus Foundation or the developers override an outcome?
6. What can Augur Lituus be used for? (retitled)
7. How will applications integrate Augur Lituus? (new)
8. How does Augur Lituus differ from Augur v1 and v2?
9. Does Augur Lituus compete with Polymarket and Kalshi?

**$REP**

1. What is $REP's role in Augur?
2. Does holding $REP earn rewards?
3. Do $REP holders need to take any action? (new)
4. Why is there more than one REP token?
5. I hold REPv1 or REPv2. Can I still migrate? (new)
6. Where can I buy $REP? (absorbs the MiCA question)

That is 21 questions. Within each section the order runs from what most readers need to what fewer need (NN/g guideline 26).

## Writing

### Accuracy

Checked against the whitepaper PDF at `cb1ff1a` in `AugurProject/whitepaper`, the Q2 2026 report and `Lituus-CS` `dev` at `a999dcc`.

- **"What is $REP's role in Augur?"** says "those fees reward the holders who stake their tokens to establish the truthful outcome" and "The oracle's usage pays for its own security." In the paper the fee is split into Reporter Pay, which goes to the first reporter of the final outcome through an auction built to keep it as low as possible, and a remainder that is burned (§4.4.2 to §4.4.4). Challengers are paid from losing stakes, not from fees (§4.3.1). The paper's source of REP's value is the expected supply reduction from that burn, and it says the attack cost scales with REP's market capitalization. The answer has the direction right and the mechanism wrong, and the burn was cut from the FAQ on 15 November.
- **"Why is there more than one REP token?"** says Augur Lituus "will use it and no other" and that anyone who wants to take part "needs REPv2_Yes_1". The published basis is one sentence of the Q2 2026 report: REPv2_Yes_1 is "the token Augur Lituus will build on". On `dev` the contracts read their REP from a Zoltar universe and wrap it in a share token, and the Foundation said on 21 July 2026 that it would explain what Augur Lituus means for holders in a future post, which is not on the blog. The answer should say what the report says.
- **"Is Augur back?"** says the Foundation funds Dark Florist "separately", "working on its own oracle". On `dev` the Augur Lituus contracts import a Zoltar interface and the deploy script takes a deployed Zoltar address. A developer who follows the FAQ's GitHub link sees that. This review does not propose naming Zoltar; the wording is for the team to confirm.
- **"Second half of 2027"** appears in two answers and in no published Foundation source in this repository. `roadmap.ts` says 2027, and the whitepaper announcement says releases are driven by readiness. Confirm it is meant to be public, then keep it in `roadmap.ts` so the FAQ and the homepage cannot disagree.
- **"Can the Lituus Foundation or the developers override an outcome?"** is consistent with the paper (no backstops or vetoes, §2) and with a keyword search of `dev`, where the only owner-gated contract is the REP vault and its owner is the oracle contract. That search is not an audit, and the code is unreleased.
- The other eleven answers agree with the sources read.

### Before and after

**What is Augur?** (second paragraph, last sentence)

Now:

> It is designed to make lying cost more than ever before and to provide trustless, permissionless and censorship-resistant resolution.

Proposed:

> Its design sets the cost of forcing a false outcome above the entire market value of $REP, with no party able to veto or censor a result.

The product page already makes this claim in these terms, and the whitepaper derives it.

**What is Augur Lituus?**

Now:

> Anyone can ask a question for a fee in $REP, and anyone can report its outcome, or challenge a report, by staking $REP on an answer.

Proposed:

> Under its design, anyone can ask a question for a fee in $REP, and anyone can report its outcome, or challenge a report, by staking $REP on an answer. The whitepaper specifies the mechanism.

"Whitepaper" links to it. Three words fix the tense for the whole answer; no status line is added.

**What is $REP's role in Augur?**

Now:

> $REP derives its value from securing Augur's oracle. Every question submitted to Augur Lituus pays a fee in $REP, and those fees reward the holders who stake their tokens to establish the truthful outcome. The oracle's usage pays for its own security.
>
> In exchange, holders carry the oracle's security. Their staked $REP stands behind every outcome and is forfeited if they back a false one. Holders are paid to protect the truth, and the value of their token rests on the oracle being trusted.

Proposed:

> $REP is the asset that secures Augur's oracle. In the Augur Lituus design, every question pays a fee in $REP: part pays the reporter whose outcome stands, and the remainder is burned. Reports and challenges are backed by staked $REP, which is forfeited when the outcome it backs is overturned.
>
> The cost of corrupting the oracle therefore scales with the market value of $REP, and that value depends on the oracle being used and trusted.

**Can the Lituus Foundation or the developers override an outcome?**

Now:

> No. Augur Lituus is a trustless, decentralized and permissionless protocol, and no one has the authority to change an outcome. Its design has no admin key, governance vote, multisig or veto, so the Lituus Foundation and the developers have the same standing as any other participant.

Proposed:

> No. The Augur Lituus design has no admin key, governance vote, multisig or veto. An outcome is set by staked reports that anyone can challenge and, in a dispute that escalates to a fork, by where $REP holders migrate. The Lituus Foundation and the developers can take part only as $REP holders, on the same terms as anyone else.

A skeptic's next question after "the same standing as any other participant" is whether the Foundation holds REP. Its own quarterly posts describe a REP buyback, so the answer should say on what terms it takes part.

**Where can I buy $REP?**

Now:

> $REP can be purchased on centralized and decentralized exchanges, such as Kraken and Uniswap. The Lituus Foundation is working to make it more accessible.

Proposed:

> $REP trades on centralized and decentralized exchanges, such as Kraken, where its ticker is AUGUR, and Uniswap. Earlier REP tokens still exist under similar names, so confirm the contract address before buying. In the European Economic Area, wider availability depends on a MiCA white paper, which the Lituus Foundation has commissioned.

"Contract address" links to the REP page.

**Why is there more than one REP token?** (last paragraph)

Now:

> REPv2_Yes_1 is the only one that matters going forward. Augur Lituus will use it and no other, so the earlier tokens, and REPv2_No_1 from the losing side of the fork, have no further use. Anyone who wants to take part in Augur Lituus needs REPv2_Yes_1.

Proposed:

> REPv2_Yes_1 is the only one that matters going forward: it is the token Augur Lituus will build on. The Moon Fork's migration window closed on 3 August 2026, so the earlier tokens, and REPv2_No_1 from the losing side of the fork, can no longer be converted and have no further use. The REP page lists each token's contract address.

"Moon Fork" in the list above links to the case study, and "REP page" to `/rep/`.

### Drafts for the new questions

**Can I trade on Augur today?**

> No. Augur Lituus is an oracle, not a trading venue, and it is still in development. Augur v2's contracts remain on Ethereum, but no official trading application is maintained for them. Holders of shares in finalized Augur v1 or v2 markets can ask about redemption on Discord.

To confirm before use: that no official application has relaunched, and that old shares can still be redeemed. Both rest on statements this review did not re-check. If the owner's reason for removing this question is legal, one clause in "What is Augur?" ("Augur does not operate a trading venue") is the minimum.

**How does Augur Lituus resolve an outcome?**

> By staked reporting with open challenge. Under the design, a question is submitted with a fee, and anyone can report its outcome by posting a bond in $REP. Anyone who disagrees can challenge with a larger bond, and a report that goes unchallenged becomes final. A dispute that keeps escalating ends in a fork, in which $REP holders choose the outcome by migrating their tokens. A worked example follows one question from start to finish.

"Worked example" links to `/learn/how-augur-answers-a-question/`.

**What does Augur Lituus's security depend on?**

> On an attack costing more than an attacker can gain. To force a false outcome, an attacker must acquire most of the $REP that takes part in a fork and forfeit it, twice. The whitepaper's authors estimate that cost at about 134% of $REP's fully diluted value under their stated assumptions. The design holds while the value that depends on the oracle stays below that cost, and while honest participants challenge false reports and migrate in a fork. The whitepaper publishes its formulas and assumptions.

**I hold REPv1 or REPv2. Can I still migrate?**

> No. The Moon Fork's migration window closed permanently on 3 August 2026 and cannot be reopened by anyone, the Lituus Foundation included. REP that was not migrated remains REPv1 or REPv2 and has no role in Augur Lituus. Any offer to migrate, recover or unlock it is a scam. The REP page shows how to tell which token a wallet holds.

**Do $REP holders need to take any action?**

> Not today. Holding $REP requires nothing, and no step has been announced for the launch of Augur Lituus; any instruction will come through Augur's official channels. The exception is a fork. In a fork, holders must migrate their $REP to the universe they consider correct before the migration window closes, and $REP that is not migrated loses its role in Augur. The REP page explains what a fork involves.

**How will applications integrate Augur Lituus?**

> Through its contracts. Under the design, an application submits a multiple-choice question with a fee in $REP and reads the final outcome onchain once it is resolved. Every question includes Invalid as a possible outcome. Nothing is deployed yet, and the interfaces in the public repository are still changing. Teams planning an integration can contact the team.

## UX

Only changes with a source in the research or a measured problem.

1. **Let more than one answer stay open, and add Open all.** NN/g guideline 60 says not to close accordions automatically, and 61 asks for an Expand all control, for readers who scan and for Find in page. The page does neither, by the decision of 11 November. Opening a second question closed the first in the browser check. Fully open, the page is 7,640px against 3,575px collapsed at 1024px wide, so Open all is a choice a reader makes, not the default. Dropping the shared `name` also removes the print workaround in `faq.astro`.
2. **Point old fragments at answers that cover them.** NN/g guideline 83 is that an old FAQ link should land somewhere helpful. The live entries carry 84 old fragments as aliases, 30 of them on "Why is there more than one REP token?". Three tested: `#i-didnt-migrate-in-time-is-there-anything-i-can-do` opens "Why is there more than one REP token?", `#trading` opens "Is Augur back?", and `#security-reports` opens "Can developers build with Augur Lituus today?". None of those answers addresses the old question. The additions above fix most; an alias with no matching answer should open its section, not an unrelated question.
3. **Link answers to the pages that hold the depth.** See [What is weak](#what-is-weak), item 5. Six links would do it: the whitepaper twice, the REP page three times, the Learn walkthrough and the Moon Fork case study once each.
4. **Carry the reader's words in titles and first sentences.** There is no on-page search, so findability is Find in page and outside search engines, which match words. Baymard's query-type research finds that abbreviation, symbol and help queries are the ones sites support worst. Words a holder or trader would type that are missing or buried: migrate (once, as "migrated"), REPv1 and REPv2 (one answer), AUGUR as a ticker (one answer), trade (inside the v1 and v2 answer and the Polymarket answer, never as whether a reader can), audit and whitepaper (nowhere). The proposed titles and rewrites add each.
5. **Show one "last reviewed" date for the page.** NN/g's report names freshness as something a reader judges an FAQ by. Per-answer "As of" dates were removed on 11 November; one page-level line, from the newest `reviewed` value, gives the signal without the clutter. It matters most before launch, while status answers change each quarter.
6. **Tighten the first screen on phones.** At 375 by 812, in the pane's phone emulation, the first question starts at 606px: the title, the lead and the topic links fill three quarters of the screen. Less top padding on the hero, or no topic list below 768px, would put four or five questions on the first screen.
7. **Keep no search.** A filter earns its place at several dozen questions. At 21, a weak filter is worse than none: Baymard's finding is that readers take an empty result to mean the answer does not exist.

Not proposed: a feedback widget, filters or category tabs. Each needs scripting or a backend the project rules keep out, and none answers a measured problem.

Two process changes sit behind the page. First, keep a log of what people ask on Discord, Telegram and X, and review it with each quarterly report; today the question set has no record of real questions behind it (NN/g guidelines 2, 3 and 10; GOV.UK's evidence sources). Second, publish a security contact, after which "How should a vulnerability be reported?" can return.

## Action plan

### High: essential

1. Add "I hold REPv1 or REPv2. Can I still migrate?" and "Do $REP holders need to take any action?", and add the ticker and the address pointer to "Where can I buy $REP?". These prevent losses.
2. Correct "What is $REP's role in Augur?" against the whitepaper.
3. Fix the tense in the five answers that present the design as deployed, with one phrase each.
4. Add "Can I trade on Augur today?", or the one-clause alternative.
5. Merge the two duplicates: the Builders question into "Is Augur Lituus live?", and the MiCA question into the buying answer.
6. Add the six links.

### Medium: substantive

7. Add "How does Augur Lituus resolve an outcome?" and "What does Augur Lituus's security depend on?", and rewrite the override answer.
8. Replace the slogan and the adjective stack in "What is Augur?".
9. Re-sort "Is Augur back?" and "Who is behind Augur?" so each title delivers its answer.
10. Move to three sections: Augur, Augur Lituus, $REP.
11. Let answers stay open and add Open all.
12. Re-point the aliases.
13. Confirm the launch window and move it to `roadmap.ts`.
14. Add "How will applications integrate Augur Lituus?" and retitle the applications question.

### Low: polish

15. A page-level "last reviewed" line.
16. The first screen on phones.
17. "FAQ" in the page title or description (NN/g guideline 82).
18. A trim of "What is a blockchain oracle?".
19. A screen-reader pass (NN/g guideline 66); none was done here.
20. The question log, and a security contact.

## Decisions this would reverse

| Decision | Proposal |
|---|---|
| No mechanism in FAQ answers (15 November) | Kept for walkthroughs. A one-sentence reason is allowed, with a link. |
| Answers state no limits or trade-offs (15 November) | One answer states what the security depends on. No other answer carries caveats. |
| Status lines cut from answers (15 November) | One phrase ("under its design") in five answers. |
| Four Token questions deleted (15 November) | Two return, shorter and merged: unmigrated REP, and what holders must do. |
| "Can I trade on Augur today?" removed (13 and 15 November) | Returns in three sentences, or as one clause. |
| Seven Product answers parked for the product page (15 November) | Two short answers return. The parked walkthroughs still belong on the product page, which does not carry them yet. |
| Two Builders questions deleted (15 November) | The integration question returns at about 55 words. |
| "Does $REP have a MiCA white paper?" added (15 November) | Merged into the buying answer. |
| The contract address and ticker out of the buying answer (15 November) | The ticker returns, and the address by link. |
| Dark Florist named once, in "Is Augur back?" (15 November) | Still once, moved to "Who is behind Augur?". |
| One question open at a time, no Open all (11 November) | Both reversed. |
| Four sections: General, Product, The Token, Builders (11 and 13 November) | Three sections named for their subjects. |
| No "As of" dates (11 November) | Kept per answer. One page-level date added. |

Kept as decided: no competitor names, no search, no Start here block, no buttons under answers, Dark Florist's products unnamed, "$REP", and the professional register.

## What was checked

Checked on 15 November 2026:

- **The FAQ.** All 17 entries and the 14 parked ones in `src/data/faq/`, `faq.astro` and `FaqItem.astro`, and the page on the dev server at 1024 by 768 and 375 by 812: counts, word counts (1,126 words, an average of 66), links, heights, alias redirects and one-at-a-time behaviour.
- **Production.** The question list of `https://www.augur.net/faq.md`.
- **The whitepaper.** The PDF at `cb1ff1a`, extracted with `pdftotext`: Abstract, §2, §3, §4.0 to §4.4.5 and §4.6 to §4.6.4.
- **Lituus-CS.** Branch heads (`main` `fc7fd07`, `dev` `a999dcc`), no releases, no license file. On `dev`: the file tree, the README, and a keyword search of the contracts and the deploy script for privileged roles and for the REP source.
- **The blog.** The Q2 2026 report in full; the Q1 2026 report, the whitepaper announcement and the post of 21 July 2026 by search for the claims the FAQ rests on.
- **NN/g.** [FAQs Still Deliver Great Value](https://www.nngroup.com/articles/faqs-deliver-value/) through an agent's summary, and the [Strategic Design for FAQs](https://www.nngroup.com/reports/strategic-design-faqs/) report in its free edition, read directly: the objections, the strategic-value section and all 94 guidelines. Guideline numbers above are the report's. The earlier audit recorded this report as paywalled.
- **GOV.UK.** [Understand content design](https://guidance.publishing.service.gov.uk/writing-to-gov-uk-standards/plan-manage-content/understand-content-design/) and its linked page on identifying user needs, through an agent's summary. Neither mentions FAQs; the user-need test is what was applied.
- **Baymard.** The [search research overview](https://baymard.com/research/ecommerce-search), which carries no findings itself, and four of its free articles, through an agent's summary.
- **DIA and Chainlink.** [DIA's FAQ](https://www.diadata.org/faq/) and its Lumina page; [Chainlink's FAQs](https://chain.link/faqs) (the first 37 questions verbatim, the rest summarized), its staking FAQ and one education page. All through agents' summaries.

Not checked:

- **The New Zealand guidance,** [FAQs: do not use them](https://www.digital.govt.nz/standards-and-guidance/design-and-ux/content-design-guidance/findable-content/faqs-do-not-use-them). The page returned an empty body to two fetches and in the browser. Nothing in this review rests on it.
- **Scroll position after a question closes above the one opened,** view transitions, focus order, reduced motion and Find in page on closed answers. The browser pane was hidden during the check, so timing-dependent behaviour could not be observed.
- **Screen readers, and browsers other than the pane's Chromium.**
- **Exchange listings.** Kraken and Uniswap rest on the CoinGecko check recorded earlier the same day.
- **Old markets.** Whether any trading interface for Augur v2 works, and whether old shares can be redeemed.
- **The Lituus-CS contracts line by line.** The search for privileged roles was by keyword.
- **Augur documentation.** No documentation site for Augur Lituus was found; the repository's README is build instructions only.

Seen in passing, outside the FAQ: the Q2 2026 report lists Canada in the European Economic Area, and the product page calls Augur Lituus "the next generation of Augur's oracle", which the [update guide](../guides/update-faq.md) rules out for the FAQ.
