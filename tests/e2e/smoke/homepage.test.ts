
import { test } from '@playwright/test'; 
import { HomePage } from '../../page-objects/home.page';

// This is an over complication to demonstrate how we can use the test.step function to organize and document the sections of the test code. 
// In this demonstration, each actions are wrapped in a test.step class making it easier to understand the flow and outcome of a "complex test suite".
// This also helps with the readability of the test report.


test.describe('Homepage Smoke Test', 
    { tag: '@smoke' }, () => {

    let homePage: HomePage; 

    test.beforeEach(async ({page}) => {
        homePage = new HomePage(page);
        await homePage.goto();
    });

    test('Check the correct landing page is loaded.', 
        { 
            annotation: 
            [
                { 
                    type: 'Description', 
                    description: 'Verifies that we are redirected to the correct landing page by comparing the page title and url from the expected values.' 
                },
            ],
        },
        
        async () => {   
            let pageTitle: string;
            let expectedPageTitle: string;

            await test.step('Get the current page title', async () => {
                pageTitle = await homePage.getPageTitle();
                console.log(`Getting the current Page Title...${pageTitle}`);
            });

            await test.step('Get the expected page title', async () => {
                expectedPageTitle = await homePage.getExpectedPageTitle();
                console.log(`Getting the expected Page Title...${expectedPageTitle}`);
            });

            await test.step('Compare the current and expected values', async () => {
                await homePage.checkPageTitle();
            });
        });
});