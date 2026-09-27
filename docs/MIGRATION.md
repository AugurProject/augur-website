# Migration contract

Source: September 2026 website strategy. The existing site/repository is migration material, not the target architecture.

Primary source repository for the current reboot implementation: `jubalm/augur-reboot-website`.

## Route decisions

| Existing path | Decision | Target/handling |
| --- | --- | --- |
| `/` | Keep | New homepage, same URL. |
| `/blog/` | Keep | Same URL; preserve archive and improve pathways. |
| `/faq/` | Keep | Same URL; direct answers + deeper links. |
| `/learn/` + articles | Keep + rewrite | Keep hub; rewrite; reuse matching URLs or redirect to relevant new guide. |
| `/rep/` | Keep | Same URL; apply new REP brief and preserve useful anchors/contract reference. |
| `/mission/` | Merge + 301 | `/history/`. Preserve useful chronology. |
| `/team/` | Merge + 301 | `/about/`. Identify Foundation/operator; concise product credits. |
| `/whitepapers/` | 301 | `/research/`; individual editions keep existing URLs. |
| `/privacy/` | Keep | Same URL; keep current legal content until reviewed replacement exists. |
| `/terms/` | Keep | Same URL; keep current legal content until reviewed replacement exists. |

## Retired supply APIs

Remove both endpoints from the new build:

```text
https://www.augur.net/api/supply/circulating/
https://www.augur.net/api/supply/total
```

Production must return an explicit **410 Gone** for each with a short machine-readable retirement message.

Do **not** redirect API clients to an HTML page.

Remove internal references and document the retirement wherever the endpoints are listed.

## Learn

Rewrite Learn articles using existing material as background.

- preserve `/learn/`;
- reuse article URL where topic still matches;
- otherwise 301 to the relevant replacement;
- show accurate publication/revision dates;
- one canonical maintained guide per topic.

## Blog

Preserve:

- article URL;
- original publication date;
- confirmed author;
- historical identity.

Add dated correction/context where old instructions are no longer current. Do not rewrite old posts so heavily that their historical identity changes.

## Research

Individual research editions keep their existing URLs, cited anchors where possible, and explicit version labels. `/research/` becomes the maintained discovery route.

## Historical links

A migration audit should inventory:

- all current routes;
- inbound links known from repository/docs;
- anchors referenced by papers/blogs/external sources;
- static assets worth preserving;
- old instructions requiring corrections;
- duplicated/obsolete routes.

Implement redirects from an explicit table, then test every row before launch.

## 404/recovery

A real 404 must preserve the requested URL and offer useful routes:

- Home;
- Protocol;
- Research;
- FAQ.

Do not mask missing routes by redirecting all unknown paths to Home.
