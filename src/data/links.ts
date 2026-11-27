/** Ethereum Uniswap v4 pool ID, verified against the PositionManager's pool key on 27 November 2026. */
export const repUsdcPoolId = '0xc7f36420837b77375d71714e9a00071445fa7fa1634ee571e85326c31e9f5144';

/** Destinations cited across the site. Reachability was checked with HTTP GET on 2026-10-05.
 * verified means reachable, not a claim of protocol readiness or inbox ownership.
 * Keep all external hrefs here; callers may add encoded query parameters. The blog posts were on the old
 * augur.net and are now pages of this site at the same paths (docs/reference/ported-content.md), so their
 * urls are local: render them with `isExternal` deciding the ↗, never a hard-coded one.
 */
export interface ExternalLink { url: string; verified: boolean; source: string }
export const links = {
  whitepaper: { url: "https://github.com/AugurProject/whitepaper/blob/master/Lituus/English/Augur_Lituus_Whitepaper.pdf", verified: true, source: "Owner brief \u00a71; January 2026 Augur Lituus whitepaper." },
  lituusCode: { url: "https://github.com/AugurProject/Lituus-CS", verified: true, source: "Q2 2026 report, implementation source." },
  zoltarCode: { url: "https://github.com/AugurProject/zoltar", verified: true, source: "Owner brief \u00a711; public Zoltar and Augur Statoblast repository." },
  github: { url: "https://github.com/AugurProject/", verified: true, source: "Official Augur archive footer." },
  archive: { url: "/blog/", verified: true, source: "Official Augur blog; 16 posts observed on 5 October 2026. Ported to this site at its old path (src/content/blog)." },
  testingPastFuture: { url: "/blog/augur-testing-past-building-future/", verified: true, source: "Augur blog, 21 July 2026. Ported page (src/content/blog)." },
  discord: { url: "https://discord.gg/Y3tCZsSmz3", verified: true, source: "Owner brief \u00a711 and official Augur footer; HTTP redirects to discord.com/invite/Y3tCZsSmz3. Reachability does not prove invitation membership." },
  telegram: { url: "https://t.me/augurlituus", verified: true, source: "Owner brief \u00a711 and official Augur footer." },
  x: { url: "https://x.com/AugurProject", verified: true, source: "Owner brief \u00a711 and official Augur footer." },
  foundation: { url: "https://lituus.foundation/", verified: true, source: "Official Augur footer." },
  moonFork: { url: "/blog/post-fork-announcements/", verified: true, source: "Official Augur blog, The Augur Moon Fork Is Complete, 5 August 2026. Ported page (src/content/blog)." },
  repToken: { url: "https://etherscan.io/token/0xCf6A0A7826fa124B7705d6f3c675eAD76f1e540D", verified: true, source: "Etherscan token page for REPv2_Yes_1 (Reputation, 18 decimals, source verified), the address in the Lituus Foundation's REP contract reference on augur.net/rep (updated 13 August 2026) and its FAQ; read 19 October 2026." },
  cmcAugur: { url: "https://coinmarketcap.com/currencies/augur/", verified: true, source: "CoinMarketCap record 1104 and its spot markets, checked 27 November 2026." },
  coinGeckoAugur: { url: "https://www.coingecko.com/en/coins/augur", verified: true, source: "CoinGecko's listing for the current token, checked 27 November 2026." },
  coinGeckoAugurOld: { url: "https://www.coingecko.com/en/coins/augur-old", verified: true, source: "CoinGecko's separate legacy listing, checked 27 November 2026." },
  krakenAugurUsd: { url: "https://pro.kraken.com/app/trade/augur-usd", verified: true, source: "Kraken Pro spot market. Kraken's AssetPairs API reported AUGUR/USD online on 27 November 2026." },
  krakenAugurTicker: { url: "https://api.kraken.com/0/public/Ticker?pair=AUGURUSD", verified: true, source: "Kraken's public ticker for AUGUR/USD, checked 27 November 2026." },
  uniswapRepUsdc: { url: `https://app.uniswap.org/explore/pools/ethereum/${repUsdcPoolId}`, verified: true, source: "Uniswap v4 pool on Ethereum. Tokens and 0.99% fee verified on-chain on 27 November 2026." },
  repUsdcPoolStats: { url: `https://api.geckoterminal.com/api/v2/networks/eth/pools/${repUsdcPoolId}`, verified: true, source: "GeckoTerminal's volume for this pool ID, checked 27 November 2026." },
  q2Report: { url: "/blog/q2-2026-progress-report/", verified: true, source: "Official Augur blog, Q2 2026: The Fork and What Comes Next, 1 October 2026. Ported page (src/content/blog)." },
  reboot: { url: "/blog/augur-reboot-2025/", verified: true, source: "Official Augur blog, Augur Reboot 2025 Roadmap, 1 April 2025. Ported page (src/content/blog)." },
  generalized: { url: "/blog/generalized-augur/", verified: true, source: "Official Augur blog, Generalized Augur, 13 May 2025. Ported page (src/content/blog)." },
  darkFlorist: { url: "https://github.com/darkflorist", verified: true, source: "Official Augur archive footer links GitHub organization darkflorist." },
  chainSafe: { url: "https://chainsafe.io/", verified: true, source: "Official ChainSafe homepage; involvement sourced from Q2 report." },
  whitepaperV2Pdf: { url: "https://github.com/AugurProject/whitepaper/releases/download/v2.0.16/augur-whitepaper-v2.pdf", verified: true, source: "Augur v2 whitepaper PDF, release v2.0.16, as linked from the old augur.net /whitepapers/ (ba18725); HTTP 200 on 2026-10-30." },
  whitepaperSource: { url: "https://github.com/AugurProject/whitepaper", verified: true, source: "AugurProject/whitepaper repository, source of the Augur v2 web edition; HTTP 200 on 2026-10-30." },
  lituusPaperSource: { url: "https://github.com/AugurProject/whitepaper/tree/master/Lituus/English", verified: true, source: "Augur Lituus whitepaper source folder, as linked from the old augur.net /whitepapers/ (ba18725); HTTP 200 on 2026-10-30." },
  zoltarPaper: { url: "https://github.com/AugurProject/zoltar/blob/main/docs/explanation/zoltar.html", verified: true, source: "Current Zoltar system overview; successor to older local whitepaper. Exact paper destination requires maintainer confirmation." },
  xShare: { url: "https://x.com/intent/tweet", verified: true, source: "X share intent endpoint; HTTP 200." },
  soraFont: { url: "https://fonts.google.com/specimen/Sora", verified: true, source: "Google Fonts specimen for Sora, the Brand Foundation primary typeface; HTTP 200 on 2026-10-13." },
  schibstedFont: { url: "https://fonts.google.com/specimen/Schibsted+Grotesk", verified: true, source: "Google Fonts specimen for Schibsted Grotesk, the Brand Foundation secondary typeface; HTTP 200 on 2026-10-13." },
  contact: { url: "mailto:contact@augur.net", verified: false, source: "Owner brief and Figma footer. Domain owner must confirm this inbox." },
} as const satisfies Record<string, ExternalLink>;

export type LinkKey = keyof typeof links;

/** Off-site (http, https, mailto…) rather than a path on this site: decides whether a link shows ↗. */
export const isExternal = (href: string) => /^[a-z][a-z\d+.-]*:/i.test(href);
