import { getFieldErrors, validateUserForm } from '../../../v2/utils/userValidation';

const VIEW_STATE = Object.freeze({
  CREATE: 'CREATE',
  EDIT: 'EDIT',
  VIEW: 'VIEW',
});

const baseForm = {
  correo: 'test@example.com',
  persona: {
    nombre: 'Juan',
    apellidoPaterno: 'Perez',
    apellidoMaterno: '',
    curp: '',
    rfc: '',
    celular: '',
    telefono: '',
  },
  rolId: '1',
};

describe('userValidation - getFieldErrors', () => {
  it('returns no errors for a valid EDIT form', () => {
    const errors = getFieldErrors(baseForm, VIEW_STATE.EDIT);
    expect(Object.keys(errors)).toHaveLength(0);
  });

  it('returns error when correo is empty', () => {
    const form = { ...baseForm, correo: '' };
    const errors = getFieldErrors(form, VIEW_STATE.EDIT);
    expect(errors.correo).toBeDefined();
  });

  it('returns error when correo is invalid format', () => {
    const form = { ...baseForm, correo: 'not-an-email' };
    const errors = getFieldErrors(form, VIEW_STATE.EDIT);
    expect(errors.correo).toBeDefined();
  });

  it('returns error when correo is too short', () => {
    const form = { ...baseForm, correo: 'a@b' };
    const errors = getFieldErrors(form, VIEW_STATE.EDIT);
    expect(errors.correo).toBeDefined();
  });

  it('returns error when CURP length is not 18', () => {
    const form = { ...baseForm, persona: { ...baseForm.persona, curp: 'ABC' } };
    const errors = getFieldErrors(form, VIEW_STATE.EDIT);
    expect(errors.curp).toBeDefined();
  });

  it('does not return curp error when curp is empty', () => {
    const form = { ...baseForm, persona: { ...baseForm.persona, curp: '' } };
    const errors = getFieldErrors(form, VIEW_STATE.EDIT);
    expect(errors.curp).toBeUndefined();
  });

  it('accepts a valid 18-char CURP', () => {
    const form = { ...baseForm, persona: { ...baseForm.persona, curp: 'ABCD123456HDFXXX01' } };
    const errors = getFieldErrors(form, VIEW_STATE.EDIT);
    expect(errors.curp).toBeUndefined();
  });

  it('returns error when RFC is not 12 or 13 chars', () => {
    const form = { ...baseForm, persona: { ...baseForm.persona, rfc: 'ABC' } };
    const errors = getFieldErrors(form, VIEW_STATE.EDIT);
    expect(errors.rfc).toBeDefined();
  });

  it('accepts 12-char RFC', () => {
    const form = { ...baseForm, persona: { ...baseForm.persona, rfc: 'ABCD123456EF' } };
    const errors = getFieldErrors(form, VIEW_STATE.EDIT);
    expect(errors.rfc).toBeUndefined();
  });

  it('accepts 13-char RFC', () => {
    const form = { ...baseForm, persona: { ...baseForm.persona, rfc: 'ABCD123456EFG' } };
    const errors = getFieldErrors(form, VIEW_STATE.EDIT);
    expect(errors.rfc).toBeUndefined();
  });

  it('returns error when celular has wrong length', () => {
    const form = { ...baseForm, persona: { ...baseForm.persona, celular: '123' } };
    const errors = getFieldErrors(form, VIEW_STATE.EDIT);
    expect(errors.celular).toBeDefined();
  });

  it('accepts a valid 10-digit celular', () => {
    const form = { ...baseForm, persona: { ...baseForm.persona, celular: '5512345678' } };
    const errors = getFieldErrors(form, VIEW_STATE.EDIT);
    expect(errors.celular).toBeUndefined();
  });

  it('returns error when telefono has non-digits', () => {
    const form = { ...baseForm, persona: { ...baseForm.persona, telefono: '123ABC4567' } };
    const errors = getFieldErrors(form, VIEW_STATE.EDIT);
    expect(errors.telefono).toBeDefined();
  });

  it('returns error when nombre is missing', () => {
    const form = { ...baseForm, persona: { ...baseForm.persona, nombre: '' } };
    const errors = getFieldErrors(form, VIEW_STATE.EDIT);
    expect(errors.nombre).toBeDefined();
  });

  it('returns error when apellidoPaterno is missing', () => {
    const form = { ...baseForm, persona: { ...baseForm.persona, apellidoPaterno: '' } };
    const errors = getFieldErrors(form, VIEW_STATE.EDIT);
    expect(errors.apellidoPaterno).toBeDefined();
  });

  it('returns rolId error in non-EDIT mode when rolId missing', () => {
    const form = { ...baseForm, rolId: '' };
    const errors = getFieldErrors(form, VIEW_STATE.CREATE);
    expect(errors.rolId).toBeDefined();
  });

  it('does not require rolId in EDIT mode', () => {
    const form = { ...baseForm, rolId: '' };
    const errors = getFieldErrors(form, VIEW_STATE.EDIT);
    expect(errors.rolId).toBeUndefined();
  });

  it('requires usuario and contrasena in CREATE mode', () => {
    const form = {
      ...baseForm, rolId: '1', usuario: '', contrasena: '',
    };
    const errors = getFieldErrors(form, VIEW_STATE.CREATE);
    expect(errors.usuario).toBeDefined();
    expect(errors.contrasena).toBeDefined();
  });

  it('returns password error when too short', () => {
    const form = {
      ...baseForm,
      rolId: '1',
      usuario: 'user1',
      contrasena: 'Abc1@',
      repeatContrasena: 'Abc1@',
    };
    const errors = getFieldErrors(form, VIEW_STATE.CREATE);
    expect(errors.contrasena).toBeDefined();
  });

  it('returns error when passwords do not match', () => {
    const form = {
      ...baseForm,
      rolId: '1',
      usuario: 'user1',
      contrasena: 'Abc12345@',
      repeatContrasena: 'Different1@',
    };
    const errors = getFieldErrors(form, VIEW_STATE.CREATE);
    expect(errors.repeatContrasena).toBeDefined();
  });
});

describe('userValidation - validateUserForm', () => {
  it('returns valid:true for a valid EDIT payload', () => {
    const payload = { rolId: 1, estatus: 1 };
    const result = validateUserForm({ form: baseForm, mode: VIEW_STATE.EDIT, payload });
    expect(result.valid).toBe(true);
    expect(result.cleanedData).toBe(payload);
    expect(result.errors).toEqual({});
  });

  it('returns valid:false when form has errors', () => {
    const form = { ...baseForm, correo: '' };
    const result = validateUserForm({ form, mode: VIEW_STATE.EDIT, payload: {} });
    expect(result.valid).toBe(false);
    expect(result.cleanedData).toBeNull();
  });

  it('returns error when rolId is NaN in EDIT mode', () => {
    const payload = { rolId: NaN };
    const result = validateUserForm({ form: baseForm, mode: VIEW_STATE.EDIT, payload });
    expect(result.valid).toBe(false);
  });

  it('returns error when estatus is NaN in EDIT mode', () => {
    const payload = { estatus: NaN };
    const result = validateUserForm({ form: baseForm, mode: VIEW_STATE.EDIT, payload });
    expect(result.valid).toBe(false);
  });

  it('returns valid:true when EDIT payload has no rolId or estatus', () => {
    const payload = {};
    const result = validateUserForm({ form: baseForm, mode: VIEW_STATE.EDIT, payload });
    expect(result.valid).toBe(true);
  });
});
