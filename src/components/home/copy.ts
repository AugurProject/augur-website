/** Homepage copy. One home for every homepage string: the
 * sections read it by importing `homeCopy`.
 * Jargon stays in the small supporting lines.
 * Guardrails: no ranking claim without a source (the whitepaper's own modelled estimate backs one,
 * hedged, in the hero's "more than ever before" and the Robust card); a fork has a
 * two-week one-way migration window (whitepaper §4.2, docs/sources.md); unmigrated REP loses its
 * value, the fork never takes it; REP is optional, never a duty to report or challenge.
 * Draft copy for review, not approved. Deliberately not flagged `needsReview`: the flag would add launch
 * blockers (check-launch).
 */

import { stakedBehind } from '@/components/rep/rep';

export const homeCopy = {
  hero: {
    // The opening sentence points back at the lead ("those
    // answers": real-world answers for onchain apps), so it defines "oracle" without saying the lead again.
    intro: 'Augur Lituus is Augur’s next-generation oracle: it tells blockchain apps what happened in the real world.',
    // The ending names the moves (ask, report, challenge) before the cost
    // of lying. The whitepaper's modelled estimate (Abstract p1; §7.5 p20, 46% costlier to attack than Augur's
    // previous design), hedged by "designed to"; the Robust card says the ranking against other oracles.
    // Anyone may ask for a fee (§2 p2, §4.4.1 p7). Hero.astro renders `bodyStart` after the opening sentence,
    // in place of the shared second sentence's opening; the ending's last two words stay on one line.
    bodyStart: 'Anyone can answer, anyone can challenge, and ',
    keep: 2,
    bodyEnd: 'lying is designed to cost more than ever before.',
    // Three reader links on the first screen,
    // in the hero's action area (Hero.astro, hero.css), in place of "See how it works". Traders
    // first, so theirs is the one Green action. Each link lands on its section's heading; the REP link
    // targets the How it works heading, not #how-it-works, which would open the example (how-path.js).
    paths: {
      label: 'Jump to',
      links: [
        { label: 'For traders', href: '#tenets-heading' },
        { label: 'For REP holders', href: '#how-heading' },
        { label: 'For builders', href: '#applications-heading' },
      ],
    },
    // No whitepaper link under the three; the
    // roadmap's paper milestone still links it.
    whitepaper: false,
  },
  why: {
    // Apps need to know what happened before they pay out or act, said in half
    // the words, with "blockchain", which readers know before "oracle". "Real-world answers" stay the hero's.
    lead: 'Blockchain apps need to know what happened before they pay out or act.',
    // The band is cut to what the lead asks for: "tells them", then "in charge of the truth", which
    // echoes the headline. One line from 1024 up (measured). Design intent (Abstract p1; §2 p2: no backstops
    // or vetoes).
    answer: 'With Augur, no middleman controls the answers.',
    // Three cards (titles, order and the facts in each), in plain words, with the jargon
    // kept to the small lines. "Anyone can ask" over "Any app can ask"
    // (§2 p2 "Anyone may pay a fee", §4.4.1 p7). The differentiators said plainly: no
    // governance, no multisigs, the attack cost. Every claim line fits one line in H3 (24 px). The bodies
    // are trimmed so all three switch together: two lines from
    // 1300 up and three from 1024 to 1280 (measured; they differ only in about 15 px around 1290).
    tenets: [
      // "Ask" for "Submit" (the claim's verb and How it works' first step) and "a question" for
      // "a question about a real-world event". Anyone may ask, report or challenge (§2 p2, §4.4.1 p7).
      {
        title: 'Permissionless',
        diagram: 'cross',
        claim: ['Anyone can ask.', 'Anyone can answer.'],
        body: 'Ask a question, report what happened or challenge an answer you believe is wrong.',
      },
      // "A dispute" for "Augur's dispute process", which took it to four
      // lines at 1024. "No multisigs." sits in the claim. Abstract p1: truth "is not decided by token holders,
      // governance, multisigs, or anyone else"; §2 p2: "without any centralized backstops or vetoes". "No admin
      // keys" stays out: the whitepaper never mentions admin keys. The
      // middleman who falls away shows it.
      {
        title: 'Trustless',
        diagram: 'authority',
        claim: ['No governance.', 'No multisigs.'],
        body: 'No company, developer or governing body can overrule the outcome of a dispute.',
      },
      // "Designed with" rather than "Built with", since the design isn't deployed, and "that set a new bar" for "some of the strongest …
      // of any oracle": the paper's "unprecedented security"
      // (Abstract p1), whose own estimate ranks it above all current offerings (Abstract p1; §3 p3, 134% of
      // FDV; §8 p20). "False outcomes" is the paper's "fraudulent outcome" (Abstract p1). No "money" or "bond"
      // in this section (house rule: nothing may suggest money buys the answer).
      {
        title: 'Robust',
        diagram: 'mesh',
        claim: ['Harder to game.', 'Costlier to manipulate.'],
        body: 'Designed with economic defenses against false outcomes that set a new bar.',
      },
    ],
    // The statement is "The answer is nobody’s call." It heads the closer, above a panel of
    // the two readers, so each payoff says what
    // it means for that reader instead of a fifth "no one". Both setups name the same risk, a wrong answer.
    // Both setups and payoffs fit one line wherever the
    // readers sit side by side (the closer steps their sizes down below 1280, tenets.css).
    paths: [
      // Misresolution said outright ("misresolve"). "Probably" keeps the unsourced "many
      // traders" a guess about the reader, never a statistic; the payoff says no authority decides at all
      // (Abstract p1: not "token holders, governance, multisigs, or anyone else").
      {
        who: 'For traders',
        line: ['You’ve probably seen a market misresolve.', 'Here, no authority decides the outcome.'],
      },
      // Liability first (PR disasters from bad resolutions), then why it goes away: the builder's
      // team never rules on the outcome. "Your team" is scoped by "For builders" (AGENTS.md).
      {
        who: 'For builders',
        line: ['One bad resolution can turn into a PR disaster.', 'With Augur Lituus, your team isn’t the judge.'],
      },
    ],
  },
  applications: {
    // One sentence; "It asks a question and acts on the answer." goes (the cases show it).
    lead: 'Any protocol or app that needs to know what happened in the world.',
    // The DAO case checks an upgrade against the DAO's own rules, so the DAO stays open-ended
    // and its developers can't push through a change that breaks them (a rug). Spread over the shared case in
    // Applications.astro (id and title keep one source); the card itself is `cards.governance` below.
    governance: {
      summary: 'Upgrades and proposals checked against a DAO’s written rules: its constitution and mission.',
    },
    // The builder block. Reasons in this order: less liability first (the backlash over a bad resolution lands on whoever decided it), less
    // work second, user trust third. "Augur Lituus" in full in the ask, its object (a second mention in
    // the section, like the Insurance note: on phones the ask follows the reasons, so "it" would dangle).
    // "Win user trust." reverses an earlier "no trust" in this section (open question).
    builder: {
      title: ['Good for users.', 'Easier for projects.'],
      // The ask beside its "Talk to us" button (/contact/): two questions, the
      // first muted, the second in Paper (the house setup and payoff). No arrow: an internal link.
      ask: ['Want Augur Lituus in a platform you use?', 'Or one you’re building?'],
      reasons: [
        // "When outcomes get contentious, Augur's dispute process makes the call - not you." Not
        // "not you" (AGENTS.md: no "your call" for traders-first copy) or "makes the call" (an idiom). The project never picking a side is what keeps a bad call from
        // landing on it (disputes escalate in public, §2.1–2.2 p2); "in the open" echoes each case's
        // "Decided in the open". Every point keeps two lines from 1024 to 1440 (measured), so the three
        // columns end level; "Contested outcomes go to the dispute process…" took three from 1100 down.
        { title: 'Stay out of the middle.', line: 'Disputes settle in the open. The project never picks a side.' },
        // A fee per question (whitepaper §4.4.2 p7; fixed-price Query Tokens, §4.4.7 p9).
        { title: 'No team to hire.', line: 'Pay per question instead of running resolution in-house.' },
        // Trimmed to fit two lines at 1024: "independent", "check" for "verify … themselves".
        { title: 'Win user trust.', line: 'Users can check and challenge independent outcomes.' },
      ],
    },
    // The right box. Each case is a
    // product running on Augur Lituus as its users would see it, then one paragraph for the people who
    // build it: users see how many kinds of product it fits, builders what handing resolution over saves
    // them (no one on the team decides, a challenged result isn't theirs to defend, no claims to review).
    // Draft copy. Every card says "Example" and its values are illustrative. The three paragraphs keep
    // three lines from 1024 to 1440 (measured), so the stage keeps one height with nothing left
    // over. Insurance keeps the fallback use (awaiting the maintainers, launch checklist)
    // as its paragraph's second sentence, without "on its own chain or L2" so it stays three lines at
    // 1024. The DAO card keeps the point that changes within the constitution still go live.
    // "Decided in the open, not by …" goes: the paragraphs say who doesn't decide.
    cards: {
      answeredBy: 'Answered by Augur Lituus',
      cue: 'For builders',
      // What the query cards share, one source: Augur Lituus's name, How it works' statuses (example.ts: a
      // report is "open to challenge") and a note for each step. At Final the check says it's final,
      // and the note says why, so the answer keeps a line under it as the market's $1 does.
      query: {
        name: 'Augur Lituus',
        statuses: ['Asked', 'Reported', 'Final'],
        notes: ['Waiting for a report', 'Open to challenge', 'Not challenged'],
      },
      // The market card is a query split in two: the market's price beside Augur Lituus's answer. A price near 100 is the market's
      // consensus, not settlement, so the market pays only once the answer is Final. The statuses are How it
      // works' (example.ts: a report is "open to challenge"); this query isn't challenged, so it goes
      // Asked, Reported, Final, in the whitepaper's order (§4.5's example: the market creator pays the Query
      // Fee when making the market, people bet, a report comes 12 hours into the reporter pay's clock auction,
      // and a day with no appeal makes it final). The question, picked from ten, is information that
      // benefits everyone. The label is "Query"; prices and the answer are illustrative.
      prediction: {
        label: 'Query',
        title: 'Will this year be the hottest on record?',
        market: {
          name: 'Market',
          prices: [64, 71, 86, 99],
          paid: '$1',
          pending: 'Yes price',
          resolved: 'Paid per Yes share',
        },
        // The notes under the answer are `query.notes`: the two waiting steps, then at Final, beside the check,
        // why it's final.
        oracle: { answer: 'Yes' },
        builders:
          'Markets settle once the answer is final, and no one on the team has to decide who won. A challenged result is settled in the open, so it isn’t the team’s to defend.',
      },
      // The insurance card is a relay: one line through three stops, the flight, Augur Lituus and the cover, under the query's
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
        builders:
          'Payouts run once the delay is confirmed, with no claims to review. An insurance app could also use a faster oracle and turn to Augur Lituus only when a claim is disputed.',
      },
      // The DAO card is a switch. The DAO's
      // part is one row: the treasury upgrade's go-live switch, which the vote turns on and the block turns off.
      // Augur Lituus's part is the larger: both answers, so it reads as a yes/no, the report on Yes, the day it's open to
      // challenge, then Final. Real DAOs queue a passed vote behind a timelock, often two days, before it runs;
      // here Augur Lituus's Yes holds it there, so the vote alone doesn't decide (a change that breaks
      // the DAO's rules can't be pushed through). The question is 402 px at 22 px, under the market's 426:
      // between about 1030 and 1095 px it keeps one line while the other two wrap, so the card is 28 px shorter
      // there. Values are illustrative.
      governance: {
        label: 'Query',
        title: 'Does this upgrade break a DAO rule?',
        upgrade: {
          name: 'Treasury upgrade',
          states: ['Voting', 'Passed'],
          notes: ['Open to members', 'Goes live in 2 days'],
        },
        oracle: { answer: 'Yes', other: 'No' },
        outcome: { status: 'Blocked', note: 'It won’t go live' },
        builders:
          'Every upgrade is checked against the DAO’s own rules by a process the core team doesn’t control. Changes within the constitution can still go live.',
      },
    },
  },
  howItWorks: {
    // The detail goes behind a click. The heading (with its "paid" mark), this one-line
    // lead and the four step names (example.ts, one source) stay in the scroll; the toggle opens
    // the full walkthrough in place, as do a step and the hero's "See how it works".
    // The lead says how you take part and what it risks: the stake is
    // the report's bond (§2 p2, §4.1 p5). The payout figures
    // (the reward, 80% of a wrong bond) stay in the example, where the numbers have context.
    // One line from 1200 up; where it wraps it balances, and the no-break space keeps "A" with
    // "wrong", so it breaks between the sentences (it left "your bond." alone at 1024, "A" at 390).
    lead: 'Stake REP on what you saw. A wrong call costs your bond.',
    // The toggle's two labels (aria-expanded carries the state; the words say what a press does).
    open: 'Walk through an example',
    close: 'Hide the example',
    // The strip's list name for screen readers; each step is a button that opens the example there.
    steps: 'Steps in the example',
    // The closed section tells the rule in four cards, one scene each, in the Why Augur cards' family, and one question's real numbers wait behind "Walk
    // through an example" (`open` and `close` above). The whole process from asking to getting a final answer and the middle stuff
    // stays on the scroll: the four steps, the waits in the scenes and the bodies. The consumer
    // case, so the moves speak to "you" and every gain keeps its condition beside the risk. Plain words, so
    // "bond", "appeal period" and "Reporter Pay" appear nowhere, the example included. Draft copy.
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
      // Each step: a tab with its number and
      // name, and a stage with its scene (scenes.ts), the claim in two lines (setup in
      // Pewter, payoff in Paper) and one body line, which carries the wait that follows. Nothing sits under the scene: a figure row, a caption or a legend there each took the eye from the claim. Challenge says "double theirs": "stake double" didn't say of what. `scene`
      // names the step's drawing.
      // `note` is the tab's line under its name:
      // read with the name it says what the step is in REP terms, so the row of tabs tells the whole process before
      // any is picked. It never repeats the claim (the line the tabs had before did, and went as noise). Facts: a
      // fee per question in REP (§4.4.2 p7), a report stakes on an outcome (§4.1 p5), a challenge stakes on another
      // (§4.0.2 p4), rewards go to the outcome that becomes final (§4.3.1 p6). Short enough for one line from 1024.
      stops: [
        {
          title: 'Ask',
          note: 'Pay a fee in REP',
          scene: 'ask',
          claim: ['Anyone can ask.', 'A fee funds the reward.'],
          body: 'The reward grows until someone reports what happened.',
        },
        {
          title: 'Report',
          note: 'Stake on an answer',
          scene: 'report',
          claim: ['Report what you saw.', 'Stake REP on it.'],
          body: 'No challenge in time? Your stake comes back with the reward.',
        },
        {
          title: 'Challenge',
          note: 'Back another answer',
          scene: 'challenge',
          claim: ['Think it’s wrong?', 'Stake double theirs.'],
          body: 'The time to challenge starts again on your answer.',
        },
        {
          title: 'Get paid',
          note: 'If your answer holds',
          scene: 'paid',
          claim: ['No new stake in time?', 'The answer is final.'],
          body: 'Whoever backed it wins most of the losing stake.',
        },
      ],
      // The example as a story:
      // example.ts's question and amounts in four plain sentences, one per step above, each under that step's
      // name, with "you" as the challenger who turns out right, so it ends on your payout (peak–end). No jargon:
      // the scroll never says bond, appeal period or Reporter Pay, so the story doesn't either. HowItWorks.astro
      // fills each {name} from example.ts. Emphasis is marked, never automatic: **…** is bold, Sora 600 in Paper, and {+name} is your win, bold in Green. Bold carries
      // the story on its own: the fee, each side's answer and stake, said the same way in Report and Challenge,
      // and the final answer; your own stake coming back stays plain, since it isn't a gain. The reward's amount
      // for an overturned report isn't in §4.4.3, so it has no figure; it goes to the first to back the final
      // answer, you here. The reporter's 15 REP splits into your 12 and 3 burned. `label` names the card for
      // screen readers.
      // The fee isn't the reward: it splits into Reporter Pay, a clock auction from 0, and a
      // burned rest the protocol keeps as large as it can (§4.4.2–4.4.4; §4.5 pays 2.5 of 15 REP and burns
      // 12.5), so Ask says part of it pays. Reporter Pay goes to the first to stake on the final answer (§4.3.1),
      // hence "backs", which covers your challenge. Get paid lists each gain on its own, both Green, so 12 REP
      // never reads as the total.
      // Facts behind the wording: a question comes with rules for judging it (example.ts's fields); the fee
      // isn't fixed, so 15 REP is "in this example" (the whitepaper's §4.5 figure; who sets its size isn't
      // claimed); anyone can report (§2, rep.ts), so the reporter never reads as the team; a report stakes the
      // fee (§2, §4.1); a challenge restarts the time to challenge, now on the new answer (§4.0.2). Get paid
      // names the final answer, then your payoff, then the burned rest.
      example: {
        label: 'An example, step by step',
        story: [
          'Say someone asks, “{question}” They set the rules for judging it and pay a fee in REP. Part of it pays whoever first backs the right answer; the rest is burned. In this example, the fee is **{fee}**.',
          'Anyone can report. Here, someone reports **{reported}** and stakes **{bond}** on it, the same as the fee.',
          'You think the reporter is wrong, so you challenge with **{challenged}** and stake **{challenge}** on it, double theirs. The time to challenge starts again, and now anyone can challenge you.',
          'No one challenges you in time, so the final answer is **{final}**. You get your {challenge} back, plus {+share} from the reporter’s stake, plus {+the reward}. The other {burned} of their stake is burned.',
        ],
      },
    },
  },
  holder: {
    // What REP is for, and that holding it isn't passive. Each point keeps a
    // condition (house rules: no guarantees; REP is optional, never a duty to report or challenge):
    // - Staking is how you report or challenge (the bond, §4.1 p5; the only staking in the paper), and
    //   rewards go only to an answer that holds (§4.3.1 p6; rep.ts). "Put it to work"; "if you
    //   want" carries "Optional.".
    // - The fork window is the whitepaper's proposed design (§2.2 p2 "a two week, one-way migration
    //   window"; Lituus-CS forking isn't built, docs/sources.md), hence "is designed to". Unmoved REP
    //   loses its value (§4.2.2 p5): "risk losing the token" is reworded, since nothing takes it.
    //   "Check in at least once a month" is not used: the paper sets no cadence, and a monthly
    //   check could miss a two-week window.
    // Labels, not squares: each point is a tile led by its `label`, and `earn` gives Earn's the
    // Green outline. Earn is incisive (REP earns REP, like work that pays, "paid in REP", never money, price or
    // yield) and stays conditional and optional; the fork point is calm: a last resort (rep.ts), then what to
    // do, then the one fact, plainly (moving doesn't promise value, so it says only what unmoved REP loses).
    // Smaller, then one full-width Navy card with the points as spec
    // rows: each `label` is the row's
    // term. Earn echoes the heading ("Know what happened?"); "when you know" keeps taking part a choice. The fork
    // row is about not being fully passive, never a duty or a threat: holding
    // is mostly hands-off, and a fork opens a window to move (the two-week window is a proposed design, so it
    // stays unnamed; what unmoved REP loses is on the REP page). `link` names the REP page by what it gives you
    // ("Learn more" says nothing), an outline button in the card.
    title: 'Holding REP?',
    link: 'How REP works',
    points: [
      {
        label: 'Earn REP',
        text: 'Report or challenge when you know what happened, and get paid in REP when your answer holds.',
        earn: true,
      },
      {
        label: 'Stay in the loop',
        text: 'Holding is mostly hands-off. If a fork ever starts, there’s a window to move your REP to the answer you believe in.',
      },
    ],
  },
  learnMore: {
    // No "From the blog" column; the FAQ stays, with a plain link to the blog. The heading
    // is "Learn more about Augur." (two lines in LearnMore.astro), and the section gets the
    // shared heading row like every other one: this lead is the published /faq/ lead (faq.astro), so it
    // says what the list holds. One line from 1024 up.
    lead: 'Short answers, each with a link to go deeper.',
    // A text link beside the outline "View all questions" (DESIGN.md: the outline button ends a list
    // that continues on its own page; the blog is a second, lighter way on). PRODUCT.md: the homepage
    // points to writing and FAQs.
    blog: { label: 'Read the blog', href: '/blog/' },
    // Send people on to the FAQ, the blog and the community: three doors are the section. The lead names the doors in order
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
