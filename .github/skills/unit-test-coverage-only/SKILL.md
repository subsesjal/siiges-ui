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
- Run coverage for package or workspace:
  - `npm test -- --coverage`

## Definition of Done
- No production code edits.
- New or updated unit tests pass.
- Coverage improves or justified limitations are documented.
- Test names clearly describe behavior under test.
