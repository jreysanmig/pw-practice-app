import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ['json', {outputFile:'test-results/report.json'}],
    ['junit', {outputFile:'test-results/report.xml'}],
    // ['allure-playwright'],
    ['html']
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: 'http://localhost:4200/',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    // actionTimeout: 5000,
    // navigationTimeout: 5000,
    video: {
      mode: 'off',
      size: {width:1920, height:1080}
    }
  },
  // globalTimeout: 2*60*60*1000, // for overall test execution
  // timeout: 5000, //testTimeout - for each test
  // expect: {
  //   timeout: 10000 // expectTimeout - for expect/assertion command
  // },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'qa',
      use: { 
        ...devices['Desktop Chrome'],
        baseURL: 'https://playwright.dev/'
      },
    },
    {
      name: 'stg',
      use: { 
        ...devices['Desktop Chrome'],
        baseURL: 'https://www.npmjs.com/'
      },
    },
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'mobile-chrome',
      testMatch: 'test-mobile-web.spec.ts',
      use: {
        ...devices['iPhone 15 Pro Max'],
        browserName: 'chromium'
      }
    }
  ],

  webServer: {
    command: 'npm run start',
    url: 'http://localhost:4200/'
  }
});
