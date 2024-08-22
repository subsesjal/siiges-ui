export default function errorDatosNewInstitucion(form, setError, error) {
  const errors = {
    nombre: () => {
      if (form.nombre === undefined || form.nombre === '') {
        setError({ ...error, nombre: '¡Nombre de institución incorrecto!' });
        return false;
      }
      setError({ ...error, nombre: '' });
      return true;
    },
    razonSocial: () => {
      if (form.razonSocial === undefined || form.razonSocial === '') {
<<<<<<< HEAD
<<<<<<< HEAD
        setError({ ...error, razonSocial: '¡Razón social inválida!' });
=======
        setError({ ...error, razonSocial: 'Razón social inválida' });
>>>>>>> 310fb93 (correcciones de ortografía y archivos)
=======
        setError({ ...error, razonSocial: '¡Razón social inválida!' });
>>>>>>> 063e4b7 (correcion)
        return false;
      }
      setError({ ...error, razonSocial: '' });
      return true;
    },
  };

  return errors;
}
