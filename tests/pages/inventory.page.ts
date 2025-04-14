import { Page } from '@playwright/test';

export class InventoryPage {
    private page: Page;

    // Locators
    private sortDropdown = '[data-test="product_sort_container"]';
    private inventoryItems = '.inventory_item';
    private itemNames = '.inventory_item_name';
    private itemPrices = '.inventory_item_price';
    private addToCartButtons = '[data-test^="add-to-cart"]';
    private cartBadge = '.shopping_cart_badge';
    private cartLink = '.shopping_cart_link';

    constructor(page: Page) {
        this.page = page;
    }

    async selectSortOption(option: string) {
        await this.page.selectOption(this.sortDropdown, option);
    }

    async getAllItemNames() {
        return await this.page.$$eval(this.itemNames, elements => 
            elements.map(el => el.textContent || ''));
    }

    async getAllItemPrices() {
        return await this.page.$$eval(this.itemPrices, elements => 
            elements.map(el => parseFloat(el.textContent?.replace('$', '') || '0')));
    }

    async addItemsToCart(itemIndices: number[]) {
        for (const index of itemIndices) {
            await this.page.click(this.addToCartButtons + `:nth-child(${index + 1})`);
        }
    }

    async getCartItemCount() {
        const badge = await this.page.$(this.cartBadge);
        return badge ? parseInt(await badge.textContent() || '0') : 0;
    }

    async goToCart() {
        await this.page.click(this.cartLink);
    }
} 