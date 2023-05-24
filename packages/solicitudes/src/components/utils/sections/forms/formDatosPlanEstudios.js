export default function formDatosPlanEstudios(name, value, form, setForm) {
  if (name === 'cicloId' || name === 'nivelId' || name === 'programaTurnos') {
    setForm({ ...form, 1: { ...form['1'], programa: { ...form['1'].programa, [name]: value } } });
  } else {
    setForm({ ...form, 1: { ...form['1'], [name]: value } });
  }
}
