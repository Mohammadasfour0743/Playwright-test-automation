import { test, expect } from '@playwright/test';

test('debug checkout', async ({ page }) => {
  await page.goto('https://practicesoftwaretesting.com/');
  await page.getByTestId('product-name').first().click();
  await page.getByTestId('add-to-cart').click();
  await page.waitForTimeout(1000);
  
  await page.goto('https://practicesoftwaretesting.com/checkout');
  
  // Login
  await page.goto('https://practicesoftwaretesting.com/auth/login');
  await page.getByTestId('email').fill('admin@practicesoftwaretesting.com');
  await page.getByTestId('password').fill('welcome01');
  await page.getByTestId('login-submit').click();
  await page.waitForTimeout(1000);
  
  await page.goto('https://practicesoftwaretesting.com/checkout');
  await page.getByTestId('proceed-1').click();
  await page.waitForTimeout(1000);
  
  await page.getByTestId('proceed-2').click();
  await page.waitForTimeout(1000);
  
  const html = await page.locator('app-checkout').innerHTML();
  console.log('CHECKOUT_HTML:', html);
});
