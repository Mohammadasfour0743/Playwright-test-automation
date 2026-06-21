import { test, expect } from '@playwright/test';
test('debug nav', async ({ page }) => {
  await page.goto('https://practicesoftwaretesting.com/auth/login');
  await page.getByTestId('email').fill('customer@practicesoftwaretesting.com');
  await page.getByTestId('password').fill('welcome01');
  await page.getByTestId('login-submit').click();
  await page.waitForTimeout(2000);
  const html = await page.locator('.navbar').innerHTML();
  console.log(html);
});
