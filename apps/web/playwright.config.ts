import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import type { PlaywrightTestConfig } from '@playwright/test';

const __dirname = dirname(fileURLToPath(import.meta.url));

const config: PlaywrightTestConfig = {
  testDir: './tests/e2e',
  timeout: 30_000,
  use: {
    baseURL: 'http://localhost:5173',
    headless: true,
  },
  webServer: {
    command: 'pnpm dev',
    port: 5173,
    reuseExistingServer: !process.env.CI,
    cwd: __dirname,
  },
};

export default config;

