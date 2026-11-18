import { unified, type MarkdownRenderer } from '@astrojs/markdown-remark';
import rehypeFaq from './rehype-faq.mjs';

// FAQ answers are short Markdown strings in src/data/faq/, so shared facts (the REP address, links.ts
// destinations) can be interpolated rather than copied. They render at build time with GFM and smart
// punctuation, plus the site's ↗ on off-site links (rehype-faq.mjs). One renderer serves every answer.
let renderer: Promise<MarkdownRenderer> | undefined;

export async function renderFaqMarkdown(markdown: string): Promise<string> {
  renderer ??= unified({ rehypePlugins: [rehypeFaq] }).createRenderer({ syntaxHighlight: false });
  return (await (await renderer).render(markdown)).code;
}

/** Plain text of an answer, for search and structured data: Markdown syntax dropped, link labels kept. */
export const faqPlainText = (markdown: string) => markdown
  .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
  .replace(/[*_`>|#]/g, '')
  .replace(/^\s*(?:-|\d+\.)\s+/gm, '')
  .replace(/\s+/g, ' ')
  .trim();
