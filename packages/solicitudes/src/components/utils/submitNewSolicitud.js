function submitNewSolicitud(values) {
  const {
    errors, error, form, setNoti,
  } = values;
  if (Object.values(errors).every((validation) => validation()) !== false) {
    console.log('1 if');
    if (Object.values(error).every((value) => value === null || value === '')) {
      console.log('2 if');
      fetch('http://localhost:3000/api/v1/solicitudes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
    } else {
      console.log('1 else');
      setNoti({
        open: true,
        message: 'Algo salio mal, revisa que los campos esten correctos',
        type: 'error',
      });
    }
  } else {
    console.log('2 else');
    setNoti({
      open: true,
      message: 'Algo salio mal, revisa que los campos esten correctos',
      type: 'error',
    });
  }
}

export default submitNewSolicitud;
