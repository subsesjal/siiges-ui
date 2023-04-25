export default function formData(name, value, form, setForm) {
  setForm({ ...form, [name]: value });
}
