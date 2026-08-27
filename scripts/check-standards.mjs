import { readFile, readdir } from "node:fs/promises";
import { builtinModules } from "node:module";
import path from "node:path";

const root = process.cwd();
const failures = [];

const ignoredDirectories = new Set([
  ".git",
  ".vite",
  "build",
  "coverage",
  "dist",
  "node_modules",
  "playwright-report",
  "test-results",
]);

function packageNameFromSpecifier(specifier) {
  if (specifier.startsWith("@")) {
    return specifier.split("/").slice(0, 2).join("/");
  }
  return specifier.split("/")[0];
}

function isExternalSpecifier(specifier) {
  return (
    !specifier.startsWith(".") &&
    !specifier.startsWith("/") &&
    !specifier.startsWith("@/") &&
    !specifier.startsWith("node:")
  );
}

async function checkDeclaredImports(appRelativePath) {
  const appRoot = path.join(root, appRelativePath);
  const appPackage = JSON.parse(await readFile(path.join(appRoot, "package.json"), "utf8"));
  const declared = new Set([
    ...Object.keys(appPackage.dependencies ?? {}),
    ...Object.keys(appPackage.devDependencies ?? {}),
    ...builtinModules,
  ]);

  const files = await walk(appRoot);
  for (const file of files.filter((file) => /\.(?:tsx?|jsx?|css)$/.test(file))) {
    const source = await readFile(file, "utf8");
    const specifiers = [];

    if (file.endsWith(".css")) {
      for (const match of source.matchAll(/@import\s+["']([^"']+)["']/g)) {
        specifiers.push(match[1]);
      }
    } else {
      for (const match of source.matchAll(/(?:from\s+|import\s*\(\s*|import\s+)["']([^"']+)["']/g)) {
        specifiers.push(match[1]);
      }
    }

    for (const specifier of specifiers.filter(Boolean)) {
      if (!isExternalSpecifier(specifier)) continue;
      const packageName = packageNameFromSpecifier(specifier);
      if (!declared.has(packageName)) {
        failures.push(
          `${path.relative(root, file)}: imports undeclared package ${packageName}`,
        );
      }
    }
  }
}

const requiredFiles = [
  ".github/workflows/ci.yml",
  ".github/workflows/pages.yml",
  ".prettierrc.json",
  "eslint.config.mjs",
  "apps/frontend/vitest.config.ts",
  "apps/frontend/playwright.config.ts",
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


const vitestConfig = await readFile(
  path.join(root, "apps/frontend/vitest.config.ts"),
  "utf8",
);
if (!vitestConfig.includes('"@": path.resolve(configDirectory, "./src")')) {
  failures.push("vitest.config.ts: missing @ -> src alias used by application imports");
}
if (!vitestConfig.includes('include: ["src/**/*.{test,spec}.{ts,tsx}"]')) {
  failures.push("vitest.config.ts: unit test include must keep Playwright e2e specs out of Vitest");
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
    if (entry.isDirectory() && ignoredDirectories.has(entry.name)) continue;

    const full = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...(await walk(full)));
    else files.push(full);
  }
  return files;
}


await checkDeclaredImports("apps/frontend");
await checkDeclaredImports("apps/backend");

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

console.log("Standards check passed: dependencies, GitHub Pages, privacy, metadata and source safety checks OK.");
