import { visit, SKIP } from 'unist-util-visit';

const offsite = (href) => /^[a-z][a-z\d+.-]*:/i.test(href);

/** Site conventions for FAQ answers (src/data/faq/), rendered by src/markdown/faq.ts:
 * - a link written in an answer stays a link, and an off-site one gets the site's ↗, hidden from screen readers;
 * - a bare www. address that GFM turns into a link (it gives it an http:// href; written links use https or a
 *   local path) stays plain text, so an address shown for checking isn't made clickable;
 * - a table sits in a focusable scroll box, so a wide one scrolls on its own on a phone. */
export default function rehypeFaq() {
	return (tree) => {
		visit(tree, 'element', (node, index, parent) => {
			if (!parent || index === undefined) return;
			if (node.tagName === 'table') {
				parent.children[index] = { type: 'element', tagName: 'div', properties: { className: ['table-scroll'], tabIndex: 0 }, children: [node] };
				return SKIP;
			}
			const href = node.tagName === 'a' ? node.properties?.href : undefined;
			if (typeof href !== 'string') return;
			if (href.startsWith('http://')) {
				parent.children.splice(index, 1, ...node.children);
				return [SKIP, index];
			}
			if (offsite(href)) node.children.push({ type: 'element', tagName: 'span', properties: { className: ['offsite-mark'], ariaHidden: 'true' }, children: [{ type: 'text', value: '↗' }] });
		});
	};
}
