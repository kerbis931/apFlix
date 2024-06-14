import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './src/tests/e2e',
  timeout: 60000,
  expect: {
    timeout: 5000
  },
  fullyParallel: true,
  retries: 1,
  reporter: [['list'], ['json', { outputFile: './report/test-results.json' }], ['html', { outputFolder: './report/html', open: 'always' }], ['allure-playwright', { outputFolder: './report/allure-results' }]],
  outputDir: './report/test-results',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    video: 'on',
    screenshot: 'only-on-failure',
    headless: true
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] }
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] }
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] }
    }
  ],
  globalSetup: require.resolve('./src/tests/e2e/global-setup')
});
