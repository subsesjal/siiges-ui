import { useEffect } from 'react';

export default function submitNewSolicitud({ values, next, setNewSubmit }) {
  useEffect(() => {
    if (
      Object.values(values.errors).every((validation) => validation()) !== false
    ) {
      if (
        Object.values(values.error).every(
          (value) => value === null || value === '',
        )
      ) {
        fetch('http://localhost:3000/api/v1/solicitudes', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(values.form),
        }).then(next(), setNewSubmit(false));
      } else {
        values.setNoti({
          open: true,
          message: 'Algo salio mal, revisa que los campos esten correctos',
          type: 'error',
        });
      }
    } else {
      values.setNoti({
        open: true,
        message: 'Algo salio mal, revisa que los campos esten correctos',
        type: 'error',
      });
    }
  }, []);
  return false;
}
