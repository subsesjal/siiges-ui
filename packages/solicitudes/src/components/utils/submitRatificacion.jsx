export default function submitRatificacion(validations, token, setNoti) {
  const apikey = process.env.NEXT_PUBLIC_API_KEY;
  const url = process.env.NEXT_PUBLIC_URL;
  const { form, validNombres } = validations;

  console.log(form[6]);

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
      setNoti({
        open: true,
        message: 'Éxito, no hubo problemas en esta sección',
        type: 'success',
      });
    })
    .catch((err) => {
      console.error('Error:', err);

      setNoti({
        open: true,
        message: 'Hubo un error al enviar la solicitud',
        type: 'error',
      });
    });
}
