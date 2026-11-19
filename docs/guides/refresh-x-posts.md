# Refresh X post snapshots

1. Once the workflow is on the default branch, open **Actions → Refresh X post snapshots → Run workflow** and use the default branch. Leave `post` blank to refresh all posts, or enter a key from [x-posts.ts](../../src/data/x-posts.ts), such as `kraken-listing`.
2. Open the run summary. If the excerpts changed, the workflow builds the site and opens a draft PR containing only the snapshot JSON. Review the excerpt against the linked original, including any dated instructions, before merging. If GitHub blocks automatic PR creation, use the compare link in the summary to open the PR yourself. A run with no changes opens nothing.
3. Automatic draft PRs require **Settings → Actions → General → Workflow permissions → Allow GitHub Actions to create and approve pull requests**. An organization policy can disable this option. The workflow does not approve or merge anything.

To refresh locally, run `npm ci` and `npm run refresh:x-posts`, or `npm run refresh:x-posts -- kraken-listing` for one post. Review [x-post-snapshots.json](../../src/data/x-post-snapshots.json) and run `npm run build` before submitting it. No X API key is required.

The script reads the public oEmbed excerpt for each configured Augur post ID. It does not fetch full text beyond that excerpt, discover new edit IDs, or copy media and engagement data. If X links to a new ID after an edit, update the ID in the registry and refresh locally in the same PR. If X stops serving any requested post or returns unexpected data, the script leaves the previous snapshots untouched. Remove the card separately if the unavailable post should no longer be quoted.
