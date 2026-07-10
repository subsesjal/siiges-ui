import VIEW_STATE from '../constants/viewState';

const EMAIL_REGEX = /^[\w.%+-]+@[A-Za-z0-9.-]+\.[A-Z]{2,}$/i;
const PHONE_REGEX = /^\d{10}$/;

const isEmpty = (value) => value === undefined || value === null || String(value).trim() === '';

const validateContactoFields = (form) => {
  const contactoErrors = {};
  const correo = String(form.correo || '').trim();
  const curp = String(form.persona?.curp || '').trim();
  const rfc = String(form.persona?.rfc || '').trim();
  const celular = String(form.persona?.celular || '').trim();
  const telefono = String(form.persona?.telefono || '').trim();

  if (isEmpty(correo)) {
    contactoErrors.correo = 'Correo requerido.';
  } else if (correo.length < 3 || correo.length > 50 || !EMAIL_REGEX.test(correo)) {
    contactoErrors.correo = 'El correo debe ser válido y tener entre 3 y 50 caracteres.';
  }

  if (curp && curp.length !== 18) {
    contactoErrors.curp = 'La CURP debe contener 18 caracteres.';
  }

  if (rfc && rfc.length !== 12 && rfc.length !== 13) {
    contactoErrors.rfc = 'El RFC debe contener 12 o 13 caracteres.';
  }

  if (celular && !PHONE_REGEX.test(celular)) {
    contactoErrors.celular = 'El celular debe contener exactamente 10 dígitos numéricos.';
  }

  if (telefono && !PHONE_REGEX.test(telefono)) {
    contactoErrors.telefono = 'El teléfono debe contener exactamente 10 dígitos numéricos.';
  }

  return contactoErrors;
};

const validatePassword = (value) => {
  const simbolosPermitidos = /[@#$%^&*()\-_=+[\]{}\\|;:'",<.>/?!.]/;

  if (!value) return 'Contraseña inválida.';
  if (value.length < 8 || value.length > 25) {
    return 'La contraseña debe tener entre 8 y 25 caracteres.';
  }
  if (!/[a-z]/.test(value)) return 'Debe incluir una letra minúscula.';
  if (!/[A-Z]/.test(value)) return 'Debe incluir una letra mayúscula.';
  if (!/[0-9]/.test(value)) return 'Debe incluir un dígito.';
  if (!simbolosPermitidos.test(value)) return 'Debe incluir un símbolo.';
  return '';
};

const getFieldErrors = (form, mode) => {
  const contactoErrors = validateContactoFields(form);
  const errors = { ...contactoErrors };

  if (!form.persona?.nombre) errors.nombre = 'Nombre requerido.';
  if (!form.persona?.apellidoPaterno) errors.apellidoPaterno = 'Apellido requerido.';

  if (mode !== VIEW_STATE.EDIT && !form.rolId) {
    errors.rolId = 'Rol requerido.';
  }

  if (mode === VIEW_STATE.CREATE) {
    if (!form.usuario) errors.usuario = 'Usuario requerido.';
    const passwordError = validatePassword(form.contrasena);
    if (passwordError) errors.contrasena = passwordError;
    if (!form.repeatContrasena) {
      errors.repeatContrasena = 'Repetir contraseña es requerido.';
    } else if (form.repeatContrasena !== form.contrasena) {
      errors.repeatContrasena = 'Las contraseñas deben coincidir.';
    }
  }

  return errors;
};

const validateUserForm = ({ form, mode, payload }) => {
  const errors = getFieldErrors(form, mode);
  if (Object.keys(errors).length > 0) {
    return { valid: false, errors, cleanedData: null };
  }

  if (mode === VIEW_STATE.EDIT) {
    if (payload.rolId !== undefined && Number.isNaN(payload.rolId)) {
      return { valid: false, errors: { form: 'Rol inválido.' }, cleanedData: null };
    }
    if (payload.estatus !== undefined && Number.isNaN(payload.estatus)) {
      return { valid: false, errors: { form: 'Estatus inválido.' }, cleanedData: null };
    }
  }

  return { valid: true, errors: {}, cleanedData: payload };
};

export { validateUserForm, getFieldErrors };
