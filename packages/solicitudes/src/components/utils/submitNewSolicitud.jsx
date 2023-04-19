function submitNewSolicitud(validations, next, setNewSubmit) {
  const {
    errors, error, form, setNoti,
  } = validations;
  if (Object.values(errors).every((validation) => validation()) !== false) {
    if (Object.values(error).every((value) => value === null || value === '')) {
      fetch('http://localhost:3000/api/v1/solicitudes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      }).then(next(), setNewSubmit(false));
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
  }
}

export default submitNewSolicitud;
