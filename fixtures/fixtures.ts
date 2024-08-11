import { test as base, expect } from '@playwright/test';
import { BasketPage } from '../pages/basketPage';
import { HomePage } from '../pages/homePage';


export const test = base.extend<{
  homePage: HomePage;
  basketPage: BasketPage;
}>({
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await homePage.open();
    await use(homePage);
  },
  basketPage: async ({ page }, use) => {
    const basketPage = new BasketPage(page);
    await use(basketPage);
  },
});

export { expect };

