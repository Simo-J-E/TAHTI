import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { execSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig, loadEnv } from "vite";

function getGitInfo() {
  try {
    const commitHash = execSync("git rev-parse --short HEAD").toString().trim();
    const commitDate = execSync("git log -1 --format=%ci").toString().trim();
    let branch = execSync("git rev-parse --abbrev-ref HEAD").toString().trim();

    if (branch === "HEAD") {
      branch = process.env.GITHUB_REF_NAME || "main";
    }

    return { commitHash, branch, commitDate };
  } catch {
    return {
      commitHash: "unknown",
      branch: process.env.GITHUB_REF_NAME || "main",
      commitDate: new Date().toISOString(),
    };
  }
}

function normalizeBasePath(value: string | undefined): string {
  if (!value || value === "/") return "/";
  const withLeadingSlash = value.startsWith("/") ? value : `/${value}`;
  return withLeadingSlash.endsWith("/") ? withLeadingSlash : `${withLeadingSlash}/`;
}

const configDirectory = path.dirname(fileURLToPath(import.meta.url));

export default ({ mode }: { mode: string }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const gitInfo = getGitInfo();
  const basePath = process.env.VITE_BASE_PATH || env.VITE_BASE_PATH;

  return defineConfig({
    plugins: [react(), tailwindcss()],
    base: normalizeBasePath(basePath),
    define: {
      __GIT_COMMIT_HASH__: JSON.stringify(gitInfo.commitHash),
      __GIT_BRANCH__: JSON.stringify(gitInfo.branch),
      __GIT_COMMIT_DATE__: JSON.stringify(gitInfo.commitDate),
    },
    resolve: {
      alias: {
        "@": path.resolve(configDirectory, "./src"),
      },
    },
    server: {
      port: Number(env.VITE_PORT || 5173),
    },
    build: {
      rollupOptions: {
        input: {
          main: path.resolve(configDirectory, "index.html"),
          en: path.resolve(configDirectory, "en/index.html"),
          fi: path.resolve(configDirectory, "fi/index.html"),
        },
      },
    },
  });
};
