export default function errorDatosNewInstitucion(form, setError, error) {
  const errors = {
    nombre: () => {
      if (form.nombre === undefined || form.nombre === '') {
        setError({ ...error, nombre: 'Nombre de institucion incorrecto' });
        return false;
      }
      setError({ ...error, nombre: '' });
      return true;
    },
    razonSocial: () => {
      if (form.razonSocial === undefined || form.razonSocial === '') {
        setError({ ...error, razonSocial: 'Razón social invalida' });
        return false;
      }
      setError({ ...error, razonSocial: '' });
      return true;
    },
  };

  return errors;
}
