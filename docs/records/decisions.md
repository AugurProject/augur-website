# Decisions

Closed decisions, oldest first, one entry each, with who decided and where it was recorded (Track task or pull request). The log is append-only: add new entries at the end and do not edit past ones. If a decision is reversed, add an entry that names the one it replaces. The current facts each decision produced live in the reference docs; questions still open are in [open decisions](open-decisions.md).

## 29 October 2026

- **Hover-edge record.** The Adaptations entry in [design reference](../reference/design.md#adaptations) (19 October 2026, Green at 50% opacity, now the design system's `--brand-hover-edge`) is the written record of the decision; no other record is needed. (jubalm; Track #8, #31)
- **Adaptation approval records.** None are needed: not for the colour roles or the Green hover and pressed shades, which now come from the design system, nor for the Crimson error border or type and composition, which stay marked "Approval not found". (jubalm; Track #9, #31)
- **Live homepage design.** `melo` replaces `current` as the live homepage design (`homeDesign` in `site.ts`); `current` stays buildable. (jubalm; Track #49)

## 30 October 2026

From the launch interview for Track #51, unless noted.

- **Production target.** Cloudflare Workers: the Worker `augur-website-next`, built from `main` by Workers Builds. (jubalm; Track #5, #48)
- **Replace the old augur.net by porting.** Port the old site's content into this site before the switch. No legacy host and no proxy to the old site. (jubalm; Track #51, #52)
- **Data feeds.** Keep only the REP supply endpoints, as static files for CoinMarketCap. Drop the fork-risk feed, the dispute-markets seed and the hourly pipeline: the site "changed its target". (jubalm; Track #51, #53; PR #2)
- **Ported content.** Port the blog, the Augur v2 whitepaper, privacy and terms, and the fork guides at their old URLs. Do not link them from the new design unless it already linked them, but keep them reachable. (jubalm; Track #51, #53; PR #2)
- **`/mission/` and `/team/`.** Redirect 301 to `/about/`; nothing is ported. (jubalm; Track #51; PR #2)
- **Fork guides.** Remove the fork-risk monitor references when porting. (jubalm; Track #51; PR #2)
- **Canonical host.** `https://www.augur.net`, with the apex `augur.net` redirecting 301 to it, "same as before". (jubalm; Track #52)
- **Forms.** Connect both the newsletter and the contact form for launch: "if they're built, might as well enable them". (jubalm; Track #34)
- **Launch defaults.** The Track #6 defaults are approved as proposed: canonical and Open Graph tags, the sitemap and `robots.txt`, host-scoped indexing, the security and cache headers, and permanent trailing-slash redirects. (jubalm; Track #6; PR #2)
- **Analytics.** Reuse the old site's GA4 property `G-4VLMY3QMC9`, with no consent banner. (jubalm; Track #6; PR #2)
- **Unsourced claims and use-case values.** Ship as is, with no "Example" marker. (jubalm; Track #54)
- **Placeholder Learn guides.** Ship as is: all eight stay live and unmarked. (jubalm; Track #54)
- **Products.** Ship the product descriptions, statuses and builder credits: "open discussion but ship it". (jubalm; Track #54)
- **Homepage copy.** Ship Melo's version, including the hero's "lying is designed to cost more than ever before" and the closer's "One bad resolution can turn into a PR disaster." (jubalm; Track #54)
- **Status line.** Keep Melo's version as is, with no "in development" line on the homepage. (jubalm; Track #54)
- **Learn More.** The current two articles stay: "Augur: Q2 2026 report" and "The Moon Fork report". (jubalm; Track #1, #54)
- **FAQ and walkthrough review flags.** Ship, and review after launch. The `needsReview` and `walkthroughReview` flags stay in the code. (jubalm; Track #2, #54)
- **Privacy rewrite.** Someone else (legal) drafts it; the person is not named yet. Until then the old wording ships, flagged as inaccurate because the site now collects email addresses and runs GA4. The rewrite itself is open. (jubalm; Track #54)

## 31 October 2026

- **Melo's design.** From PR #3 on, Melo's design decisions are adopted: copy, motion and layout as Melo made them. The website implements only the technical side. (jubalm; PR #3)
- **Footer email.** Adopt Melo's removal of contact@augur.net from the footer ("pretty sure there is a reason"). The newsletter consent line links `/contact/` instead. (jubalm; PR #3)
- **Pull request titles and merges.** Pull request titles use Conventional Commits, `type(scope): what changes`; commit messages keep the plain imperative style; pull requests are merged with merge commits. (jubalm; [AGENTS.md](../../AGENTS.md#pull-requests))
- **One deploy at a time.** Merge one pull request, wait until its deploy is live and `npm run check:launch` passes against production, then merge the next. This follows the race between the PR #1 and PR #2 builds ([verification](verification.md#31-october-2026-production-after-the-deploy-race)). (jubalm; [deploy](../guides/deploy.md#one-deploy-at-a-time))
