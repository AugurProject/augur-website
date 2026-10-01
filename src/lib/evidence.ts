export type ClaimKind =
  | "design-proposal"
  | "implementation"
  | "measured-result"
  | "illustrative-use"
  | "historical";

export type SourceRecord = {
  id: string;
  title: string;
  /** Short link text for dense references such as roadmap evidence. */
  shortTitle?: string;
  purpose: string;
  url: string;
  edition?: string;
  section?: string;
  commit?: string;
  product?: string;
  version?: string;
  scope: string;
  limitations?: string[];
  /** Date the record was checked against the live source. Not an editorial review. */
  checkedAt?: string;
  reviewedBy?: string;
  reviewedAt?: string;
};

export type ClaimRecord = {
  id: string;
  statement: string;
  kind: ClaimKind;
  product?: string;
  version?: string;
  sourceIds: string[];
  qualifications?: string[];
  reviewedBy?: string;
  reviewedAt?: string;
};

// Each record was checked against its public source on `checkedAt`. None has
// had the editorial review in docs/CONTENT-EVIDENCE.md yet, so `reviewedBy`
// stays empty. Do not add records from memory or placeholders.
export const sources: SourceRecord[] = [
  {
    id: "lituus-whitepaper",
    title: "A Bribery-Resistant Group-Strategyproof Oracle",
    shortTitle: "Whitepaper (PDF)",
    purpose:
      "The Augur Lituus whitepaper by Ryan Garner and Philip Monastirsky: the proposed design and a comparative analysis of oracle attack costs.",
    url: "https://github.com/AugurProject/whitepaper/blob/master/Lituus/English/Augur_Lituus_Whitepaper.pdf",
    edition: "January 2026, 33 pages",
    commit: "69accf630d20af5aee5ff3d78fcf6560f069ccfd",
    product: "Augur Lituus",
    scope: "Proposed design and security argument.",
    limitations: ["A design document. It does not establish implementation status or observed security."],
    checkedAt: "2026-10-01",
  },
  {
    id: "lituus-cs",
    title: "Lituus-CS",
    shortTitle: "Lituus-CS",
    purpose: "The Augur Lituus implementation in progress: Solidity contracts with unit, fuzz and invariant tests.",
    url: "https://github.com/AugurProject/Lituus-CS",
    edition: "Last commit 2026-07-23",
    commit: "fc7fd072a117231056868e7f88481fe8bfd924b3",
    product: "Augur Lituus",
    scope: "Implementation work in progress.",
    limitations: ["Repository activity is not a claim of completeness, audit or deployment."],
    checkedAt: "2026-10-01",
  },
  {
    id: "zoltar-repo",
    title: "Zoltar + Augur Statoblast",
    shortTitle: "Zoltar repository",
    purpose:
      "Contracts for the forkable base layer and the prediction-market layer, with Statoblast Trading, the augurScan explorer, operator bots and protocol documentation.",
    url: "https://github.com/AugurProject/zoltar",
    edition: "Last commit 2026-10-01",
    commit: "bc87da7f43f89c15fbde53de9803a601fb240770",
    product: "Zoltar",
    scope: "Implementation work in progress.",
    limitations: ["Deployment manifests in the repository are not a readiness claim."],
    checkedAt: "2026-10-01",
  },
  {
    id: "zoltar-system-overview",
    title: "Zoltar system overview",
    shortTitle: "System overview",
    purpose: "How Zoltar, Augur Statoblast, Statoblast Trading and OpenOracle fit together.",
    url: "https://augurproject.github.io/zoltar/docs/explanation/system-overview.html",
    product: "Zoltar",
    scope: "Protocol documentation published from the Zoltar repository.",
    checkedAt: "2026-10-01",
  },
  {
    id: "zoltar-docs",
    title: "Zoltar protocol documentation",
    shortTitle: "Zoltar docs",
    purpose: "Tutorials, explanations, contract reference and the security model.",
    url: "https://augurproject.github.io/zoltar/docs/documentation.html",
    product: "Zoltar",
    scope: "Protocol documentation published from the Zoltar repository.",
    checkedAt: "2026-10-01",
  },
  {
    id: "oracle-research",
    title: "Oracle research",
    shortTitle: "Oracle research",
    purpose: "Open design notes on escalation games, forking, auctions and fees.",
    url: "https://github.com/AugurProject/oracle-research",
    edition: "Last commit 2026-06-08",
    commit: "0bb35c5ef9497ca9c33eab296cc2dafa5d6a211d",
    scope: "Research notes; not a specification of any deployed protocol.",
    checkedAt: "2026-10-01",
  },
  {
    id: "blog-lituus-whitepaper",
    title: "The Augur Lituus Whitepaper",
    shortTitle: "Blog, 29 Jan 2026",
    purpose: "Announces the whitepaper and explains resolution as infrastructure.",
    url: "https://www.augur.net/blog/the-augur-lituus-whitepaper/",
    edition: "29 January 2026, Lituus Foundation",
    product: "Augur Lituus",
    scope: "Project announcement.",
    checkedAt: "2026-10-01",
  },
  {
    id: "blog-testing-past-building-future",
    title: "Augur Is Testing Its Past and Building Its Future",
    shortTitle: "Blog, 21 Jul 2026",
    purpose:
      "States that ChainSafe is engineering the Augur Lituus implementation, reviewed by the Lituus Foundation, and announces the next posts.",
    url: "https://www.augur.net/blog/augur-testing-past-building-future/",
    edition: "21 July 2026, Lituus Foundation",
    scope: "Project update. Its migration instructions are historical.",
    checkedAt: "2026-10-01",
  },
  {
    id: "blog-moon-fork-complete",
    title: "The Augur Moon Fork Is Complete",
    shortTitle: "Blog, 5 Aug 2026",
    purpose: "The dated record of Augur v2's first full fork on Ethereum mainnet.",
    url: "https://www.augur.net/blog/post-fork-announcements/",
    edition: "5 August 2026, @AugurProject",
    product: "Augur v2",
    scope: "Historical record of Augur v2. Not evidence for Augur Lituus.",
    checkedAt: "2026-10-01",
  },
];

export const claims: ClaimRecord[] = [];

export function sourceById(id: string): SourceRecord {
  const source = sources.find((record) => record.id === id);
  if (!source) throw new Error(`Unknown source record: ${id}`);
  return source;
}
