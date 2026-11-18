/** The FAQ (/faq/), rebuilt 11 November 2026 and regrouped on 15 November 2026 into three sections named for
 * their subjects (Augur, Augur Lituus, $REP): one file per section in this folder, entries in page order.
 * The REP page (/rep/) shows some of the same entries by id (repFaq in rep.ts), and /faq.md is generated
 * from them (src/pages/faq.md.ts), so an answer lives in exactly one place.
 * Writing and maintenance rules: docs/guides/update-faq.md. Why the page is organised this way:
 * docs/explanation/faq-content-strategy.md. Sources read for this rewrite: docs/records/faq-research.md. */
import { general } from './general';
import { rep } from './rep';
import { product } from './product';

export type FaqCategoryId = 'general' | 'product' | 'rep';

export interface FaqEntry {
  /** The question's URL fragment (/faq/#id). Never rename one: add the old id to `aliases` instead. */
  id: string;
  question: string;
  /** Markdown. Answer first, in plain words; then detail. Links go on words in the text, sparingly (rehype-faq.mjs
   * adds the off-site ↗); there are no buttons under answers. Interpolate shared facts rather than copying them. */
  answer: string;
  /** Where each consequential claim comes from: a links.ts key, a repository path or a whitepaper section. Never shown. */
  sources: string[];
  /** When the answer was last checked against its sources (YYYY-MM-DD). */
  reviewed: string;
  /** The answer describes a current state (development stage, exchange or wallet support) that goes stale.
   * Not shown to readers; docs/guides/update-faq.md lists these for review with each quarterly report. */
  timeSensitive?: boolean;
  /** Draft copy that awaits the owner's review (docs/records/decisions.md, 30 October 2026). Shown only in /faq.md. */
  needsReview: boolean;
  /** Old fragments that should open this entry, such as an id this question had before it was merged. */
  aliases?: string[];
  /** Built only while this is true, for an answer that depends on a products.ts switch. */
  when?: boolean;
}
export type FaqEntryInput = Omit<FaqEntry, 'category'>;
export interface FaqCategory { id: FaqCategoryId; title: string; entries: FaqEntry[] }

const topics: { id: FaqCategoryId; title: string; entries: FaqEntryInput[] }[] = [
  // The ids are the fragments from when these were General, Product and The Token; only the titles changed.
  { id: 'general', title: 'Augur', entries: general },
  { id: 'product', title: 'Augur Lituus', entries: product },
  { id: 'rep', title: '$REP', entries: rep },
];
/** Topics that were merged away, mapped to the topic that now holds their questions. `security-reports` was a
 * question ("How should bugs and security vulnerabilities be reported?"); no answer covers it now, so it opens
 * its section instead of an unrelated question. */
const topicAliases: Record<string, FaqCategoryId> = {
  'getting-started': 'general', history: 'general', following: 'general',
  lituus: 'product', 'how-it-works': 'product', security: 'product',
  builders: 'product', 'building-with-augur': 'product', 'security-reports': 'product',
};

export const faqCategories: FaqCategory[] = topics.map(({ entries, ...topic }) => ({ ...topic, entries: entries.filter(entry => entry.when !== false) }));
export const faqEntries: FaqEntry[] = faqCategories.flatMap(category => category.entries);
export const faqEntry = (id: string) => {
  const entry = faqEntries.find(item => item.id === id);
  if (!entry) throw new Error(`Unknown FAQ entry ${id}`);
  return entry;
};

/** Old fragments, mapped to what they now open: `faq-<id>` from the page before November 2026, a merged
 * question's id, or a merged topic's id. */
export const faqAliases: Record<string, string> = {
  ...Object.fromEntries(faqEntries.flatMap(entry => [entry.id, ...(entry.aliases ?? [])].map(alias => [`faq-${alias}`, entry.id]).concat((entry.aliases ?? []).map(alias => [alias, entry.id])))),
  ...topicAliases,
};

// Fragments must be unique across questions, aliases and topics, or a link would open the wrong thing.
{
  const seen = new Set<string>([...faqCategories.map(category => category.id), ...Object.keys(topicAliases)]);
  for (const entry of faqEntries) for (const id of [entry.id, ...(entry.aliases ?? [])]) {
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(id)) throw new Error(`FAQ id "${id}" must be lower-case words joined by hyphens`);
    if (seen.has(id)) throw new Error(`FAQ id "${id}" is used twice`);
    seen.add(id);
  }
  for (const entry of faqEntries) if (!/^\d{4}-\d{2}-\d{2}$/.test(entry.reviewed)) throw new Error(`FAQ entry ${entry.id} needs a reviewed date`);
}
