# Markdown pages

Every public page has a plain Markdown version for LLMs and other plain-text readers, and `/llms.txt` lists them (see [llmstxt.org](https://llmstxt.org/)).

- The files live in [public/](../../public/) and are served as-is at the page URL plus `.md`: `/` is `/index.md`, `/about/` is `/about.md`, and a guide at `/learn/<slug>/` is `/learn/<slug>.md`. [llms.txt](../../public/llms.txt) is at the site root.
- They are written by hand. They are not generated from the HTML, from `src/data/` or from `src/content/`, and they do not depend on which homepage design is live.
- A copy change on a page needs the same change in its `.md`. A new public page needs its `.md` and a line in `llms.txt`.
- The `.md` keeps the page's wording, unresolved review flags (`needsReview`, draft copy and unsourced claims) and the ↗ mark on off-site links. Links between pages point at the other `.md` files.
- Learn guides marked `placeholder: true` in [src/content/learn](../../src/content/learn/) have no `.md`, and [learn.md](../../public/learn.md) says so. Write the `.md` when a guide stops being a placeholder, and list it in `learn.md` and `llms.txt`.
- Pages ported from the old augur.net ([ported content](ported-content.md)) have no hand-written `.md` and no line in `llms.txt`, as they are kept reachable but not listed. A `.md` that links to one uses the page URL (`/blog/q2-2026-progress-report/`) without ↗. The Augur v2 whitepaper's own Markdown sources are served at `/whitepapers/augur-v2/<file>.md` by an endpoint, as on the old site; they are not in `public/`, so they get no alternate link.
- [PageLayout.astro](../../src/layouts/PageLayout.astro) adds `<link rel="alternate" type="text/markdown">` when a file for the page's path exists in `public/`. The newsletter and contact result pages (`bare` or `noindex`) and placeholder guides get no link.
