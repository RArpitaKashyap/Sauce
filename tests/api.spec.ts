import { test, expect } from '@playwright/test';

test.describe('API Tests', () => {
    test('should authenticate user via API', async ({ request }) => {
        const response = await request.post('https://www.saucedemo.com/login', {
            data: {
                user_name: 'standard_user',
                password: 'secret_sauce'
            }
        });
        
        expect(response.ok()).toBeTruthy();
        expect(response.status()).toBe(200);
    });

    test('should get inventory items via API', async ({ request }) => {
        // First authenticate
        await request.post('https://www.saucedemo.com/login', {
            data: {
                user_name: 'standard_user',
                password: 'secret_sauce'
            }
        });
        
        // Get inventory items
        const response = await request.get('https://www.saucedemo.com/inventory.html');
        expect(response.ok()).toBeTruthy();
        
        // Verify response contains inventory items
        const body = await response.text();
        expect(body).toContain('inventory_item');
    });

    test('should handle invalid login via API', async ({ request }) => {
        const response = await request.post('https://www.saucedemo.com/login', {
            data: {
                user_name: 'invalid_user',
                password: 'wrong_password'
            }
        });
        
        expect(response.ok()).toBeTruthy();
        expect(response.status()).toBe(200);
        
        // Verify error message in response
        const body = await response.text();
        expect(body).toContain('Epic sadface: Username and password do not match');
    });
}); 