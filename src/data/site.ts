export const site = {
  name: 'Augur',
  description: 'Real-world answers for onchain apps, controlled by no one.',
  // A dismissed bar stays closed until `id` changes: give each new message a new id.
  announcement: { id: '2026-10-augur-is-back', enabled: true, until: null as string | null },
  newsletter: { provider: null as string | null },
} as const;
export const indexable = import.meta.env.PUBLIC_SITE_INDEXABLE === 'true';
