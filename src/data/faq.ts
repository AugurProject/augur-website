import {links} from './links';
export type FaqCategory = 'Getting started' | 'How it works' | 'REP' | 'Building with Augur';
export interface FaqEntry { id: string; question: string; pageQuestion?: string; answer: string; category: FaqCategory; homepage: boolean; needsReview: boolean; link: { href: string; label: string }; }
export const faqEntries: FaqEntry[] = [
  { id: 'augur-today', category: 'Getting started', homepage: true, needsReview: false,
    question: "How does today's Augur relate to its earlier prediction markets?", pageQuestion: 'Is Augur still a prediction market?',
    answer: "Augur launched on Ethereum in 2018 as a decentralized prediction market protocol, with REP holders settling disputed outcomes. Augur v2 still runs today, and in August 2026 its fork mechanism completed its first live run. Augur Lituus, the next generation of Augur's oracle, is designed to resolve questions for other prediction markets and applications, not only Augur's own.",
    link: { href: links.moonFork.url, label: 'Moon Fork report ↗' } },
  { id: 'rep-role', category: 'REP', homepage: true, needsReview: false, question: 'What role does REP play?',
    answer: "REP secures Augur's oracle. Participants back answers and challenges with REP bonds, and if a dispute reaches a fork, holders migrate their REP to the universe they believe reflects reality. Augur Lituus is being built around REPv2_Yes_1, the REP that migrated to the winning universe in the Moon Fork.",
    link: { href: links.whitepaper.url, label: 'More about REP ↗' } },
  { id: 'invalid', category: 'How it works', homepage: true, needsReview: true, question: 'What if the question cannot be answered?',
    answer: 'It resolves as Invalid. In the January 2026 design, Invalid covers malformed or unresolvable questions. A query also resolves as Invalid if no report arrives within its three-day reporting window.',
    link: { href: links.whitepaper.url, label: 'Read the whitepaper ↗' } },
];
