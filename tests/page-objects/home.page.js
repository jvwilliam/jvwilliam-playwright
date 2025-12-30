import { BasePage } from './base.page';
import { expect } from '@playwright/test';

export class HomePage extends BasePage {
    constructor(page) {
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
        this.trainingSectionHeading = sectionHeadings.trainingsSectionHeading;
    }

    // Concrete Implementation of Abstract Navigation Methods

    /**
     * Navigate to the Services section by clicking the nav link and scrolling into view.
     * @returns {Promise<void>}
     */
    async goToServicesSection() {
        const { servicesSectionNavigation } = this.getNavigationElementsIds();
        await servicesSectionNavigation.click();
        await this.servicesSection.scrollIntoViewIfNeeded();
    }

    /**
     * Navigate to the Experience section by clicking the nav link and scrolling into view.
     * @returns {Promise<void>}
     */
    async goToExperienceSection() {
        const { experienceSectionNavigation } = this.getNavigationElementsIds();
        await experienceSectionNavigation.click();
        const { experienceSection } = this.getMainSectionIds();
        await experienceSection.scrollIntoViewIfNeeded();
    }

    /**
     * Navigate to the Skills section by clicking the nav link and scrolling into view.
     * @returns {Promise<void>}
     */
    async goToSkillsSection() {
        const { skillsSectionNavigation } = this.getNavigationElementsIds();
        await skillsSectionNavigation.click();
        const { skillsSection } = this.getMainSectionIds();
        await skillsSection.scrollIntoViewIfNeeded();
    }

    /**
     * Navigate to the Trainings section by clicking the nav link and scrolling into view.
     * @returns {Promise<void>}
     */
    async goToTrainingsSection() {
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

    async verifySectionVisible(sectionLocator) {
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
            this.trainingSectionHeading,
            this.getExpectedValues().pHeadings.trainingsSection
        );
    }
}