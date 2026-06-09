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

Optional scope from user: ${input:scope}
