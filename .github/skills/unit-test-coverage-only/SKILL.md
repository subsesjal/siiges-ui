---
name: unit-test-coverage-only
description: "Use when: increasing or restoring test coverage for recent code changes without modifying production code; writing or updating unit tests only; validating with Jest coverage thresholds."
user-invocable: true
---

# Unit Test Coverage Only

## Purpose
Create or update unit tests to improve coverage for changed files while keeping application code unchanged.

## Hard Rules
- Do not modify application source code.
- Allowed edits: test files, test fixtures, test utils, mocks, snapshots, Jest config only when required to run tests.
- Prefer colocated tests near the changed module.
- Keep assertions behavior-focused and deterministic.
- Add regression tests for current changes and edge cases.

## Frequent Failures and Prevention

### Jest hoisting and mock factory scope errors
- Never reference out-of-scope variables directly inside `jest.mock(() => ...)` factories.
- Preferred safe pattern:
  1. `jest.mock('module', () => jest.fn())`
  2. `const mockedThing = jest.requireMock('module')`
  3. Configure `mockedThing` inside `beforeEach`.
- For service object mocks, create function mocks inside the factory and then read them with `jest.requireMock('module').fnName`.
- If you must reference external variables in a factory, ensure they are mock-prefixed and initialized safely before use.

### ESLint in test files
- All mock React components that receive props must declare `propTypes`.
- If a prop is optional, define `defaultProps` when the lint config requires it.
- Avoid JSX prop spreading (`<Comp {...props} />`) when `react/jsx-props-no-spreading` is enabled.
- Keep object literal formatting compliant with `object-curly-newline`.
- Keep lines at or under configured `max-len`.
- Remove dead declarations (`no-unused-vars`) immediately after refactors.

### Coverage-oriented test design
- Cover non-happy paths explicitly: loading, error, empty/null data, permission denied, validation failure, and cancel/abort branches.
- Add interaction tests for callbacks that actually execute branch logic (submit/cancel/create/update).
- Do not rely on render-only smoke tests for branch-heavy files.

### Path and import reliability
- Confirm test imports target the real source path before adding assertions.
- Prefer existing path aliases/patterns used by nearby tests to avoid false zero-coverage runs.

## Inputs
- Optional target scope from user.
- Current git diff as source of truth.

## Workflow
1. Identify changed files from git diff.
2. Map each changed module to existing tests.
3. Add missing unit tests for branches and error paths.
4. Run related tests first, then full impacted suite with coverage.
5. Report coverage delta and list new tests.

## Commands
- Detect changed files:
  - `git diff --name-only --diff-filter=ACMRTUXB HEAD~1..HEAD`
- Run focused tests:
  - `npm test -- --findRelatedTests <changed-files>`
- Run focused lint/errors first for touched tests:
  - `npm run lint -- <test-files>` (or project equivalent)
- Run coverage for package or workspace:
  - `npm test -- --coverage`

## Recommended Command Sequence
1. `npm test -- --findRelatedTests <changed-files>`
2. `npm run lint -- <touched-test-files>` (or equivalent)
3. `npm test -- --coverage --findRelatedTests <changed-files>`
4. Only if still failing, run wider package coverage to inspect uncovered branches.

## Definition of Done
- No production code edits.
- New or updated unit tests pass.
- Coverage improves or justified limitations are documented.
- Test names clearly describe behavior under test.
