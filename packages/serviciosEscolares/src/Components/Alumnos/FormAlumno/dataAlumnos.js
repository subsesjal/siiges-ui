export const generos = [
  { id: 1, nombre: 'Masculino' },
  { id: 2, nombre: 'Femenino' },
  { id: 3, nombre: 'Prefiero no decirlo' },
];

export const nacionalidad = [
  { id: 1, nombre: 'Mexicana' },
  { id: 2, nombre: 'Otro' },
];

export const situaciones = [
  { id: 1, nombre: 'Activo' },
  { id: 2, nombre: 'Inactivo' },
  { id: 3, nombre: 'Egresado' },
  { id: 4, nombre: 'Baja' },
];

export const campos = [
  { id: 'nombre', label: 'Nombre', type: 'text' },
  { id: 'apellidoPaterno', label: 'Primer Apellido', type: 'text' },
  { id: 'apellidoMaterno', label: 'Segundo Apellido', type: 'text' },
  { id: 'fechaNacimiento', label: 'Fecha de nacimiento', type: 'date' },
  {
    id: 'sexo',
    label: 'Género',
    type: 'select',
    options: generos,
  },
  {
    id: 'nacionalidad',
    label: 'Nacionalidad',
    type: 'select',
    options: nacionalidad,
  },
  { id: 'correoPrimario', label: 'Correo', type: 'text' },
  { id: 'telefono', label: 'Teléfono', type: 'text' },
  { id: 'celular', label: 'Celular', type: 'text' },
  { id: 'curp', label: 'CURP', type: 'text' },
  { id: 'matricula', label: 'Matrícula', type: 'text' },
  { id: 'alumnoCicloIngreso', label: 'Ciclo de Ingreso', type: 'text' },
  {
    id: 'situacionId',
    label: 'Situación',
    type: 'select',
    options: situaciones,
  },
];

export const mailValidator = (email) => {
  const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return regex.test(email);
};

export const curpValidator = (curp) => curp?.length === 18;

export const cicloIngresoValidator = (ciclo) => {
  const regex = /^\d{4}[ABC]$/;
  return regex.test(ciclo);
};

export const setFormData = (data) => ({
  situacionId: data?.situacionId || 2,
  programaId: data?.programaId,
  matricula: data?.matricula,
  alumnoCicloIngreso: data?.alumnoCicloIngreso,
  estatus: 1,
  persona: {
    nombre: data?.nombre,
    apellidoPaterno: data?.apellidoPaterno,
    apellidoMaterno: data?.apellidoMaterno,
    fechaNacimiento: data?.fechaNacimiento && new Date(data?.fechaNacimiento).toISOString(),
    sexo: generos[data.sexo - 1]?.nombre,
    nacionalidad: nacionalidad[data.nacionalidad - 1]?.nombre,
    telefono: data?.telefono,
    celular: data?.celular,
    curp: data?.curp,
    correoPrimario: data?.correoPrimario,
  },
});

const validateForm = (data) => {
  const queryEvaluate = (value) => value === undefined || value === null || value === '';

  // 1. Validar que los campos raíz no estén vacíos
  const firstValidate = !Object.values(data).some(queryEvaluate);

  // ¿El CURP es obligatorio? Solo si la nacionalidad no es "Otro"
  const isCurpRequired = data?.persona?.nacionalidad !== 'Otro';

  // 2. Validar que los campos de persona no estén vacíos
  // (ignorando apellidoMaterno siempre, y curp cuando no es requerido)
  const secondValidate = !Object.entries(data?.persona)
    .filter(([key]) => {
      if (key === 'apellidoMaterno') return false;
      if (key === 'curp' && !isCurpRequired) return false;
      return true;
    })
    .map(([, value]) => value)
    .some(queryEvaluate);

  // 3. Validar el formato específico del Ciclo de Ingreso
  const isCicloValid = cicloIngresoValidator(data?.alumnoCicloIngreso);

  // 4. Si el CURP sí es requerido, también debe cumplir el formato de 18 caracteres
  const isCurpValid = !isCurpRequired || curpValidator(data?.persona?.curp);

  return firstValidate && secondValidate && isCicloValid && isCurpValid;
};

export const setAndValidateFormData = (data) => {
  const formData = setFormData(data);
  const validate = validateForm(formData);
  return { formData, validate };
};
