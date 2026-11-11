/** Approved copy: Homepage 28:7; state geometry and copy: 139:258.
 * Polish pass (5 Oct 2026): a Phosphor Bold icon per application and a
 * one-line explanation for every state. Examples stay illustrative.
 * Insurance carries the fallback use (owner, 6 Oct 2026): one app's choice, so it
 * never reads as Augur Lituus's only use. Proposed; awaits the maintainers.
 * Each use case is one question, the answer Augur Lituus gives and what the case's
 * app does with it (owner, 18 Oct 2026: one case at a time; the mechanism stays in
 * How it works). Prediction markets leads. The owner approved the question, both
 * explanations and the fallback wording on 19 Oct 2026 (handoff doc, 05 copy proposals).
 * DAOs & governance replaced DAOs & grants the same day (owner): every earlier case ended in a
 * payment, and the lead promises any app that needs to know what happened.
 * Owner, 19 Oct 2026, later: every question is Yes or No (no Invalid shown); the stage shows both
 * answers and the picked one lights up. Each case has a `summary` of the kind of app it stands for
 * (owner asked for SEDA- and UMA-style explanations, not copied; new copy, awaiting approval) and a
 * `graphic` of what the app does with the answer (CaseGraphic.astro).
 * Owner, 19 Oct 2026 (Augus's notes, leaning on the project's case): each case says who did not
 * decide its answer, `notBy` the party that would otherwise settle it (draft copy). */
export const applications = [
  { id: 'prediction', icon: 'chart-line-up', graphic: 'market', title: 'Prediction markets', summary: 'Markets on any question with a result people can check: sports, elections, launches, weather or company news.', question: 'Did the rocket reach orbit on its first try?', answer: 'Yes', outcomes: ['Yes', 'No'], notBy: 'the market’s own team', action: 'Settle a market.', explanation: 'Pay out the Yes side and close the No side.' },
  { id: 'insurance', icon: 'umbrella', graphic: 'flight', title: 'Insurance & payments', summary: 'Coverage and payments that trigger when something measurable happens: a delayed flight, a missed delivery, a storm or a canceled event.', question: 'Was flight AB123 more than two hours late?', answer: 'Yes', outcomes: ['Yes', 'No'], notBy: 'the insurer paying out', action: 'Pay insurance claims.', explanation: 'Pay every policyholder on that flight automatically.', fallback: 'An insurance app could also use a faster oracle on its own chain or L2, and turn to Augur Lituus only when a claim is disputed.' },
  { id: 'governance', icon: 'users-three', graphic: 'gate', title: 'DAOs & governance', summary: 'Proposals and grants that wait on real-world facts: an audit result or a milestone met.', question: 'Did the upgrade pass its safety review?', answer: 'No', outcomes: ['Yes', 'No'], notBy: 'the team behind the upgrade', action: 'Hold the upgrade.', explanation: 'The proposal goes live once a later review passes.' },
] as const;
