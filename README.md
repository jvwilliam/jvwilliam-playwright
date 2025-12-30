# Overview
**jvwilliam-playwright** is and **end-to-end test automation framework** built with Playwright and JavaScript. It's designed to test a personal portfolio website with a focus on clean architecture, maintainability, and reusable page object patters. 

## Key Features ✨
- **Page Object Model** - Centralized page objects (BasePage, HomePage) for maintainable test code.
- **Abstract Classes** - Blueprint pattern with abstract methods that subclasses must implement.
- **Test Fixtures** - Expected values stored in JSON for easy assertion management. 
- **Environment Support** - Multiple environments (dev, staging, etc) via `.env` files.
- **Cross-platform** - Uses `cross-env` for Windows/Mac/Linux compatibility.
- **Multiple Browsers** - Tests run on Chromium, Firefox, and WebKit.
- **HTML Reports** - Built-in Playwright HTML reporting.
- **CI/CD Ready** - GitHub Actions integration for automated runs.

## Current Test Scope
- **Homepage Smoke Tests** - Verifies the page title, section visibility and navigation flow.
- **Primary sections visibility** - Tests for About, Services, Experience, Skills and Trainings section.
- **Navigation** - Validates anchor/nav link interactions.

## Tech Stack
| Component         | Technology                            |
|-------------------|---------------------------------------|
| Test Framework    | Playwright Test (JavaScript)          |
| CI/CD             | GitHub Actions                        |
| Reporting         | Playwright HTML Reports               |
| Browsers          | Chromium, Firefox, WebKit             |
| Utilities         | cross-env (cross-platform env vars)   |

# Setup
After cloning the repository, run the following commands to install dependencies: 
```
# Install dependencies
npm install

# If running playwright for the first time, installing the browser might be required
npx playwright install

```

## Environment Variables
These tests require environment variables to be set for correct execution. Make sure you have a valid `.env.{env}` file in the project root

## Environment Support
I've added cross-env as dependency to this project to enable the use of environment variables across different platforms (Windows, macOS, Linux) when running scripts.

This allows us to pass custom environment variables - like `ENV=dev` or `ENV=staging` directly from the command line. 

### Running on different systems: 
```
$ On Linux/macOS or Git Bash: 
ENV=dev npm run tests

# On Windows (CMD): 
set ENV=dev && npm run tests

# On Windows (Powershell): 
$env:ENV="dev"; npm run tests
```


# Running the Tests

## Default
```
# This command will execute all tests on the tests/e2e folder

npx playwright tests
```

## Custom Scripts
Using the scripts defined in the package.json file. There are several ways we can run the tests: 
```
# script(s) defined in package.json

"scripts": {
    "test:local" : "cross-env ENV=%ENV% npx playwright test"
}

# On the terminal: 

ENV={env} npm run test:local
```

## UI Mode
To enable UI add, simply append --ui to the custom script or command. 
```
ENV={dev} npm run test:local -- --ui || --headed
```

The `--ui` will open the test runner GUI while the `--headed` will open the browser instance while the test is running. 

# Project Documentation Guide

## Folder Structure
```
project-root/

├── tests/                                      # Test files
│     └── e2e 
│         └── business-view 
│              ├── ep-home.test.js
│    ├── dashboard.test.js
│
├── pages-objects/                              # Page Objects
│    ├── BasePage.js
│    ├── LoginPage.js
│    ├── DashboardPage.js
│
├── utils/                                      # Utilities & helpers
│    ├── wait-utils.js
│    ├── config-helper.js
│
├── selectors/                                  # Centralized selectors (optional)
│    ├── login-selectors.js
│    ├── dashboard-selectors.js
│
├── playwright.config.js  # Playwright config
└── package.json
```

## File Naming Convention

### Page Objects
- Use PascalCase for files that contain a single class.
- Example: 
    - BaseClass.js
    - LoginPage.js
    - DashBoard.js

### Test Files
- Use kebab-case and include .test.js as suffix.
- Example:
    - login.test.js
    - dashboard.test.js

### Utility Files (/utils)
- Use kebab-case for helpers and utilities.
- Example: 
    - wait-utils.js
    - config-helper.js  

### Classes
- Use PascalCase for classes:
- Example: 
```
class BasePage { ... }
class LoginPage extends BasePage { ... }
```

### Selectors
- Use camelCase for selector variables inside page objects or selector files. 
- Example: 
```
this.usernameField = '#username';
this.loginButton = '#login-button';
```

### Test Name & Descriptions
- Use descriptive names for test fles and test cases.
- Example: 
```
test('User can log in successfully', async ({ page }) => {...});
```

### Folder Naming
- Use lowercase for folders
- Examples: 
    - pages/
    - tests/
    - utils/

### Best Practices
- Keep selectors centralized if they are reused across multiple tests.
- Group related tests in subfolders (e.g., tests/auth or login/signup).
- Avoid hardcoding URLs; use a config file or enviroment variables.

## Git Workflow
All feature branches should be merged to the `release` branch first. Once tested, push or publish the `release` branch to the remote repository. The release branch will then be merged to the main branch. 

```
# switch to release branch branch
git switch [workstation]-release

# merge feature-branch to release branch
git merge feature-branch

# Resolve any conflicts (if any)
# Publish or push the branch to the remote repository
git push origin [workstation]-release
```

# Release Notes:
| Version | Date       | Changes                        |
|---------|------------|--------------------------------|
| 1.0.0   | 2025-12-30 | Initial release                |
| 1.0.0   | 2025-12-25 | Added base page class          |
| 1.0.0   | 2025-12-20 | Refactored page objects        |