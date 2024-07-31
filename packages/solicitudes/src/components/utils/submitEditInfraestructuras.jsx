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
  setLoading,
) => {
  const apikey = process.env.NEXT_PUBLIC_API_KEY;
  const url = process.env.NEXT_PUBLIC_URL;
  const token = getToken();

  const isValid = Object.keys(errors).every((campo) => errors[campo]());
  if (!isValid) {
    setNoti({
      open: true,
      message: '¡Algo salió mal, revisa que los campos estén correctos!',
      type: 'error',
    });
    return;
  }

  setLoading(true);
  hideModal();

  fetch(`${url}/api/v1/planteles/${plantelId}/infraestructuras/${form.id}`, {
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
      setNoti({
        open: true,
        message: '¡Éxito al cargar los datos de infraestructura!',
        type: 'success',
      });
      setLoading(false);
    })
    .catch((error) => {
      setNoti({
        open: true,
        message: `Error al cargar los datos de infraestructura: ${error}`,
        type: 'error',
      });
      setLoading(false);
    });
};

export default handleEdit;
