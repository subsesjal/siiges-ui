import router from 'next/router';
import { validateFormData, createRecord, updateRecord } from '@siiges-ui/shared';
import { createInstitucionSchema } from '../schemas/createInstitucion.schema';
import { updateInstitucionSchema } from '../schemas/updateInstitucion.schema';

const DATA_MAPPING = {
  crear: () => ({
    endpoint: '/instituciones',
    schema: createInstitucionSchema,
    processor: createRecord,
  }),
  editar: (form) => ({
    endpoint: `/instituciones/${form.id}`,
    schema: updateInstitucionSchema,
    processor: updateRecord,
  }),
};

const validateErrorFields = (obj) => Object.keys(obj).every((key) => typeof obj[key] !== 'string' || obj[key].trim() === '');

const buildInstitucionData = (form) => ({
  usuarioId: form.usuarioId,
  tipoInstitucionId: form.tipoInstitucionId,
  nombre: form.nombreInstitucion,
  razonSocial: form.razonSocial,
  historia: form.historia,
  mision: form.mision,
  vision: form.vision,
  valoresInstitucionales: form.valoresInstitucionales,
  rector: {
    persona: {
      nombre: form.nombreRector,
      apellidoPaterno: form.apellidoPaterno,
      apellidoMaterno: form.apellidoMaterno,
      curp: form.curp,
      correoPrimario: form.correoPrimario,
    },

  },
  ratificacionesNombre: {
    nombrePropuesto1: form.nombrePropuesto1,
    nombrePropuesto2: form.nombrePropuesto2,
    nombrePropuesto3: form.nombrePropuesto3,
    esNombreAutorizado: form.esNombreAutorizado,
  },
});

const submitInstitucion = async ({
  form,
  accion,
  errorFields,
  setNoti,
  setLoading,
}) => {
  setLoading(true);
  if (!validateErrorFields(errorFields)) {
    setNoti({
      open: true,
      message: '¡Revisa!, que los campos requeridos hayan sido llenados correctamente',
      type: 'error',
    });
    setLoading(false);

    return false;
  }

  const {
    endpoint, schema, processor,
  } = DATA_MAPPING[accion](form);

  const formattedData = buildInstitucionData(form);

  const { valid, data } = validateFormData({
    dataBody: formattedData,
    cleanData: true,
    schema,
  });

  if (!valid) {
    setNoti({
      open: true,
      message: '¡Revisa!, que los campos requeridos hayan sido llenados correctamente',
      type: 'error',
    });
    setLoading(false);

    return false;
  }

  const response = await processor({ data, endpoint });

  if (response.statusCode === 201 || response.statusCode === 200) {
    setLoading(false);
    setNoti({
      open: true,
      message: '¡Registro exitoso!',
      type: 'success',
    });
    router.back();
    return true;
  }

  setNoti({
    open: true,
    message: response.errorMessage,
    type: 'error',
  });

  return response;
};

const setErrorState = (name, errorMessage, setError) => {
  setError((prevError) => ({ ...prevError, [name]: errorMessage }));
};

const errors = {
  nombreInstitucion: (form, setError) => {
    setErrorState(
      'nombreInstitucion',
      !form.nombreInstitucion
        ? 'Nombre inválido'
        : '',
      setError,
    );
  },
  razonSocial: (form, setError) => {
    setErrorState(
      'razonSocial',
      !form.razonSocial
        ? 'Razón Social inválida'
        : '',
      setError,
    );
  },
  historia: (form, setError) => {
    setErrorState(
      'historia',
      !form.historia
        ? 'Historia de institución inválida'
        : '',
      setError,
    );
  },
  vision: (form, setError) => {
    setErrorState(
      'vision',
      !form.vision
        ? 'Visión de institución inválida'
        : '',
      setError,
    );
  },
  mision: (form, setError) => {
    setErrorState(
      'mision',
      !form.mision
        ? 'Misión de institución inválida'
        : '',
      setError,
    );
  },
  valoresInstitucionales: (form, setError) => {
    setErrorState(
      'valoresInstitucionales',
      !form.valoresInstitucionales
        ? 'Valores de institución inválido'
        : '',
      setError,
    );
  },
  nombreRector: (form, setError) => setErrorState(
    'nombreRector',
    !form.nombreRector
      ? 'Nombre inválido'
      : '',
    setError,
  ),
  apellidoPaterno: (form, setError) => setErrorState(
    'apellidoPaterno',
    !form.apellidoPaterno
      ? 'Primer Apellido inválido'
      : '',
    setError,
  ),
  apellidoMaterno: (form, setError) => setErrorState(
    'apellidoMaterno',
    !form.apellidoMaterno
      ? 'Segundo Apellido inválido'
      : '',
    setError,
  ),
  curp: (form, setError) => {
    const { curp } = form;
    let errorMessage = '';
    if (curp && curp.length !== 18) {
      errorMessage = 'La CURP debe contener 18 caracteres';
    }
    setErrorState('curp', errorMessage, setError);
  },
  correoPrimario: (form, setError) => {
    const { correoPrimario } = form;
    let errorMessage = '';
    if (correoPrimario && !correoPrimario.match(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/)) {
      errorMessage = 'El correo electrónico no es válido';
    }
    setErrorState('correoPrimario', errorMessage, setError);
  },
  nombrePropuesto1: (form, setError) => {
    setErrorState(
      'nombrePropuesto1',
      !form.nombrePropuesto1
        ? 'Nombre propuesto inválido'
        : '',
      setError,
    );
  },
  nombrePropuesto2: (form, setError) => {
    setErrorState(
      'nombrePropuesto2',
      !form.nombrePropuesto2
        ? 'Nombre propuesto inválido'
        : '',
      setError,
    );
  },
  nombrePropuesto3: (form, setError) => {
    setErrorState(
      'nombrePropuesto3',
      !form.nombrePropuesto3
        ? 'Nombre propuesto inválido'
        : '',
      setError,
    );
  },
};

const handleOnBlur = (e, { form, setError, isRequired }) => {
  const { name, required } = e.target;
  if (required || isRequired
    || name === 'correoPrimario' || name === 'curp') {
    errors[name](form, setError);
  }
};

const handleOnChange = (e, { setForm }) => {
  const { name, value } = e.target;
  setForm((prevForm) => ({
    ...prevForm,
    ...{ [name]: value },
  }));
};

const handleCancel = () => {
  router.back();
};

export {
  submitInstitucion,
  handleOnChange,
  handleCancel,
  handleOnBlur,
};
