import { getToken } from '@siiges-ui/shared';

const handleCreate = async (
  form,
  setForm,
  setInitialValues,
  setAsignaturasList,
  hideModal,
  setNoti,
  tipo,
) => {
  const apikey = process.env.NEXT_PUBLIC_API_KEY;
  const url = process.env.NEXT_PUBLIC_URL;
  const token = getToken();

  try {
    const response = await fetch(`${url}/api/v1/asignaturas`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        api_key: apikey,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(form),
    });

    if (!response.ok) {
      setNoti({
        open: true,
        message:
          'Ocurrió un error al guardar los datos. Por favor, inténtalo de nuevo.',
        type: 'error',
      });
      throw new Error('Network error');
    }

    const data = await response.json();
    const newData = { ...form, id: data.data.id };

    setAsignaturasList((prevList) => [...prevList, newData]);
    setForm({ programaId: data.data.programaId, tipo, areaId: data.data.areaId });
    setInitialValues({});

    hideModal();

    setNoti({
      open: true,
      message: 'Guardado de datos exitoso!',
      type: 'success',
    });

    return newData;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export default handleCreate;
