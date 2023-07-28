export default function formtrayectoria(name, value, setForm, position) {
  setForm((prevForm) => ({
    ...prevForm,
    [position]: {
      ...prevForm[position],
      [name]: value,
    },
  }));
}
