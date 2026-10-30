import { visit } from 'unist-util-visit';
import { leadingEmojiLength } from './emoji.mjs';

/** MDX: a paragraph that starts with an emoji (the blog's 👉 lines) becomes a callout block.
 * The emoji is dropped and Prose.astro styles `.callout`. Same behaviour as the old site's plugin. */
export default function rehypeCallouts() {
	return (tree) => {
		visit(tree, 'element', (node) => {
			if (node.tagName !== 'p') return;
			const text = node.children.find((child) => child.type === 'text');
			if (!text) return;
			const length = leadingEmojiLength(text.value);
			if (!length) return;
			text.value = text.value.slice(length);
			node.tagName = 'div';
			node.properties.className = ['callout'];
		});
	};
}
