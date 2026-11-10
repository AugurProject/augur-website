/** How it works: one walkthrough of taking part, from a question opening to getting
 * paid (owner + Augus, 19 Oct 2026). Resolution / Walkthrough 146:470 was read on
 * 5 October 2026. Mechanism facts: January 2026 Augur Lituus whitepaper §2, §4.0.1–4.0.2,
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

export const walkthrough: readonly {
  title: string; description: string; status: string; state: 'pending' | 'active' | 'final';
  answerLabel: string; outcome: 'YES' | 'NO' | null;
}[] = [
  { title: 'A question opens', description: 'Anyone can ask a multiple-choice question and pay a fee in REP. The fee funds a reward for reporting the right answer, and the reward grows the longer the question waits.',
    status: 'Awaiting report', state: 'pending', answerLabel: 'Possible outcomes', outcome: null },
  { title: 'Report what happened', description: 'Stake REP equal to the fee on the outcome you saw. Until its appeal period ends, anyone can challenge it.',
    status: 'Open to challenge', state: 'active', answerLabel: 'Reported answer', outcome: 'YES' },
  { title: 'Challenge a wrong answer', description: 'Think a report is wrong? Stake double its bond on the right outcome. Each challenge doubles the bond again and restarts the appeal period.',
    status: 'Challenge received', state: 'active', answerLabel: 'Current answer', outcome: 'NO' },
  { title: "Get paid when it's final", description: 'When an appeal period ends without a new challenge, the latest answer is final. Winners are paid, and apps act on the answer.',
    status: 'Final answer', state: 'final', answerLabel: 'Final answer', outcome: 'NO' },
];

/** Activity, one entry per step, oldest first: what happened and the REP involved (a fee
 * or a bond). The step's description explains each entry, so the log keeps one line per
 * event. `stake` marks a bond on an outcome. No addresses or times:
 * the card is illustrative (no invented addresses). */
export const ledger: readonly { event: string; amount?: number; stake?: 'YES' | 'NO'; you?: boolean; replacedAt?: number }[] = [
  { event: 'Query opened', amount: fee },
  // The challenge replaces this report: from step 2 the card strikes it through.
  { event: 'Reported YES', amount: bond, stake: 'YES', replacedAt: 2 },
  { event: 'Challenged with NO', amount: challenge, stake: 'NO', you: true },
  { event: 'NO is final' },
];
