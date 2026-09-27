import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const blog = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    publishedAt: z.coerce.date(),
    author: z.string(),
    topics: z.array(z.string()).default([]),
    audiences: z.array(z.string()).default([]),
    historical: z.boolean().default(false),
    correction: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

const learn = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/learn" }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    prerequisites: z.array(z.string()).default([]),
    versionContext: z.string().optional(),
    reviewedAt: z.coerce.date().optional(),
    draft: z.boolean().default(false),
  }),
});

const research = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/research" }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    edition: z.string(),
    publishedAt: z.coerce.date().optional(),
    revisedAt: z.coerce.date().optional(),
    sourceUrl: z.string().url(),
    product: z.string().optional(),
    version: z.string().optional(),
    status: z.enum(["current", "historical", "discussion"]),
    limitations: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog, learn, research };
