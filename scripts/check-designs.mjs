// Builds the site once per homepage design (HOME_DESIGN=<name>) into a temporary folder and fails if
// any build fails, so a shared change can't silently break a design that isn't live.
import { spawnSync } from 'node:child_process';
import { existsSync, mkdtempSync, readdirSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { designs } from '../src/designs/index.ts';

const root = new URL('..', import.meta.url).pathname;
const folders = readdirSync(join(root, 'src/designs'), { withFileTypes: true }).filter(entry => entry.isDirectory()).map(entry => entry.name);
const problems = [
  ...designs.filter(name => !existsSync(join(root, 'src/designs', name, 'Home.astro'))).map(name => `${name}: in src/designs/index.ts but src/designs/${name}/Home.astro is missing`),
  ...folders.filter(name => !designs.includes(name)).map(name => `${name}: src/designs/${name}/ is not in src/designs/index.ts`),
];
const out = mkdtempSync(join(tmpdir(), 'check-designs-'));
try {
  for (const name of designs) {
    if (problems.some(problem => problem.startsWith(`${name}:`))) continue;
    console.log(`\n▶ HOME_DESIGN=${name}`);
    const dir = join(out, name);
    const build = spawnSync('npx', ['astro', 'build', '--outDir', dir], { cwd: root, stdio: 'inherit', env: { ...process.env, HOME_DESIGN: name } });
    if (build.status !== 0) problems.push(`${name}: build failed`);
    else if (!existsSync(join(dir, 'client/index.html'))) problems.push(`${name}: build wrote no client/index.html`);
  }
} finally {
  rmSync(out, { recursive: true, force: true });
}
console.log('');
for (const problem of problems) console.error(`✗ ${problem}`);
if (problems.length) process.exit(1);
console.log(`✓ Every design builds: ${designs.join(', ')}`);
