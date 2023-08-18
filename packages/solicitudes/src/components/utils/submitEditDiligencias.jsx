const handleEdit = (
  form,
  setInitialValues,
  setDiligencias,
  hideModal,
  setNoti,
  id,
) => {
  const apikey = process.env.NEXT_PUBLIC_API_KEY;
  const url = process.env.NEXT_PUBLIC_URL;

  fetch(`${url}/api/v1/diligencias/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json', api_key: apikey },
    body: JSON.stringify(form),
  })
    .then((response) => response.json())
    .then((data) => {
      const updatedData = { ...form, id: data.data.id };
      setDiligencias((prevList) => prevList.map(
        (item) => (item.id === updatedData.id ? updatedData : item),
      ));
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
        message: 'Algo salió mal, revisa que los campos estén correctos',
        type: 'error',
      });
    });
};

export default handleEdit;
