import {
  canCreateUsers,
  canDeleteUsers,
  canEditUsers,
  canViewUsers,
  getUserPermissions,
} from '../../../v2/utils/permissions';

describe('users v2 permissions', () => {
  it('allows view for representante, admin and sicyt_editar', () => {
    expect(canViewUsers('representante')).toBe(true);
    expect(canViewUsers('admin')).toBe(true);
    expect(canViewUsers('sicyt_editar')).toBe(true);
    expect(canViewUsers('docente')).toBe(false);
  });

  it('allows create and edit only for admin and representante', () => {
    expect(canCreateUsers('admin')).toBe(true);
    expect(canCreateUsers('representante')).toBe(true);
    expect(canCreateUsers('sicyt_editar')).toBe(false);

    expect(canEditUsers('admin')).toBe(true);
    expect(canEditUsers('representante')).toBe(true);
    expect(canEditUsers('sicyt_editar')).toBe(false);
  });

  it('allows delete only for admin', () => {
    expect(canDeleteUsers('admin')).toBe(true);
    expect(canDeleteUsers('representante')).toBe(false);
    expect(canDeleteUsers('sicyt_editar')).toBe(false);
  });

  it('builds full permissions object', () => {
    expect(getUserPermissions('admin')).toEqual({
      canView: true,
      canCreate: true,
      canEdit: true,
      canDelete: true,
    });

    expect(getUserPermissions('sicyt_editar')).toEqual({
      canView: true,
      canCreate: false,
      canEdit: false,
      canDelete: false,
    });
  });
});
