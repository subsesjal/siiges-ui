import { getToken } from '@siiges-ui/shared';

export default async function submitEvaluacionCurricular(
  validations,
  setNoti,
  setLoading,
  setSections,
  id,
) {
  const apikey = process.env.NEXT_PUBLIC_API_KEY;
  const url = process.env.NEXT_PUBLIC_URL;
  const { form, errors } = validations;
  const token = getToken();

  if (!form || !form.fecha) {
    setNoti({
      open: true,
      message: '¡Algo salió mal, el formulario o la fecha están vacíos!',
      type: 'error',
    });
    setLoading(false);
    return;
  }

  const toDateTimeString = (date) => {
    if (typeof date === 'string') return date;
    return `${date.toISOString().slice(0, 19)}Z`;
  };

  const formattedForm = {
    ...form,
    fecha: toDateTimeString(form.fecha),
  };

  // Validate the form fields
  const isValid = Object.keys(errors).every((campo) => errors[campo]());
  if (!isValid) {
    setNoti({
      open: true,
      message: '¡Algo salió mal, revise los campos!',
      type: 'error',
    });
    setLoading(false);
    return;
  }

  const method = form.id ? 'PATCH' : 'POST';
  const endpoint = form.id
    ? `${url}/api/v1/evaluaciones/${form.id}`
    : `${url}/api/v1/evaluaciones`;

  try {
    const response = await fetch(endpoint, {
      method,
      headers: {
        'Content-Type': 'application/json',
        api_key: apikey,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formattedForm),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error submitting the request');
    }

    const postSectionResponse = await fetch(`${url}/api/v1/solicitudes/${id}/secciones/21`, {
      method: 'POST',
      headers: {
        api_key: apikey,
        Authorization: `Bearer ${token}`,
      },
    });

    if (!postSectionResponse.ok) {
      const errorData = await postSectionResponse.json();
      throw new Error(errorData.message || 'Error disabling section 21');
    }

    setSections((prevSections) => prevSections.map((section) => {
      if (section.id === 21) {
        return { ...section, disabled: true };
      }
      return section;
    }));

    setNoti({
      open: true,
      message: '¡Éxito, no hubo problemas en esta sección!',
      type: 'success',
    });
  } catch (error) {
    console.error('Error:', error);
    setNoti({
      open: true,
      message: `Hubo un problema: ${error.message}`,
      type: 'error',
    });
  } finally {
    setLoading(false);
  }
}
