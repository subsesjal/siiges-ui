import { getToken } from '@siiges-ui/shared';

const handleEdit = async (
  form,
  setForm,
  setInitialValues,
  setAsignaturasList,
  hideModal,
  setNoti,
  programaId,
  tipo,
  setLoading,
) => {
  const apikey = process.env.NEXT_PUBLIC_API_KEY;
  const url = process.env.NEXT_PUBLIC_URL;
  const token = getToken();

  setLoading(true);
  hideModal();

  try {
    const response = await fetch(`${url}/api/v1/asignaturas/${form.id}`, {
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

    setAsignaturasList((prevList) => {
      const newList = prevList.map((item) => {
        if (item.id === updatedData.id) {
          return updatedData;
        }
        return item;
      });
      return newList;
    });

    setForm({ programaId, tipo, areaId: data.data.areaId });
    setInitialValues({});
    setLoading(false);

    setNoti({
      open: true,
      message: '¡Edición de datos exitoso!',
      type: 'success',
    });
  } catch (error) {
    console.error('Error:', error);
    setLoading(false);
    setNoti({
      open: true,
      message:
        '¡Ocurrió un error al guardar los datos. Porfavor intentelo de nuevo!.',
      type: 'error',
    });
  }
};

export default handleEdit;
