# Augur.net homepage — design concept v2

Oct 1, 2026 · Jubal

The homepage tells one story: how an open question becomes a settled answer, without anyone holding the final word. It shows only work a reader can inspect today. This version is rebuilt on the website spec, the brand foundation and the Augur repos.

## Brief

Design the augur.net homepage as the nine-part narrative in `SPEC.md`, drawn in the brand's editorial voice, with every claim pointing at something real. This is milestone M2 in the website's implementation plan: the homepage as one vertical slice.

**What to produce.**

- Full homepage frames at 1440 px and 390 px, in light and dark themes.
- A tablet check at 834 px for the hero, the escalation figure, the roadmap and the use cases.
- Real copy from the strategy and the repos. Unconfirmed items (roadmap milestones, product stages, blog picks) stay visibly marked as placeholders.

**Authority order.**

1. The September 2026 website strategy and the website's `SPEC.md`.
2. The Augur Design System (`DESIGN.md` v0.1.0, its foundation docs) and the brand foundation (August 2026).
3. This concept.

The design system is a strong hint, not a cage: where this concept goes further, it says **Proposal**.

**What changed from v1.**

- **Grounded in real content.** Content now comes from the Augur repos, Zoltar's published docs and the augur.net blog, not just the strategy.
- **Frame matches the code.** The frame and rhythm now match the website's actual `site.css`.
- **Brand chrome.** The editorial chrome is taken from the brand foundation's own pages.
- **New figures.** Two new signature figures carry the mechanism: an escalation staircase and a branching ledger.

## Concept: order from ambiguity

The homepage enacts what Augur does. It opens on a question nobody can answer yet, follows it through report, challenge and escalation, and closes on the promise of a settled answer that no one person decided.

**Where the idea comes from.**

- **The name:** the lituus was the spiral staff Roman augurs carried, and the Lituus Foundation describes it as standing for imposing order on ambiguity. Augur replaces that ritual with cryptography, incentives and formal rules.
- **Augur's own question:** when someone stands to profit from the wrong answer, who decides what actually happened?
- **The brand's core idea:** make what matters clear.

**How the page carries it.** The visual temperature follows the question's life:

1. **Hero, dark and open.** Three equal outcomes, nothing chosen. The question is asked.
2. **Middle sections, light and evidential.** The process, the evidence and the work, set like a well-kept public record.
3. **Closing, dark again.** The question record returns with its full path visible and its outcome still blank: *recorded after 2027-09-08*. The page never invents a result.

### Four signature devices

1. **The question record.** This is the brand's own query record (the *Open query* specimen in the brand foundation) applied to the worked example. It has a tracked label with a short green rule, the question, the deadline, three equal outcome cells (Yes, No, Invalid) and a four-step state line (Asked, Reported, Challenge, Final). It appears large in the hero and returns small where the question moves forward.
2. **The escalation staircase.** This is section 03's figure. Each challenge round is drawn as a step taller than the one before, because each challenge must put more at stake. A round that goes unchallenged ends the climb at *Final*. Rarely, a climb crosses a dashed threshold into *Fork*. It uses no numbers or axis values, only the shape of the rule.
3. **The branching ledger.** This is section 06's figure. One horizontal line, a universe, splits into Invalid, Yes and No branches. All branches continue, and none is picked by the protocol. It shows Zoltar's idea at a glance: a fork gives honest participants their own copy of the books.
4. **Editorial chrome.** These elements are taken from the brand foundation's pages: a tracked label over a short green rule, large light-weight titles, a narrow left index column, and metadata strips that set small labels above their values. They make the site feel like the same publication as the brand guide.

**Mood:** clear-eyed, credible, neutral, human (the brand's four traits). Calm, exact, open.

**What it should not look like:**

- **A crypto landing page:** no glowing gradients, 3D coins, price tickers or counters.
- **The Foundation site's atmosphere:** no parallax clouds or animated spiral. The lituus lives in the story, not as ornament.

## What the page can show today

Augur has no logos or adoption numbers to show, but it has a lot of inspectable work. The homepage's credibility comes from pointing at these things precisely. Dates are the latest public commit or publication found on 2026-10-01; product stages still need maintainer confirmation.

| Item | What it is | Public state | Used in |
| --- | --- | --- | --- |
| [Augur Lituus whitepaper](https://github.com/AugurProject/whitepaper) | *A Bribery-Resistant Group-Strategyproof Oracle*, Ryan Garner and Philip Monastirsky, 33 pages | Published January 2026 | Hero action, 04 sources |
| [Lituus-CS](https://github.com/AugurProject/Lituus-CS) | The Augur Lituus implementation engineered by ChainSafe: Solidity contracts with unit, fuzz and invariant tests | In development; last commit 2026-07-23 | 04 sources, roadmap |
| [Zoltar + Augur Statoblast](https://github.com/AugurProject/zoltar) | The forkable base layer, the prediction-market layer and Statoblast Trading, with published protocol docs, the augurScan explorer and bots | Very active; last commit 2026-09-30 | 04 sources, 06 |
| [Zoltar protocol docs](https://augurproject.github.io/zoltar/docs/documentation.html) | System overview, tutorials, contract reference, security model | Published | 06 links, Developers |
| [Oracle research](https://github.com/AugurProject/oracle-research) | Living design notes on escalation games, forking and fees | Last update 2026-06-08 | 04 research link |
| [Lituus](https://github.com/AugurProject/Lituus) | Earlier Augur Lituus contracts, kept as reference | Supporting; last commit 2026-05-14 | Research page, not Home |
| [augur.net blog](https://github.com/AugurProject/augur-reboot-website) | 15 dated posts, April 2025 to August 2026 | Latest: *The Augur Moon Fork Is Complete*, 2026-08-05 | 07 |
| Moon Fork (Augur v2) | Augur v2's fork ran end to end on Ethereum mainnet for the first time | Dispute began 2026-04-08; migration closed 2026-08-03; Yes universe won | REP, History; one dated line in 04 (Proposal) |
| [Lituus Foundation](https://github.com/AugurProject/lituus-foundation-website) | Funds independent teams: ChainSafe on Augur Lituus, Dark Florist on the prediction-market line | Active | 06 credit, About, footer |

**Lines the copy can lean on**, each traceable to a source:

- **Resolution as infrastructure.** Applications can outsource resolution instead of building their own dispute system, and stop being the focal point of contested outcomes. Source: the Augur Lituus whitepaper announcement.
- **The backstop.** Most queries are expected to resolve during the escalation game; the fork is the backstop. Source: the whitepaper's protocol summary.
- **Zoltar's limit.** Zoltar records questions, universes, REP and forks. It never judges which answer is true. Source: the Zoltar system overview.
- **Trading's role.** Statoblast Trading is one exchange of possibly many; it neither creates nor resolves markets. Source: the Zoltar system overview.

**Keep these off the homepage.**

- **Attack-cost percentages and Moon Fork migration totals.** The whitepaper's attack-cost figures are percentages of the oracle's valuation, and the strategy requires a reviewed method before any number appears. Both belong on Protocol, REP or History.
- **ForkWatch and the fork-risk monitor.** These are live counters, which the strategy keeps off Home.

**Confirm with maintainers before design hardens.** Deployment status for Zoltar and Augur Statoblast (the docs reference mainnet and Sepolia manifests). Whether Augur Lituus has a testnet. The stage label for each product.

## Page frame

Use the frame the website already ships, and give every section the same head, borrowed from the brand foundation's section openers. The page then reads like one publication rather than a stack of blocks.

**Frame and rhythm.** These values come from `src/styles/site.css` in the website repo:

| Token | Value | Meaning |
| --- | --- | --- |
| `--site-frame-max` | 80rem (1280 px) | Maximum content width |
| `--site-gutter` | clamp(1rem, 3vw, 3rem), 16–48 px | Outer margin |
| `--site-section-gap` | clamp(3rem, 6vw, 5rem), 48–80 px | Vertical padding of each band |

Inside the frame, use 12 columns with 24 px column gaps (**Proposal**: the repo does not define columns yet). Prose holds the 65ch measure.

**Section head (every section).** Copied from the brand foundation's section openers:

- **Left (columns 1–3):** the tracked index label, for example `02 · WHY RESOLUTION MATTERS`, in editorial-label style.
- **Right (columns 4–12):** the title in editorial-title (Sora 400), a short 48 × 2 px green rule under it, then a one- or two-sentence lead.
- **Below:** 48 px to the section body, which may use all 12 columns.
- **Under 1024 px:** the label stacks above the title.

**Banding.** Three fixed Navy bands give the page a rhythm of open, evidence, foundation, evidence, close.

| Band | Light theme | Dark theme |
| --- | --- | --- |
| 01 Hero | Navy, fixed (Proposal) | Navy |
| 02 Why resolution matters | Paper | Surface 1 |
| 03 How Augur Lituus approaches it | White | Navy |
| 04 Open work, roadmap and code | Paper | Surface 1 |
| 05 Use cases and application fit | Muted | Navy |
| 06 Zoltar: a shared foundation | Navy, fixed (Proposal) | Surface 2 |
| 07 From the Blog | Paper | Navy |
| 08 Common questions | White | Surface 1 |
| 09 Closing action, then footer | Navy, fixed (Proposal) | Navy |

**Why fix three bands dark.** Augur Green only holds contrast on Navy, and the brand's public-facing reference and covers are dark. A dark band at the start, middle and end gives the light evidence sections a frame and makes Zoltar feel like what it is, the layer underneath. If strict theme parity wins, these bands follow the theme and use Deep for green.

![Page map v2: nine bands, section heads, footer](homepage-concept/homepage-page-map.svg)

Dark at the start, the middle and the end; the light bands between carry the evidence.

## Sections 01–03: ask, then follow

These three sections do most of the explaining. The reader meets the question, learns why it needs a fair answer, and watches how one is reached. Headings marked *draft* are proposed copy, not approved wording.

### 01 Hero: the question is asked

Within one screen the reader should know what this is, that it is in development, and where to go next.

**Layout (Navy band):**

- **Eyebrow (full width):** a tracked label `AUGUR LITUUS · IN DEVELOPMENT` over a short green rule, as on the brand foundation cover. It keeps *In development* beside the introduction, as the spec requires.
- **Message (columns 1–7):** the headline *The Frontier of Decentralized Truth* in Sora 600 at 64/68, −0.02em (**Proposal**: above the 40 px display role). Then the strategy lead at 20/30: *Augur Lituus is permissionless, decentralized resolution infrastructure in development for prediction markets and applications that depend on real-world outcomes.*
- **Actions:** **Explore the protocol** → `/protocol/` is the primary button, Green on Navy and the band's dominant green. **Read the whitepaper** → `/research/#current-paper` is an outline button.
- **Returning readers (Proposal):** one quiet line under the actions: *Returning to Augur? See what changed* → `/history/` · *Check your REP version* → `/rep/`. Since the Moon Fork, many visitors arrive holding REP.
- **Question record (columns 8–12):** a Surface 2 panel in the brand's query-record format, described below.
- **Proposition strip (full width, under a hairline):** four cells, each with a tracked label over one line, in the brand cover's label-over-value style:

| Label | Line | Link |
| --- | --- | --- |
| Permissionless | No approval needed. Fees, bonds and token requirements apply. | How access works |
| Economically secured | Reporters put REP at risk, so a wrong answer is designed to be costly. | Security assumptions |
| Open work | Open-source code and research in public. | Repositories |
| Zoltar | Different oracle designs can share REP if they handle forking. | Shared foundation |

**The question record, top to bottom:**

1. A header row: a short green rule and `WORKED EXAMPLE` on the left, `Illustrative` on the right.
2. The question in Sora 600 at 20/26: *Will room-temperature superconductivity at ambient pressure be independently demonstrated?*
3. A label-over-value pair: `EVIDENCE CUTOFF` · *2027-09-08 00:00 UTC*.
4. Three equal outcome cells: Yes, No, Invalid. None is highlighted.
5. A state line with four square markers: Asked, Reported, Challenge, Final. Only Asked is filled, and the word is set in 600 weight, so state reads in words.
6. The link *Follow this question* → section 02.

![Hero v2: eyebrow, message, question record, proposition strip](homepage-concept/homepage-hero.svg)

On the real Navy band the eyebrow label and rule are Augur Green, and the primary button is the dominant green.

### 02 Why resolution matters

The reader should understand that a contract can settle but cannot see the world, and that whoever decides the answer becomes the target.

**Section head.** The title (draft) is *Who decides what actually happened?* The lead (draft) reads: *A prediction market can settle itself, but it cannot see the world. Before it pays anyone, something has to establish what occurred, and when someone stands to profit from the wrong answer, that something becomes the target.*

**Body, left (columns 1–6).** Two short paragraphs from the strategy's explanation. They end with the pull question in Sora 400 at 28/34: *What happens when participants disagree about that answer?*

**Body, right (columns 7–12): claim versus demonstration.** Two panels with identical structure, applied to the worked example:

- **A breakthrough claim:** a press release or a levitation video. Verdict: *Does not qualify*.
- **An independent demonstration:** an original report plus a replication by a separate institution with no shared authors, with methods, measurements and uncertainty published before the cutoff. Verdict: *Qualifies*.

The verdicts are words; Deep on the qualifying verdict only reinforces them. The caption reads: *The question has to be precise enough to tell these apart.*

### 03 How Augur Lituus approaches it

The reader should follow question → report → challenge → final, and see that forks are the rare exception.

**Section head.** The title (draft) is *An answer anyone can challenge.* The lead, from the strategy: *Most questions are expected to resolve through reporting and challenges. Forks are designed to be rare.*

**Body: the escalation staircase (columns 1–12).** Read left to right:

| Stage | What the figure shows | The worked example at this stage |
| --- | --- | --- |
| 01 Ask | A flat start: the question, its criteria and its outcomes, including Invalid; the query fee is paid in REP | At least 293.15 K, 90–110 kPa, zero resistance and the Meissner effect, independently replicated |
| 02 Report | The first step: anyone proposes an answer and backs it with a REP bond | After the cutoff, someone reports Yes or No against the criteria |
| 03 Challenge rounds | Each next step is taller: a challenger stakes more REP on a different answer, which replaces the answer and opens a new period | A report can be challenged if the evidence fails the temperature, pressure or independence criteria |
| Final | A round that goes unchallenged ends the climb; the latest answer becomes final | The outcome is recorded; the page never shows which |
| Rare: fork | A climb that reaches the required stake crosses a dashed threshold; holders move REP to the outcome they support | Not shown for the example |
| 04 Application acts | After Final, the application settles under its own rules, including Invalid | The market settles; resolution and settlement are separate |

- **Green:** the path from Report through the challenge rounds to Final carries this section's green: Deep on White, Green on Navy. The fork path stays neutral and dashed.
- **Exceptions line:** under the figure: *No report within three days means Invalid.* It links to the fork rules on `/protocol/`.
- **Action:** the text link *Read the process and assumptions* → `/protocol/`.
- **Build:** build the figure in HTML and CSS with real text, so it reflows and reads aloud. The table above is its text equivalent. The steps show only that each challenge raises the stake, with no amounts, durations or axis values.

![Escalation staircase: section 03 figure, conceptual](homepage-concept/escalation-staircase.svg)

Step heights show only that each challenge stakes more; the final build carries no amounts or durations.

## Sections 04–06: inspect, apply, build underneath

These sections earn trust by pointing at real work, show where an answer becomes an action, and reveal the layer underneath.

### 04 Open work, roadmap and code

The reader should see that everything can be inspected, and tell finished work from plans.

**Section head.** The title (draft) is *Everything is open. Inspect it.* The lead, from the strategy: *All our work is open source. Our research happens in public.*

**Source index.** Use the design system's Reference record pattern: one row per source, hairlines between rows. Each row has four parts: a product label, a title with a one-line purpose, a record line (edition or last update) and a descriptive link. Show last-updated dates from the repos at build time where possible.

| Product label | Title and purpose | Record | Link |
| --- | --- | --- | --- |
| Augur Lituus | Whitepaper: *A Bribery-Resistant Group-Strategyproof Oracle* | January 2026 edition | Read the paper → `/research/#current-paper` |
| Augur Lituus | Implementation: Lituus-CS, engineered by ChainSafe, with unit, fuzz and invariant tests | Last update from repo | View source |
| Zoltar | Protocol and docs: Zoltar and Augur Statoblast contracts, documentation, augurScan explorer | Last update from repo | Read the docs · View source |
| Research | Design notes: open oracle research and discussions | Last update from repo | Browse research → `/research/` |

**Roadmap.** Three columns: Completed, In progress, Next. The status word and a square shape (filled, half or outline) carry the meaning, never colour alone. Each item has a product tag, a deliverable, a last-update date and an evidence link. These candidate entries from public sources all need maintainer confirmation:

| Column | Product | Deliverable | Evidence |
| --- | --- | --- | --- |
| Completed | Augur Lituus | Whitepaper published, January 2026 | Whitepaper repo |
| In progress | Augur Lituus | Implementation with ChainSafe | Lituus-CS repo |
| In progress | Zoltar | Base-layer contracts and protocol docs | Zoltar repo, docs |
| In progress | Statoblast (grouped, smaller) | Augur Statoblast and Statoblast Trading | Zoltar repo |
| Next | Augur Lituus | Plain-language walkthrough of the design, announced on the blog in July 2026 | Blog post |

The caption reads: *A roadmap shows direction, not adoption.*

**Field record (Proposal).** One dated line under the roadmap, not a history block: `AUGUR V2 · AUGUST 2026` · *Augur v2's fork mechanism completed its first full run on Ethereum mainnet.* It links to the Moon Fork record in History or Learn. It must say Augur v2, the predecessor, and must not read as evidence for Augur Lituus.

**Code slot (optional).** Design a short Solidity card with a Copy action and the link *Open the example* → `/developers/#solidity-example`, but hide it until an example exists.

The signal rule is the only green here.

### 05 Use cases and application fit

The reader should recognise a problem like their own, and see what integration asks of them.

**Section head.** The title (draft) is *Let your application ask, not decide.* The lead (draft): *Applications can call on Augur Lituus when an outcome is disputed, instead of building their own dispute system and becoming the focal point of a contested result.* The section label reads `05 · ILLUSTRATIVE USES`.

**Three equal cards.** They are tonal panels, square, without icons. Each holds a name, a one-line problem, a three-step mini flow, a stage label in words and a next-step link:

| Card | Problem | Mini flow | Next step |
| --- | --- | --- | --- |
| Prediction markets | Resolve an event question so the market can settle. | *Was the milestone demonstrated by the deadline?* → Augur Lituus → Settle positions | Follow the Protocol example |
| Event-dependent payments | Use an external outcome as a payment condition. | *Was flight AB123 delayed by more than two hours?* → Augur Lituus → Determine a payout | Timing and invalid outcomes, in Developers |
| Custom oracle designs | Define local resolution rules while sharing REP. | Your rules → Zoltar → Shared REP, fork-aware | Explore the base layer → section 06 |

The stage labels (*Supported path* or *Under investigation*) are placeholders to confirm.

**Fit check.** A row of three numbered questions follows the cards: *Can the question be resolved clearly?* *Can the application wait and bear the costs?* *Can the team use the result safely?* Then the primary button **Explore application fit** → `/developers/#application-fit`, this section's green. The footnote reads: *Illustrative uses. Integrations are not established.*

Cross-chain requests stay off the homepage until implementation evidence supports them.

### 06 Zoltar: a shared foundation

The reader should grasp Zoltar's idea in one look, then notice, quietly, that products already build on it.

**Section head (Navy band).** The title, from the strategy: *Bring your own oracle. Share the foundation.* The lead: *Zoltar is a forkable base layer. Different oracle designs can share REP within a universe, as long as they handle forking into separate protocol states.*

**Body, left (columns 1–5).**

- **Intro line:** *Zoltar records questions, universes, REP and forks. It never judges which answer is true.*
- **Pull quote:** from Zoltar's own docs, in Sora 400 at 28/34: *A dishonest majority can win a vote, but it cannot stop honest participants from walking away with a copy of the books.*
- **Links:** *Read the system overview* (Zoltar docs) and *Explore the shared foundation* → `/developers/#shared-oracle-foundation`. The second link is the band's green.

**Body, right (columns 6–12): the branching ledger.** One universe line splits at a fork into Invalid, Yes and No branches, each continuing with its own REP. No branch is coloured or emphasised: Zoltar keeps them all, and applications and users decide where activity continues. Label the figure *Conceptual*.

**Secondary row (under a hairline).** A small label `ALSO ON ZOLTAR`, then two inline entries with stage labels and text links:

- **Augur Statoblast:** prediction markets on Zoltar, covering collateral, reporting, disputes and settlement.
- **Statoblast Trading:** an exchange for Statoblast shares; one of possibly many.

The row ends with *Developed by Dark Florist. Funded by the Lituus Foundation.* It has no buttons, cards or images and stays under about 120 px tall.

![Branching ledger: section 06 figure, conceptual](homepage-concept/branching-ledger.svg)

On the Navy band the branches are Pewter hairlines; none is ever green, because the protocol favours no answer.

## Sections 07–09 and footer: read on, ask, take a step

The last stretch is lighter and faster. It offers routes, not new claims, and then closes the loop the hero opened.

### 07 From the Blog

The reader should find one explanation and one update worth their time.

**Layout:** a featured article (columns 1–7) and a compact one (columns 8–12), then the pathway links (*For builders*, *Research and design*, *Project updates*) and **Explore the Blog** → `/blog/`.

**Suggested picks for editors,** from the existing archive:

| Slot | Post | Date and author | Label | Why |
| --- | --- | --- | --- | --- |
| Featured | *The Augur Lituus Whitepaper* | 29 January 2026 · Lituus Foundation | Research and design | Explains the design the homepage introduces |
| Compact | *The Augur Moon Fork Is Complete* | 5 August 2026 · @AugurProject (confirm the author name) | Project updates | The most meaningful recent progress |

Avoid featuring posts whose instructions have expired, such as the migration-deadline updates. The archive already marks them as historical.

**Brand covers (Proposal).** Replace the old featured images with generated typographic covers: a Navy field, the pathway label, a short green rule and the title in Sora 400, like the brand foundation's section openers. Every post, old or new, then gets a consistent cover with no new artwork, and article identity (URL, title, date) is unchanged.

### 08 Common questions

The reader should resolve a remaining doubt in seconds, without opening anything.

**Layout:** a two-by-two grid with the answers always visible, never an accordion. Each item has the question in Sora 600 at 18 px, two or three lines of answer with its qualification in the same sentence, and one deeper link. Finish with **View all FAQs** → `/faq/`.

| Placeholder question | Answer scope | Link |
| --- | --- | --- |
| Is Augur still a prediction market? | Origins, and the current focus on resolution infrastructure | History, Protocol |
| Can I build with Augur Lituus today? | Development stage and supported paths | Developers |
| What if people disagree about the result? | Challenges, delays and last-resort resolution | Protocol |
| Which REP do I hold after the Moon Fork? | Token versions and holder responsibilities | REP |

The fourth question adapts the strategy's *What can I do with REP?* to the post-fork situation; test both with readers.

### 09 Closing action: the loop closes

The reader should leave with one obvious next step, and see the question again with its outcome still open.

**Left (columns 1–7):** three stacked lines in Sora 400 at 48/56 (32/40 on mobile): *Explore the protocol. Inspect the open work. Join the conversation.* Under them:

- **How Augur works** → `/protocol/`: the primary button and the band's green.
- **Contact** → `/about/#contact`: an outline button.
- **Join the discussion:** a text link to the Augur Discord, sublabelled *Community discussion*. Confirm the destination before launch.

**Right (columns 8–12): the question record returns.** It is a compact version of the hero record, with the full state line drawn and the outcome area reading *Outcome recorded after 2027-09-08*. It is the page's last image: an open question waiting on evidence, not a result.

### Footer

The footer continues the Navy band under a Surface 3 hairline. It has the horizontal lockup in its Reversed version, keeping 1a clearspace, and the scaffold's line: *Explore the protocol, inspect the open work, and find the context behind it.*

| Group | Links |
| --- | --- |
| Explore | Protocol, Developers, Blog, FAQ |
| Resources | Learn, REP, Research, History |
| Project | About, Contact, Lituus Foundation |
| Legal | Terms, Privacy |

The grouping is already built in the scaffold. Copyright and operator are pending review, so show them as a marked placeholder.

## Visual language

The look comes from the brand foundation's own pages: large calm type, small tracked labels, hairlines, square records and green used rarely enough to mean something. The brand says public pages differ from the product through expressive type and motion, never through a different palette.

### Type

| Role | Family, weight | Desktop | Mobile | Used for |
| --- | --- | --- | --- | --- |
| Hero headline (Proposal) | Sora 600, −0.02em | 64/68 | 40/44 | 01 only |
| Closing lines (Proposal) | Sora 400, −0.01em | 48/56 | 32/40 | 09 only |
| Section title | Sora 400 (editorial-title) | 40/48 | 32/40 | Every section head |
| Pull statement | Sora 400 (editorial-section) | 28/34 | 24/32 | 02 question, 06 quote |
| Record and card title | Sora 600 (heading-2) | 20/26 | 20/26 | Question record, cards, article titles |
| Lead (Proposal) | Schibsted Grotesk 400 | 20/30 | 18/28 | Hero lead, section leads |
| Body | Schibsted Grotesk 400 | 16/24 | 16/24 | All other prose |
| Control | Sora 600 | 14/20 | 14/20 | Buttons, navigation |
| Label | Schibsted Grotesk, capitals, 0.12em | 12/16 | 12/16 | Index labels, metadata labels |
| Metadata | Schibsted Grotesk 400 | 12/16 | 12/16 | Dates, authors, records |

The package ships Sora 400 and 600 and Schibsted Grotesk 400. The brand also lists Sora Light for large supporting statements. The closing lines could use it, but only if the font file is added upstream.

### Colour: one green per band

| Band | Its green |
| --- | --- |
| 01 Hero | Explore the protocol button (plus the eyebrow label and rule) |
| 02 Why | Section rule; Deep on the *Qualifies* verdict |
| 03 How | The expected path to Final in the staircase |
| 04 Open work | Section rule only |
| 05 Use cases | Explore application fit button |
| 06 Zoltar | Explore the shared foundation link; the ledger stays neutral |
| 07, 08 | Section rule only |
| 09 Closing | How Augur works button |

- **On light:** green is Deep `#095E42`. Wash `#C9FFE5` is a fill only.
- **On Navy:** green is Augur Green `#2AE7A8`.
- **State:** named in words and square shapes first; colour only reinforces.

### Editorial chrome

- **Tracked label:** 12/16 capitals at 0.12em. Use Green on Navy, as on the brand cover, and Graphite on light.
- **Section rule:** 48 × 2 px, 16 px under the section title, 24 px above the lead. Green on Navy, Deep on light.
- **Label-over-value strip:** small tracked labels above 14/20 values, cells separated by space, a hairline above the strip. Used in the hero's proposition strip and the question record.
- **Lines:** Border (light) or Surface 3 (dark) hairlines between reading groups. Mist on control edges.
- **Shape and depth:** 0 px corners everywhere. Depth comes from tone steps only, with no shadows, glows or gradients.
- **Links in prose:** keep the underline `site.css` already restores, so links never depend on colour.

### Figures

The four figures are the question record, the claim-versus-demonstration panels, the escalation staircase and the branching ledger.

- **Construction:** square nodes, 1.5 px strokes, labels in Schibsted 14 px.
- **Build:** in HTML and CSS with real text wherever possible.
- **Content:** no invented numbers, durations or stakes.
- **Neutrality:** outcome choices and ledger branches always get equal weight.

### Motion (Proposal)

Use three moments of meaningful motion, each played once:

1. The question record's state line steps forward when section 03 enters view.
2. The staircase steps rise in sequence on first view.
3. The ledger's branches extend on first view.

Each takes 200–300 ms per step and ends static. The page is complete without JavaScript, with no scroll-jacking or parallax, and all motion is off under reduced motion.

### Components

Reuse the design system's Button, Card, Reference record and Page header. Propose two new upstream patterns, because Protocol, Developers and REP will reuse them:

- **Question record:** the worked example as a reusable record.
- **Label-over-value strip:** small tracked labels above their values.

## Responsive behaviour

On small screens the order of meaning stays the same: columns stack, nothing hides behind a tap, and only code scrolls sideways.

| Section | Desktop (1200 px and wider) | Tablet (834 px) | Mobile (390 px) |
| --- | --- | --- | --- |
| Section heads | Label left, title and lead right | Label above title | Label above title |
| 01 Hero | Message left, question record right, four-cell strip | Same split; strip in two rows of two | Eyebrow, headline, lead, actions, question record, then strip cells stacked |
| 02 Why | Prose left, panels right | Stacked; panels side by side | Stacked; panels stacked |
| 03 Staircase | Horizontal climb, stage table beneath | Horizontal climb, smaller steps | Vertical ladder: each stage a row, steps shown as indented bars, fork as an aside under the challenge rounds |
| 04 Open work | Source rows on one line; roadmap in three columns | Rows wrap to two lines | Rows stacked; roadmap groups stacked in the order Completed, In progress, Next |
| 05 Use cases | Three cards in a row | Three cards, mini flows wrap | Cards stacked |
| 06 Zoltar | Text left, ledger right | Stacked, ledger full width | Stacked; the ledger turns vertical, branching downward |
| 07 Blog | Featured plus compact | Featured plus compact | Stacked |
| 08 FAQ | Two-by-two | Two-by-two | One column |
| 09 Closing | Lines left, record right | Stacked | Lines at 32/40, buttons full width, record below |

- **Controls:** 32, 36 or 40 px tall, per the layout foundation.
- **Touch targets:** at least 44 × 44 px on coarse pointers.
- **Wide content:** tables, code and addresses scroll inside their own container.

## Guardrails and open decisions

Composition is open to the designer; these guardrails from the strategy, spec and brand are not.

**Guardrails:**

- **No invented facts.** No invented numbers, results, live markets, reports or adoption. Anything illustrative says so.
- **Product hierarchy.** Augur Lituus leads, Zoltar is foundational, Augur Statoblast and Statoblast Trading share one small row. Always write Augur Lituus in full.
- **Version separation.** Never let Augur v2's Moon Fork read as evidence for Augur Lituus, and never imply one migration path across Augur v2, Augur Lituus and Zoltar.
- **Neutral choices.** Outcome choices and ledger branches always get equal weight.
- **No hidden core content.** Nothing essential sits behind hover, animation, an accordion or a tap.
- **Logo.** Production logo files only, never redrawn or used as decoration.
- **Nothing extra on Home.** No live counter, fork monitor, history block or decorative intro.

**Open decisions:**

| Decision | Options | Recommendation |
| --- | --- | --- |
| Fixed Navy bands (01, 06, 09) | Fixed in both themes, or following the theme | Fixed |
| Hero headline | Sora 600 at 64 px, or Sora 400 in the editorial voice | 600, matching the brand's public-facing reference |
| Field record line in 04 | Show the dated Augur v2 line, or keep the Moon Fork off Home | Show it, clearly labelled |
| Returning-reader line in 01 | Show it, or rely on the FAQ preview | Show it while post-fork traffic lasts |
| Roadmap entries and product stages | The candidates listed in section 04 | Maintainers confirm before visual sign-off |
| Blog picks | The suggested two | Editors confirm, including the author name |
| Discord and Contact destinations | Confirmed links and a named maintainer | Required before launch |

**Test the prototype against the plan's M2 checks:**

1. Can a newcomer explain the purpose and follow the superconductivity question through the staircase?
2. Can readers distinguish Augur Lituus, Zoltar, Augur Statoblast and Statoblast Trading, and explain shared REP at the intended level?
3. Can they find the code and research, and tell completed work from plans?
4. Can they find Contact without searching?
5. Does any preview repeat another without adding an answer?

## Sources

Read on 2026-10-01, alongside the strategy PDF in this project.

- **Website:** [jubalm/augur-dot-net](https://github.com/jubalm/augur-dot-net), the files `SPEC.md`, `docs/IMPLEMENTATION-PLAN.md`, `docs/DESIGN-SYSTEM.md` and `src/styles/site.css`.
- **Design system:** [jubalm/augur-design-system](https://github.com/jubalm/augur-design-system), the files `DESIGN.md`, the foundation docs (layout and geometry, fonts, visual direction) and the brand foundation PDF (August 2026).
- **Zoltar and Augur Statoblast:** [AugurProject/zoltar](https://github.com/AugurProject/zoltar), its README, the system overview and the Zoltar explanation in `docs/`, and the deployment status page.
- **Augur Lituus implementation:** [AugurProject/Lituus-CS](https://github.com/AugurProject/Lituus-CS) and [AugurProject/Lituus](https://github.com/AugurProject/Lituus).
- **Whitepaper:** [AugurProject/whitepaper](https://github.com/AugurProject/whitepaper), the Augur Lituus whitepaper, abstract and protocol summary.
- **Research:** [AugurProject/oracle-research](https://github.com/AugurProject/oracle-research), the README.
- **Current site:** [AugurProject/augur-reboot-website](https://github.com/AugurProject/augur-reboot-website), the README and blog archive (the Moon Fork, July 2026 update and Augur Lituus whitepaper posts).
- **Foundation:** [AugurProject/lituus-foundation-website](https://github.com/AugurProject/lituus-foundation-website), the hero, philosophy and approach copy.
