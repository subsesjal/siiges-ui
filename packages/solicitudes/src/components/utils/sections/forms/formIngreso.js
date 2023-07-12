export default function formIngreso(name, value, form, setForm) {
  setForm({
    ...form,
    3: { ...form['3'], programa: { ...form['3'].programa, [name]: value } },
  });
}
