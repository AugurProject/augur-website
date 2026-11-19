import { links } from './links.ts';
import snapshots from './x-post-snapshots.json' with { type: 'json' };

interface XPostSource {
  id: string;
  label: string;
  /** Keep only the opening paragraphs when the rest contains outdated instructions. */
  paragraphs?: number;
}

// Editorial registry for the Augur account only. Refresh the matching snapshot when adding or changing an ID.
export const xPostSources = {
  'augur-reboot': { id: '1900288560789684341', label: 'Augur’s initial reboot announcement' },
  'chainsafe-announcement': { id: '2048817619525083436', label: 'Augur’s ChainSafe announcement' },
  'kraken-listing': { id: '2079209259019989011', label: 'Kraken lists the new token' },
  // The linked original includes historical migration instructions; the window is closed.
  'okx-bitpanda-migration': { id: '2082881323677426038', label: 'OKX and Bitpanda will migrate REP automatically', paragraphs: 2 },
} satisfies Record<string, XPostSource>;

export type XPostKey = keyof typeof xPostSources;

export const xPostAuthor = {
  name: 'Augur',
  handle: `@${new URL(links.x.url).pathname.split('/').filter(Boolean)[0]}`,
  avatar: '/brand/kit/glyph/augur-glyph-reversed.svg',
};

export const xPostUrl = (id: string) => `${links.x.url.replace(/\/+$/, '')}/status/${id}`;

export function getXPost(key: string) {
  if (!Object.hasOwn(xPostSources, key)) throw new Error(`Unknown X post: ${key}`);
  const source = xPostSources[key as XPostKey];
  const stored: Record<string, { id: string; text: string; date: string }> = snapshots;
  const snapshot = stored[key];
  if (!snapshot || snapshot.id !== source.id) throw new Error(`Refresh the snapshot for X post: ${key}`);
  return { ...source, text: snapshot.text, date: snapshot.date, url: xPostUrl(source.id) };
}
