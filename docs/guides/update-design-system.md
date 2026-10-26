# Update the design system

Use this when installing a new `@augurproject/design-system` release or adopting a design-system change. The current version, import order and adaptations are in [design reference](../reference/design.md). Why the two projects are separate owners is in [design ownership](../explanation/design-ownership.md).

## Upgrade the package

1. Install the next release's tarball from the design system's GitHub Release. Do not copy or edit the package's CSS.
2. Update the version in [design reference](../reference/design.md).
3. For each design-system role the site redeclares in [global.css](../../src/styles/global.css), compare its value with the new package's. Remove the redeclaration if the values now match; keep it and record it under Adaptations if they differ.
4. Run `npm run build`, then check the affected states in a browser and log the result in [verification](../records/verification.md).

## Change a shared token or control

1. Identify the owner: this repository owns website content, composition, artwork, choreography and its adaptations; the design system owns the shared foundation contract.
2. Check the impact of the change in both projects.
3. Record the source, the intended role or state change, and any deliberate divergence with a short rationale under Adaptations in [design reference](../reference/design.md).
4. Propose website improvements upstream as a separate change with its own review. Nothing in these docs authorizes edits or pushes to the design-system repository.
