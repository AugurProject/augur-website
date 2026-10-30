import type { APIContext } from 'astro';

// The whitepaper figures at the old site's URLs (/whitepapers/augur-v2/figures/<file>), which the
// Markdown sources ([slug].md.ts) reference relatively. The pages themselves use Astro's optimized copies.
// `?inline` embeds each file as a data URL, so prerendering needs no file system access.
const figures = import.meta.glob<string>('/src/content/whitepaper-v2/figures/*.jpeg', { query: '?inline', import: 'default', eager: true });

export function getStaticPaths() {
  return Object.entries(figures).map(([path, dataUrl]) => ({ params: { name: path.split('/').pop()! }, props: { dataUrl } }));
}

export function GET({ props }: APIContext) {
  const { dataUrl } = props as { dataUrl: string };
  const [meta, base64] = dataUrl.split(',', 2) as [string, string];
  const bytes = Uint8Array.from(atob(base64), char => char.charCodeAt(0));
  return new Response(bytes, { headers: { 'Content-Type': meta.slice('data:'.length).split(';')[0] || 'image/jpeg' } });
}
