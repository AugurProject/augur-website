# REP

REP (Reputation) is Augur's token. Every Augur Lituus answer has REP staked behind it: back a wrong one and you lose your bond, mostly to whoever was right. Holding REP never requires you to take part.

Review flag: this page is draft copy (19 October 2026) and still needs review.

## Which REP do I hold?

The current token is REPv2_Yes_1 (name: Reputation, listed as AUGUR on some exchanges).

- Chain: Ethereum mainnet (chain ID 1)
- Decimals: 18
- Contract address: 0xCf6A0A7826fa124B7705d6f3c675eAD76f1e540D
- [View on Etherscan ↗](https://etherscan.io/token/0xCf6A0A7826fa124B7705d6f3c675eAD76f1e540D)

Augur Lituus is being built around this token. Address checked on Etherscan, 19 October 2026.

Since the Moon Fork there's more than one REP, and only one is current. Check the contract address, not the name or ticker.

- **REPv1 (legacy).** The original REP, from Augur's first version. It isn't used by Augur v2 or Augur Lituus.
- **REPv2 (legacy).** Augur v2's REP, in the universe that forked in 2026. If you didn't move it during the Moon Fork, it stays there. The window closed on 3 August 2026 and can't be reopened. At the Moon Fork, on 3 August 2026, REPv2 split into one REP per answer.
- **REPv2_Yes_1 (current).** The REP of the Moon Fork's winning universe. Augur development continues on it, and Augur Lituus is being built around it. Some exchanges list it as AUGUR. Contract 0xCf6A…540D.
- **REPv2_No_1 (other universe).** The REP of the Moon Fork's No universe, separate from Yes. Augur development continues on REPv2_Yes_1, not here.

### Migration is closed

The Moon Fork's window closed on 3 August 2026 and can't be reopened, so anyone offering to migrate, recover or unlock REP is running a scam. Augur and the Lituus Foundation won't DM you first, and no legitimate process asks for your seed phrase or private keys.

## Lying gets more expensive every round

Anyone can report what happened, and anyone who disagrees can challenge. Every challenge doubles the bond, so keeping a false answer standing costs more each round, until every REP holder decides.

- **Report:** 15 REP on YES. Someone stakes a bond equal to the question's fee on what happened.
- **Challenges:** 30 REP on NO, then 60 REP on YES, 120 REP on NO, 240 REP on YES, and so on. Anyone who disagrees stakes double on a different outcome. Each challenge doubles the bond again and restarts the appeal period.
- **Fork:** if the next bond would pass the fork threshold (a set share of all REP), the question goes to every REP holder.

When an appeal period ends with no new challenge, the latest answer is final. Whoever backed it gets their bond back plus 80% of the losing bonds; the other 20% is burned.

## Taking part is optional

Holding REP asks nothing of you day to day. Rewards go only to people who report or challenge, and only when their answer holds.

- **Hold.** You stake nothing. You get no rewards: holding alone earns none. You risk something only in a fork: move your REP to a new universe, or it loses its value.
- **Report** (say what happened). You stake 15 REP, a bond equal to the question's fee. You get +2.5 REP and your bond back, if no one challenges. You risk your whole 15 REP bond, if the answer is overturned.
- **Challenge** (correct a wrong answer). You stake 30 REP, double the bond, on a different outcome. You get +12 REP, which is 80% of the bond you overturned, and your bond back, if your answer holds. You risk your whole 30 REP bond, if your answer is overturned.

Figures follow the whitepaper's own example, a 15 REP fee. The reward rises from 0 REP until someone reports, up to the whole fee. These are the proposed rules: Augur Lituus is in development. [Augur Lituus whitepaper ↗](https://github.com/AugurProject/whitepaper/blob/master/Lituus/English/Augur_Lituus_Whitepaper.pdf) · [See how taking part works](/index.md#how-it-works)

## If a fork happens

A fork is the last resort, and the one time holding REP asks something of you: move your REP to the universe you believe reflects reality, or it loses its value.

1. **A bond reaches the fork threshold.** Challenges have doubled the bond until the next one would pass a set share of all REP.
2. **The universe splits.** One new universe is created for each possible answer, each with its own REP. Other open questions start reporting again there.
3. **You move your REP.** Move it to the universe you believe reflects reality. Moving is one-way, and the whitepaper proposes a two-week window. REP you don't move loses its value.
4. **The most-backed universe wins.** The universe that receives the most REP settles the answer, and the original contracts follow it.

### The Moon Fork

Augur v2's fork mechanism had its first live run over whether Artemis II had lifted off. It had: REP holders migrated to the universe they backed, and Yes won. Challenges ran from about 8 April for about 8 weeks, and the migration window ran from early June to 3 August, 60 days. Augur v2's rules differ from the proposed Augur Lituus rules: its window was 60 days. [Read the Moon Fork report](/blog/post-fork-announcements/)

## Questions about REP

- **What is $REP's role in Augur?** $REP derives its value from securing Augur's oracle. Every question submitted to Augur Lituus will pay a fee in $REP: part goes to the reporter whose outcome stands, and the rest is burned. The oracle's usage pays for its own security. In exchange, holders carry the oracle's security. Their staked $REP stands behind every outcome and is forfeited if they back a false one. Holders are paid to protect the truth, and the value of their token rests on the oracle being trusted.
- **Does holding $REP earn rewards?** Not passively. Holding $REP pays no yield, dividend or share of fees. Once Augur Lituus is live, a holder will earn by taking part in protecting the oracle, in one of two ways. Reporting: a holder stakes $REP on the outcome of a question, and if that outcome stands, the stake is returned with a reward paid from the question's fee. Challenging: a holder stakes $REP against an outcome they believe is false, and if the challenge prevails, the stake is returned with a share of the stakes lost by those who backed the false outcome. Both are optional, and a stake placed on an outcome that does not stand is forfeited.

See [all questions](/faq.md), or [ask on Discord ↗](https://discord.gg/Y3tCZsSmz3).
