import { getToken } from '@siiges-ui/shared';

function submitNewSolicitud(validations, setNewSubmit, setLoading) {
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
      if (!response.ok) {
        throw new Error('Error submitting the request');
      }
      return response.json();
    })
    .then((data) => {
      setId(data.data.id);
      setProgramaId(data.data.programa.id);
      setNewSubmit(false);
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
      setTimeout(() => {
        setLoading(false);
        setNoti({
          open: true,
          message: `Hubo un problema, revise que los campos estén correctos: ${err}`,
          type: 'error',
        });
      }, 1000);
    });
}

export default submitNewSolicitud;
