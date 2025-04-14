import { test, expect } from '@playwright/test';

test.describe('Form Submission Tests', () => {
    test('should authenticate user via form submission', async ({ page }) => {
        await page.goto('https://www.saucedemo.com/');
        const response = await page.request.post('https://www.saucedemo.com/login', {
            form: {
                user_name: 'standard_user',
                password: 'secret_sauce'
            }
        });
        
        expect(response.ok()).toBeTruthy();
        expect(response.status()).toBe(200);
    });

    test('should get inventory page after login', async ({ page }) => {
        // First authenticate
        await page.goto('https://www.saucedemo.com/');
        await page.fill('#user-name', 'standard_user');
        await page.fill('#password', 'secret_sauce');
        await page.click('#login-button');
        
        // Verify we're on the inventory page
        await expect(page).toHaveURL(/.*inventory.html/);
        
        // Get page content
        const content = await page.content();
        expect(content).toContain('inventory_item');
    });

    test('should handle invalid login', async ({ page }) => {
        await page.goto('https://www.saucedemo.com/');
        await page.fill('#user-name', 'invalid_user');
        await page.fill('#password', 'wrong_password');
        await page.click('#login-button');
        
        // Verify error message
        const errorMessage = await page.textContent('[data-test="error"]');
        expect(errorMessage).toContain('Epic sadface: Username and password do not match');
    });
}); 