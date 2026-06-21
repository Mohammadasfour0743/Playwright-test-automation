import { Locator, Page } from '@playwright/test';
import { BasePage } from './base.page';

export interface UserRegistrationData {
  firstName: string;
  lastName: string;
  dob: string;
  street: string;
  houseNumber: string;
  city: string;
  state: string;
  country: string;
  postcode: string;
  phone: string;
  email: string;
  pass: string;
}

export class RegisterPage extends BasePage {
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly dobInput: Locator;
  readonly streetInput: Locator;
  readonly houseNumberInput: Locator;
  readonly cityInput: Locator;
  readonly stateInput: Locator;
  readonly countryDropdown: Locator;
  readonly postcodeInput: Locator;
  readonly phoneInput: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly registerButton: Locator;

  constructor(page: Page) {
    super(page);
    this.firstNameInput = page.getByTestId('first-name');
    this.lastNameInput = page.getByTestId('last-name');
    this.dobInput = page.getByTestId('dob');
    this.streetInput = page.getByTestId('street');
    this.houseNumberInput = page.getByTestId('house_number');
    this.cityInput = page.getByTestId('city');
    this.stateInput = page.getByTestId('state');
    this.countryDropdown = page.getByTestId('country');
    this.postcodeInput = page.getByTestId('postal_code');
    this.phoneInput = page.getByTestId('phone');
    this.emailInput = page.getByTestId('email');
    this.passwordInput = page.getByTestId('password');
    this.registerButton = page.getByTestId('register-submit');
  }

  async register(user: UserRegistrationData) {
    await this.firstNameInput.fill(user.firstName);
    await this.lastNameInput.fill(user.lastName);
    await this.dobInput.fill(user.dob);
    await this.streetInput.fill(user.street);
    await this.houseNumberInput.fill(user.houseNumber);
    await this.cityInput.fill(user.city);
    await this.stateInput.fill(user.state);
    await this.countryDropdown.selectOption(user.country);
    await this.postcodeInput.fill(user.postcode);
    await this.phoneInput.fill(user.phone);
    await this.emailInput.fill(user.email);
    await this.passwordInput.fill(user.pass);
    await this.registerButton.click();
  }
}
