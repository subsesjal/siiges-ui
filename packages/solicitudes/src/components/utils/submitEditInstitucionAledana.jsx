import { getToken } from '@siiges-ui/shared';

// Function to build the API URL
const buildApiUrl = (id, plantelId) => {
  const baseUrl = process.env.NEXT_PUBLIC_URL;
  return `${baseUrl}/api/v1/planteles/${plantelId}/saludInstituciones/${id}`;
};

const handleEdit = async (
  form,
  setForm,
  setInitialValues,
  setInstitucionAledanas,
  hideModal,
  errors,
  setNoti,
  plantelId,
  setLoading,
) => {
  const apikey = process.env.NEXT_PUBLIC_API_KEY;
  const url = buildApiUrl(form.id, plantelId);
  const token = getToken();

  hideModal();
  setLoading(true);

  try {
    const isFormValid = Object.keys(errors).every((campo) => errors[campo]());

    if (!isFormValid) {
      throw new Error('¡Algo salió mal, revisa que los campos estén correctos!');
    }

    const response = await fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        api_key: apikey,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(form),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    const updatedData = { ...form, id: data.data.id };

    setInstitucionAledanas((prevList) => {
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
      message: '¡Éxito, no hubo problemas en esta sección!',
      type: 'success',
    });
    setLoading(false);
  } catch (error) {
    setNoti({
      open: true,
      message: `Ocurrió un error al guardar los datos: ${error}`,
      type: 'error',
    });
    setLoading(false);
  }
};

export default handleEdit;
