export default function errorDatosInstitucionAledanas(form, setError, error) {
  const errors = {
    nombre: () => {
      if (form.nombre === undefined || form.nombre === '') {
        setError({ ...error, nombre: '¡Nombre inválido!' });
        return false;
      }
      setError({ ...error, nombre: '' });
      return true;
    },
    tiempo: () => {
      if (form.tiempo === undefined || form.tiempo === '') {
        setError({ ...error, tiempo: '¡Tiempo de Llegada inválido!' });
        return false;
      }
      setError({ ...error, tiempo: '' });
      return true;
    },
  };

  return errors;
}
