export default function formDatosPlanEstudios(name, value, form, setForm) {
  let updatedFormulario = {
    ...form,
    1: {
      ...form['1'],
      [name]: value,
    },
  };

  if (name === 'cicloId' || name === 'nivelId' || name === 'programaTurnos') {
    updatedFormulario = {
      ...updatedFormulario,
      1: {
        ...updatedFormulario['1'],
        programa: { [name]: value },
      },
    };
  }

  setForm(updatedFormulario);
  /* if (name === 'cicloId' || name === 'nivelId' || name === 'programaTurnos') {
    setForm({ ...form, [position]: { programa: { ...form.programa, [name]: value } } });
  } else {
    setForm({ ...form, [position]: { [name]: value } });
  } */
}
