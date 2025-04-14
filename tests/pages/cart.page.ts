import { Page } from '@playwright/test';

export class CartPage {
    private page: Page;

    // Locators
    private cartItems = '.cart_item';
    private itemNames = '.inventory_item_name';
    private itemPrices = '.inventory_item_price';
    private checkoutButton = '[data-test="checkout"]';
    private firstNameInput = '[data-test="firstName"]';
    private lastNameInput = '[data-test="lastName"]';
    private postalCodeInput = '[data-test="postalCode"]';
    private continueButton = '[data-test="continue"]';
    private finishButton = '[data-test="finish"]';
    private completeHeader = '.complete-header';

    constructor(page: Page) {
        this.page = page;
    }

    async getCartItems() {
        return await this.page.$$(this.cartItems);
    }

    async getItemNames() {
        return await this.page.$$eval(this.itemNames, elements => 
            elements.map(el => el.textContent || ''));
    }

    async getItemPrices() {
        return await this.page.$$eval(this.itemPrices, elements => 
            elements.map(el => parseFloat(el.textContent?.replace('$', '') || '0')));
    }

    async proceedToCheckout() {
        await this.page.click(this.checkoutButton);
    }

    async fillCheckoutInformation(firstName: string, lastName: string, postalCode: string) {
        await this.page.fill(this.firstNameInput, firstName);
        await this.page.fill(this.lastNameInput, lastName);
        await this.page.fill(this.postalCodeInput, postalCode);
        await this.page.click(this.continueButton);
    }

    async completeCheckout() {
        await this.page.click(this.finishButton);
    }

    async getCompleteHeader() {
        return await this.page.textContent(this.completeHeader);
    }
} 