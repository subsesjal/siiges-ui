import { getToken } from '@siiges-ui/shared';

export default function submitRatificacion(validations, setNoti, setLoading) {
  const apikey = process.env.NEXT_PUBLIC_API_KEY;
  const baseUrl = process.env.NEXT_PUBLIC_URL;
  const { form, validNombres } = validations;
  const token = getToken();

  if (!validNombres) {
    setNoti({
      open: true,
      message:
        'Algo salió mal, se requiere al menos 1 nombre propuesto y ambos archivos',
      type: 'error',
    });
    return;
  }

  const { ratificacionId } = form[6];
  const method = ratificacionId ? 'PATCH' : 'POST';
  const endpoint = ratificacionId
    ? `${baseUrl}/api/v1/instituciones/${form[6].institucionId}/ratificaciones/${ratificacionId}`
    : `${baseUrl}/api/v1/instituciones/${form[6].institucionId}/ratificaciones`;

  fetch(endpoint, {
    method,
    headers: {
      'Content-Type': 'application/json',
      api_key: apikey,
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(form[6]),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Error submitting the request');
    })
    .then(() => {
      setTimeout(() => {
        setLoading(false);
        setNoti({
          open: true,
          message: 'Éxito, no hubo problemas en esta sección',
          type: 'success',
        });
      }, 1000);
    })
    .catch((err) => {
      console.error('Error:', err);
      setTimeout(() => {
        setLoading(false);
        setNoti({
          open: true,
          message: 'Hubo un problema, revise que los campos estén correctos',
          type: 'error',
        });
      }, 1000);
    });
}
