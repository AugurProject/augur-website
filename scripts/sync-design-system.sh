#!/usr/bin/env bash
set -euo pipefail

PIN="629868678fa05d9cd0d8d14617ec29bf8df5d290"

# The upstream contract documents full-SHA GitHub-native installs as the
# strongest reproducible channel. Astro is not yet an upstream-verified
# external consumer, so the first run of this script is itself an M1
# compatibility gate: inspect the generated source/CSS and build before
# treating the path as established.
items=(
  augur-theme
  button
  card
  page-header
  empty-state
)

for item in "${items[@]}"; do
  address="jubalm/augur-design-system/$item#$PIN"
  echo "Installing Augur Design System item: $address"
  bunx shadcn@4.20.1 add "$address" --overwrite -y
done

echo "Design system sync complete. Review the generated source and CSS diff."
