import type { LinkKey } from './links';

/** The About page story (website first, 19 October 2026; Figma About 218:258 waits for
 * "update figma", see figma-workflow.md). Every entry cites the primary source it rests on.
 * Dates use the source's own wording; `year` orders entries and spaces the line between them. */
export interface HistoryEntry {
  date: string;
  datetime?: string;
  year: number;
  title: string;
  text: string;
  source: { key: LinkKey; label: string };
  figure?: { value: string; caption: string };
}

/** Moon Fork report, 5 August 2026: REP migrated to Yes and to all universes combined.
 * The Q2 2026 report gives other totals (6,398,081.41 of 6,399,867.64); both round to 99.97%. */
const moonFork = { yes: 6_545_760.43, total: 6_547_546.66 };

export const history: HistoryEntry[] = [
  { date: '2015', datetime: '2015', year: 2015, title: 'The crowdsale',
    text: 'Augur holds one of Ethereum’s first crowdsales to fund a decentralized prediction market.',
    source: { key: 'testingPastFuture', label: 'Augur blog, July 2026' } },
  { date: '2018', datetime: '2018', year: 2018, title: 'Live on Ethereum',
    text: 'Augur launches on mainnet. REP holders settle disputed outcomes, and a fork is the last resort.',
    source: { key: 'testingPastFuture', label: 'Augur blog, July 2026' } },
  { date: 'March 2025', datetime: '2025-03', year: 2025, title: 'The restart',
    text: 'Long-time Augur community members restart the project in public as the Lituus Foundation, stewards of Augur’s treasury.',
    source: { key: 'reboot', label: 'Reboot roadmap, April 2025' } },
  { date: 'May 2025', datetime: '2025-05', year: 2025, title: 'Generalized Augur',
    text: 'A draft proposal, shared for comment, for a universal and permissionless oracle that any application can ask.',
    source: { key: 'generalized', label: 'Generalized Augur, May 2025' } },
  { date: 'January 2026', datetime: '2026-01', year: 2026, title: 'The whitepaper',
    text: 'The Augur Lituus whitepaper sets out how the oracle works, with a comparative analysis of oracle security.',
    source: { key: 'whitepaper', label: 'Augur Lituus whitepaper' } },
  { date: 'August 2026', datetime: '2026-08', year: 2026, title: 'The Moon Fork',
    text: 'A dispute over whether NASA’s Artemis II lifted off escalated all the way to a fork: the first full run of Augur v2’s fork on Ethereum mainnet. When migration closed on 3 August, Yes had won.',
    source: { key: 'moonFork', label: 'Moon Fork report' },
    figure: { value: `${(Math.floor(moonFork.yes / moonFork.total * 10_000) / 100).toFixed(2)}%`, caption: 'of migrated REP moved to Yes, the answer that matched what happened.' } },
  { date: 'Now', year: 2026, title: 'Building Augur Lituus',
    text: 'The core question flow is in place, and the work now focuses on disputes and forking.',
    source: { key: 'q2Report', label: 'Q2 2026 report' } },
];
