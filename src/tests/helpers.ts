import { expect, Page, test } from '@playwright/test';

export async function slowFill(page: Page, selector: string, text: string) {
  await page.fill(selector, text);
  await page.waitForTimeout(1500); // wait for 1.5 seconds for demo purposes
}

export async function slowClick(page: Page, selector: string) {
  await page.click(selector);
  await page.waitForTimeout(2000); // wait for 2 seconds for demo purposes
}

export async function fillPreferencesAndSubmit(page: Page, userInput: string) {
  const preferenceInputTextarea = `textarea#user-preferences-input`;
  const submitRecommendationButton = 'button:has-text("Suggest")';

  await test.step('Fill the preference input', async () => {
    await slowFill(page, preferenceInputTextarea, userInput);
  });
  await test.step('Click the suggest button', async () => {
    await slowClick(page, submitRecommendationButton);
  });
}

export async function verifyWelcomeMessage(page: Page) {
  const errorMsg = 'Welcome message is not visible';
  const apflixWelcomeTextLocator = 'text=Welcome to APFlix';
  await test.step('Check for welcome message visibility', async () => {
    await expect(page.locator(apflixWelcomeTextLocator), { message: errorMsg }).toBeVisible({ timeout: 5000 });
  });
}

export async function verifyRecommendation(page: Page) {
  const errorMsg = 'Recommendation is not visible';
  const recommendationText = 'text=Recommendation:';
  await test.step('Check for recommendation visibility', async () => {
    await expect(page.locator(recommendationText), { message: errorMsg }).toBeVisible({ timeout: 10000 });
  });
}

export async function verifyLastRecommendations(page: Page) {
  const errorMsg = 'Last Recommendations section is not visible';
  const lastRecommendationsText = 'text=Last Recommendations';
  await test.step('Check for last recommendations visibility', async () => {
    await expect(page.locator(lastRecommendationsText), { message: errorMsg }).toBeVisible({ timeout: 10000 });
  });
}

export async function verifyCorrectHistoryItem(page: Page, userInput: string) {
  const errorMsg = 'History modal is not visible';
  const historyItemLocatorId = '#history-0';
  const historyModalLocator = '#history-modal';

  await test.step('Check the first history item visibility', async () => {
    const historyItemLocator = page.locator(historyItemLocatorId);
    await expect(historyItemLocator).toBeVisible({ timeout: 10000 });
    await historyItemLocator.click();
  });

  await test.step('Check the history modal content', async () => {
    const historyModal = page.locator(historyModalLocator);
    await expect(historyModal, { message: errorMsg }).toContainText(userInput, { timeout: 10000 });
  });
}
