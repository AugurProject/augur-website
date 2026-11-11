import { getCollection, type CollectionEntry } from 'astro:content';

/** The blog ported from the old augur.net (docs/reference/ported-content.md). Shared by /blog/,
 * the post pages and /rss.xml so all three agree on order and paths. */
export type Post = CollectionEntry<'blog'>;

/** Newest first, as on the old blog index and feed. */
export async function getPosts(): Promise<Post[]> {
  return (await getCollection('blog')).sort((a, b) => b.data.publishDate.valueOf() - a.data.publishDate.valueOf());
}

export const postPath = (post: Post) => `/blog/${post.id}/`;

/** Frontmatter dates are calendar days (UTC midnight); format them in UTC so no time zone shifts the day. */
const dateFormat = new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
export const formatPostDate = (date: Date) => dateFormat.format(date);
export const isoDate = (date: Date) => date.toISOString().slice(0, 10);
