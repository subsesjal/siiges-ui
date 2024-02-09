import { getToken } from '@siiges-ui/shared';

const handleCreate = async (
  form,
  setForm,
  setInitialValues,
  setAsignaturasList,
  hideModal,
  errors,
  setNoti,
  tipo,
) => {
  const apikey = process.env.NEXT_PUBLIC_API_KEY;
  const url = process.env.NEXT_PUBLIC_URL;
  const token = getToken();

  try {
    // Ensure all error messages are empty, indicating no validation errors
    const isValid = Object.values(errors).every((error) => error === '');

    if (!isValid) {
      setNoti({
        open: true,
        message: 'Algo salió mal, revisa que los campos estén correctos',
        type: 'error',
      });
      throw new Error('Validation failed');
    }

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
    setForm({ programaId: data.data.programaId, tipo });
    setInitialValues({});

    hideModal(); // Close the modal upon successful creation

    setNoti({
      open: true,
      message: 'Guardado de datos exitoso!',
      type: 'success',
    });

    return newData; // Optionally, return the new data for further processing
  } catch (error) {
    console.error('Error:', error);
    // In case of error, it might be beneficial to also set a notification for the error here
    // if it doesn't interfere with other error handling mechanisms
    throw error;
  }
};

export default handleCreate;
