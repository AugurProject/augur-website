import { faqCategories } from '../data/faq';

// /faq.md, the FAQ for LLMs and other plain-text readers (docs/reference/markdown-pages.md). Unlike the other
// pages' copies in public/, it's generated from the same entries as /faq/, so the two can't drift apart.
// Links to pages that have a Markdown copy point at that copy, as the hand-written files do, and off-site
// links carry the ↗.
const mdCopies = new Set(Object.keys(import.meta.glob('/public/**/*.md')).map(file => file.slice('/public'.length)));
const toMarkdownCopy = (href: string) => {
  if (!href.startsWith('/') || href.startsWith('//') || href.startsWith('/faq/')) return href;
  const copy = `${href.split('#')[0].replace(/\/$/, '') || '/index'}.md`;
  return mdCopies.has(copy) ? copy : href;
};
const withLinks = (markdown: string) => markdown.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_, text: string, href: string) => /^[a-z][a-z\d+.-]*:/i.test(href) ? `[${text} ↗](${href})` : `[${text}](${toMarkdownCopy(href)})`);

export function GET() {
  const lines = [
    '# Frequently asked questions',
    '',
    'Short answers about Augur, $REP and Augur Lituus. The HTML version is at https://www.augur.net/faq/, where every question has its own link (/faq/#<id>). Answers marked "Review flag" still need review.',
  ];
  for (const category of faqCategories) {
    lines.push('', `## ${category.title}`);
    for (const entry of category.entries) {
      lines.push('', `### ${entry.question}`, '', withLinks(entry.answer));
      if (entry.needsReview) lines.push('', 'Review flag: this answer still needs review.');
    }
  }
  return new Response(`${lines.join('\n')}\n`, { headers: { 'Content-Type': 'text/markdown; charset=utf-8' } });
}
