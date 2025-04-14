import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/login.page';
import { InventoryPage } from './pages/inventory.page';
import { CartPage } from './pages/cart.page';
import { AxeBuilder } from '@axe-core/playwright';

test.describe('Accessibility Tests', () => {
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

    test('login page accessibility', async ({ page }) => {
        await loginPage.navigate();
        const accessibilityResults = await new AxeBuilder({ page }).analyze();
        expect(accessibilityResults.violations).toHaveLength(0);
    });

    test('inventory page accessibility', async ({ page }) => {
        const accessibilityResults = await new AxeBuilder({ page }).analyze();
        expect(accessibilityResults.violations).toHaveLength(0);
    });

    test('cart page accessibility', async ({ page }) => {
        await inventoryPage.addItemsToCart([0, 1]);
        await inventoryPage.goToCart();
        const accessibilityResults = await new AxeBuilder({ page }).analyze();
        expect(accessibilityResults.violations).toHaveLength(0);
    });
}); 