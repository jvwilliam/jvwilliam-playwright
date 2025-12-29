import { BasePage } from './base.page';

export class HomePage extends BasePage {
    constructor(page) {
        super(page);
        //this.nav = this.locator('nav.primary');
        //this.hero = this.locator('section-hero');
    }

    async goto() {
        await super.goto('/');
    }
}