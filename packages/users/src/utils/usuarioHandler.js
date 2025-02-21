import { validateFormData, getToken } from '@siiges-ui/shared';
import { createUsuarioSchema } from '../schemas/createUsuario.schema';
import { updateUsuarioSchema } from '../schemas/updateUsuario.schema';

const ENDPOINT_MAP = {
  representante: (id) => `api/v1/usuarios/${id}/usuario`,
  admin: () => 'api/v1/usuarios',
};

const DATA_MAPPING = {
  crear: (form, { rol, id }) => ({
    endpoint: ENDPOINT_MAP[rol](id),
    method: 'POST',
    schema: createUsuarioSchema,
  }),
  editar: (form) => ({
    endpoint: `api/v1/usuarios/${form.id}`,
    method: 'PATCH',
    schema: updateUsuarioSchema,
  }),
};

const setErrorState = (name, errorMessage, setError) => {
  setError((prevError) => ({ ...prevError, [name]: errorMessage }));
};

const errors = {
  nombre: (form, setError) => setErrorState(
    'nombre',
    !form.persona.nombre ? '¡Nombre inválido!' : '',
    setError,
  ),
  apellidoPaterno: (form, setError) => setErrorState(
    'apellidoPaterno',
    !form.persona.apellidoPaterno ? '¡Primer Apellido inválido!' : '',
    setError,
  ),
  apellidoMaterno: (form, setError) => setErrorState(
    'apellidoMaterno',
    !form.persona.apellidoMaterno ? '¡Segundo Apellido inválido!' : '',
    setError,
  ),
  rolId: (form, setError) => {
    setErrorState('rolId', !form.rolId ? '¡Rol inválido!' : '', setError);
  },
  tituloCargo: (form, setError) => setErrorState(
    'tituloCargo',
    !form.persona.tituloCargo ? '¡Cargo inválido!' : '',
    setError,
  ),
  correo: (form, setError) => setErrorState('correo', !form.correo ? '¡Correo inválido!' : '', setError),
  usuario: (form, setError) => setErrorState(
    'usuario',
    !form.usuario ? '¡Usuario inválido!' : '',
    setError,
  ),
  contrasena: (form, setError) => {
    const { contrasena } = form;
    let errorMessage = '';
    const simbolosPermitidos = /[@#$%^&*()\-_=+[\]{}\\|;:'",<.>/?]/;

    if (!contrasena) {
      errorMessage = '¡Contraseña inválida!';
    } else if (contrasena.length < 8 || contrasena.length > 25) {
      errorMessage = '¡La contraseña debe contener entre 8 y 25 caracteres!';
    } else if (!/[a-z]/.test(contrasena)) {
      errorMessage = '¡La contraseña debe contener al menos una letra minúscula!';
    } else if (!/[A-Z]/.test(contrasena)) {
      errorMessage = '¡La contraseña debe contener al menos una letra mayúscula!';
    } else if (!/[0-9]/.test(contrasena)) {
      errorMessage = '¡La contraseña debe contener al menos un dígito!';
    } else if (!simbolosPermitidos.test(contrasena)) {
      errorMessage = '¡La contraseña debe contener al menos un símbolo';
    }

    setErrorState('contrasena', errorMessage, setError);
  },
  repeatContrasena: (form, setError) => setErrorState(
    'repeatContrasena',
    form.repeatContrasena !== form.contrasena
      ? '¡Las contraseñas deben ser iguales!'
      : '',
    setError,
  ),
};

const handleOnBlur = (e, { form, setError, isRequired }) => {
  const { name, required } = e.target;
  if (required || isRequired) {
    errors[name](form, setError);
  }
};

const handleOnChange = (e, { setForm }) => {
  const { name, value } = e.target;
  setForm((prevForm) => ({
    ...prevForm,
    ...(name === 'nombre'
    || name === 'apellidoPaterno'
    || name === 'apellidoMaterno'
    || name === 'tituloCargo'
      ? { persona: { ...prevForm.persona, [name]: value } }
      : { [name]: value }),
  }));
};

const handleRolOptions = (setRolOptions, session, useEffect) => {
  useEffect(() => {
    if (session.rol === 'representante') {
      setRolOptions([
        {
          id: '',
          nombre: '',
        },
        {
          id: '4',
          nombre: 'Gestor',
        },
        {
          id: '12',
          nombre: 'Control escolar IES',
        },
        {
          id: '19',
          nombre: 'Becas IES',
        },
      ]);
    }

    if (session.rol === 'admin') {
      setRolOptions([
        {
          id: '',
          nombre: '',
        },
        {
          id: '2',
          nombre: 'Administrador',
        },
        {
          id: '3',
          nombre: 'Representante Legal',
        },
        {
          id: '5',
          nombre: 'Evaluador',
        },
        {
          id: '6',
          nombre: 'Inspector',
        },
        {
          id: '7',
          nombre: 'Revisión de documentos',
        },
        {
          id: '8',
          nombre: 'Sicyt de consulta',
        },
        {
          id: '9',
          nombre: 'Sicyt de editar',
        },
        {
          id: '10',
          nombre: 'Comité de evaluación',
        },
        {
          id: '11',
          nombre: 'Jefe de inspectores',
        },
        {
          id: '13',
          nombre: 'Control escolar SICYT',
        },
        {
          id: '14',
          nombre: 'Equivalencia SICYT',
        },
        {
          id: '17',
          nombre: 'Capturista OPD',
        },
        {
          id: '20',
          nombre: 'Becas  SICYT',
        },
      ]);
    }
  }, []);
};

const validateErrorFields = (obj) => Object.keys(obj).every(
  (key) => typeof obj[key] !== 'string' || obj[key].trim() === '',
);

const submitUsuario = ({
  accion,
  form,
  session,
  setForm,
  setEndpoint,
  setMethod,
  setNoti,
  errorFields,
}) => {
  const { endpoint, method, schema } = DATA_MAPPING[accion](form, session);

  if (!validateErrorFields(errorFields)) {
    setNoti({
      open: true,
      message:
        '¡Revisa que los campos requeridos hayan sido llenados correctamente!',
      type: 'error',
    });

    return false;
  }

  const { valid, data } = validateFormData({
    dataBody: form,
    cleanData: true,
    schema,
  });

  if (!valid) {
    setNoti({
      open: true,
      message:
        '¡Revisa que los campos requeridos hayan sido llenados correctamente!',
      type: 'error',
    });

    return false;
  }

  setForm(data);
  setMethod(method);
  setEndpoint(endpoint);

  return true;
};

const deleteUsuario = (id, handleDeleteClick) => {
  const token = getToken();
  const apikey = process.env.NEXT_PUBLIC_API_KEY;
  const url = process.env.NEXT_PUBLIC_URL;
  fetch(`${url}/api/v1/usuarios/${id}`, {
    method: 'DELETE',
    headers: { api_key: apikey, Authorization: `Bearer ${token}` },
  }).then(handleDeleteClick(id));
};

export {
  handleOnBlur,
  handleOnChange,
  handleRolOptions,
  submitUsuario,
  deleteUsuario,
  errors,
};
