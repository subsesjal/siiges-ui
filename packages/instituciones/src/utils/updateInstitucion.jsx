export default function updateInstitucion(
  institucionForm,
  errors,
  setNoti,
  router,
) {
  const apikey = process.env.NEXT_PUBLIC_API_KEY;
  const url = process.env.NEXT_PUBLIC_URL;

  const isValid = Object.keys(errors).every((campo) => errors[campo]());
  if (!isValid) {
    setNoti({
      open: true,
      message: 'Algo salio mal, revisa que los campos esten correctos',
      type: 'error',
    });
    return;
  }

  const { institucionId } = router.query;

  fetch(`${url}/api/v1/instituciones/${institucionId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json', api_key: apikey },
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
