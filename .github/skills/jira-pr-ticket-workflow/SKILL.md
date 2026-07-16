---
name: jira-pr-ticket-workflow
description: "Use when: committing and publishing changes tied to a Jira ticket branch, enforcing branch/commit conventions, pushing to origin, and opening PRs to upstream/develop."
user-invocable: true
---

# Jira Ticket PR Workflow

## Purpose
Standardize the end-to-end flow for preparing pull requests associated with Jira tickets.

## Inputs Required
- Jira ticket key, for example: `SDT-1599`.
- Jira validation mode:
  - Jira URL validation if access is available.
  - Naming-only validation with `SDT-####` pattern.
- Commit message selected by the user from Spanish options.

## Mandatory Rules
1. Never commit directly on `main` or `develop`.
2. Branch name must start with the Jira key.
3. Commit message must start with the Jira key branch prefix.
4. Push branch to `origin`.
5. Create PR from `origin/<ticket-branch>` into `upstream/develop`.

## Execution Steps
1. Inspect git state:
   - `git rev-parse --abbrev-ref HEAD`
   - `git status --short`
   - `git remote -v`
2. If current branch is `main` or `develop`, ask for Jira ticket key.
3. Validate ticket:
   - If Jira access available: verify ticket URL returns valid issue.
   - Otherwise validate with regex `^SDT-[0-9]+`.
4. Ensure ticket branch exists:
   - If exists locally: `git checkout <branch>`.
   - If exists remotely only: `git checkout -b <branch> origin/<branch>`.
   - If not exists: create from latest develop baseline.
5. Rebase branch on `upstream/develop`:
   - `git fetch upstream`
   - `git rebase upstream/develop`
6. If user started on another branch with local changes, safely move changes using stash before checkout/rebase and then restore.
7. Propose 3 Spanish commit message options with required prefix and ask user to choose one.
8. Stage, commit, and run project-required hooks:
   - `git add <files>`
   - `git commit -m "<selected message>"`
9. Push to origin:
   - `git push -u origin <branch>`
10. Create PR to upstream:
   - Preferred: `gh pr create --repo subsesjal/siiges-ui --base develop --head <origin-owner>:<branch> --title "<title>" --body "<body>"`
   - Fallback when `gh` is unavailable: provide compare URL
     `https://github.com/subsesjal/siiges-ui/compare/develop...<origin-owner>:<branch>?expand=1`

## PR Checklist
- Branch is ticket-related and rebased.
- Commit prefix matches branch/ticket.
- Tests/hooks passed.
- PR target is `upstream/develop`.
- Include summary, scope, validation, and risks in PR body.

## Failure Handling
- If rebase conflicts occur, stop and ask user how to resolve conflict strategy.
- If hooks fail, fix issues and retry commit.
- If PR cannot be auto-created, provide exact manual URL and prefilled title/body text.
