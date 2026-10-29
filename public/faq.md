# Frequently asked questions

Short answers, each with a link to go deeper. Answers marked "Review flag" still need review.

## Getting started

### Is Augur still a prediction market?

Augur launched on Ethereum in 2018 as a decentralized prediction market protocol, with REP holders settling disputed outcomes. Augur v2 still runs today, and in August 2026 its fork mechanism completed its first live run. Augur Lituus, the next generation of Augur's oracle, is designed to resolve questions for other prediction markets and applications, not only Augur's own. [Moon Fork report ↗](https://www.augur.net/blog/post-fork-announcements/)

### What is Augur Lituus?

Augur Lituus is the next generation of Augur's oracle. Anyone can answer, anyone can challenge, and lying is designed to cost more than it pays. [Explore Augur Lituus](/products.md)

Review flag: this answer still needs review.

### Where can I trade on Augur?

Augur v2 still runs today. Augur Statoblast is a prediction-market layer on Zoltar, and Statoblast Trading is its trading interface. These products are in development. [See product status](/products.md)

Review flag: this answer still needs review.

## How it works

### Who decides whether an outcome is true?

No committee, multisig or veto picks the answer. Anyone can report an answer or challenge one. Every report is backed by a bond. A fork is the last resort. [How Augur answers a question](/learn/how-augur-answers-a-question.md)

Review flag: this answer still needs review.

### What if people disagree about the result?

Anyone can back a different outcome with double the REP bond. A completed challenge opens another appeal period. When an appeal period ends without a new challenge, the latest outcome becomes final. Guide: Disputes, bonds and forks (a placeholder guide on the HTML site, with no Markdown copy yet).

Review flag: this answer still needs review.

### What if the question cannot be answered?

It resolves as Invalid. In the January 2026 design, Invalid covers malformed or unresolvable questions. A query also resolves as Invalid if no report arrives within its three-day reporting window. [Read the whitepaper ↗](https://github.com/AugurProject/whitepaper/blob/master/Lituus/English/Augur_Lituus_Whitepaper.pdf)

Review flag: this answer still needs review.

## REP

### What role does REP play?

REP secures Augur's oracle. Participants back answers and challenges with REP bonds, and if a dispute reaches a fork, holders migrate their REP to the universe they believe reflects reality. Augur Lituus is being built around REPv2_Yes_1, the REP that migrated to the winning universe in the Moon Fork. [More about REP](/rep.md)

### What can I do with REP?

Reporting and challenging are optional. Each one puts a bond at stake: being right pays, being wrong costs. If a dispute reaches a fork, holders need to move their REP to a universe they believe reflects reality; REP that isn't moved loses its value. [More about REP](/rep.md)

Review flag: this answer still needs review.

### Do I earn anything just for holding REP?

No. Rewards go to people who report or challenge, and only when their answer holds. Holding asks nothing of you, except in a fork: then you need to move your REP to a new universe, or it loses its value. [Compare holding and taking part](/rep.md)

Review flag: this answer still needs review.

### Is AUGUR the same token as REPv2_Yes_1?

Yes. REPv2_Yes_1 is the token's symbol on Ethereum and Reputation its on-chain name. Some exchanges list the same token as AUGUR. The contract address is what identifies it. [See the contract](/rep.md)

Review flag: this answer still needs review.

### Why doesn't my wallet show my REP?

Many wallets don't detect REPv2_Yes_1 on their own yet. You can add it as a custom token with its contract address, 0xCf6A0A7826fa124B7705d6f3c675eAD76f1e540D, and check your balance on Etherscan. [REPv2_Yes_1 on Etherscan ↗](https://etherscan.io/token/0xCf6A0A7826fa124B7705d6f3c675eAD76f1e540D)

Review flag: this answer still needs review.

### I didn't move my REP in the Moon Fork. Can I still?

No. The fork contract enforced the deadline of 3 August 2026, so the window can't be reopened or extended, and no one can migrate for you. Anyone who offers to is running a scam. [Moon Fork report ↗](https://www.augur.net/blog/post-fork-announcements/)

Review flag: this answer still needs review.

### Why would REP holders choose the honest fork?

Because the design ties REP's value to demand for truthful answers. If applications and users keep choosing an honest oracle, REP on a dishonest fork loses that demand. This is an assumption of the design, not a guarantee. [Read the whitepaper ↗](https://github.com/AugurProject/whitepaper/blob/master/Lituus/English/Augur_Lituus_Whitepaper.pdf)

Review flag: this answer still needs review.

## Building with Augur

### Can I build with Augur today?

Not yet. ChainSafe is implementing Augur Lituus in the public Lituus-CS repository, and it still needs testing, audits and documentation before applications can depend on it. [Follow the build ↗](https://github.com/AugurProject/Lituus-CS)

### How do I talk to the team about a project?

Share your project, the answers it depends on, and your questions. Compare notes with builders, ask technical questions and follow the discussion on Discord. [Talk to us](/contact.md)

Review flag: this answer still needs review.
