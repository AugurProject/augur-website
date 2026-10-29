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
export const collections = { learn };
