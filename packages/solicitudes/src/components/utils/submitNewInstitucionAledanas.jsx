const handleCreate = (
  form,
  setForm,
  setInitialValues,
  setInstitucionesAledanas,
  hideModal,
  errors,
  setNoti,
  plantelId,
  token,
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

  fetch(`${url}/api/v1/planteles/institucionesSalud`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      api_key: apikey,
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(form),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      const newData = { ...form, id: data.data.id };
      setInstitucionesAledanas((prevList) => [...prevList, newData]);
      setForm({ plantelId });
      setInitialValues({});
      hideModal();
    })
    .catch((error) => {
      console.error('Error:', error);
    });
};

export default handleCreate;
