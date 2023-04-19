export default function formDatosPlanEstudios(name, form, setForm, value) {
  setForm({ ...form, [name]: value });
}
