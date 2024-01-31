export default function formDatosPlanEstudios(name, value, form, setForm) {
  setForm({
    ...form,
    1: { ...form['1'], programa: { ...form['1'].programa, [name]: value } },
  });
}
