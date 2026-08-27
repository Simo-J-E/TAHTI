import { defineConfig, devices } from "@playwright/test";

const basePath = process.env.VITE_BASE_PATH || "/";
const normalizedBase = basePath.endsWith("/") ? basePath : `${basePath}/`;
const previewUrl = `http://127.0.0.1:4173${normalizedBase}`;

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? "github" : "list",
  use: {
    baseURL: previewUrl,
    trace: "on-first-retry",
  },
  projects: [
    { name: "desktop-chromium", use: { ...devices["Desktop Chrome"] } },
    { name: "mobile-chromium", use: { ...devices["Pixel 7"] } },
  ],
  webServer: {
    command: "npm run preview -- --port 4173",
    url: previewUrl,
    reuseExistingServer: !process.env.CI,
  },
});
