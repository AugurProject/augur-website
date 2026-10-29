/** How it works: one walkthrough of taking part, from a question opening to getting
 * paid (owner + Augus, 19 Oct 2026). Resolution / Walkthrough 146:470 was read on
 * 5 October 2026; the REP rows that were section 07 now live in each step's “Your REP”
 * zone. Mechanism facts: January 2026 Augur Lituus whitepaper §2, §4.0.1–4.0.2,
 * §4.1, §4.3.1, §4.4.2–4.4.3 and §4.5. Draft copy: every string
 * below awaits the owner's approval (docs/launch-checklist.md). */
export const walkthroughReview = { needsReview: true, source: 'Draft copy, 19 October 2026; January 2026 Augur Lituus whitepaper.' } as const;

/** The example question, in the five fields every question has (owner, 19 Oct 2026): a title
 * that states what is asked; a description of how each outcome connects to the question;
 * resolution criteria, the exact process for verifying the outcome; the outcome list (N
 * outcomes, here 3); and the information cutoff, after which new information is disregarded.
 * The terms are illustrative, written for the example (owner, 19 Oct 2026: “a good description
 * for whatever the question is”); they make no claim about Augur Lituus or the state of the
 * science. */
export const query = {
  title: 'Has room-temperature superconductivity been independently demonstrated at ambient pressure?',
  // One sentence per outcome, each starting with the outcome's name, so the card can set it in bold.
  description: [
    'YES means a material has been shown to superconduct at room temperature and normal atmospheric pressure, and independent groups have reproduced it.',
    "NO means no result meets the resolution criteria by the cutoff, including a claim that isn't reproduced in time.",
    "Invalid means the question can't be answered as written, for example because the evidence can't be judged against these criteria.",
  ],
  criteria: [
    'Find a public result, a peer-reviewed paper or a preprint with its data, that shows both zero electrical resistance and the Meissner effect (a magnetic field pushed out) at 20 °C (293 K) or warmer and at normal atmospheric pressure.',
    'Confirm that at least two research groups with no ties to the original team reproduced it, each with samples it made itself.',
    "Count only what was public before the information cutoff. Later results don't change the answer.",
  ],
  outcomes: ['YES', 'NO', 'Invalid'],
  cutoffDate: '8 Sep 2027, 00:00 UTC',
  cutoffIso: '2027-09-08T00:00:00Z',
  cutoffUnix: Date.UTC(2027, 8, 8) / 1000,
} as const;

/** Illustrative amounts, one source for the card. The first report's bond equals
 * the fee (§2, §4.1); a challenge doubles it; winners receive 80% of the losing
 * bond (§4.3.1, “most” in visible copy) and the other 20% is burned. */
// The whitepaper's own example (§4.5): a 15 REP fee, a reporter taking a sixth of it (2.5 REP)
// after 12 hours, a 15 REP bond and a 30 REP appeal.
const fee = 15, bond = fee, challenge = bond * 2, share = bond * 4 / 5, burned = bond - share, reward0 = fee / 6;
export const rep = { fee, bond, challenge, share, burned, reward0 } as const;
const amount = (value: number) => `${value} REP`;

/** A square in the zone: a bond (Pewter, one 32 px square per bond), what you gain
 * (Green: “80% of theirs” is 80% of a bond's area, the reward a smaller square), or
 * a lost bond (outlined). */
export type Square = 'bond' | 'share' | 'reward' | 'lost';
/** `amount` is a REP tag; `detail` is a plain line in its place; `label` replaces the squares'
 * own numbers (the reward when its amount is known). */
export interface Group { squares: Square[]; caption: string; amount?: string; detail?: string; label?: string }
/** Every panel leads with its payoff (owner, 19 Oct 2026: “more selly … use %”): a
 * label, a headline figure and a few words on what the figure is. The diagram under it
 * shows what you lock, what has to happen and what comes back, so no sentence repeats it
 * (owner, 19 Oct 2026: “too noisy”, so each fact is said once). Percentages are one question's payout in
 * REP from the whitepaper rules and these example amounts, never a yield or a rate,
 * and the loss case always sits in the same panel. */
interface Pitch { label: string; stat: string; statNote: string }
export type Zone = Pitch & (
  | { kind: 'meter'; scale: readonly [string, string]; caption: string; note: string }
  | { kind: 'flow'; summary: string; stake: Group; condition: string; outcome: Group[]; note: string }
  | { kind: 'receipt'; summary: string; outcome: Group[]; note: string });
const percent = (part: number, whole: number) => `${Math.round(part / whole * 100)}%`;

const reward: Group = { squares: ['reward'], caption: 'Reward', amount: `Up to ${amount(fee)}` };
export const walkthrough: readonly {
  title: string; description: string; status: string; state: 'pending' | 'active' | 'final';
  answerLabel: string; outcome: 'YES' | 'NO' | null; zone: Zone;
}[] = [
  { title: 'A question opens', description: 'Anyone can ask a multiple-choice question and pay a fee in REP. The fee funds a reward for reporting the right answer, and the reward grows the longer the question waits.',
    status: 'Awaiting report', state: 'pending', answerLabel: 'Possible outcomes', outcome: null,
    // The meter tops out at the fee: the reward is at most the whole fee.
    zone: { kind: 'meter', label: 'Reward offered', stat: `Up to ${amount(fee)}`, statNote: 'plus any tips',
      scale: ['0 REP', `${amount(fee)} fee`], caption: `In the whitepaper's example, a reporter takes it at ${amount(reward0)} after 12 hours.`,
      note: 'Paid to whoever first reports the answer that becomes final.' } },
  { title: 'Report what happened', description: 'Stake REP equal to the fee on the outcome you saw. Until its appeal period ends, anyone can challenge it.',
    status: 'Open to challenge', state: 'active', answerLabel: 'Reported answer', outcome: 'YES',
    zone: { kind: 'flow', label: 'If you report', stat: `+${percent(reward0, bond)}`, statNote: 'on your bond',
      note: `If your answer is overturned, you lose your ${amount(bond)} bond.`, summary: `If you report: stake ${amount(bond)}; if no one challenges, you get ${amount(bond)} back plus the reward, ${amount(reward0)} in the whitepaper's example.`,
      stake: { squares: ['bond'], caption: 'Your bond', amount: amount(bond) }, condition: 'No challenge',
      outcome: [{ squares: ['bond'], caption: 'Bond back', amount: amount(bond) }, { ...reward, label: String(reward0) }] } },
  { title: 'Challenge a wrong answer', description: 'Think a report is wrong? Stake double its bond on the right outcome. Each challenge doubles the bond again and restarts the appeal period.',
    status: 'Challenge received', state: 'active', answerLabel: 'Current answer', outcome: 'NO',
    zone: { kind: 'flow', label: 'If you challenge', stat: `+${percent(share, challenge)}`, statNote: 'on your bond', summary: `You challenge: stake ${amount(challenge)}; if your answer holds, you get ${amount(challenge)} back plus ${amount(share)}, ${percent(share, bond)} of the bond you challenged.`,
      stake: { squares: ['bond', 'bond'], caption: 'Double bond', amount: amount(challenge) }, condition: 'Answer holds',
      outcome: [{ squares: ['bond', 'bond'], caption: 'Bond back', amount: amount(challenge) }, { squares: ['share'], caption: `${percent(share, bond)} of theirs`, amount: amount(share) }],
      note: `If your answer is overturned, you lose your bond, and ${percent(share, bond)} of it goes to whoever was right.` } },
  { title: "Get paid when it's final", description: 'When an appeal period ends without a new challenge, the latest answer is final. Winners are paid, and apps act on the answer.',
    status: 'Final answer', state: 'final', answerLabel: 'Final answer', outcome: 'NO',
    zone: { kind: 'receipt', label: 'Your payout', stat: amount(challenge + share), statNote: 'plus the reward', summary: `You receive: your ${amount(challenge)} bond back, ${amount(share)} from the losing bond, and the reward, because you were first to stake on NO.`,
      outcome: [{ squares: ['bond', 'bond'], caption: 'Bond back', amount: amount(challenge) }, { squares: ['share'], caption: 'From the YES bond', amount: amount(share) }, { ...reward, detail: 'First to stake on NO' }],
      note: `The other ${amount(burned)} of the losing bond is burned.` } },
];

/** Activity, one entry per step, oldest first: what happened and the REP involved (a fee
 * or a bond). The step's description explains each entry, so the log keeps one line per
 * event. `stake` marks a bond on an outcome, which the card's outcome rows add up; the
 * REP panel under the steps is the payoff, Activity the history. No addresses or times:
 * the card is illustrative (no invented addresses). */
export const ledger: readonly { event: string; amount?: number; stake?: 'YES' | 'NO'; you?: boolean; replacedAt?: number }[] = [
  { event: 'Query opened', amount: fee },
  // The challenge replaces this report: from step 2 the card strikes it through.
  { event: 'Reported YES', amount: bond, stake: 'YES', replacedAt: 2 },
  { event: 'Challenged with NO', amount: challenge, stake: 'NO', you: true },
  { event: 'NO is final' },
];
/** Bonds on each outcome after step `step`, largest first. */
export const stakesAt = (step: number) => {
  const totals = new Map<'YES' | 'NO', number>();
  for (const entry of ledger.slice(0, step + 1)) if (entry.stake) totals.set(entry.stake, (totals.get(entry.stake) ?? 0) + entry.amount!);
  return [...totals].map(([outcome, value]) => ({ outcome, value })).sort((a, b) => b.value - a.value);
};
export { amount };

/** For anyone holding REP, under the walkthrough: two points, each a lead-in and one line.
 * The fork point follows the whitepaper §4.2.2 (REP that isn't migrated is effectively destroyed). */
export const holder = {
  title: 'Holding REP?',
  points: [
    { lead: 'Optional.', text: 'You never have to report or challenge.' },
    { lead: 'But never passive.', text: 'Holding REP is a duty to the truth. In a fork, move it to the universe that reflects reality, or it loses its value.' },
  ],
};
