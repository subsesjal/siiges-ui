export default function formEgreso(name, value, form, setForm) {
  setForm({ ...form, 4: { ...form['4'], programa: { ...form['4'].programa, [name]: value } } });
}
