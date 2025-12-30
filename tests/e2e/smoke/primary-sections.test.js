// @ts-check

import { test, expect } from '@playwright/test';
import { HomePage } from '../../page-objects/home.page';

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

            await test.step('On page load, verify that the About section is visible and has the correct heading.', async () => {
                await homePage.verifyAboutSectionComplete();
            });

            await test.step('Navigate to Services section and verify the section Heading is visible and correct.', async () => {
                await homePage.goToServicesSection();
                await homePage.verifyServicesSectionComplete();
            });

            await test.step('Navigate to Experience section and verify the section Heading is visible and correct.', async () => {
                await homePage.goToExperienceSection();
                await homePage.verifyExperienceSectionComplete();
            });

            await test.step('Navigate to Skills section and verify the section Heading is visible and correct', async () => {
                await homePage.goToSkillsSection();
                await homePage.verifySkillsSectionComplete();
            });

            await test.step('Navigate to Trainings section and verify the section Heading is visible and correct', async () => {
                //await trainingsSectionNavigation.click();
                await homePage.goToTrainingsSection();
                await homePage.verifyTrainingsSectionComplete();
            });

        });
});