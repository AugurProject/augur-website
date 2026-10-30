# Ported content

Pages carried over from the old augur.net so its URLs keep working after the domain moves to this site (owner decision, 30 October 2026). The source is `AugurProject/augur-reboot-website` at `ba18725`, the revision www.augur.net served on 30 October 2026. The pages use this site's layout, tokens and type; they do not copy the old look.

The pages are reachable by URL and through links that already existed. They are not in the header menus, on the homepage or on the Learn index (owner decision, 30 October 2026); `/sitemap-index.xml` lists them like every other page.

## Pages

| URL | Here | Old source |
|---|---|---|
| `/blog/` | [blog/index.astro](../../src/pages/blog/index.astro) | `src/pages/blog/index.astro` |
| `/blog/<post>/`, 16 posts | [src/content/blog](../../src/content/blog/), [blog/[slug].astro](../../src/pages/blog/[slug].astro) | `src/content/blog` |
| `/rss.xml` | [rss.xml.ts](../../src/pages/rss.xml.ts) | `src/pages/rss.xml.ts` |
| `/whitepapers/` | [whitepapers/index.astro](../../src/pages/whitepapers/index.astro) | `src/pages/whitepapers/index.astro` |
| `/whitepapers/augur-v2/` and its 8 sections | [src/content/whitepaper-v2](../../src/content/whitepaper-v2/), [augur-v2/[...slug].astro](../../src/pages/whitepapers/augur-v2/[...slug].astro) | `src/content/whitepaper-v2` |
| `/whitepapers/augur-v2/<file>.md`, `index.md` | [augur-v2/[slug].md.ts](../../src/pages/whitepapers/augur-v2/[slug].md.ts) | `src/pages/whitepapers/[edition]/` |
| `/whitepapers/augur-v2/figures/<file>.jpeg` | [figures/[name].ts](../../src/pages/whitepapers/augur-v2/figures/[name].ts) | same |
| `/learn/fork/` and 5 guides | [src/content/fork-guides](../../src/content/fork-guides/), [learn/fork/[...slug].astro](../../src/pages/learn/fork/[...slug].astro) | `src/content/learn/fork` |
| `/privacy/`, `/terms/` | [privacy.astro](../../src/pages/privacy.astro), [terms.astro](../../src/pages/terms.astro) | same files |

Not ported: `/`, `/faq/`, `/learn/` and `/rep/` (this site has its own), `/mission/` and `/team/` (redirected to `/about/`), the 404 page, `robots.txt`, `llms.txt`, the fork-risk monitor and `/data/*`.

## Collections and rendering

- [content.config.ts](../../src/content.config.ts) defines `blog` (one folder per post; `featuredImage` is an `image()` used by the index cards), `whitepaperV2` (no frontmatter) and `forkGuides` (the old Learn frontmatter: `order`, `label`, `status`, `presentation` and so on). `learn` is unchanged.
- [blog.ts](../../src/data/blog.ts) orders posts newest first and formats dates in UTC for the index, the post pages and the feed. [whitepapers.ts](../../src/data/whitepapers.ts) holds the edition facts (release `v2.0.16`, source revision `69accf6`), the section order and each section's title, taken from its `#` heading ("References" has none).
- [astro.config.mjs](../../astro.config.mjs) sets the processors with `unified()` from `@astrojs/markdown-remark`. `.md` (the whitepaper and the Learn guides) gets `remark-math`, `rehype-katex` and the whitepaper link rewrite. `.mdx` (posts and fork guides) gets no math, so `$` in prose stays text.
- [src/markdown](../../src/markdown/): `rehype-whitepaper-links` turns `file.md#x` links into `/whitepapers/augur-v2/file/#x`; `rehype-callouts` turns a post paragraph that starts with an emoji (👉) into a `.callout`; `rehype-heading-emoji` drops the emoji that open post headings; `rehype-ported-content` adds ↗ to off-site links and wraps tables in a focusable scroll box, in the three ported collections only. Links to `augur.net` or `www.augur.net` count as internal.
- `katex` is pinned to `^0.16`, the version `rehype-katex` renders with; the 0.18 stylesheet renames KaTeX's classes and breaks the layout. Only the whitepaper route imports its CSS.
- Shared components in [src/components/content](../../src/components/content/): `Prose` (reading styles for all ported pages), `ProseCard` (framed note used inside MDX), `ArticleHeader`, `SectionRail` (document pages and headings), `PagerNav` (previous and next) and `LegalContacts`. Images go through `astro:assets`.
- The fork migration record (`presentation: historical-record`) keeps the old archive header: "Archive · Migration closed", "Moon Fork migration is closed".

## Differences from the old pages

The words are the old pages' words except where listed here.

- **Fork-risk monitor removed** (owner decision; the monitor and `/data/fork-risk.json` are dropped, and migration closed on 3 August 2026). In `index.mdx`: the learning outcome "read the site's fork monitor as a measurement of protocol state, not a probability forecast; and" (the bullet before it now ends "; and") and the section "What the monitor means". In `disputes-and-bonds.mdx`: "and how the fork monitor measures progress" from the description, and the section "How to read fork progress". In `what-to-do.mdx`: the section "Use the monitor as a signal" with its table, and the bullet "Do not treat a monitoring label as financial advice or as a guarantee that a fork will occur." Mentions of ForkWatch (v3.augur.net), a separate site, are kept.
- **Fork guide titles**: each guide's `# Title` line moved out of the body; the page header shows the same title as the page's `h1`.
- **Blog math**: the old site parsed `$…$` in posts as math, which showed "You don't spend $2 to steal $1." as code (Phase 2 post) and broke the dollar amounts, quotes and two links in "Augur Is Testing Its Past and Building Its Future". Both now render as written.
- **Icons**: the old React (`@phosphor-icons/react`) icons before every post heading are dropped, with the emoji they replaced.
- **Navigation**: the old React post bar and fork-guide drawer are static links (`PagerNav`, `SectionRail`), and the old site's `migration-cta.tsx` was unused and is not ported. The whitepaper's React actions menu is three links (Markdown, PDF, source); "Copy page", "Open in ChatGPT" and "Open in Claude" are dropped. The Lituus whitepaper's disabled "View web" button is the note "Web edition not published yet."
- **Legal pages**: wording unchanged; the closing community links read Discord, Telegram and GitHub instead of capitals. [privacy.astro](../../src/pages/privacy.astro) carries a comment that its text awaits a legal rewrite.
- **Not carried over**: the post pages' Open Graph image (their featured image), because [PageLayout.astro](../../src/layouts/PageLayout.astro) has no prop for one; and each whitepaper section's `<link rel="alternate">` to its Markdown, which PageLayout adds only for files in `public/`.

## Links to these pages

- [links.ts](../../src/data/links.ts): `archive`, `testingPastFuture`, `moonFork`, `q2Report`, `reboot` and `generalized` hold `/blog/` paths. `isExternal()` decides the ↗ wherever they render (About, both homepage designs' roadmaps, the live homepage's blog door, the REP page's Moon Fork link). FAQ labels mark ↗ by hand, so the two Moon Fork labels dropped it.
- The Markdown copies in [public](../../public/) link to `/blog/` paths without ↗; see [markdown pages](markdown-pages.md).
- The `/rss.xml` feed has the old title, description, language and items, with links built from `site` (`https://www.augur.net`).
