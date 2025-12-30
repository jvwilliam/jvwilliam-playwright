import { BasePage } from './base.page';
import { expect } from '@playwright/test';

export class HomePage extends BasePage {
    constructor(page) {
        super(page);
        const sections = this.getMainSectionIds();
        this.aboutSection = sections.aboutSection;
        this.servicesSection = sections.servicesSection;

        const sectionHeadings = this.getSectionPrimaryHeadingsIds();
        this.aboutSectionHeading = sectionHeadings.aboutSectionHeading;
        this.servicesSectionHeading = sectionHeadings.servicesSectionHeading;
        //this.nav = this.locator('nav.primary');
        //this.hero = this.locator('section-hero');
    }

    async goto() {
        await super.goto('/');
    }

    async checkPageTitle() {
        const pageTitle = await this.getPageTitle();
        const expectedPageTitle = await this.getExpectedPageTitle();

        expect(pageTitle).toBe(expectedPageTitle);
    }

    async verifySectionVisible(sectionLocator) {
        await sectionLocator.scrollIntoViewIfNeeded();
        await expect(sectionLocator).toBeInViewport();
    }

    async verifySectionHeading(headingLocator, expectedText) {
        await expect(headingLocator).toHaveText(expectedText);
    }

    // Page-level assertions

    async verifyAboutSectionComplete() {
        await this.verifySectionVisible(this.aboutSection);
        await this.verifySectionHeading(
            this.aboutSectionHeading,
            this.getExpectedValues().pHeadings.aboutSection
        );
    }

    async verifyServicesSectionComplete() {
        await this.verifySectionVisible(this.servicesSection);
        await this.verifySectionHeading(
            this.servicesSectionHeading,
            this.getExpectedValues().pHeadings.servicesSection
        );
    }
}