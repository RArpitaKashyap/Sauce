import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/login.page';
import { InventoryPage } from './pages/inventory.page';

test.describe('Inventory Sorting Tests', () => {
    let loginPage: LoginPage;
    let inventoryPage: InventoryPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        inventoryPage = new InventoryPage(page);
        await loginPage.navigate();
        await loginPage.login('standard_user', 'secret_sauce');
        
        // Wait for the inventory page to load
        await page.waitForLoadState('networkidle');
    });

    test('should sort items by name Z to A', async ({ page }) => {
        // Select the Z to A option
        await page.selectOption('[data-test="product_sort_container"]', 'za');
        
        // Wait for the sorting to take effect
        await page.waitForTimeout(500);
        
        // Get all item names
        const itemNames = await page.$$eval('.inventory_item_name', elements => 
            elements.map(el => el.textContent || ''));
        
        // Verify the items are sorted Z to A
        const sortedNames = [...itemNames].sort().reverse();
        expect(itemNames).toEqual(sortedNames);
    });

    test('should sort items by price high to low', async ({ page }) => {
        // Select the high to low option
        await page.selectOption('[data-test="product_sort_container"]', 'hilo');
        
        // Wait for the sorting to take effect
        await page.waitForTimeout(500);
        
        // Get all item prices
        const itemPrices = await page.$$eval('.inventory_item_price', elements => 
            elements.map(el => parseFloat(el.textContent?.replace('$', '') || '0')));
        
        // Verify the items are sorted high to low
        const sortedPrices = [...itemPrices].sort((a, b) => b - a);
        expect(itemPrices).toEqual(sortedPrices);
    });
}); 