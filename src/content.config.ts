import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

// Ported from the old augur.net (docs/reference/ported-content.md). Served at their old URLs and not
// linked from the header or homepage.

// Blog posts, one folder each: /blog/<folder>/. `featuredImage` feeds the index cards.
const blog = defineCollection({
  loader: glob({ pattern: '*/index.mdx', base: './src/content/blog' }),
  schema: ({ image }) => z.object({
    title: z.string(), description: z.string(), author: z.string(),
    publishDate: z.date(), updatedDate: z.date().optional(), tags: z.array(z.string()).optional(),
    featuredImage: image(),
  }),
});

// The Augur v2 whitepaper, one file per section, with no frontmatter: /whitepapers/augur-v2/<file>/.
const whitepaperV2 = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/whitepaper-v2' }),
});

// The fork guides: /learn/fork/ (index.mdx) and /learn/fork/<file>/, ordered by `order`.
const forkGuides = defineCollection({
  loader: glob({ pattern: '*.mdx', base: './src/content/fork-guides' }),
  schema: z.object({
    title: z.string(), description: z.string(), topic: z.literal('fork'), order: z.number().int().nonnegative(),
    contentType: z.enum(['topic', 'lesson', 'guide', 'reference', 'case-study', 'historical-record']),
    label: z.string(), historical: z.boolean(), status: z.enum(['available', 'archived', 'planned']),
    presentation: z.enum(['standard', 'reference', 'case-study', 'historical-record']),
  }),
});

export const collections = { blog, whitepaperV2, forkGuides };
