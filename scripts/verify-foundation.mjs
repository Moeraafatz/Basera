import { readFileSync, readdirSync, existsSync } from "fs";
import { join, resolve } from "path";

const ROOT = resolve(import.meta.dirname, "..");
const FOUNDATION_PAGE = join(ROOT, "src/app/foundation/page.tsx");
const PKG = JSON.parse(readFileSync(join(ROOT, "package.json"), "utf-8"));
const PAGE = readFileSync(FOUNDATION_PAGE, "utf-8");

const errors = [];

function report(category, message) {
  errors.push(`[${category}] ${message}`);
}

const DEPENDENCIES_BLOCK = PAGE.match(/const DEPENDENCIES = \[([\s\S]*?)\];/)?.[1] || "";
const matchedPkgDeps = PAGE.match(/\{ name: "([^"]+)", version: "([^"]+)", purpose: "([^"]+)", justif: "([^"]+)" \}/g) || [];

for (const dep of matchedPkgDeps) {
  const name = dep.match(/name: "([^"]+)"/)?.[1];
  const version = dep.match(/version: "([^"]+)"/)?.[1];
  if (name && version) {
    const pkgVersion = PKG.dependencies?.[name] || PKG.devDependencies?.[name];
    const cleanVersion = pkgVersion?.replace(/[\^~]/, "").split("/").pop();
    if (pkgVersion && !version.startsWith(cleanVersion.split(".")[0])) {
      report("VERSION_MISMATCH", `"${name}" version in page: ${version}, package.json: ${pkgVersion}`);
    }
  }
}

const actualDeps = [...Object.keys(PKG.dependencies), ...Object.keys(PKG.devDependencies)];
const pageDepNames = matchedPkgDeps.map((d) => d.match(/name: "([^"]+)"/)?.[1]).filter(Boolean);
const KEY_DEPS = ["next", "react", "typescript", "tailwindcss", "framer-motion", "zustand"];
for (const dep of KEY_DEPS) {
  if (pageDepNames.includes(dep)) {
    if (!actualDeps.includes(dep)) {
      report("MISSING_DEP", `"${dep}" listed in page but not in package.json`);
    }
  }
}

const pathMatches = PAGE.match(/"path": "([^"]+)"/g) || [];
for (const match of pathMatches) {
  const filePath = match.match(/"path": "([^"]+)"/)?.[1];
  if (!filePath) continue;
  const resolved = join(ROOT, filePath);
  if (!existsSync(resolved)) {
    const trimmed = filePath.replace(/^src\//, "");
    if (trimmed && !filePath.includes("api")) {
      report("MISSING_FILE", `File listed in directory tree does not exist: ${filePath}`);
    }
  }
}

const apiDirs = readdirSync(join(ROOT, "src/app/api"), { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => d.name);

const pageRoutes = [
  { method: "POST", path: "/api/generate", handler: "src/app/api/generate/route.ts" },
  { method: "POST", path: "/api/humanize", handler: "src/app/api/humanize/route.ts" },
  { method: "POST", path: "/api/analyze-reference", handler: "src/app/api/analyze-reference/route.ts" },
];
const actualRoutes = [];
for (const dir of apiDirs) {
  const routePath = join(ROOT, "src/app/api", dir, "route.ts");
  if (existsSync(routePath)) {
    const content = readFileSync(routePath, "utf-8");
    const methods = [];
    if (content.includes("export async function POST")) methods.push("POST");
    if (content.includes("export async function GET")) methods.push("GET");
    actualRoutes.push({ method: methods[0] || "POST", path: `/api/${dir}`, handler: `src/app/api/${dir}/route.ts` });
  }
}
for (const route of pageRoutes) {
  const found = actualRoutes.find((r) => r.path === route.path);
  if (!found) {
    report("MISSING_ROUTE", `Route listed in page not found in codebase: ${route.method} ${route.path}`);
  }
}
for (const route of actualRoutes) {
  const listed = pageRoutes.find((r) => r.path === route.path);
  if (!listed) {
    report("EXTRA_ROUTE", `Route exists in codebase but not documented: ${route.method} ${route.path}`);
  }
}

const storeFields = ["inputText", "level", "category", "selectedModel"];
const storeDefaults = ["\"\"", '"advanced"', '"Content Creation"', '"chatgpt"'];
const STORE_SLICES_BLOCK = PAGE.match(/const STORE_SLICES = \[([\s\S]*?)\];/)?.[1] || "";
for (const field of storeFields) {
  if (!PAGE.includes(`name: "${field}"`)) {
    report("MISSING_STORE_FIELD", `Store field "${field}" in src/store/prompt-store.ts not documented in page`);
  }
}

if (errors.length > 0) {
  console.error("Foundation page drift detected:\n");
  for (const err of errors) {
    console.error(`  ${err}`);
  }
  process.exit(1);
}

console.log("Foundation page verification passed.");