// @ts-check

import {test, expect } from '@playwright/test'; 
import { HomePage } from '../../page-objects/homepage-objects';

// This is an over complication to demonstrate how we can use the test.step function to organize and document the sections of the test code. 
// In this demonstration, each actions are wrapped in a test.step class making it easier to understand the flow and outcome of a "complex test suite".
// This also helps with the readability of the test report.


test.describe('Homepage Smoke Test',
    {tag: '@smoke'}, () => {

    /** @type {HomePage} */
    let homePage; 

    test.beforeEach(async ({page}) => {
        homePage = new HomePage(page);
        await homePage.goto();
    });

    test('Check for correct page title', {
        annotation: [
            { type: 'Description', description: 'Verifies that we are redirected to the correct landing page by comparing the page title and url from the expected values.' }
        ]} ,async () => {

        /** @type {string} */
        let pageTitle;
        /** @type {string} */
        let expectedPageTitle;

        test.step('Get the current page title', async () => {
            pageTitle = await homePage.getPageTitle();
            console.log(`Getting the current Page Title...${pageTitle}`);
        });

        test.step('Get the expected page title', async () => {
            expectedPageTitle = await homePage.getExpectedPageTitle();
            console.log(`Getting the expected Page Title...${expectedPageTitle}`);
        });

        test.step('Compare the current and expected values', async () => {
            expect(pageTitle).toBe(expectedPageTitle);
        });

    });

    test('Check the Main sections are visible', {
        annotation: [
            { type: 'Description', description: ''}
        ]} , async () => {

            const {
                aboutSection,
                servicesSection,
                experienceSection,
                skillsSection,
                trainingsSection
            } = homePage.getMainSectionIds();

            const {
                aboutSectionHeading,
                serviceSectionHeading,
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

            await test.step('On page load, verify that the About section is visible and has the correct heading', 
                async () => {
                    await expect(aboutSection).toBeInViewport();
                    await expect(aboutSectionHeading).toHaveText(`${expectedValues.pHeadings.aboutSection}`);
            });

            await test.step('Navigate to Services section and verify the section and heading is visible and correct',
                async () => {
                    await servicesSectionNavigation.click();
                    await expect(servicesSection).toBeInViewport();
                    await expect(serviceSectionHeading).toBeInViewport();
                    await expect(serviceSectionHeading).toHaveText(`${expectedValues.pHeadings.servicesSection}`);
            });

            await test.step('Navigate to Experience section and verify the section and heading is visible and correct', 
                async () => {
                    await experienceSectionNavigation.click();
                    await expect(experienceSection).toBeInViewport();
                    await expect(experienceSectionHeading).toBeInViewport();
                    await expect(experienceSectionHeading).toHaveText(`${expectedValues.pHeadings.experienceSection}`);
            });

            await test.step('Navigate to Skills section and verify the section and heading is visible and correct', 
                async () => {
                    await skillsSectionNavigation.click();
                    await expect(skillsSection).toBeInViewport();
                    await expect(skillsSectionHeading).toBeInViewport();
                    await expect(skillsSectionHeading).toHaveText(`${expectedValues.pHeadings.skillSection}`);
            });

            // add checks for trainings section
            await test.step('Navigate to Trainings section and verify the section and heading is visible and correct',
                async () => {
                    await trainingsSectionNavigation.click();
                    await expect(trainingsSection).toBeInViewport();
                    await expect(trainingsSectionHeading).toBeInViewport();
                    await expect(trainingsSectionHeading).toHaveText(`${expectedValues.pHeadings.trainingsSection}`);
            });

    });

    test.skip('Sandbox', async () => {

        //const expectedValues = homePage.getExpectedValues().pHeadings.aboutSection;
        const expectedValues = homePage.getExpectedValues();
        const testVariable = expectedValues.pHeadings.aboutSection;

        console.log(`About Section Primary Heading: ${testVariable}`);


    })

})