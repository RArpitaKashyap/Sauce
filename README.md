# Sauce Demo Playwright Test Suite

This repository contains automated tests for the Sauce Demo website (https://www.saucedemo.com/) using Playwright.

## Features

- Page Object Model implementation
- Sorting functionality tests
- Checkout journey tests
- Visual comparison tests
- Accessibility tests
- Cross-browser testing support

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Install Playwright browsers:
   ```bash
   npx playwright install
   ```

## Running Tests

Run all tests:
```bash
npm test
```

Run tests with UI:
```bash
npm run test:ui
```

View test report:
```bash
npm run report
```

## Test Structure

- `tests/pages/` - Page Object Models
- `tests/sorting.spec.ts` - Sorting functionality tests
- `tests/checkout.spec.ts` - Checkout journey tests
- `tests/visual.spec.ts` - Visual comparison tests
- `tests/accessibility.spec.ts` - Accessibility tests

## Best Practices Implemented

1. Page Object Model pattern for better maintainability
2. Reusable components and methods
3. Clear test organization and naming
4. Cross-browser testing support
5. Visual regression testing
6. Accessibility testing
7. Screenshot capture on test failure
8. HTML test reports
9. CI/CD friendly configuration

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request 