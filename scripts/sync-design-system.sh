#!/usr/bin/env bash
set -euo pipefail

# The pinned public/r items contain consumer-shaped source. The GitHub-native
# root registry at this revision points to untransformed package source.
node scripts/sync-design-system.mjs
