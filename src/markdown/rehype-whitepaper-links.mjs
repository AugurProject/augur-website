import { visit } from 'unist-util-visit';

// The whitepaper's Markdown links between its own files (`how-augur-works.md#9-fork`), as in the
// AugurProject/whitepaper source. On the site each file is a page under its edition's path.
const editions = [{ source: '/src/content/whitepaper-v2/', path: '/whitepapers/augur-v2/' }];

/** Rewrites `<file>.md#fragment` links in whitepaper sources to `/whitepapers/<edition>/<file>/#fragment`.
 * Figures are left to Astro's image pipeline. */
export default function rehypeWhitepaperLinks() {
	return (tree, file) => {
		const edition = typeof file?.path === 'string' && editions.find(({ source }) => file.path.replaceAll('\\', '/').includes(source));
		if (!edition) return;
		visit(tree, 'element', (node) => {
			const href = node.tagName === 'a' ? node.properties?.href : undefined;
			if (typeof href !== 'string' || /^[a-z][a-z\d+.-]*:/i.test(href)) return;
			const [path, fragment] = href.split('#');
			if (!path.endsWith('.md')) return;
			const slug = path.replace(/^\.\//, '').replace(/\.md$/, '');
			node.properties.href = `${edition.path}${slug === 'index' ? '' : `${slug}/`}${fragment ? `#${fragment}` : ''}`;
		});
	};
}
