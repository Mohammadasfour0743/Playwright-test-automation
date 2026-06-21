import { Locator, Page } from '@playwright/test';

export class BasePage {
  readonly page: Page;
  readonly navHome: Locator;
  readonly navContact: Locator;
  readonly navSignIn: Locator;
  readonly navSignOut: Locator;
  readonly navCart: Locator;
  readonly cartVal: Locator;
  readonly searchQuery: Locator;
  readonly searchSubmit: Locator;
  readonly navUserMenu: Locator;
  constructor(page: Page) {
    this.page = page;
    this.navHome = page.getByTestId('nav-home');
    this.navContact = page.getByTestId('nav-contact');
    this.navSignIn = page.getByTestId('nav-sign-in');
    this.navSignOut = page.getByTestId('nav-sign-out');
    this.navCart = page.getByTestId('nav-cart');
    this.cartVal = page.getByTestId('cart-val');
    this.searchQuery = page.getByTestId('search-query');
    this.searchSubmit = page.getByTestId('search-submit');
    this.navUserMenu = page.getByTestId('nav-menu');
  }

  async searchProduct(query: string) {
    await this.searchQuery.clear();
    await this.searchQuery.fill(query);
    await this.searchSubmit.click();
  }

  async goToHome() {
    await this.navHome.click();
  }

  async goToContact() {
    await this.navContact.click();
  }

  async goToSignIn() {
    await this.navSignIn.click();
  }

  async goToCart() {
    await this.navCart.click();
  }

  async getCartCount(): Promise<number> {
    const text = await this.navCart.textContent();
    return text ? parseInt(text.replace(/[^0-9]/g, ''), 10) || 0 : 0;
  }

  async clickNameDropdown() {
    await this.navUserMenu.click();
  }
}
