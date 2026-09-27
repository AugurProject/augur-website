#!/usr/bin/env bash
set -euo pipefail

PIN="629868678fa05d9cd0d8d14617ec29bf8df5d290"
BASE="https://raw.githubusercontent.com/jubalm/augur-design-system/$PIN/public/r"

# Baseline used by the website shell/home work. Registry dependencies pull utils/theme
# where required. Add other upstream items only when a concrete page needs them.
items=(
  augur-theme
  button
  card
  page-header
  empty-state
)

for item in "${items[@]}"; do
  echo "Installing Augur Design System item: $item @ $PIN"
  bunx shadcn@4.20.1 add "$BASE/$item.json" --yes
done

echo "Design system sync complete. Review and commit the generated source diff."
