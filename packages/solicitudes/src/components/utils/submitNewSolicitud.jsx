/* function submitNewSolicitud(validations, next, setNewSubmit) {
  const {
    errors, error, form, setNoti, setId,
  } = validations;

  const isValid = Object.keys(errors).every((campo) => errors[campo]());
  if (!isValid) {
    console.log('Failure :c');
    return;
  }

  console.log(form); */
/* if (Object.values(errors).every((validation) => validation()) !== false) {
    if (Object.values(error).every((value) => value === null || value === '')) {
      fetch('http://localhost:3000/api/v1/solicitudes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
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
        .then(next(), setNewSubmit(false))
        .catch((err) => {
          console.error('Error:', err);
        });
    } else {
      setNoti({
        open: true,
        message: 'Algo salio mal, revisa que los campos esten correctos',
        type: 'error',
      });
    }
  } else {
    setNoti({
      open: true,
      message: 'Algo salio mal, revisa que los campos esten correctos',
      type: 'error',
    });
  } */
/* }

export default submitNewSolicitud; */
