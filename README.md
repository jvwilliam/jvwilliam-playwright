# Overview

# Tools & Technologies

## Tech Stack
- Playwright (JavaScript)
- Test Runner: Playwright Test
- CI/CD Integration: Github Actions
- Reporting: HTML reports
- Browser Support: Chromium, Firefox, WebKit

# Current Features (Optional)

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
#This command will execute all tests on the tests/e2e folder

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
All feature branches should be merged to the `qa-release` branch first. Once tested, merge the `qa-release` to the main branch and publish. 

```
# switch to target main branch
git switch main

# merge qa-release to main
git merge qa-release

# Resolve any conflicts (if any)
# Push the main branch to the remote tracking branch
git push origin main
```