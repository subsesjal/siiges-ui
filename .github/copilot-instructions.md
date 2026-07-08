# Copilot Instructions - Users v2 Form Conventions

These rules apply to changes in the users v2 flow for create, view, modify, and delete actions.

## Goal
Keep copy, permissions, and UI behavior consistent across users v2 forms and table views.

## Copy Conventions
- Table add button: `Agregar usuario`.
- Layout title by action:
  - Create: `Agregar usuario`
  - View: `Consultar usuario`
  - Modify: `Modificar usuario`
- Form title in create/view/modify: `Datos del usuario`.
- In view mode, use the bottom `Regresar` button (shared orange style convention).
- Do not use `Volver a tabla` in edit or view forms.

## Action Conventions
- Create:
  - Show `Cancelar` and `Guardar` buttons.
  - Keep create-field rules (including `contrasena` and `repeatContrasena`).
- View:
  - Read-only form.
  - Show only `Regresar` in the form footer.
- Modify:
  - Do not show `Volver a tabla`.
  - Keep `Cancelar` as the return action.
- Delete:
  - Available only for role `admin`.
  - Requires a confirmation modal before running DELETE.
  - Endpoint: `DELETE /api/v1/usuarios/:usuarioId`.

## Permissions (users v2)
- `canView`: `representante`, `admin`, `sicyt_editar`
- `canCreate`: `admin`, `representante`
- `canEdit`: `admin`, `representante`
- `canDelete`: `admin`

## Implementation Rules
- Reuse shared components already used in the module (`ButtonsForm`, `DefaultModal`, `ButtonSimple`).
- Keep copy consistent with this guide in table, layout, and form.
- Do not introduce new copy conventions without updating this file.

## Minimum Validation After Changes
- Run users v2 tests related to touched files.
- Verify no lint/compile errors in modified files.
- Confirm delete action is hidden for roles without permission.
