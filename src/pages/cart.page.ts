import { Locator, Page } from '@playwright/test';
import { BasePage } from './base.page';

export class CartPage extends BasePage {
  readonly proceed1Button: Locator;
  readonly proceed2Button: Locator;
  readonly proceed3Button: Locator;
  readonly paymentMethodDropdown: Locator;
  readonly finishButton: Locator;
  readonly confirmButton: Locator;
  readonly successMessage: Locator;
  readonly orderConfirmation: Locator;

  readonly cartItems: Locator;
  readonly productNames: Locator;
  readonly totalPrice: Locator;

  constructor(page: Page) {
    super(page);
    this.proceed1Button = page.getByTestId('proceed-1');
    this.proceed2Button = page.getByTestId('proceed-2');
    this.proceed3Button = page.getByTestId('proceed-3');
    this.paymentMethodDropdown = page.getByTestId('payment-method');
    this.finishButton = page.getByTestId('finish');
    this.confirmButton = page.getByRole('button', { name: 'Confirm' });
    this.successMessage = page.locator('.alert-success');
    this.orderConfirmation = page.locator('#order-confirmation');
    this.cartItems = page.locator('tbody tr');
    this.productNames = page.locator('.product-title');
    this.totalPrice = page.getByTestId('cart-total');
  }

  async proceedToCheckout() {
    await this.proceed1Button.click();
  }

  async proceedToAddress() {
    await this.proceed2Button.click();
  }

  async proceedToPayment() {
    await this.proceed3Button.click();
  }

  async fillAddress() {
    await this.page.getByTestId('country').selectOption('US');
    await this.page.getByTestId('postal_code').fill('60601');
    await this.page.getByTestId('house_number').fill('123');
    await this.page.getByTestId('state').fill('IL');
    await this.page.getByTestId('city').fill('Chicago');
    await this.page.getByTestId('street').fill('Main St');
  }

  async selectPaymentMethod(method: string) {
    await this.paymentMethodDropdown.selectOption(method);
  }

  async finishCheckout() {
    await this.finishButton.click();
  }

  async confirmOrder() {
    await this.confirmButton.click();
  }

  async getCartItemsCount(): Promise<number> {
    return await this.cartItems.count();
  }
}
