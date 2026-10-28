# Open decisions

Decisions and owner confirmations still outstanding. When one is settled, delete its entry here and update the reference it affects. Until then, items here are not established.

## Homepage

- **Learn More articles.** [home-resources.ts](../../src/data/home-resources.ts) uses an implementation substitution that has no editorial approval. Confirm the article selection and usable destinations before treating it as approved content. Details in [homepage reference](../reference/homepage.md#content-and-destinations).
- **Content review flags.** Resolve the flags marked in code: `needsReview: true` entries in [faq.ts](../../src/data/faq.ts) and `walkthroughReview` in [walkthrough.ts](../../src/data/walkthrough.ts). The code is the source of truth for which flags are open.
- **Product scope.** Confirm whether the one-product navigation (Augur Lituus only) meets the intended scope. Additional pages need an explicit scope decision, not restoration from the earlier prototype.
- **Metadata, indexing and security.** Review production metadata, indexing and security requirements. The layout emits no canonical, Open Graph, Twitter, robots or structured-data tags and has no CSP script-hash handling, and the `indexable` export does not control the layout.
- **Newsletter.** Decide whether to keep the newsletter demonstration or scope a real provider. The current form does not subscribe users.
- **Browser findings from 26 October.** Mobile menu focus after choosing a link, tab-reveal overshoot, small link targets, hidden tab panels without JavaScript and possible light-on-white print colours are filed on Track task #7. Details in [verification](verification.md#26-october-2026-homepage-browser-checks).

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
