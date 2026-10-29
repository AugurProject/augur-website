/** Canonical glossary, Figma Learn 220:354. */
export const glossary = [
  { id: 'oracle', term: 'Oracle', definition: 'A service that tells a blockchain what happened in the real world.' },
  { id: 'report', term: 'Report', definition: 'A proposed answer to a question, backed by a REP bond.' },
  { id: 'challenge', term: 'Challenge', definition: 'A different answer posted with a larger bond. It reopens the question.' },
  { id: 'bond', term: 'Bond', definition: 'REP put at risk behind an answer. Wrong answers lose most of their bond to the winners.' },
  { id: 'fork', term: 'Fork', definition: 'The last resort. REP holders move to the answer they believe; the total that moves decides the original oracle’s answer.' },
  { id: 'rep', term: 'REP', definition: 'Reputation: the token that secures Augur’s oracle.' },
  { id: 'universe', term: 'Universe', definition: 'A version of the ledger with its own REP. A fork creates one child universe per answer.' },
  { id: 'invalid', term: 'Invalid', definition: 'The result for a question that’s malformed or can’t be answered.' },
] as const;
