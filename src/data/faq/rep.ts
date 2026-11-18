import type { FaqEntryInput } from './index';
import { pages } from '../navigation';
import { currentRep, legacyRep } from '../rep';

// $REP, for holders old and new: its role, whether holding it earns anything, why there has been more than one
// token, whether unmigrated REP can still be converted, and where to buy it. The longer answers deleted on
// 15 November 2026 (what Augur Lituus means for holders, which token is current, wallet display, REP held before
// the Moon Fork) stay in parked.ts, with "Do $REP holders need to take any action?", removed on 16 November.
// The token is written $REP in every question and answer, never bare REP (owner, 16 November 2026); the
// versioned symbols (REPv1, REPv2, REPv2_Yes_1, REPv2_No_1) are token names and stay as they are.
// The REP page (/rep/) shows rep-role and rep-holding too (repFaq in rep.ts), so a link in those answers must
// make sense on both pages. Token identity: rep.ts currentRep, the Moon Fork case study
// (src/content/fork-guides/moon-fork.mdx) and the Q2 2026 report. No price or value claims about legacy REP
// (rep.ts, versions). The migration window is closed: no answer may read as an instruction to migrate.
// Nothing in Augur Lituus is deployed: an answer about what a holder does in it says "will" or "under its design".
// Professional register, as in general.ts.
export const rep: FaqEntryInput[] = [
  {
    id: 'rep-role', question: "What is $REP's role in Augur?",
    answer: `$REP derives its value from securing Augur's oracle. Every question submitted to Augur Lituus will pay a fee in $REP: part goes to the reporter whose outcome stands, and the rest is burned. The oracle's usage pays for its own security.

In exchange, holders carry the oracle's security. Their staked $REP stands behind every outcome and is forfeited if they back a false one. Holders are paid to protect the truth, and the value of their token rests on the oracle being trusted.`,
    sources: ['owner-approved wording (melo, 15 November 2026), chosen from five versions; the second sentence corrected against the whitepaper and approved the same day with the answers of docs/records/faq-review.md', 'whitepaper §4.4.2 (the Query Fee is paid entirely in REP and split into Reporter Pay and a burned portion; "The protocol is designed to minimize the reporter fee and maximize profit"), §4.4.3 (Reporter Pay goes to the first participant to report the outcome that becomes final), §4.4.4 (any portion of the fee not paid to the reporter is burned; the expected supply reduction gives REP market value, and the cost to attack scales with market capitalization)', 'whitepaper §4.1, §4.3.1 (outcomes are backed by staked REP; those who backed a losing outcome forfeit their stakes, 80% to the winners and 20% destroyed)', 'public/rep.md, "Why would REP holders choose the honest fork?" (the design ties REP\'s value to demand for truthful answers; an assumption of the design, not a guarantee)', 'owner (melo, 15 November 2026): the token\'s value comes from keeping Augur secure, and its incentives are aligned with the truth'],
    reviewed: '2026-11-15', needsReview: false, aliases: ['lituus-rep-holders'],
  },
  {
    id: 'rep-holding', question: 'Does holding $REP earn rewards?',
    answer: `Not passively. Holding $REP pays no yield, dividend or share of fees. Once Augur Lituus is live, a holder will earn by taking part in protecting the oracle, in one of two ways:

- **Reporting.** A holder stakes $REP on the outcome of a question. If that outcome stands, the stake is returned with a reward paid from the question's fee.
- **Challenging.** A holder stakes $REP against an outcome they believe is false. If the challenge prevails, the stake is returned with a share of the stakes lost by those who backed the false outcome.

Both are optional, and a stake placed on an outcome that does not stand is forfeited.`,
    sources: ['owner-approved wording (melo, 15 November 2026), chosen from three versions; "Once Augur Lituus is live, a holder will earn" approved the same day with the answers of docs/records/faq-review.md', 'whitepaper §4.3.1, §4.4.3–4.4.4 (proposed rules: a reporter whose outcome stands recovers the stake and is paid from the question fee; a challenger whose outcome stands recovers the stake and shares in the losing stakes; a stake on an overturned outcome is forfeited)', 'rep.ts participation (reporting and challenging are optional)', 'Lituus-CS: nothing deployed (15 November 2026)'],
    reviewed: '2026-11-15', timeSensitive: true, needsReview: false, aliases: ['rep-actions', 'need-rep', 'rep-action'],
  },
  {
    // Framed as one token with a line of succession, not as a set of tokens: one REP is current at a time, and
    // each earlier one was replaced by a named event. Not on the REP page, whose "Which REP do you hold?" section
    // already shows the lineage. The last sentence was corrected after the first approval: the REP page gives the
    // current token's contract address, not each token's. The owner approved the correction on 15 November 2026.
    // On 16 November 2026 the owner asked for $REP throughout and $AUGUR for Kraken's ticker; "It is also written
    // $REP" went with that, since the sentence before it now says $REP.
    id: 'rep-lineage', question: 'Why is there more than one $REP token?',
    answer: `Each $REP token marks a stage in Augur's history:

- **${legacyRep[0].symbol}** was the first $REP issued, with Augur's original version.
- **${legacyRep[1].symbol}** replaced it when Augur v2 launched in 2020, and holders migrated from ${legacyRep[0].symbol} to ${legacyRep[1].symbol}.
- **${currentRep.symbol}** came out of the 2026 [Moon Fork](${pages.fork}moon-fork/) and is the token known as $REP today. Kraken lists it under the ticker $${currentRep.listing}.

${currentRep.symbol} is the only one that matters going forward: it is the token Augur Lituus will build on. The earlier tokens, and ${legacyRep[2].symbol} from the losing side of the fork, can no longer be converted to it and have no further use. The [$REP page](${pages.rep}) gives the current token's contract address.`,
    sources: ['owner-approved wording (melo, 15 November 2026), written to the owner\'s outline after eight rejected versions; the last paragraph approved the same day with the answers of docs/records/faq-review.md; its last sentence was corrected afterwards, and the owner approved the correction ("Yes, approve it"); "$REP" for "REP" and "$AUGUR" for Kraken\'s ticker at the owner\'s request on 16 November 2026', 'owner (melo, 15 November 2026): the outline, token by token, and that the earlier tokens will not be used anywhere', 'rep.ts currentRep and legacyRep (symbols, the ticker, where each token came from; none of the legacy tokens is current REP)', 'Augur v2 source at the deployed commit bd13a797: reporting/ReputationToken.sol (migrateFromLegacyReputationToken mints the REPv1 balance one for one)', 'docs/records/faq-research.md (deployed history: Augur v2, 2020)', 'fork-guides/migration.mdx and moon-fork.mdx (REPv2_Yes_1 for Yes, REPv2_No_1 for No; Kraken\'s AUGUR is a ticker for the same contract)', 'Q2 2026 report ("REPv2_Yes_1 is the token of the winning universe and the token Augur Lituus will build on"; the migration window closed permanently on 3 August 2026)', 'TokenCard.astro on /rep/ (the current token\'s address; the legacy addresses are not on that page)'],
    reviewed: '2026-11-16', needsReview: false, aliases: ['rep-versions', 'lituus-token',
      // Questions deleted on 15 November 2026 (parked.ts): which token is current and wallet display, with the old anchors they carried, and the old Moon Fork anchors.
      'which-rep', 'current-rep', 'legacy-rep', 'is-there-a-new-rep-token', 'does-the-old-rep-token-still-exist', 'rep-augur-ticker', 'is-augur-on-kraken-the-same-as-repv2-yes-1', 'rep-wallet', 'the-new-token-doesnt-appear-in-my-wallet-yet-is-something-wrong', 'price-sites', 'moon-fork', 'what-was-the-moon-fork', 'why-fork-on-purpose', 'moon-fork-result', 'moon-fork-proves', 'when-did-the-fork-start-and-end', 'what-happened-during-the-escalation-game-phase-1', 'what-happened-during-the-migration-window-phase-2', 'why-did-augur-fork', 'what-happened-if-someone-migrated-to-the-no-universe'],
  },
  {
    // The short form of "What happened to REP held before the Moon Fork?", deleted on 15 November 2026 (parked.ts
    // keeps the long one under the same id). It carries the old augur.net anchors about missed migration,
    // exchanges and recovery offers.
    id: 'rep-missed-migration', question: `I hold ${legacyRep[0].symbol} or ${legacyRep[1].symbol}. Can I still migrate?`,
    answer: `No. The Moon Fork's migration window closed for good on 3 August 2026, and no one can reopen it, the Lituus Foundation included. $REP that was not migrated remains ${legacyRep[0].symbol} or ${legacyRep[1].symbol} and has no role in Augur Lituus. Anyone offering to migrate, recover or unlock it is running a scam.`,
    sources: ['owner-approved wording (melo, 15 November 2026, with the answers of docs/records/faq-review.md; the last sentence, which linked the REP page, removed and "$REP" for "REP" at the owner\'s request on 16 November 2026)', 'Q2 2026 report ("The migration window closed permanently on August 3 and can\'t be reopened by anyone, including the Foundation"; "any offer to migrate them now is not legitimate"; about 4.6 million REP did not migrate)', 'rep.ts versions and versions.safety', 'https://www.augur.net/faq.md on 15 November 2026 (the live FAQ asks "I didn\'t move my REP in the Moon Fork. Can I still?")'],
    reviewed: '2026-11-16', needsReview: false,
    aliases: ['i-didnt-migrate-in-time-is-there-anything-i-can-do', 'i-own-repv2-what-happened', 'exchange-rep', 'my-rep-was-on-kraken-did-i-need-to-do-anything', 'what-about-rep-on-other-exchanges-gate-upbit', 'what-happened-to-rep-left-on-an-exchange', 'rep-scams', 'someone-offered-to-migrate-or-recover-my-rep-is-that-real'],
  },
  {
    // Names exchanges as text only: whether the site links to exchanges is an open decision
    // (docs/records/open-decisions.md). Not on the REP page for the same reason. The token is $REP here
    // (owner, 15 November 2026); $AUGUR appears only as Kraken's ticker, so buyers can find it there, written with
    // the $ to match "Why is there more than one $REP token?" (16 November 2026).
    // Also the answer to "Does $REP have a MiCA white paper?", merged here on 15 November 2026: never say the
    // white paper is published or that an exchange will list the token, and check its status against each
    // quarterly report. The contract address is on /rep/, which the answer links. Name only exchanges checked to
    // list the current token.
    id: 'buy-rep', question: 'Where can I buy $REP?',
    answer: `$REP trades on centralized and decentralized exchanges, such as Kraken, where its ticker is $${currentRep.listing}, and Uniswap. Earlier $REP tokens still exist under similar names, so check the [contract address](${pages.rep}) before buying. In the European Economic Area, wider availability depends on a MiCA white paper, which the Lituus Foundation has commissioned.`,
    sources: ['owner-approved wording (melo, 15 November 2026, with the answers of docs/records/faq-review.md; "$REP" for "REP" at the owner\'s request on 16 November 2026, and "$AUGUR" to match the token history answer)', 'Q2 2026 report (Kraken lists REPv2_Yes_1 under the ticker AUGUR and made it available for trading in supported regions; platforms still showed old REPv1 or REPv2 listings that had to be retired)', 'Q2 2026 report, "The MiCA white paper" (for exchanges to offer REP in the European Economic Area, REP needs a MiCA white paper; an agreement is signed with a specialist firm and the work is underway)', 'CoinGecko markets for the contract address in rep.ts currentRep, read on 15 November 2026 by the earlier session (Kraken and Uniswap V4 on Ethereum are the only markets listed; a live check, to repeat at each quarterly review)', 'rep.ts legacyRep (the earlier contracts still exist) and TokenCard.astro on /rep/ (the current token\'s contract address)'],
    reviewed: '2026-11-16', timeSensitive: true, needsReview: false, aliases: ['buy-augur', 'where-to-buy', 'mica-white-paper', 'mica'],
  },
];
