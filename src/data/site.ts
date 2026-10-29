export const site = {
  name: 'Augur',
  description: 'Real-world answers for onchain apps, controlled by no one.',
  // A dismissed bar stays closed until `id` changes: give each new message a new id.
  announcement: { id: '2026-10-augur-is-back', enabled: true, until: null as string | null },
  // The live homepage design, a folder in src/designs/. HOME_DESIGN overrides it for one build.
  homeDesign: 'current' as 'current' | 'melo',
} as const;
export const indexable = import.meta.env.PUBLIC_SITE_INDEXABLE === 'true';
