import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/login.page';
import { InventoryPage } from './pages/inventory.page';
import { CartPage } from './pages/cart.page';

test.describe('Checkout Journey Tests', () => {
    let loginPage: LoginPage;
    let inventoryPage: InventoryPage;
    let cartPage: CartPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        inventoryPage = new InventoryPage(page);
        cartPage = new CartPage(page);
        await loginPage.navigate();
        await loginPage.login('standard_user', 'secret_sauce');
    });

    test('should complete checkout journey with multiple items', async () => {
        // Add multiple items to cart
        await inventoryPage.addItemsToCart([0, 1, 2]);
        expect(await inventoryPage.getCartItemCount()).toBe(3);

        // Go to cart and verify items
        await inventoryPage.goToCart();
        const cartItems = await cartPage.getCartItems();
        expect(cartItems.length).toBe(3);

        // Proceed to checkout
        await cartPage.proceedToCheckout();

        // Fill checkout information
        await cartPage.fillCheckoutInformation('John', 'Doe', '12345');

        // Complete checkout
        await cartPage.completeCheckout();

        // Verify order completion
        const completeHeader = await cartPage.getCompleteHeader();
        expect(completeHeader).toContain('THANK YOU FOR YOUR ORDER');
    });
}); 