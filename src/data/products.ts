import { links } from './links';
/** Figma Products 219:81. Descriptions and statuses require maintainer review. */
export const products = [
  { id: 'augur-lituus', name: 'Augur Lituus', tagline: 'Resolution for real-world outcomes.',
    description: 'The next generation of Augur’s oracle. Any app can ask a multiple-choice question. Anyone can report an answer, anyone can challenge it with a larger bond, and a fork is the last resort.',
    detail: 'Forcing a false answer is designed to cost more than the oracle’s entire market cap.',
    status: 'In development', builder: 'ChainSafe, reviewed by the Lituus Foundation', design: 'Augur Lituus whitepaper, January 2026', codeLabel: 'Lituus-CS, public on GitHub', paper: links.whitepaper.url, code: links.lituusCode.url, needsReview: true },
  { id: 'zoltar', name: 'Zoltar', tagline: 'Shared foundation for oracles.',
    description: 'A forkable oracle ledger. It records questions, universes, REP and forks, and never judges which answer is true.',
    detail: 'Different oracle designs can share the same REP, as long as they handle forking.',
    status: 'In development', builder: '', design: 'Zoltar whitepaper', codeLabel: 'AugurProject/zoltar, public on GitHub', paper: links.zoltarPaper.url, code: links.zoltarCode.url, needsReview: true },
  { id: 'augur-statoblast', name: 'Augur Statoblast', tagline: 'Prediction markets on Zoltar.',
    description: 'The prediction-market layer on Zoltar: collateral, reporting, disputes and settlement for each market. Statoblast Trading is its trading interface.',
    detail: '', status: 'In development', builder: 'Dark Florist, with Lituus Foundation backing', design: '', codeLabel: 'In the Zoltar repository', paper: '', code: links.zoltarCode.url, needsReview: true },
] as const;
