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
    throw new Error(`HTTP error! status: ${response.status}, message: ${errorResponse.message}`);
  }

  return response.json();
}

export default function submitDescripcionPlantel(
  validations,
  setNoti,
  setLoading,
  institucionId,
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

  const requests = [
    sendRequest(url, `planteles/${plantelId}/niveles`, headers, selectedCheckboxes, 'POST'),
    sendRequest(url, `planteles/${plantelId}/seguridad`, headers, seguridad, 'POST'),
  ];

  if (institucionId) {
    requests.push(sendRequest(url, `instituciones/${institucionId}/planteles/${plantelId}`, headers, form[2], 'PATCH'));
  }

  Promise.allSettled(requests)
    .then((results) => {
      const errors = results.filter((result) => result.status === 'rejected');
      if (errors.length > 0) {
        setNoti({
          open: true,
          message: `Error al cargar los datos: ${errors[0].reason.message}`,
          type: 'error',
        });
      } else {
        setNoti({
          open: true,
          message: 'Se cargaron los datos exitosamente!',
          type: 'success',
        });
      }
    })
    .catch((error) => {
      console.error('Unexpected error:', error);
    })
    .finally(() => {
      setLoading(false);
    });
}
