---
name: users-v2-form-actions-conventions
description: "Use when: implementing or updating users v2 create/view/edit/delete actions and related UI copy, permissions, and button behavior."
user-invocable: true
---

# Users v2 Form Actions Conventions

## Purpose
Apply consistent conventions for users v2 actions: create, view, modify, and delete.

## Required Copy
- Table add button: `Agregar usuario`.
- Layout titles:
  - CREATE: `Agregar usuario`
  - VIEW: `Consultar usuario`
  - EDIT: `Modificar usuario`
- Form title in CREATE/VIEW/EDIT: `Datos del usuario`.

## Required UI Behavior
- VIEW mode:
  - Read-only fields.
  - Bottom button must be `Regresar`.
  - Do not show `Volver a tabla`.
- EDIT mode:
  - Keep `Cancelar` and `Guardar` behavior.
  - Do not show `Volver a tabla`.
- DELETE action:
  - Only for `admin` role.
  - Show confirmation modal before API call.
  - Use `DELETE /api/v1/usuarios/:usuarioId`.

## Permission Rules
- canView: `representante`, `admin`, `sicyt_editar`
- canCreate: `admin`, `representante`
- canEdit: `admin`, `representante`
- canDelete: `admin`

## Implementation Checklist
1. Update permissions in `packages/users/v2/utils/permissions.js` if needed.
2. Update action icons in `packages/users/v2/components/UsersActionIcons/index.jsx`.
3. Update table wiring in `packages/users/v2/components/UsersTable/index.jsx`.
4. Update list page behavior/modal in `packages/users/v2/components/UsersPage/index.jsx`.
5. Update route layout titles in `packages/users/v2/components/UserRoutePage/index.jsx`.
6. Update form title/buttons in `packages/users/v2/components/UserForm/index.jsx`.
7. Update affected tests under `packages/users/__tests__/v2/components/`.

## Validation Checklist
1. Run focused tests for touched files.
2. Verify no lint/compile errors in modified files.
3. Confirm role-based visibility for delete action (admin only).
