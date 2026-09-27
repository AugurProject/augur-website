import { spawn } from "node:child_process";
import { readFile } from "node:fs/promises";
import { createServer } from "node:http";
import { join } from "node:path";

const PIN = "629868678fa05d9cd0d8d14617ec29bf8df5d290";
const REPO = "jubalm/augur-design-system";
const ITEMS = ["augur-theme", "utils", "button", "card", "page-header", "empty-state"];
const NAMES = new Set(ITEMS);

async function readPinnedItem(name) {
  // Only for an isolated test with artifacts already fetched from this pin.
  // CI always downloads from the commit-addressed upstream URL.
  if (process.env.AUGUR_REGISTRY_SOURCE_DIR && !process.env.CI) {
    return JSON.parse(await readFile(join(process.env.AUGUR_REGISTRY_SOURCE_DIR, `${name}.json`), "utf8"));
  }
  const url = `https://raw.githubusercontent.com/${REPO}/${PIN}/public/r/${name}.json`;
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Failed to fetch pinned ${name}: HTTP ${response.status} (${url})`);
  return response.json();
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

const raw = await Promise.all(ITEMS.map(readPinnedItem));
for (let i = 0; i < raw.length; i++) {
  if (raw[i].name !== ITEMS[i] || !Array.isArray(raw[i].files)) {
    throw new Error(`Unexpected pinned registry item: ${ITEMS[i]}`);
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

try {
  const port = server.address().port;
  for (let i = 0; i < raw.length; i++) {
    const item = raw[i];
    const registryDependencies = item.registryDependencies?.map((dependency) => {
      const prefix = `${REPO}/`;
      if (!dependency.startsWith(prefix)) throw new Error(`Unexpected registry dependency: ${dependency}`);
      const name = dependency.slice(prefix.length);
      if (!NAMES.has(name)) throw new Error(`Unrecognized registry dependency: ${dependency}`);
      return `http://127.0.0.1:${port}/${name}.json`;
    });
    responses.set(`/${item.name}.json`, JSON.stringify({ ...item, ...(registryDependencies ? { registryDependencies } : {}) }));
  }

  for (const name of ITEMS) {
    console.log(`Installing pinned Augur item ${name} from ${REPO}@${PIN}`);
    await run("bunx", ["shadcn@4.20.1", "add", `http://127.0.0.1:${port}/${name}.json`, "--overwrite", "-y"]);
  }
} finally {
  await new Promise((resolve) => server.close(resolve));
}

console.log("Pinned built-JSON sync complete. Review the source, CSS and dependency diff.");
