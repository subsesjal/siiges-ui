export default function formDatosSolicitud(
  name,
  value,
  form,
  setForm,
  position,
) {
  setForm({
    ...form,
    [position]: {
      ...form[position],
      [name]: value,
    },
  });
}
