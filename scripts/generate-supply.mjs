// REP supply endpoints: node scripts/generate-supply.mjs
// Reads ERC-20 totalSupply() of REPv2_Yes_1 on Ethereum mainnet and rewrites public/api/supply/ in the format
// CoinMarketCap reads (docs/reference/hosting.md#rep-supply-endpoints): {total,circulating}/index.html hold one
// bare decimal in whole REP with no trailing newline, and meta.json holds provenance and the exact wei value.
// Ported from the old site's scripts/generate-supply-endpoints.ts (AugurProject/augur-reboot-website), with the
// same checks and byte-identical output, as plain Node with no dependencies.
// Fail-closed: nothing is written unless the on-chain symbol and decimals match and the supply is within bounds,
// and the script exits 1, so the GitHub Pages deploy stops and the last deployed values stay live.

import { mkdir, rm, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

// ETH_RPC_URL, when set, is tried before the public endpoints, which need no API key.
const endpoints = [
  ...(process.env.ETH_RPC_URL ? [process.env.ETH_RPC_URL] : []),
  'https://ethereum-rpc.publicnode.com',
  'https://eth.drpc.org',
  'https://1rpc.io/eth',
];

const token = {
  address: '0xCf6A0A7826fa124B7705d6f3c675eAD76f1e540D',
  symbol: 'REPv2_Yes_1',
  role: 'Current REP, the token of the winning/canonical child universe of the Moon Fork.',
};
const decimals = 18;
// REP's genesis supply is 11,000,000, which no universe's token can exceed. Supply still grows slowly through
// forkAndRedeem on unredeemed forking-market bonds, so this bound is the invariant, not a fixed value.
const maxSupplyWei = 11_000_000n * 10n ** BigInt(decimals);
// Read a few blocks behind the tip: a load-balanced RPC may route the call to a node that hasn't seen the tip.
const blockLag = 5;
const timeoutMs = 30_000;

// Function selectors: symbol(), decimals(), totalSupply().
const selectors = { symbol: '0x95d89b41', decimals: '0x313ce567', totalSupply: '0x18160ddd' };

const rpc = async (url, method, params) => {
  const response = await fetch(url, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ jsonrpc: '2.0', id: 1, method, params }), signal: AbortSignal.timeout(timeoutMs) });
  if (!response.ok) throw new Error(`${method}: HTTP ${response.status}`);
  const { result, error } = await response.json();
  if (error) throw new Error(`${method}: ${error.message ?? JSON.stringify(error)}`);
  return result;
};
const call = (url, data, block) => rpc(url, 'eth_call', [{ to: token.address, data }, `0x${block.toString(16)}`]);

/** An ABI-encoded `string` return value: offset, length, then the UTF-8 bytes. */
const decodeString = hex => {
  const bytes = Buffer.from(hex.slice(2), 'hex');
  const offset = Number(BigInt(`0x${bytes.subarray(0, 32).toString('hex')}`));
  const length = Number(BigInt(`0x${bytes.subarray(offset, offset + 32).toString('hex')}`));
  return bytes.subarray(offset + 32, offset + 32 + length).toString('utf8');
};

/** Whole tokens as a bare decimal: no grouping, no exponent, no trailing zeros. */
const formatWholeTokens = wei => {
  const base = 10n ** BigInt(decimals);
  const fraction = (wei % base).toString().padStart(decimals, '0').replace(/0+$/u, '');
  return fraction ? `${wei / base}.${fraction}` : `${wei / base}`;
};

const read = async url => {
  const block = Number(BigInt(await rpc(url, 'eth_blockNumber', []))) - blockLag;
  const symbol = decodeString(await call(url, selectors.symbol, block));
  if (symbol !== token.symbol) throw new Error(`on-chain symbol "${symbol}" is not "${token.symbol}"; refusing to publish`);
  const onChainDecimals = Number(BigInt(await call(url, selectors.decimals, block)));
  if (onChainDecimals !== decimals) throw new Error(`on-chain decimals ${onChainDecimals} is not ${decimals}; refusing to publish`);
  const wei = BigInt(await call(url, selectors.totalSupply, block));
  if (wei <= 0n || wei > maxSupplyWei) throw new Error(`supply ${wei} is outside (0, 11,000,000 REP]; refusing to publish`);
  return { block, symbol, wei };
};

let snapshot;
for (const url of endpoints) {
  try {
    snapshot = await read(url);
    console.log(`✓ ${snapshot.symbol} totalSupply at block ${snapshot.block}: ${formatWholeTokens(snapshot.wei)} (${new URL(url).host})`);
    break;
  } catch (error) {
    console.log(`✗ ${new URL(url).host}: ${error.message}`);
  }
}
if (!snapshot) {
  console.error(`✗ Every RPC endpoint failed (${endpoints.length}); public/api/supply/ is unchanged.`);
  process.exit(1);
}

// Rebuild the folder so no file from an older layout is left behind. The chain read has already succeeded.
const dir = fileURLToPath(new URL('../public/api/supply/', import.meta.url));
const value = formatWholeTokens(snapshot.wei);
await rm(dir, { recursive: true, force: true });
// Circulating equals total: no locked, reserved or treasury allocations. Each body is the bare number, no markup.
for (const field of ['total', 'circulating']) {
  await mkdir(join(dir, field), { recursive: true });
  await writeFile(join(dir, field, 'index.html'), value);
}
const meta = {
  generatedAt: new Date().toISOString(),
  blockNumber: snapshot.block,
  note: 'Circulating equals total: no locked, reserved, or treasury allocations.',
  token: { address: token.address, symbol: snapshot.symbol, role: token.role, totalSupplyWei: snapshot.wei.toString(), totalSupply: value, circulatingSupply: value },
};
await writeFile(join(dir, 'meta.json'), `${JSON.stringify(meta, null, '\t')}\n`);
console.log(`✓ Wrote ${dir}`);
