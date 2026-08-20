import { Page, Locator } from '@playwright/test';
import { EXPECTED_VALUES } from '@/data/expected-values';

interface NavigationElements {
  expertiseSectionNavigation: Locator;
  aboutPageNavigation: Locator;
  contactNavigation: Locator;
}

interface CTANavigationElements {
  heroTalkButton: Locator;
  heroExpertiseButton: Locator;
  ctaContactLink: Locator;
}

interface MainSectionIds {
  expertiseSection: Locator;
  ctaSection: Locator;
}

interface SectionPrimaryHeadingsIds {
  expertiseSectionHeading: Locator;
  ctaSectionHeading: Locator;
}

export abstract class BasePage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async getCurrentUrl(): Promise<string> {
    return this.page.url();
  }

  async getPageTitle(): Promise<string> {
    const pageTitle = await this.page.title();
    return pageTitle;
  }

  async getExpectedPageTitle(): Promise<string> {
    const expectedPageTitle = EXPECTED_VALUES.homePage.title;
    return expectedPageTitle;
  }

  async goto(path = '/'): Promise<void> {
    await this.page.goto(path);
  }

  getNavigationElementsIds(): NavigationElements {
    return {
      expertiseSectionNavigation: this.page.getByTestId('nav-expertise'),
      aboutPageNavigation: this.page.getByTestId('nav-about'),
      contactNavigation: this.page.getByTestId('nav-contact'),
    };
  }

  getCtaButtonIds(): CTANavigationElements {
    return {
      heroTalkButton: this.page.getByTestId('hero-cta-talk-button'),
      heroExpertiseButton: this.page.getByTestId('hero-expertise-cta-button'),
      ctaContactLink: this.page.getByTestId('section-cta-contactLink'),
    };
  }

  getMainSectionIds(): MainSectionIds {
    return {
      expertiseSection: this.page.getByTestId('section-expertise'),
      ctaSection: this.page.getByTestId('section-cta'),
    };
  }

  getSectionPrimaryHeadingsIds(): SectionPrimaryHeadingsIds {
    return {
      expertiseSectionHeading: this.page.getByTestId('section-expertise-heading'),
      ctaSectionHeading: this.page.getByTestId('section-cta-primaryHeading'),
    };
  }

  // Abstract Navigation Methods - Must be implemented by subclasses
  abstract goToExpertiseSection(): Promise<void>;
  abstract goToCTASection(): Promise<void>;
}
