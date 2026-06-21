import { Locator, Page } from '@playwright/test';
import { BasePage } from './base.page';

export class ContactPage extends BasePage {
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly emailInput: Locator;
  readonly subjectDropdown: Locator;
  readonly messageInput: Locator;
  readonly submitButton: Locator;
  readonly successAlert: Locator;
  readonly errorAlert: Locator;

  constructor(page: Page) {
    super(page);
    this.firstNameInput = page.getByTestId('first-name');
    this.lastNameInput = page.getByTestId('last-name');
    this.emailInput = page.getByTestId('email');
    this.subjectDropdown = page.getByTestId('subject');
    this.messageInput = page.getByTestId('message');
    this.submitButton = page.getByTestId('contact-submit');
    this.successAlert = page.locator('.alert-success');
    this.errorAlert = page.locator('.alert-danger');
  }

  async submitContactForm(info: {
    firstName: string;
    lastName: string;
    email: string;
    subject: string;
    message: string;
  }) {
    await this.firstNameInput.fill(info.firstName);
    await this.lastNameInput.fill(info.lastName);
    await this.emailInput.fill(info.email);
    await this.subjectDropdown.selectOption(info.subject);
    await this.messageInput.fill(info.message);
    await this.submitButton.click();
  }
}
