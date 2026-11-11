import { visit } from 'unist-util-visit';

// Content ported from the old augur.net (docs/reference/ported-content.md). Learn guides are not touched.
const ported = ['/src/content/blog/', '/src/content/whitepaper-v2/', '/src/content/fork-guides/'];
// The ported posts link to the old site by absolute URL; those pages now live on this site.
const ownHosts = new Set(['augur.net', 'www.augur.net']);

const offsite = (href) => {
	if (/^mailto:/i.test(href)) return true;
	if (!/^https?:\/\//i.test(href)) return false;
	try { return !ownHosts.has(new URL(href).hostname); } catch { return true; }
};

/** Site conventions for ported content, without changing its text:
 * - off-site links get the site's ↗ (hidden from screen readers, as elsewhere); hrefs stay as written;
 * - tables sit in a focusable scroll box, so wide ones scroll on their own on a phone. */
export default function rehypePortedContent() {
	return (tree, file) => {
		const path = typeof file?.path === 'string' ? file.path.replaceAll('\\', '/') : '';
		if (!ported.some((dir) => path.includes(dir))) return;
		visit(tree, 'element', (node, index, parent) => {
			if (node.tagName === 'table' && parent && index !== undefined) {
				// visit() still walks this table's cells (their links get the mark), then moves past the wrapper.
				parent.children[index] = { type: 'element', tagName: 'div', properties: { className: ['table-scroll'], tabIndex: 0 }, children: [node] };
				return;
			}
			const href = node.tagName === 'a' ? node.properties?.href : undefined;
			if (typeof href !== 'string' || !offsite(href)) return;
			node.children.push({ type: 'element', tagName: 'span', properties: { className: ['offsite-mark'], ariaHidden: 'true' }, children: [{ type: 'text', value: '↗' }] });
		});
	};
}
