import { getToken } from '@siiges-ui/shared';

async function sendRequest(
  url,
  endpoint,
  headers,
  body,
  method,
) {
  const response = await fetch(`${url}/api/v1/${endpoint}`, {
    method,
    headers,
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errorResponse = await response.json();
    throw new Error(`¡HTTP error! status: ${response.status}, message: ${errorResponse.message}`);
  }

  return response.json();
}

export default async function submitDescripcionPlantel(
  validations,
  setNoti,
  setLoading,
  institucionId,
  setSections,
  id,
) {
  const apikey = process.env.NEXT_PUBLIC_API_KEY;
  const url = process.env.NEXT_PUBLIC_URL;
  const {
    plantelId, selectedCheckboxes, seguridad, form,
  } = validations;
  const token = getToken();

  const headers = {
    'Content-Type': 'application/json',
    api_key: apikey,
    Authorization: `Bearer ${token}`,
  };

  setLoading(true);

  try {
    const requests = [
      sendRequest(url, `planteles/${plantelId}/niveles`, headers, selectedCheckboxes, 'POST'),
      sendRequest(url, `planteles/${plantelId}/seguridad`, headers, seguridad, 'POST'),
    ];

    if (institucionId) {
      requests.push(sendRequest(url, `instituciones/${institucionId}/planteles/${plantelId}`, headers, form[2], 'PATCH'));
    }

    const results = await Promise.allSettled(requests);

    const errors = results.filter((result) => result.status === 'rejected');

    if (errors.length > 0) {
      setNoti({
        open: true,
        message: `¡Error al cargar los datos!: ${errors[0].reason.message}`,
        type: 'error',
      });
      return;
    }

    const postResponse = await fetch(`${url}/api/v1/solicitudes/${id}/secciones/15`, {
      method: 'POST',
      headers: {
        api_key: apikey,
        Authorization: `Bearer ${token}`,
      },
    });

    if (!postResponse.ok) {
      const errorData = await postResponse.json();
      throw new Error(errorData.message || '¡Error al obtener datos!');
    }

    setSections((prevSections) => prevSections.map((section) => {
      if (section.id === 15) {
        return { ...section, disabled: true };
      }
      return section;
    }));

    setNoti({
      open: true,
      message: '¡Se cargaron los datos exitosamente!',
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
