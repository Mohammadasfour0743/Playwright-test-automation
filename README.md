# Playwright TypeScript Test Automation Framework

A modern, robust, and scalable end-to-end test automation framework built using **Playwright**, **TypeScript**, and the **Page Object Model (POM)** design pattern. 

This repository was designed to showcase industry best practices in test automation, featuring highly reusable custom fixtures, clean page abstractions, and deterministic test scenarios.

---

## 🎯 General Idea & Architecture

The primary goal of this framework is to provide a clean separation of concerns between test specifications and page-specific details (locators, actions, helpers). 

### Key Highlights
*   **Page Object Model (POM):** Every page has a dedicated class encapsulating its UI elements and user actions (e.g., [login.page.ts](file:///c:/Users/Mohammad%20Asfour/Desktop/Playwright-test-automation/src/pages/login.page.ts)).
*   **Custom Test Fixtures:** Rather than manually instantiating page objects inside every single test block, this framework extends Playwright's base test to automatically instantiate and inject pages via fixtures (e.g., `{ loginPage, registerPage }`).
*   **Type Safety:** Built 100% in TypeScript to ensure strong typing for selectors, page methods, and data models.
*   **Clean Test Data Handling:** Tests generate dynamic inputs (such as unique emails utilizing `Date.now()`) to prevent collisions and ensure test runs remain independent and repeatable.

---

## 📂 File Structure

```text
Playwright-test-automation/
├── src/
│   ├── fixtures/
│   │   └── test-fixtures.ts      # Custom Playwright fixtures extending the base test
│   └── pages/                    # Page Object Classes
│       ├── base.page.ts          # Common page helpers and shared components
│       ├── home.page.ts          # Homepage actions and locators
│       ├── product.page.ts       # Product details page elements
│       ├── cart.page.ts          # Shopping cart page actions
│       ├── login.page.ts         # User login and auth helpers
│       ├── register.page.ts      # Registration form handlers
│       └── contact.page.ts       # Contact form interactions
├── tests/                        # Test Suites
│   ├── auth.spec.ts              # Authentication (Registration, Login, Logout)
│   ├── contact.spec.ts           # Contact form submission verification
│   ├── shopping.spec.ts          # E-Commerce shopping and checkout flows
│   └── debug.spec.ts             # Debugging utility tests
├── playwright.config.ts          # Global Playwright configurations
├── package.json                  # Dependencies and run scripts
└── README.md                     # Framework documentation
```

---

## 🚀 Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed.

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/Mohammadasfour0743/Playwright-test-automation.git
   cd Playwright-test-automation
   ```
2. Install the dependencies:
   ```bash
   npm install
   ```
3. Install Playwright browsers:
   ```bash
   npx playwright install
   ```

---

## 🧪 Running Tests

A few convenient npm scripts are defined in [package.json](file:///c:/Users/Mohammad%20Asfour/Desktop/Playwright-test-automation/package.json):

*   **Run all tests (Headed Mode):**
    ```bash
    npm run test:a
    ```
*   **Run all tests (Headless Mode):**
    ```bash
    npm run test:b
    ```
*   **Run specific test file (Authentication):**
    ```bash
    npm run test:auth
    ```
*   **View HTML Report:**
    ```bash
    npx playwright show-report
    ```

---

## 🔮 Future Work & Enhancements

*   **API Response Validation & Hybrid Testing:** Integrate API requests (`request` utility in Playwright) to validate backend responses and state directly. 
*   **API-Driven State Setup:** Instead of relying entirely on UI interactions to set up pre-requisites (like registering a user or adding items to a cart), use API calls to prepare test states, reducing execution time and UI fragility.
*   **CI/CD Pipeline Integration:** Configure GitHub Actions to run the test suite on every pull request and generate automated test report artifacts.
