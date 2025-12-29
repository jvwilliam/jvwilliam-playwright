// @ts-check

import {test, expect } from '@playwright/test'; 
import { HomePage } from '../../page-objects/home(old).page';

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

    test.skip('Sandbox', async () => {

        //const expectedValues = homePage.getExpectedValues().pHeadings.aboutSection;
        const expectedValues = homePage.getExpectedValues();
        const testVariable = expectedValues.pHeadings.aboutSection;

        console.log(`About Section Primary Heading: ${testVariable}`);


    })

})