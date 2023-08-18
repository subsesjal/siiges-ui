function submitNewSolicitud(validations, setNewSubmit) {
  const apikey = process.env.NEXT_PUBLIC_API_KEY;
  const url = process.env.NEXT_PUBLIC_URL;
  const {
    errors, form, setNoti, setId, setProgramaId,
  } = validations;

  const isValid = Object.keys(errors).every((campo) => errors[campo]());
  if (!isValid) {
    setNoti({
      open: true,
      message: 'Algo salio mal, revisa que los campos esten correctos',
      type: 'error',
    });
    return;
  }

  fetch(`${url}/api/v1/solicitudes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', api_key: apikey },
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
      setNewSubmit(false),
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
