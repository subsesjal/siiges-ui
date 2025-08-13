import { getToken, SubmitDocument, fileToFormData } from '@siiges-ui/shared';

export default async function submitRatificacion(
  validations,
  setNoti,
  setLoading,
  setSections,
  id,
) {
  const apikey = process.env.NEXT_PUBLIC_API_KEY;
  const baseUrl = process.env.NEXT_PUBLIC_URL;
  const { form, validNombres, archivosNombres } = validations;
  const token = getToken();

  if (!validNombres) {
    setNoti({
      open: true,
      message: '¡Se requiere al menos 1 nombre propuesto!',
      type: 'error',
    });
    setLoading(false);
    return null;
  }

  const { ratificacionId } = form[6];
  const method = ratificacionId ? 'PATCH' : 'POST';
  const endpoint = ratificacionId
    ? `${baseUrl}/api/v1/instituciones/${form[6].institucionId}/ratificaciones/${ratificacionId}`
    : `${baseUrl}/api/v1/instituciones/${form[6].institucionId}/ratificaciones`;

  setLoading(true);

  try {
    let currentRatificacionId = ratificacionId;

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

    const ratificacionData = await ratificacionResponse.json();
    if (!currentRatificacionId) {
      currentRatificacionId = ratificacionData.id;
    }

    if (archivosNombres && typeof archivosNombres === 'object') {
      await Promise.all(
        Object.entries(archivosNombres)
          .filter(([file]) => Boolean(file))
          .map(async ([tipoDocumento, file]) => {
            const formData = await fileToFormData(file);

            formData.append('tipoEntidad', 'RATIFICACION');
            formData.append('entidadId', currentRatificacionId);
            formData.append('tipoDocumento', tipoDocumento);

            return SubmitDocument(formData, () => {});
          }),
      );
    }

    const postSectionResponse = await fetch(
      `${baseUrl}/api/v1/solicitudes/${id}/secciones/19`,
      {
        method: 'POST',
        headers: {
          api_key: apikey,
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (!postSectionResponse.ok) {
      const errorData = await postSectionResponse.json();
      throw new Error(errorData.message || '¡Error al desactivar la sección 19!');
    }

    setSections((prevSections) => prevSections.map(
      (section) => (section.id === 19 ? { ...section, disabled: true } : section),
    ));

    setNoti({
      open: true,
      message: '¡Éxito, no hubo problemas en esta sección!',
      type: 'success',
    });

    return true;
  } catch (error) {
    console.error('Error:', error);
    setNoti({
      open: true,
      message: `¡Hubo un problema!: ${error.message}`,
      type: 'error',
    });
    return false;
  } finally {
    setLoading(false);
  }
}
