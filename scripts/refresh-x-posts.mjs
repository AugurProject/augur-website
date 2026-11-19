// Manual refresh only. Astro and its deploy jobs read the checked-in JSON without contacting X.
import { readFile, writeFile } from 'node:fs/promises';
import { fromHtml } from 'hast-util-from-html';
import { xPostAuthor, xPostSources, xPostUrl } from '../src/data/x-posts.ts';

const target = new URL('../src/data/x-post-snapshots.json', import.meta.url);
const selected = process.argv[2];
if (process.argv.length > 3 || (selected && !Object.hasOwn(xPostSources, selected))) {
  throw new Error(`Usage: npm run refresh:x-posts -- [${Object.keys(xPostSources).join(' | ')}]`);
}

const posts = selected ? [[selected, xPostSources[selected]]] : Object.entries(xPostSources);
const current = JSON.parse(await readFile(target, 'utf8'));
const handle = xPostAuthor.handle.slice(1).toLowerCase();
const element = (node, tag) => node.type === 'element' && node.tagName === tag;

function plainText(node) {
  if (node.type === 'text') return node.value;
  if (node.type !== 'element' || ['script', 'style'].includes(node.tagName)) return '';
  if (node.tagName === 'br') return '\n';
  const text = node.children.map(plainText).join('');
  // Keep the words in mentions and cashtags, but not the media links that trail oEmbed excerpts.
  return node.tagName === 'a' && /^pic\.(?:twitter|x)\.com\//i.test(text.trim()) ? '' : text;
}

function sourcePath(href) {
  const url = new URL(href);
  return url.protocol === 'https:' && ['x.com', 'twitter.com'].includes(url.hostname)
    ? url.pathname.replace(/\/+$/, '').toLowerCase()
    : '';
}

async function readPost(key, source) {
  const endpoint = new URL('https://publish.x.com/oembed');
  endpoint.search = new URLSearchParams({ url: xPostUrl(source.id), omit_script: 'true', hide_thread: 'true' });
  const response = await fetch(endpoint, { signal: AbortSignal.timeout(15_000) });
  if (!response.ok) throw new Error(`HTTP ${response.status} from X oEmbed`);
  const { author_url, html } = await response.json();
  if (typeof author_url !== 'string' || sourcePath(author_url) !== `/${handle}` || typeof html !== 'string') {
    throw new Error('Unexpected author or missing excerpt');
  }

  const { children } = fromHtml(html, { fragment: true });
  const quote = children.find(node => element(node, 'blockquote'));
  const paragraph = quote?.children.find(node => element(node, 'p'));
  const permalink = quote?.children.find(node => element(node, 'a') && typeof node.properties.href === 'string'
    && sourcePath(node.properties.href) === `/${handle}/status/${source.id}`);
  if (!paragraph || !permalink) throw new Error('Missing excerpt or matching source permalink');

  // oEmbed sometimes joins the opening sentence to the next paragraph's @mention without a break.
  const text = plainText(paragraph).trim().replace(/([.!?])(?=@[a-z\d_])/gi, '$1\n\n')
    .split(/\n\s*\n/).map(part => part.replace(/\s+/g, ' ').trim()).filter(Boolean)
    .slice(0, source.paragraphs).join('\n\n');
  const rawDate = plainText(permalink).trim();
  const date = new Date(`${rawDate} UTC`);
  if (!text || !/^[A-Za-z]+ \d{1,2}, \d{4}$/.test(rawDate) || Number.isNaN(date.valueOf())) {
    throw new Error('Invalid excerpt or publication date');
  }
  return [key, { id: source.id, text, date: date.toISOString().slice(0, 10) }];
}

// Stop before writing anything if any requested post fails validation or is no longer available.
const entries = await Promise.all(posts.map(async ([key, source]) => {
  try { return await readPost(key, source); }
  catch (error) { throw new Error(`Cannot refresh ${key}: ${error.message}`, { cause: error }); }
}));
const next = selected ? { ...current, ...Object.fromEntries(entries) } : Object.fromEntries(entries);
const json = `${JSON.stringify(next, null, 2)}\n`;
if (json !== `${JSON.stringify(current, null, 2)}\n`) {
  await writeFile(target, json);
  console.log(`Updated ${entries.length} X post snapshot(s). Review the JSON diff.`);
} else {
  console.log(`No changes in ${entries.length} X post snapshot(s).`);
}
