export default function formPlantel(name, form, setForm, value) {
  if (name === 'correo3') {
    if (value === '') {
      setForm((prevForm) => {
        const { correo3, ...updatedForm } = prevForm;
        return updatedForm;
      });
    } else {
      setForm({ ...form, [name]: value });
    }
  } else if (['calle', 'numeroExterior', 'numeroInterior', 'colonia', 'codigoPostal', 'municipioId'].includes(name)) {
    setForm({ ...form, domicilio: { ...form.domicilio, [name]: value } });
  } else if (['nombre', 'apellidoMaterno', 'apellidoPaterno', 'nacionalidad', 'curp', 'sexo', 'correoPrimario'].includes(name)) {
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
