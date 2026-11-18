import type { FaqEntryInput } from './index';
import { links } from '../links';
import { pages } from '../navigation';

// Augur, the project: what it is, what an oracle is, whether it is back and who is behind it, whether there is
// anywhere to trade, and where to follow it. Everything about Augur Lituus, including how it differs from Augur
// v1 and v2 and from trading venues, is in product.ts. Professional register (owner, 13 November 2026;
// docs/guides/update-faq.md): third person, a definition first, precise terms defined once, no contractions or
// casual asides. State the history plainly, nothing romanticised or guessed. Keep Dark Florist's work at arm's
// length: Augur Lituus is "one of the next versions of Augur's oracle" or "a new version", never the next version
// or the rebuild. Dark Florist is named once, in "Is Augur back?", as an independent team the Foundation funds
// (owner, 15 November 2026); its products are not named, and it is not linked.
// Channel links come from links.ts (the official footer) and navigation.ts. The GitHub link goes to Lituus-CS,
// not the AugurProject organization, whose page also lists Dark Florist's work.

export const general: FaqEntryInput[] = [
  {
    id: 'what-is-augur', question: 'What is Augur?',
    answer: `Augur is a decentralized oracle protocol that resolves real-world outcomes for smart contracts without relying on a trusted company, committee or individual. Any participant can report an outcome, or challenge a false one, by backing the truthful answer with $REP, Augur's native token.

Augur launched on Ethereum in 2018 as a prediction market protocol with its own oracle, and the Lituus Foundation has been its steward since 2025. Development now centers on Augur Lituus, one of the next versions of Augur's oracle, built for prediction markets and any other application that needs onchain answers.`,
    sources: ['owner-approved wording (melo, 15 November 2026; the sentence on the cost of a false outcome, added the same day, removed at the owner\'s request on 16 November 2026)', 'augur-testing-past-building-future post (a decentralized prediction market protocol, on mainnet in 2018; participants stake value on competing answers and lose it when they back the wrong one)', 'whitepaper-v2/how-augur-works.md (markets, trading, reporting and settlement in one protocol)', 'about.astro "Who does what" (the Foundation took on stewardship of Augur and its treasury in 2025) and history.ts (2018; March 2025)', 'about.astro hero and Q1/Q2 2026 reports ("one of the next versions of Augur\'s oracle")', 'roadmap.ts (Generalized Augur: a universal, permissionless oracle for any application) and the-augur-lituus-whitepaper post (infrastructure to support prediction markets)', 'homepage tenets (Permissionless, Trustless)'],
    reviewed: '2026-11-16', needsReview: false, aliases: ['augur-today', 'prediction-market-or-oracle'],
  },
  {
    id: 'what-is-an-oracle', question: 'What is a blockchain oracle?',
    answer: `A blockchain oracle is infrastructure that supplies smart contracts with information from outside their blockchain.

Smart contracts can read only data recorded onchain. They cannot independently verify external events such as a sports result, an election outcome or a product launch. An oracle reports those outcomes onchain so that the contracts that depend on them can settle.

Because the oracle determines the outcome, it also determines how those contracts settle; in a prediction market, that means who is paid. An oracle controlled by a single company or a small group is a central point of failure. It can make mistakes, be compromised, or be pressured or bribed, and the incentive to corrupt it grows with the value at stake. Augur is designed so that no single party determines the outcome: anyone can report or challenge an answer, with $REP at stake behind every report.`,
    sources: ['owner-approved wording (melo, 13 November 2026; "It can make mistakes" for "It can err", 15 November 2026; "$REP" for "REP", 16 November 2026)', 'learn/what-is-an-oracle.md ("Whoever tells them what happened controls the money")', 'the-augur-lituus-whitepaper post (truth under pressure)'],
    // 'why-decentralized' was "Why build a decentralized, permissionless and trustless oracle?", removed for now
    // (owner, 15 November 2026; docs/records/decisions.md).
    reviewed: '2026-11-16', needsReview: false, aliases: ['why-it-matters', 'why-decentralized'],
  },
  {
    id: 'is-augur-back', question: 'Is Augur back?',
    answer: `Yes. In March 2025, long-time members of the Augur community restarted the project as the Lituus Foundation, entrusted with Augur's original treasury to fund the work.

In January 2026 the Foundation published the design for Augur Lituus, a new version of Augur's oracle, and it has engaged ChainSafe, an independent engineering firm, to build it. Separately, the Foundation funds Dark Florist, an independent team working on its own oracle and prediction market.

In August 2026, Augur v2 completed the Moon Fork, the first fork in Augur's history. The Foundation publishes quarterly progress reports on the [blog](${links.archive.url}).`,
    sources: ['owner-approved wording (melo, 13 November 2026; the Dark Florist sentence requested by the owner, 15 November 2026; the Moon Fork sentence approved on 15 November 2026 with the answers of docs/records/faq-review.md, and its link to the case study removed at the owner\'s request on 16 November 2026)', 'augur-testing-past-building-future post (the Foundation funds Dark Florist, an independent team building a censorship-resistant prediction market, which pursues its own oracle research)', 'AugurProject/zoltar README, read 15 November 2026 (Zoltar, the forkable oracle base layer; Augur Statoblast, the prediction-market application layer)', 'links.ts archive (/blog/, quarterly reports tagged "quarterly")', 'augur-reboot-2025 post (long-time community members entrusted with the treasury)', 'history.ts (March 2025)', 'the-augur-lituus-whitepaper post (January 2026; treasury stewardship transferred to further Augur oracle work)', 'Q1 2026 report (partnered with ChainSafe to build Augur Lituus)', 'Q2 2026 report (the migration window closed on 3 August 2026; "The Moon Fork was Augur\'s first")'],
    reviewed: '2026-11-16', timeSensitive: true, needsReview: false, aliases: ['what-is-the-reboot-building', 'what-happened', 'lituus-builders'],
  },
  {
    id: 'who-is-behind', question: 'Who is behind Augur?',
    answer: `The Lituus Foundation. Formed by long-time members of the Augur community, it has been Augur's steward since 2025: it coordinates the project and allocates resources from the treasury to the research, development and experimentation that advance Augur's oracle.`,
    sources: ['owner-approved wording (melo, 15 November 2026)', 'augur-reboot-2025 post (long-time community members entrusted with the treasury)', 'about.astro "Who does what" (the Foundation took on stewardship of Augur and its treasury in 2025)', 'SiteFooter.astro (Augur\'s work is funded and coordinated by the Lituus Foundation)', 'the-augur-lituus-whitepaper post (in 2025, stewardship of the original Augur treasury was transferred to the Lituus Foundation for the purpose of furthering Augur oracle experimentation)', 'history.ts (restart March 2025)'],
    reviewed: '2026-11-15', timeSensitive: true, needsReview: false,
  },
  {
    // Back on 15 November 2026 after two removals (13 and 15 November; docs/records/decisions.md), in a shorter
    // form. "Augur does not operate a trading venue" is the drafter's wording, which the owner approved knowing it
    // has no published source. It says nothing about the Foundation-funded prediction market, which stays off the
    // site, and nothing about shares from Augur v1 or v2 markets: the sentence that sent their holders to Discord
    // was removed on 16 November 2026, and whether old shares can be redeemed was not re-checked.
    id: 'trading', question: 'Can I trade on Augur today?',
    answer: `No. Augur does not operate a trading venue. Augur Lituus is an oracle that prediction markets and other applications can use to resolve outcomes, and it is still in development.`,
    sources: ['owner-approved wording (melo, 15 November 2026), shown with the note that the second sentence is the drafter\'s wording and not a sourced statement; the sentence sending holders of Augur v1 and v2 shares to Discord removed at the owner\'s request on 16 November 2026', 'the-augur-lituus-whitepaper post ("Rather than competing with existing prediction markets, Augur Lituus will be designed as infrastructure to support them")', 'Lituus-CS: no releases; main fc7fd07 and dev a999dcc (15 November 2026)', 'https://www.augur.net/faq.md on 15 November 2026 (the live FAQ asks "Where can I trade on Augur?")'],
    reviewed: '2026-11-16', timeSensitive: true, needsReview: false, aliases: ['what-can-i-do-today', 'can-i-use-augur-today', 'old-markets'],
  },
  {
    id: 'official-channels', question: "What are Augur's official channels?",
    answer: `- [Discord](${links.discord.url}): ask questions and talk with the team and community
- [Telegram](${links.telegram.url}): chat with the community
- [X](${links.x.url}): get announcements
- [Blog](${links.archive.url}): read the quarterly progress reports
- [GitHub](${links.lituusCode.url}): follow the Augur Lituus code as it is built
- [Lituus Foundation](${links.foundation.url}): see who is leading Augur's restart
- [Contact page](${pages.contact}): talk to the team about a project`,
    sources: ['owner-approved wording (melo, 13 November 2026; the line on direct messages, added on 15 November 2026, removed at the owner\'s request on 16 November 2026)', 'links.ts (official footer: discord, telegram, x, foundation; lituusCode; archive) and navigation.ts pages.contact', 'augur-testing-past-building-future post (every commit in public)', 'augur-reboot-2025 post (Lituus Foundation leads the restart)'],
    reviewed: '2026-11-16', needsReview: false, aliases: ['talk-to-team', 'follow-development', 'contribute'],
  },
];
