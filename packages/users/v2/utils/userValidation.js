import VIEW_STATE from '../constants/viewState';

const validatePassword = (value) => {
  const simbolosPermitidos = /[@#$%^&*()\-_=+[\]{}\\|;:'",<.>/?!.]/;

  if (!value) return 'Contrasena invalida.';
  if (value.length < 8 || value.length > 25) {
    return 'La contrasena debe tener entre 8 y 25 caracteres.';
  }
  if (!/[a-z]/.test(value)) return 'Debe incluir una letra minuscula.';
  if (!/[A-Z]/.test(value)) return 'Debe incluir una letra mayuscula.';
  if (!/[0-9]/.test(value)) return 'Debe incluir un digito.';
  if (!simbolosPermitidos.test(value)) return 'Debe incluir un simbolo.';
  return '';
};

const getFieldErrors = (form, mode) => {
  const errors = {};

  if (mode === VIEW_STATE.EDIT) {
    return errors;
  }

  if (!form.persona?.nombre) errors.nombre = 'Nombre requerido.';
  if (!form.persona?.apellidoPaterno) errors.apellidoPaterno = 'Apellido requerido.';
  if (!form.rolId) errors.rolId = 'Rol requerido.';
  if (!form.correo) errors.correo = 'Correo requerido.';

  if (mode === VIEW_STATE.CREATE) {
    if (!form.usuario) errors.usuario = 'Usuario requerido.';
    const passwordError = validatePassword(form.contrasena);
    if (passwordError) errors.contrasena = passwordError;
    if (!form.repeatContrasena) {
      errors.repeatContrasena = 'Repetir contrasena es requerido.';
    } else if (form.repeatContrasena !== form.contrasena) {
      errors.repeatContrasena = 'Las contrasenas deben coincidir.';
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
      return { valid: false, errors: { form: 'Rol invalido.' }, cleanedData: null };
    }
    if (payload.estatus !== undefined && Number.isNaN(payload.estatus)) {
      return { valid: false, errors: { form: 'Estatus invalido.' }, cleanedData: null };
    }
  }

  return { valid: true, errors: {}, cleanedData: payload };
};

export { validateUserForm, getFieldErrors };
