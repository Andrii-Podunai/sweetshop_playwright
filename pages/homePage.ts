import { Page } from '@playwright/test';

export class HomePage {
    constructor(private page: Page) {}

    async addProductsToBasket(productIndexes: number[]) {
        for (const index of productIndexes) {
            await this.page.locator('a.btn.addItem').nth(index).click();
        }
    }

    getBasketCount() {
        return this.page.locator('a.nav-link[href="/basket"] .badge').textContent();
    }

    navigateToBasket() {
        return this.page.locator('a.nav-link[href="/basket"]').click();
    }

    async open() {
        await this.page.goto('https://sweetshop.netlify.app/');
    }
}
