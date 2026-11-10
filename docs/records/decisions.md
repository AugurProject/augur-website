# Decisions

Closed decisions, oldest first, one entry each, with who decided and where it was recorded (pull request, or the owner's word where none exists). The log is append-only: add new entries at the end and do not edit past ones. If a decision is reversed, add an entry that names the one it replaces. The current facts each decision produced live in the reference docs; questions still open are in [open decisions](open-decisions.md).

## 29 October 2026

- **Hover-edge record.** The Adaptations entry in [design reference](../reference/design.md#adaptations) (19 October 2026, Green at 50% opacity, now the design system's `--brand-hover-edge`) is the written record of the decision; no other record is needed. (jubalm)
- **Adaptation approval records.** None are needed: not for the colour roles or the Green hover and pressed shades, which now come from the design system, nor for the Crimson error border or type and composition, which stay marked "Approval not found". (jubalm)
- **Live homepage design.** `melo` replaces `current` as the live homepage design (`homeDesign` in `site.ts`); `current` stays buildable. (jubalm)

## 30 October 2026

From the launch interview of 30 October 2026, unless noted.

- **Production target.** Cloudflare Workers: the Worker `augur-website-next`, built from `main` by Workers Builds. (jubalm)
- **Replace the old augur.net by porting.** Port the old site's content into this site before the switch. No legacy host and no proxy to the old site. (jubalm)
- **Data feeds.** Keep only the REP supply endpoints, as static files for CoinMarketCap. Drop the fork-risk feed, the dispute-markets seed and the hourly pipeline: the site "changed its target". (jubalm; PR #2)
- **Ported content.** Port the blog, the Augur v2 whitepaper, privacy and terms, and the fork guides at their old URLs. Do not link them from the new design unless it already linked them, but keep them reachable. (jubalm; PR #2)
- **`/mission/` and `/team/`.** Redirect 301 to `/about/`; nothing is ported. (jubalm; PR #2)
- **Fork guides.** Remove the fork-risk monitor references when porting. (jubalm; PR #2)
- **Canonical host.** `https://www.augur.net`, with the apex `augur.net` redirecting 301 to it, "same as before". (jubalm)
- **Forms.** Connect both the newsletter and the contact form for launch: "if they're built, might as well enable them". (jubalm)
- **Launch defaults.** The proposed launch defaults are approved: canonical and Open Graph tags, the sitemap and `robots.txt`, host-scoped indexing, the security and cache headers, and permanent trailing-slash redirects. (jubalm; PR #2)
- **Analytics.** Reuse the old site's GA4 property `G-4VLMY3QMC9`, with no consent banner. (jubalm; PR #2)
- **Unsourced claims and use-case values.** Ship as is, with no "Example" marker. (jubalm)
- **Placeholder Learn guides.** Ship as is: all eight stay live and unmarked. (jubalm)
- **Products.** Ship the product descriptions, statuses and builder credits: "open discussion but ship it". (jubalm)
- **Homepage copy.** Ship Melo's version, including the hero's "lying is designed to cost more than ever before" and the closer's "One bad resolution can turn into a PR disaster." (jubalm)
- **Status line.** Keep Melo's version as is, with no "in development" line on the homepage. (jubalm)
- **Learn More.** The current two articles stay: "Augur: Q2 2026 report" and "The Moon Fork report". (jubalm)
- **FAQ and walkthrough review flags.** Ship, and review after launch. The `needsReview` and `walkthroughReview` flags stay in the code. (jubalm)
- **Privacy rewrite.** Someone else (legal) drafts it; the person is not named yet. Until then the old wording ships, flagged as inaccurate because the site now collects email addresses and runs GA4. The rewrite itself is open. (jubalm)

## 31 October 2026

- **Melo's design.** From PR #3 on, Melo's design decisions are adopted: copy, motion and layout as Melo made them. The website implements only the technical side. (jubalm; PR #3)
- **Footer email.** Adopt Melo's removal of contact@augur.net from the footer ("pretty sure there is a reason"). The newsletter consent line links `/contact/` instead. (jubalm; PR #3)
- **Pull request titles and merges.** Pull request titles use Conventional Commits, `type(scope): what changes`; commit messages keep the plain imperative style; pull requests are merged with merge commits. (jubalm; [AGENTS.md](../../AGENTS.md#pull-requests))
- **One deploy at a time.** Merge one pull request, wait until its deploy is live and `npm run check:launch` passes against production, then merge the next. This follows the race between the PR #1 and PR #2 builds ([verification](verification.md#31-october-2026-production-after-the-deploy-race)). (jubalm; [deploy](../guides/deploy.md#one-deploy-at-a-time))

## 2 November 2026

- **Forms off for the DevCon launch.** Replaces "Forms" (30 October 2026). Hide the newsletter and contact forms and use a mailto link at most. One switch, `enabled` in [forms.ts](../../src/data/forms.ts), turns them off: the footer's newsletter column shows Blog, RSS feed and X links, `/contact/` offers `mailto:contact@augur.net` with a subject line, and the `/contact/<result>/` and `/newsletter/<result>/` pages are not built. The `augur-forms` Worker code stays. (jubalm)
- **Hosting on two hosts.** GitHub Pages serves www.augur.net, from this repository's Pages workflow, so the launch needs no DNS move. Cloudflare Workers (`augur-website-next`) keeps deploying the same build from `main` as a standby and for pull request previews. Both deploy one static build with no adapter ([hosting reference](../reference/hosting.md#serving)). This replaces the 30 October "Production target". (jubalm)
- **Previews.** No separate Pages preview host: pull requests are previewed on Cloudflare, and the cutover moves the custom domain and is checked live ([deploy](../guides/deploy.md#cut-over-to-wwwaugurnet)). (jubalm)
- **REP supply endpoints.** Regenerated in every GitHub Pages run, hourly, by a port of the old site's script, because the supply still grows (about 220 REP between 30 October and 2 November). This replaces the 30 October "Data feeds" decision for the supply endpoints only; the fork-risk feed and the dispute-markets seed stay dropped. (jubalm)

## 3 November 2026

- **One hero image.** The homepage hero shows one image at every width, the desktop one: the live floor. The lituus flock that phones and portrait tablets showed below 1024 px is removed; below 1024 px the floor sits under the copy. (jubalm)

## 4 November 2026

- **Dark Florist's products off the live site, for now.** Augur Statoblast and Statoblast Trading are hidden until the owner brings them back (AUG72). One switch, `showStatoblast` in [products.ts](../../src/data/products.ts), set to `false`, drives the Products menu, the products page (hero, description, diagram and product section), the "Where can I trade on Augur?" FAQ answer, the About entry for Dark Florist and the Learn guide "How Augur Lituus, Zoltar and Augur Statoblast fit together" (not built). Blog posts stay: they are dated history ported from the old site. The `darkFlorist` link and the guide's Markdown stay in the code. Defaults taken for the open questions (About entry, Learn guide, blog posts, replacement copy): About entry hidden, Learn guide hidden rather than cut to two products, blog posts stay, and the FAQ answer says Augur Lituus and Zoltar are in development and are not trading products. (jubalm)
  - **To restore:** set `showStatoblast` to `true`, then undo the hand-written Markdown edits below, which cannot read the switch (the original text is in the AUG72 pull request):
    - `public/products.md`: the intro sentence "Augur Statoblast is a prediction market built on Zoltar.", the two "How they fit together" bullets (Statoblast Trading, Augur Statoblast) and the whole `## Augur Statoblast` section.
    - `public/faq.md`: the "Where can I trade on Augur?" answer, which named Augur Statoblast and Statoblast Trading.
    - `public/about.md`: the "Builds Augur Statoblast: Dark Florist" bullet.
    - `public/learn.md`: the "How Augur Lituus, Zoltar and Augur Statoblast fit together" bullet.
    - `public/llms.txt`: "Dark Florist" in the About line and "Augur Statoblast" in the Products line.
- **Zoltar off the live site, for now.** Zoltar is hidden the same way until the owner brings it back (AUG73), so the live site shows only Augur Lituus. One switch, `showZoltar` in [products.ts](../../src/data/products.ts), set to `false`, beside `showStatoblast` and independent of it. It drives the Products menu (the panel is a single Lituus card), the products page (hero, description, the whole "How they fit together" diagram and the Zoltar section), the "Where can I trade on Augur?" FAQ answer, About's "Open source" line and its Zoltar code action, and the Learn guide, which is now built only when both `showStatoblast` and `showZoltar` are on. `zoltarCode` and `zoltarPaper` stay in `links.ts`; the fork guide and blog posts stay. Defaults taken for the open questions (diagram, replacement copy, how the two switches relate): the diagram is hidden while both switches are off rather than cut to one column; the FAQ answer says "Augur Lituus, the next version of Augur, is in development and is not a trading product"; About's line says "Augur Lituus is developed in a public repository"; the switches stay independent, so turn Zoltar on before, or with, Augur Statoblast, which runs on it. (jubalm)
  - **To restore:** set `showZoltar` to `true`, then undo the hand-written Markdown edits below, which cannot read the switch (the original text is in the AUG73 pull request):
    - `public/products.md`: the intro sentence "Zoltar is a shared foundation that lets different oracle designs use REP.", the whole `## How they fit together` section and the whole `## Zoltar` section.
    - `public/faq.md`: the "Where can I trade on Augur?" answer, which named Augur Lituus and Zoltar.
    - `public/about.md`: the "Open source" bullet and its "Zoltar code" link.
    - `public/llms.txt`: the Products line, which listed Augur Lituus and Zoltar and how they fit together.
    - The Learn guide returns only when `showStatoblast` is on too; its `public/learn.md` bullet is restored with AUG72's steps.

## 10 November 2026

- **Homepage sheets before the sections.** The home-v2 sheets render before the page's sections, because they sat about 500 KB into the HTML and the hero painted unstyled until they arrived. (jubalm)
- **First paint behind a veil.** The homepage's first paint is held behind a Navy veil with the reversed Augur glyph until the three web fonts (Sora 400 and 600, Schibsted Grotesk 400) have loaded: at least 700 ms on a first load, 300 ms on a reload, and at most 3 s. This supersedes the 29 October rule that the hero's headline and support line are visible from the first paint, for the homepage; without the veil (a `#section` link, say) the old arrival still plays. (jubalm)
- **Floor first, then text.** The hero stages its arrival behind the veil: the floor builds out from the block first, then the headline lines, the support line, the actions and the underline settle in. (jubalm)
- **Replay.** The intro replays on a reload and when the visitor scrolls back to the hero, and no longer plays once per tab session. The announcement bar's drop-in is unchanged and still plays once per session. (jubalm)
