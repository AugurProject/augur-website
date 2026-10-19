import { links } from './links';
import { rep as example } from './walkthrough';

/** The REP page (/rep/), rebuilt 19 October 2026. It is the token page
 * for traders and beginners and, like augur.net/rep today, the contract reference that
 * exchanges, wallets and explorers check. Mechanism: January 2026 Augur Lituus whitepaper
 * (proposed design, §§ cited per item). Tokens and history: the Lituus Foundation's REP
 * contract reference and FAQ on augur.net, the Moon Fork report and the Q2 2026 report
 * (deployed history). Amounts are the whitepaper's §4.5 example, from walkthrough.ts. */
export const repPageReview = { needsReview: true, source: 'Draft copy, 19 October 2026; sources in docs/sources.md.' } as const;

const percent = (part: number, whole: number) => `${Math.round(part / whole * 100)}%`;
/** Winners' share of a losing bond (§4.3.1); the rest is burned. */
const winnersShare = percent(example.share, example.bond), burnedShare = percent(example.burned, example.bond);
const amount = (value: number) => `${value} REP`;

/** The current token, as the Lituus Foundation's contract reference lists it. */
export const currentRep = {
  symbol: 'REPv2_Yes_1', name: 'Reputation', listing: 'AUGUR',
  chain: 'Ethereum mainnet', chainId: 1, decimals: 18,
  address: '0xCf6A0A7826fa124B7705d6f3c675eAD76f1e540D',
  checked: '19 October 2026',
  needsReview: true,
  source: 'augur.net/rep, the Lituus Foundation REP contract reference (updated 13 August 2026), and the Etherscan token page, read 19 October 2026. Maintainers confirm before launch.',
} as const;
// One source for the address: the explorer link must point at the same contract.
if (!links.repToken.url.endsWith(currentRep.address)) throw new Error('links.repToken must point at currentRep.address');
/** As wallets show it: the first six and last four characters. */
export const shortAddress = `${currentRep.address.slice(0, 6)}…${currentRep.address.slice(-4)}`;

/** The hero's clause, also /2/'s How it works lead (homepage-v2.ts): one source for the fact. */
export const stakedBehind = 'Every Augur Lituus answer has REP staked behind it';
export const hero = {
  title: 'REP makes lying expensive.',
  lead: `REP (Reputation) is Augur’s token. ${stakedBehind}: back a wrong one and you lose your bond, mostly to whoever was right. Holding REP never requires you to take part.`,
};

/** Lying gets more expensive every round (§2.1, §4.1, §4.2.1, §4.3.1): the first bond equals
 * the fee, each challenge stakes twice the previous bond on a different outcome, and a bond
 * that would pass the fork threshold (a share of all REP; §4.2.1 suggests 0.5–4%) starts a fork. */
export const ladder = {
  title: 'Lying gets more expensive every round',
  lead: 'Anyone can report what happened, and anyone who disagrees can challenge. Every challenge doubles the bond, so keeping a false answer standing costs more each round, until every REP holder decides.',
  rounds: [0, 1, 2, 3, 4].map(round => ({ bond: example.bond * 2 ** round, outcome: round % 2 ? 'NO' : 'YES' })),
  stages: [
    { title: 'Report', text: `Someone stakes a bond equal to the question’s fee on what happened.` },
    { title: 'Challenges', text: 'Anyone who disagrees stakes double on a different outcome. Each challenge doubles the bond again and restarts the appeal period.' },
    { title: 'Fork', text: 'If the next bond would pass the fork threshold, the question goes to every REP holder.' },
  ],
  final: `When an appeal period ends with no new challenge, the latest answer is final. Whoever backed it gets their bond back plus ${winnersShare} of the losing bonds; the other ${burnedShare} is burned.`,
};

/** Holding, reporting and challenging, ordered by commitment (ethereum.org's staking table).
 * Report: bond back plus Reporter Pay, 2.5 REP in §4.5 (§4.0.2, §4.4.3). Challenge: bond back
 * plus 80% of the bond it overturned (§4.3.1). Holding earns nothing directly (§4.4.4) and, in a
 * fork, REP that isn't moved is effectively destroyed (§4.2.2). Never a rate or a yield. */
export interface Cell { figure: string; note: string; gain?: boolean }
/** The note's first and last sentences, which /2/'s How it works example repeats under its card. */
export const exampleFigures = `Figures follow the whitepaper’s own example, a ${amount(example.bond)} fee.`;
export const proposedRules = 'These are the proposed rules: Augur Lituus is in development.';
export const participation = {
  title: 'Taking part is optional',
  lead: 'Holding REP asks nothing of you day to day. Rewards go only to people who report or challenge, and only when their answer holds.',
  fields: [{ key: 'stake', label: 'You stake' }, { key: 'get', label: 'You get' }, { key: 'risk', label: 'You risk' }] as const,
  options: [
    { id: 'hold', title: 'Hold', summary: 'Keep your REP.',
      stake: { figure: 'Nothing', note: 'You never have to report or challenge.' },
      get: { figure: 'No rewards', note: 'Holding alone earns none.' },
      risk: { figure: 'Only in a fork', note: 'Move your REP to a new universe, or it loses its value.' } },
    { id: 'report', title: 'Report', summary: 'Say what happened.',
      stake: { figure: amount(example.bond), note: 'A bond equal to the question’s fee.' },
      get: { figure: `+${amount(example.reward0)}`, gain: true, note: 'and your bond back, if no one challenges.' },
      risk: { figure: amount(example.bond), note: 'Your whole bond, if the answer is overturned.' } },
    { id: 'challenge', title: 'Challenge', summary: 'Correct a wrong answer.',
      stake: { figure: amount(example.challenge), note: 'Double the bond, on a different outcome.' },
      get: { figure: `+${amount(example.share)}`, gain: true, note: `${winnersShare} of the bond you overturned, and your bond back, if your answer holds.` },
      risk: { figure: amount(example.challenge), note: 'Your whole bond, if your answer is overturned.' } },
  ] satisfies { id: string; title: string; summary: string; stake: Cell; get: Cell; risk: Cell }[],
  note: `${exampleFigures} The reward rises from 0 REP until someone reports, up to the whole fee. ${proposedRules}`,
};

/** A fork under the proposed Augur Lituus rules (§2.2, §4.2.1–4.2.4, §4.3.3). */
export const fork = {
  title: 'If a fork happens',
  lead: 'A fork is the last resort, and the one time holding REP asks something of you: move your REP to the universe you believe reflects reality, or it loses its value.',
  steps: [
    { title: 'A bond reaches the fork threshold', text: 'Challenges have doubled the bond until the next one would pass a set share of all REP.' },
    { title: 'The universe splits', text: 'One new universe is created for each possible answer, each with its own REP. Other open questions start reporting again there.' },
    { title: 'You move your REP', text: 'Move it to the universe you believe reflects reality. Moving is one-way, and the whitepaper proposes a two-week window. REP you don’t move loses its value.', action: true },
    { title: 'The most-backed universe wins', text: 'The universe that receives the most REP settles the answer, and the original contracts follow it.' },
  ],
  diagram: {
    trunk: 'One universe', node: 'Fork', left: 'Not moved',
    branches: [{ label: 'YES universe', squares: 4, lead: true }, { label: 'NO universe', squares: 1 }, { label: 'Invalid universe', squares: 0 }],
    caption: 'Illustration: most REP moves to one universe.',
    summary: 'A fork splits one universe into one per answer: YES, NO and Invalid. In this illustration most REP moves to the YES universe and a little to NO; REP that isn’t moved stays behind and loses its value.',
  },
};

/** Augur v2's Moon Fork (deployed history): the augur.net FAQ (dispute from 8 April 2026,
 * escalation to early June, migration window to 3 August 2026), the Moon Fork report and the
 * approved roadmap copy. Augur v2's 60-day window is not the proposed Augur Lituus rule. */
export const moonFork = {
  title: 'The Moon Fork',
  meta: 'Augur v2 · 2026',
  text: 'Augur v2’s fork mechanism had its first live run over whether Artemis II had lifted off. It had: REP holders migrated to the universe they backed, and Yes won.',
  phases: [
    { label: 'Challenges', detail: 'About 8 weeks', start: '8 Apr', days: 56 },
    { label: 'Migration window', detail: '60 days', start: 'Early Jun', end: '3 Aug', days: 60 },
  ],
  note: 'Augur v2’s rules differ from the proposed Augur Lituus rules: its window was 60 days.',
  link: { href: links.moonFork.url, label: 'Read the Moon Fork report' },
};

/** REP versions. Status: augur.net/rep (“the earlier REPv2 and REPv1 contracts are now
 * legacy”; development continues on REPv2_Yes_1) and the augur.net FAQ. No value claims:
 * the FAQ's “expected to be worthless” stays off the site. */
export const versions = {
  title: 'Which REP do you hold?',
  lead: 'Since the Moon Fork there’s more than one REP, and only one is current. Check the contract address, not the name or ticker.',
  fields: [{ key: 'what', label: 'What it is' }, { key: 'holder', label: 'If you hold it' }] as const,
  rows: [
    { name: 'REPv1', status: 'Legacy', what: 'The original REP, from Augur’s first version.', holder: 'It isn’t used by Augur v2 or Augur Lituus.' },
    { name: 'REPv2', status: 'Legacy', what: 'Augur v2’s REP, in the universe that forked in 2026.', holder: 'If you didn’t move it during the Moon Fork, it stays there. The window closed on 3 August 2026 and can’t be reopened.' },
    { name: 'REPv2_Yes_1', status: 'Current', current: true, what: 'The REP of the Moon Fork’s winning universe. Augur development continues on it, and Augur Lituus is being built around it.', holder: `Some exchanges list it as ${currentRep.listing}.` },
    { name: 'REPv2_No_1', status: 'Other universe', what: 'The REP of the Moon Fork’s No universe, separate from Yes.', holder: `Augur development continues on ${currentRep.symbol}, not here.` },
  ],
  /** Where the lineage splits: between REPv2 and its two children. */
  fork: { after: 1, label: 'Moon Fork · 3 August 2026', text: 'REPv2 split into one REP per answer.' },
  /** augur.net FAQ, “Someone offered to migrate or recover my REP. Is that real?” */
  safety: {
    title: 'Migration is closed',
    text: 'The Moon Fork’s window closed on 3 August 2026 and can’t be reopened, so anyone offering to migrate, recover or unlock REP is running a scam. Augur and the Lituus Foundation won’t DM you first, and no legitimate process asks for your seed phrase or private keys.',
  },
};

/** Questions shown on the REP page, in order (entries live in faq.ts). */
export const repFaq = {
  title: 'Questions about REP',
  ids: ['rep-role', 'rep-holding', 'rep-augur-ticker', 'rep-wallet', 'rep-missed-migration', 'honest-fork'],
};
