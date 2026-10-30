# Open decisions

Decisions and owner confirmations still outstanding. When one is settled, delete its entry here and update the reference it affects. Until then, items here are not established.

## Homepage

- **Unsourced claims in the live design.** `melo`'s copy ([homepage-v2.ts](../../src/designs/melo/data/homepage-v2.ts)) is approved as written (owner, 29 October 2026), but four claims still need a source: “Not even Augur’s creators can override an answer.” (Trustless card); “Designed to cost attackers more than almost any other oracle.” (Robust card, against whitepaper Abstract p1, §3 p3 and §8 p20); “Win user trust.” (builder reasons); and the use-case card values (64¢→99¢, flight AB123, 71%, “Goes live in 2 days”), which are illustrative and carry no visible “Example” marker.
- **Placeholder Learn guides.** Seven of the eight guides in [src/content/learn](../../src/content/learn/) are `placeholder: true`, and all carry `needsReview: true`. Nothing on the page marks them.
- **Learn More articles.** [home-resources.ts](../../src/designs/current/data/home-resources.ts) uses an implementation substitution that has no editorial approval. Confirm the article selection and usable destinations before treating it as approved content. Details in [homepage reference](../reference/homepage.md#content-and-destinations).
- **Content review flags.** Resolve the flags marked in code: `needsReview: true` entries in [faq.ts](../../src/data/faq.ts), [products.ts](../../src/data/products.ts) and the Learn guides, and `walkthroughReview` in [walkthrough.ts](../../src/data/walkthrough.ts). The code is the source of truth for which flags are open.
- **Product details.** Products, the header and the FAQ describe Augur Lituus, Zoltar and Augur Statoblast; their descriptions and statuses in [products.ts](../../src/data/products.ts) need maintainer review.
- **Metadata, indexing and security.** Review production metadata, indexing and security requirements. The layout emits no canonical, Open Graph, Twitter, robots or structured-data tags and has no CSP script-hash handling, and the `indexable` export does not control the layout.
- **Browser findings from 26 October.** Mobile menu focus after choosing a link, tab-reveal overshoot, small link targets, hidden tab panels without JavaScript and possible light-on-white print colours are filed on Track task #7. Details in [verification](verification.md#26-october-2026-homepage-browser-checks).

## Ported content

From the old augur.net port ([ported content](../reference/ported-content.md)).

- **Privacy and terms text.** Ported word for word and awaiting a legal rewrite (owner decision, 30 October 2026). The privacy text says the site collects no personal data; the site now stores newsletter addresses (D1), sends contact messages through Proton and, per the launch brief, runs GA4 (no GA4 code is on this branch). Both pages refer to a "Last Updated" date that neither shows, as on the old site.
- **Blog link still marked off-site in the menus.** [navigation.ts](../../src/data/navigation.ts) builds Blog with `external()`, which sets `external: true`, so the header panel, mobile menu, no-JavaScript fallback and footer show ↗ on `/blog/`. Building that entry as a local item (keeping `linkKey: 'archive'`) fixes it.
- **Footer offline message.** With no forms URL, the newsletter script in [SiteFooter.astro](../../src/components/layout/SiteFooter.astro) links "Follow the blog" to `https://www.augur.net/blog/` rather than `/blog/`.
- **Unused `melo` blog column.** The `v1` branch of `melo`'s [LearnMore.astro](../../src/designs/melo/sections/LearnMore.astro), not used on `/`, reads `publishedAt` and `cover` from the `blog` collection, which has `publishDate` and no `cover`. It would fail if switched on, and would list posts on the homepage against the owner's decision.

## Contact page

- **Recipient inbox.** Messages go to `contact@augur.net` (`CONTACT_TO`). Confirm that inbox exists and is read; [links.ts](../../src/data/links.ts) still marks it unverified.
- **Proton plan and sender.** Sending needs a paid Proton plan with the augur.net domain, the address `contact-form@augur.net` and an SMTP token for it. None of these is confirmed or created yet.

## Deployment

Before going public:

- Choose the production deployment target.
- Configure the custom domain and routes.
- Set the public hostname and response-header policy.
- Review external destinations and production deployment before claiming readiness.

## Design

- Whether the Green shades, Crimson border and colour-role mapping need owner approval records.
- **`--color-muted` override.** It could be removed by changing the two `text-muted` uses in [global.css](../../src/styles/global.css) to `text-muted-foreground`; not done. See [design reference](../reference/design.md#design-system-alignment).

### Pending assets

The design reference will be firmed up once these are provided. Until then, items marked unconfirmed, unverified or missing are not established.

- **Written record of the hover-edge decision (19 October 2026).** Reported by the owner; not yet recorded in this repository.
- **Owner approvals for the other adaptations.** None found yet.
- **Earlier prototype and design-file frames.** No reachable copy. Historical only; not a specification or a source to keep in sync.
- **Design-system alignment.** Package pinned to `0.3.0`; the brand foundation PDF reference stays at `f3c089a`. Alignment with later design-system changes is not established.
