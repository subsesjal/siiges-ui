import { getToken } from '@siiges-ui/shared';

export default function updateInstitucion(
  institucionForm,
  errors,
  setNoti,
  router,
) {
  const apikey = process.env.NEXT_PUBLIC_API_KEY;
  const url = process.env.NEXT_PUBLIC_URL;
  const token = getToken();

  const isValid = Object.keys(errors).every((campo) => errors[campo]());
  if (!isValid) {
    setNoti({
      open: true,
      message: '¡Algo salió mal, revisa que los campos estén correctos!',
      type: 'error',
    });
    return;
  }

  const { institucionId } = router.query;

  fetch(`${url}/api/v1/instituciones/${institucionId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      api_key: apikey,
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(institucionForm),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('¡Error al enviar la solicitud!');
    })
    .then((data) => {
      router.push(`/institucion/${data.data.id}/consultarInstitucion`);
    })
    .then(() => {
      setNoti({
        open: true,
        message: '¡Éxito, no hubo problemas en esta sección!',
        type: 'success',
      });
    })
    .catch((err) => {
      console.error('Error:', err);
    });
}
