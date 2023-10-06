import { getToken } from '@siiges-ui/shared';

const handleCreate = (
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
      message: 'Algo salio mal, revisa que los campos esten correctos',
      type: 'error',
    });
    return;
  }

  fetch(`${url}/api/v1/planteles/${plantelId}/infraestructuras`, {
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
      setInfraestructuras((prevList) => [...prevList, newData]);
      setForm({ plantelId });
      setInitialValues({});
      hideModal();
    })
    .catch((error) => {
      console.error('Error:', error);
    });
};

export default handleCreate;
