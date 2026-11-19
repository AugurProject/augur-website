import type { FaqEntryInput } from './index';
import { links } from '../links';
import { pages } from '../navigation';

// Augur Lituus: what it is, whether it is live, how it resolves an outcome, what secures it, whether anyone can
// override an outcome, what it can be used for, how an application will integrate it, and how it differs from
// Augur v1 and v2 and from trading venues. Developer questions sit here until there are enough for a section of
// their own. Mechanism is one clause and a link, never a walkthrough (docs/guides/update-faq.md): the longer
// answers on the four stages, time to finality, Invalid, forks, deterrence, value secured and the guarantee stay
// in parked.ts for the product page. Section numbers are the January 2026 whitepaper's (Garner and Monastirsky,
// "A Bribery-Resistant Group-Strategyproof Oracle"), re-read on 15 November 2026 at cb1ff1a. Lituus-CS code facts
// were read on 15 November 2026 (main fc7fd07, dev a999dcc). A question about Augur Lituus names it; "Augur" alone
// means the project. Nothing is deployed: an answer that describes how Augur Lituus works says "under its design",
// "is designed to" or "will". The attack-cost figure is the whitepaper authors' estimate under their stated
// assumptions (§3, §7.0.1), not a fixed cost. Status answers are time-sensitive:
// refresh them with each quarterly report (docs/guides/update-faq.md). Professional register, as in general.ts.
export const product: FaqEntryInput[] = [
  {
    id: 'augur-lituus', question: 'What is Augur Lituus?',
    answer: `Augur Lituus is a new version of Augur's oracle: a decentralized protocol that resolves questions about real-world events onchain, with no one in charge of the answer.

Under its design, anyone can ask a question for a fee in $REP, and anyone can report its outcome, or challenge a report, by staking $REP on an answer. The [whitepaper](${links.whitepaper.url}) sets out the design in full.`,
    sources: ['owner-approved wording (melo, 15 November 2026; "Under its design" and the last sentence approved the same day with the answers of docs/records/faq-review.md)', 'the-augur-lituus-whitepaper post (29 January 2026; infrastructure, not a competing market)', 'homepage ("Anyone can answer, anyone can challenge"; tenets: no governance, veto or multisigs)', 'whitepaper §2, §4.0.1–4.0.2, §4.1, §4.4.1 (proposed rules: anyone may ask for a fee in REP; staked reports and challenges)', 'links.ts whitepaper'],
    reviewed: '2026-11-15', timeSensitive: true, needsReview: false,
  },
  {
    // Also the answer to "Can developers build with Augur Lituus today?", merged here on 15 November 2026: the
    // two gave the same facts and links.
    id: 'lituus-status', question: 'Is Augur Lituus live?',
    answer: `No. Augur Lituus is in development, with launch expected in the second half of 2027, after testing and audits. Nothing is deployed yet, on mainnet or a testnet, so applications cannot build on it today. The code is developed in public on [GitHub](${links.lituusCode.url}), and the Lituus Foundation reports on progress every quarter on the [blog](${links.archive.url}).`,
    sources: ['owner-approved wording (melo, 15 November 2026, with the answers of docs/records/faq-review.md)', 'owner (melo, 15 November 2026): launch expected in the second half of 2027; roadmap.ts, the homepage roadmap, says 2027 only, and no published report gives the half-year', 'roadmap.ts (Testing & audits, up next, 2027; then Launch, 2027)', 'Lituus-CS: no releases and no deployment addresses in the repository; main fc7fd07 and dev a999dcc (15 November 2026)', 'links.ts archive (/blog/, quarterly reports) and lituusCode (AugurProject/Lituus-CS, public)'],
    reviewed: '2026-11-15', timeSensitive: true, needsReview: false, aliases: ['roadmap', 'audits', 'rules-final', 'build-today', 'developer-tools'],
  },
  {
    // The short form of the four-stage answer parked on 15 November 2026 (parked.ts keeps the long one under the
    // same id for the product page). No stake sizes, thresholds or windows here.
    id: 'who-decides', question: 'How does Augur Lituus resolve an outcome?',
    answer: `Through reports that anyone can make and anyone can challenge, each backed by a stake in $REP. Under the design, a question is submitted with a fee and a reporter stakes $REP on its outcome. If no one challenges the report, it becomes final. A challenger must stake more on a different outcome, and a dispute that keeps escalating ends in a fork, where $REP holders settle the outcome by migrating their tokens to the truthful universe. See [how Augur answers a question](${pages.workedExample}) for a worked example.`,
    sources: ['owner-approved wording (melo, 15 November 2026, with the answers of docs/records/faq-review.md; "to the truthful universe" added at the owner\'s request on 16 November 2026)', 'whitepaper §2 (a fee activates the oracle; a reporter places a bond), §2.1 and §4.1 (each dispute stakes twice the previous bond on a different outcome; an undisputed outcome resolves), §2.2 and §4.2.2–4.2.4 (a fork; REP holders migrate; the fork with the most migration wins)', 'learn/how-augur-answers-a-question.md (one example from start to finish; not a placeholder)'],
    // `fork` and the other fork ids opened "Do $REP holders need to take any action?" until it was removed on
    // 16 November 2026; this is the one answer left that names the fork.
    reviewed: '2026-11-16', needsReview: false, aliases: ['question-lifecycle', 'finality-time', 'disagreement', 'fork', 'what-is-a-fork-in-simple-terms', 'lituus-fork', 'future-fork', 'honest-fork'],
  },
  {
    // One answer for the security model, in place of the parked deterrence, value secured and guarantee answers.
    id: 'lituus-security', question: 'What secures Augur Lituus?',
    answer: `Reports and challenges are backed by staked $REP. Under the design, people who stake on a false outcome lose that stake. The [whitepaper](${links.whitepaper.url}) estimates the cost of corrupting an outcome at about 134% of $REP's fully diluted value under its stated assumptions.`,
    sources: ['owner-approved wording (melo, 16 November 2026, "lgtm"), written to the owner\'s brief of the same day', 'whitepaper §4.1 and §4.3.1 (outcomes are backed by staked REP; those who backed a losing outcome forfeit their stakes)', 'whitepaper §2.2 (buy and burn 50% of the supply twice), §3 (a likely attack cost of 134% of fully diluted valuation; readers are encouraged to substitute their own parameter estimates), §4.6 (acquire at least half of the REP that will participate in a fork, migrate it to the fraudulent fork, then buy half of the newly minted REP and migrate that too), §4.6.2 (an attack is rational only when the external incentives exceed the attack cost)', '134% is the whitepaper authors\' estimate under their stated assumptions (§3, §7.0.1)'],
    reviewed: '2026-11-16', needsReview: true, aliases: ['false-answers', 'bonds', 'whale-attack', 'token-vote', 'value-secured', 'guarantee', 'low-participation', 'compare'],
  },
  {
    id: 'override', question: 'Can the Lituus Foundation or the developers override an outcome?',
    answer: `No. The Augur Lituus design has no admin key, governance vote, multisig or veto. An outcome is set by staked reports that anyone can challenge and, in a dispute that escalates to a fork, by where $REP holders migrate. The Lituus Foundation and the developers can take part only as $REP holders, on the same terms as anyone else.`,
    sources: ['owner-approved wording (melo, 15 November 2026, with the answers of docs/records/faq-review.md)', 'whitepaper Abstract, §2 (no governance vote, multisig, committee or veto over outcomes), §4.2.4 (the fork that received the most migration wins)', 'homepage tenets (Permissionless; Trustless: no governance, veto or multisigs)', 'about.astro (no one holds a backstop or veto over Augur Lituus answers, the Foundation included)', 'Lituus-CS dev a999dcc, keyword search on 15 November 2026: the only owner-gated contract is the REP vault, owned by the oracle contract; no proxy (the code is neither final nor audited)', 'augurs-rising post (the Foundation\'s REP buyback): why the answer says on what terms the Foundation takes part'],
    reviewed: '2026-11-15', timeSensitive: true, needsReview: false, aliases: ['governance'],
  },
  {
    // Was "What applications can Augur Lituus power?" until 15 November 2026; the id is unchanged.
    id: 'lituus-applications', question: 'What can Augur Lituus be used for?',
    answer: `Any onchain application that settles value on a real-world outcome. Wherever a smart contract has to pay out, release funds or execute a decision based on an event it cannot observe, Augur Lituus is designed to supply the result, with no trusted party in between. It takes multiple-choice questions, the kind a price feed cannot answer: whether an event happened, who won, whether a condition was met.`,
    sources: ['owner-approved wording (melo, 15 November 2026; the title, "is designed to supply" and "It takes multiple-choice questions" approved the same day with the answers of docs/records/faq-review.md)', 'homepage applications (lead "Any protocol or app that needs to know what happened in the world")', 'public/index.md ("Smart contracts can\'t see the world"; "With Augur, no one controls the oracle")', 'the-augur-lituus-whitepaper post ("Augur Lituus will be designed as infrastructure to support them")', 'whitepaper §2 and §4.0.1 (the oracle resolves any multiple-choice question)', 'whitepaper §5 (oracles report objective ground truth)'],
    reviewed: '2026-11-15', needsReview: false, aliases: ['lituus-uses'],
  },
  {
    // The short form of the integration answer deleted on 15 November 2026 (parked.ts keeps the long one under
    // the same id). No fee figures and no chain: the whitepaper names no chain, and no launch fee is set.
    id: 'integration-flow', question: 'How will applications integrate Augur Lituus?',
    answer: `Through a contract call. An application will submit a multiple-choice question with a fee in $REP, then read the final outcome onchain once the question is resolved. Teams planning an integration can [talk to the team](${pages.contact}).`,
    sources: ['owner-approved wording (melo, 15 November 2026, with the answers of docs/records/faq-review.md; the sentence on Invalid and the clause on the changing interfaces removed at the owner\'s request on 16 November 2026)', 'whitepaper §2, §4.0.1 (a Query is a question with a finite list of outcomes), §4.4.1–4.4.2 (any participant may submit a Query; the fee is paid entirely in REP)', 'Lituus-CS dev a999dcc, Multiverse.sol read on 15 November 2026: createQuery and getOutcome; no releases', 'navigation.ts pages.contact'],
    reviewed: '2026-11-16', timeSensitive: true, needsReview: false, aliases: ['costs', 'chains', 'failure-cases', 'choosing-an-oracle', 'invalid', 'no-report', 'writing-questions'],
  },
  {
    id: 'augur-versions', question: 'How does Augur Lituus differ from Augur v1 and v2?',
    answer: `Augur v1 (2018) and Augur v2 (2020) were prediction market protocols built on top of their own oracle. One protocol did everything: people created markets, traded on outcomes and were paid once the oracle settled the result.

Augur Lituus is only the oracle, redesigned to stand on its own. It is a decentralized protocol with a single job, resolving outcomes, and it leaves markets and trading to the applications that use it.`,
    sources: ['owner-approved wording (melo, 15 November 2026)', 'history.ts (mainnet 2018)', 'docs/records/faq-research.md (deployed history: Augur v1 2018, Augur v2 2020)', 'whitepaper-v2/how-augur-works.md (Augur markets follow a four-stage progression: creation, trading, reporting and settlement)', 'the-augur-lituus-whitepaper post ("Rather than competing with existing prediction markets, Augur Lituus will be designed as infrastructure to support them")', 'roadmap.ts (Generalized Augur: a universal, permissionless oracle for any application)'],
    reviewed: '2026-11-15', needsReview: false, aliases: ['lituus-vs-v2', 'why-lituus'],
  },
  {
    // Polymarket and Kalshi are named only as trading venues: how they resolve their markets is not described,
    // and UMA is not mentioned here (owner, 15 November 2026). The title names Augur Lituus: the Foundation also funds a separate team's prediction market
    // (hidden from the live site), so "Augur" alone could not answer No.
    id: 'polymarket-kalshi', question: 'Does Augur Lituus compete with Polymarket and Kalshi?',
    answer: `No. Polymarket and Kalshi are trading venues, where people buy and sell positions on outcomes. Augur Lituus is not a venue. It is designed as the layer underneath one: the part that decides which outcome a market pays.

The two do different jobs. A platform that integrates Augur Lituus runs its own liquidity, trading and growth, and Augur Lituus handles the resolution layer.`,
    sources: ['owner-approved wording (melo, 15 November 2026)', 'the-augur-lituus-whitepaper post ("Rather than competing with existing prediction markets, Augur Lituus will be designed as infrastructure to support them")', 'augur-testing-past-building-future post (the design is meant to sit underneath such platforms rather than compete with them)'],
    reviewed: '2026-11-15', timeSensitive: true, needsReview: false,
  },
];
