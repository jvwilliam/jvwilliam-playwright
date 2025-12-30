import { expect } from '@playwright/test';
import { getPath } from '../utils/path-helper';
import fs from 'fs';

/**
 * @template T
 */
export class BasePage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;
    }

    /**
     * @returns A List of Expected Values defined from the expected-values.json
     */
    getExpectedValues() {
        const dataPath = getPath('expected-values.json');
        const rawData = fs.readFileSync(dataPath, 'utf-8');
        const expectedValuesData = JSON.parse(rawData)
        
        return expectedValuesData;
    }

    async getCurrentUrl() {
        return this.page.url();
    }

    async getPageTitle() {
        const pageTitle = await this.page.title();
        return pageTitle;
    }

    async getExpectedPageTitle() {
        const expectedPageTitle = this.getExpectedValues().pageTitle;
        return expectedPageTitle;
    }

    async goto(path = '/') {
        await this.page.goto(path);
    }

    getNavigationElementsIds() {
        return {
            aboutSectionNavigation: this.page.getByTestId('nav-about'),
            servicesSectionNavigation: this.page.getByTestId('nav-services'),
            experienceSectionNavigation: this.page.getByTestId('nav-experience'),
            skillsSectionNavigation: this.page.getByTestId('nav-skills'),
            trainingsSectionNavigation: this.page.getByTestId('nav-trainings')
        }
    }

    getMainSectionIds() {
        return {
            aboutSection: this.page.getByTestId('section-about'),
            servicesSection: this.page.getByTestId('section-services'),
            experienceSection: this.page.getByTestId('section-experience'),
            skillsSection: this.page.getByTestId('section-competency'),
            trainingsSection: this.page.getByTestId('section-trainings')
        }
    }

    getSectionPrimaryHeadingsIds() {
        return {
            aboutSectionHeading: this.page.getByTestId('section-about-heading'),
            servicesSectionHeading: this.page.getByTestId('section-services-heading'),
            experienceSectionHeading: this.page.getByTestId('section-experience-primaryHeading'),
            skillsSectionHeading: this.page.getByTestId('section-skills-primaryHeading'),
            trainingsSectionHeading: this.page.getByTestId('section-trainings-primaryHeading')
        }
    }

    // Abstract Navigation Methods - Must be implemented by subclasses

    /**
     * Navigate to the Services section.
     * Subclasses must implement this to handle their specific navigation flow.
     * @abstract
     * @returns {Promise<void>}
     */
    async goToServicesSection() {
        throw new Error('goToServicesSection() must be implemented in subclass');
    }

    /**
     * Navigate to the Experience section.
     * Subclasses must implement this to handle their specific navigation flow.
     * @abstract
     * @returns {Promise<void>}
     */
    async goToExperienceSection() {
        throw new Error('goToExperienceSection() must be implemented in subclass');
    }

    /**
     * Navigate to the Skills section.
     * Subclasses must implement this to handle their specific navigation flow.
     * @abstract
     * @returns {Promise<void>}
     */
    async goToSkillsSection() {
        throw new Error('goToSkillsSection() must be implemented in subclass');
    }

    /**
     * Navigate to the Trainings section.
     * Subclasses must implement this to handle their specific navigation flow.
     * @abstract
     * @returns {Promise<void>}
     */
    async goToTrainingsSection() {
        throw new Error('goToTrainingsSection() must be implemented in subclass');
    }

    
}