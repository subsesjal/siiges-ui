export default function errorDatosNuevaSolicitud(form, setError, error) {
  const errors = {
    modalidad: () => {
      if (form.modalidad === undefined || form.modalidad === '') {
        setError({ ...error, modalidad: 'Seleccione una modalidad' });
        return false;
      }
      setError({ ...error, modalidad: '' });
      return true;
    },
    plantel: () => {
      if (form.plantel === undefined || form.plantel === '') {
        setError({ ...error, plantel: 'Plantel inválido' });
        return false;
      }
      setError({ ...error, plantel: '' });
      return true;
    },
  };

  return errors;
}
