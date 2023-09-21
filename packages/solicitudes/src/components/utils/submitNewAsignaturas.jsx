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

  try {
    const isValid = Object.keys(errors).every((campo) => errors[campo]());

    if (!isValid) {
      const validationError = new Error('Validation failed');
      setNoti({
        open: true,
        message: 'Algo salió mal, revisa que los campos estén correctos',
        type: 'error',
      });
      throw validationError;
    }

    const response = await fetch(`${url}/api/v1/asignaturas`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', api_key: apikey },
      body: JSON.stringify(form),
    });

    if (!response.ok) {
      const networkError = new Error('Network error');
      setNoti({
        open: true,
        message: 'Ocurrió un error al guardar los datos. Por favor, inténtalo de nuevo.',
        type: 'error',
      });
      throw networkError;
    }

    const data = await response.json();
    const newData = { ...form, id: data.data.id };

    setAsignaturasList((prevList) => [...prevList, newData]);

    setForm({ programaId: data.data.programaId, tipo });
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
