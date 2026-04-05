import { Page, Locator } from '@playwright/test';
import { getPath } from '../utils/path-helper';
import fs from 'fs';

interface PHeadings {
    aboutSection: string;
    expertiseSection: string;
    experienceSection: string;
    skillsSection: string;
    trainingsSection: string;
    ctaSection: string;
}

interface ExpectedValues {
    pageTitle: string;
    contactDetails: string;
    pHeadings: PHeadings;
}

interface NavigationElements {
    aboutSectionNavigation: Locator;
    expertiseSectionNavigation: Locator;
    experienceSectionNavigation: Locator;
    skillsSectionNavigation: Locator;
    trainingsSectionNavigation: Locator;
}

interface CTANavigationElements {
    heroServicesButton: Locator;
    heroCTAButton: Locator;
}

interface MainSectionIds {
    aboutSection: Locator;
    expertiseSection: Locator;
    experienceSection: Locator;
    skillsSection: Locator;
    trainingsSection: Locator;
    ctaSection: Locator;
}

interface SectionPrimaryHeadingsIds {
    aboutSectionHeading: Locator;
    expertiseSectionHeading: Locator;
    experienceSectionHeading: Locator;
    skillsSectionHeading: Locator;
    trainingsSectionHeading: Locator;
    ctaSectionHeading: Locator;
}

export abstract class BasePage {
    protected page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    /**
     * @returns A List of Expected Values defined from the expected-values.json
     */
    getExpectedValues(): ExpectedValues {
        const dataPath = getPath('expected-values.json');
        const rawData = fs.readFileSync(dataPath, 'utf-8');
        return JSON.parse(rawData) as ExpectedValues;
    }

    async getCurrentUrl(): Promise<string> {
        return this.page.url();
    }

    async getPageTitle(): Promise<string> {
        const pageTitle = await this.page.title();
        return pageTitle;
    }

    async getExpectedPageTitle(): Promise<string> {
        const expectedPageTitle = this.getExpectedValues().pageTitle;
        return expectedPageTitle;
    }

    async goto(path = '/'): Promise<void> {
        await this.page.goto(path);
    }

    getNavigationElementsIds(): NavigationElements {
        return {
            aboutSectionNavigation: this.page.getByTestId('nav-about'),
            expertiseSectionNavigation: this.page.getByTestId('nav-expertise'),
            experienceSectionNavigation: this.page.getByTestId('nav-experience'),
            skillsSectionNavigation: this.page.getByTestId('nav-skills'),
            trainingsSectionNavigation: this.page.getByTestId('nav-trainings')
        }
    }

    getCtaButtonIds(): CTANavigationElements {
        return {
            heroServicesButton: this.page.getByTestId('hero-expertise-cta-button'),
            heroCTAButton: this.page.getByTestId('hero-cta-cta-button'),
        }
    } 

    getMainSectionIds(): MainSectionIds {
        return {
            aboutSection: this.page.getByTestId('section-about'),
            expertiseSection: this.page.getByTestId('section-expertise'),
            experienceSection: this.page.getByTestId('section-experience'),
            skillsSection: this.page.getByTestId('section-competency'),
            trainingsSection: this.page.getByTestId('section-trainings'),
            ctaSection: this.page.getByTestId('section-cta'),
        }
    }

    getSectionPrimaryHeadingsIds(): SectionPrimaryHeadingsIds {
        return {
            aboutSectionHeading: this.page.getByTestId('section-about-heading'),
            expertiseSectionHeading: this.page.getByTestId('section-expertise-heading'),
            experienceSectionHeading: this.page.getByTestId('section-experience-primaryHeading'),
            skillsSectionHeading: this.page.getByTestId('section-skills-primaryHeading'),
            trainingsSectionHeading: this.page.getByTestId('section-trainings-primaryHeading'),
            ctaSectionHeading: this.page.getByTestId('section-cta-primaryHeading'),
        }
    }

    // Abstract Navigation Methods - Must be implemented by subclasses
    abstract goToAboutSection(): Promise<void>;
    abstract goToExpertiseSection(): Promise<void>;
    abstract goToExperienceSection(): Promise<void>;
    abstract goToSkillsSection(): Promise<void>;
    abstract goToTrainingsSection(): Promise<void>;
    abstract goToCTASection(): Promise<void>;
    
}