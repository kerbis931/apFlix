import { test } from '@playwright/test';

import { fillPreferencesAndSubmit, verifyCorrectHistoryItem, verifyLastRecommendations, verifyRecommendation, verifyWelcomeMessage } from '@app/tests/helpers';

const userInput = 'I want a romantic movie';

test.describe('Main Form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display welcome message', async ({ page }) => {
    await verifyWelcomeMessage(page);
  });

  test('should submit form and display recommendation', async ({ page }) => {
    await fillPreferencesAndSubmit(page, userInput);
    await verifyRecommendation(page);
  });

  test('should display Recommendations history', async ({ page }) => {
    await fillPreferencesAndSubmit(page, userInput);
    await verifyLastRecommendations(page);
  });

  test('should display correct history item', async ({ page }) => {
    const otherUserInput = 'horror movie';
    await page.reload();
    await fillPreferencesAndSubmit(page, otherUserInput);
    await page.waitForTimeout(2000); // wait for 1 second for demo purposes
    await page.reload();
    await verifyCorrectHistoryItem(page);
  });
});
