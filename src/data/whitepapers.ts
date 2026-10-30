import { getCollection, type CollectionEntry } from 'astro:content';
import { links } from './links';

/** The whitepapers listed at /whitepapers/, ported from the old augur.net (src/lib/whitepaper.ts at
 * ba18725; docs/reference/ported-content.md). Only Augur v2 has a web edition. */
export const augurV2 = {
  path: '/whitepapers/augur-v2/',
  title: 'Augur: a Decentralized Oracle and Prediction Market Platform (v2.0)',
  shortTitle: 'Augur v2 Whitepaper',
  description: 'The Augur v2 whitepaper: a decentralized oracle and prediction market platform.',
  release: 'v2.0.16',
  // Commit of AugurProject/whitepaper the web edition was converted from.
  sourceRevision: '69accf630d20af5aee5ff3d78fcf6560f069ccfd',
  pdf: links.whitepaperV2Pdf.url,
  source: links.whitepaperSource.url,
  // Reading order; `index` (the contents page) comes first and has no previous/next.
  sectionOrder: ['abstract-and-introduction', 'how-augur-works', 'incentives-and-security', 'potential-issues-and-risks', 'acknowledgments', 'references', 'appendix-a-finalization-time-and-redistribution', 'appendix-b-bond-size-adjustments'],
} as const;

export const lituusPaper = {
  shortTitle: 'Augur Lituus Whitepaper',
  title: 'A Bribery-Resistant Group-Strategyproof Oracle',
  pdf: links.whitepaper.url,
  source: links.lituusPaperSource.url,
} as const;

export type Section = CollectionEntry<'whitepaperV2'>;

/** The contents page first, then the sections in reading order. */
export async function getSections(): Promise<Section[]> {
  const order: readonly string[] = ['index', ...augurV2.sectionOrder];
  const rank = (section: Section) => { const at = order.indexOf(section.id); return at < 0 ? order.length : at; };
  return (await getCollection('whitepaperV2')).sort((a, b) => rank(a) - rank(b));
}

/** A section's own `#` heading; the references file has none. */
export const sectionHeading = (section: Section) => section.body?.match(/^#\s+(.+)$/m)?.[1]?.trim();
export const sectionTitle = (section: Section) => sectionHeading(section) ?? 'References';
/** Shorter label for the breadcrumb and rail, as on the old site. */
export const sectionLabel = (section: Section) => section.id === 'abstract-and-introduction' ? 'Abstract' : sectionTitle(section);
export const sectionPath = (section: Section) => section.id === 'index' ? augurV2.path : `${augurV2.path}${section.id}/`;
/** The section's Markdown source, served at its old URL. */
export const sectionMarkdownPath = (section: Section) => `${augurV2.path}${section.id}.md`;
