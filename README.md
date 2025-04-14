# Sauce Demo Playwright Test Suite

This repository contains automated tests for the Sauce Demo website (https://www.saucedemo.com/) using Playwright.

## Features

- Page Object Model implementation
- Sorting functionality tests
- Checkout journey tests
- Visual comparison tests
- Accessibility tests
- Performance monitoring tests
- Form submission tests
- Cross-browser testing support
- CI/CD integration with GitHub Actions
- Docker containerization

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- Docker and Docker Compose (optional)

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

Run tests in headed mode:
```bash
npm run test:headed
```

Run tests in debug mode:
```bash
npm run test:debug
```

Run tests in parallel:
```bash
npm run test:parallel
```

View test report:
```bash
npm run report
```

## Docker Support

Run tests in Docker:
```bash
docker-compose up playwright-tests
```

Run tests with UI in Docker:
```bash
docker-compose up playwright-ui
```

## Test Structure

- `tests/pages/` - Page Object Models
- `tests/sorting.spec.ts` - Sorting functionality tests
- `tests/checkout.spec.ts` - Checkout journey tests
- `tests/visual.spec.ts` - Visual comparison tests
- `tests/accessibility.spec.ts` - Accessibility tests
- `tests/performance.spec.ts` - Performance monitoring tests
- `tests/api.spec.ts` - Form submission tests

## CI/CD Integration

The project includes GitHub Actions workflow for continuous integration:
- Runs on push to main/master branches
- Runs on pull requests to main/master branches
- Uploads test reports as artifacts
- Supports cross-browser testing

## Best Practices Implemented

1. Page Object Model pattern for better maintainability
2. Reusable components and methods
3. Clear test organization and naming
4. Cross-browser testing support
5. Visual regression testing
6. Accessibility testing
7. Performance monitoring
8. Form submission testing
9. Screenshot capture on test failure
10. HTML test reports
11. CI/CD friendly configuration
12. Docker containerization

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request 