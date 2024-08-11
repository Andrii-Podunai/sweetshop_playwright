import { Page, Locator } from '@playwright/test';

export class BasketPage {
    private basketItems: Locator;
    private totalPriceLocator: Locator;
    private standardShippingOption: Locator;
    private checkoutFormLocators: { [key: string]: Locator };

    constructor(private page: Page) {
        this.basketItems = page.locator('#basketItems .lh-condensed');
        this.totalPriceLocator = page.locator('#basketItems .list-group-item strong');
        this.standardShippingOption = page.locator('input#exampleRadios2');
        this.checkoutFormLocators = {
            firstName: page.locator('input#name').nth(0),
            lastName: page.locator('input#name').nth(1),
            email: page.locator('input#email'),
            address: page.locator('input#address'),
            country: page.locator('select#country'),
            city: page.locator('select#city'),
            zip: page.locator('input#zip'),
            ccName: page.locator('input#cc-name'),
            ccNumber: page.locator('input#cc-number'),
            ccExpiration: page.locator('input#cc-expiration'),
            ccCVV: page.locator('input#cc-cvv'),
        };
    }

    async getProductCount() {
        await this.page.waitForEvent('load')
        return await this.basketItems.count();
    }

    async calculateTotalPrice(): Promise<number> {
        let totalPrice = 0;

        const itemCount = await this.basketItems.count();

        for (let i = 0; i < itemCount; i++) {
            const priceText = await this.basketItems.nth(i).locator('span.text-muted').textContent();
            const quantityText = await this.basketItems.nth(i).locator('small.text-muted').textContent();

            const price = parseFloat(priceText?.replace('£', '') || '0');
            const quantity = parseInt(quantityText?.replace('x ', '') || '0');

            totalPrice += price * quantity;
        }

        return totalPrice;
    }

    getDisplayedTotal() {
        return this.totalPriceLocator;
    }

    selectStandardShipping() {
        return this.standardShippingOption.click({ force: true });
    }

async fillCheckoutForm(data: {
        firstName: string;
        lastName: string;
        email: string;
        address: string;
        country: string;
        city: string;
        zip: string;
        ccName: string;
        ccNumber: string;
        ccExpiration: string;
        ccCVV: string;
    }) {
        await this.checkoutFormLocators.firstName.fill(data.firstName);
        await this.checkoutFormLocators.lastName.fill(data.lastName);
        await this.checkoutFormLocators.email.fill(data.email);
        await this.checkoutFormLocators.address.fill(data.address);
        await this.checkoutFormLocators.country.selectOption(data.country);
        await this.checkoutFormLocators.city.selectOption(data.city);
        await this.checkoutFormLocators.zip.fill(data.zip);
        await this.checkoutFormLocators.ccName.fill(data.ccName);
        await this.checkoutFormLocators.ccNumber.fill(data.ccNumber);
        await this.checkoutFormLocators.ccExpiration.fill(data.ccExpiration);
        await this.checkoutFormLocators.ccCVV.fill(data.ccCVV);
    }

    submitCheckout() {
        return this.page.locator('.needs-validation button[type="submit"]').click();
    }
}
