import { readFile, readdir } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const failures = [];

const requiredFiles = [
  ".github/workflows/ci.yml",
  ".github/workflows/pages.yml",
  ".prettierrc.json",
  "eslint.config.mjs",
  "apps/frontend/public/brand/tahti-symbol.svg",
  "apps/frontend/public/brand/tahti-logo.svg",
];

for (const relative of requiredFiles) {
  try {
    await readFile(path.join(root, relative));
  } catch {
    failures.push(`Missing required file: ${relative}`);
  }
}

const packageJson = JSON.parse(await readFile(path.join(root, "package.json"), "utf8"));
for (const script of ["format:check", "lint", "typecheck", "test", "standards", "build", "test:e2e"]) {
  if (!packageJson.scripts?.[script]) {
    failures.push(`package.json: missing required script ${script}`);
  }
}

const pagesWorkflow = await readFile(
  path.join(root, ".github/workflows/pages.yml"),
  "utf8",
);
for (const command of [
  "npm run format:check",
  "npm run lint",
  "npm run typecheck",
  "npm run test",
  "npm run standards",
  "npm run build",
  "npm run test:e2e",
]) {
  if (!pagesWorkflow.includes(command)) {
    failures.push(`pages.yml: missing quality/deployment command ${command}`);
  }
}

const htmlFiles = [
  "apps/frontend/index.html",
  "apps/frontend/en/index.html",
  "apps/frontend/fi/index.html",
];

for (const relative of htmlFiles) {
  const html = await readFile(path.join(root, relative), "utf8");
  if (!/<html\s+lang="(?:en|fi)"/i.test(html)) {
    failures.push(`${relative}: missing a supported html lang attribute`);
  }
  if (!/name="viewport"/i.test(html)) {
    failures.push(`${relative}: missing viewport metadata`);
  }
  if (/goatcounter|trackamajig|plausible\.init/i.test(html)) {
    failures.push(`${relative}: legacy analytics/tracking code must not ship`);
  }
  if (!/prefers-color-scheme/i.test(html)) {
    failures.push(`${relative}: missing pre-paint system appearance detection`);
  }
}

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...(await walk(full)));
    else files.push(full);
  }
  return files;
}

const sourceFiles = await walk(path.join(root, "apps/frontend/src"));
for (const file of sourceFiles.filter((file) => /\.(tsx?|jsx?)$/.test(file))) {
  const source = await readFile(file, "utf8");
  if (source.includes("dangerouslySetInnerHTML")) {
    failures.push(`${path.relative(root, file)}: dangerouslySetInnerHTML is not allowed`);
  }
}

if (failures.length > 0) {
  console.error("Standards check failed:\n" + failures.map((item) => `- ${item}`).join("\n"));
  process.exit(1);
}

console.log("Standards check passed: GitHub Pages, privacy, metadata and source safety checks OK.");
