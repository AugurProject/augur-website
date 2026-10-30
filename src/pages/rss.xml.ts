import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getPosts, postPath } from '../data/blog';

// The old augur.net feed at the same URL, with the same channel and item fields, so existing
// subscribers keep receiving posts (docs/reference/ported-content.md).
export async function GET(context: APIContext) {
  const posts = await getPosts();
  return rss({
    title: 'Augur Blog',
    description: 'Latest insights and updates from the Augur Project',
    site: context.site!,
    items: posts.map(post => ({
      title: post.data.title,
      pubDate: post.data.publishDate,
      description: post.data.description,
      link: postPath(post),
      author: post.data.author,
      categories: post.data.tags,
    })),
    customData: '<language>en-us</language>',
  });
}
