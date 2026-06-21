import { Locator, Page } from '@playwright/test';
import { BasePage } from './base.page';

export class LoginPage extends BasePage {
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly registerLink: Locator;
  readonly loginError: Locator;
  readonly myAccountTitle: Locator;


  constructor(page: Page) {
    super(page);
    this.emailInput = page.getByTestId('email');
    this.passwordInput = page.getByTestId('password');
    this.loginButton = page.getByTestId('login-submit');
    this.registerLink = page.locator('[data-test="register-link"], a[href*="register"], text="Register your account"').first();
    this.loginError = page.getByTestId('login-error');
    this.myAccountTitle = page.getByTestId('page-title');

  }

  async login(email: string, pass: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(pass);
    await this.loginButton.click();
  }

  async clickRegister() {
    await this.registerLink.scrollIntoViewIfNeeded();
    await this.registerLink.click();
  }


}
