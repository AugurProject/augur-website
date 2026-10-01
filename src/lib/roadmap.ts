// Roadmap candidates drawn from public sources (see evidence.ts). Every
// entry awaits maintainer confirmation before visual sign-off (issue #6), so
// `confirmed` stays false and the page says so beside the roadmap.

export type RoadmapStatus = "completed" | "in-progress" | "next";

export type RoadmapRecord = {
  id: string;
  product: string;
  status: RoadmapStatus;
  deliverable: string;
  /** The date the evidence supports, as displayed. */
  dated: string;
  evidence: string[];
  confirmed: boolean;
  /** Secondary products get a smaller entry (SPEC.md §3). */
  secondary?: boolean;
};

export const roadmapColumns: { status: RoadmapStatus; label: string }[] = [
  { status: "completed", label: "Completed" },
  { status: "in-progress", label: "In progress" },
  { status: "next", label: "Next" },
];

export const roadmap: RoadmapRecord[] = [
  {
    id: "lituus-whitepaper",
    product: "Augur Lituus",
    status: "completed",
    deliverable: "Whitepaper published",
    dated: "January 2026",
    evidence: ["lituus-whitepaper", "blog-lituus-whitepaper"],
    confirmed: false,
  },
  {
    id: "lituus-implementation",
    product: "Augur Lituus",
    status: "in-progress",
    deliverable: "Implementation, engineered by ChainSafe and reviewed by the Lituus Foundation",
    dated: "Last commit 2026-07-23",
    evidence: ["lituus-cs", "blog-testing-past-building-future"],
    confirmed: false,
  },
  {
    id: "zoltar-contracts",
    product: "Zoltar",
    status: "in-progress",
    deliverable: "Base-layer contracts and protocol documentation",
    dated: "Last commit 2026-10-01",
    evidence: ["zoltar-repo", "zoltar-docs"],
    confirmed: false,
  },
  {
    id: "statoblast",
    product: "Statoblast",
    status: "in-progress",
    deliverable: "Augur Statoblast and Statoblast Trading",
    dated: "Last commit 2026-10-01",
    evidence: ["zoltar-repo"],
    confirmed: false,
    secondary: true,
  },
  {
    id: "lituus-walkthrough",
    product: "Augur Lituus",
    status: "next",
    deliverable: "A plain-language walkthrough of how Augur Lituus works",
    dated: "Announced July 2026",
    evidence: ["blog-testing-past-building-future"],
    confirmed: false,
  },
  {
    id: "lituus-rep-holders",
    product: "Augur Lituus",
    status: "next",
    deliverable: "A post on what Augur Lituus means for REP holders",
    dated: "Announced July 2026",
    evidence: ["blog-testing-past-building-future"],
    confirmed: false,
  },
];
