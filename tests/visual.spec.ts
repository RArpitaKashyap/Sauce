import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/login.page';
import { InventoryPage } from './pages/inventory.page';
import { CartPage } from './pages/cart.page';

test.describe('Visual Tests', () => {
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

    test('login page visual comparison', async ({ page }) => {
        await loginPage.navigate();
        await expect(page).toHaveScreenshot('login-page.png');
    });

    test('inventory page visual comparison', async ({ page }) => {
        await expect(page).toHaveScreenshot('inventory-page.png');
    });

    test('cart page visual comparison', async ({ page }) => {
        await inventoryPage.addItemsToCart([0, 1]);
        await inventoryPage.goToCart();
        await expect(page).toHaveScreenshot('cart-page.png');
    });
}); 