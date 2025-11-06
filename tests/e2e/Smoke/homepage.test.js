// @ts-check

import {test, expect } from '@playwright/test'; 
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

test.describe('Smoke Test',
    //{tag: '@smoke'}, 
    () => {

    // Move this to a helper function
    test.beforeAll(() => {
        const envPath = path.resolve(__dirname, '.env');
        if(fs.existsSync(envPath)) {
            dotenv.config({ path: envPath });
            console.log('.env file loaded successfully.');
        } else {
            console.warn('.env file not found!');
        }
    });

    test('Initial Test', async ({page}) => {

        const baseUrl = process.env.BASE_URL;

        console.log(baseUrl);
        await page.goto('/');
    })

})