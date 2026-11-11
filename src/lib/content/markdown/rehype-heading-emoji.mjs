import { visit } from 'unist-util-visit';
import { leadingEmojiLength } from './emoji.mjs';

/** MDX: drops the decorative emoji that open blog headings ("## 🔥 Q3 Summary"). The old site swapped
 * them for React-rendered Phosphor icons; the port shows the heading text only. Runs before Astro's
 * heading ids, so anchors stay as they were (#q3-summary). */
export default function rehypeHeadingEmoji() {
	return (tree) => {
		visit(tree, 'element', (node) => {
			if (!/^h[2-6]$/.test(node.tagName)) return;
			const first = node.children[0];
			if (first?.type !== 'text') return;
			const length = leadingEmojiLength(first.value);
			if (length) first.value = first.value.slice(length);
		});
	};
}
