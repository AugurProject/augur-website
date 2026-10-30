import type { APIContext } from 'astro';
import { getSections, type Section } from '../../../data/whitepapers';

// Each whitepaper file's Markdown source at the old site's URL (/whitepapers/augur-v2/<file>.md, the
// contents at index.md). The files have no frontmatter, so the entry body is the whole file less its
// final newline, which is put back so the response matches the file byte for byte.
export async function getStaticPaths() {
  return (await getSections()).map(section => ({ params: { slug: section.id }, props: { section } }));
}

export function GET({ props }: APIContext) {
  const { section } = props as { section: Section };
  return new Response(`${section.body ?? ''}\n`, { headers: { 'Content-Type': 'text/markdown; charset=utf-8' } });
}
