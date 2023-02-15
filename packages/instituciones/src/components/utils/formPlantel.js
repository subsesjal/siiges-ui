export default function formPlantel(name, form, setForm, value) {
  if (
    name === 'calle'
    || name === 'numeroExterior'
    || name === 'numeroInterior'
    || name === 'colonia'
    || name === 'codigoPostal'
    || name === 'municipioId'
  ) {
    setForm({ ...form, domicilio: { ...form.domicilio, [name]: value } });
  } else if (
    name === 'nombre'
    || name === 'apellidoMaterno'
    || name === 'apellidoPaterno'
    || name === 'nacionalidad'
    || name === 'curp'
    || name === 'sexo'
    || name === 'correoPrimario'
  ) {
    setForm({
      ...form,
      director: {
        ...form.director,
        persona: { ...form.director.persona, [name]: value },
      },
    });
  } else {
    setForm({ ...form, [name]: value });
  }
}
