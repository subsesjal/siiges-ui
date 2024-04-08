import { getToken } from '@siiges-ui/shared';

function submitNewSolicitud(validations) {
  const apikey = process.env.NEXT_PUBLIC_API_KEY;
  const url = process.env.NEXT_PUBLIC_URL;
  const {
    form, setNoti, setId, setProgramaId,
  } = validations;

  const token = getToken();

  fetch(`${url}/api/v1/solicitudes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      api_key: apikey,
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(form[1]),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Error submitting the request');
    })
    .then((data) => {
      setId(data.data.id);
      setProgramaId(data.data.programa.id);
    })
    .then(
      setNoti({
        open: true,
        message: 'Exito, no hubo problemas en esta sección',
        type: 'success',
      }),
    )
    .catch((err) => {
      console.error('Error:', err);
    });
}

export default submitNewSolicitud;
