# Design ownership

Why the website and the design system are separate owners, and how the site's CSS sits on top of the package. The facts are in [design reference](../reference/design.md); the steps for changing them are in [update the design system](../guides/update-design-system.md).

## Two owners, no automatic sync

This repository owns its approved website decisions: content, composition, artwork, choreography and the adaptations recorded in the design reference. The Augur design system ([jubalm/augur-design-system](https://github.com/jubalm/augur-design-system)) owns the shared foundation contract.

The two projects should move toward alignment, but synchronization is not automatic. Website improvements may become upstream proposals; upstream changes are reviewed before the website adopts them. Each cross-project change needs its own review. So a difference between the two is a question for the owner, not by itself a defect.

## Why site rules win

The package puts all its rules in `@layer augur`, after Tailwind's layers. Unlayered CSS always beats layered CSS, so the site's own rules in `global.css` override the package without specificity tricks. This lets the site declare a role only where it really differs and inherit everything else.

The exception is `!important`. For important declarations the layer order reverses, and a layered `!important` beats an unlayered one. The package's reduced-motion rule is a layered `!important` rule, so it outranks the site's: durations collapse to the package's 0.01ms rather than the site's 0.001ms.

## Why the muted colour is overridden

The package follows shadcn naming, where `muted` is a surface colour and `muted-foreground` is the text colour on it. The site used `muted` to mean a text colour. The package's Tailwind bridge therefore maps the site's `text-muted` to a background-dark value, which would make placeholder and disabled-button text invisible. The site's own `--color-muted` override restores the text colour.

This is a naming collision, not a cascade-layer or `@theme inline` effect. Changing the two `text-muted` uses in `global.css` to `text-muted-foreground` would let the override go; that change has not been made.

## Why no React

The repository rules keep the site to Astro-rendered HTML with native browser enhancement, so the site uses native Astro controls and local CSS rather than a React runtime. Adding hydration or React needs a scoped request ([AGENTS.md](../../AGENTS.md)). No further rationale is recorded.
