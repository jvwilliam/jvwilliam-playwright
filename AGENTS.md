# Agent Instructions

## Project Context

This repository is a Playwright end-to-end test framework for the `jvwilliam.com` portfolio site. The current scope is homepage smoke coverage, primary section visibility, and navigation between the About, Expertise, Experience, Skills, Trainings, and CTA sections.

The framework uses TypeScript, Playwright Test, page objects, shared expected values, and environment-specific `.env.{ENV}` files. `playwright.config.ts` loads `BASE_URL` from the active environment file, defaulting `ENV` to `prod` when no value is provided.

## Repository Workflow

The user owns and manages the Git branch workflow. Branches are read-only from the agent's perspective.

### Agents must never

- Create, switch rename, merge, rebase, or delete branches.
- Create, move, remove, or manage Git worktrees.
- Checkout another branch or commit.
- Commit changes.
- Push changes.
- Open or update a pull request.

The user will perform all branch changes, commits, pushes, merges, rebases, and pull-request operations.

### Before Implementation Change

Before making any implementation change, inspect the current branch and working tree using read-only Git commands such as:

    git branch --show-current
    git branch --short --branch

The follow these rules:

1. If the current branch is `main` or `master`, stop before editing and ask the user to create and switch to an implementation branch.
2. If another branch is already checked out, continue on that branch.
3. Do not require a particular `implementation-branch` name.
4. Do not ask the user to rename an acceptable existing branch.
5. Do not move or attempt to move the task to another branch.
6. If there is not current branch, the repository is unavailable, or the branch state cannot be determined, stop before implementation and ask the user to establish and check out an implementation branch.
7. Inspect existing working-tree changes before editing. Preserve user changes and do not overwrite, discard, reset, clean, stash, or revert them.
8. If existing changes overlap the intended implementation and cannot be safely preserved, stop and ask the user how to proceed.

Branch inspection is a safety check, not permission to modify Git state.

### Work that does not require an implementation branch

The following work does not require the user to create or switch to a new branch:

- Project discovery, project documentation, or feature definition.
- Architecture analysis, decision, documentation, or review.
- QA planning, test execution, test analysis, reporting.
- Repository inspection and diagnostic investigation that do not modify files.

These are activities may proceed on main, master, another branch, or with no branch checked out. Agents may create or update non-implementation artifacts such as specifications, decision records, test plans, and review reports when the user has requested them.

If any of these activities expands into implementation––such as changing runtime code, tests, assets, dependencies, build configuration, or application behavior––perform the branch and working-tree first and apply the implementation rules above.

## Before Changing Tests

- Inspect the existing page object, expected values, and Playwright config before adding or changing tests.
- Reproduce UI bugs with the narrowest relevant Playwright command before diagnosing or fixing.
- Prefer focused regression coverage over broad duplicated assertions.
- Keep changes scoped to the requested behavior and avoid unrelated refactors.
- Do not commit changes unless the user explicitly asks.

## Commands

- Install dependencies: `npm install`
- Install Playwright browsers when needed: `npx playwright install`
- Run all tests: `npm test`
- Run smoke tests: `ENV=prod npm run smoke:test`
- Open UI mode: `npm run test:ui`
- Open the HTML report: `npm run report`

When validating a change, start with the narrowest command that covers the edited area, then broaden only when the risk justifies it. For smoke coverage, use the `@smoke` tag already present in the existing tests.

## Environment Requirements

- Use `.env.{ENV}` files in the project root for environment-specific values.
- `BASE_URL` must be set in the selected environment file.
- If no `ENV` is provided, Playwright loads `.env.prod`.
- Do not hardcode application URLs in tests or page objects.

## Test Structure

- End-to-end tests live under `tests/e2e/`.
- Current smoke tests live under `tests/e2e/smoke/`.
- Page objects live under `src/pages/`.
- Shared expected copy and values live in `src/data/expected-values.ts`.
- Utility helpers live under `src/utils/`.
- Use the `@/*` import alias for files under `src/`.

## Playwright Style

- Use Playwright's built-in `test`, `expect`, fixtures, annotations, and `test.step` patterns consistently with the existing tests.
- Prefer user-visible assertions such as page title, text, section visibility, URL behavior, and viewport presence.
- Use `expect` auto-waiting instead of arbitrary sleeps or manual polling.
- Keep tests independent so they can run fully parallel.
- Use scenario names that describe the user-facing behavior being verified.
- Use `test.describe(..., { tag: '@smoke' }, ...)` for smoke coverage.

## Locator Strategy

- Prefer stable user-facing locators: role, label, text, placeholder, and test ids.
- Follow the existing page object convention of centralizing repeated `data-testid` locators in `BasePage`.
- Avoid selectors based on DOM depth, generated classes, CSS implementation details, or animation timing.
- Add new page object methods when the same interaction or assertion would otherwise be repeated across tests.

## Page Object Guidance

- Keep navigation and reusable UI interactions in page objects.
- Keep assertions that describe page-level completeness in page objects when they are reused.
- Keep test files focused on workflow order and intent.
- Use `EXPECTED_VALUES` for stable expected text instead of duplicating strings in tests.
- Preserve the existing `HomePage extends BasePage` pattern unless the product area grows enough to require a new page object.

## QA Priorities

When adding or reviewing coverage, prioritize:

- Critical homepage load and title behavior.
- Navigation links and CTA interactions.
- Visibility and headings for primary sections.
- Responsive behavior at realistic mobile, tablet, and desktop widths.
- Keyboard accessibility, visible focus, semantic controls, and readable names.
- Empty, error, long-content, and loading states when the application exposes them.
- Console errors, failed requests, and user-visible layout regressions.

## Bug Reports

For UI defects, include:

- Exact reproduction steps.
- Expected behavior.
- Actual behavior.
- Browser and viewport.
- Relevant console or network failures.
- The smallest reliable regression test recommendation.

## Generated Artifacts

Do not edit or commit Playwright output folders unless explicitly requested:

- `playwright-report/`
- `test-results/`
- `dist/`
- `node_modules/`
