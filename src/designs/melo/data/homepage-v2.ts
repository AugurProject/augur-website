/** Homepage v2 copy, the /2/ review copy (owner, 21 Oct 2026). One home for every v2 string: the
 * home sections read it through homeCopy() (homepage-review.ts) when `variant` is 'v2'; v1 keeps its
 * copy where it is, untouched. v3 and v4 (homepage-v3.ts, homepage-v4.ts) spread this object and
 * override it section by section, so a change here reaches them too wherever they don't override.
 * Source: Ryan's 17 notes as Augus marked them (dash = do, X = don't, 1–3 = Augus rewrote it).
 * Each entry names its source: "Ryan n" or "Augus n".
 * Augus's worry is that v2 turns technical, so jargon stays in the small supporting lines.
 * Not changed in v2: the hero headline and art (Ryan 1), "?" tooltips (Ryan 6, X), the roadmap
 * (Ryan 14) and an intent split of the page (Ryan 16, X).
 * Guardrails: no ranking claim without a source (the whitepaper's own modelled estimate backs one,
 * said once and hedged, in the Robust card; Augus to confirm); a fork has a
 * two-week one-way migration window (whitepaper §4.2, docs/sources.md); unmigrated REP loses its
 * value, the fork never takes it; REP is optional, never a duty to report or challenge.
 * Draft copy for review, not approved. Deliberately not flagged `needsReview`: /2/ is a review route
 * and the flag would add launch blockers (check-launch).
 * The variant type and the version list live in homepage-review.ts. */

import { stakedBehind } from '../../../data/rep';

export const homeV2 = {
  hero: {
    // Ryan 2: the attack cost, stressed through the mechanism: each challenge doubles the bond
    // (whitepaper §2.1 p2, §4.1 p5), so keeping a lie standing costs twice as much every round.
    // Hero.astro keeps the v1 sentence literal up to "and " (its straight apostrophe would be escaped
    // in an expression) and swaps in this ending. The ranking itself is said once, in the Robust card.
    bodyEnd: 'every challenge doubles the cost of a lie.',
  },
  why: {
    lead: 'Whoever controls the oracle decides who gets paid.', // Ryan 3, verbatim
    // Ryan 4: no "parties". It answers the lead in its own words: whoever controls it / no one does.
    // Design intent (Abstract p1; §2 p2: no backstops or vetoes).
    answer: 'With Augur, no one controls the oracle.',
    // Augus 3: his three cards (titles, order and the facts in each), in plain words, with the jargon
    // kept to the small lines (Augus's worry). Ryan 5: "Anyone can ask" over Augus's "Any app can ask"
    // (§2 p2 "Anyone may pay a fee", §4.4.1 p7). Ryan 17: the differentiators said plainly: no
    // governance, no multisigs, the attack cost. Every claim line fits one line in H3 (24 px) and
    // every body two lines from 1024 up, so the three cards stay level (home-v2.css).
    tenets: [
      // Augus's "Report, challenge, or build" is a rule of three. The claim already covers asking and
      // answering, so the body adds projects (§2 p2 "permissionless use by third parties").
      // "On their own" (review fix, 21 Oct 2026): "without asking" reused the claim's "ask" in the other
      // sense (permission, not a question) and said "No approvals" twice. Not "freely": a question
      // costs a fee (§4.4.2 p7).
      { title: 'Permissionless', diagram: 'cross', claim: ['Anyone can ask.', 'Anyone can answer.'], body: 'Projects plug in on their own. No approvals, no gatekeepers.' },
      // Abstract p1: truth "is not decided by token holders, governance, multisigs, or anyone else";
      // §2 p2: "without any centralized backstops or vetoes". Augus's "no admin keys" is left out: the
      // whitepaper never mentions admin keys, and Lituus-CS isn't shipped (open question for Augus).
      // "Augur's creators" and "override" are his ("or anyone else" in the paper). The No authority
      // lanes (a signal crossing an empty middle, the scene first drawn for "Trustless") show the claim:
      // no one stands between question and answer.
      { title: 'Trustless', diagram: 'authority', claim: ['No governance.', 'No one has a veto.'], body: 'No multisigs. Not even Augur’s creators can override an answer.' },
      // Augus's claim ("Harder to game. Costlier to manipulate.") in plain words, without "money" or
      // "bond" in this section (house rule: nothing may suggest money buys the answer). The ranking is
      // the whitepaper's own estimate: Abstract p1 "significantly more resistant to attack than all
      // current offerings"; §3 p3, the most expensive to attack of the designs surveyed (134% of FDV);
      // §8 p20. "Designed to" and "almost any" hedge a modelled figure for an undeployed design. The
      // peer mesh (no centre, a relay running every link) shows why: there is no one point to corrupt.
      { title: 'Robust', diagram: 'mesh', claim: ['Hard to corrupt.', 'Lies get expensive fast.'], body: 'Designed to cost attackers more than almost any other oracle.' },
    ],
    // The statement stays v1's: "The answer is nobody’s call." On /2/ it heads the closer, above a panel of
    // the two readers (owner, 23 and 25 Oct 2026; Tenets.astro, home-v2-only.css), so each payoff says what
    // it means for that reader instead of a fifth "no one". Both setups name the same risk, a wrong answer.
    paths: [
      // Ryan 7: say plainly that markets misresolve. A question, since nothing sources "many traders".
      // The payoff answers it with recourse: a report can be challenged while its window runs (whitepaper
      // §2.1 p2, §4.1 p5). "Anyone" echoes the Permissionless claim; it never says REP holders must
      // challenge. Since 26 Oct 2026 (owner: the team's notes where they fit) it also carries Augus's 18 Oct
      // point, why a trader wants the market they use on this oracle: "Trade where …" makes the recourse a
      // reason to choose that market, without promising anything ("it" is the wrong settlement). Was "Here,
      // anyone can challenge a wrong answer." and before that "Here, no one decides alone."
      { who: 'For traders', line: ['Seen a market settle the wrong way?', 'Trade where anyone can challenge it.'] },
      // Ryan 8 + Augus 1: liability first, then hand it off. "For builders" (was "For integrators"): the
      // site's name for them (the For builders guides, the footer's "Building on it?"), and plain for
      // beginners. v1's approved "Leave resolution to Augur Lituus." returns: it was dropped only for the
      // 323 px three-column cell, and it names a process where "Let Augur Lituus answer." cast the oracle
      // as the one who decides, beside "nobody’s call". "Resolution" moves out of the setup so it isn't
      // said twice. Both setups and payoffs fit one line wherever the readers sit side by side: the
      // closer steps their sizes down below 1280 (home-v2-only.css, measured 25 Oct). v4 keeps the 21 Oct
      // lines (homepage-v4.ts).
      { who: 'For builders', line: ['A wrong answer can cost a platform its users.', 'Leave resolution to Augur Lituus.'] },
    ],
  },
  applications: {
    // Ryan 9, verbatim: one sentence; "It asks a question and acts on the answer." goes (the cases show it).
    lead: 'Any protocol or app that needs to know what happened in the world.',
    // Ryan 10: the DAO case checks an upgrade against the DAO's own rules, so the DAO stays open-ended
    // and its developers can't push through a change that breaks them (a rug). Spread over v1's case in
    // Applications.astro (id, icon, title, outcomes and the gate picture keep one source). The paper
    // frames questions as checkable facts (§5 p12 "objective ground truth"; an unresolvable one resolves
    // Invalid, §4.0.1 p3), so the question points at a written rule, not at a reading of the mission.
    // Yes now blocks: the picked Green chip comes first, as in the other two cases. `labels` relabel the
    // gate picture to match (this upgrade stops at the check; another change passes it and goes live).
    governance: {
      summary: 'Upgrades and proposals checked against a DAO’s written rules: its constitution and mission.',
      question: 'Does this upgrade break a rule in the DAO’s constitution?', answer: 'Yes',
      // Reads "Decided in the open, not by the upgrade’s own developers." (as "the market’s own team").
      notBy: 'the upgrade’s own developers',
      action: 'Block the upgrade.',
      // The second lane of the picture, and Ryan's "DAOs stay open-ended", in one plain line (one line from
      // 1024 up; "Changes that follow the constitution…" left "go live." alone at 1024).
      explanation: 'Changes within the constitution can still go live.',
      labels: { lanes: ['This upgrade', 'Another change'], at: 'Constitution check' },
    },
    // Ryan 11 (X) + Augus 1: the builder block stays, rewritten from Augus's note. Reasons in Ryan 8's
    // order: less liability first (the backlash over a bad resolution lands on whoever decided it), less
    // work second, user trust third. "Augur Lituus" in full in the ask, its object (a second mention in
    // the section, like the Insurance note: on phones the ask follows the reasons, so "it" would dangle).
    // "Win user trust." is Augus's own line; it reverses his 18 Oct "no trust" in this section (open question).
    builder: {
      title: ['Good for users.', 'Easier for projects.'],
      // The ask beside its "Talk to us" button (/contact/, the v1 button): Augus's two questions, the
      // first muted, the second in Paper (the house setup and payoff). No arrow: an internal link.
      ask: ['Want Augur Lituus in a platform you use?', 'Or one you’re building?'],
      reasons: [
        // Augus: "When outcomes get contentious, Augur's dispute process makes the call - not you." Not
        // "not you" (AGENTS.md: no "your call" for traders-first copy) or "makes the call" (an idiom the
        // owner replaced on 19 Oct). The project never picking a side is what keeps a bad call from
        // landing on it (disputes escalate in public, §2.1–2.2 p2); "in the open" echoes each case's
        // "Decided in the open". Every point keeps two lines from 1024 to 1440 (measured), so the three
        // columns end level; "Contested outcomes go to the dispute process…" took three from 1100 down.
        { title: 'Stay out of the middle.', line: 'Disputes settle in the open. The project never picks a side.' },
        // Augus, verbatim. A fee per question (whitepaper §4.4.2 p7; fixed-price Query Tokens, §4.4.7 p9).
        { title: 'No team to hire.', line: 'Pay per question instead of running resolution in-house.' },
        // Augus's line, trimmed to fit two lines at 1024: his "independent", "check" for "verify … themselves".
        { title: 'Win user trust.', line: 'Users can check and challenge independent outcomes.' },
      ],
    },
    // The right box, /2/ only (owner, 25 Oct 2026: the question card, answer chips and pictures were
    // noisy, and the copy and layout may change; Augus's 18 Oct note for this section). Each case is a
    // product running on Augur Lituus as its users would see it, then one paragraph for the people who
    // build it: users see how many kinds of product it fits, builders what handing resolution over saves
    // them (no one on the team decides, a challenged result isn't theirs to defend, no claims to review).
    // Draft copy. Every card says "Example" and its values are illustrative. The three paragraphs keep
    // three lines from 1024 to 1440 (measured 25 Oct), so the stage keeps one height with nothing left
    // over. Insurance keeps the fallback use (owner, 6 Oct; awaiting the maintainers, launch checklist)
    // as its paragraph's second sentence, without "on its own chain or L2" so it stays three lines at
    // 1024. The DAO card keeps Ryan 10's point that changes within the constitution still go live.
    // "Decided in the open, not by …" goes: the paragraphs say who doesn't decide.
    cards: {
      answeredBy: 'Answered by Augur Lituus',
      cue: 'For builders',
      // What the query cards share, one source: Augur Lituus's name, How it works' statuses (walkthrough.ts: a
      // report is "open to challenge") and a note for each step. At Final the check says it's final (owner,
      // 26 Oct 2026: "something that reads as final or a check mark … then remove the text"), and the note
      // says why, so the answer keeps a line under it as the market's $1 does (owner, 28 Oct 2026: "add a
      // tiny short text under 'Yes' to keep the symmetry").
      query: { name: 'Augur Lituus', statuses: ['Asked', 'Reported', 'Final'], notes: ['Waiting for a report', 'Open to challenge', 'Not challenged'] },
      // The market card is a query split in two (owner, 26 Oct 2026, design D of the use-case motion board:
      // "Split it is"): the market's price beside Augur Lituus's answer. A price near 100 is the market's
      // consensus, not settlement, so the market pays only once the answer is Final. The statuses are How it
      // works' (walkthrough.ts: a report is "open to challenge"); this query isn't challenged, so it goes
      // Asked, Reported, Final, in the whitepaper's order (§4.5's example: the market creator pays the Query
      // Fee when making the market, people bet, a report comes 12 hours into the reporter pay's clock auction,
      // and a day with no appeal makes it final). The question, picked from ten, is information that
      // benefits everyone (owner: "adjacent to what Augur really means"). The label is "Query" (owner, 26 Oct
      // 2026); prices and the answer are illustrative.
      prediction: {
        label: 'Query',
        title: 'Will this year be the hottest on record?',
        market: { name: 'Market', prices: [64, 71, 86, 99], paid: '$1', pending: 'Yes price', resolved: 'Paid per Yes share' },
        // The notes under the answer are `query.notes`: the two waiting steps, then at Final, beside the check,
        // why it's final.
        oracle: { answer: 'Yes' },
        builders: 'Markets settle once the answer is final, and no one on the team has to decide who won. A challenged result is settled in the open, so it isn’t the team’s to defend.',
      },
      // The insurance card is a relay (owner, 28 Oct 2026, "Relay it is", concept 3 of the Insurance sketch
      // board): one line through three stops, the flight, Augur Lituus and the cover, under the query's
      // question. It is a parametric cover, as real delay covers are: it asks whether the flight was late, not
      // what it cost, and pays a fixed amount with no claim once the answer is final. The values read as one
      // sentence (Landed, Yes, Paid); the notes carry the detail. Due 14:05, landed 16:50: 2 h 45 min late,
      // over the cover's 2 hours. The question is 430 px at 22 px, the market's 426, so both cards wrap at the
      // same width and keep one height. Values are illustrative.
      insurance: {
        label: 'Query',
        title: 'Will flight AB123 land over 2 hours late?',
        flight: { name: 'Flight AB123', states: ['In the air', 'Landed'], notes: ['Due 14:05', '2 h 45 min late'] },
        oracle: { answer: 'Yes' },
        cover: { name: 'Delay cover', paid: 'Paid', notes: ['If over 2 h late', 'Every policyholder'] },
        builders: 'Payouts run once the delay is confirmed, with no claims to review. An insurance app could also use a faster oracle and turn to Augur Lituus only when a claim is disputed.',
      },
      // The DAO card is a switch (owner, 29 Oct 2026, "Polish, review then implement the Switch into /melo",
      // concept 1 of the DAO board's round 5, after the vote bar and three rounds of other pictures). The DAO's
      // part is one row: the treasury upgrade's go-live switch, which the vote turns on and the block turns off.
      // Augur Lituus's part is the larger (owner, 29 Oct 2026: "None of them give enough importance to the Augur
      // Lituus process"): both answers, so it reads as a yes/no, the report on Yes, the day it's open to
      // challenge, then Final. Real DAOs queue a passed vote behind a timelock, often two days, before it runs;
      // here Augur Lituus's Yes holds it there, so the vote alone doesn't decide (Ryan 10: a change that breaks
      // the DAO's rules can't be pushed through). The question is 402 px at 22 px, under the market's 426:
      // between about 1030 and 1095 px it keeps one line while the other two wrap, so the card is 28 px shorter
      // there. Values are illustrative.
      governance: {
        label: 'Query',
        title: 'Does this upgrade break a DAO rule?',
        upgrade: { name: 'Treasury upgrade', states: ['Voting', 'Passed'], notes: ['Open to members', 'Goes live in 2 days'] },
        oracle: { answer: 'Yes', other: 'No' },
        outcome: { status: 'Blocked', note: 'It won’t go live' },
        builders: 'Every upgrade is checked against the DAO’s own rules by a process the core team doesn’t control. Changes within the constitution can still go live.',
      },
    },
  },
  howItWorks: {
    // Ryan 12: the detail goes behind a click. The heading (v1's, with its "paid" mark), this one-line
    // lead and the four step names (walkthrough.ts, one source) stay in the scroll; the toggle opens
    // the full walkthrough in place, as do a step and the hero's "See how it works".
    // The lead replaces v1's three sentences with how you take part and what it risks: the stake is
    // the report's bond (§2 p2, §4.1 p5) and v1's own last sentence, approved. The payout figures
    // (the reward, 80% of a wrong bond) stay in the example, where the numbers have context.
    // One line from 1200 up; where it wraps it balances, and the no-break space keeps "A" with
    // "wrong", so it breaks between the sentences (it left "your bond." alone at 1024, "A" at 390).
    lead: 'Stake REP on what you saw. A wrong call costs your bond.',
    // The toggle's two labels (aria-expanded carries the state; the words say what a press does).
    open: 'Walk through an example',
    close: 'Hide the example',
    // The strip's list name for screen readers; each step is a button that opens the example there.
    steps: 'Steps in the example',
    // /2/ only (owner, 25 Oct 2026, item 4; brief in docs/know-what-happened-prompt.md, then chosen on the item 4
    // board: four cards in the Why Augur cards' family, "nice boxes and green lines"). Ryan 12: the closed
    // section tells the rule in four cards, one scene each, and one question's real numbers wait behind "Walk
    // through an example" (`open` and `close` above, shared with v3 and v4, which keep reading `lead` and
    // `steps`). The owner's "the whole process from asking to getting a final answer and the middle stuff"
    // stays on the scroll: the four steps, the waits in the scenes and the bodies. Augus, 18 Oct: the consumer
    // case, so the moves speak to "you" and every gain keeps its condition beside the risk. Augus's worry:
    // plain words, so "bond", "appeal period" and "Reporter Pay" appear nowhere, the example included (29 Oct
    // 2026). Draft copy.
    // Facts (January 2026 whitepaper): anyone asks for a fee in REP (§2 p2, §4.4.2 p7); the reward rises
    // from 0 REP toward the fee until someone reports, and goes to the first to back the final answer
    // (§4.4.3 p7, §4.3.1 p6); a report stakes the fee, a challenge stakes double on another answer and
    // restarts the appeal period, and when one ends with no new stake the latest answer is final (§2 p2,
    // §4.0.2 p4, §4.1 p5); winners share 80% of the losing stakes, "most" on the scroll, and 20% burns
    // (§4.3.1 p6).
    path: {
      // The REP page hero's clause (rep.ts, one source), then the deal: a gain and the loss beside it.
      // No-break spaces hold "Be right and you’re paid." together, so where the lead takes two lines it
      // breaks between its first two sentences (balanced, it left "Be" at the end of line one at 1440).
      lead: `${stakedBehind}. Be right and you’re paid. Be wrong and you lose your stake.`,
      label: 'How taking part works',
      // Each step (sketch A of the item 4 board; owner, 25 Oct 2026: "build A on /2"): a tab with its number and
      // name, and a stage with its scene (how-scenes.ts), the claim in two lines (setup in
      // Pewter, payoff in Paper) and one body line, which carries the wait that follows. Nothing sits under the scene (owner, 29 Oct
      // 2026: a figure row, then captions, then a legend there each took the eye from the claim). Challenge says "double theirs": in the cold read, "stake double" didn't say of what. `scene`
      // names the step's drawing.
      // `note` is the tab's line under its name (owner, 26 Oct 2026: "a tiny text below the 'Ask' 'Report' stuff"):
      // read with the name it says what the step is in REP terms, so the row of tabs tells the whole process before
      // any is picked. It never repeats the claim (the line the tabs had before did, and went as noise). Facts: a
      // fee per question in REP (§4.4.2 p7), a report stakes on an outcome (§4.1 p5), a challenge stakes on another
      // (§4.0.2 p4), rewards go to the outcome that becomes final (§4.3.1 p6). Short enough for one line from 1024.
      stops: [
        { title: 'Ask', note: 'Pay a fee in REP', scene: 'ask', claim: ['Anyone can ask.', 'A fee funds the reward.'], body: 'The reward grows until someone reports what happened.' },
        { title: 'Report', note: 'Stake on an answer', scene: 'report', claim: ['Report what you saw.', 'Stake REP on it.'], body: 'No challenge in time? Your stake comes back with the reward.' },
        { title: 'Challenge', note: 'Back another answer', scene: 'challenge', claim: ['Think it’s wrong?', 'Stake double theirs.'], body: 'The time to challenge starts again on your answer.' },
        { title: 'Get paid', note: 'If your answer holds', scene: 'paid', claim: ['No new stake in time?', 'The answer is final.'], body: 'Whoever backed it wins most of the losing stake.' },
      ],
      // The example as a story (owner, 29 Oct 2026: "I love the story in words", sketch D of the example board):
      // walkthrough.ts's question and amounts in four plain sentences, one per step above, each under that step's
      // name, with "you" as the challenger who turns out right, so it ends on your payout (peak–end). No jargon:
      // the scroll never says bond, appeal period or Reporter Pay, so the story doesn't either. HowItWorks.astro
      // fills each {name} from walkthrough.ts. Emphasis is marked, never automatic (owner, 29 Oct 2026: "fix the
      // bold and green"): **…** is bold, Sora 600 in Paper, and {+name} is your win, bold in Green. Bold carries
      // the story on its own: the fee, each side's answer and stake, said the same way in Report and Challenge,
      // and the final answer; your own stake coming back stays plain, since it isn't a gain. The reward's amount
      // for an overturned report isn't in §4.4.3, so it has no figure; it goes to the first to back the final
      // answer, you here. The reporter's 15 REP splits into your 12 and 3 burned. `label` names the card for
      // screen readers.
      // Facts behind the wording: a question comes with rules for judging it (walkthrough.ts's fields); the fee
      // isn't fixed, so 15 REP is "in this example" (the whitepaper's §4.5 figure; who sets its size isn't
      // claimed); anyone can report (§2, rep.ts), so the reporter never reads as the team; a report stakes the
      // fee (§2, §4.1); a challenge restarts the time to challenge, now on the new answer (§4.0.2). Get paid
      // names the final answer, then your payoff, then the burned rest (option B of the copy review).
      example: {
        label: 'An example, step by step',
        story: [
          'Say someone asks, “{question}” They set the rules for judging it and pay a fee in REP, which funds a reward for the right answer. In this example, the fee is **{fee}**.',
          'Anyone can report. Here, someone reports **{reported}** and stakes **{bond}** on it, the same as the fee.',
          'You think the reporter is wrong, so you challenge with **{challenged}** and stake **{challenge}** on it, double theirs. The time to challenge starts again, and now anyone can challenge you.',
          'No one challenges you in time, so the final answer is **{final}**. You get your {challenge} back, plus {+share} of the reporter’s stake and the reward. The other {burned} of theirs is burned.',
        ],
      },
    },
  },
  holder: {
    // Ryan 13 + Augus 2: what REP is for, and that holding it isn't passive. Each point keeps a
    // condition (house rules: no guarantees; REP is optional, never a duty to report or challenge):
    // - Staking is how you report or challenge (the bond, §4.1 p5; the only staking in the paper), and
    //   rewards go only to an answer that holds (§4.3.1 p6; rep.ts). "Put it to work" is Ryan's; "if you
    //   want" carries v1's "Optional.".
    // - The fork window is the whitepaper's proposed design (§2.2 p2 "a two week, one-way migration
    //   window"; Lituus-CS forking isn't built, docs/sources.md), hence "is designed to". Unmoved REP
    //   loses its value (§4.2.2 p5): Augus's "risk losing the token" is reworded, since nothing takes it.
    //   Ryan's "check in at least once a month" is declined: the paper sets no cadence, and a monthly
    //   check could miss a two-week window.
    // Labels, not squares (owner, 29 Oct 2026, sketch A of the Holding REP board: "Earn", then Ryan's
    // "Non-passivity" in plain words): each point is a tile led by its `label`, and `earn` gives Earn's the
    // Green outline. Earn is incisive (REP earns REP, like work that pays, "paid in REP", never money, price or
    // yield) and stays conditional and optional; the fork point is calm: a last resort (rep.ts), then what to
    // do, then the one fact, plainly (moving doesn't promise value, so it says only what unmoved REP loses).
    // Smaller (owner, same day: "occupying too much space"), then one full-width Navy card with the points as spec
    // rows (round 5 of the Holding REP board: "just text floating around looks weird"): each `label` is the row's
    // term. Earn echoes the heading ("Know what happened?"); "when you know" keeps taking part a choice. The fork
    // row is about not being fully passive, never a duty or a threat (owner: "do not scare people away"): holding
    // is mostly hands-off, and a fork opens a window to move (the two-week window is a proposed design, so it
    // stays unnamed; what unmoved REP loses is on the REP page). `link` names the REP page by what it gives you
    // ("Learn more" says nothing), an outline button in the card.
    title: 'Holding REP?',
    link: 'How REP works',
    points: [
      { label: 'Earn REP', text: 'Report or challenge when you know what happened, and get paid in REP when your answer holds.', earn: true },
      { label: 'Stay in the loop', text: 'Holding is mostly hands-off. If a fork ever starts, there’s a window to move your REP to the answer you believe in.' },
    ],
  },
  learnMore: {
    // Ryan 15: no "From the blog" column; the FAQ stays, with a plain link to the blog. The heading
    // stays v1's ("Learn more about Augur.", on two lines in LearnMore.astro), and the section gets the
    // shared heading row like every other one: this lead is the published /faq/ lead (faq.astro), so it
    // says what the list holds. One line from 1024 up.
    lead: 'Short answers, each with a link to go deeper.',
    // A text link beside the outline "View all questions" (DESIGN.md: the outline button ends a list
    // that continues on its own page; the blog is a second, lighter way on). PRODUCT.md: the homepage
    // points to writing and FAQs.
    blog: { label: 'Read the blog', href: '/blog/' },
    // /2/ only (owner, 25 Oct 2026, item 6: send people on to the FAQ, the blog and the community; 26 Oct:
    // sketch A, the questions go and three doors are the section). The lead names the doors in order
    // (answers, updates, people) and each door's line says what's behind it, all about the same length,
    // so the three wrap alike. The community door leads with Discord alone (navigation.community, one
    // source), so it never repeats the footer's four-link column a screen lower; the blog's line stays
    // clear of the newsletter's "Research, development and product updates" just below. Draft copy.
    keepGoing: {
      heading: 'Keep going.',
      lead: 'Answers, updates and the people around Augur.',
      faq: { title: 'FAQ', line: 'Plain answers on markets, REP and how questions get settled.' },
      blog: { title: 'Blog', line: 'Progress reports, research and design notes from the team.' },
      community: { title: 'Community', line: 'Ask questions, share ideas and follow the build on Discord.' },
    },
  },
} as const;
