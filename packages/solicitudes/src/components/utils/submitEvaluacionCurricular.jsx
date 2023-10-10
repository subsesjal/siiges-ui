import { getToken } from '@siiges-ui/shared';

export default function submitEvaluacionCurricular(validations, setNoti) {
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
    fecha: toDateTimeString(form.fecha), // assuming the field's name is "fecha"
  };

  const isValid = Object.keys(errors).every((campo) => errors[campo]());
  if (!isValid) {
    setNoti({
      open: true,
      message: 'Algo salió mal, revise los campos',
      type: 'error',
    });
    return;
  }

  fetch(`${url}/api/v1/evaluaciones`, {
    method: 'POST',
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
