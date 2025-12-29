import { BasePage } from './base.page';
import { expect } from '@playwright/test';

export class HomePage extends BasePage {
    constructor(page) {
        super(page);
        //this.nav = this.locator('nav.primary');
        //this.hero = this.locator('section-hero');
    }

    async goto() {
        await super.goto('/');
    }

    async checkPageTitle() {
        const pageTitle = await this.getPageTitle();
        const expectedPageTitle = await this.getExpectedPageTitle();

        expect(pageTitle).toBe(expectedPageTitle);
    }
}