import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join, relative, resolve } from "node:path";

const output = resolve("dist");
const site = new URL("https://augur.net/");
const expectedRoutes = [
  "/", "/protocol/", "/developers/", "/learn/", "/blog/",
  "/research/", "/rep/", "/faq/", "/about/", "/history/",
  "/terms/", "/privacy/",
];
const failures = [];

function pageFiles(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    return entry.isDirectory() ? pageFiles(path) : path.endsWith(".html") ? [path] : [];
  });
}

function builtPath(pathname) {
  let decoded;
  try {
    decoded = decodeURIComponent(pathname);
  } catch {
    return null;
  }
  if (decoded.includes("\0") || decoded.split("/").includes("..")) return null;
  const path = join(output, decoded.replace(/^\/+/, ""));
  return pathname.endsWith("/") ? join(path, "index.html") : path;
}

if (!existsSync(output)) {
  console.error("Build output is missing. Run the site build first.");
  process.exit(1);
}

for (const route of expectedRoutes) {
  if (!existsSync(builtPath(route))) failures.push(`Missing direct-entry route: ${route}`);
}
if (!existsSync(join(output, "404.html"))) failures.push("Missing 404.html");

for (const file of pageFiles(output)) {
  const page = `/${relative(output, file).replace(/index\.html$/, "")}`;
  const html = readFileSync(file, "utf8");
  for (const match of html.matchAll(/\b(?:href|src)=["']([^"']+)["']/g)) {
    const value = match[1];
    if (value.startsWith("#") || /^(?:data:|mailto:|tel:|javascript:)/i.test(value)) continue;
    let target;
    try {
      target = new URL(value, new URL(page, site));
    } catch {
      failures.push(`${page}: invalid URL ${value}`);
      continue;
    }
    if (target.origin !== site.origin) continue;
    const path = builtPath(target.pathname);
    if (!path || !existsSync(path)) failures.push(`${page}: missing ${value}`);
  }
}

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}
console.log(`Checked ${expectedRoutes.length} routes and internal links in ${pageFiles(output).length} HTML files.`);
