import { test } from '@playwright/test';
import { HomePage } from '@/pages/home.page';

test.describe('Homepage Primary Sections Visibility Tests', { tag: '@smoke' }, () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.goto();
  });

  test(
    'shows the main homepage content sections',
    {
      annotation: [
        {
          type: 'Description',
          description:
            'Verifies that the primary homepage content sections are visible and have the expected headings.',
        },
      ],
    },
    async () => {
      await test.step('Navigate to Expertise section and verify the section heading is visible and correct', async () => {
        await homePage.goToExpertiseSection();
        await homePage.verifyExpertiseSectionComplete();
      });

      await test.step('Navigate to CTA section and verify the section heading is visible and correct', async () => {
        await homePage.goToCTASection();
        await homePage.verifyCTASectionComplete();
      });
    },
  );
});
