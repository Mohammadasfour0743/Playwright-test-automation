import { Locator, Page } from '@playwright/test';
import { BasePage } from './base.page';

export class HomePage extends BasePage {
  readonly productGrid: Locator;
  readonly productNames: Locator;
  readonly productPrices: Locator;
  readonly sortDropdown: Locator;

  constructor(page: Page) {
    super(page);
    this.productGrid = page.locator('.col-md-9');
    this.productNames = page.getByTestId('product-name');
    this.productPrices = page.getByTestId('product-price');
    this.sortDropdown = page.getByTestId('sort');
  }

  async selectSortOption(optionValue: string) {
    await this.sortDropdown.selectOption(optionValue);
  }

  async clickProductByName(name: string) {
    const product = this.page.getByTestId('product-name').filter({ hasText: name }).first();
    await product.click();
  }

  async filterByCategory(categoryName: string) {
    const checkbox = this.page.getByRole('checkbox', { name: categoryName });
    await checkbox.scrollIntoViewIfNeeded();
    await checkbox.check();
  }

  async getProductCount(): Promise<number> {
    return await this.productNames.count();
  }

  async getAllProductNames(): Promise<string[]> {
    return await this.productNames.allTextContents();
  }

  async getAllProductPrices(): Promise<number[]> {
    const pricesText = await this.productPrices.allTextContents();
    return pricesText.map(p => parseFloat(p.replace(/[^0-9.]/g, '')));
  }
}
