import { getToken } from '@siiges-ui/shared';

export default async function submitRatificacion(
  validations,
  setNoti,
  setLoading,
  setSections,
  id,
) {
  const apikey = process.env.NEXT_PUBLIC_API_KEY;
  const baseUrl = process.env.NEXT_PUBLIC_URL;
  const { form, validNombres } = validations;
  const token = getToken();

  if (!validNombres) {
    setNoti({
      open: true,
      message: '¡Algo salió mal, se requiere al menos 1 nombre propuesto y ambos archivos!',
      type: 'error',
    });
    setLoading(false);
    return;
  }

  const { ratificacionId } = form[6];
  const method = ratificacionId ? 'PATCH' : 'POST';
  const endpoint = ratificacionId
    ? `${baseUrl}/api/v1/instituciones/${form[6].institucionId}/ratificaciones/${ratificacionId}`
    : `${baseUrl}/api/v1/instituciones/${form[6].institucionId}/ratificaciones`;

  try {
    setLoading(true);

    // First request to submit ratificacion
    const ratificacionResponse = await fetch(endpoint, {
      method,
      headers: {
        'Content-Type': 'application/json',
        api_key: apikey,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(form[6]),
    });

    if (!ratificacionResponse.ok) {
      const errorData = await ratificacionResponse.json();
      throw new Error(errorData.message || '¡Error al enviar la ratificación!');
    }

    // Second request to disable section 11
    const postSectionResponse = await fetch(`${baseUrl}/api/v1/solicitudes/${id}/secciones/19`, {
      method: 'POST',
      headers: {
        api_key: apikey,
        Authorization: `Bearer ${token}`,
      },
    });

    if (!postSectionResponse.ok) {
      const errorData = await postSectionResponse.json();
      throw new Error(errorData.message || '¡Error al desactivar la sección 19!');
    }

    setSections((prevSections) => prevSections.map((section) => {
      if (section.id === 19) {
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
      message: `¡Hubo un problema!: ${error.message}`,
      type: 'error',
    });
  } finally {
    setLoading(false);
  }
}
