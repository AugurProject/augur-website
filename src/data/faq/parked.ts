import type { FaqEntryInput } from './index';
import { links } from '../links';
import { pages } from '../navigation';
import { currentRep, legacyRep } from '../rep';

// Parked: seven Product answers taken off /faq/ on 15 November 2026 at the owner's request, who sees them as a
// better fit for the product page (docs/records/decisions.md and docs/records/open-decisions.md). Nothing imports
// this file, so none of it is built or shown. The entries are as they stood on the FAQ, with their sources and
// review flags. Later the same day three ids went back on the FAQ with shorter answers written for it:
// `who-decides` and `integration-flow` in product.ts and `rep-missed-migration` in rep.ts. The entries here under
// those ids are the longer versions, kept for the product page. The other parked ids and aliases open live
// answers as aliases: `finality-time` opens `who-decides`; `invalid`, `no-report` and `writing-questions` open
// `integration-flow`; `false-answers`, `value-secured`, `guarantee`, `compare` and their aliases open
// `lituus-security`; `fork` and its aliases open `who-decides`. The last Product entry, the comparison with other
// oracles, was removed "for now", with no destination decided. To put an entry back on the FAQ, move it into
// product.ts and take its id and aliases out of those lists, or the build fails on a fragment used twice.
export const parkedProduct: FaqEntryInput[] = [
  {
    id: 'who-decides', question: 'How does Augur Lituus resolve outcomes?',
    answer: `Through economic incentives rather than a vote or a committee. It is designed to resolve each question in four stages:

1. **Query.** Anyone can submit a multiple-choice question, such as "Which team won the final?", by paying a fee in REP.
2. **Report.** Any participant can report an outcome by staking REP on it. The fee funds a reporting reward that increases until a report is made. If the reported outcome stands, the reporter recovers the stake and receives the reward.
3. **Challenge.** Any participant can challenge the reported outcome by staking twice the previous stake on a different outcome. Each challenge opens a new response window, and each costs twice the last, so a false outcome becomes progressively more expensive to sustain.
4. **Finalization.** When a window closes without a new challenge, the most recent outcome becomes final. Participants who backed it recover their stakes and share in the losing stakes; those who backed a losing outcome forfeit theirs.`,
    sources: ['owner-approved wording (melo, 13 November 2026)', 'whitepaper §2, §4.0.1–4.0.2, §4.1, §4.3.1, §4.4.1, §4.4.3–4.4.4 (proposed rules: anyone may ask for a fee in REP, growing reward, doubling challenges, appeal period, losing stakes shared)'],
    reviewed: '2026-11-13', needsReview: false, aliases: ['question-lifecycle'],
  },
  {
    id: 'finality-time', question: 'How long does Augur Lituus take to finalize an outcome?',
    answer: `It depends on whether the outcome is challenged. Under the proposed rules:

- **Unchallenged.** Final once the response window after the report closes: one day in the whitepaper's example.
- **Challenged.** Each challenge opens a new window.
- **Forked.** A migration window of about two weeks follows, then an auction that restores the REP supply.

A contested outcome can take weeks: a 15 REP stake that doubles with every challenge reaches a fork threshold of 2% of the current REP supply in about 13 rounds. The whitepaper does not fix the length of the window, which it calls the appeal period, so an application should not promise its users a settlement time. A [worked example](${pages.learn}how-augur-answers-a-question/) follows one question from submission to a final outcome.`,
    sources: ['whitepaper §2.1, §2.2 (two-week migration window), §4.1 (appeal period; the required stake is capped at the fork threshold), §4.2.1 (threshold 0.5–4% of supply suggested), §4.2.2–4.2.3 (weeks suggested for migration and for supply restoration), §4.5 (one day passes without an appeal)', 'Q2 2026 report: REPv2_Yes_1 supply 6,545,760.43 (2% ≈ 130,915 REP; 15 × 2^13 = 122,880, so the fourteenth stake would pass it)', 'learn/how-augur-answers-a-question.md (one example from start to finish)', 'docs/records/faq-research.md (the paper gives no appeal-period length; Lituus-CS dev uses a day and a 30-day migration window)'],
    reviewed: '2026-11-15', needsReview: true,
  },
  {
    id: 'invalid', question: 'What happens if a question is ambiguous or cannot be answered?',
    answer: `It resolves as Invalid. Under the proposed rules, every question carries Invalid as an outcome, for questions that are malformed or cannot be resolved as written, and it can be reported and challenged like any other outcome. A question that receives no report within three days also resolves as Invalid.

The design provides no way to amend a submitted question, so precise wording is its creator's responsibility: what each outcome means, how it is verified and when new information stops counting. How an application handles Invalid, for example by refunding its users, is its own decision. Questions on which informed observers genuinely disagree are a poor fit: the whitepaper notes that they lower the cost of an attack.`,
    sources: ['whitepaper §4.0.1 (outcomes are mutually exclusive and exhaustive and include Invalid, for malformed or unresolvable queries), §4.0.2 flowchart, §4.3 (no report within 3 days resolves as Invalid), §4.5 (the protocol adds Invalid automatically), §5 (oracles report objective ground truth), §6.0.2 and Appendix.7.6 (a legitimately contentious query raises falseMarketShare, which reduces the attack cost)', 'walkthrough.ts query (the five fields of a question: title, description of each outcome, resolution criteria, outcome list, information cutoff; owner, 19 October 2026)', 'learn/writing-questions.md'],
    reviewed: '2026-11-15', needsReview: true, aliases: ['no-report', 'writing-questions'],
  },
  {
    id: 'fork', question: 'What is a fork?',
    answer: `A fork is the last resort for a dispute that escalating stakes cannot settle. When a challenge reaches the fork threshold, a set share of all REP, Augur splits into one universe for each possible outcome, each with its own REP. Holders migrate their REP, one way, to the universe they consider correct, and the universe that receives the most prevails. REP that is not migrated, or that sits in a universe no one uses, loses its value, which is what makes forcing a false outcome so costly. An Augur fork does not split Ethereum.

Forks are intended to be rare, but another could occur before Augur Lituus launches, because the current REP belongs to a live Augur v2 universe. Any deadline would be announced on Augur's official channels, and the fork guides explain [how to prepare](/learn/fork/what-to-do/).`,
    sources: ['whitepaper §2.2, §4.1, §4.2.1, §4.2.2, §4.2.4', 'fork-guides/index.mdx (Augur v2: threshold 2.5% of theoretical REP)', 'fork-guides/what-to-do.mdx (preparedness for a possible future fork)', 'fork-guides/moon-fork.mdx (the Yes universe is a v2 child universe)', 'Q2 2026 report (the fork as last resort; first fork; meant to be rare)', 'phase-2-the-fork-migration post (truth as the Schelling point)'],
    reviewed: '2026-11-15', needsReview: true,
    aliases: ['what-is-a-fork-in-simple-terms', 'lituus-fork', 'future-fork', 'honest-fork'],
  },
  {
    id: 'false-answers', question: 'How does Augur Lituus deter false outcomes?',
    answer: `By making a false outcome progressively more expensive to sustain. Every outcome is backed by a stake, and anyone can challenge a false one; under the proposed rules, those proven right share 80% of the losing stakes. An attacker can defend a false outcome only by doubling the stake each round.

At the fork threshold, outspending honest participants no longer works. The attacker must acquire most of the REP that migrates and commit it to a universe no one will use, then buy in again when the protocol mints and auctions replacement REP. The whitepaper estimates the total cost at about 134% of REP's fully diluted value, under its stated assumptions.

An attack is therefore rational only when more value than that depends on the outcome. In a token vote, by contrast, an attacker's losses can be hedged or recovered.`,
    sources: ['whitepaper Abstract, §2.1, §2.2, §3, §4.1, §4.2.3, §4.3.1, §4.6, §4.6.2, §5.1, §6.4, §7.0.1', 'phase-2-the-fork-migration post (attacker must acquire and migrate 51%)', 'augur-testing-past-building-future post (buy half, then the fresh pool)', 'the-augur-lituus-whitepaper post (token-vote losses can be recovered or hedged)'],
    reviewed: '2026-11-15', needsReview: true, aliases: ['bonds', 'whale-attack', 'token-vote'],
  },
  {
    id: 'value-secured', question: 'How much value can Augur Lituus secure?',
    answer: `It depends on the market value of REP. An attack pays only if the value an attacker can capture from the applications that rely on the oracle exceeds the cost of the attack, which the whitepaper estimates at about 134% of REP's fully diluted value under its stated assumptions. An attacker who wins a fork controls every unresolved question, so the figure that matters is the total exposed across all of them, not one market.

The protocol does not cap that exposure. The design relies on applications and their users to keep it below the cost of an attack and proposes public tracking of it, so an integrator should compare the value it intends to settle with REP's market value at the time.`,
    sources: ['whitepaper §4.4.4 (the cost to attack scales with market capitalization), §4.6 and §4.6.1 (an attack needs gains outside the oracle that exceed the losses inside it; a winning attacker can dictate the resolution of all pre-existing queries), §4.6.2 (two regimes: REP\'s market cap far exceeds vulnerable open interest, or vulnerable open interest self-limits), §4.6.3 (hidden open interest; a community dashboard of vulnerable open interest and interface warnings), §4.6.4 (friction), §6.4 and §7.0.1 (134% under the most likely inputs)'],
    reviewed: '2026-11-15', needsReview: true,
  },
  {
    id: 'guarantee', question: 'Does Augur Lituus guarantee correct outcomes?',
    answer: `No. No oracle can. The design makes a false outcome expensive and rewards those who correct one, but it rests on assumptions that can fail:

- **Attention.** A false report must be challenged before its response window closes, or it becomes final.
- **Rational migration.** In a fork, REP holders and the applications that give REP its value must prefer the universe that reflects reality.
- **Liquidity.** Honest participants must be able to acquire REP when it is needed.
- **Bounded exposure.** The total value that depends on the oracle, including value the market cannot see, must stay below the cost of corrupting it.

The 134% estimate depends on its inputs. It assumes that 90% of REP responds in a fork, whereas 58% of the original supply migrated in the Moon Fork, and that an attacker pays almost twice the market price for REP. The [whitepaper](${links.whitepaper.url}) publishes its formulas so that the estimate can be recomputed.`,
    sources: ['whitepaper §3 (readers are encouraged to substitute their own parameter estimates), §4.2.2, §4.6.3–4.6.4 (hidden vulnerable open interest; friction), §6.4 (formula), §7.0.1 (responsiveREP 0.9, plausible 0.7–1.0; premium 1.9; falseMarketShare 0.04), §8, Appendix.2 (assumptions), Appendix.7.6', 'computed on 15 November 2026 from the §6.4 formula, other inputs at their most likely values: 134% at responsiveREP 0.9, about 129% at 0.58; the first term is linear in premium, and falseMarketShare lowers both terms', 'augur-reboot-2025 post (REP liquidity needed to defend the oracle)', 'Q2 2026 report (58.2% migrated)'],
    reviewed: '2026-11-15', needsReview: true, aliases: ['low-participation'],
  },
  {
    id: 'compare', question: 'How is Augur Lituus different from other oracles?',
    answer: `In what a lie costs. Elsewhere, a disputed answer is settled by a group, whether a team, a committee or a vote of token holders, and what a dishonest participant loses can often be hedged or recovered.

Augur Lituus has no group that decides. Each side of a dispute must stake $REP on its answer, and whoever backed the false one loses that stake for good.`,
    sources: ['the-augur-lituus-whitepaper post ("Unlike token-vote-based resolution systems, where losses can often be recovered or hedged, Augur\'s dispute process ties participation to unrecoverable economic loss"; outcomes enforced by an onchain mechanism "rather than by trust in the market operator or a simple token vote")', 'augur-testing-past-building-future post ("A team checks the evidence, a committee decides, token holders vote, a multisig signs off")', 'homepage tenets (Trustless: no governance, veto or multisigs)', 'whitepaper §4.1, §4.3.1, §4.4.3–4.4.4 (challenges are staked; those who backed a losing outcome forfeit their stakes), as cited for who-decides in parked.ts'],
    reviewed: '2026-11-15', needsReview: true,
  },
];

// Deleted from the FAQ on 15 November 2026 at the owner's request, and kept here so their wording and sources
// are not lost. Three of them (which-rep, rep-wallet, rep-missed-migration) were also shown on /rep/. The ids
// and aliases of `which-rep` and `rep-wallet` open `rep-lineage` in rep.ts, `lituus-rep-holders` opens `rep-role`
// and `lituus-token` opens `rep-lineage`; `rep-missed-migration` is a live question again, with a shorter answer.
// `rep-action` ("Do $REP holders need to take any action?") was written for the FAQ on 15 November and removed on
// 16 November 2026; its id opens `rep-holding`. To put one back, move it into rep.ts and take its id and aliases
// out of those lists.
export const parkedToken: FaqEntryInput[] = [
  {
    id: 'lituus-rep-holders', question: 'What does Augur Lituus mean for REP holders?',
    answer: `Augur Lituus is being built around the current REP, ${currentRep.symbol}. No new token is on sale and there is no public fundraising round, so any presale, airdrop or site offering an "Augur Lituus token" should be treated as a scam.

Nothing is required of holders today, and reporting or challenging in Augur Lituus is not yet possible, because it is not deployed. How REP will be used with its contracts at launch, and whether holders will need to take any step, has not been announced. The Lituus Foundation has said that it will address this directly; any instruction will come through Augur's official channels.`,
    sources: ['Q2 2026 report (REPv2_Yes_1 is the token Augur Lituus will build on)', 'the-augur-lituus-whitepaper post (no public fundraising round)', 'augur-testing-past-building-future post, 21 July 2026 ("We know REP holders will ask what Augur Lituus means for them... we will address it directly in a future post"); no such post in src/content/blog on 15 November 2026', 'Lituus-CS: nothing deployed (15 November 2026)', 'docs/records/faq-research.md (tokens in the code: wrapped REP and Query Tokens inside the protocol; no token sale)'],
    reviewed: '2026-11-15', timeSensitive: true, needsReview: true, aliases: ['lituus-token'],
  },
  {
    // Removed from the FAQ on 16 November 2026 at the owner's request, as it stood: owner-approved wording of
    // 15 November. It was the one place the FAQ said what a fork asks of a holder. Holding never requires
    // reporting or challenging (AGENTS.md), and nothing has been announced for launch: the Foundation said on
    // 21 July 2026 that it would address this in a future post.
    id: 'rep-action', question: 'Do $REP holders need to take any action?',
    answer: `Not today. Holding $REP requires nothing, and no step has been announced for the launch of Augur Lituus; any instruction will come through Augur's [official channels](/faq/#official-channels). The one exception is a fork: holders must migrate their $REP to the universe they consider correct before the migration window closes, or it loses its role in Augur. The [REP page](${pages.rep}#fork) explains what a fork involves.`,
    sources: ['owner-approved wording (melo, 15 November 2026, with the answers of docs/records/faq-review.md)', 'augur-testing-past-building-future post, 21 July 2026 ("We know REP holders will ask what Augur Lituus means for them... we will address it directly in a future post"); no such post in src/content/blog on 15 November 2026', 'whitepaper §2.2 (a one-way migration window; legacy REP is deprecated after migration), §4.2.2 (a holder who chooses inaction has REP that is effectively destroyed)', 'Q2 2026 report ("REP is not a passive asset... in a fork, migrating their REP is how they do it")', 'rep.ts fork and /rep/#fork ("If a fork happens")'],
    reviewed: '2026-11-15', timeSensitive: true, needsReview: false,
  },
  {
    id: 'which-rep', question: 'Which REP token is current?',
    answer: `The current REP token is **${currentRep.symbol}** on ${currentRep.chain}, at this contract address:

\`${currentRep.address}\`

It is the REP of the universe that prevailed in the 2026 Moon Fork, and the token around which Augur Lituus is being built. Its onchain name is ${currentRep.name}, and Kraken and CoinGecko list it under the ticker ${currentRep.listing}. These earlier tokens are legacy tokens and can no longer be converted to ${currentRep.symbol}:

${legacyRep.map(token => `- **${token.symbol}**, ${token.role}: \`${token.address}\``).join('\n')}

A REP token is identified by its contract address, not by its name or ticker, which anyone can copy. Compare every character with the address above, or verify the token on [Etherscan](${links.repToken.url}).`,
    sources: ['rep.ts currentRep, legacyRep and versions', 'fork-guides/moon-fork.mdx and migration.mdx (token identities)', 'Q2 2026 report (Kraken lists REPv2_Yes_1 under the ticker AUGUR; its onchain symbol remains REPv2_Yes_1)', 'CoinGecko listing "AUGUR" read 11 November 2026'],
    reviewed: '2026-11-15', needsReview: true,
    aliases: ['current-rep', 'legacy-rep', 'is-there-a-new-rep-token', 'does-the-old-rep-token-still-exist', 'rep-augur-ticker', 'is-augur-on-kraken-the-same-as-repv2-yes-1'],
  },
  {
    id: 'rep-wallet', question: 'Why do some wallets and price sites display REP incorrectly?',
    answer: `Many wallets do not yet detect ${currentRep.symbol} automatically. To display it:

1. Confirm that the wallet is connected to ${currentRep.chain}.
2. Add a custom token with the contract address \`${currentRep.address}\`. The wallet should fill in the symbol ${currentRep.symbol} and ${currentRep.decimals} decimals.
3. If the balance still does not appear, look up the wallet address on Etherscan, which reads the balance directly from the contract.

Price sites can lag as well: as of November 2026, CoinMarketCap lists only the original REPv1 contract, and figures shown for legacy tokens do not describe ${currentRep.symbol}.

A wallet that shows REPv1 or REPv2 holds a legacy token, which cannot be converted to ${currentRep.symbol}. Never enter a seed phrase into a site that offers to find or recover tokens.`,
    sources: ['rep.ts currentRep (decimals 18)', 'Moon Fork case study (wallet discovery)', 'Q2 2026 report (platform updates; CoinGecko shows REP correctly; working with CoinMarketCap)', 'CoinGecko and CoinMarketCap pages read 11 November 2026, not re-read on 15 November'],
    reviewed: '2026-11-15', timeSensitive: true, needsReview: true, aliases: ['the-new-token-doesnt-appear-in-my-wallet-yet-is-something-wrong', 'price-sites'],
  },
  {
    id: 'rep-missed-migration', question: 'What happened to REP held before the Moon Fork?',
    answer: `That depends on whether it was migrated before the migration window closed on 3 August 2026:

- **Migrated**, by the holder or by an exchange (Kraken, OKX and Bitpanda migrated their customers' balances): it is now ${currentRep.symbol}, the current REP.
- **Not migrated:** it remains in the original universe as REPv1 or pre-fork REPv2, which has no role in Augur Lituus. The fork contract enforced the deadline, so the window cannot be reopened and no one can migrate REP on a holder's behalf; converting REPv1 to REPv2 now does not change this. REP held on an exchange that did not take part is a matter for that exchange.

Any offer to migrate, recover or unlock legacy REP is a scam. Augur and the Lituus Foundation do not initiate direct messages, and no legitimate process asks for a seed phrase, a signature to "verify" a wallet, or a transfer of tokens.`,
    sources: ['fork-guides/moon-fork.mdx (contract deadline; migrateIn rejects after it)', 'Q2 2026 report (cannot be reopened, including by the Foundation; every exchange contacted)', 'Moon Fork report (Kraken, OKX, Bitpanda)', 'rep.ts versions and versions.safety', 'augur-testing-past-building-future post (impersonators, no first contact)', 'old augur.net FAQ (no verify signature)'],
    reviewed: '2026-11-11', needsReview: true,
    aliases: ['i-didnt-migrate-in-time-is-there-anything-i-can-do', 'i-own-repv2-what-happened', 'exchange-rep', 'my-rep-was-on-kraken-did-i-need-to-do-anything', 'what-about-rep-on-other-exchanges-gate-upbit', 'what-happened-to-rep-left-on-an-exchange', 'rep-scams', 'someone-offered-to-migrate-or-recover-my-rep-is-that-real'],
  },
];

// Deleted from the Builders section on 15 November 2026 at the owner's request, and kept here so their wording
// and sources are not lost. Both were drafts the owner had not approved. building.ts is gone: `integration-flow`
// is a live question again in product.ts, with a shorter answer, and `security-reports` opens the Augur Lituus
// section (topicAliases in index.ts). To put the security answer back, move it into product.ts and take its id
// out of topicAliases. The security answer describes what was published on 11 November 2026 (no security policy, private
// reporting address or bug bounty): check that again before reusing it.
export const parkedBuilders: FaqEntryInput[] = [
  {
    id: 'integration-flow', question: 'How would an application integrate Augur Lituus?',
    answer: `In the proposed design, the oracle is a contract that an application calls:

1. **Query.** The application submits a question with its possible outcomes and pays the fee in REP, or redeems a prepaid Query Token.
2. **Resolution.** Reporters, challengers and, if necessary, a fork settle the outcome onchain.
3. **Read.** Once the outcome is final, the application reads it from the oracle contract and settles.

The protocol sets the fee: a base fee moves by 10% a month toward the level that burns the most REP, and a demand multiplier cuts it by up to 99% when query volume falls. A Query Token locks in the current fee for a 10% premium. No launch fee has been set.

Augur Lituus is designed for Ethereum mainnet, where REP resides; access from other chains is intended but not yet specified. An integration should define in advance how it handles an Invalid outcome, a delayed resolution and a fork.`,
    sources: ['whitepaper §4.0.1, §4.3, §4.3.3, §4.4.2, §4.4.5 (hill-climbing controller, 10% per month, toward the fee that maximizes REP burned), §4.4.6 (price modifier: up to a 99% discount, linear increase above the historical rate), §4.4.7 (Query Tokens: current fee plus a fixed 10% premium), Appendix.1 diagram', 'Lituus-CS main: createQuery / getOutcome, no callbacks; INITIAL_BASE_FEE 10 REP', 'generalized-augur post (cross-chain queries, settlement on Ethereum L1)', 'Lituus-CS foundry.toml (mainnet, Sepolia, Arbitrum, Optimism, Base endpoints)', 'whitepaper §4.1, §4.2.2, §4.3 (delay, forks and Invalid as outcomes an integration must handle)'],
    reviewed: '2026-11-15', timeSensitive: true, needsReview: true, aliases: ['costs', 'chains', 'failure-cases', 'choosing-an-oracle'],
  },
  {
    id: 'security-reports', question: 'How should bugs and security vulnerabilities be reported?',
    answer: `Ordinary bugs in the Augur Lituus code can be reported as issues in the Lituus-CS repository on GitHub.

Vulnerabilities should not be disclosed publicly. No security policy, private reporting address or bug bounty has been published yet. To report one, request a private contact with the team in the official Discord, confirm that the contact is a team member before sharing any details, and treat anyone who makes first contact offering a bounty as an impersonator.`,
    sources: ['No SECURITY.md in augur, Lituus, Lituus-CS, zoltar or augur-website; no security.txt on augur.net or lituus.foundation; no bounty listing found (11 November 2026)'],
    reviewed: '2026-11-11', timeSensitive: true, needsReview: true,
  },
];
