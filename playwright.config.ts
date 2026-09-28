import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/browser",
  outputDir: "test-results",
  workers: 1,
  reporter: "list",
  use: {
    baseURL: "http://127.0.0.1:4321",
    browserName: "chromium",
    trace: "retain-on-failure",
  },
  webServer: {
    command: "./node_modules/.bin/astro preview --host 127.0.0.1 --port 4321",
    url: "http://127.0.0.1:4321/",
    reuseExistingServer: false,
    timeout: 30_000,
  },
});
