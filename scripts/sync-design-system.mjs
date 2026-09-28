import { execFileSync, spawn } from "node:child_process";
import { createHash } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";
import { createServer } from "node:http";
import { join } from "node:path";

// design-system.lock.json is the adopted contract. People edit only
// `version` (an immutable upstream release tag). This script resolves it and
// records `resolved` (tag, commit, per-item sha256) for audit and CI.
const LOCK_PATH = "design-system.lock.json";
const lock = JSON.parse(await readFile(LOCK_PATH, "utf8"));
const { repository: REPO, version: VERSION, items: ITEMS } = lock;
const NAMES = new Set(ITEMS);

if (!/^v\d+\.\d+\.\d+$/.test(VERSION)) throw new Error(`${LOCK_PATH}: version must be a release tag (vX.Y.Z), got ${VERSION}`);

function resolveCommit() {
  // `^{}` peels an annotated tag to the commit it names.
  const output = execFileSync(
    "git",
    ["ls-remote", `https://github.com/${REPO}.git`, `refs/tags/${VERSION}`, `refs/tags/${VERSION}^{}`],
    { encoding: "utf8", env: { ...process.env, GIT_TERMINAL_PROMPT: "0" } },
  );
  const refs = new Map(output.trim().split("\n").filter(Boolean).map((line) => line.split("\t").reverse()));
  const commit = refs.get(`refs/tags/${VERSION}^{}`) ?? refs.get(`refs/tags/${VERSION}`);
  if (!commit) throw new Error(`Release ${VERSION} not found in ${REPO}`);
  return commit;
}

const commit = resolveCommit();
if (lock.resolved?.version === VERSION && lock.resolved.commit !== commit) {
  // Release tags are immutable upstream; a moved tag is never adopted silently.
  throw new Error(`${REPO}@${VERSION} now resolves to ${commit}, but ${LOCK_PATH} recorded ${lock.resolved.commit}. The release tag moved.`);
}

async function readReleasedItem(name) {
  // Only for an isolated test with artifacts already fetched from this release.
  // CI always downloads from the commit-addressed upstream URL.
  if (process.env.AUGUR_REGISTRY_SOURCE_DIR && !process.env.CI) {
    return readFile(join(process.env.AUGUR_REGISTRY_SOURCE_DIR, `${name}.json`), "utf8");
  }
  // Fetch by the resolved commit so the tag cannot change mid-sync.
  const url = `https://raw.githubusercontent.com/${REPO}/${commit}/public/r/${name}.json`;
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Failed to fetch ${name} at ${VERSION}: HTTP ${response.status} (${url})`);
  return response.text();
}

function run(command, args) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { stdio: "inherit" });
    child.on("error", reject);
    child.on("exit", (code, signal) => {
      if (code === 0) resolve();
      else reject(new Error(`${command} ${args.join(" ")} exited ${code ?? signal}`));
    });
  });
}

const texts = await Promise.all(ITEMS.map(readReleasedItem));
const raw = texts.map((text) => JSON.parse(text));
const hashes = {};
for (let i = 0; i < raw.length; i++) {
  if (raw[i].name !== ITEMS[i] || !Array.isArray(raw[i].files)) {
    throw new Error(`Unexpected released registry item: ${ITEMS[i]}`);
  }
  hashes[ITEMS[i]] = `sha256-${createHash("sha256").update(texts[i]).digest("base64")}`;
  const recorded = lock.resolved?.version === VERSION ? lock.resolved.items?.[ITEMS[i]] : undefined;
  if (recorded && recorded !== hashes[ITEMS[i]]) {
    throw new Error(`${ITEMS[i]} at ${REPO}@${VERSION} no longer matches the hash in ${LOCK_PATH}`);
  }
}

// Listen on an OS-assigned loopback port, then replace only the transport
// addresses of transitive items. Source, CSS, targets and npm pins are intact.
const responses = new Map();
const server = createServer((request, response) => {
  const body = responses.get(request.url);
  if (!body) {
    response.writeHead(404).end();
    return;
  }
  response.writeHead(200, { "content-type": "application/json; charset=utf-8" }).end(body);
});
await new Promise((resolve, reject) => {
  server.once("error", reject);
  server.listen(0, "127.0.0.1", resolve);
});

// src/index.css holds only registry output (website CSS lives in
// src/styles/site.css). shadcn merges into the existing file and never
// removes declarations, so start from the bare Tailwind entry to keep the
// result a function of the release alone, not of every earlier release.
await writeFile("src/index.css", '@import "tailwindcss";\n');

try {
  const port = server.address().port;
  for (let i = 0; i < raw.length; i++) {
    const item = raw[i];
    const registryDependencies = item.registryDependencies?.map((dependency) => {
      // Released items stamp their dependencies with the same tag.
      const match = dependency.match(/^([^#]+)(?:#(.+))?$/);
      const prefix = `${REPO}/`;
      if (!match[1].startsWith(prefix)) throw new Error(`Unexpected registry dependency: ${dependency}`);
      if (match[2] !== undefined && match[2] !== VERSION) throw new Error(`Registry dependency ${dependency} does not name ${VERSION}`);
      const name = match[1].slice(prefix.length);
      if (!NAMES.has(name)) throw new Error(`Unrecognized registry dependency: ${dependency}`);
      return `http://127.0.0.1:${port}/${name}.json`;
    });
    responses.set(`/${item.name}.json`, JSON.stringify({ ...item, ...(registryDependencies ? { registryDependencies } : {}) }));
  }

  for (const name of ITEMS) {
    console.log(`Installing Augur item ${name} from ${REPO}@${VERSION} (${commit})`);
    await run("bunx", ["shadcn@4.20.1", "add", `http://127.0.0.1:${port}/${name}.json`, "--overwrite", "-y"]);
  }
} finally {
  await new Promise((resolve) => server.close(resolve));
}

lock.resolved = { version: VERSION, commit, items: hashes };
await writeFile(LOCK_PATH, `${JSON.stringify(lock, null, 2)}\n`);

console.log(`Release sync complete (${REPO}@${VERSION} = ${commit}). Review the source, CSS, dependency and lock diff.`);
