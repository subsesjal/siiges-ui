export default function formDatosRepresentante(
  name,
  value,
  form,
  setForm,
  position,
) {
  const personaFields = [
    'nombre',
    'apellidoPaterno',
    'apellidoMaterno',
    'nacionalidad',
    'telefono',
    'celular',
  ];

  const domicilioFields = [
    'calle',
    'numeroExterior',
    'numeroInterior',
    'colonia',
    'codigoPostal',
    'municipioId',
  ];

  const updatedForm = {
    ...form,
    [position]: {
      ...form[position],
      [name]: value,
    },
  };

  if (personaFields.includes(name)) {
    updatedForm[position] = {
      ...updatedForm[position],
      persona: {
        ...(updatedForm[position]?.persona || {}),
        [name]: value,
      },
    };
  } else if (domicilioFields.includes(name)) {
    updatedForm[position] = {
      ...updatedForm[position],
      persona: {
        ...updatedForm[position]?.persona,
        domicilio: {
          ...(updatedForm[position]?.persona?.domicilio || {}),
          [name]: value,
        },
      },
    };
  }

  setForm(updatedForm);
}
