import { getToken } from '@siiges-ui/shared';

const handleEdit = (
  form,
  setForm,
  setInitialValues,
  setInfraestructuras,
  hideModal,
  errors,
  setNoti,
  plantelId,
) => {
  const apikey = process.env.NEXT_PUBLIC_API_KEY;
  const url = process.env.NEXT_PUBLIC_URL;
  const token = getToken();

  const isValid = Object.keys(errors).every((campo) => errors[campo]());
  if (!isValid) {
    setNoti({
      open: true,
      message: 'Algo salió mal, revisa que los campos estén correctos',
      type: 'error',
    });
    return;
  }

  fetch(`${url}/api/v1/asignaturas/${form.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      api_key: apikey,
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(form),
  })
    .then((response) => response.json())
    .then((data) => {
      const updatedData = { ...form, id: data.data.id };
      setInfraestructuras((prevList) => {
        const newList = [...prevList];
        const index = newList.findIndex((item) => item.id === updatedData.id);
        if (index !== -1) {
          newList[index] = updatedData;
        }
        return newList;
      });
      setForm({ plantelId });
      setInitialValues({});
      hideModal();
    })
    .catch((error) => {
      console.error('Error:', error);
    });
};

export default handleEdit;
