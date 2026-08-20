import { BasePage } from '@/pages/base.page';
import { expect, type Locator, type Page } from '@playwright/test';
import { EXPECTED_VALUES } from '@/data/expected-values';

export class HomePage extends BasePage {
  // Locator fields
  expertiseSection: Locator;
  ctaSection: Locator;

  heroHeading: Locator;
  expertiseSectionHeading: Locator;
  ctaSectionHeading: Locator;

  constructor(page: Page) {
    super(page);
    const sections = this.getMainSectionIds();
    this.expertiseSection = sections.expertiseSection;
    this.ctaSection = sections.ctaSection;

    const sectionHeadings = this.getSectionPrimaryHeadingsIds();
    this.heroHeading = page.getByRole('heading', {
      level: 1,
      name: EXPECTED_VALUES.homePage.heroHeading,
    });
    this.expertiseSectionHeading = sectionHeadings.expertiseSectionHeading;
    this.ctaSectionHeading = sectionHeadings.ctaSectionHeading;
  }

  // Concrete Implementation of Abstract Navigation Methods

  /**
   * Navigate to the Services section by clicking the nav link and scrolling into view.
   * @returns {Promise<void>}
   */
  async goToExpertiseSection(): Promise<void> {
    const { expertiseSectionNavigation } = this.getNavigationElementsIds();
    await expertiseSectionNavigation.click();
    await this.expertiseSection.scrollIntoViewIfNeeded();
  }

  /**
   * Navigate to CTA Section by scrolling into view.
   * @returns {Promise<void>}
   */
  async goToCTASection(): Promise<void> {
    await this.ctaSection.scrollIntoViewIfNeeded();
  }

  async goto() {
    await super.goto('/');
  }

  async checkPageTitle() {
    const pageTitle = await this.getPageTitle();
    const expectedPageTitle = await this.getExpectedPageTitle();

    expect(pageTitle).toBe(expectedPageTitle);
  }

  async checkCurrentUrl() {
    await expect(this.page).toHaveURL('/');
  }

  async verifySectionVisible(sectionLocator: Locator): Promise<void> {
    await expect(sectionLocator).toBeInViewport();
  }

  async verifySectionHeading(headingLocator: Locator, expectedText: string): Promise<void> {
    await expect(headingLocator).toHaveText(expectedText);
  }

  // Page-level assertions

  async verifyHeroSectionComplete() {
    const { heroTalkButton, heroExpertiseButton } = this.getCtaButtonIds();

    await expect(
      this.page.getByRole('link', { name: EXPECTED_VALUES.homePage.brandName }),
    ).toBeVisible();
    await expect(this.heroHeading).toBeVisible();
    await expect(heroTalkButton).toBeVisible();
    await expect(heroExpertiseButton).toBeVisible();
    await this.verifyContactLink(heroTalkButton);
  }

  async verifyExpertiseSectionComplete() {
    await this.verifySectionVisible(this.expertiseSection);
    await this.verifySectionHeading(
      this.expertiseSectionHeading,
      EXPECTED_VALUES.homePage.pHeadings.expertiseSection,
    );
  }

  async verifyCTASectionComplete() {
    const { ctaContactLink } = this.getCtaButtonIds();

    await this.verifySectionVisible(this.ctaSection);
    await this.verifySectionHeading(
      this.ctaSectionHeading,
      EXPECTED_VALUES.homePage.pHeadings.ctaSection,
    );
    await expect(this.page.getByTestId('section-cta-copy')).toBeVisible();
    await expect(ctaContactLink).toBeVisible();
    await this.verifyContactLink(ctaContactLink);
  }

  async verifyNavigationComplete() {
    const { expertiseSectionNavigation, aboutPageNavigation, contactNavigation } =
      this.getNavigationElementsIds();

    await expect(expertiseSectionNavigation).toBeVisible();
    await expect(expertiseSectionNavigation).toHaveAttribute('href', '#section-expertise');
    await expect(aboutPageNavigation).toBeVisible();
    await expect(aboutPageNavigation).toHaveAttribute('href', '/about/');
    await expect(contactNavigation).toBeVisible();
    await this.verifyContactLink(contactNavigation);
  }

  async verifyHeroExpertiseCtaNavigatesToExpertise() {
    const { heroExpertiseButton } = this.getCtaButtonIds();

    await heroExpertiseButton.click();
    await expect(this.page).toHaveURL(/#section-expertise$/);
    await this.verifyExpertiseSectionComplete();
  }

  async verifyContactLink(contactLink: Locator) {
    await expect(contactLink).toHaveAttribute('href', /^mailto:/);
    await expect(contactLink).toHaveAttribute(
      'href',
      new RegExp(EXPECTED_VALUES.homePage.contactDetails),
    );
    await expect(contactLink).toHaveAttribute(
      'href',
      new RegExp(EXPECTED_VALUES.homePage.contactLinkSubject.replace(/ /g, '\\+')),
    );
  }
}
