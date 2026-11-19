# Update the FAQ

How to add, change or retire a question on `/faq/`. File layout and behaviour: [FAQ reference](../reference/faq.md).

## Change an answer

1. Open the topic file in [src/data/faq/](../../src/data/faq/) and find the entry by `id`.
2. Edit `answer`. Put the answer first, then the detail, in the FAQ's professional register ([content strategy](../explanation/faq-content-strategy.md#how-answers-are-written)): third person, a definition first where the question asks what something is, precise terms defined once, no contractions, no casual asides, and no superlatives or ranking claims without a source. Ask one question per entry, and name Augur Lituus in a question whose answer is about it: "Augur" alone means the project. Put questions about the project in Augur (`general.ts`), questions about Augur Lituus, integration included, in Augur Lituus (`product.ts`), and questions about the token in $REP (`rep.ts`). Keep it under about 100 words unless it needs steps or an example. Give mechanism as one clause and a link, never a walkthrough: no stake sizes, rounds, thresholds or windows, which belong on the product page and in Learn (owner, 15 November 2026). Nothing is deployed, so an answer about how Augur Lituus works says so once, with "under its design", "is designed to" or "will". No answer carries a caveat or a hedging word such as "estimates": "What secures Augur Lituus?" gives the cost of an attack as a plain figure and does not mention the whitepaper (owner, 16 November 2026). Use one term for one thing, as the other answers do: outcome, stake, response window (the whitepaper's appeal period), fork threshold. Keep Dark Florist's work at arm's length: don't name its products, name Dark Florist only in "Is Augur back?" (as an independent team the Foundation funds, with no link), and call Augur Lituus "one of the next versions of Augur's oracle" or "a new version of Augur's oracle", never the next version of Augur.
3. Put a link on a word in the text only where it's the reader's obvious next step, and rarely. The exception is "What are Augur's official channels?", whose job is to list where to go: it is a list of links, each named after its channel, with what the channel is for. No buttons under answers, and no "see below" that only works as a link. Interpolate shared facts instead of typing them: the REP address and symbol from `currentRep` in [rep.ts](../../src/data/rep.ts), channel addresses from [links.ts](../../src/data/links.ts). Write the token as $REP in every question and answer, never bare REP (owner, 16 November 2026); the versioned symbols (REPv1, REPv2, REPv2_Yes_1, REPv2_No_1) are token names and stay as they are. $AUGUR is only the ticker Kraken uses for it.
4. Label anything from the whitepaper as proposed, and any made-up figure as an illustration. The exception is the attack cost in "What secures Augur Lituus?" (step 2): record in `sources` that it is the whitepaper authors' estimate.
5. Update `sources` with where each new claim comes from, and set `reviewed` to today's date.
6. Leave `needsReview: true` unless the owner has approved the wording.
7. Run `npm run build`. Check the answer on `/faq/`, at `/faq/#<id>`, and in `/faq.md`. If the entry is in `repFaq` in `rep.ts`, check `/rep/` too.

## Add a question

1. Check that no existing question already gives the answer; extend that one instead if it does. Add a question only when a reader in one of the audiences in the [content strategy](../explanation/faq-content-strategy.md#seven-audiences) would ask it.
2. Add the entry to its topic file where it belongs in the reading order: simpler questions first.
3. Choose an `id` that reads well in a link, such as `rep-wallet`. It can never change afterwards.
4. Mark `timeSensitive: true` if the answer describes a current state.
5. Follow steps 3 to 7 of Change an answer.

## Retire or merge a question

1. Move anything still needed into the question that replaces it.
2. Add the retired `id` to the replacement's `aliases`, so links to it still open something.
3. If `repFaq` in `rep.ts` names the retired id, replace it.
4. To keep an answer for another page, move its entry to [parked.ts](../../src/data/faq/parked.ts) instead of deleting it. Nothing imports that file.
5. Run `npm run build`; it fails on a duplicate fragment, and the REP page fails on an unknown id.

## Review with each quarterly report

1. List the time-sensitive entries: `grep -n "timeSensitive: true" src/data/faq/*.ts`.
2. Check each against the new report and the Lituus-CS repository: development stage, tests and audits, deployment and tooling, wallet and exchange support, the MiCA white paper, and the roadmap.
3. Update the answer and its `reviewed` date, even when only the date changes.
4. When Augur Lituus deploys, replace "proposed" figures with the deployed parameters, and update the status, integration and holder answers and "What is Augur Lituus?".
