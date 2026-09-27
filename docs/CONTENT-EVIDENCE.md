# Content and evidence model

The website strategy treats evidence discipline as part of the public product. This file turns that into an implementation model.

## 1. Content classes

### Maintained canonical pages

Protocol, Developers, REP, About, History, FAQ and Home are maintained product/institutional explanations.

### Learn

Evergreen canonical guides. One maintained guide per topic. Each guide should expose prerequisites, version context, and review date.

### Blog

Dated material: articles, commentary, project updates. Preserve original publication date and confirmed author. Historical instructions remain historical; add dated corrections rather than silently rewriting the record.

### Research

Exact papers/discussions/editions and their source metadata. Research should make edition/version explicit and provide deep/source links where possible.

## 2. Shared factual records

Do not duplicate changing facts in prose when a maintained record can feed multiple pages.

Suggested records:

```ts
type ProductRecord = {
  id: string
  name: string
  role: string
  stage: "research" | "in-development" | "available" | "historical" | "unknown"
  reviewedAt: string
  sources: string[]
}

type RoadmapRecord = {
  id: string
  product: string
  status: "completed" | "in-progress" | "next"
  deliverable: string
  lastUpdated: string
  evidence: string[]
}

type RepVersionRecord = {
  id: string
  chain: string
  contractAddress: string
  onchainName: string
  universe: string
  status: string
  reviewedAt: string
  explorerUrl: string
  sources: string[]
}
```

The exact schema can evolve when real records are imported. Do not populate placeholder facts.

## 3. Source record

A source is evidence, not merely a link.

```ts
type SourceRecord = {
  id: string
  title: string
  purpose: string
  url: string
  edition?: string
  section?: string
  commit?: string
  product?: string
  version?: string
  scope: string
  limitations?: string[]
  reviewedBy?: string
  reviewedAt?: string
}
```

## 4. Claim record

Use structured claims when an important technical statement appears in multiple places or requires explicit review.

```ts
type ClaimRecord = {
  id: string
  statement: string
  kind:
    | "design-proposal"
    | "implementation"
    | "measured-result"
    | "illustrative-use"
    | "historical"
  product?: string
  version?: string
  sourceIds: string[]
  qualifications?: string[]
  reviewedBy?: string
  reviewedAt?: string
}
```

For numerical claims, extend with:

- unit;
- method;
- observation time/block;
- exclusions;
- uncertainty/assumptions.

## 5. Rendering rule

Qualifications belong beside the claim they constrain. Do not hide a material caveat in a footnote, separate legal page, or generic "research stage" banner.

A source record can feed a source/reference panel, but the prose should still state the scope clearly.

## 6. Status language

Use direct labels such as:

- In development
- Proposed
- Implemented
- Reviewed
- Historical
- Completed
- In progress
- Next

Do not convert roadmap direction into adoption. Do not convert repository existence into implementation completeness. Do not convert a paper into security validation.

## 7. Blog/research metadata

Blog minimum:

- title;
- summary;
- original publication date;
- confirmed author;
- topic/audience labels;
- historical/correction status where relevant;
- next route.

Research minimum:

- title;
- edition/version;
- publication/revision date when known;
- source URL;
- product/version scope;
- summary;
- limitations/context;
- current/historical status.

## 8. Review workflow

Before publishing a material technical claim:

1. identify exact source/edition/commit;
2. check what it actually establishes;
3. record scope and limitations;
4. verify product/version;
5. have an appropriate reviewer check copy and diagram together where relevant;
6. stamp review date;
7. re-review affected summaries when source changes.

"Source exists" is not review evidence.
