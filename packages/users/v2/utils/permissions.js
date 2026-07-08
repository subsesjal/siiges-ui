const VIEW_ROLES = ['representante', 'admin', 'sicyt_editar'];
const EDIT_ROLES = ['admin', 'representante'];
const DELETE_ROLES = ['admin'];

const canViewUsers = (role) => VIEW_ROLES.includes(role);
const canCreateUsers = (role) => EDIT_ROLES.includes(role);
const canEditUsers = (role) => EDIT_ROLES.includes(role);
const canDeleteUsers = (role) => DELETE_ROLES.includes(role);

const getUserPermissions = (role) => ({
  canView: canViewUsers(role),
  canCreate: canCreateUsers(role),
  canEdit: canEditUsers(role),
  canDelete: canDeleteUsers(role),
});

export {
  canViewUsers,
  canCreateUsers,
  canEditUsers,
  canDeleteUsers,
  getUserPermissions,
};
