# Augur Lituus

> Real-world answers for onchain apps, controlled by no one.

Augur Lituus is the next generation of Augur's oracle. Anyone can answer, anyone can challenge, and every challenge doubles the cost of a lie.

- [See how it works](#how-it-works)
- [Read the whitepaper ↗](https://github.com/AugurProject/whitepaper/blob/master/Lituus/English/Augur_Lituus_Whitepaper.pdf)

## Why Augur

Smart contracts can't see the world. Whoever controls the oracle decides who gets paid. With Augur, no one controls the oracle.

- **Permissionless.** Anyone can ask. Anyone can answer. Projects plug in on their own. No approvals, no gatekeepers.
- **Trustless.** No governance. No one has a veto. No multisigs. Not even Augur's creators can override an answer.
- **Robust.** Hard to corrupt. Lies get expensive fast. Designed to cost attackers more than almost any other oracle.

The answer is nobody's call.

- **For traders:** seen a market settle the wrong way? Trade where anyone can challenge it.
- **For builders:** a wrong answer can cost a platform its users. Leave resolution to Augur Lituus.

Review flags: "Not even Augur's creators can override an answer" and "Designed to cost attackers more than almost any other oracle" are claims that still need a source.

## What can Augur Lituus power?

Any protocol or app that needs to know what happened in the world.

### Prediction markets

Markets on any question with a result people can check: sports, elections, launches, weather or company news.

Example: the question "Will this year be the hottest on record?" is asked. A report comes in, the answer is open to challenge, and when it isn't challenged it is final: Yes. The market's Yes price climbs from 64¢ toward 99¢ and each Yes share pays $1.

For builders: markets settle once the answer is final, and no one on the team has to decide who won. A challenged result is settled in the open, so it isn't the team's to defend.

### Insurance & payments

Coverage and payments that trigger when something measurable happens: a delayed flight, a missed delivery, a storm or a canceled event.

Example: "Will flight AB123 land over 2 hours late?" The flight is due at 14:05 and lands 2 h 45 min late. Augur Lituus's final answer is Yes, so the delay cover pays every policyholder.

For builders: payouts run once the delay is confirmed, with no claims to review. An insurance app could also use a faster oracle and turn to Augur Lituus only when a claim is disputed.

### DAOs & governance

Upgrades and proposals checked against a DAO's written rules: its constitution and mission.

Example: "Does this upgrade break a DAO rule?" A vote on a treasury upgrade passes with 71% for and 29% against, and would go live in 2 days. If the final answer is Yes, the upgrade breaks a rule and it won't go live.

For builders: every upgrade is checked against the DAO's own rules by a process the core team doesn't control. Changes within the constitution can still go live.

Review flag: the example values in these three cards (64¢→99¢, flight AB123, 71%, "Goes live in 2 days") are illustrative and still need a source.

### Good for users. Easier for projects.

- **Stay out of the middle.** Disputes settle in the open. The project never picks a side.
- **No team to hire.** Pay per question instead of running resolution in-house.
- **Win user trust.** Users can check and challenge independent outcomes.

Review flag: "Win user trust" still needs a source.

Want Augur Lituus in a platform you use? Or one you're building? [Talk to us](/contact.md).

## How it works

Know what happened? Get paid to report it.

Every Augur Lituus answer has REP staked behind it. Be right and you're paid. Be wrong and you lose your stake.

1. **Ask.** Pay a fee in REP. Anyone can ask. A fee funds the reward. The reward grows until someone reports what happened. In the example: a 15 REP fee.
2. **Report.** Stake on an answer. Report what you saw. Stake REP on it. No challenge in time? Your stake comes back with the reward. In the example: 15 REP on YES.
3. **Challenge.** Back another answer. Think it's wrong? Stake double theirs. The time to challenge starts again on your answer. In the example: 30 REP on NO.
4. **Get paid.** If your answer holds. No new stake in time? The answer is final. Whoever backed it wins most of the losing stake. In the example, you win +12 REP.

### An example, step by step

The question: "Has room-temperature superconductivity been independently demonstrated at ambient pressure?" Information cutoff: 8 Sep 2027, 00:00 UTC.

1. **The question is asked.** 15 REP fee. The reward, Reporter Pay, starts at 0 REP and rises toward the fee.
2. **Someone reports YES.** 15 REP. The first stake, called a bond, always equals the fee.
3. **You challenge with NO.** 30 REP. Double their stake. The time to challenge (the appeal period) starts again.
4. **NO is final.** The time to challenge ends with no new stake.

Paid out:

- You: +12 REP. Most of their stake, on top of your 30 REP back and the reward.
- The reporter: −15 REP. Lost their whole stake.
- Burned: 3 REP. The rest of their stake.

Figures follow the whitepaper's own example, a 15 REP fee. These are the proposed rules: Augur Lituus is in development.

### Holding REP?

[Learn about REP](/rep.md). Put it to work, if you want. Stake it to report or challenge, and earn when your answer holds.

Watch for forks. If one starts, Augur Lituus is designed to give you two weeks to move your REP. REP left behind loses its value.

## Roadmap

The road to Augur Lituus. The research is published and the build is underway.

- 2025: Augur reboots (completed)
- January 2026: Whitepaper (completed)
- August 2026: Moon Fork (completed)
- Now: Implementation (in progress)
- 2027: Testing & audits (up next)
- 2027: Launch (then)

### Augur starts again (completed, 2025)

The Lituus Foundation restarted Augur in March 2025. In May it proposed Generalized Augur: a universal, permissionless oracle for any application. [Read the mission](/about.md).

From the blog:

- [Augur Reboot 2025 Roadmap ↗](https://www.augur.net/blog/augur-reboot-2025/), 1 April 2025
- [Generalized Augur ↗](https://www.augur.net/blog/generalized-augur/), 13 May 2025

### The design, published (completed, 29 January 2026)

The Augur Lituus whitepaper sets out how the oracle works, with a comparative analysis of oracle security. [Read the whitepaper ↗](https://github.com/AugurProject/whitepaper/blob/master/Lituus/English/Augur_Lituus_Whitepaper.pdf)

The paper: Augur Lituus Whitepaper, PDF, January 2026, AugurProject/whitepaper on GitHub.

### A fork, run live (completed, Augur v2, 3 August 2026)

Augur v2's fork mechanism completed its first live run on Ethereum mainnet. REP holders migrated to the universe they backed, and Yes won. [Read the fork report ↗](https://www.augur.net/blog/post-fork-announcements/)

REP migrated, by universe: Yes universe 6,398,081 REP; No universe 1,786 REP. That is 6.4 million REP in total, about 58.2% of the original 11 million supply. Source: fork report, 5 August 2026.

### Building Augur Lituus (in progress, first milestones completed in July 2026)

ChainSafe is engineering Augur Lituus, and the Foundation reviews the work against the whitepaper. The current focus is dispute resolution and forking. [Follow the build ↗](https://github.com/AugurProject/Lituus-CS) · [Q2 2026 report ↗](https://www.augur.net/blog/q2-2026-progress-report/)

Automated tests in the implementation: about 40 at the start of the quarter, 300+ at the end, across 22 merged pull requests. Source: Q2 2026 report, 1 October 2026.

### Tested and audited (up next, 2027)

Before applications can depend on Augur Lituus, the implementation has to be tested, audited and explained in plain language. [Read the Q2 2026 report ↗](https://www.augur.net/blog/q2-2026-progress-report/)

Goals for the coming quarter:

- Continue implementation and testing
- Publish a plain-language walkthrough of Augur Lituus

### Ready for applications (then, 2027)

Augur Lituus is designed for the prediction markets, protocols and apps that call on it when a real-world outcome is disputed. [Talk to us](/contact.md)

> A whitepaper does not resolve markets by itself; the design has to be implemented, tested, audited, documented, and made usable.
>
> From "Augur Is Testing Its Past and Building Its Future", 21 July 2026.

## Keep going

Answers, updates and the people around Augur.

- [FAQ](/faq.md): plain answers on markets, REP and how questions get settled.
- [Blog ↗](https://www.augur.net/blog/): progress reports, research and design notes from the team.
- [Community ↗](https://discord.gg/Y3tCZsSmz3): ask questions, share ideas and follow the build on Discord.
