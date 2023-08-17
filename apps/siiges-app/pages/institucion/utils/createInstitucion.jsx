import { Context } from '@siiges-ui/shared';
import { useContext } from 'react';

export default function createInstitucion(
  institucionForm,
  errors,
  setNoti,
  router,
) {
  const apikey = process.env.NEXT_PUBLIC_API_KEY;
  const { session } = useContext(Context);

  const isValid = Object.keys(errors).every((campo) => errors[campo]());
  if (!isValid) {
    setNoti({
      open: true,
      message: 'Algo salio mal, revisa que los campos esten correctos',
      type: 'error',
    });
    return;
  }

  fetch('http://localhost:3000/api/v1/instituciones', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      api_key: apikey,
      Authorization: `Bearer ${session.token}`,
    },
    body: JSON.stringify(institucionForm),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Error submitting the request');
    })
    .then((data) => {
      console.log(data.data.id);
      router.push(`/institucion/${data.data.id}/consultarInstitucion`);
    })
    .then(() => {
      setNoti({
        open: true,
        message: 'Exito, no hubo problemas en esta sección',
        type: 'success',
      });
    })
    .catch((err) => {
      console.error('Error:', err);
    });
}
