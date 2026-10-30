import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

// Learn guides, ported from the web lab. `needsReview` marks a guide whose content isn't approved yet.
const review = { placeholder: z.boolean().default(false), needsReview: z.boolean().default(false), source: z.string() };
const learn = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/learn' }),
  schema: z.object({
    title: z.string(), description: z.string(), order: z.number().int().optional(),
    group: z.enum(['Start here', 'For builders', 'Overview', 'Research']),
    terms: z.array(z.string()).default([]), readingMinutes: z.number().int().positive().optional(),
    ...review,
  }),
});

// Ported from the old augur.net (docs/reference/ported-content.md). Served at their old URLs and not
// linked from the header, homepage or Learn index.

// Blog posts, one folder each: /blog/<folder>/. `featuredImage` feeds the index cards.
const blog = defineCollection({
  loader: glob({ pattern: '*/index.mdx', base: './src/content/blog' }),
  schema: ({ image }) => z.object({
    title: z.string(), description: z.string(), author: z.string(),
    publishDate: z.date(), updatedDate: z.date().optional(), tags: z.array(z.string()).optional(),
    featuredImage: image(),
  }),
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

export const collections = { learn, blog, forkGuides };
