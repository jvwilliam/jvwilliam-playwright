import { test, expect } from '@playwright/test';
import { HomePage } from '@/pages/home.page';

test.describe('Homepage visual regression', { tag: '@visual' }, () => {
  test.use({
    viewport: { width: 1440, height: 900 },
    colorScheme: 'light',
    contextOptions: {
      reducedMotion: 'reduce',
    },
  });

  test('Shows the expected hero and navigation', async ({ page }) => {
    const homePage = new HomePage(page);

    await homePage.goto();
    await homePage.verifyHeroSectionComplete();
    await homePage.verifyNavigationComplete();
    await page.evaluate(() => document.fonts.ready);

    await page.addStyleTag({
      content: 'body { background-attachment: scroll !important; }',
    });

    await expect(page).toHaveScreenshot('homepage-desktop.png', {
      fullPage: true,
      mask: [page.getByTestId('moving-text')],
    });
  });
});
