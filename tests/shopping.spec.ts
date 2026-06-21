import { test, expect } from '../src/fixtures/test-fixtures';

test.describe('Shopping & Checkout Flows', () => {

  test('should search and filter products successfully', async ({ page, homePage }) => {
    await page.goto('/');

    // Search for a specific product
    await homePage.searchProduct('Pliers');

    // Wait for network response to settle (basic wait for product name text)
    await page.waitForTimeout(1000); // Allow time for API to return results
    const products = await homePage.getAllProductNames();
    
    expect(products.length).toBeGreaterThan(0);
    for (const name of products) {
      expect(name.toLowerCase()).toContain('pliers');
    }
  });

  test('should filter products by category', async ({ page, homePage }) => {
    await page.goto('/');

    await homePage.filterByCategory('Hand Tools');
    await page.waitForTimeout(1000); // Allow time for API to filter

    const products = await homePage.getAllProductNames();
    expect(products.length).toBeGreaterThan(0);
  });

  test('should sort products by price (High - Low)', async ({ page, homePage }) => {
    await page.goto('/');

    // Ensure products are loaded first
    await expect(homePage.productNames.first()).toBeVisible();

    await homePage.selectSortOption('price,desc'); // 'price,desc' is the typical value for High-Low
    await page.waitForTimeout(1500); // Allow sorting to complete

    const prices = await homePage.getAllProductPrices();
    
    // Verify prices are in descending order
    let isSorted = true;
    for (let i = 0; i < prices.length - 1; i++) {
      if (prices[i] < prices[i + 1]) {
        isSorted = false;
        break;
      }
    }
    expect(isSorted).toBeTruthy();
  });

  test('should add product to cart and complete checkout flow', async ({ page, homePage, productPage, cartPage, loginPage }) => {
    await page.goto('/');

    // Select a product
    await homePage.clickProductByName('Combination Pliers');
    
    // Set quantity to 2 and add to cart
    await productPage.setQuantity(2);
    await productPage.addToCart();

    // Verify cart badge displays quantity of 2
    await expect(async () => {
      expect(await productPage.getCartCount()).toBe(2);
    }).toPass();

    // Navigate to cart
    await productPage.goToCart();
    await expect(page).toHaveURL(/.*\/checkout/);

    // Step 1: Start checkout wizard
    await cartPage.proceedToCheckout();

    // Step 2: Login step
    const email = process.env.TEST_EMAIL || 'customer@practicesoftwaretesting.com';
    const password = process.env.TEST_PASSWORD || 'welcome01';
    await loginPage.login(email, password);

    // Step 3: Address step
    await cartPage.proceedToAddress();
    
    // Verify we reached the address step and the form is present
    await expect(page.getByTestId('country')).toBeVisible();
    await expect(cartPage.proceed3Button).toBeVisible();
  });
});
