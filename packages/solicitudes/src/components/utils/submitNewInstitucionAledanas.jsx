import { getToken } from '@siiges-ui/shared';

const handleCreate = (
  form,
  setForm,
  setInitialValues,
  setInstitucionesAledanas,
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
      message: 'Algo salio mal, revisa que los campos esten correctos',
      type: 'error',
    });
    return;
  }

  hideModal();
  setLoading(true);

  fetch(`${url}/api/v1/planteles/${plantelId}/saludInstituciones`, {
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
      const newData = { ...form, id: data.data.id };
      setInstitucionesAledanas((prevList) => [...prevList, newData]);
      setForm({ plantelId });
      setInitialValues({});
      setNoti({
        open: true,
        message: 'Se añadio institución aledaña con exito',
        type: 'success',
      });
      setLoading(false);
    })
    .catch((error) => {
      setNoti({
        open: true,
        message: `Algo salio mal: ${error}`,
        type: 'error',
      });
      setLoading(false);
    });
};

export default handleCreate;
