import { links, type LinkKey } from './links';
import { products } from './products';

/** `logo` marks a community destination wherever it is listed; `icon`,
 * `description` and `cta` only enrich the header panels. An item with a `cta`
 * leads its panel as a card whose action carries that label. */
export type NavigationItem = { label: string; href: string; external?: boolean; linkKey?: LinkKey; icon?: string; logo?: string; description?: string; cta?: string };
const external = (label: string, linkKey: LinkKey, extra: Partial<NavigationItem> = {}): NavigationItem => ({ label, href: links[linkKey].url, external: true, linkKey, ...extra });
/** Local pages other than the homepage. */
export const pages = { contact: '/contact/', learn: '/learn/' } as const;
const tagline = (id: (typeof products)[number]['id']) => products.find(product => product.id === id)!.tagline;

/** Header and footer consume this same directory. The blog is local (`/blog/`), ported from the old augur.net. */
export const navigation = {
  augur: [{ label: 'About', href: '/about/' }, { label: 'Contact', href: pages.contact }, { label: 'Brand assets', href: '/brand/' }],
  // Product taglines come from the products directory (Figma 219:81).
  // Augur Lituus leads the panel; Zoltar and Augur Statoblast follow it.
  products: [
    { label: 'Augur Lituus', href: '/products/#augur-lituus', description: tagline('augur-lituus'), cta: 'Explore Augur Lituus' },
    { label: 'Zoltar', href: '/products/#zoltar', description: tagline('zoltar') },
    { label: 'Augur Statoblast', href: '/products/#augur-statoblast', description: tagline('augur-statoblast') },
  ],
  resources: [
    { label: 'Blog', href: links.archive.url, linkKey: 'archive', icon: 'newspaper' }, { label: 'FAQ', href: '/faq/', icon: 'question' },
    { label: 'Learn', href: pages.learn, icon: 'book-open' }, { label: 'REP token', href: '/rep/', icon: 'coins' },
    external('Whitepaper', 'whitepaper', { icon: 'file-text' }),
  ],
  // Community logos identify each destination wherever it is listed (Figma 43:153).
  community: [external('Discord', 'discord', { logo: 'discord-logo' }), external('Telegram', 'telegram', { logo: 'telegram-logo' }), external('X', 'x', { logo: 'x-logo' }), external('GitHub', 'github', { logo: 'github-logo' })],
  // Footer only, under the funding line; not one of the navigation groups below.
  legal: [{ label: 'Privacy', href: '/privacy/' }, { label: 'Terms', href: '/terms/' }],
} satisfies Record<string, NavigationItem[]>;

export const navigationGroups = [
  { label: 'Augur', items: navigation.augur },
  { label: 'Products', items: navigation.products },
  { label: 'Resources', items: navigation.resources },
  { label: 'Community', items: navigation.community },
];
