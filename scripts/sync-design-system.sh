#!/usr/bin/env bash
set -euo pipefail

PIN="629868678fa05d9cd0d8d14617ec29bf8df5d290"

# The upstream contract documents full-SHA GitHub-native installs as the
# strongest reproducible channel. This repo checks the installed result in CI;
# see docs/DESIGN-SYSTEM.md for the Astro integration evidence and limits.
# At this upstream pin, component registryDependencies omit the SHA. Install
# dependents first, then each of their dependencies explicitly at the pin so
# the final committed sources and theme come from this revision. The CI sync
# drift check catches changes from any unpinned transitive resolution.
items=(
  empty-state
  card
  button
  page-header
  utils
  augur-theme
)

for item in "${items[@]}"; do
  address="jubalm/augur-design-system/$item#$PIN"
  echo "Installing Augur Design System item: $address"
  bunx shadcn@4.20.1 add "$address" --overwrite -y
done

echo "Design system sync complete. Review the generated source and CSS diff."
