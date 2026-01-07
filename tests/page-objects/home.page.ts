import { BasePage } from './base.page';
import { expect, type Locator, type Page } from '@playwright/test';

export class HomePage extends BasePage {

    // Locator fields
    aboutSection: Locator;
    servicesSection: Locator;
    experienceSection: Locator;
    skillsSection: Locator;
    trainingsSection: Locator;

    aboutSectionHeading: Locator;
    servicesSectionHeading: Locator;
    experienceSectionHeading: Locator;
    skillsSectionHeading: Locator;
    trainingsSectionHeading: Locator;

    constructor(page: Page) {
        super(page);
        const sections = this.getMainSectionIds();
        this.aboutSection = sections.aboutSection;
        this.servicesSection = sections.servicesSection;
        this.experienceSection = sections.experienceSection;
        this.skillsSection = sections.skillsSection;
        this.trainingsSection = sections.trainingsSection;

        const sectionHeadings = this.getSectionPrimaryHeadingsIds();
        this.aboutSectionHeading = sectionHeadings.aboutSectionHeading;
        this.servicesSectionHeading = sectionHeadings.servicesSectionHeading;
        this.experienceSectionHeading = sectionHeadings.experienceSectionHeading;
        this.skillsSectionHeading = sectionHeadings.skillsSectionHeading;
        this.trainingsSectionHeading = sectionHeadings.trainingsSectionHeading;
    }

    // Concrete Implementation of Abstract Navigation Methods

    /**
     * Navigate to the Services section by clicking the nav link and scrolling into view.
     * @returns {Promise<void>}
     */
    async goToServicesSection(): Promise<void> {
        const { servicesSectionNavigation } = this.getNavigationElementsIds();
        await servicesSectionNavigation.click();
        await this.servicesSection.scrollIntoViewIfNeeded();
    }

    /**
     * Navigate to the Experience section by clicking the nav link and scrolling into view.
     * @returns {Promise<void>}
     */
    async goToExperienceSection(): Promise<void> {
        const { experienceSectionNavigation } = this.getNavigationElementsIds();
        await experienceSectionNavigation.click();
        const { experienceSection } = this.getMainSectionIds();
        await experienceSection.scrollIntoViewIfNeeded();
    }

    /**
     * Navigate to the Skills section by clicking the nav link and scrolling into view.
     * @returns {Promise<void>}
     */
    async goToSkillsSection(): Promise<void> {
        const { skillsSectionNavigation } = this.getNavigationElementsIds();
        await skillsSectionNavigation.click();
        const { skillsSection } = this.getMainSectionIds();
        await skillsSection.scrollIntoViewIfNeeded();
    }

    /**
     * Navigate to the Trainings section by clicking the nav link and scrolling into view.
     * @returns {Promise<void>}
     */
    async goToTrainingsSection(): Promise<void> {
        const { trainingsSectionNavigation } = this.getNavigationElementsIds();
        await trainingsSectionNavigation.click();
        const { trainingsSection } = this.getMainSectionIds();
        await trainingsSection.scrollIntoViewIfNeeded();
    }

    async goto() {
        await super.goto('/');
    }

    async checkPageTitle() {
        const pageTitle = await this.getPageTitle();
        const expectedPageTitle = await this.getExpectedPageTitle();

        expect(pageTitle).toBe(expectedPageTitle);
    }

    async verifySectionVisible(sectionLocator: Locator): Promise<void> {
        await expect(sectionLocator).toBeInViewport();
    }

    async verifySectionHeading(headingLocator: Locator, expectedText: string): Promise<void> {
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

    async verifyExperienceSectionComplete() {
        await this.verifySectionVisible(this.experienceSection);
        await this.verifySectionHeading(
            this.experienceSectionHeading,
            this.getExpectedValues().pHeadings.experienceSection
        );
    }

    async verifySkillsSectionComplete() {
        await this.verifySectionVisible(this.skillsSection);
        await this.verifySectionHeading(
            this.skillsSectionHeading,
            this.getExpectedValues().pHeadings.skillsSection
        );
    }

    async verifyTrainingsSectionComplete() {
        await this.verifySectionVisible(this.trainingsSection);
        await this.verifySectionHeading(
            this.trainingsSectionHeading,
            this.getExpectedValues().pHeadings.trainingsSection
        );
    }
}