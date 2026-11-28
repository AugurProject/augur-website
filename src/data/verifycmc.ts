import { links, repUsdcPoolId } from './links';
import { currentRep, legacyRep } from './rep';

/** The unlisted CoinMarketCap verification page (/verifycmc/). Facts were checked on
 * 27 November 2026 (`now`: /currencies/augur/ showed REPv1's contract, /currencies/augur-old/ returned 404); each link's source note in links.ts says how. */
export const cmcRequest = {
  ticket: '#1476631',
  application: '#1459647',
  manager: 'Lituus Foundation',
  /** From melo, 27 November 2026. */
  contact: { ours: 'Melo', theirs: 'Peter' },
};

/** The two CoinMarketCap pages the request asks for: the current token, and record 1104 moved to a legacy page. */
export const cmcListings = [
  {
    title: currentRep.listing,
    current: true,
    path: new URL(links.cmcAugur.url).pathname,
    href: links.cmcAugur.url,
    now: `Displays ${legacyRep[0].symbol} (record 1104)`,
    token: currentRep.symbol,
    contract: currentRep.address,
    contractHref: links.repToken.url,
    request: `List ${currentRep.symbol} here under the name ${currentRep.listing}.`,
    coinGecko: links.coinGeckoAugur.url,
  },
  {
    title: `${currentRep.listing} [OLD]`,
    current: false,
    path: '/currencies/augur-old/',
    now: 'Doesn’t exist yet',
    token: legacyRep[1].symbol,
    contract: legacyRep[1].address,
    request: `Move record 1104 here with its price and volume history, as ${legacyRep[1].symbol}.`,
    coinGecko: links.coinGeckoAugurOld.url,
  },
] as const;

/** Spot markets for the current token, and where each one publishes its rolling 24-hour volume. */
export const cmcMarkets = [
  {
    venue: 'Kraken',
    pair: `${currentRep.listing}/USD`,
    href: links.krakenAugurUsd.url,
    detail: `Kraken lists ${currentRep.symbol} as ${currentRep.listing}.`,
    feed: links.krakenAugurTicker.url,
    field: 'v[1]',
    unit: currentRep.listing,
  },
  {
    venue: 'Uniswap v4',
    pair: `${currentRep.symbol}/USDC`,
    href: links.uniswapRepUsdc.url,
    detail: `${currentRep.chain} · 0.99% fee`,
    poolId: repUsdcPoolId,
    feed: links.repUsdcPoolStats.url,
    field: 'volume_usd.h24',
    unit: 'USD',
  },
] as const;

/** Official destinations, so CoinMarketCap can match the listing's links against the project's own. */
export const cmcOfficialLinks = [
  { label: 'Website', href: 'https://www.augur.net/', text: 'www.augur.net' },
  { label: 'Whitepaper', href: links.whitepaper.url, text: 'Augur Lituus (PDF)' },
  { label: 'Etherscan', href: links.repToken.url, text: currentRep.symbol },
  { label: 'GitHub', href: links.github.url, text: 'AugurProject' },
  { label: 'X', href: links.x.url, text: '@AugurProject' },
  { label: 'Telegram', href: links.telegram.url, text: 't.me/augurlituus' },
  { label: 'Discord', href: links.discord.url, text: 'discord.gg/Y3tCZsSmz3' },
] as const;
