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
    });

    test('should sort items by name Z to A', async () => {
        await inventoryPage.selectSortOption('za');
        const itemNames = await inventoryPage.getAllItemNames();
        const sortedNames = [...itemNames].sort().reverse();
        expect(itemNames).toEqual(sortedNames);
    });

    test('should sort items by price high to low', async () => {
        await inventoryPage.selectSortOption('hilo');
        const itemPrices = await inventoryPage.getAllItemPrices();
        const sortedPrices = [...itemPrices].sort((a, b) => b - a);
        expect(itemPrices).toEqual(sortedPrices);
    });
}); 