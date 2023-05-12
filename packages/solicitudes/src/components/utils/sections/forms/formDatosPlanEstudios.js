export default function formDatosPlanEstudios(name, value, form, setForm) {
  if (name === 'cicloId' || name === 'nivelId' || name === 'programaTurnos') {
    setForm({ ...form, programa: { ...form.programa, [name]: value } });
  } else {
    setForm({ ...form, [name]: value });
  }
}
