import { Locator, Page } from '@playwright/test';
import { BasePage } from './base.page';

export class ProductPage extends BasePage {
  readonly productName: Locator;
  readonly productPrice: Locator;
  readonly productDescription: Locator;
  readonly btnIncrease: Locator;
  readonly btnDecrease: Locator;
  readonly quantityInput: Locator;
  readonly btnAddToCart: Locator;
  readonly btnAddToWishlist: Locator;

  constructor(page: Page) {
    super(page);
    this.productName = page.getByTestId('product-name');
    this.productPrice = page.getByTestId('product-price');
    this.productDescription = page.getByTestId('product-description');
    this.btnIncrease = page.getByTestId('increase-quantity');
    this.btnDecrease = page.getByTestId('decrease-quantity');
    this.quantityInput = page.getByTestId('quantity');
    this.btnAddToCart = page.getByTestId('add-to-cart');
    this.btnAddToWishlist = page.getByTestId('add-to-wishlist');
  }

  async setQuantity(qty: number) {
    const currentValStr = await this.quantityInput.inputValue();
    let currentVal = parseInt(currentValStr || '1', 10);
    
    while (currentVal < qty) {
      await this.btnIncrease.click();
      currentVal++;
    }
    while (currentVal > qty) {
      await this.btnDecrease.click();
      currentVal--;
    }
  }

  async addToCart() {
    await this.btnAddToCart.click();
  }

  async addToWishlist() {
    await this.btnAddToWishlist.click();
  }
}
