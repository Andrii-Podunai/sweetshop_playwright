import { test, expect } from "../fixtures/fixtures";


test.describe('Sweet Shop - Basket Tests', () => {
    test('Add products to the basket and verify total price', async ({ homePage, basketPage, page }) => {

        await test.step('Ensure the website is accessible', async () => {
            const accessibilityReport = await page.accessibility.snapshot();
            expect(accessibilityReport).toBeTruthy();
        });

        // Adding 4 products to the basket
        const productsToAdd = [0, 1, 2, 3];
        await homePage.addProductsToBasket(productsToAdd);

        // Verifying that the basket count increases
        const basketCountText = await homePage.getBasketCount();
        expect(parseInt(basketCountText || '0')).toBe(4);

        // Navigate to the basket page
        await homePage.navigateToBasket();

        // Verifying that all 4 products are in the basket
        const productCount = await basketPage.getProductCount();
        expect(productCount).toBe(4);

        // Calculate and verify total price
        const calculatedTotalPrice = await basketPage.calculateTotalPrice();
        const displayedTotalText = await basketPage.getDisplayedTotal().textContent();
        const displayedTotal = parseFloat(displayedTotalText?.replace('£', '') || '0');
        expect(displayedTotal).toBe(calculatedTotalPrice);

        // Select Standard Shipping and verify the updated total price
        await basketPage.selectStandardShipping();

        await basketPage.selectStandardShipping();

        let expectedTotalPrice = calculatedTotalPrice + 1.99;
        const updatedTotalPrice = await basketPage.getUpdatedTotalPrice();

        // expect(updatedTotalPrice).toBe(expectedTotalPrice); // Uncomment this when bag is fixed

        // Define checkout data
        const checkoutData = {
            firstName: 'John',
            lastName: 'Brainee',
            email: 'john.brainee@example.com',
            address: '123 Sweet Street',
            country: 'United Kingdom',
            city: 'Bristol',
            zip: '35005',
            ccName: 'John Brainee',
            ccNumber: '4111111111111111',
            ccExpiration: '12/25',
            ccCVV: '123',
        };

        // Fill in the checkout form and submit
        await basketPage.fillCheckoutForm(checkoutData);
        await basketPage.submitCheckout();

        // Verify URL after checkout
        expect(page.url()).toContain('basket?');
    });
});
