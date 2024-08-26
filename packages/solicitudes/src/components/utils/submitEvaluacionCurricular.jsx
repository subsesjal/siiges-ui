import { getToken } from '@siiges-ui/shared';

export default function submitEvaluacionCurricular(
  validations,
  setNoti,
  setLoading,
) {
  const apikey = process.env.NEXT_PUBLIC_API_KEY;
  const url = process.env.NEXT_PUBLIC_URL;
  const { form, errors } = validations;
  const token = getToken();

  const toDateTimeString = (date) => {
    if (typeof date === 'string') return date;
    return `${date.toISOString().slice(0, 19)}Z`;
  };

  const formattedForm = {
    ...form,
    fecha: toDateTimeString(form.fecha),
  };

  const isValid = Object.keys(errors).every((campo) => errors[campo]());
  if (!isValid) {
    setNoti({
      open: true,
      message: '¡Algo salió mal, revise los campos!',
      type: 'error',
    });
    return;
  }

  const method = form.id ? 'PATCH' : 'POST';
  const endpoint = form.id
    ? `${url}/api/v1/evaluaciones/${form.id}`
    : `${url}/api/v1/evaluaciones`;

  fetch(endpoint, {
    method,
    headers: {
      'Content-Type': 'application/json',
      api_key: apikey,
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(formattedForm),
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
          message: '¡Éxito, no hubo problemas en esta sección!',
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
