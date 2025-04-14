import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/login.page';
import { InventoryPage } from './pages/inventory.page';
import { CartPage } from './pages/cart.page';

test.describe('Performance Tests', () => {
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

    test('should load inventory page within performance budget', async ({ page }) => {
        const startTime = Date.now();
        await page.reload();
        const loadTime = Date.now() - startTime;
        
        // Performance budget: 3 seconds
        expect(loadTime).toBeLessThan(3000);
        
        // Get performance metrics using modern Performance API
        const metrics = await page.evaluate(() => {
            const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
            const paint = performance.getEntriesByType('paint');
            const firstPaint = paint.find(entry => entry.name === 'first-paint');
            
            return {
                domContentLoaded: navigation.domContentLoadedEventEnd - navigation.startTime,
                load: navigation.loadEventEnd - navigation.startTime,
                firstPaint: firstPaint ? firstPaint.startTime : 0
            };
        });
        
        // Log metrics for monitoring
        console.log('Performance Metrics:', metrics);
        
        // Assert performance metrics
        expect(metrics.domContentLoaded).toBeLessThan(2000);
        expect(metrics.load).toBeLessThan(3000);
        expect(metrics.firstPaint).toBeLessThan(1000);
    });

    test('should maintain performance during checkout process', async ({ page }) => {
        // Add items to cart
        await inventoryPage.addItemsToCart([0, 1]);
        
        // Measure cart page load time
        const cartStartTime = Date.now();
        await inventoryPage.goToCart();
        const cartLoadTime = Date.now() - cartStartTime;
        expect(cartLoadTime).toBeLessThan(2000);
        
        // Measure checkout page load time
        const checkoutStartTime = Date.now();
        await cartPage.proceedToCheckout();
        const checkoutLoadTime = Date.now() - checkoutStartTime;
        expect(checkoutLoadTime).toBeLessThan(2000);
    });
}); 