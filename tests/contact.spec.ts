import { test, expect } from '../src/fixtures/test-fixtures';

test.describe('Contact Form Flows', () => {

  test('should submit contact form successfully', async ({ page, contactPage }) => {
    // Navigate to contact page
    await page.goto('/contact');

    // Fill and submit the contact form
    await contactPage.submitContactForm({
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane.smith@example.com',
      subject: 'payments', // Select option with value 'payments'
      message: 'Hello, I have a question regarding billing/payments for my order.',
    });

    // Verify success message is displayed
    await expect(contactPage.successAlert).toBeVisible();
    await expect(contactPage.successAlert).toContainText(/Thanks for your message|Message sent/i);
  });

  test('should display validation errors for empty required fields', async ({ page, contactPage }) => {
    await page.goto('/contact');
    
    // Submit the form without filling any fields
    await contactPage.submitButton.click();

    // Verify error message is displayed for each required field
    // It could be either alert-danger or validation messages depending on the implementation.
    // Let's assert that the form is not submitted successfully and error is shown.
    await expect(contactPage.errorAlert.first()).toBeVisible();
  });
});
