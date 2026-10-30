// Launch check for the augur.net cutover: node scripts/check-launch.mjs <baseURL> [referenceURL]
// Requests the served site at <baseURL> and checks what the old augur.net promised: every URL in its sitemap,
// the REP supply endpoints (byte for byte against <referenceURL>, default https://www.augur.net, fetched in the
// same run), redirects, the 404 page, response headers and the crawl files. Plain Node, no dependencies.
// Exits 1 when any check fails; WARN and SKIP rows do not fail the run. Steps: docs/guides/deploy.md.

import http from 'node:http';
import https from 'node:https';

const [baseArg, referenceArg = 'https://www.augur.net'] = process.argv.slice(2);
if (!baseArg || baseArg.startsWith('-')) {
  console.error('Usage: node scripts/check-launch.mjs <baseURL> [referenceURL]\n  e.g. node scripts/check-launch.mjs http://localhost:8787');
  process.exit(2);
}
const base = new URL(baseArg).origin;
const reference = new URL(referenceArg).origin;
const baseHost = new URL(base).hostname;

// Paths in the old site's sitemap (AugurProject/augur-reboot-website at ba18725), 30 October 2026.
const oldSitemap = [
  '/', '/blog/', '/blog/augur-cryptos-first-algorithmic-fork/', '/blog/augur-one-year-in/', '/blog/augur-reboot-2025/',
  '/blog/augur-testing-past-building-future/', '/blog/augurs-decade/', '/blog/augurs-revival/', '/blog/augurs-rising/',
  '/blog/generalized-augur/', '/blog/micahs-augur-fork/', '/blog/phase-1-the-escalation-game/', '/blog/phase-2-the-fork-migration/',
  '/blog/post-fork-announcements/', '/blog/q1-2026-progress-report/', '/blog/q2-2026-progress-report/', '/blog/the-augur-fork-is-here/',
  '/blog/the-augur-lituus-whitepaper/', '/faq/', '/learn/', '/learn/fork/', '/learn/fork/disputes-and-bonds/',
  '/learn/fork/migration-mechanics/', '/learn/fork/migration/', '/learn/fork/moon-fork/', '/learn/fork/what-to-do/', '/mission/',
  '/privacy/', '/rep/', '/team/', '/terms/', '/whitepapers/', '/whitepapers/augur-v2/', '/whitepapers/augur-v2/abstract-and-introduction/',
  '/whitepapers/augur-v2/acknowledgments/', '/whitepapers/augur-v2/appendix-a-finalization-time-and-redistribution/',
  '/whitepapers/augur-v2/appendix-b-bond-size-adjustments/', '/whitepapers/augur-v2/how-augur-works/',
  '/whitepapers/augur-v2/incentives-and-security/', '/whitepapers/augur-v2/potential-issues-and-risks/', '/whitepapers/augur-v2/references/',
];
// Old pages folded into /about/ (owner, 30 October 2026).
const movedToAbout = new Set(['/mission/', '/team/']);

const PASS = 'PASS', FAIL = 'FAIL', WARN = 'WARN', SKIP = 'SKIP';
/** A check is { check: label, run: async () => ({ status, detail }) }; a thrown error fails it. */
const check = (label, run) => ({ check: label, run });
const row = (status, detail = '') => ({ status, detail });

const request = (origin, path) => fetch(new URL(path, origin), { redirect: 'manual', signal: AbortSignal.timeout(20_000), headers: { 'user-agent': 'augur-check-launch' } });
const get = path => request(base, path);
const bytes = async response => Buffer.from(await response.arrayBuffer());
const contentType = response => response.headers.get('content-type') ?? '(none)';

/** A redirect's target as a path on the same host, or the full URL when it leaves the host. */
const target = (response, path) => {
  const location = response.headers.get('location');
  if (!location) return '(no Location)';
  const url = new URL(location, new URL(path, base));
  return url.origin === base ? url.pathname + url.search : url.href;
};
const isPermanent = status => status === 301 || status === 308;

const expectStatus = (path, status, label = `${path} returns ${status}`) => check(label, async () => {
  const response = await get(path);
  await response.body?.cancel();
  const extra = response.status >= 300 && response.status < 400 ? ` → ${target(response, path)}` : '';
  return row(response.status === status ? PASS : FAIL, `${response.status}${extra}`);
});

const expectRedirect = (path, to, { codes = [301, 308], label = `${path} redirects permanently to ${to}` } = {}) => check(label, async () => {
  const response = await get(path);
  await response.body?.cancel();
  const where = target(response, path);
  const ok = codes.includes(response.status) && where === to;
  return row(ok ? PASS : FAIL, `${response.status} → ${where}`);
});

const supplyField = field => check(`/api/supply/${field}/ is byte-identical to ${new URL(reference).host}`, async () => {
  const path = `/api/supply/${field}/`;
  const [served, live] = await Promise.all([get(path), request(reference, path)]);
  const [body, liveBody] = await Promise.all([bytes(served), bytes(live)]);
  const problems = [];
  if (served.status !== 200) problems.push(`status ${served.status}`);
  if (!contentType(served).startsWith('text/html')) problems.push(`content-type ${contentType(served)}`);
  if (live.status !== 200) problems.push(`reference status ${live.status}`);
  else if (!body.equals(liveBody)) problems.push(`body "${body.toString().slice(0, 40)}" differs from reference "${liveBody.toString().slice(0, 40)}"`);
  if (!/^\d+(\.\d+)?$/.test(body.toString())) problems.push('body is not a bare decimal without a trailing newline');
  return row(problems.length ? FAIL : PASS, problems.join('; ') || `${served.status}, ${contentType(served)}, ${body.toString()}`);
});

const supplyMeta = check(`/api/supply/meta.json is byte-identical to ${new URL(reference).host}`, async () => {
  const path = '/api/supply/meta.json';
  const [served, live] = await Promise.all([get(path), request(reference, path)]);
  const [body, liveBody] = await Promise.all([bytes(served), bytes(live)]);
  if (served.status !== 200 || !contentType(served).startsWith('application/json')) return row(FAIL, `${served.status}, ${contentType(served)}`);
  if (live.status !== 200) return row(FAIL, `reference status ${live.status}`);
  if (body.equals(liveBody)) return row(PASS, `${served.status}, ${contentType(served)}`);
  // The old site regenerates meta.json every hour, which moves generatedAt and blockNumber but not the supply.
  try {
    const [mine, theirs] = [JSON.parse(body), JSON.parse(liveBody)];
    if (JSON.stringify(mine.token) === JSON.stringify(theirs.token)) return row(WARN, `same token and supply; snapshot block ${mine.blockNumber}, reference block ${theirs.blockNumber} (regenerated ${theirs.generatedAt})`);
  } catch {}
  return row(FAIL, 'token or supply differs from the reference');
});

// Sent as a browser page load. When the deployed version carries a Worker script (as `wrangler preview`
// builds do), Cloudflare serves the 404 page only to navigations; other requests reach the Worker.
// node:http rather than fetch, which replaces Sec-Fetch-Mode with its own value.
const navigate = path => new Promise((resolve, reject) => {
  const url = new URL(path, base);
  const client = url.protocol === 'https:' ? https : http;
  const req = client.get(url, { timeout: 20_000, headers: { 'user-agent': 'augur-check-launch', 'sec-fetch-mode': 'navigate', 'sec-fetch-dest': 'document', accept: 'text/html' } }, response => {
    let body = '';
    response.setEncoding('utf8').on('data', chunk => { body += chunk; }).on('end', () => resolve({ status: response.statusCode, type: response.headers['content-type'] ?? '(none)', body }));
  });
  req.on('timeout', () => req.destroy(new Error('timed out'))).on('error', reject);
});
const notFoundPage = check('An unknown path returns the 404 page with status 404 (browser navigation)', async () => {
  const { status, type, body } = await navigate(`/launch-check-${Date.now()}/`);
  const ok = status === 404 && type.startsWith('text/html') && /<html/i.test(body) && body.includes('Page not found');
  return row(ok ? PASS : FAIL, `${status}, ${type}, ${body.length} bytes`);
});
const notFoundStatus = check('An unknown path returns status 404 to a non-browser request', async () => {
  const response = await get(`/launch-check-${Date.now()}.json`);
  const body = await response.text();
  return row(response.status === 404 ? PASS : FAIL, `${response.status}, ${contentType(response)}, ${body.length} bytes${body.includes('Page not found') ? ', the 404 page' : ''}`);
});

let home;
const homeResponse = () => (home ??= get('/').then(async response => ({ headers: response.headers, status: response.status, body: await response.text() })));
const securityHeaders = [
  ['strict-transport-security', value => /(^|;)\s*max-age=86400\s*($|;)/.test(value) && !/preload/i.test(value), 'max-age=86400, no preload'],
  ['x-content-type-options', value => value === 'nosniff', 'nosniff'],
  ['referrer-policy', value => value === 'strict-origin-when-cross-origin', 'strict-origin-when-cross-origin'],
  ['x-frame-options', value => value === 'DENY', 'DENY'],
  ['permissions-policy', value => value === 'camera=(), microphone=(), geolocation=()', 'camera=(), microphone=(), geolocation=()'],
  ['content-security-policy-report-only', value => value.includes('https://www.googletagmanager.com'), 'present, allows GA'],
].map(([name, test, expected]) => check(`/ sends ${name}: ${expected}`, async () => {
  const { headers } = await homeResponse();
  const value = headers.get(name);
  return row(value !== null && test(value) ? PASS : FAIL, value === null ? '(missing)' : value.length > 60 ? `${value.slice(0, 57)}...` : value);
}));

const pageMetadata = check('/ has canonical, Open Graph and Twitter tags and no noindex', async () => {
  const { status, body } = await homeResponse();
  const problems = [];
  if (status !== 200) problems.push(`status ${status}`);
  if (!body.includes('<link rel="canonical" href="https://www.augur.net/">')) problems.push('no canonical https://www.augur.net/');
  for (const tag of ['og:title', 'og:description', 'og:url', 'og:image', 'twitter:card']) if (!body.includes(`"${tag}"`)) problems.push(`no ${tag}`);
  if (/<meta name="robots" content="noindex"/.test(body)) problems.push('robots noindex meta');
  return row(problems.length ? FAIL : PASS, problems.join('; ') || 'ok');
});

const analytics = check('/ carries the GA4 snippet, gated to the canonical host', async () => {
  const { body } = await homeResponse();
  const ok = body.includes('G-4VLMY3QMC9') && /location\.hostname\s*===\s*host/.test(body);
  return row(ok ? PASS : FAIL, ok ? 'G-4VLMY3QMC9' : 'missing');
});

const robotsTag = check('X-Robots-Tag: noindex on workers.dev only', async () => {
  const { headers } = await homeResponse();
  const value = headers.get('x-robots-tag');
  if (baseHost.endsWith('.workers.dev')) return row(value?.includes('noindex') ? PASS : FAIL, value ?? '(missing)');
  if (baseHost === 'www.augur.net') return row(value?.includes('noindex') ? FAIL : PASS, value ?? '(absent)');
  return row(SKIP, `host ${baseHost} is neither; X-Robots-Tag ${value ?? 'absent'}`);
});

const cacheControl = (path, test, expected) => check(`${path} Cache-Control: ${expected}`, async () => {
  const response = await get(path);
  await response.body?.cancel();
  const value = response.headers.get('cache-control');
  return row(response.status === 200 && value !== null && test(value) ? PASS : FAIL, `${response.status}, ${value ?? '(missing)'}`);
});

const file = (path, test = () => true, expected = '') => check(`${path} returns 200${expected}`, async () => {
  const response = await get(path);
  const body = await response.text();
  const ok = response.status === 200 && test(body, response);
  return row(ok ? PASS : FAIL, `${response.status}, ${contentType(response)}`);
});

const apex = check('https://augur.net/ redirects permanently to https://www.augur.net/', async () => {
  if (baseHost !== 'www.augur.net') return row(SKIP, 'only checked when baseURL is https://www.augur.net');
  const response = await request('https://augur.net', '/');
  await response.body?.cancel();
  const location = response.headers.get('location') ?? '(no Location)';
  return row(isPermanent(response.status) && location === 'https://www.augur.net/' ? PASS : FAIL, `${response.status} → ${location}`);
});

const checks = [
  ...oldSitemap.map(path => movedToAbout.has(path) ? expectRedirect(path, '/about/', { codes: [301], label: `${path} (old sitemap) 301 to /about/` }) : expectStatus(path, 200, `${path} (old sitemap) returns 200`)),
  expectRedirect('/mission', '/about/', { codes: [301], label: '/mission 301 to /about/' }),
  expectRedirect('/team', '/about/', { codes: [301], label: '/team 301 to /about/' }),
  supplyField('total'),
  supplyField('circulating'),
  supplyMeta,
  expectRedirect('/api/supply/total', '/api/supply/total/'),
  expectRedirect('/api/supply/circulating', '/api/supply/circulating/'),
  expectStatus('/data/fork-risk.json', 404, '/data/fork-risk.json returns 404 (dropped)'),
  expectStatus('/data/dispute-markets-seed.json', 404, '/data/dispute-markets-seed.json returns 404 (dropped)'),
  notFoundPage,
  notFoundStatus,
  ...securityHeaders,
  pageMetadata,
  analytics,
  robotsTag,
  file('/robots.txt', body => body.includes('Sitemap: https://www.augur.net/sitemap-index.xml'), ' and names the sitemap'),
  file('/sitemap-index.xml'),
  file('/rss.xml'),
  file('/og-image.png', (_, response) => contentType(response) === 'image/png', ' as image/png'),
  expectRedirect('/about', '/about/'),
  expectRedirect('/rep', '/rep/'),
  cacheControl('/', value => /max-age=0\b|no-cache/.test(value), 'HTML revalidated'),
  cacheControl('/brand/kit/rep-token/rep-token-icon.svg', value => value === 'public, max-age=86400', 'public, max-age=86400'),
  apex,
];

// Run a few requests at a time; report in the order above.
const results = new Array(checks.length);
let next = 0;
await Promise.all(Array.from({ length: 6 }, async () => {
  while (next < checks.length) {
    const index = next++;
    const { check: label, run } = checks[index];
    try { results[index] = { check: label, ...await run() }; }
    catch (error) { results[index] = { check: label, ...row(FAIL, `error: ${error.cause?.code ?? error.message}`) }; }
  }
}));

const width = Math.max(...results.map(result => result.check.length));
console.log(`Launch check: ${base} (supply reference ${reference}), ${new Date().toISOString()}\n`);
console.log(`${'STATUS'.padEnd(6)}  ${'CHECK'.padEnd(width)}  DETAIL`);
for (const { status, check: label, detail } of results) console.log(`${status.padEnd(6)}  ${label.padEnd(width)}  ${detail}`);
const count = status => results.filter(result => result.status === status).length;
console.log(`\n${count(PASS)} passed, ${count(FAIL)} failed, ${count(WARN)} warnings, ${count(SKIP)} skipped`);
process.exit(count(FAIL) ? 1 : 0);
