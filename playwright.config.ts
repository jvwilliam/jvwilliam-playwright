import { defineConfig, devices } from "@playwright/test";
import dotenv from 'dotenv';
import path from 'path';

// ESM note: prefer resolving env path from process.cwd() or use import.meta.url if you need true __dirname
const ENV = process.env.ENV ?? 'prod';
dotenv.config({ path: path.resolve(process.cwd(), `.env.${ENV}`) })

export default defineConfig({
    testDir: './tests',
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    workers: process.env.CI ? 1 : undefined,
    reporter: 'html',
    use: {
        baseURL: process.env.BASE_URL,
        headless: true,
        trace: 'on-first-retry',
    },

    projects: [
        { name: 'Chromium', use: { ...devices['Desktop Chrome'] } },
        { name: 'Firefox',  use: { ...devices['Desktop Firefox'] } },
        { name: 'WebKit',   use: { ...devices['Desktop Safari'] } },
    ],
});