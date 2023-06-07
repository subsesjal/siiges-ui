export default function formPrograma(name, value, setForm, position) {
  setForm((prevForm) => {
    const updatedForm = { ...prevForm };
    const currentPosition = Number(position);

    updatedForm[currentPosition] = {
      ...updatedForm[currentPosition],
      programa: {
        ...updatedForm[currentPosition]?.programa,
        [name]: value,
      },
    };

    return updatedForm;
  });
}
