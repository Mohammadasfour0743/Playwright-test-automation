import { test, expect } from '../src/fixtures/test-fixtures';

test.describe('Authentication Flows', () => {

  test('should register a new user successfully', async ({ page, registerPage, loginPage }) => {
    // Navigate to registration page
    await page.goto('/auth/register');

    // Generate a unique email to avoid collision in repeated test runs
    const uniqueEmail = `user_${Date.now()}@example.com`;

    // Fill the registration form
    await registerPage.register({
      firstName: 'John',
      lastName: 'Doe',
      dob: '1990-01-01',
      street: 'Main St',
      houseNumber: '123',
      city: 'Chicago',
      state: 'Illinois',
      country: 'US', // Selects the US option
      postcode: '60601',
      phone: '3125551234',
      email: uniqueEmail,
      pass: 'Pr@ct1ceTest!ngP@ssw0rd$2026',
    });

    // Registration should redirect to the login page
    await expect(page).toHaveURL(/.*\/auth\/login/);

    // Verify we can login with the newly created user
    await loginPage.login(uniqueEmail, 'Pr@ct1ceTest!ngP@ssw0rd$2026');

    // The navigation bar should display the user menu when authenticated
    await expect(loginPage.navUserMenu).toBeVisible();
  });

  test('should login successfully with default customer account', async ({ page, loginPage }) => {
    await page.goto('/auth/login');

    //Normally in an .env file
    const email = 'customer@practicesoftwaretesting.com';
    const password = 'welcome01';

    await loginPage.login(email, password);



    // Verify User Menu is visible
    await expect(loginPage.navUserMenu).toBeVisible();
    await expect(loginPage.myAccountTitle).toBeVisible();
  });

  test('should show error message for invalid login credentials', async ({ page, loginPage }) => {
    await page.goto('/auth/login');
    await loginPage.login('invalid-user@invalid.com', 'wrongpassword');

    // Verify the error element displays message
    await expect(loginPage.loginError).toBeVisible();
    await expect(loginPage.loginError).toContainText('Invalid email or password');
  });

  test('should logout successfully', async ({ page, loginPage }) => {
    await page.goto('/auth/login');

    const email = 'customer@practicesoftwaretesting.com';
    const password = 'welcome01';

    await loginPage.login(email, password);
    await expect(loginPage.navUserMenu).toBeVisible();

    // Click user menu then sign out
    await loginPage.clickNameDropdown();
    await loginPage.navSignOut.click();

    // Verify redirected to home or sign in
    await expect(loginPage.navSignIn).toBeVisible();
  });
});
