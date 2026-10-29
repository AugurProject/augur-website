import { links } from './links';

/** Brand assets page (/brand/). Every logo file is a supplied master copied
 * byte-for-byte into public/brand/kit (docs/asset-provenance.json); rules and
 * values come from the Brand Foundation PDF, version 1.0 / 7 September 2026.
 * The masters named Black are Augur Navy (PDF 02.1), so downloads say navy. */
export const brandReview = { needsReview: true, source: 'Brand Foundation PDF §§02–04; page copy awaits owner approval, as do public redistribution terms for the logo files (docs/source-material.md).' };

export const brandKit = { href: '/brand/augur-brand-assets.zip', label: 'ZIP, 280 KB' };

export type LogoVariant = 'color' | 'reversed' | 'navy' | 'white';
/** Each variant sits on its approved surface (PDF 02.2, 02.8). */
export const logoVariants: { id: LogoVariant; name: string; use: string; surface: string }[] = [
  { id: 'color', name: 'Color', use: 'Default on Paper and White', surface: 'paper' },
  { id: 'reversed', name: 'Reversed', use: 'Default on Navy and Raised', surface: 'navy' },
  { id: 'navy', name: 'Navy', use: 'One tint, for supporting roles on light', surface: 'white' },
  { id: 'white', name: 'White', use: 'One tint, for supporting roles on dark', surface: 'raised' },
];

export const logoCompositions = [
  { id: 'horizontal', name: 'Horizontal', summary: 'The primary lockup. Use it wherever it fits.', minimum: 'At least 150 px wide' },
  { id: 'vertical', name: 'Vertical', summary: 'A fallback for narrow, square or centered spaces.', minimum: 'At least 93 px tall' },
  { id: 'glyph', name: 'Glyph', summary: 'Only where the name Augur is already on the surface.', minimum: 'At least 50 px tall' },
] as const;

export const logoFile = (composition: string, variant: LogoVariant, format: 'svg' | 'png') => `/brand/kit/${composition}/augur-${composition}-${variant}.${format}`;

export const tokenIcon = { name: 'REP token icon', summary: 'The canonical icon for the REP token. The navy circle belongs to the icon, so never crop it, recolor it or swap in the glyph.', svg: '/brand/kit/rep-token/rep-token-icon.svg', png: '/brand/kit/rep-token/rep-token-icon.png' };

/** Clearspace unit: the lowercase a of the supplied wordmark, measured from the
 * 360 × 121 horizontal master (a = 41.39 wide, 49.91 tall; PDF 02.5). */
export const clearspace = { width: 360, height: 121, aWidth: 41.39, aHeight: 49.91, aX: 136, aY: 33.64 };

/** Core palette, PDF 03.1. `share` sets each band's width in the proportion strip. */
export const palette = [
  { name: 'Augur Navy', hex: '#0E0E21', rgb: '14 14 33', role: 'Brand anchor and dark surface', share: 40, ink: 'light' },
  { name: 'Raised', hex: '#242438', rgb: '36 36 56', role: 'Layered dark surfaces', share: 17, ink: 'light' },
  { name: 'Augur Pewter', hex: '#A1A1B8', rgb: '161 161 184', role: 'Secondary text on dark', share: 13, ink: 'dark' },
  { name: 'Augur Paper', hex: '#F5F5F8', rgb: '245 245 248', role: 'Light surface', share: 18, ink: 'dark' },
  { name: 'Augur Green', hex: '#2AE7A8', rgb: '42 231 168', role: 'Accent for the one thing to act on', share: 12, ink: 'dark' },
] as const;

/** Contrast ratios as printed in the Brand Foundation PDF, 03.2–03.3. */
export const pairings = [
  { label: 'Paper on Navy', ratio: '17.49:1', fg: '#F5F5F8', bg: '#0E0E21' },
  { label: 'Green on Navy', ratio: '11.87:1', fg: '#2AE7A8', bg: '#0E0E21' },
  { label: 'Pewter on Navy', ratio: '7.53:1', fg: '#A1A1B8', bg: '#0E0E21' },
  { label: 'Deep on Paper', ratio: '7.17:1', fg: '#095E42', bg: '#F5F5F8', note: 'Deep #095E42 replaces Green for text on light surfaces.' },
] as const;

export const typefaces = [
  { name: 'Sora', role: 'Primary', family: 'heading', specimen: 'Make what matters clear.', use: 'Identity, display, headings, navigation, controls and key actions.', weights: ['Regular 400', 'SemiBold 600'], href: links.soraFont.url },
  { name: 'Schibsted Grotesk', role: 'Secondary', family: 'body', specimen: 'Review the evidence before you vote. Schibsted adds a human rhythm without changing genres.', use: 'Paragraphs, helper text, metadata, tables and dense interface text.', weights: ['Regular 400'], href: links.schibstedFont.url },
] as const;

/** Visual misuse examples apply a transform to the supplied file (PDF 02.9). */
export const misuse = [
  { id: 'rotate', label: 'Don’t rotate it' },
  { id: 'stretch', label: 'Don’t stretch it' },
  { id: 'recolor', label: 'Don’t recolor it' },
  { id: 'contrast', label: 'Don’t lose the contrast' },
] as const;
export const moreMisuse = ['Add a border, badge or containing shape', 'Add shadows, glows, bevels or gradients', 'Place it on photos or busy patterns', 'Attach taglines or partner marks'];
export const goodUse = ['Pick the variant for the background: Color on light, Reversed on Navy.', 'Keep one a-width clear on each side and one a-height above and below.', 'Use the horizontal lockup unless the space is genuinely too narrow.'];
