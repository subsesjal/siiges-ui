import { getToken } from '@siiges-ui/shared';

export default function submitRatificacion(validations, setNoti, setLoading) {
  const apikey = process.env.NEXT_PUBLIC_API_KEY;
  const url = process.env.NEXT_PUBLIC_URL;
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

  fetch(`${url}/api/v1/instituciones/${form[6].institucionId}/ratificaciones`, {
    method: 'POST',
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
          message: 'Exito, no hubo problemas en esta sección',
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
          message: 'Hubo un problema, revise que los campos esten correctos',
          type: 'error',
        });
      }, 1000);
    });
}
