function submitNewSolicitud(validations, setNewSubmit) {
  const {
    errors, form, setNoti, setId,
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

  fetch('http://localhost:3000/api/v1/solicitudes', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', api_key: 'zaCELgL.0imfnc8mVLWwsAawjYr4Rx-Af50DDqtlx' },
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
