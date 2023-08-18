const handleCreate = (
  form,
  setForm,
  setInitialValues,
  setDiligencias,
  hideModal,
  errors,
  setNoti,
) => {
  const apikey = process.env.NEXT_PUBLIC_API_KEY;
  const url = process.env.NEXT_PUBLIC_URL;
  const isValid = Object.keys(errors).every((campo) => errors[campo]());

  if (!isValid) {
    setNoti({
      open: true,
      message: 'Algo salio mal, revisa que los campos esten correctos',
      type: 'error',
    });
    return;
  }

  fetch(`${url}/api/v1/diligencias`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', api_key: apikey },
    body: JSON.stringify(form),
  })
    .then((response) => response.json())
    .then((data) => {
      const newData = { ...form, id: data.data.id };
      setDiligencias((prevList) => [...prevList, newData]);
      setInitialValues({});
      hideModal();
      setNoti({
        open: true,
        message: 'Exito, no hubo problemas en esta sección',
        type: 'success',
      });
    })
    .catch((error) => {
      console.error('Error:', error);
      setNoti({
        open: true,
        message: 'Algo salio mal, revisa que los campos esten correctos',
        type: 'error',
      });
    });
};

export default handleCreate;
