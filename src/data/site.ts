export const site = {
  name: 'Augur',
  description: 'Real-world answers for onchain apps, controlled by no one.',
  // A dismissed bar stays closed until `id` changes: give each new message a new id.
  announcement: { id: '2026-10-augur-is-back', enabled: true, until: null as string | null },
  // The live homepage design, a folder in src/designs/. HOME_DESIGN overrides it for one build.
  homeDesign: 'melo' as 'current' | 'melo',
  // Open Graph and Twitter card for every page, at the URL the old site used. Its text, for the alt.
  shareImage: { path: '/og-image.png', width: 1200, height: 630, alt: 'Augur. The frontier of decentralized truth. Real-world answers for onchain apps, controlled by no one.' },
} as const;
