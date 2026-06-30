import { renderHook, act } from '@testing-library/react';
import useUserForm from '../../../v2/hooks/useUserForm';

const VIEW_STATE = Object.freeze({
  CREATE: 'CREATE',
  EDIT: 'EDIT',
});

const mockUser = {
  id: 1,
  correo: 'user@test.com',
  usuario: 'testuser',
  estatus: 1,
  actualizado: 1,
  rol: { id: 2 },
  persona: {
    nombre: 'Juan',
    apellidoPaterno: 'Perez',
    apellidoMaterno: 'Garcia',
    sexo: 'Masculino',
    nacionalidad: 'Mexicana',
    rfc: '',
    curp: '',
    celular: '',
    telefono: '',
    tituloCargo: 'Director',
  },
};

describe('useUserForm - CREATE mode', () => {
  it('initializes with empty form', () => {
    const { result } = renderHook(() => useUserForm({
      mode: VIEW_STATE.CREATE,
      initialUser: null,
      sessionRole: 'admin',
    }));
    expect(result.current.form.persona.nombre).toBe('');
    expect(result.current.form.correo).toBe('');
  });

  it('handleChange updates top-level fields', () => {
    const { result } = renderHook(() => useUserForm({
      mode: VIEW_STATE.CREATE,
      initialUser: null,
      sessionRole: 'admin',
    }));

    act(() => {
      result.current.handleChange({ target: { name: 'correo', value: 'new@test.com' } });
    });

    expect(result.current.form.correo).toBe('new@test.com');
  });

  it('handleChange updates persona fields', () => {
    const { result } = renderHook(() => useUserForm({
      mode: VIEW_STATE.CREATE,
      initialUser: null,
      sessionRole: 'admin',
    }));

    act(() => {
      result.current.handleChange({ target: { name: 'nombre', value: 'Maria' } });
    });

    expect(result.current.form.persona.nombre).toBe('Maria');
  });

  it('validate returns invalid when required fields are missing', () => {
    const { result } = renderHook(() => useUserForm({
      mode: VIEW_STATE.CREATE,
      initialUser: null,
      sessionRole: 'admin',
    }));

    let validationResult;
    act(() => {
      validationResult = result.current.validate();
    });

    expect(validationResult.valid).toBe(false);
  });

  it('handleBlur sets error for specific field', () => {
    const { result } = renderHook(() => useUserForm({
      mode: VIEW_STATE.CREATE,
      initialUser: null,
      sessionRole: 'admin',
    }));

    act(() => {
      result.current.handleBlur({ target: { name: 'correo' } });
    });

    expect(result.current.errors.correo).toBeDefined();
  });
});

describe('useUserForm - EDIT mode', () => {
  it('initializes with user data when provided', () => {
    const { result } = renderHook(() => useUserForm({
      mode: VIEW_STATE.EDIT,
      initialUser: mockUser,
      sessionRole: 'admin',
    }));

    expect(result.current.form.correo).toBe('user@test.com');
    expect(result.current.form.persona.nombre).toBe('Juan');
    expect(result.current.form.persona.sexo).toBe('Masculino');
  });

  it('returns initialRoleId from user', () => {
    const { result } = renderHook(() => useUserForm({
      mode: VIEW_STATE.EDIT,
      initialUser: mockUser,
      sessionRole: 'admin',
    }));

    expect(result.current.initialRoleId).toBe('2');
  });

  it('validate returns valid for a complete EDIT form', () => {
    const { result } = renderHook(() => useUserForm({
      mode: VIEW_STATE.EDIT,
      initialUser: mockUser,
      sessionRole: 'admin',
    }));

    let validationResult;
    act(() => {
      validationResult = result.current.validate();
    });

    expect(validationResult.valid).toBe(true);
  });

  it('re-initializes form when initialUser changes', () => {
    let currentUser = mockUser;
    const { result, rerender } = renderHook(() => useUserForm({
      mode: VIEW_STATE.EDIT,
      initialUser: currentUser,
      sessionRole: 'admin',
    }));

    expect(result.current.form.correo).toBe('user@test.com');

    currentUser = { ...mockUser, correo: 'changed@test.com' };
    rerender();

    expect(result.current.form.correo).toBe('changed@test.com');
  });
});
