import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/login.page';
import { InventoryPage } from './pages/inventory.page';
import { CartPage } from './pages/cart.page';

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
        // Wait for the page to be fully loaded
        await page.waitForLoadState('networkidle');
        
        // Check for basic accessibility issues
        const heading = await page.locator('h4').textContent();
        expect(heading).toBeTruthy();
        
        // Check for form labels
        const usernameLabel = await page.locator('label[for="user-name"]').textContent();
        const passwordLabel = await page.locator('label[for="password"]').textContent();
        expect(usernameLabel).toBeTruthy();
        expect(passwordLabel).toBeTruthy();
    });

    test('inventory page accessibility', async ({ page }) => {
        // Wait for the page to be fully loaded
        await page.waitForLoadState('networkidle');
        
        // Check for basic accessibility issues
        const heading = await page.locator('h4').textContent();
        expect(heading).toBeTruthy();
        
        // Check for product images with alt text
        const productImages = await page.locator('.inventory_item_img img').all();
        for (const img of productImages) {
            const altText = await img.getAttribute('alt');
            expect(altText).toBeTruthy();
        }
    });

    test('cart page accessibility', async ({ page }) => {
        await inventoryPage.addItemsToCart([0, 1]);
        await inventoryPage.goToCart();
        
        // Wait for the page to be fully loaded
        await page.waitForLoadState('networkidle');
        
        // Check for basic accessibility issues
        const heading = await page.locator('h4').textContent();
        expect(heading).toBeTruthy();
        
        // Check for cart items
        const cartItems = await page.locator('.cart_item').count();
        expect(cartItems).toBeGreaterThan(0);
    });
}); 