import { links } from './links';
/** Dark Florist's products (Augur Statoblast and its interface, Statoblast Trading) are off the live site
 * for now (AUG72). Set to true to bring them back everywhere that reads this:
 * the Products menu, the products page, the FAQ answer, the About entry and the Learn guide. The
 * hand-written Markdown pages under public/ cannot read it; docs/records/decisions.md lists their restore edits.
 */
export const showStatoblast = false;
/** Zoltar is off the live site for now too (AUG73), so only Augur Lituus is left.
 * Set to true to bring it back in the same places, plus the "How they fit together" diagram, the About
 * "Open source" line and the Learn guide (which also needs showStatoblast). Independent of showStatoblast,
 * though Augur Statoblast runs on Zoltar: turn Zoltar on before, or with, Statoblast. The Markdown pages
 * under public/ cannot read it; docs/records/decisions.md lists their restore edits.
 */
export const showZoltar = false;
/** Descriptions and statuses require maintainer review. */
const allProducts = [
  {
    id: 'augur-lituus',
    name: 'Augur Lituus',
    tagline: 'Resolution for real-world outcomes.',
    description:
      'The next generation of Augur’s oracle. Any app can ask a multiple-choice question. Anyone can report an answer, anyone can challenge it with a larger bond, and a fork is the last resort.',
    detail: 'Forcing a false answer is designed to cost more than the oracle’s entire market cap.',
    status: 'In development',
    builder: 'ChainSafe, reviewed by the Lituus Foundation',
    design: 'Augur Lituus whitepaper, January 2026',
    codeLabel: 'Lituus-CS, public on GitHub',
    paper: links.whitepaper.url,
    code: links.lituusCode.url,
    needsReview: true,
  },
  {
    id: 'zoltar',
    name: 'Zoltar',
    tagline: 'Shared foundation for oracles.',
    description:
      'A forkable oracle ledger. It records questions, universes, REP and forks, and never judges which answer is true.',
    detail: 'Different oracle designs can share the same REP, as long as they handle forking.',
    status: 'In development',
    builder: '',
    design: 'Zoltar whitepaper',
    codeLabel: 'AugurProject/zoltar, public on GitHub',
    paper: links.zoltarPaper.url,
    code: links.zoltarCode.url,
    needsReview: true,
  },
  {
    id: 'augur-statoblast',
    name: 'Augur Statoblast',
    tagline: 'Prediction markets on Zoltar.',
    description:
      'The prediction-market layer on Zoltar: collateral, reporting, disputes and settlement for each market. Statoblast Trading is its trading interface.',
    detail: '',
    status: 'In development',
    builder: 'Dark Florist, with Lituus Foundation backing',
    design: '',
    codeLabel: 'In the Zoltar repository',
    paper: '',
    code: links.zoltarCode.url,
    needsReview: true,
  },
] as const;
export const products = allProducts.filter(
  (product) => (showStatoblast || product.id !== 'augur-statoblast') && (showZoltar || product.id !== 'zoltar'),
);
