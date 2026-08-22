import { test } from '@playwright/test';
import { HomePage } from '@/pages/home.page';

test.describe('Homepage Smoke Test', { tag: '@smoke' }, () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.goto();
  });

  test(
    'loads the homepage with the expected hero and navigation',
    {
      annotation: [
        {
          type: 'Description',
          description:
            'Verifies the homepage title, URL, hero content, and primary navigation are visible and correct.',
        },
      ],
    },

    async () => {
      await test.step('Verify the page loaded at the expected local route', async () => {
        await homePage.checkCurrentUrl();
        await homePage.checkPageTitle();
      });

      await test.step('Verify the hero content and calls to action are visible', async () => {
        await homePage.verifyHeroSectionComplete();
      });

      await test.step('Verify the header navigation links are visible and correctly configured', async () => {
        await homePage.verifyNavigationComplete();
      });
    },
  );

  test(
    'navigates to expertise content from the hero CTA',
    {
      annotation: [
        {
          type: 'Description',
          description:
            'Verifies the View Expertise hero CTA updates the URL fragment and scrolls the Expertise section into view.',
        },
      ],
    },

    async () => {
      await homePage.verifyHeroExpertiseCtaNavigatesToExpertise();
    },
  );

  test(
    'shows the final contact CTA with a valid email link',
    {
      annotation: [
        {
          type: 'Description',
          description:
            'Verifies the final homepage CTA is visible and exposes the expected mailto contact details.',
        },
      ],
    },

    async () => {
      await homePage.goToCTASection();
      await homePage.verifyCTASectionComplete();
    },
  );
});
