---
mode: agent
description: "Generate unit tests for current git changes, improving coverage without modifying production code."
---

Goal: Create or update only unit tests for the current local changes.

Constraints:
- Do not edit production source files.
- Edit only test files, mocks, fixtures, and test helpers.
- If a production file appears to need a change, stop and explain the blocker instead of changing it.

Steps:
1. Read current git diff and list changed source files.
2. Find existing tests for those modules.
3. Add missing tests for new logic, error handling, and boundary cases.
4. Run the smallest relevant test set first, then coverage for affected scope.
5. Summarize:
   - Tests created/updated
   - Coverage impact
   - Any remaining uncovered lines and rationale

Implementation guardrails:
- Jest mocks must be hoisting-safe:
   - Avoid referencing out-of-scope variables directly in `jest.mock` factories.
   - Use `jest.requireMock` to retrieve and configure mocks after declaration.
- Test mocks must be ESLint-safe:
   - Add `propTypes` for mock components receiving props.
   - Add `defaultProps` for optional props when lint requires it.
   - Avoid JSX prop spreading in tests when forbidden.
   - Respect max line length and object-curly-newline formatting.
- For each changed UI container/component, include branch tests for:
   - loading
   - error
   - null/empty data
   - permission gating (if applicable)
   - submit success
   - validation or service failure
   - cancel/back navigation

Command sequence to execute:
1. `npm test -- --findRelatedTests <changed-files>`
2. `npm run lint -- <touched-test-files>` (or repo equivalent)
3. `npm test -- --coverage --findRelatedTests <changed-files>`

Optional scope from user: ${input:scope}
