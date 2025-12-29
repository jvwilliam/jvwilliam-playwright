// @ts-check

import { test, expect } from '@playwright/test';
import { HomePage } from '../../page-objects/homepage-objects';

test.describe('Homepage Primary Sections Visibility Tests', 
    { tag: '@smoke' }, () => {

    
    /** @type {HomePage} */
    let homePage;

    test.beforeEach( async ({ page }) => {
        homePage = new HomePage(page);
        await homePage.goto();
    });

    test('Check the Main sections are visible', {
        annotation: [
            { type: 'Description', description: 'Verifies that all the primary sections on the homepage are visible to the user by clicking on the navigation links.'}
        ]}, async () => {

            const {
                aboutSection,
                servicesSection, 
                experienceSection,
                skillsSection,
                trainingsSection
            } = homePage.getMainSectionIds();

            const {
                aboutSectionHeading,
                servicesSectionHeading,
                experienceSectionHeading,
                skillsSectionHeading,
                trainingsSectionHeading
            } = homePage.getSectionPrimaryHeadingsIds();

            const {
                servicesSectionNavigation,
                experienceSectionNavigation,
                skillsSectionNavigation,
                trainingsSectionNavigation
            } = homePage.getNavigationElementsIds();

            const expectedValues = homePage.getExpectedValues();

            await test.step('On page load, verify that the About section is visible and has the correct heading.', async () => {
                await expect(aboutSection).toBeInViewport();
                await expect(aboutSectionHeading).toHaveText(`${expectedValues.pHeadings.aboutSection}`);
            });

            await test.step('Navigate to Services section and verify the section Heading is visible and correct.', async () => {
                await servicesSectionNavigation.click();
                await servicesSection.scrollIntoViewIfNeeded();
                await expect(servicesSection).toBeInViewport();
                await expect(servicesSectionHeading).toBeInViewport();
                await expect(servicesSectionHeading).toHaveText(`${expectedValues.pHeadings.servicesSection}`);
            });

            await test.step('Navigate to Experience section and verify the section Heading is visible and correct.', async () => {
                await experienceSectionNavigation.click();
                await experienceSection.scrollIntoViewIfNeeded();
                await expect(experienceSection).toBeInViewport();
                await expect(experienceSectionHeading).toBeInViewport();
                await expect(experienceSectionHeading).toHaveText(`${expectedValues.pHeadings.experienceSection}`);
            });

            await test.step('Navigate to Skills section and verify the section Heading is visible and correct', async () => {
                await skillsSectionNavigation.click();
                await skillsSection.scrollIntoViewIfNeeded();
                await expect(skillsSection).toBeInViewport();
                await expect(skillsSectionHeading).toBeInViewport();
                await expect(skillsSectionHeading).toHaveText(`${expectedValues.pHeadings.skillsSection}`);
            });

            await test.step('Navigate to Trainings section and verify the section Heading is visible and correct', async () => {
                await trainingsSectionNavigation.click();
                await trainingsSection.scrollIntoViewIfNeeded();
                await expect(trainingsSection).toBeInViewport();
                await expect(trainingsSectionHeading).toBeInViewport();
                await expect(trainingsSectionHeading).toHaveText(`${expectedValues.pHeadings.trainingsSection}`);
            });

        });


});