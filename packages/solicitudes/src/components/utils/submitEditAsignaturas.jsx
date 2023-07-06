const handleEdit = (
  form,
  setForm,
  setInitialValues,
  setAsignaturasList,
  hideModal,
  errors,
  setNoti,
  id,
) => {
  const apikey = process.env.NEXT_PUBLIC_API_KEY;

  const isValid = Object.keys(errors).every((campo) => errors[campo]());
  if (!isValid) {
    setNoti({
      open: true,
      message: 'Algo salió mal, revisa que los campos estén correctos',
      type: 'error',
    });
    return;
  }

  fetch(`http://localhost:3000/api/v1/asignaturas/${form.id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json', api_key: apikey },
    body: JSON.stringify(form),
  })
    .then((response) => response.json())
    .then((data) => {
      const updatedData = { ...form, id: data.data.id };
      setAsignaturasList((prevList) => {
        const newList = [...prevList];
        const index = newList.findIndex((item) => item.id === updatedData.id);
        if (index !== -1) {
          newList[index] = updatedData;
        }
        return newList;
      });
      setForm({ programaId: id });
      setInitialValues({});
      hideModal();
    })
    .catch((error) => {
      console.error('Error:', error);
    });
};

export default handleEdit;
