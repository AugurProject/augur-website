export type ClaimKind =
  | "design-proposal"
  | "implementation"
  | "measured-result"
  | "illustrative-use"
  | "historical";

export type SourceRecord = {
  id: string;
  title: string;
  purpose: string;
  url: string;
  edition?: string;
  section?: string;
  commit?: string;
  product?: string;
  version?: string;
  scope: string;
  limitations?: string[];
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

// Intentionally empty during bootstrap. Do not seed claims from memory or placeholders.
export const sources: SourceRecord[] = [];
export const claims: ClaimRecord[] = [];
